import { Observer } from "lib/state-management";
import type { Tools } from "types";

function toggleShapeTools(state: Tools) {
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

function toggleColorTools(state: Tools) {
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

function togglePencilTools(state: Tools) {
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

function toggleUndoTools(state: Tools) {
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

function toggleEraseTools(state: Tools) {
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

function toggleFillTools(state: Tools) {
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

export function Toolbar() {
    return (
        <div class="pt-2 sticky top-0">
            <div class="flex justify-between px-4 gap-10">
                <div class="flex-17">
                    <img src="/brand.png" alt="brand" width={80} />
                </div>
                <div class="flex gap-x-5 tools flex-7">
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
