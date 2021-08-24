import { Editor } from "@tiptap/vue-2";
import { Collaboration, CollaborationCursor, extensions } from "../extensions";
import * as Y from "yjs";
import * as R from "ramda";
import { WebsocketProvider } from "y-websocket";
import { IndexeddbPersistence } from "y-indexeddb";
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
            ...extensions,
            CollaborationCursor.configure({
              provider: that.provider,
              user: currentUser,
              onUpdate: users => {
                that.users = users; //所有用户列表
                return null;
              },
            }),
            Collaboration.configure({
              document: ydoc,
            }),
          ],
          onFocus: () => {
            that.focused = true;
          },
          onBlur: () => {
            that.focused = false;
          },
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
          extensions: [...extensions],
          onFocus: () => {
            that.focused = true;
          },
          onBlur: () => {
            that.focused = false;
          },
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

export const handleUpdate = that => () => {
  const transaction = that.editor.state.tr;
  transaction.setMeta("preventUpdate", true);
  that.editor.view.dispatch(transaction);
  that.$emit("update:content", that.editor.getJSON());
  that.$emit("update:transaction", transaction);
};
