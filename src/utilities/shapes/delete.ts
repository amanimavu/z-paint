import { tr } from "./select-transform";

window.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() === "delete") {
        tr.nodes().forEach((node) => {
            node.destroy();
        });
        tr.nodes([]);
        const shapeConfigMenu = document.getElementById("shape-config-menu");
        if (shapeConfigMenu) {
            shapeConfigMenu.classList.replace("visible", "invisible");
        }
    }
});
