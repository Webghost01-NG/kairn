import { NextResponse } from 'next/server';
export function GET() { return NextResponse.json({ ok: true, service: 'kairn', mcpConfigured: Boolean(process.env.MCP_TARGET_URL), servConfigured: Boolean(process.env.SERV_REASONING_URL && process.env.SERV_API_KEY) }); }
