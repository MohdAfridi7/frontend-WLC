// src/extensions/ResizableImage.js
import { Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import ResizableImageComponent from './ResizableImageComponent';

export const ResizableImage = Node.create({
  name: 'resizableImage',

  group: 'block',

  inline: false, // block rakha taaki full width pe rahe

  draggable: true,

  addAttributes() {
    return {
      src: { default: null },
      alt: { default: null },
      title: { default: null },
      width: { default: '100%' },
      height: { default: 'auto' },
    };
  },

  parseHTML() {
    return [{ tag: 'img[src]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['img', HTMLAttributes];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ResizableImageComponent);
  },
});