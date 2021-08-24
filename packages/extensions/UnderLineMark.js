//禁止读标签
import { Mark, mergeAttributes } from "@tiptap/core";
export default Mark.create({
  name: "underline",
  defaultOptions: {
    HTMLAttributes: {},
  },
  parseHTML() {
    return [{ tag: "underline" }];
  },
  renderHTML(e) {
    const { HTMLAttributes } = e;
    return [
      "underline",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      toggleUnderline: () => ({ commands }) => {
        return commands.toggleMark("underline");
      },
    };
  },
});
