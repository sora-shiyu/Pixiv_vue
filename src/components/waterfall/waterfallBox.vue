<template>
  <div @click="click" class="Box" :style="{ width: getWidth + 'px', height: getWidth + 'px' }">
    <horizontalPictureBox
      :path="path"
      :info="false"
      :width="getWidth + 'px'"
      :height="getWidth + 'px'"
      :data="data"
    />
  </div>
</template>

<script>
import horizontalPictureBox from "@/components/horizontalPicture/horizontalPictureBox";
export default {
  name: "waterfallBox",
  props: {
    data: Object,
    path: String,
  },
  components: {
    horizontalPictureBox
  },
  data () {
    return {};
  },
  mounted () { },
  computed: {
    getWidth () {
      //返回图片宽高
      return this.$store.getters.getWaterfallBoxWidth
    }
  },
  created () {
  },
  methods: {
    click () {
      //缓存后再跳转减少请求
      this.$store.commit('setCacheArtworksData', this.data);
      this.$router.push("/artworks/" + this.data.id);
    }
  },
};
</script>

<style scoped>
.Box img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
</style>