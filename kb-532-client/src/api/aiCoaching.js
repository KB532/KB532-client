import axios from 'axios';

export async function askCoach(question) {
  const { data } = await axios.post(
    '/api/coach/ask',
    { question },
    {
      headers: { 'Content-Type': 'application/json' },
      params: { _t: Date.now() },
    },
  );
  return data;
}

export async function getLatestCoach() {
  const { data } = await axios.get('/api/coach/latest', {
    params: { _t: Date.now() },
    headers: { 'Cache-Control': 'no-cache' },
  });
  return data;
}

export async function getCoachById(id) {
  const { data } = await axios.get(`/api/coach/${encodeURIComponent(id)}`, {
    params: { _t: Date.now() },
  });
  return data;
}

export async function pollCoachAnswer({
  getFn = getLatestCoach,
  intervalMs = 4000,
  timeoutMs = 90_000,
} = {}) {
  const start = Date.now();
  let res = await getFn();
  if (res?.data?.answer) return res;

  while (Date.now() - start < timeoutMs) {
    await new Promise((r) => setTimeout(r, intervalMs));
    res = await getFn();
    if (res?.data?.answer) return res;
  }
  return res;
}
