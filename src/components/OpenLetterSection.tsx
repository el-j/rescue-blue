import { MessageSquare, Users } from 'lucide-react'
import type { LetterTarget, Letters, Translation, Locale } from '../i18n'
import { DECISION_MAKERS } from './decisionMakers'

interface LetterProps {
  t: Translation
  letters: Letters
  activeLetterTarget: LetterTarget
  onChangeTarget: (target: LetterTarget) => void
  lang: Locale
}

const LOCALIZED_TEXTS = {
  de: {
    recipientsHeader: 'Status der Entscheidungsträger',
    status_supported: 'Unterstützt',
    status_opposed: 'Abgelehnt',
    status_no_answer: 'Ausstehend',
  },
  en: {
    recipientsHeader: 'Status of Decision Makers',
    status_supported: 'Supports',
    status_opposed: 'Opposes',
    status_no_answer: 'Pending',
  },
  fr: {
    recipientsHeader: 'Statut des décideurs',
    status_supported: 'Soutient',
    status_opposed: 'Rejette',
    status_no_answer: 'En attente',
  },
  es: {
    recipientsHeader: 'Estado de los destinatarios',
    status_supported: 'Apoya',
    status_opposed: 'Rechaza',
    status_no_answer: 'Pendiente',
  },
  tr: {
    recipientsHeader: 'Alıcıların Durumu',
    status_supported: 'Destekliyor',
    status_opposed: 'Reddediyor',
    status_no_answer: 'Beklemede',
  },
  uk: {
    recipientsHeader: 'Статус отримувачів',
    status_supported: 'Підтримує',
    status_opposed: 'Відхилено',
    status_no_answer: 'Очікується',
  },
  pl: {
    recipientsHeader: 'Status decydentów',
    status_supported: 'Wspiera',
    status_opposed: 'Odrzuca',
    status_no_answer: 'Oczekuje',
  },
  it: {
    recipientsHeader: 'Stato dei destinatari',
    status_supported: 'Supporta',
    status_opposed: 'Rifiuta',
    status_no_answer: 'In attesa',
  },
  ru: {
    recipientsHeader: 'Статус получателей',
    status_supported: 'Поддерживает',
    status_opposed: 'Отклонено',
    status_no_answer: 'Ожидает',
  },
} as const

const ROLE_TRANSLATIONS: Record<string, Record<Locale, string>> = {
  roleArdChair: {
    de: 'ARD-Vorsitzender & Intendant des Hessischen Rundfunks (hr)',
    en: 'ARD Chairman & Director of Hessischer Rundfunk (hr)',
    fr: "Président de l'ARD & Directeur de la Hessischer Rundfunk (hr)",
    es: 'Presidente de ARD y Director de Hessischer Rundfunk (hr)',
    tr: 'ARD Başkanı & Hessischer Rundfunk (hr) Genel Müdürü',
    uk: 'Голова ARD та директор Hessischer Rundfunk (hr)',
    pl: 'Przewodniczący ARD i dyrektor Hessischer Rundfunk (hr)',
    it: "Presidente dell'ARD e direttore di Hessischer Rundfunk (hr)",
    ru: 'Председатель ARD и директор Hessischer Rundfunk (hr)',
  },
  roleZdfChefred: {
    de: 'Chefredakteurin, Zweites Deutsches Fernsehen (ZDF)',
    en: 'Editor-in-Chief, Zweites Deutsches Fernsehen (ZDF)',
    fr: 'Rédactrice en chef, Zweites Deutsches Fernsehen (ZDF)',
    es: 'Redactora jefa, Zweites Deutsches Fernsehen (ZDF)',
    tr: 'Genel Yayın Yönetmeni, Zweites Deutsches Fernsehen (ZDF)',
    uk: 'Шеф-редакторка, Zweites Deutsches Fernsehen (ZDF)',
    pl: 'Redaktor naczelna, Zweites Deutsches Fernsehen (ZDF)',
    it: 'Direttrice editoriale, Zweites Deutsches Fernsehen (ZDF)',
    ru: 'Главный редактор, Zweites Deutsches Fernsehen (ZDF)',
  },
  roleTagesschauChefred: {
    de: 'Erster Chefredakteur ARD-aktuell (Tagesschau)',
    en: 'Editor-in-Chief ARD-aktuell (Tagesschau)',
    fr: "Rédacteur en chef d'ARD-aktuell (Tagesschau)",
    es: 'Redactor jefe de ARD-aktuell (Tagesschau)',
    tr: 'ARD-aktuell (Tagesschau) Genel Yayın Yönetmeni',
    uk: 'Головний редактор ARD-aktuell (Tagesschau)',
    pl: 'Redaktor naczelny ARD-aktuell (Tagesschau)',
    it: 'Caporedattore di ARD-aktuell (Tagesschau)',
    ru: 'Главный редактор ARD-aktuell (Tagesschau)',
  },
  roleZdfIntendant: {
    de: 'Intendant, Zweites Deutsches Fernsehen (ZDF)',
    en: 'Director General, Zweites Deutsches Fernsehen (ZDF)',
    fr: 'Directeur général, Zweites Deutsches Fernsehen (ZDF)',
    es: 'Director general, Zweites Deutsches Fernsehen (ZDF)',
    tr: 'Genel Müdür, Zweites Deutsches Fernsehen (ZDF)',
    uk: 'Генеральний директор, Zweites Deutsches Fernsehen (ZDF)',
    pl: 'Dyrektor generalny, Zweites Deutsches Fernsehen (ZDF)',
    it: 'Direttore generale, Zweites Deutsches Fernsehen (ZDF)',
    ru: 'Генеральный директор, Zweites Deutsches Fernsehen (ZDF)',
  },
  roleWdrIntendant: {
    de: 'Intendantin, Westdeutscher Rundfunk (WDR)',
    en: 'Director General, Westdeutscher Rundfunk (WDR)',
    fr: 'Directrice générale, Westdeutscher Rundfunk (WDR)',
    es: 'Directora general, Westdeutscher Rundfunk (WDR)',
    tr: 'Genel Müdür, Westdeutscher Rundfunk (WDR)',
    uk: 'Генеральна директорка, Westdeutscher Rundfunk (WDR)',
    pl: 'Dyrektorka generalna, Westdeutscher Rundfunk (WDR)',
    it: 'Direttrice generale, Westdeutscher Rundfunk (WDR)',
    ru: 'Генеральный директор, Westdeutscher Rundfunk (WDR)',
  },
  roleNdrIntendant: {
    de: 'Intendant, Norddeutscher Rundfunk (NDR)',
    en: 'Director General, Norddeutscher Rundfunk (NDR)',
    fr: 'Directeur général, Norddeutscher Rundfunk (NDR)',
    es: 'Director general, Norddeutscher Rundfunk (NDR)',
    tr: 'Genel Müdür, Norddeutscher Rundfunk (NDR)',
    uk: 'Генеральний директор, Norddeutscher Rundfunk (NDR)',
    pl: 'Dyrektor generalny, Norddeutscher Rundfunk (NDR)',
    it: 'Direttore generale, Norddeutscher Rundfunk (NDR)',
    ru: 'Генеральный директор, Norddeutscher Rundfunk (NDR)',
  },
  roleDpaChefred: {
    de: 'Chefredakteur, Deutsche Presse-Agentur (dpa)',
    en: 'Editor-in-Chief, German Press Agency (dpa)',
    fr: 'Rédacteur en chef, Agence de Presse Allemande (dpa)',
    es: 'Redactor jefe, Agencia de Prensa Alemana (dpa)',
    tr: 'Genel Yayın Yönetmeni, Alman Basın Ajansı (dpa)',
    uk: 'Головний редактор, Німецьке прес-агентство (dpa)',
    pl: 'Redaktor naczelny, Niemiecka Agencja Prasowa (dpa)',
    it: 'Redattore capo, Agenzia di stampa tedesca (dpa)',
    ru: 'Главный редактор, Немецкое агентство прессы (dpa)',
  },
  roleSpringerChefred: {
    de: 'Vorsitzender der Chefredaktionen, Axel-Springer-Premium-Gruppe',
    en: 'Chairman of the Editorial Boards, Axel Springer Premium Group',
    fr: 'Président des rédactions, Groupe Axel Springer Premium',
    es: 'Presidente de las redacciones, Grupo Axel Springer Premium',
    tr: 'Yayın Kurulları Başkanı, Axel Springer Premium Grubu',
    uk: 'Голова редакційних колегій, Axel Springer Premium Group',
    pl: 'Przewodniczący kolegiów redakcyjnych, Axel Springer Premium Group',
    it: 'Presidente dei comitati di redazione, Gruppo Axel Springer Premium',
    ru: 'Председатель редакционных коллегий, Axel Springer Premium Group',
  },
  roleRtlChefred: {
    de: 'Chefredakteur Primetime, RTL News',
    en: 'Editor-in-Chief Primetime, RTL News',
    fr: 'Rédacteur en chef du prime time, RTL News',
    es: 'Redactor jefe de prime time, RTL News',
    tr: 'Prime Time Genel Yayın Yönetmeni, RTL News',
    uk: 'Головний редактор прайм-тайму, RTL News',
    pl: 'Redaktor naczelny pasma prime time, RTL News',
    it: 'Caporedattore prima serata, RTL News',
    ru: 'Главный редактор прайм-тайма, RTL News',
  },
  roleProsiebenChefred: {
    de: 'Chefredakteur, Seven.One Entertainment Group (ProSiebenSat.1)',
    en: 'Editor-in-Chief, Seven.One Entertainment Group (ProSiebenSat.1)',
    fr: 'Rédacteur en chef, Seven.One Entertainment Group (ProSiebenSat.1)',
    es: 'Redactor jefe, Seven.One Entertainment Group (ProSiebenSat.1)',
    tr: 'Genel Yayın Yönetmeni, Seven.One Entertainment Group (ProSiebenSat.1)',
    uk: 'Головний редактор, Seven.One Entertainment Group (ProSiebenSat.1)',
    pl: 'Redaktor naczelny, Seven.One Entertainment Group (ProSiebenSat.1)',
    it: 'Caporedattore, Seven.One Entertainment Group (ProSiebenSat.1)',
    ru: 'Главный редактор, Seven.One Entertainment Group (ProSiebenSat.1)',
  },
  roleSpiegelChefred: {
    de: 'Chefredakteur, DER SPIEGEL',
    en: 'Editor-in-Chief, DER SPIEGEL',
    fr: 'Rédacteur en chef, DER SPIEGEL',
    es: 'Redactor jefe, DER SPIEGEL',
    tr: 'Genel Yayın Yönetmeni, DER SPIEGEL',
    uk: 'Головний редактор, DER SPIEGEL',
    pl: 'Redaktor naczelny, DER SPIEGEL',
    it: 'Caporedattore, DER SPIEGEL',
    ru: 'Главный редактор, DER SPIEGEL',
  },
  roleZeitChefred: {
    de: 'Chefredakteur, DIE ZEIT',
    en: 'Editor-in-Chief, DIE ZEIT',
    fr: 'Rédacteur en chef, DIE ZEIT',
    es: 'Redactor jefe, DIE ZEIT',
    tr: 'Genel Yayın Yönetmeni, DIE ZEIT',
    uk: 'Головний редактор, DIE ZEIT',
    pl: 'Redaktor naczelny, DIE ZEIT',
    it: 'Caporedattore, DIE ZEIT',
    ru: 'Главный редактор, DIE ZEIT',
  },
  roleWdrCouncil: {
    de: 'Vorsitzender des WDR-Rundfunkrats',
    en: 'Chairman of the WDR Broadcasting Council',
    fr: 'Président du conseil de radiodiffusion du WDR',
    es: 'Presidente del Consejo de Radiodifusión de WDR',
    tr: 'WDR Yayın Kurulu Başkanı',
    uk: 'Голова ради радіомовлення WDR',
    pl: 'Przewodniczący Rady Nadzorczej WDR',
    it: 'Presidente del consiglio di amministrazione del WDR',
    ru: 'Председатель совета телерадиовещания WDR',
  },
  roleNdrCouncil: {
    de: 'Vorsitzender des NDR-Rundfunkrates',
    en: 'Chairman of the NDR Broadcasting Council',
    fr: 'Président du conseil de radiodiffusion du NDR',
    es: 'Presidente del Consejo de Radiodifusión de NDR',
    tr: 'NDR Yayın Kurulu Başkanı',
    uk: 'Голова ради радіомовлення NDR',
    pl: 'Przewodniczący Rady Nadzorczej NDR',
    it: 'Presidente del consiglio di amministrazione del NDR',
    ru: 'Председатель совета телерадиовещания NDR',
  },
  roleZdfCouncil: {
    de: 'Vorsitzende des ZDF-Fernsehrates',
    en: 'Chairwoman of the ZDF Television Council',
    fr: 'Président du conseil de télévision du ZDF',
    es: 'Presidenta del Consejo de Televisión de ZDF',
    tr: 'ZDF Televizyon Kurulu Başkanı',
    uk: 'Голова ради телебачення ZDF',
    pl: 'Przewodnicząca Rady Telewizyjnej ZDF',
    it: 'Presidente del consiglio televisivo del ZDF',
    ru: 'Председатель совета телевидения ZDF',
  },
}

export function OpenLetterSection({ t, letters, activeLetterTarget, onChangeTarget, lang }: LetterProps) {
  const texts = LOCALIZED_TEXTS[lang] || LOCALIZED_TEXTS.de

  const activeMakers = DECISION_MAKERS[activeLetterTarget] || []

  return (
    <section id="brief" className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5 md:p-8 space-y-6">
      <div>
        <div className="mb-6">
          <h3 className="flex items-center gap-2 text-xl font-black tracking-tight text-white uppercase md:text-2xl">
            <MessageSquare size={22} className="text-blue-500" /> {t.letterH}
          </h3>
          <p className="mt-1 text-sm text-neutral-400">{t.letterSub}</p>
        </div>
        <div className="mb-6 grid grid-cols-3 gap-2">
          {(['oeffentlich', 'privat', 'rundfunkrat'] as const).map((key) => (
            <button
              key={key}
              onClick={() => onChangeTarget(key)}
              className={`rounded-lg border px-2 py-3 text-center text-[10px] font-bold tracking-wider uppercase transition-all md:text-xs ${
                activeLetterTarget === key
                  ? 'border-blue-500/30 bg-blue-600/10 text-blue-400'
                  : 'border-neutral-800 bg-neutral-900 text-neutral-400 hover:text-white'
              }`}
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
      </div>

      {/* Decision Makers / Recipients Section */}
      <div className="border-t border-neutral-800 pt-6 space-y-4">
        <div>
          <h4 className="flex items-center gap-2 text-base font-bold text-white uppercase tracking-tight">
            <Users size={18} className="text-blue-400" />
            {texts.recipientsHeader}
          </h4>
        </div>

        {/* Recipients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {activeMakers.map((maker, idx) => {
            const translatedRole =
              ROLE_TRANSLATIONS[maker.roleKey]?.[lang] || ROLE_TRANSLATIONS[maker.roleKey]?.de || ''

            const statusText =
              maker.status === 'supported'
                ? texts.status_supported
                : maker.status === 'opposed'
                  ? texts.status_opposed
                  : texts.status_no_answer

            const badgeStyles =
              maker.status === 'supported'
                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                : maker.status === 'opposed'
                  ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                  : 'bg-neutral-800 text-neutral-400 border border-neutral-700/50'

            const dotStyles =
              maker.status === 'supported'
                ? 'bg-green-400'
                : maker.status === 'opposed'
                  ? 'bg-rose-400'
                  : 'bg-neutral-400'

            return (
              <div
                key={idx}
                className="flex items-center justify-between gap-4 rounded-xl border border-neutral-800 bg-neutral-900/20 p-3.5 transition-all hover:border-neutral-700/60 hover:bg-neutral-900/40"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-1.5 mb-0.5">
                    <span className="font-bold text-sm text-neutral-200">{maker.name}</span>
                    <span className="text-[10px] text-neutral-500 font-mono truncate">{maker.email}</span>
                  </div>
                  <p className="text-xs text-neutral-400 leading-tight">{translatedRole}</p>
                </div>
                <div className="shrink-0">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${badgeStyles}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${dotStyles}`} />
                    {statusText}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

