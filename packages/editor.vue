<template>
  <div class="w-p-100 ediotr-container">
    <div class="flex-al p-20 border-box al-start w-p-100 m-t-100">
      <div class="w-p-100 fixed-header">
        <div class="w-p-100 bg-fff border-box line-b p-10 j-sb flex-row al-c">
          <slot name="header" class="flex-row al-c"> </slot>
          <div class="flex-row al-c user-box">
            <AvatarRow
              :users="debug(users)"
              v-if="editor && isMultiple && editable"
            />
            <div
              class="editor__footer"
              v-if="false && editor && isMultiple && editable"
            >
              <div :class="`editor__status editor__status--${status}`">
                <template v-if="status === 'connected'">
                  {{ users.length }} 个用户在线 {{ currentRoom }}
                </template>
                <template v-else> 已离线 </template>
              </div>
              <div class="editor__name">
                <button @click="setName">
                  {{ currentUser.name }}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="flex-row flex-wrap m-b-20" v-if="false">
          <el-button
            plain
            size="mini"
            @click="editor.chain().focus().toggleBold().run()"
            :class="{ 'is-active': editor.isActive('bold') }"
            >加粗</el-button
          >
          <el-button
            plain
            size="mini"
            @click="editor.chain().focus().toggleItalic().run()"
            :class="{ 'is-active': editor.isActive('italic') }"
            >斜体</el-button
          >
          <el-button
            plain
            size="mini"
            @click="editor.chain().focus().toggleStrike().run()"
            :class="{ 'is-active': editor.isActive('strike') }"
            >删除线</el-button
          >
          <el-button
            plain
            size="mini"
            @click="editor.chain().focus().toggleHighlight().run()"
            :class="{ 'is-active': editor.isActive('highlight') }"
            >高亮</el-button
          >
          <el-button
            plain
            size="mini"
            @click="editor.chain().focus().setTextAlign('left').run()"
            :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }"
            >左对其</el-button
          >
          <el-button
            plain
            size="mini"
            @click="editor.chain().focus().setTextAlign('center').run()"
            :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }"
            >中间对其</el-button
          >
          <el-button
            plain
            size="mini"
            @click="editor.chain().focus().setTextAlign('right').run()"
            :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }"
            >右对齐</el-button
          >
          <el-button
            plain
            size="mini"
            @click="editor.chain().focus().setTextAlign('justify').run()"
            :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }"
            >两端对齐</el-button
          >
          <el-button
            plain
            size="mini"
            @click="editor.chain().focus().toggleCode().run()"
            :class="{ 'is-active': editor.isActive('code') }"
            >标记文本</el-button
          >
          <el-button
            plain
            size="mini"
            @click="editor.chain().focus().unsetAllMarks().run()"
            >清理外观</el-button
          >
          <el-button
            plain
            size="mini"
            @click="editor.chain().focus().clearNodes().run()"
            >清理结构</el-button
          >
          <el-button
            plain
            size="mini"
            @click="editor.chain().focus().setParagraph().run()"
            :class="{ 'is-active': editor.isActive('paragraph') }"
            >段落</el-button
          >
          <el-button
            plain
            size="mini"
            @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
            >h1</el-button
          >
          <el-button
            plain
            size="mini"
            @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
            >h2</el-button
          >
          <el-button
            plain
            size="mini"
            @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
            >h3</el-button
          >
          <el-button
            plain
            size="mini"
            @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }"
            >h4</el-button
          >
          <el-button
            plain
            size="mini"
            @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }"
            >h5</el-button
          >
          <el-button
            plain
            size="mini"
            @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
            :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }"
            >h6</el-button
          >
          <el-button
            plain
            size="mini"
            @click="editor.chain().focus().toggleBulletList().run()"
            :class="{ 'is-active': editor.isActive('bulletList') }"
            >无序列表</el-button
          >
          <el-button
            plain
            size="mini"
            @click="editor.chain().focus().toggleOrderedList().run()"
            :class="{ 'is-active': editor.isActive('orderedList') }"
            >有序列表</el-button
          >
          <el-button
            plain
            size="mini"
            @click="editor.chain().focus().toggleCodeBlock().run()"
            :class="{ 'is-active': editor.isActive('codeBlock') }"
            >设为代码</el-button
          >
          <el-button
            plain
            size="mini"
            @click="editor.chain().focus().toggleBlockquote().run()"
            :class="{ 'is-active': editor.isActive('blockquote') }"
            >引用</el-button
          >
          <el-button
            plain
            size="mini"
            @click="editor.chain().focus().setHorizontalRule().run()"
            >分割线</el-button
          >
          <el-button
            plain
            size="mini"
            @click="editor.chain().focus().setHardBreak().run()"
            >换行</el-button
          >
          <el-button
            plain
            size="mini"
            @click="editor.chain().focus().undo().run()"
            >撤销</el-button
          >
          <el-button
            plain
            size="mini"
            @click="editor.chain().focus().redo().run()"
            >重做</el-button
          >
          <el-button
            plain
            size="mini"
            @click="
              editor
                .chain()
                .focus()
                .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                .run()
            "
            >插入表格</el-button
          >
          <el-button
            plain
            size="mini"
            @click="editor.chain().focus().addColumnBefore().run()"
            :disabled="!editor.can().addColumnBefore()"
            >在前面插入列</el-button
          >
          <el-button
            plain
            size="mini"
            @click="editor.chain().focus().addColumnAfter().run()"
            :disabled="!editor.can().addColumnAfter()"
            >在后面插入列</el-button
          >
          <el-button
            plain
            size="mini"
            @click="editor.chain().focus().deleteColumn().run()"
            :disabled="!editor.can().deleteColumn()"
            >删除列</el-button
          >
          <el-button
            plain
            size="mini"
            @click="editor.chain().focus().addRowBefore().run()"
            :disabled="!editor.can().addRowBefore()"
            >在前面插入行</el-button
          >
          <el-button
            plain
            size="mini"
            @click="editor.chain().focus().addRowAfter().run()"
            :disabled="!editor.can().addRowAfter()"
            >在后面插入行</el-button
          >
          <el-button
            plain
            size="mini"
            @click="editor.chain().focus().deleteRow().run()"
            :disabled="!editor.can().deleteRow()"
            >删除行</el-button
          >
          <el-button
            plain
            size="mini"
            @click="editor.chain().focus().deleteTable().run()"
            :disabled="!editor.can().deleteTable()"
            >删除表格</el-button
          >
          <el-button
            plain
            size="mini"
            @click="editor.chain().focus().mergeCells().run()"
            :disabled="!editor.can().mergeCells()"
            >合并单元格</el-button
          >
          <el-button
            plain
            size="mini"
            @click="editor.chain().focus().splitCell().run()"
            :disabled="!editor.can().splitCell()"
            >撤销合并</el-button
          >
          <el-button
            plain
            size="mini"
            @click="editor.chain().focus().toggleHeaderColumn().run()"
            :disabled="!editor.can().toggleHeaderColumn()"
            >设为标题列</el-button
          >
          <el-button
            plain
            size="mini"
            @click="editor.chain().focus().toggleHeaderRow().run()"
            :disabled="!editor.can().toggleHeaderRow()"
            >设为标题行</el-button
          >
          <el-button
            plain
            size="mini"
            @click="editor.chain().focus().toggleHeaderCell().run()"
            :disabled="!editor.can().toggleHeaderCell()"
            >设为标题单元格</el-button
          >
          <el-button
            plain
            size="mini"
            @click="editor.chain().focus().mergeOrSplit().run()"
            :disabled="!editor.can().mergeOrSplit()"
            >合并单元格(1个按钮)</el-button
          >
          <el-button
            plain
            size="mini"
            @click="
              editor
                .chain()
                .focus()
                .setCellAttribute('backgroundColor', '#FAF594')
                .run()
            "
            :disabled="
              !editor.can().setCellAttribute('backgroundColor', '#FAF594')
            "
            >设置单元格样式</el-button
          >
          <el-button
            plain
            size="mini"
            @click="editor.chain().focus().fixTables().run()"
            :disabled="!editor.can().fixTables()"
            >修复表格</el-button
          >
          <el-button
            plain
            size="mini"
            @click="editor.chain().focus().goToNextCell().run()"
            :disabled="!editor.can().goToNextCell()"
            >到下一格</el-button
          >
          <el-button
            plain
            size="mini"
            @click="editor.chain().focus().goToPreviousCell().run()"
            :disabled="!editor.can().goToPreviousCell()"
            >到上一个格</el-button
          >
          <el-button plain size="mini" @click="addImage">添加图片</el-button>
          <el-button plain size="mini" @click="addDraw">添加画板</el-button>
        </div>
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
