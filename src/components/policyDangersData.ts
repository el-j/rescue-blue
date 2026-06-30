export interface PolicyDangerItem {
  id: string
  title: string
  metric: string
  description: string
  points: string[]
  citation: string
  citationUrl: string
}

export const policyDangersData: Record<string, PolicyDangerItem[]> = {
  de: [
    {
      id: "social",
      title: "Soziales & Wohlfahrt",
      metric: "Vorteile nur für das reichste 1%",
      description: "Die wirtschafts- und sozialpolitischen Pläne der AfD laufen den realen Interessen von Geringverdienern, Rentnern und Angestellten fundamental entgegen.",
      points: [
        "Erhöhung des gesetzlichen Mindestlohns auf 12 Euro blockiert und abgelehnt (was überproportional den Niedriglohnsektor und Ostdeutsche trifft).",
        "Ersatz des Bürgergeldes durch ein extrem verkürztes System (max. 6 Monate) mit Zwang zur unbezahlten 'Bürgerarbeit'.",
        "Forderung nach Abschaffung der Vermögen- und Erbschaftsteuer, wovon fast ausschließlich das reichste Prozent der Bevölkerung profitiert."
      ],
      citation: "Deutsches Institut für Wirtschaftsforschung (DIW Berlin) — Das AfD-Paradox (2023)",
      citationUrl: "https://www.diw.de/de/diw_01.c.879742.de/publikationen/wochenberichte/2023_32_1/das_afd-paradox__die_waehlerschaft_der_afd_profitiert_am_wenigsten_von_deren_politik.html"
    },
    {
      id: "economy",
      title: "Wirtschaft & Wohlstand",
      metric: "-10% BIP pro Kopf nach 15 Jahren",
      description: "Rechtsextremer Populismus und wirtschaftlicher Nationalismus verursachen langwierigen, empirisch belegbaren Schaden für die Volkswirtschaft.",
      points: [
        "Die Erosion des Rechtsstaats und demokratischer Institutionen schwächt das Vertrauen von Investoren und gefährdet die Investitionssicherheit.",
        "Abschottung, Euro-Gegnerschaft und Protektionismus schädigen die stark vernetzte, exportorientierte deutsche Industrie.",
        "Ausländerfeindliche Rhetorik verschärft den bereits kritischen Fachkräftemangel durch den Abschreckungseffekt auf internationale Spezialisten."
      ],
      citation: "AER-Studie: Funke, Schularick & Trebesch (2023) — Populist Leaders between 1900 and 2020",
      citationUrl: "https://www.aeaweb.org/articles?id=10.1257/aer.20201712"
    },
    {
      id: "press",
      title: "Presse & Rundfunk",
      metric: "Ausschlüsse per Gerichtsentscheid gestoppt",
      description: "Rechtsextreme Parteien betrachten freie Medien als Gegner und versuchen systematisch, kritische Berichterstattung zu unterbinden oder einzuschränken.",
      points: [
        "Mehrfache Versuche, unliebsame Journalisten (u. a. von WDR, BR, Spiegel, Welt, taz) von Parteitagen und Wahlpartys auszuschließen, was Gerichte im Eilverfahren stoppen mussten.",
        "Systematische Agitation gegen den öffentlich-rechtlichen Rundfunk ('Lügenpresse') mit dem Ziel der Zerschlagung und finanziellen Austrocknung.",
        "Historischer Vergleich zeigt: Autokratische Regime in Ungarn (KESMA-Konglomerat) und Polen (unter PiS) übernahmen rasch die Medienkontrolle."
      ],
      citation: "Landgericht Erfurt / Landgericht München I (2024) — Eilentscheidungen zur Pressefreiheit",
      citationUrl: "https://www.tagesschau.de/inland/regional/thueringen/afd-journalisten-wahlparty-erfurt-100.html"
    },
    {
      id: "culture",
      title: "Kunst, Kultur & Schule",
      metric: "Klagen gegen Schultheater abgewiesen",
      description: "Die Unabhängigkeit von Kultur, Wissenschaft und Schule wird attackiert, um ein ideologisches, völkisch-nationales Narrativ zu etablieren.",
      points: [
        "Gerichtliche Klagen gegen politisch-kritisches Schultheater ('Danke dafür, AfD') scheiterten, da die Darbietungen unter den Schutz der Kunstfreiheit fallen.",
        "Forderung in Landesparlamenten, staatliche Kulturförderung an ein 'Bekenntnis zur deutschen Identität' zu knüpfen und kritisches Regietheater zu ächten.",
        "Einrichtung von Online-Meldeportalen ('Neutrale Schule') zur Denunziation von Lehrkräften, die sich im Unterricht kritisch mit Rechtsextremismus befassen."
      ],
      citation: "Verwaltungsgericht Hannover (2023) / Bundesverband Freie Darstellende Künste",
      citationUrl: "https://www.zeit.de/news/2023-11-20/gericht-schultheaterstueck-ueber-afd-ist-von-kunstfreiheit-gedeckt"
    }
  ],
  en: [
    {
      id: "social",
      title: "Social & Welfare",
      metric: "Benefits only for the richest 1%",
      description: "The economic and social policy plans of the AfD run fundamentally counter to the interests of low-income earners, pensioners, and employees.",
      points: [
        "Opposed raising the minimum wage to €12 (which disproportionately benefits low-wage workers and East Germans).",
        "Proposal to replace standard welfare (Bürgergeld) with a heavily reduced system (max. 6 months) and forced, unpaid 'citizen labor'.",
        "Demands the abolition of wealth and inheritance taxes, benefiting almost exclusively the richest 1% of the population."
      ],
      citation: "German Institute for Economic Research (DIW Berlin) — The AfD Paradox (2023)",
      citationUrl: "https://www.diw.de/de/diw_01.c.879742.de/publikationen/wochenberichte/2023_32_1/das_afd-paradox__die_waehlerschaft_der_afd_profitiert_am_wenigsten_von_deren_politik.html"
    },
    {
      id: "economy",
      title: "Economy & Prosperity",
      metric: "-10% GDP per capita after 15 years",
      description: "Far-right populism and economic nationalism cause long-term, empirically proven damage to national economies.",
      points: [
        "The erosion of the rule of law and democratic institutions weakens investor confidence and threatens investment security.",
        "Isolationism, opposition to the Euro, and protectionism severely damage Germany's highly integrated, export-oriented industry.",
        "Xenophobic rhetoric aggravates the already critical shortage of skilled labor by deterring international specialists."
      ],
      citation: "AER Study: Funke, Schularick & Trebesch (2023) — Populist Leaders between 1900 and 2020",
      citationUrl: "https://www.aeaweb.org/articles?id=10.1257/aer.20201712"
    },
    {
      id: "press",
      title: "Press & Broadcasters",
      metric: "Exclusions stopped by court ruling",
      description: "Far-right parties view free media as opponents and systematically attempt to suppress or restrict critical reporting.",
      points: [
        "Repeated attempts to exclude independent journalists (e.g. from WDR, BR, Spiegel, Welt, taz) from party congresses and election events, which courts had to block via emergency injunctions.",
        "Systemic campaign against public broadcasting ('lying press' rhetoric) with the goal of breaking up and dry-funding independent networks.",
        "Historical comparison shows: Autocratic regimes in Hungary (KESMA conglomerate) and Poland (under PiS) rapidly seized media control."
      ],
      citation: "Erfurt District Court / Munich District Court I (2024) — Emergency decisions on press freedom",
      citationUrl: "https://www.tagesschau.de/inland/regional/thueringen/afd-journalisten-wahlparty-erfurt-100.html"
    },
    {
      id: "culture",
      title: "Art, Culture & Education",
      metric: "Lawsuits against school theater dismissed",
      description: "The independence of culture, science, and schools is targeted to establish a nationalist, ethnocentric narrative.",
      points: [
        "Lawsuits against critical school theater plays ('Thanks for that, AfD') failed, as they fall under the constitutional protection of artistic freedom.",
        "Demands in state parliaments to tie cultural funding to a 'commitment to German identity' and blacklist critical theater directors.",
        "Creation of online denunciation portals ('Neutral School') for reporting teachers who critically discuss right-wing extremism."
      ],
      citation: "Hanover Administrative Court (2023) / Federal Association of Free Performing Arts",
      citationUrl: "https://www.zeit.de/news/2023-11-20/gericht-schultheaterstueck-ueber-afd-ist-von-kunstfreiheit-gedeckt"
    }
  ],
  fr: [
    {
      id: "social",
      title: "Social & Bien-être",
      metric: "Bénéfices réservés au 1% le plus riche",
      description: "Les plans économiques et sociaux de l'AfD vont fondamentalement à l'encontre des intérêts des bas salaires, des retraités et des salariés.",
      points: [
        "Opposition à la hausse du SMIC à 12 € (ce qui nuit aux bas salaires et à l'économie de l'Allemagne de l'Est).",
        "Remplacement de l'aide sociale par un système réduit (max. 6 mois) avec l'obligation d'un 'travail citoyen' non rémunéré.",
        "Demande d'abolition des impôts sur la fortune et les successions, au profit presque exclusif du 1% des plus riches."
      ],
      citation: "Institut allemand de recherche économique (DIW Berlin) — Le paradoxe de l'AfD (2023)",
      citationUrl: "https://www.diw.de/de/diw_01.c.879742.de/publikationen/wochenberichte/2023_32_1/das_afd-paradox__die_waehlerschaft_der_afd_profitiert_am_wenigsten_von_deren_politik.html"
    },
    {
      id: "economy",
      title: "Économie & Prospérité",
      metric: "-10% de PIB par habitant après 15 ans",
      description: "Le populisme d'extrême droite et le nationalisme économique causent des dommages durables et prouvés empiriquement aux économies nationales.",
      points: [
        "L'érosion de l'État de droit et des institutions démocratiques affaiblit la confiance des investisseurs et menace la sécurité.",
        "L'isolationnisme, l'opposition à l'Euro et le protectionnisme nuisent gravement à l'industrie allemande tournée vers l'exportation.",
        "La rhétorique xénophobe aggrave la pénurie de main-d'œuvre qualifiée en décourageant les spécialistes internationaux."
      ],
      citation: "Étude AER : Funke, Schularick & Trebesch (2023) — Populist Leaders between 1900 and 2020",
      citationUrl: "https://www.aeaweb.org/articles?id=10.1257/aer.20201712"
    },
    {
      id: "press",
      title: "Presse & Médias",
      metric: "Exclusions annulées par la justice",
      description: "Les partis d'extrême droite perçoivent les médias libres comme des adversaires et tentent systématiquement de restreindre la presse.",
      points: [
        "Tentatives répétées d'exclure les journalistes indépendants (WDR, BR, Spiegel, Welt, taz) des congrès et soirées électorales, annulées par référé.",
        "Campagne systémique contre l'audiovisuel public ('presse mensongère') visant à démanteler et à tarir le financement des réseaux.",
        "La comparaison montre : Les régimes autocratiques en Hongrie (conglomérat KESMA) et en Pologne (sous le PiS) ont rapidement pris le contrôle."
      ],
      citation: "Tribunal d'Erfurt / Tribunal de Munich I (2024) — Référés sur la liberté de la presse",
      citationUrl: "https://www.tagesschau.de/inland/regional/thueringen/afd-journalisten-wahlparty-erfurt-100.html"
    },
    {
      id: "culture",
      title: "Art, Culture & Éducation",
      metric: "Plaintes contre le théâtre scolaire rejetées",
      description: "L'indépendance de la culture, de la science et des écoles est ciblée pour imposer un récit nationaliste et ethnocentrique.",
      points: [
        "Les poursuites judiciaires contre des pièces de théâtre scolaires critiques ont échoué, car elles sont protégées par la liberté artistique.",
        "Demandes dans les parlements régionaux de lier le financement culturel à un 'engagement envers l'identité allemande'.",
        "Création de portails de dénonciation en ligne pour signaler les enseignants qui parlent de manière critique de l'extrême droite."
      ],
      citation: "Tribunal administratif de Hanovre (2023) / Association fédérale du théâtre libre",
      citationUrl: "https://www.zeit.de/news/2023-11-20/gericht-schultheaterstueck-ueber-afd-ist-von-kunstfreiheit-gedeckt"
    }
  ],
  es: [
    {
      id: "social",
      title: "Social & Bienestar",
      metric: "Beneficios solo para el 1% más rico",
      description: "Los planes económicos y sociales de AfD van fundamentalmente en contra de los intereses de los trabajadores de bajos ingresos, jubilados y empleados.",
      points: [
        "Oposición a la subida del salario mínimo a 12 € (lo que perjudica a los salarios bajos y a la economía de Alemania Oriental).",
        "Propuesta de reemplazar el Bürgergeld por un sistema reducido (máx. 6 meses) y trabajo forzado no remunerado ('trabajo ciudadano').",
        "Exige la abolición de los impuestos sobre el patrimonio y las sucesiones, beneficiando casi exclusivamente al 1% más rico."
      ],
      citation: "Instituto Alemán de Investigación Económica (DIW Berlín) — La paradoja de AfD (2023)",
      citationUrl: "https://www.diw.de/de/diw_01.c.879742.de/publikationen/wochenberichte/2023_32_1/das_afd-paradox__die_waehlerschaft_der_afd_profitiert_am_wenigsten_von_deren_politik.html"
    },
    {
      id: "economy",
      title: "Economía & Prosperidad",
      metric: "-10% PIB per cápita tras 15 años",
      description: "El populismo de extrema derecha y el nacionalismo económico causan daños a largo plazo y empíricamente probados en las escuelas.",
      points: [
        "La erosión del Estado de derecho y de las instituciones debilita la confianza de los inversores y amenaza la seguridad de la inversión.",
        "El aislamiento, la oposición al euro y el proteccionismo dañan gravemente a la industria alemana exportadora.",
        "La retórica xenófoba agrava la escasez de mano de obra cualificada al disuadir a especialistas internacionales."
      ],
      citation: "Estudio AER: Funke, Schularick & Trebesch (2023) — Populist Leaders between 1900 and 2020",
      citationUrl: "https://www.aeaweb.org/articles?id=10.1257/aer.20201712"
    },
    {
      id: "press",
      title: "Prensa & Medios",
      metric: "Exclusiones anuladas por los tribunales",
      description: "Los partidos de extrema derecha consideran a los medios libres como oponentes y tratan sistemáticamente de restringir la prensa.",
      points: [
        "Intentos repetidos de excluir a periodistas independientes de congresos y fiestas electorales, que la justicia detuvo mediante medidas provisionales.",
        "Campaña sistemática contra la televisión pública ('prensa de mentiras') con el objetivo de desmantelar y asfixiar su financiación.",
        "La comparación muestra: Regímenes autocráticos en Hungría (grupo KESMA) y Polonia (bajo el PiS) tomaron rápidamente el control."
      ],
      citation: "Tribunal de Erfurt / Tribunal de Múnich I (2024) — Decisiones urgentes sobre libertad de prensa",
      citationUrl: "https://www.tagesschau.de/inland/regional/thueringen/afd-journalisten-wahlparty-erfurt-100.html"
    },
    {
      id: "culture",
      title: "Arte, Cultura & Educación",
      metric: "Demandas contra teatro escolar desestimadas",
      description: "La independencia de la cultura, la ciencia y las escuelas es atacada para imponer una narrativa etnocéntrica y nacionalista.",
      points: [
        "Las demandas contra obras de teatro escolares críticas fracasaron, ya que están protegidas constitucionalmente por la libertad artística.",
        "Exigencias en los parlamentos regionales de condicionar las ayudas a la cultura a un 'compromiso con la conciencia alemana'.",
        "Creación de portales de denuncia online para delatar a profesores que traten críticamente el extremismo de derecha."
      ],
      citation: "Tribunal Administrativo de Hannover (2023) / Asociación Federal de Artes Escénicas Libres",
      citationUrl: "https://www.zeit.de/news/2023-11-20/gericht-schultheaterstueck-ueber-afd-ist-von-kunstfreiheit-gedeckt"
    }
  ],
イタリア: [
  ],
  it: [
    {
      id: "social",
      title: "Sociale & Welfare",
      metric: "Benefici solo per l'1% più ricco",
      description: "I piani economici e sociali dell'AfD vanno fondamentalmente contro gli interessi dei lavoratori a basso reddito, dei pensionati e dei dipendenti.",
      points: [
        "Opposizione all'aumento del salario minimo a 12 € (a danno dei salariati bassi e dell'economia della Germania dell'Est).",
        "Proposta di sostituire il sussidio di cittadinanza con un sistema ridotto (max. 6 mesi) e lavoro forzato non retribuito ('lavoro cittadino').",
        "Richiede l'abolizione delle imposte patrimoniali e di successione, a vantaggio quasi esclusivo del 1% più ricco."
      ],
      citation: "Istituto tedesco per la ricerca economica (DIW Berlino) — Il paradosso dell'AfD (2023)",
      citationUrl: "https://www.diw.de/de/diw_01.c.879742.de/publikationen/wochenberichte/2023_32_1/das_afd-paradox__die_waehlerschaft_der_afd_profitiert_am_wenigsten_von_deren_politik.html"
    },
    {
      id: "economy",
      title: "Economia & Prosperità",
      metric: "-10% PIL pro capite dopo 15 anni",
      description: "Il populismo di estrema destra e il nazionalismo economico causano danni a lungo termine e provati empiricamente alle economie nazionali.",
      points: [
        "L'erosione dello Stato di diritto e delle istituzioni democratiche indebolisce la fiducia degli investitori e minaccia la sicurezza degli investimenti.",
        "Isolazionismo, opposizione all'euro e protezionismo danneggiano gravemente l'industria tedesca fortemente esportatrice.",
        "La retorica xenofoba aggrava la già critica carenza di manodopera qualificata, scoraggiando gli specialisti internazionali."
      ],
      citation: "Studio AER: Funke, Schularick & Trebesch (2023) — Populist Leaders between 1900 and 2020",
      citationUrl: "https://www.aeaweb.org/articles?id=10.1257/aer.20201712"
    },
    {
      id: "press",
      title: "Stampa & Media",
      metric: "Esclusioni bloccate dai tribunali",
      description: "I partiti di estrema destra considerano i media liberi come avversari e cercano sistematicamente di limitare la libertà di stampa.",
      points: [
        "Ripetuti tentativi di escludere giornalisti indipendenti dai congressi e dagli eventi elettorali, fermati dalla magistratura con provvedimenti d'urgenza.",
        "Campagna sistematica contro il servizio pubblico ('stampa bugiarda') con l'obiettivo di smantellare e asfissiare i finanziamenti delle reti.",
        "Il confronto storico mostra: Regimi autocratici in Ungheria (gruppo KESMA) e Polonia (sotto il PiS) hanno assunto rapidamente il controllo."
      ],
      citation: "Tribunale di Erfurt / Tribunale di Monaco I (2024) — Decisioni d'urgenza sulla libertà di stampa",
      citationUrl: "https://www.tagesschau.de/inland/regional/thueringen/afd-journalisten-wahlparty-erfurt-100.html"
    },
    {
      id: "culture",
      title: "Arte, Cultura & Scuola",
      metric: "Cause contro il teatro scolastico respinte",
      description: "La cultura libera e l'istruzione aperta sono percepite come minacce alle narrazioni etnocentriche.",
      points: [
        "Respinte le cause contro spettacoli scolastici critici nei confronti dell'AfD, poiché sono protetti dalla libertà artistica.",
        "Richieste nei parlamenti regionali di subordinare i finanziamenti alla cultura a una 'adesione all'identità tedesca'.",
        "Creazione di portali di segnalazione online per denunciare gli insegnanti che parlano criticamente di estremismo di destra."
      ],
      citation: "Tribunale Amministrativo di Hannover (2023) / Associazione Federale Arti Performative Libere",
      citationUrl: "https://www.zeit.de/news/2023-11-20/gericht-schultheaterstueck-ueber-afd-ist-von-kunstfreiheit-gedeckt"
    }
  ],
  pl: [
    {
      id: "social",
      title: "Polityka społeczna",
      metric: "Korzyści tylko dla najbogatszych 1%",
      description: "Plany gospodarcze i społeczne AfD są zasadniczo sprzeczne z interesami osób o niskich dochodach, emerytów i pracowników.",
      points: [
        "Sprzeciw wobec podniesienia płacy minimalnej do 12 € (co uderza w osoby o niskich dochodach i gospodarkę Niemiec Wschodnich).",
        "Propozycja zastąpienia Bürgergeld skróconym systemem (maks. 6 miesięcy) z przymusową, nieopłacaną 'pracą obywatelską'.",
        "Żądanie zniesienia podatków od majątku i spadków, co sprzyja prawie wyłącznie najbogatszemu jednemu procentowi ludności."
      ],
      citation: "Niemiecki Instytut Badań Gospodarczych (DIW Berlin) — Paradoks AfD (2023)",
      citationUrl: "https://www.diw.de/de/diw_01.c.879742.de/publikationen/wochenberichte/2023_32_1/das_afd-paradox__die_waehlerschaft_der_afd_profitiert_am_wenigsten_von_deren_politik.html"
    },
    {
      id: "economy",
      title: "Gospodarka i dobrobyt",
      metric: "-10% PKB na mieszkańca po 15 latach",
      description: "Skrajnie prawicowy populizm i nacjonalizm gospodarczy powodują długotrwałe, udowodnione empirycznie szkody dla gospodarki narodowej.",
      points: [
        "Erozja praworządności i instytucji demokratycznych osłabia zaufanie inwestorów i zagraża bezpieczeństwu inwestycji.",
        "Izolacjonizm, sprzeciw wobec euro i protekcjonizm poważnie szkodzą silnie powiązanemu z eksportem niemieckiemu przemysłowi.",
        "Ksenofobiczna retoryka pogłębia i tak już krytyczny brak wykwalifikowanej siły roboczej, odstraszając zagranicznych specjalistów."
      ],
      citation: "Badanie AER: Funke, Schularick & Trebesch (2023) — Populist Leaders between 1900 and 2020",
      citationUrl: "https://www.aeaweb.org/articles?id=10.1257/aer.20201712"
    },
    {
      id: "press",
      title: "Prasa i media",
      metric: "Wykluczenia zablokowane przez sąd",
      description: "Partie skrajnie prawicowe postrzegają wolne media jako przeciwników i systematycznie próbują ograniczać wolność prasy.",
      points: [
        "Wielokrotne próby wykluczenia niezależnych dziennikarzy z kongresów i wieczorów wyborczych, powstrzymane przez sądy w trybie pilnym.",
        "Systematyczna kampania przeciwko mediom publicznym ('kłamliwa prasa') mająca na celu demontaż i odcięcie finansowania stacji.",
        "Porównanie historyczne pokazuje: Autokratyczne reżimy na Węgrzech (holding KESMA) i w Polsce (pod rządami PiS) szybko przejęły media."
      ],
      citation: "Sąd Okręgowy w Erfurcie / Sąd Okręgowy w Monachium I (2024) — Pilne decyzje w sprawie wolności prasy",
      citationUrl: "https://www.tagesschau.de/inland/regional/thueringen/afd-journalisten-wahlparty-erfurt-100.html"
    },
    {
      id: "culture",
      title: "Sztuka, kultura i szkoła",
      metric: "Pozwy przeciwko teatrowi szkolnemu oddalone",
      description: "Niezależność kultury, nauki i szkół jest atakowana w celu narzucenia etnocentrycznej, narodowej narracji.",
      points: [
        "Pozwy sądowe przeciwko krytycznym szkolnym przedstawieniom teatralnym upadły, ponieważ są one chronione wolnością artystyczną.",
        "Żądania w parlamentach regionalnych, by uzależnić dotacje dla kultury od 'deklaracji poparcia dla niemieckiej tożsamości'.",
        "Tworzenie portali zgłoszeniowych online w celu denuncjowania nauczycieli, którzy krytycznie omawiają skrajny prawicowy radykalizm."
      ],
      citation: "Sąd Administracyjny w Hanowerze (2023) / Federalne Stowarzyszenie Wolnych Sztuk Scenicznych",
      citationUrl: "https://www.zeit.de/news/2023-11-20/gericht-schultheaterstueck-ueber-afd-ist-von-kunstfreiheit-gedeckt"
    }
  ],
  tr: [
    {
      id: "social",
      title: "Sosyal & Refah",
      metric: "Sadece en zengin %1 için fayda",
      description: "AfD'nin ekonomik ve sosyal politika planları, dar gelirlilerin, emeklilerin ve işçilerin gerçek çıkarlarına tamamen aykırıdır.",
      points: [
        "Asgari ücretin 12 €'ya çıkarılmasına karşı çıkıldı (bu durum düşük ücretli işçilere ve Doğu Almanya ekonomisine zarar vermektedir).",
        "Sosyal yardım sisteminin (Bürgergeld) ağır kesintiler içeren bir sistemle (en fazla 6 ay) ve zorunlu, ücretsiz 'vatandaşlık çalışmasıyla' değiştirilmesi önerisi.",
        "Neredeyse yalnızca nüfusun en zengin yüzde birinin yararına olacak şekilde varlık ve miras vergilerinin kaldırılmasını talep ediyor."
      ],
      citation: "Alman Ekonomik Araştırma Enstitüsü (DIW Berlin) — AfD Paradoksu (2023)",
      citationUrl: "https://www.diw.de/de/diw_01.c.879742.de/publikationen/wochenberichte/2023_32_1/das_afd-paradox__die_waehlerschaft_der_afd_profitiert_am_wenigsten_von_deren_politik.html"
    },
    {
      id: "economy",
      title: "Ekonomi & Refah",
      metric: "15 yıl sonra -%10 kişi başına GSYİH",
      description: "Aşırı sağ popülizm ve ekonomik milliyetçilik, ulusal ekonomilere uzun vadeli, ampirik olarak kanıtlanmış zararlar verir.",
      points: [
        "Hukukun üstünlüğünün ve demokratik kurumların aşınması yatırımcı güvenini zayıflatır ve yatırım güvenliğini tehdit eder.",
        "Tecritçilik, Euro karşıtlığı ve korumacılık, Almanya'nın dışa açık, ihracat odaklı sanayisine ciddi şekilde zarar verir.",
        "Yabancı düşmanı söylemler, uluslararası uzmanları caydırarak zaten kritik olan kalifiye iş gücü açığını daha da derinleştirir."
      ],
      citation: "AER Çalışması: Funke, Schularick & Trebesch (2023) — Populist Leaders between 1900 and 2020",
      citationUrl: "https://www.aeaweb.org/articles?id=10.1257/aer.20201712"
    },
    {
      id: "press",
      title: "Basın & Yayın",
      metric: "Dışlamalar mahkeme kararıyla durduruldu",
      description: "Aşırı sağcı partiler özgür medyayı rakip olarak görür ve eleştirel haberleri sistematik olarak engellemeye veya kısıtlamaya çalışır.",
      points: [
        "Bağımsız gazetecilerin (WDR, BR, Spiegel, Welt, taz) kongrelerden ve seçim etkinliklerinden dışlanması yönündeki mükerrer girişimler, mahkemelerce ihtiyati tedbirlerle durduruldu.",
        "Kamu yayıncılığına karşı, kanalları parçalamayı ve finansmanını kurutmayı amaçlayan sistematik kampanya ('yalancı basın' söylemi).",
        "Tarihsel karşılaştırma gösteriyor: Macaristan (KESMA tröstü) ve Polonya'daki (PiS dönemi) otokratik rejimler medya kontrolünü hızla ele geçirdi."
      ],
      citation: "Erfurt Bölge Mahkemesi / Münih Bölge Mahkemesi I (2024) — Basın özgürlüğüne ilişkin acil kararlar",
      citationUrl: "https://www.tagesschau.de/inland/regional/thueringen/afd-journalisten-wahlparty-erfurt-100.html"
    },
    {
      id: "culture",
      title: "Sanat, Kültür & Eğitim",
      metric: "Okul tiyatrosuna yönelik davalar reddedildi",
      description: "Kültür, bilim ve okulların bağımsızlığı, milliyetçi ve etnosentrik bir anlatı oluşturmak amacıyla hedef alınmaktadır.",
      points: [
        "AfD'yi eleştiren okul tiyatrosu oyunlarına yönelik davalar, oyunların sanat özgürlüğünün anayasal koruması altında olması nedeniyle başarısız oldu.",
        "Eyalet parlamentolarında, kültürel fonlerin bir 'Alman kimliğine bağlılığa' bağlanması ve eleştirel tiyatro yönetmenlerinin kara listeye alınması talepleri.",
        "Aşırı sağcılığı eleştirel bir şekilde tartışan öğretmenleri bildirmek için çevrimiçi ihbar portallarının ('Tarafsız Okul') oluşturulması."
      ],
      citation: "Hannover İdare Mahkemesi (2023) / Özgür Sahne Sanatları Federal Birliği",
      citationUrl: "https://www.zeit.de/news/2023-11-20/gericht-schultheaterstueck-ueber-afd-ist-von-kunstfreiheit-gedeckt"
    }
  ],
  uk: [
    {
      id: "social",
      title: "Соціальна сфера та добробут",
      metric: "Пільги лише для найбагатших 1%",
      description: "Економічні та соціально-політичні плани AfD фундаментально суперечать інтересам низькооплачуваних працівників, пенсіонерів та службовців.",
      points: [
        "Опозиція до підвищення мінімальної зарплати до 12 € (що шкодить низькооплачуваним працівникам та економіці Східної Німеччини).",
        "Пропозиція замінити Bürgergeld скороченою системою (макс. 6 місяців) із примусовою неоплачуваною 'громадянською роботою'.",
        "Вимога скасування податків на багатство та спадщину, що приносить користь майже виключно найбагатшому 1% населення."
      ],
      citation: "Німецький інститут економічних досліджень (DIW Berlin) — Парадокс AfD (2023)",
      citationUrl: "https://www.diw.de/de/diw_01.c.879742.de/publikationen/wochenberichte/2023_32_1/das_afd-paradox__die_waehlerschaft_der_afd_profitiert_am_wenigsten_von_deren_politik.html"
    },
    {
      id: "economy",
      title: "Економіка та добробут",
      metric: "-10% ВВП на душу населення через 15 років",
      description: "Правоекстремістський популізм та економічний націоналізм завдають довгострокової, емпірично доведеної шкоди національним економікам.",
      points: [
        "Ерозія верховенства права та демократичних інституцій послаблює довіру інвесторів та загрожує безпеці інвестицій.",
        "Ізоляціонізм, протидія євро та протекціонізм серйозно шкодять німецькій індустрії, яка сильно орієнтована на експорт.",
        "Ксенофобська риторика загострює і без того критичний дефіцит кваліфікованої робочої сили, відлякуючи міжнародних фахівців."
      ],
      citation: "Дослідження AER: Funke, Schularick & Trebesch (2023) — Populist Leaders between 1900 and 2020",
      citationUrl: "https://www.aeaweb.org/articles?id=10.1257/aer.20201712"
    },
    {
      id: "press",
      title: "Преса та мовлення",
      metric: "Виключення зупинені судовими рішеннями",
      description: "Правоекстремістські партії сприймають вільні медіа як опонентів і систематично намагаються придушити або обмежити критичне висвітлення.",
      points: [
        "Неодноразові спроби виключити незалежних журналістів (зокрема з WDR, BR, Spiegel, Welt, taz) з партійних з'їздів та виборчих заходів, які суди зупиняли в терміновому порядку.",
        "Систематична кампанія проти суспільного мовлення ('брехлива преса') з метою ліквідації та припинення фінансування мереж.",
        "Історичне порівняння показує: Автократичні режими в Угорщині (конгломерат KESMA) та Польщі (за часів PiS) швидко захопили контроль над ЗМІ."
      ],
      citation: "Окружний суд Ерфурта / Окружний суд Мюнхена I (2024) — Термінові рішення щодо свободи преси",
      citationUrl: "https://www.tagesschau.de/inland/regional/thueringen/afd-journalisten-wahlparty-erfurt-100.html"
    },
    {
      id: "culture",
      title: "Мистецтво, культура та освіта",
      metric: "Позови проти шкільних театрів відхилено",
      description: "Незалежність культури, науки та шкіл атакується з метою встановлення націоналістичного, етноцентричного наративу.",
      points: [
        "Судові позови проти критичних шкільних театральних вистав зазнали краху, оскільки вистави захищені конституційним правом на свободу мистецтва.",
        "Вимоги в регіональних парламентах пов'язати фінансування культури з 'патріотичною німецькою свідомістю'.",
        "Створення онлайн-порталів доносів ('Нейтральна школа') для скарг на вчителів, які критично обговорюють правий екстремізм."
      ],
      citation: "Адміністративний суд Ганновера (2023) / Федеральна асоціація вільного виконавського мистецтва",
      citationUrl: "https://www.zeit.de/news/2023-11-20/gericht-schultheaterstueck-ueber-afd-ist-von-kunstfreiheit-gedeckt"
    }
  ],
  ru: [
    {
      id: "social",
      title: "Социальная сфера & Благосостояние",
      metric: "Выгода только для богатейшего 1%",
      description: "Экономические и социально-политические планы АдГ фундаментально противоречат реальным интересам низкооплачиваемых работников, пенсионеров и служащих.",
      points: [
        "Оппозиция к повышению минимальной зарплаты до 12 € (что вредит низкооплачиваемым работникам и экономике Восточной Германии).",
        "Предложение заменить Bürgergeld сокращенной системой (макс. 6 месяцев) с принудительными неоплачиваемыми 'общественными работами'.",
        "Требование отмены налогов на наследство и богатство, что приносит пользу почти исключительно богатейшему 1% населения."
      ],
      citation: "Немецкий институт экономических исследований (DIW Berlin) — Парадокс АдГ (2023)",
      citationUrl: "https://www.diw.de/de/diw_01.c.879742.de/publikationen/wochenberichte/2023_32_1/das_afd-paradox__die_waehlerschaft_der_afd_profitiert_am_wenigsten_von_deren_politik.html"
    },
    {
      id: "economy",
      title: "Экономика & Процветание",
      metric: "-10% ВВП на душу населения через 15 лет",
      description: "Правоэкстремистский популизм и экономический национализм наносят долгосрочный, эмпирически доказанный ущерб национальным экономикам.",
      points: [
        "Эрозия верховенства права и демократических институтов ослабляет доверие инвесторов и угрожает безопасности инвестиций.",
        "Изоляционизм, противодействие евро и протекционизм серьезно вредят немецкой индустрии, сильно ориентированной на экспорт.",
        "Ксенофобская риторика усугубляет и без того критический дефицит квалифицированной рабочей силы, отпугивая международных специалистов."
      ],
      citation: "Исследование AER: Funке, Schularick & Trebesch (2023) — Populist Leaders between 1900 and 2020",
      citationUrl: "https://www.aeaweb.org/articles?id=10.1257/aer.20201712"
    },
    {
      id: "press",
      title: "Пресса & Вещание",
      metric: "Исключения остановлены судами",
      description: "Правоэкстремистские партии рассматривают свободные СМИ как оппонентов и систематически пытаются подавить или ограничить критическое освещение событий.",
      points: [
        "Неоднократные попытки исключить независимых журналистов (в т.ч. из WDR, BR, Spiegel, Welt, taz) с партийных съездов и предвыборных мероприятий, остановленные судами.",
        "Систематическая кампания против общественного вещания ('лживая пресса') с целью ликвидации и прекращения финансирования каналов.",
        "Историческое сравнение показывает: Автократические режимы в Венгрии (конгломерат KESMA) и Польше (при PiS) быстро захватили контроль над СМИ."
      ],
      citation: "Окружной суд Эрфурта / Окружной суд Мюнхена I (2024) — Экстренные решения о свободе прессы",
      citationUrl: "https://www.tagesschau.de/inland/regional/thueringen/afd-journalisten-wahlparty-erfurt-100.html"
    },
    {
      id: "culture",
      title: "Искусство, Культура & Школа",
      metric: "Иски против школьных театров отклонены",
      description: "Независимость культуры, науки и школ атакуется с целью установления националистического, этноцентрического нарратива.",
      points: [
        "Судебные иски против критических школьных театральных спектаклей потерпели крах, так как они защищены конституционным правом на свободу искусства.",
        "Требования в региональных парламентах связать финансирование культуры с 'патриотическим немецким самосознанием'.",
        "Создание онлайн-порталов доносов ('Нейтральная школа') для жалоб на учителей, которые критически обсуждают правый экстремизм."
      ],
      citation: "Административный суд Ганновера (2023) / Федеральная ассоциация свободного исполнительского искусства",
      citationUrl: "https://www.zeit.de/news/2023-11-20/gericht-schultheaterstueck-ueber-afd-ist-von-kunstfreiheit-gedeckt"
    }
  ]
}
