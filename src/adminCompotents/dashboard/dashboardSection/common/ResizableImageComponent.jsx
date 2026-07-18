// src/extensions/ResizableImageComponent.jsx
import { NodeViewWrapper } from '@tiptap/react';
import { useRef, useState, useEffect } from 'react';

const ResizableImageComponent = ({ node, updateAttributes, selected, extension }) => {
  const { src, alt, title, width, height } = node.attrs;

  const imgRef = useRef(null);
  const [isResizing, setIsResizing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startWidth, setStartWidth] = useState(0);

  const onMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    setStartX(e.clientX);
    setStartWidth(imgRef.current.offsetWidth);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const onMouseMove = (e) => {
    if (!isResizing) return;

    const dx = e.clientX - startX;
    const newWidthPx = startWidth + dx;
    const parentWidth = imgRef.current.parentElement.offsetWidth;

    const newWidthPercent = Math.min(100, Math.max(20, (newWidthPx / parentWidth) * 100));
    updateAttributes({ width: `${newWidthPercent}%` });
  };

  const onMouseUp = () => {
    setIsResizing(false);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <NodeViewWrapper className="relative inline-block my-4 group">
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        title={title}
        style={{
          width: width || '100%',
          height: height || 'auto',
          maxWidth: '100%',
          display: 'block',
          cursor: selected ? 'move' : 'default',
          border: selected || isResizing ? '2px solid #3b82f6' : 'none',
          transition: 'border 0.2s',
        }}
        className="rounded-lg"
      />
      {(selected || isResizing) && (
        <div
          className="absolute bottom-[-10px] right-[-10px] w-6 h-6 bg-blue-600 rounded-full cursor-se-resize z-50 shadow-lg flex items-center justify-center"
          onMouseDown={onMouseDown}
        >
          <div className="w-3 h-3 bg-white rounded-full" />
        </div>
      )}
    </NodeViewWrapper>
  );
};

export default ResizableImageComponent;