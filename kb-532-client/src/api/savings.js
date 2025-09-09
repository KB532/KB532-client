import axios from 'axios';

export async function getSavingsTrend({ months = 6 } = {}) {
  try {
    const { data } = await axios.get(`/api/transactions/savings/trend`, {
      params: { months },
    });

    const payload = data?.data ?? { months, total: 0, series: [] };

    const normalized = (payload.series || []).map((it) => ({
      label: it.label,
      amount: Number(it.amount) || 0,
    }));

    return {
      months: Number(payload.months) || months,
      total: Number(payload.total) || 0,
      series: normalized,
      raw: data,
    };
  } catch (err) {
    const msg =
      err.response?.data?.error?.message || `HTTP ${err.response?.status || ''}` || err.message;
    throw new Error(msg);
  }
}
