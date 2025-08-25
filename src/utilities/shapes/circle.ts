import Konva from "konva";
import type { Layer } from "konva/lib/Layer";
import { stage } from "../../init";
import { getStageBound } from "./index";
import { selectionRectangle, tr as transformer } from "../select-transform";

type createProps = {
    layer?: Layer;
    width?: number;
    height?: number;
    x?: number;
    y?: number;
};
export function create({ layer, width, height, x, y }: createProps) {
    layer = layer ?? new Konva.Layer();
    const circle = new Konva.Circle({
        width: width ?? 100,
        height: height ?? 100,
        x: x ?? stage.width() / 2,
        y: y ?? stage.height() / 2,
        stroke: "white",
        name: "shape",
        strokeWidth: 2,
        draggable: true,
        dragBoundFunc(pos) {
            return getStageBound(pos.x, pos.y);
        },
    });
    layer.add(circle);
    layer.add(selectionRectangle);
    layer.add(transformer);
    return layer;
}
