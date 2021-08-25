//禁止读标签
import { Mark, mergeAttributes } from "@tiptap/core";
export default Mark.create({
  name: "writeable",

  defaultOptions: {
    HTMLAttributes: {
      contenteditable: true,
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
    return [{ tag: "writeable" }];
  },
  renderHTML(e) {
    const { HTMLAttributes } = e;
    return [
      "writeable",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },
  addCommands(e) {
    return {
      toggleWriteAble: id => ({ commands, editor }) => {
        const isActive = editor.isActive("writeable");
        if (isActive) {
          return commands.unsetMark("writeable");
        } else {
          return commands.setMark("writeable", { id });
        }
      },
    };
  },
});
