import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "prosemirror-state";
const pluginKey = new PluginKey("IDPlugin");
const IDPlugin = Extension.create({
  name: "IDPlugin",
  addProseMirrorPlugins: function () {
    const { options } = this;
    return [
      new Plugin({
        key: pluginKey,
        appendTransaction: (transactions, oldState, newState) => {
          console.log("状态改变");
        },
      }),
    ];
  },
});
export default IDPlugin;
