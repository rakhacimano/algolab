"use client";

import RightPanel from "@/components/RightPanel";
import { Algorithm, Step } from "@/lib/types";

interface RightSidebarProps {
    algorithm: Algorithm;
    currentStep: Step | null;
    currentStepIndex: number;
    totalSteps: number;
}

export default function RightSidebar({
    algorithm,
    currentStep,
    currentStepIndex,
    totalSteps,
}: RightSidebarProps) {
    return (
        <aside className="w-96 flex-none bg-surface shadow-[-4px_0_10px_-2px_rgba(0,0,0,0.02)] z-20 h-full overflow-y-auto flex flex-col border-l border-border">
            <RightPanel
                algorithm={algorithm}
                currentStep={currentStep}
                currentStepIndex={currentStepIndex}
                totalSteps={totalSteps}
            />
        </aside>
    );
}
