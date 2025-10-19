import Konva from "konva";
import type { Layer } from "konva/lib/Layer";
import { store } from "../store";
import { getStageBound } from "@/lib/stage";
import { updateShapeConfigUI } from "@/ui/toolbar/tools/shape";
import { bindToDragEvents } from "@/app/events";

type createProps = {
    layer?: Layer;
    sides?: number;
    radius?: number;
    x?: number;
    y?: number;
};

/**
 * Create and add a Konva regular polygon to a layer.
 *
 * Creates a Konva.RegularPolygon with configurable `sides`, `radius`, and position, adds it to the provided
 * or a newly created layer, wires up drag and transform behavior, and attaches any existing selection overlays.
 *
 * @param layer - Optional Konva.Layer to add the polygon to; a new layer is created when omitted.
 * @param sides - Number of polygon sides; defaults to 4.
 * @param radius - Polygon radius in pixels; defaults to 100.
 * @param x - Initial x position; defaults to the horizontal center of `store.stage` or 0 if unavailable.
 * @param y - Initial y position; defaults to the vertical center of `store.stage` or 0 if unavailable.
 * @returns The Konva.Layer containing the created polygon (and any attached selection rectangle or transformer).
 */
export function create({ layer, sides, radius, x, y }: createProps) {
    layer = layer ?? new Konva.Layer();
    const polygon = new Konva.RegularPolygon({
        radius: radius ?? 100,
        sides: sides ?? 4,
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
    console.log(polygon.getClassName());

    layer.add(polygon);
    store.selectionRectangle && layer.add(store.selectionRectangle);
    store.transformer && layer.add(store.transformer);
    bindToDragEvents(polygon);

    polygon.on("transform", function () {
        updateShapeConfigUI(this, ["radius", "sides"]);
    });
    return layer;
}