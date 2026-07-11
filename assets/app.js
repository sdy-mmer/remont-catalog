const CHECKED_DATE = "11.07.2026";
const STORAGE_KEY = "repair-catalog-saved-v1";

const state = {
  items: [],
  kind: "",
  search: "",
  color: "all",
  sort: "default",
  saved: new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")),
};

const escapeHtml = (value = "") => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

const formatPrice = (value) => value
  ? `${new Intl.NumberFormat("ru-RU").format(value)} ₽/м²`
  : "Цена не указана";

const displayDate = (value) => {
  if (!value) return CHECKED_DATE;
  const [year, month, day] = value.split("-");
  return `${day}.${month}.${year}`;
};

function header(active = "catalog") {
  const current = (name) => active === name ? ' aria-current="page"' : "";
  return `
    <a class="skip-link" href="#main">Перейти к содержанию</a>
    <div class="top-note">Цены и наличие проверены 11 июля 2026 · перед покупкой уточняйте актуальные условия</div>
    <header class="site-header">
      <a class="brand" href="index.html">Дом, который собирается<small>находки для ремонта</small></a>
      <nav class="main-nav" aria-label="Основная навигация">
        <a href="index.html"${current("home")}>Главная</a>
        <a href="index.html#bathroom"${current("bathroom")}>Ванная</a>
        <a href="index.html#bedroom"${current("bedroom")}>Спальня</a>
        <a href="floor-tiles.html"${current("catalog")}>Каталог</a>
        <span class="saved-link" title="Сохранённые позиции хранятся в этом браузере">Сохранено · <b data-saved-count>${state.saved.size}</b></span>
      </nav>
    </header>`;
}

function footer() {
  return `
    <footer class="site-footer">
      <span>Дом, который собирается © 2026</span>
      <span>Независимый каталог материалов для ремонта</span>
      <span>Цены и остатки могут измениться</span>
    </footer>`;
}

function renderHome() {
  document.title = "Дом, который собирается — каталог материалов для ремонта";
  document.querySelector("#app").innerHTML = `
    ${header("home")}
    <main id="main">
      <div class="wrap">
        <section class="home-hero" aria-labelledby="home-title">
          <div class="home-copy">
            <span class="eyebrow">Независимая подборка материалов</span>
            <h1 class="display" id="home-title">Ремонт,<br>собранный <em>по частям</em></h1>
            <p>Каталог проверенных находок с артикулами, размерами, актуальными ценами и прямыми ссылками — чтобы решения не терялись между вкладками.</p>
            <div class="hero-actions">
              <a class="button primary" href="#bathroom">Смотреть ванную</a>
              <a class="button" href="floor-tiles.html">Открыть каталог</a>
            </div>
          </div>
          <div class="hero-art" aria-label="Подборка плитки для пола и стен">
            <div class="hero-image one"><img src="assets/floor/10_SG572792R.jpg" alt="Керамогранит Риальто голубой"></div>
            <div class="hero-image two"><img src="assets/wall/31545.jpg" alt="Настенная плитка EQUIPE BALI Hesper"></div>
            <div class="hero-image three"><img src="assets/floor/13_SG016320R.jpg" alt="Светлый керамогранит"></div>
            <span class="hero-caption">51 находка · 2 готовые подборки</span>
          </div>
        </section>
        <section class="trust-strip" aria-label="О каталоге">
          <div class="trust-item"><b>51</b><span>позиция с фото,<br>артикулом и характеристиками</span></div>
          <div class="trust-item"><b>11.07</b><span>дата последней<br>проверки цен</span></div>
          <div class="trust-item"><b>3×</b><span>основной магазин,<br>альтернатива и официальный сайт</span></div>
        </section>
        <section class="room-section" id="bathroom" aria-labelledby="bathroom-title">
          <div class="section-head">
            <div><span class="eyebrow">Комната 01</span><h2 class="display" id="bathroom-title">Ванная</h2></div>
            <p>Материалы для пола и стен уже собраны. Остальные разделы будут появляться по мере выбора.</p>
          </div>
          <div class="category-grid">
            <a class="category-tile" href="floor-tiles.html">
              <img src="assets/floor/18_SG631820R.jpg" alt="Светлый керамогранит терраццо">
              <span class="tile-wash"></span><span class="tile-info"><span>19 позиций</span><h3>Плитка на пол</h3><span>Открыть подборку →</span></span>
            </a>
            <a class="category-tile" href="wall-tiles.html">
              <img src="assets/wall/31552.jpg" alt="Зелёная настенная плитка EQUIPE">
              <span class="tile-wash"></span><span class="tile-info"><span>32 позиции</span><h3>Плитка на стены</h3><span>Открыть подборку →</span></span>
            </a>
            <a class="category-tile empty-tile" href="bathroom-wallpaper.html"><span class="empty-mark">○</span><span><span class="eyebrow">Скоро</span><h3>Обои</h3><p>Подборка ещё<br>не добавлена</p></span></a>
            <a class="category-tile empty-tile" href="bathroom-mirror.html"><span class="empty-mark">◇</span><span><span class="eyebrow">Скоро</span><h3>Зеркало</h3><p>Подборка ещё<br>не добавлена</p></span></a>
          </div>
        </section>
        <section class="bedroom-section" id="bedroom" aria-labelledby="bedroom-title">
          <div><span class="eyebrow">Комната 02</span><h2 class="display" id="bedroom-title">Спальня</h2><p>Здесь появятся материалы для спокойного, тёплого интерьера.</p></div>
          <a class="empty-wide" href="bedroom-wallpaper.html"><span><span class="eyebrow">Обои</span><br>Подборка ещё не добавлена</span></a>
        </section>
      </div>
    </main>
    ${footer()}`;
}

function normalizeFloor(item) {
  return {
    id: `floor-${item.article}`,
    number: item.no,
    brand: item.brand,
    collection: item.collection,
    name: item.name,
    article: item.article,
    colorFamily: item.color_family || "Без категории",
    color: item.color || "Не указан",
    type: item.type || "Не указан",
    purpose: item.purpose || "Не указано",
    size: item.size_cm ? `${item.size_cm} см` : "Не указан",
    thickness: item.thickness_mm ? `${item.thickness_mm} мм` : "Не указана",
    surface: item.surface || "Не указана",
    edge: item.edge || "Не указана",
    design: item.design || "Не указан",
    country: item.price_region || "Не указан",
    price: item.price_rub_m2,
    priceDisplay: item.price_display || formatPrice(item.price_rub_m2),
    availability: item.availability || "Уточнить у продавца",
    checkedDate: CHECKED_DATE,
    note: item.price_note || "Перед заказом уточнить актуальные условия.",
    warning: item.warning || "",
    image: `assets/floor/${item.asset_file}`,
    buyUrl: item.buy_url || "",
    altUrl: item.alt_url || "",
    officialUrl: item.official_url || "",
  };
}

function normalizeWall(item) {
  return {
    id: `wall-${item.article}`,
    number: item.source_no,
    brand: "EQUIPE",
    collection: item.collection,
    name: item.name.replace(/^EQUIPE\s+/i, ""),
    article: item.article,
    colorFamily: item.color_family || "Без категории",
    color: item.shade || item.color_family || "Не указан",
    type: item.type || "Не указан",
    purpose: item.purpose || "Не указано",
    size: item.size || "Не указан",
    thickness: "Не указана производителем в источнике",
    surface: item.surface || "Не указана",
    edge: "Не указана в источнике",
    design: item.collection,
    country: item.country || "Не указана",
    price: item.price_rub_m2,
    priceDisplay: formatPrice(item.price_rub_m2),
    availability: item.availability || "Уточнить у продавца",
    checkedDate: displayDate(item.checked_date),
    note: item.notes || "Перед заказом уточнить актуальные условия.",
    warning: "",
    image: `assets/wall/${item.asset_file}`,
    buyUrl: item.url || "",
    altUrl: "",
    officialUrl: "",
  };
}

function productLink(url, label, unavailableLabel) {
  if (!url) return `<span class="unavailable" title="Ссылка пока не добавлена">${escapeHtml(unavailableLabel)}</span>`;
  return `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(label)} — откроется в новой вкладке">${escapeHtml(label)} ↗</a>`;
}

function productCard(item) {
  const isSaved = state.saved.has(item.id);
  const warningText = item.warning.replace(/^Важно:\s*/i, "");
  const specs = [
    ["Тип", item.type], ["Назначение", item.purpose], ["Размер", item.size],
    ["Толщина", item.thickness], ["Поверхность", item.surface], ["Цвет", item.color],
    ["Кромка", item.edge], ["Дизайн / коллекция", item.design], ["Страна / регион", item.country],
  ];
  return `
    <article class="product-card" data-product-id="${escapeHtml(item.id)}">
      <div class="product-media">
        <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}, ${escapeHtml(item.color)}" loading="lazy">
        <span class="product-badge ${item.warning ? "warning-badge" : ""}">${item.warning ? "Обратите внимание" : `${String(item.number).padStart(2, "0")} · вариант`}</span>
        <button class="save-button" type="button" aria-label="${isSaved ? "Удалить из сохранённых" : "Сохранить позицию"}" aria-pressed="${isSaved}" data-save="${escapeHtml(item.id)}">${isSaved ? "♥" : "♡"}</button>
      </div>
      <div class="product-body">
        <div class="product-brand">${escapeHtml(item.brand)} · ${escapeHtml(item.collection)}</div>
        <h2 class="product-title">${escapeHtml(item.name)}</h2>
        <div class="article">Артикул ${escapeHtml(item.article)}</div>
        <dl class="specs">${specs.map(([label, value]) => `<div class="spec"><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`).join("")}</dl>
        <div class="price-row"><strong class="price">${escapeHtml(item.priceDisplay)}</strong><span class="checked">проверено<br>${escapeHtml(item.checkedDate)}</span></div>
        <div class="availability">${escapeHtml(item.availability)}</div>
        ${item.warning ? `<div class="warning-note"><strong>Важно:</strong> ${escapeHtml(warningText)}</div>` : ""}
        <p class="product-note">${escapeHtml(item.note)}</p>
        <div class="product-links">
          ${productLink(item.buyUrl, "Магазин", "Магазин —")}
          ${productLink(item.altUrl, "Альтернатива", "Альтернатива —")}
          ${productLink(item.officialUrl, "Официальный", "Официальный —")}
        </div>
      </div>
    </article>`;
}

function filteredItems() {
  const query = state.search.trim().toLocaleLowerCase("ru");
  const result = state.items.filter((item) => {
    const haystack = [item.brand, item.collection, item.name, item.article, item.color, item.type, item.purpose].join(" ").toLocaleLowerCase("ru");
    return (!query || haystack.includes(query)) && (state.color === "all" || item.colorFamily === state.color);
  });
  if (state.sort === "price-asc") result.sort((a, b) => (a.price || Infinity) - (b.price || Infinity));
  if (state.sort === "price-desc") result.sort((a, b) => (b.price || -1) - (a.price || -1));
  if (state.sort === "name") result.sort((a, b) => a.name.localeCompare(b.name, "ru"));
  return result;
}

function refreshCatalog() {
  const items = filteredItems();
  const grid = document.querySelector("#product-grid");
  const count = document.querySelector("#results-count");
  if (!grid || !count) return;
  count.textContent = `Показано ${items.length} из ${state.items.length}`;
  grid.innerHTML = items.length ? items.map(productCard).join("") : '<div class="empty-results">По выбранным параметрам ничего не найдено.<br>Попробуйте изменить поиск или фильтр.</div>';
  bindSaveButtons();
}

function bindSaveButtons() {
  document.querySelectorAll("[data-save]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.dataset.save;
      if (state.saved.has(id)) state.saved.delete(id); else state.saved.add(id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...state.saved]));
      document.querySelectorAll("[data-saved-count]").forEach((node) => { node.textContent = state.saved.size; });
      const saved = state.saved.has(id);
      button.setAttribute("aria-pressed", String(saved));
      button.setAttribute("aria-label", saved ? "Удалить из сохранённых" : "Сохранить позицию");
      button.textContent = saved ? "♥" : "♡";
    });
  });
}

async function renderCatalog(kind) {
  state.kind = kind;
  const isFloor = kind === "floor";
  const title = isFloor ? "Плитка на пол" : "Плитка на стены";
  const subtitle = isFloor
    ? "19 вариантов керамогранита и плитки: от светлого терраццо до глубокого графита."
    : "32 варианта настенной плитки EQUIPE: фактурные, глянцевые и выразительные цветные коллекции.";
  document.title = `${title} — Дом, который собирается`;
  document.querySelector("#app").innerHTML = `
    ${header("catalog")}
    <main id="main">
      <div class="wrap">
        <nav class="breadcrumbs" aria-label="Хлебные крошки"><a href="index.html">Главная</a> / <a href="index.html#bathroom">Ванная</a> / ${title}</nav>
        <section class="category-header">
          <div><span class="eyebrow">Ванная · ${isFloor ? "подборка 01" : "подборка 02"}</span><h1 class="display">${isFloor ? "Плитка<br>на пол" : "Плитка<br>на стены"}</h1></div>
          <div class="category-intro"><p>${subtitle} Все доступные данные собраны в одной карточке.</p><div class="date-note">Цены и остатки проверены 11 июля 2026 года и могут измениться. Перед заказом уточните тон, калибр и доступность.</div></div>
        </section>
      </div>
      <section class="catalog-tools" aria-label="Фильтры каталога">
        <div class="wrap tools-row">
          <label><span class="visually-hidden">Поиск</span><input class="field search-field" id="search" type="search" placeholder="Название, коллекция или артикул"></label>
          <label><span class="visually-hidden">Цветовая группа</span><select class="field" id="color-filter"><option value="all">Все цвета</option></select></label>
          <label><span class="visually-hidden">Сортировка</span><select class="field" id="sort"><option value="default">По порядку</option><option value="price-asc">Сначала дешевле</option><option value="price-desc">Сначала дороже</option><option value="name">По названию</option></select></label>
          <span class="results-count" id="results-count" aria-live="polite">Загрузка…</span>
        </div>
      </section>
      <section class="catalog-section"><div class="wrap"><div class="product-grid" id="product-grid" aria-live="polite"></div><div class="error-box" id="load-error" hidden></div></div></section>
    </main>
    ${footer()}`;

  try {
    const response = await fetch(`assets/data/${isFloor ? "floor_tiles" : "wall_tiles"}.json`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const raw = await response.json();
    state.items = raw.map(isFloor ? normalizeFloor : normalizeWall);
    const colorSelect = document.querySelector("#color-filter");
    [...new Set(state.items.map((item) => item.colorFamily))].sort((a, b) => a.localeCompare(b, "ru")).forEach((color) => {
      colorSelect.insertAdjacentHTML("beforeend", `<option value="${escapeHtml(color)}">${escapeHtml(color)}</option>`);
    });
    document.querySelector("#search").addEventListener("input", (event) => { state.search = event.target.value; refreshCatalog(); });
    colorSelect.addEventListener("change", (event) => { state.color = event.target.value; refreshCatalog(); });
    document.querySelector("#sort").addEventListener("change", (event) => { state.sort = event.target.value; refreshCatalog(); });
    refreshCatalog();
  } catch (error) {
    document.querySelector("#results-count").textContent = "Ошибка загрузки";
    const box = document.querySelector("#load-error");
    box.hidden = false;
    box.textContent = "Не удалось загрузить данные каталога. Обновите страницу или попробуйте позже.";
    console.error(error);
  }
}

function renderEmptyPage() {
  const body = document.body;
  const room = body.dataset.room;
  const title = body.dataset.title;
  const symbol = body.dataset.symbol || "○";
  document.title = `${title} — ${room} — Дом, который собирается`;
  document.querySelector("#app").innerHTML = `
    ${header(room === "Ванная" ? "bathroom" : "bedroom")}
    <main id="main"><div class="wrap">
      <nav class="breadcrumbs" aria-label="Хлебные крошки"><a href="index.html">Главная</a> / <a href="index.html#${room === "Ванная" ? "bathroom" : "bedroom"}">${escapeHtml(room)}</a> / ${escapeHtml(title)}</nav>
      <section class="empty-page">
        <div><span class="eyebrow">${escapeHtml(room)} · раздел в работе</span><h1 class="display">${escapeHtml(title)}</h1><p>Подборка ещё не добавлена. Здесь появятся фотографии, характеристики, цены и проверенные ссылки на магазины.</p><a class="button primary" href="index.html">Вернуться на главную</a></div>
        <div class="empty-illustration"><div><div class="empty-symbol">${escapeHtml(symbol)}</div><span class="eyebrow">Скоро</span><p>Подборка ещё не добавлена</p></div></div>
      </section>
    </div></main>
    ${footer()}`;
}

const page = document.body.dataset.page;
if (page === "home") renderHome();
if (page === "catalog") renderCatalog(document.body.dataset.kind);
if (page === "empty") renderEmptyPage();
