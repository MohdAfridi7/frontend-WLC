import React, { useEffect, useMemo, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  Play,
  X,
  Calendar,
  ArrowUpRight,
  Plus,
  Pencil,
  Trash2,
  Loader2,
  Search,
  Inbox,
  RefreshCw,
  Link2,
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Heading2,
  RemoveFormatting,
} from "lucide-react";
import { FaYoutube } from "react-icons/fa";
import {
  createVideo,
  getAllVideos,
  updateVideo,
  deleteVideo,
} from "../../api/videoRoutes";
// ^ update this import path to wherever these live

const emptyForm = { title: "", youtubeLink: "", shortDescription: "", content: "" };

// Pull a YouTube video id out of watch/short/embed style links
function extractYoutubeId(url = "") {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{6,})/
  );
  return match ? match[1] : "";
}

function stripHtml(html = "") {
  const div = document.createElement("div");
  div.innerHTML = html;
  return (div.textContent || div.innerText || "").trim();
}

// ---------- Lightweight rich text editor (no external deps) ----------
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
      className="rounded-md p-1.5 text-slate-600 hover:bg-slate-100 hover:text-indigo-600 disabled:opacity-50"
    >
      {children}
    </button>
  );

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100">
      <div className="flex flex-wrap items-center gap-0.5 border-b border-slate-200 bg-slate-50 px-1.5 py-1">
        <ToolbarBtn onClick={() => exec("bold")} title="Bold">
          <Bold className="h-3.5 w-3.5" />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => exec("italic")} title="Italic">
          <Italic className="h-3.5 w-3.5" />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => exec("underline")} title="Underline">
          <UnderlineIcon className="h-3.5 w-3.5" />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => exec("formatBlock", "H2")} title="Heading">
          <Heading2 className="h-3.5 w-3.5" />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => exec("insertUnorderedList")} title="Bullet list">
          <List className="h-3.5 w-3.5" />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => exec("insertOrderedList")} title="Numbered list">
          <ListOrdered className="h-3.5 w-3.5" />
        </ToolbarBtn>
        <ToolbarBtn onClick={handleLink} title="Insert link">
          <Link2 className="h-3.5 w-3.5" />
        </ToolbarBtn>
        <ToolbarBtn onClick={() => exec("removeFormat")} title="Clear formatting">
          <RemoveFormatting className="h-3.5 w-3.5" />
        </ToolbarBtn>
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

// Shimmer placeholder shown while the list is loading
const SkeletonCard = () => (
  <div className="overflow-hidden bg-white ring-1 ring-black/5 shadow-md">
    <div className="aspect-video w-full animate-pulse bg-slate-200" />
    <div className="p-6">
      <div className="mb-3 h-4 w-3/4 animate-pulse rounded bg-slate-200" />
      <div className="mb-2 h-3 w-full animate-pulse rounded bg-slate-200" />
      <div className="h-3 w-5/6 animate-pulse rounded bg-slate-200" />
    </div>
  </div>
);

export default function GlobalUpdates() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [confirmTarget, setConfirmTarget] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  // Form modal
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchVideos = async ({ silent } = {}) => {
    if (!silent) setLoading(true);
    try {
      const res = await getAllVideos();
      const list = Array.isArray(res) ? res : res?.data || [];
      setVideos(Array.isArray(list) ? list : [list]);
    } catch (err) {
      toast.error(err?.message || "Could not load videos. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return videos;
    return videos.filter((v) =>
      [v.title, v.shortDescription].filter(Boolean).some((f) => f.toLowerCase().includes(q))
    );
  }, [videos, search]);

  // ---------- Modal helpers ----------
  const openCreateModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEditModal = (video) => {
    setEditingId(video._id);
    setForm({
      title: video.title || "",
      youtubeLink: video.youtubeLink || "",
      shortDescription: video.shortDescription || "",
      content: video.content || "",
    });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.youtubeLink || !form.shortDescription) {
      toast.error("Please fill title, YouTube link and short description.");
      return;
    }
    if (!extractYoutubeId(form.youtubeLink)) {
      toast.error("That doesn't look like a valid YouTube link.");
      return;
    }

    setSaving(true);
    const toastId = toast.loading(editingId ? "Updating video..." : "Creating video...");
    try {
      if (editingId) {
        const res = await updateVideo(editingId, form);
        const updated = res?.data || res;
        setVideos((prev) => prev.map((v) => (v._id === editingId ? { ...v, ...updated } : v)));
        toast.success("Video updated.", { id: toastId });
      } else {
        const res = await createVideo(form);
        const created = res?.data || res;
        setVideos((prev) => [...prev, created]);
        toast.success("Video created.", { id: toastId });
      }
      setModalOpen(false);
    } catch (err) {
      toast.error(err?.message || `Failed to ${editingId ? "update" : "create"} video.`, {
        id: toastId,
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (video) => {
    setConfirmTarget(null);
    setDeletingId(video._id);
    const prev = videos;
    setVideos((curr) => curr.filter((v) => v._id !== video._id));

    const toastId = toast.loading(`Deleting "${video.title}"...`);
    try {
      await deleteVideo(video._id);
      toast.success("Video deleted.", { id: toastId });
    } catch (err) {
      setVideos(prev);
      toast.error(err?.message || "Failed to delete video.", { id: toastId });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-10">
      <Toaster position="top-right" toastOptions={{ duration: 3500 }} />

      {/* Header */}
      <div className="mx-auto mb-6 flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Videos</h1>
          <p className="mt-1 text-sm text-slate-500">
            {loading ? "Loading videos..." : `${filtered.length} of ${videos.length} videos`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:flex-none">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search title, description..."
              className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 sm:w-56"
            />
          </div>
          <button
            onClick={() => fetchVideos({ silent: true })}
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
            <span className="hidden sm:inline">Add Video</span>
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {loading && Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}

          {!loading && filtered.length === 0 && (
            <div className="col-span-full rounded-xl border border-dashed border-slate-200 bg-white py-14 text-center text-slate-400">
              <Inbox className="mx-auto mb-2 h-8 w-8 text-slate-300" />
              {videos.length === 0 ? "No videos yet. Add the first one." : "No videos match your search."}
            </div>
          )}

          {!loading &&
            filtered.map((v, i) => (
              <UpdateCard
                key={v._id}
                video={v}
                index={i}
                isExpanded={expandedId === v._id}
                isDeleting={deletingId === v._id}
                onExpand={() => setExpandedId(expandedId === v._id ? null : v._id)}
                onPlay={() => setActiveVideo(v)}
                onEdit={() => openEditModal(v)}
                onDelete={() => setConfirmTarget(v)}
              />
            ))}
        </div>
      </div>

      {/* Create / Edit modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 py-6">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <h3 className="text-base font-semibold text-slate-800">
                {editingId ? "Edit Video" : "Add Video"}
              </h3>
              <button onClick={closeModal} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 px-5 py-5">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Title</label>
                <input
                  id="title"
                  value={form.title}
                  onChange={handleChange}
                  disabled={saving}
                  placeholder="e.g. Anthony Albanese Speaks"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-1 flex items-center gap-1.5 text-xs font-medium text-slate-600">
                  <FaYoutube className="h-3.5 w-3.5 text-red-500" /> YouTube Link
                </label>
                <input
                  id="youtubeLink"
                  value={form.youtubeLink}
                  onChange={handleChange}
                  disabled={saving}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />
                {form.youtubeLink && !extractYoutubeId(form.youtubeLink) && (
                  <p className="mt-1 text-xs text-rose-500">This doesn't look like a valid YouTube link.</p>
                )}
              </div>

              {/* Thumbnail preview */}
              {extractYoutubeId(form.youtubeLink) && (
                <div className="overflow-hidden rounded-lg border border-slate-200">
                  <img
                    src={`https://img.youtube.com/vi/${extractYoutubeId(form.youtubeLink)}/hqdefault.jpg`}
                    alt="Video thumbnail preview"
                    className="aspect-video w-full object-cover"
                  />
                </div>
              )}

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Short Description</label>
                <input
                  id="shortDescription"
                  value={form.shortDescription}
                  onChange={handleChange}
                  disabled={saving}
                  placeholder="One-line summary shown on the card"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
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
                  className="rounded-lg border border-slate-200 px-3.5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
                >
                  {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                  {editingId ? "Save Changes" : "Create Video"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {confirmTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-5 shadow-xl">
            <h3 className="text-base font-semibold text-slate-800">Delete this video?</h3>
            <p className="mt-1.5 text-sm text-slate-500">
              This will permanently remove{" "}
              <span className="font-medium text-slate-700">"{confirmTarget.title}"</span>. This action
              can't be undone.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setConfirmTarget(null)}
                className="rounded-lg border border-slate-200 px-3.5 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmTarget)}
                className="rounded-lg bg-rose-600 px-3.5 py-2 text-sm font-medium text-white hover:bg-rose-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== VIDEO MODAL ===== */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-[#1A1F36] shadow-2xl ring-1 ring-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute -top-12 right-0 flex items-center gap-2 text-sm text-white transition-colors hover:text-[#4D6AE8]"
            >
              Close <X className="w-5 h-5" />
            </button>
            <div className="aspect-video">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube.com/embed/${extractYoutubeId(activeVideo.youtubeLink)}?autoplay=1`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="border-t border-white/10 p-5">
              <p className="font-semibold text-white">{activeVideo.title}</p>
              <p className="mt-1 text-xs text-gray-400">World Leaders Consortium</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ===== CARD — kept identical to the design you sent ===== */
function UpdateCard({ video, index, isExpanded, isDeleting, onExpand, onPlay, onEdit, onDelete }) {
  const youtubeId = extractYoutubeId(video.youtubeLink);
  const plainContent = video.content ? stripHtml(video.content) : "";
  const hasMore = plainContent.length > 0;

  return (
    <article
      className={`group relative bg-white ring-1 ring-black/5 shadow-md hover:shadow-2xl hover:shadow-[#4D6AE8]/15 transition-all duration-500 hover:-translate-y-1 overflow-hidden flex flex-col ${
        isDeleting ? "opacity-50" : ""
      }`}
    >
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#4D6AE8] z-20" />

      {/* ===== VIDEO THUMB ===== */}
      <button
        onClick={onPlay}
        className="relative block w-full aspect-video overflow-hidden group/thumb"
      >
        {youtubeId ? (
          <img
            src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
            alt={video.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover/thumb:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-100">
            <FaYoutube className="h-10 w-10 text-slate-300" />
          </div>
        )}

        {/* Dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />

        {/* Diagonal stripes */}
        <div
          className="absolute inset-0 opacity-25 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, transparent 0, transparent 3px, rgba(255,255,255,0.08) 3px, rgba(255,255,255,0.08) 4px)",
          }}
        />

        {/* Episode number */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 shadow">
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#4D6AE8] uppercase">
            EP {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Channel badge */}
        <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/60 backdrop-blur-sm pl-1 pr-3 py-1 rounded-full">
          <div className="w-7 h-7 rounded-full bg-[#4D6AE8] flex items-center justify-center text-[10px] font-bold text-white">
            WLC
          </div>
          <div className="text-white text-left leading-tight">
            <p className="text-[10px] font-semibold truncate max-w-[110px]">{video.title}</p>
            <p className="text-[9px] opacity-75">World Leaders</p>
          </div>
        </div>

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-2xl shadow-red-600/50 transition-transform duration-300 group-hover/thumb:scale-110">
            <div className="absolute inset-0 rounded-full bg-red-600 animate-ping opacity-30"></div>
            <Play className="w-7 h-7 text-white fill-white ml-1 relative z-10" />
          </div>
        </div>

        {/* Watch on YouTube */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm px-2.5 py-1 text-white text-[10px] font-medium">
          <FaYoutube className="w-3.5 h-3.5 text-red-500" fill="currentColor" />
          <span className="tracking-wide">Watch on YouTube</span>
        </div>
      </button>

      {/* Edit / Delete actions — own layer so they never get blocked by the thumb button */}
      <div
        className={`absolute top-3 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1.5 transition-opacity duration-200 ${
          isDeleting
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto"
        }`}
      >
        <button
          type="button"
          title="Edit"
          onClick={onEdit}
          className="rounded-md bg-white p-1.5 text-slate-600 shadow hover:bg-slate-50 hover:text-indigo-600"
        >
          <Pencil className="h-5 w-5" />
        </button>
        <button
          type="button"
          title="Delete"
          disabled={isDeleting}
          onClick={onDelete}
          className="rounded-md bg-white p-1.5 text-slate-600 shadow hover:bg-slate-50 hover:text-rose-600 disabled:opacity-50"
        >
          {isDeleting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-5 w-5" />}
        </button>
      </div>

      {/* ===== TEXT CONTENT ===== */}
      <div className="relative p-6 flex flex-col flex-1">
        {/* Meta */}
        <div className="flex items-center gap-3 text-[10px] text-gray-500 uppercase tracking-[0.2em] font-semibold mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-[#4D6AE8]" />
            Featured
          </span>
          <span className="w-1 h-1 bg-[#4D6AE8] rounded-full" />
          <span>Global</span>
        </div>

        {/* Card title */}
        <h3 className="text-[#1A1F36] text-lg font-bold leading-snug mb-3">{video.title}</h3>

        {/* Divider */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-0.5 bg-[#4D6AE8]" />
          <div className="flex-1 h-px bg-[#4D6AE8]/20" />
        </div>

        {/* Sub-heading */}
        <h4 className="text-[#4D6AE8] text-sm font-bold uppercase tracking-wide mb-3 leading-snug">
          {video.shortDescription}
        </h4>

        {/* Content */}
        <div className="space-y-3 text-left flex-1">
          {isExpanded ? (
            <div
              className="prose prose-sm max-w-none text-gray-600 text-sm leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_h2]:text-base [&_h2]:font-bold [&_h2]:text-[#1A1F36]"
              dangerouslySetInnerHTML={{ __html: video.content }}
            />
          ) : (
            hasMore && (
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{plainContent}</p>
            )
          )}
        </div>

        {/* Expand / Collapse */}
        {hasMore && (
          <button
            onClick={onExpand}
            className="inline-flex items-center gap-1.5 mt-5 text-[#4D6AE8] text-xs font-bold uppercase tracking-[0.15em] hover:gap-2.5 transition-all self-start"
          >
            {isExpanded ? "Show Less" : "Read Full Story"}
            <ArrowUpRight className={`w-3.5 h-3.5 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
          </button>
        )}
      </div>
    </article>
  );
}