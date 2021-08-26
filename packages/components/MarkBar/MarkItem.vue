<template>
  <button class="mark-item" :style="{ background: mark.color || '#4741b8' }">
    <div class="mark-item-content">
      <div
        class="flex-row"
        style="height: 1.5em; line-height: 1.5em; text-align: center"
      >
        <i
          :class="`ri-star-line`"
          :style="markStyle"
          style="margin-right: 0.4em"
        ></i>
        <span>{{ (mark.name && mark.name.slice(0, 3)) || "未命名" }}</span>
      </div>
      <div class="flex-row j-sb" style="font-size: 0.4em">
        <span style="margin-right: 1em">{{
          mark.defaultRead ? "可读" : "禁读"
        }}</span>
        <span>{{ mark.defaultWrite ? "可写" : "禁写" }}</span>
      </div>
    </div>
  </button>
</template>

<script>
export default {
  props: ["mark"],
  computed: {
    markStyle: (that) => {
      return {
        color: "#fff",
      };
    },
  },
};
</script>
<style lang="scss" scoped>
.flex-row {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.j-sb {
  justify-content: space-between;
}
.mark-item {
  // opacity: 0.2;
  text-align: left;
  cursor: pointer;
  width: 5rem;
  height: 2.5rem;
  border: none;
  border-radius: 3px;
  font-size: 0.8rem;
  display: inline-block;
  margin: 0.5em 0.5em;
  padding: 0;
  color: #fff;
  .mark-item-content {
    box-sizing: border-box;
    padding: 0.1em 0.5em;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
}
</style>