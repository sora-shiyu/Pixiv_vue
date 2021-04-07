<template>
  <div>
    <NavigationBar/>
    <el-affix         
    position="top"
    :offset="0">
    <PageNavigation :datas="datas" />
    </el-affix>
    

    <!-- <el-affix :offset="120">
      <el-button type="primary">距离顶部 120px</el-button>
    </el-affix> -->
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script>
import PageNavigation from "@/components/PageNav/PageNavigation";
import NavigationBar from "@/components/MianNavTopBar";
export default {
  name: "Home",
  components: {
    PageNavigation,
    NavigationBar,
  },

  data() {
    return {
      datas: [
        {
          name: "插画",
          path: "/home/illust",
        },
        {
          name: "漫画",
          path: "/home/manga",
        },
        {
          name: "小说",
          path: "/home/novel",
        },
      ],

    };
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>