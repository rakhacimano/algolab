"use client";

import InputControls from "@/components/InputControls";
import { Algorithm, AlgorithmId } from "@/lib/types";

interface LeftSidebarProps {
    algorithms: Algorithm[];
    selectedAlgorithm: AlgorithmId;
    onAlgorithmChange: (id: AlgorithmId) => void;
    onArrayInput: (arr: number[]) => void;
    onSizeChange: (size: number) => void;
    currentSize: number;
}

export default function LeftSidebar({
    algorithms,
    selectedAlgorithm,
    onAlgorithmChange,
    onArrayInput,
    onSizeChange,
    currentSize,
}: LeftSidebarProps) {
    return (
        <aside className="w-full lg:w-80 flex-none bg-surface border-r border-border h-full overflow-y-auto">
            <div className="p-6">
                <InputControls
                    algorithms={algorithms}
                    selectedAlgorithm={selectedAlgorithm}
                    onAlgorithmChange={onAlgorithmChange}
                    onArrayInput={onArrayInput}
                    onSizeChange={onSizeChange}
                    currentSize={currentSize}
                />
            </div>
        </aside>
    );
}
