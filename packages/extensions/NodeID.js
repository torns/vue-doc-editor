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
    HTMLAttributes: {
      id: null,
    },
    // types, //哪些可以使用
  },
  addGlobalAttributes() {
    return [
      {
        types: types,
        attributes: {
          id: {
            default: 1221,
            parseHTML: element => {
              return {
                color: element.style.color.replace(/['"]+/g, ""),
              };
            },
            renderHTML: attributes => {
              if (!attributes.color) {
                return {};
              }

              return {
                style: `color: ${attributes.color}`,
              };
            },
          },
        },
      },
    ];
  },
});
export default NodeID;
