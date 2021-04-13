<template>
  <div>
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
    <navInfo text="为你推荐">
      <template #img>
        <img src="@/assets/img/collect_.svg" />
      </template>
    </navInfo>
  </div>
    <waterfall type="recommended" mode="manga	" path="/home/manga" :waterfall="true" />
</template>

<script>
import { Get_pixiv_api } from "@/api/Pixiv_Api";
import navInfo from "@/components/navInfo";
import horizontalPicture from "@/components/horizontalPicture/horizontalPicture";
import waterfall from "@/components/waterfall/waterfall";
export default {
  name: "manga",
  components: {
    navInfo,
    horizontalPicture,
    waterfall,
  },
  created() {
    Get_pixiv_api("recommended", "manga", 1, false).then((res) => {
      console.log(res);
      this.rankData = res.ranking_illusts;
    });
  },
  data() {
    return {
      rankData: [],
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>