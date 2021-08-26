<template>
  <div style="margin-bottom: 3em" v-if="docEditorLoaded">
    <DocEditor
      :content.sync="content"
      :editor-obj.sync="editor"
      :headings.sync="headings"
      :multiple="false"
      :editable="editable"
    >
    </DocEditor>

    <!-- <p>{{ content }}</p> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: {
        type: "doc",
        content: [
          {
            type: "heading",
            attrs: { textAlign: "left", level: 1 },
            content: [
              { type: "text", marks: [{ type: "bold" }], text: "免责声明" },
            ],
          },
          {
            type: "paragraph",
            attrs: { textAlign: "left" },
            content: [
              {
                type: "text",
                text: "百度提醒您：在使用百度搜索引擎（以下简称百度）前，请您务必仔细阅读并透彻理解本声明。您可以选择不使用百度，但如果您使用百度，您的使用行为将被视为对本声明全部内容的认可。",
              },
            ],
          },
          {
            type: "orderedList",
            attrs: { start: 1 },
            content: [
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    attrs: { textAlign: "left" },
                    content: [
                      {
                        type: "text",
                        text: "鉴于百度以非人工检索方式、根据您键入的关键字自动生成到第三方网页的链接，除百度注明之服务条款外，其他一切因使用百度而可能遭致的意外、疏忽、侵权及其造成的损失（包括因下载被搜索链接到的第三方网站内容而感染电脑病毒），百度对其概不负责，亦不承担任何法律责任。",
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    attrs: { textAlign: "left" },
                    content: [
                      {
                        type: "text",
                        text: "任何通过使用百度而搜索链接到的第三方网页均系他人制作或提供，您可能从该第三方网页上获得资讯及享用服务，百度对其合法性概不负责，亦不承担任何法律责任。",
                      },
                    ],
                  },
                ],
              },
              {
                type: "listItem",
                content: [
                  {
                    type: "paragraph",
                    attrs: { textAlign: "left" },
                    content: [
                      {
                        type: "text",
                        text: "百度搜索结果根据您键入的关键字自动搜索获得并生成，不代表百度赞成被搜索链接到的第三方网页上的内容或立场。",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      headings: "",
      editable: true,
      editor: null,
    };
  },
  computed: {
    multiple: (that) => ({
      wsurl: "ws://172.16.26.69:90",
      room: "xsdadsadas1",
      user: `user-${new Date().getTime()}`,
      head: "",
    }),
  },
};
</script>
