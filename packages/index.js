import DocEditor from "./editor";
import Directory from "./extensions/Directory";
export default {
  install: (Vue, options) => {
    Vue.component("DocEditor", DocEditor);
    Vue.component("Directory", Directory);
  },
};
