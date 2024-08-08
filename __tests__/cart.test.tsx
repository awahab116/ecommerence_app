import React, { use } from "react";
import { act, screen, waitFor, fireEvent } from "@testing-library/react";
import Cart from "../src/components/cart";
import CartMenu from "@/components/cartMenu";
import { renderWithProviders } from "@/lib/mock-redux-wrapper";
import mockStore, { MockAppDispatch } from "../src/lib/mock-store";
import { addProduct, resetCart } from "@/provider/redux/cartSlice";
import { useRouter } from "next/navigation";
import { server } from "../mocks/server";

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

jest.setTimeout(1000);

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const setupCartWithProducts = (
  products: { productId: number; price: number; quantity: number }[]
) => {
  const dispatch: MockAppDispatch = mockStore.dispatch;
  products.forEach((product) => dispatch(addProduct(product)));
};

describe("Cart test suite", () => {
  let push: jest.Mock;
  beforeEach(() => {
    push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push,
    });
  });

  afterEach(() => {
    act(() => {
      const dispatch = mockStore.dispatch;
      dispatch(resetCart());
    });
    jest.clearAllMocks();
  });

  it("check if cart is empty", async () => {
    renderWithProviders(<Cart />, { store: mockStore });

    await screen.findByText(/Continue Shopping/i);

    const continueShoppingButton = screen.getByText(/Continue Shopping/i);
    expect(continueShoppingButton).toBeInTheDocument();
  });

  it("check if cart items are rendered", async () => {
    const products = [
      { productId: 1, price: 10, quantity: 1 },
      { productId: 2, price: 20, quantity: 4 },
    ];

    setupCartWithProducts(products);

    renderWithProviders(<Cart />, { store: mockStore });

    expect(screen.getByText(/Proceed to Checkout/i)).toBeInTheDocument();

    const product1Title = await screen.findByTestId(`product-title-1`);
    const product2Title = await screen.findByTestId(`product-title-2`);

    const product1Category = await screen.findByTestId(`product-category-1`);
    const product2Category = await screen.findByTestId(`product-category-2`);

    expect(product1Category).toBeInTheDocument();
    expect(product2Category).toBeInTheDocument();

    const product1Price = await screen.findByTestId(`product-price-1`);
    const product2Price = await screen.findByTestId(`product-price-2`);

    expect(product1Price).toBeInTheDocument();
    expect(product2Price).toBeInTheDocument();

    expect(product1Title).toBeInTheDocument();
    expect(product2Title).toBeInTheDocument();
  });

  it("check if cartItem quantity is updated", async () => {
    const products = [{ productId: 1, price: 10, quantity: 1 }];

    setupCartWithProducts(products);

    renderWithProviders(<Cart />, { store: mockStore });

    await screen.findByText(/Proceed to Checkout/i);

    const checkoutButton = screen.getByText(/Proceed to Checkout/i);
    expect(checkoutButton).toBeInTheDocument();

    const productTitle = screen.getByText(/Test Product 1/i);
    expect(productTitle).toBeInTheDocument();

    const quantitySelector = screen.getByRole("button", { name: "+" });

    fireEvent.click(quantitySelector);
    fireEvent.click(quantitySelector);
    fireEvent.click(screen.getByRole("button", { name: "-" }));

    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("check if order is created when checkout button is clicked", async () => {
    const products = [
      { productId: 1, price: 10, quantity: 1 },
      { productId: 2, price: 20, quantity: 4 },
    ];

    setupCartWithProducts(products);

    renderWithProviders(<Cart />, { store: mockStore });

    await screen.findByText(/Proceed to Checkout/i);

    const checkoutButton = screen.getByText(/Proceed to Checkout/i);
    fireEvent.click(checkoutButton);

    screen.debug();
    await waitFor(() => {
      expect(push).toHaveBeenCalledWith(`/checkout/1`);
    });
  });

  it("check ordernote is opened and closed", async () => {
    const products = [
      { productId: 1, price: 10, quantity: 1 },
      { productId: 2, price: 20, quantity: 4 },
    ];

    setupCartWithProducts(products);

    renderWithProviders(<Cart />, { store: mockStore });

    const orderNote = screen.getByText(/Add Order note/i);
    expect(orderNote).toBeInTheDocument();

    const addNoteIcon = screen.getByTestId("add-note-icon");
    fireEvent.click(addNoteIcon);

    const textArea = screen.getByPlaceholderText(/Add your note here.../i);
    expect(textArea).toBeInTheDocument();

    fireEvent.change(textArea, { target: { value: "This is a test note" } });
    expect((textArea as HTMLTextAreaElement).value).toBe("This is a test note");

    const closeNoteIcon = screen.getByTestId("close-note-icon");
    fireEvent.click(closeNoteIcon);

    const closedTextArea = screen.queryByPlaceholderText(
      /Add your note here.../i
    );
    expect(closedTextArea).not.toBeInTheDocument();
  });

  it("check for cartMenu component", async () => {
    const products = [
      { productId: 1, price: 10, quantity: 1 },
      { productId: 2, price: 20, quantity: 4 },
    ];

    setupCartWithProducts(products);

    renderWithProviders(<CartMenu setShowCart={() => {}} />, {
      store: mockStore,
    });

    await screen.findByText(/Proceed to Checkout/i);

    const checkoutButton = screen.getByText(/Proceed to Checkout/i);
    fireEvent.click(checkoutButton);

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith(`/checkout/1`);
    });
  });
});
