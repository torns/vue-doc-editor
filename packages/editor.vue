<template>
  <div class="w-p-100 ediotr-container">
    <div class="flex-al p-20 border-box al-start w-p-100 m-t-100">
      <div class="w-p-100 fixed-header">
        <div class="w-p-100 flex-al al-c bg-fff line-b p-10 border-box">
          <MenuBar
            class="editor__header"
            :editor="editor"
            v-if="editor && editable"
          />
        </div>
      </div>
      <div class="doc-a4 m-t-15 m-b-20 m-l-20">
        <editor-content
          :editor="editor"
          v-if="editor && isMultiple"
          class="p-b-20"
        />
        <editor-content :editor="editor" v-else class="p-b-20" />
      </div>
      <div class="flex-row al-c head-box" v-if="focused">
        <div
          class="head"
          :style="{ backgroundImage: 'url(' + user.head + ')' }"
        ></div>
        <span class="username">{{ user.lable }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import * as R from "ramda";
import { EditorContent } from "@tiptap/vue-2";
import MenuBar from "./lib/MenuBar.vue";
import AvatarRow from "./lib/AvatarRow";
import {
  useGenerateMultiple,
  useGenerateStatic,
  getRandomElement,
  handleUpdate,
  keysEq,
} from "./lib/index.js";
/**
 * 文档编辑器
 * @typedef  {wsUrl:string,room:string,user:string} IMultiple 开启协作的配置
 * @prop  { false | IMultiple } multiple 是否开启协作
 * @prop  { boolean } editable 是否可编辑
 * @prop  { any } editor editor对象
 * @prop  { string | any } content 文档内容-- 仅multiple===false生效，支持.sync双向绑定
 */
export default {
  props: {
    editorObj: "",
    headings: "",
    roles: {},
    user: {},

    multiple: {
      type: [Boolean, Object],
      default() {
        return false;
      },
    },
    content: {
      type: [String, Object],
      default: "",
    },
    editable: {
      type: [Boolean],
      default: true,
    },
  },
  computed: {
    that: (that) => that,
    //debug函数
    debug: () => R.tap(console.log),
    //props.multiple 是否是一个multiple(协作文档)的配置
    isMultiple: (that) => keysEq(["wsurl", "room", "user"])(that.multiple),
    //当前用户
    currentUser: (that) => ({
      name: that.multiple?.user || "游客",
      head: that.multiple?.head || "",
      color: getRandomElement([
        "#958DF1",
        "#F98181",
        "#FBBC88",
        "#FAF594",
        "#70CFF8",
        "#94FADB",
        "#B9F18D",
      ]),
    }),
    //当前房间
    currentRoom: (that) => that.multiple?.room || "测试房间",
    //当前服务端地址
    currentWsUrl: (that) => that.multiple?.wsurl || "测试房间",
    //协作文档需要的配置
    multipleConfig: (that) => [
      (f) => f(that),
      ...R.props([
        "currentRoom",
        "currentWsUrl",
        "currentUser",
        "editable",
        "debug",
      ])(that),
    ],
    //独立文档需要的配置
    staticConfig: (that) => [
      (f) => f(that),
      ...R.props(["content", "editable", "debug"])(that),
    ],
    //创建协作文档
    createMultiple: (that) => () => useGenerateMultiple(...that.multipleConfig),
    //创建独立文档
    createStatic: (that) => () => useGenerateStatic(...that.staticConfig),
    //创建文档工作流
    createDocWorkFlow: ({ createMultiple, createStatic }) =>
      R.ifElse((bol) => bol, createMultiple, createStatic),
  },
  mounted() {
    this.createDocWorkFlow(this.isMultiple);
    this.editor.on("update", handleUpdate(this));
    this.$nextTick(handleUpdate(this));
  },
  components: {
    EditorContent,
    MenuBar,
    AvatarRow,
  },
  data() {
    return {
      focused: false,
      editor: null,
      provider: null,
      indexdb: null,
      editor: null,
      users: [],
      status: "连接中",
    };
  },

  methods: {
    /**
     * 弃用 通过window.prompt设置当前用户名
     */
    setName() {
      const name = (window.prompt("Name") || "").trim().substring(0, 32);

      if (name) {
        return this.updateCurrentUser({
          name,
        });
      }
    },
    /**
     * 弃用 通过window.prompt设置当前用户名
     */
    updateCurrentUser(attributes) {
      this.currentUser = { ...this.currentUser, ...attributes };
      this.editor.chain().focus().user(this.currentUser).run();
      localStorage.setItem("currentUser", JSON.stringify(this.currentUser));
    },
  },
  beforeDestroy() {
    this.editor && this.editor.destroy();
    this.provider && this.provider.destroy();
  },
};
</script>
<style lang="scss" scoped>
@import "./index-scoped.scss";
</style>
<style lang="scss">
@import "./index.scss";
</style>
