import { useState } from 'react'
import { 
  Users, 
  TrendingDown, 
  Newspaper, 
  Palette, 
  ExternalLink, 
  ShieldAlert,
  ArrowRight,
  Bookmark
} from 'lucide-react'
import { policyDangersData } from './policyDangersData'
import type { Locale } from '../i18n'

interface PolicyDangersSectionProps {
  lang: Locale
}

const getSectionInfo = (lang: Locale) => {
  const titles: Record<string, { title: string; subtitle: string; sourceLabel: string }> = {
    de: {
      title: "Risiken & Folgen rechtsextremer Politik",
      subtitle: "Wissenschaftlich belegt und empirisch untermauert: Wie ein Erstarken der AfD unsere Gesellschaft, Wirtschaft und Grundrechte bedroht.",
      sourceLabel: "Quelle & Volltext"
    },
    en: {
      title: "Risks & Consequences of Far-Right Politics",
      subtitle: "Scientifically backed and empirically supported: How a rise of the AfD threatens our society, economy, and fundamental rights.",
      sourceLabel: "Source & Full Text"
    },
    fr: {
      title: "Risques & Conséquences d'une Politique d'Extrême Droite",
      subtitle: "Scientifiquement prouvé et empiriquement étayé : comment la montée de l'AfD menace notre société, notre économie et nos droits fondamentaux.",
      sourceLabel: "Source & Texte complet"
    },
    es: {
      title: "Riesgos y Consecuencias de las Políticas de Extrema Derecha",
      subtitle: "Científicamente probado y respaldado empíricamente: Cómo el auge de AfD amenaza nuestra sociedad, economía y derechos fundamentales.",
      sourceLabel: "Fuente y Texto completo"
    },
    it: {
      title: "Rischi & Conseguenze delle Politiche di Estrema Destra",
      subtitle: "Scientificamente provato ed empiricamente supportato: come l'ascesa dell'AfD minaccia la nostra società, la nostra economia e i nostri diritti fondamentali.",
      sourceLabel: "Fonte e Testo completo"
    },
    pl: {
      title: "Ryzyka i konsekwencje skrajnie prawicowej polityki",
      subtitle: "Naukowo udowodnione i poparte faktami: Jak wzrost siły AfD zagraża naszemu społeczeństwu, gospodarce i prawom podstawowym.",
      sourceLabel: "Źródło i Pełny tekst"
    },
    tr: {
      title: "Aşırı Sağ Siyasetin Riskleri ve Sonuçları",
      subtitle: "Bilimsel olarak kanıtlanmış ve ampirik olarak desteklenmiştir: AfD'nin yükselişinin toplumumuzu, ekonomimizi ve temel haklarımızı nasıl tehdit ettiği.",
      sourceLabel: "Kaynak ve Tam metin"
    },
    uk: {
      title: "Ризики та наслідки правоекстремістської політики",
      subtitle: "Науково доведено та емпірично підтверджено: як посилення AfD загрожує нашому суспільству, економіці та основним правам.",
      sourceLabel: "Джерело та Повний текст"
    },
    ru: {
      title: "Риски и последствия правоэкстремистской политики",
      subtitle: "Научно доказано и эмпирически подтверждено: как усиление АдГ угрожает нашему обществу, экономике и основным правам.",
      sourceLabel: "Источник и Полный текст"
    }
  }

  return titles[lang] ?? titles['de']
}

export function PolicyDangersSection({ lang }: PolicyDangersSectionProps) {
  const data = policyDangersData[lang] ?? policyDangersData['de']
  const [activeTab, setActiveTab] = useState(data[0]?.id || 'social')
  const { title, subtitle, sourceLabel } = getSectionInfo(lang)

  const activeData = data.find((item) => item.id === activeTab) || data[0]

  // Mapping tab IDs to appropriate Lucide Icons
  const getTabIcon = (id: string, size = 18) => {
    switch (id) {
      case 'social':
        return <Users size={size} />
      case 'economy':
        return <TrendingDown size={size} />
      case 'press':
        return <Newspaper size={size} />
      case 'culture':
        return <Palette size={size} />
      default:
        return <ShieldAlert size={size} />
    }
  }

  return (
    <section id="risiken" className="rounded-3xl border border-neutral-800 bg-neutral-950 p-6 md:p-8 shadow-2xl relative overflow-hidden transition-all">
      {/* Glow highlight */}
      <div className="absolute -top-32 -left-32 h-64 w-64 rounded-full bg-red-500/5 blur-[80px] pointer-events-none" />

      <div className="relative z-10 space-y-6">
        {/* Header */}
        <div className="border-b border-neutral-800 pb-6 space-y-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-400">
            <ShieldAlert size={12} />
            Focus Point
          </span>
          <h2 className="text-2xl font-black tracking-tight text-white uppercase sm:text-3xl leading-tight">
            {title}
          </h2>
          <p className="text-sm md:text-base leading-relaxed text-neutral-400 max-w-3xl">
            {subtitle}
          </p>
        </div>

        {/* Tab Layout Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          
          {/* Subnavigation (Left Panel on large screen, Top Panel on small screen) */}
          <div className="flex flex-row overflow-x-auto gap-2 pb-2 lg:pb-0 lg:flex-col lg:overflow-x-visible lg:col-span-4 shrink-0 border-b border-neutral-900 lg:border-b-0 lg:border-r lg:border-neutral-900/60 lg:pr-4 scrollbar-thin">
            {data.map((item) => {
              const isActive = item.id === activeTab
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 shrink-0 text-left cursor-pointer border ${
                    isActive 
                      ? 'bg-red-500/10 border-red-500/20 text-red-400 font-bold shadow-lg shadow-red-950/20' 
                      : 'bg-neutral-900/30 border-transparent text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900/60 hover:border-neutral-800'
                  }`}
                  type="button"
                >
                  <span className={`p-1.5 rounded-lg ${isActive ? 'bg-red-500/20 text-red-400' : 'bg-neutral-800 text-neutral-500'}`}>
                    {getTabIcon(item.id, 16)}
                  </span>
                  <span className="truncate">{item.title}</span>
                </button>
              )
            })}
          </div>

          {/* Details Content (Right Panel) */}
          <div className="lg:col-span-8 space-y-6 min-h-[300px] flex flex-col justify-between animate-fade-in">
            <div className="space-y-4">
              {/* Metric Badge */}
              <div className="inline-block">
                <div className="flex items-center gap-2 rounded-xl bg-red-500/5 border border-red-500/10 px-4 py-2 text-xs md:text-sm font-bold text-red-400 shadow-inner">
                  <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                  {activeData.metric}
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  {activeData.title}
                </h3>
                <p className="text-sm leading-relaxed text-neutral-400">
                  {activeData.description}
                </p>
              </div>

              {/* Bullet Points */}
              <ul className="space-y-3 pt-2">
                {activeData.points.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm leading-relaxed text-neutral-300">
                    <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-red-950/50 text-red-500">
                      <ArrowRight size={10} />
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Source & Citation Footer Card */}
            <div className="mt-6 rounded-xl border border-neutral-900 bg-neutral-900/20 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-inner">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 text-neutral-500 shrink-0">
                  <Bookmark size={18} />
                </span>
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wide">
                    {sourceLabel}
                  </span>
                  <p className="text-xs font-semibold text-neutral-300">
                    {activeData.citation}
                  </p>
                </div>
              </div>
              
              <a
                href={activeData.citationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-neutral-300 hover:text-red-400 transition-all border border-neutral-800 bg-neutral-900/60 hover:border-red-500/20 px-3 py-1.5 rounded-lg shrink-0"
              >
                <span>Link</span>
                <ExternalLink size={10} />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
