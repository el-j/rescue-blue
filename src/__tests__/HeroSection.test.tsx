import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { HeroSection } from "../components/HeroSection";
import { getTranslation } from "../i18n";

describe("HeroSection", () => {
  it("renders the headline, harmonious movement pillars, and multi-CTA links in German", () => {
    const t = getTranslation("de");
    const onCtaClick = vi.fn();

    render(
      <HeroSection
        t={t}
        headline={t.heroH1}
        subline={t.heroSub}
        ctaLabel={t.heroImgText2}
        heroImageBase="/hero-image-rescue-blue-no-text"
        formattedSignatureCount="1.234"
        isLoadingSignatures={false}
        isLive={true}
        onCtaClick={onCtaClick}
      />,
    );

    expect(
      screen.getByRole("heading", { name: t.heroH1, level: 1 }),
    ).toBeInTheDocument();
    expect(screen.getByText(t.heroPillarPlanet)).toBeInTheDocument();
    expect(screen.getByText(t.heroPillarFreedom)).toBeInTheDocument();
    expect(screen.getByText(t.heroPillarHarmony)).toBeInTheDocument();
    expect(screen.getByText(t.heroPillarRibbon)).toBeInTheDocument();

    const streetTeamLink = screen.getByRole("link", {
      name: t.heroCtaStreetTeam,
    });
    expect(streetTeamLink).toHaveAttribute("href", "#street-team");

    const toolkitLink = screen.getByRole("link", { name: t.heroCtaToolkit });
    expect(toolkitLink).toHaveAttribute("href", "#toolkit");

    const radarLink = screen.getByRole("link", { name: t.heroCtaRadar });
    expect(radarLink).toHaveAttribute("href", "#radar");

    const petitionLink = screen.getByRole("link", { name: t.heroImgText2 });
    fireEvent.click(petitionLink);
    expect(onCtaClick).toHaveBeenCalledTimes(1);
  });

  it("renders English movement pillars and multi-CTAs", () => {
    const t = getTranslation("en");
    render(
      <HeroSection
        t={t}
        headline={t.heroH1}
        subline={t.heroSub}
        ctaLabel={t.heroImgText2}
        heroImageBase="/hero-image-rescue-blue-no-text"
        formattedSignatureCount="1,234"
        isLoadingSignatures={false}
        isLive={false}
        onCtaClick={vi.fn()}
      />,
    );

    expect(screen.getByText(t.heroPillarPlanet)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: t.heroCtaStreetTeam }),
    ).toHaveAttribute("href", "#street-team");
  });
});
