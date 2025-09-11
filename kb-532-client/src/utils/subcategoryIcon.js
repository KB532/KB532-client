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

  if (norm.includes('생활')) return 'living';
  if (norm.includes('카페') || norm.includes('간식'))
    return 'snacks';
  if (norm.includes('교통'))
    return 'transit';
  if (norm.includes('주거') || norm.includes('통신'))
    return 'home';
  if (norm.includes('의료') || norm.includes('건강') || norm.includes('피트니스'))
    return 'health';
  if (norm.includes('보험') || norm.includes('대출') || norm.includes('기타금융'))
    return 'finance';
  if (norm.includes('송금') || norm.includes('이체'))
    return 'transfer';
  if (norm.includes('식비'))
    return 'food';
  if (norm.includes('쇼핑'))
    return 'shopping';
  if (
    norm.includes('수입') ||
    norm.includes('급여') ||
    norm.includes('월급') ||
    norm.includes('상여') ||
    norm.includes('환급')
  )
    return 'income';
  if (norm.includes('기타'))
    return 'others';

  return 'unclassified';
}

export default iconKeyFromSubcategory;
