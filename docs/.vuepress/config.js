const path = require("path");
const themeConfig = {
  editLinks: false,
  navbar: true,
  smoothScroll: true,
  sidebarDepth: 2,
  lastUpdated: "Last Updated",
  displayAllHeaders: true,
  // logo: "/logo.png",
  sidebar: "auto",
  nav: [
    {
      text: "快速上手",
      link: "/start/",
    },
    {
      text: "配置项",
      items: [
        {
          text: "快速上手",
          link: "https://www.baidu.com",
        },
        {
          text: "快速上手",
          link: "/start/",
        },
      ],
    },
  ],
  repo: "https://gitee.com/foo/bar",
  repoLabel: "仓库地址",
};
//html header
const head = [];
const config = {
  lang: "zh-CN",
  title: "vue-doc-editor",
  description: "基于vue2.0的文档编辑器",
  themeConfig,
  head,
  port: 1024,
  plugins: ["demo-container"],
  markdown: {
    lineNumbers: true,
  },
  dest: path.resolve(__dirname, "../../doc-build"),
};
module.exports = config;
