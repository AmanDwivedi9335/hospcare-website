"use client";

import dynamic from "next/dynamic";

// Dynamically import RichTextEditor with no SSR
const RichTextEditor = dynamic(() => import("./RichTextEditor"), {
	ssr: false,
	loading: () => (
		<div className="border rounded-lg overflow-hidden">
			<div className="border-b bg-gray-50 p-2 h-16"></div>
			<div className="min-h-[300px] p-4 flex items-center justify-center text-gray-500">
				Loading editor...
			</div>
		</div>
	),
});

export default RichTextEditor;
