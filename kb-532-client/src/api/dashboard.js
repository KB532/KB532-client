import axios from 'axios';

// top3

export async function getMonthlyTop3() {
  const { data } = await axios.get(`/api/dashboard/monthly-top3`);

  const topItems =
    (Array.isArray(data?.topItems) && data.topItems) ||
    (Array.isArray(data?.data?.topItems) && data.data.topItems) ||
    [];

  return topItems
    .slice()
    .sort((a, b) => (a.rank ?? 999) - (b.rank ?? 999))
    .map((it) => ({
      label: it.categoryName,
      amount: it.currentAmount,
      deltaPercent: Math.round(Number(it.changeRate ?? 0)),
      isIncreased: !!it.isIncreased,
      rank: it.rank,
    }));
}

// weekly-nudges

export function defaultWeekStart(date = new Date()) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day;
  d.setDate(d.getDate() - diff);
  d.setHours(0, 0, 0, 0);
  return d.toISOString().slice(0, 10);
}

export async function getWeeklyNudges(weekStart = defaultWeekStart()) {
  try {
    const { data } = await axios.get('/api/dashboard/weekly-nudges', {
      params: { weekStart, _t: Date.now() },
      headers: { 'Cache-Control': 'no-cache' },
    });
    return data;
  } catch (err) {
    const msg =
      err?.response?.data?.error?.message ||
      `HTTP ${err?.response?.status || ''}`.trim() ||
      err.message ||
      'Unknown error';
    throw new Error(msg);
  }
}
