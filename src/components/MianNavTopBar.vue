<template>
  <NavigationBar>
    <TabBarBox
      path="/more"
      :setting="OpenSetting"
      activeColor="rgb(255,255,255)"
    >
      <template #item-icon>
        <img
          style="margin-top: 19px"
          class="tab-bar-img"
          src="../assets/img/more.svg"
          alt=""
        />
      </template>
      <template #item-icon-active>
        <img class="tab-bar-img" src="../assets/img/more.svg" alt="" />
      </template>
      <template #item-text>
        <div></div>
      </template>
    </TabBarBox>
    <div class="searchBar">
      <div :class="searchBarText == '输入关键词' ? 'searchBarBorder' : ''">
        {{ searchBarText }}
      </div>
    </div>
    <TabBarBox path="/home">
      <template #item-icon>
        <img class="tab-bar-img" src="../assets/img/home_.svg" alt="" />
      </template>
      <template #item-icon-active>
        <img class="tab-bar-img" src="../assets/img/home.svg" alt="" />
      </template>
      <template #item-text>
        <div>主页</div>
      </template>
    </TabBarBox>
    <TabBarBox path="/new">
      <template #item-icon>
        <img class="tab-bar-img" src="../assets/img/more_.svg" alt="" />
      </template>
      <template #item-icon-active>
        <img class="tab-bar-img" src="../assets/img/more.svg" alt="" />
      </template>
      <template #item-text>
        <div>最新</div>
      </template>
    </TabBarBox>
    <TabBarBox path="/search">
      <template #item-icon>
        <img class="tab-bar-img" src="../assets/img/search_.svg" alt="" />
      </template>
      <template #item-icon-active>
        <img class="tab-bar-img" src="../assets/img/search.svg" alt="" />
      </template>
      <template #item-text>
        <div>搜索</div>
      </template>
    </TabBarBox>
  </NavigationBar>
</template>

<script>
import NavigationBar from "../components/tabbar/NavigationBar";
import TabBarBox from "../components/tabbar/BarBox";
const dictionary = {
  home: "主页",
  new: "最新",
  search: "输入关键词",
};
export default {
  name: "MianNavTabBar",
  components: {
    NavigationBar,
    TabBarBox,
  },
  data() {
    return {
      OpenSetting: true,
      searchBarText: "",
    };
  },
  watch: {

  },
  mounted() {},
  created() {
    for (let a in dictionary) {
      let path = this.$route.path;
      if (path.indexOf(a) != -1) {
        console.log(dictionary[a]);
        this.searchBarText = dictionary[a];
        return;
      }
    }
  },
  methods: {},
  computed: {
    // isActive(){
    //   return this.$route.path.indexOf(this.path)!== -1
    // }
    //this.$store.state.drawer
  },
};
</script>

<style scoped>
.tab-bar-img {
  width: 22px;
  height: 22px;
  margin-top: 10px;
  margin-bottom: 2px;
  vertical-align: middle;
}
.searchBar {
  width: 50%;
  line-height: 60px;
  margin-left: 10px;
  color: white;
  letter-spacing: 1px;
  font-size: 20px;
}
.searchBarBorder {
  height: 45px;
  border-bottom-style: solid;
  border-width: 2px;
}
</style>