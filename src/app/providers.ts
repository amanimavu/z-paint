import { createStore } from "@/store/init";
import { createStage } from "canvas/init";
import { STAGE_ID } from "constants";
import Konva from "konva";
import { store } from "@/store/index";
import { createSelectionRectangle } from "@/tools/select";

export function stageProvider() {
    const stage = createStage(STAGE_ID);
    store.stage = stage;
    return stage;
}

export function selectionRectangleProvider() {
    const selectionRectangle = createSelectionRectangle();
    store.selectionRectangle = selectionRectangle;
}

export function transformProvider() {
    const tr = new Konva.Transformer();
    store.transformer = tr;
}

export function storeProvider() {
    const store = createStore();
    return store;
}
