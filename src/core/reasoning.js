/**
 * SERV boundary. Set SERV_REASONING_URL and SERV_API_KEY when the live
 * reasoning endpoint is available. Until then, Kairn remains deterministic.
 */
export async function enrichDecision(action, localDecision) {
  const endpoint = process.env.SERV_REASONING_URL;
  const apiKey = process.env.SERV_API_KEY;

  if (!endpoint || !apiKey) {
    return { ...localDecision, reasoningSource: 'kairn-policy-engine' };
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ task: 'assess_agent_action', action, localDecision })
  });

  if (!response.ok) {
    throw new Error(`SERV reasoning request failed with status ${response.status}`);
  }

  const reasoning = await response.json();
  return { ...localDecision, reasoning, reasoningSource: 'serv-reasoning' };
}
