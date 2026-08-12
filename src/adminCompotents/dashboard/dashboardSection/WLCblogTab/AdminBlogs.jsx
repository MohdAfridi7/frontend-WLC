import React, { useEffect, useMemo, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  ArrowUpRight,
  Calendar,
  Plus,
  Pencil,
  Trash2,
  Loader2,
  X,
  Search,
  Inbox,
  RefreshCw,
  ImagePlus,
  Link2,
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Heading2,
  RemoveFormatting,
} from "lucide-react";
import { createBlog, getAllBlogs, updateBlog, deleteBlog } from "../../../../api/WLCblogRoutes";
// ^ update this import path to wherever these live

const emptyForm = {
  title: "",
  postDate: "",
  shortDescription: "",
  content: "",
};

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    : "";

/* ============ TEXTURE / BACKGROUND (unchanged from the design) ============ */
const grainSVG = `data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.09 0 0 0 0 0.15 0 0 0 0 0.3 0 0 0 0.35 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/></svg>`;

/* ============ Lightweight rich text editor (no external deps) ============ */
function RichTextEditor({ value, onChange, disabled }) {
  const ref = useRef(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (ref.current && !initialized.current) {
      ref.current.innerHTML = value || "";
      initialized.current = true;
    }
  }, [value]);

  const exec = (command, arg) => {
    if (disabled) return;
    ref.current?.focus();
    document.execCommand(command, false, arg);
    onChange(ref.current?.innerHTML || "");
  };

  const handleLink = () => {
    const url = window.prompt("Enter URL");
    if (url) exec("createLink", url);
  };

  const ToolbarBtn = ({ onClick, title, children }) => (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      disabled={disabled}
      className="rounded-md p-1.5 text-slate-600 hover:bg-slate-100 hover:text-blue-600 disabled:opacity-50"
    >
      {children}
    </button>
  );

  return (
    <div className="overflow-hidden rounded-xl border border-slate-300 shadow-sm border-b border-slate-200 bg-slate-50">
      <div className="flex flex-wrap items-center gap-0.5 border-b-2 border-slate-900 bg-slate-50 px-1.5 py-1">
        <ToolbarBtn onClick={() => exec("bold")} title="Bold"><Bold className="h-3.5 w-3.5" /></ToolbarBtn>
        <ToolbarBtn onClick={() => exec("italic")} title="Italic"><Italic className="h-3.5 w-3.5" /></ToolbarBtn>
        <ToolbarBtn onClick={() => exec("underline")} title="Underline"><UnderlineIcon className="h-3.5 w-3.5" /></ToolbarBtn>
        <ToolbarBtn onClick={() => exec("formatBlock", "H2")} title="Heading"><Heading2 className="h-3.5 w-3.5" /></ToolbarBtn>
        <ToolbarBtn onClick={() => exec("insertUnorderedList")} title="Bullet list"><List className="h-3.5 w-3.5" /></ToolbarBtn>
        <ToolbarBtn onClick={() => exec("insertOrderedList")} title="Numbered list"><ListOrdered className="h-3.5 w-3.5" /></ToolbarBtn>
        <ToolbarBtn onClick={handleLink} title="Insert link"><Link2 className="h-3.5 w-3.5" /></ToolbarBtn>
        <ToolbarBtn onClick={() => exec("removeFormat")} title="Clear formatting"><RemoveFormatting className="h-3.5 w-3.5" /></ToolbarBtn>
      </div>
      <div
        ref={ref}
        contentEditable={!disabled}
        onInput={() => onChange(ref.current?.innerHTML || "")}
        className="prose prose-sm max-w-none min-h-[140px] px-3 py-2.5 text-sm text-slate-700 outline-none [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_h2]:text-base [&_h2]:font-bold"
        suppressContentEditableWarning
      />
    </div>
  );
}

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [confirmTarget, setConfirmTarget] = useState(null);

  // Form modal
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchBlogs = async ({ silent } = {}) => {
    if (!silent) setLoading(true);
    try {
      const res = await getAllBlogs();
      const list = Array.isArray(res) ? res : res?.data || [];
      setBlogs(Array.isArray(list) ? list : [list]);
    } catch (err) {
      toast.error(err?.message || "Could not load blog posts. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return blogs;
    return blogs.filter((b) => (b.title || "").toLowerCase().includes(q));
  }, [blogs, search]);

  // ---------- Modal helpers ----------
  const openCreateModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setImageFile(null);
    setImagePreview("");
    setModalOpen(true);
  };

  const openEditModal = (blog) => {
    setEditingId(blog._id);
    setForm({
      title: blog.title || "",
      postDate: blog.postDate ? blog.postDate.slice(0, 10) : "",
      shortDescription: blog.shortDescription || "",
      content: blog.content || "",
    });
    setImageFile(null);
    setImagePreview(blog.image || "");
    setModalOpen(true);
  };

  const closeModal = () => {
    if (saving) return;
    setModalOpen(false);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleImageFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.shortDescription || !form.postDate) {
      toast.error("Please fill title, short description and post date.");
      return;
    }
    if (!editingId && !imageFile) {
      toast.error("Please upload a cover image.");
      return;
    }

    const payload = new FormData();
    Object.entries(form).forEach(([key, value]) => payload.append(key, value));
    if (imageFile) payload.append("image", imageFile);

    setSaving(true);
    const toastId = toast.loading(editingId ? "Updating post..." : "Publishing post...");
    try {
      if (editingId) {
        const res = await updateBlog(editingId, payload);
        const updated = res?.data || res;
        setBlogs((prev) => prev.map((b) => (b._id === editingId ? { ...b, ...updated } : b)));
        toast.success("Post updated.", { id: toastId });
      } else {
        const res = await createBlog(payload);
        const created = res?.data || res;
        setBlogs((prev) => [...prev, created]);
        toast.success("Post published.", { id: toastId });
      }
      setModalOpen(false);
    } catch (err) {
      toast.error(err?.message || `Failed to ${editingId ? "update" : "publish"} post.`, { id: toastId });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (blog) => {
    setConfirmTarget(null);
    setDeletingId(blog._id);
    const prev = blogs;
    setBlogs((curr) => curr.filter((b) => b._id !== blog._id));

    const toastId = toast.loading(`Deleting "${blog.title}"...`);
    try {
      await deleteBlog(blog._id);
      toast.success("Post deleted.", { id: toastId });
    } catch (err) {
      setBlogs(prev);
      toast.error(err?.message || "Failed to delete post.", { id: toastId });
    } finally {
      setDeletingId(null);
    }
  };

  const [featured, ...rest] = filtered;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-10">
    
      <Toaster position="top-right" toastOptions={{ duration: 3500 }} />

      <div className="mx-auto max-w-6xl">
        {/* Admin toolbar */}
     <div className="mb-6 flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
  <div>
    <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
      Blogs
    </h1>
    <p className="mt-1 text-sm text-slate-500">
      {loading
        ? "Loading blogs..."
        : `${filtered.length} of ${blogs.length} blogs`}
    </p>
  </div>

  <div className="flex items-center gap-2">
    <div className="relative flex-1 sm:flex-none">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search title..."
        className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 sm:w-56"
      />
    </div>

    <button
      onClick={() => fetchBlogs({ silent: true })}
      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:bg-slate-50"
    >
      <RefreshCw className="h-4 w-4" />
      <span className="hidden sm:inline">Refresh</span>
    </button>

    <button
      onClick={openCreateModal}
      className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700"
    >
      <Plus className="h-4 w-4" />
      <span className="hidden sm:inline">Add Blog</span>
    </button>
  </div>
</div>

        {/* Loading skeleton */}
        {loading && (
          <div className="space-y-8">
            <div className="h-[420px] w-full animate-pulse border-2 border-slate-900 bg-white/60" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="h-64 animate-pulse border-2 border-slate-900 bg-white/60" />
              <div className="h-64 animate-pulse border-2 border-slate-900 bg-white/60" />
            </div>
          </div>
        )}

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <div className="border-2 border-dashed border-slate-900/30 bg-white/60 py-16 text-center text-slate-400">
            <Inbox className="mx-auto mb-2 h-8 w-8 text-slate-300" />
            {blogs.length === 0 ? "No posts yet. Publish the first one." : "No posts match your search."}
          </div>
        )}

        {/* ===== Featured Hero ===== */}
        {!loading && featured && (
          <article className="group relative mb-14 overflow-hidden border-2 border-slate-900 bg-slate-900 text-white shadow-[8px_8px_0_0_#2563eb] transition-all">
            <div className="grid md:grid-cols-[1.15fr_1fr]">
              <div className="relative h-72 overflow-hidden md:h-full md:min-h-[420px]">
                {featured.image ? (
                          <img
  src={featured.image}
  alt={featured.title}
  loading="lazy"
  className="absolute inset-0 h-full w-full object-cover grayscale-[15%] transition-all duration-[900ms] ease-out group-hover:scale-[1.04] group-hover:grayscale-0"
/>
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-slate-800">
                    <ImagePlus className="h-10 w-10 text-slate-500" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/60 via-slate-900/10 to-transparent" />

                {/* Edit / Delete */}
                <CardActions
                  isDeleting={deletingId === featured._id}
                  onEdit={() => openEditModal(featured)}
                  onDelete={() => setConfirmTarget(featured)}
                />
              </div>

              <div className="relative flex flex-col justify-between border-t-2 border-slate-900 bg-[#f4f1ea] p-6 text-slate-900 sm:p-10 md:border-l-2 md:border-t-0">
                <div>
                  <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3 w-3" /> {formatDate(featured.postDate)}
                    </span>
                  </div>

                  <h2 className="font-display text-3xl font-normal leading-[1.05] tracking-tight text-slate-900 sm:text-4xl md:text-[42px]">
                    {featured.title}
                  </h2>

                  <p className="mt-5 line-clamp-4 text-sm leading-relaxed text-slate-700 sm:text-base">
                    {featured.shortDescription}
                  </p>
                </div>

                <div className="mt-8 inline-flex w-fit items-center gap-3 border-b-2 border-blue-600 pb-1 font-mono text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                  Read Full Story
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </div>
          </article>
        )}

        {/* ===== Grid ===== */}
        {!loading && rest.length > 0 && (
          <div className="grid grid-cols-1 gap-0 border-slate-900 sm:grid-cols-2">
            {rest.map((p, idx) => (
              <article
                key={p._id}
                className={`group relative ml-2 mb-2 mr-2 flex flex-col border-b-2 border-r-2 border-slate-900 bg-[#faf7f0] transition-colors hover:bg-white ${
                  deletingId === p._id ? "opacity-50" : ""
                }`}
              >
                <div className="absolute right-4 top-4 z-10 font-display text-3xl leading-none text-slate-900/15">
                  {String(idx + 2).padStart(2, "0")}
                </div>

                <div className="relative aspect-[16/10] overflow-hidden border-b-2 border-slate-900">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      className="h-full w-full object-cover grayscale-[20%] transition-all duration-700 ease-out group-hover:scale-[1.06] group-hover:grayscale-0"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-100">
                      <ImagePlus className="h-8 w-8 text-slate-300" />
                    </div>
                  )}

                  <CardActions
                    isDeleting={deletingId === p._id}
                    onEdit={() => openEditModal(p)}
                    onDelete={() => setConfirmTarget(p)}
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3 w-3" /> {formatDate(p.postDate)}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-normal leading-[1.1] tracking-tight text-slate-900">
                    {p.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600">
                    {p.shortDescription}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t-2 border-slate-900/10 pt-4">
                    <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
                      Continue Reading
                    </span>
                    <div className="flex h-9 w-9 items-center justify-center border-2 border-slate-900 bg-white text-slate-900">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* ===== Create / Edit modal ===== */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-6">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
              <h3 className="text-xl font-semibold text-slate-900">
                {editingId ? "Edit Post" : "New Post"}
              </h3>
              <button onClick={closeModal} className="rounded p-1.5 text-slate-400 hover:bg-slate-100">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6">
              {/* Cover image */}
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Cover Image</label>
                <div className="flex items-center gap-3">
                  <div className="relative h-20 w-32 overflow-hidden border-2 border-slate-900 bg-slate-50">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Cover preview" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <ImagePlus className="h-6 w-6 text-slate-300" />
                      </div>
                    )}
                  </div>
                  <label className="inline-flex cursor-pointer items-center gap-1 border-2 border-slate-900 px-3 py-1.5 text-xs font-bold uppercase tracking-wide hover:bg-slate-50">
                    <ImagePlus className="h-3.5 w-3.5" /> Upload
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageFile} disabled={saving} />
                  </label>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Title</label>
                <input
                  id="title"
                  value={form.title}
                  onChange={handleChange}
                  disabled={saving}
                  placeholder="Post title"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500
focus:ring-2
focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-1 flex items-center gap-1.5 text-xs font-medium text-slate-600">
                  <Calendar className="h-3.5 w-3.5" /> Post Date
                </label>
                <input
                  id="postDate"
                  type="date"
                  value={form.postDate}
                  onChange={handleChange}
                  disabled={saving}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500
focus:ring-2
focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Short Description</label>
                <textarea
                  id="shortDescription"
                  rows={2}
                  value={form.shortDescription}
                  onChange={handleChange}
                  disabled={saving}
                  placeholder="One or two line summary shown on the card"
                  className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Content</label>
                <RichTextEditor
                  value={form.content}
                  onChange={(html) => setForm((prev) => ({ ...prev, content: html }))}
                  disabled={saving}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                >
                  {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                  {editingId ? "Save Changes" : "Publish"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===== Delete confirmation modal ===== */}
      {confirmTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <h3 className="text-base font-semibold text-slate-800">Delete this post?</h3>
            <p className="mt-1.5 text-sm text-slate-500">
              This will permanently remove{" "}
              <span className="font-medium text-slate-700">"{confirmTarget.title}"</span>. This action
              can't be undone.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setConfirmTarget(null)}
                className="border-2 border-slate-900 px-3.5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmTarget)}
                className="border-2 border-slate-900 bg-rose-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-rose-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Edit / Delete icon overlay — own stacking layer, only interactive when visible so it never
// gets blocked by (or blocks) other elements underneath it.
function CardActions({ isDeleting, onEdit, onDelete }) {
  return (
    <div
      className={`absolute top-3 right-3 z-30 flex items-center gap-1.5 transition-opacity duration-200 ${
        isDeleting
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
      }`}
    >
      <button
        type="button"
        title="Edit"
        onClick={(e) => {
          e.stopPropagation();
          onEdit();
        }}
        className="rounded-md bg-white p-1.5 text-slate-700 shadow hover:bg-slate-50 hover:text-blue-600"
      >
        <Pencil className="h-5 w-5" />
      </button>
      <button
        type="button"
        title="Delete"
        disabled={isDeleting}
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="rounded-md bg-white p-1.5 text-slate-700 shadow hover:bg-slate-50 hover:text-rose-600 disabled:opacity-50"
      >
        {isDeleting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-5 w-5" />}
      </button>
    </div>
  );
}