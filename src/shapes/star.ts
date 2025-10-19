import Konva from "konva";
import type { Layer } from "konva/lib/Layer";
import { store } from "../store";
import { getStageBound } from "@/lib/stage";
import { updateShapeConfigUI } from "@/ui/toolbar/tools/shape";
import { bindToDragEvents } from "@/app/events";

type createProps = {
    layer?: Layer;
    vertices?: number;
    radius?: number;
    x?: number;
    y?: number;
    innerRadius?: number;
};

/**
 * Create and add a Konva star shape to a layer configured with radii,
 * point count, and position.
 *
 * @param layer - Optional layer to add the star into; if omitted a new layer is created
 * @param vertices - Number of star points
 * @param radius - Outer radius of the star
 * @param innerRadius - Inner radius of the star
 * @param x - X coordinate for the star's position; defaults to stage
 * center if not provided
 * @param y - Y coordinate for the star's position; defaults to stage
 * center if not provided
 * @returns The Konva.Layer containing the created star
 * (the provided layer or a newly created one)
 */
export function create({
    layer,
    vertices,
    radius,
    innerRadius,
    x,
    y,
}: createProps) {
    layer = layer ?? new Konva.Layer();
    const outer = Math.max(1, radius ?? 100);
    const inner = Math.max(0, Math.min(innerRadius ?? 50, outer - 1));
    const points = Math.max(2, vertices ?? 5);
    const star = new Konva.Star({
        outerRadius: outer,
        innerRadius: inner,
        numPoints: points,
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

    layer.add(star);
    store.selectionRectangle && layer.add(store.selectionRectangle);
    store.transformer && layer.add(store.transformer);
    bindToDragEvents(star);

    star.on("transform", function () {
        updateShapeConfigUI(this, ["radius", "vertices", "innerRadius"]);
    });
    return layer;
}
