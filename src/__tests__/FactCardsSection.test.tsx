import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { FactCardsSection } from "../components/toolkit/FactCardsSection";
import { getTranslation } from "../i18n";

describe("FactCardsSection", () => {
  const t = getTranslation("de");

  it("renders fact cards, filters by category and search query, and opens share modal", () => {
    render(<FactCardsSection lang="de" t={t} />);

    expect(screen.getByText(t.toolkitTitle)).toBeInTheDocument();
    expect(screen.getByText(t.dialogueGuideTitle)).toBeInTheDocument();

    // Filter by Climate category
    const climateBtn = screen.getByRole("button", {
      name: t.toolkitFilterClimate,
    });
    fireEvent.click(climateBtn);

    expect(screen.getByText(/Fraunhofer-Institut/i)).toBeInTheDocument();

    // Reset to All Topics
    fireEvent.click(screen.getByRole("button", { name: t.toolkitFilterAll }));

    // Search input filter
    const searchInput = screen.getByPlaceholderText(t.toolkitSearchPlaceholder);
    fireEvent.change(searchInput, { target: { value: "Freiwilligensurvey" } });
    expect(
      screen.getByText(/Deutscher Freiwilligensurvey/i),
    ).toBeInTheDocument();

    // Open Share Card Modal
    const shareButtons = screen.getAllByRole("button", {
      name: t.toolkitShareCardBtn,
    });
    fireEvent.click(shareButtons[0]);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText(t.shareCardModalTitle)).toBeInTheDocument();
  });
});
