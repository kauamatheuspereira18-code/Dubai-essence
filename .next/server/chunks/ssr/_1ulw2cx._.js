module.exports=[33290,a=>{"use strict";var b=a.i(7997),c=a.i(3236),d=a.i(95936),e=a.i(92277);let f=(0,e.default)("heart",[["path",{d:"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",key:"mvr1a0"}]]),g=(0,e.default)("shopping-bag",[["path",{d:"M16 10a4 4 0 0 1-8 0",key:"1ltviw"}],["path",{d:"M3.103 6.034h17.794",key:"awc11p"}],["path",{d:"M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z",key:"o988cm"}]]);var h=a.i(9152);let i=h.products.map(a=>({slug:a.slug,name:a.name,brand:a.brand,family:a.family,gender:a.gender,tags:a.tags,topNotes:a.topNotes,heartNotes:a.heartNotes,baseNotes:a.baseNotes,image:a.images?.[0]??"",price:(0,h.money)(a.price)}));function j(){let a=JSON.stringify(i).replace(/</g,"\\u003c");return(0,b.jsxs)("div",{className:"search-container-de group/search relative flex w-11 justify-end transition-all duration-300 ease-out focus-within:w-[260px] sm:focus-within:w-[340px] md:focus-within:w-[430px]",children:[(0,b.jsxs)("div",{className:"search-box-de flex h-10 w-full items-center rounded-full border border-gold/35 bg-white/55 px-3 transition focus-within:border-gold focus-within:bg-white focus-within:shadow-gold",children:[(0,b.jsx)("label",{htmlFor:"dubai-search-input",id:"dubai-search-button",className:"mr-0 flex shrink-0 cursor-pointer items-center justify-center bg-transparent text-coffee transition-all duration-300 group-focus-within/search:mr-2","aria-label":"Pesquisar",children:(0,b.jsxs)("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:[(0,b.jsx)("circle",{cx:"11",cy:"11",r:"8"}),(0,b.jsx)("path",{d:"m21 21-4.3-4.3"})]})}),(0,b.jsx)("input",{type:"text",id:"dubai-search-input",placeholder:"Buscar",autoComplete:"off",className:"h-full min-w-0 flex-1 border-0 bg-transparent text-sm text-coffee opacity-0 outline-none placeholder:text-coffee/45 transition-opacity duration-200 group-focus-within/search:opacity-100"})]}),(0,b.jsx)("div",{id:"dubai-search-suggestions",style:{top:"calc(100% + 12px)"},className:"suggestions-list-de absolute right-0 z-[1000] hidden max-h-[520px] w-[min(92vw,520px)] overflow-y-auto rounded-[1.25rem] border border-gold/25 bg-pearl shadow-2xl"}),(0,b.jsx)("script",{dangerouslySetInnerHTML:{__html:`
(function(){
  var produtos = ${a};
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
      price.innerHTML = '<p class="text-sm font-bold text-coffee">' + product.price + '</p>';

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
          `}})]})}function k(){return(0,b.jsxs)("header",{className:"sticky top-0 z-50 border-b border-gold/25 bg-pearl/95 shadow-sm backdrop-blur",children:[(0,b.jsx)("div",{className:"bg-gold/15 px-2 py-2 text-center text-[9px] font-semibold uppercase tracking-[.12em] text-oldgold sm:px-4 sm:text-[11px] sm:tracking-[.18em]",children:"Perfumes originais • Atendimento pelo WhatsApp • SJP / CWB / Itapoá SC"}),(0,b.jsxs)("div",{className:"mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4",children:[(0,b.jsxs)(d.default,{href:"/",className:"flex shrink-0 items-center gap-3",children:[(0,b.jsx)(c.default,{src:"/logo.png",alt:"Dubai Essence",width:58,height:58,className:"rounded-full ring-1 ring-gold/40"}),(0,b.jsxs)("div",{className:"hidden sm:block",children:[(0,b.jsx)("p",{className:"font-serif text-xl tracking-[.18em] gold-text",children:"DUBAI"}),(0,b.jsx)("p",{className:"-mt-1 text-[10px] tracking-[.38em] text-oldgold",children:"ESSENCE"})]})]}),(0,b.jsxs)("div",{className:"flex shrink-0 items-center gap-3",children:[(0,b.jsx)(j,{}),(0,b.jsx)(d.default,{href:"/favoritos",className:"hidden md:block","aria-label":"Favoritos",children:(0,b.jsx)(f,{size:20})}),(0,b.jsx)(d.default,{href:"/carrinho",className:"hidden md:block","aria-label":"Carrinho",children:(0,b.jsx)(g,{size:20})})]})]})]})}var l=a.i(98863),m=a.i(85978),n=a.i(58288);let o=(0,e.default)("gem",[["path",{d:"M10.5 3 8 9l4 13 4-13-2.5-6",key:"b3dvk1"}],["path",{d:"M17 3a2 2 0 0 1 1.6.8l3 4a2 2 0 0 1 .013 2.382l-7.99 10.986a2 2 0 0 1-3.247 0l-7.99-10.986A2 2 0 0 1 2.4 7.8l2.998-3.997A2 2 0 0 1 7 3z",key:"7w4byz"}],["path",{d:"M2 9h20",key:"16fsjt"}]]);function p(){return(0,b.jsxs)("footer",{className:"border-t border-gold/25 bg-desert/45 text-coffee",children:[(0,b.jsxs)("section",{className:"mx-auto grid max-w-7xl gap-4 px-4 py-8 md:grid-cols-3",children:[(0,b.jsxs)("div",{className:"flex gap-3",children:[(0,b.jsx)(o,{className:"text-gold"}),(0,b.jsxs)("div",{children:[(0,b.jsx)("b",{children:"Curadoria premium"}),(0,b.jsx)("p",{className:"text-sm text-coffee/65",children:"Fragrâncias originais e marcantes."})]})]}),(0,b.jsxs)("div",{className:"flex gap-3",children:[(0,b.jsx)(n.Truck,{className:"text-gold"}),(0,b.jsxs)("div",{children:[(0,b.jsx)("b",{children:"Atendimento regional"}),(0,b.jsx)("p",{className:"text-sm text-coffee/65",children:"SJP / CWB / Itapoá SC."})]})]}),(0,b.jsxs)("div",{className:"flex gap-3",children:[(0,b.jsx)(m.ShieldCheck,{className:"text-gold"}),(0,b.jsxs)("div",{children:[(0,b.jsx)("b",{children:"Compra segura"}),(0,b.jsx)("p",{className:"text-sm text-coffee/65",children:"Conversão direta pelo WhatsApp oficial."})]})]})]}),(0,b.jsx)("div",{className:"border-y border-gold/20 bg-pearl/60",children:(0,b.jsxs)("div",{className:"mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-4",children:[(0,b.jsxs)("div",{children:[(0,b.jsx)(c.default,{src:"/logo.png",alt:"Dubai Essence",width:96,height:96,className:"rounded-full"}),(0,b.jsx)("p",{className:"mt-4 text-sm text-coffee/65",children:"Fragrâncias exclusivas e marcantes."})]}),(0,b.jsxs)("div",{children:[(0,b.jsx)("h3",{className:"mb-3 font-serif text-lg text-oldgold",children:"Loja"}),(0,b.jsx)(d.default,{className:"block py-1 text-sm text-coffee/65",href:"/loja",children:"Todos os perfumes"}),(0,b.jsx)(d.default,{className:"block py-1 text-sm text-coffee/65",href:"/marcas",children:"Marcas"}),(0,b.jsx)(d.default,{className:"block py-1 text-sm text-coffee/65",href:"/favoritos",children:"Favoritos"}),(0,b.jsx)(d.default,{className:"block py-1 text-sm text-coffee/65",href:"/pedidos",children:"Pedidos"})]}),(0,b.jsxs)("div",{children:[(0,b.jsx)("h3",{className:"mb-3 font-serif text-lg text-oldgold",children:"Institucional"}),[["Sobre","/sobre"],["Contato","/contato"],["FAQ","/faq"],["Privacidade","/politica-de-privacidade"],["Trocas","/politica-de-troca"],["Termos","/termos-de-uso"]].map(a=>(0,b.jsx)(d.default,{className:"block py-1 text-sm text-coffee/65",href:a[1],children:a[0]},a[1]))]}),(0,b.jsxs)("div",{children:[(0,b.jsx)("h3",{className:"mb-3 font-serif text-lg text-oldgold",children:"Contato"}),(0,b.jsxs)("a",{className:"mb-2 flex gap-2 text-sm text-coffee/75",href:"https://wa.me/5541997095511",children:[(0,b.jsx)(l.MessageCircle,{size:18})," (41) 99709-5511"]}),(0,b.jsxs)("a",{className:"flex gap-2 text-sm text-coffee/75",href:"https://www.instagram.com/dubaiemessence/",children:[(0,b.jsx)("span",{className:"text-gold",children:"◎"})," @dubaiemessence"]}),(0,b.jsx)("p",{className:"mt-4 text-xs text-coffee/45",children:"Sem e-mail informado."})]})]})}),(0,b.jsxs)("div",{className:"mx-auto flex max-w-7xl flex-col justify-between gap-2 px-4 py-5 text-xs text-coffee/50 md:flex-row",children:[(0,b.jsx)("p",{children:"© 2026 Dubai Essence. Todos os direitos reservados."}),(0,b.jsx)("p",{children:"Projeto autoral de e-commerce premium."})]})]})}a.s(["default",0,function({children:a}){return(0,b.jsx)("html",{lang:"pt-BR",children:(0,b.jsxs)("body",{children:[(0,b.jsx)(k,{}),(0,b.jsx)("main",{children:a}),(0,b.jsx)(p,{})]})})},"metadata",0,{title:{default:"Dubai Essence | Perfumes Árabes Premium",template:"%s | Dubai Essence"},description:"Loja premium de perfumes árabes originais. Fragrâncias exclusivas e marcantes em SJP, CWB e Itapoá SC.",icons:{icon:"/logo.png"},openGraph:{title:"Dubai Essence",description:"Perfumes árabes originais com elegância e sofisticação.",images:["/logo.png"]}}],33290)},70864,function(a){a.n(a.i(33290))},71029,(a,b,c)=>{"use strict";c._=function(a){return a&&a.__esModule?a:{default:a}}},64240,(a,b,c)=>{"use strict";function d(a){if("function"!=typeof WeakMap)return null;var b=new WeakMap,c=new WeakMap;return(d=function(a){return a?c:b})(a)}c._=function(a,b){if(!b&&a&&a.__esModule)return a;if(null===a||"object"!=typeof a&&"function"!=typeof a)return{default:a};var c=d(b);if(c&&c.has(a))return c.get(a);var e={__proto__:null},f=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var g in a)if("default"!==g&&Object.prototype.hasOwnProperty.call(a,g)){var h=f?Object.getOwnPropertyDescriptor(a,g):null;h&&(h.get||h.set)?Object.defineProperty(e,g,h):e[g]=a[g]}return e.default=a,c&&c.set(a,e),e}},90697,a=>{"use strict";a.s(["default",()=>b]);let b=(0,a.i(11857).registerClientReference)(function(){throw Error("Attempted to call the default export of [project]/node_modules/lucide-react/dist/esm/Icon.mjs from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/node_modules/lucide-react/dist/esm/Icon.mjs","default")},53808,a=>{"use strict";var b=a.i(90697);a.n(b)},92277,a=>{"use strict";var b=a.i(717);let c=a=>{let b=a.replace(/^([A-Z])|[\s-_]+(\w)/g,(a,b,c)=>c?c.toUpperCase():b.toLowerCase());return b.charAt(0).toUpperCase()+b.slice(1)};var d=a.i(53808);a.s(["default",0,(a,e)=>{let f=(0,b.forwardRef)(({className:f,...g},h)=>(0,b.createElement)(d.default,{ref:h,iconNode:e,className:((...a)=>a.filter((a,b,c)=>!!a&&""!==a.trim()&&c.indexOf(a)===b).join(" ").trim())(`lucide-${c(a).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${a}`,f),...g}));return f.displayName=c(a),f}],92277)},98863,a=>{"use strict";let b=(0,a.i(92277).default)("message-circle",[["path",{d:"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",key:"1sd12s"}]]);a.s(["MessageCircle",0,b],98863)},85978,58288,a=>{"use strict";var b=a.i(92277);let c=(0,b.default)("shield-check",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);a.s(["ShieldCheck",0,c],85978);let d=(0,b.default)("truck",[["path",{d:"M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2",key:"wrbu53"}],["path",{d:"M15 18H9",key:"1lyqi6"}],["path",{d:"M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",key:"lysw3i"}],["circle",{cx:"17",cy:"18",r:"2",key:"332jqn"}],["circle",{cx:"7",cy:"18",r:"2",key:"19iecd"}]]);a.s(["Truck",0,d],58288)},84707,(a,b,c)=>{let{createClientModuleProxy:d}=a.r(11857);a.n(d("[project]/node_modules/next/dist/client/app-dir/link.js"))},97647,a=>{"use strict";var b=a.i(84707);a.n(b)},95936,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});var d={default:function(){return i},useLinkStatus:function(){return h.useLinkStatus}};for(var e in d)Object.defineProperty(c,e,{enumerable:!0,get:d[e]});let f=a.r(64240),g=a.r(7997),h=f._(a.r(97647));function i(a){let b=a.legacyBehavior,c="string"==typeof a.children||"number"==typeof a.children||"string"==typeof a.children?.type,d=a.children?.type?.$$typeof===Symbol.for("react.client.reference");return!b||c||d||(a.children?.type?.$$typeof===Symbol.for("react.lazy")?console.error("Using a Lazy Component as a direct child of `<Link legacyBehavior>` from a Server Component is not supported. If you need legacyBehavior, wrap your Lazy Component in a Client Component that renders the Link's `<a>` tag."):console.error("Using a Server Component as a direct child of `<Link legacyBehavior>` is not supported. If you need legacyBehavior, wrap your Server Component in a Client Component that renders the Link's `<a>` tag.")),(0,g.jsx)(h.default,{...a})}("function"==typeof c.default||"object"==typeof c.default&&null!==c.default)&&void 0===c.default.__esModule&&(Object.defineProperty(c.default,"__esModule",{value:!0}),Object.assign(c.default,c),b.exports=c.default)},43489,(a,b,c)=>{let{createClientModuleProxy:d}=a.r(11857);a.n(d("[project]/node_modules/next/dist/client/image-component.js"))},18409,a=>{"use strict";var b=a.i(43489);a.n(b)},53200,(a,b,c)=>{"use strict";function d(a,b){let c=a||75;return b?.qualities?.length?b.qualities.reduce((a,b)=>Math.abs(b-c)<Math.abs(a-c)?b:a,b.qualities[0]):c}Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"findClosestQuality",{enumerable:!0,get:function(){return d}})},37763,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"default",{enumerable:!0,get:function(){return g}});let d=a.r(53200),e=a.r(29945);function f({config:a,src:b,width:c,quality:g}){let h=(0,e.getDeploymentId)();if(b.startsWith("/")&&!b.startsWith("//"))if(b.includes("/_next/static/immutable")&&!(0,e.getAssetToken)())h=void 0;else{let a=b.indexOf("?");if(-1!==a){let c=new URLSearchParams(b.slice(a+1)),d=c.get("dpl");if(d){h=d,c.delete("dpl");let e=c.toString();b=b.slice(0,a)+(e?"?"+e:"")}}}if(b.startsWith("/")&&b.includes("?")&&a.localPatterns?.length===1&&"**"===a.localPatterns[0].pathname&&""===a.localPatterns[0].search)throw Object.defineProperty(Error(`Image with src "${b}" is using a query string which is not configured in images.localPatterns.
Read more: https://nextjs.org/docs/messages/next-image-unconfigured-localpatterns`),"__NEXT_ERROR_CODE",{value:"E871",enumerable:!1,configurable:!0});let i=(0,d.findClosestQuality)(g,a);return`${a.path}?url=${encodeURIComponent(b)}&w=${c}&q=${i}${b.startsWith("/")&&h?`&dpl=${h}`:""}`}f.__next_img_default=!0;let g=f},50858,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});var d={default:function(){return k},getImageProps:function(){return j}};for(var e in d)Object.defineProperty(c,e,{enumerable:!0,get:d[e]});let f=a.r(71029),g=a.r(87713),h=a.r(18409),i=f._(a.r(37763));function j(a){let{props:b}=(0,g.getImgProps)(a,{defaultLoader:i.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],qualities:[75],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!1}});for(let[a,c]of Object.entries(b))void 0===c&&delete b[a];return{props:b}}let k=h.Image},3236,(a,b,c)=>{b.exports=a.r(50858)},29945,(a,b,c)=>{"use strict";let d;Object.defineProperty(c,"__esModule",{value:!0});var e={getAssetToken:function(){return i},getAssetTokenQuery:function(){return j},getDeploymentId:function(){return g},getDeploymentIdQuery:function(){return h}};for(var f in e)Object.defineProperty(c,f,{enumerable:!0,get:e[f]});function g(){return d}function h(a=!1){return d?`${a?"&":"?"}dpl=${d}`:""}function i(){return!1}function j(a=!1){return""}d=void 0},1359,(a,b,c)=>{"use strict";function d({widthInt:a,heightInt:b,blurWidth:c,blurHeight:e,blurDataURL:f,objectFit:g}){let h=c?40*c:a,i=e?40*e:b,j=h&&i?`viewBox='0 0 ${h} ${i}'`:"";return`%3Csvg xmlns='http://www.w3.org/2000/svg' ${j}%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='${j?"none":"contain"===g?"xMidYMid":"cover"===g?"xMidYMid slice":"none"}' style='filter: url(%23b);' href='${f}'/%3E%3C/svg%3E`}Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"getImageBlurSvg",{enumerable:!0,get:function(){return d}})},53549,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});var d={VALID_LOADERS:function(){return f},imageConfigDefault:function(){return g}};for(var e in d)Object.defineProperty(c,e,{enumerable:!0,get:d[e]});let f=["default","imgix","cloudinary","akamai","custom"],g={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],path:"/_next/image",loader:"default",loaderFile:"",domains:[],disableStaticImages:!1,minimumCacheTTL:14400,formats:["image/webp"],maximumDiskCacheSize:void 0,maximumRedirects:3,maximumResponseBody:5e7,dangerouslyAllowLocalIP:!1,dangerouslyAllowSVG:!1,contentSecurityPolicy:"script-src 'none'; frame-src 'none'; sandbox;",contentDispositionType:"attachment",localPatterns:void 0,remotePatterns:[],qualities:[75],unoptimized:!1,customCacheHandler:!1}},87713,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"getImgProps",{enumerable:!0,get:function(){return j}});let d=a.r(29945),e=a.r(1359),f=a.r(53549),g=["-moz-initial","fill","none","scale-down",void 0];function h(a){return void 0!==a.default}function i(a){return void 0===a?a:"number"==typeof a?Number.isFinite(a)?a:NaN:"string"==typeof a&&/^[0-9]+$/.test(a)?parseInt(a,10):NaN}function j({src:a,sizes:b,unoptimized:c=!1,priority:k=!1,preload:l=!1,loading:m,className:n,quality:o,width:p,height:q,fill:r=!1,style:s,overrideSrc:t,onLoad:u,onLoadingComplete:v,placeholder:w="empty",blurDataURL:x,fetchPriority:y,decoding:z="async",layout:A,objectFit:B,objectPosition:C,lazyBoundary:D,lazyRoot:E,...F},G){var H;let I,J,K,{imgConf:L,showAltText:M,blurComplete:N,defaultLoader:O}=G,P=L||f.imageConfigDefault;if("allSizes"in P)I=P;else{let a=[...P.deviceSizes,...P.imageSizes].sort((a,b)=>a-b),b=P.deviceSizes.sort((a,b)=>a-b),c=P.qualities?.sort((a,b)=>a-b);I={...P,allSizes:a,deviceSizes:b,qualities:c}}if(void 0===O)throw Object.defineProperty(Error("images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config"),"__NEXT_ERROR_CODE",{value:"E163",enumerable:!1,configurable:!0});let Q=F.loader||O;delete F.loader,delete F.srcSet;let R="__next_img_default"in Q;if(R){if("custom"===I.loader)throw Object.defineProperty(Error(`Image with src "${a}" is missing "loader" prop.
Read more: https://nextjs.org/docs/messages/next-image-missing-loader`),"__NEXT_ERROR_CODE",{value:"E252",enumerable:!1,configurable:!0})}else{let a=Q;Q=b=>{let{config:c,...d}=b;return a(d)}}if(A){"fill"===A&&(r=!0);let a={intrinsic:{maxWidth:"100%",height:"auto"},responsive:{width:"100%",height:"auto"}}[A];a&&(s={...s,...a});let c={responsive:"100vw",fill:"100vw"}[A];c&&!b&&(b=c)}let S="",T=i(p),U=i(q);if((H=a)&&"object"==typeof H&&(h(H)||void 0!==H.src)){let b=h(a)?a.default:a;if(!b.src)throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ${JSON.stringify(b)}`),"__NEXT_ERROR_CODE",{value:"E460",enumerable:!1,configurable:!0});if(!b.height||!b.width)throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ${JSON.stringify(b)}`),"__NEXT_ERROR_CODE",{value:"E48",enumerable:!1,configurable:!0});if(J=b.blurWidth,K=b.blurHeight,x=x||b.blurDataURL,S=b.src,!r)if(T||U){if(T&&!U){let a=T/b.width;U=Math.round(b.height*a)}else if(!T&&U){let a=U/b.height;T=Math.round(b.width*a)}}else T=b.width,U=b.height}let V=!k&&!l&&("lazy"===m||void 0===m);(!(a="string"==typeof a?a:S)||a.startsWith("data:")||a.startsWith("blob:"))&&(c=!0,V=!1),I.unoptimized&&(c=!0),R&&!I.dangerouslyAllowSVG&&a.split("?",1)[0].endsWith(".svg")&&(c=!0);let W=i(o),X=Object.assign(r?{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,objectFit:B,objectPosition:C}:{},M?{}:{color:"transparent"},s),Y=N||"empty"===w?null:"blur"===w?`url("data:image/svg+xml;charset=utf-8,${(0,e.getImageBlurSvg)({widthInt:T,heightInt:U,blurWidth:J,blurHeight:K,blurDataURL:x||"",objectFit:X.objectFit})}")`:`url("${w}")`,Z=g.includes(X.objectFit)?"fill"===X.objectFit?"100% 100%":"cover":X.objectFit,$=Y?{backgroundSize:Z,backgroundPosition:X.objectPosition||"50% 50%",backgroundRepeat:"no-repeat",backgroundImage:Y}:{},_=function({config:a,src:b,unoptimized:c,width:e,quality:f,sizes:g,loader:h}){if(c){if(b.startsWith("/")&&!b.startsWith("//")){let a=(0,d.getDeploymentId)();if(b.includes("/_next/static/immutable")&&!(0,d.getAssetToken)())a=void 0;else if(a){let c=b.indexOf("?");if(-1!==c){let d=new URLSearchParams(b.slice(c+1));d.get("dpl")||(d.append("dpl",a),b=b.slice(0,c)+"?"+d.toString())}else b+=`?dpl=${a}`}}return{src:b,srcSet:void 0,sizes:void 0}}let{widths:i,kind:j}=function({deviceSizes:a,allSizes:b},c,d){if(d){let c=/(^|\s)(1?\d?\d)vw/g,e=[];for(let a;a=c.exec(d);)e.push(parseInt(a[2]));if(e.length){let c=.01*Math.min(...e);return{widths:b.filter(b=>b>=a[0]*c),kind:"w"}}return{widths:b,kind:"w"}}return"number"!=typeof c?{widths:a,kind:"w"}:{widths:[...new Set([c,2*c].map(a=>b.find(b=>b>=a)||b[b.length-1]))],kind:"x"}}(a,e,g),k=i.length-1;return{sizes:g||"w"!==j?g:"100vw",srcSet:i.map((c,d)=>`${h({config:a,src:b,quality:f,width:c})} ${"w"===j?c:d+1}${j}`).join(", "),src:h({config:a,src:b,quality:f,width:i[k]})}}({config:I,src:a,unoptimized:c,width:T,quality:W,sizes:b,loader:Q}),aa=V?"lazy":m;return{props:{...F,loading:aa,fetchPriority:y,width:T,height:U,decoding:z,className:n,style:{...X,...$},sizes:_.sizes,srcSet:_.srcSet,src:t||_.src},meta:{unoptimized:c,preload:l||k,placeholder:w,fill:r}}}}];

//# sourceMappingURL=_1ulw2cx._.js.map