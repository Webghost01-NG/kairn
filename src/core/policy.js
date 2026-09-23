const decisions = Object.freeze({
  ALLOW: 'allow',
  PAUSE: 'pause',
  REJECT: 'reject'
});

export function evaluateAction(action) {
  const reasons = [];
  const amount = Number(action.amount || 0);
  const maxPayment = Number(action.policy?.maxPayment ?? 10);
  const requestedData = action.requestedData || [];

  if (amount > maxPayment) {
    reasons.push(`Payment exceeds policy limit by ${trimNumber(amount / maxPayment)}x`);
  }

  if (requestedData.some((item) => /private|customer|secret/i.test(item))) {
    reasons.push('Action requests private or sensitive data');
  }

  if (!action.recipient && /pay|transfer|send/i.test(action.action || '')) {
    reasons.push('Financial action has no recipient');
  }

  const decision = reasons.length === 0
    ? decisions.ALLOW
    : reasons.some((reason) => /private|sensitive|no recipient/i.test(reason))
      ? decisions.REJECT
      : decisions.PAUSE;

  return {
    decision,
    risk: decision === decisions.ALLOW ? 'low' : decision === decisions.PAUSE ? 'medium' : 'high',
    reasons,
    nextStep: decision === decisions.ALLOW ? 'Forward to the requested tool' : 'Require human approval or revise the action',
    evaluatedAt: new Date().toISOString()
  };
}

function trimNumber(value) {
  return Number.isInteger(value) ? value : value.toFixed(1);
}
