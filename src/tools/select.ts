import { updateShapeConfigUI } from "@/ui/toolbar/tools/shape";
import Konva from "konva";
import type { Shape } from "konva/lib/Shape";
import { store } from "@/store/index";

export const createSelectionRectangle = () => {
    const selectionRectangle = new Konva.Rect({
        fill: "rgba(0,255,0,0.5)",
        visible: false,
    });
    return selectionRectangle;
};

let x1: number;
let x2: number;
let y1: number;
let y2: number;

export function startSelection(stage: Konva.Stage) {
    x1 = stage.getPointerPosition()?.x ?? 0;
    y1 = stage.getPointerPosition()?.y ?? 0;
    x2 = stage.getPointerPosition()?.x ?? 0;
    y2 = stage.getPointerPosition()?.y ?? 0;

    store?.selectionRectangle?.setAttrs({
        x: x1,
        y: y1,
        width: 0,
        height: 0,
        visible: true,
    });
}

export function moveSelection(stage: Konva.Stage) {
    x2 = stage.getPointerPosition()?.x ?? 0;
    y2 = stage.getPointerPosition()?.y ?? 0;

    store.selectionRectangle?.setAttrs({
        x: Math.min(x1, x2),
        y: Math.min(y1, y2),
        width: Math.abs(x2 - x1),
        height: Math.abs(y2 - y1),
    });
}

export function endSelection(stage: Konva.Stage) {
    const shapeConfigMenu = document.getElementById("shape-config-menu");
    const shapes = stage.find(".shape");
    const box = store.selectionRectangle?.getClientRect();
    const selected = shapes.filter((shape) => {
        if (box) {
            return Konva.Util.haveIntersection(box, shape.getClientRect());
        }
        return false;
    });

    store.transformer?.nodes(selected);
    console.log(selected);
    if (selected.length === 1) {
        updateShapeConfigUI(selected[0] as Shape);
        if (shapeConfigMenu) {
            shapeConfigMenu.classList.replace("hidden", "block");
        }
    }
}

export function deselect() {
    const shapeConfigMenu = document.getElementById("shape-config-menu");
    store.transformer?.nodes([]);

    if (shapeConfigMenu) {
        const effectEntries = document.querySelectorAll(
            "div:has(+#add-effect) > div"
        );
        effectEntries.forEach((entry) => {
            entry.remove();
        });
        shapeConfigMenu.classList.replace("block", "hidden");
    }
}

export function addToSelection(targets: Shape[], onSelect?: Function) {
    const nodes = store.transformer?.nodes().concat(targets);
    store.transformer?.nodes(nodes);
    onSelect && onSelect();
}

export function removeFromSelection(target: Shape, callback?: Function) {
    const nodes = store.transformer?.nodes().slice();
    nodes?.splice(nodes.indexOf(target), 1);
    callback && callback();
}
