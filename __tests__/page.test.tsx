import React from "react";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { renderWithProviders } from "@/lib/mock-redux-wrapper";
import Product from "@/components/product";
import { server } from "../mocks/server";

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

jest.setTimeout(100000);

test("fetches product details", async () => {
  renderWithProviders(<Product productId={1} />);

  expect(screen.getByText(/Loading/i)).toBeInTheDocument();

  await waitFor(() => new Promise((resolve) => setTimeout(resolve, 500)));

  await waitFor(() =>
    expect(screen.getByText(/new Jeans/i)).toBeInTheDocument()
  );

  screen.debug();
});
