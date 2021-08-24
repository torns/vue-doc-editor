//禁止读标签
import { Mark, mergeAttributes } from "@tiptap/core";
export default Mark.create({
  name: "writedisable",
  defaultOptions: {
    id: null,
    HTMLAttributes: {
      contenteditable: false,
    },
  },
  priority: 1000,

  parseHTML() {
    // const {
    //   options: { who },
    // } = this;
    // console.log(who);

    return [{ tag: "writedisable" }];
  },
  renderHTML({ HTMLAttributes }) {
    const {
      options: { id },
    } = this;
    return [
      "writedisable",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      //切换可读性
      toggleWriteDisable: () => ({ commands }) => {
        return commands.toggleMark("writedisable");
      },
    };
  },
});
