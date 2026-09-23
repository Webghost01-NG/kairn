import { NextResponse } from 'next/server';
import { evaluateAction, type Action } from '@/lib/policy';
import { addAuditRecord } from '@/lib/audit';
export async function POST(request: Request) { const action = await request.json() as Action; const result = { id: crypto.randomUUID(), action, ...evaluateAction(action), reasoningSource: 'kairn-policy-engine' }; addAuditRecord(result); return NextResponse.json(result); }
