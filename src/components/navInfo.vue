<template>
  <div>
    <div class="box">
      <div class="leftImg">
        <slot name="img"></slot>
      </div>
      <div>
        <span>{{text}}</span>
      </div>
      <img @click="next_" v-if="pushSrc!=null" src="@/assets/img/next.svg" style="float: right" />
      <div style="float: right">
        <slot name="text"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "navInfo",
  props: {
    leftImgSrc: String,
    text: String,
    pushSrc: String,
  },
  data () {
    return {};
  },
  mounted () { },
  methods: {
    next_ () {

      this.$router.push(this.pushSrc);
    },
  },
};
</script>

<style >
.box {
  height: 30px;
  line-height: 30px;
  margin: 10px 0 10px 10px;
}
.box div {
  float: left;
}
.box span {
  font-size: 20px;
}
.leftImg img {
  height: 30px;
}
.box img {
  height: 24px;
  margin-top: 3px;
}
</style>