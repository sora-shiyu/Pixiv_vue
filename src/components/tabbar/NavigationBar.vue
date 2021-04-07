<template>
  <div>
    <div class="wrap">
        <slot></slot>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
export default defineComponent( {
  name: "NavigationBar",
  data() {
    return {};
  },
  mounted() {},
  methods: {},
});
</script>

<style scoped>
.wrap {
  height: 60px;
  background: rgb(2, 150, 250);
  display: flex;
  /* position: fixed; */
  left: 0;
  right: 0;
  top: 0;

  z-index: 2;
}

</style>