import React from "react";
import { screen, waitFor } from "@testing-library/react";
import Cart from "../src/components/cart";
import { renderWithProviders } from "@/lib/mock-redux-wrapper";
import mockStore, { MockAppDispatch } from "../src/lib/mock-store";
import { addProduct, resetCart } from "@/provider/redux/cartSlice"; // Import your action creator
import { useRouter } from "next/navigation";
import { useGetProductByIdQuery } from "../src/provider/redux/query";
import { server } from "../mocks/server";

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

jest.setTimeout(100000);

// jest.mock("../src/provider/redux/query", () => ({
//   useGetProductByIdQuery: jest.fn(),
// }));

// import { useAddOrderMutation } from "@/provider/redux/mutation";

// jest.mock("../src/provider/redux/mutation", () => ({
//   useAddOrderMutation: jest.fn(),
// }));

jest.mock("next/navigation", () => ({
  //   useRouter() {
  //     return {
  //       prefetch: () => null,
  //     };
  //   },
  useRouter: jest.fn(),
}));

describe("Check if order is created", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
  });

  afterEach(() => {
    const dispatch = mockStore.dispatch;
    dispatch(resetCart());
    jest.clearAllMocks();
  });

  it("check if cart items are rendered", async () => {
    const product1 = { productId: 1, price: 10, quantity: 1 };
    const product2 = { productId: 2, price: 20, quantity: 4 };

    const dispatch: MockAppDispatch = mockStore.dispatch;

    waitFor(() => {
      dispatch(addProduct(product1));
      dispatch(addProduct(product2));
    });

    renderWithProviders(<Cart />, { store: mockStore });

    await screen.findByText(/Proceed to Checkout/i);

    const checkoutButton = screen.getByText(/Proceed to Checkout/i);
    expect(checkoutButton).toBeInTheDocument();

    const product1Title = screen.getByText(/Test Product 1/i);
    const product2Title = screen.getByText(/Test Product 2/i);

    expect(product1Title).toBeInTheDocument();
    expect(product2Title).toBeInTheDocument();
  });

  it("check if order is created when checkout button is clicked", async () => {
    const product1 = { productId: 1, price: 10, quantity: 1 };
    const product2 = { productId: 2, price: 20, quantity: 4 };

    const dispatch: MockAppDispatch = mockStore.dispatch;
    dispatch(addProduct(product1));
    dispatch(addProduct(product2));

    renderWithProviders(<Cart />, { store: mockStore });

    await screen.findByText(/Proceed to Checkout/i);

    const checkoutButton = screen.getByText(/Proceed to Checkout/i);

    checkoutButton.click();

    //check if order is created
    await waitFor(() => {
      expect(mockStore.getState().cart.products).toHaveLength(0);
    });

    screen.debug();
  });
});
