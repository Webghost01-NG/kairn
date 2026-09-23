import { NextResponse } from 'next/server';
import { updateAudit } from '@/lib/audit';
export async function POST(request: Request) { const { id, status } = await request.json(); if (!['approved', 'rejected'].includes(status)) return NextResponse.json({ error: 'Invalid approval status' }, { status: 400 }); const record = updateAudit(id, status); return record ? NextResponse.json(record) : NextResponse.json({ error: 'Audit record not found' }, { status: 404 }); }
