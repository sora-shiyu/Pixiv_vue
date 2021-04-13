<template>
  <div
    ref="Picture"
    v-on:mouseleave="mouseleave"
    v-on:mousemove="mousemove"
    v-on:mousedown="mousedown"
    v-on:mouseup="mouseup"
    class="package"
  >
    <div :style="{ width: getwidth }" class="Picwrap">
      <div class="Pics" v-for="(data, index) in imgDatas" :key="index">
        <horizontalPictureBox :live="live" :width="width" :height="height" :data="data" />
      </div>
    </div>
  </div>
</template>

<script>
import horizontalPictureBox from "@/components/horizontalPicture/horizontalPictureBox";
export default {
  name: "horizontalPicture",
  props: {
    live:Boolean,
    width: String,
    height: String,
    imgDatas: Object,
  },
  components: {
    horizontalPictureBox,
  },
  computed: {
    getwidth() {
      //   if(imgDatas=undefined)return "0px"
      return this.imgDatas.length * (200 + 10) + "px";
    },
  },
  data() {
    return {
      isDown: false,
      initX: 0,
      recordingOffsetX: 0,
    };
  },
  mounted() {
    // console.log(this.imgDatas);
    // window.addEventListener("scroll", this.windowScroll);
  },
  methods: {
    // windowScroll() {
    //   // 滚动条距离页面顶部的距离
    //   // 以下写法原生兼容
    //   let scrollTop =
    //     window.pageYOffset ||
    //     document.documentElement.scrollTop ||
    //     document.body.scrollTop;
    //   console.log(scrollTop);
    // },
    mousedown(e) {
      this.isDown = true;
      this.initX = e.screenX;
      this.recordingOffsetX = 0;
    },
    mouseup() {
      this.isDown = false;
      this.initX = 0;
      // console.log("松开");
    },
    mouseleave() {
      this.isDown = false;
      this.initX = 0;
    },
    mousemove(e) {
      if (this.isDown) {
        let offsetX;
        offsetX = e.screenX - this.initX;
        this.recordingOffsetX = offsetX;
        // console.log("偏移量："+offsetX);
        this.initX = e.screenX;
        this.$refs.Picture.scrollLeft -= offsetX;
        // console.log(offsetX);
        // console.log(e);
      }
    },
  },
  // beforeDestroy() {
  //   window.removeEventListener("scroll", this.windowScroll);
  // },
};
</script>

<style scoped>
.package {
  overflow: hidden;
  overflow-x: auto;
  cursor: default;
}
.Pics {
  width: 100%;
  height: 100%;
}
</style>