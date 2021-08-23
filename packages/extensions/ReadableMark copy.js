//禁止读标签
import { Mark, mergeAttributes } from "@tiptap/core";
export default Mark.create({
  code: true,
  name: "readdisable",
  defaultOptions: {
    HTMLAttributes: {
      id: 11,
    },
  },
  addAttributes() {
    return {
      id: "11",
    };
  },
  priority: 1000,
  parseHTML() {
    console.log("parseHTML");
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

  addCommands() {
    return {
      //切换可读性
      toggleReadDisable: () => ({ commands }) => {
        return commands.toggleMark("readdisable");
      },
    };
  },
});
