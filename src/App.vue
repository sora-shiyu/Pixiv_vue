<template>
  <div ref="App" class="App">
    <router-view v-slot="{ Component }">
      <!-- :key="$route.fullPath" -->
      <keep-alive :key="$route.fullPath" include="Home">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script >
// import NavigationBar from "./components/MianNavTopBar.vue";
export default {
  name: "App",
  watch: {
    bodyWidth: {
      handler: function (newValues, prevValues) {
        this.$store.commit("setScreenWidth", newValues);
      },
    },
  },
  computed: {
  },
  created(){
    this.bodyWidth=document.body.clientWidth
  },
  components: {
    // NavigationBar,
  },
  data() {
    return {
      bodyWidth:0
    };
  },
  mounted() {
    window.onresize=()=>{
      this.bodyWidth=document.body.clientWidth
    }
  },
  methods: {},
};
</script>

<style >
</style>