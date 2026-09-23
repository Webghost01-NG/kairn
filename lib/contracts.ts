import type { Action } from './policy';
export type Decision = 'allow' | 'pause' | 'reject';
export type ActionStatus = 'pending' | 'approved' | 'rejected';
export type KairnAction = Action & { tool?: string; arguments?: Record<string, unknown>; agentId?: string };
export type DecisionRecord = { id: string; action: KairnAction; decision: Decision; risk: 'low' | 'medium' | 'high'; reasons: string[]; nextStep: string; reasoningSource: string; status: ActionStatus; evaluatedAt: string };
