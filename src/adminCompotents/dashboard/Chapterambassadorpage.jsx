import React, { useEffect, useMemo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  Quote,
  MapPin,
  Plus,
  Pencil,
  Trash2,
  Loader2,
  X,
  Search,
  Inbox,
  RefreshCw,
  ImagePlus,
  Flag,
  User,
  Globe2,
  Briefcase,
  FileText,
} from "lucide-react";
import {
  createChapterAmbassador,
  getAllChapterAmbassadors,
  updateChapterAmbassador,
  deleteChapterAmbassador,
} from "../../api/chapterAmbassadorRoutes";
// ^ update this import path to wherever these live

const emptyForm = { name: "", country: "", designation: "", description: "" };

// Shimmer placeholder shown while the list is loading
const SkeletonCard = () => (
  <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
    <div className="h-40 w-full animate-pulse bg-slate-200" />
    <div className="p-4">
      <div className="mb-2 h-4 w-2/3 animate-pulse rounded bg-slate-200" />
      <div className="mb-1 h-3 w-1/2 animate-pulse rounded bg-slate-200" />
      <div className="h-3 w-full animate-pulse rounded bg-slate-200" />
    </div>
  </div>
);

export default function ChapterAmbassadorPage() {
  const [ambassadors, setAmbassadors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [confirmTarget, setConfirmTarget] = useState(null);

  // Form modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null); // null = create mode
  const [form, setForm] = useState(emptyForm);
  const [profileFile, setProfileFile] = useState(null);
  const [flagFile, setFlagFile] = useState(null);
  const [profilePreview, setProfilePreview] = useState("");
  const [flagPreview, setFlagPreview] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchAmbassadors = async ({ silent } = {}) => {
    if (!silent) setLoading(true);
    try {
      const res = await getAllChapterAmbassadors();
      const list = Array.isArray(res) ? res : res?.data || [];
      setAmbassadors(Array.isArray(list) ? list : [list]);
    } catch (err) {
      toast.error(err?.message || "Could not load ambassadors. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAmbassadors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return ambassadors;
    return ambassadors.filter((a) =>
      [a.name, a.country, a.designation].filter(Boolean).some((f) => f.toLowerCase().includes(q))
    );
  }, [ambassadors, search]);

  // ---------- Modal helpers ----------
  const openCreateModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setProfileFile(null);
    setFlagFile(null);
    setProfilePreview("");
    setFlagPreview("");
    setModalOpen(true);
  };

  const openEditModal = (amb) => {
    setEditingId(amb._id);
    setForm({
      name: amb.name || "",
      country: amb.country || "",
      designation: amb.designation || "",
      description: amb.description || "",
    });
    setProfileFile(null);
    setFlagFile(null);
    setProfilePreview(amb.profileImage || "");
    setFlagPreview(amb.flagImage || "");
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

  const handleProfileFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProfileFile(file);
    setProfilePreview(URL.createObjectURL(file));
  };

  const handleFlagFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFlagFile(file);
    setFlagPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.country || !form.designation) {
      toast.error("Please fill name, country and designation.");
      return;
    }
    if (!editingId && !profileFile) {
      toast.error("Please upload a profile image.");
      return;
    }

    const payload = new FormData();
    Object.entries(form).forEach(([key, value]) => payload.append(key, value));
    if (profileFile) payload.append("profileImage", profileFile);
    if (flagFile) payload.append("flagImage", flagFile);

    setSaving(true);
    const toastId = toast.loading(editingId ? "Updating ambassador..." : "Creating ambassador...");
    try {
      if (editingId) {
        const res = await updateChapterAmbassador(editingId, payload);
        const updated = res?.data || res;
        setAmbassadors((prev) => prev.map((a) => (a._id === editingId ? { ...a, ...updated } : a)));
        toast.success("Ambassador updated.", { id: toastId });
      } else {
        const res = await createChapterAmbassador(payload);
        const created = res?.data || res;
        setAmbassadors((prev) => [created, ...prev]);
        toast.success("Ambassador created.", { id: toastId });
      }
      setModalOpen(false);
    } catch (err) {
      toast.error(err?.message || `Failed to ${editingId ? "update" : "create"} ambassador.`, {
        id: toastId,
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (amb) => {
    setConfirmTarget(null);
    setDeletingId(amb._id);
    const prev = ambassadors;
    setAmbassadors((curr) => curr.filter((a) => a._id !== amb._id));

    const toastId = toast.loading(`Deleting ${amb.name}...`);
    try {
      await deleteChapterAmbassador(amb._id);
      toast.success("Ambassador deleted.", { id: toastId });
    } catch (err) {
      setAmbassadors(prev);
      toast.error(err?.message || "Failed to delete ambassador.", { id: toastId });
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
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Chapter Ambassadors
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {loading
              ? "Loading ambassadors..."
              : `${filtered.length} of ${ambassadors.length} ambassadors`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:flex-none">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, country..."
              className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 sm:w-56"
            />
          </div>
          <button
            onClick={() => fetchAmbassadors({ silent: true })}
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
            <span className="hidden sm:inline">Add Ambassador</span>
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3">
          {loading && Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}

          {!loading && filtered.length === 0 && (
            <div className="col-span-full rounded-xl border border-dashed border-slate-200 bg-white py-14 text-center text-slate-400">
              <Inbox className="mx-auto mb-2 h-8 w-8 text-slate-300" />
              {ambassadors.length === 0
                ? "No ambassadors yet. Add the first one."
                : "No ambassadors match your search."}
            </div>
          )}

          {!loading &&
            filtered.map((amb) => (
              <MemberCard
                key={amb._id}
                member={amb}
                isDeleting={deletingId === amb._id}
                onEdit={() => openEditModal(amb)}
                onDelete={() => setConfirmTarget(amb)}
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
                {editingId ? "Edit Ambassador" : "Add Ambassador"}
              </h3>
              <button onClick={closeModal} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100">
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 px-5 py-5">
              <div className="flex gap-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="relative h-20 w-20 overflow-hidden rounded-full border border-slate-200 bg-slate-50">
                    {profilePreview ? (
                      <img src={profilePreview} alt="Profile preview" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <User className="h-6 w-6 text-slate-300" />
                      </div>
                    )}
                  </div>
                  <label className="inline-flex cursor-pointer items-center gap-1 text-xs font-medium text-indigo-600 hover:underline">
                    <ImagePlus className="h-3.5 w-3.5" /> Profile
                    <input type="file" accept="image/*" className="hidden" onChange={handleProfileFile} disabled={saving} />
                  </label>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="relative flex h-20 w-28 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
                    {flagPreview ? (
                      <img src={flagPreview} alt="Flag preview" className="h-full w-full object-cover" />
                    ) : (
                      <Flag className="h-6 w-6 text-slate-300" />
                    )}
                  </div>
                  <label className="inline-flex cursor-pointer items-center gap-1 text-xs font-medium text-indigo-600 hover:underline">
                    <ImagePlus className="h-3.5 w-3.5" /> Flag
                    <input type="file" accept="image/*" className="hidden" onChange={handleFlagFile} disabled={saving} />
                  </label>
                </div>
              </div>

              <div>
                <label className="mb-1 flex items-center gap-1.5 text-xs font-medium text-slate-600">
                  <User className="h-3.5 w-3.5" /> Name
                </label>
                <input
                  id="name"
                  value={form.name}
                  onChange={handleChange}
                  disabled={saving}
                  placeholder="Full name"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 flex items-center gap-1.5 text-xs font-medium text-slate-600">
                    <Globe2 className="h-3.5 w-3.5" /> Country
                  </label>
                  <input
                    id="country"
                    value={form.country}
                    onChange={handleChange}
                    disabled={saving}
                    placeholder="Country"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
                <div>
                  <label className="mb-1 flex items-center gap-1.5 text-xs font-medium text-slate-600">
                    <Briefcase className="h-3.5 w-3.5" /> Designation
                  </label>
                  <input
                    id="designation"
                    value={form.designation}
                    onChange={handleChange}
                    disabled={saving}
                    placeholder="e.g. Chapter Ambassador of India"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 flex items-center gap-1.5 text-xs font-medium text-slate-600">
                  <FileText className="h-3.5 w-3.5" /> Description
                </label>
                <textarea
                  id="description"
                  rows={3}
                  value={form.description}
                  onChange={handleChange}
                  disabled={saving}
                  placeholder="Short bio / description"
                  className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
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
                  {editingId ? "Save Changes" : "Create Ambassador"}
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
            <h3 className="text-base font-semibold text-slate-800">Delete this ambassador?</h3>
            <p className="mt-1.5 text-sm text-slate-500">
              This will permanently remove{" "}
              <span className="font-medium text-slate-700">{confirmTarget.name}</span>. This action
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

// Compact version of the bracket-frame / flag-badge / quote design, sized for an admin grid card
function MemberCard({ member, isDeleting, onEdit, onDelete }) {
  return (
    <div
      className={`group relative rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md ${
        isDeleting ? "opacity-50" : ""
      }`}
    >
      {/* Image block */}
      <div className="relative m-3 mb-0">
        <div className="absolute -inset-1.5 border border-indigo-200 -z-10 translate-x-1.5 translate-y-1.5" />
        <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-indigo-500 z-10" />
        <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-indigo-500 z-10" />

        <div className="relative overflow-hidden">
          {member.profileImage ? (
            <img
              src={member.profileImage}
              alt={member.name}
             className="h-56 w-full object-cover"
            />
          ) : (
          <div className="flex h-56 w-full items-center justify-center bg-slate-100">
              <User className="h-7 w-7 text-slate-300" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />

          {/* Edit / Delete actions */}
          <div className="absolute top-1.5 right-1.5 flex gap-1 opacity-0 transition group-hover:opacity-100">
            <button
              title="Edit"
              onClick={onEdit}
              className="rounded-md bg-white/95 p-1 text-slate-600 shadow hover:bg-white hover:text-indigo-600"
            >
              <Pencil className="h-5 w-5" />
            </button>
            <button
              title="Delete"
              disabled={isDeleting}
              onClick={onDelete}
              className="rounded-md bg-white/95 p-1 text-slate-600 shadow hover:bg-white hover:text-rose-600 disabled:opacity-50"
            >
              {isDeleting ? <Loader2 className="h-3 w-3 animate-spin" /> : <Trash2 className="h-5 w-5" />}
            </button>
          </div>

          {/* Flag badge */}
          <div className="absolute bottom-1.5 left-1.5 flex items-center gap-1 bg-white/95 px-1.5 py-0.5 shadow">
            <div className="h-3 w-4.5 overflow-hidden bg-slate-100 flex items-center justify-center">
              {member.flagImage ? (
                <img src={member.flagImage} alt={`${member.country} flag`} className="h-full w-full object-cover" />
              ) : (
                <Flag className="h-2 w-2 text-slate-300" />
              )}
            </div>
            <span className="text-[9px] font-bold uppercase tracking-wide text-slate-700">
              {member.country}
            </span>
          </div>
        </div>
      </div>

      {/* Content block */}
      <div className="p-5">
        <Quote className="mb-1 h-3 w-3 text-indigo-300" fill="currentColor" />
        {member.description && (
          <p className="mb-3 line-clamp-3 text-sm leading-relaxed text-slate-500">
            {member.description}
          </p>
        )}
        <div className="mb-1.5 h-0.5 w-6 bg-indigo-500" />
        <h3 className="text-lg font-semibold text-slate-800">{member.name}</h3>
        <p className="text-sm text-indigo-600">{member.designation}</p>
      </div>
    </div>
  );
}