import Konva from "konva";
import type { Layer } from "konva/lib/Layer";
import { stage } from "../../init";
import { getStageBound } from ".";

export function create(
    layer?: Layer,
    width?: number,
    height?: number,
    x?: number,
    y?: number
) {
    layer = layer ?? new Konva.Layer();
    const circle = new Konva.Circle({
        width: width ?? 100,
        height: height ?? 100,
        x: x ?? stage.width() / 2,
        y: y ?? stage.height() / 2,
        stroke: "white",
        strokeWidth: 2,
        draggable: true,
        dragBoundFunc(pos) {
            return getStageBound(pos.x, pos.y);
        },
    });
    layer.add(circle);
    return layer;
}
