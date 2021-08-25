//禁止读标签
import { Mark, mergeAttributes } from "@tiptap/core";
export default Mark.create({
  name: "readdisable",

  defaultOptions: {
    HTMLAttributes: {
      id: null,
    },
  },
  addAttributes() {
    return {
      id: null,
    };
  },
  priority: 1000,
  parseHTML() {
    return [{ tag: "readdisable" }];
  },
  renderHTML(e) {
    const { HTMLAttributes } = e;
    return [
      "readdisable",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },
  addCommands(e) {
    return {
      toggleReadDisable: id => ({ commands, editor }) => {
        const isActive = editor.isActive("readdisable");
        if (isActive) {
          return commands.unsetMark("readdisable");
        } else {
          return commands.setMark("readdisable", { id });
        }
      },
    };
  },
});
