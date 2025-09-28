import type Pickr from "@simonwep/pickr";
import type { Layer } from "konva/lib/Layer";
import type { Shape } from "konva/lib/Shape";

export type Active = "shape" | "color" | "undo" | "fill" | "pencil" | "eraser";
export class Observer<State> {
    state: State;

    constructor(state:State) {
        this.state = state
    }
    subscribers = new Set<Function>();

    subscribe(fn: Function) {
        this.subscribers.add(fn);
    }

    unsubscribe(fn: Function) {
        this.subscribers.delete(fn);
    }

    notify() {
        this.subscribers.forEach((subscriber) => {
            subscriber(this.state);
        });
    }

    setActive(state: State) {
        this.state = state;
        this.notify();
    }
}

type Store = {
    layers: Layer[];
    selectedShape: null | Shape & { picker?: Pickr, dummy?:number };
};
export const store: Store = {
    layers: [],
    selectedShape: null
};
