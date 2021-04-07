<template>
  <div class="container">
    <div
      @click="itemclick(data.path)"
      class="title"
      v-for="(data, index) in datas"
      :key="index"
    >
      <div style="color:rgb(205,198,202)" :class="isActive(data.path) ? selectStyle==2?'isActive2':'isActive1' : ''">
        {{ data.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageNavigation",
  props: {
    selectStyle:Number,
    affix: Boolean,
    datas: Array,
  },
  data() {
    return {};
  },
  mounted() {

  },
  computed: {

  },
  methods: {
    itemclick(path) {
      console.log(path);
      this.$router.replace(path).catch((err) => {});
    },
    isActive(path) {
      return this.$route.path == path;
    },
  },
};
</script>

<style scoped>
.container {
  height: 40px;
  background: #fff;
  box-shadow: 0 1px 3px rgba(100, 100, 100, 0.5);
  display: flex;
}
.container .title {
  flex: 1;
  line-height: 40px;
  text-align: center;
}
.isActive1 {
  display: inline;
  background: rgb(1, 150, 250);
  padding: 4px 15px;
  border-radius: 16px;
  color: #fff !important;
}
.isActive2 {
  border-bottom-style: solid;
  border-bottom-color:  rgb(1,150,250);
  height: 95%;
  color: rgb(0, 0, 0) !important;
}
</style>