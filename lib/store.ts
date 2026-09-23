import { appendFile, mkdir, readFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import type { DecisionRecord } from './contracts';
const file = process.env.KAIRN_AUDIT_FILE || './data/audit.ndjson'; const memory: DecisionRecord[] = []; let loaded = false;
async function load() { if (loaded) return; loaded = true; try { const text = await readFile(file, 'utf8'); for (const line of text.trim().split('\n').filter(Boolean)) memory.push(JSON.parse(line)); } catch {} }
export async function addRecord(record: DecisionRecord) { await load(); memory.unshift(record); await mkdir(dirname(file), { recursive: true }); await appendFile(file, `${JSON.stringify(record)}\n`); return record; }
export async function records() { await load(); return memory; }
export async function updateRecord(id: string, status: 'approved' | 'rejected') { await load(); const record = memory.find((item) => item.id === id); if (record) record.status = status; return record; }
export async function appendEvent(event: unknown) { await mkdir(dirname(file), { recursive: true }); await appendFile(file, `${JSON.stringify({ event, at: new Date().toISOString() })}\n`); }
