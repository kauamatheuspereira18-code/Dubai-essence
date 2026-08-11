import { money, products } from '@/lib/products';

const searchableProducts = products.map((product) => ({
  slug: product.slug,
  name: product.name,
  brand: product.brand,
  family: product.family,
  gender: product.gender,
  tags: product.tags,
  topNotes: product.topNotes,
  heartNotes: product.heartNotes,
  baseNotes: product.baseNotes,
  image: product.images?.[0] ?? '',
  price: money(product.price),
  pixPrice: money(product.pixPrice),
}));

export function SearchOverlay() {
  const productsJson = JSON.stringify(searchableProducts).replace(/</g, '\\u003c');

  return (
    <div className="search-container-de group/search relative flex w-11 justify-end transition-all duration-300 ease-out focus-within:w-[260px] sm:focus-within:w-[340px] md:focus-within:w-[430px]">
      <div className="search-box-de flex h-10 w-full items-center rounded-full border border-gold/35 bg-white/55 px-3 transition focus-within:border-gold focus-within:bg-white focus-within:shadow-gold">
        <label htmlFor="dubai-search-input" id="dubai-search-button" className="mr-0 flex shrink-0 cursor-pointer items-center justify-center bg-transparent text-coffee transition-all duration-300 group-focus-within/search:mr-2" aria-label="Pesquisar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </label>

        <input
          type="text"
          id="dubai-search-input"
          placeholder="Buscar"
          autoComplete="off"
          className="h-full min-w-0 flex-1 border-0 bg-transparent text-sm text-coffee opacity-0 outline-none placeholder:text-coffee/45 transition-opacity duration-200 group-focus-within/search:opacity-100"
        />
      </div>

      <div id="dubai-search-suggestions" style={{ top: 'calc(100% + 12px)' }} className="suggestions-list-de absolute right-0 z-[1000] hidden max-h-[520px] w-[min(92vw,520px)] overflow-y-auto rounded-[1.25rem] border border-gold/25 bg-pearl shadow-2xl" />

      <script
        dangerouslySetInnerHTML={{
          __html: `
(function(){
  var produtos = ${productsJson};
  var input = document.getElementById('dubai-search-input');
  var suggestionsBox = document.getElementById('dubai-search-suggestions');
  var searchButton = document.getElementById('dubai-search-button');

  if (!input || !suggestionsBox || input.dataset.initialized === 'true') return;
  input.dataset.initialized = 'true';

  function normalize(value){
    return String(value || '')
      .normalize('NFD')
      .replace(/[\\u0300-\\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9\\s]/g, ' ')
      .replace(/\\s+/g, ' ')
      .trim();
  }

  function searchableText(product){
    return normalize([
      product.name,
      product.brand,
      product.family,
      product.gender,
      (product.tags || []).join(' '),
      (product.topNotes || []).join(' '),
      (product.heartNotes || []).join(' '),
      (product.baseNotes || []).join(' ')
    ].join(' '));
  }

  function compact(value){
    return normalize(value).replace(/\\s+/g, '');
  }

  function levenshtein(a,b){
    a = compact(a); b = compact(b);
    if (!a || !b) return 99;
    if (Math.abs(a.length - b.length) > 3) return 99;
    var dp = Array(a.length + 1).fill(0).map(function(_,i){ return i; });
    for (var j=1;j<=b.length;j++){
      var prev = dp[0]; dp[0] = j;
      for (var i=1;i<=a.length;i++){
        var temp = dp[i];
        dp[i] = a[i-1] === b[j-1] ? prev : Math.min(prev + 1, dp[i] + 1, dp[i-1] + 1);
        prev = temp;
      }
    }
    return dp[a.length];
  }

  function scoreProduct(product, query){
    var q = normalize(query);
    if (!q) return 0;
    var terms = q.split(' ').filter(Boolean);
    var name = normalize(product.name);
    var brand = normalize(product.brand);
    var family = normalize(product.family);
    var haystack = searchableText(product);
    var hayCompact = compact(haystack);
    var score = 0;

    var allTermsMatch = terms.every(function(term){
      if (haystack.indexOf(term) !== -1 || hayCompact.indexOf(compact(term)) !== -1) return true;
      var tokens = haystack.split(' ').filter(Boolean);
      return tokens.some(function(token){ return term.length >= 4 && levenshtein(term, token) <= 2; });
    });
    if (!allTermsMatch) return 0;

    terms.forEach(function(term){
      if (name.indexOf(term) !== -1) score += 500;
      if (name.indexOf(term) === 0) score += 300;
      if (brand.indexOf(term) !== -1) score += 260;
      if (family.indexOf(term) !== -1) score += 140;
      if (haystack.indexOf(term) !== -1) score += 80;
    });

    if (name === q) score += 900;
    if ((brand + ' ' + name).indexOf(q) !== -1) score += 450;
    return score;
  }

  function search(query){
    var q = normalize(query);
    if (!q) return [];
    return produtos
      .map(function(product, index){ return { product: product, score: scoreProduct(product, q), index: index }; })
      .filter(function(item){ return item.score > 0; })
      .sort(function(a,b){ return b.score - a.score || a.index - b.index; })
      .slice(0, 8)
      .map(function(item){ return item.product; });
  }

  function render(results, query){
    suggestionsBox.innerHTML = '';

    if (!query.trim()) {
      suggestionsBox.style.display = 'none';
      return;
    }

    if (!results.length) {
      var empty = document.createElement('div');
      empty.className = 'px-6 py-8 text-center text-coffee/60';
      empty.textContent = 'Nenhum perfume encontrado para “' + query.trim() + '”.';
      suggestionsBox.appendChild(empty);
      suggestionsBox.style.display = 'block';
      return;
    }

    results.forEach(function(product){
      var item = document.createElement('a');
      item.href = '/produto/' + product.slug;
      item.className = 'grid grid-cols-[72px_1fr] items-center gap-4 px-4 py-4 text-left transition hover:bg-gold/10 md:grid-cols-[88px_1fr_auto]';

      var imageWrap = document.createElement('div');
      imageWrap.className = 'h-16 w-16 overflow-hidden bg-white md:h-20 md:w-20';
      if (product.image) {
        var img = document.createElement('img');
        img.src = product.image;
        img.alt = product.name;
        img.className = 'h-full w-full object-contain p-1.5';
        imageWrap.appendChild(img);
      }

      var info = document.createElement('div');
      info.className = 'min-w-0';
      var title = document.createElement('p');
      title.className = 'text-sm leading-tight text-coffee md:text-base';
      title.innerHTML = product.brand + ' - <strong>' + product.name + '</strong>';
      var family = document.createElement('p');
      family.className = 'mt-1 text-xs text-coffee/60';
      family.textContent = product.family || '';
      var mobilePrice = document.createElement('p');
      mobilePrice.className = 'mt-1 text-sm font-bold text-coffee md:hidden';
      mobilePrice.textContent = product.price;
      info.appendChild(title); info.appendChild(family); info.appendChild(mobilePrice);

      var price = document.createElement('div');
      price.className = 'hidden text-right md:block';
      price.innerHTML = '<p class="text-sm font-bold text-coffee">' + product.price + '</p><p class="mt-1 text-xs font-semibold text-oldgold">' + product.pixPrice + ' via Pix</p>';

      item.appendChild(imageWrap); item.appendChild(info); item.appendChild(price);
      suggestionsBox.appendChild(item);
    });

    suggestionsBox.style.display = 'block';
  }

  input.addEventListener('input', function(){
    var query = input.value;
    render(search(query), query);
  });

  input.addEventListener('focus', function(){
    var query = input.value;
    if (query.trim()) render(search(query), query);
  });

  input.addEventListener('keydown', function(event){
    if (event.key === 'Enter') {
      var results = search(input.value);
      if (results[0]) {
        event.preventDefault();
        window.location.href = '/produto/' + results[0].slug;
      }
    }
    if (event.key === 'Escape') {
      suggestionsBox.style.display = 'none';
      input.blur();
    }
  });

  searchButton.addEventListener('click', function(){
    if (!input.value.trim()) {
      input.focus();
      return;
    }
    var results = search(input.value);
    if (results[0]) window.location.href = '/produto/' + results[0].slug;
    else if (input.value.trim()) window.location.href = '/loja?busca=' + encodeURIComponent(input.value.trim());
  });

  document.addEventListener('click', function(event){
    if (!input.contains(event.target) && !suggestionsBox.contains(event.target) && !searchButton.contains(event.target)) {
      suggestionsBox.style.display = 'none';
      input.blur();
    }
  });
})();
          `,
        }}
      />
    </div>
  );
}
