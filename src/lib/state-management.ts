export class Observer<State> {
    state: State;

    constructor(state: State) {
        this.state = state;
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
