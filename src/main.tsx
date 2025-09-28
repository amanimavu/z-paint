import { pickerInit, storeObserver } from "./utilities/color-picker";
import type { Active } from "./utilities/state-management";
import { Observer, store } from "./utilities/state-management";

const app = <App />;
const root = document.getElementById("app");
root?.appendChild(app);
const { stage } = await import("./init");
const { create: createCircle } = await import("./utilities/shapes/circle");
const { create: createRectangle } = await import(
    "./utilities/shapes/rectangle"
);

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

const toolbarObserver = new Observer("shape");
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
            <div id="stage" class="min-h-full card shadow-2xl"></div>
        </div>
    );
}

function App() {
    return (
        <main class="h-screen">
            <Toolbar />
            <div class="flex gap-4 min-h-10/12">
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
                        const circleLayer = createCircle({
                            layer: store.layers[0],
                        });
                        if (store.layers[0] === undefined) {
                            store.layers[0] = circleLayer;
                        }
                        stage.add(circleLayer);
                    }}
                    style={{ fontSize: "36px" }}
                    class="cursor-pointer material-symbols-outlined"
                >
                    circle
                </button>
                <button
                    style={{ fontSize: "36px" }}
                    class="cursor-pointer material-symbols-outlined"
                    onClick={() => {
                        const circleLayer = createRectangle({
                            layer: store.layers[0],
                        });
                        if (store.layers[0] === undefined) {
                            store.layers[0] = circleLayer;
                        }
                        stage.add(circleLayer);
                    }}
                >
                    rectangle
                </button>
                <button
                    style={{ fontSize: "36px" }}
                    class="cursor-pointer material-symbols-outlined h-2"
                    onClick={() => {
                        const modal = document.getElementById(
                            "my_modal_1"
                        ) as HTMLDialogElement | null;
                        modal?.showModal();
                    }}
                >
                    pentagon
                </button>
                <dialog id="my_modal_1" class="modal">
                    <div class="modal-box">
                        <h3 class="text-lg font-bold">Polygon</h3>
                        <p class="py-4">
                            Press ESC key or click the button below to close
                        </p>
                        <div class="modal-action">
                            <form method="dialog">
                                <button class="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
                <button
                    style={{ fontSize: "36px" }}
                    class="cursor-pointer material-symbols-outlined"
                >
                    pen_size_2
                </button>
                <button
                    style={{ fontSize: "36px" }}
                    class="cursor-pointer material-symbols-outlined"
                >
                    star
                </button>
            </div>
            <section id="shape-config-menu" class="mt-6 invisible">
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
                        <label class="input input-sm w-3/9 my-1 py-1">
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
                        <div class="mt-1 w-3/9 h-10" id="stroke-color">
                            <div></div>
                        </div>
                        <label class="input input-sm w-3/9 my-1 py-1">
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
                    <div class="flex h-10 gap-1">
                        <div id="fill" class="w-3/9 h-full mt-1">
                            <div></div>
                        </div>
                        <input
                            type="checkbox"
                            hidden
                            checked
                            name="fill-toggle"
                            id="fill-toggle"
                        />
                        <label
                            for="fill-toggle"
                            class="border flex justify-center items-center mt-1 mb-1"
                        >
                            <i class="bi bi-plus text-2xl"></i>
                        </label>
                    </div>
                </div>
                <div class="divider my-0"></div>
                <div>
                    <h5 class="font-normal">effects</h5>
                    <div class="my-1"></div>
                    <button
                        id="add-effect"
                        class="btn btn-block btn-dash btn-sm"
                    >
                        <i class="bi bi-plus text-xl"></i>
                    </button>
                </div>
                <div class="divider my-0"></div>
            </section>
        </div>
    );
}

function EffectEntry({ id }: { id: string }) {
    return (
        <div id={id}>
            <div class="flex mb-2 gap-1.5 flex-wrap">
                <select
                    name="effect"
                    onInput={(e) => {
                        const effect = (e.target as HTMLSelectElement).value;
                        const shadowConfigs = document.querySelectorAll(
                            `#${id} .input, #${id} .color-picker, #${id} input[type='range']`
                        );
                        [...shadowConfigs].forEach((input) => {
                            switch (effect) {
                                case "shadow":
                                    if (store.selectedShape) {
                                        store.selectedShape.shadowEnabled(true);
                                    }
                                    input.classList.contains("shadow")
                                        ? input.classList.remove("hidden")
                                        : input.classList.add("hidden");
                                    if (
                                        document.querySelector(
                                            ".color-picker > div"
                                        )?.parentNode
                                    ) {
                                        const picker = pickerInit(
                                            `#${id} .color-picker > div`
                                        );
                                        if (store.selectedShape) {
                                            const shadowColor =
                                                store.selectedShape.shadowColor() ??
                                                "black";
                                            console.log(shadowColor);
                                            store.selectedShape.picker = picker;
                                            store.selectedShape.picker.setColor(
                                                shadowColor
                                            );
                                            storeObserver.notify();
                                        }
                                    }
                                    break;
                                case "opacity":
                                    input.classList.contains("opacity")
                                        ? input.classList.remove("hidden")
                                        : input.classList.add("hidden");
                            }
                        });
                    }}
                    class="select basis-2/5 select-sm"
                >
                    <option value={""} disabled selected>
                        Pick an effect
                    </option>
                    <option value="shadow">Shadow</option>
                    <option value="opacity">Opacity</option>
                </select>

                <input
                    name="shadow-opacity"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={store.selectedShape?.shadowOpacity() ?? "1"}
                    class="range range-sm hidden shadow basis-2/5"
                    onChange={(e) => {
                        const ratio = parseFloat(
                            (e.target as HTMLInputElement).value
                        );
                        store.selectedShape?.shadowOpacity(ratio);
                    }}
                />

                <div class="color-picker shadow hidden grow-1">
                    <div></div>
                </div>

                <label class="input basis-2/5 input-sm hidden shadow">
                    <span class="material-symbols-outlined opacity-50">
                        blur_on
                    </span>
                    <input
                        type="number"
                        name="shadow-blur"
                        value={store.selectedShape?.shadowBlur() ?? 2}
                        onChange={(e) => {
                            const blur = parseInt(
                                (e.target as HTMLInputElement).value
                            );
                            store.selectedShape?.shadowBlur(blur);
                            2;
                        }}
                    />
                </label>

                <label class="input basis-1/5 input-sm hidden shadow">
                    <span class="opacity-50">x</span>
                    <input
                        type="number"
                        name="shadow-offset-x"
                        value={store.selectedShape?.shadowOffsetX() ?? 2}
                        onChange={(e) => {
                            const offsetX = parseInt(
                                (e.target as HTMLInputElement).value
                            );
                            store.selectedShape?.shadowOffsetX(offsetX);
                        }}
                    />
                </label>

                <label class="input basis-1/5 input-sm hidden shadow">
                    <span class="opacity-50">y</span>
                    <input
                        type="number"
                        name="shadow-offset-y"
                        value={store.selectedShape?.shadowOffsetY() ?? 1}
                        onChange={(e) => {
                            const offsetY = parseInt(
                                (e.target as HTMLInputElement).value
                            );
                            store.selectedShape?.shadowOffsetY(offsetY);
                        }}
                    />
                </label>

                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={store.selectedShape?.opacity().toString() ?? "1"}
                    name="opacity-ratio"
                    onChange={(e) => {
                        const ratio = parseFloat(
                            (e.target as HTMLInputElement).value
                        );
                        store.selectedShape?.opacity(ratio);
                    }}
                    class="range range-sm hidden basis-2/5 opacity"
                />

                <button
                    onClick={function () {
                        const effectEntry = this.parentElement?.parentElement;
                        effectEntry && effectEntry.remove();
                        if (
                            effectEntry?.firstChild?.firstChild?.nodeType === 1
                        ) {
                            const effect = (
                                effectEntry?.firstChild
                                    ?.firstChild as HTMLInputElement
                            )?.value;

                            switch (effect) {
                                case "shadow":
                                    store.selectedShape?.shadowEnabled(false);
                                    break;
                                case "opacity":
                                    store.selectedShape?.opacity(1);
                                    break;
                            }
                        }
                    }}
                    class="ml-auto btn btn-error btn-outline btn-sm btn-1/5"
                >
                    <i class="bi bi-dash-lg"></i>
                </button>
            </div>
            <hr class="border-dashed my-3 opacity-25"></hr>
        </div>
    );
}

const addEffectButton = document.getElementById("add-effect");
addEffectButton?.addEventListener("click", function () {
    const targetContainer = document.querySelector(`div:has(+#${this.id})`);
    if (targetContainer && targetContainer.childElementCount < 2) {
        targetContainer?.insertAdjacentElement(
            "beforeend",
            <EffectEntry
                id={`effect-entry-${targetContainer.childElementCount}`}
            />
        );
    }
});

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
