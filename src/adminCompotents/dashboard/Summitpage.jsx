import React, { useEffect, useMemo, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  X,
  Search,
  Inbox,
  RefreshCw,
  ImagePlus,
  FileText,
  Link2,
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Heading2,
  RemoveFormatting,
} from "lucide-react";
import { createSummit, getAllSummits, updateSummit, deleteSummit } from "../../api/summitsRoutes";
// ^ update this import path to wherever these live

const emptyForm = {
  title: "",
  description: "",
  day: "1",
};

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

// Shimmer placeholder shown while the list is loading
const SkeletonCard = () => (
  <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
    <div className="h-40 w-full animate-pulse bg-slate-200" />
    <div className="p-4">
      <div className="mb-2 h-4 w-2/3 animate-pulse rounded bg-slate-200" />
      <div className="mb-1 h-3 w-full animate-pulse rounded bg-slate-200" />
      <div className="h-3 w-5/6 animate-pulse rounded bg-slate-200" />
    </div>
  </div>
);

export default function SummitPage() {
  const [summits, setSummits] = useState([]);
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

  const fetchSummits = async ({ silent } = {}) => {
    if (!silent) setLoading(true);
    try {
      const res = await getAllSummits();
      const list = Array.isArray(res) ? res : res?.data || [];
      setSummits(Array.isArray(list) ? list : [list]);
    } catch (err) {
      toast.error(err?.message || "Could not load summits. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return summits;
    return summits.filter((s) => (s.title || "").toLowerCase().includes(q));
  }, [summits, search]);

  // ---------- Modal helpers ----------
  const openCreateModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setImageFile(null);
    setImagePreview("");
    setModalOpen(true);
  };

  const openEditModal = (summit) => {
    setEditingId(summit._id);
   setForm({
  title: summit.title || "",
  description: summit.description || "",
  day: summit.day || "1",
});
    setImageFile(null);
    setImagePreview(summit.image || "");
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
    if (!stripHtml(form.description)) {
      toast.error("Please fill description.");
      return;
    }
    if (!editingId && !imageFile) {
      toast.error("Please upload an image.");
      return;
    }

    const payload = new FormData();
    payload.append("title", form.title);
    payload.append("description", form.description);
    payload.append("day", form.day);
    if (imageFile) payload.append("image", imageFile);

    setSaving(true);
    const toastId = toast.loading(editingId ? "Updating summit..." : "Creating summit...");
    try {
      if (editingId) {
        const res = await updateSummit(editingId, payload);
        const updated = res?.data || res;
        setSummits((prev) => prev.map((s) => (s._id === editingId ? { ...s, ...updated } : s)));
        toast.success("Summit updated.", { id: toastId });
      } else {
        const res = await createSummit(payload);
        const created = res?.data || res;
        setSummits((prev) => [...prev, created]);
        toast.success("Summit created.", { id: toastId });
      }
      setModalOpen(false);
    } catch (err) {
      toast.error(err?.message || `Failed to ${editingId ? "update" : "create"} summit.`, {
        id: toastId,
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (summit) => {
    setConfirmTarget(null);
    setDeletingId(summit._id);
    const prev = summits;
    setSummits((curr) => curr.filter((s) => s._id !== summit._id));

    const toastId = toast.loading(`Deleting "${summit.title}"...`);
    try {
      await deleteSummit(summit._id);
      toast.success("Summit deleted.", { id: toastId });
    } catch (err) {
      setSummits(prev);
      toast.error(err?.message || "Failed to delete summit.", { id: toastId });
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
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Summits</h1>
          <p className="mt-1 text-sm text-slate-500">
            {loading ? "Loading summits..." : `${filtered.length} of ${summits.length} summits`}
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
            onClick={() => fetchSummits({ silent: true })}
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
            <span className="hidden sm:inline">Add Summit</span>
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {loading && Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}

          {!loading && filtered.length === 0 && (
            <div className="col-span-full rounded-xl border border-dashed border-slate-200 bg-white py-14 text-center text-slate-400">
              <Inbox className="mx-auto mb-2 h-8 w-8 text-slate-300" />
              {summits.length === 0 ? "No summits yet. Add the first one." : "No summits match your search."}
            </div>
          )}

          {!loading &&
            filtered.map((s) => (
              <SummitCard
                key={s._id}
                summit={s}
                isDeleting={deletingId === s._id}
                onEdit={() => openEditModal(s)}
                onDelete={() => setConfirmTarget(s)}
              />
            ))}
        </div>
      </div>

      {/* Create / Edit modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 py-6">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <h3 className="text-base font-semibold text-slate-800">
                {editingId ? "Edit Summit" : "Add Summit"}
              </h3>
              <button onClick={closeModal} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 px-5 py-5">
              {/* Image */}
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Image</label>
                <div className="flex items-center gap-3">
                  <div className="relative h-20 w-32 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Summit preview" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <ImagePlus className="h-6 w-6 text-slate-300" />
                      </div>
                    )}
                  </div>
                  <label className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-indigo-600 hover:bg-slate-50">
                    <ImagePlus className="h-3.5 w-3.5" /> Upload
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageFile} disabled={saving} />
                  </label>
                </div>
              </div>
              <div>
  <label className="mb-1 block text-xs font-medium text-slate-600">
    Day
  </label>

  <select
    id="day"
    value={form.day}
    onChange={handleChange}
    disabled={saving}
    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
  >
    <option value="1">Day 1</option>
    <option value="2">Day 2</option>
  </select>
</div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-600">Title</label>
                <input
                  id="title"
                  value={form.title}
                  onChange={handleChange}
                  disabled={saving}
                  placeholder="Summit title"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-1 flex items-center gap-1.5 text-xs font-medium text-slate-600">
                  <FileText className="h-3.5 w-3.5" /> Description
                </label>
                <RichTextEditor
                  value={form.description}
                  onChange={(html) => setForm((prev) => ({ ...prev, description: html }))}
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
                  {editingId ? "Save Changes" : "Create Summit"}
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
            <h3 className="text-base font-semibold text-slate-800">Delete this summit?</h3>
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
    </div>
  );
}

function SummitCard({ summit, isDeleting, onEdit, onDelete }) {
  const [expanded, setExpanded] = useState(false);

  const plainDescription = summit.description
    ? stripHtml(summit.description)
    : "";

  return (
    <div
      className={`group relative overflow-hidden rounded-[8px] border border-slate-200 bg-white shadow-lg transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_25px_80px_-15px_rgba(79,70,229,0.35)]
      ${isDeleting ? "opacity-50" : ""}`}
    >
      {/* Spotlight */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-indigo-500/5 to-cyan-400/10 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

      {/* Shine */}
      <div className="absolute inset-0 z-20 -translate-x-[120%] bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 transition-transform duration-1000 group-hover:translate-x-[120%]" />

      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        {summit.image ? (
          <img
            src={summit.image}
            alt={summit.title}
            loading="lazy"
            className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-100">
            <ImagePlus className="h-10 w-10 text-slate-300" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        <div className="absolute left-4 top-4 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-xs font-bold text-indigo-700 shadow-lg">
          Day {summit.day}
        </div>

        {/* Actions */}
        <div
          className={`absolute right-4 top-4 z-30 flex gap-2 transition-all duration-300 ${
            isDeleting
              ? "opacity-100"
              : "opacity-0 translate-y-2 group-hover:translate-y-0 group-hover:opacity-100"
          }`}
        >
          <button
            onClick={onEdit}
            className="rounded-xl bg-white/95 p-2 text-slate-700 shadow-lg backdrop-blur hover:text-indigo-600"
          >
            <Pencil className="h-4 w-4" />
          </button>

          <button
            onClick={onDelete}
            disabled={isDeleting}
            className="rounded-xl bg-white/95 p-2 text-slate-700 shadow-lg backdrop-blur hover:text-rose-600"
          >
            {isDeleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-5">
        <h3 className="mb-3 line-clamp-2 text-lg font-bold text-slate-900 transition-colors duration-300 group-hover:text-indigo-600">
          {summit.title}
        </h3>

        {!expanded ? (
          <p className="line-clamp-3 text-sm leading-relaxed text-slate-600">
            {plainDescription}
          </p>
        ) : (
          <div
            className="
              prose prose-sm max-w-none text-slate-700
              [&_ul]:list-disc [&_ul]:pl-5
              [&_ol]:list-decimal [&_ol]:pl-5
              [&_li]:mb-1
              [&_h1]:text-xl [&_h1]:font-bold
              [&_h2]:text-lg [&_h2]:font-bold
              [&_strong]:font-bold
            "
            dangerouslySetInnerHTML={{
              __html: summit.description || "",
            }}
          />
        )}

        {plainDescription.length > 120 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600 transition-all hover:bg-indigo-600 hover:text-white"
          >
            {expanded ? "Show Less" : "Read More"}
          </button>
        )}

        <div className="mt-5 h-[3px] w-12 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-400 transition-all duration-500 group-hover:w-24" />
      </div>
    </div>
  );
}