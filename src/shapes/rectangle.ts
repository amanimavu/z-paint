import Konva from "konva";
import type { Layer } from "konva/lib/Layer";
import { store } from "../store";
import { getStageBound } from "@/lib/stage";
import { updateShapeConfigUI } from "@/ui/toolbar/tools/shape";

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
        x: x ?? store?.stage?.width() ?? 0 / 2,
        y: y ?? store?.stage?.height() ?? 0 / 2,
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
    store.selectionRectangle && layer.add(store.selectionRectangle);
    store.transformer && layer.add(store.transformer);

    rectangle.on("transform", function () {
        updateShapeConfigUI(this);
    });
    return layer;
}
