<template>
  <div ref="image" :style="{ height: height, width: width }" class="container">
    <div class="bigimg" @click="imgClick">
      <img v-if="!visual" src="@/assets/img/..svg" alt="" />
      <img v-else :src="geturl" alt="" />
    </div>

    <div v-if="info" class="info">
      <div class="title">{{ data.title }}</div>
      <div class="userName">
        <div @click="imgClick">
          <div>
            <img :src="getuserurl" alt="" />
          </div>
          <div style="line-height: 20px">{{ data.user.name }}</div>
        </div>
      </div>
    </div>
    <div @click="isCollect = !isCollect" class="collect">
      <img v-if="isCollect" src="@/assets/img/collect_.svg" alt="" />
      <img v-else src="@/assets/img/collect.svg" alt="" />
    </div>
    <div v-if="data.page_count != 1" class="pageinfo">
      <img src="@/assets/img/page.png" />
      <div class="pageText">{{ data.page_count }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "horizontalPictureBox",
  props: {
    height: String,
    width: String,
    data: Object,
    info: {
      type: Boolean,
      default: true,
    },
    path: String,
  },
  created() {},
  data() {
    return {
      title: "",
      userUrl: "",
      userName: "",
      isCollect: false,
      DomOffsetTop: 0,
      oldY: 0,
      visual: false,
    };
  },
  watch: {
    f1: {
      handler: function () {
        // console.log(a);
        this.setvis();
        // if (!this.visual) {
        //   let newY = this.$store.state.rollingY[this.path];
        //   if (this.oldY != newY) {
        //     let clientHeight = document.documentElement.clientHeight;
        //     // console.log(clientHeight);
        //     if (clientHeight > this.$refs.image.offsetTop - newY) {
        //       console.log("可见");
        //       this.visual = true;
        //     }
        //     // console.log(this.$refs.image.offsetTop)
        //     // console.log(newY);
        //     this.oldY = newY;
        //   }
        // }
      },
      deep: true,
    },
  },
  computed: {
    f1() {
      // console.log(this.$store.state.rollingY[this.path]);
      return this.$store.state.rollingY[this.path];
    },
    geturl() {
      if (this.data != undefined) {
        let url = this.data.image_urls.medium;
        // return ""
        return url.replace("i.pximg.net", "i.pixiv.cat");
      }
      return "";
    },
    getuserurl() {
      if (this.data != undefined) {
        let url = this.data.user.profile_image_urls.medium;
        return url.replace("i.pximg.net", "i.pixiv.cat");
      }
      return "";
    },
    // getDomOffsetTop(){
    //   this.DomOffsetTop=this.$refs.image.offsetTop
    //   return ""
    // }
  },
  mounted() {
    // this.getDomOffsetTop()
    //  console.log(this.$refs.image.offsetLeft,this.$refs.image.offsetTop);
    // this.setvis()
    let clientHeight = document.documentElement.clientHeight;
    if (clientHeight > this.$refs.image.offsetTop) {
      this.visual = true;
    }
  },
  methods: {
    setvis() {
      if (!this.visual) {
        let newY = this.$store.state.rollingY[this.path];
        if (this.oldY != newY) {
          let clientHeight = document.documentElement.clientHeight;
          // console.log(clientHeight);
          if (clientHeight > this.$refs.image.offsetTop - newY) {
            // console.log("可见");
            // this.$refs.image.setAttribute("src",)
            this.visual = true;
          }
          // console.log(this.$refs.image.offsetTop)
          // console.log(newY);
          this.oldY = newY;
        }
      }
    },
    imgClick() {
      // console.log("结果："+this.$parent.recordingOffsetX);
      if (this.$parent.recordingOffsetX == 0) {
        this.$router.push("/artworks/" + this.data.id);
      }
      // this.$router.push("/artworks/" + this.data.id);
      // alert(this.data.id)
    },
  },
};
</script>

<style scoped>
.pageinfo {
  position: absolute;
  height: 24px;
  width: 48px;
  background: #6f6c6c87;
  top: 0;
  right: 0;
  border-radius: 5px;
}
.pageText {
  font-size: 20px;
  color: #fff;
  float: right;
}
.pageinfo img {
  height: 100%;
}
.container {
  margin: 0 5px;
  float: left;
  position: relative;
}
.bigimg {
  height: 100%;
  width: 100%;
  /* background: red; */
}
.bigimg img {
  height: 100%;
  width: 100%;
  border-radius: 8px;
  border-style: solid;
  border-width: 1px;
  border-color: rgba(63, 63, 63, 0.185);
  object-fit: cover;
  /* pointer-events: none; */
  pointer-events: none;
}
.info {
  position: absolute;
  bottom: -1px;
  height: 70px;
  width: 100%;
  margin-left: 1px;
  border-radius: 5px;
  font-size: 15px;
  color: rgb(252, 252, 252);
  background-image: linear-gradient(#ffffff00, #00000085);
}
.title {
  text-shadow: 0px 0px 4px white;
  margin-left: 10px;
  height: 20px;
  margin-top: 20px;
}
.userName {
  margin-left: 10px;
  height: 30px;
  font-size: 10px;
}
.userName div {
  float: left;
}
.userName img {
  width: 20px;
  margin-right: 5px;
  border-radius: 50px;
}
.collect {
  position: absolute;
  bottom: 5px;
  right: 0px;
  width: 24px !important;
  margin-right: 10px;
}
.collect img {
  width: 100%;
}
</style>