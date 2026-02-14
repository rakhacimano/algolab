"use client";

interface ControlBarProps {
    isPlaying: boolean;
    isFinished: boolean;
    speed: number;
    showValues: boolean;
    onPlay: () => void;
    onPause: () => void;
    onNextStep: () => void;
    onPrevStep: () => void;
    onReset: () => void;
    onShuffle: () => void;
    onSpeedChange: (speed: number) => void;
    onShowValuesChange: (show: boolean) => void;
}

export default function ControlBar({
    isPlaying,
    isFinished,
    speed,
    showValues,
    onPlay,
    onPause,
    onNextStep,
    onPrevStep,
    onReset,
    onShuffle,
    onSpeedChange,
    onShowValuesChange,
}: ControlBarProps) {
    return (
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 px-2 w-full max-w-5xl mx-auto">
            {/* Left Group: Playback */}
            <div className="flex items-center gap-2">
                <button
                    onClick={onPrevStep}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface border border-border text-text-secondary hover:bg-surface-alt hover:text-text-primary transition-colors hover:shadow-sm"
                    title="Previous Step"
                >
                    <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                </button>

                <button
                    onClick={isPlaying ? onPause : onPlay}
                    className="flex h-12 w-16 items-center justify-center rounded-2xl bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-600/30 transition-all hover:shadow-xl hover:-translate-y-0.5"
                    title={isPlaying ? "Pause" : "Play"}
                >
                    {isPlaying ? (
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            <rect x="6" y="4" width="4" height="16" rx="1" />
                            <rect x="14" y="4" width="4" height="16" rx="1" />
                        </svg>
                    ) : (
                        <svg
                            className="h-7 w-7 ml-0.5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    )}
                </button>

                <button
                    onClick={onNextStep}
                    disabled={isFinished}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface border border-border text-text-secondary hover:bg-surface-alt hover:text-text-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-sm"
                    title="Next Step"
                >
                    <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>
            </div>

            {/* Center Group: Actions */}
            <div className="flex items-center gap-3">
                <button
                    onClick={onReset}
                    className="flex h-10 items-center gap-2 rounded-xl bg-surface border border-border px-4 text-sm font-medium text-text-secondary hover:bg-surface-alt hover:text-text-primary transition-colors hover:shadow-sm"
                >
                    <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                    </svg>
                    Reset
                </button>

                <button
                    onClick={onShuffle}
                    className="flex h-10 items-center gap-2 rounded-xl bg-surface border border-border px-4 text-sm font-medium text-text-secondary hover:bg-surface-alt hover:text-text-primary transition-colors hover:shadow-sm"
                >
                    <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 4h4l3 9 3-9h4M4 20h4l3-9 3 9h4"
                        />
                    </svg>
                    Shuffle
                </button>
            </div>

            {/* Right Group: Speed & Display */}
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-text-muted uppercase tracking-wider">
                        Speed
                    </span>
                    <div className="flex items-center gap-3 bg-surface border border-border rounded-xl px-3 py-1.5 min-w-[140px]">
                        <span className="text-xs font-mono font-medium text-text-secondary w-8 text-right">
                            {speed}x
                        </span>
                        <input
                            type="range"
                            min="0.25"
                            max="4"
                            step="0.25"
                            value={speed}
                            onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
                            className="w-24 h-1.5 bg-surface-alt rounded-full appearance-none cursor-pointer accent-primary-600"
                        />
                    </div>
                </div>

                <button
                    onClick={() => onShowValuesChange(!showValues)}
                    className={`flex h-10 items-center gap-2 rounded-xl border px-4 text-sm font-medium transition-colors ${showValues
                            ? "bg-primary-50 border-primary-200 text-primary-700 shadow-sm"
                            : "bg-surface border-border text-text-muted hover:bg-surface-alt hover:text-text-secondary"
                        }`}
                >
                    <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                    </svg>
                    Values
                </button>
            </div>
        </div>
    );
}
