import { stage } from "../../init";

export function getStageBound(x: number, y: number) {
    x = x < stage.width() ? Math.max(x, 0) : stage.width();
    y = y < stage.height() ? Math.max(y, 0) : stage.height();
    return { x, y };
}
