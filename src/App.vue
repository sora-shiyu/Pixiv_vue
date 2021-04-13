<template>
  <div ref="App" class="App">
    <router-view v-slot="{ Component }">
      <!-- :key="$route.fullPath" -->
      <keep-alive :key="$route.fullPath"  include="Home" >
        <component  :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import NavigationBar from "./components/MianNavTopBar.vue";
export default defineComponent({
  name: "App",
  components: {
    // NavigationBar,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
});
</script>

<style >

</style>