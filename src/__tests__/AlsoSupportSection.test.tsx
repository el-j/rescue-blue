import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AlsoSupportSection } from "../components/AlsoSupportSection";
import { getTranslation } from "../i18n";

describe("AlsoSupportSection", () => {
  const t = getTranslation("de");

  it("renders PRÜF-Demos and other anti-fascist initiatives with category badges", () => {
    render(<AlsoSupportSection lang="de" t={t} />);

    // Check PRÜF-Demos
    expect(
      screen.getByText(/PRÜF-Demos: Prüfung Rettet Übrigens Freiheit!/i),
    ).toBeInTheDocument();

    // Check filter pills
    const demoFilter = screen.getByRole("button", {
      name: /Demos & Aktionen/i,
    });
    expect(demoFilter).toBeInTheDocument();

    // Click demo filter
    fireEvent.click(demoFilter);

    // PRÜF-Demos and Zusammen gegen Rechts should still be visible
    expect(
      screen.getByText(/PRÜF-Demos: Prüfung Rettet Übrigens Freiheit!/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Zusammen gegen Rechts/i)).toBeInTheDocument();

    // Pure petition should now be filtered out
    expect(
      screen.queryByText(/Change\.org: AfD-Verbot JETZT!/i),
    ).not.toBeInTheDocument();
  });
});
