import Konva from "konva";
import type { KonvaEventObject } from "konva/lib/Node";
import type { Shape } from "konva/lib/Shape";
import { deleteShape, group, unGroup } from "shapes/operations";
import {
    addToSelection,
    deselect,
    endSelection,
    moveSelection,
    removeFromSelection,
    startSelection,
} from "tools/select";
import { store } from "@/store/index";
import { EffectEntry } from "@/ui/sidebar/panels/effect-panel";
import {
    initializeShapeConfigRefs,
    shapeConfigRefs,
    updateShapeConfigUI,
} from "@/ui/toolbar/tools/shape";
import {
    selectionRectangleProvider,
    stageProvider,
    transformProvider,
} from "@/app/providers";
import type Pickr from "@simonwep/pickr";
import type { Circle } from "konva/lib/shapes/Circle";
import type { RegularPolygon } from "konva/lib/shapes/RegularPolygon";
import type { Star } from "konva/lib/shapes/Star";

document.addEventListener("load", function () {
    const shapeBtn = document.getElementById("shapes");
    if (shapeBtn) {
        const computedStyles = getComputedStyle(shapeBtn);
        shapeBtn.style.backgroundColor =
            computedStyles.getPropertyValue("--color-primary");
    }
});

window.addEventListener("keydown", function (e) {
    const ctrlPressed = e.ctrlKey;
    const shiftPressed = e.shiftKey;
    const gPressed = e.key === "g" || e.key === "G";
    const deletePressed = e.key.toLowerCase() === "delete";

    if (deletePressed) {
        deleteShape();
    }

    if (ctrlPressed && gPressed) {
        e.preventDefault();
        group();
    }

    if (ctrlPressed && shiftPressed && gPressed) {
        e.preventDefault();
        unGroup();
    }
});

export function bindStageEvents(stage: Konva.Stage) {
    stage.on("mousedown touchstart", (e) => {
        // do nothing if we mousedown on any shape
        if (e.target !== stage) {
            return;
        }
        startSelection(stage);
    });

    stage.on("mousemove touchmove", () => {
        // do nothing if we didn't start selection
        if (!store.selectionRectangle?.visible()) {
            return;
        }
        moveSelection(stage);
    });

    stage.on("mouseup touchend", () => {
        // do nothing if we didn't start selection
        if (!store.selectionRectangle?.visible()) {
            return;
        }
        // update visibility in timeout, so we can check it in click event
        setTimeout(() => {
            store.selectionRectangle?.visible(false);
        });

        endSelection(stage);
    });

    const shapeConfigMenu = document.getElementById("shape-config-menu");

    // clicks should select/deselect shapes
    stage.on(
        "click tap",
        function (e: KonvaEventObject<MouseEvent | TouchEvent>) {
            const shiftKey = e.evt.shiftKey;
            const ctrlKey = e.evt.ctrlKey;
            const metaKey = e.evt.metaKey;

            // if we are selecting with rect, do nothing
            if (
                store.selectionRectangle?.visible() &&
                store.selectionRectangle?.width() > 0 &&
                store.selectionRectangle?.height() > 0
            ) {
                return;
            }

            // if click on empty area - remove all selections
            if (e.target === stage) {
                deselect();
                return;
            }

            // do nothing if clicked NOT on our rectangles
            if (!e.target.hasName("shape")) {
                return;
            }

            // do we pressed shift or ctrl?
            const metaPressed = shiftKey || ctrlKey || metaKey;
            const tr = store.transformer;
            const isSelected = (tr?.nodes().indexOf(e.target) ?? -1) >= 0;

            if (!metaPressed && !isSelected) {
                // if no key pressed and the node is not selected
                // select just one
                const callback = () => {
                    store.selectedShape = e.target as Shape;
                    if (shapeConfigMenu) {
                        shapeConfigMenu.classList.replace("hidden", "block");
                    }
                    updateShapeConfigUI(e.target as Shape);
                };
                addToSelection([e.target as Shape], callback);
            } else if (metaPressed && isSelected) {
                // if we pressed keys and node was selected
                // we need to remove it from selection:
                removeFromSelection(e.target as Shape);
            } else if (metaPressed && !isSelected) {
                // add the node into selection
                addToSelection([e.target as Shape]);
            }
        }
    );
}

export function bindToDragEvents(shape: Shape) {
    shape.on("dragmove", () => {
        updateShapeConfigUI(shape, ["x", "y"]);
    });
}

export function bindShapeConfigRefs(refs: typeof shapeConfigRefs) {
    refs?.x?.addEventListener("change", function () {
        if (store.selectedShape) {
            const offsetLeft = store.selectedShape.width();
            store.selectedShape.x(parseInt(this.value) + offsetLeft);
        }
    });

    refs?.y?.addEventListener("change", function () {
    refs?.x?.addEventListener("change", function () {
        if (store.selectedShape) {
            store.selectedShape.x(parseInt(this.value));
        }
    });
    refs?.sides?.addEventListener("change", function () {
        if (store.selectedShape?.getClassName() === "RegularPolygon")
            (store.selectedShape as RegularPolygon)?.sides(
                parseInt(this.value)
            );
    });

    refs?.radius?.addEventListener("change", function () {
        if (store.selectedShape?.getClassName() === "RegularPolygon")
            (store.selectedShape as RegularPolygon)?.radius(
                parseInt(this.value)
            );
        if (store.selectedShape?.getClassName() === "Star")
            (store.selectedShape as Star)?.outerRadius(parseInt(this.value));
    });

    refs?.innerRadius?.addEventListener("change", function () {
        if (store.selectedShape?.getClassName() === "Star")
            (store.selectedShape as Star)?.innerRadius(parseInt(this.value));
    });

    refs?.vertices?.addEventListener("change", function () {
        if (store.selectedShape?.getClassName() === "Star")
            (store.selectedShape as Star)?.numPoints(parseInt(this.value));
    });

    refs?.width?.addEventListener("change", function () {
        if (store.selectedShape?.getClassName() === "Circle") {
            const radius = this.value;
            (store.selectedShape as Circle).radius(parseInt(radius));
            if (refs?.height) {
                refs.height.value = radius;
            }
        } else {
            store.selectedShape &&
                store.selectedShape.width(parseInt(this.value));
        }
    });

    refs?.height?.addEventListener("change", function () {
        if (store.selectedShape?.getClassName() === "Circle") {
            const radius = this.value;
            (store.selectedShape as Circle).radius(parseInt(radius));
            if (refs?.width) {
                refs.width.value = radius;
            }
        } else {
            store.selectedShape &&
                store.selectedShape.height(parseInt(this.value));
        }
    });
    refs?.stroke.width?.addEventListener("change", function () {
        if (store.selectedShape) {
            store.selectedShape.strokeWidth(parseInt(this.value));
        }
    });

    refs?.fill?.exists?.addEventListener("change", function () {
        if (store.selectedShape) {
            if (this.checked) {
                store.selectedShape.fillEnabled(true);
                const color = refs?.fill.color?.getColor().toRGBA().toString(); // as string value e.g '#fff'
                store.selectedShape.fill(color);
            } else {
                store.selectedShape.fillEnabled(false);
            }
        }

        document
            .querySelector(`label[for='${this.id}'] i`)
            ?.classList.toggle("bi-plus");
        document
            .querySelector(`label[for='${this.id}'] i`)
            ?.classList.toggle("bi-dash");
    });

    if (refs?.stroke.color) {
        refs.stroke.color?.on("save", function (color: Pickr.HSVaColor) {
            if (store.selectedShape) {
                store.selectedShape.stroke(color.toRGBA().toString());
            }
        });
    }

    if (refs?.fill) {
        refs?.fill?.color?.on("save", function (color: Pickr.HSVaColor) {
            if (store.selectedShape && refs.fill.exists?.checked) {
                store.selectedShape.fill(color.toRGBA().toString());
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    transformProvider();
    selectionRectangleProvider();

    const stage = stageProvider();
    bindStageEvents(stage);

    const addEffectButton = document.getElementById("add-effect");
    addEffectButton?.addEventListener("click", function () {
        const targetContainer = document.querySelector(`div:has(+#${this.id})`);
        if (targetContainer && targetContainer.childElementCount < 2) {
            const entry = EffectEntry({
                id: `effect-entry-${targetContainer.childElementCount}`,
            });
            targetContainer?.insertAdjacentElement("beforeend", entry);

            if (targetContainer.childElementCount === 2) {
                (addEffectButton as HTMLButtonElement).disabled = true;
            }
        }
    });

    initializeShapeConfigRefs();
});
