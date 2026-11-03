import type { Locale } from "../i18n";

export type FederalStateCode =
  | "federal"
  | "BW"
  | "BY"
  | "BE"
  | "BB"
  | "HB"
  | "HH"
  | "HE"
  | "MV"
  | "NI"
  | "NW"
  | "RP"
  | "SL"
  | "SN"
  | "ST"
  | "SH"
  | "TH";

export type InitiativeCategory =
  "counseling" | "alliance" | "climate" | "youth";

export interface Initiative {
  id: string;
  name: string;
  state: FederalStateCode;
  category: InitiativeCategory;
  description: string;
  website: string;
  emergencyContact?: string;
  isVerified: boolean;
}

export interface FederalStateInfo {
  code: FederalStateCode;
  nameDe: string;
  nameEn: string;
}

export const FEDERAL_STATES: FederalStateInfo[] = [
  { code: "federal", nameDe: "Bundesweit", nameEn: "Nationwide" },
  { code: "BW", nameDe: "Baden-Württemberg", nameEn: "Baden-Württemberg" },
  { code: "BY", nameDe: "Bayern", nameEn: "Bavaria" },
  { code: "BE", nameDe: "Berlin", nameEn: "Berlin" },
  { code: "BB", nameDe: "Brandenburg", nameEn: "Brandenburg" },
  { code: "HB", nameDe: "Bremen", nameEn: "Bremen" },
  { code: "HH", nameDe: "Hamburg", nameEn: "Hamburg" },
  { code: "HE", nameDe: "Hessen", nameEn: "Hesse" },
  {
    code: "MV",
    nameDe: "Mecklenburg-Vorpommern",
    nameEn: "Mecklenburg-Western Pomerania",
  },
  { code: "NI", nameDe: "Niedersachsen", nameEn: "Lower Saxony" },
  {
    code: "NW",
    nameDe: "Nordrhein-Westfalen",
    nameEn: "North Rhine-Westphalia",
  },
  { code: "RP", nameDe: "Rheinland-Pfalz", nameEn: "Rhineland-Palatinate" },
  { code: "SL", nameDe: "Saarland", nameEn: "Saarland" },
  { code: "SN", nameDe: "Sachsen", nameEn: "Saxony" },
  { code: "ST", nameDe: "Sachsen-Anhalt", nameEn: "Saxony-Anhalt" },
  { code: "SH", nameDe: "Schleswig-Holstein", nameEn: "Schleswig-Holstein" },
  { code: "TH", nameDe: "Thüringen", nameEn: "Thuringia" },
];

interface RawInitiative {
  id: string;
  name: string;
  state: FederalStateCode;
  category: InitiativeCategory;
  website: string;
  emergencyContact?: string;
  isVerified: boolean;
  descDe: string;
  descEn: string;
}

const RAW_INITIATIVES: RawInitiative[] = [
  {
    id: "vbrg-federal",
    name: "VBRG e.V. — Dachverband der Beratungsstellen",
    state: "federal",
    category: "counseling",
    website: "https://www.rechte-gewalt.de",
    emergencyContact: "+49 30 288 865 990",
    isVerified: true,
    descDe:
      "Bundesweiter Dachverband der unabhängigen Beratungsstellen für Betroffene rechter, rassistischer und antisemitischer Gewalt — vertraulich, kostenlos und parteiisch an der Seite der Ratsuchenden.",
    descEn:
      "Nationwide umbrella association of independent counseling centers supporting people affected by far-right, racist, and antisemitic violence—confidential and free of charge.",
  },
  {
    id: "omas-gegen-rechts",
    name: "OMAS GEGEN RECHTS Deutschland",
    state: "federal",
    category: "alliance",
    website: "https://www.omasgegenrechts.de",
    isVerified: true,
    descDe:
      "Generationenübergreifende zivilgesellschaftliche Initiative für parlamentarische Demokratie, Frieden, gleiche Rechte und ein herzliches Miteinander in hunderten Ortsgruppen.",
    descEn:
      "Intergenerational civic movement for parliamentary democracy, peace, equal rights, and warm community cohesion across hundreds of local chapters.",
  },
  {
    id: "naturfreunde-federal",
    name: "NaturFreunde Deutschlands e.V.",
    state: "federal",
    category: "climate",
    website: "https://www.naturfreunde.de",
    isVerified: true,
    descDe:
      "Verband für Umweltschutz, sanften Tourismus, Sport und Kultur — verbindet seit über 125 Jahren gelebte Naturverbundenheit mit sozialer Gerechtigkeit und Demokratie.",
    descEn:
      "Environmental, cultural, and outdoor association uniting nature conservation with social justice, peace, and democratic solidarity.",
  },
  {
    id: "bundjugend-federal",
    name: "BUNDjugend — Junge Natur- & Klimabewegung",
    state: "federal",
    category: "youth",
    website: "https://www.bundjugend.de",
    isVerified: true,
    descDe:
      "Jugendorganisation des BUND: Engagiert für Klimagerechtigkeit, lebendige Ökosysteme und eine solidarische, offene Zukunft für junge Menschen überall im Land.",
    descEn:
      "Youth organization of Friends of the Earth Germany: committed to climate justice, thriving ecosystems, and an inclusive future.",
  },
  {
    id: "leuchtlinie-bw",
    name: "LEUCHTLINIE — Beratung für Betroffene (Baden-Württemberg)",
    state: "BW",
    category: "counseling",
    website: "https://www.leuchtlinie.de",
    emergencyContact: "0711 888 999 30",
    isVerified: true,
    descDe:
      "Kostenlose, vertrauliche Unterstützung und Begleitung für Menschen in Baden-Württemberg, die von Diskriminierung oder rechter Gewalt betroffen sind.",
    descEn:
      "Free, confidential support and accompaniment for people in Baden-Württemberg affected by discrimination or far-right threats.",
  },
  {
    id: "bud-bayern",
    name: "B.U.D. — Beratung. Unterstützung. Dokumentation (Bayern)",
    state: "BY",
    category: "counseling",
    website: "https://www.bud-bayern.de",
    emergencyContact: "0151 216 53 187",
    isVerified: true,
    descDe:
      "Landesweite Fachberatungsstelle in Bayern: Hilft Betroffenen, Angehörigen und Zeug:innen mit rechtlicher, psychosozialer und praktischer Begleitung.",
    descEn:
      "Bavaria-wide specialist counseling service assisting affected individuals, families, and witnesses with practical and psychosocial support.",
  },
  {
    id: "reachout-berlin",
    name: "ReachOut Berlin — Opferberatung & Bildung",
    state: "BE",
    category: "counseling",
    website: "https://www.reachoutberlin.de",
    emergencyContact: "030 69 56 83 39",
    isVerified: true,
    descDe:
      "Beratung für Betroffene rassistischer, rechter und antisemitischer Angriffe in Berlin sowie Bildungsarbeit für ein solidarisches Stadtleben.",
    descEn:
      "Counseling for victims of racist, far-right, and antisemitic attacks in Berlin alongside community education for a welcoming city.",
  },
  {
    id: "opferperspektive-bb",
    name: "Opferperspektive e.V. (Brandenburg)",
    state: "BB",
    category: "counseling",
    website: "https://www.opferperspektive.de",
    emergencyContact: "0331 817 0000",
    isVerified: true,
    descDe:
      "Seit 1998 in ganz Brandenburg vor Ort: Mobile Beratung für Betroffene und Stärkung solidarischer Nachbarschaften in Städten und Dörfern.",
    descEn:
      "Active across Brandenburg since 1998: mobile counseling and neighborhood solidarity support in towns and rural communities.",
  },
  {
    id: "soliport-hb",
    name: "soliport — Betroffenenberatung (Bremen & Bremerhaven)",
    state: "HB",
    category: "counseling",
    website: "https://www.soliport.de",
    emergencyContact: "0421 897 762 20",
    isVerified: true,
    descDe:
      "Anlaufstelle im Land Bremen für Menschen, die Ausgrenzung oder Übergriffe erlebt haben — persönlich, vertraulich und auf Wunsch anonym.",
    descEn:
      "Support center in Bremen and Bremerhaven offering personal, confidential, and anonymous assistance.",
  },
  {
    id: "empower-hh",
    name: "empower — Beratung für Betroffene (Hamburg)",
    state: "HH",
    category: "counseling",
    website: "https://hamburg.arbeitundleben.de/empower",
    emergencyContact: "040 284 016 67",
    isVerified: true,
    descDe:
      "Hamburger Beratungsstelle für Betroffene rechter, rassistischer und antisemitischer Gewalt mit mehrsprachigem Team und Nachbarschaftsnetzwerk.",
    descEn:
      "Hamburg counseling service with a multilingual team supporting affected individuals and local community networks.",
  },
  {
    id: "response-he",
    name: "response — Beratung für Betroffene (Hessen)",
    state: "HE",
    category: "counseling",
    website: "https://www.response-hessen.de",
    emergencyContact: "069 348 770 530",
    isVerified: true,
    descDe:
      "Hessenweite mobile Unterstützung mit Büros in Frankfurt und Kassel für ein sicheres und respektvolles Zusammenleben.",
    descEn:
      "Hesse-wide mobile support with offices in Frankfurt and Kassel promoting safe and respectful coexistence.",
  },
  {
    id: "lobbi-mv",
    name: "LOBBI e.V. — Landesweite Opferberatung (Mecklenburg-Vorpommern)",
    state: "MV",
    category: "counseling",
    website: "https://www.lobbi-mv.de",
    emergencyContact: "0381 490 77 60",
    isVerified: true,
    descDe:
      "Unterstützt Betroffene und engagierte Bürger:innen in ganz Mecklenburg-Vorpommern von Rostock bis Neubrandenburg.",
    descEn:
      "Supports affected individuals and engaged citizens across Mecklenburg-Western Pomerania from Rostock to Neubrandenburg.",
  },
  {
    id: "betroffenenberatung-ni",
    name: "Betroffenenberatung Niedersachsen",
    state: "NI",
    category: "counseling",
    website: "https://www.betroffenenberatung.de",
    emergencyContact: "0511 123 574 91",
    isVerified: true,
    descDe:
      "Drei Regionalbüros in Niedersachsen bieten schnelle, unbürokratische Hilfe vor Ort und vernetzen lokale Demokratie-Bündnisse.",
    descEn:
      "Three regional offices in Lower Saxony providing rapid on-site assistance and connecting local democratic alliances.",
  },
  {
    id: "backup-obrigkeit-nw",
    name: "BackUp & OBR — Opferberatung (Nordrhein-Westfalen)",
    state: "NW",
    category: "counseling",
    website: "https://www.backup-nrw.org",
    emergencyContact: "0231 956 524 72",
    isVerified: true,
    descDe:
      "Professionelle Begleitung und Solidaritätsarbeit in NRW (Westfalen, Rheinland und Ruhrgebiet) für Betroffene und Nachbarschaften.",
    descEn:
      "Professional accompaniment and solidarity work across North Rhine-Westphalia for affected individuals and neighborhoods.",
  },
  {
    id: "mpower-rp",
    name: "m*power — Mobile Beratung für Betroffene (Rheinland-Pfalz)",
    state: "RP",
    category: "counseling",
    website: "https://www.mpower-rlp.de",
    emergencyContact: "0261 550 011 40",
    isVerified: true,
    descDe:
      "Mobile Fachberatungsstelle in Rheinland-Pfalz für Menschenwürde, Zusammenhalt und Unterstützung im Alltag.",
    descEn:
      "Mobile specialist counseling center in Rhineland-Palatinate for human dignity, cohesion, and everyday support.",
  },
  {
    id: "bunt-statt-braun-sl",
    name: "Bündnis Bunt statt Braun & Adolf-Bender-Zentrum (Saarland)",
    state: "SL",
    category: "alliance",
    website: "https://www.adolf-bender.de",
    emergencyContact: "06851 808 279 0",
    isVerified: true,
    descDe:
      "Trägerverein für Demokratie- und Menschenrechtsarbeit, Erinnerungskultur und Beratung im gesamten Saarland.",
    descEn:
      "Center for democracy and human rights education, remembrance culture, and counseling across Saarland.",
  },
  {
    id: "raa-sachsen-sn",
    name: "RAA Sachsen e.V. — Support für Betroffene (Sachsen)",
    state: "SN",
    category: "counseling",
    website: "https://www.raa-sachsen.de",
    emergencyContact: "0351 889 41 74",
    isVerified: true,
    descDe:
      "Unterstützt Betroffene und engagierte Zivilgesellschaft in Dresden, Leipzig, Chemnitz und dem ländlichen Raum Sachsens.",
    descEn:
      "Supports affected individuals and civil society in Dresden, Leipzig, Chemnitz, and rural regions of Saxony.",
  },
  {
    id: "mobile-opferberatung-st",
    name: "Mobile Opferberatung Miteinander e.V. (Sachsen-Anhalt)",
    state: "ST",
    category: "counseling",
    website: "https://www.mobile-opferberatung.de",
    emergencyContact: "0391 620 77 59",
    isVerified: true,
    descDe:
      "Begleitung, Beratung und Stärkung einer weltoffenen Alltagskultur in ganz Sachsen-Anhalt.",
    descEn:
      "Accompaniment, counseling, and strengthening of an open everyday culture throughout Saxony-Anhalt.",
  },
  {
    id: "zebra-sh",
    name: "ZEBRA e.V. — Zentrum für Betroffene (Schleswig-Holstein)",
    state: "SH",
    category: "counseling",
    website: "https://www.zebraev.de",
    emergencyContact: "0431 301 403 79",
    isVerified: true,
    descDe:
      "Unabhängige Beratung und solidarische Vernetzung zwischen Nord- und Ostsee mit Sitz in Kiel.",
    descEn:
      "Independent counseling and solidarity networking across Schleswig-Holstein, based in Kiel.",
  },
  {
    id: "ezra-mobit-th",
    name: "ezra & MOBIT e.V. — Beratung & Demokratiearbeit (Thüringen)",
    state: "TH",
    category: "counseling",
    website: "https://www.ezra.de",
    emergencyContact: "0361 218 651 33",
    isVerified: true,
    descDe:
      "Mobile Opferberatung (ezra) und mobile Beratung für Demokratie und Gegenwartsanalysen (MOBIT) in ganz Thüringen.",
    descEn:
      "Mobile victim counseling (ezra) and mobile democracy advisory work (MOBIT) across Thuringia.",
  },
];

export function getInitiatives(lang: Locale): Initiative[] {
  const isDe = lang === "de";
  return RAW_INITIATIVES.map((item) => ({
    id: item.id,
    name: item.name,
    state: item.state,
    category: item.category,
    description: isDe ? item.descDe : item.descEn,
    website: item.website,
    emergencyContact: item.emergencyContact,
    isVerified: item.isVerified,
  }));
}

export function getStateLabel(code: FederalStateCode, lang: Locale): string {
  const found = FEDERAL_STATES.find((s) => s.code === code);
  if (!found) return code;
  return lang === "de" ? found.nameDe : found.nameEn;
}
