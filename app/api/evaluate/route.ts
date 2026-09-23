import { NextResponse } from 'next/server';
import { evaluateAction, type Action } from '@/lib/policy';
export async function POST(request: Request) { const action = await request.json() as Action; return NextResponse.json({ id: crypto.randomUUID(), action, ...evaluateAction(action), reasoningSource: 'kairn-policy-engine' }); }
