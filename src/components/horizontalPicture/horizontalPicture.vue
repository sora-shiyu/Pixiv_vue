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
    live: Boolean,
    width: String,
    height: String,
    imgDatas: Object,
  },
  components: {
    horizontalPictureBox,
  },
  computed: {
    getwidth () {
      //返回组件总宽度
      return this.imgDatas.length * (200 + 10) + "px";
    },
  },
  data () {
    return {
      isDown: false,
      initX: 0,
      recordingOffsetX: 0,
    };
  },
  mounted () {
  },
  methods: {
    mousedown (e) {
      //鼠标按下 初始化偏移值
      this.isDown = true;
      this.initX = e.screenX;
      this.recordingOffsetX = 0;
    },
    mouseup () {
      //鼠标抬起 结束滑动
      this.isDown = false;
      this.initX = 0;
    },
    mouseleave () {
      //鼠标离开 结束滑动
      this.mouseup()
    },
    mousemove (e) {
      //鼠标按下时移动
      if (this.isDown) {
        let offsetX;
        //鼠标移动的偏移值
        offsetX = e.screenX - this.initX;
        //记录偏移值
        this.recordingOffsetX = offsetX;
        this.initX = e.screenX;
        //组件滚动条跟随移动
        this.$refs.Picture.scrollLeft -= offsetX;
      }
    },
  },
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