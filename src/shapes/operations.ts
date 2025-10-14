import Konva from "konva";
import type { Shape } from "konva/lib/Shape";
import { store } from "@/store/index";

export function deleteShape() {
    const selection = store.transformer?.nodes();
    selection?.forEach((node) => {
        node.destroy();
    });
    store.transformer?.nodes([]);
    const shapeConfigMenu = document.getElementById("shape-config-menu");

    shapeConfigMenu?.classList.replace("block", "hidden");
}

export function group() {
    const group = new Konva.Group({
        draggable: true,
    });
    const selection = store.transformer?.nodes();
    selection?.forEach((node) => {
        if (node.attrs.name === "shape") {
            group.add(node as Shape);
            (node as Shape).draggable(false);
        }
    });
    store.layers[0].add(group);
}

export function unGroup() {
    const selection = store.transformer?.nodes();
    selection?.forEach((node) => {
        if (node.attrs.name === "shape") {
            (node as Shape).remove();
            store.layers[0].add(node as Shape);
            (node as Shape).draggable(true);
        }
    });
}
