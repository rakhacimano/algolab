"use client";

import { useEffect, useRef } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeViewerProps {
    code: string;
    activeLine: number;
}

export default function CodeViewer({ code, activeLine }: CodeViewerProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to active line
    useEffect(() => {
        if (containerRef.current && activeLine > 0) {
            const lineElements = containerRef.current.querySelectorAll(
                ".linenumber"
            );
            const targetLine = lineElements[activeLine - 1];
            if (targetLine) {
                targetLine.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
            }
        }
    }, [activeLine]);

    return (
        <div ref={containerRef} className="rounded-xl overflow-hidden h-full">
            <SyntaxHighlighter
                language="javascript"
                style={oneDark}
                showLineNumbers
                wrapLines
                lineNumberStyle={{
                    minWidth: "2.5em",
                    paddingRight: "1em",
                    color: "#636d83",
                    fontSize: "12px",
                }}
                lineProps={(lineNumber) => {
                    const isActive = lineNumber === activeLine;
                    return {
                        style: {
                            display: "block",
                            backgroundColor: isActive
                                ? "rgba(139, 92, 246, 0.2)"
                                : "transparent",
                            borderLeft: isActive
                                ? "3px solid #8b5cf6"
                                : "3px solid transparent",
                            paddingLeft: "0.5em",
                            transition: "background-color 0.2s, border-left 0.2s",
                        },
                    };
                }}
                customStyle={{
                    margin: 0,
                    padding: "1rem 0",
                    fontSize: "13px",
                    fontFamily: "var(--font-mono)",
                    lineHeight: "1.7",
                    background: "#1e1e2e",
                    borderRadius: "0.75rem",
                    height: "auto",
                    minHeight: "100%",
                }}
            >
                {code}
            </SyntaxHighlighter>
        </div>
    );
}
