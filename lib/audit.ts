import type { DecisionRecord } from './contracts';
import { addRecord, appendEvent, records, updateRecord } from './store';
export type AuditRecord = DecisionRecord;
export const addAuditRecord = addRecord;
export const getAuditRecords = records;
export async function updateAudit(id: string, status: 'approved' | 'rejected') { const record = await updateRecord(id, status); if (record) await appendEvent({ type: 'approval', id, status }); return record; }
export { appendEvent };
