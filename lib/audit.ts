import type { DecisionRecord } from './contracts';
export type AuditRecord = DecisionRecord;
const globalStore = globalThis as typeof globalThis & { __kairnAudit?: AuditRecord[] };
const records = globalStore.__kairnAudit ??= [];
export function addAuditRecord(record: AuditRecord) { records.unshift(record); return record; }
export function getAuditRecords() { return records; }
export function updateAudit(id: string, status: 'approved' | 'rejected') { const record = records.find((item) => item.id === id); if (!record) return undefined; record.status = status; return record; }
