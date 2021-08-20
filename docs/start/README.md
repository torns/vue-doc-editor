---
title:快速开始
---

## 快速开始

::: tip
支持协作
:::

::: warning
忽略高亮行
:::
<br/>

<DocEditorDemo/>

<<< @/docs/.vuepress/components/DocEditorDemo.vue{17-23,26}

## Props

| props           |        描述        |             类型 |
| --------------- | :----------------: | ---------------: |
| content         |   内容，双向绑定   | JSON[] \| string |
| editor-obj.sync | 文档实例，双向绑定 |      null \| any |
| headings.sync   |   目录，双向绑定   |           JSON[] |
| multiple        | 多人协作配置，见下 |        Imultiple |
| editable        |    是否允许编辑    |          boolean |

## Imultiple 多人协作配置

| props |      描述      |   类型 |
| ----- | :------------: | -----: |
| wsurl | 协作服务端地址 | string |
| room  |    文档 ID     | string |
| user  |     用户名     | string |
| head  |      头像      | string |
