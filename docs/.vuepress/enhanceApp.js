export default ({ Vue }) => {
  Vue.mixin({
    data() {
      return {
        docEditorLoaded: false,
      };
    },
    mounted() {
      window.global = window;
      import("../../packages/index.js").then(module => {
        Vue.use(module.DocEditor);
        Vue.component("DocEditor", module.DocEditor);
        this.docEditorLoaded = true;
      });
    },
  });
};
