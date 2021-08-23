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
  "bold",
];
const NodeID = Extension.create({
  name: "nodeId",
  defaultOptions: {
    types, //哪些可以使用
  },
  addGlobalAttributes() {
    return [
      {
        // Extend the following extensions
        types,
        attributes: {
          id: {
            default: null,
          },
        },
      },
    ];
  },
});
export default NodeID;
