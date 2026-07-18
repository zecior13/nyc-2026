const app = document.getElementById("app");
const navItems = [...document.querySelectorAll(".nav-item")];
const sheet = document.getElementById("detailSheet");
const sheetBackdrop = document.getElementById("sheetBackdrop");
const sheetContent = document.getElementById("sheetContent");

let currentView = "home";
let currentReadingText = "";
let reading = false;
let activeSnippetButton = null;
let countdownTimer = null;
let activeDayId = null;
let currentDayPanel = "overview";
let dayPanelHistory = [];
let daySwipeController = null;
const savedDayStates = new Map();

// Tekst widoczny w aplikacji pozostaje oryginalny. Ten słownik służy wyłącznie
// polskiemu lektorowi i będzie rozwijany wraz z kolejnymi dniami podróży.
const SPEECH_PRONUNCIATIONS = [
  ["Mobile Passport Control", "Mobajl Pasport Kontrol"],
  ["Ground Transportation", "graund transportej-szyn"],
  ["Long Island Rail Road", "Long Ajland Rejl Rołd"],
  ["The New York Times", "de Nju Jork Tajms"],
  ["Holiday Inn", "Holidej In"],
  ["Jamaica Station", "Dżamejka Stejszyn"],
  ["Penn Station", "Pen Stejszyn"],
  ["Times Square", "Tajms Skłer"],
  ["Longacre Square", "Longaker Skłer"],
  ["Bryant Park", "Brajant Park"],
  ["AirTrain", "er trejn"],
  ["yellow cab", "jeloł keb"],
  ["Yellow cab", "Jeloł keb"],
  ["Visa Waiver", "Wiza Łejwer"],
  ["Bowtie", "boł taj"],
  ["Broadway", "Brodłej"],
  ["UberXL", "Uber iks el"],
  ["Lyft", "Lift"],
  ["CBP", "si bi pi"],
  ["LIRR", "el aj ar ar"],
  ["JFK", "dżej ef kej"],
  ["Rate #2", "rejt numer dwa"],
  ["West 42nd Street", "Łest czterdziesta druga Strit"],
  ["West 40th Street", "Łest czterdziesta Strit"],
  ["8th Avenue", "ósma Awenju"]
  ,["Greenwich Village", "Grenicz Wilidż"]
  ,["Washington Square", "Łoszyngton Skłer"]
  ,["MacDougal Street", "Makdugal Strit"]
  ,["Christopher Street", "Krystofer Strit"]
  ,["Stonewall Inn", "Stołnłol In"]
  ,["Stonewall", "Stołnłol"]
  ,["Visitor Center", "Wizytor Senter"]
  ,["Jane Jacobs", "Dżejn Dżejkobs"]
  ,["Robert Moses", "Robert Mołzes"]
  ,["Friends", "Frends"]
  ,["Carrie Bradshaw", "Keri Bradszoł"]
  ,["Blue Note", "Blu Nołt"]
  ,["PUBLIQuartet", "Pabli Kłortet"]
  ,["Table Seating", "Tejbl Siting"]
  ,["Bar Area", "Bar Eria"]
  ,["West 3rd Street", "Łest trzecia Strit"]
  ,["Perry Street", "Peri Strit"]
  ,["Grove Street", "Grołw Strit"]
  ,["Commerce Street", "Komers Strit"]
  ,["Museum of Modern Art", "Mjuzijem of Modern Art"]
  ,["MoMA", "Mołma"]
  ,["Bloomberg Connects", "Blumberg Konekts"]
  ,["Rockefeller Center", "Rokefeler Senter"]
  ,["Nintendo NY", "Nintendo Nju Jork"]
  ,["Fifth Avenue", "Piąta Awenju"]
  ,["King Creole", "King Kriol"]
  ,["Hester Street Fair", "Hester Strit Fer"]
  ,["Vincent van Gogh", "Wincent fan Gog"]
  ,["Pablo Picasso", "Pablo Pikasso"]
  ,["Claude Monet", "Klod Mone"]
  ,["Andy Warhol", "Endi Łarhol"]
  ,["Frida Kahlo", "Frida Kalo"]
  ,["Diego Rivera", "Diego Riwera"]
  ,["Michael Curtiz", "Majkel Kertiz"]
  ,["Frank Lloyd Wright", "Frank Lojd Rajt"]
  ,["Guggenheim", "Gugenhajm"]
  ,["The Metropolitan Museum of Art", "de Metropolitan Mjuzijem of Art"]
  ,["The Met", "de Met"]
  ,["Temple of Dendur", "Templ of Dendur"]
  ,["Giacometti", "Dżakometti"]
  ,["Bethesda Terrace", "Betesda Teras"]
  ,["Bow Bridge", "Boł Brydż"]
  ,["Strawberry Fields", "Strołberi Filds"]
  ,["Marquis Theatre", "Marki Fijeter"]
  ,["The First Shadow", "de Ferst Szadoł"]
  ,["Long Island City", "Long Ajland Siti"]
  ,["Gantry Plaza", "Gentry Plaza"]
  ,["Pepsi-Cola Sign", "Pepsi Kola Sajn"]
  ,["Flushing Meadows", "Flaszing Medołs"]
  ,["Flushing", "Flaszing"]
  ,["Unisphere", "Junisfir"]
  ,["World’s Fair", "Łerlds Fer"]
  ,["Mixed Doubles", "Mikst Dabels"]
  ,["Billie Jean King", "Bili Dżin King"]
  ,["Arthur Ashe", "Artur Esz"]
  ,["New World Mall", "Nju Łerld Mol"]
  ,["Nan Xiang Xiao Long Bao", "Nan Siang Siao Long Bao"]
  ,["Whitney Museum", "Łitni Mjuzijem"]
  ,["High Line", "Haj Lajn"]
  ,["Meatpacking", "Mitpeking"]
  ,["Chelsea Market", "Czelsi Market"]
  ,["Hudson Yards", "Hadson Jardz"]
  ,["Vessel", "Wesel"]
  ,["Renz Piano", "Renco Piano"]
  ,["Andy Warhol", "Endi Łorhol"]
  ,["Mabel Dwight", "Mejbel Dłajt"]
  ,["Koreatown", "Koria Tałn"]
  ,["Statue of Liberty", "Staczu of Liberti"]
  ,["Staten Island Ferry", "Staten Ajland Feri"]
  ,["St. George", "Sejnt Dżordż"]
  ,["Whitehall Terminal", "Łajthol Terminal"]
  ,["Charging Bull", "Czardżing Bul"]
  ,["Fearless Girl", "Fierles Gerl"]
  ,["Battery Park", "Bateri Park"]
  ,["Pier 79", "Pir siedemdziesiąt dziewięć"]
];

function speechText(text) {
  return SPEECH_PRONUNCIATIONS.reduce(
    (result, [written, spoken]) => result.replaceAll(written, spoken),
    text
  );
}

function dayReadingText(day) {
  const plan = day.items.map(item => `${item.time}. ${item.title}. ${item.note}`).join(" ");
  const guide = typeof DAY_GUIDES !== "undefined" ? DAY_GUIDES[day.id] : null;
  const arrivalExtra = guide?.kind === "arrival" ? [
    ...guide.arrival.map(item => `${item.title}. ${item.text}`),
    ...guide.transport.map(item => `${item.name}. ${item.price}. ${item.text}. ${item.steps.join(". ")}`),
    `${guide.decision.title}. ${guide.decision.text}`,
    `${guide.hotel.name}. ${guide.hotel.text}`,
    ...guide.evening.map(item => `${item.title}. ${item.text}`),
    ...guide.stories.map(item => `${item.title}. ${item.text}`)
  ].join(" ") : "";
  const villageExtra = guide?.kind === "village" ? [
    ...guide.route.map(item => `${item.title}. ${item.text}`),
    ...guide.stories.map(item => `${item.title}. ${item.text}`),
    ...guide.screen.map(item => `${item.title}. ${item.text}`),
    `${guide.bluenote.artist}. ${guide.bluenote.rules.join(". ")}`,
    ...guide.bluenote.listen.map(item => `${item.title}. ${item.text}`)
  ].join(" ") : "";
  const momaExtra = guide?.kind === "moma" ? [
    ...guide.museum.floors.map(item => `${item.title}. ${item.text}. ${item.look}`),
    ...guide.works.map(item => `${item.title}. ${item.text}`),
    ...guide.animation.map(item => `${item.title}. ${item.text}`),
    `${guide.movie.title}. ${guide.movie.story}. ${guide.movie.listen}`
  ].join(" ") : "";
  const metExtra = guide?.kind === "metday" ? [guide.guggenheim.text, ...guide.museum.stops.map(item => `${item.title}. ${item.text}`), ...guide.stories.map(item => `${item.title}. ${item.text}`), ...guide.theatre.before.map(item => `${item.title}. ${item.text}`)].join(" ") : "";
  const queensExtra = guide?.kind === "queens" ? [...guide.morning.route.map(item => `${item.title}. ${item.text}`), ...guide.morning.stories.map(item => `${item.title}. ${item.text}`), ...guide.route.map(item => `${item.title}. ${item.text}`), ...guide.stories.map(item => `${item.title}. ${item.text}`), ...guide.tennis.basics.map(item => `${item.title}. ${item.text}`)].join(" ") : "";
  const westExtra = guide?.kind === "westside" ? [...guide.photos.onboard.map(item=>`${item.title}. ${item.text}`),...guide.downtown.route.map(item=>`${item.title}. ${item.text}`),...guide.museum.stops.map(item=>`${item.title}. ${item.text}`),...guide.route.map(item=>`${item.title}. ${item.text}`),...guide.stories.map(item=>`${item.title}. ${item.text}`)].join(" ") : "";
  const baseballExtra = guide?.kind === "sohoyankees" ? [...guide.route.map(item=>`${item.title}. ${item.text}`),...guide.stories.map(item=>`${item.title}. ${item.text}`),...guide.baseball.basics.map(item=>`${item.title}. ${item.text}`)].join(" ") : "";
  const jazzExtra = guide?.kind === "brooklynjazz" ? [...guide.brooklyn.map(item=>`${item.title}. ${item.text}`),...guide.stories.map(item=>`${item.title}. ${item.text}`),...guide.festival.basics.map(item=>`${item.title}. ${item.text}`)].join(" ") : "";
  const departureExtra = guide?.kind === "departure" ? [...guide.diner.basics.map(item=>`${item.title}. ${item.text}`),...guide.walk.map(item=>`${item.title}. ${item.text}`),...guide.stories.map(item=>`${item.title}. ${item.text}`)].join(" ") : "";
  return `${day.title}. ${day.story} Plan dnia. ${plan} Najważniejsze. ${day.essentials.join(". ")}. ${arrivalExtra || villageExtra || momaExtra || metExtra || queensExtra || westExtra || baseballExtra || jazzExtra || departureExtra}`;
}

function guideCard(item, audioKey = "", audioLabel = "Posłuchaj historii", contentKey = "") {
  return `<article class="guide-card" ${contentKey ? `data-content-key="${contentKey}"` : ""}>${item.image ? `<figure class="orientation-photo"><img src="${item.image.src}" alt="${item.image.alt}"><figcaption>Punkt orientacyjny · ${item.image.credit}</figcaption></figure>` : ""}<h4>${item.title}</h4><p>${item.text}</p></article>`;
}

function inlinePlaceStories(related = [], stories = []) {
  return related.filter(item=>!item.panel||item.panel==="stories").map(item=>{
    const index=Number(item.key?.match(/(\d+)$/)?.[1]);
    const story=Number.isInteger(index)?stories[index]:null;
    return story?`<details class="place-story"><summary>${story.title}</summary><p>${story.text}</p></details>`:"";
  }).join("");
}

function inlineRelatedActions(related = []) {
  const actions=related.filter(item=>item.panel&&item.panel!=="stories");
  return actions.length?`<div class="related-row">${actions.map(item=>`<button type="button" data-related-panel="${item.panel}" ${item.key?`data-related-key="${item.key}"`:""}>${item.label} ›</button>`).join("")}</div>`:"";
}

function matyldaShoppingWishlist(area) {
  const shops=MATYLDA_SHOPS.filter(shop=>shop.area===area);
  const route=MATYLDA_SHOPPING_ROUTES[area];
  const labels={moda:"Moda",beauty:"Beauty",fun:"Kultowe i kolekcjonerskie",food:"Słodki finał"};
  return `<section class="shopping-wishlist"><div class="section-heading-row"><div><span class="mini-kicker">Zweryfikowane przy trasie dnia</span><h3>${route.title}</h3></div><span data-progress-for="shop-${area}-"></span></div><div class="shopping-route-box"><p>${route.note}</p><a class="shopping-route-primary" href="${route.map}" target="_blank" rel="noopener" aria-label="Otwórz mapę trasy zakupowej w Google Maps"><span aria-hidden="true">⌖</span><strong>MAPA TRASY ZAKUPOWEJ</strong><small>Otwórz prowadzenie w Google Maps · ${route.fromTo}</small></a><a class="shopping-route-extra" href="${route.extra}" target="_blank" rel="noopener">${area==="midtown"?"Opcjonalnie: MINISO przy hotelu":"Opcjonalny finał: Crumbl"} ↗</a><small class="shopping-route-hint">${route.hint}</small></div><p class="panel-intro">To nie lista do zaliczenia. Zaznaczcie dwa sklepy główne i najwyżej jeden szybki; kolejność poniżej odpowiada spacerowi z północy na południe.</p>${Object.entries(labels).map(([category,label])=>`<div class="shop-category"><h4>${label}</h4><div class="shop-choice-grid">${shops.filter(shop=>shop.category===category).map(shop=>`<article class="shop-choice checkable-card"><label><input type="checkbox" data-save-check="shop-${area}-${shop.id}"><span><strong>${shop.name}</strong><small>${shop.address} · ${shop.priority}</small></span></label><p>${shop.note}</p><a href="${shop.map}" target="_blank" rel="noopener">Pokaż ten sklep ↗</a></article>`).join("")}</div></div>`).join("")}</section>`;
}

function renderVillageFoodPanel(guide) {
  const groups = [
    { title:"Szybki lunch po muzeum · plan główny", note:"Mamoun’s albo Tartinery: lekko, bez długiej kolejki; pełna kolacja będzie w Blue Note.", items:guide.food.filter(item=>/Lżej|Tanio/i.test(item.category)) },
    { title:"Spokojniejszy lunch · tylko przy zapasie czasu", note:"Joseph Leonard lub Buvette wybieramy wyłącznie bez kolejki i po wyjściu z muzeum zgodnie z planem.", items:guide.food.filter(item=>/Spokojny|Francuski/i.test(item.category)) },
    { title:"Kawa, deser i odpoczynek", note:"Ten przystanek przypada po spacerze i przed Blue Note.", items:guide.food.filter(item=>/deser|kawa/i.test(item.category)) }
  ];
  return `<section class="day-panel" data-panel="food" hidden><h3>Jedzenie według momentu dnia</h3><p class="panel-intro">Nie jest to jedna lista restauracji — każda grupa odpowiada konkretnemu etapowi planu.</p>${groups.map(group=>`<section class="food-moment"><div class="food-moment-head"><span>${group.title}</span><p>${group.note}</p></div><div class="food-list">${group.items.map(place=>`<article class="food-card">${place.image?`<figure class="orientation-photo"><img src="${place.image.src}" alt="${place.image.alt}"><figcaption>Punkt orientacyjny · ${place.image.credit}</figcaption></figure>`:""}<div><span class="mini-kicker">${place.category} · ${place.price}</span><h4>${place.name}</h4><p>${place.address}</p><p>${place.note}</p></div><a href="${place.url}" target="_blank" rel="noopener">Menu / informacje ↗</a></article>`).join("")}</div></section>`).join("")}</section>`;
}

function renderFoodPanel(guide) {
  if (!guide.food) return "";
  return `<section class="day-panel" data-panel="food" hidden>
    <h3>Jedzenie po drodze</h3>
    <p class="panel-intro">Sprawdzone propozycje w różnych cenach, nie ranking. Godziny i stoliki sprawdzamy ponownie przed wyjściem.</p>
    <div class="food-list">${guide.food.map(place => `<article class="food-card">${place.image ? `<figure class="orientation-photo"><img src="${place.image.src}" alt="${place.image.alt}"><figcaption>Punkt orientacyjny · ${place.image.credit}</figcaption></figure>` : ""}<div><span class="mini-kicker">${place.category} · ${place.price}</span><h4>${place.name}</h4><p>${place.address}</p><p>${place.note}</p></div><a href="${place.url}" target="_blank" rel="noopener">Menu / informacje ↗</a></article>`).join("")}</div>
  </section>`;
}

function foodCards(items) {
  return `<div class="food-list">${items.map(place => `<article class="food-card"><div><span class="mini-kicker">${place.category} · ${place.price}</span><h4>${place.name}</h4><p>${place.address}</p><p>${place.note}</p></div><a href="${place.url}" target="_blank" rel="noopener">Menu / informacje ↗</a></article>`).join("")}</div>`;
}

function renderVillageGuide(day, guide) {
  const routeLabels = ["2", "3", "4", "5", "6"];
  const guggenheim = DAY_GUIDES["2026-08-30"].guggenheim;
  return `
    <nav class="day-module-nav" aria-label="Sekcje dnia">
      <button class="day-module active" type="button" data-day-panel="overview"><b>01</b><span>Plan</span><small>godziny i kolejność</small></button>
      <button class="day-module" type="button" data-day-panel="guggenheim"><b>◌</b><span>Guggenheim</span><small>2 godziny ze sztuką</small></button>
      <button class="day-module" type="button" data-day-panel="route"><b>◇</b><span>Miejsca spaceru</span><small>punkty i ich historie</small></button>
      <button class="day-module" type="button" data-day-panel="food"><b>☕</b><span>Jedzenie</span><small>lunch, kawa i deser</small></button>
      <button class="day-module" type="button" data-day-panel="screen"><b>▣</b><span>Serialowe Village</span><small>Friends i Carrie</small></button>
      <button class="day-module day-module-feature" type="button" data-day-panel="bluenote"><b>♪</b><span>Blue Note</span><small>Hiromi i wieczór</small></button>
      <button class="day-module" type="button" data-day-panel="links"><b>↗</b><span>Mapy</span><small>Google Maps i powrót</small></button>
    </nav>
    <section class="day-panel active" data-panel="overview">
      <div class="sheet-section"><h3>Plan dnia · wybierz punkt</h3>${timeline(day.items, guide.timelineTargets)}</div>
      <div class="sheet-section"><h3>Najważniejsze</h3><div class="simple-card"><p>${day.essentials.join("<br>")}</p></div></div>
    </section>
    <section class="day-panel" data-panel="guggenheim" hidden><span class="event-status">Plan główny · 10:30–12:30</span><h3>Guggenheim · dwie godziny bez pośpiechu</h3><p class="panel-intro">${guggenheim.address}</p><div class="notice">Bilet na 10:30. Wychodzimy o 12:30 i jedziemy bezpośrednio do Village.</div><article class="event-card"><h4>Praktycznie</h4><ul>${guggenheim.practical.filter(item=>!item.includes("90 minut")&&!item.includes("Grand Central")&&!item.includes("Audioprzewodnik")).map(item=>`<li>${item}</li>`).join("")}</ul></article><h3 class="subsection-title">Budynek i ludzie, którzy go stworzyli</h3><details class="place-story" open><summary>Frank Lloyd Wright i spiralna rotunda</summary><p>Wright świadomie odrzucił układ prostokątnych sal. Zaprojektował jedną rampę oplatającą rotundę, dzięki czemu oglądanie sztuki stało się ruchem przez architekturę. Zlecenie otrzymał w 1943 roku, lecz muzeum otwarto dopiero w 1959 — kilka miesięcy po jego śmierci.</p></details><details class="place-story"><summary>Rodzina Guggenheimów i narodziny muzeum</summary><p>Solomon R. Guggenheim, przemysłowiec i kolekcjoner, zaczął pod wpływem artystki oraz kuratorki Hilli Rebay gromadzić sztukę abstrakcyjną. W 1937 utworzył fundację, a w 1939 otworzył Museum of Non-Objective Painting. Po jego śmierci instytucja przyjęła jego imię; rodzinna fortuna została w ten sposób zamieniona w publiczną kolekcję i sieć muzeów.</p></details><button class="museum-day-link" type="button" data-open-museum-direct="guggenheim">Otwórz pełny przewodnik: piętra, artyści i dzieła <span>›</span></button><h3 class="subsection-title">Cztery przystanki</h3><div class="route-list">${guggenheim.route.map((item,index)=>`<article class="route-stop"><div class="route-number">${index+1}</div><div><h4>${item.title}</h4><p>${item.text}</p><div class="look-box"><strong>Na co patrzeć:</strong> ${item.look}</div></div></article>`).join("")}</div><div class="link-grid compact-links"><a href="https://www.guggenheim.org/buy-tickets" target="_blank" rel="noopener">Godziny i bilety <span>↗</span></a><a href="https://www.google.com/maps/dir/?api=1&origin=Solomon+R+Guggenheim+Museum,+1071+5th+Ave,+New+York&destination=Washington+Square+Arch,+New+York&travelmode=transit" target="_blank" rel="noopener">Guggenheim → Village <span>↗</span></a></div></section>
    <section class="day-panel" data-panel="route" hidden>
      <div class="section-heading-row"><h3>Miejsca spaceru</h3><span>sprawdzono ${guide.checked}</span></div>
      <p class="panel-intro">Każda historia znajduje się przy miejscu, którego dotyczy. To kolejność, nie sztywny rozkład jazdy.</p>
      <div class="route-list">${guide.route.map((stop, index) => `
        <article class="route-stop" data-content-key="village-stop-${index}">
          <div class="route-number">${routeLabels[index]}</div>
          <div>${stop.image ? `<figure class="orientation-photo"><img src="${stop.image.src}" alt="${stop.image.alt}"><figcaption>Punkt orientacyjny · ${stop.image.credit}</figcaption></figure>` : ""}<span class="mini-kicker">${stop.time}</span><h4>${stop.title}</h4><p>${stop.text}</p><div class="look-box"><strong>Rozejrzyj się:</strong> ${stop.look}</div>${stop.pause ? `<div class="pause-prompt">${stop.pause}</div>` : ""}${stop.related?.filter(item=>item.panel==="stories").map(item=>{const story=guide.stories[Number(item.key?.split("-")[1])];return story?`<details class="place-story"><summary>${story.title}</summary><p>${story.text}</p></details>`:"";}).join("")||""}${stop.related?.filter(item=>item.panel!=="stories").length ? `<div class="related-row">${stop.related.filter(item=>item.panel!=="stories").map(item => `<button type="button" data-related-panel="${item.panel}">${item.label} ›</button>`).join("")}</div>` : ""}</div>
        </article>`).join("")}</div>
    </section>
    <section class="day-panel" data-panel="screen" hidden>
      <h3>Serialowe i filmowe Village</h3>
      <p class="panel-intro">Adresy są dodatkiem do dzielnicy. Jeśli nie macie ochoty na popkulturę, można pominąć cały moduł jednym ruchem.</p>
      <div class="guide-grid">${guide.screen.map((item, index) => guideCard(item, `screen-${index}`, "Posłuchaj", `screen-${index}`)).join("")}</div>
    </section>
    ${renderVillageFoodPanel(guide)}
    <section class="day-panel" data-panel="bluenote" hidden>
      <span class="event-status">Potwierdzone · 23.08.2026 · 20:00</span>
      <h3>${guide.bluenote.artist}</h3>
      <p class="panel-intro">${guide.bluenote.address}</p>
      <div class="countdown-card"><span>Do otwarcia drzwi</span><strong id="blueNoteCountdown">Obliczam…</strong><small>O 17:15 kończymy spacer i kierujemy się do klubu.</small></div>
      <figure class="orientation-photo event-photo"><img src="${guide.bluenote.image.src}" alt="${guide.bluenote.image.alt}"><figcaption>Punkt orientacyjny · ${guide.bluenote.image.credit}</figcaption></figure>
      <div class="event-grid">
        <article class="event-card"><h4>Rytm wieczoru</h4><ul>${guide.bluenote.schedule.map(item => `<li>${item}</li>`).join("")}</ul></article>
        <article class="event-card"><h4>Zasady klubu</h4><ul>${guide.bluenote.rules.map(item => `<li>${item}</li>`).join("")}</ul></article>
      </div>
      <h3 class="subsection-title">Kim jest Hiromi?</h3>
      <div class="guide-grid">${guide.bluenote.about.map((item, index) => guideCard(item, `about-${index}`, "Posłuchaj")).join("")}</div>
      <h3 class="subsection-title">Czego słuchać?</h3>
      <div class="guide-grid">${guide.bluenote.listen.map((item, index) => guideCard(item, `listen-${index}`, "Posłuchaj wprowadzenia")).join("")}</div>
      <h3 class="subsection-title">Posłuchaj przed podróżą</h3>
      <div class="playlist-grid">${guide.bluenote.playlist.map(link => `<a href="${link.url}" target="_blank" rel="noopener"><strong>${link.label}</strong><small>${link.note}</small><span>↗</span></a>`).join("")}</div>
      <h3 class="subsection-title">Bilety i zasady</h3>
      <article class="event-card"><ul>${guide.bluenote.policies.map(item => `<li>${item}</li>`).join("")}</ul></article>
      <div class="link-grid compact-links"><a href="${guide.bluenote.menuUrl}" target="_blank" rel="noopener">Aktualne menu Blue Note <span>↗</span></a><a href="${guide.returnUrl}" target="_blank" rel="noopener">Powrót do hotelu <span>↗</span></a></div>
      <div class="after-card">${guide.after}</div>
    </section>
    <section class="day-panel" data-panel="links" hidden>
      <h3>Mapy i oficjalne informacje</h3>
      <div class="link-grid">${guide.links.map(link => `<a href="${link.url}" target="_blank" rel="noopener">${link.label}<span>↗</span></a>`).join("")}</div>
      <p class="data-note">Przed wyjściem sprawdźcie status koncertu i trasę komunikacją. Spacer działa offline, ale mapy wymagają połączenia lub pobranego obszaru.</p>
    </section>`;
}

function renderArrivalFoodPanel(guide) {
  const groups = [
    { title:"Najmniej energii · blisko hotelu", items:guide.food.filter(item=>/Pizza blisko/i.test(item.category)) },
    { title:"Kolacja połączona z Times Square", items:guide.food.filter(item=>/Szybko i kultowo/i.test(item.category)) },
    { title:"Spokojniej przy stoliku · tylko gdy macie siłę", items:guide.food.filter(item=>/przy stoliku/i.test(item.category)) }
  ];
  return `<section class="day-panel" data-panel="food" hidden><h3>Kolacja według poziomu energii</h3><p class="panel-intro">Pierwszego wieczoru wybór lokalu podporządkowujemy zmęczeniu po locie.</p>${groups.map(group=>`<section class="food-moment"><div class="food-moment-head"><span>${group.title}</span></div><div class="food-list">${group.items.map(place=>`<article class="food-card"><div><span class="mini-kicker">${place.category} · ${place.price}</span><h4>${place.name}</h4><p>${place.address}</p><p>${place.note}</p></div><a href="${place.url}" target="_blank" rel="noopener">Menu / informacje ↗</a></article>`).join("")}</div></section>`).join("")}</section>`;
}

function renderArrivalGuide(day, guide) {
  return `<nav class="day-module-nav" aria-label="Sekcje dnia">
    <button class="day-module active" data-day-panel="overview"><b>01</b><span>Plan</span><small>od lądowania do snu</small></button>
    <button class="day-module" data-day-panel="arrival"><b>✈</b><span>Po lądowaniu</span><small>granica, bagaż i hala</small></button>
    <button class="day-module day-module-feature" data-day-panel="transport"><b>→</b><span>JFK → hotel</span><small>taxi, LIRR lub Uber</small></button>
    <button class="day-module" data-day-panel="evening"><b>◇</b><span>Pierwszy wieczór</span><small>Times Square i opcja Bryant</small></button>
    <button class="day-module" data-day-panel="food"><b>☕</b><span>Kolacja</span><small>według poziomu energii</small></button>
    <button class="day-module" data-day-panel="links"><b>↗</b><span>Mapy</span><small>trasy i oficjalne źródła</small></button>
  </nav>
  <section class="day-panel active" data-panel="overview"><div class="sheet-section"><h3>Plan dnia · wybierz punkt</h3>${timeline(day.items,guide.timelineTargets)}</div><div class="sheet-section"><h3>Najważniejsze</h3><div class="simple-card"><p>${day.essentials.join("<br>")}</p></div></div></section>
  <section class="day-panel" data-panel="arrival" hidden><div class="section-heading-row"><h3>Po przylocie · krok po kroku</h3><span>sprawdzono ${guide.checked}</span></div><div class="arrival-steps">${guide.arrival.map((item,index)=>`<article><b>${index+1}</b><div><h4>${item.title.replace(/^\d+\.\s*/,"")}</h4><p>${item.text}</p></div></article>`).join("")}</div></section>
  <section class="day-panel" data-panel="transport" hidden><h3>Jak jedziemy z JFK?</h3><p class="panel-intro">Najpierw porównujemy czas i cenę, potem podejmujemy jedną decyzję bez dalszego analizowania.</p><div class="transport-list">${guide.transport.map(option=>`<article class="transport-card transport-${option.tone}"><div class="transport-head"><div><span class="transport-badge">${option.badge}</span><h4>${option.name}</h4></div><strong>${option.price}</strong></div><div class="transport-time">${option.time}</div><p>${option.text}</p><details class="transport-steps"><summary>Instrukcja krok po kroku</summary><ol>${option.steps.map(step=>`<li>${step}</li>`).join("")}</ol></details></article>`).join("")}</div><div class="decision-card"><h4>${guide.decision.title}</h4><p>${guide.decision.text}</p></div><h3 class="subsection-title">Cel przejazdu</h3><article class="hotel-card"><h4>${guide.hotel.name}</h4><p>${guide.hotel.address}<br>${guide.hotel.phone}</p><p>${guide.hotel.text}</p></article></section>
  <section class="day-panel" data-panel="evening" hidden><h3>Pierwszy wieczór · tylko tyle, ile macie siły</h3><div class="arrival-evening-list">${guide.evening.map((item,index)=>{const stories=item.related?.filter(link=>link.panel==="stories").map(link=>guide.stories[Number(link.key?.split("-")[1])]).filter(Boolean)||[];return `<article class="arrival-evening-card"><span>${index===0?"RESET":index}</span><div><small>${item.time}</small><h4>${item.title}</h4><p>${item.text}</p>${stories.map(story=>`<details class="place-story"><summary>${story.title}</summary><p>${story.text}</p></details>`).join("")}${item.related?.some(link=>link.panel==="food")?`<button data-related-panel="food">Wybierz kolację ›</button>`:""}</div></article>`;}).join("")}</div></section>
  ${renderArrivalFoodPanel(guide)}
  <section class="day-panel" data-panel="links" hidden><h3>Mapy i oficjalne informacje</h3><div class="link-grid">${guide.links.map(link=>`<a href="${link.url}" target="_blank" rel="noopener">${link.label}<span>↗</span></a>`).join("")}</div><p class="data-note">Przed wyborem przejazdu sprawdzamy aktualny komunikat JFK oraz czas drogowy. Instrukcje pozostają dostępne offline.</p></section>`;
}

function renderMomaGuide(day, guide) {
  return `
    <nav class="day-tabs" aria-label="Sekcje dnia">
      <button class="day-tab active" type="button" data-day-panel="overview">Plan</button>
      <button class="day-tab" type="button" data-day-panel="museum">MoMA</button>
      <button class="day-tab" type="button" data-day-panel="works">Dzieła</button>
      <button class="day-tab" type="button" data-day-panel="animation">Animacja</button>
      <button class="day-tab" type="button" data-day-panel="shopping">Zakupy</button>
      <button class="day-tab" type="button" data-day-panel="food">Jedzenie</button>
      <button class="day-tab" type="button" data-day-panel="movie">Kino</button>
      <button class="day-tab" type="button" data-day-panel="variants">Warianty</button>
      <button class="day-tab" type="button" data-day-panel="links">Mapy</button>
    </nav>
    <section class="day-panel active" data-panel="overview">
      <div class="sheet-section"><h3>Plan dnia · wybierz punkt</h3>${timeline(day.items, guide.timelineTargets)}</div>
      <div class="quick-filters" aria-label="Skróty tematyczne"><button data-related-panel="works">Dla Gosi</button><button data-related-panel="animation">Dla Matyldy</button><button data-related-panel="shopping">Zakupy</button><button data-related-panel="movie">Wieczór</button></div>
      <div class="sheet-section"><h3>Najważniejsze</h3><div class="simple-card"><p>${day.essentials.join("<br>")}</p></div></div>
    </section>
    <section class="day-panel" data-panel="museum" hidden>
      <div class="section-heading-row"><h3>MoMA bez muzealnego maratonu</h3><span>sprawdzono ${guide.checked}</span></div>
      <p class="panel-intro">${guide.museum.address}</p>
      <article class="event-card"><h4>Przed wejściem</h4><ul>${guide.museum.practical.map(item => `<li>${item}</li>`).join("")}</ul></article>
      <h3 class="subsection-title">Wybierz tempo</h3>
      <div class="guide-grid">${guide.museum.routes.map(item => guideCard(item)).join("")}</div>
      <h3 class="subsection-title">Piętro po piętrze</h3>
      <div class="route-list">${guide.museum.floors.map((stop, index) => `<article class="route-stop"><div class="route-number">${index + 1}</div><div><h4>${stop.title}</h4><p>${stop.text}</p><div class="look-box"><strong>Na co patrzeć:</strong> ${stop.look}</div><button class="audio-chip" type="button" data-audio-key="floor-${index}">▶ Posłuchaj w muzeum</button>${index < guide.museum.floors.length - 1 ? `<button class="next-stop" type="button" data-next-stop="${index + 1}">Następne piętro →</button>` : ""}</div></article>`).join("")}</div>
    </section>
    <section class="day-panel" data-panel="works" hidden>
      <h3>Sześć dzieł · sześć krótkich opowieści</h3>
      <p class="panel-intro">Nie trzeba oglądać ich w podanej kolejności. Każdy opis ma osobny lektor — uruchomcie go już przed obrazem.</p>
      <div class="guide-grid">${guide.works.map((item, index) => guideCard(item, `work-${index}`, "Posłuchaj przy dziele", `work-${index}`)).join("")}</div>
    </section>
    <section class="day-panel" data-panel="animation" hidden>
      <h3>It’s Alive! · moduł rodzinny</h3>
      <p class="panel-intro">Wystawa działa od 1 sierpnia 2026 do lata 2027 na poziomach T2 i T1.</p>
      <div class="guide-grid">${guide.animation.map((item, index) => guideCard(item, `animation-${index}`, "Posłuchaj", `animation-${index}`)).join("")}</div>
    </section>
    <section class="day-panel" data-panel="shopping" hidden>
      <h3>Zakupy Matyldy · reguła 2 + 1</h3>
      <div class="notice">Wybierzcie dwa sklepy główne i najwyżej jeden szybki. Pięć propozycji nie jest listą do zaliczenia.</div>
      ${matyldaShoppingWishlist("midtown")}
    </section>
    ${renderFoodPanel(guide)}
    <section class="day-panel" data-panel="movie" hidden>
      <span class="event-status">Bezpłatne · 24.08.2026 · 20:00</span>
      <h3>${guide.movie.title}</h3>
      <p class="panel-intro">${guide.movie.intro}</p>
      <div class="event-grid">
        <article class="event-card"><h4>Rytm wieczoru</h4><ul>${guide.movie.schedule.map(item => `<li>${item}</li>`).join("")}</ul></article>
        <article class="event-card"><h4>Co wolno zabrać?</h4><ul>${guide.movie.rules.map(item => `<li>${item}</li>`).join("")}</ul></article>
      </div>
      <h3 class="subsection-title">Dlaczego ten film?</h3>
      <div class="guide-grid">${guideCard({ title: "Elvis jako aktor", text: guide.movie.story }, "movie-0", "Posłuchaj przed filmem")}${guideCard({ title: "Na co zwrócić uwagę", text: guide.movie.listen }, "movie-1", "Posłuchaj")}</div>
      <div class="link-grid compact-links"><a href="${guide.movie.returnUrl}" target="_blank" rel="noopener">Powrót pieszo do hotelu <span>↗</span></a></div>
    </section>
    <section class="day-panel" data-panel="variants" hidden><h3>Wybierz wersję dnia</h3><div class="guide-grid">${guide.variants.map(item => guideCard(item)).join("")}</div></section>
    <section class="day-panel" data-panel="links" hidden>
      <h3>Mapy i oficjalne informacje</h3>
      <div class="link-grid">${guide.links.map(link => `<a href="${link.url}" target="_blank" rel="noopener">${link.label}<span>↗</span></a>`).join("")}</div>
      <p class="data-note">Numery sal, godziny sklepów i status filmu sprawdzamy ponownie rano. Treść przewodnika działa offline, zewnętrzne mapy i aktualizacje pogody wymagają internetu.</p>
    </section>`;
}

function renderMetDayGuide(day, guide) {
  return `<nav class="day-tabs" aria-label="Sekcje dnia">
    <button class="day-tab active" type="button" data-day-panel="overview">Plan</button><button class="day-tab" type="button" data-day-panel="museum">The Met</button><button class="day-tab" type="button" data-day-panel="park">Park</button><button class="day-tab" type="button" data-day-panel="food">Jedzenie</button><button class="day-tab" type="button" data-day-panel="rest">Odpoczynek</button><button class="day-tab" type="button" data-day-panel="theatre">Broadway</button><button class="day-tab" type="button" data-day-panel="variants">Warianty</button><button class="day-tab" type="button" data-day-panel="links">Mapy</button>
  </nav>
  <section class="day-panel active" data-panel="overview"><div class="sheet-section"><h3>Plan dnia · wybierz punkt</h3>${timeline(day.items, guide.timelineTargets)}</div><div class="quick-filters"><button data-related-panel="museum">Sztuka i historie</button><button data-related-panel="theatre">Dla Matyldy</button><button data-related-panel="park">Na zewnątrz</button></div><div class="sheet-section"><h3>Najważniejsze</h3><div class="simple-card"><p>${day.essentials.join("<br>")}</p></div></div></section>
  <section class="day-panel" data-panel="museum" hidden><h3>The Met · pięć obszarów, nie całe muzeum</h3><article class="event-card"><h4>Przed wejściem</h4><ul>${guide.museum.practical.map(x=>`<li>${x}</li>`).join("")}</ul></article><button class="museum-day-link" type="button" data-open-museum-direct="met">Otwórz pełny przewodnik: piętra, artyści i dzieła <span>›</span></button><h3 class="subsection-title">Wybierz tempo</h3><div class="guide-grid">${guide.museum.routes.map(x=>guideCard(x)).join("")}</div><h3 class="subsection-title">Trasa po kolei</h3><div class="route-list">${guide.museum.stops.map((x,i)=>`<article class="route-stop"><div class="route-number">${i+1}</div><div><h4>${x.title}</h4><p>${x.text}</p><div class="look-box"><strong>Na co patrzeć:</strong> ${x.look}</div>${inlinePlaceStories(x.related,guide.stories)}${inlineRelatedActions(x.related)}</div></article>`).join("")}</div></section>
  <section class="day-panel" data-panel="park" hidden><h3>Central Park · zaprojektowany krajobraz miasta</h3><p class="panel-intro">Frederick Law Olmsted i Calvert Vaux zaprojektowali park jako wspólną przestrzeń oddechu dla szybko rosnącego miasta. Naturalny wygląd jest starannie skomponowany: drogi, skały, osie widokowe i zbiorniki prowadzą spacer jak scenografia.</p><div class="route-list">${guide.park.route.map((x,i)=>{const descriptions=["Wyjście z wielkiego muzeum prosto w park pokazuje jeden z najbardziej nowojorskich kontrastów. Po lunchu wybieracie wejście przy 79th Street i schodzicie w stronę środka parku.","Taras jest formalnym sercem parku. Zejdźcie do arkad i spójrzcie w górę na kolorowe płytki Minton, a potem wyjdźcie na szeroki widok jeziora.","Anioł Wód odnosi się do otwarcia akweduktu Croton, który zapewnił miastu bezpieczniejszą wodę. To miejsce obserwowania łodzi, muzyków i codziennego życia parku.","Żeliwny most z 1862 roku został ukształtowany tak, aby odbijać się łukiem w jeziorze. Najlepiej oglądać go również z boku, nie tylko przechodzić środkiem.","Pomnik Johna Lennona leży naprzeciw Dakoty, gdzie mieszkał. Mozaika „Imagine” stała się miejscem pamięci, muzyki i spontanicznych spotkań.","Wyjście po zachodniej stronie skraca drogę do metra i chroni zaplanowany odpoczynek przed Broadwayem."];return `<article class="route-stop"><div class="route-number">${i+1}</div><div><h4>${x}</h4><details class="place-story"><summary>Dlaczego ten punkt jest ważny?</summary><p>${descriptions[i]}</p></details></div></article>`}).join("")}</div><article class="event-card"><h4>Zasady skracania</h4><ul>${guide.park.notes.map(x=>`<li>${x}</li>`).join("")}</ul></article></section>
  ${renderFoodPanel(guide)}
  <section class="day-panel" data-panel="rest" hidden><h3>Odpoczynek jest częścią planu</h3><div class="notice">17:00–17:45: wróćcie do hotelu. Minimum 30 minut siedzenia lub leżenia, ładowanie telefonów, woda, zmiana ubrania. Nie zamieniajcie tej rezerwy na kolejny punkt w parku.</div></section>
  <section class="day-panel" data-panel="theatre" hidden><span class="event-status">${guide.theatre.status}</span><h3>${guide.theatre.title}</h3><p class="panel-intro">${guide.theatre.address}</p><div class="event-grid"><article class="event-card"><h4>Rytm wieczoru</h4><ul>${guide.theatre.schedule.map(x=>`<li>${x}</li>`).join("")}</ul></article><article class="event-card"><h4>Warto wiedzieć</h4><ul>${guide.theatre.practical.map(x=>`<li>${x}</li>`).join("")}</ul></article></div><h3 class="subsection-title">Przed spektaklem · bez spoilerów</h3><div class="guide-grid">${guide.theatre.before.map((x,i)=>guideCard(x,`theatre-${i}`,"Posłuchaj przed wejściem")).join("")}</div><div class="link-grid compact-links"><a href="${guide.theatre.returnUrl}" target="_blank" rel="noopener">Powrót do hotelu <span>↗</span></a></div></section>
  <section class="day-panel" data-panel="variants" hidden><h3>Wybierz wersję dnia</h3><div class="guide-grid">${guide.variants.map(x=>guideCard(x)).join("")}</div></section>
  <section class="day-panel" data-panel="links" hidden><h3>Mapy i oficjalne informacje</h3><div class="link-grid">${guide.links.map(x=>`<a href="${x.url}" target="_blank" rel="noopener">${x.label}<span>↗</span></a>`).join("")}</div><p class="data-note">Galerie i wystawy potrafią się zmieniać. Rano sprawdźcie mapę The Met i ewentualne zamknięcia sal.</p></section>`;
}

function renderQueensGuide(day, guide) {
  return `<nav class="day-tabs" aria-label="Sekcje dnia"><button class="day-tab active" data-day-panel="overview">Plan</button><button class="day-tab" data-day-panel="morning">Midtown</button><button class="day-tab" data-day-panel="route">Queens</button><button class="day-tab" data-day-panel="food">Jedzenie</button><button class="day-tab" data-day-panel="tennis">US Open</button><button class="day-tab" data-day-panel="basics">Tenis 101</button><button class="day-tab" data-day-panel="variants">Warianty</button><button class="day-tab" data-day-panel="links">Mapy</button></nav>
  <section class="day-panel active" data-panel="overview"><div class="sheet-section"><h3>Plan dnia · wybierz punkt</h3>${timeline(day.items,guide.timelineTargets)}</div><div class="quick-filters"><button data-related-panel="morning">Midtown i SUMMIT</button><button data-related-panel="route">Miejsca Queens</button><button data-related-panel="food">Smaki</button><button data-related-panel="basics">Dla laików</button><button data-related-panel="tennis">Stadion</button></div><div class="sheet-section"><h3>Najważniejsze</h3><div class="simple-card"><p>${day.essentials.join("<br>")}</p></div></div></section>
  <section class="day-panel" data-panel="morning" hidden><div class="section-heading-row"><h3>Poranek · ikoniczny Midtown</h3><span>07:00–11:20</span></div><p class="panel-intro">Punkty 1–3 zaczynają wspólną numerację dnia. Śniadanie i przejazd oznaczamy symbolami, ponieważ nie są atrakcjami.</p><div class="route-list">${guide.morning.route.map((x,i)=>{const numbers=["☕","1","2","3","→"];return `<article class="route-stop" data-content-key="morning-stop-${i}"><div class="route-number ${(i===0||i===4)?"route-number-transit":""}">${numbers[i]}</div><div><span class="mini-kicker">${x.time}</span><h4>${x.title}</h4><p>${x.text}</p><div class="look-box"><strong>Rozejrzyj się:</strong> ${x.look}</div>${inlinePlaceStories(x.related,guide.morning.stories)}</div></article>`}).join("")}</div><article class="event-card"><h4>Praktycznie w SUMMIT</h4><ul>${guide.morning.practical.map(x=>`<li>${x}</li>`).join("")}</ul></article></section>
  <section class="day-panel" data-panel="route" hidden><div class="section-heading-row"><h3>Queens · od portu do kortów</h3><span>sprawdzono ${guide.checked}</span></div><p class="panel-intro">Punkty 4–8 kontynuują numerację rozpoczętą w Midtown. Przejazd linią 7 pozostaje strzałką.</p><div class="route-list">${guide.route.map((x,i)=>{const numbers=["4","5","→","6","7","8"];return `<article class="route-stop" data-content-key="q-stop-${i}"><div class="route-number ${i===2?"route-number-transit":""}">${numbers[i]}</div><div><span class="mini-kicker">${x.time}</span><h4>${x.title}</h4><p>${x.text}</p><div class="look-box"><strong>Rozejrzyj się:</strong> ${x.look}</div>${inlinePlaceStories(x.related,guide.stories)}${inlineRelatedActions(x.related)}</div></article>`}).join("")}</div></section>
  ${renderFoodPanel(guide)}
  <section class="day-panel" data-panel="tennis" hidden><span class="event-status">${guide.tennis.status}</span><h3>${guide.tennis.title}</h3><div class="event-grid"><article class="event-card"><h4>Rytm wieczoru</h4><ul>${guide.tennis.schedule.map(x=>`<li>${x}</li>`).join("")}</ul></article><article class="event-card"><h4>Torby i bezpieczeństwo</h4><ul>${guide.tennis.rules.map(x=>`<li>${x}</li>`).join("")}</ul></article></div><h3 class="subsection-title">Zachowanie na stadionie</h3><article class="event-card"><ul>${guide.tennis.etiquette.map(x=>`<li>${x}</li>`).join("")}</ul></article><div class="link-grid compact-links"><a href="${guide.tennis.returnUrl}" target="_blank" rel="noopener">Powrót do hotelu <span>↗</span></a></div></section>
  <section class="day-panel" data-panel="basics" hidden><h3>Tenis 101 · mikst dla laików</h3><div class="guide-grid">${guide.tennis.basics.map((x,i)=>guideCard(x,`tennisbasic-${i}`,"Posłuchaj wyjaśnienia")).join("")}</div></section>
  <section class="day-panel" data-panel="variants" hidden><h3>Wybierz wersję dnia</h3><div class="guide-grid">${guide.variants.map(x=>guideCard(x)).join("")}</div></section>
  <section class="day-panel" data-panel="links" hidden><h3>Mapy i oficjalne informacje</h3><div class="link-grid">${guide.links.map(x=>`<a href="${x.url}" target="_blank" rel="noopener">${x.label}<span>↗</span></a>`).join("")}</div><p class="data-note">Przed wyjściem sprawdźcie bilety, stadion na bilecie, format miksta i aktualne kolejki do wejść.</p></section>`;
}

function renderWestsideGuide(day, guide) {
  return `<nav class="day-tabs" aria-label="Sekcje dnia"><button class="day-tab active" data-day-panel="overview">Plan</button><button class="day-tab" data-day-panel="ferry">Promy</button><button class="day-tab" data-day-panel="photos">Zdjęcia</button><button class="day-tab" data-day-panel="downtown">Downtown</button><button class="day-tab" data-day-panel="museum">Whitney</button><button class="day-tab" data-day-panel="route">High Line</button><button class="day-tab" data-day-panel="food">Jedzenie</button><button class="day-tab" data-day-panel="evening">Wieczór</button><button class="day-tab" data-day-panel="variants">Warianty</button><button class="day-tab" data-day-panel="links">Mapy</button></nav>
  <section class="day-panel active" data-panel="overview"><div class="sheet-section"><h3>Plan dnia · wybierz punkt</h3>${timeline(day.items,guide.timelineTargets)}</div><div class="quick-filters"><button data-related-panel="photos">Ikoniczne zdjęcia</button><button data-related-panel="museum">Dla Gosi</button><button data-related-panel="evening">Dla Matyldy</button><button data-related-panel="downtown">Miejsca i historie</button></div><div class="sheet-section"><h3>Najważniejsze</h3><div class="simple-card"><p>${day.essentials.join("<br>")}</p></div></div></section>
  <section class="day-panel" data-panel="ferry" hidden><div class="section-heading-row"><h3>Dwa promy · jedna trasa przez port</h3><span>sprawdzono ${guide.checked}</span></div><div class="event-grid"><article class="event-card"><h4>Harmonogram orientacyjny</h4><ul>${guide.ferry.schedule.map(x=>`<li>${x}</li>`).join("")}</ul></article><article class="event-card"><h4>Ważne</h4><ul>${guide.ferry.notes.map(x=>`<li>${x}</li>`).join("")}</ul></article></div><div class="notice">Godziny promów sprawdzamy ponownie rano. Połączenie jest atrakcyjne właśnie dlatego, że nie wracacie tą samą drogą.</div></section>
  <section class="day-panel" data-panel="photos" hidden><h3>Statua Wolności · instrukcja zdjęcia</h3><p class="panel-intro">To nie przypadkowa fotografia z pokładu. Każda wskazówka ma osobny lektor, żeby można było uruchomić ją już na promie.</p><div class="guide-grid">${guide.photos.onboard.map((x,i)=>guideCard(x,`wphoto-${i}`,"Posłuchaj na promie")).join("")}</div><h3 class="subsection-title">Dobre miejsca z brzegu</h3><div class="guide-grid">${guide.photos.shore.map((x,i)=>guideCard(x,`wshore-${i}`,"Posłuchaj oceny miejsca")).join("")}</div></section>
  <section class="day-panel" data-panel="downtown" hidden><h3>Lower Manhattan · trzy przystanki</h3><p class="panel-intro">Memoriał oglądamy bez muzeum. Każda historia rozwija się przy właściwym miejscu.</p><div class="route-list">${guide.downtown.route.map((x,i)=>`<article class="route-stop"><div class="route-number">${i+1}</div><div><h4>${x.title}</h4><p>${x.text}</p>${inlinePlaceStories(x.related,guide.stories)}${inlineRelatedActions(x.related)}</div></article>`).join("")}</div></section>
  <section class="day-panel" data-panel="museum" hidden><div class="section-heading-row"><h3>Whitney · sztuka i widok</h3><span>sprawdzono ${guide.checked}</span></div><div class="notice">Biennale kończy się 23 sierpnia. Trasa nie zakłada jego dostępności.</div><article class="event-card"><h4>Przed wejściem</h4><ul>${guide.museum.practical.map(x=>`<li>${x}</li>`).join("")}</ul></article><h3 class="subsection-title">Wybierz tempo</h3><div class="guide-grid">${guide.museum.routes.map(x=>guideCard(x)).join("")}</div><h3 class="subsection-title">Trasa muzealna</h3><div class="route-list">${guide.museum.stops.map((x,i)=>`<article class="route-stop"><div class="route-number">${i+1}</div><div><h4>${x.title}</h4><p>${x.text}</p><div class="look-box"><strong>Na co patrzeć:</strong> ${x.look}</div>${inlinePlaceStories(x.related,guide.stories)}${inlineRelatedActions(x.related)}</div></article>`).join("")}</div></section>
  <section class="day-panel" data-panel="route" hidden><h3>High Line · miasto warstwa po warstwie</h3><div class="route-list">${guide.route.map((x,i)=>`<article class="route-stop"><div class="route-number">${i+1}</div><div><span class="mini-kicker">${x.time}</span><h4>${x.title}</h4><p>${x.text}</p><div class="look-box"><strong>Rozejrzyj się:</strong> ${x.look}</div>${inlinePlaceStories(x.related,guide.stories)}${inlineRelatedActions(x.related)}</div></article>`).join("")}</div></section>
  ${renderFoodPanel(guide)}
  <section class="day-panel" data-panel="evening" hidden><h3>Wieczór wybierany tego samego dnia</h3><div class="guide-grid">${guide.evening.map((x,i)=>guideCard(x,`wevening-${i}`,"Posłuchaj wariantu")).join("")}</div></section>
  <section class="day-panel" data-panel="variants" hidden><h3>Wybierz wersję dnia</h3><div class="guide-grid">${guide.variants.map(x=>guideCard(x)).join("")}</div></section>
  <section class="day-panel" data-panel="links" hidden><h3>Mapy i oficjalne informacje</h3><div class="link-grid">${guide.links.map(x=>`<a href="${x.url}" target="_blank" rel="noopener">${x.label}<span>↗</span></a>`).join("")}</div><p class="data-note">Rano potwierdzamy piętra Whitney, pogodę na High Line oraz rozkłady promów.</p></section>`;
}

function renderSohoYankeesGuide(day, guide) {
  return `<nav class="day-tabs" aria-label="Sekcje dnia"><button class="day-tab active" data-day-panel="overview">Plan</button><button class="day-tab" data-day-panel="route">SoHo</button><button class="day-tab" data-day-panel="shopping">Zakupy</button><button class="day-tab" data-day-panel="food">Jedzenie</button><button class="day-tab" data-day-panel="rest">Reset</button><button class="day-tab" data-day-panel="transport">Dojazd</button><button class="day-tab" data-day-panel="stadium">Stadion</button><button class="day-tab" data-day-panel="baseball">Baseball 101</button><button class="day-tab" data-day-panel="variants">Warianty</button><button class="day-tab" data-day-panel="links">Mapy</button></nav>
  <section class="day-panel active" data-panel="overview"><div class="sheet-section"><h3>Plan dnia · wybierz punkt</h3>${timeline(day.items,guide.timelineTargets)}</div><div class="quick-filters"><button data-related-panel="shopping">Dla Matyldy</button><button data-related-panel="route">Miejsca i historie</button><button data-related-panel="baseball">Dla laików</button><button data-related-panel="stadium">Mecz</button></div><div class="sheet-section"><h3>Najważniejsze</h3><div class="simple-card"><p>${day.essentials.join("<br>")}</p></div></div></section>
  <section class="day-panel" data-panel="route" hidden><div class="section-heading-row"><h3>SoHo i Nolita · fasady, nie lista sklepów</h3><span>sprawdzono ${guide.checked}</span></div><div class="route-list">${guide.route.map((x,i)=>`<article class="route-stop"><div class="route-number">${i+1}</div><div><span class="mini-kicker">${x.time}</span><h4>${x.title}</h4><p>${x.text}</p><div class="look-box"><strong>Rozejrzyj się:</strong> ${x.look}</div>${inlinePlaceStories(x.related,guide.stories)}${i===guide.route.length-1?`<details class="place-story"><summary>${guide.stories[3].title}</summary><p>${guide.stories[3].text}</p></details>`:""}</div></article>`).join("")}</div></section>
  <section class="day-panel" data-panel="shopping" hidden><h3>Zakupy Matyldy · wybór, nie maraton</h3><div class="notice">Wybierzcie dwa sklepy główne i maksymalnie jeden szybki. O 14:15 kończą się zakupy niezależnie od kolejek.</div>${matyldaShoppingWishlist("soho")}</section>
  ${renderFoodPanel(guide)}
  <section class="day-panel" data-panel="rest" hidden><h3>Hotel · 45 minut zmiany trybu</h3><div class="notice">Zakupy zostają w pokoju. Woda, ładowanie telefonu, wygodne buty i bilety dodane do Apple Wallet. Ten bufor chroni Monument Park — nie zamieniamy go na kolejny sklep.</div></section>
  <section class="day-panel" data-panel="transport" hidden><h3>Manhattan → Bronx → hotel</h3><article class="event-card"><ul>${guide.transport.notes.map(x=>`<li>${x}</li>`).join("")}</ul></article><div class="link-grid compact-links"><a href="${guide.transport.returnUrl}" target="_blank" rel="noopener">Powrót po meczu <span>↗</span></a></div></section>
  <section class="day-panel" data-panel="stadium" hidden><span class="event-status">${guide.stadium.status}</span><h3>Yankee Stadium · co po kolei</h3><div class="event-grid"><article class="event-card"><h4>Rytm stadionu</h4><ul>${guide.stadium.schedule.map(x=>`<li>${x}</li>`).join("")}</ul></article><article class="event-card"><h4>Torby i wejście</h4><ul>${guide.stadium.rules.map(x=>`<li>${x}</li>`).join("")}</ul></article></div><details class="place-story"><summary>${guide.stories[4].title}</summary><p>${guide.stories[4].text}</p></details><h3 class="subsection-title">Zachowania i tradycje</h3><div class="guide-grid">${guide.stadium.traditions.map((text,i)=>guideCard({title:["Monument Park","Dwa strike’i","Seventh-inning stretch","New York, New York"][i],text},`systadium-${i}`,"Posłuchaj na stadionie")).join("")}</div></section>
  <section class="day-panel" data-panel="baseball" hidden><h3>Baseball 101 · żeby wiedzieć, kiedy patrzeć</h3><p class="panel-intro">Nie musicie zapamiętać wszystkich przepisów. Stan baz, auty i wynik wystarczą, żeby rozumieć napięcie.</p><div class="guide-grid">${guide.baseball.basics.map((x,i)=>guideCard(x,`baseballbasic-${i}`,"Posłuchaj wyjaśnienia")).join("")}</div></section>
  <section class="day-panel" data-panel="variants" hidden><h3>Wybierz wersję dnia</h3><div class="guide-grid">${guide.variants.map(x=>guideCard(x)).join("")}</div></section>
  <section class="day-panel" data-panel="links" hidden><h3>Mapy i oficjalne informacje</h3><div class="link-grid">${guide.links.map(x=>`<a href="${x.url}" target="_blank" rel="noopener">${x.label}<span>↗</span></a>`).join("")}</div><p class="data-note">Rano sprawdzamy pogodę i komunikaty MLB Ballpark, a przed wyjściem z hotelu bieżące kursowanie linii B/D/4.</p></section>`;
}

function renderBrooklynJazzGuide(day, guide) {
  return `<nav class="day-tabs" aria-label="Sekcje dnia"><button class="day-tab active" data-day-panel="overview">Plan</button><button class="day-tab" data-day-panel="brooklyn">DUMBO</button><button class="day-tab" data-day-panel="food">Jedzenie</button><button class="day-tab" data-day-panel="bargemusic">Bargemusic</button><button class="day-tab" data-day-panel="apollo">Apollo</button><button class="day-tab" data-day-panel="festival">Festival</button><button class="day-tab" data-day-panel="parker">Charlie Parker</button><button class="day-tab" data-day-panel="artists">Artyści</button><button class="day-tab" data-day-panel="variants">Warianty</button><button class="day-tab" data-day-panel="links">Mapy</button></nav>
  <section class="day-panel active" data-panel="overview"><div class="sheet-section"><h3>Plan dnia · wybierz punkt</h3>${timeline(day.items,guide.timelineTargets)}</div><div class="quick-filters"><button data-related-panel="brooklyn">Ikoniczne zdjęcia</button><button data-related-panel="parker">Charlie i Whiplash</button><button data-related-panel="artists">Kogo usłyszymy?</button><button data-related-panel="food">Jedzenie</button></div><div class="sheet-section"><h3>Najważniejsze</h3><div class="simple-card"><p>${day.essentials.join("<br>")}</p></div></div></section>
  <section class="day-panel" data-panel="brooklyn" hidden><div class="section-heading-row"><h3>DUMBO → Pier 5</h3><span>sprawdzono ${guide.checked}</span></div><div class="route-list">${guide.brooklyn.map((x,i)=>`<article class="route-stop"><div class="route-number">${i+1}</div><div><span class="mini-kicker">${x.time}</span><h4>${x.title}</h4><p>${x.text}</p><div class="look-box"><strong>Rozejrzyj się:</strong> ${x.look}</div>${inlinePlaceStories(x.related,guide.stories)}</div></article>`).join("")}</div></section>
  ${renderFoodPanel(guide)}
  <section class="day-panel" data-panel="bargemusic" hidden><span class="event-status">${guide.bargemusic.status}</span><h3>${guide.bargemusic.title}</h3><p class="panel-intro">${guide.bargemusic.address}</p><div class="notice">To już nie jest koncert na barce. W 2026 roku idziecie do Boathouse w parkowym wzgórzu przy Pier 5.</div><div class="event-grid"><article class="event-card"><h4>Rytm wizyty</h4><ul>${guide.bargemusic.schedule.map(x=>`<li>${x}</li>`).join("")}</ul></article><article class="event-card"><h4>Zasady</h4><ul>${guide.bargemusic.rules.map(x=>`<li>${x}</li>`).join("")}</ul></article></div><h3 class="subsection-title">Jak słuchać?</h3><div class="guide-grid">${guide.bargemusic.listen.map((x,i)=>guideCard(x,`bargelisten-${i}`,"Posłuchaj przed koncertem")).join("")}</div></section>
  <section class="day-panel" data-panel="apollo" hidden><span class="event-status">${guide.apollo.status}</span><h3>Apollo · neon, galeria i pamięć sceny</h3><div class="event-grid"><article class="event-card"><h4>Po kolei</h4><ul>${guide.apollo.schedule.map(x=>`<li>${x}</li>`).join("")}</ul></article><article class="event-card"><h4>Ważne</h4><ul>${guide.apollo.notes.map(x=>`<li>${x}</li>`).join("")}</ul></article></div><details class="place-story"><summary>${guide.stories[3].title}</summary><p>${guide.stories[3].text}</p></details></section>
  <section class="day-panel" data-panel="festival" hidden><span class="event-status">${guide.festival.status}</span><h3>${guide.festival.title}</h3><p class="panel-intro">${guide.festival.address}</p><div class="notice">Program zaczyna się o 14:00. Dołączacie na finałową część — bez poczucia, że trzeba „zaliczyć” wszystkich artystów.</div><h3 class="subsection-title">Jak słuchać jazzu na żywo?</h3><div class="guide-grid">${guide.festival.basics.map((x,i)=>guideCard(x,`jazzbasic-${i}`,"Posłuchaj w parku")).join("")}</div><h3 class="subsection-title">Posłuchaj przed podróżą</h3><div class="playlist-grid">${guide.festival.playlist.map(x=>`<a href="${x.url}" target="_blank" rel="noopener"><strong>${x.label}</strong><small>${x.note}</small><span>↗</span></a>`).join("")}</div></section>
  <section class="day-panel" data-panel="parker" hidden><h3>Charlie Parker · Bird, bebop i mit z „Whiplash”</h3><p class="panel-intro">Matylda może zacząć od filmu, ale tutaj oddzielamy prawdziwą historię od wersji Fletchera.</p><div class="guide-grid">${[guide.stories[4],guide.stories[5],guide.stories[6]].map((x,i)=>guideCard(x,`parker-${i}`,"Posłuchaj opowieści")).join("")}</div></section>
  <section class="day-panel" data-panel="artists" hidden><h3>Kogo usłyszymy?</h3><div class="guide-grid">${guide.festival.lineup.map((x,i)=>guideCard(x,`jazzartist-${i}`,"Posłuchaj przed występem")).join("")}</div></section>
  <section class="day-panel" data-panel="variants" hidden><h3>Wybierz wersję dnia</h3><div class="guide-grid">${guide.variants.map(x=>guideCard(x)).join("")}</div></section>
  <section class="day-panel" data-panel="links" hidden><h3>Mapy i oficjalne informacje</h3><div class="link-grid">${guide.links.map(x=>`<a href="${x.url}" target="_blank" rel="noopener">${x.label}<span>↗</span></a>`).join("")}</div><p class="data-note">Przed wyjściem potwierdzamy program Bargemusic, pogodę i komunikat SummerStage. Najważniejsza decyzja logistyczna: przy opóźnieniu Apollo ustępuje festiwalowi.</p></section>`;
}

function renderDepartureGuide(day, guide) {
  return `<nav class="day-tabs" aria-label="Sekcje dnia"><button class="day-tab active" data-day-panel="overview">Plan</button><button class="day-tab" data-day-panel="diner">Diner</button><button class="day-tab" data-day-panel="hotel">Hotel</button><button class="day-tab" data-day-panel="walk">Spacer</button><button class="day-tab" data-day-panel="food">Jedzenie</button><button class="day-tab" data-day-panel="transport">JFK</button><button class="day-tab" data-day-panel="airport">Lotnisko</button><button class="day-tab" data-day-panel="variants">Warianty</button><button class="day-tab" data-day-panel="links">Mapy</button></nav>
  <section class="day-panel active" data-panel="overview"><div class="sheet-section"><h3>Plan dnia · wybierz punkt</h3>${timeline(day.items,guide.timelineTargets)}</div><div class="quick-filters"><button data-related-panel="diner">Śniadanie</button><button data-related-panel="walk">Ostatni spacer</button><button data-related-panel="transport">Walizki i JFK</button><button data-related-panel="airport">Lista przed lotem</button></div><div class="sheet-section"><h3>Najważniejsze</h3><div class="simple-card"><p>${day.essentials.join("<br>")}</p></div></div></section>
  <section class="day-panel" data-panel="diner" hidden><h3>Nowojorski diner · ostatni rytuał</h3><p class="panel-intro">${guide.diner.intro}</p><h3 class="subsection-title">Gdzie zjeść śniadanie?</h3>${foodCards(guide.food.filter(place=>place.category.startsWith("Śniadanie")))}<h3 class="subsection-title">Jak zamawiać?</h3><div class="guide-grid">${guide.diner.basics.map((x,i)=>guideCard(x,`depdiner-${i}`,"Posłuchaj przy stole")).join("")}</div></section>
  <section class="day-panel" data-panel="hotel" hidden><h3>Wymeldowanie i odbiór bagaży</h3><div class="notice">Check-out nie jest drobnym punktem administracyjnym. Robimy go przed spacerem, żeby o 13:45 pozostał już tylko odbiór walizek.</div><article class="event-card"><ul>${guide.hotel.steps.map(x=>`<li>${x}</li>`).join("")}</ul></article></section>
  <section class="day-panel" data-panel="walk" hidden><div class="section-heading-row"><h3>42nd Street · ostatnie spojrzenie</h3><span>sprawdzono ${guide.checked}</span></div><div class="route-list">${guide.walk.map((x,i)=>`<article class="route-stop"><div class="route-number">${i+1}</div><div><span class="mini-kicker">${x.time}</span><h4>${x.title}</h4><p>${x.text}</p><div class="look-box"><strong>Rozejrzyj się:</strong> ${x.look}</div>${inlinePlaceStories(x.related,guide.stories)}${x.title.includes("Grand Central")?`<details class="place-story"><summary>${guide.stories[4].title}</summary><p>${guide.stories[4].text}</p></details>`:""}</div></article>`).join("")}</div></section>
  <section class="day-panel" data-panel="food" hidden><h3>Lunch i jedzenie na drogę</h3><p class="panel-intro">Śniadanie jest przypisane do punktu Diner na mapie. Tutaj zostają propozycje po spacerze i przed wyjazdem na JFK.</p>${foodCards(guide.food.filter(place=>!place.category.startsWith("Śniadanie")))}</section>
  <section class="day-panel" data-panel="transport" hidden><h3>Hotel → JFK · wybór o 13:45</h3><article class="transport-card transport-recommended"><div class="transport-head"><div><span class="transport-badge">Rekomendowane</span><h4>${guide.transport.recommended.title}</h4></div></div><div class="transport-time">${guide.transport.recommended.time}</div><p>${guide.transport.recommended.text}</p></article><h3 class="subsection-title">LIRR + AirTrain krok po kroku</h3><article class="event-card"><ul>${guide.transport.lirrSteps.map(x=>`<li>${x}</li>`).join("")}</ul></article><h3 class="subsection-title">Alternatywy</h3><div class="guide-grid">${guide.transport.alternatives.map(x=>guideCard(x)).join("")}</div></section>
  <section class="day-panel" data-panel="airport" hidden><span class="event-status">Wylot 19:29 · planowane JFK 16:00–16:30</span><h3>Na lotnisku po kolei</h3><div class="event-grid"><article class="event-card"><h4>Harmonogram</h4><ul>${guide.airport.schedule.map(x=>`<li>${x}</li>`).join("")}</ul></article><article class="event-card"><h4>Ostatnia kontrola</h4><ul>${guide.airport.checklist.map(x=>`<li>${x}</li>`).join("")}</ul></article></div></section>
  <section class="day-panel" data-panel="variants" hidden><h3>Wybierz wersję dnia</h3><div class="guide-grid">${guide.variants.map(x=>guideCard(x)).join("")}</div></section>
  <section class="day-panel" data-panel="links" hidden><h3>Mapy i oficjalne informacje</h3><div class="link-grid">${guide.links.map(x=>`<a href="${x.url}" target="_blank" rel="noopener">${x.label}<span>↗</span></a>`).join("")}</div><p class="data-note">Dzień wcześniej wpisujemy numer lotu i terminal. O 13:45 sprawdzamy TrainTime, AirTrain oraz ruch drogowy i wybieramy wariant bez dalszego odkładania decyzji.</p></section>`;
}

const MODERN_DAY_MODULES = {
  moma:[['overview','01','Plan','godziny i kolejność'],['museum','▣','MoMA','trasa po piętrach'],['works','★','Dzieła','najważniejsze prace'],['animation','●','Animacja','moduł rodzinny'],['shopping','◇','Rockefeller i zakupy','moduł Matyldy'],['food','☕','Jedzenie','lunch i piknik'],['movie','▶','Bryant Park','kino pod wieżowcami'],['links','↗','Mapy','trasy i źródła']],
  metday:[['overview','01','Plan','muzeum, park i teatr'],['museum','▣','The Met','trasa i pełny katalog'],['park','♧','Central Park','miejsca i ich historie'],['food','☕','Jedzenie','lunch i kolacja'],['rest','H','Odpoczynek','reset w hotelu'],['theatre','★','Broadway','Stranger Things'],['links','↗','Mapy','trasy i źródła']],
  queens:[['overview','01','Plan','Midtown, Queens i korty'],['morning','△','Midtown i SUMMIT','Empire, Fifth i katedra'],['route','◎','Miejsca Queens','LIC, Flushing i Unisphere'],['food','☕','Jedzenie','lunch we Flushing'],['tennis','●','US Open','wejście i stadion'],['basics','?','Tenis 101','zasady dla laików'],['links','↗','Mapy','trasy i powrót']],
  westside:[['overview','01','Plan','port, sztuka i spacer'],['ferry','≈','Promy','dwa rejsy'],['photos','★','Statua','ikoniczne zdjęcia'],['downtown','$','Downtown','Wall Street i memoriał'],['museum','▣','Whitney','sztuka amerykańska'],['route','━','High Line','spacer na północ'],['food','☕','Jedzenie','według części dnia'],['evening','◇','Wieczór','Hudson Yards i opcje'],['links','↗','Mapy','trasy i rozkłady']],
  sohoyankees:[['overview','01','Plan','SoHo i baseball'],['route','◇','Miejsca SoHo','fasady i Nolita'],['shopping','☆','Zakupy','moduł Matyldy'],['food','☕','Jedzenie','lunch i stadion'],['rest','H','Reset','powrót do hotelu'],['transport','→','Dojazd','metro do Bronksu'],['stadium','⚾','Yankee Stadium','rytuał meczu'],['baseball','?','Baseball 101','zasady dla laików'],['links','↗','Mapy','trasy i powrót']],
  brooklynjazz:[['overview','01','Plan','Brooklyn i Harlem'],['brooklyn','▱','DUMBO','nabrzeże i zdjęcia'],['food','☕','Jedzenie','lunch przed koncertem'],['bargemusic','♪','Bargemusic','koncert kameralny'],['apollo','★','Apollo','historia sceny'],['festival','♫','Charlie Parker','festiwal w parku'],['parker','B','Bird','bebop i Whiplash'],['artists','●','Artyści','kogo usłyszymy'],['links','↗','Mapy','Brooklyn → Harlem']],
  departure:[['overview','01','Plan','ostatni dzień'],['diner','☕','Diner','śniadanie'],['hotel','H','Hotel','bagaże i check-out'],['walk','⌘','Ostatni spacer','Bryant, NYPL i Grand Central'],['food','◇','Jedzenie','lunch i droga'],['transport','→','JFK','LIRR, taxi lub Uber'],['airport','✈','Lotnisko','checklista i lot'],['links','↗','Mapy','trasy i statusy']]
};

function modernizeDayModules(kind, markup) {
  if (markup.includes('class="day-module-nav"')) return markup;
  const modules=MODERN_DAY_MODULES[kind];
  if(!modules) return markup;
  const nav=`<nav class="day-module-nav" aria-label="Sekcje dnia">${modules.map((item,index)=>`<button class="day-module ${index===0?'active':''}" type="button" data-day-panel="${item[0]}"><b>${item[1]}</b><span>${item[2]}</span><small>${item[3]}</small></button>`).join('')}</nav>`;
  return markup.replace(/<nav class="day-tabs"[\s\S]*?<\/nav>/,nav);
}

function renderDayGuide(day) {
  const guide = typeof DAY_GUIDES !== "undefined" ? DAY_GUIDES[day.id] : null;
  if (!guide) return "";
  if (guide.kind === "village") return renderVillageGuide(day, guide);
  if (guide.kind === "arrival") return renderArrivalGuide(day, guide);
  const renderers={moma:renderMomaGuide,metday:renderMetDayGuide,queens:renderQueensGuide,westside:renderWestsideGuide,sohoyankees:renderSohoYankeesGuide,brooklynjazz:renderBrooklynJazzGuide,departure:renderDepartureGuide};
  if(renderers[guide.kind]) return modernizeDayModules(guide.kind,renderers[guide.kind](day,guide));
  return `
    <nav class="day-tabs" aria-label="Sekcje dnia">
      <button class="day-tab active" type="button" data-day-panel="overview">Plan</button>
      <button class="day-tab" type="button" data-day-panel="arrival">Po przylocie</button>
      <button class="day-tab" type="button" data-day-panel="transport">Transport</button>
      <button class="day-tab" type="button" data-day-panel="evening">Wieczór</button>
      <button class="day-tab" type="button" data-day-panel="food">Jedzenie</button>
      <button class="day-tab" type="button" data-day-panel="links">Mapy</button>
    </nav>
    <section class="day-panel active" data-panel="overview">
      <div class="sheet-section"><h3>Plan dnia · wybierz punkt</h3>${timeline(day.items, guide.timelineTargets)}</div>
      <div class="sheet-section"><h3>Najważniejsze</h3><div class="simple-card"><p>${day.essentials.join("<br>")}</p></div></div>
    </section>
    <section class="day-panel" data-panel="arrival" hidden>
      <div class="section-heading-row"><h3>Po przylocie · krok po kroku</h3><span>sprawdzono ${guide.checked}</span></div>
      <div class="guide-grid">${guide.arrival.map(item => guideCard(item)).join("")}</div>
    </section>
    <section class="day-panel" data-panel="transport" hidden>
      <h3>Jak jedziemy z JFK?</h3>
      <div class="transport-list">${guide.transport.map(option => `
        <article class="transport-card transport-${option.tone}">
          <div class="transport-head"><div><span class="transport-badge">${option.badge}</span><h4>${option.name}</h4></div><strong>${option.price}</strong></div>
          <div class="transport-time">${option.time}</div>
          <p>${option.text}</p>
          <ol>${option.steps.map(step => `<li>${step}</li>`).join("")}</ol>
        </article>`).join("")}</div>
      <div class="decision-card"><h4>${guide.decision.title}</h4><p>${guide.decision.text}</p></div>
      <h3 class="subsection-title">Hotel</h3>
      <article class="hotel-card"><h4>${guide.hotel.name}</h4><p>${guide.hotel.address}<br>${guide.hotel.phone}</p><p>${guide.hotel.text}</p></article>
    </section>
    <section class="day-panel" data-panel="evening" hidden>
      <h3>Pierwszy wieczór</h3>
      <div class="guide-grid">${guide.evening.map(item => `<article class="guide-card"><span class="mini-kicker">${item.time}</span><h4>${item.title}</h4><p>${item.text}</p>${item.related?.length ? `<div class="related-row">${item.related.map(link => `<button type="button" data-related-panel="${link.panel}" ${link.key ? `data-related-key="${link.key}"` : ""} data-return-label="Wieczór · ${item.title}">${link.label} ›</button>`).join("")}</div>` : ""}</article>`).join("")}</div>
    </section>
    ${renderFoodPanel(guide)}
    <section class="day-panel" data-panel="links" hidden>
      <h3>Mapy i oficjalne informacje</h3>
      <div class="link-grid">${guide.links.map(link => `<a href="${link.url}" target="_blank" rel="noopener">${link.label}<span>↗</span></a>`).join("")}</div>
      <p class="data-note">Ceny i organizacja transportu mogą zmienić się przed podróżą. Aplikacja przechowuje instrukcję offline, ale przed wyborem przejazdu warto sprawdzić aktualny komunikat JFK.</p>
    </section>`;
}

function getPolishVoice() {
  const voices = window.speechSynthesis?.getVoices() || [];
  const savedVoice = localStorage.getItem("nyc-preferred-voice");
  if (savedVoice) {
    const selected = voices.find(voice => voice.name === savedVoice);
    if (selected) return selected;
  }
  return voices.find(voice => voice.lang.toLowerCase() === "pl-pl")
    || voices.find(voice => voice.lang.toLowerCase().startsWith("pl"))
    || null;
}

function populateVoiceSelect() {
  const select = document.getElementById("voiceSelect");
  if (!select || !("speechSynthesis" in window)) return;
  const polishVoices = speechSynthesis.getVoices().filter(voice => voice.lang.toLowerCase().startsWith("pl"));
  const chosen = getPolishVoice();
  select.innerHTML = polishVoices.length
    ? polishVoices.map(voice => `<option value="${voice.name}" ${voice.name === chosen?.name ? "selected" : ""}>${voice.name} · ${voice.lang}</option>`).join("")
    : `<option>Domyślny polski głos urządzenia</option>`;
}

function updateReaderUi(message = "") {
  const playButton = document.getElementById("readerPlayButton");
  const stopButton = document.getElementById("readerStopButton");
  const status = document.getElementById("readerStatus");
  if (playButton) {
    playButton.textContent = reading ? "❚❚ Pauza" : "▶ Odsłuchaj dzień";
    playButton.setAttribute("aria-label", reading ? "Wstrzymaj czytanie" : "Odsłuchaj opis dnia");
  }
  if (stopButton) stopButton.disabled = !window.speechSynthesis?.speaking && !reading;
  if (status) status.textContent = message;
}

function toggleReading() {
  if (!("speechSynthesis" in window)) {
    updateReaderUi("Ta przeglądarka nie obsługuje odtwarzania głosowego.");
    return;
  }
  if (activeSnippetButton) stopReading();
  if (speechSynthesis.speaking && !speechSynthesis.paused) {
    speechSynthesis.pause();
    reading = false;
    updateReaderUi("Odtwarzanie wstrzymane");
    return;
  }
  if (speechSynthesis.paused) {
    speechSynthesis.resume();
    reading = true;
    updateReaderUi("Czytam po polsku…");
    return;
  }
  const utterance = new SpeechSynthesisUtterance(speechText(currentReadingText));
  utterance.lang = "pl-PL";
  utterance.rate = 0.92;
  utterance.pitch = 1;
  const voice = getPolishVoice();
  if (voice) utterance.voice = voice;
  utterance.onstart = () => { reading = true; updateReaderUi("Czytam po polsku…"); };
  utterance.onend = () => { reading = false; updateReaderUi("Odsłuch zakończony"); };
  utterance.onerror = () => { reading = false; updateReaderUi("Nie udało się uruchomić lektora."); };
  speechSynthesis.speak(utterance);
}

function stopReading(message = "") {
  if ("speechSynthesis" in window) speechSynthesis.cancel();
  reading = false;
  if (activeSnippetButton) {
    activeSnippetButton.textContent = activeSnippetButton.dataset.idleLabel || "▶ Posłuchaj historii";
    activeSnippetButton.classList.remove("playing");
    activeSnippetButton = null;
  }
  updateReaderUi(message);
}

function playSnippet(text, button) {
  if (!("speechSynthesis" in window)) return;
  if (!button.dataset.idleLabel) button.dataset.idleLabel = button.textContent;
  if (activeSnippetButton === button && speechSynthesis.speaking && !speechSynthesis.paused) {
    speechSynthesis.pause();
    button.textContent = "▶ Wznów";
    return;
  }
  if (activeSnippetButton === button && speechSynthesis.paused) {
    speechSynthesis.resume();
    button.textContent = "❚❚ Pauza";
    return;
  }
  stopReading();
  activeSnippetButton = button;
  const utterance = new SpeechSynthesisUtterance(speechText(text));
  utterance.lang = "pl-PL";
  utterance.rate = 0.92;
  const voice = getPolishVoice();
  if (voice) utterance.voice = voice;
  utterance.onstart = () => { button.textContent = "❚❚ Pauza"; button.classList.add("playing"); };
  utterance.onend = () => { if (activeSnippetButton === button) stopReading(); };
  utterance.onerror = () => { if (activeSnippetButton === button) stopReading(); };
  speechSynthesis.speak(utterance);
}

function statusLabel(type) {
  return type === "fixed" ? "Stały punkt" : type === "option" ? "Opcjonalne" : "Plan główny";
}

function getTripDay() {
  const today = new Date();
  const localId = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const exact = DAYS.find(day => day.id === localId);
  if (exact) return exact;
  if (today < new Date("2026-08-22T00:00:00")) return DAYS[0];
  return DAYS[DAYS.length - 1];
}

function timeline(items, panelTargets = []) {
  return `<div class="timeline">${items.map((item, index) => `
    <article class="timeline-item ${panelTargets[index] ? "timeline-link" : ""}" ${panelTargets[index] ? `data-panel-jump="${panelTargets[index]}" tabindex="0" role="button"` : ""}>
      <div class="timeline-time">${item.time}</div>
      <div class="timeline-content">
        <h4>${item.title}</h4>
        <p>${item.note}</p>
        <span class="status-pill status-${item.type}">${statusLabel(item.type)}</span>
      </div>
      ${panelTargets[index] ? `<div class="timeline-arrow">›</div>` : ""}
    </article>`).join("")}</div>`;
}

function dayPanelLabel(panelName) {
  return sheetContent.querySelector(`[data-day-panel="${panelName}"]`)?.textContent?.trim() || "poprzedniej sekcji";
}

function updateContextBackButton() {
  const button = document.getElementById("dayContextBack");
  if (!button) return;
  const previous = dayPanelHistory.at(-1);
  button.hidden = !previous;
  if (previous) button.textContent = `← Wróć: ${previous.label}`;
}

function saveCurrentDayState() {
  if (!activeDayId || sheet.hidden) return;
  savedDayStates.set(activeDayId, {
    panel: currentDayPanel,
    scrollTop: sheet.scrollTop,
    history: dayPanelHistory.map(item => ({ ...item }))
  });
}

function showDayPanel(panelName, focusKey = "", options = {}) {
  const { remember = false, restoreScroll = null, originLabel = "" } = options;
  stopReading();
  if (remember && currentDayPanel && (currentDayPanel !== panelName || focusKey)) {
    dayPanelHistory.push({
      panel: currentDayPanel,
      scrollTop: sheet.scrollTop,
      label: originLabel || dayPanelLabel(currentDayPanel)
    });
  }
  currentDayPanel = panelName;
  sheetContent.querySelectorAll(".day-panel").forEach(panel => {
    const active = panel.dataset.panel === panelName;
    panel.hidden = !active;
    panel.classList.toggle("active", active);
  });
  sheetContent.querySelectorAll(".day-tab, .day-module").forEach(tab => {
    const active = tab.dataset.dayPanel === panelName;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", String(active));
  });
  const tabs = sheetContent.querySelector(".day-tabs, .day-module-nav");
  if (restoreScroll !== null) {
    requestAnimationFrame(() => sheet.scrollTo({ top: restoreScroll, behavior: "instant" }));
  } else if (tabs) {
    sheet.scrollTo({ top: tabs.offsetTop - 12, behavior: "smooth" });
  }
  if (focusKey) {
    const target = sheetContent.querySelector(`[data-content-key="${focusKey}"]`);
    if (target) {
      target.classList.add("context-highlight");
      setTimeout(() => target.classList.remove("context-highlight"), 1800);
      setTimeout(() => target.scrollIntoView({ behavior: "smooth", block: "center" }), 220);
    }
  }
  updateContextBackButton();
}

function returnToPreviousDayContext() {
  const previous = dayPanelHistory.pop();
  if (!previous) return;
  showDayPanel(previous.panel, "", { remember: false, restoreScroll: previous.scrollTop });
}

function updateBlueNoteCountdown(target) {
  const element = document.getElementById("blueNoteCountdown");
  if (!element) return;
  const difference = new Date(target).getTime() - Date.now();
  if (difference <= 0) { element.textContent = "Drzwi powinny być już otwarte"; return; }
  const days = Math.floor(difference / 86400000);
  const hours = Math.floor((difference % 86400000) / 3600000);
  const minutes = Math.floor((difference % 3600000) / 60000);
  element.textContent = days > 0 ? `${days} dni · ${hours} godz.` : `${hours} godz. · ${minutes} min`;
}

function renderToday() {
  const day = getTripDay();
  const beforeTrip = new Date() < new Date("2026-08-22T00:00:00");
  const timed = day.items.map(item => ({ item, match:item.time?.match(/(\d{1,2}):(\d{2})/) })).filter(x=>x.match);
  const now = new Date();
  const minutes = now.getHours()*60+now.getMinutes();
  const next = beforeTrip ? day.items[0] : (timed.find(x=>Number(x.match[1])*60+Number(x.match[2])>=minutes)?.item || day.items.at(-1));
  const stats = journeyStats();
  app.innerHTML = `
    <section class="today-command" style="--today:${DAY_VISUALS[day.id]?.color || "#f5c518"}">
      <div class="hero-date">Dzień ${day.day} · ${day.date} · ${day.weekday}</div>
      <h2>${day.title}</h2>
      <p>${day.subtitle}</p>
      ${beforeTrip ? `<span class="today-preview">Podgląd · 22 sierpnia widok przełączy się automatycznie</span>` : ""}
      <article class="today-next"><small>${beforeTrip?"Pierwszy punkt":"Teraz / następnie"}</small><strong>${next?.time || "Start"} · ${next?.title || day.title}</strong></article>
      <div class="today-actions"><button data-open-day="${day.id}">Otwórz dzień</button><button data-view-jump="wallet">Bilety</button><button data-view-jump="plan">Wszystkie dni</button></div>
    </section>
    <section class="journey-progress"><div><strong>${stats.places}</strong><span>miejsc odwiedzonych</span></div><div><strong>${stats.works}</strong><span>dzieł zobaczonych</span></div><div><strong>9</strong><span>miejskich wypraw</span></div></section>
    <div class="section-title"><h3>Po kolei</h3><span>${day.items.length} punktów</span></div>${timeline(day.items)}`;
  bindDynamicActions();
}

const TRIP_REGIONS = [
  { id: "midtown", name: "Midtown", color: "#f5c518", text: "Wasza baza i najbardziej intensywny obraz Manhattanu: Times Square, Broadway, Bryant Park, Rockefeller Center i Grand Central.", days: ["2026-08-22", "2026-08-24", "2026-08-25", "2026-08-26", "2026-08-30"] },
  { id: "village", name: "Village i SoHo", color: "#a94f3d", text: "Niższa zabudowa, kręte ulice, bohema, prawa obywatelskie, serialowe adresy, jazz i współczesne zakupy.", days: ["2026-08-23", "2026-08-28"] },
  { id: "museum", name: "Museum Mile i Central Park", color: "#8974a8", text: "Wielkie kolekcje, rezydencjonalny Upper East Side i park zaprojektowany jako demokratyczna przestrzeń odpoczynku.", days: ["2026-08-23", "2026-08-25"] },
  { id: "west", name: "Chelsea i West Side", color: "#4f91b6", text: "Dawny przemysł, galerie, High Line, Whitney i nowa architektura skierowana ku Hudsonowi.", days: ["2026-08-27"] },
  { id: "downtown", name: "Lower Manhattan i port", color: "#d37845", text: "Najstarszy Nowy Jork, finanse, pamięć o 11 września oraz widoki na port i Statuę Wolności.", days: ["2026-08-27"] },
  { id: "queens", name: "Queens", color: "#4f8f75", text: "Przemysłowe nabrzeże, migracyjny i kulinarny Nowy Jork, dziedzictwo wystaw światowych oraz US Open.", days: ["2026-08-26"] },
  { id: "bronx", name: "Bronx", color: "#6f8298", text: "Tego dnia przede wszystkim baseball: Yankee Stadium i rytuał jednej z największych rywalizacji sportowych USA.", days: ["2026-08-28"] },
  { id: "brooklyn", name: "Brooklyn Waterfront", color: "#547b9b", text: "Mosty, port, poprzemysłowa panorama DUMBO i muzyka kameralna przy Brooklyn Bridge Park.", days: ["2026-08-29"] },
  { id: "harlem", name: "Harlem", color: "#b46a8c", text: "Apollo, afroamerykańska historia sceny, bebop i finał podróży śladami Charliego Parkera.", days: ["2026-08-29"] }
];

const PLACE_EXTRAS = {
  "times-square":{region:"midtown",status:"w planie",why:"To świadomy pierwszy kontakt z miastem — blisko hotelu i bez ambitnego zwiedzania po locie.",curiosity:"Plac nazywał się Longacre Square. Dzisiejszą nazwę dostał po przeprowadzce redakcji The New York Times w 1904 roku.",photoTip:"Stańcie na czerwonych schodach TKTS; drugi kadr zróbcie nisko, z ekranami ponad głowami.",nearby:["bryant-park","grandcentral"]},
  "bryant-park":{region:"midtown",status:"w planie",why:"Łączy trzy dni i pokazuje, jak nowojorczycy używają centrum jak wspólnego salonu.",curiosity:"Pod trawnikiem mieszczą się magazyny New York Public Library.",photoTip:"Najlepszy kadr: trawnik i fasada NYPL albo Empire State Building między drzewami.",nearby:["times-square","grandcentral","rockefeller-shopping"]},
  village:{region:"village",status:"w planie",why:"Najbardziej spacerowa część podróży: historia, seriale, jazz i ulice, które nie podporządkowały się siatce Manhattanu.",curiosity:"Układ ulic jest starszy od Commissioners’ Plan z 1811 roku, dlatego Village potrafi dezorientować nawet mieszkańców.",photoTip:"Pod łukiem Washington Square zostawcie w kadrze ludzi i muzyków — to ma wyglądać jak żywa dzielnica.",nearby:["bluenote","soho"]},
  bluenote:{region:"village",status:"w planie",why:"Hiromi w małym, legendarnym klubie to dokładnie doświadczenie „tylko w Nowym Jorku”.",curiosity:"Klub działa od 1981 roku, a bliskość sceny jest częścią doświadczenia — to nie sala koncertowa.",photoTip:"Zróbcie zdjęcie szyldu przed wejściem; w środku nie używajcie lampy i podporządkujcie się zasadom klubu.",nearby:["village","soho"]},
  moma:{region:"midtown",status:"w planie",why:"Najmocniejszy przekrój sztuki nowoczesnej przy rozsądnym czasie zwiedzania.",curiosity:"MoMA od początku łączyło malarstwo z fotografią, filmem, architekturą i wzornictwem.",photoTip:"Po muzeum sfotografujcie ogród rzeźb z bryłą budynku w tle.",nearby:["rockefeller-shopping","times-square"]},
  "rockefeller-shopping":{region:"midtown",status:"w planie",why:"To część dnia także dla Matyldy: współczesne marki spotykają się tu z art déco i historią kompleksu.",curiosity:"Kompleks powstał w czasie Wielkiego Kryzysu jako jeden z największych prywatnych projektów budowlanych epoki.",photoTip:"Na Channel Gardens ustawcie aparat osiowo w stronę 30 Rockefeller Plaza.",nearby:["moma","bryant-park","summit"]},
  met:{region:"museum",status:"w planie",why:"Jedyna szansa, by w jednym miejscu wybrać między tysiącami lat sztuki — według własnej listy, nie obowiązkowej trasy.",curiosity:"Budynek widoczny od Fifth Avenue jest tylko fragmentem ogromnego, wielokrotnie rozbudowywanego kompleksu.",photoTip:"Na schodach zostawcie szeroki kadr z kolumnadą; wewnątrz fotografujcie bez lampy.",nearby:["guggenheim","central-park"]},
  guggenheim:{region:"museum",status:"w planie",why:"Dwie godziny rano dają Gosi czas na kolekcję, a Wam obojgu — na przeżycie architektury Wrighta od środka.",curiosity:"Frank Lloyd Wright projektował spiralę przez kilkanaście lat; muzeum otwarto pół roku po jego śmierci.",photoTip:"Z chodnika fotografujcie budynek lekko z ukosa; w rotundzie skierujcie obiektyw pionowo ku świetlikowi.",nearby:["met","central-park"]},
  "central-park":{region:"museum",status:"w planie",why:"Po The Met daje zmianę tempa i pokazuje miejski krajobraz jako równie przemyślany projekt jak muzeum.",curiosity:"Olmsted i Vaux zaprojektowali park jako sekwencję krajobrazów, choć wiele z nich wygląda dziś całkowicie naturalnie.",photoTip:"Bow Bridge fotografujcie z brzegu; przy Bethesda Terrace użyjcie arkad jako ramy dla fontanny.",nearby:["met","guggenheim"]},
  queens:{region:"queens",status:"w planie",why:"Dzień wyprowadza Was poza pocztówkowy Manhattan: nabrzeże, migracyjne jedzenie i dziedzictwo World’s Fair.",curiosity:"Linia 7 bywa nazywana International Express, bo przebiega przez jedne z najbardziej różnorodnych dzielnic miasta.",photoTip:"W Gantry Plaza ustawcie Manhattan po drugiej stronie East River, a przy Unisphere zostawcie dużo nieba.",nearby:["us-open"]},
  "us-open":{region:"queens",status:"w planie",why:"Kupiony półfinał miksta jest sportowym rdzeniem wyprawy do Queens.",curiosity:"Kompleks nosi imię Billie Jean King, pionierki równości w sporcie.",photoTip:"Zróbcie zdjęcie przy Unisphere przed wejściem, zanim tłum skieruje się na korty.",nearby:["queens"]},
  liberty:{region:"downtown",status:"na zdjęcie",why:"Prom tworzy ruchome, filmowe spotkanie ze Statuą bez przeznaczania pół dnia na Liberty Island.",curiosity:"Statua była darem Francji, ale jej cokół sfinansowano częściowo dzięki publicznej zbiórce prowadzonej przez Josepha Pulitzera.",photoTip:"Na promie wybierzcie prawą burtę przy rejsie ku Staten Island; użyjcie trybu seryjnego i zostawcie miejsce przed kierunkiem ruchu.",nearby:["downtown"]},
  downtown:{region:"downtown",status:"w planie",why:"Krótka trasa łączy początki finansowego miasta z pamięcią po 11 września, bez przeciążenia muzeum.",curiosity:"Kręte ulice poniżej Wall Street zachowują ślad kolonialnego miasta sprzed regularnej siatki ulic.",photoTip:"Przy Charging Bull fotografujcie szybko z boku; przy memoriale odłóżcie pozowanie i skupcie się na detalach nazw.",nearby:["liberty","westside"]},
  westside:{region:"west",status:"w planie",why:"Whitney, High Line i Hudson pokazują przemianę przemysłowego brzegu w dzielnicę sztuki i spaceru.",curiosity:"High Line była towarową linią kolejową wprowadzoną bezpośrednio do fabryk i magazynów.",photoTip:"Na tarasach Whitney połączcie sztukę z panoramą; na High Line szukajcie osi ulic kończących się Hudsonem.",nearby:["summit","downtown"]},
  summit:{region:"midtown",status:"plan główny · 26.08 rano",why:"Poranny slot wykorzystuje spokojniejszą część dnia przed Queens i daje panoramę w innym świetle niż typowe wizyty o zachodzie słońca.",curiosity:"Lustrzane instalacje celowo mieszają widok miasta z odbiciami widzów; doświadczenie zajmuje trzy poziomy One Vanderbilt.",photoTip:"W ciemnym ubraniu sylwetka lepiej odcina się od jasnych luster. Weźcie okulary przeciwsłoneczne i wybierzcie spodnie lub szorty.",nearby:["grandcentral","rockefeller-shopping"]},
  "empire-state":{region:"midtown",status:"w planie · punkt 1",why:"Zaczyna poranną opowieść o Midtown od najbardziej rozpoznawalnej ikony art déco, bez dublowania płatnego tarasu widokowego.",curiosity:"Budynek ukończono w 1931 roku, a uskoki bryły wynikają z przepisów zapewniających światło na ulicach. Iglicę planowano jako maszt dla sterowców.",photoTip:"Najlepszy szybki kadr z bliska powstaje z Fifth Avenue na południe od 34th Street; zostawcie w pionie miejsce na iglicę.",nearby:["summit","grandcentral"]},
  "st-patrick":{region:"midtown",status:"w planie · punkt 3",why:"Krótka wizyta pokazuje radykalny kontrast między XIX-wiecznym neogotykiem a komercyjnymi wieżowcami Fifth Avenue.",curiosity:"Katedrę zaprojektował James Renwick Jr.; otwarto ją w 1879 roku, kiedy okolica wyglądała zupełnie inaczej niż dzisiejsze Midtown.",photoTip:"Z zewnątrz przejdźcie pod Rockefeller Center, aby objąć obie iglice. W środku fotografujcie dyskretnie i bez lampy.",nearby:["rockefeller-shopping","summit","grandcentral"]},
  soho:{region:"village",status:"w planie",why:"Daje Matyldzie współczesny, zakupowy Nowy Jork, a dorosłym — żeliwną architekturę i historię loftów.",curiosity:"Wielkie witryny i cienkie kolumny były możliwe dzięki prefabrykowanym fasadom z żeliwa.",photoTip:"Na Greene Street fotografujcie fasady pod kątem, aby pokazać rytm schodów pożarowych.",nearby:["village","bluenote"]},
  yankees:{region:"bronx",status:"w planie",why:"Yankees–Red Sox to sport, rytuał i jedna z najbardziej rozpoznawalnych rywalizacji w USA.",curiosity:"Obecny stadion otwarto w 2009 roku naprzeciw miejsca oryginalnego Yankee Stadium.",photoTip:"Przed meczem zróbcie szeroki kadr fasady przy 161st Street; wewnątrz — boisko jeszcze przed zapełnieniem trybun.",nearby:[]},
  dumbo:{region:"brooklyn",status:"w planie",why:"Najbardziej filmowy widok Brooklynu łączy się tu z portową historią i spacerem nad East River.",curiosity:"Nazwa DUMBO oznacza Down Under the Manhattan Bridge Overpass.",photoTip:"Na Washington Street ustawcie Empire State Building dokładnie w prześwicie pod Manhattan Bridge.",nearby:["bargemusic"]},
  bargemusic:{region:"brooklyn",status:"w planie",why:"Muzyka kameralna na barce z widokiem na most jest doświadczeniem niemożliwym do skopiowania w zwykłej sali.",curiosity:"Barka została przekształcona w salę koncertową w latach 70. i delikatnie porusza się na wodzie.",photoTip:"Przed koncertem sfotografujcie barkę z mostem i panoramą; podczas występu respektujcie zasady fotografowania.",nearby:["dumbo"]},
  harlem:{region:"harlem",status:"w planie",why:"Apollo porządkuje historię muzycznego Harlemu przed festiwalem poświęconym Parkerowi.",curiosity:"Słynne Amateur Night pomagały rozpoczynać kariery artystów, a publiczność była bezlitosnym sędzią.",photoTip:"Sfotografujcie pionowy szyld Apollo z chodnika po przeciwnej stronie 125th Street.",nearby:["charlie-parker"]},
  "charlie-parker":{region:"harlem",status:"w planie",why:"Parker, Apollo i żywy festiwal spinają historię bebopu ze współczesną miejską publicznością.",curiosity:"Parker miał przydomek Bird; jego harmoniczne rewolucje są jednym z fundamentów nowoczesnego jazzu.",photoTip:"Zamiast samej sceny pokażcie park, publiczność i charakter sąsiedztwa.",nearby:["harlem"]},
  grandcentral:{region:"midtown",status:"w planie · 26 i 30.08",why:"Poranne przejście 26.08 wykorzystuje bezpośrednie połączenie z SUMMIT; ostatniego dnia możecie wrócić do detali terminalu bez presji zobaczenia go po raz pierwszy.",curiosity:"Konstelacje na suficie Main Concourse są pokazane jakby z perspektywy poza sferą niebieską — dlatego wydają się odwrócone.",photoTip:"Wejdźcie na balkon, aby objąć halę i ludzi; w Whispering Gallery aparat nie jest najważniejszy — sprawdźcie akustykę.",nearby:["bryant-park","summit","st-patrick"]}
};

const DAY_SCHEMATICS = {
  "2026-08-22": { note: "Najdłuższy odcinek to dojazd z lotniska. Wieczór odbywa się pieszo wokół hotelu.", nodes: [["JFK", "brama", "✈", "arrival"], ["Hotel", "midtown", "⌂", "transport"], ["Times Square", "midtown", "●", "evening"], ["Bryant Park", "midtown", "◆", "evening"]], legs: ["samochód 60–100 min lub kolej 60–75 min", "pieszo ok. 10 min", "pieszo ok. 12 min · opcja"] },
  "2026-08-23": { note: "Po dojeździe do Village cały zasadniczy dzień mieści się w jednej, zwartej dzielnicy.", nodes: [["Hotel", "midtown", "⌂", "overview"], ["Washington Sq.", "village", "●", "route"], ["West Village", "village", "◆", "route"], ["Blue Note", "village", "♪", "bluenote"]], legs: ["metro ok. 20 min", "spacer z przystankami", "spacer 10–20 min"] },
  "2026-08-24": { note: "Dzień Midtown: większość punktów jest blisko siebie, a hotel służy jako praktyczna baza przed filmem.", nodes: [["Hotel", "midtown", "⌂", "overview"], ["MoMA", "midtown", "▣", "museum"], ["Rockefeller", "midtown", "◆", "shopping"], ["Hotel", "midtown", "⌂", "overview"], ["Bryant Park", "midtown", "▶", "movie"]], legs: ["metro/pieszo 20–25 min", "pieszo 5–10 min", "pieszo ok. 20 min", "pieszo ok. 12 min"] },
  "2026-08-25": { note: "Najpierw jedziecie na północ, potem schodzicie przez park i wracacie do teatralnego Midtown.", nodes: [["Guggenheim", "museum", "◎", "guggenheim"], ["The Met", "museum", "▣", "museum"], ["Central Park", "park", "♧", "park"], ["Hotel", "midtown", "⌂", "rest"], ["Broadway", "midtown", "★", "theatre"]], legs: ["pieszo ok. 10 min", "spacer przez park", "metro/taxi 20–30 min", "pieszo 10–15 min"] },
  "2026-08-26": { note: "Dwie części jednego dnia: ikoniczny Midtown rano, a potem nabrzeże, Flushing i sportowe Queens.", nodes: [["Hotel", "midtown", "⌂", "overview"], ["Empire State", "midtown", "1", "morning"], ["SUMMIT", "midtown", "2", "morning"], ["St. Patrick’s", "midtown", "3", "morning"], ["Long Island City", "queens", "4", "route"], ["Flushing", "queens", "6", "food"], ["Unisphere", "queens", "7", "route"], ["US Open", "queens", "8", "tennis"]], legs: ["pieszo", "pieszo Fifth Avenue", "pieszo", "metro ok. 30 min", "metro linii 7", "spacer/metro", "pieszo ok. 15 min"] },
  "2026-08-27": { note: "Dwie duże części dnia: port i Downtown rano, a następnie sztuka oraz spacer po West Side.", nodes: [["Pier 79", "west", "≈", "ferry"], ["St. George", "port", "◁", "photos"], ["Downtown", "downtown", "◆", "downtown"], ["Whitney", "west", "▣", "museum"], ["High Line", "west", "━", "route"], ["Hudson Yards", "west", "◇", "evening"]], legs: ["prom", "darmowy prom", "metro/pieszo", "pieszo", "spacer liniowy"] },
  "2026-08-28": { note: "Dwa odrębne światy: zakupy i żeliwne fasady Downtown, potem sportowy wieczór w Bronksie.", nodes: [["Hotel", "midtown", "⌂", "overview"], ["SoHo", "village", "◆", "route"], ["Hotel", "midtown", "⌂", "rest"], ["Yankee Stadium", "bronx", "⚾", "stadium"]], legs: ["metro ok. 20 min", "powrót i reset", "metro ok. 35 min"] },
  "2026-08-29": { note: "Największy skok między dzielnicami: Brooklyn rano i Harlem po koncercie kameralnym.", nodes: [["Hotel", "midtown", "⌂", "overview"], ["DUMBO", "brooklyn", "▱", "brooklyn"], ["Pier 5", "brooklyn", "♪", "bargemusic"], ["Apollo", "harlem", "★", "apollo"], ["Marcus Garvey Park", "harlem", "♫", "festival"]], legs: ["metro ok. 30 min", "spacer nabrzeżem", "metro 45–60 min", "pieszo ok. 10 min"] },
  "2026-08-30": { note: "Ostatni spacer pozostaje blisko hotelu; po odbiorze bagaży zaczyna się osobna wyprawa na JFK.", nodes: [["Diner", "midtown", "☕", "diner"], ["Hotel", "midtown", "⌂", "hotel"], ["42nd Street", "midtown", "━", "walk"], ["Hotel", "midtown", "⌂", "transport"], ["JFK", "brama", "✈", "airport"]], legs: ["pieszo", "pieszo i zwiedzanie", "powrót po bagaże", "kolej ok. 60 min lub samochód"] }
};

function daySchematic(day) {
  const schematic = DAY_SCHEMATICS[day.id];
  if (!schematic) return "";
  return `<section class="day-at-glance"><div class="day-glance-head"><span class="mini-kicker">Dzień na jednej planszy</span><strong>${schematic.note}</strong></div><div class="day-route-diagram">${schematic.nodes.map((node, index) => `${index ? `<div class="day-leg"><span>${schematic.legs[index - 1]}</span><i>→</i></div>` : ""}<button class="day-node node-${node[1]}" type="button" data-overview-panel="${node[3]}"><b>${node[2]}</b><span>${node[0]}</span></button>`).join("")}</div><p>Naciśnij punkt, aby przejść do właściwej części przewodnika.</p></section>`;
}

const DAY_VISUALS = {
  "2026-08-22": { area:"JFK → Midtown", icon:"✈", event:"Pierwszy wieczór", color:"#d9a900" },
  "2026-08-23": { area:"Museum Mile → Village", icon:"♪", event:"Guggenheim · Hiromi", color:"#a94f3d" },
  "2026-08-24": { area:"Midtown", icon:"▣", event:"MoMA · Bryant Park", color:"#bd694e" },
  "2026-08-25": { area:"Museum Mile", icon:"★", event:"The Met · Broadway", color:"#796393" },
  "2026-08-26": { area:"Midtown → Queens", icon:"△", event:"SUMMIT · US Open", color:"#4f8f75" },
  "2026-08-27": { area:"Downtown → West Side", icon:"↗", event:"Statua · Whitney", color:"#4f91b6" },
  "2026-08-28": { area:"SoHo → Bronx", icon:"⚾", event:"Yankees–Red Sox", color:"#365c7f" },
  "2026-08-29": { area:"Brooklyn → Harlem", icon:"♫", event:"Bargemusic · Parker", color:"#8d5577" },
  "2026-08-30": { area:"Midtown → JFK", icon:"⌘", event:"Ostatni spacer", color:"#687787" }
};

const VILLAGE_MAP_STOPS = [
  { panel:"overview", title:"Hotel", note:"Śniadanie i wyjazd na Upper East Side", left:43, top:43, icon:"H" },
  { panel:"guggenheim", title:"Guggenheim", note:"10:30–12:30 · architektura i cztery wybrane obszary", left:70, top:11, icon:"◌" },
  { panel:"food", title:"Szybki lunch", note:"13:15 · lekki posiłek bez długiej kolejki", left:33, top:69, icon:"1" },
  { panel:"route", key:"village-stop-0", title:"Washington Sq. i MacDougal", note:"13:45 · łuk, NYU, scena uliczna i folk", left:38, top:76, icon:"2" },
  { panel:"route", key:"village-stop-1", title:"Jefferson i Commerce", note:"Wieża dawnego sądu oraz kręte ulice Village", left:30, top:83, icon:"3" },
  { panel:"route", key:"village-stop-2", title:"Perry i Friends", note:"Opcjonalny moduł serialowy na trasie", left:42, top:87, icon:"4" },
  { panel:"route", key:"village-stop-3", title:"Stonewall", note:"Najważniejszy historyczny przystanek spaceru", left:53, top:82, icon:"5" },
  { panel:"route", key:"village-stop-4", title:"Kawa i odpoczynek", note:"Rezerwa przed klubem, deser i sprawdzenie biletów", left:61, top:76, icon:"6" },
  { panel:"bluenote", title:"Blue Note", note:"Hiromi · wejście i koncert", left:52, top:70, icon:"♪" }
];

const ARRIVAL_MAP_STOPS = [
  { panel:"arrival", title:"JFK", note:"16:59 · lądowanie, granica, bagaż i wyjście do oficjalnego transportu", left:84, top:78, icon:"✈" },
  { panel:"transport", title:"Wybór transportu", note:"Taxi jako plan główny; LIRR przy dużym korku; Uber po porównaniu ceny", left:68, top:63, icon:"?" },
  { panel:"transport", title:"Hotel", note:"585 8th Avenue · zameldowanie, prysznic, woda i ocena energii", left:43, top:42, icon:"H" },
  { panel:"evening", title:"Times Square", note:"Krótki pierwszy spacer i czerwone schody TKTS", left:39, top:27, icon:"1" },
  { panel:"evening", title:"Bryant Park", note:"Opcjonalne rozszerzenie wyłącznie przy dobrej energii", left:54, top:16, icon:"2" }
];

function arrivalAdventureMap() {
  return `<section class="day-adventure-map arrival-adventure-map"><div class="day-map-heading"><div><span class="mini-kicker">Dzień na mapie</span><strong>JFK → hotel → pierwsze światła</strong><p>Czerwona linia oznacza przejazd; żółta — spacer. Mapę można powiększać dwoma palcami.</p></div><button type="button" data-day-map-direct="links">↗ Mapy i trasy</button></div><div class="day-map-board arrival-map-board" data-gesture-map><div class="day-map-canvas"><svg viewBox="0 0 100 100" aria-hidden="true"><path class="day-route-path day-route-transit" d="M84 78 C79 72 74 67 68 63 S52 50 43 42"/><path class="day-route-path day-route-walk" d="M43 42 C40 36 39 31 39 27 S47 20 54 16"/></svg>${ARRIVAL_MAP_STOPS.map(stop=>`<button type="button" class="day-map-stop" style="--left:${stop.left}%;--top:${stop.top}%" data-day-map-panel="${stop.panel}" data-day-map-title="${stop.title}" data-day-map-note="${stop.note}"><span>${stop.icon}</span><small>${stop.title}</small></button>`).join("")}</div></div><div class="day-map-detail" id="dayMapDetail"><strong>Wybierz punkt dnia</strong><p>Najpierw zobaczysz krótką instrukcję, a potem możesz otworzyć odpowiedni moduł.</p></div></section>`;
}

const DAY_MAP_CONFIGS = {
  "2026-08-22": { title:"JFK → hotel → pierwsze światła", view:[0,600,862,950], points:[
    {panel:"arrival",title:"JFK · poza planszą",note:"Lotnisko leży dalej na wschód, poza zasięgiem tej mapy. Punkt na krawędzi pokazuje wyłącznie kierunek przejazdu.",x:840,y:1480,icon:"→",offmap:true},{panel:"transport",title:"Hotel",note:"585 8th Avenue · baza w Midtown",x:430,y:790,icon:"H"},{panel:"evening",title:"Times Square",note:"Pierwszy krótki spacer",x:455,y:760,icon:"1"},{panel:"evening",title:"Bryant Park",note:"Opcjonalne rozszerzenie wieczoru",x:520,y:805,icon:"2"}
  ],modes:["transit","walk","walk"]},
  "2026-08-23": { title:"Hotel → Guggenheim → Village → Blue Note", view:[150,400,580,720], points:[
    {panel:"overview",title:"Hotel",note:"Śniadanie i wyjazd na Upper East Side",x:430,y:790,icon:"H"},{panel:"guggenheim",title:"Guggenheim",note:"10:30–12:30 · architektura i kolekcja",x:590,y:480,icon:"◌"},{panel:"food",title:"Szybki lunch",note:"Punkt 1 · lekki posiłek w Village",x:430,y:960,icon:"1"},{panel:"route",key:"village-stop-0",title:"Washington Sq.",note:"Punkt 2 · łuk, NYU i scena uliczna",x:470,y:985,icon:"2"},{panel:"route",key:"village-stop-1",title:"Jefferson i Commerce",note:"Punkt 3 · kręte ulice West Village",x:410,y:1015,icon:"3"},{panel:"route",key:"village-stop-2",title:"Perry i Friends",note:"Punkt 4 · opcjonalny moduł serialowy",x:390,y:1040,icon:"4"},{panel:"route",key:"village-stop-3",title:"Stonewall",note:"Punkt 5 · historyczny przystanek spaceru",x:450,y:1035,icon:"5"},{panel:"route",key:"village-stop-4",title:"Kawa",note:"Punkt 6 · odpoczynek przed klubem",x:500,y:1015,icon:"6"},{panel:"bluenote",title:"Blue Note",note:"Hiromi · wejście i koncert",x:495,y:1050,icon:"♪"}
  ],modes:["transit","transit","walk","walk","walk","walk","walk","walk"]},
  "2026-08-24": { title:"Hotel → MoMA → Rockefeller → Bryant Park", view:[350,650,300,200], points:[
    {panel:"overview",title:"Hotel · start",note:"Start w Midtown",x:430,y:790,icon:"H"},{panel:"museum",title:"MoMA",note:"10:30 · kolekcja i wystawy",x:500,y:715,icon:"1"},{panel:"food",title:"Lunch",note:"13:30 · szybki posiłek w Midtown",x:520,y:735,icon:"2"},{panel:"shopping",title:"Rockefeller",note:"Zakupy Matyldy i architektura kompleksu",x:525,y:750,icon:"3"},{panel:"overview",title:"Hotel · reset",note:"Koc, bluza i krótki odpoczynek",x:440,y:800,icon:"H"},{panel:"movie",title:"Bryant Park",note:"Piknik i King Creole",x:530,y:805,icon:"4"}
  ],modes:["walk","walk","walk","transit","walk"]},
  "2026-08-25": { title:"The Met → Central Park → Broadway", view:[300,350,400,500], points:[
    {panel:"overview",title:"Hotel",note:"Wyjazd na Upper East Side",x:430,y:790,icon:"H"},{panel:"museum",title:"The Met",note:"Wybrane obszary muzeum i pełny katalog dzieł",x:585,y:505,icon:"1"},{panel:"park",title:"Central Park",note:"Bethesda, Bow Bridge i Strawberry Fields",x:500,y:610,icon:"2"},{panel:"rest",title:"Hotel · powrót",note:"Obowiązkowy odpoczynek",x:440,y:800,icon:"H"},{panel:"theatre",title:"Broadway",note:"Stranger Things",x:465,y:770,icon:"3"}
  ],modes:["transit","walk","transit","walk"]},
  "2026-08-26": { title:"Midtown → Long Island City → Flushing", view:[380,600,482,300], points:[
    {panel:"overview",title:"Hotel",note:"Wczesny start w Midtown",x:430,y:790,icon:"H"},{panel:"morning",key:"morning-stop-1",title:"Empire State",note:"Punkt 1 · widok z zewnątrz i Fifth Avenue",x:500,y:835,icon:"1"},{panel:"morning",key:"morning-stop-2",title:"SUMMIT + Grand Central",note:"Punkt 2 · panorama i Main Concourse",x:555,y:790,icon:"2"},{panel:"morning",key:"morning-stop-3",title:"St. Patrick’s",note:"Punkt 3 · katedra przy Fifth Avenue",x:535,y:735,icon:"3"},{panel:"route",key:"q-stop-0",title:"Gantry Plaza",note:"Punkt 4 · nabrzeże Long Island City",x:665,y:760,icon:"4"},{panel:"route",key:"q-stop-1",title:"Pepsi-Cola Sign",note:"Punkt 5 · spacer nabrzeżem",x:675,y:720,icon:"5"},{panel:"route",key:"q-stop-3",title:"Flushing",note:"Punkt 6 · jedzenie i migracyjny Nowy Jork",x:835,y:690,icon:"6"},{panel:"route",key:"q-stop-4",title:"Unisphere",note:"Punkt 7 · dziedzictwo World’s Fair",x:805,y:790,icon:"7"},{panel:"tennis",title:"US Open",note:"Punkt 8 · kompleks tenisowy",x:785,y:735,icon:"8"},{panel:"links",title:"Hotel · powrót",note:"Powrót metrem po meczu",x:445,y:800,icon:"H"}
  ],modes:["walk","walk","walk","transit","walk","transit","transit","walk","transit"]},
  "2026-08-27": { title:"Port → St. George → Statua → Downtown → West Side", view:[0,600,862,1100], points:[
    {panel:"overview",title:"Hotel",note:"Start i dojazd do promu",x:430,y:790,icon:"H"},{panel:"ferry",title:"Pier 79",note:"NYC Ferry do St. George",x:365,y:760,icon:"1"},{panel:"ferry",title:"St. George · poza planszą",note:"Terminal leży dalej na południowy zachód. Punkt przy krawędzi pokazuje kierunek pierwszego rejsu.",x:45,y:1670,icon:"→",offmap:true},{panel:"photos",title:"Statua Wolności",note:"Punkt 2 znajduje się na Liberty Island, pośrodku portu; oglądacie ją podczas rejsu powrotnego",x:110,y:1480,icon:"2"},{panel:"downtown",title:"Downtown",note:"Wall Street i 9/11 Memorial",x:405,y:1120,icon:"3"},{panel:"museum",title:"Whitney",note:"Sztuka amerykańska przy Meatpacking District",x:420,y:950,icon:"4"},{panel:"route",title:"High Line",note:"Spacer na północ",x:420,y:900,icon:"5"},{panel:"evening",title:"Hudson Yards",note:"Wieczór na północnym końcu High Line",x:405,y:835,icon:"6"}
  ],modes:["transit","ferry","ferry","ferry","transit","walk","walk"]},
  "2026-08-28": { title:"SoHo → hotel → Yankee Stadium", view:[0,150,862,1000], points:[
    {panel:"overview",title:"Hotel · start",note:"Wyjazd do SoHo",x:430,y:790,icon:"H"},{panel:"route",title:"SoHo",note:"Żeliwne fasady i Nolita",x:450,y:1040,icon:"1"},{panel:"shopping",title:"Zakupy",note:"Streetwear, kosmetyki i butiki",x:465,y:1020,icon:"2"},{panel:"rest",title:"Hotel · reset",note:"Powrót i odpoczynek przed meczem",x:445,y:800,icon:"H"},{panel:"stadium",title:"Yankee Stadium",note:"Yankees–Red Sox w Bronksie",x:700,y:275,icon:"3"}
  ],modes:["transit","walk","transit","transit"]},
  "2026-08-29": { title:"Brooklyn Waterfront → Harlem", view:[0,70,862,1250], points:[
    {panel:"overview",title:"Hotel",note:"Metro z Midtown do Brooklynu",x:430,y:790,icon:"H"},{panel:"brooklyn",title:"DUMBO",note:"Punkt 1 · Brooklyn przy Manhattan Bridge",x:610,y:1210,icon:"1"},{panel:"bargemusic",title:"Pier 5",note:"Punkt 2 · Brooklyn Bridge Park, dalej na południe nabrzeżem",x:570,y:1245,icon:"2"},{panel:"apollo",title:"Apollo",note:"Punkt 3 · 125th Street w Harlemie",x:545,y:330,icon:"3"},{panel:"festival",title:"Marcus Garvey Park",note:"Punkt 4 · park w Harlemie, na wschód od Apollo",x:600,y:350,icon:"4"}
  ],modes:["transit","walk","transit","walk"]},
  "2026-08-30": { title:"Midtown → hotel → JFK", view:[350,680,450,380], points:[
    {panel:"diner",title:"Diner",note:"Ostatnie nowojorskie śniadanie",x:410,y:740,icon:"1"},{panel:"hotel",title:"Hotel · check-out",note:"Check-out i przechowanie bagaży",x:430,y:790,icon:"H"},{panel:"walk",title:"Bryant Park i NYPL",note:"Ostatni spacer 42nd Street",x:530,y:805,icon:"2"},{panel:"walk",title:"Grand Central",note:"Main Concourse i Whispering Gallery",x:565,y:790,icon:"3"},{panel:"hotel",title:"Hotel · bagaże",note:"Odbiór walizek",x:445,y:800,icon:"H"},{panel:"transport",title:"JFK · poza planszą",note:"Lotnisko leży dalej na wschód w Queens; punkt przy krawędzi pokazuje kierunek podróży",x:790,y:1030,icon:"→",offmap:true}
  ],modes:["walk","walk","walk","walk","transit"]}
};

function configuredAdventureMap(day) {
  const config=DAY_MAP_CONFIGS[day.id];
  if(!config) return daySchematic(day);
  const [viewX,viewY,viewWidth,configuredHeight]=config.view;
  const viewHeight=configuredHeight||viewWidth;
  const local=point=>({x:(point.x-viewX)/viewWidth*100,y:(point.y-viewY)/viewHeight*100});
  const paths=config.points.slice(0,-1).map((point,index)=>{const a=local(point),b=local(config.points[index+1]);const mode=config.modes[index]||"walk";return `<path class="day-route-path ${mode==="walk"?"day-route-walk":"day-route-transit"}" d="M${a.x.toFixed(2)} ${a.y.toFixed(2)} L${b.x.toFixed(2)} ${b.y.toFixed(2)}"/>`;}).join("");
  const imageStyle=`width:${(862/viewWidth*100).toFixed(3)}%;left:${(-viewX/viewWidth*100).toFixed(3)}%;top:${(-viewY/viewHeight*100).toFixed(3)}%`;
  return `<section class="day-adventure-map"><div class="day-map-heading"><div><span class="mini-kicker">Dzień na mapie</span><strong>${config.title}</strong><p>Wszystkie mapy korzystają z tej samej geografii co plansza główna. Czerwone odcinki oznaczają przejazdy; żółte — spacer.</p></div><button type="button" data-day-map-direct="links">↗ Mapy i trasy</button></div><div class="day-map-board configured-day-map" data-gesture-map style="aspect-ratio:${viewWidth}/${viewHeight}"><div class="day-map-canvas"><img class="day-map-base" src="assets/maps/nyc-illustrated-master-v1.png" alt="Ilustrowana mapa rejonu dnia" style="${imageStyle}"><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${paths}</svg>${config.points.map(point=>{const pos=local(point);return `<button type="button" class="day-map-stop ${point.offmap?"day-map-stop-offmap":""}" style="--left:${pos.x.toFixed(2)}%;--top:${pos.y.toFixed(2)}%" data-day-map-panel="${point.panel}" ${point.key?`data-day-map-key="${point.key}"`:""} data-day-map-title="${point.title}" data-day-map-note="${point.note}"><span>${point.icon}</span><small>${point.title}</small></button>`}).join("")}</div></div><div class="day-map-detail" id="dayMapDetail"><strong>Wybierz punkt dnia</strong><p>Krótki opis pojawi się tutaj, zanim przejdziesz do pełnego modułu.</p></div></section>`;
}

function dayAdventureMap(day) {
  return configuredAdventureMap(day);
}

function tripMapMarkup() {
  const landmarks = [
    { id:"liberty", icon:"★", label:"Statua", left:13, top:80 },
    { id:"downtown", icon:"$", label:"Wall Street", left:38, top:68 },
    { id:"dumbo", icon:"▱", label:"DUMBO", left:61, top:72 },
    { id:"soho", icon:"◇", label:"SoHo", left:38, top:61 },
    { id:"village", icon:"♟", label:"Village", left:44, top:56 },
    { id:"bluenote", icon:"♪", label:"Blue Note", left:49, top:60 },
    { id:"westside", icon:"↗", label:"Whitney", left:37, top:50 },
    { id:"moma", icon:"▣", label:"MoMA", left:45, top:40 },
    { id:"rockefeller-shopping", icon:"☆", label:"Rockefeller", left:50, top:39 },
    { id:"grandcentral", icon:"⌘", label:"Grand Central", left:55, top:42 },
    { id:"summit", icon:"△", label:"SUMMIT", left:58, top:40 },
    { id:"met", icon:"◉", label:"The Met", left:55, top:28 },
    { id:"guggenheim", icon:"◌", label:"Guggenheim", left:57, top:24 },
    { id:"harlem", icon:"♫", label:"Apollo", left:53, top:14 },
    { id:"yankees", icon:"⚾", label:"Yankees", left:76, top:13 },
    { id:"queens", icon:"◎", label:"Queens", left:83, top:43 }
  ];
  const regionLabels = [
    { name:"Harlem", days:"Dzień 8", left:57.1, top:5.4 },
    { name:"Museum Mile", days:"Dni 4 + 9", left:54.5, top:20.3 },
    { name:"Midtown", days:"Dni 1 + 3 + 4 + 9", left:50.8, top:31.3 },
    { name:"West Side", days:"Dzień 6", left:40.4, top:45.2 },
    { name:"Village + SoHo", days:"Dni 2 + 7", left:37.8, top:53.7 },
    { name:"Downtown", days:"Dzień 6", left:33.9, top:68.5 },
    { name:"Bronx", days:"Dzień 7", left:82, top:8.5 },
    { name:"Queens", days:"Dzień 5", left:83.4, top:33.1 },
    { name:"Brooklyn", days:"Dzień 8", left:77.3, top:69.9 }
  ];
  return `<section class="trip-map-card">
    <div class="strategic-map illustrated-map" data-gesture-map>
      <div class="illustrated-map-canvas">
        <img src="assets/maps/nyc-illustrated-master-v1.png" alt="Ilustrowana mapa Manhattanu, portu, Brooklynu, Queens, Bronksu i nabrzeża New Jersey">
        <svg class="interactive-region-layer" viewBox="0 0 862 1824" role="img" aria-label="Aktywne obszary planu podróży">
          <g class="soft-regions">
            <path data-region="harlem" class="soft-region region-harlem" d="M430 38 C505 12 570 48 594 142 C607 210 588 275 552 321 C500 338 448 323 415 285 C398 205 401 112 430 38 Z"/>
            <path data-region="museum" class="soft-region region-museum" d="M414 287 C456 317 513 334 559 315 C584 352 579 438 555 526 C504 557 445 552 399 517 C391 425 394 348 414 287 Z"/>
            <path data-region="midtown" class="soft-region region-midtown" d="M398 505 C442 546 506 561 557 526 C558 607 539 701 507 774 C462 792 409 783 369 747 C370 659 378 574 398 505 Z"/>
            <path data-region="west" class="soft-region region-west" d="M367 721 C401 769 455 792 507 774 C490 842 468 913 439 976 C394 985 355 962 326 927 C329 854 343 782 367 721 Z"/>
            <path data-region="village" class="soft-region region-village" d="M326 910 C354 959 397 986 440 972 C428 1039 411 1105 385 1164 C340 1172 305 1146 279 1112 C285 1037 299 969 326 910 Z"/>
            <path data-region="downtown" class="soft-region region-downtown" d="M278 1097 C307 1144 342 1174 385 1157 C379 1232 352 1305 307 1367 C262 1347 228 1309 214 1263 C230 1201 250 1144 278 1097 Z"/>
            <path data-region="bronx" class="soft-region region-bronx" d="M588 20 C718 0 820 52 852 185 C823 248 748 283 655 269 C601 214 572 117 588 20 Z"/>
            <path data-region="queens" class="soft-region region-queens" d="M584 310 C746 248 854 351 860 581 C838 739 762 875 630 954 C577 898 548 814 552 711 C591 594 605 458 584 310 Z"/>
            <path data-region="brooklyn" class="soft-region region-brooklyn" d="M497 1000 C630 898 795 905 861 1014 L862 1519 C781 1608 659 1628 535 1569 C456 1479 424 1321 448 1178 C457 1113 473 1054 497 1000 Z"/>
          </g>
        </svg>
        <div class="map-region-captions" aria-hidden="true">
          ${regionLabels.map(region => `<div class="map-region-caption" style="--left:${region.left}%;--top:${region.top}%"><strong>${region.name}</strong><small>${region.days}</small></div>`).join("")}
        </div>
        <div class="map-landmarks" aria-label="Interaktywne miejsca na mapie">
          ${landmarks.map(place => `<button type="button" class="map-landmark" style="--left:${place.left}%;--top:${place.top}%" data-map-place="${place.id}" aria-label="Otwórz ${place.label}"><span>${place.icon}</span><small>${place.label}</small></button>`).join("")}
        </div>
      </div>
      <div class="map-compass"><span>↑</span> północ</div>
    </div>
    <div class="map-detail" id="mapDetail"><strong>Dotknij obszaru albo symbolu miejsca</strong><p>Kolorowe obszary prowadzą do dni, a symbole bezpośrednio do odpowiednich części przewodnika.</p></div>
    <p class="map-disclaimer">To ilustrowana plansza orientacyjna. Dokładne dojścia i przejazdy pozostają dostępne przy konkretnych punktach dnia.</p>
  </section>`;
}

function showMapRegion(regionId) {
  const region = TRIP_REGIONS.find(item => item.id === regionId);
  const detail = document.getElementById("mapDetail");
  if (!region || !detail) return;
  document.querySelectorAll("[data-region]").forEach(area => area.classList.toggle("selected", area.dataset.region === regionId));
  document.querySelectorAll("[data-map-place]").forEach(button => button.classList.remove("selected"));
  detail.innerHTML = `<span class="region-swatch" style="background:${region.color}"></span><strong>${region.name}</strong><p>${region.text}</p><div class="map-day-links">${region.days.map(id => { const day = DAYS.find(item => item.id === id); return `<button data-open-day="${id}">Dzień ${day.day} · ${day.title}</button>`; }).join("")}</div>`;
  bindDynamicActions();
}

function showMapPlace(placeId) {
  const place = PLACES.find(item => item.id === placeId);
  const detail = document.getElementById("mapDetail");
  if (!place || !detail) return;
  document.querySelectorAll("[data-region]").forEach(area => area.classList.remove("selected"));
  document.querySelectorAll("[data-map-place]").forEach(button => button.classList.toggle("selected", button.dataset.mapPlace === placeId));
  detail.innerHTML = `<span class="place-detail-icon">${place.icon}</span><strong>${place.title}</strong><p>${place.text}</p><div class="place-detail-meta">${place.meta}${place.status ? ` · ${place.status}` : ""}</div><button class="map-place-open" type="button">Otwórz pełny przewodnik po miejscu <span>›</span></button>`;
  detail.querySelector(".map-place-open")?.addEventListener("click", () => openLinkedDay(place.dayId, place.panel));
}

function bindTripMap() {
  document.querySelectorAll("[data-region]").forEach(area => {
    const open = () => showMapRegion(area.dataset.region);
    area.addEventListener("click", open);
  });
  document.querySelectorAll("[data-map-place]").forEach(button => button.addEventListener("click", event => {
    event.stopPropagation();
    showMapPlace(button.dataset.mapPlace);
  }));
  bindGestureMap(document.querySelector("[data-gesture-map]"));
}

function bindGestureMap(map) {
  if (!map) return;
  const canvas = map.querySelector(".illustrated-map-canvas, .day-map-canvas");
  if (!canvas) return;
  const pointers = new Map();
  const state = { scale: 1, x: 0, y: 0, startScale: 1, startX: 0, startY: 0, startDistance: 0, startCenter: null };

  const clampState = () => {
    const rect = map.getBoundingClientRect();
    const limitX = rect.width * (state.scale - 1) / 2;
    const limitY = rect.height * (state.scale - 1) / 2;
    state.x = Math.max(-limitX, Math.min(limitX, state.x));
    state.y = Math.max(-limitY, Math.min(limitY, state.y));
  };
  const paint = () => {
    clampState();
    canvas.style.setProperty("--map-scale", state.scale.toFixed(3));
    canvas.style.setProperty("--map-inverse", (1 / state.scale).toFixed(4));
    canvas.style.setProperty("--map-x", `${state.x.toFixed(1)}px`);
    canvas.style.setProperty("--map-y", `${state.y.toFixed(1)}px`);
  };
  const pair = () => [...pointers.values()].slice(0, 2);
  const distance = points => Math.hypot(points[1].x - points[0].x, points[1].y - points[0].y);
  const center = points => ({ x:(points[0].x + points[1].x) / 2, y:(points[0].y + points[1].y) / 2 });

  map.addEventListener("wheel", event => {
    event.preventDefault();
    const rect = map.getBoundingClientRect();
    const oldScale = state.scale;
    const nextScale = Math.max(1, Math.min(3.5, oldScale * Math.exp(-event.deltaY * .002)));
    const px = event.clientX - rect.left - rect.width / 2;
    const py = event.clientY - rect.top - rect.height / 2;
    state.x = px - (px - state.x) * (nextScale / oldScale);
    state.y = py - (py - state.y) * (nextScale / oldScale);
    state.scale = nextScale;
    paint();
  }, { passive:false });

  map.addEventListener("pointerdown", event => {
    pointers.set(event.pointerId, { x:event.clientX, y:event.clientY });
    map.setPointerCapture(event.pointerId);
    state.startScale = state.scale;
    state.startX = state.x;
    state.startY = state.y;
    if (pointers.size === 2) {
      const points = pair();
      state.startDistance = distance(points);
      state.startCenter = center(points);
    } else {
      state.startCenter = { x:event.clientX, y:event.clientY };
    }
  });
  map.addEventListener("pointermove", event => {
    if (!pointers.has(event.pointerId)) return;
    pointers.set(event.pointerId, { x:event.clientX, y:event.clientY });
    if (pointers.size >= 2) {
      const points = pair();
      const currentCenter = center(points);
      state.scale = Math.max(1, Math.min(3.5, state.startScale * distance(points) / Math.max(1, state.startDistance)));
      state.x = state.startX + currentCenter.x - state.startCenter.x;
      state.y = state.startY + currentCenter.y - state.startCenter.y;
    } else if (state.scale > 1) {
      state.x = state.startX + event.clientX - state.startCenter.x;
      state.y = state.startY + event.clientY - state.startCenter.y;
    }
    paint();
  });
  const endPointer = event => pointers.delete(event.pointerId);
  map.addEventListener("pointerup", endPointer);
  map.addEventListener("pointercancel", endPointer);
  paint();
}

function renderPlan() {
  app.innerHTML = `
    <div class="journeys-heading"><span>22–30 sierpnia 2026</span><h2>Dziewięć miejskich wypraw</h2><p>Każdy dzień ma własny rejon, rytm i główny nowojorski moment.</p></div>
    <div class="journey-grid">${DAYS.map(day => { const visual=DAY_VISUALS[day.id]; return `
      <article class="journey-card" style="--journey:${visual.color}" data-open-day="${day.id}" tabindex="0" role="button">
        <div class="journey-top"><span class="journey-number">${String(day.day).padStart(2,"0")}</span><span class="journey-date">${day.date}<br>${day.weekday}</span><b>${visual.icon}</b></div>
        <div class="journey-map-line"><i></i><i></i><i></i><i></i></div>
        <span class="journey-area">${visual.area}</span><h3>${day.title}</h3><p>${day.subtitle}</p>
        <div class="journey-footer"><strong>${visual.event}</strong><span>Otwórz wyprawę ›</span></div>
      </article>`; }).join("")}</div>`;
  bindDynamicActions();
}

function renderHome() {
  app.innerHTML = `
    <div class="home-screen">
    ${tripMapMarkup()}
    <section class="home-modules" aria-label="Główne moduły aplikacji">
      <button type="button" data-view-jump="plan"><span class="home-module-icon">09</span><strong>Dni</strong><small>plansze i kolejność wypraw</small></button>
      <button type="button" data-view-jump="places"><span class="home-module-icon">◇</span><strong>Miejsca</strong><small>dzielnice, historie i zdjęcia</small></button>
      <button type="button" data-view-jump="museums"><span class="home-module-icon">▤</span><strong>Muzea</strong><small>piętra, artyści i dzieła</small></button>
      <button type="button" data-view-jump="prepare"><span class="home-module-icon">▶</span><strong>Przed wyjazdem</strong><small>filmy, muzyka, aplikacje i bilety</small></button>
    </section></div>`;
  bindDynamicActions();
  bindTripMap();
}

function renderCards(title, intro, items) {
  app.innerHTML = `
    <div class="view-heading"><h2>${title}</h2><p>${intro}</p></div>
    <div class="card-list">${items.map(item => `
      <article class="simple-card"><h3>${item.title}</h3><p>${item.text}</p><div class="card-meta">${item.meta}</div></article>`).join("")}</div>`;
}

function openLinkedDay(dayId, panel, key = "") {
  openDay(dayId, { restore: false });
  if (panel) showDayPanel(panel, key, { remember: false });
}

function bindLinkedDayActions() {
  document.querySelectorAll("[data-linked-day]").forEach(button => button.addEventListener("click", () => openLinkedDay(button.dataset.linkedDay, button.dataset.linkedPanel || "overview", button.dataset.linkedKey || "")));
}

function bindSavedChecks() {
  document.querySelectorAll("[data-save-check]").forEach(input => {
    const key = `nyc-check-${input.dataset.saveCheck}`;
    input.checked = localStorage.getItem(key) === "1";
    input.closest(".checkable-card")?.classList.toggle("done", input.checked);
    input.addEventListener("change", () => {
      localStorage.setItem(key, input.checked ? "1" : "0");
      input.closest(".checkable-card")?.classList.toggle("done", input.checked);
      updateProgressCounters();
    });
  });
  updateProgressCounters();
}

function updateProgressCounters() {
  document.querySelectorAll("[data-progress-for]").forEach(element => {
    const prefix = element.dataset.progressFor;
    const boxes = [...document.querySelectorAll(`[data-save-check^="${prefix}"]`)];
    element.textContent = `${boxes.filter(x => x.checked).length} z ${boxes.length} gotowe`;
  });
}

function journeyStats() {
  const keys=Object.keys(localStorage);
  return {
    places:keys.filter(key=>key.startsWith("nyc-check-place-visited-")&&localStorage.getItem(key)==="1").length,
    works:keys.filter(key=>key.startsWith("nyc-check-museum-seen-")&&localStorage.getItem(key)==="1").length
  };
}

function placeRegion(place) {
  return PLACE_EXTRAS[place.id]?.region || "midtown";
}

function placeCard(place) {
  const extra=PLACE_EXTRAS[place.id]||{};
  return `<button class="atlas-place-card" type="button" data-open-place="${place.id}">${place.image?`<img src="${place.image}" alt="${place.title}">`:`<span class="atlas-place-visual">${place.icon}</span>`}<span class="atlas-place-copy"><small>${extra.status||"w planie"} · ${place.meta}</small><strong>${place.title}</strong><em>${place.text}</em></span><b>›</b></button>`;
}

function bindPlaceCards() {
  document.querySelectorAll("[data-open-place]").forEach(button=>button.addEventListener("click",()=>renderPlaceDetail(button.dataset.openPlace)));
}

const PLACE_DAY_APPEARANCES = {
  "bryant-park":[{dayId:"2026-08-22",panel:"evening"},{dayId:"2026-08-24",panel:"movie"},{dayId:"2026-08-30",panel:"walk"}],
  grandcentral:[{dayId:"2026-08-26",panel:"morning"},{dayId:"2026-08-30",panel:"walk"}]
};

function placeDayAppearances(place) {
  return PLACE_DAY_APPEARANCES[place.id] || [{dayId:place.dayId,panel:place.panel}];
}

function appendDayPlaceLinks(dayId) {
  const links=PLACES.flatMap(place=>placeDayAppearances(place).filter(appearance=>appearance.dayId===dayId).map(appearance=>({place,...appearance})));
  links.forEach(({place,panel})=>{
    const section=sheetContent.querySelector(`.day-panel[data-panel="${panel}"]`);
    if(!section) return;
    let block=section.querySelector(".day-place-crosslinks");
    if(!block){
      block=document.createElement("section");
      block.className="day-place-crosslinks";
      block.innerHTML='<span class="mini-kicker">POWIĄZANE Z ATLASEM MIEJSC</span><h3>Przeczytaj więcej o miejscu</h3><div></div>';
      section.appendChild(block);
    }
    block.querySelector("div").insertAdjacentHTML("beforeend",`<button type="button" data-open-place-sheet="${place.id}"><span>${place.icon}</span><strong>${place.title}</strong><b>›</b></button>`);
  });
}

const MATYLDA_ATLAS = [
  { icon:"▣", title:"Animacja w MoMA", meta:"Dzień 3 · 24.08", text:"„It’s Alive!” i sto lat animacji — od pierwszych bohaterów po współczesny ruchomy obraz.", dayId:"2026-08-24", panel:"animation", placeId:"moma" },
  { icon:"☆", title:"Fifth Avenue i Rockefeller", meta:"Dzień 3 · 24.08", text:"Pierwsza sesja zakupowa: dwa sklepy główne i jeden szybki, bez schodzenia z trasy dnia.", dayId:"2026-08-24", panel:"shopping", placeId:"rockefeller-shopping" },
  { icon:"▶", title:"Stranger Things na Broadwayu", meta:"Dzień 4 · 25.08", text:"Kupione bilety na The First Shadow w Marquis Theatre — wieczór tylko w Nowym Jorku.", dayId:"2026-08-25", panel:"theatre" },
  { icon:"△", title:"SUMMIT One Vanderbilt", meta:"Dzień 5 · 26.08", text:"Lustra, unoszące się kule, szklane występy i panorama Manhattanu — najbardziej instagramowy poranek wyprawy.", dayId:"2026-08-26", panel:"morning", placeId:"summit" },
  { icon:"●", title:"US Open", meta:"Dzień 5 · 26.08", text:"Półfinał miksta, wejście na kompleks i krótki przewodnik po tenisie dla laików.", dayId:"2026-08-26", panel:"tennis", placeId:"us-open" },
  { icon:"★", title:"Statua Wolności i zdjęcia", meta:"Dzień 6 · 27.08", text:"Prom, najlepsza burta, ustawienie do wspólnego kadru i rezerwowe miejscówki z brzegu.", dayId:"2026-08-27", panel:"photos", placeId:"liberty" },
  { icon:"◇", title:"Zakupy w SoHo", meta:"Dzień 7 · 28.08", text:"Sklepy w jednym ciągu Broadwayu oraz opcjonalny słodki finał w Crumbl przy 195 Bleecker Street.", dayId:"2026-08-28", panel:"shopping", placeId:"soho", map:"https://www.google.com/maps/search/?api=1&query=Crumbl+195+Bleecker+Street+New+York" },
  { icon:"⚾", title:"Yankees–Red Sox", meta:"Dzień 7 · 28.08", text:"Baseball 101, Monument Park, stadionowe rytuały i jedna z największych rywalizacji sportowych USA.", dayId:"2026-08-28", panel:"stadium", placeId:"yankees" },
  { icon:"▱", title:"DUMBO · ikoniczny kadr", meta:"Dzień 8 · 29.08", text:"Manhattan Bridge, Empire State Building w prześwicie i dokładna miejscówka na Washington Street.", dayId:"2026-08-29", panel:"brooklyn", placeId:"dumbo" }
];

function renderMatyldaAtlas() {
  app.innerHTML=`<button class="view-back" type="button" id="matyldaBack">← Atlas miejsc</button><section class="matylda-hero"><span>NOWY JORK MATYLDY</span><h2>Cool, kultowo<br>i po swojemu</h2><p>Dziewięć momentów podróży wybranych z perspektywy Matyldy — od animacji i Broadwayu po SUMMIT, zakupy, sport oraz zdjęcia.</p></section><div class="matylda-atlas-list">${MATYLDA_ATLAS.map(item=>`<article class="matylda-atlas-card${item.panel==="shopping"?" matylda-shopping-card":""}">${item.panel==="shopping"?`<span class="matylda-shopping-stamp">ZAKUPY</span>`:""}<span class="matylda-atlas-icon">${item.icon}</span><div><small>${item.meta}</small><h3>${item.title}</h3><p>${item.text}</p><div class="place-actions"><button data-linked-day="${item.dayId}" data-linked-panel="${item.panel}">Otwórz tę część dnia ›</button>${item.placeId?`<button data-open-place="${item.placeId}">Zobacz miejsce ›</button>`:""}${item.map?`<a href="${item.map}" target="_blank" rel="noopener">Crumbl w Mapach ↗</a>`:""}</div></div></article>`).join("")}</div>`;
  document.getElementById("matyldaBack")?.addEventListener("click",renderPlaces);
  bindPlaceCards(); bindLinkedDayActions();
}

function renderPlaces() {
  const stats=journeyStats();
  app.innerHTML = `<section class="places-atlas-hero"><span>ATLAS WASZEGO NOWEGO JORKU</span><h2>Dziewięć rejonów<br>i Nowy Jork Matyldy</h2><p>Wybierz część miasta albo osobistą ścieżkę Matyldy. Dalej każde miejsce prowadzi do właściwego dnia, historii, zdjęć i map.</p><div class="atlas-stats"><b>${PLACES.length}<small>miejsc</small></b><b>${TRIP_REGIONS.length}<small>rejonów</small></b><b>${stats.places}<small>odwiedzonych</small></b></div></section>
    <div class="atlas-region-grid">${TRIP_REGIONS.map(region=>{const count=PLACES.filter(place=>placeRegion(place)===region.id).length;return `<button type="button" style="--region:${region.color}" data-place-region="${region.id}"><span>${String(count).padStart(2,"0")}</span><strong>${region.name}</strong><small>${region.days.map(id=>`D${DAYS.find(d=>d.id===id)?.day}`).join(" · ")}</small></button>`}).join("")}<button type="button" class="matylda-region-card" data-matylda-atlas><span>09</span><strong>MATYLDA</strong><small>cool · zakupy · sport · zdjęcia</small></button></div>
    <div class="section-title"><h3>Wszystkie miejsca</h3><span>dotknij, aby poznać szczegóły</span></div><div class="atlas-place-list">${PLACES.map(placeCard).join("")}</div>`;
  document.querySelectorAll("[data-place-region]").forEach(button=>button.addEventListener("click",()=>renderPlaceRegion(button.dataset.placeRegion)));
  document.querySelector("[data-matylda-atlas]")?.addEventListener("click",renderMatyldaAtlas);
  bindPlaceCards();
}

function renderPlaceRegion(regionId) {
  const region=TRIP_REGIONS.find(item=>item.id===regionId);
  if(!region) return renderPlaces();
  const places=PLACES.filter(place=>placeRegion(place)===region.id);
  app.innerHTML=`<button class="view-back" type="button" id="placesBack">← Atlas miejsc</button><section class="region-hero" style="--region:${region.color}"><span>${places.length} ${places.length===1?"miejsce":"miejsc"} · ${region.days.map(id=>`dzień ${DAYS.find(d=>d.id===id)?.day}`).join(" · ")}</span><h2>${region.name}</h2><p>${region.text}</p></section><div class="atlas-place-list region-list">${places.map(placeCard).join("")}</div>`;
  document.getElementById("placesBack")?.addEventListener("click",renderPlaces);
  bindPlaceCards();
}

function renderPlaceDetail(id) {
  const place=PLACES.find(item=>item.id===id);
  if(!place) return renderPlaces();
  const extra=PLACE_EXTRAS[id]||{};
  const region=TRIP_REGIONS.find(item=>item.id===placeRegion(place));
  const nearby=(extra.nearby||[]).map(nearId=>PLACES.find(item=>item.id===nearId)).filter(Boolean);
  const appearances=placeDayAppearances(place);
  app.innerHTML=`<button class="view-back" type="button" id="placeRegionBack">← ${region?.name||"Miejsca"}</button><article class="place-detail-hero" style="--region:${region?.color||"#f5c518"}">${place.image?`<img src="${place.image}" alt="${place.title}">`:`<div class="place-detail-symbol">${place.icon}</div>`}<div><span>${extra.status||"w planie"} · ${place.category}</span><h2>${place.title}</h2><p>${place.meta}</p></div></article><section class="place-detail-grid"><article><small>DLACZEGO TU JESTEŚMY</small><p>${extra.why||place.text}</p></article><article><small>HISTORIA / CIEKAWOSTKA</small><p>${extra.curiosity||place.text}</p></article><article class="photo-advice"><small>JAK ZROBIĆ DOBRE ZDJĘCIE</small><p>${extra.photoTip||"Zatrzymajcie się na chwilę, znajdźcie czytelne tło i pokażcie miejsce wraz z jego miejskim otoczeniem."}</p></article></section><div class="place-detail-actions">${appearances.map(appearance=>{const day=DAYS.find(item=>item.id===appearance.dayId);return `<button data-linked-day="${appearance.dayId}" data-linked-panel="${appearance.panel}">Otwórz w dniu ${day?.day||""}</button>`}).join("")}<a href="${place.map}" target="_blank" rel="noopener">Prowadź w Mapach ↗</a></div><label class="place-visited checkable-card"><input type="checkbox" data-save-check="place-visited-${place.id}"><span><strong>Byliśmy tutaj</strong><small>Zapisz jako odwiedzone w „Naszym NY”</small></span></label>${nearby.length?`<div class="section-title"><h3>W pobliżu</h3><span>warto połączyć</span></div><div class="atlas-place-list compact">${nearby.map(placeCard).join("")}</div>`:""}`;
  document.getElementById("placeRegionBack")?.addEventListener("click",()=>renderPlaceRegion(placeRegion(place)));
  bindPlaceCards(); bindLinkedDayActions(); bindSavedChecks();
}

function museumWorkStatus(status) {
  if (status === "on") return ["Na ekspozycji", "work-on"];
  if (status === "off") return ["Niewystawiane", "work-off"];
  return ["Sprawdź przed wizytą", "work-check"];
}

function worksCountLabel(count) {
  if(count===1) return "1 dzieło";
  if(count>=2&&count<=4) return `${count} dzieła`;
  return `${count} dzieł`;
}

function renderMuseumHub() {
  app.innerHTML = `<div class="view-heading"><h2>Muzea</h2><p>Osobisty przewodnik Gosi: orientacja w budynku, szeroki wybór dzieł i własna lista bez ryzyka, że aplikacja wybierze wszystko za Was.</p></div>
    <div class="notice">„W kolekcji” nie znaczy automatycznie „na ścianie”. Przy każdym dziele pokazujemy osobno status ekspozycji, a listę aktualizujemy przed podróżą.</div>
    <div class="museum-hub-grid">${MUSEUMS.map(museum => `<article class="museum-hub-card" style="--museum:${museum.accent}"><img class="museum-cover" src="${museum.coverImage}" alt="${museum.fullName}"><span class="mini-kicker">${museum.time}</span><h3>${museum.name}</h3><p>${museum.intro}</p><div class="museum-card-stats"><span>${museum.floors.length} poziomów/obszarów</span><span>${museum.works.length} dzieł w katalogu</span></div><button type="button" data-open-museum="${museum.id}">Otwórz przewodnik ›</button></article>`).join("")}</div>
    <div class="simple-card museum-method"><h3>Jak będziemy uzupełniać katalog?</h3><p>Dla znanych artystów lista ma być szeroka. Przed wyjazdem porównamy ją z oficjalnym filtrem „on view”, dzięki czemu Gosia zobaczy zarówno wszystkie interesujące prace w kolekcji, jak i realnie dostępny zestaw na dzień wizyty.</p></div>`;
  document.querySelectorAll("[data-open-museum]").forEach(button => button.addEventListener("click", () => renderMuseumDetail(button.dataset.openMuseum)));
}

function museumFloorPlan(museum) {
  const sections=[...new Set(museum.works.map(work=>work.section))].sort((a,b)=>a.localeCompare(b,"pl"));
  return `<div class="museum-building" style="--museum:${museum.accent}">${museum.floors.map(floor => `<details class="museum-floor"><summary><div class="floor-number">${floor.level}</div><div class="floor-shape" style="--floor-width:${floor.scale}%"><strong>${floor.title}</strong><span>${floor.rooms}</span></div></summary><p>${floor.text}</p></details>`).join("")}</div><div class="section-title"><h3>Działy i kolekcje</h3><span>wybierz, aby zobaczyć dzieła</span></div><div class="museum-departments">${sections.map(section=>{const count=museum.works.filter(work=>work.section===section).length;return `<button type="button" data-section-jump="${section}"><strong>${section}</strong><span>${count} ${count===1?"dzieło":"dzieł"} w katalogu ›</span></button>`}).join("")}</div>`;
}

function museumWorkCard(work, museum) {
  const [statusLabel, statusClass] = museumWorkStatus(work.status);
  return `<details class="museum-work-card" data-work-search="${`${work.artist} ${work.title} ${work.section}`.toLocaleLowerCase("pl")}" data-work-priority="${work.priority}" data-work-status="${work.status}" data-work-artist="${work.artist}" data-work-section="${work.section}">
    <summary>${work.image?`<img class="work-image" src="${work.image}" alt="${work.title} · ${work.artist}">`:`<div class="work-visual" style="--museum:${museum.accent}"><span>${work.artist.split(" ").map(x=>x[0]).slice(0,2).join("")}</span></div>`}<div class="work-summary"><span class="mini-kicker">${work.artist} · ${work.year}</span><h4>${work.title}</h4><div class="work-badges"><span class="${work.priority === "must" ? "work-must" : "work-good"}">${work.priority === "must" ? "Must see" : "Warto zobaczyć"}</span><span class="${statusClass}">${statusLabel}</span><span>${work.floor==="sprawdź"||work.floor==="magazyn"?work.floor:`piętro ${work.floor}`}</span></div></div><span class="work-open">＋</span></summary>
    <div class="work-detail"><img class="work-detail-image" src="${work.image}" alt="${work.title} · ${work.artist}"><p><strong>Styl / dział:</strong> ${work.section}</p><p><strong>Dlaczego jest ważne?</strong><br>${work.why}</p><div class="look-box"><strong>Jak czytać i na co patrzeć:</strong> ${work.look}</div><div class="work-actions"><label><input type="checkbox" data-save-check="museum-want-${work.id}"> chcę zobaczyć</label><label><input type="checkbox" data-save-check="museum-seen-${work.id}"> widziane</label><button class="audio-chip" type="button" data-museum-audio="${work.id}">▶ Posłuchaj przy dziele</button></div></div>
  </details>`;
}

function showMuseumPanel(panel) {
  document.querySelectorAll("[data-museum-panel]").forEach(button => button.classList.toggle("active", button.dataset.museumPanel === panel));
  document.querySelectorAll("[data-museum-content]").forEach(section => section.hidden = section.dataset.museumContent !== panel);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function filterMuseumWorks() {
  const query = (document.getElementById("museumSearch")?.value || "").trim().toLocaleLowerCase("pl");
  const priority = document.getElementById("museumPriority")?.value || "all";
  const status = document.getElementById("museumStatus")?.value || "all";
  const artist = document.getElementById("museumArtist")?.value || "all";
  const section = document.getElementById("museumSection")?.value || "all";
  let visible = 0;
  document.querySelectorAll('[data-museum-content="works"] [data-work-search]').forEach(card => {
    const matches = (!query || card.dataset.workSearch.includes(query)) && (priority === "all" || card.dataset.workPriority === priority) && (status === "all" || card.dataset.workStatus === status) && (artist === "all" || card.dataset.workArtist === artist) && (section === "all" || card.dataset.workSection === section);
    card.hidden = !matches;
    if (matches) visible += 1;
  });
  const counter = document.getElementById("museumFilterCount");
  if (counter) counter.textContent = `${visible} dzieł`;
}

function renderMuseumDetail(id) {
  const museum = MUSEUMS.find(item => item.id === id);
  if (!museum) return;
  const artists = [...new Set(museum.works.map(work => work.artist))].sort((a,b)=>a.localeCompare(b,"pl"));
  const sections = [...new Set(museum.works.map(work => work.section))].sort((a,b)=>a.localeCompare(b,"pl"));
  app.innerHTML = `<button class="view-back" type="button" id="museumHubBack">← Wszystkie muzea</button>
    <section class="museum-hero" style="--museum:${museum.accent}"><img src="${museum.coverImage}" alt="${museum.fullName}"><div><span class="mini-kicker">${museum.time} · ${museum.works.length} dzieł do wyboru</span><h2>${museum.fullName}</h2><p>${museum.intro}</p><div class="hero-actions"><button class="button" data-linked-day="${museum.dayId}" data-linked-panel="${museum.dayPanel}">Otwórz w planie dnia</button><span data-progress-for="museum-seen-"></span></div></div></section>
    <nav class="museum-tabs" aria-label="Sekcje muzeum"><button class="active" data-museum-panel="overview">Start</button><button data-museum-panel="floors">Piętra</button><button data-museum-panel="works">Dzieła</button><button data-museum-panel="artists">Artyści</button></nav>
    <section data-museum-content="overview"><div class="notice">${museum.statusNote}</div><div class="museum-start-grid"><article class="simple-card"><h3>60 minut</h3><p>Tylko zaznaczone Must see. Po pięciu dziełach oceńcie energię i nie próbujcie nadrabiać biegiem.</p></article><article class="simple-card"><h3>90–120 minut</h3><p>Must see oraz wybrani wcześniej artyści. To podstawowy wariant dla Whitney i Guggenheimu.</p></article><article class="simple-card"><h3>Pełny czas</h3><p>Własna lista Gosi, przerwa w połowie i najwyżej jedno spontaniczne odejście od trasy na piętro.</p></article></div><button class="button museum-primary-action" data-museum-jump="works">Wybierz dzieła przed wyjazdem</button></section>
    <section data-museum-content="floors" hidden><div class="view-heading compact"><h2>Jak duże jest muzeum?</h2><p>Uproszczony schemat pokazuje względną skalę i podział funkcjonalny. Nie zastępuje oficjalnego planu sal.</p></div>${museumFloorPlan(museum)}</section>
    <section data-museum-content="works" hidden><div class="museum-filter-bar"><label class="museum-search">Szukaj<input id="museumSearch" type="search" placeholder="artysta, dzieło lub dział"></label><label>Priorytet<select id="museumPriority"><option value="all">Wszystkie</option><option value="must">Must see</option><option value="good">Warto zobaczyć</option></select></label><label>Status<select id="museumStatus"><option value="all">Każdy status</option><option value="on">Na ekspozycji</option><option value="check">Do sprawdzenia</option><option value="off">Niewystawiane</option></select></label><label>Dział<select id="museumSection"><option value="all">Wszystkie działy</option>${sections.map(section=>`<option value="${section}">${section}</option>`).join("")}</select></label><label>Artysta<select id="museumArtist"><option value="all">Wszyscy artyści</option>${artists.map(artist=>`<option value="${artist}">${artist}</option>`).join("")}</select></label></div><div class="section-title"><h3>Katalog do własnego wyboru</h3><span id="museumFilterCount">${museum.works.length} dzieł</span></div><div class="museum-work-list">${museum.works.map(work=>museumWorkCard(work,museum)).join("")}</div></section>
    <section data-museum-content="artists" hidden><div class="view-heading compact"><h2>Artyści i ich dzieła</h2><p>Każdy profil wyjaśnia styl, okres twórczości i najważniejszy przełom. Naciśnięcie dzieła otwiera jego pełną kartę.</p></div><div class="museum-artist-groups">${artists.map(artist=>{const works=museum.works.filter(work=>work.artist===artist);const profile=ARTIST_PROFILES[artist]||{years:"",style:"",breakthrough:""};return `<details class="museum-artist-group"><summary><div><strong>${artist}</strong><small>${profile.years} · ${profile.style}</small></div><span>${worksCountLabel(works.length)}</span></summary><div class="artist-profile"><b>Dlaczego jest ważny?</b><p>${profile.breakthrough}</p></div><div class="artist-work-links">${works.map(work=>`<button type="button" data-work-jump="${work.id}" data-work-artist-jump="${artist}"><img src="${work.image}" alt=""><span>${work.title}</span><small>${work.year} · ${work.priority==="must"?"Must see":"Warto zobaczyć"}</small></button>`).join("")}</div></details>`}).join("")}</div></section>`;
  document.getElementById("museumHubBack")?.addEventListener("click", renderMuseumHub);
  document.querySelectorAll("[data-museum-panel]").forEach(button=>button.addEventListener("click",()=>showMuseumPanel(button.dataset.museumPanel)));
  document.querySelectorAll("[data-museum-jump]").forEach(button=>button.addEventListener("click",()=>showMuseumPanel(button.dataset.museumJump)));
  ["museumSearch","museumPriority","museumStatus","museumSection","museumArtist"].forEach(control=>document.getElementById(control)?.addEventListener(control === "museumSearch" ? "input" : "change",filterMuseumWorks));
  document.querySelectorAll("[data-section-jump]").forEach(button=>button.addEventListener("click",()=>{showMuseumPanel("works");const select=document.getElementById("museumSection");if(select){select.value=button.dataset.sectionJump;filterMuseumWorks();}}));
  document.querySelectorAll("[data-work-jump]").forEach(button=>button.addEventListener("click",()=>{showMuseumPanel("works");const artistSelect=document.getElementById("museumArtist");if(artistSelect)artistSelect.value=button.dataset.workArtistJump;filterMuseumWorks();const card=document.querySelector(`[data-work-search][data-work-artist="${button.dataset.workArtistJump}"]`);const exact=[...document.querySelectorAll('[data-museum-content="works"] .museum-work-card')].find(item=>item.querySelector('input')?.dataset.saveCheck===`museum-want-${button.dataset.workJump}`);if(exact){exact.open=true;setTimeout(()=>exact.scrollIntoView({behavior:"smooth",block:"center"}),80);}else card?.scrollIntoView({behavior:"smooth",block:"center"});}));
  document.querySelectorAll("[data-artist-jump]").forEach(button=>button.addEventListener("click",()=>{showMuseumPanel("works"); const select=document.getElementById("museumArtist"); if(select){select.value=button.dataset.artistJump;filterMuseumWorks();}}));
  document.querySelectorAll("[data-museum-audio]").forEach(button=>button.addEventListener("click",event=>{event.preventDefault(); const work=museum.works.find(item=>item.id===button.dataset.museumAudio); if(work)playSnippet(`${work.artist}. ${work.title}. ${work.why} Na co patrzeć. ${work.look}`,button);}));
  bindLinkedDayActions();
  bindSavedChecks();
}

function showPreparePanel(panel) {
  document.querySelectorAll("[data-prepare-panel]").forEach(button => {
    const active = button.dataset.preparePanel === panel;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
  document.querySelectorAll("[data-prepare-content]").forEach(section => {
    section.hidden = section.dataset.prepareContent !== panel;
  });
}

function showMediaPanel(panel) {
  document.querySelectorAll("[data-media-panel]").forEach(x=>x.classList.toggle("active",x.dataset.mediaPanel===panel));
  document.querySelectorAll("[data-media-content]").forEach(x=>x.hidden=x.dataset.mediaContent!==panel);
}

function renderPrepare() {
  app.innerHTML = `
    <div class="view-heading"><h2>Przed wyjazdem</h2><p>Materiały, aplikacje oraz zakupy i rezerwacje w jednym miejscu — bez mieszania ich z planem bieżącego dnia.</p></div>
    <div class="prepare-tabs" role="tablist" aria-label="Przygotowania do podróży">
      <button class="prepare-tab active" type="button" role="tab" aria-selected="true" data-prepare-panel="materials">Filmy i muzyka</button>
      <button class="prepare-tab" type="button" role="tab" aria-selected="false" data-prepare-panel="apps">Aplikacje</button>
      <button class="prepare-tab" type="button" role="tab" aria-selected="false" data-prepare-panel="buy">Kupić</button>
    </div>
    <section class="prepare-panel" data-prepare-content="materials">
      <div class="media-tabs"><button class="media-tab active" data-media-panel="films">Filmy i seriale</button><button class="media-tab" data-media-panel="music">Muzyka</button><button class="media-tab" data-media-panel="museums">Muzea</button></div>
      <section data-media-content="films"><div class="section-title"><h3>Przed seansem w Nowym Jorku</h3><span data-progress-for="film-"></span></div><div class="media-grid">${FILMS.map(x=>`<article class="media-card checkable-card"><div class="media-top"><span>${x.year} · ${x.audience}</span><label><input type="checkbox" data-save-check="film-${x.id}"> obejrzane</label></div><h3>${x.title}</h3><strong>${x.place}</strong><p>${x.why}</p><small>${x.note}</small><div class="media-actions"><a href="${x.url}" target="_blank" rel="noopener">Zwiastun ↗</a><button data-linked-day="${x.dayId}" data-linked-panel="${x.panel}">Powiązany dzień ›</button></div></article>`).join("")}</div></section>
      <section data-media-content="music" hidden><div class="section-title"><h3>Posłuchaj przed podróżą</h3><span data-progress-for="music-"></span></div><div class="media-grid">${MUSIC.map(x=>`<article class="media-card checkable-card"><div class="media-top"><span>${x.subtitle}</span><label><input type="checkbox" data-save-check="music-${x.id}"> poznane</label></div><h3>${x.title}</h3><strong>${x.forWhom}</strong><p>${x.text}</p><div class="media-actions"><a href="${x.spotify}" target="_blank" rel="noopener">Spotify ↗</a><a href="${x.apple}" target="_blank" rel="noopener">Apple Music ↗</a><button data-linked-day="${x.dayId}" data-linked-panel="${x.panel}">W planie ›</button></div></article>`).join("")}</div></section>
      <section data-media-content="museums" hidden><div class="notice">Bloomberg Connects obsługuje MoMA, The Met, Whitney i Guggenheim. Pobierzcie treści oraz sprawdźcie słuchawki jeszcze w Polsce.</div><div class="card-list">${PREPARE.slice(2).map(x=>`<article class="simple-card"><h3>${x.title}</h3><p>${x.text}</p><div class="card-meta">${x.meta}</div></article>`).join("")}<article class="simple-card"><h3>Nasze trasy muzealne</h3><p>Guggenheim 2 godziny · MoMA 3 godziny lub skrót · The Met cztery obszary · Whitney 90–120 minut.</p><div class="place-actions"><button data-linked-day="2026-08-23" data-linked-panel="guggenheim">Guggenheim</button><button data-linked-day="2026-08-24" data-linked-panel="museum">MoMA</button><button data-linked-day="2026-08-25" data-linked-panel="museum">The Met</button><button data-linked-day="2026-08-27" data-linked-panel="museum">Whitney</button></div></article></div></section>
    </section>
    <section class="prepare-panel" data-prepare-content="apps" hidden>
      <div class="notice">Pobierzcie aplikacje i zalogujcie się jeszcze w Polsce. Do muzeów weźcie własne słuchawki.</div>
      <div class="section-title"><h3>Na iPhone’a</h3><span data-progress-for="app-"></span></div><div class="prepare-list">${TRAVEL_APPS.map((item,index) => `
        <article class="prepare-card checkable-card">
          <span class="prepare-badge">${item.priority}</span>
          <h3>${item.title}</h3><p>${item.use}</p><small>${item.meta}</small>
          <div class="media-actions"><a href="${item.url}" target="_blank" rel="noopener">Pobierz na iPhone’a ↗</a><label class="inline-check"><input type="checkbox" data-save-check="app-${index}"> pobrana</label></div>
        </article>`).join("")}</div>
    </section>
    <section class="prepare-panel" data-prepare-content="buy" hidden>
      <div class="notice">Lista pokazuje też właściwy moment zakupu — nie każdą rzecz warto rezerwować już teraz.</div>
      <div class="section-title"><h3>Do załatwienia</h3><span data-progress-for="buy-"></span></div><div class="prepare-list">${TO_BUY.map((item,index) => `
        <article class="prepare-card buy-card checkable-card">
          <div class="buy-card-top"><span class="buy-status buy-${item.kind}">${item.status}</span><small>${item.when}</small></div>
          <h3>${item.title}</h3><p>${item.text}</p>
          <div class="media-actions"><a href="${item.url}" target="_blank" rel="noopener">${item.action} ↗</a><label class="inline-check"><input type="checkbox" data-save-check="buy-${index}"> załatwione</label></div>
        </article>`).join("")}</div>
      <div class="section-title"><h3>Już kupione</h3></div>
      <article class="simple-card"><p><strong>Stranger Things</strong> · 25.08<br><strong>US Open Mixed Doubles</strong> · 26.08<br><strong>Yankees–Red Sox</strong> · 28.08</p><div class="card-meta">Bilety zabezpieczone</div></article>
    </section>`;
  document.querySelectorAll("[data-prepare-panel]").forEach(button => button.addEventListener("click", () => showPreparePanel(button.dataset.preparePanel)));
  document.querySelectorAll("[data-media-panel]").forEach(button => button.addEventListener("click", () => showMediaPanel(button.dataset.mediaPanel)));
  bindLinkedDayActions();
  bindSavedChecks();
}

function renderWallet() {
  app.innerHTML = `<div class="view-heading"><h2>Portfel podróży</h2><p>Potwierdzenia, adresy i właściwa aplikacja — bez szukania w poczcie pod wejściem.</p></div><div class="notice">Nie zapisujemy tu paszportów, kodów QR ani innych wrażliwych danych. Bilety otwieracie w oficjalnych aplikacjach lub Apple Wallet.</div><div class="wallet-summary"><strong>${WALLET_ITEMS.filter(x=>x.status.startsWith("Kupione")).length}</strong><span>kupione bilety</span><strong>${WALLET_ITEMS.filter(x=>!x.status.startsWith("Kupione")).length}</strong><span>do uzupełnienia</span></div><div class="wallet-list">${WALLET_ITEMS.map(x=>`<article class="wallet-card"><div class="wallet-icon">${x.type==="flight"?"✈":x.type==="hotel"?"⌂":x.type==="music"?"♪":"▣"}</div><div><span class="mini-kicker">${x.date}</span><h3>${x.title}</h3><p>${x.place}</p><span class="wallet-status ${x.status.startsWith("Kupione")?"wallet-ready":""}">${x.status}</span><div class="place-actions"><button data-linked-day="${x.dayId}" data-linked-panel="${x.panel}">Otwórz dzień ›</button>${x.map?`<a href="${x.map}" target="_blank" rel="noopener">Mapa ↗</a>`:""}</div></div></article>`).join("")}</div><div class="section-title"><h3>Gdzie są bilety?</h3></div><div class="simple-card"><p><strong>US Open:</strong> aplikacja US Open<br><strong>Yankees:</strong> MLB Ballpark / Apple Wallet<br><strong>Broadway:</strong> e-mail sprzedawcy / Apple Wallet<br><strong>Blue Note:</strong> e-mail po zakupie</p><div class="card-meta">Sprawdzić dostęp offline przed wyjściem z hotelu</div></div>`;
  bindLinkedDayActions();
}

function bindDaySwipe(dayId) {
  daySwipeController?.abort();
  daySwipeController = new AbortController();
  const signal = daySwipeController.signal;
  let start = null;
  const blocked = target => target.closest(".day-map-board,[data-gesture-map],.day-tabs,.day-module-nav,.museum-tabs,a,button,input,label,summary,select,textarea");
  sheetContent.addEventListener("touchstart", event => {
    if (event.touches.length !== 1 || blocked(event.target)) { start = null; return; }
    const touch = event.touches[0];
    start = { x:touch.clientX, y:touch.clientY, time:Date.now() };
  }, { passive:true, signal });
  sheetContent.addEventListener("touchcancel", () => { start = null; }, { passive:true, signal });
  sheetContent.addEventListener("touchend", event => {
    if (!start || event.changedTouches.length !== 1) { start = null; return; }
    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    const elapsed = Date.now() - start.time;
    start = null;
    if (elapsed > 900 || Math.abs(dx) < 70 || Math.abs(dx) < Math.abs(dy) * 1.35) return;
    const index = DAYS.findIndex(day => day.id === dayId);
    const direction = dx < 0 ? 1 : -1;
    const next = DAYS[index + direction];
    if (!next) {
      sheetContent.animate?.([{transform:"translateX(0)"},{transform:`translateX(${direction > 0 ? -10 : 10}px)`},{transform:"translateX(0)"}],{duration:180,easing:"ease-out"});
      return;
    }
    openDay(next.id,{restore:false});
    sheetContent.animate?.([{transform:`translateX(${direction > 0 ? 24 : -24}px)`,opacity:.72},{transform:"translateX(0)",opacity:1}],{duration:210,easing:"cubic-bezier(.2,.8,.2,1)"});
  }, { passive:true, signal });
}

function openDay(id, options = {}) {
  const { restore = true } = options;
  const day = DAYS.find(item => item.id === id);
  if (!day) return;
  saveCurrentDayState();
  stopReading();
  activeDayId = id;
  currentDayPanel = "overview";
  dayPanelHistory = [];
  currentReadingText = dayReadingText(day);
  const guide = typeof DAY_GUIDES !== "undefined" ? DAY_GUIDES[day.id] : null;
  sheetContent.innerHTML = `
    <p class="sheet-kicker">Dzień ${day.day} · ${day.date} · ${day.weekday}</p>
    <h2 id="sheetTitle">${day.title}</h2>
    <p class="lead">${day.story}</p>
    <div class="day-swipe-hint" aria-label="Przesuwanie między dniami"><span>${day.day>1?"← poprzedni":""}</span><b>przesuń dzień palcem</b><span>${day.day<DAYS.length?"następny →":""}</span></div>
    ${dayAdventureMap(day)}
    <button class="context-back" id="dayContextBack" type="button" hidden>← Wróć</button>
    ${guide ? renderDayGuide(day) : `<div class="sheet-section"><h3>Plan dnia</h3>${timeline(day.items)}</div><div class="sheet-section"><h3>Najważniejsze</h3><div class="simple-card"><p>${day.essentials.join("<br>")}</p></div></div>`}`;
  appendDayPlaceLinks(day.id);
  sheet.hidden = false;
  sheetBackdrop.hidden = false;
  document.body.style.overflow = "hidden";
  sheet.scrollTop = 0;
  bindSavedChecks();
  document.getElementById("dayContextBack")?.addEventListener("click", returnToPreviousDayContext);
  sheetContent.querySelectorAll("[data-day-map-direct]").forEach(button => button.addEventListener("click", () => showDayPanel(button.dataset.dayMapDirect, "", { remember:true, originLabel:"Mapa dnia" })));
  sheetContent.querySelectorAll("[data-day-map-panel]").forEach(button => button.addEventListener("click", () => {
    sheetContent.querySelectorAll("[data-day-map-panel]").forEach(item => item.classList.toggle("selected", item === button));
    sheetContent.querySelectorAll(".day-module,.day-tab").forEach(tile => {
      const active = tile.dataset.dayPanel === button.dataset.dayMapPanel;
      tile.classList.toggle("active", active);
      tile.setAttribute("aria-selected", String(active));
    });
    const detail = document.getElementById("dayMapDetail");
    if (!detail) return;
    detail.innerHTML = `<strong>${button.dataset.dayMapTitle}</strong><p>${button.dataset.dayMapNote}</p><button type="button">Otwórz tę część dnia <span>›</span></button>`;
    detail.querySelector("button")?.addEventListener("click", () => showDayPanel(button.dataset.dayMapPanel, button.dataset.dayMapKey || "", { remember:true, originLabel:`Mapa dnia · ${button.dataset.dayMapTitle}` }));
  }));
  sheetContent.querySelectorAll(".day-map-board[data-gesture-map]").forEach(bindGestureMap);
  sheetContent.querySelectorAll("[data-open-museum-direct]").forEach(button=>button.addEventListener("click",()=>{
    const museumId=button.dataset.openMuseumDirect;
    closeSheet();
    setView("museums");
    renderMuseumDetail(museumId);
  }));
  sheetContent.querySelectorAll("[data-open-place-sheet]").forEach(button=>button.addEventListener("click",()=>{
    const placeId=button.dataset.openPlaceSheet;
    closeSheet();
    setView("places");
    renderPlaceDetail(placeId);
  }));
  if (guide) {
    sheetContent.querySelectorAll("[data-overview-panel]").forEach(button => button.addEventListener("click", () => showDayPanel(button.dataset.overviewPanel, "", { remember: true, originLabel: `Plansza dnia · ${button.querySelector("span")?.textContent || "punkt"}` })));
    sheetContent.querySelectorAll("[data-day-panel]").forEach(button => button.addEventListener("click", () => showDayPanel(button.dataset.dayPanel, "", { remember: false })));
    sheetContent.querySelectorAll("[data-panel-jump]").forEach(card => {
      const open = () => showDayPanel(card.dataset.panelJump, "", { remember: true, originLabel: `Plan · ${card.querySelector("h4")?.textContent || "punkt dnia"}` });
      card.addEventListener("click", open);
      card.addEventListener("keydown", event => { if (event.key === "Enter" || event.key === " ") open(); });
    });
    sheetContent.querySelectorAll("[data-related-panel]").forEach(button => button.addEventListener("click", () => showDayPanel(button.dataset.relatedPanel, button.dataset.relatedKey || "", { remember: true, originLabel: button.dataset.returnLabel || dayPanelLabel(currentDayPanel) })));
    sheetContent.querySelectorAll("[data-next-stop]").forEach(button => button.addEventListener("click", () => {
      const target = sheetContent.querySelectorAll(".route-stop")[Number(button.dataset.nextStop)];
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    }));
    sheetContent.querySelectorAll("[data-audio-key]").forEach(button => {
      const [group, rawIndex] = button.dataset.audioKey.split("-");
      const source = group === "listen" ? guide.bluenote?.listen
        : group === "about" ? guide.bluenote?.about
        : group === "screen" ? guide.screen
        : group === "floor" ? guide.museum?.floors
        : group === "work" ? guide.works
        : group === "animation" ? guide.animation
        : group === "movie" ? [
          { title: "Elvis jako aktor", text: guide.movie?.story },
          { title: "Na co zwrócić uwagę", text: guide.movie?.listen }
        ]
        : group === "guggenheim" ? [{ title: guide.guggenheim?.title, text: guide.guggenheim?.text }]
        : group === "metstop" ? guide.museum?.stops
        : group === "metstory" ? guide.stories
        : group === "theatre" ? guide.theatre?.before
        : group === "qroute" ? guide.route
        : group === "qstory" ? guide.stories
        : group === "tennisbasic" ? guide.tennis?.basics
        : group === "wstop" ? guide.museum?.stops
        : group === "wroute" ? guide.route
        : group === "wstory" ? guide.stories
        : group === "wevening" ? guide.evening
        : group === "wphoto" ? guide.photos?.onboard
        : group === "wshore" ? guide.photos?.shore
        : group === "wdowntown" ? guide.downtown?.route
        : group === "syroute" ? guide.route
        : group === "systory" ? guide.stories
        : group === "systadium" ? guide.stadium?.traditions?.map((text, index) => ({ title: ["Monument Park", "Dwa strike’i", "Seventh-inning stretch", "New York, New York"][index], text }))
        : group === "baseballbasic" ? guide.baseball?.basics
        : group === "bjroute" ? guide.brooklyn
        : group === "bjstory" ? guide.stories
        : group === "bargelisten" ? guide.bargemusic?.listen
        : group === "jazzbasic" ? guide.festival?.basics
        : group === "jazzartist" ? guide.festival?.lineup
        : group === "parker" ? [guide.stories?.[4], guide.stories?.[5], guide.stories?.[6]]
        : group === "depdiner" ? guide.diner?.basics
        : group === "depwalk" ? guide.walk
        : group === "depstory" ? guide.stories
        : group === "depgugg" ? guide.guggenheim?.route
        : guide.stories;
      const item = source?.[Number(rawIndex)];
      if (item) button.addEventListener("click", () => playSnippet(`${item.title}. ${item.text}`, button));
    });
    if (guide.bluenote?.countdown) {
      updateBlueNoteCountdown(guide.bluenote.countdown);
      clearInterval(countdownTimer);
      countdownTimer = setInterval(() => updateBlueNoteCountdown(guide.bluenote.countdown), 60000);
    }
    const saved = restore ? savedDayStates.get(id) : null;
    if (saved) {
      dayPanelHistory = saved.history || [];
      showDayPanel(saved.panel || "overview", "", { remember: false, restoreScroll: saved.scrollTop || 0 });
    } else {
      updateContextBackButton();
    }
  }
  bindDaySwipe(id);
}

if ("speechSynthesis" in window) speechSynthesis.addEventListener?.("voiceschanged", populateVoiceSelect);

function closeSheet() {
  saveCurrentDayState();
  stopReading();
  clearInterval(countdownTimer);
  sheet.hidden = true;
  sheetBackdrop.hidden = true;
  document.body.style.overflow = "";
}

function openTripInfo() {
  sheetContent.innerHTML = `
    <p class="sheet-kicker">Podróż rodzinna</p>
    <h2 id="sheetTitle">${TRIP.title}</h2>
    <p class="lead">${TRIP.travelers}<br>${TRIP.dates}</p>
    <div class="simple-card"><h3>Baza na Manhattanie</h3><p>${TRIP.hotel.name}<br>${TRIP.hotel.address}</p></div>
    <div class="sheet-section"><div class="notice">Aplikacja jest projektowana jako osobisty przewodnik „co teraz / co dalej”, a nie encyklopedia całego miasta.</div></div>`;
  sheet.hidden = false;
  sheetBackdrop.hidden = false;
  document.body.style.overflow = "hidden";
}

function bindDynamicActions() {
  document.querySelectorAll("[data-open-day]").forEach(element => {
    element.addEventListener("click", () => openDay(element.dataset.openDay));
    element.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") openDay(element.dataset.openDay);
    });
  });
  document.querySelectorAll("[data-view-jump]").forEach(element => {
    element.addEventListener("click", () => setView(element.dataset.viewJump));
  });
}

function setView(view) {
  currentView = view;
  navItems.forEach(item => item.classList.toggle("active", item.dataset.view === view));
  if (view === "home") renderHome();
  if (view === "today") renderToday();
  if (view === "plan") renderPlan();
  if (view === "places") renderPlaces();
  if (view === "museums") renderMuseumHub();
  if (view === "prepare") renderPrepare();
  if (view === "wallet") renderWallet();
  window.scrollTo({ top: 0, behavior: "instant" });
  app.focus({ preventScroll: true });
}

navItems.forEach(item => item.addEventListener("click", () => setView(item.dataset.view)));
document.getElementById("homeButton").addEventListener("click", () => setView("home"));
document.getElementById("closeSheetButton").addEventListener("click", closeSheet);
sheetBackdrop.addEventListener("click", closeSheet);
document.addEventListener("keydown", event => { if (event.key === "Escape" && !sheet.hidden) closeSheet(); });
window.addEventListener("pageshow", () => {
  if (currentView === "home") window.scrollTo(0, 0);
});

if ("serviceWorker" in navigator) {
  let reloadingForUpdate = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (reloadingForUpdate) return;
    reloadingForUpdate = true;
    window.location.reload();
  });
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js", { updateViaCache:"none" }));
}

setView(currentView);
