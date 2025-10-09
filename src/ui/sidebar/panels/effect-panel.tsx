import { store, storeObserver } from "@/store/index";
import { pickerInit } from "@/ui/color-picker";

type Props = { id: string };
export function EffectEntry({ id }: Props): Element {
    return (
        <div id={id}>
            <div class="flex mb-2 gap-1.5 flex-wrap">
                <select
                    name="effect"
                    onInput={(e) => {
                        const effect = (e.target as HTMLSelectElement).value;
                        const shadowConfigs = document.querySelectorAll(
                            `#${id} .input, #${id} .color-picker, #${id} input[type='range']`
                        );
                        [...shadowConfigs].forEach((input) => {
                            switch (effect) {
                                case "shadow":
                                    if (store.selectedShape) {
                                        store.selectedShape.shadowEnabled(true);
                                    }
                                    input.classList.contains("shadow")
                                        ? input.classList.remove("hidden")
                                        : input.classList.add("hidden");
                                    if (
                                        document.querySelector(
                                            ".color-picker > div"
                                        )?.parentNode
                                    ) {
                                        const picker = pickerInit(
                                            `#${id} .color-picker > div`
                                        );
                                        if (store.selectedShape) {
                                            const shadowColor =
                                                store.selectedShape.shadowColor() ??
                                                "black";
                                            console.log(shadowColor);
                                            store.selectedShape.picker = picker;
                                            store.selectedShape?.picker?.setColor(
                                                shadowColor
                                            );
                                            storeObserver.notify();
                                        }
                                    }
                                    break;
                                case "opacity":
                                    input.classList.contains("opacity")
                                        ? input.classList.remove("hidden")
                                        : input.classList.add("hidden");
                            }
                        });
                    }}
                    class="select basis-2/5 select-sm"
                >
                    <option value={""} disabled selected>
                        Pick an effect
                    </option>
                    <option value="shadow">Shadow</option>
                    <option value="opacity">Opacity</option>
                </select>

                <input
                    name="shadow-opacity"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={store.selectedShape?.shadowOpacity() ?? "1"}
                    class="range range-sm hidden shadow basis-2/5"
                    onChange={(e) => {
                        const ratio = parseFloat(
                            (e.target as HTMLInputElement).value
                        );
                        store.selectedShape?.shadowOpacity(ratio);
                    }}
                />

                <div class="color-picker shadow hidden grow-1">
                    <div></div>
                </div>

                <label class="input basis-2/5 input-sm hidden shadow">
                    <span class="material-symbols-outlined opacity-50">
                        blur_on
                    </span>
                    <input
                        type="number"
                        name="shadow-blur"
                        value={store.selectedShape?.shadowBlur() ?? 2}
                        onChange={(e) => {
                            const blur = parseInt(
                                (e.target as HTMLInputElement).value
                            );
                            store.selectedShape?.shadowBlur(blur);
                            2;
                        }}
                    />
                </label>

                <label class="input basis-1/5 input-sm hidden shadow">
                    <span class="opacity-50">x</span>
                    <input
                        type="number"
                        name="shadow-offset-x"
                        value={store.selectedShape?.shadowOffsetX() ?? 2}
                        onChange={(e) => {
                            const offsetX = parseInt(
                                (e.target as HTMLInputElement).value
                            );
                            store.selectedShape?.shadowOffsetX(offsetX);
                        }}
                    />
                </label>

                <label class="input basis-1/5 input-sm hidden shadow">
                    <span class="opacity-50">y</span>
                    <input
                        type="number"
                        name="shadow-offset-y"
                        value={store.selectedShape?.shadowOffsetY() ?? 1}
                        onChange={(e) => {
                            const offsetY = parseInt(
                                (e.target as HTMLInputElement).value
                            );
                            store.selectedShape?.shadowOffsetY(offsetY);
                        }}
                    />
                </label>

                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={store.selectedShape?.opacity().toString() ?? "1"}
                    name="opacity-ratio"
                    onChange={(e) => {
                        const ratio = parseFloat(
                            (e.target as HTMLInputElement).value
                        );
                        store.selectedShape?.opacity(ratio);
                    }}
                    class="range range-sm hidden basis-2/5 opacity"
                />

                <button
                    onClick={function () {
                        const effectEntry = this.parentElement?.parentElement;
                        effectEntry && effectEntry.remove();
                        if (
                            effectEntry?.firstChild?.firstChild?.nodeType === 1
                        ) {
                            const effect = (
                                effectEntry?.firstChild
                                    ?.firstChild as HTMLInputElement
                            )?.value;

                            switch (effect) {
                                case "shadow":
                                    store.selectedShape?.shadowEnabled(false);
                                    break;
                                case "opacity":
                                    store.selectedShape?.opacity(1);
                                    break;
                            }
                        }
                        const addEffectButton = document.getElementById(
                            "add-effect"
                        ) as HTMLButtonElement;
                        if (addEffectButton.disabled) {
                            addEffectButton.disabled = false;
                        }
                    }}
                    class="ml-auto btn btn-error btn-outline btn-sm btn-1/5"
                >
                    <i class="bi bi-dash-lg"></i>
                </button>
            </div>
            <hr class="border-dashed my-3 opacity-25"></hr>
        </div>
    );
}
