<template>
  <div>
    <NavigationBar />
    <el-affix position="top" :offset="0">
      <PageNavigation
        @ispPushClick="ispPushClick"
        :ispush="false"
        :datas="datas"
        :selectStyle="2"
      />
    </el-affix>
    <waterfall
      v-if="refresh"
      type="rank"
      :mode="mode"
      path="/rank"
      :waterfall="true"
    />
  </div>
</template>

<script>
import PageNavigation from "../../components/PageNav/PageNavigation";
import NavigationBar from "@/components/MianNavTopBar";
import waterfall from "@/components/waterfall/waterfall";
export default {
  name: "Rank",
  components: {
    NavigationBar,
    PageNavigation,
    waterfall,
  },
  data() {
    return {
      datas: [
        {
          name: "每日",
          path: "day",
        },
        {
          name: "男性热门",
          path: "day_male",
        },
        {
          name: "女性热门",
          path: "day_female",
        },
        {
          name: "原创",
          path: "week_original",
        },
        {
          name: "新人",
          path: "week_rookie",
        },
        {
          name: "每周",
          path: "week",
        },
        {
          name: "每月",
          path: "month",
        },
      ],
      mode: "day",
      refresh: true,
    };
  },
  mounted() {},
  methods: {
    ispPushClick(e) {
      this.refresh = !this.refresh;
      this.mode = e;
      setTimeout(() => {
        this.refresh = !this.refresh;
      }, "200");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>