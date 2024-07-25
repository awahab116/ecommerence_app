import React from "react";
import { screen, fireEvent, within } from "@testing-library/react";
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

    await screen.findByText(/Test Product/i);

    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();

    const price = screen.getByText(/Rs\.\s?\d+/);
    expect(price).toBeInTheDocument();
    expect(price).toHaveTextContent("Rs. 10");

    screen.debug();
  });

  it("should update quantity when quantity selector changes", async () => {
    renderWithProviders(<Product productId={1} />, { store: mockStore });

    await screen.findByText(/Test Product/i);

    const quantitySelector = screen.getByRole("button", { name: "+" });

    fireEvent.click(quantitySelector);
    fireEvent.click(quantitySelector);
    fireEvent.click(screen.getByRole("button", { name: "-" }));

    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("should add product to cart when add to cart button is clicked", async () => {
    renderWithProviders(<Product productId={1} />, { store: mockStore });

    await screen.findByText(/Test Product/i);

    const addToCartButton = screen.getByRole("button", {
      name: /add to cart/i,
    });

    fireEvent.click(addToCartButton);
    fireEvent.click(addToCartButton);

    expect(mockStore.getState().cart.products).toHaveLength(1);
    expect(mockStore.getState().cart.products[0].productId).toBe(1);
    expect(mockStore.getState().cart.products[0].quantity).toBe(2);

    // screen.debug();
  });

  it("invalid product id should show error message", async () => {
    renderWithProviders(<Product productId={20} />, { store: mockStore });

    await screen.findByText(/Error loading product data/i);

    expect(screen.getByText(/Error loading product data/i)).toBeInTheDocument();
  });

  it("show product tabs when product is loaded", async () => {
    renderWithProviders(<Product productId={1} />, { store: mockStore });

    const productTabs = await screen.getAllByTestId("product-tab");

    expect(productTabs).toHaveLength(5);

    const briefTab = productTabs.find((tab) => tab.textContent === "BRIEF");
    //console.log("briefTab", briefTab);
    expect(briefTab).toBeInTheDocument();

    //fire event to check description tab
    const shippingTab = productTabs.find(
      (tab) => tab.textContent === "SHIPPING"
    );

    fireEvent.click(shippingTab!);
    const description = screen.getByText(/Shipping information/i);
    expect(description).toBeInTheDocument();

    // screen.debug();
  });

  it("change product image when clicked on secondary image", async () => {
    renderWithProviders(<Product productId={1} />, { store: mockStore });

    await screen.findByText(/Test Product/i);

    const mainproductImage = screen.getByAltText(/Main image/i);
    expect(mainproductImage).toBeInTheDocument();

    const secondaryImage = screen.getByAltText(/second scroller image/i);

    fireEvent.click(secondaryImage);

    const changedMainProductImage =
      screen.getByAltText(/Main Secondary Image/i);
    expect(changedMainProductImage).toBeInTheDocument();
  });

  it("change the border color when image is clicked", async () => {
    renderWithProviders(<Product productId={1} />, { store: mockStore });

    await screen.findByText(/Test Product/i);

    const firstScrollerDiv = screen.getByTestId("first-scroller-image");
    const secondScrollerDiv = screen.getByTestId("second-scroller-image");

    // Check initial classes
    expect(firstScrollerDiv).toHaveClass("border-black");
    expect(secondScrollerDiv).toHaveClass("border-gray-300");

    // Click the second image
    fireEvent.click(secondScrollerDiv);

    // Check classes after click
    expect(firstScrollerDiv).toHaveClass("border-gray-300");
    expect(secondScrollerDiv).toHaveClass("border-black");
  });
});
