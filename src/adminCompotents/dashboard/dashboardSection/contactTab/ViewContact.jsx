import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  Loader2,
  Search,
  X,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  Mail,
  Phone,
  MessageSquare,
  Calendar,
  UserX,
  SearchX,
} from "lucide-react";

import {
  getAllContacts,
  deleteContact,
} from "../../../../api/contactRoutes";

const ITEMS_PER_PAGE = 10;

const AVATAR_COLORS = [
  "bg-blue-100 text-blue-700",
  "bg-emerald-100 text-emerald-700",
  "bg-violet-100 text-violet-700",
  "bg-amber-100 text-amber-700",
  "bg-pink-100 text-pink-700",
  "bg-cyan-100 text-cyan-700",
];

const getInitials = (name = "") =>
  name
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "?";

const getAvatarColor = (name = "") => {
  const sum = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return AVATAR_COLORS[sum % AVATAR_COLORS.length];
};

const formatDate = (dateStr) =>
  dateStr
    ? new Date(dateStr).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "N/A";

export default function ViewContact() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedContact, setSelectedContact] = useState(null);
  const [deleteContactId, setDeleteContactId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // ================= FETCH CONTACTS =================
  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      try {
        const res = await getAllContacts();
        const data = res?.data || [];
        setContacts(data);
        setFilteredContacts(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load contacts");
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  // ================= SEARCH FILTER =================
  useEffect(() => {
    let result = [...contacts];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((c) => {
        return (
          c.fullName?.toLowerCase().includes(q) ||
          c.email?.toLowerCase().includes(q) ||
          c.phone?.toLowerCase().includes(q)
        );
      });
    }

    setFilteredContacts(result);
    setCurrentPage(1);
  }, [searchQuery, contacts]);

  // ================= ESCAPE KEY CLOSES MODALS =================
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedContact(null);
        setDeleteContactId(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // Lock body scroll while a modal is open
  useEffect(() => {
    document.body.style.overflow =
      selectedContact || deleteContactId ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedContact, deleteContactId]);

  // ================= PAGINATION =================
  const totalItems = filteredContacts.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);

  const currentPageContacts = filteredContacts.slice(startIndex, endIndex);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxNumbers = 5;

    if (totalPages <= maxNumbers) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    if (currentPage <= 3) {
      pages.push(1, 2, 3, "...", totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  // ================= DELETE =================
  const openDeleteModal = (id) => setDeleteContactId(id);
  const closeDeleteModal = () => !deleting && setDeleteContactId(null);

  const confirmDelete = async () => {
    try {
      setDeleting(true);
      await deleteContact(deleteContactId);

      toast.success("Contact deleted");

      const updated = contacts.filter((c) => c._id !== deleteContactId);
      setContacts(updated);
      setFilteredContacts(updated);
    } catch (err) {
      toast.error("Delete failed");
    } finally {
      setDeleting(false);
      setDeleteContactId(null);
    }
  };

  // ================= VIEW MODAL =================
  const openViewModal = (contact) => setSelectedContact(contact);
  const closeViewModal = () => setSelectedContact(null);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">

        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Contact Messages
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and review messages submitted through your contact form.
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">

          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900 tabular-nums">
              {contacts.length}
            </span>
            <span className="text-sm text-gray-500">total contacts</span>
          </div>

          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-200 rounded-xl pl-10 pr-9 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-gray-400">
            <Loader2 className="animate-spin w-7 h-7" />
            <p className="text-sm">Loading contacts...</p>
          </div>
        ) : totalItems === 0 ? (
          /* EMPTY STATES */
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center py-24 gap-3 text-center px-6">
            {searchQuery ? (
              <>
                <SearchX className="w-10 h-10 text-gray-300" />
                <p className="text-gray-600 font-medium">No matches found</p>
                <p className="text-sm text-gray-400">
                  Try a different name, email, or phone number.
                </p>
              </>
            ) : (
              <>
                <UserX className="w-10 h-10 text-gray-300" />
                <p className="text-gray-600 font-medium">No contacts yet</p>
                <p className="text-sm text-gray-400">
                  Submissions from your contact form will show up here.
                </p>
              </>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

            {/* DESKTOP TABLE */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#1f1b4b] text-white">
                  <tr>
                    <th className="p-4 text-left text-xs font-semibold uppercase tracking-wide">Name</th>
                    <th className="p-4 text-left text-xs font-semibold uppercase tracking-wide">Email</th>
                    <th className="p-4 text-left text-xs font-semibold uppercase tracking-wide">Phone</th>
                    <th className="p-4 text-left text-xs font-semibold uppercase tracking-wide">Country</th>
                    <th className="p-4 text-left text-xs font-semibold uppercase tracking-wide">Organization</th>
                    <th className="p-4 text-left text-xs font-semibold uppercase tracking-wide">Date</th>
                    <th className="p-4 text-center text-xs font-semibold uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {currentPageContacts.map((contact) => (
                    <tr key={contact._id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${getAvatarColor(contact.fullName)}`}>
                            {getInitials(contact.fullName)}
                          </div>
                          <span className="font-medium text-gray-800 truncate">
                            {contact.fullName}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-gray-600">{contact.email}</td>
                      <td className="p-4 text-gray-600">{contact.phone || "—"}</td>
                                            <td className="p-4 text-gray-600">{contact.country || "—"}</td>
                      <td className="p-4 text-gray-600">{contact.organization || "—"}</td>
                      <td className="p-4 text-gray-500 text-sm whitespace-nowrap">
                        {formatDate(contact.createdAt)}
                      </td>

                      <td className="p-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => openViewModal(contact)}
                            className="p-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg transition-colors"
                            title="View message"
                          >
                            <Eye size={17} />
                          </button>
                          <button
                            onClick={() => openDeleteModal(contact._id)}
                            className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                            title="Delete contact"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* MOBILE CARD LIST */}
            <div className="sm:hidden divide-y divide-gray-100">
              {currentPageContacts.map((contact) => (
                <div key={contact._id} className="p-4 flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${getAvatarColor(contact.fullName)}`}>
                    {getInitials(contact.fullName)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-800 truncate">{contact.fullName}</p>
                    <p className="text-sm text-gray-500 truncate">{contact.email}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{formatDate(contact.createdAt)}</p>
                  </div>
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <button
                      onClick={() => openViewModal(contact)}
                      className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => openDeleteModal(contact._id)}
                      className="p-2 bg-red-50 text-red-600 rounded-lg"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* PAGINATION — now correctly inside the card, inside max-w-7xl */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3 p-4 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                  Showing <span className="font-medium text-gray-700">{startIndex + 1}–{endIndex}</span> of{" "}
                  <span className="font-medium text-gray-700">{totalItems}</span>
                </p>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  {pageNumbers.map((p, i) =>
                    p === "..." ? (
                      <span key={`dots-${i}`} className="px-2 text-gray-400 text-sm">…</span>
                    ) : (
                      <button
                        key={p}
                        onClick={() => goToPage(p)}
                        className={`min-w-[32px] h-8 rounded-lg text-sm font-medium transition-colors ${
                          p === currentPage
                            ? "bg-indigo-600 text-white"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {p}
                      </button>
                    )
                  )}

                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* VIEW MODAL */}
      <AnimatePresence>
        {selectedContact && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeViewModal}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ duration: 0.18 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl w-full max-w-lg shadow-xl"
            >
              <div className="flex items-center justify-between p-5 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${getAvatarColor(selectedContact.fullName)}`}>
                    {getInitials(selectedContact.fullName)}
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">{selectedContact.fullName}</h2>
                    <p className="text-xs text-gray-400">{formatDate(selectedContact.createdAt)}</p>
                  </div>
                </div>
                <button
                  onClick={closeViewModal}
                  className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-center gap-2.5 text-sm text-gray-600">
                  <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  {selectedContact.email}
                </div>
                <div className="flex items-center gap-2.5 text-sm text-gray-600">
                  <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  {selectedContact.phone || "Not provided"}
                </div>

                <div className="pt-2">
                  <p className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    <MessageSquare className="w-3.5 h-3.5" />
                    Message
                  </p>
                  <div className="bg-gray-50 p-4 rounded-xl text-gray-700 text-sm leading-relaxed max-h-60 overflow-y-auto">
                    {selectedContact.message}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 flex justify-end">
                <button
                  onClick={closeViewModal}
                  className="px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DELETE MODAL */}
      <AnimatePresence>
        {deleteContactId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDeleteModal}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ duration: 0.18 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-6 rounded-2xl w-full max-w-sm shadow-xl"
            >
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
                <Trash2 className="w-5 h-5 text-red-600" />
              </div>

              <h2 className="text-lg font-bold text-gray-900 mb-1.5">
                Delete this contact?
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                This action can't be undone. The contact message will be permanently removed.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={closeDeleteModal}
                  disabled={deleting}
                  className="flex-1 border border-gray-200 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
                >
                  Cancel
                </button>

                <button
                  onClick={confirmDelete}
                  disabled={deleting}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-lg text-sm font-medium disabled:opacity-60 transition-colors flex items-center justify-center gap-2"
                >
                  {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Delete"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}