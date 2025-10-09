import type Pickr from "@simonwep/pickr";
import type Konva from "konva";
import type { Layer } from "konva/lib/Layer";
import type { Shape } from "konva/lib/Shape";
import type { Rect } from "konva/lib/shapes/Rect";
import type { Transformer } from "konva/lib/shapes/Transformer";

export type Tools = "shape" | "color" | "undo" | "fill" | "pencil" | "eraser";

export type Store = {
    layers: Layer[];
    selectedShape: null | (Shape & { picker?: Pickr; dummy?: number });
    transformer?: Transformer;
    stage?: Konva.Stage;
    selectionRectangle?: Rect;
};

export type ShapeConfigRefs<T extends Element = HTMLInputElement> = {
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
} | null;
