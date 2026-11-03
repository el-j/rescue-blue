import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useActiveSection } from "../../hooks/useActiveSection";

describe("useActiveSection", () => {
  it("returns null initially when no section is intersecting", () => {
    const { result } = renderHook(() =>
      useActiveSection(["street-team", "toolkit"]),
    );
    expect(result.current).toBeNull();
  });
});
