import axios from 'axios';

export async function getWeeklySpending({ weeks = 5 } = {}) {
  try {
    const { data } = await axios.get(`/api/transactions/weekly`, {
      params: { weeks },
    });

    const avg = data?.data?.average || 0;
    const rows = data?.data?.series || [];

    return {
      average: avg,
      weeks: rows.map((r) => ({
        label: r.label ?? '',
        amount: Number(r.amount) || 0,
        current: Boolean(r.current ?? r.currentWeek),
        start: r.start,
        end: r.end,
      })),
    };
  } catch (err) {
    const msg =
      err.response?.data?.error?.message || `HTTP ${err.response?.status || ''}` || err.message;
    throw new Error(msg);
  }
}
