import type { Action } from './policy';
export type AuditRecord = { id: string; action: Action; decision: string; risk: string; reasons: string[]; nextStep: string; evaluatedAt: string; reasoningSource: string };
const globalStore = globalThis as typeof globalThis & { __kairnAudit?: AuditRecord[] };
const records = globalStore.__kairnAudit ??= [];
export function addAuditRecord(record: AuditRecord) { records.unshift(record); return record; }
export function getAuditRecords() { return records; }
