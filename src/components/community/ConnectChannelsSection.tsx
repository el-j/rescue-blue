import {
  ArrowUpRight,
  Compass,
  Globe2,
  Heart,
  Leaf,
  Lock,
  MessageCircle,
  Radio,
  Sparkles,
  Users,
} from "lucide-react";
import type { Translation } from "../../i18n";
import { SafetyGuideSection } from "./SafetyGuideSection";

interface ConnectChannelsSectionProps {
  t: Translation;
}

export function ConnectChannelsSection({ t }: ConnectChannelsSectionProps) {
  const valuesPillars = [
    {
      id: "social-security",
      icon: Heart,
      title: t.valuesPillar1Title,
      desc: t.valuesPillar1Desc,
    },
    {
      id: "freedom-peace",
      icon: Sparkles,
      title: t.valuesPillar2Title,
      desc: t.valuesPillar2Desc,
    },
    {
      id: "harmony-nature",
      icon: Leaf,
      title: t.valuesPillar3Title,
      desc: t.valuesPillar3Desc,
    },
    {
      id: "listening-community",
      icon: Users,
      title: t.valuesPillar4Title,
      desc: t.valuesPillar4Desc,
    },
  ];

  const channels = [
    {
      id: "signal",
      icon: Lock,
      badge: "E2E ENCRYPTED",
      title: t.channelSignalTitle,
      desc: t.channelSignalDesc,
      cta: t.channelSignalCta,
      href: "mailto:bluearc.in.sky@gmail.com?subject=Signal%20Info-Kanal%20Einladung",
    },
    {
      id: "bluesky",
      icon: Globe2,
      badge: "OPEN SOCIAL",
      title: t.channelBlueskyTitle,
      desc: t.channelBlueskyDesc,
      cta: t.channelBlueskyCta,
      href: "https://bsky.app/search?q=rette-blau",
    },
    {
      id: "mastodon",
      icon: MessageCircle,
      badge: "FEDIVERSE",
      title: t.channelMastodonTitle,
      desc: t.channelMastodonDesc,
      cta: t.channelMastodonCta,
      href: "https://mastodon.social/tags/RetteBlau",
    },
  ];

  return (
    <section
      id="werte"
      className="border-t border-[var(--border)] bg-[var(--bg-secondary)]/30 py-16 px-4 md:px-6"
    >
      <div className="mx-auto max-w-6xl">
        {/* Values Compass Header */}
        <div className="mb-3 flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase flex items-center gap-1.5">
            <Compass size={15} />
            {t.valuesTag}
          </span>
          <span className="h-px flex-1 max-w-xs bg-[var(--border)]" />
        </div>

        <div className="mb-8 max-w-3xl">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-[var(--text-primary)] uppercase">
            {t.valuesTitle}
          </h2>
          <p className="mt-2.5 text-sm md:text-base text-[var(--text-secondary)] leading-relaxed">
            {t.valuesSubtitle}
          </p>
        </div>

        {/* 4 Values Compass Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {valuesPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="border border-[var(--border)] bg-[var(--bg-primary)] p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="inline-flex h-9 w-9 items-center justify-center border border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400 mb-3">
                    <Icon size={17} />
                  </div>
                  <h3 className="text-base font-bold text-[var(--text-primary)] mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Decentralized Channels Sub-Section */}
        <div className="mt-12 border-t border-[var(--border)] pt-10">
          <div className="mb-3 flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase flex items-center gap-1.5">
              <Radio size={14} />
              {t.channelsTag}
            </span>
            <span className="h-px flex-1 max-w-xs bg-[var(--border)]" />
          </div>

          <div className="mb-6">
            <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-[var(--text-primary)] uppercase">
              {t.channelsTitle}
            </h3>
            <p className="mt-1.5 text-sm text-[var(--text-secondary)] max-w-3xl leading-relaxed">
              {t.channelsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {channels.map((ch) => {
              const Icon = ch.icon;
              return (
                <a
                  key={ch.id}
                  href={ch.href}
                  target={ch.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    ch.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="group border border-[var(--border)] bg-[var(--bg-primary)] p-5 flex flex-col justify-between transition-colors hover:border-blue-500"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400">
                        <Icon size={12} />
                        <span>{ch.badge}</span>
                      </span>
                      <ArrowUpRight
                        size={14}
                        className="text-[var(--text-muted)] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                      />
                    </div>
                    <h4 className="text-base font-bold text-[var(--text-primary)] mb-2">
                      {ch.title}
                    </h4>
                    <p className="text-xs leading-relaxed text-[var(--text-secondary)] mb-4">
                      {ch.desc}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[var(--border)] font-mono text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider group-hover:underline">
                    {ch.cta}
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Safety & Mindfulness Guide */}
        <SafetyGuideSection t={t} />
      </div>
    </section>
  );
}
