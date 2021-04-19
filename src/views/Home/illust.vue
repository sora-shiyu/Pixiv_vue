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
    <waterfall
      v-if="illustData"
      :imgData="illustData"
      type="recommended"
      mode="illust"
      path="/home/illust"
      :waterfall="true"
    />
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
  data () {
    return {
      rankData: [],
      liveData: [],
      illustData: undefined,
      loading: true,
    };
  },
  created () {
    //请求首页推荐插画数据
    Get_pixiv_api("recommended", "illust", 1, false).then((res) => {
      this.rankData = res.ranking_illusts;
      this.illustData = res.illusts;
      //关闭遮罩层
      this.loading = false
    });
    //请求首页推荐直播数据
    Get_pixiv_api("live").then((res) => {
      this.liveData = res.lives;
    });
  },
  mounted () { },
  methods: {},
};
</script>

<style scoped>
</style>