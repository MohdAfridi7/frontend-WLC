import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import axiosInstance from "../../../../api/axiosInstance";

export default function TextEditor({ onChange, value }) {
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const [resizeModal, setResizeModal] = useState(null); // { imgElement, currentWidth, currentHeight }

  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      editorRef.current.innerHTML = "";

      try {
        quillRef.current = new Quill(editorRef.current, {
          theme: "snow",
          modules: {
            toolbar: {
              container: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ color: [] }, { background: [] }],
                [{ align: [] }],
                ["blockquote", "code-block"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ indent: "-1" }, { indent: "+1" }],
                ["link", "image"],
                ["clean"],
              ],
              handlers: {
                image: function () {
                  const input = document.createElement("input");
                  input.setAttribute("type", "file");
                  input.setAttribute("accept", "image/*");
                  input.click();

                  input.onchange = async () => {
                    const file = input.files[0];
                    if (!file) return;

                    const formData = new FormData();
                    formData.append("image", file);

                    try {
                      const response = await axiosInstance.post("/api/blog/editor-image", formData, {
                        headers: { "Content-Type": "multipart/form-data" },
                      });

                      const imageUrl = response.data.url;
                      const range = this.quill.getSelection();
                      this.quill.insertEmbed(range.index, "image", imageUrl);
                      this.quill.setSelection(range.index + 1);
                    } catch (err) {
                      console.error("Image upload failed:", err);
                      alert("Image upload fail ho gaya");
                    }
                  };
                },
              },
            },
          },
          placeholder: "Apna poora blog yahan likho...",
        });

        quillRef.current.on("text-change", () => {
          const html = quillRef.current.root.innerHTML;
          if (html !== value) {
            onChange(html);
          }
        });

        console.log("Quill initialized successfully");
      } catch (error) {
        console.error("Quill initialization failed:", error);
        quillRef.current = null;
      }
    }

    return () => {
      if (quillRef.current && typeof quillRef.current.destroy === "function") {
        quillRef.current.off("text-change");
        quillRef.current.destroy();
        if (editorRef.current) {
          editorRef.current.innerHTML = "";
        }
        quillRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const editor = quillRef.current;
    if (editor && value !== editor.root.innerHTML) {
      const selection = editor.getSelection();
      editor.root.innerHTML = value || "";
      if (selection) editor.setSelection(selection);
    }

    // Add click listener on images for resize modal
    const addClickListeners = () => {
      const images = editorRef.current?.querySelectorAll("img");
      images?.forEach((img) => {
        if (img.dataset.resizeListener) return;

        img.dataset.resizeListener = "true";
        img.style.cursor = "pointer";

        img.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();

          const currentWidth = img.style.width ? parseInt(img.style.width, 10) : 100;
          const currentHeight = img.style.height ? parseInt(img.style.height, 10) : "auto";

          setResizeModal({
            imgElement: img,
            currentWidth,
            currentHeight: currentHeight === "auto" ? "" : currentHeight,
          });
        });
      });
    };

    addClickListeners();
    quillRef.current?.on("text-change", addClickListeners);

    return () => {
      quillRef.current?.off("text-change", addClickListeners);
    };
  }, [value]);

  const saveImageSize = () => {
    if (!resizeModal || !resizeModal.imgElement) return;

    const { imgElement } = resizeModal;
    const widthInput = document.getElementById("resize-width");
    const heightInput = document.getElementById("resize-height");

    const newWidth = widthInput?.value ? `${widthInput.value}%` : "100%";
    const newHeight = heightInput?.value ? `${heightInput.value}px` : "auto";

    imgElement.style.width = newWidth;
    imgElement.style.height = newHeight;

    // Update Quill content to trigger onChange
    const html = quillRef.current.root.innerHTML;
    onChange(html);

    setResizeModal(null);
  };

  return (
    <>
      <div className="rounded-xl blog-content overflow-hidden shadow-lg bg-white">
        <div
          ref={editorRef}
          className="quill-editor"
          style={{
            minHeight: "400px",
            backgroundColor: "#fff",
            color: "#1a202c",
            border: "1px solid #e2e8f0",
            borderRadius: "0px 0px 10px 10px",
          }}
        />

        <style jsx global>{`
      .ql-toolbar.ql-snow {
        border-radius: 12px 12px 0 0;
        border: 1px solid #d1d5db;
        border-bottom: none;
        background: #f9fafb;
      }

      .ql-container.ql-snow {
        border-radius: 0 0 12px 12px;
        border: 1px solid #d1d5db;
      }

      .ql-toolbar .ql-formats {
        background: transparent;
      }
    `}</style>
      </div>

      {/* Resize Modal */}
      {resizeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]">
          <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
            <h3 className="text-lg font-bold mb-4">Resize Image</h3>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Width (%)</label>
              <input
                id="resize-width"
                type="number"
                min="20"
                max="100"
                defaultValue={resizeModal.currentWidth}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-1">Height (px or leave blank for auto)</label>
              <input
                id="resize-height"
                type="number"
                min="50"
                placeholder="auto"
                defaultValue={resizeModal.currentHeight}
                className="w-full p-2 border rounded"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setResizeModal(null)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={saveImageSize}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}