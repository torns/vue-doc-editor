import ReadableMark from "./ReadableMark";
import WriteDisableMark from "./WriteDisableMark";
import WriteAbleMark from "./WriteAbleMark";
import UnderLineMark from "./UnderLineMark";
import DrawingNode from "./DrawingNode";
import GlobalDragHandle from "./GlobalDragHandle";
import Table from "@tiptap/extension-table";
import Collaboration from "@tiptap/extension-collaboration";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Image from "@tiptap/extension-image";
import Dropcursor from "@tiptap/extension-dropcursor";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Gapcursor from "@tiptap/extension-gapcursor";
import Link from "@tiptap/extension-link";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import CharacterCount from "@tiptap/extension-character-count";
import StarterKit from "@tiptap/starter-kit";
const TableCellEd = TableCell.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      backgroundColor: {
        default: null,
        parseHTML: element => {
          return {
            backgroundColor: element.getAttribute("data-background-color"),
          };
        },
        renderHTML: attributes => {
          return {
            "data-background-color": attributes.backgroundColor,
            style: `background-color: ${attributes.backgroundColor}`,
          };
        },
      },
    };
  },
});

export {
  DrawingNode,
  ReadableMark,
  WriteDisableMark,
  WriteAbleMark,
  UnderLineMark,
  Collaboration,
  Table,
  TableRow,
  TableCell,
  TableCellEd,
  TableHeader,
  Image,
  Dropcursor,
  TextAlign,
  Highlight,
  Gapcursor,
  Link,
  CollaborationCursor,
  TaskList,
  TaskItem,
  CharacterCount,
};
export const extensions = [
  StarterKit,
  // GlobalDragHandle,
  Table.configure({
    resizable: true,
    allowTableNodeSelection: true,
  }),
  DrawingNode,
  ReadableMark,
  WriteDisableMark,
  WriteAbleMark,
  UnderLineMark,
  Link,
  TableRow,
  TableHeader,
  Image,
  Dropcursor,
  TableCellEd,
  TaskList,
  TaskItem,
  Gapcursor,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),

  CharacterCount.configure({
    limit: 10000,
  }),
  Highlight,
];
