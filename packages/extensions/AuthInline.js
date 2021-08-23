import {
  Mark,
  markInputRule,
  markPasteRule,
  mergeAttributes,
} from "@tiptap/core";
const Auth = Mark.create({
  name: "auth",
  defaultOptions: {
    HTMLAttributes: {},
  },
  addAttributes() {
    return {
      read: {
        default: true,
        renderHTML: ({ read }) => ({
          style: `background:${read ? "" : "rgba(0,255,0,0.03)"}`,
        }),
      },
      edit: {
        default: true,
        renderHTML: ({ edit }) => ({
          contenteditable: edit,
          class: !edit ? "no-edit" : "",
        }),
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: "auth",
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "auth",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      setRead: bol => ({ commands }) => {
        return commands.toggleMark("auth", bol);
      },
      setEdit: bol => ({ commands }) => {
        return commands.toggleMark("auth", { edit: bol });
      },
      // unsetRead: () => ({ commands }) => {
      //   return this.options.types.every(type =>
      //     commands.resetAttributes(type, { read: false })
      //   );
      // },
    };
  },
});
export default Auth;
