<template>
  <div v-loading="loading">
    <navInfo pushSrc="/rank" text="排行榜">
      <template #img>
        <img src="@/assets/img/rank.svg" />
      </template>
      <template #text>
        <span style="font-size: 15px">查看更多</span>
      </template>
    </navInfo>
    <!-- 横向图片组件 -->
    <horizontalPicture width="200px" height="200px" :imgDatas="rankData" />

    <navInfo pushSrc="/rank" text="人气直播">
      <template #img>
        <img src="@/assets/img/CircleRed.svg" />
      </template>
      <template #text>
        <span style="font-size: 15px">查看更多</span>
      </template>
    </navInfo>
    <!-- 横向组件 -->
    <horizontalPicture :live="true" width="200px" height="100px" :imgDatas="liveData" />
    <navInfo text="为你推荐">
      <template #img>
        <img src="@/assets/img/collect_.svg" />
      </template>
    </navInfo>
    <waterfall type="recommended" mode="illust	" path="/home/illust" :waterfall="true" />
    <!-- <div
      style="overflow: hidden"
      v-infinite-scroll="load"
      :infinite-scroll-immediate="false"
    >
      <div style="overflow: auto;" v-for="index in page" :key="index">
        <waterfall
          @offloading="offloading"
          type="rank"
          mode="day"
          :page="index"
        />
      </div>
    </div>
    <div
      style="height: 40px"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
    ></div>-->
  </div>
</template>

<script>
import { Get_pixiv_api } from "@/api/Pixiv_Api";
import navInfo from "@/components/navInfo";
import waterfall from "@/components/waterfall/waterfall";
import horizontalPicture from "@/components/horizontalPicture/horizontalPicture";

export default {
  name: "illust",
  components: {
    navInfo,
    horizontalPicture,
    waterfall,
  },
  created () {
    console.log(this.$store);
    // console.log(liveJson[0]);
    Get_pixiv_api("rank", "day", 1, false).then((res) => {
      console.log(res);
      this.rankData = res.illusts.slice(0, 9);
      this.loading = false
    });
    Get_pixiv_api("live").then((res) => {
      console.log(res);
      this.liveData = res.lives;
    });
  },
  data () {
    return {
      rankData: [],
      liveData: [],
      loading: true,
    };
  },
  mounted () { },
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>