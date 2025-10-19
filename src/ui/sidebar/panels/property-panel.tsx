export function PropertyPanel() {
    return (
        <section id="shape-config-menu" class="mt-6 hidden">
            <div class="divider my-0"></div>
            <div>
                <h5 class="font-normal">positions</h5>
                <div class="flex justify-between gap-10">
                    <label class="input input-sm validator w-3/9 my-1 py-1">
                        <span class="font-bold opacity-40 mr-2">x</span>
                        <input
                            name="x-pos"
                            id="x-pos"
                            type="number"
                            class="w-full"
                            min={0}
                        />
                    </label>
                    <label class="input input-sm validator w-3/9 my-1 py-1">
                        <span class="font-bold opacity-40 mr-2">y</span>
                        <input
                            name="y-pos"
                            id="y-pos"
                            type="number"
                            class="w-full"
                            min={0}
                        />
                    </label>
                </div>
            </div>
            <div class="divider my-0"></div>
            <div>
                <h5 class="font-normal">dimensions</h5>
                <div class="flex justify-between gap-x-10 gap-y-2 flex-wrap">
                    <label class="input input-sm w-3/9 my-1 py-1">
                        <span class="font-bold opacity-40 mr-2">w</span>
                        <input
                            name="width"
                            id="width"
                            type="number"
                            class="w-full"
                            min={0}
                        />
                    </label>
                    <label class="input input-sm w-3/9 my-1 py-1">
                        <span class="font-bold opacity-40 mr-2">h</span>
                        <input
                            name="height"
                            id="height"
                            type="number"
                            class="w-full"
                            min={0}
                        />
                    </label>
                    <label class="input input-sm w-3/9 my-1 py-1">
                        <span class="font-bold opacity-40 mr-2">r</span>
                        <input
                            name="radius"
                            id="radius"
                            type="number"
                            class="w-full"
                            min={0}
                        />
                    </label>
                    <label class="input input-sm w-3/9 my-1 py-1">
                        <span class="font-bold opacity-40 mr-2">s</span>
                        <input
                            name="sides"
                            id="sides"
                            type="number"
                            class="w-full"
                            min={3}
                        />
                    </label>
                    <label class="input input-sm w-3/9 my-1 py-1">
                        <span class="font-bold opacity-40 mr-2">v</span>
                        <input
                            name="vertices"
                            id="vertices"
                            type="number"
                            class="w-full"
                            min={2}
                        />
                    </label>
                    <label class="input input-sm w-3/9 my-1 py-1">
                        <span class="font-bold opacity-40 mr-2">ir</span>
                        <input
                            name="inner-radius"
                            id="inner-radius"
                            type="number"
                            class="w-full"
                            min={0}
                        />
                    </label>
                </div>
            </div>
            <div class="divider my-0"></div>
            <div>
                <h5 class="font-normal">stroke</h5>
                <div class="flex justify-between">
                    <div class="mt-1 w-3/9 h-10" id="stroke-color">
                        <div></div>
                    </div>
                    <label class="input input-sm w-3/9 my-1 py-1">
                        <i class="bi bi-border-width opacity-40 mr-2"></i>
                        <input
                            name="stroke-width"
                            id="stroke-width"
                            type="number"
                            class="w-full"
                            min={0}
                        />
                    </label>
                </div>
            </div>
            <div class="divider my-0"></div>
            <div>
                <h5 class="font-normal">fill</h5>
                <div class="flex h-10 gap-1">
                    <div id="fill" class="w-3/9 h-full mt-1">
                        <div></div>
                    </div>
                    <input
                        type="checkbox"
                        hidden
                        checked
                        name="fill-toggle"
                        id="fill-toggle"
                    />
                    <label
                        for="fill-toggle"
                        class="border flex justify-center items-center mt-1 mb-1"
                    >
                        <i class="bi bi-plus text-2xl"></i>
                    </label>
                </div>
            </div>
            <div class="divider my-0"></div>
            <div>
                <h5 class="font-normal">effects</h5>
                <div class="my-1"></div>
                <button id="add-effect" class="btn btn-block btn-dash btn-sm">
                    <i class="bi bi-plus text-xl"></i>
                </button>
            </div>
            <div class="divider my-0"></div>
        </section>
    );
}
