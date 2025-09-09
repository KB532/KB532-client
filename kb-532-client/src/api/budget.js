import axios from 'axios';

// 공통

function defaultMonthRange(date = new Date()) {
  const y = date.getFullYear();
  const m = date.getMonth();
  const iso = (d) => d.toISOString().slice(0, 10);
  return { from: iso(new Date(y, m, 1)), to: iso(new Date(y, m + 1, 0)) };
}

function formatLocalDate(d = new Date()) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

const KEY_MAP = {
  ESSENTIAL: 'essential',
  DISCRETIONARY: 'discretionary',
  SAVINGS: 'savings',
};
const toPct = (v) => Math.round(Number(v || 0) * 100);

// summary

export async function getBudgetSummary(params = {}) {
  const { from, to } = { ...defaultMonthRange(), ...params };
  try {
    const { data } = await axios.get(`/api/budget/summary`, { params: { from, to } });
    return data;
  } catch (err) {
    const msg =
      err.response?.data?.error?.message || `HTTP ${err.response?.status || ''}` || err.message;
    throw new Error(msg);
  }
}

// (post)targets

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
    const { data } = await axios.post(`/api/budget/targets`, payload, {
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

// (get)targets

export async function getBudgetTargetsRaw() {
  try {
    const { data } = await axios.get(`/api/budget/targets`, {
      headers: { 'Cache-Control': 'no-cache' },
      params: { _t: Date.now() },
    });
    const rows = Array.isArray(data) ? data : (data?.data ?? []);
    return Array.isArray(rows) ? rows : [];
  } catch (err) {
    const msg =
      err.response?.data?.error?.message || `HTTP ${err.response?.status || ''}` || err.message;
    throw new Error(msg);
  }
}

// id 내림차순 -> 최신 1개
export async function getLatestBudgetTarget() {
  const rows = await getBudgetTargetsRaw();

  if (!rows.length) {
    return { essential: 50, discretionary: 30, savings: 20 };
  }

  const valid = rows
    .filter((r) => r && r.ratio)
    .map((r) => ({
      ...r,
      _id: Number.isFinite(Number(r.id)) ? Number(r.id) : -Infinity,
    }));

  if (!valid.length) {
    return { essential: 50, discretionary: 30, savings: 20 };
  }

  valid.sort((a, b) => b._id - a._id);

  const latest = valid[0];
  const ratio = latest.ratio || latest.ratios || latest.RATIO || {};

  const mapped = Object.entries(ratio).reduce((acc, [k, v]) => {
    const key = KEY_MAP[k] ?? k?.toLowerCase?.() ?? k;
    const num = Number(v);
    acc[key] = num <= 1 ? toPct(num) : Math.round(num);
    return acc;
  }, {});

  return {
    essential: mapped.essential ?? 50,
    discretionary: mapped.discretionary ?? 30,
    savings: mapped.savings ?? 20,
  };
}
