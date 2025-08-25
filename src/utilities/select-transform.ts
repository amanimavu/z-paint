import Konva from "konva";
import { stage } from "../init";
import type { Shape } from "konva/lib/Shape";

export const tr = new Konva.Transformer();

// add a new feature, lets add ability to draw selection rectangle
export let selectionRectangle = new Konva.Rect({
    fill: "rgba(0,255,0,0.5)",
    visible: false,
});

let x1: number;
let x2: number;
let y1: number;
let y2: number;

stage.on("mousedown touchstart", (e) => {
    // do nothing if we mousedown on any shape
    if (e.target !== stage) {
        return;
    }
    x1 = stage.getPointerPosition()?.x ?? 0;
    y1 = stage.getPointerPosition()?.y ?? 0;
    x2 = stage.getPointerPosition()?.x ?? 0;
    y2 = stage.getPointerPosition()?.y ?? 0;

    selectionRectangle.setAttrs({
        x: x1,
        y: y1,
        width: 0,
        height: 0,
        visible: true,
    });
});

stage.on("mousemove touchmove", () => {
    // do nothing if we didn't start selection
    if (!selectionRectangle.visible()) {
        return;
    }
    x2 = stage.getPointerPosition()?.x ?? 0;
    y2 = stage.getPointerPosition()?.y ?? 0;

    selectionRectangle.setAttrs({
        x: Math.min(x1, x2),
        y: Math.min(y1, y2),
        width: Math.abs(x2 - x1),
        height: Math.abs(y2 - y1),
    });
});

stage.on("mouseup touchend", () => {
    // do nothing if we didn't start selection
    if (!selectionRectangle.visible()) {
        return;
    }
    // update visibility in timeout, so we can check it in click event
    setTimeout(() => {
        selectionRectangle.visible(false);
    });

    var shapes = stage.find(".shape");
    var box = selectionRectangle.getClientRect();
    var selected = shapes.filter((shape) =>
        Konva.Util.haveIntersection(box, shape.getClientRect())
    );
    tr.nodes(selected);
});

// clicks should select/deselect shapes
stage.on("click tap", function (e) {
    // if we are selecting with rect, do nothing
    if (
        selectionRectangle.visible() &&
        selectionRectangle.width() > 0 &&
        selectionRectangle.height() > 0
    ) {
        return;
    }

    // if click on empty area - remove all selections
    if (e.target === stage) {
        tr.nodes([]);
        return;
    }

    // do nothing if clicked NOT on our rectangles
    if (!e.target.hasName("shape")) {
        return;
    }

    // do we pressed shift or ctrl?
    const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
    const isSelected = tr.nodes().indexOf(e.target) >= 0;

    if (!metaPressed && !isSelected) {
        // if no key pressed and the node is not selected
        // select just one
        tr.nodes([e.target]);
    } else if (metaPressed && isSelected) {
        // if we pressed keys and node was selected
        // we need to remove it from selection:
        const nodes = tr.nodes().slice(); // use slice to have new copy of array
        // remove node from array
        nodes.splice(nodes.indexOf(e.target), 1);
        tr.nodes(nodes);
    } else if (metaPressed && !isSelected) {
        // add the node into selection
        const nodes = tr.nodes().concat([e.target]);
        tr.nodes(nodes);
    }
});

window.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "delete") {
        tr.nodes().forEach((node) => {
            node.destroy();
        });
        tr.nodes([]);
    }
});

window.addEventListener("keydown", async (e) => {
    const ctrlPressed = e.ctrlKey;
    const gPressed = e.key === "g";
    
    if (ctrlPressed && gPressed) {
        e.preventDefault();
        const group = new Konva.Group({
            draggable: true,
        });
        const { layers } = await import("../main");
        layers[0].add(group);
        tr.nodes().forEach((node) => {
            if (node.attrs.name === "shape") {
                group.add(node as Shape);
            }
        });
        
    }
});
