"use client";

import React, { useState, useRef } from "react";
import {
  LayoutDashboard,
  PenTool,
  LogOut,
  Image as ImageIcon,
  Menu,
  X,
  List,
  ListOrdered
} from "lucide-react";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapLink from "@tiptap/extension-link";

export default function AddBlogDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Web Development");
  const [tags, setTags] = useState("");
  const [featuredImage, setFeaturedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // TIPTAP EDITOR
  const editor = useEditor({
    extensions: [StarterKit, TiptapLink],
    content: "",
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  // IMAGE UPLOAD
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFeaturedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // SAVE BLOG TO BACKEND
  const handleSave = async (status) => {
    if (!title || !slug || !content) {
      alert("Please fill title, slug and content");
      return;
    }

    setIsLoading(true);

    const tagsArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    const payload = {
      title,
      slug,
      content,
      category,
      tags: tagsArray,
      featuredImage,
      status,
    };

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
      const res = await fetch(`${baseUrl}/api/blogs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert(
          `Blog ${status === "Published" ? "published" : "saved"
          } successfully`
        );

        router.push("/admin/dashboard");
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to save blog");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans relative">
      {/* Mobile Overlay - EXTREMELY HIGH Z-INDEX */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR - EXTREMELY HIGH Z-INDEX */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out flex flex-col
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:h-screen`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b shrink-0 bg-indigo-50 lg:bg-white">
          <span className="text-xl text-indigo-900 lg:text-black font-bold">AdminPanel</span>

          <button
            className="lg:hidden p-2 text-indigo-900 hover:bg-indigo-100 rounded-md"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
          <Link
            href="/admin/dashboard"
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center gap-3 px-4 py-3 text-black hover:bg-slate-100 rounded-lg transition-colors"
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>

          <Link
            href="/admin/add-blog"
            onClick={() => setIsSidebarOpen(false)}
            className="flex items-center gap-3 px-4 py-3 bg-indigo-50 text-indigo-600 rounded-lg transition-colors font-medium"
          >
            <PenTool size={20} />
            Write Blog
          </Link>
        </nav>

        <div className="p-4 border-t shrink-0">
          <button className="flex items-center gap-3 px-4 py-3 w-full font-medium text-black hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden w-full relative">
        {/* HEADER */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-4 sm:px-6 shrink-0 z-10">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* MOBILE MENU BUTTON */}
            <button
              className="lg:hidden p-2 -ml-2 text-slate-700 hover:bg-slate-100 rounded-md flex items-center gap-2 border border-slate-200"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={20} />
              <span className="text-sm font-semibold">Menu</span>
            </button>

            <h1 className="text-lg sm:text-xl text-black font-bold truncate hidden sm:block">
              Create New Post
            </h1>
          </div>

          <button
            onClick={() => handleSave("Published")}
            disabled={isLoading}
            className="px-4 py-2 text-sm sm:text-base font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm whitespace-nowrap"
          >
            {isLoading ? "Saving..." : "Publish Post"}
          </button>
        </header>

        {/* SCROLLABLE PAGE CONTENT */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

            {/* LEFT COLUMN: Editor */}
            <div className="lg:col-span-2 space-y-6">

              <div className="bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-sm">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Post Title..."
                  className="w-full text-2xl sm:text-3xl text-black font-bold outline-none placeholder:text-gray-300 bg-transparent"
                />
              </div>

              {/* TIPTAP EDITOR */}
              <div className="bg-white rounded-xl border border-slate-200 text-black overflow-hidden shadow-sm flex flex-col">
                {editor && (
                  <div className="flex gap-2 border-b p-2 sm:p-3 bg-slate-50 flex-wrap sticky top-0 z-10">

                    <button
                      onClick={() => editor.chain().focus().toggleBold().run()}
                      className={`px-3 py-1.5 border rounded text-sm font-medium transition-colors ${editor.isActive('bold') ? 'bg-slate-800 text-white border-slate-800' : 'bg-white hover:bg-slate-100 text-slate-700'}`}
                    >
                      Bold
                    </button>

                    <button
                      onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                      className={`px-3 py-1.5 border rounded text-sm font-medium transition-colors ${editor.isActive('heading', { level: 2 }) ? 'bg-slate-800 text-white border-slate-800' : 'bg-white hover:bg-slate-100 text-slate-700'}`}
                    >
                      H2
                    </button>

                    <button
                      onClick={() => {
                        const previousUrl = editor.getAttributes('link').href;
                        const url = window.prompt('URL', previousUrl);
                        if (url === null) return;
                        if (url === '') {
                          editor.chain().focus().extendMarkRange('link').unsetLink().run();
                          return;
                        }
                        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
                      }}
                      className={`px-3 py-1.5 border rounded text-sm font-medium transition-colors ${editor.isActive('link') ? 'bg-slate-800 text-white border-slate-800' : 'bg-white hover:bg-slate-100 text-slate-700'}`}
                    >
                      Link
                    </button>

                    <div className="w-px h-8 bg-slate-300 mx-1 hidden sm:block"></div>

                    {/* Unordered List (Bullets) */}
                    <button
                      onClick={() => editor.chain().focus().toggleBulletList().run()}
                      className={`px-3 py-1.5 border rounded flex items-center transition-colors ${editor.isActive('bulletList') ? 'bg-slate-800 text-white border-slate-800' : 'bg-white hover:bg-slate-100 text-slate-700'}`}
                      title="Bullet List"
                    >
                      <List size={18} />
                    </button>

                    {/* Ordered List (Numbers) */}
                    <button
                      onClick={() => editor.chain().focus().toggleOrderedList().run()}
                      className={`px-3 py-1.5 border rounded flex items-center transition-colors ${editor.isActive('orderedList') ? 'bg-slate-800 text-white border-slate-800' : 'bg-white hover:bg-slate-100 text-slate-700'}`}
                      title="Numbered List"
                    >
                      <ListOrdered size={18} />
                    </button>

                  </div>
                )}

                {/* NOTE THE NEW CSS CLASSES HERE TO FORCE TAILWIND TO SHOW BULLETS AND HEADINGS */}
                <EditorContent
                  editor={editor}
                  className="p-4 sm:p-6 min-h-[350px] focus:outline-none [&_.ProseMirror]:outline-none cursor-text
                  [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-4 [&_h2]:mt-6 
                  [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-4 [&_ul_li]:mb-1 
                  [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-4 [&_ol_li]:mb-1
                  [&_a]:text-blue-600 [&_a]:underline [&_p]:mb-4"
                  onClick={() => editor && editor.chain().focus().run()}
                />
              </div>

              {/* BIG SUBMIT BUTTON AT THE BOTTOM OF THE EDITOR */}
              <div className="pt-2">
                <button
                  onClick={() => handleSave("Published")}
                  disabled={isLoading}
                  className="w-full py-4 text-lg font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-md transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? "Saving to Database..." : "Publish Blog Post"}
                </button>
              </div>

            </div>

            {/* RIGHT COLUMN: Settings */}
            <div className="space-y-6">

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="text-sm text-black font-bold mb-4">
                  Featured Image
                </h3>

                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleImageChange}
                />

                <div
                  onClick={() => fileInputRef.current.click()}
                  className="border-2 border-dashed border-slate-300 hover:border-indigo-400 hover:bg-indigo-50 transition-colors rounded-lg p-6 text-black cursor-pointer text-center flex flex-col items-center justify-center min-h-[160px]"
                >
                  {featuredImage ? (
                    <img
                      src={featuredImage}
                      className="rounded-md w-full h-auto object-cover max-h-[200px]"
                      alt="Featured"
                    />
                  ) : (
                    <>
                      <ImageIcon className="mx-auto mb-3 text-slate-400" size={32} />
                      <span className="font-medium text-sm text-slate-700">Click to upload</span>
                      <span className="text-xs text-slate-500 mt-1">PNG, JPG up to 5MB</span>
                    </>
                  )}
                </div>
                {featuredImage && (
                  <button
                    onClick={() => setFeaturedImage(null)}
                    className="mt-3 w-full text-sm text-red-600 hover:text-red-800 font-bold transition-colors"
                  >
                    Remove Image
                  </button>
                )}
              </div>

              <div className="bg-white p-5 rounded-xl text-black border border-slate-200 shadow-sm space-y-5">
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-1.5">
                    Slug (URL)
                  </label>
                  <input
                    value={slug}
                    onChange={(e) =>
                      setSlug(
                        e.target.value
                          .toLowerCase()
                          .replace(/\s+/g, "-")
                      )
                    }
                    placeholder="my-post-url"
                    className="w-full border border-slate-300 px-3 py-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-1.5">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border border-slate-300 px-3 py-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-white"
                  >
                    <option>Web Development</option>
                    <option>UI/UX Design</option>
                    <option>Tutorial</option>
                    <option>Technology</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-1.5">
                    Tags (Comma Separated)
                  </label>
                  <input
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="React, Next.js"
                    className="w-full border border-slate-300 px-3 py-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}