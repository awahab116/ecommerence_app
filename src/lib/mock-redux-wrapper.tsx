import React, { PropsWithChildren } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import mockStore, { MockRootState } from "./mock-store";
import { Cart } from "@/interfaces/cart.interface";

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: Partial<MockRootState>;
  store?: typeof mockStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = mockStore,
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

// "use client";

// import React from "react";
// import { Provider } from "react-redux";
// import { mockStore } from "./mock-store";

// export default function MockReduxWrapper({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return <Provider store={mockStore}>{children}</Provider>;
// }
