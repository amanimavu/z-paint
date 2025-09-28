import type { Shape } from "konva/lib/Shape";
import { store } from "../state-management";
import { tr } from "./select-transform";
import Konva from "konva";

window.addEventListener("keydown", async (e) => {
    const ctrlPressed = e.ctrlKey;
    const shiftPressed = e.shiftKey;
    const gPressed = e.key === "g" || e.key === "G";
    
    if (ctrlPressed && gPressed) {
        e.preventDefault();
        const group = new Konva.Group({
            draggable: true,
        });
        tr.nodes().forEach((node) => {
            if (node.attrs.name === "shape") {
                group.add(node as Shape);
                (node as Shape).draggable(false);
            }
        });
        store.layers[0].add(group);
    }

    if (ctrlPressed && shiftPressed && gPressed) {
        e.preventDefault();
        tr.nodes().forEach((node) => {
            if (node.attrs.name === "shape") {
                (node as Shape).remove();
                store.layers[0].add(node as Shape);
                (node as Shape).draggable(true);
            }
        });
    }
});
