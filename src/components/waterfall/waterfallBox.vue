<template>
  <div @click="click" class="Box" :style="{ width: BoxWidth + 'px', height: BoxWidth + 'px' }">
    <horizontalPictureBox :path="path" :info="false" :width="BoxWidth + 'px'" :height="BoxWidth + 'px'" :data="data" />
  </div>
</template>

<script>
import horizontalPictureBox from "@/components/horizontalPicture/horizontalPictureBox";
export default {
  name: "waterfallBox",
  props: {
    data: Object,
    path:String,
  },
  components:{
      horizontalPictureBox
  },
  data() {
    return {
      BoxWidth: 0,
    };
  },
  mounted() {},
  computed: {

  },
  created() {
    // console.log(this.data);
    if (this.$store.state.screenWidth == 0) {
      this.$store.commit("setScreenWidth", window.screen.width);
    }
    this.BoxWidth = (this.$store.state.screenWidth - 20) / 2;
    console.log(this.screenWidth);
  },
  methods: {
    click(){
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