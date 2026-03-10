import dynamic from "next/dynamic";
import { Suspense } from "react";

export const metadata = {
        title: "LADWA Solutions | End-to-End Safety Programs",
        description:
                "Explore LADWA's turnkey safety solutions covering audits, consulting, equipment, training, and technology platforms designed for high-risk industries.",
        alternates: { canonical: "/solutions" },
};

// Lazy load the main Solutions page for better performance
const SolutionsPage = dynamic(
        () => import("@/components/Solutions/Solutions.jsx"),
        {
                loading: () => (
                        <div className="min-h-screen bg-gray-100 animate-pulse flex items-center justify-center">
                                <div className="text-center">
                                        <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4"></div>
                                        <div className="w-48 h-4 bg-gray-300 rounded mx-auto mb-2"></div>
                                        <div className="w-32 h-4 bg-gray-300 rounded mx-auto"></div>
                                </div>
                        </div>
                ),
        }
);

export default function Page() {
        return (
                <Suspense
                        fallback={
                                <div className="min-h-screen bg-gray-100 animate-pulse flex items-center justify-center">
                                        <div className="text-center">
                                                <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4"></div>
                                                <div className="w-48 h-4 bg-gray-300 rounded mx-auto mb-2"></div>
                                                <div className="w-32 h-4 bg-gray-300 rounded mx-auto"></div>
                                        </div>
                                </div>
                        }
                >
                        <SolutionsPage />
                </Suspense>
        );
}
