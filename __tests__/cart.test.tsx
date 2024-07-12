import React from "react";
import { screen } from "@testing-library/react";
import Cart from "../src/components/cart";
import { renderWithProviders } from "@/lib/mock-redux-wrapper";
import mockStore, { MockAppDispatch } from "../src/lib/mock-store";
import { addProduct, resetCart } from "@/provider/redux/cartSlice"; // Import your action creator

import { useRouter } from "next/navigation";

import { useGetProductByIdQuery } from "../src/provider/redux/query";

jest.mock("../src/provider/redux/query", () => ({
  useGetProductByIdQuery: jest.fn(),
}));

import { useAddOrderMutation } from "@/provider/redux/mutation";

jest.mock("../src/provider/redux/mutation", () => ({
  useAddOrderMutation: jest.fn(),
}));

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
    (useGetProductByIdQuery as jest.Mock).mockImplementation((id: number) => {
      let productData = {};

      switch (id) {
        case 1:
          productData = {
            id,
            title: "Test Product 1",
            description: "Description for Product 1",
            price: 10,
            image:
              "https://images.pexels.com/photos/52518/jeans-pants-blue-shop-52518.jpeg",
            category: "clothes",
          };
          break;
        case 2:
          productData = {
            id,
            title: "Test Product 2",
            description: "Description for Product 2",
            price: 20,
            image:
              "https://images.pexels.com/photos/52518/jeans-pants-blue-shop-52518.jpeg",
            category: "electronics",
          };
          break;
        default:
          productData = {
            id,
            title: `Unknown Product ${id}`,
            description: "Unknown product",
            price: 1,
            image:
              "https://images.pexels.com/photos/52518/jeans-pants-blue-shop-52518.jpeg",
            category: "unknown",
          };
      }

      return {
        data: productData,
        isLoading: false,
        isError: false,
      };
    });

    (useAddOrderMutation as jest.Mock).mockReturnValue([
      jest.fn(() => ({
        unwrap: jest
          .fn()
          .mockResolvedValue({ id: 123, message: "order created" }),
        //router.push: jest.fn(),
      })),
      { isError: false, isLoading: false },
    ]);
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    });
  });

  afterEach(() => {
    const dispatch = mockStore.dispatch;
    dispatch(resetCart());
    jest.clearAllMocks();
  });

  it("check if cart items are correctly rendered", async () => {
    const product1 = { productId: 1, price: 10, quantity: 1 };
    const product2 = { productId: 2, price: 20, quantity: 4 };

    const dispatch: MockAppDispatch = mockStore.dispatch;
    dispatch(addProduct(product1));
    dispatch(addProduct(product2));

    renderWithProviders(<Cart />, { store: mockStore });

    await screen.findByText(/Proceed to Checkout/i);

    const checkoutButton = screen.getByText(/Proceed to Checkout/i);

    expect(checkoutButton).toBeInTheDocument();

    const product1Title = screen.getByText(/Test Product 1/i);
    const product2Title = screen.getByText(/Test Product 2/i);

    expect(product1Title).toBeInTheDocument();
    expect(product2Title).toBeInTheDocument();

    // screen.debug();
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

    expect(useAddOrderMutation).toHaveBeenCalled();

    screen.debug();
  });
});
