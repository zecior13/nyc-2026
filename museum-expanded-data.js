const MUSEUM_FOCUS_ARTISTS = [
  "Claude Monet", "Vincent van Gogh", "Edgar Degas", "Édouard Manet",
  "Pierre-Auguste Renoir", "Rembrandt", "Henri Matisse", "Jackson Pollock",
  "Andy Warhol", "Vasily Kandinsky", "Pablo Picasso", "Marc Chagall"
];

const ARTIST_GUIDANCE = {
  "Claude Monet": {
    why: "Monet wracał do tych samych miejsc i motywów, aby rejestrować nie stały widok, lecz zmienne światło, pogodę i sam proces patrzenia.",
    look: "Porównaj krawędzie, odbicia i temperaturę koloru. Z bliska obserwuj ślad pędzla, a z dystansu moment, w którym ponownie składa się przestrzeń."
  },
  "Vincent van Gogh": {
    why: "Van Gogh przekształca obserwację w zapis energii: kolor, kierunek pociągnięć i rytm konturów pokazują równie mocno emocję jak przedstawiony temat.",
    look: "Śledź kierunek krótkich pociągnięć farby i sprawdź, które części obrazu poruszają się wspólnym rytmem."
  },
  "Edgar Degas": {
    why: "Degas łączył klasyczny rysunek z nowoczesnym kadrem, pokazując pracę, ćwiczenie i przypadkowe gesty zamiast wyłącznie efektu scenicznego.",
    look: "Zwróć uwagę na ucięte postacie, puste centrum, odbicia i gesty wykonywane pomiędzy właściwymi czynnościami."
  },
  "Édouard Manet": {
    why: "Manet przesunął malarstwo ku nowoczesności: spłaszczał przestrzeń, eksponował powierzchnię obrazu i wybierał tematy współczesnego życia.",
    look: "Porównaj duże jasne i ciemne pola oraz miejsca, w których skrótowy ślad pędzla zastępuje drobiazgowy opis."
  },
  "Pierre-Auguste Renoir": {
    why: "Renoir badał światło padające na skórę, tkaniny i roślinność, a sceny towarzyskie oraz portrety budował przede wszystkim kolorem.",
    look: "Sprawdź, gdzie kontur zanika, a formę tworzą sąsiadujące plamy ciepłych i chłodnych barw."
  },
  "Rembrandt": {
    why: "Rembrandt wykorzystywał światło, fakturę i nieidealizowaną twarz do budowania psychologicznej obecności człowieka.",
    look: "Najpierw odnajdź najjaśniejszy fragment, potem zobacz, jak prowadzi do spojrzenia i dłoni. Podejdź blisko do różnic między gładką i grubą farbą."
  },
  "Henri Matisse": {
    why: "Matisse uwolnił kolor od obowiązku wiernego opisywania natury i budował przestrzeń rytmem dużych, dekoracyjnych powierzchni.",
    look: "Śledź pojedynczy kontur oraz powtarzające się kolory. Sprawdź, jak niewiele elementów wystarcza do utrzymania całej kompozycji."
  },
  "Jackson Pollock": {
    why: "Pollock uczynił gest, grawitację i ruch całego ciała częścią obrazu; powierzchnia jest zapisem procesu, a nie oknem na scenę.",
    look: "Z bliska wybierz jedną linię i spróbuj śledzić jej drogę, następnie odejdź, aby zobaczyć równowagę całej sieci."
  },
  "Andy Warhol": {
    why: "Warhol wykorzystał powtórzenie i techniki reprodukcji, aby pokazać, jak reklama, media, sława i katastrofa zmieniają nasze patrzenie.",
    look: "Porównaj powtarzane motywy: szukaj przesunięć, ubytków farby i zmian koloru, które przeczą pozornej identyczności."
  },
  "Vasily Kandinsky": {
    why: "Kandinsky był jednym z pionierów abstrakcji i traktował kolor, linię oraz kształt jak autonomiczne środki zdolne działać podobnie do muzyki.",
    look: "Nie próbuj od razu rozpoznawać przedmiotów. Najpierw znajdź dominujący kierunek, napięcia między kształtami i rytm kolorystycznych akcentów."
  },
  "Pablo Picasso": {
    why: "Picasso wielokrotnie zmieniał język sztuki, rozbijając jeden punkt widzenia i swobodnie przechodząc między klasycyzmem, kubizmem oraz ekspresją.",
    look: "Ustal, z ilu punktów widzenia oglądasz postać lub przedmiot. Szukaj granicy, na której rozpoznawalny motyw staje się konstrukcją płaszczyzn."
  },
  "Marc Chagall": {
    why: "Chagall połączył wspomnienia Witebska, żydowską kulturę, Paryż i logikę snu w osobisty język unoszących się postaci oraz intensywnego koloru.",
    look: "Odnajdź elementy realnego miejsca, a potem wszystko, co przeczy grawitacji, skali albo zwykłej kolejności zdarzeń."
  }
};

function expandedWork(raw, museumId) {
  const guide = ARTIST_GUIDANCE[raw.artist] || { why: "Dzieło należy do poszerzonego katalogu najważniejszych artystów.", look: "Najpierw obejrzyj całość z dystansu, a następnie wybierz jeden detal i sposób prowadzenia wzroku." };
  return {
    ...raw,
    floor: raw.floor || (raw.gallery ? `galeria ${raw.gallery}` : "sprawdź"),
    section: raw.section || (museumId === "met" ? "malarstwo europejskie" : "malarstwo"),
    priority: raw.priority || "good",
    status: raw.status || "check",
    why: raw.why || guide.why,
    look: raw.look || guide.look,
    expanded: true
  };
}

function addMuseumWorks(museumId, works) {
  const museum = MUSEUMS.find(item => item.id === museumId);
  if (!museum) return;
  const existing = new Set(museum.works.map(work => `${work.artist}|${work.title}`.toLocaleLowerCase("pl")));
  works.forEach(raw => {
    const work = expandedWork(raw, museumId);
    const key = `${work.artist}|${work.title}`.toLocaleLowerCase("pl");
    if (!existing.has(key)) {
      museum.works.push(work);
      existing.add(key);
    }
  });
}

const MET_LOCAL_IMAGE_IDS = new Set([
  436123,436138,436139,436140,436141,436150,436152,436153,436168,
  436524,436525,436526,436527,436529,436530,436531,436532,436533,
  436534,436535,436536,436945,436946,436952,436960,437385,437387,
  437388,437390,437392,437393,437395,437396,437397,437399,437402,
  437406,437424,437425,437426,437428,437429,437430,437432,437436,
  437437,437980,437984,437998,438002,438010,438011,438012,438013,
  438014,438722,438815,438817,438819,438857,441104,459082,459098,
  459123,782304
]);
const MET_ALREADY_CURATED_IDS = new Set([
  436532, // Autoportret van Gogha
  436535, // Pole pszenicy z cyprysami
  437105, // The Green Wave
  437127, // Most nad stawem z nenufarami
  437137, // Nenufary 1916–19
  438815, // Madame Charpentier z dziećmi
  438817  // Lekcja tańca
]);

addMuseumWorks("met", MET_ON_VIEW_WORKS.filter(work => !MET_ALREADY_CURATED_IDS.has(work.objectId)).map(work => ({
  ...work,
  floor: `galeria ${work.gallery}`,
  status: "on",
  image: MET_LOCAL_IMAGE_IDS.has(work.objectId) ? `assets/photos/met-${work.objectId}.jpg` : undefined,
  sourceNote: "The Met Open Access · przypisanie galerii 05.08.2026"
})));

const metMuseum = MUSEUMS.find(item => item.id === "met");
const curatedMetUpdates = {
  "met-vangogh-self": ["galeria 825", "on"],
  "met-renoir": ["galeria 824", "on", "assets/photos/met-438815.jpg"],
  "met-degas": ["galeria 815", "on", "assets/photos/met-438817.jpg"]
};
metMuseum?.works.forEach(work => {
  const update = curatedMetUpdates[work.id];
  if (update) {
    [work.floor, work.status] = update;
    if (update[2]) work.image = update[2];
  }
});

const MOMA_FOCUS_WORKS = [
  {id:"moma-monet-waterlilies-2",artist:"Claude Monet",title:"Nenufary · drugi panel",year:"1914–26",floor:"5 · galeria 515",status:"on",priority:"must"},
  {id:"moma-monet-agapanthus",artist:"Claude Monet",title:"Agapanthus",year:"1914–26",floor:"5 · galeria 515",status:"on",priority:"must"},
  {id:"moma-monet-footbridge",artist:"Claude Monet",title:"Japoński mostek",year:"ok. 1920–22",floor:"sprawdź",status:"check"},
  {id:"moma-vangogh-sorrow",artist:"Vincent van Gogh",title:"Sorrow",year:"1882",floor:"sprawdź",section:"grafika",status:"off"},
  {id:"moma-vangogh-potato",artist:"Vincent van Gogh",title:"Jedzący kartofle",year:"1885",floor:"sprawdź",status:"off"},
  {id:"moma-vangogh-roulin",artist:"Vincent van Gogh",title:"Portret Josepha Roulina",year:"1889",floor:"sprawdź",status:"off"},
  {id:"moma-vangogh-gachet",artist:"Vincent van Gogh",title:"Portret doktora Gacheta (Mężczyzna z fajką)",year:"1890",floor:"sprawdź",status:"off"},
  {id:"moma-picasso-jester",artist:"Pablo Picasso",title:"Błazen",year:"1905 · odlew z lat 50.",floor:"5 · galeria 502",section:"rzeźba",status:"on"},
  {id:"moma-picasso-nude-hands",artist:"Pablo Picasso",title:"Akt ze złączonymi dłońmi",year:"1906",floor:"5 · galeria 502",status:"on"},
  {id:"moma-picasso-sleeping-head",artist:"Pablo Picasso",title:"Głowa śpiącej kobiety",year:"1907",floor:"5 · galeria 502",status:"on"},
  {id:"moma-picasso-study-demoiselles",artist:"Pablo Picasso",title:"Studium do Panien z Awinionu",year:"1907",floor:"5 · galeria 502",section:"rysunek",status:"on"},
  {id:"moma-picasso-repose",artist:"Pablo Picasso",title:"Odpoczynek",year:"1908",floor:"5 · galeria 502",status:"on"},
  {id:"moma-picasso-landscape",artist:"Pablo Picasso",title:"Pejzaż · La Rue-des-Bois",year:"1908",floor:"5 · galeria 503",status:"on"},
  {id:"moma-matisse-collioure",artist:"Henri Matisse",title:"Pejzaż w Collioure",year:"1905",floor:"5 · galeria 506",status:"on"},
  {id:"moma-matisse-music",artist:"Henri Matisse",title:"Muzyka (szkic)",year:"1907",floor:"5 · galeria 506",status:"on"},
  {id:"moma-matisse-back",artist:"Henri Matisse",title:"Plecy (I)",year:"1908–09",floor:"ogród rzeźb",section:"rzeźba",status:"on"},
  {id:"moma-matisse-jeannette-1",artist:"Henri Matisse",title:"Jeannette (I)",year:"1910",floor:"5 · galeria 506",section:"rzeźba",status:"on"},
  {id:"moma-matisse-jeannette-2",artist:"Henri Matisse",title:"Jeannette (II)",year:"1910",floor:"5 · galeria 506",section:"rzeźba",status:"on"},
  {id:"moma-matisse-jeannette-3",artist:"Henri Matisse",title:"Jeannette (III)",year:"1910–11",floor:"5 · galeria 506",section:"rzeźba",status:"on"},
  {id:"moma-matisse-jeannette-4",artist:"Henri Matisse",title:"Jeannette (IV)",year:"1910–11",floor:"5 · galeria 506",section:"rzeźba",status:"on"},
  {id:"moma-matisse-aubergines",artist:"Henri Matisse",title:"Martwa natura z bakłażanami",year:"1911",floor:"5 · galeria 506",status:"on"},
  {id:"moma-pollock-western",artist:"Jackson Pollock",title:"Bez tytułu (Scena z Zachodu)",year:"ok. 1930–33",floor:"5 · galeria 509",status:"on"},
  {id:"moma-pollock-steer",artist:"Jackson Pollock",title:"Pejzaż z wołem",year:"ok. 1936–37",floor:"5 · galeria 521",status:"on"},
  {id:"moma-pollock-shewolf",artist:"Jackson Pollock",title:"Wilczyca",year:"1943",floor:"5 · galeria 522",status:"on",priority:"must"},
  {id:"moma-pollock-1a",artist:"Jackson Pollock",title:"Number 1A, 1948",year:"1948",floor:"4 · galeria 401",status:"on",priority:"must"},
  {id:"moma-pollock-echo",artist:"Jackson Pollock",title:"Echo: Number 25, 1951",year:"1951",floor:"4 · galeria 405",status:"on"},
  {id:"moma-warhol-marilyn",artist:"Andy Warhol",title:"Gold Marilyn Monroe",year:"1962",floor:"4 · galeria 420",status:"on",priority:"must"},
  {id:"moma-warhol-crash",artist:"Andy Warhol",title:"Orange Car Crash Fourteen Times",year:"1963",floor:"4 · galeria 413",status:"on",priority:"must"},
  {id:"moma-warhol-birmingham",artist:"Andy Warhol",title:"Birmingham Race Riot",year:"1964",floor:"1 North",section:"grafika",status:"on"},
  {id:"moma-warhol-supper",artist:"Andy Warhol",title:"The Last Supper",year:"1986",floor:"2 · galeria 204",status:"on"},
  {id:"moma-chagall-village",artist:"Marc Chagall",title:"Ja i wieś",year:"1911",floor:"5 · galeria 503",status:"on",priority:"must"},
  {id:"moma-kandinsky-archer",artist:"Vasily Kandinsky",title:"Obraz z łucznikiem",year:"1909",floor:"sprawdź",status:"off"},
  {id:"moma-kandinsky-campbell-1",artist:"Vasily Kandinsky",title:"Panel dla Edwina R. Campbella nr 1",year:"1914",floor:"sprawdź",status:"off"},
  {id:"moma-kandinsky-campbell-2",artist:"Vasily Kandinsky",title:"Panel dla Edwina R. Campbella nr 2",year:"1914",floor:"sprawdź",status:"off"},
  {id:"moma-kandinsky-campbell-3",artist:"Vasily Kandinsky",title:"Panel dla Edwina R. Campbella nr 3",year:"1914",floor:"sprawdź",status:"off"},
  {id:"moma-kandinsky-campbell-4",artist:"Vasily Kandinsky",title:"Panel dla Edwina R. Campbella nr 4",year:"1914",floor:"sprawdź",status:"off"}
];
addMuseumWorks("moma", MOMA_FOCUS_WORKS);

const GUGGENHEIM_FOCUS_WORKS = [
  {id:"gugg-kandinsky-blue-mountain",artist:"Vasily Kandinsky",title:"Błękitna góra",year:"1908–09",section:"Modern European Currents"},
  {id:"gugg-kandinsky-factory",artist:"Vasily Kandinsky",title:"Pejzaż z kominem fabrycznym",year:"1910",section:"Modern European Currents"},
  {id:"gugg-kandinsky-improv-28",artist:"Vasily Kandinsky",title:"Improwizacja 28 (druga wersja)",year:"1912",section:"Modern European Currents",priority:"must"},
  {id:"gugg-kandinsky-black-lines",artist:"Vasily Kandinsky",title:"Czarne linie",year:"1913",section:"Modern European Currents",priority:"must"},
  {id:"gugg-kandinsky-white-border",artist:"Vasily Kandinsky",title:"Obraz z białą obwódką",year:"1913",section:"Modern European Currents",priority:"must"},
  {id:"gugg-kandinsky-red-oval",artist:"Vasily Kandinsky",title:"Czerwony owal",year:"1920",section:"abstrakcja"},
  {id:"gugg-kandinsky-white-cross",artist:"Vasily Kandinsky",title:"Biały krzyż",year:"1922",section:"abstrakcja"},
  {id:"gugg-kandinsky-upward",artist:"Vasily Kandinsky",title:"Ku górze",year:"1929",section:"abstrakcja"},
  {id:"gugg-kandinsky-around",artist:"Vasily Kandinsky",title:"Wokół koła",year:"1940",section:"abstrakcja"},
  {id:"gugg-picasso-moulin",artist:"Pablo Picasso",title:"Le Moulin de la Galette",year:"1900",section:"Thannhauser",priority:"must"},
  {id:"gugg-picasso-accordionist",artist:"Pablo Picasso",title:"Akordeonista",year:"1911",section:"kubizm",priority:"must"},
  {id:"gugg-picasso-woman-guitar",artist:"Pablo Picasso",title:"Kobieta z gitarą",year:"1911–12",section:"kubizm",priority:"must"},
  {id:"gugg-picasso-mandolin-guitar",artist:"Pablo Picasso",title:"Mandolina i gitara",year:"1924",section:"kubizm"},
  {id:"gugg-picasso-pitcher-fruit",artist:"Pablo Picasso",title:"Dzban i misa owoców",year:"1931",section:"malarstwo"},
  {id:"gugg-chagall-soldier",artist:"Marc Chagall",title:"Żołnierz pije",year:"1911–12",section:"Modern European Currents"},
  {id:"gugg-chagall-flying",artist:"Marc Chagall",title:"Latający powóz",year:"1913",section:"Modern European Currents"},
  {id:"gugg-pollock-alchemy",artist:"Jackson Pollock",title:"Alchemy",year:"1947",section:"abstrakcyjny ekspresjonizm",status:"check",priority:"must"},
  {id:"gugg-pollock-enchanted",artist:"Jackson Pollock",title:"Enchanted Forest",year:"1947",section:"abstrakcyjny ekspresjonizm",status:"check"}
];
addMuseumWorks("guggenheim", GUGGENHEIM_FOCUS_WORKS);

const WHITNEY_FOCUS_WORKS = [
  {id:"whitney-warhol-ethel",artist:"Andy Warhol",title:"Ethel Scull 36 Times",year:"1963",floor:"7",section:"pop-art",status:"on",priority:"must",why:"Pierwszy zamówiony portret Warhola powstał z serii zdjęć wykonanych w fotobudce na Times Square; 36 póz zamienia osobę w medialną sekwencję.",look:"Porównaj spontaniczne miny z mechanicznym rytmem siatki i zobacz, jak kolor zmienia odbiór tej samej twarzy."},
  {id:"whitney-warhol-family",artist:"Andy Warhol",title:"Family Album · wybór z 732 polaroidów",year:"1972–73",floor:"sprawdź",section:"fotografia",status:"on",priority:"must",why:"Wystawa czasowa pokazuje Warhola nie przez puszki i celebryckie sitodruki, lecz jako kompulsywnego kronikarza własnego kręgu oraz codzienności.",look:"Szukaj granicy między prywatnym albumem, próbą do późniejszego portretu i świadomym budowaniem wizerunku."},
  {id:"whitney-warhol-nine-jackies",artist:"Andy Warhol",title:"Nine Jackies",year:"1964",floor:"sprawdź",section:"pop-art",status:"check",priority:"must"},
  {id:"whitney-warhol-before-after",artist:"Andy Warhol",title:"Before and After, 4",year:"1962",floor:"magazyn",section:"pop-art",status:"off"},
  {id:"whitney-warhol-rorschach",artist:"Andy Warhol",title:"Rorschach",year:"1984",floor:"magazyn",section:"malarstwo",status:"off"},
  {id:"whitney-pollock-27",artist:"Jackson Pollock",title:"Number 27, 1950",year:"1950",floor:"magazyn",section:"abstrakcyjny ekspresjonizm",status:"off",priority:"must"}
];
addMuseumWorks("whitney", WHITNEY_FOCUS_WORKS);

MUSEUMS.forEach(museum => {
  museum.focusArtists = MUSEUM_FOCUS_ARTISTS.filter(artist => museum.works.some(work => work.artist === artist));
});

const museumSnapshotNotes = {
  moma: "Statusy galerii sprawdzone 05.08.2026 w oficjalnym katalogu MoMA. Ekspozycja może się zmienić, dlatego rano 24.08 użyj filtra „Na ekspozycji” i potwierdź numery sal.",
  met: "Rozszerzony katalog obejmuje wszystkie obrazy wskazanych artystów, którym oficjalny zestaw The Met Open Access z 05.08.2026 przypisywał numer galerii. To migawka ekspozycji, nie obietnica stałej dostępności.",
  guggenheim: "Lista łączy szeroki wybór z kolekcji z wystawami Thannhauser, Modern European Currents i Guggenheim Pop obowiązującymi w sierpniu 2026. Konkretne dzieła potwierdzamy przed wejściem.",
  whitney: "27.08 głównym pewnym punktem wskazanego zestawu jest Andy Warhol Family Album. Pozostałe ikony kolekcji mają osobny status, ponieważ Whitney często rotuje ekspozycję."
};
MUSEUMS.forEach(museum => { museum.statusNote = museumSnapshotNotes[museum.id] || museum.statusNote; });
