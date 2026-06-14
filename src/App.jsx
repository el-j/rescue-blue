import { useState, useEffect } from 'react';
import {
  Shield, Paintbrush, CheckCircle, AlertTriangle, ExternalLink,
  Users, ArrowUpRight, BookOpen, MessageSquare, Globe, ChevronDown, ChevronUp
} from 'lucide-react';

const PETITION_URL = 'https://weact.campact.de/petitions/rettet-das-blau-medien-mussen-die-afd-farblich-passend-darstellen';

// ── i18n ──────────────────────────────────────────────────────────────────────
const translations = {
  de: {
    navCampaign: 'WeAct Kampagne',
    navWhy: 'Warum Blau?',
    navLetter: 'Offener Brief',
    navCulture: 'Kulturerbe',
    navSign: 'Jetzt unterzeichnen',
    badge: 'Visuelle Medienethik & Kulturpflege',
    heroH1: 'Blau retten.',
    heroSub: 'Für eine treffende Farbwahl.',
    heroBody: 'Unsere Sprache und Farbsymbolik sind historisch positiv verankert. Wir fordern von ARD, ZDF und den privaten Sendern die Richtigstellung politischer Farbcodes: Die AfD gehört in Diagrammen in Braun dargestellt, nicht Blau.',
    sigCount: 'Bereits',
    sigSupport: 'Unterstützer',
    sigLive: 'Echtzeit-Daten',
    sigFallback: 'Live-Anbindung',
    heroImgCaption: 'Unser Kampagnen-Visual',
    heroImgSub: 'Visuelle Wahrheit schaffen, das sprachliche Blau bewahren.',
    heroImgCta: 'Auf Campact unterzeichnen',
    demoSandbox: 'Sandbox-Modus',
    demoH2: 'Interaktiver Farbvergleich',
    demoDesc: 'Klicke auf den Schalter oder den Balken, um den blauen Verharmlosungs-Code durch das historisch zutreffende Braun zu ersetzen.',
    demoOption: 'Visualisierungs-Option',
    demoQuestion: 'Welche Farbwahl ist treffend und historisch ehrlich?',
    demoReset: 'Zurücksetzen auf Blau',
    demoSwitch: 'Jetzt umfärben auf Braun',
    whyH2: 'Die Hintergründe des Farb-Fasching',
    whyIntro: 'Wissenschaftliche Frame-Forschung belegt: Die Wahrnehmung politischer Akteure wird maßgeblich von den visuellen Signalen bestimmt, mit denen sie in Sendungen wie dem ZDF heute-journal oder der ARD Tagesschau konfiguriert werden.',
    whyCard1H: 'Die visuelle Verharmlosung',
    whyCard1: 'Blau ist die Farbe des Himmels, des Meeres und der Friedenskräfte. Sie beruhigt, schafft Vertrauen und signalisiert Unbedenklichkeit. Diese emotionale Kodierung für eine völkisch-nationalistische und in Teilen verfassungsfeindliche Gruppierung zu verwenden, ist ein fataler medienethischer Fehler.',
    whyCard2H: 'Die historische Zuordnung',
    whyCard2: 'Die politische Farbe Braun ist im kollektiven Gedächtnis Deutschlands fest mit völkischem Nationalismus und Rechtsextremismus assoziiert. Eine ehrliche Grafikordnung muss Mut beweisen und diese historische Kontinuität visuell kenntlich machen.',
    cultureH: 'Kulturelles Erbe retten',
    cultureSub: 'Das ist das sprachliche Eigentum unserer Gemeinschaft.',
    tabLang: 'Sprachschatz',
    tabSym: 'Symbolik & Geschichte',
    letterH: 'Der Offene Brief',
    letterSub: 'Wähle die Zielgruppe aus, um zu sehen, wie wir die Redaktionen und Kontrollgremien in die Pflicht nehmen:',
    targetPublic: 'Öffentl.-Rechtliche',
    targetPrivate: 'Private Medien',
    targetCouncil: 'Rundfunkräte',
    ctaBanner: 'Jetzt unterzeichnen und Blau retten!',
    ctaBody: 'Über 14.000 Menschen haben diese Petition bereits unterzeichnet. Zeige auch du, dass du für eine ehrliche visuelle Berichterstattung einstehst.',
    ctaBtn: 'Jetzt auf WeAct unterzeichnen',
    ctaInfo: 'Kostenlos · Keine Werbung · Nur deine Stimme zählt',
    footerTagline: 'Eine Kampagne für mediale Integrität und den Schutz des kulturellen Erbes der Farbe Blau.',
    footerLink: 'Zur Petition auf WeAct',
  },
  en: {
    navCampaign: 'WeAct Campaign',
    navWhy: 'Why Blue?',
    navLetter: 'Open Letter',
    navCulture: 'Cultural Heritage',
    navSign: 'Sign Now',
    badge: 'Visual Media Ethics & Cultural Preservation',
    heroH1: 'Rescue Blue.',
    heroSub: 'For an accurate colour choice.',
    heroBody: 'Our language and colour symbolism are historically rooted in positivity. We demand that ARD, ZDF and private broadcasters correct their political colour codes: the AfD must be depicted in brown in charts, not blue.',
    sigCount: 'Already',
    sigSupport: 'supporters',
    sigLive: 'Real-time data',
    sigFallback: 'Live connection',
    heroImgCaption: 'Our Campaign Visual',
    heroImgSub: 'Creating visual truth, preserving the linguistic Blue.',
    heroImgCta: 'Sign on Campact',
    demoSandbox: 'Sandbox Mode',
    demoH2: 'Interactive Colour Comparison',
    demoDesc: 'Click the toggle or the bar to replace the blue soft-pedalling code with the historically accurate brown.',
    demoOption: 'Visualisation Option',
    demoQuestion: 'Which colour choice is accurate and historically honest?',
    demoReset: 'Reset to Blue',
    demoSwitch: 'Switch to Brown',
    whyH2: 'The Background of the Colour Masquerade',
    whyIntro: 'Scientific framing research shows: the perception of political actors is substantially shaped by the visual signals used to represent them in programmes like ZDF heute-journal or ARD Tagesschau.',
    whyCard1H: 'The Visual Downplaying',
    whyCard1: 'Blue is the colour of the sky, the sea, and peacekeeping forces. It calms, builds trust, and signals harmlessness. Using this emotional coding for a völkisch-nationalist and partly anti-constitutional group is a fatal media-ethics mistake.',
    whyCard2H: 'The Historical Assignment',
    whyCard2: 'The political colour brown is firmly associated in Germany\'s collective memory with völkisch nationalism and far-right extremism. Honest graphic standards must show courage and make this historical continuity visually apparent.',
    cultureH: 'Saving Cultural Heritage',
    cultureSub: 'This is the linguistic property of our community.',
    tabLang: 'Language Treasury',
    tabSym: 'Symbolism & History',
    letterH: 'The Open Letter',
    letterSub: 'Choose the target audience to see how we hold editors and oversight bodies accountable:',
    targetPublic: 'Public Broadcasters',
    targetPrivate: 'Private Media',
    targetCouncil: 'Broadcasting Councils',
    ctaBanner: 'Sign now and rescue Blue!',
    ctaBody: 'Over 14,000 people have already signed this petition. Show that you stand for honest visual reporting.',
    ctaBtn: 'Sign now on WeAct',
    ctaInfo: 'Free · No ads · Only your voice counts',
    footerTagline: 'A campaign for media integrity and the protection of the cultural heritage of the colour blue.',
    footerLink: 'View petition on WeAct',
  }
};

const blueSayings = {
  de: {
    sprache: [
      { phrase: 'Blau machen', origin: 'Mittelalter / Färberhandwerk', desc: 'Der Begriff stammt vom freien Montag der Färber. Während die Wolle an der Luft oxidierte und blau wurde, ruhte die Arbeit. Ein schönes deutsches Sinnbild für Erholung und Selbstfürsorge.' },
      { phrase: 'Ins Blaue hinein', origin: 'Naturromantik', desc: 'Eine unbeschwerte Reise oder Tat ohne festes Ziel, getragen von purem Vertrauen, Neugierde und friedlicher Abenteuerlust.' },
      { phrase: 'Das Blaue vom Himmel versprechen', origin: 'Poetische Metaphorik', desc: 'Blau steht hier für das unendliche, majestätische Himmelsgewölbe – ein wunderbares Bild voller Träume und Sehnsüchte.' },
    ],
    symbolik: [
      { phrase: 'Die blaue Blume', origin: 'Epoche der Romantik (Novalis)', desc: 'Das wichtigste Symbol für Sehnsucht, Liebe, Erkenntnis und die Entfaltung des menschlichen Geistes. Ein unschätzbares Kulturgut.' },
      { phrase: 'Blauhelme der Vereinten Nationen', origin: 'Globale Friedensarbeit', desc: 'Blau wurde von der UN gezielt gewählt, weil es universell für Neutralität, Deeskalation, Zuversicht und den Willen zum dauerhaften Frieden steht.' },
      { phrase: 'Königsblau & Ultramarin', origin: 'Kunst- und Kulturgeschichte', desc: 'Jahrhundertelang wertvoller als Gold (aus Lapislazuli). In der Renaissance war dieses kostbare Blau ausschließlich der Darstellung des Erhabensten vorbehalten.' },
    ],
  },
  en: {
    sprache: [
      { phrase: '"Blau machen" (To skive)', origin: 'Medieval / Dyers\' trade', desc: 'The term originates from the dyers\' free Monday. While wool oxidised and turned blue in the air, work rested. A beautiful German metaphor for rest and self-care.' },
      { phrase: '"Ins Blaue hinein" (Into the blue)', origin: 'Nature Romanticism', desc: 'A carefree journey or deed with no fixed destination, carried by pure trust, curiosity, and peaceful adventurousness.' },
      { phrase: '"Das Blaue vom Himmel versprechen" (Promise the blue from the sky)', origin: 'Poetic metaphor', desc: 'Blue here stands for the infinite, majestic vault of heaven – a wonderful image full of dreams and longing.' },
    ],
    symbolik: [
      { phrase: 'The Blue Flower', origin: 'Romanticism (Novalis)', desc: 'The most important symbol for longing, love, insight, and the unfolding of the human spirit. An invaluable cultural asset.' },
      { phrase: 'UN Blue Helmets', origin: 'Global Peace Work', desc: 'Blue was deliberately chosen by the UN because it universally stands for neutrality, de-escalation, optimism, and the will for lasting peace.' },
      { phrase: 'Royal Blue & Ultramarine', origin: 'Art & Cultural History', desc: 'For centuries more valuable than gold (from lapis lazuli). In the Renaissance, this precious blue was reserved exclusively for the most exalted depictions.' },
    ],
  },
};

const openLetters = {
  de: {
    oeffentlich: {
      to: 'AN: Chefredaktionen ARD-aktuell & ZDF-Hauptredaktion',
      subject: 'Betreff: Visuelle Verzerrung & Frame-Verantwortung',
      body: [
        'Sehr geehrte Damen und Herren,',
        'als öffentlich-rechtliche Medienhäuser tragen Sie die gesetzliche Verantwortung für die objektive, historisch und analytisch einordnende Information der Bevölkerung.',
        'Die Verwendung der Farbe Blau für Akteure, die in Teilen gerichtlich bestätigt als gesichert rechtsextremistisch bezeichnet und eingestuft werden dürfen, bildet eine visuelle Verharmlosung ab.',
        'Wir fordern Sie auf: Beenden Sie diese verharmlosende Praxis und weichen Sie auf die historisch authentische Repräsentation der Farbe Braun in Ihren Berichten aus.',
      ]
    },
    privat: {
      to: 'AN: Chefredaktionen ProSiebenSat.1, RTL Group & dpa',
      subject: 'Betreff: Standard-Farbwerte in der Infografik-Belieferung',
      body: [
        'Sehr geehrte Damen und Herren,',
        'über Ihre Nachrichtenportale und über die dpa-Meldungskanäle steuern Sie täglich die Wahrnehmung von Millionen von Menschen in Deutschland.',
        'Durch die Wahl von Blau als Farbe für die AfD in Infografiken tragen Sie zur visuellen Verharmlosung einer in Teilen verfassungsfeindlichen Partei bei.',
        'Wir fordern: Passen Sie Ihre redaktionellen Farbstandards an die historische Realität an und stellen Sie die Farbe Braun als Kürzel für die AfD in Grafiken ein.',
      ]
    },
    rundfunkrat: {
      to: 'AN: ARD-Rundfunkräte & ZDF-Fernsehrat',
      subject: 'Betreff: Aufsichtspflicht bei visueller Frame-Setzung',
      body: [
        'Sehr geehrte Damen und Herren,',
        'als Kontrollgremien der öffentlich-rechtlichen Rundfunkanstalten sind Sie verpflichtet, die Einhaltung der journalistischen Grundsätze zu überwachen.',
        'Die konsequente Verwendung der Farbe Blau für die AfD in allen grafischen Darstellungen verletzt den Grundsatz der unverfälschten Meinungsbildung.',
        'Wir fordern Sie auf, Ihre Aufsichtspflicht wahrzunehmen und eine verbindliche Leitlinie für die historisch korrekte Farbzuordnung politischer Parteien einzuführen.',
      ]
    }
  },
  en: {
    oeffentlich: {
      to: 'TO: Editorial Boards of ARD-aktuell & ZDF',
      subject: 'Re: Visual Distortion & Framing Responsibility',
      body: [
        'Dear Sir or Madam,',
        'As public broadcasters you bear a statutory responsibility for objective, historically and analytically contextualised information for the public.',
        'Using the colour blue for actors that courts have confirmed may be classified as proven far-right extremists constitutes a visual downplaying of their ideology.',
        'We call on you: End this minimising practice and switch to the historically authentic colour brown in your reports.',
      ]
    },
    privat: {
      to: 'TO: Editorial Boards of ProSiebenSat.1, RTL Group & dpa',
      subject: 'Re: Default Colour Values in Infographic Supply',
      body: [
        'Dear Sir or Madam,',
        'Through your news portals and dpa wire channels you shape the daily perception of millions of people in Germany.',
        'By choosing blue as the colour for the AfD in infographics you contribute to the visual downplaying of a partly anti-constitutional party.',
        'We demand: Adjust your editorial colour standards to historical reality and set brown as the identifier for the AfD in graphics.',
      ]
    },
    rundfunkrat: {
      to: 'TO: ARD Broadcasting Councils & ZDF Television Council',
      subject: 'Re: Supervisory Duty on Visual Framing',
      body: [
        'Dear Sir or Madam,',
        'As oversight bodies of the public broadcasters you are obliged to monitor compliance with journalistic principles.',
        'The consistent use of blue for the AfD in all graphical representations violates the principle of undistorted opinion formation.',
        'We call on you to exercise your supervisory duty and introduce a binding guideline for the historically accurate colour assignment of political parties.',
      ]
    }
  }
};

// ── Component ─────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState('de');
  const [signatureCount, setSignatureCount] = useState(14832);
  const [isLive, setIsLive] = useState(false);
  const [isLoadingSignatures, setIsLoadingSignatures] = useState(true);
  const [isBrownActive, setIsBrownActive] = useState(false);
  const [activeTab, setActiveTab] = useState('sprache');
  const [activeLetterTarget, setActiveLetterTarget] = useState('oeffentlich');
  const [openFaq, setOpenFaq] = useState(null);

  const t = translations[lang];
  const sayings = blueSayings[lang];
  const letters = openLetters[lang];

  useEffect(() => {
    async function fetchSignatureCount() {
      setIsLoadingSignatures(true);
      const jsonUrl = `${PETITION_URL}.json`;
      try {
        const directResponse = await fetch(jsonUrl);
        if (directResponse.ok) {
          const data = await directResponse.json();
          if (data && data.signature_count) {
            setSignatureCount(data.signature_count);
            setIsLive(true);
            setIsLoadingSignatures(false);
            return;
          }
        }
      } catch (e) { console.warn(e); }
      try {
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(jsonUrl)}`;
        const proxyResponse = await fetch(proxyUrl);
        if (proxyResponse.ok) {
          const rawData = await proxyResponse.json();
          const data = JSON.parse(rawData.contents);
          if (data && data.signature_count) {
            setSignatureCount(data.signature_count);
            setIsLive(true);
          }
        }
      } catch (e) { console.error(e); }
      finally { setIsLoadingSignatures(false); }
    }
    fetchSignatureCount();
    const interval = setInterval(fetchSignatureCount, 120000);
    return () => clearInterval(interval);
  }, []);

  const faqs = lang === 'de' ? [
    { q: 'Warum sollte Blau überhaupt problematisch sein?', a: 'Blau ist die Selbstwahlfarbe der AfD, aber eben auch die Farbe des Friedens, des Himmels und der UN-Friedenstruppen. Durch die unkritische Übernahme dieser Selbstzuschreibung durch Medien wird die emotionale Unbedenklichkeits-Assoziation auf die Partei übertragen.' },
    { q: 'Ist das nicht Zensur oder politische Einflussnahme?', a: 'Nein. Es geht um medienethische Standards und historische Ehrlichkeit. Medien entscheiden täglich über Darstellungsformen – die Forderung nach historisch korrekten Farbcodes ist eine legitime gesellschaftliche Debatte, keine Zensur.' },
    { q: 'Hat die Kampagne eine Chance auf Erfolg?', a: 'Bereits tausende Menschen haben unterzeichnet. Medienhäuser reagieren auf gesellschaftlichen Druck. Jede Unterschrift zählt.' },
    { q: 'Wer steckt hinter dieser Kampagne?', a: 'Die Petition wurde auf WeAct/Campact gestartet – einer offenen Plattform für bürgerschaftliches Engagement. Es sind engagierte Bürgerinnen und Bürger, die für mediale Integrität eintreten.' },
  ] : [
    { q: 'Why should blue be problematic?', a: 'Blue is the AfD\'s self-chosen colour, but it is also the colour of peace, the sky, and UN peacekeeping forces. By uncritically adopting this self-description, media transfers the emotional harmlessness association to the party.' },
    { q: 'Is this not censorship or political interference?', a: 'No. This is about media-ethics standards and historical honesty. Media make editorial decisions every day – demanding historically accurate colour codes is a legitimate societal debate, not censorship.' },
    { q: 'Does the campaign have a chance of success?', a: 'Thousands of people have already signed. Media organisations respond to public pressure. Every signature counts.' },
    { q: 'Who is behind this campaign?', a: 'The petition was started on WeAct/Campact – an open platform for civic engagement. These are engaged citizens standing up for media integrity.' },
  ];

  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 font-sans antialiased" style={{ WebkitFontSmoothing: 'antialiased' }}>
      {/* Background glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none animate-pulse-glow" />

      {/* ── Navigation ── */}
      <nav className="border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md sticky top-0 z-40 px-4 md:px-6 py-3 md:py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500 shadow-md shadow-blue-500/50 animate-pulse" />
            <span className="font-bold tracking-wider text-sm uppercase text-white">{t.navCampaign}</span>
          </div>
          <div className="flex items-center gap-2 md:gap-4 flex-wrap justify-end">
            <a href="#warum" className="hidden md:block text-xs md:text-sm text-neutral-400 hover:text-white transition-colors">{t.navWhy}</a>
            <a href="#brief" className="hidden md:block text-xs md:text-sm text-neutral-400 hover:text-white transition-colors">{t.navLetter}</a>
            <a href="#kultur" className="hidden md:block text-xs md:text-sm text-neutral-400 hover:text-white transition-colors">{t.navCulture}</a>
            {/* Language Toggle */}
            <button
              onClick={() => setLang(l => l === 'de' ? 'en' : 'de')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-300 font-bold transition-all border border-neutral-700"
              aria-label="Toggle language"
            >
              <Globe size={13} />
              {lang === 'de' ? 'EN' : 'DE'}
            </button>
            <a
              href={PETITION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 md:px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs text-white font-bold transition-all flex items-center gap-1.5"
            >
              <span className="hidden md:inline">{t.navSign}</span>
              <span className="md:hidden">✍️</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <header className="relative pt-16 pb-12 px-4 md:px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-6 uppercase tracking-widest">
            <Shield size={12} /> {t.badge}
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white mb-2 uppercase leading-none">
            {t.heroH1}
          </h1>
          <p className="text-xl md:text-3xl font-extrabold text-blue-500 uppercase tracking-widest mb-6">{t.heroSub}</p>
          <p className="text-neutral-300 text-base md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">{t.heroBody}</p>

          {/* Signature counter */}
          <div className="flex justify-center gap-3 mb-10">
            <div className="flex items-center gap-3 bg-neutral-950 border border-neutral-800 px-5 py-3 rounded-full text-sm md:text-base font-semibold shadow-inner">
              <Users size={18} className="text-blue-400 animate-pulse" />
              <span className="text-neutral-300">
                {t.sigCount}{' '}
                <strong className="text-white font-black text-lg">
                  {isLoadingSignatures
                    ? <span className="inline-block w-12 h-5 rounded bg-neutral-800 animate-pulse align-middle" />
                    : signatureCount.toLocaleString('de-DE')}
                </strong>{' '}
                {t.sigSupport}
              </span>
              <span className="flex items-center gap-1 bg-blue-500/10 text-blue-400 text-[10px] uppercase font-bold px-2 py-0.5 rounded border border-blue-500/20">
                <span className={`w-1.5 h-1.5 rounded-full bg-emerald-500 ${isLive ? 'animate-ping' : ''}`} />
                {isLive ? t.sigLive : t.sigFallback}
              </span>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative max-w-4xl mx-auto mb-4 rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl animate-float">
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent z-10 pointer-events-none" />
            {/* Rain effect */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 overflow-hidden opacity-40">
              {[
                { left: '15%', delay: '0.2s', dur: '1.8s' },
                { left: '30%', delay: '0.8s', dur: '2.2s' },
                { left: '45%', delay: '0.4s', dur: '1.5s' },
                { left: '60%', delay: '1.1s', dur: '2.5s' },
                { left: '75%', delay: '0.1s', dur: '1.9s' },
                { left: '90%', delay: '0.6s', dur: '2.1s' },
              ].map((r, i) => (
                <div key={i} className="rain-drop" style={{ left: r.left, animationDelay: r.delay, animationDuration: r.dur }} />
              ))}
            </div>
            {/* Gradient placeholder hero image */}
            <div
              className="w-full select-none"
              style={{
                height: '380px',
                background: 'linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 30%, #0ea5e9 60%, #7c3aed 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <div style={{ fontSize: '80px' }}>💙</div>
              <p className="text-white font-black text-2xl md:text-4xl uppercase tracking-widest text-center px-4">
                {lang === 'de' ? 'Rettet das Blau' : 'Rescue the Blue'}
              </p>
              <p className="text-blue-200 text-sm md:text-base tracking-wider text-center px-4 max-w-md">
                {lang === 'de' ? 'Für ehrliche Farbwahl in den Medien' : 'For honest colour choices in the media'}
              </p>
            </div>
            <div className="absolute bottom-6 left-4 md:left-6 right-4 md:right-6 z-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-neutral-950/80 backdrop-blur-md p-4 rounded-xl border border-neutral-800/80">
              <div className="text-left">
                <p className="text-white font-black text-sm uppercase tracking-wide">{t.heroImgCaption}</p>
                <p className="text-neutral-400 text-xs">{t.heroImgSub}</p>
              </div>
              <a
                href={PETITION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-1.5 shadow-lg shadow-blue-500/20 whitespace-nowrap"
              >
                {t.heroImgCta} <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* ── Main content ── */}
      <main className="max-w-6xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4 pb-16">
        <div className="lg:col-span-8 space-y-12">

          {/* Interactive colour demo */}
          <section className="bg-neutral-950 border border-neutral-800 rounded-2xl p-5 md:p-8 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 bg-neutral-800 rounded border border-neutral-700 text-neutral-400">{t.demoSandbox}</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight mb-2 flex items-center gap-2">
              <Paintbrush size={22} className="text-blue-500" /> {t.demoH2}
            </h2>
            <p className="text-neutral-400 text-sm mb-6 leading-relaxed">{t.demoDesc}</p>

            {/* Bar chart */}
            <div className="bg-neutral-900 border border-neutral-800/80 rounded-xl p-5 md:p-8 mb-6">
              <div className="flex items-end justify-between h-56 md:h-64 border-b border-neutral-800 pb-2 relative">
                {[
                  { pct: 22, color: 'bg-neutral-950 border border-neutral-700', label: 'CDU/CSU', isAfd: false },
                  { pct: 29, color: isBrownActive ? 'bg-amber-900 border-t-2 border-amber-800 shadow-lg shadow-amber-950/40' : 'bg-cyan-500 border-t-2 border-cyan-400 shadow-lg shadow-cyan-500/20', label: 'AfD', isAfd: true },
                  { pct: 13, color: 'bg-red-600', label: 'SPD', isAfd: false },
                  { pct: 14, color: 'bg-green-600', label: 'GRÜNE', isAfd: false },
                  { pct: 10, color: 'bg-pink-600', label: 'LINKE', isAfd: false },
                  { pct: 6, color: 'bg-neutral-600', label: lang === 'de' ? 'Sonstige' : 'Others', isAfd: false },
                ].map((bar, idx) => {
                  const heightPx = Math.round((bar.pct / 34) * 200);
                  return (
                    <div key={idx} className="flex flex-col items-center w-1/6">
                      <span className={`text-xs font-bold mb-2 ${bar.isAfd ? 'text-white font-black' : 'text-neutral-400'}`}>{bar.pct} %</span>
                      <div
                        onClick={bar.isAfd ? () => setIsBrownActive(!isBrownActive) : undefined}
                        className={`w-full rounded-t-md transition-all duration-700 ${bar.color} ${bar.isAfd ? 'cursor-pointer hover:opacity-90' : ''}`}
                        style={{ height: `${heightPx}px` }}
                      />
                      <span className={`text-[10px] md:text-xs font-semibold mt-2 transition-colors duration-500 ${bar.isAfd ? (isBrownActive ? 'text-amber-500 font-black' : 'text-cyan-400 font-black') : 'text-neutral-500'}`}>
                        {bar.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-neutral-900 border border-neutral-800 rounded-xl">
              <div className="text-center sm:text-left">
                <span className="text-xs text-neutral-500 font-semibold uppercase tracking-wider block">{t.demoOption}</span>
                <span className="text-sm text-neutral-200 font-bold">{t.demoQuestion}</span>
              </div>
              <button
                onClick={() => setIsBrownActive(!isBrownActive)}
                className={`w-full sm:w-auto px-6 py-2.5 rounded-lg font-bold text-xs uppercase tracking-widest transition-all ${isBrownActive ? 'bg-amber-900 hover:bg-amber-800 text-amber-200 border border-amber-800/50' : 'bg-blue-600 hover:bg-blue-500 text-blue-100 border border-blue-500/30'}`}
              >
                {isBrownActive ? t.demoReset : t.demoSwitch}
              </button>
            </div>
          </section>

          {/* Why blue section */}
          <section id="warum" className="space-y-6">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">{t.whyH2}</h2>
            <p className="text-neutral-400 text-base leading-relaxed">{t.whyIntro}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-6 hover:border-red-500/30 transition-all">
                <div className="w-10 h-10 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center mb-4 border border-red-500/20">
                  <AlertTriangle size={20} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{t.whyCard1H}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{t.whyCard1}</p>
              </div>
              <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-6 hover:border-blue-500/30 transition-all">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-4 border border-blue-500/20">
                  <CheckCircle size={20} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{t.whyCard2H}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{t.whyCard2}</p>
              </div>
            </div>
          </section>

          {/* Cultural heritage */}
          <section id="kultur" className="bg-neutral-950 border border-neutral-800 rounded-2xl p-5 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-4 mb-6">
              <div>
                <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                  <BookOpen size={20} className="text-blue-500" /> {t.cultureH}
                </h3>
                <p className="text-neutral-400 text-xs mt-0.5">{t.cultureSub}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('sprache')}
                  className={`px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all border ${activeTab === 'sprache' ? 'bg-blue-600/10 border-blue-500/30 text-blue-400' : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'}`}
                >{t.tabLang}</button>
                <button
                  onClick={() => setActiveTab('symbolik')}
                  className={`px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all border ${activeTab === 'symbolik' ? 'bg-blue-600/10 border-blue-500/30 text-blue-400' : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'}`}
                >{t.tabSym}</button>
              </div>
            </div>
            <div className="space-y-4">
              {sayings[activeTab].map((item, idx) => (
                <div key={idx} className="bg-neutral-900 border border-neutral-800/80 rounded-xl p-5 hover:border-blue-500/30 transition-all">
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-2">
                    <h4 className="text-white font-bold text-base md:text-lg">{item.phrase}</h4>
                    <span className="text-[10px] uppercase tracking-wider bg-neutral-950 border border-neutral-800 px-2 py-0.5 rounded text-neutral-400">{item.origin}</span>
                  </div>
                  <p className="text-neutral-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Open letter */}
          <section id="brief" className="bg-neutral-950 border border-neutral-800 rounded-2xl p-5 md:p-8">
            <div className="mb-6">
              <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                <MessageSquare size={22} className="text-blue-500" /> {t.letterH}
              </h3>
              <p className="text-neutral-400 text-sm mt-1">{t.letterSub}</p>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-6">
              {(['oeffentlich', 'privat', 'rundfunkrat']).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveLetterTarget(key)}
                  className={`px-2 py-3 rounded-lg text-center font-bold text-[10px] md:text-xs uppercase tracking-wider transition-all border ${activeLetterTarget === key ? 'bg-blue-600/10 border-blue-500/30 text-blue-400' : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'}`}
                >
                  {key === 'oeffentlich' ? t.targetPublic : key === 'privat' ? t.targetPrivate : t.targetCouncil}
                </button>
              ))}
            </div>
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4 md:p-6 text-xs md:text-sm font-mono text-neutral-300 leading-relaxed max-h-72 overflow-y-auto space-y-4">
              <p className="font-bold text-neutral-400">{letters[activeLetterTarget].to}</p>
              <p className="border-t border-neutral-800 pt-3">{letters[activeLetterTarget].subject}</p>
              {letters[activeLetterTarget].body.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </section>
        </div>

        {/* ── Sidebar ── */}
        <aside className="lg:col-span-4 space-y-6">
          {/* CTA card */}
          <div className="bg-gradient-to-br from-blue-900/40 to-blue-950/60 border border-blue-800/40 rounded-2xl p-6 shadow-xl sticky top-20">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4 border border-blue-500/30">
              <span className="text-2xl">✍️</span>
            </div>
            <h3 className="text-lg font-black text-white uppercase tracking-tight mb-2">{t.ctaBanner}</h3>
            <p className="text-neutral-400 text-sm leading-relaxed mb-5">{t.ctaBody}</p>
            <a
              href={PETITION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-blue-500/20 mb-3"
            >
              {t.ctaBtn} <ExternalLink size={15} />
            </a>
            <p className="text-neutral-600 text-xs text-center">{t.ctaInfo}</p>
          </div>

          {/* Progress bar */}
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-bold text-neutral-300">{lang === 'de' ? 'Ziel: 15.000' : 'Goal: 15,000'}</span>
              <span className="text-sm font-black text-blue-400">{Math.round((signatureCount / 15000) * 100)} %</span>
            </div>
            <div className="w-full bg-neutral-800 rounded-full h-3 overflow-hidden">
              <div
                className="h-3 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-1000 shimmer-bg"
                style={{ width: `${Math.min((signatureCount / 15000) * 100, 100)}%` }}
              />
            </div>
            <p className="text-neutral-600 text-xs mt-2">{lang === 'de' ? `${(15000 - signatureCount).toLocaleString('de-DE')} weitere Unterschriften bis zum Ziel` : `${(15000 - signatureCount).toLocaleString('en-GB')} more signatures to the goal`}</p>
          </div>

          {/* Facts */}
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 space-y-4">
            <h4 className="text-sm font-black text-white uppercase tracking-wider">
              {lang === 'de' ? 'Schnell-Fakten' : 'Quick Facts'}
            </h4>
            {(lang === 'de' ? [
              { emoji: '🎨', label: 'Blau', desc: 'Farbe des Himmels, des Friedens, der UN' },
              { emoji: '📺', label: 'ARD & ZDF', desc: 'Nutzen Blau für AfD-Grafiken' },
              { emoji: '🏛️', label: 'Historisch', desc: 'Braun = Symbol des Rechtsextremismus' },
              { emoji: '⚖️', label: 'Verfassungsschutz', desc: 'Teile der AfD als gesichert extremistisch eingestuft' },
            ] : [
              { emoji: '🎨', label: 'Blue', desc: 'Colour of the sky, peace, and the UN' },
              { emoji: '📺', label: 'ARD & ZDF', desc: 'Use blue for AfD in graphics' },
              { emoji: '🏛️', label: 'Historically', desc: 'Brown = symbol of far-right extremism' },
              { emoji: '⚖️', label: 'Constitution Protection', desc: 'Parts of AfD classified as proven extremist' },
            ]).map((f, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-xl mt-0.5">{f.emoji}</span>
                <div>
                  <p className="text-sm font-bold text-white">{f.label}</p>
                  <p className="text-xs text-neutral-500">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6">
            <h4 className="text-sm font-black text-white uppercase tracking-wider mb-4">FAQ</h4>
            <div className="space-y-2">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border border-neutral-800 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between gap-2 px-4 py-3 text-left text-sm font-semibold text-neutral-300 hover:text-white hover:bg-neutral-900 transition-all"
                  >
                    <span>{faq.q}</span>
                    {openFaq === idx ? <ChevronUp size={14} className="shrink-0 text-blue-400" /> : <ChevronDown size={14} className="shrink-0 text-neutral-500" />}
                  </button>
                  {openFaq === idx && (
                    <div className="px-4 pb-3 text-xs text-neutral-400 leading-relaxed border-t border-neutral-800 pt-3">{faq.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </main>

      {/* ── CTA Banner ── */}
      <div className="border-t border-neutral-800 bg-gradient-to-r from-blue-950/40 via-neutral-950 to-blue-950/40 px-4 md:px-6 py-10 text-center">
        <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight mb-3">{t.ctaBanner}</h2>
        <p className="text-neutral-400 text-base mb-6 max-w-xl mx-auto">{t.ctaBody}</p>
        <a
          href={PETITION_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black text-sm md:text-base uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-blue-500/20"
        >
          {t.ctaBtn} <ArrowUpRight size={18} />
        </a>
      </div>

      {/* ── Footer ── */}
      <footer className="border-t border-neutral-800 px-4 md:px-6 py-8 text-center">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <p className="font-bold text-white text-sm tracking-wide uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" /> Rettet das Blau
            </p>
            <p className="text-neutral-500 text-xs mt-1">{t.footerTagline}</p>
          </div>
          <a
            href={PETITION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 text-sm font-semibold transition-colors"
          >
            {t.footerLink} <ExternalLink size={14} />
          </a>
        </div>
      </footer>
    </div>
  );
}
