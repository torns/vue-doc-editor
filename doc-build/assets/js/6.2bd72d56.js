(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{558:function(e,t,n){"use strict";n.r(t);n(19),n(20),n(22);var o=n(3),a={mounted:function(){var e=this;window.global=window||{},Promise.resolve().then(n.bind(null,236)).then((function(t){o.default.use(t.default),e.syncLoadEd=!0}))},data:function(){return{syncLoadEd:!1,content:"",headings:"",editable:!0,editor:null,roles:[{name:"admin",lable:"超级管理员",head:"https://img2.baidu.com/it/u=325567737,3478266281&fm=26&fmt=auto&gp=0.jpg"},{name:"designer",lable:"设计师",head:"https://img2.baidu.com/it/u=325567737,3478266281&fm=26&fmt=auto&gp=0.jpg"},{name:"developer",lable:"开发者",head:"https://img2.baidu.com/it/u=325567737,3478266281&fm=26&fmt=auto&gp=0.jpg"}],user:{name:"developer",lable:"开发者",head:"https://img2.baidu.com/it/u=325567737,3478266281&fm=26&fmt=auto&gp=0.jpg"}}},computed:{multiple:function(e){return{wsurl:"ws://172.16.26.69:90",room:"xsdadsadas1",user:"user-".concat((new Date).getTime()),head:""}}}},i=n(11),d=Object(i.a)(a,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.syncLoadEd?n("div",{staticStyle:{"margin-bottom":"3em"}},[n("DocEditor",{attrs:{content:e.content,"editor-obj":e.editor,headings:e.headings,multiple:!1,editable:e.editable,roles:e.roles,user:e.user},on:{"update:content":function(t){e.content=t},"update:editorObj":function(t){e.editor=t},"update:editor-obj":function(t){e.editor=t},"update:headings":function(t){e.headings=t}}}),e._v(" "),n("el-button",{attrs:{type:"success"}},[e._v("按钮")]),e._v(" "),n("p",[e._v(e._s(e.content))])],1):e._e()}),[],!1,null,null,null);t.default=d.exports}}]);