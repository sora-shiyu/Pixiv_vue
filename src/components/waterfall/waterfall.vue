<template>
  <div v-loading="loadingFirst">
    <div
      style="overflow: hidden"
      v-infinite-scroll="load"
      :infinite-scroll-immediate="false"
    >
      <!-- <div style="overflow: auto" v-for="index1 in page" :key="index1"> -->
      <!-- <waterfall
          @offloading="offloading"
          type="rank"
          mode="day"
          :page="index"
        /> -->
      <div class="package" v-for="(Data, index) in Datas" :key="index">
        <waterfallBox :path="path" :data="Data" />
      </div>
      <el-empty v-if="Datas.length==0" description="抱歉,无法找到搜索结果"  :image-size="300"></el-empty>
      <!-- </div> -->
    </div>
    <div
      style="height: 40px"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
    ></div>
  </div>
</template>

<script>
import { Get_pixiv_api } from "@/api/Pixiv_Api";
import waterfallBox from "@/components/waterfall/waterfallBox";
export default {
  name: "waterfall",
  components: {
    waterfallBox,
  },
  props: {
    type: String,
    mode: String,
    waterfall: Boolean,
    path: String,
  },
  data() {
    return {
      Datas: [],
      page: 1,
      loading: false,
      loadingFirst:true
    };
  },
  mounted() {
    window.addEventListener("scroll", this.windowScroll);
  },
  created() {
    console.log(this.type, this.mode);
    Get_pixiv_api(this.type, this.mode, this.page, false).then((res) => {
      console.log(res);
      res.illusts.forEach((element) => {
        this.Datas.push(element);
      });
      this.loadingFirst=false
      this.loading = false;
    });
  },
  methods: {
    windowScroll() {
      // 滚动条距离页面顶部的距离
      // 以下写法原生兼容
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      
       if (this.$route.path === this.path) {
        //  console.log(scrollTop);
         this.$store.commit('setRollingY', {"path":this.path,"value":scrollTop});
       };
      
    },
    load() {
      if (this.$route.path != this.path) return;
      console.log("到底");
      if (this.loading != true) {
        this.loading = true;
        this.page++;
        Get_pixiv_api(this.type, this.mode, this.page, false).then(
          (res) => {
            // console.log(res.illusts);
            res.illusts.forEach((element) => {
              this.Datas.push(element);
            });
            this.loading = false;
          }
        );
      }
    },
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.windowScroll);
  },
};
</script>

<style scoped>
.package {
  float: left;
  margin: 5px 2px;
}
</style>