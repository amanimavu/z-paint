import type { Shape, ShapeConfig } from "konva/lib/Shape";
import { stage } from "../../init";
import { tr } from "./select-transform";
import { Observer, store } from "../state-management";
import type Pickr from "@simonwep/pickr";

export function getStageBound(x: number, y: number) {
    x = x < stage.width() ? Math.max(x, 0) : stage.width();
    y = y < stage.height() ? Math.max(y, 0) : stage.height();
    return { x, y };
}

type Input<T> = {
    x: T | null;
    y: T | null;
    width: T | null;
    height: T | null;
    stroke: {
        color: Pickr | null;
        width: T | null;
    };
    fill: {
        color: Pickr | null;
        exists: T | null;
    };
};

const shapeConfigMenu = document.getElementById("shape-configs");
export const shapeConfigInputs: Input<HTMLInputElement> | null = shapeConfigMenu
    ? {
          x: shapeConfigMenu.querySelector("#x-pos"),
          y: shapeConfigMenu.querySelector("#y-pos"),
          width: shapeConfigMenu.querySelector("#width"),
          height: shapeConfigMenu.querySelector("#height"),
          stroke: {
              color: null,
              width: shapeConfigMenu.querySelector("#stroke-width"),
          },
          fill: {
              color: null,
              exists: shapeConfigMenu.querySelector("#fill-toggle"),
          },
      }
    : null;

export const shapeConfigInputsObserver = new Observer(shapeConfigInputs);
shapeConfigInputsObserver.subscribe(hasStrokeColorPicker);
shapeConfigInputsObserver.subscribe(hasFillColorPicker);

export function displayAttributes(shape: Shape<ShapeConfig>) {
    const attributes = shape.attrs;
    const [
        strokeWidth,
        shadowBlur,
        shadowOffsetX,
        shadowOffsetY,
        shadowOpacity,
        shadowEnabled,
        opacity,
    ] = [
        attributes.strokeWidth ?? null,
        attributes.shadowBlur ?? null,
        attributes.shadowOffsetX ?? null,
        attributes.shadowOffsetY ?? null,
        attributes.shadowOpacity ?? null,
        attributes.shadowEnabled,
        attributes.opacity ?? null,
    ];
    const { x, y, width, height } = shape.getClientRect();

    if (shapeConfigInputs?.x) {
        shapeConfigInputs.x.value = `${x}`;
    }
    if (shapeConfigInputs?.y) {
        shapeConfigInputs.y.value = `${y}`;
    }
    if (shapeConfigInputs?.width) {
        shapeConfigInputs.width.value = `${width}`;
    }
    if (shapeConfigInputs?.height) {
        shapeConfigInputs.height.value = `${height}`;
    }

    if (shapeConfigInputs?.stroke.width) {
        shapeConfigInputs.stroke.width.value = `${strokeWidth}`;
    }

    const shadow = shadowEnabled;
    if (opacity || shadow) {
        const addEffectButton = document.getElementById("add-effect");
        //programmatically trigger click event for adding an effect
        const clickEvent = new Event("click", { bubbles: true });
        const inputEvent = new Event("input", { bubbles: true });

        if (opacity) {
            addEffectButton?.dispatchEvent(clickEvent);
            const effectSelector = document.querySelector<HTMLInputElement>(
                "div:has(+#add-effect) select"
            );
            if (effectSelector) {
                effectSelector.value = "opacity";
                effectSelector.dispatchEvent(inputEvent);
                const opacityInput = document.querySelector<HTMLInputElement>(
                    "div:has(+#add-effect) > div .opacity"
                );
                if (opacityInput) {
                    opacityInput.value = opacity;
                }
            }
        }

        if (shadow) {
            addEffectButton?.dispatchEvent(clickEvent);
            const effectEntries = document.querySelectorAll(
                "div:has(+#add-effect) > div"
            );
            const queryFactory = (inputName: string) => {
                return `input[name='${inputName}']`;
            };
            effectEntries.forEach((effectEntry) => {
                const effectSelector =
                    effectEntry.querySelector<HTMLInputElement>("select");
                if (effectSelector && !effectSelector.value) {
                    effectSelector.value = "shadow";
                    effectSelector.dispatchEvent(inputEvent);

                    const shadowOpacityInput =
                        effectEntry.querySelector<HTMLInputElement>(
                            queryFactory("shadow-opacity")
                        );
                    if (shadowOpacityInput) {
                        console.log;
                        shadowOpacityInput.value = shadowOpacity;
                    }

                    const shadowBlurInput =
                        effectEntry.querySelector<HTMLInputElement>(
                            queryFactory("shadow-blur")
                        );
                    if (shadowBlurInput) {
                        shadowBlurInput.value = shadowBlur;
                    }

                    const shadowOffsetXInput =
                        effectEntry.querySelector<HTMLInputElement>(
                            queryFactory("shadow-offset-x")
                        );
                    if (shadowOffsetXInput) {
                        shadowOffsetXInput.value = shadowOffsetX;
                    }

                    const shadowOffsetYInput =
                        effectEntry.querySelector<HTMLInputElement>(
                            queryFactory("shadow-offset-y")
                        );
                    if (shadowOffsetYInput) {
                        shadowOffsetYInput.value = shadowOffsetY;
                    }
                }
            });
        }
    }
}

shapeConfigInputs?.x?.addEventListener("change", function () {
    if (tr.nodes().length === 1) {
        if (store.selectedShape) {
            const offsetLeft = store.selectedShape.width();
            store.selectedShape.x(parseInt(this.value) + offsetLeft);
        }
    }
});

shapeConfigInputs?.y?.addEventListener("change", function () {
    if (tr.nodes().length === 1) {
        if (store.selectedShape) {
            store.selectedShape.y(parseInt(this.value));
        }
    }
});

shapeConfigInputs?.width?.addEventListener("change", function () {
    if (tr.nodes().length === 1) {
        if (store.selectedShape) {
            store.selectedShape.width(parseInt(this.value));
        }
        if (store.selectedShape?.getClassName().toLowerCase() === "circle") {
            const height = store.selectedShape.height().toString();
            if (shapeConfigInputs.height) {
                shapeConfigInputs.height.value = height;
            }
        }
    }
});

shapeConfigInputs?.height?.addEventListener("change", function () {
    if (tr.nodes().length === 1) {
        if (store.selectedShape) {
            store.selectedShape.height(parseInt(this.value));
        }
        if (store.selectedShape?.getClassName().toLowerCase() === "circle") {
            const width = store.selectedShape.width().toString();
            if (shapeConfigInputs.width) {
                shapeConfigInputs.width.value = width;
            }
        }
    }
});

shapeConfigInputs?.stroke.width?.addEventListener("change", function () {
    if (tr.nodes().length === 1) {
        if (store.selectedShape) {
            store.selectedShape.strokeWidth(parseInt(this.value));
        }
    }
});

function hasStrokeColorPicker(state: typeof shapeConfigInputs) {
    if (state?.stroke.color) {
        shapeConfigInputs?.stroke.color?.on(
            "save",
            function (color: Pickr.HSVaColor) {
                if (tr.nodes().length === 1) {
                    if (store.selectedShape) {
                        store.selectedShape.stroke(color.toRGBA().toString());
                    }
                }
            }
        );
    }
}

function hasFillColorPicker(state: typeof shapeConfigInputs) {
    if (state?.fill) {
        shapeConfigInputs?.fill?.color?.on(
            "save",
            function (color: Pickr.HSVaColor) {
                if (tr.nodes().length === 1) {
                    if (
                        store.selectedShape &&
                        shapeConfigInputs.fill.exists?.checked
                    ) {
                        store.selectedShape.fill(color.toRGBA().toString());
                    }
                }
            }
        );
    }
}

shapeConfigInputs?.fill?.exists?.addEventListener("change", function () {
    if (tr.nodes().length === 1) {
        if (store.selectedShape) {
            store.selectedShape.fill(
                this.checked
                    ? shapeConfigInputs.fill.color
                          ?.getColor()
                          .toRGBA()
                          .toString()
                    : undefined
            );
        }
    }

    document
        .querySelector(`label[for='${this.id}'] i`)
        ?.classList.toggle("bi-plus");
    document
        .querySelector(`label[for='${this.id}'] i`)
        ?.classList.toggle("bi-dash");
});
