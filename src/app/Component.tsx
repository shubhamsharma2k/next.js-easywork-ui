"use client";

import { store } from "@/store/config";
import { StoreProvider } from "easy-peasy";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function Component({ children }: any) {
	return (
		<QueryClientProvider client={queryClient}>
			<StoreProvider store={store}>{children}</StoreProvider>
		</QueryClientProvider>
	);
}
