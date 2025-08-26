import type { Shape, ShapeConfig } from "konva/lib/Shape";
import { stage } from "../../init";

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
        color: T | null;
        width: T | null;
    };
    fill: T | null;
};

export function displayAttributes(shape: Shape<ShapeConfig>) {
    const attributes = shape.attrs;
    const [strokeColor, strokeWidth, fill] = [
        attributes.stroke ?? null,
        attributes.strokeWidth ?? null,
        attributes.fill ?? null,
    ];
    const { x, y, width, height } = shape.getClientRect();

    const shapeConfigMenu = document.getElementById("shape-configs");
    if (shapeConfigMenu) {
        const input: Input<HTMLInputElement> = {
            x: shapeConfigMenu.querySelector("#x-pos"),
            y: shapeConfigMenu.querySelector("#y-pos"),
            width: shapeConfigMenu.querySelector("#width"),
            height: shapeConfigMenu.querySelector("#height"),
            stroke: {
                color: shapeConfigMenu.querySelector("#stroke-color"),
                width: shapeConfigMenu.querySelector("#stroke-width"),
            },
            fill: shapeConfigMenu.querySelector("#fill"),
        };

        if (input.x) {
            input.x.value = `${x}`;
        }
        if (input.y) {
            input.y.value = `${y}`;
        }
        if (input.width) {
            input.width.value = `${width}`;
        }
        if (input.height) {
            input.height.value = `${height}`;
        }
        if (input.stroke.color) {
            input.stroke.color.value = `${strokeColor}`;
        }
        if (input.stroke.width) {
            input.stroke.width.value = `${strokeWidth}`;
        }
        if (input.fill) {
            input.fill.value = `${fill}`;
        }
    }
}
