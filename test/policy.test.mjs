import assert from 'node:assert/strict';
import { evaluateAction } from '../lib/policy.ts';
assert.equal(evaluateAction({ action: 'pay', amount: 2, recipient: '0x1' }).decision, 'allow');
assert.equal(evaluateAction({ action: 'pay', amount: 20, recipient: '0x1' }).decision, 'pause');
assert.equal(evaluateAction({ action: 'pay', amount: 2, requestedData: ['customer_email'] }).decision, 'reject');
assert.equal(evaluateAction({ action: 'pay', amount: -1, recipient: '0x1' }).decision, 'reject');
console.log('Kairn policy tests passed');
