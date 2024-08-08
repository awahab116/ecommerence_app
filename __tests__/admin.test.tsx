import React, { use } from "react";
import { act, screen, waitFor, fireEvent } from "@testing-library/react";
import AdminOverview from "@/components/adminOverview";
import AdminTable from "@/components/adminTable";
import { renderWithProviders } from "@/lib/mock-redux-wrapper";
import mockStore, { MockAppDispatch } from "../src/lib/mock-store";
import { addProduct, resetCart } from "@/provider/redux/cartSlice";
import { useRouter } from "next/navigation";

jest.setTimeout(1000);

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("AdminOverview and table test suite", () => {
  it("check if admin overview is rendered", async () => {
    renderWithProviders(<AdminOverview />, { store: mockStore });

    // Assert that the StatCard components are rendered
    expect(await screen.findByTestId("stat-card-Revenue")).toBeInTheDocument();
    expect(
      await screen.findByTestId("stat-card-Revenue-name")
    ).toHaveTextContent("Revenue");
    expect(
      await screen.findByTestId("stat-card-Revenue-price")
    ).toHaveTextContent("$10000");
    expect(
      await screen.findByTestId("stat-card-Revenue-value")
    ).toHaveTextContent("+30$");

    expect(await screen.findByTestId("stat-card-Orders")).toBeInTheDocument();
    expect(
      await screen.findByTestId("stat-card-Orders-name")
    ).toHaveTextContent("Orders");
    expect(
      await screen.findByTestId("stat-card-Orders-price")
    ).toHaveTextContent("100");
    expect(
      await screen.findByTestId("stat-card-Orders-value")
    ).toHaveTextContent("+42");

    expect(await screen.findByTestId("stat-card-Products")).toBeInTheDocument();
    expect(
      await screen.findByTestId("stat-card-Products-name")
    ).toHaveTextContent("Products");
    expect(
      await screen.findByTestId("stat-card-Products-price")
    ).toHaveTextContent("100");
    expect(
      await screen.findByTestId("stat-card-Products-value")
    ).toHaveTextContent("+5");

    expect(await screen.findByTestId("stat-card-Users")).toBeInTheDocument();
    expect(await screen.findByTestId("stat-card-Users-name")).toHaveTextContent(
      "Users"
    );
    expect(
      await screen.findByTestId("stat-card-Users-price")
    ).toHaveTextContent("10");
    expect(
      await screen.findByTestId("stat-card-Users-value")
    ).toHaveTextContent("+1");
  });
});
