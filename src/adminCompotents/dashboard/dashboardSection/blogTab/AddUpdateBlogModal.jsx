// AddUpdateBlogModal.jsx
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Loader2,
  Upload,
  ImageIcon,
  User,
  Calendar,
  FolderOpen,
  Tag,
  Plus,
  FileText,
} from "lucide-react";
import { postBlogs, updateBlogs, getBlogById } from "../../../../api/blogRoute";
import TextEditor from "../common/TextEditor";

const TITLE_LIMIT = 80;
const SHORT_CONTENT_LIMIT = 200;
const MAX_KEYWORDS = 3;
const MAX_IMAGE_MB = 5;

const emptyForm = {
  title: "",
  ShortContent: "",
  subHeading: "",
  fullContent: "",
  author: "",
  date: "",
  category: "",
  keywords: [],
};

const FieldLabel = ({ children, required, icon: Icon }) => (
  <label className="flex items-center gap-1.5 mb-1.5 text-sm font-medium text-gray-700">
    {Icon && <Icon size={13} className="text-gray-400" />}
    {children}
    {required && <span className="text-red-500">*</span>}
  </label>
);

const CounterHint = ({ length, limit }) => {
  const ratio = length / limit;
  const color =
    length === 0
      ? "text-gray-400"
      : ratio > 1
      ? "text-red-500"
      : ratio > 0.9
      ? "text-amber-500"
      : "text-emerald-600";
  return (
    <span className={`text-xs tabular-nums ${color}`}>
      {length}/{limit}
    </span>
  );
};

const AddUpdateBlogModal = ({ open, onClose, editId, refresh, categories }) => {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const [form, setForm] = useState(emptyForm);
  const [editorContent, setEditorContent] = useState("");

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [allCategories, setAllCategories] = useState([]);
  const [isNewCategoryMode, setIsNewCategoryMode] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [keywordInput, setKeywordInput] = useState("");

  const fileInputRef = useRef(null);
  const modalRef = useRef(null);

  // Load categories
  useEffect(() => {
    if (categories?.length) {
      setAllCategories(categories.filter((c) => c !== "All"));
    }
  }, [categories]);

  // Fetch single blog for edit mode / reset on close
  useEffect(() => {
    if (!open) {
      setForm(emptyForm);
      setEditorContent("");
      setImage(null);
      setImagePreview(null);
      setIsNewCategoryMode(false);
      setNewCategory("");
      setKeywordInput("");
      return;
    }

    if (editId) {
      const fetchBlog = async () => {
        setFetching(true);
        try {
          const res = await getBlogById(editId);
          const blog = res.data;

          setForm({
            title: blog.title || "",
            ShortContent: blog.ShortContent || "",
            subHeading: blog.subHeading || "",
            fullContent: blog.fullContent || "",
            author: blog.author || "",
            date: blog.date ? new Date(blog.date).toISOString().slice(0, 10) : "",
            category: blog.category || "",
            keywords: Array.isArray(blog.keywords) ? [...blog.keywords] : [],
          });

          setEditorContent(blog.fullContent || "");

          if (blog.image?.url) setImagePreview(blog.image.url);
          setImage(null);
          setIsNewCategoryMode(false);
          setNewCategory("");
          setKeywordInput("");
        } catch (err) {
          toast.error("Failed to load blog data");
          console.error(err);
        } finally {
          setFetching(false);
        }
      };

      fetchBlog();
    } else {
      setForm(emptyForm);
      setImage(null);
      setImagePreview(null);
      setIsNewCategoryMode(false);
      setNewCategory("");
      setKeywordInput("");
    }
  }, [open, editId]);

  // Esc key + body scroll lock
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape" && !loading) onClose();
    };
    if (open) {
      document.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, loading, onClose]);

  if (!open) return null;

  // ================= IMAGE HANDLING =================

  const validateAndSetImage = (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file");
      return;
    }

    if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
      toast.error(`Image must be under ${MAX_IMAGE_MB}MB`);
      return;
    }

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleImageChange = (e) => {
    validateAndSetImage(e.target.files?.[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    validateAndSetImage(e.dataTransfer.files?.[0]);
  };

  const removeImage = (e) => {
    e.stopPropagation();
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ================= KEYWORDS =================

  const addKeyword = () => {
    const trimmed = keywordInput.trim();
    if (!trimmed) return;
    if (form.keywords.includes(trimmed)) {
      toast.error("Keyword already added");
      return;
    }
    if (form.keywords.length >= MAX_KEYWORDS) {
      toast.error(`Maximum ${MAX_KEYWORDS} keywords allowed`);
      return;
    }
    setForm((prev) => ({ ...prev, keywords: [...prev.keywords, trimmed] }));
    setKeywordInput("");
  };

  const handleKeywordKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addKeyword();
    }
  };

  const removeKeyword = (index) => {
    setForm((prev) => {
      const updated = [...prev.keywords];
      updated.splice(index, 1);
      return { ...prev, keywords: updated };
    });
  };

  // ================= SUBMIT =================

  const isEditorEmpty = (html) => {
  const text = html?.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, "").trim();
  return !text;
};

  const validate = () => {
    const missing = [];
    if (!form.title.trim()) missing.push("Title");
    if (!form.ShortContent.trim()) missing.push("Short description");
    if (!form.author.trim()) missing.push("Author");
    if (!form.date) missing.push("Date");
    if (!isNewCategoryMode && !form.category) missing.push("Category");
    if (isNewCategoryMode && !newCategory.trim()) missing.push("Category");
    if (!editId && !image) missing.push("Featured image");
      if (isEditorEmpty(editorContent)) missing.push("Full blog content");

    if (missing.length) {
      toast.error(`Please fill: ${missing.join(", ")}`);
      return false;
    }
    return true;
  };

  const submit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      let finalCategory = form.category;
      if (isNewCategoryMode && newCategory.trim()) {
        finalCategory = newCategory.trim();
      }

      const fd = new FormData();
      fd.append("title", form.title.trim());
      fd.append("ShortContent", form.ShortContent.trim());
      fd.append("subHeading", form.subHeading.trim());
      fd.append("fullContent", editorContent);
      fd.append("author", form.author.trim());
      fd.append("date", form.date);
      fd.append("category", finalCategory.trim());
      fd.append("keywords", JSON.stringify(form.keywords));
    

      if (image) fd.append("image", image);

      if (editId) {
        await updateBlogs({ id: editId, data: fd });
        toast.success("Blog updated successfully");
      } else {
        await postBlogs(fd);
        toast.success("Blog created successfully");
      }

      refresh();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target) && !loading) {
      onClose();
    }
  };

  // ================= FETCHING STATE =================

  if (fetching) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-2xl shadow-xl flex flex-col items-center gap-3">
          <Loader2 className="w-7 h-7 animate-spin text-yellow-500" />
          <p className="text-sm font-medium text-gray-600">Loading blog data...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      onMouseDown={handleBackdropClick}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        ref={modalRef}
        initial={{ scale: 0.96, opacity: 0, y: 12 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.18 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            {editId ? "Update Blog" : "Add New Blog"}
          </h2>
          <button
            onClick={onClose}
            disabled={loading}
            className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 disabled:opacity-40 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* BODY */}
        <div className="custom-scrollbar overflow-y-auto px-6 py-5 flex-1 space-y-6">

          {/* SECTION: Featured Image */}
          <div>
            <FieldLabel icon={ImageIcon} required={!editId}>
              Featured Image
            </FieldLabel>

            <div
              onClick={() => fileInputRef.current.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-xl text-center cursor-pointer transition-colors overflow-hidden ${
                isDragging
                  ? "border-yellow-500 bg-yellow-50"
                  : "border-yellow-300 hover:bg-yellow-50/50"
              }`}
            >
              {imagePreview ? (
                <div className="relative group">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full max-h-56 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <button
                      onClick={removeImage}
                      className="opacity-0 group-hover:opacity-100 flex items-center gap-1.5 bg-white text-red-600 text-xs font-medium px-3 py-1.5 rounded-lg shadow-sm transition-opacity"
                    >
                      <X size={13} /> Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-8 flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                    <Upload size={18} className="text-yellow-600" />
                  </div>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-yellow-700">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-400">PNG, JPG up to {MAX_IMAGE_MB}MB</p>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          {/* SECTION: Basic Info */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <div className="flex items-center justify-between">
                <FieldLabel required>Blog Title</FieldLabel>
                <CounterHint length={form.title.length} limit={TITLE_LIMIT} />
              </div>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. 5 Benefits of Concierge Medicine"
                className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400/40 focus:border-yellow-400 text-sm transition-all"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <FieldLabel required>Short Description</FieldLabel>
                <CounterHint length={form.ShortContent.length} limit={SHORT_CONTENT_LIMIT} />
              </div>
              <textarea
                value={form.ShortContent}
                onChange={(e) => setForm({ ...form, ShortContent: e.target.value })}
                placeholder="Used as the meta description and card excerpt..."
                className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400/40 focus:border-yellow-400 h-20 text-sm resize-none transition-all"
              />
            </div>

            <div>
              <FieldLabel>Sub Heading</FieldLabel>
              <input
                type="text"
                value={form.subHeading}
                onChange={(e) => setForm({ ...form, subHeading: e.target.value })}
                placeholder="Secondary title shown on the blog page"
                className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400/40 focus:border-yellow-400 text-sm transition-all"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <FieldLabel icon={User} required>Author</FieldLabel>
                <input
                  type="text"
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                  placeholder="Author name"
                  className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400/40 focus:border-yellow-400 text-sm transition-all"
                />
              </div>
              <div>
                <FieldLabel icon={Calendar} required>Publish Date</FieldLabel>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400/40 focus:border-yellow-400 text-sm transition-all"
                />
              </div>
            </div>
          </div>

          {/* SECTION: Category */}
          <div>
            <FieldLabel icon={FolderOpen} required>Category</FieldLabel>

            {!isNewCategoryMode ? (
              <>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full p-2.5 border border-gray-200 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-yellow-400/40 focus:border-yellow-400 text-sm transition-all"
                >
                  <option value="">Select category</option>
                  {allCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => {
                    setIsNewCategoryMode(true);
                    setForm({ ...form, category: "" });
                  }}
                  className="flex items-center gap-1 text-yellow-600 hover:text-yellow-800 text-xs font-medium"
                >
                  <Plus size={13} /> Add new category
                </button>
              </>
            ) : (
              <div>
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="New category name"
                  className="w-full p-2.5 border border-gray-200 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-yellow-400/40 focus:border-yellow-400 text-sm transition-all"
                />
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      if (!newCategory.trim()) return toast.error("Category name required");
                      setForm({ ...form, category: newCategory.trim() });
                      setIsNewCategoryMode(false);
                    }}
                    className="bg-yellow-500 text-white px-4 py-1.5 rounded-lg hover:bg-yellow-600 text-xs font-medium transition-colors"
                  >
                    Use this
                  </button>
                  <button
                    onClick={() => setIsNewCategoryMode(false)}
                    className="text-gray-500 hover:text-gray-700 text-xs font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* SECTION: Keywords */}
          <div>
            <div className="flex items-center justify-between">
              <FieldLabel icon={Tag}>Keywords</FieldLabel>
              <span className="text-xs text-gray-400 tabular-nums">
                {form.keywords.length}/{MAX_KEYWORDS}
              </span>
            </div>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyDown={handleKeywordKeyDown}
                placeholder="Type a keyword and press Enter"
                disabled={form.keywords.length >= MAX_KEYWORDS}
                className="flex-1 p-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400/40 focus:border-yellow-400 text-sm disabled:bg-gray-50 disabled:text-gray-400 transition-all"
              />
              <button
                onClick={addKeyword}
                disabled={form.keywords.length >= MAX_KEYWORDS}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 disabled:bg-gray-200 disabled:text-gray-400 text-sm font-medium transition-colors flex-shrink-0"
              >
                Add
              </button>
            </div>
            {form.keywords.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {form.keywords.map((kw, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium"
                  >
                    #{kw}
                    <button
                      onClick={() => removeKeyword(idx)}
                      className="ml-1.5 text-yellow-500 hover:text-red-500 transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* SECTION: Full Content */}
          <div>
            <FieldLabel icon={FileText} required>Full Blog Content</FieldLabel>
            <TextEditor
              key={`editor-${editId || "add"}-${open ? "open" : "closed"}`}
              value={editorContent}
              onChange={(html) => setEditorContent(html)}
              placeholder="Start writing your full blog content here..."
              className="blog-content"
            />
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100 flex-shrink-0 bg-white">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-5 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 text-sm font-medium text-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={loading}
            className="px-6 py-2.5 rounded-lg text-white font-medium text-sm bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-300 transition-colors flex items-center gap-2 min-w-[130px] justify-center"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : editId ? (
              "Update Blog"
            ) : (
              "Publish Blog"
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AddUpdateBlogModal;