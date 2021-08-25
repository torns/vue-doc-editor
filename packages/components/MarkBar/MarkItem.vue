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
  cursor: pointer;
  width: 1.5rem;
  height: 1.5rem;
  background: rgba(#000, 0.05);
  color: rgba(#000, 0.7);
  text-align: center;
  line-height: 1.5rem;
  border: none;
  border-radius: 5rem;
  font-size: 0.8rem;
  display: inline-block;
  margin: 0.1rem;
  padding: 0;
  &.is-active,
  &:hover {
    opacity: 1;
    color: #4741b8;
    background: rgba(#766fff, 0.1);
  }
}
</style>