import { NextResponse } from 'next/server';
import { evaluateAction } from '@/lib/policy';
import { addAuditRecord } from '@/lib/audit';
import { requireSecret } from '@/lib/config';
import { forwardToMcp } from '@/lib/mcp';
export async function POST(request: Request) { if (!requireSecret(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); try { const action = await request.json(); const evaluation = evaluateAction(action); const result = { id: crypto.randomUUID(), action, ...evaluation, reasoningSource: 'kairn-policy-engine', status: evaluation.decision === 'allow' ? 'approved' : 'pending' as const }; await addAuditRecord(result); if (evaluation.decision !== 'allow') return NextResponse.json({ forward: false, ...result }, { status: evaluation.decision === 'reject' ? 403 : 200 }); return NextResponse.json({ forward: true, ...result, upstream: await forwardToMcp(action) }); } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : 'MCP forwarding failed', forward: false }, { status: 502 }); } }
