import { NextResponse } from 'next/server';
import { evaluateAction } from '@/lib/policy';
import { addAuditRecord } from '@/lib/audit';
export async function POST(request: Request) { const action = await request.json(); const evaluation = evaluateAction(action); const result = { id: crypto.randomUUID(), action, ...evaluation, reasoningSource: 'kairn-policy-engine', status: evaluation.decision === 'allow' ? 'approved' : 'pending' as const }; addAuditRecord(result); return NextResponse.json(result); }
