<template>
  <button
    class="menu-item"
    :class="{ 'is-active': isActive ? isActive() : null }"
    @click="action"
    :title="title"
  >
    <i :class="`ri-${icon}`"></i>
  </button>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    action: {
      type: Function,
      required: true,
    },

    isActive: {
      type: [Function, Boolean],
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-item {
  width: 1rem;
  height: 1rem;
  color: #aaa;
  border: none;
  background-color: transparent;
  border-radius: 0.4rem;
  padding: 0.25rem;
  font-size: 0.9em;
  margin-right: 0.25rem;

  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }

  &.is-active,
  &:hover {
    // color: #1677ff;
    // background-color: #eaf3ff;
    // border-color: #eaf3ff;
    color: #111;
  }
}
</style>