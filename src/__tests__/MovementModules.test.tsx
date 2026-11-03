import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BluePlanetSection } from "../components/planet/BluePlanetSection";
import { SolidarityRadarSection } from "../components/radar/SolidarityRadarSection";
import { ConnectChannelsSection } from "../components/community/ConnectChannelsSection";
import { getTranslation } from "../i18n";

describe("BluePlanet, SolidarityRadar & ConnectChannels Sections", () => {
  const t = getTranslation("de");

  it("renders BluePlanetSection and PlanetaryBoundaries", () => {
    render(<BluePlanetSection t={t} />);

    expect(screen.getByText(t.planetTitle)).toBeInTheDocument();
    expect(screen.getByText(t.planetCard1Title)).toBeInTheDocument();
    expect(screen.getByText(t.planetBoundariesTitle)).toBeInTheDocument();
    expect(screen.getByText(t.planetBoundary1Title)).toBeInTheDocument();
  });

  it("renders SolidarityRadarSection, filters by state and category, and opens suggest modal", () => {
    render(<SolidarityRadarSection lang="de" t={t} />);

    expect(screen.getByText(t.radarTitle)).toBeInTheDocument();
    expect(screen.getByText(/VBRG e\.V\./i)).toBeInTheDocument();

    // Filter by state TH (Thüringen)
    const thButton = screen.getByRole("button", { name: /TH · Thüringen/i });
    fireEvent.click(thButton);

    expect(screen.getByText(/ezra & MOBIT/i)).toBeInTheDocument();

    // Open Suggest Initiative Modal
    const suggestBtn = screen.getByRole("button", { name: t.radarSuggestBtn });
    fireEvent.click(suggestBtn);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText(t.suggestModalTitle)).toBeInTheDocument();
  });

  it("renders ConnectChannelsSection with Values Compass, Channels, and Safety Guide", () => {
    render(<ConnectChannelsSection t={t} />);

    expect(screen.getByText(t.valuesTitle)).toBeInTheDocument();
    expect(screen.getByText(t.valuesPillar1Title)).toBeInTheDocument();
    expect(screen.getByText(t.channelSignalTitle)).toBeInTheDocument();
    expect(screen.getByText(t.channelBlueskyTitle)).toBeInTheDocument();
    expect(screen.getByText(t.channelMastodonTitle)).toBeInTheDocument();
    expect(screen.getByText(t.safetyTitle)).toBeInTheDocument();
    expect(screen.getByText(t.safetyRule1Title)).toBeInTheDocument();
  });
});
