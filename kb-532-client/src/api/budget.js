import axios from 'axios';

function defaultMonthRange(date = new Date()) {
  const y = date.getFullYear();
  const m = date.getMonth();
  const iso = (d) => d.toISOString().slice(0, 10);
  return { from: iso(new Date(y, m, 1)), to: iso(new Date(y, m + 1, 0)) };
}

export async function getBudgetSummary(params = {}) {
  const { from, to } = { ...defaultMonthRange(), ...params };
  try {
    const { data } = await axios.get(`/api/budget/summary`, {
      params: { from, to },
    });
    return data;
  } catch (err) {
    const msg =
      err.response?.data?.error?.message || `HTTP ${err.response?.status || ''}` || err.message;
    throw new Error(msg);
  }
}
