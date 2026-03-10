"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Underline } from "@tiptap/extension-underline";
import { TextAlign } from "@tiptap/extension-text-align";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { Link } from "@tiptap/extension-link";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import { Highlight } from "@tiptap/extension-highlight";
import { FontFamily } from "@tiptap/extension-font-family";
import {
	Bold,
	Italic,
	Underline as UnderlineIcon,
	Strikethrough,
	AlignLeft,
	AlignCenter,
	AlignRight,
	AlignJustify,
	List,
	ListOrdered,
	Quote,
	Code,
	Link as LinkIcon,
	Subscript as SubscriptIcon,
	Superscript as SuperscriptIcon,
	Palette,
	Type,
	Heading1,
	Heading2,
	Heading3,
	Heading4,
	Heading5,
	Heading6,
} from "lucide-react";
import { useState, useCallback, useEffect } from "react";

const RichTextEditor = ({
	value,
	onChange,
	placeholder = "Start writing...",
}) => {
	const [isMounted, setIsMounted] = useState(false);
	const [showColorPicker, setShowColorPicker] = useState(false);
	const [showBgColorPicker, setShowBgColorPicker] = useState(false);
	const [showFontPicker, setShowFontPicker] = useState(false);
	const [linkUrl, setLinkUrl] = useState("");
	const [showLinkDialog, setShowLinkDialog] = useState(false);

	// Handle SSR by only mounting the editor on the client
	useEffect(() => {
		setIsMounted(true);
	}, []);

	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				heading: {
					levels: [1, 2, 3, 4, 5, 6],
				},
			}),
			Underline,
			TextAlign.configure({
				types: ["heading", "paragraph"],
			}),
			Subscript,
			Superscript,
			Link.configure({
				openOnClick: false,
				HTMLAttributes: {
					class: "text-blue-500 underline cursor-pointer",
				},
			}),
			TextStyle,
			Color,
			Highlight.configure({
				multicolor: true,
			}),
			FontFamily.configure({
				types: ["textStyle"],
			}),
		],
		content: value || "",
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML());
		},
		editorProps: {
			attributes: {
				class:
					"prose max-w-none focus:outline-none min-h-[300px] p-4 border rounded-md",
			},
		},
		immediatelyRender: false,
	});

	useEffect(() => {
		if (editor && value !== editor.getHTML()) {
			editor.commands.setContent(value || "");
		}
	}, [value, editor]);

	const setLink = useCallback(() => {
		if (!editor) return;

		const previousUrl = editor.getAttributes("link").href;
		setLinkUrl(previousUrl || "");
		setShowLinkDialog(true);
	}, [editor]);

	const handleLinkSubmit = () => {
		if (!editor) return;

		if (linkUrl === "") {
			editor.chain().focus().extendMarkRange("link").unsetLink().run();
		} else {
			editor
				.chain()
				.focus()
				.extendMarkRange("link")
				.setLink({ href: linkUrl })
				.run();
		}
		setShowLinkDialog(false);
		setLinkUrl("");
	};

	const colors = [
		"#000000",
		"#FF0000",
		"#00FF00",
		"#0000FF",
		"#FFFF00",
		"#FF00FF",
		"#00FFFF",
		"#FFA500",
		"#800080",
		"#008000",
		"#800000",
		"#000080",
		"#808000",
		"#808080",
		"#C0C0C0",
		"#FFFFFF",
	];

	const fonts = [
		"Inter",
		"Arial",
		"Georgia",
		"Times New Roman",
		"Helvetica",
		"Courier New",
		"Verdana",
		"Tahoma",
		"Comic Sans MS",
		"Impact",
		"Trebuchet MS",
		"Arial Black",
	];

	if (!editor) {
		return <div>Loading editor...</div>;
	}

        const ToolbarButton = ({ onClick, active, disabled, children, title }) => (
                <button
                        type="button"
                        onClick={onClick}
                        disabled={disabled}
                        title={title}
                        className={`rounded-lg p-2 transition-colors hover:bg-gray-100 ${
                                active ? "bg-gray-200 text-blue-600" : "text-gray-700"
                        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                >
			{children}
		</button>
	);

	const DropdownButton = ({ children, show, onToggle, title }) => (
                <div className="relative">
                        <button
                                type="button"
                                onClick={onToggle}
                                title={title}
                                className="rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100"
                        >
				{children}
			</button>
			{show && (
				<div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-lg z-10 min-w-[200px]">
					{title === "Text Color" && (
						<div className="p-3">
							<div className="grid grid-cols-4 gap-2">
								{colors.map((color) => (
									<button
										key={color}
										type="button"
										onClick={() => {
											editor.chain().focus().setColor(color).run();
											setShowColorPicker(false);
										}}
										className="w-8 h-8 rounded border-2 border-gray-300 hover:border-gray-500"
										style={{ backgroundColor: color }}
									/>
								))}
							</div>
						</div>
					)}
					{title === "Background Color" && (
						<div className="p-3">
							<div className="grid grid-cols-4 gap-2">
								{colors.map((color) => (
									<button
										key={color}
										type="button"
										onClick={() => {
											editor.chain().focus().setHighlight({ color }).run();
											setShowBgColorPicker(false);
										}}
										className="w-8 h-8 rounded border-2 border-gray-300 hover:border-gray-500"
										style={{ backgroundColor: color }}
									/>
								))}
							</div>
						</div>
					)}
					{title === "Font Family" && (
						<div className="max-h-60 overflow-y-auto">
							{fonts.map((font) => (
								<button
									key={font}
									type="button"
									onClick={() => {
										editor.chain().focus().setFontFamily(font).run();
										setShowFontPicker(false);
									}}
									className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
									style={{ fontFamily: font }}
								>
									{font}
								</button>
							))}
						</div>
					)}
				</div>
			)}
		</div>
	);

        return (
                <div className="overflow-hidden rounded-2xl border-2 border-teal-100/60 bg-white shadow-[0_25px_70px_-55px_rgba(9,115,98,0.35)]">
                        {/* Toolbar */}
                        <div className="flex flex-wrap gap-1 border-b border-teal-100/60 bg-gradient-to-r from-teal-50 to-emerald-50 p-2">
				{/* Text Formatting */}
				<div className="flex items-center gap-1 border-r pr-2 mr-2">
					<ToolbarButton
						onClick={() => editor.chain().focus().toggleBold().run()}
						active={editor.isActive("bold")}
						title="Bold"
					>
						<Bold className="h-4 w-4" />
					</ToolbarButton>
					<ToolbarButton
						onClick={() => editor.chain().focus().toggleItalic().run()}
						active={editor.isActive("italic")}
						title="Italic"
					>
						<Italic className="h-4 w-4" />
					</ToolbarButton>
					<ToolbarButton
						onClick={() => editor.chain().focus().toggleUnderline().run()}
						active={editor.isActive("underline")}
						title="Underline"
					>
						<UnderlineIcon className="h-4 w-4" />
					</ToolbarButton>
					<ToolbarButton
						onClick={() => editor.chain().focus().toggleStrike().run()}
						active={editor.isActive("strike")}
						title="Strikethrough"
					>
						<Strikethrough className="h-4 w-4" />
					</ToolbarButton>
				</div>

				{/* Headers */}
				<div className="flex items-center gap-1 border-r pr-2 mr-2">
					{[1, 2, 3, 4, 5, 6].map((level) => {
						const HeadingIcon = [
							Heading1,
							Heading2,
							Heading3,
							Heading4,
							Heading5,
							Heading6,
						][level - 1];
						return (
							<ToolbarButton
								key={level}
								onClick={() =>
									editor.chain().focus().toggleHeading({ level }).run()
								}
								active={editor.isActive("heading", { level })}
								title={`Heading ${level}`}
							>
								<HeadingIcon className="h-4 w-4" />
							</ToolbarButton>
						);
					})}
				</div>

				{/* Font and Colors */}
				<div className="flex items-center gap-1 border-r pr-2 mr-2">
					<DropdownButton
						show={showFontPicker}
						onToggle={() => {
							setShowFontPicker(!showFontPicker);
							setShowColorPicker(false);
							setShowBgColorPicker(false);
						}}
						title="Font Family"
					>
						<Type className="h-4 w-4" />
					</DropdownButton>
					<DropdownButton
						show={showColorPicker}
						onToggle={() => {
							setShowColorPicker(!showColorPicker);
							setShowFontPicker(false);
							setShowBgColorPicker(false);
						}}
						title="Text Color"
					>
						<Palette className="h-4 w-4" />
					</DropdownButton>
					<DropdownButton
						show={showBgColorPicker}
						onToggle={() => {
							setShowBgColorPicker(!showBgColorPicker);
							setShowFontPicker(false);
							setShowColorPicker(false);
						}}
						title="Background Color"
					>
						<div className="flex items-center">
							<Palette className="h-4 w-4" />
							<div className="w-2 h-2 bg-yellow-300 rounded ml-1"></div>
						</div>
					</DropdownButton>
				</div>

				{/* Lists */}
				<div className="flex items-center gap-1 border-r pr-2 mr-2">
					<ToolbarButton
						onClick={() => editor.chain().focus().toggleBulletList().run()}
						active={editor.isActive("bulletList")}
						title="Bullet List"
					>
						<List className="h-4 w-4" />
					</ToolbarButton>
					<ToolbarButton
						onClick={() => editor.chain().focus().toggleOrderedList().run()}
						active={editor.isActive("orderedList")}
						title="Numbered List"
					>
						<ListOrdered className="h-4 w-4" />
					</ToolbarButton>
				</div>

				{/* Alignment */}
				<div className="flex items-center gap-1 border-r pr-2 mr-2">
					<ToolbarButton
						onClick={() => editor.chain().focus().setTextAlign("left").run()}
						active={editor.isActive({ textAlign: "left" })}
						title="Align Left"
					>
						<AlignLeft className="h-4 w-4" />
					</ToolbarButton>
					<ToolbarButton
						onClick={() => editor.chain().focus().setTextAlign("center").run()}
						active={editor.isActive({ textAlign: "center" })}
						title="Align Center"
					>
						<AlignCenter className="h-4 w-4" />
					</ToolbarButton>
					<ToolbarButton
						onClick={() => editor.chain().focus().setTextAlign("right").run()}
						active={editor.isActive({ textAlign: "right" })}
						title="Align Right"
					>
						<AlignRight className="h-4 w-4" />
					</ToolbarButton>
					<ToolbarButton
						onClick={() => editor.chain().focus().setTextAlign("justify").run()}
						active={editor.isActive({ textAlign: "justify" })}
						title="Justify"
					>
						<AlignJustify className="h-4 w-4" />
					</ToolbarButton>
				</div>

				{/* Special Text */}
				<div className="flex items-center gap-1 border-r pr-2 mr-2">
					<ToolbarButton
						onClick={() => editor.chain().focus().toggleSubscript().run()}
						active={editor.isActive("subscript")}
						title="Subscript"
					>
						<SubscriptIcon className="h-4 w-4" />
					</ToolbarButton>
					<ToolbarButton
						onClick={() => editor.chain().focus().toggleSuperscript().run()}
						active={editor.isActive("superscript")}
						title="Superscript"
					>
						<SuperscriptIcon className="h-4 w-4" />
					</ToolbarButton>
				</div>

				{/* Quotes & Code */}
				<div className="flex items-center gap-1 border-r pr-2 mr-2">
					<ToolbarButton
						onClick={() => editor.chain().focus().toggleBlockquote().run()}
						active={editor.isActive("blockquote")}
						title="Blockquote"
					>
						<Quote className="h-4 w-4" />
					</ToolbarButton>
					<ToolbarButton
						onClick={() => editor.chain().focus().toggleCodeBlock().run()}
						active={editor.isActive("codeBlock")}
						title="Code Block"
					>
						<Code className="h-4 w-4" />
					</ToolbarButton>
				</div>

				{/* Links */}
				<div className="flex items-center gap-1">
					<ToolbarButton
						onClick={setLink}
						active={editor.isActive("link")}
						title="Add Link"
					>
						<LinkIcon className="h-4 w-4" />
					</ToolbarButton>
				</div>
			</div>

			{/* Editor Content */}
			<div className="min-h-[300px]">
				<EditorContent editor={editor} />
			</div>

			{/* Link Dialog */}
			{showLinkDialog && (
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
					<div className="bg-white p-6 rounded-lg shadow-lg w-96">
						<h3 className="text-lg font-semibold mb-4">Add/Edit Link</h3>
						<input
							type="url"
							value={linkUrl}
							onChange={(e) => setLinkUrl(e.target.value)}
							placeholder="https://example.com"
							className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
							autoFocus
						/>
						<div className="flex gap-2 justify-end">
							<button
								type="button"
								onClick={() => setShowLinkDialog(false)}
								className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
							>
								Cancel
							</button>
							<button
								type="button"
								onClick={handleLinkSubmit}
								className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
							>
								{linkUrl ? "Update" : "Remove"} Link
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default RichTextEditor;
