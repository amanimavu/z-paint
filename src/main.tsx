import type { Layer } from "konva/lib/Layer";
import type { Active } from "./utilities/state-management";
import { Observer } from "./utilities/state-management";
import "./style.css";

const app = <App />;
const root = document.getElementById("app");
root?.appendChild(app);
const { stage } = await import("./init");
const { create: createCircle } = await import("./utilities/shapes/circle");
export const layers: Layer[] = [];

document.addEventListener("load", function () {
    const shapeBtn = document.getElementById("shapes");
    if (shapeBtn) {
        const computedStyles = getComputedStyle(shapeBtn);
        shapeBtn.style.backgroundColor =
            computedStyles.getPropertyValue("--color-primary");
    }
});

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

const toolbarObserver = new Observer();
toolbarObserver.subscribe(toggleColorTools);
toolbarObserver.subscribe(toggleShapeTools);
toolbarObserver.subscribe(togglePencilTools);
toolbarObserver.subscribe(toggleUndoTools);
toolbarObserver.subscribe(toggleEraseTools);
toolbarObserver.subscribe(toggleFillTools);

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
                                    toolbarObserver.setActive("shape")
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
                                    toolbarObserver.setActive("undo")
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
                                    toolbarObserver.setActive("eraser")
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
                                    toolbarObserver.setActive("pencil")
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
                                    toolbarObserver.setActive("color")
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
                                    toolbarObserver.setActive("fill")
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
                <button class="cursor-pointer w-9 aspect-square rounded-full bg-red-600"></button>
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
            <div class="flex flex-wrap gap-x-12 gap-y-6 my-2">
                <button
                    onClick={() => {
                        const circleLayer = createCircle({ layer: layers[0] });
                        if (layers[0] === undefined) {
                            layers[0] = circleLayer;
                        }
                        stage.add(circleLayer);
                    }}
                    class="cursor-pointer text-2xl bi bi-circle"
                ></button>
                <button class="cursor-pointer text-2xl bi bi-triangle"></button>
                <button class="cursor-pointer text-2xl bi bi-square"></button>
                <button class="cursor-pointer text-2xl bi bi-pentagon"></button>
                <button class="cursor-pointer text-2xl bi bi-slash-lg"></button>
                <button class="cursor-pointer text-2xl bi bi-star"></button>
            </div>
            <section class="mt-6">
                <div class="divider my-0"></div>
                <div>
                    <h5 class="font-normal">positions</h5>
                    <div class="flex justify-between gap-10">
                        <label class="input input-sm validator w-3/9 my-1 py-1">
                            <span class="font-bold opacity-40 mr-2">x</span>
                            <input
                                name="x-pos"
                                id="x-pos"
                                type="number"
                                class="w-full"
                                min={0}
                            />
                        </label>
                        <label class="input input-sm validator w-3/9 my-1 py-1">
                            <span class="font-bold opacity-40 mr-2">y</span>
                            <input
                                name="y-pos"
                                id="y-pos"
                                type="number"
                                class="w-full"
                                min={0}
                            />
                        </label>
                    </div>
                </div>
                <div class="divider my-0"></div>
                <div>
                    <h5 class="font-normal">dimensions</h5>
                    <div class="flex justify-between gap-10">
                        <label class="input input-sm validator w-3/9 my-1 py-1">
                            <span class="font-bold opacity-40 mr-2">w</span>
                            <input
                                name="width"
                                id="width"
                                type="number"
                                class="w-full"
                                min={0}
                            />
                        </label>
                        <label class="input input-sm validator w-3/9 my-1 py-1">
                            <span class="font-bold opacity-40 mr-2">h</span>
                            <input
                                name="height"
                                id="height"
                                type="number"
                                class="w-full"
                                min={0}
                            />
                        </label>
                    </div>
                </div>
                <div class="divider my-0"></div>
                <div>
                    <h5 class="font-normal">stroke</h5>
                    <div class="flex justify-between">
                        <input
                            type="color"
                            class="m-0 w-3/9 h-10"
                            name="stroke-color"
                            id="stroke-color"
                        />
                        <label class="input input-sm validator w-3/9 my-1 py-1">
                            <i class="bi bi-border-width opacity-40 mr-2"></i>
                            <input
                                name="stroke-width"
                                id="stroke-width"
                                type="number"
                                class="w-full"
                                min={0}
                            />
                        </label>
                    </div>
                </div>
                <div class="divider my-0"></div>
                <div>
                    <h5 class="font-normal">fill</h5>
                    <input
                        type="color"
                        name="fill"
                        id="fill"
                        class="h-10 w-3/9"
                    />
                </div>
                <div class="divider my-0"></div>
                <div>
                    <h5 class="font-normal">effects</h5>
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
