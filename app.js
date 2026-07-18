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
  const queensExtra = guide?.kind === "queens" ? [...guide.route.map(item => `${item.title}. ${item.text}`), ...guide.stories.map(item => `${item.title}. ${item.text}`), ...guide.tennis.basics.map(item => `${item.title}. ${item.text}`)].join(" ") : "";
  const westExtra = guide?.kind === "westside" ? [...guide.photos.onboard.map(item=>`${item.title}. ${item.text}`),...guide.downtown.route.map(item=>`${item.title}. ${item.text}`),...guide.museum.stops.map(item=>`${item.title}. ${item.text}`),...guide.route.map(item=>`${item.title}. ${item.text}`),...guide.stories.map(item=>`${item.title}. ${item.text}`)].join(" ") : "";
  const baseballExtra = guide?.kind === "sohoyankees" ? [...guide.route.map(item=>`${item.title}. ${item.text}`),...guide.stories.map(item=>`${item.title}. ${item.text}`),...guide.baseball.basics.map(item=>`${item.title}. ${item.text}`)].join(" ") : "";
  const jazzExtra = guide?.kind === "brooklynjazz" ? [...guide.brooklyn.map(item=>`${item.title}. ${item.text}`),...guide.stories.map(item=>`${item.title}. ${item.text}`),...guide.festival.basics.map(item=>`${item.title}. ${item.text}`)].join(" ") : "";
  const departureExtra = guide?.kind === "departure" ? [...guide.diner.basics.map(item=>`${item.title}. ${item.text}`),...guide.walk.map(item=>`${item.title}. ${item.text}`),...guide.stories.map(item=>`${item.title}. ${item.text}`)].join(" ") : "";
  return `${day.title}. ${day.story} Plan dnia. ${plan} Najważniejsze. ${day.essentials.join(". ")}. ${arrivalExtra || villageExtra || momaExtra || metExtra || queensExtra || westExtra || baseballExtra || jazzExtra || departureExtra}`;
}

function guideCard(item, audioKey = "", audioLabel = "Posłuchaj historii", contentKey = "") {
  return `<article class="guide-card" ${contentKey ? `data-content-key="${contentKey}"` : ""}>${item.image ? `<figure class="orientation-photo"><img src="${item.image.src}" alt="${item.image.alt}"><figcaption>Punkt orientacyjny · ${item.image.credit}</figcaption></figure>` : ""}<h4>${item.title}</h4><p>${item.text}</p>${audioKey ? `<button class="audio-chip" type="button" data-audio-key="${audioKey}">▶ ${audioLabel}</button>` : ""}</article>`;
}

function renderFoodPanel(guide) {
  if (!guide.food) return "";
  return `<section class="day-panel" data-panel="food" hidden>
    <h3>Jedzenie po drodze</h3>
    <p class="panel-intro">Sprawdzone propozycje w różnych cenach, nie ranking. Godziny i stoliki sprawdzamy ponownie przed wyjściem.</p>
    <div class="food-list">${guide.food.map(place => `<article class="food-card">${place.image ? `<figure class="orientation-photo"><img src="${place.image.src}" alt="${place.image.alt}"><figcaption>Punkt orientacyjny · ${place.image.credit}</figcaption></figure>` : ""}<div><span class="mini-kicker">${place.category} · ${place.price}</span><h4>${place.name}</h4><p>${place.address}</p><p>${place.note}</p></div><a href="${place.url}" target="_blank" rel="noopener">Menu / informacje ↗</a></article>`).join("")}</div>
  </section>`;
}

function renderVillageGuide(day, guide) {
  return `
    <nav class="day-tabs" aria-label="Sekcje dnia">
      <button class="day-tab active" type="button" data-day-panel="overview">Plan</button>
      <button class="day-tab" type="button" data-day-panel="route">Trasa</button>
      <button class="day-tab" type="button" data-day-panel="stories">Historie</button>
      <button class="day-tab" type="button" data-day-panel="screen">Seriale</button>
      <button class="day-tab" type="button" data-day-panel="food">Jedzenie</button>
      <button class="day-tab" type="button" data-day-panel="variants">Warianty</button>
      <button class="day-tab" type="button" data-day-panel="bluenote">Blue Note</button>
      <button class="day-tab" type="button" data-day-panel="links">Mapy</button>
    </nav>
    <section class="day-panel active" data-panel="overview">
      <div class="sheet-section"><h3>Plan dnia · wybierz punkt</h3>${timeline(day.items, guide.timelineTargets)}</div>
      <div class="quick-filters" aria-label="Skróty tematyczne"><button data-related-panel="stories">Historia</button><button data-related-panel="screen">Seriale</button><button data-related-panel="bluenote">Muzyka</button><button data-related-panel="screen">Dla Matyldy</button></div>
      <div class="sheet-section"><h3>Najważniejsze</h3><div class="simple-card"><p>${day.essentials.join("<br>")}</p></div></div>
    </section>
    <section class="day-panel" data-panel="route" hidden>
      <div class="section-heading-row"><h3>Spacer przez Greenwich Village</h3><span>sprawdzono ${guide.checked}</span></div>
      <p class="panel-intro">To kolejność, nie rozkład jazdy. Każdy kolejny punkt można skrócić bez psucia opowieści.</p>
      <div class="route-list">${guide.route.map((stop, index) => `
        <article class="route-stop">
          <div class="route-number">${index + 1}</div>
          <div>${stop.image ? `<figure class="orientation-photo"><img src="${stop.image.src}" alt="${stop.image.alt}"><figcaption>Punkt orientacyjny · ${stop.image.credit}</figcaption></figure>` : ""}<span class="mini-kicker">${stop.time}</span><h4>${stop.title}</h4><p>${stop.text}</p><div class="look-box"><strong>Rozejrzyj się:</strong> ${stop.look}</div>${stop.pause ? `<div class="pause-prompt">${stop.pause}</div>` : ""}${stop.related?.length ? `<div class="related-row">${stop.related.map(item => `<button type="button" data-related-panel="${item.panel}" ${item.key ? `data-related-key="${item.key}"` : ""}>${item.label} ›</button>`).join("")}</div>` : ""}${index < guide.route.length - 1 ? `<button class="next-stop" type="button" data-next-stop="${index + 1}">Następny punkt →</button>` : ""}</div>
        </article>`).join("")}</div>
    </section>
    <section class="day-panel" data-panel="stories" hidden>
      <h3>Pięć historii Village</h3>
      <p class="panel-intro">Każdą historię można odtworzyć osobno dokładnie w miejscu, którego dotyczy.</p>
      <div class="guide-grid">${guide.stories.map((item, index) => guideCard(item, `story-${index}`, "Posłuchaj historii", `story-${index}`)).join("")}</div>
    </section>
    <section class="day-panel" data-panel="screen" hidden>
      <h3>Serialowe i filmowe Village</h3>
      <p class="panel-intro">Adresy są dodatkiem do dzielnicy. Jeśli nie macie ochoty na popkulturę, można pominąć cały moduł jednym ruchem.</p>
      <div class="guide-grid">${guide.screen.map((item, index) => guideCard(item, `screen-${index}`, "Posłuchaj", `screen-${index}`)).join("")}</div>
    </section>
    ${renderFoodPanel(guide)}
    <section class="day-panel" data-panel="variants" hidden><h3>Wybierz wersję dnia</h3><div class="guide-grid">${guide.variants.map(item => guideCard(item)).join("")}</div></section>
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
      <div class="food-list shopping-list">${guide.shopping.map(place => `<article class="food-card"><div><span class="mini-kicker">${place.category} · ${place.hours}</span><h4>${place.name}</h4><p>${place.address}</p><p>${place.note}</p></div><a href="${place.url}" target="_blank" rel="noopener">Oficjalna strona ↗</a></article>`).join("")}</div>
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
    <button class="day-tab active" type="button" data-day-panel="overview">Plan</button><button class="day-tab" type="button" data-day-panel="guggenheim">Guggenheim</button><button class="day-tab" type="button" data-day-panel="museum">The Met</button><button class="day-tab" type="button" data-day-panel="stories">Historie</button><button class="day-tab" type="button" data-day-panel="park">Park</button><button class="day-tab" type="button" data-day-panel="food">Jedzenie</button><button class="day-tab" type="button" data-day-panel="rest">Odpoczynek</button><button class="day-tab" type="button" data-day-panel="theatre">Broadway</button><button class="day-tab" type="button" data-day-panel="variants">Warianty</button><button class="day-tab" type="button" data-day-panel="links">Mapy</button>
  </nav>
  <section class="day-panel active" data-panel="overview"><div class="sheet-section"><h3>Plan dnia · wybierz punkt</h3>${timeline(day.items, guide.timelineTargets)}</div><div class="quick-filters"><button data-related-panel="museum">Sztuka</button><button data-related-panel="stories">Historie</button><button data-related-panel="theatre">Dla Matyldy</button><button data-related-panel="park">Na zewnątrz</button></div><div class="sheet-section"><h3>Najważniejsze</h3><div class="simple-card"><p>${day.essentials.join("<br>")}</p></div></div></section>
  <section class="day-panel" data-panel="guggenheim" hidden><div class="section-heading-row"><h3>${guide.guggenheim.title}</h3><span>sprawdzono ${guide.checked}</span></div>${guideCard({title:"Budynek, który sam jest eksponatem",text:guide.guggenheim.text},"guggenheim-0","Posłuchaj przed fasadą")}<article class="event-card"><h4>Na co spojrzeć?</h4><ul>${guide.guggenheim.look.map(x=>`<li>${x}</li>`).join("")}</ul></article></section>
  <section class="day-panel" data-panel="museum" hidden><h3>The Met · pięć obszarów, nie całe muzeum</h3><article class="event-card"><h4>Przed wejściem</h4><ul>${guide.museum.practical.map(x=>`<li>${x}</li>`).join("")}</ul></article><h3 class="subsection-title">Wybierz tempo</h3><div class="guide-grid">${guide.museum.routes.map(x=>guideCard(x)).join("")}</div><h3 class="subsection-title">Trasa po kolei</h3><div class="route-list">${guide.museum.stops.map((x,i)=>`<article class="route-stop"><div class="route-number">${i+1}</div><div><h4>${x.title}</h4><p>${x.text}</p><div class="look-box"><strong>Na co patrzeć:</strong> ${x.look}</div><button class="audio-chip" data-audio-key="metstop-${i}">▶ Posłuchaj w galerii</button>${x.related?.length?`<div class="related-row">${x.related.map(r=>`<button type="button" data-related-panel="stories" data-related-key="${r.key}">${r.label} ›</button>`).join("")}</div>`:""}${i<guide.museum.stops.length-1?`<button class="next-stop" data-next-stop="${i+1}">Następny obszar →</button>`:""}</div></article>`).join("")}</div></section>
  <section class="day-panel" data-panel="stories" hidden><h3>Historie, które łączą epoki</h3><div class="guide-grid">${guide.stories.map((x,i)=>guideCard(x,`metstory-${i}`,"Posłuchaj historii",`metstory-${i}`)).join("")}</div></section>
  <section class="day-panel" data-panel="park" hidden><h3>Central Park · trasa bez nadmiaru</h3><div class="route-list">${guide.park.route.map((x,i)=>`<article class="route-stop"><div class="route-number">${i+1}</div><div><h4>${x}</h4></div></article>`).join("")}</div><article class="event-card"><h4>Zasady skracania</h4><ul>${guide.park.notes.map(x=>`<li>${x}</li>`).join("")}</ul></article></section>
  ${renderFoodPanel(guide)}
  <section class="day-panel" data-panel="rest" hidden><h3>Odpoczynek jest częścią planu</h3><div class="notice">17:00–17:45: wróćcie do hotelu. Minimum 30 minut siedzenia lub leżenia, ładowanie telefonów, woda, zmiana ubrania. Nie zamieniajcie tej rezerwy na kolejny punkt w parku.</div></section>
  <section class="day-panel" data-panel="theatre" hidden><span class="event-status">${guide.theatre.status}</span><h3>${guide.theatre.title}</h3><p class="panel-intro">${guide.theatre.address}</p><div class="event-grid"><article class="event-card"><h4>Rytm wieczoru</h4><ul>${guide.theatre.schedule.map(x=>`<li>${x}</li>`).join("")}</ul></article><article class="event-card"><h4>Warto wiedzieć</h4><ul>${guide.theatre.practical.map(x=>`<li>${x}</li>`).join("")}</ul></article></div><h3 class="subsection-title">Przed spektaklem · bez spoilerów</h3><div class="guide-grid">${guide.theatre.before.map((x,i)=>guideCard(x,`theatre-${i}`,"Posłuchaj przed wejściem")).join("")}</div><div class="link-grid compact-links"><a href="${guide.theatre.returnUrl}" target="_blank" rel="noopener">Powrót do hotelu <span>↗</span></a></div></section>
  <section class="day-panel" data-panel="variants" hidden><h3>Wybierz wersję dnia</h3><div class="guide-grid">${guide.variants.map(x=>guideCard(x)).join("")}</div></section>
  <section class="day-panel" data-panel="links" hidden><h3>Mapy i oficjalne informacje</h3><div class="link-grid">${guide.links.map(x=>`<a href="${x.url}" target="_blank" rel="noopener">${x.label}<span>↗</span></a>`).join("")}</div><p class="data-note">Galerie i wystawy potrafią się zmieniać. Rano sprawdźcie mapę The Met i ewentualne zamknięcia sal.</p></section>`;
}

function renderQueensGuide(day, guide) {
  return `<nav class="day-tabs" aria-label="Sekcje dnia"><button class="day-tab active" data-day-panel="overview">Plan</button><button class="day-tab" data-day-panel="route">Trasa</button><button class="day-tab" data-day-panel="stories">Historie</button><button class="day-tab" data-day-panel="food">Jedzenie</button><button class="day-tab" data-day-panel="tennis">US Open</button><button class="day-tab" data-day-panel="basics">Tenis 101</button><button class="day-tab" data-day-panel="variants">Warianty</button><button class="day-tab" data-day-panel="links">Mapy</button></nav>
  <section class="day-panel active" data-panel="overview"><div class="sheet-section"><h3>Plan dnia · wybierz punkt</h3>${timeline(day.items,guide.timelineTargets)}</div><div class="quick-filters"><button data-related-panel="stories">Historia</button><button data-related-panel="food">Smaki</button><button data-related-panel="basics">Dla laików</button><button data-related-panel="tennis">Stadion</button></div><div class="sheet-section"><h3>Najważniejsze</h3><div class="simple-card"><p>${day.essentials.join("<br>")}</p></div></div></section>
  <section class="day-panel" data-panel="route" hidden><div class="section-heading-row"><h3>Queens · od portu do kortów</h3><span>sprawdzono ${guide.checked}</span></div><div class="route-list">${guide.route.map((x,i)=>`<article class="route-stop"><div class="route-number">${i+1}</div><div><span class="mini-kicker">${x.time}</span><h4>${x.title}</h4><p>${x.text}</p><div class="look-box"><strong>Rozejrzyj się:</strong> ${x.look}</div><button class="audio-chip" data-audio-key="qroute-${i}">▶ Posłuchaj na miejscu</button>${x.related?.length?`<div class="related-row">${x.related.map(r=>`<button data-related-panel="${r.panel||"stories"}" ${r.key?`data-related-key="${r.key}"`:""}>${r.label} ›</button>`).join("")}</div>`:""}${i<guide.route.length-1?`<button class="next-stop" data-next-stop="${i+1}">Następny punkt →</button>`:""}</div></article>`).join("")}</div></section>
  <section class="day-panel" data-panel="stories" hidden><h3>Pięć historii Queens</h3><p class="panel-intro">Każdą można uruchomić dokładnie w miejscu, którego dotyczy.</p><div class="guide-grid">${guide.stories.map((x,i)=>guideCard(x,`qstory-${i}`,"Posłuchaj historii",`qstory-${i}`)).join("")}</div></section>
  ${renderFoodPanel(guide)}
  <section class="day-panel" data-panel="tennis" hidden><span class="event-status">${guide.tennis.status}</span><h3>${guide.tennis.title}</h3><div class="event-grid"><article class="event-card"><h4>Rytm wieczoru</h4><ul>${guide.tennis.schedule.map(x=>`<li>${x}</li>`).join("")}</ul></article><article class="event-card"><h4>Torby i bezpieczeństwo</h4><ul>${guide.tennis.rules.map(x=>`<li>${x}</li>`).join("")}</ul></article></div><h3 class="subsection-title">Zachowanie na stadionie</h3><article class="event-card"><ul>${guide.tennis.etiquette.map(x=>`<li>${x}</li>`).join("")}</ul></article><div class="link-grid compact-links"><a href="${guide.tennis.returnUrl}" target="_blank" rel="noopener">Powrót do hotelu <span>↗</span></a></div></section>
  <section class="day-panel" data-panel="basics" hidden><h3>Tenis 101 · mikst dla laików</h3><div class="guide-grid">${guide.tennis.basics.map((x,i)=>guideCard(x,`tennisbasic-${i}`,"Posłuchaj wyjaśnienia")).join("")}</div></section>
  <section class="day-panel" data-panel="variants" hidden><h3>Wybierz wersję dnia</h3><div class="guide-grid">${guide.variants.map(x=>guideCard(x)).join("")}</div></section>
  <section class="day-panel" data-panel="links" hidden><h3>Mapy i oficjalne informacje</h3><div class="link-grid">${guide.links.map(x=>`<a href="${x.url}" target="_blank" rel="noopener">${x.label}<span>↗</span></a>`).join("")}</div><p class="data-note">Przed wyjściem sprawdźcie bilety, stadion na bilecie, format miksta i aktualne kolejki do wejść.</p></section>`;
}

function renderWestsideGuide(day, guide) {
  return `<nav class="day-tabs" aria-label="Sekcje dnia"><button class="day-tab active" data-day-panel="overview">Plan</button><button class="day-tab" data-day-panel="ferry">Promy</button><button class="day-tab" data-day-panel="photos">Zdjęcia</button><button class="day-tab" data-day-panel="downtown">Downtown</button><button class="day-tab" data-day-panel="museum">Whitney</button><button class="day-tab" data-day-panel="route">High Line</button><button class="day-tab" data-day-panel="stories">Historie</button><button class="day-tab" data-day-panel="food">Jedzenie</button><button class="day-tab" data-day-panel="evening">Wieczór</button><button class="day-tab" data-day-panel="variants">Warianty</button><button class="day-tab" data-day-panel="links">Mapy</button></nav>
  <section class="day-panel active" data-panel="overview"><div class="sheet-section"><h3>Plan dnia · wybierz punkt</h3>${timeline(day.items,guide.timelineTargets)}</div><div class="quick-filters"><button data-related-panel="photos">Ikoniczne zdjęcia</button><button data-related-panel="museum">Dla Gosi</button><button data-related-panel="evening">Dla Matyldy</button><button data-related-panel="stories">Historia miasta</button></div><div class="sheet-section"><h3>Najważniejsze</h3><div class="simple-card"><p>${day.essentials.join("<br>")}</p></div></div></section>
  <section class="day-panel" data-panel="ferry" hidden><div class="section-heading-row"><h3>Dwa promy · jedna trasa przez port</h3><span>sprawdzono ${guide.checked}</span></div><div class="event-grid"><article class="event-card"><h4>Harmonogram orientacyjny</h4><ul>${guide.ferry.schedule.map(x=>`<li>${x}</li>`).join("")}</ul></article><article class="event-card"><h4>Ważne</h4><ul>${guide.ferry.notes.map(x=>`<li>${x}</li>`).join("")}</ul></article></div><div class="notice">Godziny promów sprawdzamy ponownie rano. Połączenie jest atrakcyjne właśnie dlatego, że nie wracacie tą samą drogą.</div></section>
  <section class="day-panel" data-panel="photos" hidden><h3>Statua Wolności · instrukcja zdjęcia</h3><p class="panel-intro">To nie przypadkowa fotografia z pokładu. Każda wskazówka ma osobny lektor, żeby można było uruchomić ją już na promie.</p><div class="guide-grid">${guide.photos.onboard.map((x,i)=>guideCard(x,`wphoto-${i}`,"Posłuchaj na promie")).join("")}</div><h3 class="subsection-title">Dobre miejsca z brzegu</h3><div class="guide-grid">${guide.photos.shore.map((x,i)=>guideCard(x,`wshore-${i}`,"Posłuchaj oceny miejsca")).join("")}</div></section>
  <section class="day-panel" data-panel="downtown" hidden><h3>Lower Manhattan · trzy przystanki</h3><p class="panel-intro">Memoriał oglądamy bez muzeum i bez pośpiechu fotograficznego.</p><div class="route-list">${guide.downtown.route.map((x,i)=>`<article class="route-stop"><div class="route-number">${i+1}</div><div><h4>${x.title}</h4><p>${x.text}</p><button class="audio-chip" data-audio-key="wdowntown-${i}">▶ Posłuchaj na miejscu</button>${x.related?.length?`<div class="related-row">${x.related.map(r=>`<button data-related-panel="stories" data-related-key="${r.key}">${r.label} ›</button>`).join("")}</div>`:""}</div></article>`).join("")}</div></section>
  <section class="day-panel" data-panel="museum" hidden><div class="section-heading-row"><h3>Whitney · sztuka i widok</h3><span>sprawdzono ${guide.checked}</span></div><div class="notice">Biennale kończy się 23 sierpnia. Trasa nie zakłada jego dostępności.</div><article class="event-card"><h4>Przed wejściem</h4><ul>${guide.museum.practical.map(x=>`<li>${x}</li>`).join("")}</ul></article><h3 class="subsection-title">Wybierz tempo</h3><div class="guide-grid">${guide.museum.routes.map(x=>guideCard(x)).join("")}</div><h3 class="subsection-title">Trasa muzealna</h3><div class="route-list">${guide.museum.stops.map((x,i)=>`<article class="route-stop"><div class="route-number">${i+1}</div><div><h4>${x.title}</h4><p>${x.text}</p><div class="look-box"><strong>Na co patrzeć:</strong> ${x.look}</div><button class="audio-chip" data-audio-key="wstop-${i}">▶ Posłuchaj</button>${x.related?.length?`<div class="related-row">${x.related.map(r=>`<button data-related-panel="stories" data-related-key="${r.key}">${r.label} ›</button>`).join("")}</div>`:""}</div></article>`).join("")}</div></section>
  <section class="day-panel" data-panel="route" hidden><h3>High Line · miasto warstwa po warstwie</h3><div class="route-list">${guide.route.map((x,i)=>`<article class="route-stop"><div class="route-number">${i+1}</div><div><span class="mini-kicker">${x.time}</span><h4>${x.title}</h4><p>${x.text}</p><div class="look-box"><strong>Rozejrzyj się:</strong> ${x.look}</div><button class="audio-chip" data-audio-key="wroute-${i}">▶ Posłuchaj na miejscu</button>${x.related?.length?`<div class="related-row">${x.related.map(r=>`<button data-related-panel="${r.panel||"stories"}" ${r.key?`data-related-key="${r.key}"`:""}>${r.label} ›</button>`).join("")}</div>`:""}${i<guide.route.length-1?`<button class="next-stop" data-next-stop="${i+1}">Następny punkt →</button>`:""}</div></article>`).join("")}</div></section>
  <section class="day-panel" data-panel="stories" hidden><h3>Historie zachodniego Manhattanu</h3><div class="guide-grid">${guide.stories.map((x,i)=>guideCard(x,`wstory-${i}`,"Posłuchaj historii",`wstory-${i}`)).join("")}</div></section>
  ${renderFoodPanel(guide)}
  <section class="day-panel" data-panel="evening" hidden><h3>Wieczór wybierany tego samego dnia</h3><div class="guide-grid">${guide.evening.map((x,i)=>guideCard(x,`wevening-${i}`,"Posłuchaj wariantu")).join("")}</div></section>
  <section class="day-panel" data-panel="variants" hidden><h3>Wybierz wersję dnia</h3><div class="guide-grid">${guide.variants.map(x=>guideCard(x)).join("")}</div></section>
  <section class="day-panel" data-panel="links" hidden><h3>Mapy i oficjalne informacje</h3><div class="link-grid">${guide.links.map(x=>`<a href="${x.url}" target="_blank" rel="noopener">${x.label}<span>↗</span></a>`).join("")}</div><p class="data-note">Rano potwierdzamy piętra Whitney, pogodę na High Line i widoczność przed ewentualnym SUMMIT.</p></section>`;
}

function renderSohoYankeesGuide(day, guide) {
  return `<nav class="day-tabs" aria-label="Sekcje dnia"><button class="day-tab active" data-day-panel="overview">Plan</button><button class="day-tab" data-day-panel="route">SoHo</button><button class="day-tab" data-day-panel="stories">Historie</button><button class="day-tab" data-day-panel="shopping">Zakupy</button><button class="day-tab" data-day-panel="food">Jedzenie</button><button class="day-tab" data-day-panel="rest">Reset</button><button class="day-tab" data-day-panel="transport">Dojazd</button><button class="day-tab" data-day-panel="stadium">Stadion</button><button class="day-tab" data-day-panel="baseball">Baseball 101</button><button class="day-tab" data-day-panel="variants">Warianty</button><button class="day-tab" data-day-panel="links">Mapy</button></nav>
  <section class="day-panel active" data-panel="overview"><div class="sheet-section"><h3>Plan dnia · wybierz punkt</h3>${timeline(day.items,guide.timelineTargets)}</div><div class="quick-filters"><button data-related-panel="shopping">Dla Matyldy</button><button data-related-panel="stories">Historia miasta</button><button data-related-panel="baseball">Dla laików</button><button data-related-panel="stadium">Mecz</button></div><div class="sheet-section"><h3>Najważniejsze</h3><div class="simple-card"><p>${day.essentials.join("<br>")}</p></div></div></section>
  <section class="day-panel" data-panel="route" hidden><div class="section-heading-row"><h3>SoHo i Nolita · fasady, nie lista sklepów</h3><span>sprawdzono ${guide.checked}</span></div><div class="route-list">${guide.route.map((x,i)=>`<article class="route-stop"><div class="route-number">${i+1}</div><div><span class="mini-kicker">${x.time}</span><h4>${x.title}</h4><p>${x.text}</p><div class="look-box"><strong>Rozejrzyj się:</strong> ${x.look}</div><button class="audio-chip" data-audio-key="syroute-${i}">▶ Posłuchaj na miejscu</button>${x.related?.length?`<div class="related-row">${x.related.map(r=>`<button data-related-panel="stories" data-related-key="${r.key}">${r.label} ›</button>`).join("")}</div>`:""}${i<guide.route.length-1?`<button class="next-stop" data-next-stop="${i+1}">Następny punkt →</button>`:""}</div></article>`).join("")}</div></section>
  <section class="day-panel" data-panel="stories" hidden><h3>Historie SoHo i wielkiej rywalizacji</h3><p class="panel-intro">Opowieści są połączone z punktami trasy i można je odtwarzać osobno.</p><div class="guide-grid">${guide.stories.map((x,i)=>guideCard(x,`systory-${i}`,"Posłuchaj historii",`systory-${i}`)).join("")}</div></section>
  <section class="day-panel" data-panel="shopping" hidden><h3>Zakupy Matyldy · wybór, nie maraton</h3><div class="notice">Wybierzcie dwa sklepy główne i maksymalnie jeden szybki. O 14:15 kończą się zakupy niezależnie od kolejek.</div><div class="food-list shopping-list">${guide.shopping.map(x=>`<article class="food-card"><div><span class="mini-kicker">${x.category}</span><h4>${x.name}</h4><p>${x.address}</p><p>${x.note}</p></div><a href="${x.url}" target="_blank" rel="noopener">Oficjalne informacje ↗</a></article>`).join("")}</div></section>
  ${renderFoodPanel(guide)}
  <section class="day-panel" data-panel="rest" hidden><h3>Hotel · 45 minut zmiany trybu</h3><div class="notice">Zakupy zostają w pokoju. Woda, ładowanie telefonu, wygodne buty i bilety dodane do Apple Wallet. Ten bufor chroni Monument Park — nie zamieniamy go na kolejny sklep.</div></section>
  <section class="day-panel" data-panel="transport" hidden><h3>Manhattan → Bronx → hotel</h3><article class="event-card"><ul>${guide.transport.notes.map(x=>`<li>${x}</li>`).join("")}</ul></article><div class="link-grid compact-links"><a href="${guide.transport.returnUrl}" target="_blank" rel="noopener">Powrót po meczu <span>↗</span></a></div></section>
  <section class="day-panel" data-panel="stadium" hidden><span class="event-status">${guide.stadium.status}</span><h3>Yankee Stadium · co po kolei</h3><div class="event-grid"><article class="event-card"><h4>Rytm stadionu</h4><ul>${guide.stadium.schedule.map(x=>`<li>${x}</li>`).join("")}</ul></article><article class="event-card"><h4>Torby i wejście</h4><ul>${guide.stadium.rules.map(x=>`<li>${x}</li>`).join("")}</ul></article></div><h3 class="subsection-title">Zachowania i tradycje</h3><div class="guide-grid">${guide.stadium.traditions.map((text,i)=>guideCard({title:["Monument Park","Dwa strike’i","Seventh-inning stretch","New York, New York"][i],text},`systadium-${i}`,"Posłuchaj na stadionie")).join("")}</div></section>
  <section class="day-panel" data-panel="baseball" hidden><h3>Baseball 101 · żeby wiedzieć, kiedy patrzeć</h3><p class="panel-intro">Nie musicie zapamiętać wszystkich przepisów. Stan baz, auty i wynik wystarczą, żeby rozumieć napięcie.</p><div class="guide-grid">${guide.baseball.basics.map((x,i)=>guideCard(x,`baseballbasic-${i}`,"Posłuchaj wyjaśnienia")).join("")}</div></section>
  <section class="day-panel" data-panel="variants" hidden><h3>Wybierz wersję dnia</h3><div class="guide-grid">${guide.variants.map(x=>guideCard(x)).join("")}</div></section>
  <section class="day-panel" data-panel="links" hidden><h3>Mapy i oficjalne informacje</h3><div class="link-grid">${guide.links.map(x=>`<a href="${x.url}" target="_blank" rel="noopener">${x.label}<span>↗</span></a>`).join("")}</div><p class="data-note">Rano sprawdzamy pogodę i komunikaty MLB Ballpark, a przed wyjściem z hotelu bieżące kursowanie linii B/D/4.</p></section>`;
}

function renderBrooklynJazzGuide(day, guide) {
  return `<nav class="day-tabs" aria-label="Sekcje dnia"><button class="day-tab active" data-day-panel="overview">Plan</button><button class="day-tab" data-day-panel="brooklyn">DUMBO</button><button class="day-tab" data-day-panel="stories">Historie</button><button class="day-tab" data-day-panel="food">Jedzenie</button><button class="day-tab" data-day-panel="bargemusic">Bargemusic</button><button class="day-tab" data-day-panel="apollo">Apollo</button><button class="day-tab" data-day-panel="festival">Festival</button><button class="day-tab" data-day-panel="parker">Charlie Parker</button><button class="day-tab" data-day-panel="artists">Artyści</button><button class="day-tab" data-day-panel="variants">Warianty</button><button class="day-tab" data-day-panel="links">Mapy</button></nav>
  <section class="day-panel active" data-panel="overview"><div class="sheet-section"><h3>Plan dnia · wybierz punkt</h3>${timeline(day.items,guide.timelineTargets)}</div><div class="quick-filters"><button data-related-panel="brooklyn">Ikoniczne zdjęcia</button><button data-related-panel="parker">Charlie i Whiplash</button><button data-related-panel="artists">Kogo usłyszymy?</button><button data-related-panel="food">Jedzenie</button></div><div class="sheet-section"><h3>Najważniejsze</h3><div class="simple-card"><p>${day.essentials.join("<br>")}</p></div></div></section>
  <section class="day-panel" data-panel="brooklyn" hidden><div class="section-heading-row"><h3>DUMBO → Pier 5</h3><span>sprawdzono ${guide.checked}</span></div><div class="route-list">${guide.brooklyn.map((x,i)=>`<article class="route-stop"><div class="route-number">${i+1}</div><div><span class="mini-kicker">${x.time}</span><h4>${x.title}</h4><p>${x.text}</p><div class="look-box"><strong>Rozejrzyj się:</strong> ${x.look}</div><button class="audio-chip" data-audio-key="bjroute-${i}">▶ Posłuchaj na miejscu</button>${x.related?.length?`<div class="related-row">${x.related.map(r=>`<button data-related-panel="stories" data-related-key="${r.key}">${r.label} ›</button>`).join("")}</div>`:""}${i<guide.brooklyn.length-1?`<button class="next-stop" data-next-stop="${i+1}">Następny punkt →</button>`:""}</div></article>`).join("")}</div></section>
  <section class="day-panel" data-panel="stories" hidden><h3>Brooklyn, Apollo i Harlem · historie miejsc</h3><div class="guide-grid">${guide.stories.map((x,i)=>guideCard(x,`bjstory-${i}`,"Posłuchaj historii",`bjstory-${i}`)).join("")}</div></section>
  ${renderFoodPanel(guide)}
  <section class="day-panel" data-panel="bargemusic" hidden><span class="event-status">${guide.bargemusic.status}</span><h3>${guide.bargemusic.title}</h3><p class="panel-intro">${guide.bargemusic.address}</p><div class="notice">To już nie jest koncert na barce. W 2026 roku idziecie do Boathouse w parkowym wzgórzu przy Pier 5.</div><div class="event-grid"><article class="event-card"><h4>Rytm wizyty</h4><ul>${guide.bargemusic.schedule.map(x=>`<li>${x}</li>`).join("")}</ul></article><article class="event-card"><h4>Zasady</h4><ul>${guide.bargemusic.rules.map(x=>`<li>${x}</li>`).join("")}</ul></article></div><h3 class="subsection-title">Jak słuchać?</h3><div class="guide-grid">${guide.bargemusic.listen.map((x,i)=>guideCard(x,`bargelisten-${i}`,"Posłuchaj przed koncertem")).join("")}</div></section>
  <section class="day-panel" data-panel="apollo" hidden><span class="event-status">${guide.apollo.status}</span><h3>Apollo · neon, galeria i pamięć sceny</h3><div class="event-grid"><article class="event-card"><h4>Po kolei</h4><ul>${guide.apollo.schedule.map(x=>`<li>${x}</li>`).join("")}</ul></article><article class="event-card"><h4>Ważne</h4><ul>${guide.apollo.notes.map(x=>`<li>${x}</li>`).join("")}</ul></article></div><div class="guide-grid">${guideCard(guide.stories[3],"bjstory-3","Posłuchaj przed neonem")}</div></section>
  <section class="day-panel" data-panel="festival" hidden><span class="event-status">${guide.festival.status}</span><h3>${guide.festival.title}</h3><p class="panel-intro">${guide.festival.address}</p><div class="notice">Program zaczyna się o 14:00. Dołączacie na finałową część — bez poczucia, że trzeba „zaliczyć” wszystkich artystów.</div><h3 class="subsection-title">Jak słuchać jazzu na żywo?</h3><div class="guide-grid">${guide.festival.basics.map((x,i)=>guideCard(x,`jazzbasic-${i}`,"Posłuchaj w parku")).join("")}</div><h3 class="subsection-title">Posłuchaj przed podróżą</h3><div class="playlist-grid">${guide.festival.playlist.map(x=>`<a href="${x.url}" target="_blank" rel="noopener"><strong>${x.label}</strong><small>${x.note}</small><span>↗</span></a>`).join("")}</div></section>
  <section class="day-panel" data-panel="parker" hidden><h3>Charlie Parker · Bird, bebop i mit z „Whiplash”</h3><p class="panel-intro">Matylda może zacząć od filmu, ale tutaj oddzielamy prawdziwą historię od wersji Fletchera.</p><div class="guide-grid">${[guide.stories[4],guide.stories[5],guide.stories[6]].map((x,i)=>guideCard(x,`parker-${i}`,"Posłuchaj opowieści")).join("")}</div></section>
  <section class="day-panel" data-panel="artists" hidden><h3>Kogo usłyszymy?</h3><div class="guide-grid">${guide.festival.lineup.map((x,i)=>guideCard(x,`jazzartist-${i}`,"Posłuchaj przed występem")).join("")}</div></section>
  <section class="day-panel" data-panel="variants" hidden><h3>Wybierz wersję dnia</h3><div class="guide-grid">${guide.variants.map(x=>guideCard(x)).join("")}</div></section>
  <section class="day-panel" data-panel="links" hidden><h3>Mapy i oficjalne informacje</h3><div class="link-grid">${guide.links.map(x=>`<a href="${x.url}" target="_blank" rel="noopener">${x.label}<span>↗</span></a>`).join("")}</div><p class="data-note">Przed wyjściem potwierdzamy program Bargemusic, pogodę i komunikat SummerStage. Najważniejsza decyzja logistyczna: przy opóźnieniu Apollo ustępuje festiwalowi.</p></section>`;
}

function renderDepartureGuide(day, guide) {
  return `<nav class="day-tabs" aria-label="Sekcje dnia"><button class="day-tab active" data-day-panel="overview">Plan</button><button class="day-tab" data-day-panel="diner">Diner</button><button class="day-tab" data-day-panel="hotel">Hotel</button><button class="day-tab" data-day-panel="walk">Spacer</button><button class="day-tab" data-day-panel="guggenheim">Guggenheim</button><button class="day-tab" data-day-panel="stories">Historie</button><button class="day-tab" data-day-panel="food">Jedzenie</button><button class="day-tab" data-day-panel="transport">JFK</button><button class="day-tab" data-day-panel="airport">Lotnisko</button><button class="day-tab" data-day-panel="variants">Warianty</button><button class="day-tab" data-day-panel="links">Mapy</button></nav>
  <section class="day-panel active" data-panel="overview"><div class="sheet-section"><h3>Plan dnia · wybierz punkt</h3>${timeline(day.items,guide.timelineTargets)}</div><div class="quick-filters"><button data-related-panel="diner">Śniadanie</button><button data-related-panel="walk">Ostatni spacer</button><button data-related-panel="guggenheim">Opcja dla Gosi</button><button data-related-panel="transport">Walizki i JFK</button><button data-related-panel="airport">Lista przed lotem</button></div><div class="sheet-section"><h3>Najważniejsze</h3><div class="simple-card"><p>${day.essentials.join("<br>")}</p></div></div></section>
  <section class="day-panel" data-panel="diner" hidden><h3>Nowojorski diner · ostatni rytuał</h3><p class="panel-intro">${guide.diner.intro}</p><div class="guide-grid">${guide.diner.basics.map((x,i)=>guideCard(x,`depdiner-${i}`,"Posłuchaj przy stole")).join("")}</div></section>
  <section class="day-panel" data-panel="hotel" hidden><h3>Wymeldowanie i odbiór bagaży</h3><div class="notice">Check-out nie jest drobnym punktem administracyjnym. Robimy go przed spacerem, żeby o 13:45 pozostał już tylko odbiór walizek.</div><article class="event-card"><ul>${guide.hotel.steps.map(x=>`<li>${x}</li>`).join("")}</ul></article></section>
  <section class="day-panel" data-panel="walk" hidden><div class="section-heading-row"><h3>42nd Street · ostatnie spojrzenie</h3><span>sprawdzono ${guide.checked}</span></div><div class="route-list">${guide.walk.map((x,i)=>`<article class="route-stop"><div class="route-number">${i+1}</div><div><span class="mini-kicker">${x.time}</span><h4>${x.title}</h4><p>${x.text}</p><div class="look-box"><strong>Rozejrzyj się:</strong> ${x.look}</div><button class="audio-chip" data-audio-key="depwalk-${i}">▶ Posłuchaj na miejscu</button>${x.related?.length?`<div class="related-row">${x.related.map(r=>`<button data-related-panel="stories" data-related-key="${r.key}">${r.label} ›</button>`).join("")}</div>`:""}${i<guide.walk.length-1?`<button class="next-stop" data-next-stop="${i+1}">Następny punkt →</button>`:""}</div></article>`).join("")}</div></section>
  <section class="day-panel" data-panel="guggenheim" hidden><span class="event-status">${guide.guggenheim.status}</span><h3>Guggenheim od środka · trasa 90 minut</h3><p class="panel-intro">${guide.guggenheim.address}</p><div class="notice">Ten wariant zastępuje Grand Central. O 12:00 wychodzicie niezależnie od tego, gdzie jesteście na spirali.</div><div class="event-grid"><article class="event-card"><h4>Harmonogram</h4><ul>${guide.guggenheim.schedule.map(x=>`<li>${x}</li>`).join("")}</ul></article><article class="event-card"><h4>Praktycznie</h4><ul>${guide.guggenheim.practical.map(x=>`<li>${x}</li>`).join("")}</ul></article></div><h3 class="subsection-title">Cztery przystanki</h3><div class="route-list">${guide.guggenheim.route.map((x,i)=>`<article class="route-stop"><div class="route-number">${i+1}</div><div><h4>${x.title}</h4><p>${x.text}</p><div class="look-box"><strong>Na co patrzeć:</strong> ${x.look}</div><button class="audio-chip" data-audio-key="depgugg-${i}">▶ Posłuchaj w muzeum</button></div></article>`).join("")}</div></section>
  <section class="day-panel" data-panel="stories" hidden><h3>Historie ostatniego spaceru</h3><div class="guide-grid">${guide.stories.map((x,i)=>guideCard(x,`depstory-${i}`,"Posłuchaj historii",`depstory-${i}`)).join("")}</div></section>
  ${renderFoodPanel(guide)}
  <section class="day-panel" data-panel="transport" hidden><h3>Hotel → JFK · wybór o 13:45</h3><article class="transport-card transport-recommended"><div class="transport-head"><div><span class="transport-badge">Rekomendowane</span><h4>${guide.transport.recommended.title}</h4></div></div><div class="transport-time">${guide.transport.recommended.time}</div><p>${guide.transport.recommended.text}</p></article><h3 class="subsection-title">LIRR + AirTrain krok po kroku</h3><article class="event-card"><ul>${guide.transport.lirrSteps.map(x=>`<li>${x}</li>`).join("")}</ul></article><h3 class="subsection-title">Alternatywy</h3><div class="guide-grid">${guide.transport.alternatives.map(x=>guideCard(x)).join("")}</div></section>
  <section class="day-panel" data-panel="airport" hidden><span class="event-status">Wylot 19:29 · planowane JFK 16:00–16:30</span><h3>Na lotnisku po kolei</h3><div class="event-grid"><article class="event-card"><h4>Harmonogram</h4><ul>${guide.airport.schedule.map(x=>`<li>${x}</li>`).join("")}</ul></article><article class="event-card"><h4>Ostatnia kontrola</h4><ul>${guide.airport.checklist.map(x=>`<li>${x}</li>`).join("")}</ul></article></div></section>
  <section class="day-panel" data-panel="variants" hidden><h3>Wybierz wersję dnia</h3><div class="guide-grid">${guide.variants.map(x=>guideCard(x)).join("")}</div></section>
  <section class="day-panel" data-panel="links" hidden><h3>Mapy i oficjalne informacje</h3><div class="link-grid">${guide.links.map(x=>`<a href="${x.url}" target="_blank" rel="noopener">${x.label}<span>↗</span></a>`).join("")}</div><p class="data-note">Dzień wcześniej wpisujemy numer lotu i terminal. O 13:45 sprawdzamy TrainTime, AirTrain oraz ruch drogowy i wybieramy wariant bez dalszego odkładania decyzji.</p></section>`;
}

function renderDayGuide(day) {
  const guide = typeof DAY_GUIDES !== "undefined" ? DAY_GUIDES[day.id] : null;
  if (!guide) return "";
  if (guide.kind === "village") return renderVillageGuide(day, guide);
  if (guide.kind === "moma") return renderMomaGuide(day, guide);
  if (guide.kind === "metday") return renderMetDayGuide(day, guide);
  if (guide.kind === "queens") return renderQueensGuide(day, guide);
  if (guide.kind === "westside") return renderWestsideGuide(day, guide);
  if (guide.kind === "sohoyankees") return renderSohoYankeesGuide(day, guide);
  if (guide.kind === "brooklynjazz") return renderBrooklynJazzGuide(day, guide);
  if (guide.kind === "departure") return renderDepartureGuide(day, guide);
  return `
    <nav class="day-tabs" aria-label="Sekcje dnia">
      <button class="day-tab active" type="button" data-day-panel="overview">Plan</button>
      <button class="day-tab" type="button" data-day-panel="arrival">Po przylocie</button>
      <button class="day-tab" type="button" data-day-panel="transport">Transport</button>
      <button class="day-tab" type="button" data-day-panel="evening">Wieczór</button>
      <button class="day-tab" type="button" data-day-panel="stories">Historie</button>
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
    <section class="day-panel" data-panel="stories" hidden>
      <h3>Historie, które warto znać</h3>
      <p class="panel-intro">Każdą opowieść można uruchomić osobno — bez przewijania i bez słuchania całego dnia od początku.</p>
      <div class="guide-grid">${guide.stories.map((item, index) => guideCard(item, `story-${index}`)).join("")}</div>
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
  sheetContent.querySelectorAll(".day-tab").forEach(tab => {
    const active = tab.dataset.dayPanel === panelName;
    tab.classList.toggle("active", active);
    tab.setAttribute("aria-selected", String(active));
  });
  const tabs = sheetContent.querySelector(".day-tabs");
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
  app.innerHTML = `
    ${beforeTrip ? `<div class="notice">Tryb przygotowań: pokazujemy pierwszy dzień jako podgląd. Podczas wyjazdu aplikacja automatycznie otworzy właściwy dzień.</div>` : ""}
    <section class="hero-card" style="margin-top:${beforeTrip ? "14px" : "0"}">
      <div class="hero-date">Dzień ${day.day} · ${day.date} · ${day.weekday}</div>
      <h2>${day.title}</h2>
      <p>${day.subtitle}</p>
      <div class="hero-actions">
        <button class="button" data-open-day="${day.id}">Otwórz cały dzień</button>
        <button class="button secondary" data-view-jump="plan">Wszystkie dni</button>
      </div>
    </section>
    <div class="section-title"><h3>Po kolei</h3><span>${day.items.length} punktów</span></div>
    ${timeline(day.items)}
    <div class="section-title"><h3>Pamiętaj</h3></div>
    <div class="simple-card"><p>${day.essentials.join(" · ")}</p></div>`;
  bindDynamicActions();
}

const TRIP_REGIONS = [
  { id: "midtown", name: "Midtown", color: "#f5c518", text: "Wasza baza i najbardziej intensywny obraz Manhattanu: Times Square, Broadway, Bryant Park, Rockefeller Center i Grand Central.", days: ["2026-08-22", "2026-08-24", "2026-08-25", "2026-08-30"] },
  { id: "village", name: "Village i SoHo", color: "#a94f3d", text: "Niższa zabudowa, kręte ulice, bohema, prawa obywatelskie, serialowe adresy, jazz i współczesne zakupy.", days: ["2026-08-23", "2026-08-28"] },
  { id: "museum", name: "Museum Mile i Central Park", color: "#8974a8", text: "Wielkie kolekcje, rezydencjonalny Upper East Side i park zaprojektowany jako demokratyczna przestrzeń odpoczynku.", days: ["2026-08-25", "2026-08-30"] },
  { id: "west", name: "Chelsea i West Side", color: "#4f91b6", text: "Dawny przemysł, galerie, High Line, Whitney i nowa architektura skierowana ku Hudsonowi.", days: ["2026-08-27"] },
  { id: "downtown", name: "Lower Manhattan i port", color: "#d37845", text: "Najstarszy Nowy Jork, finanse, pamięć o 11 września oraz widoki na port i Statuę Wolności.", days: ["2026-08-27"] },
  { id: "queens", name: "Queens", color: "#4f8f75", text: "Przemysłowe nabrzeże, migracyjny i kulinarny Nowy Jork, dziedzictwo wystaw światowych oraz US Open.", days: ["2026-08-26"] },
  { id: "bronx", name: "Bronx", color: "#6f8298", text: "Tego dnia przede wszystkim baseball: Yankee Stadium i rytuał jednej z największych rywalizacji sportowych USA.", days: ["2026-08-28"] },
  { id: "brooklyn", name: "Brooklyn Waterfront", color: "#547b9b", text: "Mosty, port, poprzemysłowa panorama DUMBO i muzyka kameralna przy Brooklyn Bridge Park.", days: ["2026-08-29"] },
  { id: "harlem", name: "Harlem", color: "#b46a8c", text: "Apollo, afroamerykańska historia sceny, bebop i finał podróży śladami Charliego Parkera.", days: ["2026-08-29"] }
];

const DAY_SCHEMATICS = {
  "2026-08-22": { note: "Najdłuższy odcinek to dojazd z lotniska. Wieczór odbywa się pieszo wokół hotelu.", nodes: [["JFK", "brama", "✈", "arrival"], ["Hotel", "midtown", "⌂", "transport"], ["Times Square", "midtown", "●", "evening"], ["Bryant Park", "midtown", "◆", "evening"]], legs: ["samochód 60–100 min lub kolej 60–75 min", "pieszo ok. 10 min", "pieszo ok. 12 min · opcja"] },
  "2026-08-23": { note: "Po dojeździe do Village cały zasadniczy dzień mieści się w jednej, zwartej dzielnicy.", nodes: [["Hotel", "midtown", "⌂", "overview"], ["Washington Sq.", "village", "●", "route"], ["West Village", "village", "◆", "route"], ["Blue Note", "village", "♪", "bluenote"]], legs: ["metro ok. 20 min", "spacer z przystankami", "spacer 10–20 min"] },
  "2026-08-24": { note: "Dzień Midtown: większość punktów jest blisko siebie, a hotel służy jako praktyczna baza przed filmem.", nodes: [["Hotel", "midtown", "⌂", "overview"], ["MoMA", "midtown", "▣", "museum"], ["Rockefeller", "midtown", "◆", "shopping"], ["Hotel", "midtown", "⌂", "overview"], ["Bryant Park", "midtown", "▶", "movie"]], legs: ["metro/pieszo 20–25 min", "pieszo 5–10 min", "pieszo ok. 20 min", "pieszo ok. 12 min"] },
  "2026-08-25": { note: "Najpierw jedziecie na północ, potem schodzicie przez park i wracacie do teatralnego Midtown.", nodes: [["Guggenheim", "museum", "◎", "guggenheim"], ["The Met", "museum", "▣", "museum"], ["Central Park", "park", "♧", "park"], ["Hotel", "midtown", "⌂", "rest"], ["Broadway", "midtown", "★", "theatre"]], legs: ["pieszo ok. 10 min", "spacer przez park", "metro/taxi 20–30 min", "pieszo 10–15 min"] },
  "2026-08-26": { note: "To wyprawa równoleżnikowa przez Queens: nabrzeże, centrum Flushing i kompleks sportowy.", nodes: [["Hotel", "midtown", "⌂", "overview"], ["Long Island City", "queens", "◫", "route"], ["Flushing", "queens", "♨", "food"], ["Unisphere", "queens", "◎", "route"], ["US Open", "queens", "●", "tennis"]], legs: ["metro ok. 25 min", "metro 25–35 min", "spacer/metro", "pieszo ok. 15 min"] },
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
          <g class="map-region-labels" aria-hidden="true">
            <text x="492" y="98">HARLEM<tspan x="492" dy="28">DZIEŃ 8</tspan></text>
            <text x="470" y="370">MUSEUM MILE<tspan x="470" dy="28">DNI 4 + 9</tspan></text>
            <text x="438" y="570">MIDTOWN<tspan x="438" dy="28">DNI 1 + 3 + 4 + 9</tspan></text>
            <text x="348" y="825">WEST SIDE<tspan x="348" dy="28">DZIEŃ 6</tspan></text>
            <text x="326" y="980">VILLAGE + SOHO<tspan x="326" dy="28">DNI 2 + 7</tspan></text>
            <text x="292" y="1249">DOWNTOWN<tspan x="292" dy="28">DZIEŃ 6</tspan></text>
            <text x="707" y="155">BRONX<tspan x="707" dy="28">DZIEŃ 7</tspan></text>
            <text x="719" y="603">QUEENS<tspan x="719" dy="28">DZIEŃ 5</tspan></text>
            <text x="666" y="1275">BROOKLYN<tspan x="666" dy="28">DZIEŃ 8</tspan></text>
          </g>
        </svg>
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
  const canvas = map.querySelector(".illustrated-map-canvas");
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
    <div class="view-heading"><h2>Dni podróży</h2><p>Dziewięć wypraw. Każda otwiera własną planszę, kolejność punktów i powiązane historie.</p></div>
    <div class="section-title"><h3>Wszystkie dni</h3><span>9 wypraw</span></div>
    <div class="card-list">${DAYS.map(day => `
      <article class="day-card" data-open-day="${day.id}" tabindex="0" role="button">
        <div class="day-date"><strong>${day.date.slice(0,2)}</strong><span>sierpnia</span></div>
        <div class="day-copy">
          <h3>Dzień ${day.day} · ${day.title}</h3>
          <p>${day.subtitle}</p>
          <div class="tag-row">${day.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}</div>
        </div>
        <div class="day-arrow">›</div>
      </article>`).join("")}</div>`;
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

function renderPlaces() {
  const categories = ["wszystkie", ...new Set(PLACES.map(x => x.category))];
  app.innerHTML = `<div class="view-heading"><h2>Miejsca</h2><p>Indeks historii i tras. Każda karta prowadzi dokładnie do właściwego modułu dnia.</p></div>
    <div class="place-filters">${categories.map((x,i)=>`<button class="place-filter ${i===0?"active":""}" data-place-filter="${x}">${x}</button>`).join("")}</div>
    <div class="place-grid">${PLACES.map(x=>`<article class="place-card" data-place-category="${x.category}">${x.image?`<img src="${x.image}" alt="${x.title}">`:`<div class="place-visual place-${x.category.replaceAll(" ","-")}"><span>${x.icon}</span></div>`}<div class="place-card-body"><span class="mini-kicker">${x.category} · ${x.meta}</span>${x.status?`<span class="place-status">${x.status}</span>`:""}<h3>${x.title}</h3><p>${x.text}</p><div class="place-actions"><button data-linked-day="${x.dayId}" data-linked-panel="${x.panel}">Otwórz w dniu ›</button><a href="${x.map}" target="_blank" rel="noopener">Mapa ↗</a></div></div></article>`).join("")}</div>`;
  document.querySelectorAll("[data-place-filter]").forEach(button=>button.addEventListener("click",()=>{
    document.querySelectorAll("[data-place-filter]").forEach(x=>x.classList.toggle("active",x===button));
    document.querySelectorAll("[data-place-category]").forEach(card=>card.hidden=button.dataset.placeFilter!=="wszystkie"&&card.dataset.placeCategory!==button.dataset.placeFilter);
  }));
  bindLinkedDayActions();
}

function museumWorkStatus(status) {
  if (status === "on") return ["Na ekspozycji", "work-on"];
  if (status === "off") return ["Niewystawiane", "work-off"];
  return ["Sprawdź przed wizytą", "work-check"];
}

function renderMuseumHub() {
  app.innerHTML = `<div class="view-heading"><h2>Muzea</h2><p>Osobisty przewodnik Gosi: orientacja w budynku, szeroki wybór dzieł i własna lista bez ryzyka, że aplikacja wybierze wszystko za Was.</p></div>
    <div class="notice">„W kolekcji” nie znaczy automatycznie „na ścianie”. Przy każdym dziele pokazujemy osobno status ekspozycji, a listę aktualizujemy przed podróżą.</div>
    <div class="museum-hub-grid">${MUSEUMS.map(museum => `<article class="museum-hub-card" style="--museum:${museum.accent}"><div class="museum-monogram">${museum.name.slice(0,2).toUpperCase()}</div><span class="mini-kicker">${museum.time}</span><h3>${museum.name}</h3><p>${museum.intro}</p><div class="museum-card-stats"><span>${museum.floors.length} poziomów/obszarów</span><span>${museum.works.length} dzieł w katalogu</span></div><button type="button" data-open-museum="${museum.id}">Otwórz przewodnik ›</button></article>`).join("")}</div>
    <div class="simple-card museum-method"><h3>Jak będziemy uzupełniać katalog?</h3><p>Dla znanych artystów lista ma być szeroka. Przed wyjazdem porównamy ją z oficjalnym filtrem „on view”, dzięki czemu Gosia zobaczy zarówno wszystkie interesujące prace w kolekcji, jak i realnie dostępny zestaw na dzień wizyty.</p></div>`;
  document.querySelectorAll("[data-open-museum]").forEach(button => button.addEventListener("click", () => renderMuseumDetail(button.dataset.openMuseum)));
}

function museumFloorPlan(museum) {
  return `<div class="museum-building" style="--museum:${museum.accent}">${museum.floors.map(floor => `<article class="museum-floor"><div class="floor-number">${floor.level}</div><div class="floor-shape" style="--floor-width:${floor.scale}%"><strong>${floor.title}</strong><span>${floor.rooms}</span></div><p>${floor.text}</p></article>`).join("")}</div>`;
}

function museumWorkCard(work, museum) {
  const [statusLabel, statusClass] = museumWorkStatus(work.status);
  return `<details class="museum-work-card" data-work-search="${`${work.artist} ${work.title} ${work.section}`.toLocaleLowerCase("pl")}" data-work-priority="${work.priority}" data-work-status="${work.status}" data-work-artist="${work.artist}">
    <summary><div class="work-visual" style="--museum:${museum.accent}"><span>${work.artist.split(" ").map(x=>x[0]).slice(0,2).join("")}</span></div><div class="work-summary"><span class="mini-kicker">${work.artist} · ${work.year}</span><h4>${work.title}</h4><div class="work-badges"><span class="${work.priority === "must" ? "work-must" : "work-good"}">${work.priority === "must" ? "Must see" : "Warto zobaczyć"}</span><span class="${statusClass}">${statusLabel}</span><span>piętro ${work.floor}</span></div></div><span class="work-open">＋</span></summary>
    <div class="work-detail"><p><strong>Dlaczego jest ważne?</strong><br>${work.why}</p><div class="look-box"><strong>Na co patrzeć:</strong> ${work.look}</div><div class="work-actions"><label><input type="checkbox" data-save-check="museum-want-${work.id}"> chcę zobaczyć</label><label><input type="checkbox" data-save-check="museum-seen-${work.id}"> widziane</label><button class="audio-chip" type="button" data-museum-audio="${work.id}">▶ Posłuchaj przy dziele</button></div></div>
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
  let visible = 0;
  document.querySelectorAll("[data-work-search]").forEach(card => {
    const matches = (!query || card.dataset.workSearch.includes(query)) && (priority === "all" || card.dataset.workPriority === priority) && (status === "all" || card.dataset.workStatus === status) && (artist === "all" || card.dataset.workArtist === artist);
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
  app.innerHTML = `<button class="view-back" type="button" id="museumHubBack">← Wszystkie muzea</button>
    <section class="museum-hero" style="--museum:${museum.accent}"><span class="mini-kicker">${museum.time} · ${museum.works.length} dzieł do wyboru</span><h2>${museum.fullName}</h2><p>${museum.intro}</p><div class="hero-actions"><button class="button" data-linked-day="${museum.dayId}" data-linked-panel="${museum.dayPanel}">Otwórz w planie dnia</button><span data-progress-for="museum-seen-"></span></div></section>
    <nav class="museum-tabs" aria-label="Sekcje muzeum"><button class="active" data-museum-panel="overview">Start</button><button data-museum-panel="floors">Piętra</button><button data-museum-panel="works">Dzieła</button><button data-museum-panel="artists">Artyści</button></nav>
    <section data-museum-content="overview"><div class="notice">${museum.statusNote}</div><div class="museum-start-grid"><article class="simple-card"><h3>60 minut</h3><p>Tylko zaznaczone Must see. Po pięciu dziełach oceńcie energię i nie próbujcie nadrabiać biegiem.</p></article><article class="simple-card"><h3>90–120 minut</h3><p>Must see oraz wybrani wcześniej artyści. To podstawowy wariant dla Whitney i Guggenheimu.</p></article><article class="simple-card"><h3>Pełny czas</h3><p>Własna lista Gosi, przerwa w połowie i najwyżej jedno spontaniczne odejście od trasy na piętro.</p></article></div><button class="button museum-primary-action" data-museum-jump="works">Wybierz dzieła przed wyjazdem</button></section>
    <section data-museum-content="floors" hidden><div class="view-heading compact"><h2>Jak duże jest muzeum?</h2><p>Uproszczony schemat pokazuje względną skalę i podział funkcjonalny. Nie zastępuje oficjalnego planu sal.</p></div>${museumFloorPlan(museum)}</section>
    <section data-museum-content="works" hidden><div class="museum-filter-bar"><label class="museum-search">Szukaj<input id="museumSearch" type="search" placeholder="artysta, dzieło lub dział"></label><label>Priorytet<select id="museumPriority"><option value="all">Wszystkie</option><option value="must">Must see</option><option value="good">Warto zobaczyć</option></select></label><label>Status<select id="museumStatus"><option value="all">Każdy status</option><option value="on">Na ekspozycji</option><option value="check">Do sprawdzenia</option><option value="off">Niewystawiane</option></select></label><label>Artysta<select id="museumArtist"><option value="all">Wszyscy artyści</option>${artists.map(artist=>`<option value="${artist}">${artist}</option>`).join("")}</select></label></div><div class="section-title"><h3>Katalog do własnego wyboru</h3><span id="museumFilterCount">${museum.works.length} dzieł</span></div><div class="museum-work-list">${museum.works.map(work=>museumWorkCard(work,museum)).join("")}</div></section>
    <section data-museum-content="artists" hidden><div class="view-heading compact"><h2>Artyści w katalogu</h2><p>Wybór artysty przenosi do wszystkich jego zapisanych prac — nie tylko do jednego najbardziej znanego obrazu.</p></div><div class="artist-index">${artists.map(artist=>{const count=museum.works.filter(work=>work.artist===artist).length;return `<button data-artist-jump="${artist}"><strong>${artist}</strong><span>${count} ${count===1?"dzieło":"dzieła"}</span></button>`}).join("")}</div></section>`;
  document.getElementById("museumHubBack")?.addEventListener("click", renderMuseumHub);
  document.querySelectorAll("[data-museum-panel]").forEach(button=>button.addEventListener("click",()=>showMuseumPanel(button.dataset.museumPanel)));
  document.querySelectorAll("[data-museum-jump]").forEach(button=>button.addEventListener("click",()=>showMuseumPanel(button.dataset.museumJump)));
  ["museumSearch","museumPriority","museumStatus","museumArtist"].forEach(control=>document.getElementById(control)?.addEventListener(control === "museumSearch" ? "input" : "change",filterMuseumWorks));
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
      <section data-media-content="museums" hidden><div class="notice">Bloomberg Connects obsługuje MoMA, The Met, Whitney i Guggenheim. Pobierzcie treści oraz sprawdźcie słuchawki jeszcze w Polsce.</div><div class="card-list">${PREPARE.slice(2).map(x=>`<article class="simple-card"><h3>${x.title}</h3><p>${x.text}</p><div class="card-meta">${x.meta}</div></article>`).join("")}<article class="simple-card"><h3>Nasze trasy muzealne</h3><p>MoMA 3 godziny lub skrót · The Met cztery obszary · Whitney 90–120 minut · Guggenheim 90 minut jako wariant.</p><div class="place-actions"><button data-linked-day="2026-08-24" data-linked-panel="museum">MoMA</button><button data-linked-day="2026-08-25" data-linked-panel="museum">The Met</button><button data-linked-day="2026-08-27" data-linked-panel="museum">Whitney</button><button data-linked-day="2026-08-30" data-linked-panel="guggenheim">Guggenheim</button></div></article></div></section>
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
    ${daySchematic(day)}
    <div class="reader" aria-label="Odtwarzanie głosowe">
      <button class="reader-play" id="readerPlayButton" type="button">▶ Odsłuchaj dzień</button>
      <button class="reader-stop" id="readerStopButton" type="button" disabled>■ Zatrzymaj</button>
      <span class="reader-status" id="readerStatus" aria-live="polite"></span>
      <details class="voice-settings"><summary>Zmień głos lektora</summary><div><select id="voiceSelect" aria-label="Wybierz polski głos"></select><button type="button" id="voicePreviewButton">Odtwórz próbkę</button></div><p>Naturalniejsze głosy „rozszerzone” lub „premium” pobiera się w ustawieniach dostępności urządzenia.</p></details>
    </div>
    <button class="context-back" id="dayContextBack" type="button" hidden>← Wróć</button>
    ${guide ? renderDayGuide(day) : `<div class="sheet-section"><h3>Plan dnia</h3>${timeline(day.items)}</div><div class="sheet-section"><h3>Najważniejsze</h3><div class="simple-card"><p>${day.essentials.join("<br>")}</p></div></div>`}`;
  sheet.hidden = false;
  sheetBackdrop.hidden = false;
  document.body.style.overflow = "hidden";
  sheet.scrollTop = 0;
  document.getElementById("readerPlayButton").addEventListener("click", toggleReading);
  document.getElementById("readerStopButton").addEventListener("click", () => stopReading("Odtwarzanie zatrzymane"));
  populateVoiceSelect();
  document.getElementById("voiceSelect")?.addEventListener("change", event => localStorage.setItem("nyc-preferred-voice", event.target.value));
  document.getElementById("voicePreviewButton")?.addEventListener("click", event => playSnippet("Witajcie w Nowym Jorku. Za chwilę ruszamy na spacer przez Greenwich Village.", event.currentTarget));
  document.getElementById("dayContextBack")?.addEventListener("click", returnToPreviousDayContext);
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
