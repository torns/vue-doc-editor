<template>
  <div style="margin-bottom: 3em" v-if="syncLoadEd">
    <p>{{ content }}</p>
    <DocEditor
      :content.sync="content"
      :editor-obj.sync="editor"
      :headings.sync="headings"
      :multiple="false"
      :editable="editable"
      :roles="roles"
      :user="user"
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
      roles: [
        {
          name: "admin",
          lable: "超级管理员",
          head: "https://img2.baidu.com/it/u=325567737,3478266281&fm=26&fmt=auto&gp=0.jpg",
        },
        {
          name: "designer",
          lable: "设计师",
          head: "https://img2.baidu.com/it/u=325567737,3478266281&fm=26&fmt=auto&gp=0.jpg",
        },
        {
          name: "developer",
          lable: "开发者",
          head: "https://img2.baidu.com/it/u=325567737,3478266281&fm=26&fmt=auto&gp=0.jpg",
        },
      ],
      user: {
        name: "developer",
        lable: "开发者",
        head: "https://img2.baidu.com/it/u=325567737,3478266281&fm=26&fmt=auto&gp=0.jpg",
      },
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
