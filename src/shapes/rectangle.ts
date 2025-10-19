import Konva from "konva";
import type { Layer } from "konva/lib/Layer";
import { store } from "../store";
import { getStageBound } from "@/lib/stage";
import { updateShapeConfigUI } from "@/ui/toolbar/tools/shape";
import { bindToDragEvents } from "@/app/events";

type createProps = {
    layer?: Layer;
    width?: number;
    height?: number;
    x?: number;
    y?: number;
};
/**
 * Create and add a draggable rectangle shape to a Konva layer.
 *
 * @param layer - Optional existing Konva layer to add the rectangle to;
 * a new layer is created if omitted.
 * @param width - Rectangle width; defaults to 200.
 * @param height - Rectangle height; defaults to 100.
 * @param x - Rectangle x position; defaults to the horizontal center
 * of the current stage.
 * @param y - Rectangle y position; defaults to the vertical center
 * of the current stage.
 * @returns The Konva.Layer containing the created rectangle
 * (and any existing selection rectangle or transformer added to the layer).
 */
export function create({ layer, width, height, x, y }: createProps) {
    layer = layer ?? new Konva.Layer();
    const rectangle = new Konva.Rect({
        width: width ?? 200,
        height: height ?? 100,
        x: x ?? ((store.stage?.width() ?? 0) - (width ?? 200)) / 2,
        y: y ?? ((store.stage?.height() ?? 0) - (height ?? 100)) / 2,
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
    bindToDragEvents(rectangle);

    rectangle.on("transform", function () {
        updateShapeConfigUI(this, ["height", "width"]);
    });
    return layer;
}
