<template>
  <div>
    <NavigationBar/>
    <PageNavigation :selectStyle=2 :datas="datas" />
  </div>
</template>

<script>
import PageNavigation from "../../components/PageNav/PageNavigation";
import NavigationBar from "@/components/MianNavTopBar";
export default {
  name: "New",
  components: {
    NavigationBar,
    PageNavigation,
  },
  data() {
    return {
      datas: [
        {
          name: "关注者",
          path: "/new/idol",
        },
        {
          name: "最新",
          path: "/new/image",
        },
        {
          name: "好P友",
          path: "/new/friend",
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