import type { Locale } from "../i18n";

export type MerchPackageId = "starter" | "kiez" | "custom";

export interface MerchPackage {
  id: MerchPackageId;
  name: string;
  subtitle: string;
  stickerCount: number;
  patchCount: number;
  suggestedDonationText?: string;
  badge?: string;
  features: string[];
}

export interface MerchSpec {
  label: string;
  value: string;
}

export interface StreetPhotoItem {
  id: string;
  imageUrl: string;
  caption: string;
  locationTag: string;
}

const MERCH_PACKAGES_BY_LOCALE: Record<Locale, MerchPackage[]> = {
  de: [
    {
      id: "starter",
      name: "Starter-Paket",
      subtitle: "Für Rucksack, Jacke & Freundeskreis",
      stickerCount: 10,
      patchCount: 1,
      features: [
        "1× gewebter Antifa-Peng-Patch (7 × 7 cm, zum Aufnähen oder Aufbügeln)",
        "10× wetterfeste Outdoor-Sticker (5 × 5 cm, UV-beständig)",
        "Inkl. kleiner Grußkarte mit Ideen für ein herzliches Miteinander",
      ],
    },
    {
      id: "kiez",
      name: "Nachbarschafts-Paket",
      subtitle: "Zum Teilen im Verein, Betrieb oder Hausflur",
      stickerCount: 50,
      patchCount: 3,
      badge: "Beliebt für Gruppen",
      features: [
        "3× gewebte Antifa-Peng-Patches für dich und zwei Herzensmenschen",
        "50× langlebige Sticker für Nachbarschaft, Campus & Kulturorte",
        "Finanziert über den Soli-Beitrag ein kostenfreies Paket für Menschen mit wenig Geld mit",
      ],
    },
    {
      id: "custom",
      name: "Individuelles Paket",
      subtitle: "Für Stadtfeste, Schulprojekte & lokale Initiativen",
      stickerCount: 100,
      patchCount: 5,
      features: [
        "Frei wählbare Anzahl an Patches und Stickern nach eurem Bedarf",
        "Ideal für Infostände, Jugendzentren, Sportvereine und Nachbarschaftsfeste",
        "Auf Wunsch auch komplett kostenfrei über unseren Solidaritäts-Topf",
      ],
    },
  ],
  en: [
    {
      id: "starter",
      name: "Starter Pack",
      subtitle: "For your backpack, jacket & close friends",
      stickerCount: 10,
      patchCount: 1,
      features: [
        "1× woven Antifa Peng patch (7 × 7 cm, iron-on or sew-on)",
        "10× weatherproof outdoor stickers (5 × 5 cm, UV-resistant)",
        "Includes a friendly greeting card with ideas for community dialogue",
      ],
    },
    {
      id: "kiez",
      name: "Neighborhood Pack",
      subtitle: "To share at work, sports clubs, or in your community",
      stickerCount: 50,
      patchCount: 3,
      badge: "Popular for Groups",
      features: [
        "3× woven Antifa Peng patches for you and two friends",
        "50× durable stickers for your neighborhood, campus & community spaces",
        "Solidarity contribution helps fund a free pack for someone on a tight budget",
      ],
    },
    {
      id: "custom",
      name: "Custom Community Pack",
      subtitle: "For street festivals, schools & local alliances",
      stickerCount: 100,
      patchCount: 5,
      features: [
        "Flexible quantity of patches and stickers tailored to your project",
        "Ideal for info booths, youth centers, clubs, and neighborhood gatherings",
        "Available completely free of charge via our solidarity fund if needed",
      ],
    },
  ],
  fr: [
    {
      id: "starter",
      name: "Pack Découverte",
      subtitle: "Pour sac à dos, veste et amis proches",
      stickerCount: 10,
      patchCount: 1,
      features: [
        "1× écusson tissé Antifa Peng (7 × 7 cm, thermocollant ou à coudre)",
        "10× autocollants résistants aux intempéries (5 × 5 cm, anti-UV)",
        "Inclut une carte conviviale avec des idées pour le dialogue citoyen",
      ],
    },
    {
      id: "kiez",
      name: "Pack Quartier",
      subtitle: "À partager dans votre association, travail ou quartier",
      stickerCount: 50,
      patchCount: 3,
      badge: "Populaire",
      features: [
        "3× écussons tissés Antifa Peng pour vous et vos proches",
        "50× autocollants durables pour le quartier, le campus et les lieux culturels",
        "La contribution solidaire finance un pack gratuit pour les personnes à petit budget",
      ],
    },
    {
      id: "custom",
      name: "Pack Collectif sur Mesure",
      subtitle: "Pour fêtes de quartier, écoles et initiatives locales",
      stickerCount: 100,
      patchCount: 5,
      features: [
        "Quantité libre d'écussons et d'autocollants selon vos besoins",
        "Idéal pour stands d'information, centres de jeunesse et rencontres locales",
        "Possiblement gratuit via notre caisse de solidarité sur simple demande",
      ],
    },
  ],
  es: [
    {
      id: "starter",
      name: "Paquete Inicial",
      subtitle: "Para mochila, chaqueta y amistades",
      stickerCount: 10,
      patchCount: 1,
      features: [
        "1× parche tejido Antifa Peng (7 × 7 cm, para planchar o coser)",
        "10× pegatinas resistentes al clima (5 × 5 cm, protección UV)",
        "Incluye tarjeta con ideas para el diálogo y la convivencia vecinal",
      ],
    },
    {
      id: "kiez",
      name: "Paquete Vecinal",
      subtitle: "Para compartir en el barrio, trabajo o asociación",
      stickerCount: 50,
      patchCount: 3,
      badge: "Popular en grupos",
      features: [
        "3× parches tejidos Antifa Peng para ti y dos personas más",
        "50× pegatinas duraderas para el barrio, campus y espacios culturales",
        "El aporte solidario financia paquetes gratuitos para personas con pocos recursos",
      ],
    },
    {
      id: "custom",
      name: "Paquete Comunitario Personalizado",
      subtitle: "Para festivales locales, escuelas e iniciativas",
      stickerCount: 100,
      patchCount: 5,
      features: [
        "Cantidad flexible de parches y pegatinas según vuestra iniciativa",
        "Ideal para mesas informativas, centros juveniles y encuentros vecinales",
        "Disponible de forma gratuita mediante nuestro fondo solidario",
      ],
    },
  ],
  tr: [
    {
      id: "starter",
      name: "Başlangıç Paketi",
      subtitle: "Sırt çantası, ceket ve yakın dostlar için",
      stickerCount: 10,
      patchCount: 1,
      features: [
        "1× dokuma Antifa Peng arma (7 × 7 cm, ütüyle veya dikerek uygulanır)",
        "10× hava koşullarına dayanıklı çıkartma (5 × 5 cm, UV korumalı)",
        "Samimi diyalog ve dayanışma fikirleri içeren kart dahildir",
      ],
    },
    {
      id: "kiez",
      name: "Mahalle Paketi",
      subtitle: "Dernekte, iş yerinde veya mahallede paylaşmak için",
      stickerCount: 50,
      patchCount: 3,
      badge: "Gruplar İçin Popüler",
      features: [
        "Kendiniz ve iki dostunuz için 3× dokuma Antifa Peng arma",
        "Mahalle, kampüs ve kültür mekanları için 50× dayanıklı çıkartma",
        "Dayanışma katkısı, bütçesi kısıtlı kişiler için ücretsiz paketleri destekler",
      ],
    },
    {
      id: "custom",
      name: "Özel Topluluk Paketi",
      subtitle: "Şenlikler, okul projeleri ve yerel girişimler için",
      stickerCount: 100,
      patchCount: 5,
      features: [
        "İhtiyacınıza göre esnek sayıda arma ve çıkartma seçimi",
        "Bilgi stantları, gençlik merkezleri ve komşuluk buluşmaları için ideal",
        "İhtiyaç halinde dayanışma fonumuzdan tamamen ücretsiz temin edilebilir",
      ],
    },
  ],
  uk: [
    {
      id: "starter",
      name: "Стартовий набір",
      subtitle: "Для рюкзака, куртки та друзів",
      stickerCount: 10,
      patchCount: 1,
      features: [
        "1× тканий шеврон Antifa Peng (Ø 7 × 7 см, на праску або пришивання)",
        "10× водостійких стікерів (5 × 5 см, захист від УФ)",
        "Вітальна листівка з ідеями для добросусідського діалогу",
      ],
    },
    {
      id: "kiez",
      name: "Сусідський набір",
      subtitle: "Для спільноти, колег та культурних просторів",
      stickerCount: 50,
      patchCount: 3,
      badge: "Популярний вибір",
      features: [
        "3× ткані шеврони Antifa Peng для вас і друзів",
        "50× довговічних стікерів для району, кампусу та ініціатив",
        "Солідарний внесок допомагає безкоштовно надсилати набори тим, хто цього потребує",
      ],
    },
    {
      id: "custom",
      name: "Індивідуальний набір",
      subtitle: "Для фестивалів, шкільних проєктів та місцевих спільнот",
      stickerCount: 100,
      patchCount: 5,
      features: [
        "Довільна кількість шевронів та стікерів за вашою потребою",
        "Ідеально для інфостендів, молодіжних центрів та локальних зустрічей",
        "За потреби надається безкоштовно через фонд солідарності",
      ],
    },
  ],
  pl: [
    {
      id: "starter",
      name: "Pakiet Startowy",
      subtitle: "Na plecak, kurtkę i dla przyjaciół",
      stickerCount: 10,
      patchCount: 1,
      features: [
        "1× tkana naszywka Antifa Peng (7 × 7 cm, do naprasowania lub przyszycia)",
        "10× odpornych na pogodę naklejek (5 × 5 cm, odporne na UV)",
        "Kartka z pomysłami na budowanie życzliwego sąsiedztwa",
      ],
    },
    {
      id: "kiez",
      name: "Pakiet Sąsiedzki",
      subtitle: "Do podziału w pracy, klubie lub na osiedlu",
      stickerCount: 50,
      patchCount: 3,
      badge: "Popularny dla grup",
      features: [
        "3× tkane naszywki Antifa Peng dla Ciebie i bliskich osób",
        "50× trwałych naklejek dla sąsiedztwa, kampusu i miejsc kultury",
        "Wsparcie solidarne finansuje darmowy pakiet dla osób o mniejszym budżecie",
      ],
    },
    {
      id: "custom",
      name: "Pakiet Indywidualny",
      subtitle: "Na festyny, projekty szkolne i lokalne inicjatywy",
      stickerCount: 100,
      patchCount: 5,
      features: [
        "Dowolna liczba naszywek i naklejek dopasowana do Waszych potrzeb",
        "Idealny na stoiska informacyjne, dla domów kultury i spotkań sąsiedzkich",
        "Dostępny również całkowicie bezpłatnie z naszego funduszu solidarnościowego",
      ],
    },
  ],
  it: [
    {
      id: "starter",
      name: "Pacchetto Starter",
      subtitle: "Per zaino, giacca e amici",
      stickerCount: 10,
      patchCount: 1,
      features: [
        "1× toppa tessuta Antifa Peng (7 × 7 cm, termoadesiva o da cucire)",
        "10× adesivi resistenti alle intemperie (5 × 5 cm, anti-UV)",
        "Include biglietto con spunti per il dialogo e la convivenza",
      ],
    },
    {
      id: "kiez",
      name: "Pacchetto Quartiere",
      subtitle: "Da condividere in associazione, al lavoro o nel vicinato",
      stickerCount: 50,
      patchCount: 3,
      badge: "Scelto dai gruppi",
      features: [
        "3× toppe tessute Antifa Peng per te e due amici",
        "50× adesivi durevoli per quartiere, università e spazi culturali",
        "Il contributo solidale finanzia un pacchetto gratuito per chi ha meno risorse",
      ],
    },
    {
      id: "custom",
      name: "Pacchetto Comunità su Misura",
      subtitle: "Per feste di quartiere, scuole e iniziative locali",
      stickerCount: 100,
      patchCount: 5,
      features: [
        "Quantità flessibile di toppe e adesivi in base alle vostre esigenze",
        "Ideale per banchetti informativi, centri giovanili e incontri locali",
        "Disponibile anche gratuitamente tramite il nostro fondo di solidarietà",
      ],
    },
  ],
  ru: [
    {
      id: "starter",
      name: "Стартовый набор",
      subtitle: "Для рюкзака, куртки и друзей",
      stickerCount: 10,
      patchCount: 1,
      features: [
        "1× тканый шеврон Antifa Peng (Ø 7 × 7 см, термоклеевой или пришивной)",
        "10× влагостойких стикеров (5 × 5 см, защита от УФ)",
        "Открытка с идеями для добрососедского диалога и взаимопомощи",
      ],
    },
    {
      id: "kiez",
      name: "Соседский набор",
      subtitle: "Для обмена с коллегами, соседями и друзьями",
      stickerCount: 50,
      patchCount: 3,
      badge: "Популярно для групп",
      features: [
        "3× тканых шеврона Antifa Peng для вас и близких",
        "50× долговечных стикеров для района, кампуса и культурных центров",
        "Солидарный взнос помогает бесплатно отправлять наборы тем, кому сложно оплатить",
      ],
    },
    {
      id: "custom",
      name: "Индивидуальный набор",
      subtitle: "Для городских праздников, школ и местных инициатив",
      stickerCount: 100,
      patchCount: 5,
      features: [
        "Свободный выбор количества шевронов и стикеров под ваш проект",
        "Идеально для инфостендов, молодежных клубов и соседских встреч",
        "При необходимости предоставляется бесплатно из фонда солидарности",
      ],
    },
  ],
};

export function getMerchPackages(lang: Locale): MerchPackage[] {
  return MERCH_PACKAGES_BY_LOCALE[lang] ?? MERCH_PACKAGES_BY_LOCALE.de;
}

export function getStreetPhotos(
  lang: Locale,
  baseUrl = "/",
): StreetPhotoItem[] {
  const isDe = lang === "de";
  return [
    {
      id: "patches-close",
      imageUrl: `${baseUrl}antifa-peng-patches.jpg`,
      caption: isDe
        ? "Gewebte Antifa-Peng-Patches: Ein freundliches Zeichen für Zusammenhalt im Alltag."
        : "Woven Antifa Peng patches: A warm everyday sign of solidarity and kindness.",
      locationTag: isDe ? "Handwerk & Textil" : "Woven Emblem",
    },
    {
      id: "stickers-stack",
      imageUrl: `${baseUrl}antifa-peng-stickers.jpg`,
      caption: isDe
        ? "Outdoor-Sticker und Patches bereit für den Versand an Nachbarschaften und Vereine."
        : "Outdoor stickers and patches ready to ship to neighborhoods and community groups.",
      locationTag: isDe ? "Soli-Versand" : "Community Post",
    },
    {
      id: "cutted-1",
      imageUrl: `${baseUrl}cutted_antifa_peng.jpg`,
      caption: isDe
        ? "Farbenfroh für Frieden, Vielfalt und unseren blauen Planeten."
        : "Colorful for peace, diversity, and our shared Blue Planet.",
      locationTag: isDe ? "Straßenbild" : "Everyday Visibility",
    },
    {
      id: "cutted-2",
      imageUrl: `${baseUrl}cut_antifapeng_2.jpg`,
      caption: isDe
        ? "Ein Lächeln, das verbindet: »Hier bist du willkommen und sicher.«"
        : "A smile that connects: 'Here you are welcome and safe.'",
      locationTag: isDe ? "Offene Gesellschaft" : "Open Society",
    },
  ];
}
