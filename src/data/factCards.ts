import type { Locale } from "../i18n";

export type FactCategory = "social" | "climate" | "migration" | "democracy";

export interface FactCard {
  id: string;
  category: FactCategory;
  claim: string;
  reality: string;
  counterSnippet: string;
  source: {
    title: string;
    url: string;
  };
  shareableImage?: string;
}

export interface DialoguePrinciple {
  id: string;
  step: string;
  title: string;
  description: string;
  example: string;
}

const FACT_CARDS_BY_LOCALE: Record<Locale, FactCard[]> = {
  de: [
    {
      id: "social-tax-fairness",
      category: "social",
      claim:
        "»Rechtsaußen-Parteien setzen sich für den kleinen Mann und arbeitende Familien ein.«",
      reality:
        "Unabhängige Berechnungen des DIW und ZEW zeigen: Das Steuer- und Wirtschaftsprogramm der AfD entlastet vor allem das oberste Einkommensprozent um bis zu 34.000 Euro im Jahr, während Menschen mit kleinen und mittleren Einkommen durch den Abbau von Sozialleistungen, Mieterschutz und Tarifbindung deutlich verlieren.",
      counterSnippet:
        "Uns allen liegt am Herzen, dass sich ehrliche Arbeit lohnt und Familien gut leben können. Wenn man ins Kleingedruckte schaut, profitieren dort aber fast nur Multimillionäre — echte Entlastung für uns vor Ort schaffen starke Tariflöhne und bezahlbare Mieten.",
      source: {
        title: "Deutsches Institut für Wirtschaftsforschung (DIW Berlin)",
        url: "https://www.diw.de/de/diw_01.c.879741.de/publikationen/diw_aktuell/2023_0088/das_afd-programm_widerspricht_den_wirtschaftlichen_interessen_ihrer_waehlerschaft.html",
      },
      shareableImage: "social-cards/rette-blau-share-default.svg",
    },
    {
      id: "social-pensions-care",
      category: "social",
      claim:
        "»Soziale Sicherheit ist nicht mehr bezahlbar — man muss beim Sozialstaat kürzen.«",
      reality:
        "Ein verlässlicher Sozialstaat ist das Fundament für gesellschaftlichen Frieden. Studien der Hans-Böckler-Stiftung belegen, dass Investitionen in Kitas, Schulen, Pflege und eine solidarische Rentenversicherung die Wirtschaft stärken und Existenzängste nehmen.",
      counterSnippet:
        "Niemand sollte Angst vor dem Älterwerden oder vor Krankheit haben müssen. Wenn wir zusammenhalten und sehr große Vermögen fair beteiligen, bleibt genug für gute Pflege, Schulen und verlässliche Renten für alle.",
      source: {
        title: "Hans-Böckler-Stiftung (WSI Verteilungsbericht)",
        url: "https://www.boeckler.de/de/wsi-verteilungsberichte-14628.htm",
      },
      shareableImage: "social-cards/rette-blau-share-default.svg",
    },
    {
      id: "climate-clean-energy",
      category: "climate",
      claim:
        "»Klimaschutz zerstört unseren Wohlstand — wir sollten zurück zu Kohle, Öl und Gas.«",
      reality:
        "Erneuerbare Energien aus Wind und Sonne sind laut Fraunhofer ISE heute schon die günstigste Art, Strom zu erzeugen. Fossile Brennstoffe machen uns abhängig von Autokraten und treiben durch Dürren und Hochwasser die Lebenshaltungskosten massiv nach oben.",
      counterSnippet:
        "Saubere Luft, gesunde Wälder und bezahlbarer Strom gehören zusammen. Sonne und Wind schicken uns keine Rechnung — wenn wir die Energiewende sozial gerecht gestalten, profitieren Natur und Geldbeutel gleichermaßen.",
      source: {
        title: "Fraunhofer-Institut für Solare Energiesysteme (ISE)",
        url: "https://www.ise.fraunhofer.de/de/veroeffentlichungen/studien/studie-stromgestehungskosten-erneuerbare-energien.html",
      },
      shareableImage: "social-cards/rette-blau-share-default.svg",
    },
    {
      id: "migration-care-economy",
      category: "migration",
      claim:
        "»Abschottung und sogenannte Remigration lösen unsere Probleme bei Wohnungen und Kitas.«",
      reality:
        "Laut Statistischem Bundesamt und Institut der deutschen Wirtschaft (IW) halten Millionen Menschen mit Einwanderungsgeschichte unsere Krankenhäuser, Pflegeheime, Handwerksbetriebe und den Nahverkehr am Laufen. Ausgrenzung schafft keine einzige Wohnung, sondern legt unsere Versorgung lahm.",
      counterSnippet:
        "Im Krankenhaus, im Bus oder auf dem Bau arbeiten wir längst Hand in Hand. Was uns wirklich hilft, sind mehr bezahlbare Wohnungen und gute Schulen für alle Kinder — nicht das Gegeneinander-Ausspielen von Nachbar:innen.",
      source: {
        title: "Statistisches Bundesamt (Destatis) & DIW",
        url: "https://www.destatis.de/DE/Themen/Gesellschaft-Umwelt/Bevoelkerung/Migration-Integration/_inhalt.html",
      },
      shareableImage: "social-cards/rette-blau-share-default.svg",
    },
    {
      id: "democracy-media-freedom",
      category: "democracy",
      claim:
        "»Man darf heute nichts mehr sagen — nur autoritäre Parteien schützen die Meinungsfreiheit.«",
      reality:
        "Deutschland gehört laut Reporter ohne Grenzen zu den Ländern mit hoher Presse- und Meinungsfreiheit. Gleichzeitig versuchen autoritäre Strömungen systematisch, unabhängigen Journalismus, Kulturhäuser, Theater und Wissenschaft einzuschüchtern oder finanziell trockenzulegen.",
      counterSnippet:
        "Freiheit bedeutet, dass wir offen diskutieren und kritisieren dürfen, ohne dass jemand bedroht oder ausgegrenzt wird. Eine lebendige Demokratie schützt den respektvollen Widerspruch und die Vielfalt.",
      source: {
        title: "Reporter ohne Grenzen (Rangliste der Pressefreiheit)",
        url: "https://www.reporter-ohne-grenzen.de/rangliste/",
      },
      shareableImage: "social-cards/rette-blau-share-default.svg",
    },
    {
      id: "democracy-majority-cohesion",
      category: "democracy",
      claim:
        "»Die Gesellschaft ist hoffnungslos gespalten und jeder denkt nur noch an sich.«",
      reality:
        "Der Freiwilligensurvey und Studien der Bertelsmann Stiftung zeigen: Über 28 Millionen Menschen in Deutschland engagieren sich ehrenamtlich in Sportvereinen, Feuerwehren, Nachbarschaftshilfen und Umweltgruppen. Die überwältigende Mehrheit wünscht sich ein friedliches, herzliches Miteinander.",
      counterSnippet:
        "Lass uns nicht von lauten Schlagzeilen täuschen: Im echten Leben helfen die allermeisten Menschen gerne mit. Wir sind viele, die sich eine friedliche, freundliche und gerechte Gesellschaft wünschen.",
      source: {
        title: "Deutscher Freiwilligensurvey (DZA)",
        url: "https://www.dza.de/forschung/fws",
      },
      shareableImage: "social-cards/rette-blau-share-default.svg",
    },
  ],
  en: [
    {
      id: "social-tax-fairness",
      category: "social",
      claim:
        "'Far-right parties stand up for ordinary working people and families.'",
      reality:
        "Independent analyses by DIW Berlin and ZEW show that the AfD's tax and economic program primarily benefits the wealthiest 1% (up to €34,000 per year), while low- and middle-income households lose out through cuts to social security, tenant protections, and collective bargaining.",
      counterSnippet:
        "We all want honest work to pay off so families can thrive. Looking closely at the numbers, those tax plans mostly reward multimillionaires—whereas fair wages and affordable rents truly help us in everyday life.",
      source: {
        title: "German Institute for Economic Research (DIW Berlin)",
        url: "https://www.diw.de/de/diw_01.c.879741.de/publikationen/diw_aktuell/2023_0088/das_afd-programm_widerspricht_den_wirtschaftlichen_interessen_ihrer_waehlerschaft.html",
      },
      shareableImage: "social-cards/rette-blau-share-default.svg",
    },
    {
      id: "social-pensions-care",
      category: "social",
      claim:
        "'Social security is no longer affordable—we have to cut back the welfare state.'",
      reality:
        "A reliable social safety net is the foundation of social peace. Studies by the Hans Böckler Foundation prove that investing in childcare, schools, healthcare, and solid pensions strengthens the economy and relieves existential anxiety.",
      counterSnippet:
        "No one should have to fear growing old or falling ill. When we stick together and ask the largest fortunes to contribute fairly, there is plenty for good care, schools, and reliable pensions for everyone.",
      source: {
        title: "Hans Böckler Foundation (WSI Distribution Report)",
        url: "https://www.boeckler.de/de/wsi-verteilungsberichte-14628.htm",
      },
      shareableImage: "social-cards/rette-blau-share-default.svg",
    },
    {
      id: "climate-clean-energy",
      category: "climate",
      claim:
        "'Climate protection destroys prosperity—we should return to coal, oil, and gas.'",
      reality:
        "According to Fraunhofer ISE, wind and solar power are already the most cost-effective way to generate electricity today. Fossil fuels keep us dependent on autocrats and drive up living costs through droughts and floods.",
      counterSnippet:
        "Clean air, healthy forests, and affordable energy belong together. The sun and wind never send an invoice—when we shape the energy transition fairly, both nature and household budgets win.",
      source: {
        title: "Fraunhofer Institute for Solar Energy Systems (ISE)",
        url: "https://www.ise.fraunhofer.de/de/veroeffentlichungen/studien/studie-stromgestehungskosten-erneuerbare-energien.html",
      },
      shareableImage: "social-cards/rette-blau-share-default.svg",
    },
    {
      id: "migration-care-economy",
      category: "migration",
      claim:
        "'Isolation and mass deportation will solve our housing and childcare shortages.'",
      reality:
        "According to the Federal Statistical Office (Destatis), millions of people with a migration history keep our hospitals, nursing homes, crafts, and public transport running. Exclusion builds zero homes—it only weakens our communities.",
      counterSnippet:
        "In hospitals, on buses, and at work, we already work hand in hand every day. What truly helps us is building affordable housing and great schools for all children—not pitting neighbors against each other.",
      source: {
        title: "Federal Statistical Office (Destatis)",
        url: "https://www.destatis.de/DE/Themen/Gesellschaft-Umwelt/Bevoelkerung/Migration-Integration/_inhalt.html",
      },
      shareableImage: "social-cards/rette-blau-share-default.svg",
    },
    {
      id: "democracy-media-freedom",
      category: "democracy",
      claim:
        "'You are not allowed to say anything anymore—only authoritarian parties defend free speech.'",
      reality:
        "Reporters Without Borders ranks Germany among the countries with strong press and freedom of expression. Meanwhile, authoritarian movements systematically try to intimidate independent journalism, culture centers, theaters, and science.",
      counterSnippet:
        "True freedom means we can debate openly and disagree respectfully without anyone being threatened or excluded. A vibrant democracy protects both free speech and human dignity.",
      source: {
        title: "Reporters Without Borders (World Press Freedom Index)",
        url: "https://www.reporter-ohne-grenzen.de/rangliste/",
      },
      shareableImage: "social-cards/rette-blau-share-default.svg",
    },
    {
      id: "democracy-majority-cohesion",
      category: "democracy",
      claim:
        "'Society is hopelessly divided and everyone only cares about themselves.'",
      reality:
        "The German Survey on Volunteering shows that over 28 million people volunteer in sports clubs, fire brigades, neighborhood aid, and nature conservation. The vast majority longs for a peaceful, kind, and supportive society.",
      counterSnippet:
        "Let's not be fooled by loud headlines: in real life, most people gladly help their neighbors. We are a huge majority who want a peaceful, friendly, and fair society.",
      source: {
        title: "German Survey on Volunteering (DZA)",
        url: "https://www.dza.de/forschung/fws",
      },
      shareableImage: "social-cards/rette-blau-share-default.svg",
    },
  ],
  fr: [
    {
      id: "social-tax-fairness",
      category: "social",
      claim:
        "« Les partis d'extrême droite défendent les travailleurs et les familles modestes. »",
      reality:
        "Les études indépendantes du DIW Berlin montrent que le programme fiscal de l'AfD favorise surtout les 1 % les plus riches (jusqu'à 34 000 € par an), tandis que les revenus modestes perdent en protection sociale et droits des locataires.",
      counterSnippet:
        "Nous voulons tous que le travail honnête permette de bien vivre. En regardant les chiffres, ces plans profitent surtout aux multimillionnaires — alors que des salaires justes et des loyers abordables nous aident vraiment.",
      source: {
        title: "Institut allemand de recherche économique (DIW Berlin)",
        url: "https://www.diw.de/de/diw_01.c.879741.de/publikationen/diw_aktuell/2023_0088/das_afd-programm_widerspricht_den_wirtschaftlichen_interessen_ihrer_waehlerschaft.html",
      },
      shareableImage: "social-cards/rette-blau-share-default.svg",
    },
    {
      id: "social-pensions-care",
      category: "social",
      claim:
        "« La protection sociale n'est plus finançable, il faut réduire l'État social. »",
      reality:
        "Un État social fiable est le socle de la paix civile. Les recherches de la Fondation Hans Böckler montrent qu'investir dans les écoles, les soins et les retraites renforce l'économie et apaise les craintes.",
      counterSnippet:
        "Personne ne devrait craindre la maladie ou la vieillesse. En restant solidaires, nous pouvons garantir de bons soins, des écoles de qualité et des retraites sûres pour tout le monde.",
      source: {
        title: "Fondation Hans Böckler (Rapport WSI)",
        url: "https://www.boeckler.de/de/wsi-verteilungsberichte-14628.htm",
      },
      shareableImage: "social-cards/rette-blau-share-default.svg",
    },
    {
      id: "climate-clean-energy",
      category: "climate",
      claim:
        "« La protection du climat détruit notre prospérité — revenons au charbon et au gaz. »",
      reality:
        "Selon l'institut Fraunhofer ISE, le solaire et l'éolien sont déjà les moyens les plus économiques de produire de l'électricité. Les énergies fossiles nous rendent dépendants et aggravent les sécheresses et inondations.",
      counterSnippet:
        "Un air pur, des forêts saines et une énergie abordable vont de pair. Le soleil et le vent n'envoient pas de facture — une transition juste protège à la fois la nature et notre budget.",
      source: {
        title: "Institut Fraunhofer ISE",
        url: "https://www.ise.fraunhofer.de/de/veroeffentlichungen/studien/studie-stromgestehungskosten-erneuerbare-energien.html",
      },
      shareableImage: "social-cards/rette-blau-share-default.svg",
    },
    {
      id: "migration-care-economy",
      category: "migration",
      claim:
        "« Le repli national résoudra nos problèmes de logement et de services publics. »",
      reality:
        "Selon l'Office fédéral de la statistique (Destatis), des millions de personnes issues de l'immigration font fonctionner nos hôpitaux, maisons de retraite, transports et métiers de l'artisanat.",
      counterSnippet:
        "À l'hôpital, dans les transports ou au travail, nous avançons déjà main dans la main. Ce qui nous aide vraiment, ce sont des logements abordables et de bonnes écoles — pas la division entre voisins.",
      source: {
        title: "Office fédéral de la statistique (Destatis)",
        url: "https://www.destatis.de/DE/Themen/Gesellschaft-Umwelt/Bevoelkerung/Migration-Integration/_inhalt.html",
      },
      shareableImage: "social-cards/rette-blau-share-default.svg",
    },
    {
      id: "democracy-media-freedom",
      category: "democracy",
      claim:
        "« On ne peut plus rien dire — seuls les partis autoritaires défendent la liberté. »",
      reality:
        "Reporters sans frontières classe l'Allemagne parmi les pays où la liberté de la presse est élevée, tandis que les courants autoritaires cherchent à intimider les médias indépendants, la culture et la science.",
      counterSnippet:
        "La vraie liberté permet de débattre ouvertement sans que personne ne soit menacé ou exclu. Une démocratie vivante protège le dialogue respectueux et la dignité de chacun.",
      source: {
        title: "Reporters sans frontières",
        url: "https://www.reporter-ohne-grenzen.de/rangliste/",
      },
      shareableImage: "social-cards/rette-blau-share-default.svg",
    },
    {
      id: "democracy-majority-cohesion",
      category: "democracy",
      claim:
        "« La société est irrémédiablement divisée et chacun ne pense qu'à soi. »",
      reality:
        "Plus de 28 millions de personnes en Allemagne s'engagent bénévolement dans le sport, l'entraide de quartier, les pompiers volontaires et la protection de la nature.",
      counterSnippet:
        "Ne nous laissons pas tromper par le bruit : dans la vie quotidienne, l'immense majorité des gens aime aider et souhaite vivre en paix et en harmonie.",
      source: {
        title: "Enquête allemande sur le bénévolat (DZA)",
        url: "https://www.dza.de/forschung/fws",
      },
      shareableImage: "social-cards/rette-blau-share-default.svg",
    },
  ],
  es: [
    {
      id: "social-tax-fairness",
      category: "social",
      claim:
        "«Los partidos de extrema derecha defienden a la gente trabajadora y a las familias.»",
      reality:
        "Los estudios del DIW Berlin demuestran que el programa fiscal de la AfD beneficia sobre todo al 1 % más rico (hasta 34.000 € al año), mientras que las rentas bajas y medias pierden protección social y derechos laborales.",
      counterSnippet:
        "Todos queremos que el trabajo honesto permita vivir bien. Pero al mirar los datos, esos planes benefician a multimillonarios; lo que de verdad nos ayuda son salarios dignos y alquileres asequibles.",
      source: {
        title: "Instituto Alemán de Investigación Económica (DIW Berlin)",
        url: "https://www.diw.de/de/diw_01.c.879741.de/publikationen/diw_aktuell/2023_0088/das_afd-programm_widerspricht_den_wirtschaftlichen_interessen_ihrer_waehlerschaft.html",
      },
      shareableImage: "social-cards/rette-blau-share-default.svg",
    },
    {
      id: "social-pensions-care",
      category: "social",
      claim:
        "«La seguridad social ya no es sostenible; hay que recortar el Estado del bienestar.»",
      reality:
        "Un Estado social sólido es la base de la paz social. La Fundación Hans Böckler demuestra que invertir en escuelas, cuidados y pensiones fortalece la economía y da tranquilidad a las familias.",
      counterSnippet:
        "Nadie debería temer envejecer o enfermar. Si nos apoyamos mutuamente y pedimos una contribución justa a las grandes fortunas, habrá buenos cuidados, escuelas y pensiones para todos.",
      source: {
        title: "Fundación Hans Böckler (Informe WSI)",
        url: "https://www.boeckler.de/de/wsi-verteilungsberichte-14628.htm",
      },
      shareableImage: "social-cards/rette-blau-share-default.svg",
    },
    {
      id: "climate-clean-energy",
      category: "climate",
      claim:
        "«Proteger el clima destruye el bienestar; deberíamos volver al carbón y al gas.»",
      reality:
        "Según Fraunhofer ISE, la energía solar y eólica ya son hoy la forma más económica de generar electricidad. Los combustibles fósiles encarecen la vida y agravan sequías e inundaciones.",
      counterSnippet:
        "El aire limpio, los bosques sanos y la energía asequible van de la mano. El sol y el viento no envían facturas: una transición justa cuida tanto de la naturaleza como de nuestro bolsillo.",
      source: {
        title: "Instituto Fraunhofer ISE",
        url: "https://www.ise.fraunhofer.de/de/veroeffentlichungen/studien/studie-stromgestehungskosten-erneuerbare-energien.html",
      },
      shareableImage: "social-cards/rette-blau-share-default.svg",
    },
    {
      id: "migration-care-economy",
      category: "migration",
      claim:
        "«El aislamiento resolverá la falta de vivienda y de plazas en guarderías.»",
      reality:
        "Según la Oficina Federal de Estadística (Destatis), millones de personas con historia migratoria sostienen nuestros hospitales, residencias, transporte público y oficios.",
      counterSnippet:
        "En hospitales, autobuses y empresas ya trabajamos codo con codo cada día. Lo que nos ayuda de verdad son viviendas asequibles y buenas escuelas para todos, no enfrentar a vecinos contra vecinos.",
      source: {
        title: "Oficina Federal de Estadística (Destatis)",
        url: "https://www.destatis.de/DE/Themen/Gesellschaft-Umwelt/Bevoelkerung/Migration-Integration/_inhalt.html",
      },
      shareableImage: "social-cards/rette-blau-share-default.svg",
    },
    {
      id: "democracy-media-freedom",
      category: "democracy",
      claim:
        "«Ya no se puede decir nada; solo los partidos autoritarios defienden la libertad.»",
      reality:
        "Reporteros sin Fronteras sitúa a Alemania entre los países con alta libertad de prensa, mientras que los movimientos autoritarios intentan intimidar al periodismo independiente, la cultura y la ciencia.",
      counterSnippet:
        "La verdadera libertad significa poder dialogar y discrepar con respeto sin que nadie sea amenazado ni excluido. Una democracia viva protege la pluralidad y la dignidad humana.",
      source: {
        title: "Reporteros sin Fronteras",
        url: "https://www.reporter-ohne-grenzen.de/rangliste/",
      },
      shareableImage: "social-cards/rette-blau-share-default.svg",
    },
    {
      id: "democracy-majority-cohesion",
      category: "democracy",
      claim:
        "«La sociedad está irremediablemente dividida y cada cual mira solo por sí mismo.»",
      reality:
        "Más de 28 millones de personas en Alemania participan como voluntarias en clubes deportivos, bomberos, ayuda vecinal y cuidado del medio ambiente.",
      counterSnippet:
        "No nos dejemos engañar por el ruido: en la vida diaria, la gran mayoría de la gente ayuda con gusto y desea vivir en paz, armonía y buena vecindad.",
      source: {
        title: "Encuesta Alemana de Voluntariado (DZA)",
        url: "https://www.dza.de/forschung/fws",
      },
      shareableImage: "social-cards/rette-blau-share-default.svg",
    },
  ],
  tr: [
    {
      id: "social-tax-fairness",
      category: "social",
      claim:
        "«Aşırı sağ partiler çalışan insanların ve dar gelirli ailelerin yanındadır.»",
      reality:
        "DIW Berlin'in bağımsız araştırmaları, AfD'nin vergi ve ekonomi programının en zengin %1'lik kesime yılda 34.000 Euro'ya kadar avantaj sağladığını, dar ve orta gelirlilerin ise sosyal güvence ve kiracı haklarında kayba uğradığını gösteriyor.",
      counterSnippet:
        "Hepimiz alın terinin karşılığını bulmasını ve ailelerin huzurla yaşamasını istiyoruz. Rakamlara baktığımızda bu planlar milyonerlere yarıyor; bize gerçekten güç veren adil ücretler ve uygun kiralar.",
      source: {
        title: "Alman Ekonomik Araştırmalar Enstitüsü (DIW Berlin)",
        url: "https://www.diw.de/de/diw_01.c.879741.de/publikationen/diw_aktuell/2023_0088/das_afd-programm_widerspricht_den_wirtschaftlichen_interessen_ihrer_waehlerschaft.html",
      },
      shareableImage: "social-cards/rette-blau-share-default.svg",
    },
    {
      id: "social-pensions-care",
      category: "social",
      claim:
        "«Sosyal güvenlik artık karşılanamaz durumda, sosyal devlette kesinti yapılmalı.»",
      reality:
        "Güçlü bir sosyal devlet toplumsal barışın temelidir. Hans Böckler Vakfı araştırmaları; eğitime, bakıma ve emekliliğe yapılan yatırımların ekonomiyi güçlendirdiğini ve gelecek kaygısını azalttığını kanıtlıyor.",
      counterSnippet:
        "Kimse yaşlanmaktan veya hastalanmaktan korkmamalı. Dayanışma içinde olursak herkes için kaliteli eğitim, iyi bakım ve güvenli emeklilik mümkündür.",
      source: {
        title: "Hans Böckler Vakfı (WSI Raporu)",
        url: "https://www.boeckler.de/de/wsi-verteilungsberichte-14628.htm",
      },
      shareableImage: "social-cards/rette-blau-share-default.svg",
    },
    {
      id: "climate-clean-energy",
      category: "climate",
      claim:
        "«İklim koruma refahımızı bozuyor — kömür, petrol ve gaza geri dönmeliyiz.»",
      reality:
        "Fraunhofer ISE verilerine göre rüzgar ve güneş enerjisi bugün en ucuz elektrik üretim yöntemidir. Fosil yakıtlar bizi dışa bağımlı kılar ve kuraklık ile seller üzerinden yaşam maliyetlerini artırır.",
      counterSnippet:
        "Temiz hava, sağlıklı ormanlar ve uygun fiyatlı enerji birbirini tamamlar. Güneş ve rüzgar fatura göndermez; adil bir enerji dönüşümü hem doğayı hem bütçemizi korur.",
      source: {
        title: "Fraunhofer Güneş Enerjisi Sistemleri Enstitüsü (ISE)",
        url: "https://www.ise.fraunhofer.de/de/veroeffentlichungen/studien/studie-stromgestehungskosten-erneuerbare-energien.html",
      },
      shareableImage: "social-cards/rette-blau-share-default.svg",
    },
    {
      id: "migration-care-economy",
      category: "migration",
      claim:
        "«Dışlama ve geri gönderme politikaları konut ve kreş sorunlarımızı çözer.»",
      reality:
        "Federal İstatistik Dairesi'ne (Destatis) göre göç geçmişine sahip milyonlarca insan hastanelerimizi, bakım evlerimizi, ulaşımı ve zanaat kollarını ayakta tutuyor. Dışlama tek bir konut bile üretmez.",
      counterSnippet:
        "Hastanede, otobüste ve iş yerinde her gün omuz omuza çalışıyoruz. Bize gerçekten yardımcı olan komşuları birbirine düşürmek değil, herkes için uygun fiyatlı konutlar ve iyi okullar yapmaktır.",
      source: {
        title: "Federal İstatistik Dairesi (Destatis)",
        url: "https://www.destatis.de/DE/Themen/Gesellschaft-Umwelt/Bevoelkerung/Migration-Integration/_inhalt.html",
      },
      shareableImage: "social-cards/rette-blau-share-default.svg",
    },
    {
      id: "democracy-media-freedom",
      category: "democracy",
      claim:
        "«Artık hiçbir şey söylenemiyor — ifade özgürlüğünü yalnızca otoriter partiler korur.»",
      reality:
        "Sınır Tanımayan Gazeteciler'e göre Almanya basın ve ifade özgürlüğünün güçlü olduğu ülkeler arasındadır; buna karşın otoriter akımlar bağımsız gazeteciliği, sanatı ve bilimi baskı altına almaya çalışır.",
      counterSnippet:
        "Gerçek özgürlük, kimsenin tehdit edilmediği ve dışlanmadığı saygılı bir tartışma ortamıdır. Canlı bir demokrasi hem özgür sözü hem insan onurunu korur.",
      source: {
        title: "Sınır Tanımayan Gazeteciler",
        url: "https://www.reporter-ohne-grenzen.de/rangliste/",
      },
      shareableImage: "social-cards/rette-blau-share-default.svg",
    },
    {
      id: "democracy-majority-cohesion",
      category: "democracy",
      claim:
        "«Toplum tamamen bölünmüş durumda ve herkes sadece kendini düşünüyor.»",
      reality:
        "Almanya Gönüllülük Araştırması, 28 milyondan fazla insanın spor kulüplerinde, itfaiyede, komşuluk yardımlarında ve doğa korumada gönüllü çalıştığını gösteriyor.",
      counterSnippet:
        "Gürültülü manşetlere aldanmayalım: Gerçek hayatta insanların büyük çoğunluğu yardımlaşmayı seviyor ve barış içinde, sevgi dolu bir toplum istiyor.",
      source: {
        title: "Almanya Gönüllülük Araştırması (DZA)",
        url: "https://www.dza.de/forschung/fws",
      },
      shareableImage: "social-cards/rette-blau-share-default.svg",
    },
  ],
  uk: [
    {
      id: "social-tax-fairness",
      category: "social",
      claim:
        "«Ультраправі партії захищають простих працівників та звичайні родини.»",
      reality:
        "Незалежні розрахунки DIW Berlin показують: податкова програма AfD найбільше вигідна 1% найбагатших (до 34 000 євро на рік), тоді як люди з малими та середніми доходами втрачають соціальний захист.",
      counterSnippet:
        "Ми всі хочемо, щоб чесна праця гідно оплачувалася. Але якщо подивитися на цифри, ці плани вигідні мультимільйонерам — а нам справді допомагають справедливі зарплати та доступне житло.",
      source: {
        title: "Німецький інститут економічних досліджень (DIW Berlin)",
        url: "https://www.diw.de/de/diw_01.c.879741.de/publikationen/diw_aktuell/2023_0088/das_afd-programm_widerspricht_den_wirtschaftlichen_interessen_ihrer_waehlerschaft.html",
      },
      shareableImage: "social-cards/rette-blau-share-default.svg",
    },
    {
      id: "social-pensions-care",
      category: "social",
      claim:
        "«Соціальний захист більше не по кишені — треба скорочувати соціальну державу.»",
      reality:
        "Надійна соціальна підтримка є основою суспільного миру. Дослідження Фонду Ганса Беклера доводять, що інвестиції в садочки, школи, медицину та пенсії зміцнюють економіку.",
      counterSnippet:
        "Ніхто не повинен боятися старості чи хвороби. Коли ми тримаємося разом і підтримуємо одне одного, вистачає ресурсів на якісну медицину, школи та надійні пенсії.",
      source: {
        title: "Фонд Ганса Беклера (Звіт WSI)",
        url: "https://www.boeckler.de/de/wsi-verteilungsberichte-14628.htm",
      },
      shareableImage: "social-cards/rette-blau-share-default.svg",
    },
    {
      id: "climate-clean-energy",
      category: "climate",
      claim:
        "«Захист клімату руйнує добробут — варто повернутися до вугілля, нафти й газу.»",
      reality:
        "За даними Fraunhofer ISE, сонячна та вітрова енергія вже сьогодні є найдешевшим способом виробництва електрики. Викопне паливо робить нас залежними від автократій і підвищує ціни.",
      counterSnippet:
        "Чисте повітря, здорові ліси та доступна енергія нероздільні. Сонце й вітер не виставляють рахунків — справедливий енергоперехід береже і природу, і сімейний бюджет.",
      source: {
        title: "Інститут сонячних енергетичних систем Fraunhofer ISE",
        url: "https://www.ise.fraunhofer.de/de/veroeffentlichungen/studien/studie-stromgestehungskosten-erneuerbare-energien.html",
      },
      shareableImage: "social-cards/rette-blau-share-default.svg",
    },
    {
      id: "migration-care-economy",
      category: "migration",
      claim: "«Ізоляція вирішить наші проблеми з житлом та дитячими садками.»",
      reality:
        "За даними Федерального статистичного відомства (Destatis), мільйони людей з міграційною історією підтримують роботу лікарень, догляду, транспорту та ремесел.",
      counterSnippet:
        "У лікарнях, транспорті та на роботі ми щодня працюємо пліч-о-пліч. Нам справді допомагає будівництво доступного житла й шкіл для всіх дітей, а не ворожнеча між сусідами.",
      source: {
        title: "Федеральне статистичне відомство (Destatis)",
        url: "https://www.destatis.de/DE/Themen/Gesellschaft-Umwelt/Bevoelkerung/Migration-Integration/_inhalt.html",
      },
      shareableImage: "social-cards/rette-blau-share-default.svg",
    },
    {
      id: "democracy-media-freedom",
      category: "democracy",
      claim:
        "«Сьогодні нічого не можна сказати — лише авторитарні партії захищають свободу слова.»",
      reality:
        "«Репортери без кордонів» відносять Німеччину до країн із високим рівнем свободи преси, тоді як авторитарні рухи намагаються тиснути на незалежних журналістів, культуру та науку.",
      counterSnippet:
        "Справжня свобода означає можливість відкрито дискутувати без погроз і принижень. Жива демократія захищає і вільне слово, і людську гідність.",
      source: {
        title: "Репортери без кордонів",
        url: "https://www.reporter-ohne-grenzen.de/rangliste/",
      },
      shareableImage: "social-cards/rette-blau-share-default.svg",
    },
    {
      id: "democracy-majority-cohesion",
      category: "democracy",
      claim: "«Суспільство безнадійно розколоте, і кожен думає лише про себе.»",
      reality:
        "Понад 28 мільйонів людей у Німеччині займаються волонтерством у спортивних клубах, пожежних командах, сусідській допомозі та захисті природи.",
      counterSnippet:
        "Не даймо гучним заголовкам ввести нас в оману: у реальному житті більшість людей охоче допомагають одне одному і прагнуть миру, тепла та злагоди.",
      source: {
        title: "Німецьке дослідження волонтерства (DZA)",
        url: "https://www.dza.de/forschung/fws",
      },
      shareableImage: "social-cards/rette-blau-share-default.svg",
    },
  ],
  pl: [
    {
      id: "social-tax-fairness",
      category: "social",
      claim: "„Skrajna prawica staje w obronie zwykłych pracowników i rodzin.”",
      reality:
        "Niezależne wyliczenia DIW Berlin pokazują, że program podatkowy AfD przynosi korzyści głównie najbogatszemu 1% (nawet do 34 000 euro rocznie), podczas gdy osoby o niższych i średnich dochodach tracą na cięciach socjalnych i osłabieniu praw pracowniczych.",
      counterSnippet:
        "Wszystkim nam zależy, by uczciwa praca pozwalała godnie żyć. Gdy spojrzymy w szczegóły, te plany służą мультиmilionerom — a nam naprawdę pomagają godne płace i dostępne mieszkania.",
      source: {
        title: "Niemiecki Instytut Badań Gospodarczych (DIW Berlin)",
        url: "https://www.diw.de/de/diw_01.c.879741.de/publikationen/diw_aktuell/2023_0088/das_afd-programm_widerspricht_den_wirtschaftlichen_interessen_ihrer_waehlerschaft.html",
      },
      shareableImage: "social-cards/rette-blau-share-default.svg",
    },
    {
      id: "social-pensions-care",
      category: "social",
      claim:
        "„Bezpieczeństwo socjalne jest zbyt drogie — trzeba ciąć wydatki społeczne.”",
      reality:
        "Solidne państwo społeczne to fundament pokoju społecznego. Badania Fundacji Hansa Böcklera dowodzą, że inwestycje w żłobki, szkoły, opiekę i emerytury wzmacniają gospodarkę i dają poczucie bezpieczeństwa.",
      counterSnippet:
        "Nikt nie powinien bać się starości ani choroby. Gdy trzymamy się razem i dbamy o solidarność, wystarczy środków na dobrą opiekę, szkoły i pewne emerytury dla każdego.",
      source: {
        title: "Fundacja Hansa Böcklera (Raport WSI)",
        url: "https://www.boeckler.de/de/wsi-verteilungsberichte-14628.htm",
      },
      shareableImage: "social-cards/rette-blau-share-default.svg",
    },
    {
      id: "climate-clean-energy",
      category: "climate",
      claim:
        "„Ochrona klimatu niszczy dobrobyt — wróćmy do węgla, ropy i gazu.”",
      reality:
        "Według instytutu Fraunhofer ISE energia z wiatru i słońca jest już dziś najtańszym sposobem produkcji prądu. Paliwa kopalne uzależniają nas od autokratów i podnoszą koszty życia przez susze i powodzie.",
      counterSnippet:
        "Czyste powietrze, zdrowe lasy i przystępny cenowo prąd idą w parze. Słońce i wiatr nie wystawiają rachunków — sprawiedliwa transformacja chroni zarówno przyrodę, jak i domowy budżet.",
      source: {
        title: "Instytut Fraunhofer ISE",
        url: "https://www.ise.fraunhofer.de/de/veroeffentlichungen/studien/studie-stromgestehungskosten-erneuerbare-energien.html",
      },
      shareableImage: "social-cards/rette-blau-share-default.svg",
    },
    {
      id: "migration-care-economy",
      category: "migration",
      claim:
        "„Izolacja rozwiąże nasze problemy z mieszkaniami i miejscami w przedszkolach.”",
      reality:
        "Według Federalnego Urzędu Statystycznego (Destatis) miliony osób z historią migracyjną utrzymują w ruchu szpitale, domy opieki, rzemiosło i transport publiczny.",
      counterSnippet:
        "W szpitalu, autobusie czy w pracy każdego dnia działamy ramię w ramię. To, co naprawdę pomaga, to budowa dostępnych mieszkań i dobrych szkół dla wszystkich dzieci, a nie skłócanie sąsiadów.",
      source: {
        title: "Federalny Urząd Statystyczny (Destatis)",
        url: "https://www.destatis.de/DE/Themen/Gesellschaft-Umwelt/Bevoelkerung/Migration-Integration/_inhalt.html",
      },
      shareableImage: "social-cards/rette-blau-share-default.svg",
    },
    {
      id: "democracy-media-freedom",
      category: "democracy",
      claim:
        "„Dziś nic już nie wolno powiedzieć — tylko partie autorytarne bronią wolności słowa.”",
      reality:
        "Reporterzy bez Granic zaliczają Niemcy do krajów o wysokiej wolności prasy, podczas gdy ruchy autorytarne próbują zastraszać niezależne media, kulturę i naukę.",
      counterSnippet:
        "Prawdziwa wolność oznacza otwartą rozmowę z szacunkiem, bez gróźb i wykluczania. Żywa demokracja chroni zarówno wolne słowo, jak i godność każdego człowieka.",
      source: {
        title: "Reporterzy bez Granic",
        url: "https://www.reporter-ohne-grenzen.de/rangliste/",
      },
      shareableImage: "social-cards/rette-blau-share-default.svg",
    },
    {
      id: "democracy-majority-cohesion",
      category: "democracy",
      claim:
        "„Społeczeństwo jest beznadziejnie podzielone i każdy myśli tylko o sobie.”",
      reality:
        "Ponad 28 milionów ludzi w Niemczech angażuje się społecznie w klubach sportowych, straży pożarnej, pomocy sąsiedzkiej i ochronie przyrody.",
      counterSnippet:
        "Nie dajmy się zwieść głośnym nagłówkom: na co dzień ogromna większość ludzi chętnie sobie pomaga i pragnie spokojnego, życzliwego społeczeństwa.",
      source: {
        title: "Niemieckie Badanie Wolontariatu (DZA)",
        url: "https://www.dza.de/forschung/fws",
      },
      shareableImage: "social-cards/rette-blau-share-default.svg",
    },
  ],
  it: [
    {
      id: "social-tax-fairness",
      category: "social",
      claim:
        "«I partiti di estrema destra difendono i lavoratori e le famiglie comuni.»",
      reality:
        "Le analisi indipendenti del DIW Berlin mostrano che il programma fiscale dell'AfD favorisce soprattutto l'1% più ricco (fino a 34.000 € l'anno), mentre i redditi medio-bassi perdono tutele sociali e diritti sindacali.",
      counterSnippet:
        "Tutti vogliamo che il lavoro onesto permetta di vivere serenamente. Guardando i dati, quei piani premiano i multimilionari; ciò che ci aiuta davvero sono salari giusti e affitti accessibili.",
      source: {
        title: "Istituto tedesco per la ricerca economica (DIW Berlin)",
        url: "https://www.diw.de/de/diw_01.c.879741.de/publikationen/diw_aktuell/2023_0088/das_afd-programm_widerspricht_den_wirtschaftlichen_interessen_ihrer_waehlerschaft.html",
      },
      shareableImage: "social-cards/rette-blau-share-default.svg",
    },
    {
      id: "social-pensions-care",
      category: "social",
      claim:
        "«La previdenza sociale non è più sostenibile, bisogna tagliare lo Stato sociale.»",
      reality:
        "Uno Stato sociale solido è la base della pace civile. Gli studi della Fondazione Hans Böckler dimostrano che investire in asili, scuole, sanità e pensioni rafforza l'economia e dà serenità.",
      counterSnippet:
        "Nessuno dovrebbe temere di invecchiare o ammalarsi. Restando uniti e solidali, ci sono risorse per buone cure, scuole di qualità e pensioni sicure per tutti.",
      source: {
        title: "Fondazione Hans Böckler (Rapporto WSI)",
        url: "https://www.boeckler.de/de/wsi-verteilungsberichte-14628.htm",
      },
      shareableImage: "social-cards/rette-blau-share-default.svg",
    },
    {
      id: "climate-clean-energy",
      category: "climate",
      claim:
        "«La tutela del clima distrugge il benessere: torniamo a carbone, petrolio e gas.»",
      reality:
        "Secondo il Fraunhofer ISE, solare ed eolico sono già oggi il modo più economico per produrre elettricità. Le fonti fossili ci rendono dipendenti e aumentano il costo della vita con siccità e alluvioni.",
      counterSnippet:
        "Aria pulita, foreste sane ed energia accessibile vanno di pari passo. Il sole e il vento non mandano bollette: una transizione equa protegge sia la natura sia le famiglie.",
      source: {
        title: "Istituto Fraunhofer ISE",
        url: "https://www.ise.fraunhofer.de/de/veroeffentlichungen/studien/studie-stromgestehungskosten-erneuerbare-energien.html",
      },
      shareableImage: "social-cards/rette-blau-share-default.svg",
    },
    {
      id: "migration-care-economy",
      category: "migration",
      claim: "«La chiusura risolverà i problemi degli alloggi e degli asili.»",
      reality:
        "Secondo l'Ufficio federale di statistica (Destatis), milioni di persone con storia migratoria mandano avanti ospedali, case di cura, trasporti pubblici e artigianato.",
      counterSnippet:
        "In ospedale, sui mezzi pubblici e al lavoro collaboriamo già ogni giorno fianco a fianco. Ciò che serve davvero sono case accessibili e buone scuole per tutti i bambini, non dividere i vicini.",
      source: {
        title: "Ufficio federale di statistica (Destatis)",
        url: "https://www.destatis.de/DE/Themen/Gesellschaft-Umwelt/Bevoelkerung/Migration-Integration/_inhalt.html",
      },
      shareableImage: "social-cards/rette-blau-share-default.svg",
    },
    {
      id: "democracy-media-freedom",
      category: "democracy",
      claim:
        "«Non si può più dire nulla: solo i partiti autoritari difendono la libertà di parola.»",
      reality:
        "Reporter senza Frontiere colloca la Germania tra i Paesi con elevata libertà di stampa, mentre i movimenti autoritari cercano di intimidire giornalismo indipendente, cultura e scienza.",
      counterSnippet:
        "La vera libertà significa poter discutere apertamente e con rispetto senza che nessuno venga minacciato o escluso. Una democrazia viva protegge il dialogo e la dignità umana.",
      source: {
        title: "Reporter senza Frontiere",
        url: "https://www.reporter-ohne-grenzen.de/rangliste/",
      },
      shareableImage: "social-cards/rette-blau-share-default.svg",
    },
    {
      id: "democracy-majority-cohesion",
      category: "democracy",
      claim:
        "«La società è irrimediabilmente divisa e ognuno pensa solo a sé.»",
      reality:
        "Oltre 28 milioni di persone in Germania fanno volontariato nello sport, nei vigili del fuoco, nell'aiuto di vicinato e nella tutela ambientale.",
      counterSnippet:
        "Non lasciamoci ingannare dai titoli rumorosi: nella vita reale la stragrande maggioranza delle persone ama aiutare e desidera una società pacifica, gentile e solidale.",
      source: {
        title: "Indagine tedesca sul volontariato (DZA)",
        url: "https://www.dza.de/forschung/fws",
      },
      shareableImage: "social-cards/rette-blau-share-default.svg",
    },
  ],
  ru: [
    {
      id: "social-tax-fairness",
      category: "social",
      claim:
        "«Ультраправые партии защищают простых работников и обычные семьи.»",
      reality:
        "Независимые расчёты DIW Berlin показывают: налоговая программа AfD выгодна прежде всего 1% самых богатых (до 34 000 евро в год), тогда как семьи с низкими и средними доходами теряют социальную защиту и трудовые права.",
      counterSnippet:
        "Мы все хотим, чтобы честный труд достойно оплачивался. Но если взглянуть на цифры, эти планы помогают мультимиллионерам, а нам на деле нужны справедливые зарплаты и доступное жильё.",
      source: {
        title: "Немецкий институт экономических исследований (DIW Berlin)",
        url: "https://www.diw.de/de/diw_01.c.879741.de/publikationen/diw_aktuell/2023_0088/das_afd-programm_widerspricht_den_wirtschaftlichen_interessen_ihrer_waehlerschaft.html",
      },
      shareableImage: "social-cards/rette-blau-share-default.svg",
    },
    {
      id: "social-pensions-care",
      category: "social",
      claim:
        "«Социальная защита стала слишком дорогой — социальное государство нужно сокращать.»",
      reality:
        "Надёжное социальное государство — основа общественного мира. Исследования Фонда Ханса Бёклера доказывают, что инвестиции в детские сады, школы, медицину и пенсии укрепляют экономику.",
      counterSnippet:
        "Никто не должен бояться старости или болезни. Когда мы поддерживаем друг друга, ресурсов хватает и на хорошую медицину, и на школы, и на достойные пенсии для всех.",
      source: {
        title: "Фонд Ханса Бёклера (Отчёт WSI)",
        url: "https://www.boeckler.de/de/wsi-verteilungsberichte-14628.htm",
      },
      shareableImage: "social-cards/rette-blau-share-default.svg",
    },
    {
      id: "climate-clean-energy",
      category: "climate",
      claim:
        "«Защита климата разрушает благосостояние — пора вернуться к углю, нефти и газу.»",
      reality:
        "По данным Fraunhofer ISE, солнечная и ветровая энергия уже сегодня являются самым дешёвым способом производства электричества. Ископаемое топливо усиливает зависимость и повышает стоимость жизни.",
      counterSnippet:
        "Чистый воздух, здоровые леса и доступная энергия неразделимы. Солнце и ветер не присылают счетов — справедливый энергопереход бережёт и природу, и семейный бюджет.",
      source: {
        title: "Институт солнечных энергетических систем Fraunhofer ISE",
        url: "https://www.ise.fraunhofer.de/de/veroeffentlichungen/studien/studie-stromgestehungskosten-erneuerbare-energien.html",
      },
      shareableImage: "social-cards/rette-blau-share-default.svg",
    },
    {
      id: "migration-care-economy",
      category: "migration",
      claim: "«Изоляция решит наши проблемы с жильём и детскими садами.»",
      reality:
        "По данным Федерального статистического ведомства (Destatis), миллионы людей с миграционной историей обеспечивают работу больниц, домов ухода, транспорта и ремёсел.",
      counterSnippet:
        "В больницах, транспорте и на работе мы каждый день трудимся плечом к плечу. По-настоящему помогает строительство доступного жилья и хороших школ для всех детей, а не разобщение соседей.",
      source: {
        title: "Федеральное статистическое ведомство (Destatis)",
        url: "https://www.destatis.de/DE/Themen/Gesellschaft-Umwelt/Bevoelkerung/Migration-Integration/_inhalt.html",
      },
      shareableImage: "social-cards/rette-blau-share-default.svg",
    },
    {
      id: "democracy-media-freedom",
      category: "democracy",
      claim:
        "«Сегодня ничего нельзя сказать — только авторитарные партии защищают свободу слова.»",
      reality:
        "«Репортёры без границ» относят Германию к странам с высоким уровнем свободы прессы, тогда как авторитарные течения пытаются запугивать независимую журналистику, культуру и науку.",
      counterSnippet:
        "Настоящая свобода — это возможность открыто обсуждать важные вопросы с уважением и без угроз. Живая демократия защищает и свободное слово, и человеческое достоинство.",
      source: {
        title: "Репортёры без границ",
        url: "https://www.reporter-ohne-grenzen.de/rangliste/",
      },
      shareableImage: "social-cards/rette-blau-share-default.svg",
    },
    {
      id: "democracy-majority-cohesion",
      category: "democracy",
      claim: "«Общество безнадёжно расколото, и каждый думает только о себе.»",
      reality:
        "Более 28 миллионов человек в Германии участвуют в волонтёрстве: в спортивных клубах, добровольной пожарной охране, соседской взаимопомощи и охране природы.",
      counterSnippet:
        "Не будем поддаваться громким заголовкам: в реальной жизни большинство людей охотно помогают друг другу и хотят жить в мире, доброте и согласии.",
      source: {
        title: "Немецкое исследование волонтёрства (DZA)",
        url: "https://www.dza.de/forschung/fws",
      },
      shareableImage: "social-cards/rette-blau-share-default.svg",
    },
  ],
};

export const FACT_CARDS_DE: FactCard[] = FACT_CARDS_BY_LOCALE.de;

export function getFactCards(lang: Locale): FactCard[] {
  return FACT_CARDS_BY_LOCALE[lang] ?? FACT_CARDS_BY_LOCALE.de;
}

const DIALOGUE_PRINCIPLES_BY_LOCALE: Record<Locale, DialoguePrinciple[]> = {
  de: [
    {
      id: "listen-connect",
      step: "01",
      title: "Verbindende Werte zuerst ansprechen",
      description:
        "Fast alle Menschen wünschen sich Sicherheit für ihre Familie, faire Arbeit, Frieden und eine gute Nachbarschaft. Beginne beim Gemeinsamen statt beim Trennenden.",
      example:
        "»Ich verstehe total, dass dir steigende Preise Sorgen machen — mir geht es genauso.«",
    },
    {
      id: "ask-curious",
      step: "02",
      title: "Offene Fragen stellen statt belehren",
      description:
        "Niemand lässt sich gerne von oben herab belehren. Freundliche Rückfragen regen zum gemeinsamen Nachdenken an und entkräften pauschale Schlagworte.",
      example:
        "»Was glaubst du, wem diese Steuersenkung für Top-Verdiener bei uns im Ort konkret hilft«",
    },
    {
      id: "calm-facts",
      step: "03",
      title: "Ruhige Fakten & konkrete Alltagserfahrung teilen",
      description:
        "Teile überprüfbare Fakten ruhig und verknüpfe sie mit dem echten Leben vor Ort — im Verein, im Betrieb oder in der Schule.",
      example:
        "»Bei uns im Krankenhaus halten Kolleg:innen aus vielen Ländern den Betrieb jeden Tag mit viel Herzblut am Laufen.«",
    },
    {
      id: "protect-dignity",
      step: "04",
      title: "Menschenwürde freundlich, aber klar schützen",
      description:
        "Wenn Menschen abgewertet werden, ziehe ruhig und respektvoll eine Grenze für ein faires Miteinander — ohne selbst verletzend zu werden.",
      example:
        "»Lass uns hart in der Sache diskutieren, aber respektvoll über Menschen sprechen. Jeder verdient Würde.«",
    },
  ],
  en: [
    {
      id: "listen-connect",
      step: "01",
      title: "Start with Shared Human Values",
      description:
        "Almost everyone wants security for their family, fair work, peace, and a welcoming neighborhood. Start with what connects us rather than what divides us.",
      example:
        "'I completely understand that rising prices worry you—I feel the exact same way.'",
    },
    {
      id: "ask-curious",
      step: "02",
      title: "Ask Open Questions Instead of Lecturing",
      description:
        "Nobody likes being talked down to. Curious, friendly questions invite shared reflection and gently disarm polarizing slogans.",
      example:
        "'Who in our town do you think actually benefits from a tax cut for top earners'",
    },
    {
      id: "calm-facts",
      step: "03",
      title: "Share Calm Facts & Real Everyday Experience",
      description:
        "Offer verified facts calmly and connect them to real life in your club, workplace, or neighborhood.",
      example:
        "'In our local hospital, colleagues from many backgrounds keep care running with dedication every single day.'",
    },
    {
      id: "protect-dignity",
      step: "04",
      title: "Uphold Human Dignity Warmly and Clearly",
      description:
        "When people are demeaned, set a calm, respectful boundary for fair coexistence—without becoming hostile yourself.",
      example:
        "'Let's debate issues openly, but speak respectfully about people. Everyone deserves dignity.'",
    },
  ],
  fr: [
    {
      id: "listen-connect",
      step: "01",
      title: "Commencer par les valeurs communes",
      description:
        "Presque tout le monde souhaite la sécurité pour sa famille, la paix et un bon voisinage. Commencez par ce qui nous rassemble.",
      example:
        "« Je comprends tout à fait que la hausse des prix t'inquiète — c'est pareil pour moi. »",
    },
    {
      id: "ask-curious",
      step: "02",
      title: "Poser des questions ouvertes sans faire la morale",
      description:
        "Des questions bienveillantes invitent à réfléchir ensemble plutôt que de braquer son interlocuteur.",
      example:
        "« À ton avis, comment une baisse d'impôts pour les plus riches aide-t-elle notre commune »",
    },
    {
      id: "calm-facts",
      step: "03",
      title: "Partager des faits calmes et le vécu concret",
      description:
        "Reliez les faits vérifiés à la réalité vécue au travail, à l'école ou dans votre association.",
      example:
        "« Dans notre hôpital local, des collègues de toutes origines prennent soin des patients chaque jour. »",
    },
    {
      id: "protect-dignity",
      step: "04",
      title: "Protéger la dignité humaine avec calme et clarté",
      description:
        "Si des personnes sont dénigrées, posez une limite sereine et respectueuse pour préserver le vivre-ensemble.",
      example:
        "« Discutons des problèmes sur le fond, mais parlons des personnes avec respect. »",
    },
  ],
  es: [
    {
      id: "listen-connect",
      step: "01",
      title: "Empezar por los valores que nos unen",
      description:
        "Casi todas las personas desean bienestar para su familia, paz y buena vecindad. Empieza por lo que compartimos.",
      example:
        "«Entiendo perfectamente que te preocupen los precios; a mí me pasa igual.»",
    },
    {
      id: "ask-curious",
      step: "02",
      title: "Hacer preguntas abiertas en lugar de sermonear",
      description:
        "Las preguntas amables invitan a reflexionar juntos sin generar rechazo.",
      example:
        "«Cómo crees que una rebaja fiscal a los multimillonarios ayuda a nuestro barrio»",
    },
    {
      id: "calm-facts",
      step: "03",
      title: "Compartir datos serenos y experiencias reales",
      description:
        "Conecta los datos verificados con la vida cotidiana en el trabajo, la escuela o el club.",
      example:
        "«En nuestro hospital local, compañeras y compañeros de muchos orígenes cuidan de todos cada día.»",
    },
    {
      id: "protect-dignity",
      step: "04",
      title: "Defender la dignidad humana con calma y claridad",
      description:
        "Cuando se menosprecia a alguien, marca un límite sereno y respetuoso a favor de la convivencia.",
      example:
        "«Debatamos los temas a fondo, pero hablemos siempre con respeto de las personas.»",
    },
  ],
  tr: [
    {
      id: "listen-connect",
      step: "01",
      title: "Bizi Birleştiren Ortak Değerlerle Başlayın",
      description:
        "Hemen herkes ailesi için güven, adil çalışma koşulları, barış ve iyi komşuluk ister. Ayıran değil, birleştiren noktadan başlayın.",
      example:
        "«Artan fiyatların seni endişelendirmesini çok iyi anlıyorum, ben de aynı şeyi hissediyorum.»",
    },
    {
      id: "ask-curious",
      step: "02",
      title: "Üstten Konuşmak Yerine Açık Sorular Sorun",
      description:
        "Samimi ve meraklı sorular, karşılıklı düşünmeyi teşvik eder ve kutuplaşmayı yumuşatır.",
      example:
        "«En zenginlere yapılan vergi indiriminin bizim mahallemize nasıl bir faydası olur sence»",
    },
    {
      id: "calm-facts",
      step: "03",
      title: "Sakin Gerçekleri ve Günlük Deneyimleri Paylaşın",
      description:
        "Doğrulanmış bilgileri iş yerindeki, okuldaki veya mahalledeki gerçek yaşamla birleştirin.",
      example:
        "«Hastanemizde farklı kökenlerden pek çok çalışma arkadaşımız her gün büyük özveriyle hizmet veriyor.»",
    },
    {
      id: "protect-dignity",
      step: "04",
      title: "İnsan Onurunu Nazik ama Net Biçimde Koruyun",
      description:
        "İnsanlar aşağılandığında kırıcı olmadan, saygılı bir birlikte yaşam için sakin bir sınır çizin.",
      example:
        "«Sorunları açıkça tartışalım ama insanlar hakkında her zaman saygıyla konuşalım.»",
    },
  ],
  uk: [
    {
      id: "listen-connect",
      step: "01",
      title: "Починайте зі спільних людських цінностей",
      description:
        "Майже кожна людина прагне безпеки для родини, справедливої праці, миру та доброго сусідства.",
      example:
        "«Я чудово розумію твоє занепокоєння через ціни — мене це теж хвилює.»",
    },
    {
      id: "ask-curious",
      step: "02",
      title: "Ставте відкриті запитання замість повчань",
      description:
        "Доброзичливі запитання запрошують до спільних роздумів і знімають напругу.",
      example:
        "«Як ти думаєш, чи допоможе нашій громаді зниження податків для мультимільйонерів»",
    },
    {
      id: "calm-facts",
      step: "03",
      title: "Діліться спокійними фактами та життєвим досвідом",
      description:
        "Поєднуйте перевірені факти з реальним досвідом на роботі, у школі чи районі.",
      example:
        "«У нашій лікарні колеги з різних країн щодня віддано рятують здоров'я людей.»",
    },
    {
      id: "protect-dignity",
      step: "04",
      title: "Захищайте людську гідність спокійно й чітко",
      description:
        "Коли когось принижують, спокійно окресліть межу взаємоповаги без агресії.",
      example:
        "«Обговорюймо проблеми відверто, але завжди говорімо про людей із повагою.»",
    },
  ],
  pl: [
    {
      id: "listen-connect",
      step: "01",
      title: "Zacznij od wspólnych wartości",
      description:
        "Prawie każdy pragnie bezpieczeństwa dla rodziny, uczciwej pracy, pokoju i dobrego sąsiedztwa.",
      example:
        "„Doskonale rozumiem, że rosnące ceny Cię martwią — mam dokładnie tak samo.”",
    },
    {
      id: "ask-curious",
      step: "02",
      title: "Zadawaj otwarte pytania zamiast pouczać",
      description:
        "Życzliwe pytania zachęcają do wspólnego zastanowienia się i rozładowują napięcie.",
      example:
        "„Jak myślisz, w czym obniżka podatków dla najbogatszych pomoże naszej okolicy”",
    },
    {
      id: "calm-facts",
      step: "03",
      title: "Dziel się spokojnymi faktami i doświadczeniem",
      description:
        "Łącz sprawdzone fakty z codziennym życiem w pracy, szkole czy klubie.",
      example:
        "„W naszym szpitalu koledzy i koleżanki z wielu krajów codziennie z oddaniem dbają o pacjentów.”",
    },
    {
      id: "protect-dignity",
      step: "04",
      title: "Chroń godność człowieka spokojnie i wyraźnie",
      description:
        "Gdy ktoś jest poniżany, wyznacz spokojną granicę wzajemnego szacunku.",
      example:
        "„Rozmawiajmy szczerze o problemach, ale zawsze mówmy o ludziach z szacunkiem.”",
    },
  ],
  it: [
    {
      id: "listen-connect",
      step: "01",
      title: "Partire dai valori umani condivisi",
      description:
        "Quasi tutti desiderano sicurezza per la famiglia, lavoro equo, pace e buon vicinato.",
      example:
        "«Capisco benissimo che l'aumento dei prezzi ti preoccupi: vale lo stesso per me.»",
    },
    {
      id: "ask-curious",
      step: "02",
      title: "Fare domande aperte invece di fare la predica",
      description:
        "Domande cordiali invitano a riflettere insieme e sciolgono le contrapposizioni.",
      example:
        "«Secondo te in che modo un taglio delle tasse per i milionari aiuta il nostro comune»",
    },
    {
      id: "calm-facts",
      step: "03",
      title: "Condividere fatti pacati ed esperienze reali",
      description:
        "Collega i dati verificati alla vita quotidiana al lavoro, a scuola o nel quartiere.",
      example:
        "«Nel nostro ospedale colleghi di tante origini diverse si prendono cura dei pazienti ogni giorno.»",
    },
    {
      id: "protect-dignity",
      step: "04",
      title: "Tutelare la dignità umana con calma e chiarezza",
      description:
        "Quando qualcuno viene sminuito, traccia un limite sereno e rispettoso.",
      example:
        "«Discutiamo pure dei problemi, ma parliamo sempre delle persone con rispetto.»",
    },
  ],
  ru: [
    {
      id: "listen-connect",
      step: "01",
      title: "Начинайте с общих человеческих ценностей",
      description:
        "Почти каждый человек хочет безопасности для семьи, честного труда, мира и доброго соседства.",
      example:
        "«Я отлично понимаю твоё беспокойство из-за роста цен — меня это тоже волнует.»",
    },
    {
      id: "ask-curious",
      step: "02",
      title: "Задавайте открытые вопросы вместо поучений",
      description:
        "Доброжелательные вопросы приглашают к совместному размышлению и снимают напряжение.",
      example:
        "«Как ты думаешь, чем снижение налогов для мультимиллионеров поможет нашему району»",
    },
    {
      id: "calm-facts",
      step: "03",
      title: "Делитесь спокойными фактами и личным опытом",
      description:
        "Связывайте проверенные факты с реальной жизнью на работе, в школе или по соседству.",
      example:
        "«В нашей больнице коллеги из разных стран каждый день с душой заботятся о пациентах.»",
    },
    {
      id: "protect-dignity",
      step: "04",
      title: "Спокойно и ясно защищайте человеческое достоинство",
      description:
        "Когда кого-то унижают, спокойно обозначьте границу взаимного уважения без агрессии.",
      example:
        "«Давай обсуждать проблемы по существу, но всегда говорить о людях с уважением.»",
    },
  ],
};

export function getDialoguePrinciples(lang: Locale): DialoguePrinciple[] {
  return (
    DIALOGUE_PRINCIPLES_BY_LOCALE[lang] ?? DIALOGUE_PRINCIPLES_BY_LOCALE.de
  );
}
