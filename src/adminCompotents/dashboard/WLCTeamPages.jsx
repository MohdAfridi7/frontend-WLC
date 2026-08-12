import React, { useEffect, useMemo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  MapPin,
  Quote,
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
  createTeamMember,
  getAllTeamMembers,
  updateTeamMember,
  deleteTeamMember,
} from "../../api/WLCteamRoutes";
// ^ update this import path to wherever these live

const emptyForm = { name: "", country: "", designation: "", description: "" };

// Shimmer placeholder shown while the list is loading
const SkeletonCard = () => (
  <div className="overflow-hidden bg-white ring-1 ring-black/5 shadow-md">
    <div className="h-[300px] w-full animate-pulse bg-slate-200" />
    <div className="p-6 md:p-7">
      <div className="mb-4 h-4 w-2/3 animate-pulse rounded bg-slate-200" />
      <div className="mb-2 h-3 w-full animate-pulse rounded bg-slate-200" />
      <div className="h-3 w-5/6 animate-pulse rounded bg-slate-200" />
    </div>
  </div>
);

export default function TeamPage() {
  const [members, setMembers] = useState([]);
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

  const fetchMembers = async ({ silent } = {}) => {
    if (!silent) setLoading(true);
    try {
      const res = await getAllTeamMembers();
      const list = Array.isArray(res) ? res : res?.data || [];
      setMembers(Array.isArray(list) ? list : [list]);
    } catch (err) {
      toast.error(err?.message || "Could not load team members. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return members;
    return members.filter((m) =>
      [m.name, m.country, m.designation].filter(Boolean).some((f) => f.toLowerCase().includes(q))
    );
  }, [members, search]);

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

  const openEditModal = (member) => {
    setEditingId(member._id);
    setForm({
      name: member.name || "",
      country: member.country || "",
      designation: member.designation || "",
      description: member.description || "",
    });
    setProfileFile(null);
    setFlagFile(null);
    setProfilePreview(member.profileImage || "");
    setFlagPreview(member.flagImage || "");
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
    const toastId = toast.loading(editingId ? "Updating team member..." : "Creating team member...");
    try {
      if (editingId) {
        const res = await updateTeamMember(editingId, payload);
        const updated = res?.data || res;
        setMembers((prev) => prev.map((m) => (m._id === editingId ? { ...m, ...updated } : m)));
        toast.success("Team member updated.", { id: toastId });
      } else {
        const res = await createTeamMember(payload);
        const created = res?.data || res;
        setMembers((prev) => [created, ...prev]);
        toast.success("Team member created.", { id: toastId });
      }
      setModalOpen(false);
    } catch (err) {
      toast.error(err?.message || `Failed to ${editingId ? "update" : "create"} team member.`, {
        id: toastId,
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (member) => {
    setConfirmTarget(null);
    setDeletingId(member._id);
    const prev = members;
    setMembers((curr) => curr.filter((m) => m._id !== member._id));

    const toastId = toast.loading(`Deleting ${member.name}...`);
    try {
      await deleteTeamMember(member._id);
      toast.success("Team member deleted.", { id: toastId });
    } catch (err) {
      setMembers(prev);
      toast.error(err?.message || "Failed to delete team member.", { id: toastId });
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
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Team Members</h1>
          <p className="mt-1 text-sm text-slate-500">
            {loading ? "Loading team members..." : `${filtered.length} of ${members.length} members`}
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
            onClick={() => fetchMembers({ silent: true })}
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
            <span className="hidden sm:inline">Add Team Member</span>
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
              {members.length === 0
                ? "No team members yet. Add the first one."
                : "No team members match your search."}
            </div>
          )}

          {!loading &&
            filtered.map((m) => (
              <MemberCard
                key={m._id}
                member={m}
                isDeleting={deletingId === m._id}
                onEdit={() => openEditModal(m)}
                onDelete={() => setConfirmTarget(m)}
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
                {editingId ? "Edit Team Member" : "Add Team Member"}
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
                    placeholder="e.g. Full Stack Developer"
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
                  {editingId ? "Save Changes" : "Create Member"}
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
            <h3 className="text-base font-semibold text-slate-800">Delete this team member?</h3>
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

function MemberCard({ member, isDeleting, onEdit, onDelete }) {
  const firstName = (member.name || "").split(" ")[0] || "";
  const restBio = member.description ? member.description.replace(firstName, "").trim() : "";

  return (
    <div
      className={`group relative bg-white ring-1 ring-black/5 shadow-md hover:shadow-2xl hover:shadow-indigo-500/15 transition-all duration-500 hover:-translate-y-1 overflow-hidden ${
        isDeleting ? "opacity-50" : ""
      }`}
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-500 z-20" />

      {/* ===== IMAGE BLOCK ===== */}
      <div className="relative overflow-hidden">
        {member.profileImage ? (
          <img
            src={member.profileImage}
            alt={member.name}
            loading="lazy"
            className="w-full h-[300px] object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-[300px] flex items-center justify-center bg-slate-100">
            <User className="w-12 h-12 text-slate-300" />
          </div>
        )}

        {/* Dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/20 to-transparent" />

        {/* Diagonal stripe texture */}
        <div
          className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, transparent 0, transparent 3px, rgba(255,255,255,0.06) 3px, rgba(255,255,255,0.06) 4px)",
          }}
        />

        {/* Flag badge — top-left, purely decorative, never blocks clicks */}
        <div className="pointer-events-none absolute top-4 left-4 flex items-center gap-2 bg-white/95 backdrop-blur-sm px-2.5 py-1.5 shadow">
          <div className="w-7 h-5 overflow-hidden ring-1 ring-black/10 bg-slate-100 flex items-center justify-center">
            {member.flagImage ? (
              <img src={member.flagImage} alt={`${member.country} flag`} className="w-full h-full object-cover" />
            ) : (
              <Flag className="w-2.5 h-2.5 text-slate-300" />
            )}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#1A1F36]">
            {member.country}
          </span>
        </div>

        {/* Edit / Delete actions — top-right, own stacking layer, only interactive when visible */}
        <div
          className={`absolute top-4 right-4 z-30 flex items-center gap-1.5 transition-opacity duration-200 ${
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
            {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-5 w-5" />}
          </button>
        </div>

        {/* Name overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="flex items-center gap-2 text-white/90 text-[10px] font-semibold tracking-[0.2em] uppercase mb-2">
            <MapPin className="w-3 h-3 text-indigo-300" strokeWidth={2.5} />
            Team Member
          </div>
          <h3 className="text-white text-xl font-bold leading-tight drop-shadow-md">{member.name}</h3>
        </div>
      </div>

      {/* ===== CONTENT BLOCK ===== */}
      <div className="relative p-6 md:p-7">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(#4D6AE8 1px, transparent 1px)", backgroundSize: "14px 14px" }}
        />

        <div className="relative">
          {/* Title pill */}
          <div className="inline-flex items-start gap-2 mb-4">
            <div className="w-1 h-full min-h-[36px] bg-indigo-500 shrink-0 mt-0.5" />
            <p className="text-[#1A1F36] text-sm font-semibold leading-snug">{member.designation}</p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-0.5 bg-indigo-500" />
            <Quote className="w-3.5 h-3.5 text-indigo-500" />
            <div className="flex-1 h-px bg-indigo-100" />
          </div>

          {/* Bio */}
          {member.description && (
            <p className="text-gray-600 text-sm leading-relaxed">
              <span className="font-bold text-[#1A1F36]">{firstName} </span>
              {restBio}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}