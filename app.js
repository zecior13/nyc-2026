const app = document.getElementById("app");
const navItems = [...document.querySelectorAll(".nav-item")];
const sheet = document.getElementById("detailSheet");
const sheetBackdrop = document.getElementById("sheetBackdrop");
const sheetContent = document.getElementById("sheetContent");

let currentView = "today";
let currentReadingText = "";
let reading = false;
let activeSnippetButton = null;
let countdownTimer = null;

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
      <div class="guide-grid">${guide.evening.map(item => `<article class="guide-card"><span class="mini-kicker">${item.time}</span><h4>${item.title}</h4><p>${item.text}</p></article>`).join("")}</div>
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

function showDayPanel(panelName, focusKey = "") {
  stopReading();
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
  if (tabs) sheet.scrollTo({ top: tabs.offsetTop - 12, behavior: "smooth" });
  if (focusKey) {
    const target = sheetContent.querySelector(`[data-content-key="${focusKey}"]`);
    if (target) {
      target.classList.add("context-highlight");
      setTimeout(() => target.classList.remove("context-highlight"), 1800);
      setTimeout(() => target.scrollIntoView({ behavior: "smooth", block: "center" }), 220);
    }
  }
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

function renderPlan() {
  app.innerHTML = `
    <div class="view-heading"><h2>Plan podróży</h2><p>Stałe rezerwacje są chronione, a pozostałe punkty można skracać lub zamieniać bez burzenia dnia.</p></div>
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

function renderCards(title, intro, items) {
  app.innerHTML = `
    <div class="view-heading"><h2>${title}</h2><p>${intro}</p></div>
    <div class="card-list">${items.map(item => `
      <article class="simple-card"><h3>${item.title}</h3><p>${item.text}</p><div class="card-meta">${item.meta}</div></article>`).join("")}</div>`;
}

function openLinkedDay(dayId, panel, key = "") {
  openDay(dayId);
  if (panel) showDayPanel(panel, key);
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

function openDay(id) {
  const day = DAYS.find(item => item.id === id);
  if (!day) return;
  stopReading();
  currentReadingText = dayReadingText(day);
  const guide = typeof DAY_GUIDES !== "undefined" ? DAY_GUIDES[day.id] : null;
  sheetContent.innerHTML = `
    <p class="sheet-kicker">Dzień ${day.day} · ${day.date} · ${day.weekday}</p>
    <h2 id="sheetTitle">${day.title}</h2>
    <p class="lead">${day.story}</p>
    <div class="reader" aria-label="Odtwarzanie głosowe">
      <button class="reader-play" id="readerPlayButton" type="button">▶ Odsłuchaj dzień</button>
      <button class="reader-stop" id="readerStopButton" type="button" disabled>■ Zatrzymaj</button>
      <span class="reader-status" id="readerStatus" aria-live="polite"></span>
      <details class="voice-settings"><summary>Zmień głos lektora</summary><div><select id="voiceSelect" aria-label="Wybierz polski głos"></select><button type="button" id="voicePreviewButton">Odtwórz próbkę</button></div><p>Naturalniejsze głosy „rozszerzone” lub „premium” pobiera się w ustawieniach dostępności urządzenia.</p></details>
    </div>
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
  if (guide) {
    sheetContent.querySelectorAll("[data-day-panel]").forEach(button => button.addEventListener("click", () => showDayPanel(button.dataset.dayPanel)));
    sheetContent.querySelectorAll("[data-panel-jump]").forEach(card => {
      const open = () => showDayPanel(card.dataset.panelJump);
      card.addEventListener("click", open);
      card.addEventListener("keydown", event => { if (event.key === "Enter" || event.key === " ") open(); });
    });
    sheetContent.querySelectorAll("[data-related-panel]").forEach(button => button.addEventListener("click", () => showDayPanel(button.dataset.relatedPanel, button.dataset.relatedKey || "")));
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
  }
}

if ("speechSynthesis" in window) speechSynthesis.addEventListener?.("voiceschanged", populateVoiceSelect);

function closeSheet() {
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
  if (view === "today") renderToday();
  if (view === "plan") renderPlan();
  if (view === "places") renderPlaces();
  if (view === "prepare") renderPrepare();
  if (view === "wallet") renderWallet();
  window.scrollTo({ top: 0, behavior: "instant" });
  app.focus({ preventScroll: true });
}

navItems.forEach(item => item.addEventListener("click", () => setView(item.dataset.view)));
document.getElementById("closeSheetButton").addEventListener("click", closeSheet);
sheetBackdrop.addEventListener("click", closeSheet);
document.getElementById("openTripButton").addEventListener("click", openTripInfo);
document.addEventListener("keydown", event => { if (event.key === "Escape" && !sheet.hidden) closeSheet(); });

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js"));
}

setView(currentView);
