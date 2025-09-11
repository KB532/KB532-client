export function iconKeyFromSubcategory(input) {
  const raw = String(input ?? '')
    .normalize('NFC')
    .trim();
  if (!raw) return 'unclassified';

  const lower = raw.toLowerCase();
  const known = new Set([
    'shopping',
    'finance',
    'food',
    'transfer',
    'transit',
    'health',
    'home',
    'living',
    'snacks',
    'income',
    'others',
    'unclassified',
  ]);
  const aliases = {
    snack: 'snacks',
    transport: 'transit',
    uncategorized: 'unclassified',
  };
  if (known.has(lower)) return lower;
  if (aliases[lower]) return aliases[lower];

  const norm = raw.replace(/[/\]/g, '·').replace(/[ㆍ·]/g, '·').replace(/\s+/g, '');

  const exact = {
    쇼핑: 'shopping',
    '카페·간식': 'snacks',
    간식: 'snacks',
    외식: 'food',
    식비: 'food',

    교통: 'transit',
    대중교통: 'transit',
    택시: 'transit',
    주유: 'transit',
    버스: 'transit',

    '마트·편의점': 'living',
    편의점: 'living',
    생활: 'living',

    '주거·통신': 'home',
    '주거·관리비': 'home',
    관리비: 'home',
    통신: 'home',

    '의료·건강·피트니스': 'health',
    '의료·건강': 'health',
    병원: 'health',
    약국: 'health',

    '보험·대출기타·금융': 'finance',
    '금융·수수료': 'finance',
    수수료: 'finance',

    이체: 'transfer',
    '이체·송금': 'transfer',

    기타지출: 'others',
    수입: 'income',
    미분류: 'unclassified',
  };
  if (exact[norm]) return exact[norm];

  return 'unclassified';
}
