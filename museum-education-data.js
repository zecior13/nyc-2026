// Warstwa edukacyjna muzeów: fotografie, profile artystów i cztery pytania do każdego dzieła.

const EXTERNAL_WORK_IMAGE_NUMBERS = {
  moma: ["moma-monet-waterlilies-2","moma-monet-agapanthus","moma-monet-footbridge","moma-vangogh-sorrow","moma-vangogh-potato","moma-vangogh-roulin","moma-vangogh-gachet","moma-picasso-jester","moma-picasso-nude-hands","moma-picasso-sleeping-head","moma-picasso-study-demoiselles","moma-picasso-repose","moma-picasso-landscape","moma-matisse-collioure","moma-matisse-music","moma-matisse-back","moma-matisse-jeannette-1","moma-matisse-jeannette-2","moma-matisse-jeannette-3","moma-matisse-jeannette-4","moma-matisse-aubergines","moma-pollock-western","moma-pollock-steer","moma-pollock-shewolf","moma-pollock-1a","moma-pollock-echo","moma-warhol-marilyn","moma-warhol-crash","moma-warhol-birmingham","moma-warhol-supper","moma-chagall-village","moma-kandinsky-archer","moma-kandinsky-campbell-1","moma-kandinsky-campbell-2","moma-kandinsky-campbell-3","moma-kandinsky-campbell-4"],
  guggenheim: ["gugg-kandinsky-blue-mountain","gugg-kandinsky-factory","gugg-kandinsky-improv-28","gugg-kandinsky-black-lines","gugg-kandinsky-white-border","gugg-kandinsky-red-oval","gugg-kandinsky-white-cross","gugg-kandinsky-upward","gugg-kandinsky-around","gugg-picasso-moulin","gugg-picasso-accordionist","gugg-picasso-woman-guitar","gugg-picasso-mandolin-guitar","gugg-picasso-pitcher-fruit","gugg-chagall-soldier","gugg-chagall-flying","gugg-pollock-alchemy","gugg-pollock-enchanted"],
  whitney: ["whitney-warhol-ethel","whitney-warhol-family","whitney-warhol-nine-jackies","whitney-warhol-before-after","whitney-warhol-rorschach","whitney-pollock-27"]
};

let externalImageNumber = 144;
Object.entries(EXTERNAL_WORK_IMAGE_NUMBERS).forEach(([museumId, ids]) => {
  const museum = MUSEUMS.find(item => item.id === museumId);
  ids.forEach(id => {
    const work = museum?.works.find(item => item.id === id);
    if (work) work.image = `assets/photos/${externalImageNumber}.jpg`;
    externalImageNumber += 1;
  });
});

// Druga paczka reprodukcji uzupełnia dzieła The Met, których oficjalne API
// nie udostępniało do automatycznego pobrania.
const MET_EXTERNAL_WORK_IMAGE_NUMBERS = {
  490117: 204, 492371: 205, 437131: 206, 437133: 207, 437136: 208,
  437135: 209, 459107: 210, 438003: 211, 437106: 212, 438004: 213,
  438005: 214, 437107: 215, 437108: 216, 437130: 217, 437109: 218,
  437110: 219, 437111: 220, 437138: 221, 437112: 222, 437115: 223,
  438823: 224, 437119: 225, 438006: 226, 437122: 227, 437121: 228,
  437124: 229, 437125: 230, 438007: 231, 438008: 232, 483301: 233,
  492700: 234, 495585: 235, 486920: 236, 488978: 237, 489971: 238,
  489645: 239, 488690: 240, 486162: 241, 488221: 242, 488710: 243,
  490018: 244, 486753: 245, 486754: 246, 500194: 247, 488319: 248
};

const metMuseumWithExternalImages = MUSEUMS.find(item => item.id === "met");
Object.entries(MET_EXTERNAL_WORK_IMAGE_NUMBERS).forEach(([objectId, number]) => {
  const work = metMuseumWithExternalImages?.works.find(item => Number(item.objectId) === Number(objectId));
  if (work) work.image = `assets/photos/${number}.jpg`;
});

// Bieżąca karta obiektu The Met ma pierwszeństwo przed wcześniejszym eksportem
// galerii. Head of a Woman figuruje obecnie jako „Not on view”.
const picassoHeadOfWoman = metMuseumWithExternalImages?.works.find(
  item => Number(item.objectId) === 489645
);
if (picassoHeadOfWoman) {
  picassoHeadOfWoman.status = "off";
  picassoHeadOfWoman.floor = "kolekcja · obecnie poza ekspozycją";
}

const ARTIST_BIOGRAPHIES = {
  "Agnolo Bronzino": ["Florencja · Włochy","Malarz dworu Medyceuszy, uczeń Pontorma. Portret był dla niego zarazem obrazem człowieka i narzędziem polityki.","Wpływy Pontorma → chłodne portrety dworskie → późne obrazy religijne.","Jedwab, biżuteria i dłonie malował równie znacząco jak twarz — strój mówi, kim model chciał być dla świata."],
  "Albert Gleizes": ["Paryż · Francja","Malarz i teoretyk kubizmu, zafascynowany ruchem nowoczesnego miasta bardziej niż wiernym odtworzeniem jednego widoku.","Postimpresjonizm → kubizm salonowy → coraz bardziej abstrakcyjne rytmy.","Wspólnie z Jeanem Metzingerem napisał w 1912 roku jedną z pierwszych książek wyjaśniających kubizm."],
  "Alexander Calder": ["Pensylwania · USA","Z wykształcenia inżynier, z rodzinnej tradycji artysta. Wiedza o konstrukcji pozwoliła mu uczynić równowagę i ruch tworzywem rzeźby.","Druciany cyrk → abstrakcyjne mobile → monumentalne stabiles.","Nazwę „mobile” zaproponował Marcel Duchamp; po francusku słowo oznacza zarówno ruch, jak i motyw."],
  "Amedeo Modigliani": ["Livorno · Włochy; działał w Paryżu","Przyjechał do Paryża z fascynacją dawną sztuką. Choroba, bieda i środowisko Montparnasse’u ukształtowały jego krótki, intensywny dorobek.","Wczesne malarstwo → rzeźba → dojrzałe portrety i akty.","Migdałowe, czasem puste oczy działają jak maska i psychologiczna zagadka, a nie brak charakteru."],
  "Andy Warhol": ["Pittsburgh · USA; rodzina łemkowskich imigrantów","Zaczynał jako ilustrator reklamowy. Grafika użytkowa, fascynacja gwiazdami i własne pragnienie przemiany w celebrytę doprowadziły go do pop-artu.","Ilustracja lat 50. → produkty, gwiazdy i katastrofy → Factory, film i portrety → późne cykle religijne i abstrakcje.","Powtórzenie nie oznacza identyczności: przesunięcia sita i ubytki farby sprawiają, że każda kopia jest trochę inna."],
  "Archibald Motley": ["Nowy Orlean/Chicago · USA","Portretował czarną klasę średnią i nocne ulice Bronzeville, łącząc obserwację społeczną z teatralnym kolorem.","Portrety tożsamości → zatłoczone sceny miejskie → późniejsze kompozycje symboliczne.","Nie mieszkał w Harlemie, choć łączy się go z Harlem Renaissance — jego najważniejszą sceną było Chicago."],
  "Auguste Rodin": ["Paryż · Francja","Długo pozostawał poza akademickim głównym nurtem. Fragment, nierówna powierzchnia i widoczny proces modelowania uczynił źródłem emocji.","Wczesny realizm → Wiek brązu → Brama Piekieł i warianty figur → pomniki publiczne.","Często zestawiał ponownie te same dłonie, torsy i głowy, traktując je jak elementy języka."],
  "Camille Pissarro": ["St. Thomas na Karaibach; działał we Francji","Najstarszy z głównej grupy impresjonistów i jej cierpliwy organizator. Malował zwykłą pracę, wieś oraz miasto bez hierarchii tematów.","Realistyczny pejzaż → impresjonizm → krótki pointylizm → miejskie serie.","Jako jedyny uczestniczył we wszystkich ośmiu wystawach impresjonistów."],
  "Caravaggio": ["Lombardia/Rzym · Włochy","Przeniósł święte historie do świata zwykłych ludzi i ciemnych rzymskich wnętrz. Burzliwe życie nadało obrazom fizyczną bezpośredniość.","Lombardzkie początki → Rzym → dramatyczne dzieła z lat ucieczki.","Kompozycję budował bezpośrednio farbą, a pozycje modeli zaznaczał czasem nacięciami."],
  "Claude Monet": ["Paryż/Le Havre · Francja","Dorastał nad kanałem La Manche, gdzie zmienne morze i niebo nauczyły go patrzeć na światło. Ogród w Giverny stał się prywatnym laboratorium widzenia.","Plener → narodziny impresjonizmu → serie stogów, katedr i Tamizy → późne nenufary.","Wiele obrazów z serii poprawiał równocześnie w pracowni, porównując światło z pamięcią."],
  "Constantin Brancusi": ["Hobița · Rumunia; działał w Paryżu","Wyszedł z tradycji rzemieślniczej i pieszo dotarł do Paryża. Odrzucił akademickie modelowanie na rzecz redukcji formy do znaku.","Akademizm → bezpośrednie kucie → serie Ptaka, Pocałunku i kolumn.","Cokoły projektował jako część dzieła; rzeźba i podstawa mogą zamienić się rolami."],
  "Diego Rivera": ["Guanajuato · Meksyk","Po europejskiej edukacji i kubizmie wrócił do Meksyku, aby tworzyć publiczną sztukę o historii, pracy i rewolucji.","Akademizm → kubizm paryski → muralizm → późne syntezy historii Meksyku.","Murale miały działać jak dostępny dla wszystkich podręcznik historii, czytany scenami i symbolami."],
  "Diego Velázquez": ["Sewilla/Madryt · Hiszpania","Od scen kuchennych przeszedł do roli malarza Filipa IV. Dwór stał się laboratorium pozy, spojrzenia i reprezentacji władzy.","Sewilskie bodegones → portrety dworskie → swobodny późny styl po podróżach do Włoch.","Z bliska późne obrazy rozpadają się na szybkie plamy; dopiero z dystansu powstają tkanina, włosy i powietrze."],
  "Duccio di Buoninsegna": ["Siena · Włochy","Tworzył u progu renesansu, gdy bizantyjska hierarchia spotykała się z nową czułością dla gestu, przestrzeni i emocji.","Wczesne ikony → monumentalna Maestà → narracyjne sceny o śmielszej przestrzeni.","Maestà była oglądana z obu stron i działała jak rozbudowana opowieść obrazkowa."],
  "Edgar Degas": ["Paryż · Francja","Akademicki rysownik zafascynowany fotografią, japońskim drzeworytem i kulisami miasta. Wolał pracę i próby od idealnego spektaklu.","Malarstwo historyczne → wyścigi i balet → radykalne pastele → późne rzeźby.","Choć wystawiał z impresjonistami, sam wolał określenie „realista” i pracował głównie w pracowni."],
  "Edward Hopper": ["Nyack, stan Nowy Jork · USA","Ilustrator i obserwator architektury. Koleje, kina, motele i miejskie światło zamieniał w sceny psychologicznego oczekiwania.","Ilustracja → akwaforty → dojrzałe obrazy samotności, światła i architektury.","Jego żona Jo prowadziła szczegółowe księgi obrazów, pomagające dziś odtworzyć okoliczności ich powstania."],
  "El Greco": ["Kreta → Wenecja/Rzym → Toledo","Wychowany w tradycji ikon, poznał wenecki kolor i manieryzm, a w Toledo stworzył własny duchowo napięty język.","Ikony kreteńskie → włoskie eksperymenty → wizjonerskie dzieła toledańskie.","Nienaturalne proporcje długo uznawano za błąd; moderniści zobaczyli w nich świadomą ekspresję."],
  "Emanuel Leutze": ["Wirtembergia; wychowany w USA","Niemiecko-amerykański malarz historii przedstawiający wydarzenia jak teatralne widowiska budujące zbiorową pamięć.","Portret → akademizm w Düsseldorfie → monumentalne tematy amerykańskie.","Washington Crossing the Delaware powstał w Niemczech i miał inspirować także europejskich zwolenników wolności."],
  "Faith Ringgold": ["Harlem, Nowy Jork · USA","Połączyła malarstwo z tekstem, tkaniną, aktywizmem i historią rodzinną. Instytucjonalne odrzucenie skłoniło ją do stworzenia story quilt.","Polityczne obrazy → maski i miękkie rzeźby → narracyjne quilts → książki.","Tkanina pozwalała zwijać prace i samodzielnie przewozić je poza tradycyjny obieg galerii."],
  "Franz Marc": ["Monachium · Niemcy","W zwierzętach szukał duchowej alternatywy dla cywilizacji. Przyjaźń z Kandinskym skierowała go ku ekspresyjnemu kolorowi.","Studia zwierząt → symboliczny kolor → niemal abstrakcyjna, rozbita forma.","Tworzył kod barw: błękit łączył z duchowością, żółć z kobiecością, a czerwień z materią."],
  "Frida Kahlo": ["Coyoacán · Meksyk","Wypadek autobusowy, przewlekły ból, rewolucyjny Meksyk i związek z Riverą ukształtowały sztukę opartą na ciele i tożsamości.","Autoportrety → obrazy bólu, płci i meksykańskości → późne martwe natury.","Znaczna część niewielkiego dorobku to autoportrety — własna twarz była modelem dostępnym podczas choroby."],
  "George Tooker": ["Brooklyn · USA","Klasyczną, powolną temperą opisywał niepokój nowoczesnych instytucji: metra, urzędów, szpitali i biur.","Sceny alienacji → zaangażowanie społeczne → obrazy wspólnoty i duchowości.","Powolna technika kontrastuje z anonimowym pośpiechem przedstawionego miasta."],
  "Georges Braque": ["Argenteuil/Le Havre · Francja","Od dekoratorskiego rzemiosła i fowizmu przeszedł do współpracy z Picassem. Razem rozłożyli przedmiot na równoczesne widoki.","Fowizm → kubizm analityczny → papier collé → późne martwe natury.","Litery i imitacje drewna przypominają, że obraz jest płaską, skonstruowaną powierzchnią."],
  "Georges Seurat": ["Paryż · Francja","Łączył klasyczną kompozycję z teoriami optyki. Kolory miały mieszać się w oku widza, a nie na palecie.","Rysunki conté → wielkie sceny pointylistyczne → obrazy rozrywki i sztucznego światła.","Wielkie płótna poprzedzały dziesiątki małych szkiców badających światło i układ postaci."],
  "Georgia O’Keeffe": ["Wisconsin · USA; Nowy Jork i Nowy Meksyk","Zaczęła od abstrakcyjnych rysunków, później powiększała kwiaty, kości i pejzaże, aby wymusić uważne patrzenie.","Abstrakcyjne węgle → kwiaty i wieżowce → pejzaże i kości Nowego Meksyku.","Odrzucała erotyczne interpretacje kwiatów; skala miała przede wszystkim zatrzymać rozpędzonego widza."],
  "Gustav Klimt": ["Wiedeń · Austria","Syn złotnika, akademicki dekorator i współzałożyciel Secesji. Ornament i złoto połączył z psychologicznym portretem.","Dekoracje historyczne → Secesja → złoty okres → późne barwne portrety i pejzaże.","Złote pola nawiązują do rzemiosła ojca i bizantyjskich mozaik oglądanych w Rawennie."],
  "Henri Matisse": ["Le Cateau-Cambrésis · Francja","Do sztuki trafił podczas rekonwalescencji. Kolor traktował nie jako opis natury, lecz narzędzie emocji, rytmu i równowagi.","Realizm → fowizm → radykalne wnętrza i rzeźba → Nicea → późne wycinanki.","Gdy choroba utrudniła malowanie, zaczął „rysować nożyczkami”, tworząc papierowe wycinanki."],
  "Henri Rousseau": ["Laval/Paryż · Francja","Samouk pracujący jako urzędnik celny. Dżungle budował z ogrodów botanicznych, ilustracji i wyobraźni.","Sceny podmiejskie → portrety i alegorie → monumentalne dżungle.","Nigdy nie odwiedził tropików; paryska szklarnia wystarczała mu jako punkt wyjścia do fantazji."],
  "Jackson Pollock": ["Wyoming/Kalifornia/Nowy Jork · USA","Zachód USA, nauka u Thomasa Harta Bentona, sztuka rdzennych kultur i psychoanaliza poprzedziły przeniesienie płótna na podłogę.","Figuracja i mity → przejście do abstrakcji → drip paintings 1947–50 → powrót ciemnej figury.","Nie był przypadkowym „chlapaczem”: kontrolował gęstość farby, rytm ruchu i kolejność warstw."],
  "Jacob Lawrence": ["Atlantic City/Harlem · USA","W środowisku Harlem Renaissance opowiadał historię czarnych Amerykanów w cyklach rytmicznych paneli.","Harlem → serie biograficzne → Migration Series → wojna i późniejsze opowieści o pracy.","Malował całą serię równocześnie, nanosząc kolejny kolor na wszystkie panele, aby utrzymać wspólny rytm."],
  "Jasper Johns": ["Georgia/Karolina Południowa · USA","Wybrał flagi, tarcze i cyfry — znaki tak znane, że widz pyta raczej „jak to zrobiono” niż „co to jest”.", "Flagi i tarcze → odciski ciała → złożone obrazy pamięci i cytatu.","Enkaustyka szybko zastyga i zachowuje ślad pędzla, a jednocześnie zatapia pod powierzchnią fragmenty gazet."],
  "Jean Metzinger": ["Nantes/Paryż · Francja","Malarz i teoretyk, który objaśniał kubizm jako łączenie wielu chwil i punktów widzenia.","Neoimpresjonizm → kubizm → bardziej dekoracyjna figuracja.","Jego pisma były kluczowe, bo Picasso i Braque początkowo niemal nie tłumaczyli swojej metody."],
  "Johannes Vermeer": ["Delft · Niderlandy","Stworzył niewielki dorobek cichych wnętrz, w których światło, uwaga i relacja postaci z przestrzenią są prawdziwym tematem.","Sceny historyczne → dojrzałe wnętrza → późniejsze, twardsze kompozycje.","Zachowało się tylko około 35 powszechnie uznanych obrazów Vermeera."],
  "John Singer Sargent": ["Florencja; amerykańska rodzina","Wychowany w podróży po Europie, został portrecistą kosmopolitycznych elit. Łączył szybki gest z kontrolą wizerunku.","Paryż → portrety londyńskie i amerykańskie → akwarele i murale.","Pozorna spontaniczność wymagała poprawek; potrafił zetrzeć głowę i zacząć ją od nowa."],
  "Kazimir Malevich": ["Kijów/Imperium Rosyjskie","Od scen chłopskich przeszedł przez kubofuturyzm do suprematyzmu — sztuki podstawowych figur i czystego odczucia.","Symbolizm i chłopi → kubofuturyzm → suprematyzm → powrót uproszczonej figury.","Czarny kwadrat zawiesił wysoko w rogu sali, w miejscu tradycyjnie przeznaczonym na ikonę."],
  "Louis Comfort Tiffany": ["Nowy Jork · USA","Projektant wnętrz i eksperymentator szkła, syn założyciela Tiffany & Co. Światło traktował jak zmienny pigment.","Malarstwo → Favrile glass → lampy, okna i kompletne wnętrza.","Ważną rolę w wielu projektach lamp odgrywała Clara Driscoll i jej zespół kobiet."],
  "Mabel Dwight": ["Cincinnati/Nowy Jork · USA","Do grafiki zwróciła się po pięćdziesiątce. Litografie stały się empatyczną i satyryczną obserwacją miejskich tłumów.","Malarstwo → nauka litografii w Paryżu → realizm społeczny i grafiki antyfaszystowskie.","Późny start nie przeszkodził jej zostać jedną z najważniejszych amerykańskich litografek międzywojnia."],
  "Marc Chagall": ["Witebsk · dzisiejsza Białoruś; Paryż","Żydowskie dzieciństwo, emigracja, miłość do Belli i utrata rodzinnego świata stały się materiałem obrazów pamięci.","Witebsk i Paryż → rewolucja i teatr → emigracja i wojna → późne witraże.","Latające postacie to stały język pamięci i miłości, w którym emocja jest silniejsza od grawitacji."],
  "Mary Cassatt": ["Pensylwania · USA; działała w Paryżu","Amerykanka w kręgu impresjonistów. Pokazywała teatr, dom i opiekę nad dzieckiem bez akademickiej idealizacji.","Akademizm → impresjonizm → grafiki inspirowane Japonią → syntetyczne sceny macierzyństwa.","Doradzała amerykańskim kolekcjonerom, wpływając na obecność impresjonistów w muzeach USA."],
  "Meret Oppenheim": ["Berlin/Szwajcaria; działała w Paryżu","Łączyła codzienne przedmioty i materiały tak, by uruchamiać dotyk, pragnienie i niepokój.","Paryski surrealizm → kryzys i przerwa → niezależny, różnorodny powrót.","Nie chciała pozostać „artystką jednego futrzanego przedmiotu” i broniła różnorodności swojej praktyki."],
  "Pablo Picasso": ["Málaga · Hiszpania; działał we Francji","Cudowne dziecko akademickiego rysunku, które przez osiem dekad stale zmieniało reguły. Relacje, wojna i dawna sztuka uruchamiały nowe języki.","Błękitny → różowy → kubizm → klasycyzm → deformacja → późne wariacje mistrzów.","Nie porzucał stylów jak szczebli drabiny — swobodnie do nich wracał, dlatego data jest kluczem do konkretnego dzieła."],
  "Paul Cézanne": ["Aix-en-Provence · Francja","Próbował pogodzić bezpośrednie widzenie impresjonistów z trwałą konstrukcją obrazu.","Ciemne początki → impresjonistyczne rozjaśnienie → martwe natury, kąpiący się i Mont Sainte-Victoire.","Celowo przesuwał perspektywę: patrzenie trwa w czasie, więc obraz nie musi udawać jednego nieruchomego oka."],
  "Paul Gauguin": ["Paryż · Francja; dzieciństwo w Peru","Makler, który porzucił mieszczańskie życie dla sztuki. Jego poszukiwania trzeba dziś czytać również przez kolonializm i nadużycia.","Impresjonizm → syntetyzm w Bretanii → Tahiti i symboliczne płaskie kompozycje.","Egzotyczny „raj” był częściowo konstrukcją łączącą obserwację z europejskimi mitami."],
  "Paul Klee": ["Münchenbuchsee · Szwajcaria; Niemcy","Wykształcony muzycznie rysownik i pedagog Bauhausu. Obraz traktował jak proces wzrostu, rytm i system znaków.","Rysunek → przełom koloru w Tunezji → Bauhaus → późne uproszczone znaki.","Był znakomitym skrzypkiem; rytm, polifonię i wariację przenosił do malarstwa."],
  "Pierre-Auguste Renoir": ["Limoges/Paryż · Francja","Zaczynał jako dekorator porcelany. Impresjonistyczne światło połączył z fascynacją skórą, tkaniną i towarzyskością.","Realizm → impresjonizm → faza klasyczna → późne miękkie akty i pejzaże.","Mimo ciężkiego zapalenia stawów malował do końca życia przy pomocy dostosowanych narzędzi."],
  "Piet Mondrian": ["Amersfoort · Niderlandy; Paryż i Nowy Jork","Od drzew i wydm doszedł do pionów, poziomów i barw podstawowych. Nowojorska siatka oraz jazz ożywiły jego system.","Pejzaż → kubistyczne drzewa → neoplastycyzm → pulsujące obrazy Nowego Jorku.","Nie pracował mechanicznie linijką; ręcznie poprawiał pola, szukając dynamicznej równowagi."],
  "Rembrandt": ["Lejda/Amsterdam · Niderlandy","Syn młynarza i ambitny portrecista. Sukces, bankructwo i straty pogłębiły jego zainteresowanie starością i wnętrzem człowieka.","Lejda → sukces portretowy → dramat historyczny → późne gęste malarstwo.","Autoportrety były autobiografią, ale też laboratorium min, światła, stroju i starzenia."],
  "Salvador Dalí": ["Figueres/Katalonia · Hiszpania","Technicznie zdolny prowokator połączył akademicką precyzję ze snem, psychoanalizą i świadomie budowaną osobowością medialną.","Awangarda → surrealizm → amerykańska sława → późny mistycyzm i nauka.","Teatralny wizerunek był częścią strategii — Dalí traktował rozgłos jak kolejne medium."],
  "Starożytny Egipt": ["Dolina Nilu · Afryka Północno-Wschodnia","To tysiące twórców pracujących zespołowo dla świątyń, dworu i grobowców, a nie jeden anonimowy „artysta”.","Stare → Średnie → Nowe Państwo → okresy późne i grecko-rzymskie.","Układ ciała był systemem informacji: każdą część pokazywano z najbardziej rozpoznawalnej strony."],
  "Stuart Davis": ["Filadelfia/Nowy Jork · USA","Gazety, reklama i jazz połączył z europejskim modernizmem w ostrym języku koloru.","Ashcan School → kubizujące martwe natury → płaskie kompozycje słów i rytmu.","Przerabiał wcześniejsze motywy jak standard jazzowy poddawany kolejnym improwizacjom."],
  "Sun Yuan & Peng Yu": ["Pekin · Chiny","Duet tworzący maszyny wykonujące pozornie bezsensowną pracę; tematem jest władza, kontrola i odpowiedzialność widza.","Radykalne działania lat 90. → materiały biologiczne → wielkie instalacje kinetyczne.","Powtarzalny wysiłek mechanizmu staje się metaforą systemu, który nie potrafi przerwać własnego działania."],
  "Vasily Kandinsky": ["Moskwa · Rosja; Monachium i Francja","Porzucił prawo dla sztuki. Muzyka, rosyjski folklor i wiara w duchową siłę koloru poprowadziły go ku abstrakcji.","Pejzaże → ekspresyjne improwizacje → geometryczny Bauhaus → biomorficzny Paryż.","Impresje, improwizacje i kompozycje oznaczały różny stopień przygotowania dzieła."],
  "Vincent van Gogh": ["Zundert · Niderlandy; Francja","Późno wybrał sztukę po nieudanych próbach pracy i kaznodziejstwa. Samokształcenie, listy do Theo i kryzysy ukształtowały dekadę twórczości.","Holandia → Paryż → Arles → Saint-Rémy → Auvers.","Nie malował w ciągłym szale: listy pokazują metodyczne planowanie teorii koloru i serii motywów."],
  "Willem de Kooning": ["Rotterdam · Niderlandy; Nowy Jork","Przybył do USA jako pasażer na gapę. Nigdy nie przyjął ostrego podziału między figuracją a abstrakcją.","Figury → czarno-białe abstrakcje → Women → pejzażowe abstrakcje → późne jasne linie.","Wielokrotnie zeskrobywał i przesuwał formy, pozostawiając historię decyzji."],
  "Winslow Homer": ["Boston/Maine · USA","Zaczynał jako ilustrator wojny secesyjnej, później skupił się na relacji człowieka z morzem, pogodą i pracą.","Ilustracje wojenne → wieś → akwarele podróżne → monumentalne morze w Maine.","Reporterskie doświadczenie nauczyło go budować scenę z jednego bardzo czytelnego gestu."],
  "Édouard Manet": ["Paryż · Francja","Znał dawnych mistrzów, lecz ich kompozycje przenosił do współczesnego Paryża. Skandale otworzyły debatę o nowoczesności.","Realizm → przełom lat 60. → nowoczesne życie → późne martwe natury i portrety.","Nie wystawiał na niezależnych wystawach impresjonistów, choć był dla nich kluczowym punktem odniesienia."]
};

Object.entries(ARTIST_BIOGRAPHIES).forEach(([artist, parts]) => {
  ARTIST_PROFILES[artist] = { ...(ARTIST_PROFILES[artist] || {}), origin: parts[0], bio: parts[1], periods: parts[2], curiosity: parts[3] };
});

function artworkSubject(work) {
  const title = work.title.toLocaleLowerCase("pl");
  if (/water lilies|nenufar|agapanthus|japoński mostek|japanese footbridge/.test(title)) return "Patrzysz na powierzchnię stawu w Giverny, na której odbicia, rośliny i głębia wody przestają tworzyć trzy osobne warstwy. Horyzont znika, więc wzrok może swobodnie wędrować po całym polu obrazu.";
  if (/self-portrait|autoportret/.test(title)) return "To autoportret: zacznij od spojrzenia, pozy i sposobu konstruowania własnego wizerunku, zamiast traktować twarz jak neutralny zapis wyglądu.";
  if (/portrait|portret|woman|kobiet|man |mężczy|madame|girl|dziew|boy|chłop|odalisque|actor|l'arlesienne|berceuse/.test(title)) return "To przedstawienie człowieka. Najpierw odczytaj pozę, spojrzenie i relację z tłem; potem przyjrzyj się ubraniu, dłoniom i rekwizytom.";
  if (/landscape|pejzaż|garden|ogród|seine|vétheuil|argenteuil|saint-rémy|mountain|gór|trees|drzew|orchard|park|field|pole|étretat|giverny|bridge|most|venice|brooklyn/.test(title)) return "To pejzaż, lecz właściwym tematem jest sposób widzenia miejsca. Porównaj pierwszy plan, horyzont i rytm prowadzący wzrok w głąb, a następnie światło oraz pogodę.";
  if (/still life|martwa natura|flowers|kwiat|sunflower|słonecz|lilac|chrysanthem|bouquet|apples|grapes|fruit|brioche|lilies|nenufar|agapanthus|irises|oleander/.test(title)) return "To martwa natura lub studium roślin. Zobacz układ dużych plam, kierunek łodyg i różnice powierzchni — przedmioty są pretekstem do budowania koloru oraz rytmu.";
  if (/number|improvis|composition|kompozyc|alchemy|rorschach|lines|linie|oval|cross|circle|koł|echo|rhythm|untitled|bez tytułu/.test(title)) return "Nie szukaj jednej ukrytej sceny. Najpierw zobacz kierunki ruchu, największe pola koloru i miejsca zagęszczenia; dopiero potem sprawdź, czy wyłaniają się figury lub przestrzeń.";
  if (/dance|taniec|music|muzyk|football|piłkar|circus|cyrk|war series|wojn/.test(title)) return "Kompozycja opiera się na działaniu i rytmie grupy. Śledź kolejność gestów, powtarzające się kształty i przerwy między postaciami.";
  if (/back|plecy|jeannette|jester|błazen/.test(title) || work.section === "rzeźba") return "Obejdź dzieło wzrokiem jak obiekt. Porównaj sylwetkę, ciężar, powierzchnię i to, jak forma zmienia się zależnie od punktu widzenia.";
  return `Najpierw nazwij własnymi słowami, co widzisz w „${work.title}”: główne figury, największe pola koloru i kierunek ruchu wzroku. Dopiero potem potraktuj tytuł jako podpowiedź.`;
}

function artworkCuriosity(work, museum, count, profile) {
  const status = work.status === "on" ? `Według migawki katalogu dzieło jest pokazywane w ${museum.name}${work.floor ? ` (${work.floor})` : ""}.` : work.status === "off" ? "Dzieło należy do kolekcji, lecz obecnie nie jest wystawiane — karta pomoże je rozpoznać po przyszłej zmianie ekspozycji." : "Ekspozycja podlega rotacji, dlatego obecność dzieła trzeba potwierdzić w dniu wizyty.";
  const fact = profile.curiosity ? `${profile.curiosity} ` : "";
  const countLabel = count >= 2 && count <= 4 ? "prace" : "prac";
  return fact + status + (count > 1 ? ` W aplikacji są ${count} ${countLabel} tego artysty: porównaj ten sam język w różnych latach.` : "");
}

MUSEUMS.forEach(museum => museum.works.forEach(work => {
  const profile = ARTIST_PROFILES[work.artist] || {};
  const count = museum.works.filter(item => item.artist === work.artist).length;
  work.see = work.see || artworkSubject(work);
  work.importance = work.why || `${work.title} pokazuje język artysty w okresie ${work.year}. ${profile.breakthrough || "Dzieło pomaga zrozumieć zmianę sposobu przedstawiania."}`;
  work.curiosity = work.curiosity || artworkCuriosity(work, museum, count, profile);
}));
