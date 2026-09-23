import { NextResponse } from 'next/server';
import { getAuditRecords } from '@/lib/audit';
export function GET() { return NextResponse.json({ records: getAuditRecords() }); }
