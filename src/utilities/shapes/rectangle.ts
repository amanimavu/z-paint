import Konva from "konva";
import type { Layer } from "konva/lib/Layer";
import { stage } from "../../init";
import { displayAttributes, getStageBound } from "./index";
import { selectionRectangle, tr as transformer } from "./select-transform";

type createProps = {
    layer?: Layer;
    width?: number;
    height?: number;
    x?: number;
    y?: number;
};
export function create({ layer, width, height, x, y }: createProps) {
    layer = layer ?? new Konva.Layer();
    const rectangle = new Konva.Rect({
        width: width ?? 200,
        height: height ?? 100,
        x: x ?? stage.width() / 2,
        y: y ?? stage.height() / 2,
        stroke: "#ffffff",
        fill: "#E0E0E0",
        name: "shape",
        strokeWidth: 2,
        draggable: true,
        dragBoundFunc(pos) {
            return getStageBound(pos.x, pos.y);
        },
    });

    layer.add(rectangle);
    layer.add(selectionRectangle);
    layer.add(transformer);

    rectangle.on("transform", function () {
        displayAttributes(this);
    });
    return layer;
}
