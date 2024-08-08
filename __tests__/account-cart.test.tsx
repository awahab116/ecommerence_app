import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import AccountAndCart from "../src/components/accountCart";
import { renderWithProviders } from "@/lib/mock-redux-wrapper";
import mockStore, { MockAppDispatch } from "../src/lib/mock-store";
import { addProduct, resetCart } from "@/provider/redux/cartSlice";
import { useRouter, usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

jest.setTimeout(1000);

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
  signOut: jest.fn(), // Mock the signOut function
}));

const setupCartWithProducts = (
  products: { productId: number; price: number; quantity: number }[]
) => {
  const dispatch: MockAppDispatch = mockStore.dispatch;
  products.forEach((product) => dispatch(addProduct(product)));
};

describe("AccountAndCart test suite", () => {
  let push: any;
  let signOutMock: jest.Mock;

  beforeEach(() => {
    push = jest.fn();
    signOutMock = signOut as jest.Mock;
    (useRouter as jest.Mock).mockReturnValue({
      push,
    });
  });

  it("check if account and cart are rendered", () => {
    (usePathname as jest.Mock).mockReturnValue("/login");
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: "unauthenticated",
    });

    renderWithProviders(<AccountAndCart />, { store: mockStore });

    expect(screen.getByText(/Account/i)).toBeInTheDocument();
    expect(screen.getByText(/Cart/i)).toBeInTheDocument();
  });

  it("check if cart is empty", () => {
    (usePathname as jest.Mock).mockReturnValue("/login");
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: "unauthenticated",
    });

    renderWithProviders(<AccountAndCart />, { store: mockStore });

    expect(screen.getByText(/Account/i)).toBeInTheDocument();
    expect(screen.getByText(/Cart/i)).toBeInTheDocument();
  });

  it("click on Cart and check if it redirects to /cart", () => {
    (usePathname as jest.Mock).mockReturnValue("/login");
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: "unauthenticated",
    });

    renderWithProviders(<AccountAndCart />, { store: mockStore });

    fireEvent.click(screen.getByText(/Cart/i));

    expect(push).toHaveBeenCalledWith("/cart");
  });

  it("click on cart it shows X Close", () => {
    (usePathname as jest.Mock).mockReturnValue("/login");
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: "unauthenticated",
    });

    const products = [
      { productId: 1, price: 10, quantity: 1 },
      { productId: 2, price: 20, quantity: 4 },
    ];

    setupCartWithProducts(products);

    renderWithProviders(<AccountAndCart />, { store: mockStore });

    fireEvent.click(screen.getByText(/Cart/i));

    expect(screen.getByText(/X Close/i)).toBeInTheDocument();
  });

  it("check if signin is rendered", () => {
    (usePathname as jest.Mock).mockReturnValue("/");
    (useSession as jest.Mock).mockReturnValue({
      data: null,
      status: "unauthenticated",
    });

    renderWithProviders(<AccountAndCart />, { store: mockStore });

    screen.debug();
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
  });

  it("check if signout is rendered when user is authenticated", () => {
    (usePathname as jest.Mock).mockReturnValue("/product-details/1");
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { name: "Test User" } },
      status: "authenticated",
    });

    renderWithProviders(<AccountAndCart />, { store: mockStore });

    expect(screen.getByText(/Sign Out/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Sign Out/i));

    expect(signOutMock).toHaveBeenCalledWith({ callbackUrl: "/login" });
  });
});
