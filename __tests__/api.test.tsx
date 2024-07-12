import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import Product from "../src/components/product";
import { renderWithProviders } from "@/lib/mock-redux-wrapper";
import mockStore from "../src/lib/mock-store";

import { server } from "../mocks/server";

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

jest.setTimeout(100000);

describe("Product component", () => {
  it("should render the product component with correct price", async () => {
    renderWithProviders(<Product productId={1} />, { store: mockStore });

    await screen.findByText(/new Jeans/i);

    expect(screen.getByText(/new Jeans/i)).toBeInTheDocument();

    const price = screen.getByText(/(\$[\d.]+)/);
    expect(price).toBeInTheDocument();
    expect(price).toHaveTextContent("$100");
  });

  it("should update quantity when quantity selector changes", async () => {
    renderWithProviders(<Product productId={1} />, { store: mockStore });

    await screen.findByText(/new Jeans/i);

    const quantitySelector = screen.getByRole("button", { name: "+" });

    fireEvent.click(quantitySelector);
    fireEvent.click(quantitySelector);
    fireEvent.click(screen.getByRole("button", { name: "-" }));

    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("should add product to cart when add to cart button is clicked", async () => {
    renderWithProviders(<Product productId={1} />, { store: mockStore });

    await screen.findByText(/new Jeans/i);

    const addToCartButton = screen.getByRole("button", {
      name: /add to cart/i,
    });

    fireEvent.click(addToCartButton);
    fireEvent.click(addToCartButton);

    expect(mockStore.getState().cart.products).toHaveLength(1);
    expect(mockStore.getState().cart.products[0].productId).toBe(1);
    expect(mockStore.getState().cart.products[0].quantity).toBe(2);

    screen.debug();
  });

  it("invalid product id should show error message", async () => {
    renderWithProviders(<Product productId={20} />, { store: mockStore });

    await screen.findByText(/Error loading product data/i);

    expect(screen.getByText(/Error loading product data/i)).toBeInTheDocument();
  });
});
