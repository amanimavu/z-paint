import { ColorTools } from "@/ui/toolbar/tools/color";
import { EraserTools } from "@/ui/toolbar/tools/eraser";
import { FillTools } from "@/ui/toolbar/tools/fill";
import { PencilTools } from "@/ui/toolbar/tools/pencil";
import { ShapeTools } from "@/ui/toolbar/tools/shape";
import { UndoTools } from "@/ui/toolbar/tools/undo";

export function Sidebar() {
    return (
        <div class="flex-7 card p-2 h-full overflow-y-auto scrollbar-thin">
            <ShapeTools />
            <ColorTools />
            <PencilTools />
            <EraserTools />
            <FillTools />
            <UndoTools />
        </div>
    );
}
