import Konva from "konva";
import type { Shape } from "konva/lib/Shape";
import { store } from "@/store/index";

/**
 * Destroys all currently selected shape nodes, clears the transformer selection, and hides the shape configuration menu.
 *
 * This removes the selected nodes from the stage, resets the transformer's node list, and replaces the
 * "block" class with "hidden" on the element with id "shape-config-menu" if present.
 */
export function deleteShape() {
    const selection = store.transformer?.nodes();
    selection?.forEach((node) => {
        node.destroy();
    });
    store.transformer?.nodes([]);
    const shapeConfigMenu = document.getElementById("shape-config-menu");

    shapeConfigMenu?.classList.replace("block", "hidden");
}

/**
 * Creates a draggable group from the currently selected shape nodes and adds it to the primary layer.
 *
 * For each selected node whose `name` attribute is `"shape"`, the node is moved into the new group and made non-draggable; the group is then added to `store.layers[0]`.
 */
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