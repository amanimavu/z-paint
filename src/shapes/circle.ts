import Konva from "konva";
import type { Layer } from "konva/lib/Layer";
import { store } from "@/store/index";
import { updateShapeConfigUI } from "@/ui/toolbar/tools/shape";
import { getStageBound } from "@/lib/stage";
import { bindToDragEvents } from "@/app/events";

type createProps = {
    layer?: Layer;
    radius?: number;
    x?: number;
    y?: number;
};
export function create({ layer, radius, x, y }: createProps) {
    layer = layer ?? new Konva.Layer();
    const circle = new Konva.Circle({
        radius: radius ?? 100,
        x: x ?? (store.stage?.width() ?? 0) / 2,
        y: y ?? (store.stage?.height() ?? 0) / 2,
        stroke: "#ffffff",
        fill: "#E0E0E0",
        name: "shape",
        strokeWidth: 2,
        draggable: true,
        dragBoundFunc(pos) {
            return getStageBound(pos.x, pos.y);
        },
    });

    layer.add(circle);
    store.selectionRectangle && layer.add(store.selectionRectangle);
    store.transformer && layer.add(store.transformer);
    bindToDragEvents(circle);

    circle.on("transform", function () {
        updateShapeConfigUI(this, ["height", "width"]);
    });
    return layer;
}
