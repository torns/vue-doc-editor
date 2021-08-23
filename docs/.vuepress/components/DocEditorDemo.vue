<template>
  <div style="margin-bottom: 3em" v-if="syncLoadEd">
    <DocEditor
      :content.sync="content"
      :editor-obj.sync="editor"
      :headings.sync="headings"
      :multiple="false"
      :editable="editable"
    >
    </DocEditor>
  </div>
</template>
<script>
import("remixicon/fonts/remixicon.css");
import Vue from "vue";
export default {
  mounted() {
    window.global = window || {};
    import(/* webpackChunkName: "packages" */ "../../../packages").then((m) => {
      Vue.use(m.default);
      this.syncLoadEd = true;
    });
  },
  data() {
    return {
      syncLoadEd: false,
      content: "",
      headings: "",
      editable: true,
      editor: null,
    };
  },
  computed: {
    // http://172.16.26.69:1024/
    multiple: (that) => ({
      wsurl: "ws://172.16.26.69:90",
      room: "xsdadsadas1",
      user: `user-${new Date().getTime()}`,
      head: "",
    }),
  },
};
</script>
<style lang="scss">
.flex-row {
  display: flex;
  flex-direction: row;
}
</style>
