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
