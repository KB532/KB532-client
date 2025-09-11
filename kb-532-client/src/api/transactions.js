import axios from 'axios';
import { iconKeyFromSubcategory } from '../utils/subcategoryIcon.js';

// 주간 지출 내역 데이터 조회
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

// 월간 지출 내역 데이터 조회
export async function getMonthlySpending({ month }) {
  const { data } = await axios.get(`/api/transactions/monthly`, { params: { month } });
  const d = data?.data || {};
  const rows = d?.categories || [];

  let categories = rows.map((c, idx) => ({
    key: iconKeyFromSubcategory(c.subcategory),
    label: c.subcategory,
    amount: Number(c.amount) || 0,
    percent: Number(c.percent) || 0,
    _i: idx,
  }));

  categories.sort((a, b) => {
    const order = {
      shopping: 0,
      finance: 0,
      food: 0,
      transfer: 0,
      transit: 0,
      health: 0,
      home: 0,
      living: 0,
      snacks: 0,
      others: 1, // 기타지출
      unclassified: 2, // 미분류
    };
    return (order[a.key] ?? 0) - (order[b.key] ?? 0);
  });

  return {
    month: d.month,
    total: Number(d.total) || 0,
    previousTotal: Number(d.previousTotal) || 0,
    deltaAmount: Number(d.deltaAmount) || 0,
    deltaPercent: Number(d.deltaPercent) || 0,
    categories,
  };
}

export async function listTransactions({ page = 1, size = 50, from, to } = {}) {
  const { data } = await axios.get('/api/transactions', {
    params: { page, size, from, to, _t: Date.now() },
    headers: { 'Cache-Control': 'no-cache' },
  });
  return data?.data ?? { content: [], page: 1, size, totalElements: 0, totalPages: 0 };
}

// 지출 내역 데이터 단건 조회
export async function getTransactionById(id) {
  try {
    const { data } = await axios.get(`/api/transactions/${id}`, {
      headers: { 'Cache-Control': 'no-cache' },
    });

    if (data?.success && data?.data) {
      return data.data;
    }
    return data;
  } catch {
    //
  }
}

// 지출 내역 데이터 수정
export async function updateTransaction(id, payload) {
  try {
    const { data } = await axios.patch(`/api/transactions/${id}`, payload, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (data?.success && data?.data) {
      return data.data;
    }
    return data;
  } catch {
    //
  }
}

// 지출 커테고리 수정
export async function patchTransactionClassification(id, payload) {
  try {
    const { data } = await axios.patch(`/api/transactions/${id}/classification`, payload, {
      params: { _t: Date.now() },
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    });

    if (data?.success && data?.data) return data.data;
    return data?.data ?? data ?? null;
  } catch (err) {
    const msg =
      err?.response?.data?.error?.message ||
      (err?.response ? `HTTP ${err.response.status}` : err?.message) ||
      'Unknown error';
    throw new Error(msg);
  }
}

// 지출 내역 등록
export async function postTransaction(payload) {
  try {
    const { data } = await axios.post(`/api/transactions`, payload, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (data?.success && data?.data) {
      return data;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
}
