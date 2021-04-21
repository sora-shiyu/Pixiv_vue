<template>
  <div ref="image" :style="{ height: height, width: width }" class="container">
    <div class="bigimg" @click="imgClick">
      <img :src="visual?getUrl:defaultPicture" />
    </div>
    <div @click="imgClick" v-if="info" class="info">
      <div class="title">{{live?data.name:data.title}}</div>

      <div class="userName">
        <div>
          <div>
            <img :src="getUserUrl" alt />
          </div>
          <div
            v-if="live"
            style="line-height: 20px"
          >✿{{ data.member_count }} 👁{{ data.total_audience_count }}</div>
          <div v-else style="line-height: 20px">{{ data.user.name }}</div>
        </div>
      </div>
    </div>
    <div v-if="info" @click="isCollect = !isCollect" :class="!live?'collect':'collect_live'">
      <div v-if="!live">
        <img v-if="isCollect" src="@/assets/img/collect_.svg" alt />
        <img v-else src="@/assets/img/collect.svg" alt />
      </div>
      <div class="round" v-else>
        <img src="@/assets/img/live.svg" alt />
      </div>
    </div>
    <div v-if="data.page_count != 1 && data.page_count" class="pageinfo">
      <img src="@/assets/img/page.png" />
      <div class="pageText">{{ data.page_count }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "horizontalPictureBox",
  props: {
    live: Boolean,
    height: String,
    width: String,
    data: Object,
    info: {
      type: Boolean,
      default: true,
    },
    path: String,
  },
  created () { },
  data () {
    return {
      title: "",
      userUrl: "",
      userName: "",
      isCollect: false,
      DomOffsetTop: 0,
      oldY: 0,
      visual: false,
      defaultPicture: require('@/assets/img/blank.svg')
    };
  },
  watch: {
    f1: {
      handler: function () {
        //触发计算图片是否处于可见范围内
        this.setvis();
      },
      deep: true,
    },
  },
  computed: {
    f1 () {
      //返回当前页滚动条距离
      return this.$store.state.rollingY[this.path];
    },
    getUrl () {
      if (this.data != undefined) {
        if (this.live) {
          //替换直播图片反代站点
          let url = this.data.thumbnail_image_url;
          return url.replace(
            "img-sketch.pximg.net",
            "img-sketch.shiyua.workers.dev"
          );
        } else {
          let url = this.data.image_urls.square_medium;
          return this.$store.getters.getProxyUrl(url)
        }
      }
      return "";
    },
    getUserUrl () {
      //获取作者头像
      if (this.data != undefined) {
        let url = "";
        if (this.live) {
          url = this.data.owner.user.profile_image_urls.medium;
        } else {
          url = this.data.user.profile_image_urls.medium;
        }
        return this.$store.getters.getProxyUrl(url)
      }
      return "";
    },
  },
  mounted () {
    //初始化图片显示 判断图片是否处于可见范围内
    let clientHeight = document.documentElement.clientHeight;
    if (clientHeight > this.$refs.image.offsetTop) {
      this.visual = true;
    }
  },
  methods: {
    setvis () {
      //对已可见状态不处理
      if (!this.visual) {
        let newY = this.$store.state.rollingY[this.path];
        //判断滚动条距离是否变化
        if (this.oldY != newY) {
          //判断是否处于可见
          let clientHeight = document.documentElement.clientHeight;
          if (clientHeight > this.$refs.image.offsetTop - newY) {
            this.visual = true;
          }
          //更新距离
          this.oldY = newY;
        }
      }
    },
    imgClick () {
      // 取父组件鼠标移动值 防止误触
      if (this.$parent.recordingOffsetX == 0) {
        if (this.live) {
          this.$message({
            showClose: true,
            message: '暂不支持live功能',
            duration: 1000,
            offset: 50,
            type: "warning"

          })
        } else {
          //缓存数据
          this.$store.commit('setCacheArtworksData', this.data);
          this.$router.push("/artworks/" + this.data.id);
        }
      }
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
  overflow: hidden;
  line-height: 20px;
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
.collect_live {
  position: absolute;
  right: 0px;
  width: 40px !important;
  top: 10px;
  height: 40px;
}
.collect_live img {
  width: 100%;
}
.collect img {
  width: 100%;
}
.round {
  width: 70%;
  height: 70%;
  background-color: rgba(144, 133, 133, 0.81);
  border-radius: 100%;
  border-style: solid;
  border-color: rgba(189, 184, 184, 0.54);
  border-width: 2px;
}
.round img {
  width: 60%;
  margin: auto;
  display: block;
  height: 100%;
}
</style>