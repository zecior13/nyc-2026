const TRIP = {
  title: "Nowy Jork 2026",
  travelers: "Radek · Gosia · Matylda",
  dates: "22–30 sierpnia 2026",
  hotel: {
    name: "Holiday Inn New York City – Times Square",
    address: "585 8th Avenue, New York, NY 10018",
    checkIn: "15:00",
    checkOut: "11:00"
  }
};

const DAYS = [
  {
    id: "2026-08-22", day: 1, date: "22.08", weekday: "sobota",
    title: "Pierwsze światła Manhattanu",
    subtitle: "Berlin → Londyn → JFK → Times Square",
    accent: "taxi", tags: ["przylot", "Midtown"],
    story: "Dzień bez rezerwacji po przylocie. Jego jedynym zadaniem jest bezpiecznie dowieźć Was do hotelu i dać pierwszy nowojorski moment po zmroku.",
    items: [
      { time: "16:59", title: "Przylot na JFK", note: "Kontrola graniczna, bagaż i wyjście do oficjalnego transportu.", type: "fixed" },
      { time: "18:15+", title: "JFK → hotel", note: "Yellow cab jako plan główny; UberXL i LIRR + AirTrain do porównania na miejscu.", type: "plan" },
      { time: "wieczór", title: "Kolacja i Times Square", note: "Krótki spacer tylko jeśli zostanie energia. Bryant Park jest rozszerzeniem, nie obowiązkiem.", type: "option" }
    ],
    essentials: ["Nie korzystaj z naganiaczy w hali przylotów", "Adres hotelu zapisany offline", "Brak rezerwacji na wieczór"]
  },
  {
    id: "2026-08-23", day: 2, date: "23.08", weekday: "niedziela",
    title: "Greenwich Village i Hiromi",
    subtitle: "Historia dzielnicy, seriale i Blue Note",
    accent: "brick", tags: ["Village", "jazz", "seriale"],
    story: "Village ma być spacerem przez kilka warstw miasta: bohemę, prawa obywatelskie, muzykę, architekturę i popkulturę — nie tylko zbiorem fasad do fotografowania.",
    items: [
      { time: "10:30", title: "Spokojny start", note: "Przejazd z hotelu do Washington Square Arch.", type: "plan" },
      { time: "11:30", title: "Brunch w Village", note: "90 minut na wybrane miejsce — od pełnego brunchu po szybki falafel.", type: "plan" },
      { time: "13:00", title: "Spacer po Greenwich Village", note: "Washington Square, NYU, MacDougal, Jefferson Market, Commerce, seriale i Stonewall.", type: "plan" },
      { time: "17:45", title: "Kolejka do Blue Note", note: "Cała grupa przychodzi razem; miejsca przy stolikach nie są numerowane.", type: "fixed" },
      { time: "20:00", title: "Hiromi · The Piano Quintet", note: "Table seating, minimum konsumpcyjne 20 USD na osobę.", type: "fixed" }
    ],
    essentials: ["Kupić 3 bilety Table Seating", "Bar jest 21+", "Bilety mogą przyjść e-mailem 48 godzin wcześniej"]
  },
  {
    id: "2026-08-24", day: 3, date: "24.08", weekday: "poniedziałek",
    title: "MoMA i kino pod wieżowcami",
    subtitle: "Sztuka, Midtown, zakupy i Bryant Park",
    accent: "moma", tags: ["muzeum", "zakupy", "film"],
    story: "Pierwszy dzień muzealny łączy najważniejsze dzieła modernizmu z historią Rockefeller Center, zakupami Matyldy i klasycznym kinem plenerowym.",
    items: [
      { time: "10:30", title: "MoMA", note: "Trasa kuratorska: kolekcja, Frida i Diego oraz „It’s Alive!”.", type: "fixed" },
      { time: "13:30", title: "Lunch w Midtown", note: "Godzina na posiłek bez długiego oczekiwania; wybór zależy od energii i budżetu.", type: "plan" },
      { time: "14:30", title: "Rockefeller Center i sklepy", note: "Maksymalnie dwa duże sklepy i jeden krótki.", type: "plan" },
      { time: "17:00", title: "Powrót po koc i bluzę", note: "Krótki reset w hotelu, toaleta, ładowanie telefonu i przygotowanie pikniku.", type: "plan" },
      { time: "17:30", title: "Piknik w Bryant Parku", note: "Trawnik otwiera się o 17:00; koc materiałowy, bez krzeseł i plastikowych podkładów.", type: "fixed" },
      { time: "20:00", title: "King Creole", note: "Paramount+ Movie Nights, projekcja z napisami.", type: "fixed" }
    ],
    essentials: ["Bilet MoMA i słuchawki do Bloomberg Connects", "Maksymalnie dwa duże sklepy", "Rano sprawdzić pogodę i status filmu"]
  },
  {
    id: "2026-08-25", day: 4, date: "25.08", weekday: "wtorek",
    title: "The Met, park i Broadway",
    subtitle: "Guggenheim z zewnątrz → The Met → Stranger Things",
    accent: "met", tags: ["muzeum", "Central Park", "Broadway"],
    story: "Najbogatszy dzień wymaga dyscypliny: Guggenheim w 10 minut, cztery wybrane obszary The Met, uproszczona trasa przez park i obowiązkowy odpoczynek przed teatrem.",
    items: [
      { time: "09:35", title: "Guggenheim z zewnątrz", note: "Krótka obserwacja architektury Franka Lloyda Wrighta.", type: "plan" },
      { time: "10:00", title: "The Met", note: "Dendur i Giacometti, American Wing, malarstwo europejskie i Costume Art.", type: "fixed" },
      { time: "14:00", title: "Lunch na Upper East Side", note: "Godzina na posiłek i odpoczynek po muzeum.", type: "plan" },
      { time: "15:00", title: "Central Park", note: "Bethesda Terrace, The Mall, Bow Bridge i Strawberry Fields.", type: "plan" },
      { time: "17:00", title: "Hotel i odpoczynek", note: "Prysznic, ładowanie telefonu i minimum 30 minut bez chodzenia.", type: "plan" },
      { time: "17:45", title: "Wczesna kolacja", note: "Hell’s Kitchen lub okolice teatru; bez ryzyka długiego oczekiwania.", type: "plan" },
      { time: "18:30", title: "Marquis Theatre", note: "Kontrola wejścia i zajęcie miejsc bez pośpiechu.", type: "fixed" },
      { time: "19:00", title: "Stranger Things: The First Shadow", note: "Marquis Theatre; spektakl trwa około 2 godz. 45 min.", type: "fixed" }
    ],
    essentials: ["Rezerwacja The Met na 10:00", "Powrót do hotelu przed teatrem", "Przyjście do Marquis Theatre o 18:30"]
  },
  {
    id: "2026-08-26", day: 5, date: "26.08", weekday: "środa",
    title: "Queens i US Open",
    subtitle: "Long Island City → Flushing → Flushing Meadows",
    accent: "river", tags: ["Queens", "jedzenie", "tenis"],
    story: "Dzień poza Manhattanem prowadzi od przemysłowego nabrzeża przez migracyjny Nowy Jork i wystawę światową do wielkiego sportu.",
    items: [
      { time: "10:30", title: "Spokojne śniadanie", note: "Bez pośpiechu po intensywnym dniu muzealnym i Broadwayu.", type: "plan" },
      { time: "11:15", title: "Gantry Plaza State Park", note: "Suwnice, znak Pepsi i panorama Midtown.", type: "plan" },
      { time: "14:20", title: "Kulinarne Flushing", note: "Kilka małych dań zamiast jednej ciężkiej kolacji.", type: "plan" },
      { time: "16:35", title: "Unisphere", note: "Opcja mocno rekomendowana, pomijana przy upale lub opóźnieniu.", type: "option" },
      { time: "17:30", title: "Wejście do US Open", note: "Kontrola bezpieczeństwa, teren kompleksu i znalezienie miejsc.", type: "fixed" },
      { time: "19:00", title: "US Open Mixed Doubles", note: "Półfinały i finał; koniec zależny od przebiegu meczów.", type: "fixed" }
    ],
    essentials: ["Bilety w aplikacji US Open", "Bez zwykłych plecaków", "Mała torba maks. 12 × 12 × 16 cali"]
  },
  {
    id: "2026-08-27", day: 6, date: "27.08", weekday: "czwartek",
    title: "Statua, Downtown i High Line",
    subtitle: "Promy → Wall Street → Whitney → Hudson Yards",
    accent: "steel", tags: ["promy", "Downtown", "sztuka"],
    story: "Najbardziej przekrojowy dzień prowadzi od portu i Statuy Wolności przez finansowe Downtown oraz pamięć o 11 września, a potem przez sztukę, dawną linię towarową i współczesny Hudson Yards.",
    items: [
      { time: "08:15", title: "Hotel → Pier 79", note: "Dojście lub krótki przejazd do przystani NYC Ferry przy West 39th Street.", type: "plan" },
      { time: "08:50", title: "Prom do St. George", note: "NYC Ferry wzdłuż West Side i pierwsza sesja zdjęciowa ze Statuą Wolności.", type: "fixed" },
      { time: "10:00", title: "Staten Island Ferry → Manhattan", note: "Bezpłatny kultowy prom i druga szansa na wspólne zdjęcie.", type: "plan" },
      { time: "10:30", title: "Lower Manhattan", note: "Charging Bull, Wall Street i bezpłatny 9/11 Memorial bez muzeum.", type: "plan" },
      { time: "12:15", title: "Lunch", note: "W Downtown albo po przejeździe do Meatpacking.", type: "plan" },
      { time: "13:30", title: "Whitney Museum", note: "Skrócona trasa 90–120 minut: Mabel Dwight, Warhol, kolekcja i tarasy.", type: "fixed" },
      { time: "15:45", title: "High Line → Hudson Yards", note: "Galerie opcjonalnie; Vessel i zachód słońca nad Hudsonem.", type: "plan" },
      { time: "18:30+", title: "Kolacja i letni wieczór", note: "Hudson Yards, nabrzeże albo Koreatown — bez obowiązkowego powrotu o 17:00.", type: "option" }
    ],
    essentials: ["Rano sprawdzić rozkłady obu promów", "Whitney Biennial kończy się 23.08", "Telefon naładowany i miejsce na serię zdjęć"]
  },
  {
    id: "2026-08-28", day: 7, date: "28.08", weekday: "piątek",
    title: "SoHo i Yankees–Red Sox",
    subtitle: "Cast iron, zakupy i baseball w Bronksie",
    accent: "yankees", tags: ["zakupy", "architektura", "baseball"],
    story: "Dawna dzielnica przemysłowa, współczesne zakupy i jedna z największych rywalizacji amerykańskiego sportu.",
    items: [
      { time: "10:30", title: "Architektura SoHo", note: "Greene, Mercer, Spring i historia żeliwnych fasad.", type: "plan" },
      { time: "12:00", title: "Zakupy Matyldy", note: "Lista priorytetów i bezwzględny koniec głównych zakupów o 14:15.", type: "plan" },
      { time: "14:30", title: "Lunch w Nolita lub Chinatown", note: "Posiłek po zakupach, bez dokładania kolejnych sklepów po drodze.", type: "plan" },
      { time: "16:00", title: "Hotel i zmiana trybu", note: "Zakupy zostają w pokoju; odpoczynek, ładowanie telefonu i bilety do Apple Wallet.", type: "plan" },
      { time: "16:45", title: "Metro do Bronksu", note: "Linia D z 42 St–Bryant Park lub B/D zgodnie z bieżącymi komunikatami.", type: "fixed" },
      { time: "17:35", title: "Otwarcie Yankee Stadium", note: "Po wejściu od razu do Monument Park; kolejka może zamknąć się wcześniej.", type: "fixed" },
      { time: "19:05", title: "Yankees–Red Sox", note: "Godzina poprawiona według oficjalnego terminarza MLB.", type: "fixed" }
    ],
    essentials: ["Bilety w MLB Ballpark", "Zakupy zostają w hotelu", "Wyjazd z hotelu najpóźniej około 17:00"]
  },
  {
    id: "2026-08-29", day: 8, date: "29.08", weekday: "sobota",
    title: "Brooklyn i jazz w Harlemie",
    subtitle: "DUMBO → Bargemusic → Apollo → Charlie Parker",
    accent: "jazz", tags: ["Brooklyn", "Harlem", "muzyka"],
    story: "Most i port, muzyka kameralna, legenda Apollo i bebop w Harlemie — dokładnie w rocznicę urodzin Charliego Parkera.",
    items: [
      { time: "10:00", title: "DUMBO", note: "Washington Street, Pebble Beach, Brooklyn Bridge i Jane’s Carousel.", type: "plan" },
      { time: "13:15", title: "Kolejka na Bargemusic", note: "Nowa lokalizacja: Brooklyn Bridge Park Boathouse przy Pier 5.", type: "fixed" },
      { time: "14:00", title: "Bargemusic", note: "Bezpłatny koncert bez rezerwacji; drzwi otwierają się o 13:40.", type: "fixed" },
      { time: "16:10", title: "Apollo z zewnątrz", note: "Neon, Walk of Fame i sklep; historyczna sala jest zamknięta.", type: "option" },
      { time: "16:50", title: "Charlie Parker Jazz Festival", note: "Dołączamy na finałową część bezpłatnego programu w Marcus Garvey Park.", type: "fixed" }
    ],
    essentials: ["Lunch kończymy o 12:40", "Galeria Apollo do ponownego potwierdzenia", "Przy opóźnieniu pomijamy Apollo i jedziemy do parku"]
  },
  {
    id: "2026-08-30", day: 9, date: "30.08", weekday: "niedziela",
    title: "Ostatnie spojrzenie na miasto",
    subtitle: "Diner → Grand Central → JFK",
    accent: "terminal", tags: ["Midtown", "wylot"],
    story: "Spokojny finał: klasyczne śniadanie, krótki spacer po 42nd Street, Grand Central i przewidywalny wyjazd na lotnisko.",
    items: [
      { time: "08:30", title: "Śniadanie w dinerze", note: "Ostatni lokalny rytuał i krótka ściągawka z amerykańskiego śniadania.", type: "plan" },
      { time: "09:50", title: "Wymeldowanie i bagaże", note: "Powrót do hotelu, check-out przed 11:00 i potwierdzenie przechowania walizek.", type: "fixed" },
      { time: "10:30", title: "Bryant Park, NYPL i Grand Central", note: "Biblioteka tylko z zewnątrz; w sierpniowe niedziele pozostaje zamknięta.", type: "plan" },
      { time: "12:30", title: "Ostatni lunch", note: "W okolicy Grand Central lub po drodze do hotelu; bez rezerwacji i długiego oczekiwania.", type: "plan" },
      { time: "13:45", title: "Odbiór walizek", note: "Toaleta, woda, kontrola dokumentów i ostateczna decyzja LIRR czy samochód.", type: "fixed" },
      { time: "14:30", title: "Wyjazd na JFK", note: "LIRR + AirTrain jako plan główny; taxi lub UberXL przy utrudnieniach kolei.", type: "fixed" },
      { time: "16:00–16:30", title: "JFK", note: "Odprawa, nadanie bagażu i kontrola bezpieczeństwa z trzygodzinnym buforem.", type: "fixed" },
      { time: "19:29", title: "Wylot", note: "Terminal i status lotu sprawdzamy dzień wcześniej.", type: "fixed" }
    ],
    essentials: ["Wymeldowanie do 11:00", "Potwierdzić przechowanie bagażu", "Sprawdzić terminal i komunikaty JFK"]
  }
];

const DAY_GUIDES = {
  "2026-08-22": {
    kind: "arrival",
    timelineTargets: ["arrival", "transport", "evening"],
    checked: "16.07.2026",
    arrival: [
      { title: "1. Po wylądowaniu", text: "Nie spieszcie się do wyjścia. Najpierw kontrola graniczna, potem odbiór bagażu i dopiero przejście przez kontrolę celną do hali przylotów." },
      { title: "2. Mobile Passport Control", text: "Jeżeli aplikacja CBP MPC potwierdzi Waszą kwalifikację jako powracających podróżnych programu Visa Waiver, przygotujcie profile przed wyjazdem. Zgłoszenie i wspólne zdjęcie rodziny wykonuje się najwcześniej 4 godziny przed lądowaniem lub już po przylocie. Zawsze miejcie fizyczne paszporty." },
      { title: "3. Dopiero w hali przylotów", text: "Włączcie dane, sprawdźcie Mapy i porównajcie czas przejazdu. Nie przyjmujcie żadnej propozycji transportu od osoby zaczepiającej Was w terminalu." }
    ],
    transport: [
      {
        name: "Yellow cab",
        badge: "Plan główny",
        tone: "recommended",
        price: "około 92–105 USD łącznie",
        time: "zwykle 60–100 min",
        text: "Stała taryfa JFK–Manhattan wynosi 70 USD. Dochodzą obowiązkowe opłaty, ewentualny przejazd płatną trasą i napiwek. Dla trzech osób po długim locie to najprostsza opcja od drzwi do drzwi.",
        steps: ["Idźcie wyłącznie za znakami Ground Transportation / Taxi", "Stańcie w oficjalnej kolejce yellow cab", "Pokażcie adres hotelu i sprawdźcie na ekranie Rate #2 – JFK Airport", "Można płacić kartą; napiwek wybiera się na terminalu"]
      },
      {
        name: "AirTrain + LIRR",
        badge: "Plan na korek",
        tone: "fast",
        price: "około 38–43 USD za całą trójkę",
        time: "około 60–75 min do hotelu",
        text: "Najbardziej przewidywalna opcja podczas utrudnień drogowych. AirTrain jedzie do Jamaica Station, następnie LIRR do Penn Station, skąd do hotelu jest około 8 minut pieszo.",
        steps: ["W terminalu wybierzcie AirTrain w kierunku Jamaica Station", "Opłata AirTrain: 8,75 USD od osoby przy wyjściu na Jamaica", "W aplikacji TrainTime kupcie właściwy bilet Jamaica → Penn Station przed wejściem do LIRR", "Na Penn Station wyjdźcie w stronę 8th Avenue i idźcie na północ do 585 8th Ave"]
      },
      {
        name: "Uber / Lyft",
        badge: "Porównaj na miejscu",
        tone: "dynamic",
        price: "cena widoczna w aplikacji",
        time: "zależny od odbioru i korków",
        text: "Ma sens, jeśli cena jest zbliżona do całkowitej ceny taxi albo potrzebujecie większego samochodu. Przebudowa JFK może czasowo przenosić miejsca odbioru — aplikacja wskaże aktualną strefę.",
        steps: ["Zamawiajcie przejazd dopiero po odebraniu bagażu", "Sprawdźcie UberX i UberXL", "Porównajcie cenę końcową z taxi, nie samą cenę bazową", "Zweryfikujcie tablicę rejestracyjną i imię kierowcy"]
      }
    ],
    decision: {
      title: "Decyzja w 30 sekund",
      text: "Jeżeli Mapy pokazują przejazd samochodem do 90 minut, wybierzcie yellow cab. Przy poważnych opóźnieniach drogowych albo czasie powyżej 100 minut wybierzcie AirTrain + LIRR. Uber tylko wtedy, gdy aplikacja pokaże wygodny odbiór i sensowną cenę końcową."
    },
    hotel: {
      name: "Holiday Inn New York City – Times Square",
      address: "585 8th Avenue, New York, NY 10018",
      phone: "+1 212 473 6200",
      text: "Recepcja działa na miejscu; standardowy check-in jest od 15:00. Hotel leży przy 8th Avenue, między West 38th i West 39th Street — około 8 minut pieszo od Penn Station i około 10 minut od Times Square."
    },
    evening: [
      { time: "po zameldowaniu", title: "Najpierw oceńcie energię", text: "Prysznic, woda i krótki odpoczynek. Pierwszego wieczoru niczego nie trzeba zaliczyć." },
      { time: "wariant krótki · 45–60 min", title: "Kolacja i pierwsze Times Square", text: "Idźcie 8th Avenue do West 42nd Street, następnie w stronę Broadwayu. Zatrzymajcie się na czerwonych schodach TKTS i wróćcie do hotelu." },
      { time: "wariant pełny · 90 min", title: "Times Square i Bryant Park", text: "Po Times Square przejdźcie West 42nd Street na wschód do Bryant Parku. Powrót do hotelu prowadzi West 40th Street. Wybierzcie ten wariant tylko wtedy, gdy naprawdę macie siłę." }
    ],
    stories: [
      { title: "Dlaczego Times Square nie jest kwadratem?", text: "Broadway przecina regularną siatkę Manhattanu po skosie. Na wysokości Seventh Avenue tworzy dwa trójkąty, razem nazywane Bowtie — muszką. Times Square jest północną częścią tej przestrzeni." },
      { title: "Od Longacre Square do Times Square", text: "Do 1904 roku okolica nazywała się Longacre Square. Zmieniła nazwę, gdy wydawca The New York Times przeniósł redakcję do nowego wieżowca przy placu. Pierwszą sylwestrową kulę opuszczono tam w 1907 roku." },
      { title: "Bryant Park: miejski powrót", text: "W miejscu dzisiejszej biblioteki stał kiedyś potężny zbiornik Croton Reservoir. Sam park przeszedł drogę od cmentarza dla ubogich przez zaniedbaną przestrzeń lat 70. do jednego z najbardziej udanych miejskich salonów Nowego Jorku." }
    ],
    links: [
      { label: "Trasa JFK → hotel", url: "https://www.google.com/maps/dir/?api=1&origin=John+F.+Kennedy+International+Airport&destination=Holiday+Inn+New+York+City+Times+Square,+585+8th+Ave,+New+York,+NY+10018" },
      { label: "Hotel w Mapach", url: "https://www.google.com/maps/search/?api=1&query=Holiday+Inn+New+York+City+Times+Square+585+8th+Avenue" },
      { label: "Spacer do Times Square", url: "https://www.google.com/maps/dir/?api=1&origin=Holiday+Inn+New+York+City+Times+Square,+585+8th+Ave&destination=Times+Square,+New+York&travelmode=walking" },
      { label: "Oficjalne taxi JFK", url: "https://www.jfkairport.com/transportation/taxi-service" },
      { label: "AirTrain JFK", url: "https://www.jfkairport.com/transportation/airtrain" },
      { label: "CBP Mobile Passport Control", url: "https://www.cbp.gov/travel/us-citizens/mobile-passport-control" }
    ],
    food: [
      { category: "Szybko i kultowo", name: "LOS TACOS No. 1 · Times Square", price: "$", address: "229 W 43rd St", note: "Tacos jedzone na stojąco; dobre, gdy chcecie od razu zobaczyć Times Square bez pełnej kolacji.", url: "https://www.lostacos1.com/locations/" },
      { category: "Pizza blisko hotelu", name: "Capizzi", price: "$$", address: "547 9th Ave", note: "Mała pizzeria około pięciu minut od hotelu. Najwygodniejsza opcja po locie, jeśli nie chcecie iść daleko.", url: "https://capizzinyc.com/pages/contact-info" },
      { category: "Kolacja przy stoliku", name: "Pure Thai Cookhouse", price: "$$", address: "766 9th Ave", note: "Niewielki tajski lokal w Hell’s Kitchen. Wybór tylko wtedy, gdy po przylocie macie energię na dłuższy spacer lub krótki przejazd.", url: "https://www.purethaicookhouse.com/contact" }
    ]
  },
  "2026-08-23": {
    kind: "village",
    checked: "16.07.2026",
    timelineTargets: ["route", "food", "route", "bluenote", "bluenote"],
    route: [
      { time: "10:30", title: "Start i przejazd do Village", text: "Spokojny początek po podróży. Dojedźcie metrem w okolice West 4th Street i zacznijcie przy Washington Square Arch.", look: "Łuk jest najłatwiejszym punktem orientacyjnym i początkiem całej opowieści.", pause: "Usiądźcie na 15 minut. Nie szukajcie następnego punktu — obserwujcie muzyków, szachistów, studentów NYU, występy uliczne i życie wokół fontanny.", image: { src: "assets/places/washington-square.jpg", alt: "Washington Square Arch widziany od strony parku", credit: "Marco Almbauer · Wikimedia Commons · CC0" }, related: [{ panel: "stories", key: "story-0", label: "Historia placu" }, { panel: "stories", key: "story-1", label: "Moses i Jane Jacobs" }] },
      { time: "11:30–13:00", title: "Brunch w Village", text: "Pełne półtorej godziny zgodnie z planem. W module Jedzenie można wybrać stolik, lżejszy brunch albo szybki lokal bez rezerwacji.", look: "Nie ustawiajcie się w bardzo długiej kolejce — zachowajcie energię na spacer.", related: [{ panel: "food", label: "Wybierz brunch" }] },
      { time: "13:00", title: "Washington Square, NYU i MacDougal", text: "Plac, kampus wpisany w miasto oraz dawna scena folkowa i komediowa. To pierwsza warstwa Village: studenci, artyści i życie uliczne.", look: "Łuk, fontanna, One Fifth Avenue, schody klubów na MacDougal Street.", related: [{ panel: "stories", key: "story-4", label: "Historia muzyczna" }] },
      { time: "14:00", title: "Jefferson Market i Commerce Street", text: "Dawny gmach sądu z charakterystyczną wieżą, niewielki ogród oraz kręte ulice zachodniej części Village. Zwróćcie uwagę na brownstones, dawne stajnie i mews — niską, mieszkalną skalę całkiem inną niż Midtown.", look: "Czerwona cegła i wieża Jefferson Market Library oraz nietypowy łuk Commerce Street.", image: { src: "assets/places/jefferson-market.jpg", alt: "Ceglana wieża Jefferson Market Library", credit: "Kidfly182 · Wikimedia Commons · CC BY-SA" }, related: [{ panel: "stories", key: "story-3", label: "Dlaczego ulice się plączą?" }] },
      { time: "14:40", title: "Perry, Magnolia i Friends", text: "Opcjonalny moduł popkulturowy: schody Carrie, Magnolia Bakery i fasada budynku z Przyjaciół. Wszystkie adresy są prywatną lub normalnie użytkowaną przestrzenią.", look: "66 Perry Street, 401 Bleecker Street oraz narożnik Bedford i Grove. Porównajcie szerokość prawdziwej kamienicy z ogromem serialowych mieszkań.", related: [{ panel: "screen", key: "screen-1", label: "Carrie" }, { panel: "screen", key: "screen-0", label: "Friends" }] },
      { time: "15:35", title: "Christopher Park i Stonewall", text: "Najważniejszy historyczny przystanek: park, rzeźby Gay Liberation, nadal działający Stonewall Inn oraz Visitor Center. To żywe miejsce, nie muzealna rekonstrukcja.", look: "Białe figury George’a Segala w parku oraz mała skala miejsca w porównaniu z jego globalnym znaczeniem.", image: { src: "assets/places/stonewall.jpg", alt: "Fasada Stonewall Inn przy Christopher Street", credit: "Beyond My Ken · Wikimedia Commons · CC BY-SA" }, related: [{ panel: "stories", key: "story-2", label: "Historia Stonewall" }] },
      { time: "16:15–17:30", title: "Kawa, deser i odpoczynek", text: "Minimum godzina rezerwy przed klubem. Jeśli nogi są zmęczone, kończymy spacer wcześniej.", look: "Sprawdźcie bilety, baterię telefonu i dodatkową warstwę ubrania.", related: [{ panel: "food", label: "Kawa i deser" }] }
    ],
    stories: [
      { title: "Plac, który był cmentarzem", text: "Washington Square długo nie był eleganckim salonem. Pod częścią parku znajdowało się pole garncarskie, czyli publiczne miejsce pochówku osób ubogich i nieznanych. Później teren służył paradom wojskowym, a dopiero z czasem stał się sercem artystycznego Village." },
      { title: "Łuk i miejska autostrada Roberta Mosesa", text: "W dwudziestym wieku wpływowy urbanista Robert Moses chciał przeprowadzić ruch samochodowy przez Washington Square. Mieszkańcy, między innymi aktywistka Jane Jacobs, bronili parku. Zwycięstwo pomogło zdefiniować nową ideę miasta projektowanego dla ludzi, a nie tylko dla samochodów." },
      { title: "Stonewall: małe miejsce, wielka zmiana", text: "W nocy z 27 na 28 czerwca 1969 roku policyjny nalot na Stonewall Inn spotkał się z oporem bywalców i mieszkańców. Kilka dni protestów nie rozpoczęło całej historii walki o prawa osób LGBT, ale stało się jej przełomowym symbolem i impulsem dla nowych organizacji." },
      { title: "Dlaczego Village nie pasuje do siatki?", text: "Greenwich Village rozwinęło się wcześniej niż zatwierdzony w 1811 roku plan prostokątnej siatki Manhattanu. Dawne drogi, granice gospodarstw i naturalny brzeg rzeki pozostały w układzie ulic. Dlatego West 4th Street potrafi przeciąć West 10th Street, co w regularnym Midtown byłoby nie do pomyślenia." },
      { title: "Od folku do stand-upu", text: "MacDougal Street była jednym z centrów powojennej bohemy. W niewielkich klubach występowali muzycy folkowi, poeci i komicy. Młody Bob Dylan pojawiał się w tej okolicy na początku lat sześćdziesiątych, a piwniczne sceny pomagały rodzić się nowym stylom i karierom." }
    ],
    screen: [
      { title: "Friends · 90 Bedford Street", text: "Fasada narożnego budynku udawała dom Moniki, Rachel, Joeya i Chandlera. Wnętrza serialu powstawały w studiu w Los Angeles, a lokal na parterze nigdy nie był Central Perkiem. Zewnętrzna bryła nie mieściłaby dokładnie tak wielkich mieszkań i korytarza znanych z planu zdjęciowego.", image: { src: "assets/places/friends-house.jpg", alt: "Narożny budynek przy 90 Bedford Street", credit: "Wikimedia Commons · CC BY" } },
      { title: "Carrie Bradshaw · 66 Perry Street", text: "Schody tej prywatnej kamienicy zagrały wejście do mieszkania Carrie w Seksie w wielkim mieście, mimo że bohaterka miała mieszkać przy East 73rd Street. Oglądamy dyskretnie z chodnika i respektujemy prośby mieszkańców.", image: { src: "assets/places/carrie-house.jpg", alt: "Schody kamienicy przy 66 Perry Street", credit: "Rob Young · Wikimedia Commons · CC BY 2.0" } },
      { title: "Commerce Street", text: "Krótka, wygięta ulica jest bardziej filmowa niż jeden konkretny adres. Jej kameralna skala, dawne stajnie i nietypowy łuk pokazują Village, którego nie da się pomylić z Midtown." }
    ],
    bluenote: {
      artist: "Hiromi: The Piano Quintet feat. PUBLIQuartet",
      address: "Blue Note Jazz Club · 131 West 3rd Street",
      image: { src: "assets/places/blue-note.jpg", alt: "Wejście do Blue Note Jazz Club", credit: "Frederic Germay · Wikimedia Commons · CC BY-SA 3.0" },
      schedule: ["17:30 · ustawcie się razem w kolejce", "18:00 · otwarcie drzwi", "20:00 · początek koncertu", "około 21:30 · orientacyjny koniec"],
      rules: ["Kupujcie Table Seating — miejsca przy stolikach są dostępne dla Matyldy", "Bar Area jest wyłącznie 21+", "Minimum konsumpcyjne: 20 USD na osobę podczas każdego show", "W klubie działa pełna restauracja; można jeść podczas koncertu", "Cała grupa powinna wejść razem"],
      about: [
        { title: "Kim jest Hiromi?", text: "Hiromi Uehara to urodzona w Japonii pianistka i kompozytorka, która od debiutu Another Mind w 2003 roku zasłynęła wirtuozerią, sceniczną energią oraz swobodnym łączeniem jazzu, klasyki i popu. Jej improwizacja bywa bardzo złożona, ale najważniejsza jest płynąca z niej radość." },
        { title: "Od Chicka Corei do Stanleya Clarke’a", text: "Hiromi nagrała koncertowy album Duet z legendarnym pianistą Chickiem Coreą. Zagrała również na nagrodzonym Grammy albumie basisty Stanleya Clarke’a Jazz in the Garden. Te współprace pokazują jej miejsce pomiędzy jazzową tradycją i nowoczesnym fusion." },
        { title: "Dlaczego Piano Quintet?", text: "Typowe trio jazzowe to fortepian, kontrabas i perkusja. Tutaj fortepian spotyka kwartet smyczkowy PUBLIQuartet: dwoje skrzypiec, altówkę i wiolonczelę. Smyczki nie są tłem — improwizują, budują rytm i prowadzą dialog z Hiromi." },
        { title: "PUBLIQuartet", text: "Nowojorski kwartet smyczkowy specjalizuje się w muzyce współczesnej, improwizacji i łączeniu gatunków. To partner idealny dla Hiromi: klasyczne instrumentarium zachowuje się tu jak elastyczny zespół jazzowy." }
      ],
      listen: [
        { title: "Fortepian jako perkusja", text: "Hiromi często buduje rytm całym ciałem i traktuje fortepian również perkusyjnie. Zwróćcie uwagę na lewą rękę, nagłe zmiany metrum i energię, która wygląda niemal fizycznie." },
        { title: "Dialog ze smyczkami", text: "To nie klasyczny kwartet dodany jako tło. PUBLIQuartet może odpowiadać fortepianowi, przejmować motyw albo tworzyć napięcie rytmiczne. Warto śledzić, kto w danej chwili prowadzi rozmowę." },
        { title: "Jazz bez obowiązku rozumienia", text: "Nie trzeba rozpoznawać harmonii ani formy. Wystarczy obserwować trzy rzeczy: powracający motyw, momenty wspólnego przyspieszenia oraz sygnały wzrokowe wymieniane przez muzyków." }
      ],
      playlist: [
        { label: "Silver Lining Suite", note: "Najbliżej formatu koncertu ze smyczkami", url: "https://open.spotify.com/search/Hiromi%20Silver%20Lining%20Suite" },
        { label: "Green Tea Farm", note: "Liryczna strona Hiromi", url: "https://open.spotify.com/search/Hiromi%20Green%20Tea%20Farm" },
        { label: "Move", note: "Energia, rytm i wirtuozeria", url: "https://www.youtube.com/results?search_query=Hiromi+Move+live" }
      ],
      policies: ["Brak zwrotów i wymian, chyba że koncert zostanie odwołany lub przełożony", "Bilety są wysyłane e-mailem 48 godzin przed wydarzeniem", "Zdjęcia bez lampy zależą od decyzji artysty ogłaszanej danego wieczoru", "Nagrywanie audio i wideo jest zabronione", "Warto mieć kartę używaną do zakupu i dokument kupującego"],
      menuUrl: "https://www.bluenotejazz.com/nyc/menu/",
      countdown: "2026-08-23T18:00:00-04:00"
    },
    food: [
      { category: "Spokojny brunch", name: "Joseph Leonard", price: "$$–$$$", address: "170 Waverly Place", note: "Małe amerykańskie bistro przy Grove Street. Niedzielny brunch 10:30–15:30; część stolików zostaje dla gości bez rezerwacji.", url: "https://www.josephleonard.com/info/" },
      { category: "Francuski klimat", name: "Buvette", price: "$$–$$$", address: "42 Grove Street", note: "Kameralny francuski lokal, bardzo zgodny z atmosferą West Village. Popularny, więc kolejka może zdecydować za Was.", url: "https://order.toasttab.com/online/buvette" },
      { category: "Lżej i bez rezerwacji", name: "Tartinery", price: "$$", address: "233 Thompson Street", note: "Tartines, jajka, tosty i kawa. W weekend działa od 9:00 i przyjmuje gości bez rezerwacji.", url: "https://www.tartinery.com/location/greenwich-village/" },
      { category: "Tanio i szybko", name: "Mamoun’s Falafel", price: "$", address: "119 MacDougal Street", note: "Falafel i shawarma w miejscu działającym od 1971 roku. Dobre jako szybki lunch zamiast pełnego brunchu.", url: "https://www.mamouns.com/location/mamouns-greenwich-village-nyc/" },
      { category: "Kultowy deser", name: "Magnolia Bakery", price: "$–$$", address: "401 Bleecker Street", note: "Oryginalny lokal z 1996 roku. Niedziela 9:30–22:00; można zamówić wcześniej i odebrać bez kolejki.", url: "https://www.magnoliabakery.com/blogs/stores/bleecker-street", image: { src: "assets/places/magnolia.jpg", alt: "Fasada Magnolia Bakery przy Bleecker Street", credit: "WestportWiki · Wikimedia Commons · CC BY-SA 3.0" } }
      ,{ category: "Kawa i historia", name: "Caffè Reggio", price: "$–$$", address: "119 MacDougal Street", note: "Kawa w historycznym wnętrzu bez konieczności pełnego posiłku. Dobra rezerwa przy deszczu albo zmęczeniu.", url: "https://www.caffereggio.com/" }
    ],
    variants: [
      { title: "Wersja podstawowa", text: "Brunch → Washington Square → historia → seriale → odpoczynek → Blue Note." },
      { title: "Po podróży brakuje energii", text: "Późniejszy brunch → Washington Square → Friends → Stonewall → Carrie i Magnolia → Blue Note. Pomijamy Jefferson Market i boczne ulice." },
      { title: "Bez seriali", text: "Washington Square → MacDougal → Minetta Lane → Stonewall → Commerce i Grove → Jefferson Market → kawiarnia → Blue Note." },
      { title: "Deszcz", text: "Brunch → najważniejsze punkty krótkimi odcinkami → dłuższa kawiarnia lub księgarnia → wcześniejsza kolejka. Nie dokładamy muzeum." }
    ],
    after: "Po koncercie: jeśli macie energię, krótki spacer przez Washington Square Park. W przeciwnym razie metro z West 4th Street do 42nd Street–Port Authority i pieszo do hotelu.",
    returnUrl: "https://www.google.com/maps/dir/?api=1&origin=Blue+Note+Jazz+Club,+131+W+3rd+St,+New+York&destination=Holiday+Inn+New+York+City+Times+Square,+585+8th+Ave&travelmode=transit",
    links: [
      { label: "Cały spacer w Mapach", url: "https://www.google.com/maps/dir/?api=1&origin=Washington+Square+Arch,+New+York&destination=Blue+Note+Jazz+Club,+131+W+3rd+St,+New+York&waypoints=MacDougal+Street,+New+York%7CStonewall+National+Monument,+New+York%7C90+Bedford+Street,+New+York%7C66+Perry+Street,+New+York&travelmode=walking" },
      { label: "Blue Note w Mapach", url: "https://www.google.com/maps/search/?api=1&query=Blue+Note+Jazz+Club+131+West+3rd+Street+New+York" },
      { label: "Hiromi · oficjalny koncert", url: "https://www.bluenotejazz.com/nyc/shows/?search=Hiromi" },
      { label: "Zasady Blue Note", url: "https://www.bluenotejazz.com/nyc/faqs/" },
      { label: "Stonewall Visitor Center", url: "https://stonewallvisitorcenter.org/visit/" },
      { label: "Hotel → Washington Square", url: "https://www.google.com/maps/dir/?api=1&origin=Holiday+Inn+New+York+City+Times+Square,+585+8th+Ave&destination=Washington+Square+Arch,+New+York&travelmode=transit" }
    ]
  },
  "2026-08-24": {
    kind: "moma",
    checked: "16.07.2026",
    timelineTargets: ["museum", "food", "shopping", "movie", "movie", "movie"],
    museum: {
      address: "11 West 53rd Street · wejście główne między Fifth i Sixth Avenue",
      practical: ["Poniedziałek: 10:30–17:30", "Dorośli: 30 USD · osoby poniżej 16 lat: bezpłatnie", "Bilet obejmuje kolekcję i wystawy czasowe", "Duże plecaki i torby mogą wymagać kontroli; idźcie lekko"],
      routes: [
        { title: "Trasa pełna · około 3 godzin", text: "10:30 piętro 5: modernizm i trzy ikony → 11:30 piętro 4: pop-art i design → 12:15 piętro 3: Frida i Diego → 12:50 poziomy T2/T1: „It’s Alive!”. Zostaje margines na sklep i zejścia między piętrami." },
        { title: "Trasa 90 minut · gdy muzeum męczy", text: "Piętro 5: Gwiaździsta noc, Panny z Awinionu i Nenufary → piętro 3: dwa wybrane dzieła Fridy i Rivery → 20 minut animacji na T2/T1. Bez poczucia, że trzeba „zaliczyć” cały budynek." }
      ],
      floors: [
        { title: "Piętro 5 · 1880–1950", text: "Zacznijcie od największych ikon. Szukajcie nie chronologii do zapamiętania, lecz trzech rewolucji: kolor Van Gogha, rozbicie perspektywy przez Picassa i zanurzenie widza w świetle Moneta.", look: "Numery sal mogą się zmienić. Rano otwórzcie mapę MoMA lub Bloomberg Connects." },
        { title: "Piętro 4 · 1950–1980", text: "Pop-art, minimalizm, konceptualizm i projektowanie. To najlepszy odcinek dla rozmowy z Matyldą: kiedy zwykłe opakowanie, krzesło albo znak stają się sztuką?", look: "Nie szukajcie wszystkiego. Wybierzcie Warhola oraz jeden przedmiot designu, który każde z Was zabrałoby do domu." },
        { title: "Piętro 3 · Frida i Diego", text: "Wystawa „Frida and Diego: The Last Dream” trwa od 21 marca do 12 września 2026. Łączy obrazy, rysunki i fotografie Kahlo i Rivery w teatralnej scenografii inspirowanej operą Metropolitan.", look: "Porównajcie, jak Frida buduje autobiografię, a Diego opowiada o społeczeństwie, pracy i rewolucji." },
        { title: "T2/T1 · sto lat animacji", text: "„It’s Alive! A Century of Animation” pokazuje ponad sto lat ruchomego obrazu: od Gertie the Dinosaur i Feliksa Kota po teledyski MTV i niezależną animację Nowego Jorku.", look: "Zwróćcie uwagę na rysunki, klatki i urządzenia — nie tylko na gotowy film." }
      ]
    },
    works: [
      { title: "Vincent van Gogh · Gwiaździsta noc", text: "Nocne niebo nie jest zapisem fotograficznym. Wiry, powtarzające się linie i kontrast błękitu z żółcią pokazują emocję i ruch. Stańcie najpierw daleko, potem podejdźcie i zobaczcie grubość farby." },
      { title: "Pablo Picasso · Panny z Awinionu", text: "Pięć postaci nie tworzy jednej naturalnej przestrzeni. Picasso pokazuje twarze i ciała z kilku stron naraz, rozbijając zasady perspektywy. To obraz ważny, ale również wymagający rozmowy o zawłaszczaniu form sztuki afrykańskiej." },
      { title: "Claude Monet · Nenufary", text: "Ogromny format działa jak otoczenie, nie okno z widokiem. Podejdźcie blisko, aż obraz stanie się plamami; potem odejdźcie, aby woda i odbicia złożyły się ponownie." },
      { title: "Andy Warhol · Puszki zupy Campbell", text: "Warhol użył wyglądu produktu z supermarketu i języka reklamy. Zapytajcie: czy powtarzalność odbiera przedmiotowi znaczenie, czy przeciwnie — czyni go ikoną? Lokalizację sprawdźcie w aplikacji muzeum." },
      { title: "Frida Kahlo · Autoportret z obciętymi włosami", text: "Kahlo przedstawia siebie w zbyt dużym męskim garniturze, z nożyczkami i włosami leżącymi na podłodze. Obraz można czytać jako komentarz do tożsamości, niezależności i burzliwej relacji z Riverą." },
      { title: "Diego Rivera · Przywódca agrarny Zapata", text: "Rivera przedstawia Emiliana Zapatę nie jako pomnikowego wodza, lecz przywódcę chłopów. Biała koszula, kosa i koń budują prosty, polityczny obraz ziemi, pracy i rewolucji." }
    ],
    animation: [
      { title: "Jak ożywa rysunek?", text: "Animacja wykorzystuje bezwładność wzroku: seria nieruchomych obrazów pokazana szybko tworzy wrażenie ruchu. Warto znaleźć szkice i klatki pośrednie — właśnie tam widać pracę ukrytą za kilkoma sekundami filmu." },
      { title: "Gertie, Felix i Koko", text: "Gertie the Dinosaur z 1914 roku pokazała, że rysunkowa postać może mieć osobowość. Felix the Cat i Koko the Clown rozwijały język gagów i transformacji, których kamera aktorska nie potrafiła wtedy wykonać." },
      { title: "Moduł Matyldy · wybierz własnego bohatera", text: "Zadanie nie polega na czytaniu wszystkich podpisów. Wybierz jedną postać albo technikę, zrób zdjęcie podpisu i odpowiedz: co twórca musiał narysować lub zbudować, zanim obraz zaczął się ruszać?" }
    ],
    shopping: [
      { category: "Najbardziej nowojorskie", name: "Nintendo NY", address: "10 Rockefeller Plaza", hours: "codziennie 11:00–19:00", note: "Dwa poziomy i około 930 m². Dobry kandydat na jeden z dwóch głównych sklepów: gry, ekspozycje i duże figury bohaterów.", url: "https://www.nintendo.com/us/new-york/" },
      { category: "Efekt wow", name: "LEGO Store Fifth Avenue", address: "636 Fifth Avenue", hours: "codziennie 10:00–20:00", note: "Tu sklep jest również atrakcją. Wejdźcie dla instalacji i modeli, nawet bez planu zakupów.", url: "https://www.lego.com/en-us/stores/store/fifth-avenue" },
      { category: "Moda sportowa", name: "Nike House of Innovation", address: "650 Fifth Avenue", hours: "sprawdź rano", note: "Duży flagowy sklep; wybierzcie go zamiast kolejnego sklepu odzieżowego, jeśli Matylda chce sneakersy lub personalizację.", url: "https://www.nike.com/retail/s/nike-nyc-house-of-innovation-000" },
      { category: "Szybki przystanek", name: "Uniqlo Fifth Avenue", address: "666 Fifth Avenue", hours: "sprawdź rano", note: "Praktyczne zakupy i przystępniejsze ceny. Ustalcie limit 20–30 minut, bo sklep jest bardzo duży.", url: "https://map.uniqlo.com/us/en/detail/10200003" },
      { category: "Kosmetyki", name: "Sephora Fifth Avenue", address: "580 Fifth Avenue", hours: "sprawdź rano", note: "Wariant zamiast Nintendo lub LEGO, nie dodatkowy trzeci duży sklep.", url: "https://www.sephora.com/happening/stores/5th-avenue" }
    ],
    food: [
      { category: "Szybko i różnorodnie", name: "Urban Hawker", price: "$–$$", address: "135 W 50th Street", note: "Hala inspirowana singapurskimi hawker centres. Każdy może wybrać coś innego, więc łatwo zmieścić lunch w godzinie.", url: "https://www.urbanhawker.com/" },
      { category: "Street food pod 30 Rock", name: "Miznon", price: "$$", address: "30 Rockefeller Plaza · Rink Level", note: "Pity i pieczony kalafior; szybki posiłek dokładnie przy dalszej trasie.", url: "https://www.rockefellercenter.com/dine/miznon" },
      { category: "Pizza dla całej trójki", name: "Ace’s Pizza", price: "$–$$", address: "30 Rockefeller Plaza · Rink Level", note: "Pizza sycylijska i Detroit style. Codziennie od 11:00; dobre, gdy nie chcecie tracić czasu na obsługę stolikową.", url: "https://www.rockefellercenter.com/dine/ace-s-pizza" },
      { category: "Drożej i spokojniej", name: "Le Rock", price: "$$$", address: "45 Rockefeller Plaza", note: "Nowoczesna brasserie w stylu art déco. Poniedziałkowy lunch od 11:30; warto rezerwować, ale tego dnia czasowo to wariant luksusowy.", url: "https://www.rockefellercenter.com/dine/le-rock" },
      { category: "Piknik przed filmem", name: "Hester Street Fair w Bryant Park", price: "$–$$", address: "Fountain Terrace · Bryant Park", note: "W dni filmowe sprzedawcy działają 16:00–20:30. Można też przynieść własny piknik.", url: "https://bryantpark.org/activities/movie-nights" }
    ],
    movie: {
      title: "King Creole · Elvis pod wieżowcami",
      intro: "24 sierpnia 2026 · 20:00–22:00 · film z 1958 roku · reż. Michael Curtiz",
      story: "Elvis gra młodego Danny’ego Fishera, który zaczyna śpiewać w klubach Nowego Orleanu i trafia między ambicję, przemoc oraz półświatek. To jeden z jego najlepiej ocenianych występów aktorskich. Reżyser Michael Curtiz nakręcił wcześniej Casablankę — dlatego musical ma też cień filmu noir.",
      listen: "Nie oczekujcie współczesnego tempa. Słuchajcie, jak muzyka rhythm and blues prowadzi fabułę, obserwujcie uliczny Nowy Orlean zbudowany przez Hollywood i zobaczcie Elvisa jako aktora, a nie tylko ikonę estrady.",
      schedule: ["16:00 · otwiera się żwirowa część i stoiska z jedzeniem", "17:00 · trawnik otwiera się, jeśli pogoda pozwoli", "17:30 · zakładany przyjazd i piknik", "20:00 · początek filmu", "22:00 · planowany koniec i spacer do hotelu"],
      rules: ["Koc musi być materiałowy", "Zakazane są krzesła, stoły, plastikowe podkłady, prześcieradła, plandeki, torby/pady do siedzenia i maty do jogi", "Torby i plecaki mogą być kontrolowane", "Na trawnik nie wolno wprowadzać zwierząt", "Można przynieść piknik; na miejscu są jedzenie, piwo i wino", "Film ma wyświetlane napisy"],
      returnUrl: "https://www.google.com/maps/dir/?api=1&origin=Bryant+Park,+New+York&destination=Holiday+Inn+New+York+City+Times+Square,+585+8th+Ave&travelmode=walking"
    },
    variants: [
      { title: "Pełny dzień", text: "MoMA 3 godziny → lunch → maksymalnie dwa duże sklepy i jeden szybki → hotel → Bryant Park." },
      { title: "Muzeum zaczyna męczyć", text: "Wybierzcie trasę 90 minut i dłuższy lunch. Nie próbujcie odzyskiwać czasu kolejnymi salami — zachowajcie energię na kino." },
      { title: "Zakupy są ważniejsze", text: "Kończymy MoMA około 13:00, wybieramy dwa sklepy Matyldy bez poczucia winy i wracamy do hotelu najpóźniej o 17:00." },
      { title: "Deszcz lub odwołany film", text: "MoMA można wydłużyć do 16:00, potem Rockefeller Center i spokojna kolacja. Bryant Park publikuje decyzję pogodową w swoich kanałach — nie jedziemy z kocem bez sprawdzenia." },
      { title: "Upał", text: "Więcej czasu wewnątrz MoMA i pod 30 Rock, woda przy każdym przejściu, zakupy skrócone. Na trawniku bluza może się przydać dopiero po zachodzie." }
    ],
    links: [
      { label: "Start dnia · hotel → MoMA", url: "https://www.google.com/maps/dir/?api=1&origin=Holiday+Inn+New+York+City+Times+Square,+585+8th+Ave,+New+York&destination=The+Museum+of+Modern+Art,+11+W+53rd+St,+New+York&travelmode=transit" },
      { label: "Cała trasa dzienna · hotel → MoMA → Rockefeller → hotel", url: "https://www.google.com/maps/dir/?api=1&origin=Holiday+Inn+New+York+City+Times+Square,+585+8th+Ave,+New+York&destination=Holiday+Inn+New+York+City+Times+Square,+585+8th+Ave,+New+York&waypoints=The+Museum+of+Modern+Art,+11+W+53rd+St,+New+York%7CRockefeller+Center,+45+Rockefeller+Plaza,+New+York&travelmode=walking" },
      { label: "Wieczór · hotel → Bryant Park", url: "https://www.google.com/maps/dir/?api=1&origin=Holiday+Inn+New+York+City+Times+Square,+585+8th+Ave,+New+York&destination=Bryant+Park,+New+York&travelmode=walking" },
      { label: "MoMA · godziny i bilety", url: "https://www.moma.org/visit/" },
      { label: "Mapa i przewodnik po piętrach MoMA", url: "https://www.moma.org/visit/guide" },
      { label: "Frida and Diego · oficjalna wystawa", url: "https://www.moma.org/calendar/exhibitions/5882" },
      { label: "It’s Alive! · oficjalna wystawa", url: "https://www.moma.org/calendar/exhibitions/5920" },
      { label: "Bloomberg Connects i dostępność", url: "https://www.moma.org/visit/accessibility/" },
      { label: "MoMA → Rockefeller Center", url: "https://www.google.com/maps/dir/?api=1&origin=The+Museum+of+Modern+Art,+11+W+53rd+St,+New+York&destination=Rockefeller+Center,+New+York&travelmode=walking" },
      { label: "Movie Nights · zasady i pogoda", url: "https://bryantpark.org/activities/movie-nights" }
    ]
  },
  "2026-08-25": {
    kind: "metday",
    checked: "16.07.2026",
    timelineTargets: ["guggenheim", "museum", "food", "park", "rest", "food", "theatre", "theatre"],
    guggenheim: {
      title: "Guggenheim · dziesięć minut z architekturą",
      text: "Frank Lloyd Wright otrzymał zlecenie w 1943 roku, lecz budynek otwarto dopiero 21 października 1959 — sześć miesięcy po jego śmierci. Zamiast tradycyjnych pięter zaprojektował spiralną rampę oplatającą rotundę. Budynek jest częścią światowego dziedzictwa UNESCO.",
      look: ["Bryła rozszerza się ku górze, odwrotnie niż typowy budynek", "Jedna ciągła spirala jest widoczna także na fasadzie", "Niska, organiczna forma świadomie kontrastuje z prostokątną siatką Manhattanu", "Stańcie po drugiej stronie Fifth Avenue, ale nie wchodźcie na jezdnię dla zdjęcia"]
    },
    museum: {
      practical: ["Wtorek: 10:00–17:00", "Dorośli 30 USD; Matylda jako 13-latka: 17 USD, nie bezpłatnie", "Bilet z wyprzedzeniem nie jest obowiązkowy, ale pozwala iść prosto do wejścia galerii", "The Met nie wydaje obecnie urządzeń audio — użyjcie własnych telefonów i Bloomberg Connects", "Galerie sztuki nowoczesnej i współczesnej są zamknięte z powodu przebudowy"],
      routes: [
        { title: "Trasa pełna · 4 godziny", text: "10:00 Egipt → 10:50 Dendur i Giacometti → 11:35 American Wing → 12:25 malarstwo europejskie → 13:20 Costume Art. To pięć obszarów, nie całe muzeum." },
        { title: "Trasa 2 godziny · plan ratunkowy", text: "Dendur i Giacometti → dwa arcydzieła malarstwa europejskiego → jedno piętro American Wing. Costume Art tylko jeśli wystawa wciągnie całą trójkę." }
      ],
      stops: [
        { title: "Egipt · droga do Dendur", text: "Nie zatrzymujcie się przy każdej gablocie. Wybierzcie jedną stelę, jeden sarkofag i jeden przedmiot codzienny, żeby zobaczyć religię, śmierć i zwykłe życie.", look: "Hieroglify nie są dekoracją: spróbujcie odnaleźć powtarzające się znaki i kierunek, w którym patrzą postacie.", related: [{ key: "metstory-0", label: "Jak uratowano Dendur?" }] },
        { title: "Świątynia Dendur + Giacometti", text: "Świątynię ukończono około 10 roku przed naszą erą. Egipt podarował ją USA po międzynarodowej akcji ratowania zabytków Nubii przed zalaniem przez Wielką Tamę Asuańską. Latem 2026 siedemnaście wydłużonych figur Giacomettiego prowadzi z nią dialog.", look: "Porównajcie ciężar piaskowca z kruchością smukłych figur oraz procesyjne ustawienie obu grup.", related: [{ key: "metstory-0", label: "Podróż świątyni" }, { key: "metstory-1", label: "Kim był Giacometti?" }] },
        { title: "American Wing", text: "To nie tylko obrazy, ale wnętrza, meble, szkło i opowieść o tym, kto budował definicję „amerykańskości”. Wybierzcie dziedziniec Engelhard Court i najwyżej dwie sale.", look: "Zobaczcie, jak muzeum zestawia dziś twórców rdzennych, afroamerykańskich, latynoskich, azjatycko-amerykańskich i europejsko-amerykańskich.", related: [{ key: "metstory-2", label: "The Met jak miasto" }] },
        { title: "Malarstwo europejskie", text: "Zamiast całego skrzydła wybierzcie kontrast: spokojne światło Vermeera, cielesny ruch Rembrandta lub impresjonistyczny kolor Moneta i Van Gogha. Lokalizację dzieł sprawdźcie rano.", look: "Każde z Was wybiera jedno dzieło i w jednym zdaniu mówi, dlaczego właśnie przed nim chce zostać dłużej.", related: [{ key: "metstory-2", label: "Skala muzeum" }] },
        { title: "Costume Art", text: "W 2026 Costume Institute otrzymał nowe stałe galerie Condé M. Nast. Traktujcie ubiór jak projekt, komunikat społeczny i technologię — nie tylko jak ładne suknie.", look: "Wybierzcie jeden detal konstrukcyjny oraz jeden strój, który mówi coś o pozycji lub tożsamości właściciela." }
      ]
    },
    stories: [
      { title: "Jak świątynia przepłynęła do Nowego Jorku", text: "Budowę Wielkiej Tamy Asuańskiej groziła zalaniem zabytków Nubii. Świątynię rozebrano na bloki, a Egipt podarował ją Stanom Zjednoczonym w podziękowaniu za udział w akcji UNESCO. The Met otrzymało ją w 1967 roku i otworzyło nowe skrzydło w 1978." },
      { title: "Giacometti: człowiek po katastrofie", text: "Wydłużone postacie Giacomettiego wyglądają jednocześnie jak ktoś daleko i ktoś, kto ocalał. Artysta fascynował się starożytnym Egiptem, dlatego zestawienie nie jest przypadkową dekoracją: oba światy pytają, jak utrwalić obecność człowieka." },
      { title: "The Met jako miasto w budynku", text: "Muzeum powstało w 1870 roku, ale dzisiejszy gmach jest wynikiem kolejnych rozbudów. Ma ponad dwa miliony stóp kwadratowych i dziesiątki tysięcy obiektów na widoku. Zgubienie się nie jest porażką — jest częścią jego skali." }
    ],
    park: {
      route: ["Wyjście z The Met i lunch na Upper East Side", "Bethesda Terrace i arkady z płytkami Minton", "Fontanna Bethesda i widok na jezioro", "Bow Bridge", "Strawberry Fields i mozaika Imagine", "Wyjście przy 72nd Street West i metro/taxi do hotelu"],
      notes: ["The Mall dodajcie tylko, jeśli jest czas i energia", "Nie próbujcie dojść pieszo aż do hotelu", "Przy upale skróćcie trasę po Bethesda Terrace i od razu jedźcie odpocząć"]
    },
    theatre: {
      title: "Stranger Things: The First Shadow",
      address: "Marquis Theatre · 210 W 46th Street",
      status: "Bilety kupione · 25.08.2026 · 19:00",
      schedule: ["17:45 · wczesna kolacja", "18:20 · wyjście w stronę teatru", "18:30 · kontrola i wejście", "19:00 · początek", "około 21:45 · koniec po jednej przerwie"],
      practical: ["Czas: 2 godziny 45 minut z jedną przerwą", "Rekomendowany wiek: 12+", "Osoby poniżej 16 lat muszą być z dorosłym", "Efekty obejmują wystrzały, huk, eksplozje, dym, mgłę, migające światła i stroboskopy", "W spektaklu występuje mocny język oraz przedstawienia problemów zdrowia psychicznego"],
      before: [
        { title: "Co trzeba pamiętać z serialu", text: "Historia rozgrywa się w Hawkins w 1959 roku, przed wydarzeniami z serialu. Wystarczy znać młodych wersji Joyce Maldonado, Jima Hoppera i Boba Newby’ego oraz wiedzieć, że Henry Creel stanie się centralną postacią mitologii serialu." },
        { title: "To prequel, nie odcinek na scenie", text: "Spektakl ma własną historię, ale rozwija pochodzenie zła znanego z serialu. Nie czytajcie streszczeń fabuły — największą przyjemnością są sceniczne iluzje i odkrywanie powiązań." },
        { title: "Jak patrzeć na efekty", text: "Zamiast próbować zgadnąć każdy trik, obserwujcie światło, dźwięk, ruch scenografii i to, gdzie kierowany jest wzrok widowni. Teatr tworzy „filmowy montaż” bez kamery." }
      ],
      returnUrl: "https://www.google.com/maps/dir/?api=1&origin=Marquis+Theatre,+210+W+46th+St,+New+York&destination=Holiday+Inn+New+York+City+Times+Square,+585+8th+Ave,+New+York&travelmode=walking"
    },
    food: [
      { category: "Lunch blisko muzeum", name: "The American Wing Cafe", price: "$$", address: "The Met · Floor 1", note: "Najmniej logistyki: kanapki, sałatki i napoje. Dobre, jeśli chcecie oszczędzić nogi, ale wymaga pozostania w muzeum.", url: "https://www.metmuseum.org/plan-your-visit/dining" },
      { category: "Upper East Side", name: "Tamam", price: "$", address: "1108 Lexington Ave", note: "Koszerny wegański falafel i pita; szybka opcja bez ciężkiego lunchu.", url: "https://www.tamamfalafel.com/" },
      { category: "Klasyczny lunch", name: "EJ’s Luncheonette", price: "$$", address: "1271 3rd Ave", note: "Amerykański diner: burgery, sałatki, pancakes. Wybór dla różnego apetytu.", url: "https://ejsluncheonette.com/" },
      { category: "Wczesna kolacja", name: "Pure Thai Cookhouse", price: "$$", address: "766 9th Ave", note: "Blisko hotelu, ale mały i popularny — tylko gdy nie ma kolejki lub macie rezerwację.", url: "https://www.purethaicookhouse.com/contact" },
      { category: "Bezpiecznie przed teatrem", name: "Los Tacos No. 1", price: "$", address: "229 W 43rd St", note: "Szybko, bez ryzyka przeciągniętej obsługi. Jedzenie na stojąco, więc po odpoczynku w hotelu.", url: "https://www.lostacos1.com/locations/" }
    ],
    variants: [
      { title: "Wersja pełna", text: "Guggenheim → 4 godziny w The Met → lunch → skrócony park → hotel → kolacja → teatr." },
      { title: "Muzealne zmęczenie", text: "Trasa The Met 2 godziny → wcześniejszy lunch → Bethesda i Strawberry Fields → dłuższy odpoczynek." },
      { title: "Upał lub ulewa", text: "Pomijamy Bow Bridge i The Mall. Po lunchu Bethesda Terrace albo od razu hotel; rezerwacja teatralna zostaje nietknięta." },
      { title: "Dla Matyldy", text: "W muzeum priorytet: Dendur + Giacometti, Costume Art i jeden obraz. Więcej czasu na zadania obserwacyjne, mniej na podpisy." }
    ],
    links: [
      { label: "Start · hotel → Guggenheim", url: "https://www.google.com/maps/dir/?api=1&origin=Holiday+Inn+New+York+City+Times+Square,+585+8th+Ave,+New+York&destination=Solomon+R+Guggenheim+Museum,+1071+5th+Ave,+New+York&travelmode=transit" },
      { label: "Spacer · Guggenheim → The Met", url: "https://www.google.com/maps/dir/?api=1&origin=Solomon+R+Guggenheim+Museum,+1071+5th+Ave,+New+York&destination=The+Metropolitan+Museum+of+Art,+1000+5th+Ave,+New+York&travelmode=walking" },
      { label: "Park · The Met → Bethesda → Bow Bridge → Strawberry Fields", url: "https://www.google.com/maps/dir/?api=1&origin=The+Metropolitan+Museum+of+Art,+1000+5th+Ave,+New+York&destination=Strawberry+Fields,+New+York&waypoints=Bethesda+Terrace,+New+York%7CBow+Bridge,+New+York&travelmode=walking" },
      { label: "The Met · informacje i bilety", url: "https://www.metmuseum.org/plan-your-visit" },
      { label: "Interaktywna mapa The Met", url: "https://maps.metmuseum.org/" },
      { label: "Giacometti przy Dendur", url: "https://www.metmuseum.org/exhibitions/giacometti-in-the-temple-of-dendur" },
      { label: "Architektura Guggenheima", url: "https://www.guggenheim.org/about-us/architecture/frank-lloyd-wright-and-the-guggenheim" },
      { label: "Stranger Things · oficjalne FAQ", url: "https://broadway.strangerthingsonstage.com/faqs/" },
      { label: "Hotel → Marquis Theatre", url: "https://www.google.com/maps/dir/?api=1&origin=Holiday+Inn+New+York+City+Times+Square,+585+8th+Ave,+New+York&destination=Marquis+Theatre,+210+W+46th+St,+New+York&travelmode=walking" }
    ]
  },
  "2026-08-26": {
    kind: "queens",
    checked: "16.07.2026",
    timelineTargets: ["food", "route", "food", "route", "tennis", "tennis"],
    route: [
      { time: "11:15–12:45", title: "Gantry Plaza · przemysłowa rama panoramy", text: "Zacznijcie przy dwóch monumentalnych suwnicach przeładunkowych i idźcie nabrzeżem na północ. Park ma około 12 akrów, a po drugiej stronie rzeki widać ONZ i Empire State Building.", look: "Ustawcie sylwetkę Manhattanu między nogami suwnicy. Zobaczcie, że Queens było zapleczem portowym i kolejowym, zanim stało się dzielnicą apartamentowców.", related: [{ key: "qstory-0", label: "Po co były suwnice?" }] },
      { time: "12:45–13:10", title: "Pepsi-Cola Sign", text: "Czerwony neon stał niegdyś na rozlewni Pepsi działającej przy nabrzeżu od 1938 roku. Fabrykę zamknięto i rozebrano, ale znak zachowano jako zabytek miejskiego krajobrazu.", look: "Najlepszy punkt orientacyjny to czerwone litery ustawione równolegle do East River; za nimi widać Midtown.", related: [{ key: "qstory-1", label: "Historia znaku Pepsi" }] },
      { time: "13:10–14:20", title: "Przejazd 7 do Flushing", text: "Linia 7 jest osią północnego Queens. Z okien naziemnego odcinka widać dzielnice ukształtowane przez kolejne fale migracji. Wysiądźcie na końcowej Flushing–Main Street.", look: "Obserwujcie zmianę szyldów, języków i zabudowy między Long Island City a Flushing.", related: [{ key: "qstory-2", label: "Dlaczego Flushing jest inne?" }] },
      { time: "14:20–16:15", title: "Flushing · spacer jedzeniowy", text: "To nie jedna „chińska restauracja”, lecz wiele regionalnych kuchni Chin oraz wpływy koreańskie i tajwańskie. Wybierzcie dwa małe dania i deser zamiast jednej ciężkiej uczty.", look: "Main Street, Roosevelt Avenue, podziemny food court New World Mall i kolejki mieszkańców, nie tylko turystyczne rankingi.", related: [{ panel: "food", label: "Wybierz jedzenie" }, { key: "qstory-3", label: "Jak jeść w food courcie?" }] },
      { time: "16:35–17:05", title: "Unisphere i ślady World’s Fair", text: "Stalowy glob o wysokości około 43 metrów został zbudowany jako symbol targów światowych 1964–65. Park wcześniej powstał na potrzeby targów 1939–40, na dawnych mokradłach i wysypisku popiołu.", look: "Orbity trzech pierwszych sztucznych satelitów i pozostałości New York State Pavilion w oddali.", related: [{ key: "qstory-4", label: "Dwie wystawy światowe" }] },
      { time: "17:30", title: "National Tennis Center", text: "Podejdźcie do wejścia bez zwykłych plecaków. Po kontroli znajdźcie stadion, toalety i punkt z wodą, zanim zacznie się sesja.", look: "Arthur Ashe Stadium jest największym stadionem tenisowym świata; sprawdźcie na bilecie, na którym obiekcie rozgrywany jest mikst.", related: [{ panel: "tennis", label: "Instrukcja stadionowa" }] }
    ],
    stories: [
      { title: "Suwnice, które ładowały wagony na barki", text: "Gantry to konstrukcja bramowa. Suwnice nad East River przenosiły całe wagony kolejowe między lądem a barkami. Zanim powstały tunele i nowoczesna logistyka, portowe Queens było kluczowym ogniwem dostaw dla Manhattanu." },
      { title: "Neon większy od budynku", text: "Znak Pepsi-Cola powstał w 1936 roku i przez dekady wisiał nad rozlewnią. Gdy fabrykę zamknięto w 1999 roku, neon przeniesiono i zachowano. Dzisiaj reklamuje już nie napój, lecz przemysłową pamięć nabrzeża." },
      { title: "Flushing: centrum migracyjnego Nowego Jorku", text: "Współczesne Flushing zostało ukształtowane szczególnie przez migrację z Tajwanu, Chin kontynentalnych, Korei i innych części Azji. To żywa dzielnica mieszkaniowa i handlowa, a nie dekoracyjny Chinatown dla turystów." },
      { title: "Food court jako mapa Azji", text: "W New World Mall stoiska reprezentują różne regiony i techniki: zupy makaronowe, pierożki, potrawy tajwańskie, syczuańskie czy północnochińskie. Najlepsza strategia dla trzech osób to dzielenie się daniami i zamawianie etapami." },
      { title: "Od Doliny Popiołów do świata jutra", text: "Teren Flushing Meadows był mokradłem i wysypiskiem popiołów, które F. Scott Fitzgerald przetworzył literacko w Wielkim Gatsbym. Robert Moses wykorzystał targi 1939 roku do stworzenia parku. Targi 1964 roku pozostawiły Unisphere, pawilony i futurystyczną wizję, która dziś wygląda retro." }
    ],
    tennis: {
      title: "US Open Mixed Doubles Championship",
      status: "Bilety kupione · 26.08.2026 · 19:00",
      schedule: ["17:30 · kontrola i wejście", "18:00 · orientacja, jedzenie, toaleta i woda", "18:40 · miejsca na stadionie", "19:00 · półfinały i finał", "koniec zależny od liczby oraz długości meczów"],
      rules: ["Jedna torba na osobę, maks. 12 × 12 × 16 cali", "Zwykłe plecaki są zakazane; wyjątek stanowi jednokomorowy worek ze sznurkiem", "Butelka wielorazowa metalowa lub plastikowa: maks. 24 oz", "Zakazane: szkło, puszki, alkohol, laptopy, selfie sticki, statywy, flagi i rakiety tenisowe", "Nie ma przechowalni wewnątrz; płatne punkty są poza głównymi wejściami", "Transport publiczny jest rekomendowany; aplikacja US Open pokazuje kolejki do bram"],
      basics: [
        { title: "Punktacja w jednym zdaniu", text: "Punkty w gemie liczy się 15, 30, 40 i gem. Przy 40–40 jest równowaga; dokładny regulamin miksta może stosować decydujący punkt zamiast przewag, dlatego przed sesją sprawdzimy format 2026." },
        { title: "Set i mecz", text: "Set zwykle wygrywa para, która pierwsza zdobędzie sześć gemów z przewagą dwóch; przy 6–6 rozgrywa się tie-break. Format miksta bywa skrócony, więc aplikacja przypomni aktualne zasady przed wejściem." },
        { title: "Dlaczego mikst jest ciekawy", text: "W parze gra kobieta i mężczyzna, ale role nie są sztywne. Najciekawsze są komunikacja, ustawienie przy siatce, przejmowanie środka kortu i decyzje, do kogo kierować serwis." },
        { title: "Kiedy wolno wstać?", text: "Podczas wymiany i pomiędzy punktami pozostajemy na miejscu i zachowujemy ciszę. Przemieszczanie widzów odbywa się głównie przy zmianie stron, gdy obsługa otwiera przejścia." },
        { title: "Sygnały, które warto obserwować", text: "Gracze zasłaniają dłonią sygnały za plecami, ustalając kierunek serwisu i ruch partnera. Po każdym punkcie często dotykają dłoni — także po błędzie — aby utrzymać wspólny rytm." },
        { title: "Jak czytać tablicę", text: "Najpierw wynik w setach, potem gemy w aktualnym secie, a na końcu punkty w gemie. Strzałka lub oznaczenie przy nazwisku wskazuje osobę serwującą." }
      ],
      etiquette: ["Cisza od przygotowania do serwisu do końca punktu", "Brawa po dobrych wymianach i efektownych akcjach obu par", "Nie używamy lampy błyskowej", "Nie nagrywamy ani nie transmitujemy gry", "Wstajemy tylko wtedy, gdy pozwoli obsługa", "Piłkę złapaną na trybunach oddajemy obsłudze, jeśli zostaniemy o to poproszeni"],
      returnUrl: "https://www.google.com/maps/dir/?api=1&origin=USTA+Billie+Jean+King+National+Tennis+Center,+Flushing,+NY&destination=Holiday+Inn+New+York+City+Times+Square,+585+8th+Ave,+New+York&travelmode=transit"
    },
    food: [
      { category: "Śniadanie · klasyczny diner", name: "Westway Diner", price: "$$", address: "614 9th Ave · około 8 minut od hotelu", note: "Jajka, pancakes, french toast i pełne amerykańskie śniadania. Otwarty codziennie od 7:00; najlepszy wybór, jeśli chcecie usiąść i zacząć dzień bez pośpiechu.", url: "https://www.westwaydiner.com/" },
      { category: "Śniadanie · szybko i nowojorsko", name: "Best Bagel & Coffee", price: "$", address: "225 W 35th St · około 7 minut od hotelu", note: "Bajgle wypiekane na miejscu, kanapki śniadaniowe i kawa. W dni robocze od 6:00; kolejka bywa długa, ale przesuwa się szybko.", url: "https://bestbagelandcoffee.com/" },
      { category: "Śniadanie · spokojniej przy stoliku", name: "Friedman’s Hell’s Kitchen", price: "$$", address: "450 10th Ave", note: "Pełne śniadanie, m.in. jajka, breakfast burrito i opcje bezglutenowe. We wtorek od 8:00; lokal jest w przeciwną stronę niż metro 7, więc wybieramy go tylko przy spokojnym poranku.", url: "https://www.friedmansrestaurant.com/location/hells-kitchen-friedmans-restaurant/" },
      { category: "Największy wybór", name: "New World Mall Food Court", price: "$–$$", address: "136-20 Roosevelt Ave · poziom dolny", note: "Ponad 30 stoisk. Dobre dla trzech różnych apetytów; zamawiajcie po jednym daniu i dzielcie się przy wspólnym stole.", url: "https://www.newworldmallnyc.com/food-court" },
      { category: "Soup dumplings", name: "Nan Xiang Xiao Long Bao", price: "$$", address: "39-16 Prince St #104", note: "Pierogi z gorącym bulionem. Nakłuć lub odgryźć mały otwór, wypić bulion i dopiero zjeść — nie wkładać całego od razu do ust.", url: "https://nanxiangxiaolongbao.com/locations/" },
      { category: "Mała porcja po drodze", name: "White Bear", price: "$", address: "135-02 Roosevelt Ave", note: "Znane wontony z olejem chili. Lokal jest niewielki; traktujcie jako jeden przystanek crawl, nie pełny posiłek.", url: "https://www.google.com/maps/search/?api=1&query=White+Bear+135-02+Roosevelt+Ave+Flushing+NY" },
      { category: "Chińska piekarnia", name: "Tai Pan Bakery", price: "$", address: "37-25 Main St", note: "Bułeczki słodkie i wytrawne, tarty jajeczne oraz napoje. Dobry deser lub jedzenie do ręki przed parkiem.", url: "https://www.taipanbakery.com/locations.html" },
      { category: "Na stadionie", name: "US Open concessions", price: "$$–$$$", address: "National Tennis Center", note: "Wygodnie, lecz drożej. Po Flushing wystarczy napój lub przekąska zamiast kolejnej pełnej kolacji.", url: "https://www.usopen.org/en_US/visit/at_the_open.html" }
    ],
    variants: [
      { title: "Wersja pełna", text: "Gantry i Pepsi → linia 7 → food crawl → Unisphere → wejście 17:30 → tenis." },
      { title: "Upał", text: "Skróćcie nabrzeże do 45 minut, zjedzcie w klimatyzowanym New World Mall i jedźcie bezpośrednio do stadionu. Unisphere tylko przy zapasie energii." },
      { title: "Zmęczenie po Broadwayu", text: "Późniejszy start → Gantry i Pepsi → jedno miejsce w Flushing → stadion. Pomijamy Unisphere, choć jest blisko kompleksu." },
      { title: "Deszcz", text: "Krótki Gantry lub pominięcie nabrzeża → dłuższy moduł kulinarny pod dachem → wcześniejsze wejście. Stała sesja tenisowa pozostaje." }
    ],
    links: [
      { label: "Start · hotel → Gantry Plaza", url: "https://www.google.com/maps/dir/?api=1&origin=Holiday+Inn+New+York+City+Times+Square,+585+8th+Ave,+New+York&destination=Gantry+Plaza+State+Park,+Queens,+NY&travelmode=transit" },
      { label: "Spacer · Gantry → Pepsi-Cola Sign", url: "https://www.google.com/maps/dir/?api=1&origin=Gantry+Plaza+State+Park,+Queens,+NY&destination=Pepsi-Cola+Sign,+Queens,+NY&travelmode=walking" },
      { label: "Pepsi Sign → Flushing–Main Street", url: "https://www.google.com/maps/dir/?api=1&origin=Pepsi-Cola+Sign,+Queens,+NY&destination=Flushing-Main+Street+Station,+Queens,+NY&travelmode=transit" },
      { label: "Food crawl · New World Mall → Nan Xiang → Tai Pan", url: "https://www.google.com/maps/dir/?api=1&origin=New+World+Mall,+Flushing,+NY&destination=Tai+Pan+Bakery,+37-25+Main+St,+Flushing,+NY&waypoints=Nan+Xiang+Xiao+Long+Bao,+39-16+Prince+St,+Flushing,+NY&travelmode=walking" },
      { label: "Flushing → Unisphere → US Open", url: "https://www.google.com/maps/dir/?api=1&origin=Flushing-Main+Street+Station,+Queens,+NY&destination=USTA+Billie+Jean+King+National+Tennis+Center,+Flushing,+NY&waypoints=Unisphere,+Queens,+NY&travelmode=walking" },
      { label: "Gantry Plaza · oficjalne informacje", url: "https://parks.ny.gov/visit/state-parks/gantry-plaza-state-park" },
      { label: "US Open · plan wizyty", url: "https://www.usopen.org/en_US/visit/plan_your_visit.html" },
      { label: "US Open · torby i przedmioty zakazane", url: "https://www.usopen.org/en_US/visit/prohibited_items.html" },
      { label: "US Open · dojazd", url: "https://www.usopen.org/en_US/news/articles/2026-03-04/how_to_get_to_the_us_open.html" }
      ,{ label: "Powrót · US Open → hotel", url: "https://www.google.com/maps/dir/?api=1&origin=USTA+Billie+Jean+King+National+Tennis+Center,+Flushing,+NY&destination=Holiday+Inn+New+York+City+Times+Square,+585+8th+Ave,+New+York&travelmode=transit" }
    ]
  },
  "2026-08-27": {
    kind: "westside", checked: "16.07.2026",
    timelineTargets: ["ferry", "photos", "photos", "downtown", "food", "museum", "route", "evening"],
    ferry: {
      schedule: ["08:15 · wyjście z hotelu", "około 08:50 · NYC Ferry z Midtown West/Pier 79", "około 09:30 · St. George i przejście do terminalu miejskiego", "około 10:00 · bezpłatny Staten Island Ferry", "około 10:25 · Whitehall Terminal na Manhattanie"],
      notes: ["NYC Ferry jest płatne i ma mniejsze jednostki; bilet kupujemy w oficjalnej aplikacji", "Staten Island Ferry jest bezpłatny — nie kupujcie żadnych biletów od naganiaczy", "Rozkłady mogą się zmienić; aplikacja pokazuje plan, ale rano sprawdzamy odjazdy na żywo", "Po dopłynięciu do St. George trzeba wyjść z pierwszego promu i przejść do właściwej hali Staten Island Ferry"]
    },
    photos: {
      onboard: [
        { title: "Pier 79 → St. George", text: "Przy wypłynięciu wybierzcie prawą burtę, patrząc w kierunku rejsu. Gdy miniecie dolny Manhattan, Statua pojawi się po stronie portu. Na mniejszym NYC Ferry warto od razu sprawdzić, gdzie dostępny jest otwarty pokład." },
        { title: "St. George → Whitehall", text: "Na powrocie wybierzcie lewą burtę. Na dużym Staten Island Ferry ustawcie się przy zewnętrznej barierce jeszcze przed najlepszym fragmentem rejsu — później może zrobić się tłoczno." },
        { title: "Jak ustawić trzy osoby", text: "Nie stawajcie wszyscy przy samej barierce. Dwie osoby około półtora metra przed fotografującym, Statua pomiędzy głowami lub lekko z boku. Potem zmiana fotografa i na końcu prośba do innego pasażera o wspólny kadr." },
        { title: "Telefon i kadr", text: "Użyjcie obiektywu 2× lub 3×, jeśli światło jest dobre — szeroki kąt pomniejszy Statuę. Włączcie serię zdjęć albo Live Photo, trzymajcie horyzont prosto i zostawcie trochę przestrzeni nad pochodnią." },
        { title: "Moment zdjęcia", text: "Nie fotografujcie dopiero wtedy, gdy Statua jest idealnie z boku. Zacznijcie wcześniej i zróbcie serię: sylwetka będzie stopniowo rosnąć, a w tle zmieni się układ Manhattanu i New Jersey." }
      ],
      shore: [
        { title: "Battery Park i promenada przy Pier A · po drodze", text: "Najłatwiejszy punkt tego dnia. Statua jest dość daleko, ale można połączyć ją z wodą, drzewami i portowym krajobrazem. Najlepiej użyć 3× i stanąć tak, aby w pierwszym planie nie było tłumu." },
        { title: "The Hills / Outlook Hill na Governors Island · osobna opcja", text: "Podwyższony punkt z czystą panoramą portu i dobrą perspektywą na Statuę. Wymaga dodatkowego promu i co najmniej dwóch godzin, więc nie dokładamy go do tego dnia." },
        { title: "Louis Valentino Jr. Park w Red Hook · najlepszy brzeg Brooklynu", text: "Bardzo dobry, spokojniejszy widok na Statuę przez wodę. Dojazd jest niewygodny względem obecnego planu; warto zachować jako alternatywę na dzień brooklyński." },
        { title: "Liberty State Park w New Jersey · widok frontalny", text: "Jeden z najlepszych lądowych punktów, ale wymaga osobnej wyprawy do New Jersey. Nie ma sensu wciskać go między Whitney i High Line." }
      ]
    },
    downtown: {
      route: [
        { title: "Battery Park i Charging Bull", text: "Od Whitehall przejdźcie przez Battery Park do Bowling Green. Przy Byku kolejka do klasycznego zdjęcia bywa długa — zróbcie również szerszy kadr pokazujący tłum i finansową dzielnicę.", related: [{ key: "wstory-5", label: "Skąd wziął się Byk?" }] },
        { title: "Wall Street i Fearless Girl", text: "Przejdźcie obok fasady New York Stock Exchange. Fearless Girl stoi dziś przed giełdą, a nie naprzeciw Charging Bull, jak po ustawieniu w 2017 roku.", related: [{ key: "wstory-6", label: "Byk i dziewczynka" }] },
        { title: "9/11 Memorial", text: "Dwa baseny zajmują obrysy bliźniaczych wież. Muzeum pomijacie; na sam memoriał przeznaczcie 30–40 minut i nie traktujcie go jak zwykłego punktu fotograficznego.", related: [{ key: "wstory-7", label: "Jak czytać memoriał?" }] }
      ]
    },
    museum: {
      practical: ["Czwartek 10:30–18:00", "Dorośli 30 USD; osoby do 25 lat wchodzą bezpłatnie", "Bilety z wyprzedzeniem są rekomendowane", "Whitney Biennial kończy się 23 sierpnia — cztery dni przed wizytą", "Zdjęcia bez lampy, statywu i selfie sticka"],
      routes: [{ title: "Trasa 2 godziny 15 minut", text: "Winda wysoko i schodzenie w dół: tarasy → „Untitled” (America) → Andy Warhol → Mabel Dwight → Dyani White Hawk. Rano potwierdzamy piętra." },{ title: "Trasa 75 minut", text: "Tarasy → Mabel Dwight jako opowieść o Nowym Jorku → jedna wystawa wybrana z Matyldą → kawa lub sklep." }],
      stops: [
        { title: "Tarasy i budynek Renza Piano", text: "Zewnętrzne schody i tarasy łączą sztukę z Hudsonem, High Line i przemysłowym krajobrazem.", look: "Little Island, Day’s End Davida Hammonsa, nabrzeże i początek High Line.", related: [{ key: "wstory-0", label: "Dlaczego Whitney jest tutaj?" }] },
        { title: "„Untitled” (America)", text: "Wystawa pyta, czym jest Ameryka i kto ma prawo ją przedstawiać. Wybierzcie dwa dzieła pokazujące sprzeczne obrazy kraju.", look: "Tożsamość, historia i różnica między opowieścią osobistą a narodowym symbolem." },
        { title: "Andy Warhol Family Album", text: "Warhol pojawia się przez rodzinne materiały, nie tylko jako producent ikon pop-artu. To rozmowa o prywatnym i publicznym wizerunku.", look: "Porównajcie intymność albumu z chłodnym, powielanym obrazem Warhola.", related: [{ key: "wstory-1", label: "Warhol i Instagram" }] },
        { title: "Mabel Dwight · Cool Head, Warm Heart", text: "Litografie pokazują tłum, teatr, metro i zwykły Nowy Jork z humorem oraz społeczną uważnością. Wystawa trwa do 30 sierpnia.", look: "Gesty ludzi, kierunek ruchu tłumu i atmosfera budowana czernią i bielą.", related: [{ key: "wstory-2", label: "Artystka miejskiego tłumu" }] },
        { title: "Dyani White Hawk · Nourish", text: "Artystka łączy abstrakcję z tradycjami Lakota i pracą koralikową, korygując białą narrację amerykańskiego modernizmu.", look: "Rytm, symetria i materialność dzieła." }
      ]
    },
    stories: [
      { title: "Whitney na styku miasta i rzeki", text: "Muzeum założone przez Gertrude Vanderbilt Whitney otworzyło budynek Renza Piano w 2015 roku. Tarasy skierowane ku High Line dały instytucji więcej miejsca i wpisały ją w przemianę Meatpacking." },
      { title: "Warhol: prywatny człowiek za fabryką wizerunków", text: "Warhol zamieniał gwiazdy, towary i prasowe fotografie w powtarzane obrazy. Rodzinny album przypomina, że jego publiczna persona była konstrukcją — podobnie jak dzisiejszy profil w mediach społecznościowych." },
      { title: "Mabel Dwight i demokratyczna grafika", text: "Dwight wybrała litografię, bo odbitka mogła istnieć w wielu egzemplarzach. Bohaterami byli pasażerowie, robotnicy, widzowie teatru i ludzie na ulicach." },
      { title: "High Line: kolej zamieniona w park", text: "Linię towarową nad ulicami otwarto w 1934 roku. Po upadku przemysłu zarosła, lecz mieszkańcy obronili ją przed rozbiórką. Pierwszy odcinek parku otwarto w 2009 roku." },
      { title: "Meatpacking: od rzeźni do luksusu", text: "Dzielnica była centrum przetwórstwa mięsa, chłodni i nocnej pracy. Później stała się obszarem klubów i społeczności LGBTQ+, a następnie butików, restauracji i drogich mieszkań." },
      { title: "Charging Bull: nielegalny prezent dla miasta", text: "Arturo Di Modica ustawił byka bez zezwolenia przed nowojorską giełdą w grudniu 1989 roku, jako symbol siły po krachu 1987. Policja go usunęła, lecz reakcja mieszkańców doprowadziła do ustawienia rzeźby przy Bowling Green." },
      { title: "Byk i Fearless Girl", text: "Fearless Girl pojawiła się naprzeciw Byka w 2017 roku jako kampania dotycząca kobiet w zarządach firm. Później przeniesiono ją przed New York Stock Exchange. Obie rzeźby prowadzą dziś spór o władzę, reklamę i znaczenie przestrzeni publicznej." },
      { title: "Jak czytać 9/11 Memorial", text: "Baseny North Pool i South Pool wyznaczają obrysy wież, ale nie stoją dokładnie na fundamentach konstrukcyjnych. Nazwiska rozmieszczono według relacji i wspólnot, a nie alfabetu. Puste niebo nad basenami jest równie ważne jak spadająca woda." }
    ],
    route: [
      { time: "13:00", title: "Lunch i Meatpacking", text: "Zjedzcie przed High Line. Gansevoort Street pokazuje bruk, dawne magazyny i dzisiejsze butiki.", look: "Zadaszenia dawnych zakładów i ślady infrastruktury towarowej.", related: [{ key: "wstory-4", label: "Od mięsa do luksusu" }, { panel: "food", label: "Wybierz lunch" }] },
      { time: "14:00", title: "High Line przy Gansevoort", text: "Park prowadzi po dawnym wiadukcie, więc wysokość i zakręty wynikają z obsługi magazynów.", look: "Tory wtopione w nasadzenia i budynki, przez które jechał pociąg.", related: [{ key: "wstory-3", label: "Historia High Line" }] },
      { time: "14:40", title: "Chelsea Market i 15th Street", text: "Kompleks mieścił fabrykę Nabisco, gdzie produkowano między innymi Oreo.", look: "Przejście przez budynek i widok na dawne magazyny portowe." },
      { time: "15:15", title: "Galerie Chelsea · opcjonalnie", text: "Zejdźcie między 20th a 24th Street tylko przy ochocie na więcej sztuki. Wystawy sprawdzimy tuż przed podróżą.", look: "Wielkie białe sale w dawnych budynkach przemysłowych." },
      { time: "16:00", title: "10th Avenue Square", text: "Drewniana widownia z wielkim oknem na ruch uliczny. Dziesięć minut siedzenia jest częścią trasy.", look: "Samochody i piesi jako miejski spektakl." },
      { time: "16:30", title: "Hudson Yards i Vessel", text: "Wieżowce stoją na platformie nad czynną stacją postojową kolei. Vessel oglądacie z zewnątrz.", look: "Kontrast niskiej Chelsea z nową dzielnicą nad torami." }
    ],
    food: [
      { category: "Lunch · Downtown", name: "Hudson Eats at Brookfield Place", price: "$–$$$", address: "230 Vesey St", note: "Duży wybór i widok na Hudson; logistycznie najłatwiejszy po memoriale 9/11 przed przejazdem do Whitney.", url: "https://bfplny.com/directory/food/" },
      { category: "Lunch · szybko", name: "Pisillo Italian Panini", price: "$–$$", address: "97 Nassau St", note: "Bardzo duże włoskie kanapki do podziału. Wariant bez długiej obsługi, jeśli chcecie ochronić czas Whitney.", url: "https://www.pisillopanini.com/" },
      { category: "W muzeum", name: "Frenchette Bakery at the Whitney", price: "$$", address: "Whitney · Floor 1", note: "Kawa, wypieki i lunch bez dodatkowego chodzenia; w czwartek do 18:00.", url: "https://whitney.org/visit/dining" },
      { category: "Wiele opcji", name: "Chelsea Market", price: "$–$$$", address: "75 9th Ave", note: "Łatwy wybór przy różnych apetytach, ale w porze lunchu tłoczny. Ustalcie punkt spotkania.", url: "https://www.chelseamarket.com/" },
      { category: "Szybko", name: "Los Mariscos", price: "$$", address: "Chelsea Market", note: "Tacos i ceviche z owocami morza; sprawniej niż pełny posiłek przy stoliku.", url: "https://www.losmariscos1.com/" },
      { category: "Drożej", name: "Pastis", price: "$$$", address: "52 Gansevoort St", note: "Nowojorska brasserie; tylko z rezerwacją i gdy chcecie spokojniejszy lunch.", url: "https://pastisnyc.com/" },
      { category: "Wieczór", name: "Koreatown food crawl", price: "$–$$$", address: "W 32nd St", note: "Koreański fried chicken, barbecue albo deser — zależnie od energii.", url: "https://www.google.com/maps/search/?api=1&query=Koreatown+restaurants+West+32nd+Street+New+York" }
    ],
    evening: [
      { title: "Domyślnie · spokojna kolacja", text: "Koreatown albo Hell’s Kitchen bez biletu, kolejki i presji dobrej pogody." },
      { title: "SUMMIT One Vanderbilt", text: "Tylko przy dobrej widoczności. Bilet kupujemy tego samego dnia po sprawdzeniu pogody." },
      { title: "Little Island i Hudson", text: "Bezpłatny zachód słońca, ale wymaga powrotu na południe. Lepiej połączyć z wcześniejszym końcem High Line." },
      { title: "Koreatown dla Matyldy", text: "K-beauty, przekąski, photobooth albo karaoke — najbardziej współczesny i najmniej muzealny wariant." }
    ],
    variants: [
      { title: "Nowy plan pełny", text: "Dwa promy → Downtown → lunch → Whitney 90–120 minut → High Line → Hudson Yards i kolacja." },
      { title: "Spokojniejsza wersja pierwotna", text: "Późny start → Whitney 2:15 → lunch → High Line → Hudson Yards. Pomijamy promy i Downtown." },
      { title: "Upał", text: "Promy → krótki Downtown → lunch pod dachem → Whitney → tylko wybrany odcinek High Line." },
      { title: "Deszcz", text: "Rezygnujemy z fotograficznej części promowej albo płyniemy wewnątrz → Downtown → Whitney → Chelsea Market i metro." }
    ],
    links: [
      { label: "Start · hotel → Midtown West/Pier 79", url: "https://www.google.com/maps/dir/?api=1&origin=Holiday+Inn+New+York+City+Times+Square,+585+8th+Ave,+New+York&destination=Midtown+West+NYC+Ferry+Landing,+West+39th+Street,+New+York&travelmode=walking" },
      { label: "Lower Manhattan · Whitehall → Bull → Wall St → 9/11", url: "https://www.google.com/maps/dir/?api=1&origin=Whitehall+Terminal,+New+York&destination=9%2F11+Memorial,+New+York&waypoints=Charging+Bull,+New+York%7CNew+York+Stock+Exchange,+New+York&travelmode=walking" },
      { label: "9/11 Memorial → Whitney", url: "https://www.google.com/maps/dir/?api=1&origin=9%2F11+Memorial,+New+York&destination=Whitney+Museum,+99+Gansevoort+St,+New+York&travelmode=transit" },
      { label: "Cała trasa · Whitney → High Line → Hudson Yards", url: "https://www.google.com/maps/dir/?api=1&origin=Whitney+Museum,+99+Gansevoort+St,+New+York&destination=Vessel,+Hudson+Yards,+New+York&waypoints=Chelsea+Market,+New+York%7CHigh+Line+10th+Avenue+Square,+New+York&travelmode=walking" },
      { label: "Powrót · Hudson Yards → hotel", url: "https://www.google.com/maps/dir/?api=1&origin=Vessel,+Hudson+Yards,+New+York&destination=Holiday+Inn+New+York+City+Times+Square,+585+8th+Ave,+New+York&travelmode=walking" },
      { label: "Whitney · wizyta i bilety", url: "https://whitney.org/visit" },
      { label: "Whitney · aktualne wystawy", url: "https://whitney.org/exhibitions" },
      { label: "Mabel Dwight", url: "https://whitney.org/exhibitions/mabel-dwight" },
      { label: "Andy Warhol Family Album", url: "https://whitney.org/exhibitions/andy-warhol-family-album" },
      { label: "High Line · oficjalna strona", url: "https://www.thehighline.org/visit/" },
      { label: "NYC Ferry · St. George", url: "https://www.ferry.nyc/routes-and-schedules/st-george/" },
      { label: "Staten Island Ferry · rozkład", url: "https://www.nyc.gov/html/dot/html/ferrybus/siferryschedule.shtml" },
      { label: "9/11 Memorial · oficjalne informacje", url: "https://www.911memorial.org/visit" },
      { label: "Zdjęcie z brzegu · Louis Valentino Park", url: "https://www.google.com/maps/search/?api=1&query=Louis+Valentino+Jr+Park+and+Pier+Brooklyn" },
      { label: "Hotel → Koreatown", url: "https://www.google.com/maps/dir/?api=1&origin=Holiday+Inn+New+York+City+Times+Square,+585+8th+Ave,+New+York&destination=Koreatown,+West+32nd+Street,+New+York&travelmode=walking" }
    ]
  },
  "2026-08-28": {
    kind: "sohoyankees", checked: "16.07.2026",
    timelineTargets: ["route", "shopping", "food", "rest", "transport", "stadium", "baseball"],
    route: [
      { time: "10:30", title: "Greene Street", text: "Najlepszy początek opowieści o żeliwnych fasadach. Powtarzalne kolumny wyglądały jak kamień, ale można je było produkować w fabryce i szybko składać na miejscu.", look: "Numery 72–76 i 28–30 Greene Street; porównajcie rytm okien, kolumny i schody pożarowe.", related: [{ key: "systory-0", label: "Dlaczego cast iron?" }] },
      { time: "11:05", title: "Mercer i Prince Street", text: "Dawne lofty produkcyjne stały się mieszkaniami artystów, a później jednymi z najdroższych adresów miasta.", look: "Wielkie okna, wysokie partery i kostka brukowa przypominająca o dostawach towaru.", related: [{ key: "systory-1", label: "Artyści kontra miasto" }] },
      { time: "11:35", title: "Broadway i Spring Street", text: "Tu architektura miesza się z najbardziej komercyjnym SoHo. Od tego miejsca Matylda przejmuje wybór sklepów.", look: "Haughwout Building przy 488 Broadway i jego pionowy rytm fasady.", related: [{ key: "systory-2", label: "Pierwsza winda Otisa" }] },
      { time: "14:15", title: "Nolita i Elizabeth Street", text: "Mniejsza skala, niezależne butiki i kawiarnie. To łagodne przejście od zakupów do lunchu.", look: "Niskie kamienice, ogród Elizabeth Street Garden i kontrast z zatłoczonym Broadwayem." }
    ],
    stories: [
      { title: "Żeliwo — XIX-wieczny prefabrykat", text: "Elementy fasady odlewano seryjnie, transportowano na plac budowy i skręcano. Pozwalało to budować szybciej, tworzyć wielkie okna i naśladować kosztowny kamień. Dzisiejsza elegancja SoHo zaczęła się jako praktyczna architektura handlu i przemysłu." },
      { title: "Jak artyści uratowali SoHo", text: "Po upadku przemysłu wielkie lofty stały puste. W latach sześćdziesiątych artyści zajmowali je często nielegalnie, bo zapewniały światło i miejsce do pracy. Walka o legalizację mieszkania w budynkach przemysłowych pomogła ocalić dzielnicę przed wyburzeniem." },
      { title: "Haughwout Building i próba zaufania windzie", text: "W 1857 roku uruchomiono tu jedną z pierwszych komercyjnych wind pasażerskich Elishy Otisa. Jego hamulec bezpieczeństwa pomógł przekonać ludzi, że budowanie i korzystanie z wyższych pięter może być bezpieczne." },
      { title: "SoHo: od pracowni do globalnej marki", text: "Galerie i artyści stworzyli atrakcyjność dzielnicy, za którą przyszły marki, turyści i wysokie czynsze. To klasyczny nowojorski paradoks: kultura podnosi wartość miejsca, a następnie bywa przez tę wartość wypierana." },
      { title: "Yankees–Red Sox: więcej niż jeden mecz", text: "Rywalizacja rosła przez ponad sto lat, a jej najsłynniejszym symbolem stało się przejście Babe’a Rutha z Bostonu do Yankees w 1919 roku. Dziś mecz ma sens nawet bez znajomości tabeli — publika reaguje mocniej na każdy pojedynek i każdą prowokację między klubami." }
    ],
    shopping: [
      { category: "Sneakersy", name: "Kith", address: "337 Lafayette St", note: "Streetwear i sneakersy; dobry punkt główny, ale kolejka i limitowane kolekcje mogą zabrać czas.", url: "https://kith.com/pages/store-locator" },
      { category: "Moda", name: "Aritzia SoHo", address: "524 Broadway", note: "Duży sklep popularnej marki; traktować jako jeden z dwóch głównych wyborów.", url: "https://www.aritzia.com/us/en/store?StoreID=aritzia-soho" },
      { category: "Kosmetyki", name: "Glossier", address: "72 Spring St", note: "Charakterystyczny sklep i szybki moduł beauty, jeśli Matylda wybierze kosmetyki zamiast kolejnej marki odzieżowej.", url: "https://www.glossier.com/pages/stores" },
      { category: "Sport / moda", name: "adidas Originals Flagship", address: "115 Spring St", note: "Duży wybór i blisko głównej trasy; opcja zamienna, nie dodatkowa.", url: "https://www.adidas.com/us/stores/new-york-115-spring-street" },
      { category: "Niezależne butiki", name: "Elizabeth Street", address: "Nolita", note: "Spokojniejsza alternatywa dla sieciówek na Broadwayu. Ustalcie wcześniej punkt i godzinę spotkania.", url: "https://www.google.com/maps/search/?api=1&query=shopping+Elizabeth+Street+Nolita+New+York" }
    ],
    food: [
      { category: "Lunch · szybko", name: "Prince Street Pizza", price: "$", address: "27 Prince St", note: "Kultowy pepperoni slice, ale kolejka może być długa. Jeśli przekracza 20 minut, wybierzcie wariant obok.", url: "https://www.princestreetpizza.com/" },
      { category: "Lunch · klasyk", name: "Rubirosa", price: "$$–$$$", address: "235 Mulberry St", note: "Pizza i włosko-amerykańska Nolita. Rezerwacja potrzebna, jeżeli ma być spokojnym lunchem przy stoliku.", url: "https://www.rubirosanyc.com/" },
      { category: "Lunch · Chinatown", name: "Mei Lai Wah", price: "$", address: "64 Bayard St", note: "Słynne pieczone bułeczki z wieprzowiną; bardziej przystanek street food niż pełny posiłek.", url: "https://www.google.com/maps/search/?api=1&query=Mei+Lai+Wah+64+Bayard+Street+New+York" },
      { category: "Lunch · wiele smaków", name: "Mott Street Eatery", price: "$–$$", address: "98 Mott St", note: "Food hall dobry przy różnych apetytach i bez długiego serwisu.", url: "https://www.mottstreeteatery.com/" },
      { category: "Stadion · klasyk", name: "Lobel’s Steak Sandwich", price: "$$$", address: "Yankee Stadium · sekcje 132, 223, 321", note: "Jeden z najbardziej rozpoznawalnych stadionowych wyborów; najlepiej kupić po Monument Park.", url: "https://www.mlb.com/yankees/ballpark/food" },
      { category: "Stadion · 2026", name: "MVP Burger", price: "$$$", address: "Yankee Stadium · Section 227", note: "Nowość sezonu 2026: burger wagyu z onion rings i tomato-bacon jam. Bardzo sycący.", url: "https://www.mlb.com/yankees/ballpark/food" }
    ],
    transport: {
      notes: ["Około 16:45 wyjście z hotelu; nie później niż 17:00", "Najwygodniej: D z 42 St–Bryant Park do 161 St–Yankee Stadium, jeśli kursuje ekspresowo", "Alternatywa: dojście do linii B/D lub linia 4 z East Side — wybór według aktualnych komunikatów MTA", "Powrót po meczu tymi samymi liniami; na peronie będzie tłoczno, więc trzymajcie się razem"],
      returnUrl: "https://www.google.com/maps/dir/?api=1&origin=Yankee+Stadium,+1+E+161st+St,+Bronx,+NY&destination=Holiday+Inn+New+York+City+Times+Square,+585+8th+Ave,+New+York&travelmode=transit"
    },
    stadium: {
      status: "28.08.2026 · bramy około 17:35 · pierwszy narzut 19:05",
      schedule: ["Przed wyjściem: bilety w MLB Ballpark i Apple Wallet, pełna bateria", "17:35 · wejście po otwarciu bram; kontrola bezpieczeństwa", "Natychmiast po wejściu · kolejka do Monument Park", "Najpóźniej 18:20 · Monument Park zamyka dostęp 45 minut przed meczem, a kolejka może zostać zamknięta wcześniej", "Po Monument Park · jedzenie, sklep i zdjęcie panoramy boiska", "18:55 · zajęcie miejsc na hymn i prezentację składów", "19:05 · pierwszy narzut"],
      rules: ["Jedna miękka torba maks. 16 × 16 × 8 cali i jeden mniejszy miękki przedmiot osobisty", "Brak przechowalni przy stadionie — zakupy z SoHo zostają w hotelu", "Bilety są wyłącznie mobilne; dodajcie je do Apple Wallet przed wyjazdem", "Stadion jest bezgotówkowy", "Dozwolona jest fabrycznie zamknięta plastikowa woda do 1 litra lub pusta nie-szklana butelka do 24 oz", "Nie wolno wnosić laptopa, szkła, puszek, statywu ani profesjonalnego sprzętu foto"],
      traditions: ["Monument Park upamiętnia legendy klubu — Babe’a Rutha, Lou Gehriga, Joe DiMaggio, Mickey Mantle’a i innych", "Przy dwóch strike’ach publiczność zwykle wstaje i dopinguje miotacza do strikeoutu", "Po środku siódmej zmiany jest seventh-inning stretch; publiczność wstaje i śpiewa „Take Me Out to the Ball Game”", "Podczas „New York, New York” po meczu warto zostać chwilę na trybunach zamiast natychmiast ruszać do metra"]
    },
    baseball: {
      basics: [
        { title: "Cel i inningi", text: "Dwie drużyny na zmianę atakują i bronią. Mecz ma dziewięć inningów; w każdej połowie inningu obrona musi zdobyć trzy auty. Punkt, czyli run, wpada po obiegnięciu czterech baz i powrocie na home plate." },
        { title: "Ball, strike i out", text: "Strike to prawidłowy narzut bez trafienia albo nieudany zamach. Trzy strike’i oznaczają strikeout. Cztery balle dają pałkarzowi darmowe przejście na pierwszą bazę. Sędzia pokazuje decyzje gestami, a tablica liczy balls, strikes i outs." },
        { title: "Co jest naprawdę ważne", text: "Patrzcie na stan baz i liczbę autów. Zawodnik na drugiej bazie może zdobyć punkt po dobrym pojedynczym odbiciu; dwaj zawodnicy na bazach i brak autów tworzą dużo większe napięcie niż puste bazy przy dwóch autach." },
        { title: "Home run i faul", text: "Home run poza ogrodzenie daje punkt pałkarzowi oraz wszystkim zawodnikom na bazach. Piłka odbita poza boczne linie jest foul; zwykle liczy się jako strike, ale foul nie może być trzecim strike’iem, poza wyjątkiem przy próbie bunt." },
        { title: "Dlaczego mecz nie ma stałej długości", text: "Nie ma zegara kończącego dziewiąty inning. Remis oznacza dodatkowe inningi, a zmiany miotaczy i długie serie odbić wydłużają wieczór. Planujcie około trzech godzin, ale nie zakładajcie sztywnej godziny powrotu." },
        { title: "Yankees kontra Red Sox", text: "To jedna z najważniejszych rywalizacji w amerykańskim sporcie. Reakcje na dobry lub zły moment będą mocniejsze niż podczas zwykłego meczu, ale doping pozostaje rodzinny: kibicujcie gospodarzom i nie wdawajcie się w zaczepki." }
      ]
    },
    variants: [
      { title: "Plan pełny", text: "Architektura 60–75 minut → dwa główne sklepy → lunch → hotel → stadion przed otwarciem bram." },
      { title: "Zakupy ważniejsze", text: "Skracamy architekturę do Greene i Haughwout Building, ale nadal kończymy sklepy o 14:15." },
      { title: "Upał", text: "Krótsze przejścia między klimatyzowanymi sklepami, lunch pod dachem i dłuższy odpoczynek w hotelu. Nie przesuwamy wyjazdu na stadion." },
      { title: "Deszcz", text: "SoHo pozostaje możliwe dzięki sklepom i restauracjom; rezygnujemy z Nolita. Mecz może być opóźniony — śledzimy komunikaty w MLB Ballpark." }
    ],
    links: [
      { label: "Start · hotel → Greene Street", url: "https://www.google.com/maps/dir/?api=1&origin=Holiday+Inn+New+York+City+Times+Square,+585+8th+Ave,+New+York&destination=72+Greene+Street,+New+York&travelmode=transit" },
      { label: "Spacer · Greene → Mercer → Haughwout → Nolita", url: "https://www.google.com/maps/dir/?api=1&origin=72+Greene+Street,+New+York&destination=Elizabeth+Street+Garden,+New+York&waypoints=Prince+Street+and+Mercer+Street,+New+York%7CE.V.+Haughwout+Building,+488+Broadway,+New+York&travelmode=walking" },
      { label: "Nolita/Chinatown → hotel", url: "https://www.google.com/maps/dir/?api=1&origin=Elizabeth+Street+Garden,+New+York&destination=Holiday+Inn+New+York+City+Times+Square,+585+8th+Ave,+New+York&travelmode=transit" },
      { label: "Hotel → Yankee Stadium", url: "https://www.google.com/maps/dir/?api=1&origin=Holiday+Inn+New+York+City+Times+Square,+585+8th+Ave,+New+York&destination=Yankee+Stadium,+1+E+161st+St,+Bronx,+NY&travelmode=transit" },
      { label: "Powrót · Yankee Stadium → hotel", url: "https://www.google.com/maps/dir/?api=1&origin=Yankee+Stadium,+1+E+161st+St,+Bronx,+NY&destination=Holiday+Inn+New+York+City+Times+Square,+585+8th+Ave,+New+York&travelmode=transit" },
      { label: "Yankees · Gameday Guide 2026", url: "https://www.mlb.com/yankees/ballpark/information/know-before-you-go" },
      { label: "Yankee Stadium · zasady i torby", url: "https://www.mlb.com/yankees/ballpark/information/policies" },
      { label: "Yankee Stadium · jedzenie 2026", url: "https://www.mlb.com/yankees/ballpark/food" },
      { label: "MLB Ballpark App", url: "https://www.mlb.com/yankees/apps/ballpark" }
    ]
  },
  "2026-08-29": {
    kind: "brooklynjazz", checked: "16.07.2026",
    timelineTargets: ["brooklyn", "bargemusic", "bargemusic", "apollo", "festival"],
    brooklyn: [
      { time: "10:00", title: "Washington Street", text: "Klasyczny kadr z Manhattan Bridge prowadzi wzrok dokładnie do Empire State Building. To przemysłowy DUMBO, nie filmowa dekoracja: bruk, magazyny i stalowy most są częścią tej samej portowej historii.", look: "Stańcie na Washington między Water i Front Street. Użyjcie obiektywu 2×, aby most i Empire State nie zniknęły w szerokim kadrze.", related: [{ key: "bjstory-0", label: "Skąd nazwa DUMBO?" }] },
      { time: "10:35", title: "Jane’s Carousel i Empire Stores", text: "Odrestaurowana karuzela z 1922 roku stoi w szklanym pawilonie Jeana Nouvela. Obok magazyny kawy Empire Stores przypominają, że nabrzeże obsługiwało światowy handel.", look: "Karuzela w ramie Brooklyn Bridge oraz masywne, czerwone ściany dawnych magazynów.", related: [{ key: "bjstory-1", label: "Port kawy i cukru" }] },
      { time: "11:10", title: "Pebble Beach", text: "Najlepszy spokojny punkt panoramy Lower Manhattan i Brooklyn Bridge. Zostańcie chwilę bez robienia zdjęć — słychać wodę, promy i ruch mostu.", look: "Ustawcie most po prawej, skyline po lewej i kamienisty brzeg jako pierwszy plan." },
      { time: "11:40", title: "Promenade → Pier 5", text: "Idźcie nabrzeżem na południe, mijając Pier 1 i tereny sportowe. Boathouse jest wbudowany w parkowe wzgórze, a nie zacumowany na wodzie.", look: "Floor-to-ceiling windows Boathouse i trawiasty nasyp osłaniający salę od Furman Street.", related: [{ key: "bjstory-2", label: "Dlaczego Bargemusic zeszło na ląd?" }] }
    ],
    stories: [
      { title: "DUMBO: nazwa, która miała odstraszać", text: "Down Under the Manhattan Bridge Overpass powstało jako żartobliwy skrót mieszkańców i artystów, którzy liczyli, że mało elegancka nazwa zniechęci deweloperów. Stało się odwrotnie — dziś DUMBO jest jedną z najbardziej rozpoznawalnych i kosztownych dzielnic Brooklynu." },
      { title: "Brooklyn jako magazyn Nowego Jorku", text: "Przed kontenerami towary przeładowywano ręcznie między statkami, magazynami i wagonami. Empire Stores przechowywało między innymi kawę. Dzisiejsze parki i biura zajęły przestrzeń, która wcześniej pachniała kawą, cukrem, drewnem i rzeką." },
      { title: "Bargemusic: prawie pół wieku na wodzie", text: "Skrzypaczka Olga Bloom założyła Bargemusic w 1977 roku na przerobionej barce. Intymna sala, muzycy na wyciągnięcie ręki i Manhattan za oknem stworzyły nowojorską ikonę. W 2025 roku stara barka została odholowana, a koncerty przeniesiono do Boathouse, zachowując kameralny charakter i widok na rzekę." },
      { title: "Apollo i Amateur Night", text: "Apollo stało się miejscem przełomowym dla czarnych artystów i publiczności. Słynna Amateur Night potrafiła zarówno wynieść wykonawcę, jak i bezlitośnie go wygwizdać. Ella Fitzgerald wygrała tu jako nastolatka, a na scenie występowali między innymi Billie Holiday, James Brown i Stevie Wonder." },
      { title: "Charlie Parker i narodziny bebopu", text: "Parker, nazywany Birdem, przyspieszył język jazzu: improwizował na harmonii utworu, używał gwałtownych akcentów i długich, logicznych fraz. Bebop nie miał być łatwą muzyką taneczną — wymagał skupienia od muzyków i słuchaczy." },
      { title: "Charlie Parker i „Whiplash”", text: "W filmie Fletcher opowiada historię, jak perkusista Jo Jones miał rzucić talerzem w młodego Parkera, by uzasadnić przemoc jako metodę tworzenia geniuszu. Prawdziwe zdarzenie było mniej dramatyczne: talerz najpewniej upadł u stóp Parkera, a film świadomie zamienia anegdotę w mit o upokorzeniu prowadzącym do wielkości." },
      { title: "Harlem Renaissance", text: "W latach dwudziestych i trzydziestych Harlem stał się centrum czarnej literatury, sztuki, polityki i muzyki. Wielka Migracja sprowadziła do Nowego Jorku ludzi z amerykańskiego Południa, którzy budowali nowe instytucje i kulturę miejską mimo segregacji i dyskryminacji." }
    ],
    bargemusic: {
      status: "Bezpłatne · bez rezerwacji · plan 14:00",
      title: "Bargemusic at the Boathouse",
      address: "Brooklyn Bridge Park Boathouse · Pier 5 · GPS: 10 Montague St",
      schedule: ["12:40 · lunch zakończony", "13:15 · dojście pod Boathouse i ustawienie się w kolejce", "13:40 · planowane otwarcie drzwi", "14:00 · koncert", "około 15:00–15:30 · wyjście; koncert może trwać do 90 minut", "Natychmiast po wyjściu · przejazd do Harlemu"],
      rules: ["Wstęp bezpłatny, bez biletu i bez rezerwacji", "Miejsca według kolejności — pełna sala jest realnym ryzykiem", "Boathouse znajduje się przy Pier 5 na lądzie; dawna barka nie jest miejscem koncertu", "W środku nie wolno jeść ani pić", "Bez nagrywania audio, wideo i fotografowania bez zgody", "Program i wykonawcy mogą się zmienić; dokładny repertuar sprawdzamy przed podróżą"],
      listen: [
        { title: "Jak słuchać kameralnie", text: "W małej sali obserwujcie oddechy, kontakt wzrokowy i gesty muzyków. To rozmowa bez dyrygenta: temat przechodzi między instrumentami, a cisza przed kolejną frazą bywa częścią muzyki." },
        { title: "Co czyni miejsce nowojorskim", text: "Bargemusic łączy wysokiej klasy wykonanie z nieformalną bliskością i panoramą miasta. Nawet po przeprowadzce z barki idea pozostała ta sama: muzyka nie jest odseparowana od rzeki i miejskiego krajobrazu." }
      ]
    },
    apollo: {
      status: "Bezpłatna galeria i sklep · historyczna sala zamknięta",
      schedule: ["Najpierw zdjęcie neonu przy 253 W 125th St", "Krótki spacer po Apollo Walk of Fame", "Laura & Frank Baker Gallery: „Got to Be There” — bezpłatnie", "Sklep Apollo tylko jeśli nie ma opóźnienia", "16:35 najpóźniej · wyjście w stronę Marcus Garvey Park"],
      notes: ["Historyczny teatr jest w remoncie i ma ponownie otworzyć się pod koniec 2026 roku", "Galeria według aktualnej informacji działa codziennie 10:00–18:00", "Nie planujemy zwiedzania historycznej sali ani wejścia na scenę", "Jeśli Bargemusic skończy się później, Apollo skracamy do neonu albo pomijamy całkowicie"]
    },
    festival: {
      status: "Bezpłatne · all ages · 14:00–19:00",
      title: "Charlie Parker Jazz Festival",
      address: "Marcus Garvey Park · 18 Mt. Morris Park West",
      lineup: [
        { title: "Joshua Redman", text: "Jeden z najważniejszych współczesnych saksofonistów tenorowych. Łączy klarowną narrację improwizacji, nowoczesną harmonię i bardzo komunikatywny kontakt z publicznością." },
        { title: "Nat Adderley Jr.", text: "Pianista, aranżer i wieloletni dyrektor muzyczny Luthera Vandrossa. Jest synem trębacza Nata Adderleya i bratankiem saksofonisty Cannonballa Adderleya." },
        { title: "Catherine Russell", text: "Wokalistka mocno zakorzeniona w bluesie, swingu i wczesnym jazzie. Zamiast traktować dawne utwory jak muzeum, przywraca im rytm, humor i sceniczną energię." },
        { title: "Nicole Glover", text: "Saksofonistka tenorowa młodszego pokolenia, łącząca tradycję bebopu ze współczesnym brzmieniem nowojorskiej sceny." },
        { title: "DJ Kultured Child", text: "DJ spaja zmiany między koncertami i pokazuje ciągłość między jazzem, soulem, funkiem i późniejszą czarną muzyką miejską." }
      ],
      basics: [
        { title: "Temat i improwizacja", text: "Zespół zwykle przedstawia melodię, potem kolejni muzycy improwizują, a na końcu temat wraca. Nie trzeba rozpoznawać akordów — wystarczy zauważyć, kto prowadzi opowieść i jak reszta zespołu odpowiada." },
        { title: "Bebop w jednym zdaniu", text: "Bebop to szybki, harmonicznie złożony jazz z lat czterdziestych, skupiony na improwizacji i wirtuozowskiej rozmowie małego zespołu." },
        { title: "Kiedy klaskać", text: "Brawa po solówce są naturalną częścią koncertu jazzowego. Publiczność reaguje także w trakcie utworu, kiedy muzyk zagra szczególnie efektowną frazę." },
        { title: "Na co patrzeć", text: "Obserwujcie sekcję rytmiczną: bas wyznacza drogę harmonii, perkusja komentuje, a pianista może zarówno podpierać solistę, jak i zostawiać mu przestrzeń." }
      ],
      playlist: [
        { label: "Charlie Parker · This Is Charlie Parker", note: "Spotify · wejście w bebop", url: "https://open.spotify.com/search/Charlie%20Parker" },
        { label: "Joshua Redman", note: "Spotify · przed festiwalem", url: "https://open.spotify.com/search/Joshua%20Redman" },
        { label: "Catherine Russell", note: "Spotify · wokal i swing", url: "https://open.spotify.com/search/Catherine%20Russell" },
        { label: "Charlie Parker · Apple Music", note: "Alternatywna platforma", url: "https://music.apple.com/us/search?term=Charlie%20Parker" }
      ]
    },
    food: [
      { category: "Lunch · widok", name: "Time Out Market New York", price: "$–$$$", address: "55 Water St · Empire Stores", note: "Wiele kuchni i wspólne stoły; logistycznie łatwe w DUMBO, ale kończymy posiłek najpóźniej 12:40.", url: "https://www.timeoutmarket.com/newyork/" },
      { category: "Lunch · pizza", name: "Juliana’s", price: "$$", address: "19 Old Fulton St", note: "Klasyczna brooklyńska pizza. Kolejka może zniszczyć bufor Bargemusic — wchodzimy tylko przy krótkim oczekiwaniu.", url: "https://julianaspizza.com/" },
      { category: "Lunch · szybko", name: "Luke’s Lobster Brooklyn Bridge Park", price: "$$", address: "11 Water St", note: "Lobster roll i szybka obsługa; dobra opcja, jeśli nie chcecie food hallu.", url: "https://lukeslobster.com/pages/brooklyn-bridge-park" },
      { category: "Kolacja · Harlem", name: "Harlem Shake", price: "$$", address: "100 W 124th St", note: "Burgery i shake’i blisko parku; swobodny, rodzinny koniec bardzo muzycznego dnia.", url: "https://www.harlemshakenyc.com/" },
      { category: "Kolacja · soul food", name: "Amy Ruth’s", price: "$$", address: "113 W 116th St", note: "Chicken and waffles oraz klasyki soul food. W sobotę możliwa kolejka.", url: "https://www.amyruths.com/" },
      { category: "Kolacja · etiopska", name: "Abyssinia", price: "$$", address: "268 W 135th St", note: "Dania do dzielenia na injera; wybór bardziej lokalny, ale wymaga krótkiego przejazdu lub spaceru na północ.", url: "https://www.abyssiniarestaurantnyc.com/" }
    ],
    variants: [
      { title: "Plan pełny", text: "DUMBO → lunch do 12:40 → Bargemusic → Apollo 20–30 minut → finał festiwalu → kolacja w Harlemie." },
      { title: "Muzyka najważniejsza", text: "Skracamy DUMBO, jesteśmy wcześnie pod Boathouse, a po koncercie jedziemy bezpośrednio do Marcus Garvey Park. Apollo zostaje na zdjęcie z zewnątrz innym razem." },
      { title: "Bargemusic pełne", text: "Jeśli nie wejdziecie, nie czekacie na drugi koncert: wcześniejszy przejazd do Harlemu daje więcej festiwalu oraz spokojną wizytę w galerii Apollo." },
      { title: "Deszcz", text: "Washington Street i panorama w skrócie → Time Out Market → Boathouse → Apollo Gallery → festiwal zgodnie z komunikatem pogodowym SummerStage." }
    ],
    links: [
      { label: "Start · hotel → Washington Street", url: "https://www.google.com/maps/dir/?api=1&origin=Holiday+Inn+New+York+City+Times+Square,+585+8th+Ave,+New+York&destination=Washington+Street+and+Water+Street,+Brooklyn,+NY&travelmode=transit" },
      { label: "Spacer DUMBO · Washington → Pebble Beach → Pier 5", url: "https://www.google.com/maps/dir/?api=1&origin=Washington+Street+and+Water+Street,+Brooklyn,+NY&destination=Brooklyn+Bridge+Park+Boathouse,+10+Montague+St,+Brooklyn,+NY&waypoints=Jane's+Carousel,+Brooklyn,+NY%7CPebble+Beach,+Brooklyn,+NY&travelmode=walking" },
      { label: "Bargemusic → Apollo", url: "https://www.google.com/maps/dir/?api=1&origin=Brooklyn+Bridge+Park+Boathouse,+10+Montague+St,+Brooklyn,+NY&destination=Apollo+Theater,+253+W+125th+St,+New+York&travelmode=transit" },
      { label: "Apollo → Marcus Garvey Park", url: "https://www.google.com/maps/dir/?api=1&origin=Apollo+Theater,+253+W+125th+St,+New+York&destination=Marcus+Garvey+Park,+18+Mt+Morris+Park+W,+New+York&travelmode=walking" },
      { label: "Powrót · Marcus Garvey Park → hotel", url: "https://www.google.com/maps/dir/?api=1&origin=Marcus+Garvey+Park,+18+Mt+Morris+Park+W,+New+York&destination=Holiday+Inn+New+York+City+Times+Square,+585+8th+Ave,+New+York&travelmode=transit" },
      { label: "Bargemusic · kalendarz", url: "https://www.bargemusic.org/calendar-tickets/" },
      { label: "Bargemusic · dojazd i zasady", url: "https://www.bargemusic.org/info-directions/" },
      { label: "Apollo · aktualne informacje", url: "https://www.apollotheater.org/visit-the-apollo" },
      { label: "Charlie Parker Jazz Festival · program", url: "https://cityparksfoundation.org/events/cpjf-joshua-redman/" }
    ]
  },
  "2026-08-30": {
    kind: "departure", checked: "16.07.2026",
    timelineTargets: ["diner", "hotel", "walk", "food", "hotel", "transport", "airport", "airport"],
    diner: {
      intro: "Diner to nie tylko restauracja z retro szyldem. To codzienny nowojorski rytuał: długie menu, dolewana kawa, śniadanie przez większą część dnia i stolik, przy którym można siedzieć bez ceremonii.",
      basics: [
        { title: "Eggs your way", text: "Jajka można zamówić scrambled, sunny-side up, over easy, over medium albo poached. Jeśli nie chcecie prowadzić negocjacji z kelnerem, scrambled eggs są najprostszym wyborem." },
        { title: "Pancakes, waffles czy french toast", text: "Pancakes są miękkie i puszyste, waffles bardziej chrupiące, a french toast to pieczywo smażone w jajku i mleku. Porcje są duże — rozsądnie zamówić dwa różne zestawy na trzy osoby i dobrać dodatki." },
        { title: "Home fries i hash browns", text: "Home fries to podsmażane kawałki ziemniaków, często z cebulą i papryką. Hash browns są tarte i mocniej przypieczone. Oba dodatki potrafią zamienić śniadanie w pełny obiad." },
        { title: "Kawa i napiwek", text: "Zwykła filter coffee często jest dolewana. Napiwek zostawia się jak w restauracji z obsługą — zwykle około 20 procent, zależnie od jakości serwisu." }
      ]
    },
    hotel: {
      steps: ["09:50 · wrócić do hotelu po śniadaniu", "Wymeldować się przed 11:00 i poprosić o kwit lub numer do przechowalni", "W jednej małej torbie zostawić paszporty, elektronikę, leki i rzeczy potrzebne w samolocie", "Nie zostawiać paszportów ani wartościowej elektroniki w przechowywanym bagażu", "13:45 · być ponownie w hotelu", "Przed wyjazdem: toaleta, napełnienie butelek, dokumenty, terminal i status lotu"]
    },
    walk: [
      { time: "10:30", title: "Bryant Park", text: "Ostatni powrót do parku po filmowym wieczorze. W niedzielny poranek jest spokojniejszy niż Times Square i dobrze pokazuje, jak prywatnie zarządzana przestrzeń publiczna zmieniła Midtown.", look: "Trawnik, stoliki, otaczające wieżowce i tylna fasada biblioteki.", related: [{ key: "depstory-0", label: "Jak uratowano Bryant Park?" }] },
      { time: "10:50", title: "Lwy NYPL", text: "Stephen A. Schwarzman Building oglądacie z zewnątrz — główny budynek jest zamknięty w niedziele lipca i sierpnia. Marmurowe lwy nazywają się Patience i Fortitude.", look: "Schody Fifth Avenue, fasada Beaux-Arts i oba lwy; najlepszy wspólny kadr z przeciwnej strony Fifth Avenue.", related: [{ key: "depstory-1", label: "Patience i Fortitude" }] },
      { time: "11:15", title: "42nd Street", text: "Idźcie na wschód obok wieżowców i Tudor City. To krótka oś pokazująca skalę Midtown bez dokładania kolejnej atrakcji biletowanej.", look: "Chrysler Building pojawiający się między budynkami przy Lexington Avenue." },
      { time: "11:35", title: "Grand Central · Main Concourse", text: "Wejdźcie pod zegar z czterema tarczami i spójrzcie na odwrócone niebo terminalu. To dworzec zaprojektowany jak monumentalna brama do miasta.", look: "Zegar informacyjny, okna wschodniej i zachodniej ściany, gwiazdozbiory na suficie.", related: [{ key: "depstory-2", label: "Dlaczego niebo jest odwrócone?" }] },
      { time: "12:00", title: "Whispering Gallery", text: "Przy Oyster Bar dwie osoby stają w przeciwległych narożnikach sklepionego przejścia i mówią cicho do ściany. Konstrukcja prowadzi dźwięk po łuku do drugiego rogu.", look: "Niskie sklepienie z płytek Guastavino i cztery narożniki.", related: [{ key: "depstory-3", label: "Jak wędruje szept?" }] }
    ],
    guggenheim: {
      status: "Wariant dla Gosi · 10:30–12:00 · zamiast Grand Central",
      address: "1071 Fifth Avenue · 88th Street",
      schedule: ["08:00 · wcześniejsze śniadanie", "09:15 · powrót do hotelu, check-out i przechowanie bagaży", "09:40 · wyjazd metrem Q w stronę 86th Street", "10:15 · dojście pod muzeum i kontrola wejścia", "10:30–12:00 · zwiedzanie maksymalnie 90 minut", "12:00 · wyjście niezależnie od miejsca na spirali", "około 12:40 · powrót do Midtown", "12:45–13:30 · szybki lunch", "13:45 · odbiór walizek", "14:30 · wyjazd na JFK bez zmian"],
      practical: ["Muzeum jest otwarte codziennie 10:30–17:30", "Bilety z wyprzedzeniem są rekomendowane", "Dorośli 30 USD; dzieci poniżej 12 lat bezpłatnie — dla 13-letniej Matyldy potrzebny jest odpowiedni bilet", "Trasa ma twardy limit 90 minut", "Nie dokładamy NYPL i Grand Central; co najwyżej widok Bryant Park po drodze", "Audioprzewodnik jest dostępny w Bloomberg Connects"],
      route: [
        { title: "Rotunda Franka Lloyda Wrighta", text: "Najpierw spójrzcie w górę na oculus i spiralę rampy. Budynek nie jest neutralnym pudełkiem na sztukę — narzuca ruch, perspektywę i ciągłe oglądanie ludzi po drugiej stronie rotundy.", look: "Oculus, nachylenie rampy, niska ściana przy pracach i widoki przez pustą przestrzeń." },
        { title: "Guggenheim Pop: 1960 to Now", text: "Wystawa pokazuje, jak język reklamy, celebrytów, produktów i mass mediów wszedł do sztuki oraz jak późniejsi artyści przejęli i podważyli pop-art.", look: "Warhol i inni artyści używający powtórzenia, konsumpcji, ironii i rozpoznawalnych obrazów kultury popularnej." },
        { title: "Modern European Currents", text: "Krótki moduł dla Gosi: Kandinsky, Franz Marc i Natalia Goncharova pokazują, jak europejscy artyści odchodzili od wiernego przedstawiania świata w stronę koloru, rytmu i abstrakcji.", look: "Porównajcie emocjonalny kolor z geometryczną organizacją obrazu." },
        { title: "Thannhauser Collection", text: "Stała kolekcja obejmuje impresjonizm, postimpresjonizm i francuski modernizm. Przy limicie czasu wybierzcie tylko dwa lub trzy dzieła, zamiast oglądać każde po kolei.", look: "Degas, Manet, Van Gogh i przejście od obserwacji świata do bardziej osobistego języka nowoczesności." }
      ]
    },
    stories: [
      { title: "Jak Bryant Park odzyskał życie", text: "W drugiej połowie XX wieku park był zaniedbany i uważany za niebezpieczny. Przebudowa, ruchome krzesła, program wydarzeń i stała obecność ludzi zmieniły go w miejskie podwórko. To także przykład sporu o to, ile publicznej przestrzeni powinno być zarządzane prywatnie." },
      { title: "Patience i Fortitude", text: "Lwy strzegą biblioteki od 1911 roku. W czasie Wielkiego Kryzysu burmistrz Fiorello La Guardia nadał im imiona Patience i Fortitude — Cierpliwość i Hart Ducha — jako cechy potrzebne nowojorczykom do przetrwania kryzysu." },
      { title: "Odwrócone niebo Grand Central", text: "Na suficie Main Concourse znaki zodiaku są przedstawione jakby oglądane spoza sfery niebieskiej. Jedni tłumaczą to zamysłem, inni błędem w przeniesieniu projektu. Mały ciemny fragment sufitu pozostawiono po renowacji jako pamiątkę dawnego zabrudzenia." },
      { title: "Szept prowadzony przez płytki", text: "Sklepienie Whispering Gallery wykonano z cienkich płytek w systemie Rafaela Guastavino. Zakrzywiona powierzchnia prowadzi fale dźwiękowe wzdłuż ściany, dlatego cichy głos jest słyszalny po przekątnej mimo hałasu terminalu." },
      { title: "Terminal uratowany przed wyburzeniem", text: "Po zburzeniu Pennsylvania Station również Grand Central było zagrożone przebudową. Kampania obrońców zabytku, wspierana przez Jacqueline Kennedy Onassis, doprowadziła do ważnego orzeczenia Sądu Najwyższego USA chroniącego miejskie prawo konserwacji zabytków." }
    ],
    food: [
      { category: "Śniadanie · najbliżej", name: "Westway Diner", price: "$$", address: "614 9th Ave", note: "Klasyczne śniadania, duże menu i około osiem minut od hotelu. Najbezpieczniejszy wybór przed wymeldowaniem.", url: "https://www.westwaydiner.com/" },
      { category: "Śniadanie · retro", name: "Tick Tock Diner", price: "$$", address: "481 8th Ave", note: "Duży całodobowy diner naprzeciw Penn Station. Bardziej efektowny wizualnie, ale zwykle bardziej turystyczny.", url: "https://www.ticktockdinerny.com/" },
      { category: "Śniadanie · bagel", name: "Best Bagel & Coffee", price: "$", address: "225 W 35th St", note: "Szybszy wariant, jeśli chcecie więcej czasu na spokojne wymeldowanie.", url: "https://bestbagelandcoffee.com/" },
      { category: "Lunch · Grand Central", name: "Dining Concourse", price: "$–$$$", address: "Grand Central · Lower Level", note: "Wiele opcji bez wychodzenia z terminalu. Dobre rozwiązanie przy różnym apetycie i ograniczonym czasie.", url: "https://grandcentralterminal.com/directory/?category=restaurants" },
      { category: "Lunch · klasyk", name: "Sarge’s Delicatessen", price: "$$", address: "548 3rd Ave", note: "Kanapki pastrami i klasyczny żydowski deli. Porcje duże; dojście wydłuża trasę, więc tylko bez opóźnienia.", url: "https://sargesdeli.com/" },
      { category: "Na drogę", name: "Grand Central Market", price: "$–$$$", address: "Lexington Passage", note: "Kanapka, owoce lub przekąska do samolotu. Płyny kupicie dopiero po kontroli na JFK.", url: "https://grandcentralterminal.com/directory/grand-central-market/" }
    ],
    transport: {
      recommended: { title: "Plan A · Penn Station → LIRR → Jamaica → AirTrain", time: "około 60–80 minut od hotelu do terminalu", text: "Najbardziej przewidywalny wariant. Z hotelu idziecie z walizkami do Moynihan Train Hall/Penn Station, jedziecie dowolnym właściwym pociągiem LIRR zatrzymującym się na Jamaica, a następnie przechodzicie zgodnie ze znakami do AirTrain JFK." },
      alternatives: [
        { title: "Yellow cab", text: "Stała taryfa Manhattan–JFK wynosi obecnie 70 USD, ale dochodzą opłaty, ewentualne tolls i napiwek. Dla trzech osób z bagażami wygodne, lecz czas zależy od ruchu." },
        { title: "UberXL", text: "Cena jest pokazywana przed zamówieniem i zmienia się zależnie od popytu. Ma sens przy dużych walizkach lub problemach kolei; porównajcie na miejscu z taxi." },
        { title: "Metro E + AirTrain", text: "Najtańszy, ale wolniejszy i mniej wygodny z walizkami. Zostaje awaryjną opcją, jeśli LIRR ma problemy, a drogi są zakorkowane." }
      ],
      lirrSteps: ["14:30 · wyjście z hotelu z całym bagażem", "Wejście do Moynihan Train Hall/Penn Station", "W TrainTime kupić CityTicket lub właściwy bilet Penn Station → Jamaica przed wejściem do pociągu", "Sprawdzić na tablicy, czy wybrany pociąg zatrzymuje się na Jamaica", "Na Jamaica iść za znakami AirTrain JFK", "AirTrain: wybrać pociąg do właściwego terminalu, nie Howard Beach", "Nie wysiadać na Federal Circle, jeśli hotel lotniskowy ani wypożyczalnia nie są celem", "Po przyjeździe sprawdzić poziom odlotów i stanowiska linii lotniczej"]
    },
    airport: {
      schedule: ["Dzień wcześniej · sprawdzić linię lotniczą, numer lotu i terminal", "13:45 · ostateczna kontrola statusu lotu oraz utrudnień LIRR/AirTrain", "14:30 · twarda godzina wyjścia z hotelu", "16:00–16:30 · planowany przyjazd na JFK", "Po przyjeździe · odprawa i nadanie bagażu", "Następnie · kontrola bezpieczeństwa", "Po kontroli · woda, posiłek i dojście do bramki", "19:29 · wylot"],
      checklist: ["Paszporty i dokumenty podróży przy sobie", "Karty pokładowe również zapisane offline", "Powerbank w bagażu podręcznym, nie rejestrowanym", "Leki i podstawowe rzeczy na jedną noc w kabinie", "Butelki opróżnione przed kontrolą", "Płyny zgodnie z limitem bezpieczeństwa", "Zakupy i pamiątki zabezpieczone przed nadaniem walizki"]
    },
    variants: [
      { title: "Plan spokojny · rekomendowany", text: "Diner → check-out → Bryant Park → NYPL z zewnątrz → Grand Central → lunch → hotel → LIRR 14:30." },
      { title: "Guggenheim dla Gosi", text: "Śniadanie o 08:00 → check-out 09:15 → Guggenheim 10:30–12:00 → szybki lunch → hotel 13:45. Zastępuje Grand Central i pełny spacer 42nd Street." },
      { title: "Zmęczenie", text: "Diner → check-out → tylko Grand Central → lunch blisko hotelu. Nie dokładamy Central Parku ani ostatnich zakupów." },
      { title: "Deszcz", text: "Po wymeldowaniu jedziecie bezpośrednio do Grand Central, zostajecie pod dachem i wracacie po bagaże około 13:15." },
      { title: "Problemy LIRR lub AirTrain", text: "Nie czekamy na rozwiązanie dłużej niż 10–15 minut. Zamawiamy UberXL lub bierzemy yellow cab i jedziemy na JFK." }
    ],
    links: [
      { label: "Śniadanie · hotel → Westway Diner", url: "https://www.google.com/maps/dir/?api=1&origin=Holiday+Inn+New+York+City+Times+Square,+585+8th+Ave,+New+York&destination=Westway+Diner,+614+9th+Ave,+New+York&travelmode=walking" },
      { label: "Spacer · hotel → Bryant Park → NYPL → Grand Central", url: "https://www.google.com/maps/dir/?api=1&origin=Holiday+Inn+New+York+City+Times+Square,+585+8th+Ave,+New+York&destination=Grand+Central+Terminal,+New+York&waypoints=Bryant+Park,+New+York%7CNew+York+Public+Library,+476+5th+Ave,+New+York&travelmode=walking" },
      { label: "Grand Central → hotel", url: "https://www.google.com/maps/dir/?api=1&origin=Grand+Central+Terminal,+New+York&destination=Holiday+Inn+New+York+City+Times+Square,+585+8th+Ave,+New+York&travelmode=transit" },
      { label: "Wariant · hotel → Guggenheim", url: "https://www.google.com/maps/dir/?api=1&origin=Holiday+Inn+New+York+City+Times+Square,+585+8th+Ave,+New+York&destination=Solomon+R.+Guggenheim+Museum,+1071+5th+Ave,+New+York&travelmode=transit" },
      { label: "Wariant · Guggenheim → hotel", url: "https://www.google.com/maps/dir/?api=1&origin=Solomon+R.+Guggenheim+Museum,+1071+5th+Ave,+New+York&destination=Holiday+Inn+New+York+City+Times+Square,+585+8th+Ave,+New+York&travelmode=transit" },
      { label: "Hotel → Moynihan Train Hall", url: "https://www.google.com/maps/dir/?api=1&origin=Holiday+Inn+New+York+City+Times+Square,+585+8th+Ave,+New+York&destination=Moynihan+Train+Hall,+New+York&travelmode=walking" },
      { label: "Hotel → JFK · transport publiczny", url: "https://www.google.com/maps/dir/?api=1&origin=Holiday+Inn+New+York+City+Times+Square,+585+8th+Ave,+New+York&destination=John+F.+Kennedy+International+Airport,+Queens,+NY&travelmode=transit" },
      { label: "NYPL · godziny", url: "https://www.nypl.org/locations/schwarzman/" },
      { label: "Grand Central · oficjalna strona", url: "https://grandcentralterminal.com/" },
      { label: "Guggenheim · godziny i bilety", url: "https://www.guggenheim.org/plan-your-visit" },
      { label: "MTA TrainTime", url: "https://new.mta.info/traintime" },
      { label: "Taxi NYC · oficjalne taryfy", url: "https://www.nyc.gov/site/tlc/passengers/taxi-fare.page" },
      { label: "JFK · status lotów i terminale", url: "https://www.jfkairport.com/flight-tracker" }
    ]
  }
};

const PREPARE = [
  { title: "Filmy", text: "Kuratorska lista filmów i seriali powiązanych z miejscami, historiami i konkretnymi dniami podróży.", meta: "Zwiastuny · powiązania · obejrzane" },
  { title: "Muzyka", text: "Artyści koncertów, bebop, Apollo, muzyka stadionowa i nowojorska playlista na spacer.", meta: "Spotify · Apple Music · odsłuchy" },
  { title: "Muzea bez zmęczenia", text: "Trasy 90 minut, 2 godziny i pełne dla MoMA, The Met, Whitney i opcjonalnego Guggenheima.", meta: "Bloomberg Connects + treści offline" }
];

const FILMS = [
  { id:"whiplash", title:"Whiplash", year:"2014", audience:"Matylda + wszyscy", dayId:"2026-08-29", panel:"parker", place:"Charlie Parker Jazz Festival", why:"Punkt wyjścia do rozmowy o Parkerze, ambicji i micie przemocy jako drogi do wielkości.", note:"Po filmie przeczytajcie w aplikacji, co naprawdę wydarzyło się z talerzem Jo Jonesa.", url:"https://www.youtube.com/results?search_query=Whiplash+official+trailer" },
  { id:"bird", title:"Bird", year:"1988", audience:"Gosia + Radek", dayId:"2026-08-29", panel:"parker", place:"Harlem i bebop", why:"Film Clinta Eastwooda o życiu Charliego Parkera uzupełnia muzyczną część ostatniej soboty.", note:"Cięższy i bardziej biograficzny niż Whiplash; najlepiej oglądać po poznaniu kilku nagrań Parkera.", url:"https://www.youtube.com/results?search_query=Bird+1988+official+trailer" },
  { id:"llewyn", title:"Inside Llewyn Davis", year:"2013", audience:"Gosia + Radek", dayId:"2026-08-23", panel:"stories", place:"Greenwich Village", why:"Zimowy, melancholijny obraz folkowego Village sprzed komercyjnego sukcesu sceny lat sześćdziesiątych.", note:"Nie jest przewodnikiem po adresach — lepiej oddaje atmosferę artystycznego życia i niepewności.", url:"https://www.youtube.com/results?search_query=Inside+Llewyn+Davis+official+trailer" },
  { id:"friends", title:"Friends · wybrane odcinki", year:"1994–2004", audience:"Gosia + Matylda", dayId:"2026-08-23", panel:"screen", place:"90 Bedford Street", why:"Pozwala od razu rozpoznać fasadę z czołówki i odróżnić serialowe studio od prawdziwego Village.", note:"Wystarczy jeden ulubiony odcinek — nie potrzebujecie powtórki całego serialu.", url:"https://www.youtube.com/results?search_query=Friends+official+trailer" },
  { id:"satc", title:"Sex and the City · wybrane odcinki", year:"1998–2004", audience:"Gosia + Matylda", dayId:"2026-08-23", panel:"screen", place:"66 Perry Street", why:"Schody Carrie i Magnolia Bakery stają się czytelne jako część popkulturowej geografii West Village.", note:"W aplikacji przypominamy, że bohaterka miała mieszkać na Upper East Side.", url:"https://www.youtube.com/results?search_query=Sex+and+the+City+series+trailer" },
  { id:"firstmonday", title:"The First Monday in May", year:"2016", audience:"Gosia + Matylda", dayId:"2026-08-25", panel:"museum", place:"The Met", why:"Dokument pokazuje powstawanie wystawy Costume Institute i mechanizm stojący za Met Gala.", note:"Dobry pomost między sztuką Gosi a modą interesującą Matyldę.", url:"https://www.youtube.com/results?search_query=The+First+Monday+in+May+official+trailer" },
  { id:"ghostbusters", title:"Ghostbusters", year:"1984", audience:"Wszyscy", dayId:"2026-08-30", panel:"walk", place:"New York Public Library", why:"Jedna z najbardziej rozpoznawalnych filmowych scen w NYPL oraz lekki finał przed podróżą.", note:"Budynek oglądacie z zewnątrz, ale kamienne lwy i fasada będą natychmiast rozpoznawalne.", url:"https://www.youtube.com/results?search_query=Ghostbusters+1984+official+trailer" },
  { id:"kingcreole", title:"King Creole", year:"1958", audience:"Wszyscy", dayId:"2026-08-24", panel:"movie", place:"Bryant Park Movie Night", why:"To dokładnie film zaplanowany na bezpłatny pokaz pod wieżowcami.", note:"Warto znać tylko podstawowy kontekst Elvisa jako aktora — sam film oglądacie na miejscu.", url:"https://www.youtube.com/results?search_query=King+Creole+official+trailer" },
  { id:"onthetown", title:"On the Town", year:"1949", audience:"Wszyscy", dayId:"2026-08-30", panel:"walk", place:"Klasyczny Manhattan", why:"Musical o intensywnym poznawaniu Nowego Jorku w ograniczonym czasie — idealny motyw pożegnania z miastem.", note:"Lekki, stary Hollywood i wiele rozpoznawalnych miejskich symboli.", url:"https://www.youtube.com/results?search_query=On+the+Town+1949+trailer" }
];

const MUSIC = [
  { id:"hiromi", title:"Hiromi", subtitle:"Przed Blue Note", dayId:"2026-08-23", panel:"bluenote", forWhom:"Gosia · fortepian", text:"Wirtuozeria, energia rocka i jazzowa improwizacja. Zacznijcie od kilku nagrań na żywo.", spotify:"https://open.spotify.com/search/Hiromi", apple:"https://music.apple.com/us/search?term=Hiromi" },
  { id:"parker", title:"Charlie Parker", subtitle:"Bird i narodziny bebopu", dayId:"2026-08-29", panel:"parker", forWhom:"Wszyscy", text:"Posłuchajcie Ko-Ko, Ornithology i Now’s the Time, skupiając się na szybkości oraz logice frazy.", spotify:"https://open.spotify.com/search/Charlie%20Parker", apple:"https://music.apple.com/us/search?term=Charlie%20Parker" },
  { id:"redman", title:"Joshua Redman", subtitle:"Finał festiwalu", dayId:"2026-08-29", panel:"artists", forWhom:"Gosia + Radek", text:"Współczesny saksofon, klarowna narracja i świetny kontakt z publicznością.", spotify:"https://open.spotify.com/search/Joshua%20Redman", apple:"https://music.apple.com/us/search?term=Joshua%20Redman" },
  { id:"russell", title:"Catherine Russell", subtitle:"Swing i wokal", dayId:"2026-08-29", panel:"artists", forWhom:"Gosia", text:"Blues, swing i stare piosenki wykonywane bez muzealnego dystansu.", spotify:"https://open.spotify.com/search/Catherine%20Russell", apple:"https://music.apple.com/us/search?term=Catherine%20Russell" },
  { id:"apollo", title:"Apollo essentials", subtitle:"Ella · James Brown · Stevie Wonder", dayId:"2026-08-29", panel:"apollo", forWhom:"Wszyscy", text:"Krótka ścieżka przez artystów, których kariery i koncerty tworzyły legendę 125th Street.", spotify:"https://open.spotify.com/search/Apollo%20Theater%20classics", apple:"https://music.apple.com/us/search?term=Apollo%20Theater" },
  { id:"yankees", title:"Yankee Stadium", subtitle:"Take Me Out to the Ball Game · New York, New York", dayId:"2026-08-28", panel:"stadium", forWhom:"Matylda + wszyscy", text:"Dwa utwory wystarczą, żeby rozpoznać seventh-inning stretch i finał stadionowego wieczoru.", spotify:"https://open.spotify.com/search/Take%20Me%20Out%20to%20the%20Ball%20Game", apple:"https://music.apple.com/us/search?term=New%20York%20New%20York%20Frank%20Sinatra" },
  { id:"nyc", title:"Nasz Nowy Jork", subtitle:"Playlista całej podróży", dayId:"2026-08-22", panel:"evening", forWhom:"Wszyscy", text:"Sinatra, Alicia Keys, LCD Soundsystem, Beastie Boys i utwory wybrane wspólnie przed wyjazdem.", spotify:"https://open.spotify.com/search/songs%20about%20New%20York", apple:"https://music.apple.com/us/search?term=New%20York%20playlist" }
];

const TRAVEL_APPS = [
  { title: "Connects: Arts + Culture", use: "Audioprzewodniki i trasy po MoMA, The Met i Whitney. W domu pobierzcie treści i sprawdźcie słuchawki.", meta: "Najważniejsza do muzeów · bezpłatna", priority: "Pobierz koniecznie", url: "https://apps.apple.com/us/app/connects-arts-culture/id1476456847" },
  { title: "NYC Ferry", use: "Rozkład na żywo, zakup i aktywacja biletu na rejs Pier 79 → St. George 27 sierpnia.", meta: "Staten Island Ferry jest osobnym, bezpłatnym promem", priority: "Pobierz koniecznie", url: "https://apps.apple.com/us/app/nyc-ferry/id1225258864" },
  { title: "The Official MTA App", use: "Metro i autobusy: bieżące odjazdy, zmiany tras, windy oraz planowanie przejazdów po mieście.", meta: "Przydatna każdego dnia", priority: "Pobierz koniecznie", url: "https://apps.apple.com/us/app/the-official-mta-app/id1297605670" },
  { title: "US Open Tennis", use: "Bilety, program dnia, mapa kompleksu i informacje o kortach podczas wizyty 26 sierpnia.", meta: "Bilet powinien być dostępny przed wyjściem z hotelu", priority: "Pobierz koniecznie", url: "https://apps.apple.com/us/app/us-open-tennis/id327455869" },
  { title: "MLB Ballpark", use: "Mobilne bilety na Yankees–Red Sox, informacje o stadionie i wejściach.", meta: "Zalogować się wcześniej tym samym adresem e-mail co przy zakupie", priority: "Pobierz koniecznie", url: "https://apps.apple.com/us/app/mlb-ballpark/id513135722" },
  { title: "Google Maps", use: "Zapisane punkty, nasze gotowe trasy i mapy offline jako zabezpieczenie przy słabym zasięgu.", meta: "Pobrać obszar Nowego Jorku przed podróżą", priority: "Przydatna", url: "https://apps.apple.com/us/app/google-maps/id585027354" }
];

const TO_BUY = [
  { title: "Hiromi · Blue Note", status: "Pilne", kind: "urgent", when: "23.08 · 20:00", text: "Kupić 3 × Table Seating. Cała trójka powinna przyjść razem; obowiązuje minimum konsumpcyjne.", action: "Kup bilety", url: "https://www.bluenotejazz.com/nyc/shows/?search=Hiromi" },
  { title: "MoMA", status: "Do kupienia", kind: "todo", when: "24.08 · 10:30", text: "Bilety na ustaloną godzinę. Przed zakupem potwierdzić aktualne wystawy i dostępność.", action: "Bilety MoMA", url: "https://visit.moma.org/select" },
  { title: "The Met", status: "Do zaplanowania", kind: "todo", when: "25.08 · 10:00", text: "Kupić bilety online, gdy plan Gosi będzie zaakceptowany. Bilet wstępu i nasza krótka trasa wystarczą.", action: "Wizyta i bilety", url: "https://www.metmuseum.org/plan-your-visit" },
  { title: "Whitney Museum", status: "Do rezerwacji", kind: "todo", when: "27.08 · 13:30", text: "Wybrać wejście czasowe po zatwierdzeniu dnia. Dla Matyldy również dodać właściwy bilet, nawet jeśli będzie bezpłatny.", action: "Bilety Whitney", url: "https://whitney.org/tickets" },
  { title: "NYC Ferry · Pier 79 → St. George", status: "W dniu rejsu", kind: "dayof", when: "27.08 · rano", text: "Nie kupować wiele miesięcy wcześniej. Kupić i aktywować w aplikacji tuż przed wejściem. Staten Island Ferry w drodze powrotnej jest bezpłatny.", action: "Rozkład i bilety", url: "https://www.ferry.nyc/routes-and-schedules/st-george/" },
  { title: "Bargemusic", status: "Po publikacji programu", kind: "later", when: "29.08", text: "Sprawdzić dokładny koncert i zasady rezerwacji, gdy organizator opublikuje pełny kalendarz na sierpień.", action: "Sprawdź program", url: "https://www.bargemusic.org/" },
  { title: "SUMMIT One Vanderbilt", status: "Tylko dobra pogoda", kind: "dayof", when: "wariant 27.08", text: "Nie rezerwować teraz. To elastyczny wieczorny wariant kupowany tego samego dnia po sprawdzeniu widoczności.", action: "Oficjalna strona", url: "https://summitov.com/" }
  ,{ title: "Guggenheim", status: "Po decyzji Gosi", kind: "later", when: "wariant 30.08 · 10:30", text: "Kupujemy tylko jeśli Gosia wybierze muzeum zamiast Grand Central. Rezerwacja na pierwsze wejście i twarde wyjście o 12:00.", action: "Godziny i bilety", url: "https://www.guggenheim.org/plan-your-visit" }
];

const PLACES = [
  { id:"village", title:"Greenwich Village", icon:"♟", category:"historia", text:"Bohema, Stonewall, brownstones, muzyka i serialowy Nowy Jork.", meta:"23.08 · 13:00", dayId:"2026-08-23", panel:"route", map:"https://www.google.com/maps/search/?api=1&query=Washington+Square+Park+New+York", image:"assets/places/washington-square.jpg" },
  { id:"bluenote", title:"Blue Note", icon:"♪", category:"muzyka", text:"Kameralny klub jazzowy i koncert Hiromi przy stoliku.", meta:"23.08 · 20:00", dayId:"2026-08-23", panel:"bluenote", map:"https://www.google.com/maps/search/?api=1&query=Blue+Note+Jazz+Club+NYC", image:"assets/places/blue-note.jpg" },
  { id:"moma", title:"MoMA", icon:"▣", category:"sztuka", text:"Modernizm, Frida i Diego, design, pop-art oraz wystawa o animacji.", meta:"24.08 · rano", dayId:"2026-08-24", panel:"museum", map:"https://www.google.com/maps/search/?api=1&query=Museum+of+Modern+Art+New+York" },
  { id:"rockefeller-shopping", title:"Rockefeller Center i zakupy", icon:"☆", category:"dla Matyldy", text:"Nike House of Innovation, Uniqlo, Sephora, Nintendo NY lub LEGO — wybieramy dwa główne sklepy i jeden szybki.", meta:"24.08 · popołudnie", dayId:"2026-08-24", panel:"shopping", map:"https://www.google.com/maps/search/?api=1&query=Rockefeller+Center+New+York" },
  { id:"met", title:"Museum Mile", icon:"◉", category:"sztuka", text:"Guggenheim, The Met i Fifth Avenue przy Central Parku.", meta:"25.08", dayId:"2026-08-25", panel:"museum", map:"https://www.google.com/maps/search/?api=1&query=Metropolitan+Museum+of+Art" },
  { id:"queens", title:"Queens", icon:"◎", category:"lokalnie", text:"Przemysłowe LIC, migracyjne Flushing, World’s Fair i US Open.", meta:"26.08", dayId:"2026-08-26", panel:"route", map:"https://www.google.com/maps/search/?api=1&query=Gantry+Plaza+State+Park" },
  { id:"liberty", title:"Port i Statua Wolności", icon:"★", category:"zdjęcia", text:"Dwa promy i instrukcja wspólnego ikonicznego zdjęcia.", meta:"27.08 · rano", dayId:"2026-08-27", panel:"photos", map:"https://www.google.com/maps/search/?api=1&query=Whitehall+Terminal+New+York" },
  { id:"downtown", title:"Lower Manhattan", icon:"$", category:"historia", text:"Charging Bull, Wall Street oraz 9/11 Memorial bez muzeum.", meta:"27.08 · rano", dayId:"2026-08-27", panel:"downtown", map:"https://www.google.com/maps/search/?api=1&query=Charging+Bull+New+York" },
  { id:"westside", title:"Whitney i High Line", icon:"↗", category:"sztuka", text:"Sztuka amerykańska, Meatpacking, dawna kolej i Hudson Yards.", meta:"27.08 · popołudnie", dayId:"2026-08-27", panel:"museum", map:"https://www.google.com/maps/search/?api=1&query=Whitney+Museum+New+York" },
  { id:"summit", title:"SUMMIT One Vanderbilt", icon:"△", category:"zdjęcia", status:"Opcjonalne · decyzja pogodowa", text:"Wieczorny widok na Manhattan i lustrzane instalacje. Bilet kupujemy dopiero tego samego dnia przy dobrej widoczności.", meta:"27.08 · wieczór", dayId:"2026-08-27", panel:"evening", map:"https://www.google.com/maps/search/?api=1&query=SUMMIT+One+Vanderbilt+New+York" },
  { id:"soho", title:"SoHo i Nolita", icon:"◇", category:"dla Matyldy", text:"Żeliwne fasady, streetwear, kosmetyki i niezależne butiki.", meta:"28.08 · rano", dayId:"2026-08-28", panel:"route", map:"https://www.google.com/maps/search/?api=1&query=Greene+Street+SoHo+New+York" },
  { id:"yankees", title:"Yankee Stadium", icon:"⚾", category:"sport", text:"Monument Park, zasady baseballu i Yankees–Red Sox.", meta:"28.08 · 19:05", dayId:"2026-08-28", panel:"stadium", map:"https://www.google.com/maps/search/?api=1&query=Yankee+Stadium" },
  { id:"dumbo", title:"DUMBO i Brooklyn Bridge Park", icon:"▱", category:"zdjęcia", text:"Manhattan Bridge, portowe magazyny, panorama i Bargemusic.", meta:"29.08 · rano", dayId:"2026-08-29", panel:"brooklyn", map:"https://www.google.com/maps/search/?api=1&query=Washington+Street+DUMBO" },
  { id:"harlem", title:"Harlem i Apollo", icon:"♫", category:"muzyka", text:"Great Migration, Harlem Renaissance, Apollo i Charlie Parker.", meta:"29.08 · popołudnie", dayId:"2026-08-29", panel:"apollo", map:"https://www.google.com/maps/search/?api=1&query=Apollo+Theater+New+York" },
  { id:"grandcentral", title:"Grand Central i NYPL", icon:"⌘", category:"historia", text:"Patience i Fortitude, odwrócone niebo oraz Whispering Gallery.", meta:"30.08 · wariant główny", dayId:"2026-08-30", panel:"walk", map:"https://www.google.com/maps/search/?api=1&query=Grand+Central+Terminal" },
  { id:"guggenheim", title:"Guggenheim od środka", icon:"◌", category:"sztuka", text:"Rotunda Wrighta i 90-minutowa trasa jako opcja dla Gosi.", meta:"30.08 · wariant", dayId:"2026-08-30", panel:"guggenheim", map:"https://www.google.com/maps/search/?api=1&query=Solomon+R+Guggenheim+Museum" }
];

const WALLET_ITEMS = [
  { id:"hotel", type:"hotel", title:TRIP.hotel.name, date:"22–30.08 · 8 nocy", place:TRIP.hotel.address, status:"Potwierdzić numer rezerwacji", dayId:"2026-08-22", panel:"transport", map:"https://www.google.com/maps/search/?api=1&query=Holiday+Inn+New+York+City+Times+Square+585+8th+Avenue" },
  { id:"flightout", type:"flight", title:"Lot do Nowego Jorku", date:"22.08 · Berlin 11:20 → JFK 16:59", place:"przez Londyn", status:"Dodać numery lotów i terminale", dayId:"2026-08-22", panel:"arrival" },
  { id:"blue", type:"music", title:"Hiromi · Blue Note", date:"23.08 · 20:00", place:"131 W 3rd St", status:"Do kupienia · 3 × Table Seating", dayId:"2026-08-23", panel:"bluenote", map:"https://www.google.com/maps/search/?api=1&query=Blue+Note+Jazz+Club+NYC" },
  { id:"broadway", type:"ticket", title:"Stranger Things", date:"25.08 · 19:00", place:"Marquis Theatre", status:"Kupione", dayId:"2026-08-25", panel:"theatre", map:"https://www.google.com/maps/search/?api=1&query=Marquis+Theatre+New+York" },
  { id:"usopen", type:"ticket", title:"US Open Mixed Doubles", date:"26.08 · 19:00", place:"USTA Billie Jean King National Tennis Center", status:"Kupione · aplikacja US Open", dayId:"2026-08-26", panel:"tennis", map:"https://www.google.com/maps/search/?api=1&query=USTA+Billie+Jean+King+National+Tennis+Center" },
  { id:"yankees", type:"ticket", title:"Yankees–Red Sox", date:"28.08 · 19:05", place:"Yankee Stadium", status:"Kupione · MLB Ballpark", dayId:"2026-08-28", panel:"stadium", map:"https://www.google.com/maps/search/?api=1&query=Yankee+Stadium" },
  { id:"flightback", type:"flight", title:"Lot powrotny", date:"30.08 · JFK 19:29", place:"JFK · terminal do potwierdzenia", status:"Dodać numer lotu", dayId:"2026-08-30", panel:"airport", map:"https://www.google.com/maps/search/?api=1&query=John+F+Kennedy+International+Airport" }
];
