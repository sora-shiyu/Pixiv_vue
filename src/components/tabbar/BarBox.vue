<template>
  <div class="tab-bar-item" @click="itemclick">
    <slot v-if="!isActive" name="item-icon"></slot>
    <slot v-else name="item-icon-active"></slot>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';
export default defineComponent ({
  name: "TabBarBox",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "rgb(255,255,255)",
    },
    setting: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // isActive:false
    };
  },
  mounted() {},
  computed: {
    isActive() {
      // console.log(this.$route.path);
      // console.log(this.path);
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {color: "rgb(154,213,253)" };
    },
  },
  methods: {
    itemclick() {
      // console.log(this.setting);
      if (this.setting == false) {
        //  this.$store.commit('ActivePage', this.path)
        this.$router.replace(this.path).catch((err) => {});
      } else {
        // this.$store.commit("设置页状态", true);
        console.log("打开侧边栏");
      }
    },
  },
});
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}

</style>