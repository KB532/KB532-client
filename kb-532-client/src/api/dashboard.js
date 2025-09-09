import axios from 'axios';

const BASE = import.meta.env?.VITE_API_BASE || '/api';

export async function getMonthlyTop3() {
  const { data } = await axios.get(`${BASE}/dashboard/monthly-top3`);

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
