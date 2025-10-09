import { store } from "@/store/index";
import type { Shape } from "konva/lib/Shape";
import type { ShapeConfigRefs } from "types";
import { create as createCircle } from "@/shapes/circle";
import { PropertyPanel } from "@/ui/sidebar/panels/property-panel";

export let shapeConfigRefs: ShapeConfigRefs = null;

export function initializeShapeConfigRefs() {
    const shapeConfigMenu = document.getElementById("shape-configs");
    if (shapeConfigMenu) {
        shapeConfigRefs = {
            x: shapeConfigMenu?.querySelector("#x-pos"),
            y: shapeConfigMenu?.querySelector("#y-pos"),
            width: shapeConfigMenu?.querySelector("#width"),
            height: shapeConfigMenu?.querySelector("#height"),
            stroke: {
                color: null,
                width: shapeConfigMenu?.querySelector("#stroke-width"),
            },
            fill: {
                color: null,
                exists: shapeConfigMenu?.querySelector("#fill-toggle"),
            },
        };
    }
    return shapeConfigRefs;
}

export function updateShapeConfigUI(shape: Shape) {
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

    if (shapeConfigRefs?.x) {
        shapeConfigRefs.x.value = `${x}`;
    }
    if (shapeConfigRefs?.y) {
        shapeConfigRefs.y.value = `${y}`;
    }
    if (shapeConfigRefs?.width) {
        shapeConfigRefs.width.value = `${width}`;
    }
    if (shapeConfigRefs?.height) {
        shapeConfigRefs.height.value = `${height}`;
    }

    if (shapeConfigRefs?.stroke.width) {
        shapeConfigRefs.stroke.width.value = `${strokeWidth}`;
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

export function ShapeTools() {
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
                        store.stage?.add(circleLayer);
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
                        // const circleLayer = createRectangle({
                        //     layer: store.layers[0],
                        // });
                        // if (store.layers[0] === undefined) {
                        //     store.layers[0] = circleLayer;
                        // }
                        // stage.add(circleLayer);
                    }}
                >
                    rectangle
                </button>
                <button
                    style={{ fontSize: "36px" }}
                    class="cursor-pointer material-symbols-outlined"
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
            <PropertyPanel />
        </div>
    );
}
