// const { stage } = await import("./init");
// const { create: createCircle } = await import("./utilities/shapes/circle");
// const { create: createRectangle } = await import(
//     "./utilities/shapes/rectangle"
// );

import { Stage } from "@/ui/canvas";
import { Sidebar } from "@/ui/sidebar";
import { Toolbar } from "@/ui/toolbar";
import "@/app/events";

function App() {
    return (
        <main class="h-screen flex flex-col overflow-y-clip">
            <Toolbar />
            <div class="flex flex-1 gap-x-10 overflow-y-auto">
                <Stage />
                <Sidebar />
            </div>
        </main>
    );
}

const root = document.getElementById("app");
root?.appendChild(<App />);
