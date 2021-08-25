//禁止读标签
import { Mark, mergeAttributes } from "@tiptap/core";
export default Mark.create({
  name: "writedisable",
  defaultOptions: {
    HTMLAttributes: {
      contenteditable: false,
      id: null,
    },
  },
  priority: 1000,
  addAttributes() {
    return {
      id: null,
    };
  },
  parseHTML() {
    return [{ tag: "writedisable" }];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "writedisable",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },
  addCommands() {
    return {
      toggleWriteDisable: id => e => {
        const { commands, editor, tr } = e;
        console.log(e);
        const isActive = editor.isActive("writedisable");
        console.log(isActive);
        if (isActive) {
          return commands.unsetMark("writedisable");
        } else {
          return commands.setMark("writedisable", { id });
        }
      },
    };
  },
});
