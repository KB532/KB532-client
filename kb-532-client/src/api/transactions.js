import axios from 'axios';

// weekly
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

// monthly

// 표준 키
const KEY = {
  shopping: 'shopping',
  finance: 'finance',
  food: 'food',
  transfer: 'transfer',
  transit: 'transit',
  health: 'health',
  home: 'home',
  living: 'living',
  snacks: 'snacks',
  others: 'others',
  unclassified: 'unclassified',
};

// 한글 → 내부키 매핑 (여러 변형을 커버)
function mapKorToKey(raw = '') {
  const s = String(raw)
    .trim()
    .replace(/\s+/g, '')
    .replace(/[/•ㆍ]/g, '·');

  if (s === '쇼핑') return KEY.shopping;
  if (s === '보험·대출·기타금융' || s === '보험/대출/기타금융') return KEY.finance;
  if (s === '식비') return KEY.food;
  if (s === '이체') return KEY.transfer;
  if (s === '교통') return KEY.transit;
  if (s === '의료·건강·피트니스' || s === '의료/건강/피트니스') return KEY.health;
  if (s === '주거·통신' || s === '주거/통신') return KEY.home;
  if (s === '생활') return KEY.living;
  if (s === '카페·간식' || s === '카페/간식') return KEY.snacks;

  // 분리 처리
  if (s === '기타지출' || s === '기타·지출' || s === '기타') return KEY.others;
  if (s === '미분류') return KEY.unclassified;

  return KEY.others;
}

export async function getMonthlySpending({ month }) {
  const { data } = await axios.get(`/api/transactions/monthly`, { params: { month } });
  const d = data?.data || {};
  const rows = d?.categories || [];

  let categories = rows.map((c, idx) => ({
    key: mapKorToKey(c.subcategory),
    label: c.subcategory,
    amount: Number(c.amount) || 0,
    percent: Number(c.percent) || 0,
    _i: idx,
  }));

  // 정렬: 기타지출(others) → 미분류(unclassified)를 맨 뒤에
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
      unclassified: 2, // 미분류 (더 아래)
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
