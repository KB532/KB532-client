import axios from 'axios';

// summary
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

// target
function formatLocalDate(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export async function saveBudgetTargets({ essential, discretionary, savings }) {
  const E = +(Number(essential) / 100).toFixed(4);
  const D = +(Number(discretionary) / 100).toFixed(4);
  const S = +(Number(savings) / 100).toFixed(4);

  const payload = {
    effectiveFrom: formatLocalDate(),
    ESSENTIAL: E,
    DISCRETIONARY: D,
    SAVINGS: S,
  };

  try {
    const { data } = await axios.post('/api/budget/targets', payload, {
      headers: { 'Content-Type': 'application/json' },
    });
    return data;
  } catch (err) {
    console.error('POST /budget/targets 실패:', err.response?.status, err.response?.data);
    const msg =
      err.response?.data?.error?.message ||
      err.response?.data?.message ||
      `HTTP ${err.response?.status || ''}`;
    throw new Error(msg);
  }
}
