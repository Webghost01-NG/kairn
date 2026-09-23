import { NextResponse } from 'next/server';
import { updateAudit } from '@/lib/audit';
import { requireSecret } from '@/lib/config';
import { forwardToMcp } from '@/lib/mcp';
export async function POST(request: Request) { if (!requireSecret(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); const { id, status } = await request.json(); if (!['approved', 'rejected'].includes(status)) return NextResponse.json({ error: 'Invalid approval status' }, { status: 400 }); const record = await updateAudit(id, status); if (!record) return NextResponse.json({ error: 'Audit record not found' }, { status: 404 }); if (status === 'approved') return NextResponse.json({ ...record, upstream: await forwardToMcp(record.action) }); return NextResponse.json(record); }
