<template>
  <div v-loading="loadingFirst">
    <div style="overflow: hidden" v-infinite-scroll="load" :infinite-scroll-immediate="false">
      <div class="package" v-for="(Data, index) in Datas" :key="index">
        <waterfallBox :path="path" :data="Data" />
      </div>
      <el-empty v-if="Datas.length==0" description="抱歉,无法找到搜索结果" :image-size="300"></el-empty>
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
import { debounce } from "@/utils/tool";
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
    imgData: Array
  },
  data () {
    return {
      Datas: [],
      page: 1,
      //底部loading
      loading: true,
      //整体遮罩
      loadingFirst: true,
    };
  },
  mounted () {
    //绑定滚动条事件添加防抖
    window.addEventListener("scroll", debounce(this.windowScroll, 200));
  },
  created () {
    //判断是否已经存在数据
    // console.log(this.imgData);
    if (this.imgData && this.imgData != []) {
      this.Datas = this.imgData
      this.loadingFirst = false;
    } else {
      //根据参数请求数据加入数组实现向后添加图片
      Get_pixiv_api(this.type, this.mode, this.page, false).then((res) => {
        res.illusts.forEach((element) => {
          this.Datas.push(element);
        });
        this.loadingFirst = false
        this.loading = false;
      });
    }
  },
  methods: {
    windowScroll () {
      // 滚动条距离页面顶部的距离
      // 以下写法原生兼容
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (this.$route.path === this.path) {
        //在store.rollingY中缓存当前页面滚动条距离
        this.$store.commit('setRollingY', { "path": this.path, "value": scrollTop });
      };
    },

    load () {
      //this.$route.path != this.path 不用判断
      //是否开启无限下拉
      if (!this.waterfall) return;
      //是否处于请求状态
      if (this.loading != true) {
        this.loading = true;
        this.page++;
        Get_pixiv_api(this.type, this.mode, this.page, false).then(
          (res) => {
            console.log("触发下拉请求", this.type, this.mode, this.page);
            res.illusts.forEach((element) => {
              this.Datas.push(element);
            });
            this.loading = false;
          }
        );
      }
    },
  },
  beforeUnmount () {
    //删除滚动条事件
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