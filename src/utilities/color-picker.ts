import "@simonwep/pickr/dist/themes/monolith.min.css"; // 'monolith' theme

import Pickr from "@simonwep/pickr";
import { Observer, store } from "./state-management";

export const pickerInit = (querySelector?: string, defaultColor?: string) => {
    return Pickr.create({
        el: querySelector || ".color-picker",
        theme: "monolith", // or 'monolith', or 'nano'
        default: defaultColor ?? "#000000",

        components: {
            // Main components
            preview: true,
            opacity: true,
            hue: true,

            // Input / output Options
            interaction: {
                hex: true,
                rgba: true,
                hsla: true,
                hsva: true,
                cmyk: true,
                input: true,
                save: true,
            },
        },
    });
};

export const storeObserver = new Observer<typeof store>(store);

const pickerProvided = (state: typeof store) => {
    if (state.selectedShape?.picker) {
        store.selectedShape?.picker?.on("save", (color: Pickr.HSVaColor) => {
            console.log(color)
            if (store.selectedShape?.shadowColor) {
                store.selectedShape.shadowColor(color.toRGBA().toString());
            }
        });
    }
};

storeObserver.subscribe(pickerProvided);
