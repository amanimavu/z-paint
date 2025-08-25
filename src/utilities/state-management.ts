export type Active = "shape" | "color" | "undo" | "fill" | "pencil" | "eraser";
export class Observer {
    active: Active = "shape";
    subscribers = new Set<Function>();

    subscribe(fn: Function) {
        this.subscribers.add(fn);
    }

    unsubscribe(fn: Function) {
        this.subscribers.delete(fn);
    }

    notify() {
        this.subscribers.forEach((subscriber) => {
            subscriber(this.active);
        });
    }

    setActive(state: Active) {
        this.active = state;
        this.notify();
    }
}
