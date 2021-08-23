import { Editor } from "@tiptap/vue-2";
import Collaboration from "@tiptap/extension-collaboration";
import * as Y from "yjs";
import hash from "crypto-js/sha1";
import * as R from "ramda";
import { WebsocketProvider } from "y-websocket";
import NodeID from "../extensions/NodeID";
import Auth from "../extensions/AuthInline";
import StarterKit from "@tiptap/starter-kit";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Image from "@tiptap/extension-image";
import Dropcursor from "@tiptap/extension-dropcursor";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Gapcursor from "@tiptap/extension-gapcursor";
import Drawing from "./Drawing.js";
import Link from "@tiptap/extension-link";
import CollaborationCursor from "@tiptap/extension-collaboration-cursor";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import CharacterCount from "@tiptap/extension-character-count";
import { IndexeddbPersistence } from "y-indexeddb";

/**
 * 重新定义表格单元格
 */
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
/**
 * useGenerateMultiple 生成多人在线文档
 * @param {{(fn:any)}} effect 副作用函数，改变外部组件数据
 * @param {string} room 房间号或者文旦号
 * @param {string} wsUrl wss地址
 * @param {string} currentUser 当前用户名字
 * @param {boolean} editable 是否可编辑
 * @param {((n:any)=>any)|?} beforeCreate 创建前钩子函数
 */
export const useGenerateMultiple = R.curry(
  (effect, room, wsUrl, currentUser, editable, beforeCreate = n => n) => {
    const useBeforeHooksAndBack = R.tap(beforeCreate);
    effect(that => {
      //处理组件数据
      const ydoc = new Y.Doc();
      that.indexdb = new IndexeddbPersistence(room, ydoc);
      that.provider = new WebsocketProvider(wsUrl, room, ydoc);
      that.provider.on("status", event => {
        that.status = event.status;
      });
      const editor = new Editor(
        useBeforeHooksAndBack({
          editable,
          extensions: [
            StarterKit,
            Table.configure({
              resizable: true,
              allowTableNodeSelection: true,
            }),
            Drawing,
            NodeID,
            Auth,
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
            Collaboration.configure({
              document: ydoc,
            }),
            CollaborationCursor.configure({
              provider: that.provider,
              user: currentUser,
              onUpdate: users => {
                that.users = users; //所有用户列表
                return null;
              },
            }),
            CharacterCount.configure({
              limit: 10000,
            }),
            Highlight,
          ],
          content: "",
        })
      );
      that.editor = editor;
    });
  }
);
/**
 * usrGenerateStatic 生成静态文档
 * @param {{(fn:any)}} effect 副作用函数，改变外部组件数据
 * @param {string} content 内容
 *  @param {boolean} editable 是否可编辑
 * @param {((n:any)=>any)|?} beforeCreate 创建前钩子函数
 */
export const useGenerateStatic = R.curry(
  (effect, content = "", editable, beforeCreate = n => n) => {
    const useBeforeHooksAndBack = R.tap(beforeCreate);
    effect(that => {
      const editor = new Editor(
        useBeforeHooksAndBack({
          editable,
          extensions: [
            StarterKit,
            Table.configure({
              resizable: true,
              allowTableNodeSelection: true,
            }),
            NodeID,
            Auth,
            Drawing,
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
          ],
          content,
        })
      );
      that.editor = editor;
    });
  }
);

/**
 * 返回list中的随机一个元素
 * @param {any[]} list
 * @returns
 */
export const getRandomElement = list =>
  list[Math.floor(Math.random() * list.length)];
/**
 * 对象的keys是否等于
 * @returns {(keys: unknown[], obj: any) => boolean}
 */
export const keysEq = keys =>
  R.compose(R.equals(0), R.length, R.difference(keys), R.keys);

/**
 *  :todo
 * 更新headings
 */
// export const handleUpdateHeadings = that => () => {
//   const headings = [];
//   const transaction = that.editor.state.tr;
//   that.editor.state.doc.descendants((node, pos) => {
//     if (node.type.name === "heading") {
//       const id = `heading-${headings.length + 1}`;
//       if (node.attrs.id !== id) {
//         transaction.setNodeMarkup(pos, null, {
//           ...node.attrs,
//           id,
//         });
//       }
//       headings.push({
//         level: node.attrs.level,
//         text: node.textContent,
//         id,
//       });
//     }
//   });
//   that.$emit("update:headings", headings);
//   transaction.setMeta("preventUpdate", true);
//   that.editor.view.dispatch(transaction);
//   console.log(that.editor.getJSON());
//   that.$emit("update:content", that.editor.getJSON());
//   return headings;
// };
export const handleUpdate = that => () => {
  const transaction = that.editor.state.tr;
  // that.editor.state.doc.descendants((node, pos) => {
  //   if (node.type.name == "text" && !node.marks.length) {
  //     return;
  //   }
  //   if (node.marks.length) {
  //     console.log(node, transaction);
  //     transaction.setNodeMarkup(pos, null, {});
  //   } else {
  //     transaction.setNodeMarkup(pos, null, {
  //       ...node.attrs,
  //       //这里要缓存hash，否则性能很低，有时间在做
  //       id: `${node.type.name}-${hash(node.textContent)}`,
  //     });
  //   }
  // });
  transaction.setMeta("preventUpdate", true);
  that.editor.view.dispatch(transaction);
  that.$emit("update:content", that.editor.getJSON());
  that.$emit("update:transaction", transaction);
};
