import { Extension } from "@tiptap/core";
const types = [
  "heading",
  "paragraph",
  "blockquote",
  "listItem",
  "taskItem",
  "codeBlock",
  "image",
  "drawing",
  "horizontalRule",
  "hardBreak",
];
const Auth = Extension.create({
  name: "auth",
  defaultOptions: {
    types,
  },
  addGlobalAttributes() {
    return [
      {
        // Extend the following extensions
        types,
        attributes: {
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
        },
      },
    ];
  },

  addCommands() {
    return {
      setRead: bol => ({ commands }) => {
        return this.options.types.every(type => {
          return commands.updateAttributes(type, { read: bol });
        });
      },
      setEdit: bol => ({ commands }) => {
        return this.options.types.every(type => {
          return commands.updateAttributes(type, { edit: bol });
        });
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
