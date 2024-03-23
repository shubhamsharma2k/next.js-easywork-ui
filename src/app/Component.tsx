"use client";

import { store } from "@/store/config";
import { StoreProvider } from "easy-peasy";

export default function Component({ children }: any) {
  return <StoreProvider store={store}>{children}</StoreProvider>;
}
