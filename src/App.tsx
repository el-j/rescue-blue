import { useEffect, useState } from 'react'
import {
  AlertTriangle,
  ArrowUpRight,
  BookOpen,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Globe,
  MessageSquare,
  Paintbrush,
  Shield,
  Users,
} from 'lucide-react'

const PETITION_URL = 'https://weact.campact.de/petitions/rettet-das-blau-medien-mussen-die-afd-farblich-passend-darstellen'
const PETITION_PROXY_URL = `https://api.allorigins.win/get?url=${encodeURIComponent(`${PETITION_URL}.json`)}`
const SIGNATURE_FALLBACK = 14832
const SIGNATURE_GOAL = 15000
const HERO_IMAGE_URL = `${import.meta.env.BASE_URL}Gemini_Generated_Image_vc7befvc7befvc7b.png`
const LETTER_TARGETS = ['oeffentlich', 'privat', 'rundfunkrat'] as const

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
    sigFallback: 'Stand lokal',
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
    sigFallback: 'Local snapshot',
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
  },
} as const

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
} as const

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
      ],
    },
    privat: {
      to: 'AN: Chefredaktionen ProSiebenSat.1, RTL Group & dpa',
      subject: 'Betreff: Standard-Farbwerte in der Infografik-Belieferung',
      body: [
        'Sehr geehrte Damen und Herren,',
        'über Ihre Nachrichtenportale und über die dpa-Meldungskanäle steuern Sie täglich die Wahrnehmung von Millionen von Menschen in Deutschland.',
        'Durch die Wahl von Blau als Farbe für die AfD in Infografiken tragen Sie zur visuellen Verharmlosung einer in Teilen verfassungsfeindlichen Partei bei.',
        'Wir fordern: Passen Sie Ihre redaktionellen Farbstandards an die historische Realität an und stellen Sie die Farbe Braun als Kürzel für die AfD in Grafiken ein.',
      ],
    },
    rundfunkrat: {
      to: 'AN: ARD-Rundfunkräte & ZDF-Fernsehrat',
      subject: 'Betreff: Aufsichtspflicht bei visueller Frame-Setzung',
      body: [
        'Sehr geehrte Damen und Herren,',
        'als Kontrollgremien der öffentlich-rechtlichen Rundfunkanstalten sind Sie verpflichtet, die Einhaltung der journalistischen Grundsätze zu überwachen.',
        'Die konsequente Verwendung der Farbe Blau für die AfD in allen grafischen Darstellungen verletzt den Grundsatz der unverfälschten Meinungsbildung.',
        'Wir fordern Sie auf, Ihre Aufsichtspflicht wahrzunehmen und eine verbindliche Leitlinie für die historisch korrekte Farbzuordnung politischer Parteien einzuführen.',
      ],
    },
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
      ],
    },
    privat: {
      to: 'TO: Editorial Boards of ProSiebenSat.1, RTL Group & dpa',
      subject: 'Re: Default Colour Values in Infographic Supply',
      body: [
        'Dear Sir or Madam,',
        'Through your news portals and dpa wire channels you shape the daily perception of millions of people in Germany.',
        'By choosing blue as the colour for the AfD in infographics you contribute to the visual downplaying of a partly anti-constitutional party.',
        'We demand: Adjust your editorial colour standards to historical reality and set brown as the identifier for the AfD in graphics.',
      ],
    },
    rundfunkrat: {
      to: 'TO: ARD Broadcasting Councils & ZDF Television Council',
      subject: 'Re: Supervisory Duty on Visual Framing',
      body: [
        'Dear Sir or Madam,',
        'As oversight bodies of the public broadcasters you are obliged to monitor compliance with journalistic principles.',
        'The consistent use of blue for the AfD in all graphical representations violates the principle of undistorted opinion formation.',
        'We call on you to exercise your supervisory duty and introduce a binding guideline for the historically accurate colour assignment of political parties.',
      ],
    },
  },
} as const

type Locale = keyof typeof translations
type ContentTab = keyof typeof blueSayings.de
type LetterTarget = keyof typeof openLetters.de

const FACTS = {
  de: [
    { emoji: '🎨', label: 'Blau', desc: 'Farbe des Himmels, des Friedens, der UN' },
    { emoji: '📺', label: 'ARD & ZDF', desc: 'Nutzen Blau für AfD-Grafiken' },
    { emoji: '🏛️', label: 'Historisch', desc: 'Braun = Symbol des Rechtsextremismus' },
    { emoji: '⚖️', label: 'Verfassungsschutz', desc: 'Teile der AfD als gesichert extremistisch eingestuft' },
  ],
  en: [
    { emoji: '🎨', label: 'Blue', desc: 'Colour of the sky, peace, and the UN' },
    { emoji: '📺', label: 'ARD & ZDF', desc: 'Use blue for AfD in graphics' },
    { emoji: '🏛️', label: 'Historically', desc: 'Brown = symbol of far-right extremism' },
    { emoji: '⚖️', label: 'Constitution Protection', desc: 'Parts of AfD classified as proven extremist' },
  ],
} as const

const BAR_TEMPLATE = [
  { pct: 22, labelDe: 'CDU/CSU', labelEn: 'CDU/CSU', defaultColor: 'bg-neutral-950 border border-neutral-700', isAfd: false },
  { pct: 29, labelDe: 'AfD', labelEn: 'AfD', defaultColor: 'bg-cyan-500 border-t-2 border-cyan-400 shadow-lg shadow-cyan-500/20', isAfd: true },
  { pct: 13, labelDe: 'SPD', labelEn: 'SPD', defaultColor: 'bg-red-600', isAfd: false },
  { pct: 14, labelDe: 'GRÜNE', labelEn: 'GREENS', defaultColor: 'bg-green-600', isAfd: false },
  { pct: 10, labelDe: 'LINKE', labelEn: 'LEFT', defaultColor: 'bg-pink-600', isAfd: false },
  { pct: 6, labelDe: 'Sonstige', labelEn: 'Others', defaultColor: 'bg-neutral-600', isAfd: false },
] as const

const FAQS = {
  de: [
    { q: 'Warum sollte Blau überhaupt problematisch sein?', a: 'Blau ist die Selbstwahlfarbe der AfD, aber eben auch die Farbe des Friedens, des Himmels und der UN-Friedenstruppen. Durch die unkritische Übernahme dieser Selbstzuschreibung durch Medien wird die emotionale Unbedenklichkeits-Assoziation auf die Partei übertragen.' },
    { q: 'Ist das nicht Zensur oder politische Einflussnahme?', a: 'Nein. Es geht um medienethische Standards und historische Ehrlichkeit. Medien entscheiden täglich über Darstellungsformen – die Forderung nach historisch korrekten Farbcodes ist eine legitime gesellschaftliche Debatte, keine Zensur.' },
    { q: 'Hat die Kampagne eine Chance auf Erfolg?', a: 'Bereits tausende Menschen haben unterzeichnet. Medienhäuser reagieren auf gesellschaftlichen Druck. Jede Unterschrift zählt.' },
    { q: 'Wer steckt hinter dieser Kampagne?', a: 'Die Petition wurde auf WeAct/Campact gestartet – einer offenen Plattform für bürgerschaftliches Engagement. Es sind engagierte Bürgerinnen und Bürger, die für mediale Integrität eintreten.' },
  ],
  en: [
    { q: 'Why should blue be problematic?', a: 'Blue is the AfD\'s self-chosen colour, but it is also the colour of peace, the sky, and UN peacekeeping forces. By uncritically adopting this self-description, media transfers the emotional harmlessness association to the party.' },
    { q: 'Is this not censorship or political interference?', a: 'No. This is about media-ethics standards and historical honesty. Media make editorial decisions every day – demanding historically accurate colour codes is a legitimate societal debate, not censorship.' },
    { q: 'Does the campaign have a chance of success?', a: 'Thousands of people have already signed. Media organisations respond to public pressure. Every signature counts.' },
    { q: 'Who is behind this campaign?', a: 'The petition was started on WeAct/Campact – an open platform for civic engagement. These are engaged citizens standing up for media integrity.' },
  ],
} as const

function parseSignatureCount(payload: unknown): number | null {
  if (!payload || typeof payload !== 'object') {
    return null
  }

  if ('contents' in payload && typeof payload.contents === 'string') {
    try {
      return parseSignatureCount(JSON.parse(payload.contents))
    } catch {
      return null
    }
  }

  if ('signature_count' in payload) {
    const count = Number(payload.signature_count)
    return Number.isFinite(count) && count > 0 ? count : null
  }

  return null
}

function getLocaleCode(lang: Locale) {
  return lang === 'de' ? 'de-DE' : 'en-GB'
}

export default function App() {
  const [lang, setLang] = useState<Locale>('de')
  const [signatureCount, setSignatureCount] = useState(SIGNATURE_FALLBACK)
  const [isLive, setIsLive] = useState(false)
  const [isLoadingSignatures, setIsLoadingSignatures] = useState(true)
  const [isBrownActive, setIsBrownActive] = useState(false)
  const [activeTab, setActiveTab] = useState<ContentTab>('sprache')
  const [activeLetterTarget, setActiveLetterTarget] = useState<LetterTarget>('oeffentlich')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const t = translations[lang]
  const sayings = blueSayings[lang]
  const letters = openLetters[lang]
  const faqs = FAQS[lang]
  const facts = FACTS[lang]
  const progressPercentage = Math.min(Math.round((signatureCount / SIGNATURE_GOAL) * 100), 100)
  const progressWidth = Math.min((signatureCount / SIGNATURE_GOAL) * 100, 100)
  const remainingSignatures = Math.max(SIGNATURE_GOAL - signatureCount, 0)

  useEffect(() => {
    let isCancelled = false
    const controller = new AbortController()

    async function fetchSignatureCount() {
      setIsLoadingSignatures(true)

      try {
        const response = await fetch(PETITION_PROXY_URL, {
          signal: controller.signal,
          cache: 'no-store',
        })

        if (!response.ok) {
          return
        }

        const data = (await response.json()) as unknown
        const count = parseSignatureCount(data)

        if (!isCancelled && count !== null) {
          setSignatureCount(count)
          setIsLive(true)
        }
      } catch {
        if (!controller.signal.aborted && !isCancelled) {
          setIsLive(false)
        }
      } finally {
        if (!isCancelled) {
          setIsLoadingSignatures(false)
        }
      }
    }

    void fetchSignatureCount()
    const interval = window.setInterval(() => {
      void fetchSignatureCount()
    }, 120000)

    return () => {
      isCancelled = true
      controller.abort()
      window.clearInterval(interval)
    }
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden bg-neutral-900 text-neutral-100 antialiased" style={{ WebkitFontSmoothing: 'antialiased' }}>
      <div className="pointer-events-none fixed top-0 left-1/2 h-112.5 w-full max-w-7xl -translate-x-1/2 rounded-full bg-blue-500/10 blur-[150px] animate-pulse-glow" />

      <nav className="sticky top-0 z-40 border-b border-neutral-800 bg-neutral-950/80 px-4 py-3 backdrop-blur-md md:px-6 md:py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-blue-500 shadow-md shadow-blue-500/50 animate-pulse" />
            <span className="text-sm font-bold tracking-wider text-white uppercase">{t.navCampaign}</span>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2 md:gap-4">
            <a href="#warum" className="hidden text-xs text-neutral-400 transition-colors hover:text-white md:block md:text-sm">{t.navWhy}</a>
            <a href="#brief" className="hidden text-xs text-neutral-400 transition-colors hover:text-white md:block md:text-sm">{t.navLetter}</a>
            <a href="#kultur" className="hidden text-xs text-neutral-400 transition-colors hover:text-white md:block md:text-sm">{t.navCulture}</a>
            <button
              onClick={() => setLang((current) => (current === 'de' ? 'en' : 'de'))}
              className="flex items-center gap-1.5 rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-1.5 text-xs font-bold text-neutral-300 transition-all hover:bg-neutral-700"
              aria-label="Toggle language"
              type="button"
            >
              <Globe size={13} />
              {lang === 'de' ? 'EN' : 'DE'}
            </button>
            <a
              href={PETITION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white transition-all hover:bg-blue-500 md:px-3.5"
            >
              <span className="hidden md:inline">{t.navSign}</span>
              <span className="md:hidden">✍️</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </nav>

      <header className="relative px-4 pt-12 pb-10 text-center md:px-6 md:pt-16 md:pb-12">
        <div className="mx-auto max-w-5xl">
          <span className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-semibold tracking-widest text-blue-400 uppercase">
            <Shield size={12} /> {t.badge}
          </span>
          <h1 className="mb-3 text-4xl leading-none font-black tracking-tight text-white uppercase sm:text-5xl lg:text-6xl xl:text-7xl">
            {t.heroH1}
          </h1>
          <p className="mb-5 text-lg font-extrabold tracking-[0.18em] text-blue-500 uppercase sm:text-2xl lg:text-3xl">{t.heroSub}</p>
          <p className="mx-auto mb-8 max-w-4xl text-base leading-relaxed text-neutral-300 sm:text-lg md:mb-10 md:text-xl">{t.heroBody}</p>

          <div className="mb-8 flex justify-center px-2 md:mb-10">
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 rounded-2xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-xs font-semibold shadow-inner md:rounded-full md:px-5 md:text-sm">
              <Users size={18} className="text-blue-400 animate-pulse" />
              <span className="text-center text-neutral-300">
                {t.sigCount}{' '}
                <strong className="text-base font-black text-white md:text-lg">
                  {isLoadingSignatures
                    ? <span className="inline-block h-5 w-12 rounded bg-neutral-800 align-middle animate-pulse" />
                    : signatureCount.toLocaleString(getLocaleCode(lang))}
                </strong>{' '}
                {t.sigSupport}
              </span>
              <span className="flex items-center gap-1 rounded border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold text-blue-400 uppercase">
                <span className={`h-1.5 w-1.5 rounded-full bg-emerald-500 ${isLive ? 'animate-ping' : ''}`} />
                {isLive ? t.sigLive : t.sigFallback}
              </span>
            </div>
          </div>

          <div className="relative mx-auto mb-4 max-w-4xl overflow-hidden rounded-2xl border border-neutral-800 shadow-2xl animate-float">
            <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-t from-neutral-900 via-transparent to-transparent" />
            <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-full overflow-hidden opacity-40">
              {[
                { left: '15%', delay: '0.2s', dur: '1.8s' },
                { left: '30%', delay: '0.8s', dur: '2.2s' },
                { left: '45%', delay: '0.4s', dur: '1.5s' },
                { left: '60%', delay: '1.1s', dur: '2.5s' },
                { left: '75%', delay: '0.1s', dur: '1.9s' },
                { left: '90%', delay: '0.6s', dur: '2.1s' },
              ].map((drop, index) => (
                <div key={index} className="rain-drop" style={{ left: drop.left, animationDelay: drop.delay, animationDuration: drop.dur }} />
              ))}
            </div>
            <img
              src={HERO_IMAGE_URL}
              alt={lang === 'de'
                ? 'Kampagnenmotiv der Aktion Rettet das Blau mit Herzsymbol und blauem Farbraum'
                : 'Campaign visual for Rescue the Blue with a heart symbol and blue colour field'}
              className="block w-full select-none object-cover object-center aspect-11/10 md:aspect-video"
            />
            <div className="relative z-20 p-4 md:p-0">
              <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-neutral-800/80 bg-neutral-950/85 p-4 backdrop-blur-md md:absolute md:bottom-6 md:right-6 md:left-6 md:flex-row md:items-center">
                <div className="text-left">
                  <p className="text-sm font-black tracking-wide text-white uppercase">{t.heroImgCaption}</p>
                  <p className="text-xs text-neutral-400">{t.heroImgSub}</p>
                </div>
                <a
                  href={PETITION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-5 py-2.5 text-xs font-bold tracking-wider text-white uppercase whitespace-nowrap shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-500"
                >
                  {t.heroImgCta} <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto mt-6 grid max-w-6xl grid-cols-1 gap-8 px-4 pb-16 md:px-6 lg:mt-8 lg:grid-cols-12">
        <div className="space-y-12 lg:col-span-8">
          <section className="relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 p-5 shadow-xl md:p-8">
            <div className="absolute top-0 right-0 p-4">
              <span className="rounded border border-neutral-700 bg-neutral-800 px-2 py-0.5 text-[10px] font-bold tracking-widest text-neutral-400 uppercase">{t.demoSandbox}</span>
            </div>
            <h2 className="mb-2 flex items-center gap-2 text-xl font-black tracking-tight text-white uppercase md:text-2xl">
              <Paintbrush size={22} className="text-blue-500" /> {t.demoH2}
            </h2>
            <p className="mb-6 text-sm leading-relaxed text-neutral-400">{t.demoDesc}</p>

            <div className="mb-6 rounded-xl border border-neutral-800/80 bg-neutral-900 p-5 md:p-8">
              <div className="relative flex h-56 items-end justify-between border-b border-neutral-800 pb-2 md:h-64">
                {BAR_TEMPLATE.map((bar, index) => {
                  const heightPx = Math.round((bar.pct / 34) * 200)
                  const barColor = bar.isAfd
                    ? (isBrownActive
                        ? 'bg-amber-900 border-t-2 border-amber-800 shadow-lg shadow-amber-950/40'
                        : bar.defaultColor)
                    : bar.defaultColor
                  const label = lang === 'de' ? bar.labelDe : bar.labelEn

                  return (
                    <div key={index} className="flex w-1/6 flex-col items-center">
                      <span className={`mb-2 text-xs font-bold ${bar.isAfd ? 'font-black text-white' : 'text-neutral-400'}`}>{bar.pct} %</span>
                      <button
                        onClick={bar.isAfd ? () => setIsBrownActive((current) => !current) : undefined}
                        className={`w-full rounded-t-md transition-all duration-700 ${barColor} ${bar.isAfd ? 'cursor-pointer hover:opacity-90' : ''}`}
                        style={{ height: `${heightPx}px` }}
                        aria-label={bar.isAfd ? (isBrownActive ? t.demoReset : t.demoSwitch) : label}
                        disabled={!bar.isAfd}
                        type="button"
                      />
                      <span className={`mt-2 text-[10px] font-semibold transition-colors duration-500 md:text-xs ${bar.isAfd ? (isBrownActive ? 'font-black text-amber-500' : 'font-black text-cyan-400') : 'text-neutral-500'}`}>
                        {label}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="flex flex-col items-center justify-between gap-4 rounded-xl border border-neutral-800 bg-neutral-900 p-4 sm:flex-row">
              <div className="text-center sm:text-left">
                <span className="block text-xs font-semibold tracking-wider text-neutral-500 uppercase">{t.demoOption}</span>
                <span className="text-sm font-bold text-neutral-200">{t.demoQuestion}</span>
              </div>
              <button
                onClick={() => setIsBrownActive((current) => !current)}
                className={`w-full rounded-lg px-6 py-2.5 text-xs font-bold tracking-widest uppercase transition-all sm:w-auto ${isBrownActive ? 'border border-amber-800/50 bg-amber-900 text-amber-200 hover:bg-amber-800' : 'border border-blue-500/30 bg-blue-600 text-blue-100 hover:bg-blue-500'}`}
                type="button"
              >
                {isBrownActive ? t.demoReset : t.demoSwitch}
              </button>
            </div>
          </section>

          <section id="warum" className="space-y-6">
            <h2 className="text-2xl font-black tracking-tight text-white uppercase">{t.whyH2}</h2>
            <p className="text-base leading-relaxed text-neutral-400">{t.whyIntro}</p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-6 transition-all hover:border-red-500/30">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-red-500/20 bg-red-500/10 text-red-400">
                  <AlertTriangle size={20} />
                </div>
                <h3 className="mb-2 text-lg font-bold text-white">{t.whyCard1H}</h3>
                <p className="text-sm leading-relaxed text-neutral-400">{t.whyCard1}</p>
              </div>
              <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-6 transition-all hover:border-blue-500/30">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-blue-500/20 bg-blue-500/10 text-blue-400">
                  <CheckCircle size={20} />
                </div>
                <h3 className="mb-2 text-lg font-bold text-white">{t.whyCard2H}</h3>
                <p className="text-sm leading-relaxed text-neutral-400">{t.whyCard2}</p>
              </div>
            </div>
          </section>

          <section id="kultur" className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5 md:p-8">
            <div className="mb-6 flex flex-col gap-4 border-b border-neutral-800 pb-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="flex items-center gap-2 text-lg font-black tracking-tight text-white uppercase md:text-xl">
                  <BookOpen size={20} className="text-blue-500" /> {t.cultureH}
                </h3>
                <p className="mt-0.5 text-xs text-neutral-400">{t.cultureSub}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('sprache')}
                  className={`rounded-lg border px-4 py-2 text-xs font-bold tracking-wider uppercase transition-all ${activeTab === 'sprache' ? 'border-blue-500/30 bg-blue-600/10 text-blue-400' : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'}`}
                  type="button"
                >{t.tabLang}</button>
                <button
                  onClick={() => setActiveTab('symbolik')}
                  className={`rounded-lg border px-4 py-2 text-xs font-bold tracking-wider uppercase transition-all ${activeTab === 'symbolik' ? 'border-blue-500/30 bg-blue-600/10 text-blue-400' : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'}`}
                  type="button"
                >{t.tabSym}</button>
              </div>
            </div>
            <div className="space-y-4">
              {sayings[activeTab].map((item, index) => (
                <div key={index} className="rounded-xl border border-neutral-800/80 bg-neutral-900 p-5 transition-all hover:border-blue-500/30">
                  <div className="mb-2 flex flex-wrap items-start justify-between gap-4">
                    <h4 className="text-base font-bold text-white md:text-lg">{item.phrase}</h4>
                    <span className="rounded border border-neutral-800 bg-neutral-950 px-2 py-0.5 text-[10px] tracking-wider text-neutral-400 uppercase">{item.origin}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-neutral-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="brief" className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5 md:p-8">
            <div className="mb-6">
              <h3 className="flex items-center gap-2 text-xl font-black tracking-tight text-white uppercase md:text-2xl">
                <MessageSquare size={22} className="text-blue-500" /> {t.letterH}
              </h3>
              <p className="mt-1 text-sm text-neutral-400">{t.letterSub}</p>
            </div>
            <div className="mb-6 grid grid-cols-3 gap-2">
              {LETTER_TARGETS.map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveLetterTarget(key)}
                  className={`rounded-lg border px-2 py-3 text-center text-[10px] font-bold tracking-wider uppercase transition-all md:text-xs ${activeLetterTarget === key ? 'border-blue-500/30 bg-blue-600/10 text-blue-400' : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'}`}
                  type="button"
                >
                  {key === 'oeffentlich' ? t.targetPublic : key === 'privat' ? t.targetPrivate : t.targetCouncil}
                </button>
              ))}
            </div>
            <div className="max-h-72 space-y-4 overflow-y-auto rounded-xl border border-neutral-800 bg-neutral-900/50 p-4 font-mono text-xs leading-relaxed text-neutral-300 md:p-6 md:text-sm">
              <p className="font-bold text-neutral-400">{letters[activeLetterTarget].to}</p>
              <p className="border-t border-neutral-800 pt-3">{letters[activeLetterTarget].subject}</p>
              {letters[activeLetterTarget].body.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6 lg:col-span-4">
          <div className="sticky top-20 rounded-2xl border border-blue-800/40 bg-linear-to-br from-blue-900/40 to-blue-950/60 p-6 shadow-xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/20">
              <span className="text-2xl">✍️</span>
            </div>
            <h3 className="mb-2 text-lg font-black tracking-tight text-white uppercase">{t.ctaBanner}</h3>
            <p className="mb-5 text-sm leading-relaxed text-neutral-400">{t.ctaBody}</p>
            <a
              href={PETITION_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-500"
            >
              {t.ctaBtn} <ExternalLink size={15} />
            </a>
            <p className="text-center text-xs text-neutral-600">{t.ctaInfo}</p>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-bold text-neutral-300">{lang === 'de' ? `Ziel: ${SIGNATURE_GOAL.toLocaleString('de-DE')}` : `Goal: ${SIGNATURE_GOAL.toLocaleString('en-GB')}`}</span>
              <span className="text-sm font-black text-blue-400">{progressPercentage} %</span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-neutral-800">
              <div
                className="h-3 rounded-full bg-linear-to-r from-blue-600 to-blue-400 transition-all duration-1000 shimmer-bg"
                style={{ width: `${progressWidth}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-neutral-600">{lang === 'de' ? `${remainingSignatures.toLocaleString('de-DE')} weitere Unterschriften bis zum Ziel` : `${remainingSignatures.toLocaleString('en-GB')} more signatures to the goal`}</p>
          </div>

          <div className="space-y-4 rounded-2xl border border-neutral-800 bg-neutral-950 p-6">
            <h4 className="text-sm font-black tracking-wider text-white uppercase">
              {lang === 'de' ? 'Schnell-Fakten' : 'Quick Facts'}
            </h4>
            {facts.map((fact, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="mt-0.5 text-xl">{fact.emoji}</span>
                <div>
                  <p className="text-sm font-bold text-white">{fact.label}</p>
                  <p className="text-xs text-neutral-500">{fact.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6">
            <h4 className="mb-4 text-sm font-black tracking-wider text-white uppercase">FAQ</h4>
            <div className="space-y-2">
              {faqs.map((faq, index) => (
                <div key={index} className="overflow-hidden rounded-xl border border-neutral-800">
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left text-sm font-semibold text-neutral-300 transition-all hover:bg-neutral-900 hover:text-white"
                    aria-expanded={openFaq === index}
                    type="button"
                  >
                    <span>{faq.q}</span>
                    {openFaq === index ? <ChevronUp size={14} className="shrink-0 text-blue-400" /> : <ChevronDown size={14} className="shrink-0 text-neutral-500" />}
                  </button>
                  {openFaq === index && (
                    <div className="border-t border-neutral-800 px-4 pt-3 pb-3 text-xs leading-relaxed text-neutral-400">{faq.a}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </main>

      <div className="border-t border-neutral-800 bg-linear-to-r from-blue-950/40 via-neutral-950 to-blue-950/40 px-4 py-10 text-center md:px-6">
        <h2 className="mb-3 text-2xl font-black tracking-tight text-white uppercase md:text-4xl">{t.ctaBanner}</h2>
        <p className="mx-auto mb-6 max-w-xl text-base text-neutral-400">{t.ctaBody}</p>
        <a
          href={PETITION_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-8 py-4 text-sm font-black tracking-widest text-white uppercase shadow-xl shadow-blue-500/20 transition-all hover:bg-blue-500 md:text-base"
        >
          {t.ctaBtn} <ArrowUpRight size={18} />
        </a>
      </div>

      <footer className="border-t border-neutral-800 px-4 py-8 text-center md:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-left">
            <p className="flex items-center gap-2 text-sm font-bold tracking-wide text-white uppercase">
              <span className="h-2 w-2 rounded-full bg-blue-500" /> Rettet das Blau
            </p>
            <p className="mt-1 text-xs text-neutral-500">{t.footerTagline}</p>
          </div>
          <a
            href={PETITION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-semibold text-blue-400 transition-colors hover:text-blue-300"
          >
            {t.footerLink} <ExternalLink size={14} />
          </a>
        </div>
      </footer>
    </div>
  )
}