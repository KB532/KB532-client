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
    snacks: 'snacks',
    transport: 'transit',
    uncategorized: 'unclassified',
    undefined: 'unclassified',
    null: 'unclassified',
  };
  if (known.has(lower)) return lower;
  if (aliases[lower]) return aliases[lower];

  const norm = raw
    .replace(/\([^)]*\)/g, '')
    .replace(/[\\/]/g, '·')
    .replace(/[ㆍ·]/g, '·')
    .replace(/[-_]/g, '')
    .replace(/\s+/g, '');

  if (norm.includes('편의점') || norm.includes('마트')) return 'living';
  if (
    norm.includes('카페') ||
    norm.includes('간식') ||
    norm.includes('커피') ||
    norm.includes('디저트') ||
    norm.includes('베이커리')
  )
    return 'snacks';
  if (
    norm.includes('주유') ||
    norm.includes('버스') ||
    norm.includes('지하철') ||
    norm.includes('택시') ||
    norm.includes('주차') ||
    norm.includes('톨게이트')
  )
    return 'transit';
  if (
    norm.includes('전기요금') ||
    norm.includes('수도요금') ||
    norm.includes('가스요금') ||
    norm.includes('임대') ||
    norm.includes('월세') ||
    norm.includes('통신')
  )
    return 'home';
  if (
    norm.includes('병원') ||
    norm.includes('약국') ||
    norm.includes('치과') ||
    norm.includes('검진') ||
    norm.includes('헬스') ||
    norm.includes('피트니스') ||
    norm.includes('필라테스')
  )
    return 'health';
  if (
    norm.includes('수수료') ||
    norm.includes('대출') ||
    norm.includes('보험') ||
    norm.includes('금융') ||
    norm.includes('이자')
  )
    return 'finance';
  if (norm.includes('송금') || norm.includes('이체')) return 'transfer';
  if (norm.includes('외식') || norm.includes('배달') || norm.includes('식비')) return 'food';
  if (norm.includes('쇼핑') || norm.includes('구매')) return 'shopping';
  if (
    norm.includes('수입') ||
    norm.includes('급여') ||
    norm.includes('월급') ||
    norm.includes('상여') ||
    norm.includes('환급')
  )
    return 'income';
  if (norm.includes('기타')) return 'others';

  return 'unclassified';
}

export default iconKeyFromSubcategory;
