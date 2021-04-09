<template>
  <div ref="rank" :class="selectStyle == 2 ? 'slide' : ''">
    <div :class="selectStyle == 2 ? 'container2' : 'container'">
      <div
        @click="itemclick(data.path,index)"
        class="title"
        v-for="(data, index) in datas"
        :key="index"
      >
        <div
          style="color: rgb(205, 198, 202)"
          :class="
            isActive(data.path)
              ? selectStyle == 2
                ? 'isActive2'
                : 'isActive1'
              : ''
          "
        >
          {{ data.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageNavigation",
  props: {
    selectStyle: Number,
    affix: Boolean,
    datas: Array,
    ispush: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      flag: "",
    };
  },
  mounted() {
    this.flag = this.datas[0].path;
  },
  computed: {},
  methods: {
    itemclick(path,index) {
      //console.log(path);
      if (this.ispush) {
        this.$router.replace(path).catch((err) => {});
      } else {
        this.flag = path;
        this.$emit("ispPushClick", path);
        let w=window.screen.width/5
        this.$refs.rank.scrollLeft=w*(index-2)
        console.log(this.$refs.rank.scrollLeft);
      }
    },
    isActive(path) {
      if (this.ispush) {
        return this.$route.path == path;
      } else {
        return this.flag == path;
      }
    },
  },
};
</script>

<style scoped>
.container {
  height: 40px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(100, 100, 100, 0.29);
  display: flex;
}
.container2 {
   height: 40px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(100, 100, 100, 0.29);
  width: 140%;
}
.container .title {
  flex: 1;
  line-height: 40px;
  text-align: center;
}
.container2 .title {
  line-height: 40px;
  text-align: center;
  width: 14.2%;
  float: left;
}

.isActive1 {
  display: inline;
  background: rgb(1, 150, 250);
  padding: 4px 15px;
  border-radius: 16px;
  color: #fff !important;
}
.isActive2 {
  height: 39px;
  border-bottom-style: solid;
  border-bottom-color: rgb(1, 150, 250);
  height: 95%;
  color: rgb(0, 0, 0) !important;
}
.slide {
  width: 100%;
  overflow-x: auto;
}
</style>