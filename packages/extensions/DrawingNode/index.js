import { Node, mergeAttributes } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-2";
import Component from "./Component.vue";
export default Node.create({
  name: "drawing",
  group: "block",
  atom: true,
  addAttributes() {
    return {
      lines: {
        default: [],
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'drawing[data-type="drawing"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "drawing",
      mergeAttributes(HTMLAttributes, { "data-type": "drawing" }),
    ];
  },

  addNodeView() {
    return VueNodeViewRenderer(Component);
  },
});
