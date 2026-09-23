import type { DecisionRecord } from './contracts';
import { addRecord, records, updateRecord } from './store';
export type AuditRecord = DecisionRecord;
export const addAuditRecord = addRecord;
export const getAuditRecords = records;
export const updateAudit = updateRecord;
