import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "prosemirror-state";
const pluginKey = new PluginKey("IDPlugin");
const nodes = [];
const IDPlugin = Extension.create({
  name: "IDPlugin",
  addProseMirrorPlugins: function () {
    const { options } = this;
    return [
      new Plugin({
        key: pluginKey,
        props: {
          handleClickOn(that, view, pos, node, nodePos, event, direct) {
            // console.log({ that, view, pos, node, nodePos, event, direct });
          },
        },
      }),
    ];
  },
});
export default IDPlugin;
