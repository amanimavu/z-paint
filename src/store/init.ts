import type { Store } from "types";

export function createStore() {
    const store: Store = {
        layers: [],
        selectedShape: null,
    };
    return store;
}
