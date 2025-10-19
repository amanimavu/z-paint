import { store } from "@/store/index";
import type { Shape } from "konva/lib/Shape";
import type { ShapeConfigRefs } from "types";
import { create as createCircle } from "@/shapes/circle";
import { create as createRectangle } from "@/shapes/rectangle";
import { create as createPolygon } from "@/shapes/polygon";
import { create as createStar } from "@/shapes/star";
import { PropertyPanel } from "@/ui/sidebar/panels/property-panel";
import { pickerInit } from "@/ui/color-picker";
import { bindShapeConfigRefs } from "@/app/events";

export let shapeConfigRefs: ShapeConfigRefs = null;

/**
 * Initialize and cache references to shape configuration controls found under the DOM element with id "shape-configs".
 *
 * @returns The populated `ShapeConfigRefs` object containing references to inputs (or `null` if the "shape-configs" element is not present)
 */
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
            radius: shapeConfigMenu?.querySelector("#radius"),
            innerRadius: shapeConfigMenu?.querySelector("#inner-radius"),
            sides: shapeConfigMenu?.querySelector("#sides"),
            vertices: shapeConfigMenu?.querySelector("#vertices"),
        };
    }
    return shapeConfigRefs;
}

type targetOptions =
    | "x"
    | "y"
    | "width"
    | "height"
    | "stroke"
    | "fill"
    | "sides"
    | "radius"
    | "innerRadius"
    | "vertices";
/**
 * Populate the shape configuration UI controls with values taken from a given Shape.
 *
 * Updates only the configuration fields listed in `targets`; when `targets` is omitted, updates position, size, stroke, fill, radius, sides, innerRadius, and vertices. This will also initialize stroke and fill color pickers when those targets are included.
 *
 * @param shape - The Konva `Shape` whose attributes are read to populate the UI controls
 * @param targets - Optional list of specific configuration fields to update (allowed values: `"x"`, `"y"`, `"width"`, `"height"`, `"stroke"`, `"fill"`, `"sides"`, `"radius"`, `"innerRadius"`, `"vertices"`). If omitted, a comprehensive default set is used.
 */
export function updateShapeConfigUI(shape: Shape, targets?: targetOptions[]) {
    targets = targets ?? [
        "x",
        "y",
        "width",
        "height",
        "stroke",
        "fill",
        "radius",
        "sides",
        "innerRadius",
        "vertices",
    ];
    const attributes = shape.attrs;
    const [
        strokeWidth,
        shadowBlur,
        shadowOffsetX,
        shadowOffsetY,
        shadowOpacity,
        shadowEnabled,
        opacity,
        x,
        y,
        width,
        height,
        radius,
        innerRadius,
        outerRadius,
        sides,
        scaleX = 1,
        scaleY = 1,
        vertices,
    ] = [
        attributes.strokeWidth ?? null,
        attributes.shadowBlur ?? 0,
        attributes.shadowOffsetX ?? 0,
        attributes.shadowOffsetY ?? 0,
        attributes.shadowOpacity ?? 1,
        attributes.shadowEnabled,
        attributes.opacity ?? null,
        attributes.x ?? null,
        attributes.y ?? null,
        attributes.width ?? null,
        attributes.height ?? null,
        attributes.radius ?? null,
        attributes.innerRadius ?? null,
        attributes.outerRadius ?? null,
        attributes.sides ?? null,
        attributes.scaleX,
        attributes.scaleY,
        attributes.numPoints ?? null,
    ];

    if (shapeConfigRefs?.x && targets?.includes("x") && x) {
        shapeConfigRefs.x.value = `${parseInt(x)}`;
    }
    if (shapeConfigRefs?.y && targets?.includes("y") && y) {
        shapeConfigRefs.y.value = `${parseInt(y)}`;
    }
    if (shapeConfigRefs?.width && targets?.includes("width")) {
        if (radius) {
            shapeConfigRefs.width.value = `${parseInt(`${radius * scaleX}`)}`;
        } else {
            shapeConfigRefs.width.value = `${parseInt(`${width * scaleX}`)}`;
        }
    }
    if (shapeConfigRefs?.height && targets?.includes("height")) {
        if (radius) {
            shapeConfigRefs.height.value = `${parseInt(`${radius * scaleY}`)}`;
        } else {
            shapeConfigRefs.height.value = `${parseInt(`${height * scaleY}`)}`;
        }
    }

    if (shapeConfigRefs?.sides && targets.includes("sides") && sides) {
        shapeConfigRefs.sides.value = `${parseInt(`${sides}`)}`;
    }

    if (
        shapeConfigRefs?.radius &&
        targets.includes("radius") &&
        (radius || outerRadius)
    ) {
        if (outerRadius) {
            shapeConfigRefs.radius.value = `${parseInt(`${outerRadius}`)}`;
        } else {
            shapeConfigRefs.radius.value = `${parseInt(`${radius}`)}`;
        }
    }

    if (
        shapeConfigRefs?.innerRadius &&
        targets.includes("innerRadius") &&
        innerRadius
    ) {
        shapeConfigRefs.innerRadius.value = `${parseInt(`${innerRadius}`)}`;
    }

    if (shapeConfigRefs?.vertices && targets.includes("vertices") && vertices) {
        shapeConfigRefs.vertices.value = `${parseInt(`${vertices}`)}`;
    }

    if (shapeConfigRefs?.stroke.width && targets?.includes("stroke")) {
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
                        console.log(shadowOpacity);
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

    if (shapeConfigRefs && targets?.includes("stroke")) {
        const strokeColorPicker = pickerInit(
            "#stroke-color > div",
            shape.stroke() as string
        );
        shapeConfigRefs.stroke.color = strokeColorPicker;
    }

    if (shapeConfigRefs && targets?.includes("stroke")) {
        const fillColorPicker = pickerInit(
            "#fill > div",
            shape.fill() as string
        );

        shapeConfigRefs.fill.color = fillColorPicker;
    }

    bindShapeConfigRefs(shapeConfigRefs);
}

/**
 * Render the Shapes tool UI with buttons to create common shapes and an embedded PropertyPanel.
 *
 * @returns A JSX element containing shape creation buttons (circle, rectangle, pentagon, pen tool placeholder, star) and the PropertyPanel.
 */
export function ShapeTools() {
    return (
        <div id="shape-configs" class="flex-col mb-4 flex">
            <h4 class="text-xl font-medium">Shapes</h4>
            <div class="flex flex-wrap gap-x-12 gap-y-6 my-2">
                <button
                    onClick={() => {
                        const layer = createCircle({
                            layer: store.layers[0],
                        });
                        if (store.layers[0] === undefined) {
                            store.layers[0] = layer;
                            store.stage?.add(layer);
                        }
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
                        const layer = createRectangle({
                            layer: store.layers[0],
                        });
                        if (store.layers[0] === undefined) {
                            store.layers[0] = layer;
                            store.stage?.add(layer);
                        }
                    }}
                >
                    rectangle
                </button>
                <button
                    style={{ fontSize: "36px" }}
                    class="cursor-pointer material-symbols-outlined"
                    onClick={() => {
                        const layer = createPolygon({
                            layer: store.layers[0],
                        });
                        if (store.layers[0] === undefined) {
                            store.layers[0] = layer;
                            store.stage?.add(layer);
                        }
                    }}
                >
                    pentagon
                </button>
                <button
                    style={{ fontSize: "36px" }}
                    class="cursor-pointer material-symbols-outlined"
                >
                    pen_size_2
                </button>
                <button
                    style={{ fontSize: "36px" }}
                    class="cursor-pointer material-symbols-outlined"
                    onClick={() => {
                        const layer = createStar({
                            layer: store.layers[0],
                        });
                        if (store.layers[0] === undefined) {
                            store.layers[0] = layer;
                            store.stage?.add(layer);
                        }
                    }}
                >
                    star
                </button>
            </div>
            <PropertyPanel />
        </div>
    );
}