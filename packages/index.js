import DocEditor from "./editor";
export { DocEditor };
// 判断是否是直接引入文件
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}
export default {
  install: (Vue, options) => {
    Vue.component("DocEditor", DocEditor);
  },
};
