"use client";

import { persistor, store } from "@/utils/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
