import type { Product } from './products';

export function normalizeSearch(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function compact(value: string) {
  return normalizeSearch(value).replace(/\s+/g, '');
}

function isSubsequence(query: string, target: string) {
  let i = 0;
  for (const char of target) if (char === query[i]) i += 1;
  return i === query.length;
}

function levenshtein(a: string, b: string) {
  if (Math.abs(a.length - b.length) > 3) return 99;
  const dp = Array.from({ length: a.length + 1 }, (_, i) => i);
  for (let j = 1; j <= b.length; j++) {
    let prev = dp[0];
    dp[0] = j;
    for (let i = 1; i <= a.length; i++) {
      const temp = dp[i];
      dp[i] = a[i - 1] === b[j - 1] ? prev : Math.min(prev + 1, dp[i] + 1, dp[i - 1] + 1);
      prev = temp;
    }
  }
  return dp[a.length];
}

export function productSearchScore(product: Product, query: string) {
  const q = normalizeSearch(query);
  if (!q) return 0;

  const name = normalizeSearch(product.name);
  const brand = normalizeSearch(product.brand);
  const family = normalizeSearch(product.family);
  const tokens = [...name.split(' '), ...brand.split(' '), ...family.split(' ')].filter(Boolean);
  const haystack = normalizeSearch([
    product.name,
    product.brand,
    product.family,
    product.gender,
    product.tags.join(' '),
    product.topNotes.join(' '),
    product.heartNotes.join(' '),
    product.baseNotes.join(' '),
  ].join(' '));

  const qCompact = compact(q);
  const nameCompact = compact(name);
  const hayCompact = compact(haystack);

  let score = 0;

  if (name === q) score += 1200;
  if (`${brand} ${name}` === q) score += 1300;
  if (name.startsWith(q)) score += 1000;
  if (brand.startsWith(q)) score += 720;
  if (name.includes(q)) score += 700;
  if (haystack.includes(q)) score += 420;
  if (nameCompact.includes(qCompact)) score += 560;
  if (hayCompact.includes(qCompact)) score += 300;
  if (isSubsequence(qCompact, nameCompact) && qCompact.length >= 3) score += 180;

  for (const part of q.split(' ')) {
    if (!part) continue;
    for (const token of tokens) {
      if (token.startsWith(part)) score += 190;
      if (token.includes(part)) score += 95;
      const distance = levenshtein(part, token);
      if (part.length >= 4 && distance <= 1) score += 220;
      if (part.length >= 5 && distance === 2) score += 130;
    }
  }

  // Strong synonyms / common misspellings for products in this catalog.
  const aliases: Record<string, string[]> = {
    'lattafa-khamrah': ['camra', 'kamrah', 'khamra', 'kambra', 'khamrah'],
    'lattafa-khamrah-qahwa': ['camra qahwa', 'kamrah qahwa', 'qahwa', 'kahwa'],
    'lattafa-asad-bourbon': ['asad', 'asa', 'bourbon'],
    'lattafa-asad-zanzibar': ['asad zanzibar', 'zanzibar'],
    'dior-sauvage-parfum': ['sauvag', 'savage', 'sauvage'],
    'dolce-gabbana-light-blue': ['light blu', 'lightblue', 'dolce', 'gabbana'],
    'armaf-club-de-nuit-untold': ['club nuit', 'club de nuit', 'untold'],
    'lattafa-fakhar-rose': ['fakh', 'fakhar'],
  };

  for (const alias of aliases[product.slug] ?? []) {
    const a = normalizeSearch(alias);
    if (a.includes(q) || q.includes(a) || levenshtein(qCompact, compact(a)) <= 2) score += 900;
  }

  return score;
}

export function searchProducts(products: Product[], query: string, limit = 8) {
  const q = normalizeSearch(query);
  if (!q) return products.slice(0, limit);
  return products
    .map((product, index) => ({ product, score: productSearchScore(product, q), index }))
    .filter((item) => item.score >= 250)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .slice(0, limit)
    .map((item) => item.product);
}

export function searchProductsAll(products: Product[], query: string) {
  const q = normalizeSearch(query);
  if (!q) return products;
  return products
    .map((product, index) => ({ product, score: productSearchScore(product, q), index }))
    .filter((item) => item.score >= 250)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map((item) => item.product);
}
