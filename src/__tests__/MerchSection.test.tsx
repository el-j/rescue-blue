import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MerchSection } from "../components/street-team/MerchSection";
import { getTranslation } from "../i18n";

describe("MerchSection & OrderModal", () => {
  const t = getTranslation("de");

  it("renders packages, print-at-home templates, and street photo gallery", () => {
    render(<MerchSection lang="de" t={t} />);

    expect(screen.getByText(t.streetTitle)).toBeInTheDocument();
    expect(screen.getByText("Starter-Paket")).toBeInTheDocument();
    expect(screen.getByText("Nachbarschafts-Paket")).toBeInTheDocument();
    expect(screen.getByText(t.printTitle)).toBeInTheDocument();
    expect(screen.getByText(t.galleryTitle)).toBeInTheDocument();
  });

  it("opens the OrderModal, validates inputs, and completes an order", () => {
    render(<MerchSection lang="de" t={t} />);

    const orderButtons = screen.getAllByRole("button", {
      name: new RegExp(t.streetOrderBtn, "i"),
    });
    fireEvent.click(orderButtons[0]);

    // Modal should be visible
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByText(t.orderModalTitle)).toBeInTheDocument();

    // Submit empty form -> shows required error
    const submitBtn = screen.getByRole("button", { name: t.orderSubmitBtn });
    fireEvent.click(submitBtn);
    expect(screen.getByRole("alert")).toHaveTextContent(t.orderErrorRequired);

    // Fill invalid email
    fireEvent.change(
      screen.getByLabelText(t.orderNameLabel, { exact: false }),
      {
        target: { value: "Mara Beispiel" },
      },
    );
    fireEvent.change(
      screen.getByLabelText(t.orderEmailLabel, { exact: false }),
      {
        target: { value: "invalid-email" },
      },
    );
    fireEvent.change(screen.getByLabelText(t.orderZipLabel, { exact: false }), {
      target: { value: "10115" },
    });
    fireEvent.change(
      screen.getByLabelText(t.orderCityStreetLabel, { exact: false }),
      {
        target: { value: "Friedensstraße 12, Berlin" },
      },
    );
    fireEvent.click(submitBtn);
    expect(screen.getByRole("alert")).toHaveTextContent(t.orderErrorEmail);

    // Fix email, break zip
    fireEvent.change(
      screen.getByLabelText(t.orderEmailLabel, { exact: false }),
      {
        target: { value: "mara@example.org" },
      },
    );
    fireEvent.change(screen.getByLabelText(t.orderZipLabel, { exact: false }), {
      target: { value: "12" },
    });
    fireEvent.click(submitBtn);
    expect(screen.getByRole("alert")).toHaveTextContent(t.orderErrorZip);

    // Fix zip and submit valid form
    fireEvent.change(screen.getByLabelText(t.orderZipLabel, { exact: false }), {
      target: { value: "10115" },
    });
    fireEvent.click(submitBtn);

    expect(screen.getByText(t.orderSuccessTitle)).toBeInTheDocument();
  });
});
