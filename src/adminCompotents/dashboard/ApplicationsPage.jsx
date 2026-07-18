import React, { useEffect, useMemo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  Search,
  Eye,
  Download,
  Trash2,
  Loader2,
  FileText,
  Mail,
  Phone,
  Building2,
  Globe2,
  Calendar,
  X,
  Inbox,
  RefreshCw,
  MessageSquare,
} from "lucide-react";
import { getAllApplications, deleteApplication } from "../../api/applicationRoutes";
// ^ update this import path to wherever getAllApplications/deleteApplication live

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

// Shimmer placeholder row shown while the list is loading
const SkeletonRow = () => (
  <tr className="border-b border-slate-100">
    {Array.from({ length: 5 }).map((_, i) => (
      <td key={i} className="px-4 py-4">
        <div className="h-3.5 w-full max-w-[140px] animate-pulse rounded bg-slate-200" />
      </td>
    ))}
  </tr>
);

const SkeletonCard = () => (
  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
    <div className="mb-3 h-4 w-2/3 animate-pulse rounded bg-slate-200" />
    <div className="mb-2 h-3 w-1/2 animate-pulse rounded bg-slate-200" />
    <div className="h-3 w-1/3 animate-pulse rounded bg-slate-200" />
  </div>
);

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [search, setSearch] = useState("");
  const [confirmTarget, setConfirmTarget] = useState(null); // application pending delete confirmation
  const [detailApp, setDetailApp] = useState(null); // application shown in the details modal

  const fetchApplications = async ({ silent } = {}) => {
    if (!silent) setLoading(true);
    try {
      const res = await getAllApplications();
      // API shape: { success, count, data: [...] }
      const list = Array.isArray(res) ? res : res?.data || [];
      setApplications(list);
    } catch (err) {
      toast.error(err?.message || "Could not load applications. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return applications;
    return applications.filter((app) =>
      [app.name, app.email, app.organisation, app.country, app.phone]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(q))
    );
  }, [applications, search]);

  const handleDelete = async (app) => {
    setConfirmTarget(null);
    setDeletingId(app._id);
    const prev = applications;
    // optimistic removal
    setApplications((curr) => curr.filter((a) => a._id !== app._id));

    const toastId = toast.loading(`Deleting ${app.name || "application"}...`);
    try {
      await deleteApplication(app._id);
      toast.success("Application deleted.", { id: toastId });
    } catch (err) {
      setApplications(prev); // rollback on failure
      toast.error(err?.message || "Failed to delete application.", { id: toastId });
    } finally {
      setDeletingId(null);
    }
  };

  const handleView = (app) => {
    if (!app.resumeUrl) {
      toast.error("No resume attached to this application.");
      return;
    }
    window.open(app.resumeUrl, "_blank", "noopener,noreferrer");
  };

const handleDownload = (app) => {
  if (!app.resumeUrl) {
    toast.error("No resume attached to this application.");
    return;
  }

  const downloadUrl = app.resumeUrl.replace(
    "/upload/",
    "/upload/fl_attachment/"
  );

  window.open(downloadUrl, "_blank");
};

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-10">
      <Toaster position="top-right" toastOptions={{ duration: 3500 }} />

      {/* Header */}
      <div className="mx-auto mb-6 flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Job Applications
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {loading
              ? "Loading applications..."
              : `${filtered.length} of ${applications.length} applications`}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:flex-none">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, email, organisation..."
              className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 sm:w-64"
            />
          </div>
          <button
            onClick={() => fetchApplications({ silent: true })}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 shadow-sm transition hover:bg-slate-50"
          >
            <RefreshCw className="h-4 w-4" />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-6xl">
        {/* Desktop table */}
        <div className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm md:block">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50/80 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium">Applicant</th>
                <th className="px-4 py-3 font-medium">Organisation</th>
                <th className="px-4 py-3 font-medium">Country</th>
                <th className="px-4 py-3 font-medium">Applied</th>
                <th className="px-4 py-3 font-medium">Resume</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading &&
                Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)}

              {!loading && filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-14 text-center text-slate-400">
                    <Inbox className="mx-auto mb-2 h-8 w-8 text-slate-300" />
                    {applications.length === 0
                      ? "No applications yet."
                      : "No applications match your search."}
                  </td>
                </tr>
              )}

              {!loading &&
                filtered.map((app) => {
                  const isDeleting = deletingId === app._id;
                  return (
                    <tr
                      key={app._id}
                      className={`border-b border-slate-100 transition last:border-0 hover:bg-slate-50/60 ${
                        isDeleting ? "opacity-50" : ""
                      }`}
                    >
                      <td className="px-4 py-3">
                       <span className="font-medium text-slate-800">
  {app.name}
</span>
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                          <Mail className="h-3 w-3" /> {app.email}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {app.organisation || "—"}
                      </td>
                      <td className="px-4 py-3 text-slate-600">{app.country || "—"}</td>
                      <td className="px-4 py-3 text-slate-500">
                        {formatDate(app.createdAt)}
                      </td>
                      <td className="px-4 py-3">
                        {app.resumeUrl ? (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600">
                            <FileText className="h-3.5 w-3.5" /> Attached
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400">None</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1.5">
                           <button
    title="View Message"
    onClick={() => setDetailApp(app)}
    className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
  >
    <MessageSquare className="h-4 w-4" />
  </button>
                          <button
                            title="View resume"
                            onClick={() => handleView(app)}
                            className="rounded-lg p-2 text-slate-500 transition hover:bg-indigo-50 hover:text-indigo-600"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            title="Download resume"
                            onClick={() => handleDownload(app)}
                            className="rounded-lg p-2 text-slate-500 transition hover:bg-teal-50 hover:text-teal-600"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                          <button
                            title="Delete application"
                            disabled={isDeleting}
                            onClick={() => setConfirmTarget(app)}
                            className="rounded-lg p-2 text-slate-500 transition hover:bg-rose-50 hover:text-rose-600 disabled:opacity-50"
                          >
                            {isDeleting ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="grid grid-cols-1 gap-3 md:hidden">
          {loading &&
            Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}

          {!loading && filtered.length === 0 && (
            <div className="rounded-xl border border-dashed border-slate-200 bg-white py-14 text-center text-slate-400">
              <Inbox className="mx-auto mb-2 h-8 w-8 text-slate-300" />
              {applications.length === 0
                ? "No applications yet."
                : "No applications match your search."}
            </div>
          )}

          {!loading &&
            filtered.map((app) => {
              const isDeleting = deletingId === app._id;
              return (
                <div
                  key={app._id}
                  className={`rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition ${
                    isDeleting ? "opacity-50" : ""
                  }`}
                >
                  <div className="mb-2 flex items-start justify-between">
                   <span className="font-medium text-slate-800">
  {app.name}
</span>
                    {app.resumeUrl && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600">
                        <FileText className="h-3.5 w-3.5" /> Resume
                      </span>
                    )}
                  </div>

                  <div className="mb-3 space-y-1 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5" /> {app.email}
                    </div>
                    {app.phone && (
                      <div className="flex items-center gap-1.5">
                        <Phone className="h-3.5 w-3.5" /> {app.phone}
                      </div>
                    )}
                    {app.organisation && (
                      <div className="flex items-center gap-1.5">
                        <Building2 className="h-3.5 w-3.5" /> {app.organisation}
                      </div>
                    )}
                    {app.country && (
                      <div className="flex items-center gap-1.5">
                        <Globe2 className="h-3.5 w-3.5" /> {app.country}
                      </div>
                    )}
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" /> {formatDate(app.createdAt)}
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                    <button
                      onClick={() => setDetailApp(app)}
                      className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-indigo-600"
                    >
                      <MessageSquare className="h-3.5 w-3.5" /> View message
                    </button>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleView(app)}
                        className="rounded-lg p-2 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDownload(app)}
                        className="rounded-lg p-2 text-slate-500 hover:bg-teal-50 hover:text-teal-600"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                      <button
                        disabled={isDeleting}
                        onClick={() => setConfirmTarget(app)}
                        className="rounded-lg p-2 text-slate-500 hover:bg-rose-50 hover:text-rose-600 disabled:opacity-50"
                      >
                        {isDeleting ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Delete confirmation modal */}
      {confirmTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
          <div className="w-full max-w-sm rounded-xl bg-white p-5 shadow-xl">
            <h3 className="text-base font-semibold text-slate-800">
              Delete this application?
            </h3>
            <p className="mt-1.5 text-sm text-slate-500">
              This will permanently remove{" "}
              <span className="font-medium text-slate-700">{confirmTarget.name}</span>
              's application. This action can't be undone.
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

      {/* Application details modal — shows the message + full contact info */}
      {detailApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
          <div className="w-full max-w-md rounded-xl bg-white p-5 shadow-xl">
            <div className="mb-3 flex items-start justify-between">
              <div>
                <h3 className="text-base font-semibold text-slate-800">
                  {detailApp.name}
                </h3>
                <p className="text-xs text-slate-400">{formatDate(detailApp.createdAt)}</p>
              </div>
              <button
                onClick={() => setDetailApp(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mb-4 space-y-1.5 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-slate-400" /> {detailApp.email}
              </div>
              {detailApp.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-slate-400" /> {detailApp.phone}
                </div>
              )}
              {detailApp.organisation && (
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-slate-400" /> {detailApp.organisation}
                </div>
              )}
              {detailApp.country && (
                <div className="flex items-center gap-2">
                  <Globe2 className="h-4 w-4 text-slate-400" /> {detailApp.country}
                </div>
              )}
            </div>

            {detailApp.message && (
              <div className="mb-4 rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
                {detailApp.message || "No message provided"} 
              </div>
            )}

            {detailApp.resumeUrl && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleView(detailApp)}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  <Eye className="h-4 w-4" /> View resume
                </button>
                <button
                  onClick={() => handleDownload(detailApp)}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                >
                  <Download className="h-4 w-4" /> Download
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}