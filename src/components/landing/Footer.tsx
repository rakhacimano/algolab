"use client";

export default function Footer() {
    return (
        <footer className="border-t border-border bg-surface-alt py-10">
            <div className="mx-auto max-w-6xl px-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-600 text-white font-bold text-xs">
                        AL
                    </div>
                    <span className="text-lg font-bold text-text-primary">
                        AlgoLab
                    </span>
                </div>
                <p className="text-sm text-text-muted">
                    Built for students who want to truly understand algorithms.
                </p>
                <p className="mt-2 text-xs text-text-muted">
                    © {new Date().getFullYear()} AlgoLab. Open source educational tool.
                </p>
            </div>
        </footer>
    );
}
