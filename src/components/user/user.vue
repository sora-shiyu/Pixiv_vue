<template>
  <div class="illustrator">
    <div class="NumericalInformation" style="height: 50px;margin-top: 5px;line-height: 50px;">
      <span style="color:rgb(116,140,152)">{{getDate}}</span>
      <span style="color:rgb(116,140,152)">{{imgData.total_view}}阅读</span>
      <span style="color:rgb(1,150,250)">{{imgData.total_bookmarks}}喜欢</span>
    </div>
    <div class="labelInformation">
      <div v-for="(data,index1) in imgData.tags" :key="index1">
        <span @click="click_tag(data.name)" style="color:rgb(67,116,146)">#{{data.name}}</span>
        <span style="color:rgb(173,173,173)">{{data.translated_name}}</span>
      </div>
    </div>
    <div style="margin-top: 20px;word-wrap: break-word;" v-html="imgData.caption"></div>
  </div>
</template>

<script>
export default {
  name: 'user',
  props: {
    imgData: Object
  },
  data () {
    return {

    };
  },
  computed: {
    getDate () {
      return this.GMTToStr(this.imgData.create_date)
    }

  },
  mounted () {

  },
  methods: {
    click_tag (e) {
      this.$store.commit('setSearchText', e);
      this.$router.push("/searchResults");
    },
    GMTToStr (time) {
      let date = new Date(time);
      let Str =
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1) +
        "-" +
        date.getDate() +
        " ";
      // date.getHours() +
      // ":" +
      // date.getMinutes() +
      // ":" +
      // date.getSeconds();
      return Str;
    },


  },
};
</script>

<style scoped>
.illustrator {
  margin-left: 20px;
}
.NumericalInformation span {
  margin-right: 20px;
}
.labelInformation {
  overflow: hidden;
}
.labelInformation div {
  float: left;
  margin: 5px 5px 5px 0;
}
.labelInformation span {
  margin-right: 5px;
}
</style>