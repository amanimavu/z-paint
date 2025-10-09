import Konva from "konva";

export function createStage(container: string) {
    console.log(document.getElementById(container)?.clientWidth);
    const stage = new Konva.Stage({
        container,
        width: document.getElementById(container)?.clientWidth,
        height: document.getElementById(container)?.clientHeight,
    });
    return stage;
}
