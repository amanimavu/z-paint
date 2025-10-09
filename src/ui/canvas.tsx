import { STAGE_ID } from "constants";

export function Stage() {
    return (
        <div
            id={STAGE_ID}
            class="h-full overflow-y-auto card shadow-2xl flex-17 scrollbar-thin"
        ></div>
    );
}
