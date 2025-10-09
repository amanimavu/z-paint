import { storeProvider } from "@/app/providers";
import { Observer } from "@/lib/state-management";

export const store = storeProvider();

export const storeObserver = new Observer(store);
