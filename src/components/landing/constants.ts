import { motion } from "framer-motion";

export interface FeatureItem {
    icon: string;
    title: string;
    description: string;
}

export interface TopicModule {
    id: string;
    name: string;
    description: string;
    icon: string;
    href: string;
    active: boolean;
    algorithms: string[];
}

export const features: FeatureItem[] = [
    {
        icon: "👁️",
        title: "See Every Step",
        description:
            "Watch algorithms execute step by step with animated visualizations that make abstract concepts tangible.",
    },
    {
        icon: "💻",
        title: "Read the Code",
        description:
            "Follow along with syntax-highlighted code as each line executes. Understand what the code actually does.",
    },
    {
        icon: "💡",
        title: "Understand the Logic",
        description:
            "Get plain-English explanations for every operation. Know exactly why each comparison or swap happens.",
    },
];

export const topicModules: TopicModule[] = [
    {
        id: "sorting",
        name: "Sorting",
        description: "Visualize Bubble, Selection, and Insertion Sort step by step.",
        icon: "📊",
        href: "/sorting",
        active: true,
        algorithms: ["Bubble Sort", "Selection Sort", "Insertion Sort"],
    },
    {
        id: "searching",
        name: "Searching",
        description: "Linear Search, Binary Search, and more.",
        icon: "🔍",
        href: "#",
        active: false,
        algorithms: ["Linear Search", "Binary Search"],
    },
    {
        id: "stack",
        name: "Stack",
        description: "Push, Pop, and Peek operations visualized.",
        icon: "📚",
        href: "#",
        active: false,
        algorithms: ["Push", "Pop", "Peek"],
    },
    {
        id: "queue",
        name: "Queue",
        description: "Enqueue, Dequeue, and priority queues.",
        icon: "🚶",
        href: "#",
        active: false,
        algorithms: ["Enqueue", "Dequeue"],
    },
    {
        id: "tree",
        name: "Tree",
        description: "Binary trees, BST, traversals, and balancing.",
        icon: "🌳",
        href: "#",
        active: false,
        algorithms: ["BST", "Traversals"],
    },
    {
        id: "graph",
        name: "Graph",
        description: "BFS, DFS, Dijkstra, and shortest paths.",
        icon: "🕸️",
        href: "#",
        active: false,
        algorithms: ["BFS", "DFS", "Dijkstra"],
    },
];

export const containerVariants = {
    hidden: { opacity: 0 } as const,
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.08 },
    } as const,
};

export const itemVariants = {
    hidden: { opacity: 0, y: 20 } as const,
    show: { opacity: 1, y: 0 } as const,
};
