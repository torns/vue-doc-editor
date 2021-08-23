<template>
  <div>
    <template v-for="(item, index) in items">
      <div class="divider" v-if="item.type === 'divider'" :key="index" />
      <menu-item v-else :key="index" v-bind="item" />
    </template>
  </div>
</template>

<script>
import MenuItem from "./MenuItem.vue";

export default {
  components: {
    MenuItem,
  },

  props: {
    editor: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      items: [
        {
          icon: "arrow-go-back-line",
          title: "撤销",
          action: () => this.editor.chain().focus().undo().run(),
        },
        {
          icon: "arrow-go-forward-line",
          title: "重做",
          action: () => this.editor.chain().focus().redo().run(),
        },
        {
          type: "divider",
        },
        {
          icon: "eye-off-line",
          title: "禁止读",
          isActive: () => {
            return this.editor.isActive("readdisable");
          },
          action: () => {
            // const isActive = this.editor.isActive({ read: true });
            // this.editor.chain().focus().setRead(!isActive).run();

            this.editor.chain().focus().toggleReadDisable().run();
          },
        },
        {
          icon: "edit-circle-line",
          title: "禁止写",
          isActive: () => {
            return this.editor.isActive("writedisable");
          },
          action: () => {
            // const isActive = this.editor.isActive({ read: true });
            // this.editor.chain().focus().setRead(!isActive).run();
            this.editor.chain().focus().toggleWriteDisable().run();
          },
        },
        {
          type: "divider",
        },
        {
          icon: "bold",
          title: "加粗",
          action: () => this.editor.chain().focus().toggleBold().run(),
          isActive: () => this.editor.isActive("bold"),
        },
        {
          icon: "italic",
          title: "斜体",
          action: () => this.editor.chain().focus().toggleItalic().run(),
          isActive: () => this.editor.isActive("italic"),
        },
        {
          icon: "strikethrough",
          title: "删除线",
          action: () => this.editor.chain().focus().toggleStrike().run(),
          isActive: () => this.editor.isActive("strike"),
        },
        {
          icon: "code-view",
          title: "代码块",
          action: () => this.editor.chain().focus().toggleCode().run(),
          isActive: () => this.editor.isActive("code"),
        },
        {
          icon: "mark-pen-line",
          title: "高亮",
          action: () => this.editor.chain().focus().toggleHighlight().run(),
          isActive: () => this.editor.isActive("highlight"),
        },
        {
          type: "divider",
        },
        {
          icon: "align-left",
          title: "左对齐",
          action: () => this.editor.chain().focus().setTextAlign("left").run(),
          isActive: () => this.editor.isActive({ textAlign: "left" }),
        },
        {
          icon: "align-center",
          title: "居中",
          action: () =>
            this.editor.chain().focus().setTextAlign("center").run(),
          isActive: () => this.editor.isActive({ textAlign: "center" }),
        },
        {
          icon: "align-right",
          title: "右对齐",
          action: () => this.editor.chain().focus().setTextAlign("right").run(),
          isActive: () => this.editor.isActive({ textAlign: "right" }),
        },
        {
          icon: "align-justify",
          title: "两端对其",
          action: () =>
            this.editor.chain().focus().setTextAlign("justify").run(),
          isActive: () => this.editor.isActive({ textAlign: "justify" }),
        },
        {
          type: "divider",
        },
        {
          icon: "h-1",
          title: "一级标题",
          action: () =>
            this.editor.chain().focus().toggleHeading({ level: 1 }).run(),
          isActive: () => this.editor.isActive("heading", { level: 1 }),
        },
        {
          icon: "h-2",
          title: "二级标题",
          action: () =>
            this.editor.chain().focus().toggleHeading({ level: 2 }).run(),
          isActive: () => this.editor.isActive("heading", { level: 2 }),
        },
        {
          icon: "h-3",
          title: "三级标题",
          action: () =>
            this.editor.chain().focus().toggleHeading({ level: 3 }).run(),
          isActive: () => this.editor.isActive("heading", { level: 3 }),
        },
        {
          icon: "h-4",
          title: "四级标题",
          action: () =>
            this.editor.chain().focus().toggleHeading({ level: 4 }).run(),
          isActive: () => this.editor.isActive("heading", { level: 4 }),
        },
        {
          icon: "h-5",
          title: "五级标题",
          action: () =>
            this.editor.chain().focus().toggleHeading({ level: 5 }).run(),
          isActive: () => this.editor.isActive("heading", { level: 5 }),
        },
        {
          icon: "h-6",
          title: "六级标题",
          action: () =>
            this.editor.chain().focus().toggleHeading({ level: 6 }).run(),
          isActive: () => this.editor.isActive("heading", { level: 6 }),
        },
        {
          icon: "paragraph",
          title: "段落",
          action: () => this.editor.chain().focus().setParagraph().run(),
          isActive: () => this.editor.isActive("paragraph"),
        },
        {
          icon: "list-unordered",
          title: "无需列表",
          action: () => this.editor.chain().focus().toggleBulletList().run(),
          isActive: () => this.editor.isActive("bulletList"),
        },
        {
          icon: "list-ordered",
          title: "有序列表",
          action: () => this.editor.chain().focus().toggleOrderedList().run(),
          isActive: () => this.editor.isActive("orderedList"),
        },
        {
          icon: "list-check-2",
          title: "任务列表",
          action: () => this.editor.chain().focus().toggleTaskList().run(),
          isActive: () => this.editor.isActive("taskList"),
        },
        {
          icon: "code-box-line",
          title: "代码",
          action: () => this.editor.chain().focus().toggleCodeBlock().run(),
          isActive: () => this.editor.isActive("codeBlock"),
        },
        {
          type: "divider",
        },
        {
          icon: "table-2",
          title: "表格",
          action: () =>
            this.editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run(),
          isActive: false,
        },
        {
          icon: "image-line",
          title: "图片",
          action: () => {
            const url = window.prompt("URL");
            if (url) {
              this.editor.chain().focus().setImage({ src: url }).run();
            }
          },
          isActive: false,
        },
        {
          icon: "links-fill",
          title: "A标签",
          action: () => {
            const isActive = this.editor.isActive("link");
            if (isActive) {
              this.editor.chain().focus().unsetLink().run();
              return;
            }
            const url = window.prompt("URL");
            this.editor
              .chain()
              .focus()
              .extendMarkRange("link")
              .setLink({ href: url })
              .run();
          },
          isActive: () => this.editor.isActive("link"),
        },
        {
          icon: "draft-line",
          title: "签名",
          action: () => {
            this.editor.commands.insertContent(
              `<drawing data-type="drawing"></drawing>`
            );
          },
          isActive: false,
        },
        {
          icon: "double-quotes-l",
          title: "引用",
          action: () => this.editor.chain().focus().toggleBlockquote().run(),
          isActive: () => this.editor.isActive("blockquote"),
        },

        {
          icon: "separator",
          title: "分割线",
          action: () => this.editor.chain().focus().setHorizontalRule().run(),
        },
        {
          type: "divider",
        },
        {
          icon: "text-wrap",
          title: "换行",
          action: () => this.editor.chain().focus().setHardBreak().run(),
        },
        {
          icon: "format-clear",
          title: "清理格式",
          action: () =>
            this.editor.chain().focus().clearNodes().unsetAllMarks().run(),
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
$colorBlack: #559eff;
.divider {
  width: 1px;
  height: 1rem;
  background-color: rgba($colorBlack, 0.1);
  margin-left: 0.2em;
  margin-right: 0.2em;
}
</style>