import "./style.css";

const app = <App />;
const root = document.getElementById("app");
root?.appendChild(app);
const { stage } = await import("./init");
const { create: createCircle } = await import("./utilities/shapes/circle");

type Active = "shape" | "color" | "undo" | "fill" | "pencil" | "eraser";

function toggleShapeTools(state: Active) {
    const shapeTools = document.getElementById("shape-configs");
    const shapeBtn = document.getElementById("shapes");

    if (shapeTools) {
        const computedStyles = getComputedStyle(shapeTools);
        if (state === "shape") {
            shapeTools.style.display = "flex";
            if (shapeBtn)
                shapeBtn.style.backgroundColor =
                    computedStyles.getPropertyValue("--color-primary");
        } else {
            shapeTools.style.display = "none";
            if (shapeBtn)
                shapeBtn.style.backgroundColor =
                    computedStyles.getPropertyValue("--color-base-100");
        }
    }
}

function toggleColorTools(state: Active) {
    const colorTools = document.getElementById("color-configs");
    const paintBtn = document.getElementById("paint");

    if (colorTools) {
        const computedStyles = getComputedStyle(colorTools);
        if (state === "color") {
            colorTools.style.display = "flex";
            if (paintBtn)
                paintBtn.style.backgroundColor =
                    computedStyles.getPropertyValue("--color-primary");
        } else {
            colorTools.style.display = "none";
            if (paintBtn)
                paintBtn.style.backgroundColor =
                    computedStyles.getPropertyValue("--color-base-100");
        }
    }
}

function togglePencilTools(state: Active) {
    const pencilTools = document.getElementById("pencil-configs");
    const pencilBtn = document.getElementById("pencil");

    if (pencilTools) {
        const computedStyles = getComputedStyle(pencilTools);
        if (state === "pencil") {
            pencilTools.style.display = "flex";
            if (pencilBtn)
                pencilBtn.style.backgroundColor =
                    computedStyles.getPropertyValue("--color-primary");
        } else {
            pencilTools.style.display = "none";
            if (pencilBtn)
                pencilBtn.style.backgroundColor =
                    computedStyles.getPropertyValue("--color-base-100");
        }
    }
}

function toggleUndoTools(state: Active) {
    const undoTools = document.getElementById("undo-configs");
    const undoBtn = document.getElementById("undo");

    if (undoTools) {
        const computedStyles = getComputedStyle(undoTools);
        if (state === "undo") {
            undoTools.style.display = "flex";
            if (undoBtn)
                undoBtn.style.backgroundColor =
                    computedStyles.getPropertyValue("--color-primary");
        } else {
            undoTools.style.display = "none";
            if (undoBtn)
                undoBtn.style.backgroundColor =
                    computedStyles.getPropertyValue("--color-base-100");
        }
    }
}

function toggleEraseTools(state: Active) {
    const eraserTools = document.getElementById("eraser-configs");
    const eraserBtn = document.getElementById("eraser");

    if (eraserTools) {
        const computedStyles = getComputedStyle(eraserTools);
        if (state === "eraser") {
            eraserTools.style.display = "flex";
            if (eraserBtn)
                eraserBtn.style.backgroundColor =
                    computedStyles.getPropertyValue("--color-primary");
        } else {
            eraserTools.style.display = "none";
            if (eraserBtn)
                eraserBtn.style.backgroundColor =
                    computedStyles.getPropertyValue("--color-base-100");
        }
    }
}

function toggleFillTools(state: Active) {
    const fillTools = document.getElementById("fill-configs");
    const fillBtn = document.getElementById("fill");

    if (fillTools) {
        const computedStyles = getComputedStyle(fillTools);
        if (state === "fill") {
            fillTools.style.display = "flex";
            if (fillBtn)
                fillBtn.style.backgroundColor =
                    computedStyles.getPropertyValue("--color-primary");
        } else {
            fillTools.style.display = "none";
            if (fillBtn)
                fillBtn.style.backgroundColor =
                    computedStyles.getPropertyValue("--color-base-100");
        }
    }
}

class ToolbarPublisher {
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

const toolbarPublisher = new ToolbarPublisher();
toolbarPublisher.subscribe(toggleColorTools);
toolbarPublisher.subscribe(toggleShapeTools);
toolbarPublisher.subscribe(togglePencilTools);
toolbarPublisher.subscribe(toggleUndoTools);
toolbarPublisher.subscribe(toggleEraseTools);
toolbarPublisher.subscribe(toggleFillTools);

function Toolbar() {
    return (
        <div class="pt-2">
            <div class="flex justify-between px-4">
                <img src="/brand.png" alt="brand" width={80} />
                <div class="flex gap-x-4 tools">
                    <div class="tooltip tooltip-bottom" data-tip="shapes">
                        <div class="flex flex-col align-middle text-center gap-y-1">
                            <p class="text-xs text-zinc-400">ctrl + s</p>
                            <button
                                id="shapes"
                                onClick={() =>
                                    toolbarPublisher.setActive("shape")
                                }
                                class="btn btn-soft bg-primary"
                            >
                                <img src="/shapes.svg" />
                            </button>
                        </div>
                    </div>
                    <div class="tooltip tooltip-bottom" data-tip="undo">
                        <div class="flex flex-col align-middle text-center gap-y-1">
                            <p class="text-xs text-zinc-400">ctrl + z</p>
                            <button
                                id="undo"
                                onClick={() =>
                                    toolbarPublisher.setActive("undo")
                                }
                                class="btn btn-soft"
                            >
                                <i class="bi bi-arrow-counterclockwise text-xl"></i>
                            </button>
                        </div>
                    </div>
                    <div class="tooltip tooltip-bottom" data-tip="eraser">
                        <div class="flex flex-col align-middle text-center gap-y-1">
                            <p class="text-xs text-zinc-400">ctrl + e</p>
                            <button
                                id="eraser"
                                onClick={() =>
                                    toolbarPublisher.setActive("eraser")
                                }
                                class="btn btn-soft"
                            >
                                <i class="bi bi-eraser text-xl"></i>
                            </button>
                        </div>
                    </div>
                    <div class="tooltip tooltip-bottom" data-tip="pencil">
                        <div class="flex flex-col align-middle text-center gap-y-1">
                            <p class="text-xs text-zinc-400">ctrl + a</p>
                            <button
                                onClick={() =>
                                    toolbarPublisher.setActive("pencil")
                                }
                                id="pencil"
                                class="btn btn-soft"
                            >
                                <i class="bi bi-pencil text-xl"></i>
                            </button>
                        </div>
                    </div>
                    <div class="tooltip tooltip-bottom" data-tip="paint">
                        <div class="flex flex-col align-middle text-center gap-y-1">
                            <p class="text-xs text-zinc-400">ctrl + p</p>
                            <button
                                onClick={() =>
                                    toolbarPublisher.setActive("color")
                                }
                                id="paint"
                                class="btn btn-soft"
                            >
                                <i class="bi bi-palette text-xl"></i>
                            </button>
                        </div>
                    </div>
                    <div class="tooltip tooltip-bottom" data-tip="fill">
                        <div class="flex flex-col align-middle text-center gap-y-1">
                            <p class="text-xs text-zinc-400">ctrl + f</p>
                            <button
                                onClick={() =>
                                    toolbarPublisher.setActive("fill")
                                }
                                id="fill"
                                class="btn btn-soft"
                            >
                                <i class="bi bi-paint-bucket text-xl"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="divider my-2"></div>
        </div>
    );
}

function Stage() {
    return (
        <div class="flex-10 p-2">
            <div id="stage" class="h-full card shadow-2xl"></div>
        </div>
    );
}

function App() {
    return (
        <main class="h-screen">
            <Toolbar />
            <div class="flex gap-4 h-10/12">
                <Stage />
                <SideToolbar />
            </div>
        </main>
    );
}

function ColorTools() {
    return (
        <div id="color-configs" class="flex-col mb-4 hidden">
            <h4 class="text-xl font-medium">Colors</h4>
            <div class="flex flex-wrap gap-x-12 gap-y-6 my-2 w-3/4">
                <button class="cursor-pointer w-9 aspect-square rounded-full bg-red-600 focus:border"></button>
                <button class="cursor-pointer w-9 aspect-square rounded-full bg-red-600"></button>
                <button class="cursor-pointer w-9 aspect-square rounded-full bg-red-600"></button>
                <button class="cursor-pointer w-9 aspect-square rounded-full bg-red-600"></button>
                <button class="cursor-pointer w-9 aspect-square rounded-full bg-red-600"></button>
                <button class="cursor-pointer w-9 aspect-square rounded-full bg-red-600"></button>
                <button class="cursor-pointer w-9 aspect-square rounded-full bg-red-600"></button>
            </div>
        </div>
    );
}

function ShapeTools() {
    return (
        <div id="shape-configs" class="flex-col mb-4 flex">
            <h4 class="text-xl font-medium">Shapes</h4>
            <div class="flex flex-wrap gap-x-12 gap-y-6 my-2 w-3/4">
                <button
                    onClick={() => {
                        const circleLayer = createCircle();
                        stage.add(circleLayer);
                    }}
                    class="cursor-pointer text-4xl bi bi-circle"
                ></button>
                <button class="cursor-pointer text-4xl bi bi-triangle"></button>
                <button class="cursor-pointer text-4xl bi bi-square"></button>
                <button class="cursor-pointer text-4xl bi bi-pentagon"></button>
                <button class="cursor-pointer text-4xl bi bi-slash-lg"></button>
                <button class="cursor-pointer text-4xl bi bi-star"></button>
            </div>
            <section class="mt-6">
                <div class="divider my-0"></div>
                <div>
                    <h5 class="font-medium">Stroke</h5>
                    <div class="flex justify-between">
                        <input type="color" class="h-10 w-25 m-0" />
                        <label class="input validator w-35 h-8 m-1 rounded-none">
                            <i class="bi border-none bi-border-width"></i>
                            <input type="number" class="input" />
                        </label>
                    </div>
                </div>
                <div class="divider my-0"></div>
                <div>
                    <h5 class="font-medium">Fill</h5>
                    <input type="color" class="h-10 w-25 m-0" />
                </div>
                <div class="divider my-0"></div>
                <div>
                    <h5 class="font-medium">Effects</h5>
                </div>
                <div class="divider my-0"></div>
            </section>
        </div>
    );
}

function PencilTools() {
    return (
        <div id="pencil-configs" class="flex-col mb-4 hidden">
            <h4 class="text-xl font-medium">Pencil</h4>
            <div class="flex flex-wrap gap-x-12 gap-y-6 my-2 w-3/4"></div>
        </div>
    );
}

function EraserTools() {
    return (
        <div id="eraser-configs" class="flex-col mb-4 hidden">
            <h4 class="text-xl font-medium">Eraser</h4>
            <div class="flex flex-wrap gap-x-12 gap-y-6 my-2 w-3/4"></div>
        </div>
    );
}

function FillTools() {
    return (
        <div id="fill-configs" class="flex-col mb-4 hidden">
            <h4 class="text-xl font-medium">Fill</h4>
            <div class="flex flex-wrap gap-x-12 gap-y-6 my-2 w-3/4"></div>
        </div>
    );
}

function UndoTools() {
    return (
        <div id="undo-configs" class="flex-col mb-4 hidden">
            <h4 class="text-xl font-medium">Undo</h4>
            <div class="flex flex-wrap gap-x-12 gap-y-6 my-2 w-3/4"></div>
        </div>
    );
}

function SideToolbar() {
    return (
        <div class="flex-4">
            <div class="card p-2 min-h-full overflow-auto">
                <ShapeTools />
                <ColorTools />
                <PencilTools />
                <EraserTools />
                <FillTools />
                <UndoTools />
            </div>
        </div>
    );
}
