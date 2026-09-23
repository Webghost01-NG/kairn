import { NextResponse } from 'next/server';
import { getAuditRecords } from '@/lib/audit';
import { requireSecret } from '@/lib/config';
export async function GET(request: Request) { if (!requireSecret(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); return NextResponse.json({ records: await getAuditRecords() }); }
