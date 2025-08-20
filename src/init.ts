import Konva from "konva";

const canvas = document.getElementById("stage");

export const stage = new Konva.Stage({
    container: "stage",
    height: canvas?.clientHeight,
    width: canvas?.clientWidth,
});
