<template>
  <div v-loading="loading">
    <topBack />
    <!-- 原图 -->
    <div class="container">
      <div v-for="indedx in imgData.page_count" :key="indedx">
        <!-- <el-image data-action="zoom" :src="getsrc_(indedx - 1)"></el-image> -->
        <img v-zoom="{ src: getOriginalSrc_(indedx - 1) }" :src="getsrc_(indedx - 1)" />
      </div>
    </div>
    <!-- 作者信息 -->
    <div>
      <el-affix
        :style="{ display: drawer ? 'none' : '' }"
        @scroll="scroll_"
        position="bottom"
        :offset="-3"
      >
        <div class="userAffix">
          <img
            :style="{ display: affix ? '' : 'none' }"
            @click="drawer = !drawer"
            src="@/assets/img/top.svg"
          />
          <div>
            <div class="userImg" @click="click_user">
              <el-avatar :src="userImg" icon="el-icon-user-solid"></el-avatar>
            </div>
            <div style="line-height: 25px">
              <div class="darkGray">{{ imgData.title }}</div>
              <div class="gray">{{ imgData.user.name }}</div>
            </div>
          </div>
        </div>
      </el-affix>
    </div>
    <!-- 作者详情 -->
    <userinfo :imgData="imgData" />
    <!-- 上拉容器 -->
    <div id="drawer1">
      <el-drawer
        @open="open_"
        :with-header="false"
        :show-close="false"
        v-model="drawer"
        :direction="'btt'"
        destroy-on-close
        size="60%"
      >
        <div class="userAffix">
          <img
            :style="{ display: affix ? '' : 'none' }"
            @click="drawer = !drawer"
            src="@/assets/img/down.svg"
          />
          <div>
            <div class="userImg" @click="click_user">
              <el-avatar :src="userImg" icon="el-icon-user-solid"></el-avatar>
            </div>
            <div style="line-height: 25px">
              <div class="darkGray">{{ imgData.title }}</div>
              <div class="gray">{{ imgData.user.name }}</div>
            </div>
          </div>
        </div>
        <userinfo :imgData="imgData" />
      </el-drawer>
    </div>

    <hr />
    <!-- 前3张图 -->
    <div class="lookProfile">
      <img :src="userImg" alt />
      <div class="name">{{ imgData.user.name }}</div>

      <div class="button">
        <el-button>关注</el-button>
      </div>
    </div>

    <div class="otherImg">
      <div v-for="(img, otherindex) in getThreeimage" :key="otherindex">
        <img :src="$store.getters.getProxyUrl(img.image_urls.medium)" alt />
      </div>
    </div>
    <div @click="click_user" class="outerLayer">
      <div class="package">
        <div style="float: left">查看个人简介</div>
        <img style="float: left" src="@/assets/img/next.svg" alt />
      </div>
    </div>
    <hr style="margin-top: 0px" />
    <comments :id="id" />
    <hr style="margin-top: 10px" />
    <div style="text-align: center">相关作品</div>
    <!-- 相关作品 -->
    <waterfall type="related" :mode="id" :path="'/artworks/' + id" :waterfall="true" />
  </div>
</template>

<script>
import waterfall from "@/components/waterfall/waterfall";
import navInfo from "@/components/navInfo";
import { Get_pixiv_api } from "@/api/Pixiv_Api";
import userinfo from "@/components/user/user";
import topBack from "@/components/top_back";
import comments from "@/components/comments/comments";

export default {
  name: "artworks",
  components: {
    topBack,
    userinfo,
    navInfo,
    waterfall,
    comments,
  },
  directives: {
    zoom: {
      beforeMount (el, binding) {
        el.flag = false;
        el._zoomFunc = function () {
          let src = null;
          if ("src" in binding.value) {
            src = binding.value.src;
          }
          el.flag = !el.flag;
          let flag = el.flag
          if (flag) {
            let clientHeight = document.body.clientHeight;
            let offsetY = 0;
            let zoom = 1;
            let top = el.getBoundingClientRect().top;

            if (el.height > clientHeight) {
              zoom = clientHeight / el.height;
            }
            offsetY = (clientHeight - el.height) / 2 - top;
            if (src && el.src != src) {
              el.src = src;
            }
            el.style.position = "relative";
            el.style.zIndex = "999";
            el.style.transition =
              "-webkit-transform 0.3s cubic-bezier(0.4, 0, 0, 1) 0s";
            el.style.transform =
              "translate(0px, " +
              offsetY +
              "px) scale(" +
              zoom +
              ", " +
              zoom +
              ")";
            let div = document.createElement("div");
            div.className = "mask";
            div.id = "mask";
            div.onclick = function () {
              el.click();
            };
            div.style =
              "width: 100%;height: 100%;position: fixed;inset: 0px;opacity: 1;z-index: 998;background-color: rgb(255, 255, 255);transition: opacity 0.3s cubic-bezier(0.4, 0, 0, 1) 0s;";
            document.body.insertBefore(div, document.body.firstChild);
            var scrollFunc = function (e) {
              e = e || window.event;
              if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件               
                el.click();
              }
            }
            window.onmousewheel = document.onmousewheel = scrollFunc;
          } else {
            window.onmousewheel = document.onmousewheel = undefined
            document.getElementById("mask").style.display = "none";
            el.style.transform = "none";
            el.style.position = "";
            el.style.zIndex = ""
            document.getElementById("mask").remove();
          }
        }
        el.addEventListener("click", el._zoomFunc);
      },
      beforeUnmount (el) {
        el.removeEventListener("click", el._zoomFunc)
      }
    },
  },
  data () {
    return {
      id: "0",
      imgData: {
        user: {
          name: ''
        }
      },
      affix: false,
      drawer: false,
      userImg: "",
      otherImg: [],
      loading: true,
    };
  },
  computed: {
    getThreeimage () {
      return this.otherImg.slice(0, 3);
    }
  },
  mounted () { },
  created () {
    this.id = this.$route.params.id;
    //判断缓存画作id是否匹配 匹配引用缓存数据 否则重新请求数据
    if (this.$store.state.cacheArtworksData.id == this.id) {
      this.imgData = this.$store.state.cacheArtworksData;
      this.userImg = this.$store.getters.getProxyUrl(this.imgData.user.profile_image_urls.medium);
      this.loading = false;
      Get_pixiv_api("member_illust", this.imgData.user.id, 1, false).then(
        (res) => {
          this.otherImg = res.illusts
        }
      );
    } else {
      Get_pixiv_api("illust", this.id, 0, true).then((res) => {
        this.imgData = res.illust;
        this.userImg = this.$store.getters.getProxyUrl(this.imgData.user.profile_image_urls.medium);
        this.loading = false;
        Get_pixiv_api("member_illust", res.illust.user.id, 1, false).then(
          (res) => {
            this.otherImg = res.illusts
          }
        );
      });


    }


  },
  methods: {
    //取缩略图
    getsrc_ (index) {
      let url_ =
        this.imgData.page_count == 1
          ? this.imgData.image_urls.large
          : this.imgData.meta_pages[index].image_urls.large;
      return this.$store.getters.getProxyUrl(url_)
    },
    //取原图
    getOriginalSrc_ (index) {
      let url_ =
        this.imgData.page_count == 1
          ? this.imgData.meta_single_page.original_image_url
          : this.imgData.meta_pages[index].image_urls.original;
      return this.$store.getters.getProxyUrl(url_)
    },
    //跳转作者详情页
    click_user () {
      //缓存后再跳转减少请求
      this.$store.commit('setCacheUserIllustsData', this.otherImg);
      this.$router.push("/users/" + this.imgData.user.id);
    },
    open_ () {
      //打开伸缩页 样式对齐body
      let domdrawer = document.getElementById("drawer1").firstElementChild
        .firstElementChild;
      domdrawer.style.overflow = "auto";
      domdrawer.style.maxWidth = "500px";
      domdrawer.style.margin = "0 auto";
    },
    scroll_ (e) {
      //判断固钉状态来设置样式
      this.affix = e.fixed;
    },
  },
};
</script>

<style scoped>
.container,
.container * {
  width: 100%;
}
.userAffix {
  height: 50px;
  background: #ffffff;
}
.userAffix img {
  height: 50px;
  float: left;
}
.userImg {
  float: left;
  margin: 5px 20px;
}
.gray {
  color: rgb(167, 167, 167);
}
.darkGray {
  color: rgb(104, 96, 109);
  font-weight: 600;
}
.lookProfile {
  width: 100%;
  height: 60px;
}
.lookProfile img {
  margin-left: 10px;
  height: 50px;
  float: left;
  border-radius: 50%;
  width: 50px;
  object-fit: cover;
}
.name {
  margin-left: 10px;
  float: left;
  line-height: 50px;
  font-size: 18px;
}
.button {
  float: right;
  line-height: 50px;
  margin-right: 10px;
}
.otherImg {
  width: 100%;
}
.otherImg div {
  /* float: left;    导致抽屉容器变形  */
  display: inline-block;
  width: 33.3%;
  height: 0;
  position: relative;
  padding-bottom: 33.3%;
  overflow: hidden;
}
.otherImg img {
  object-fit: cover;
  width: 100%;
  border-radius: 8px;
  position: absolute;
  height: 100%;
}
.outerLayer {
  position: relative;
  left: 50%;
  height: 24px;
  display: inline-block;
  margin: 10px 0;
}
.package {
  position: relative;
  left: -50%;
  height: 24px;
  float: left;
}
.package > * {
  float: left;
  line-height: 24px;
}
.package img {
  width: 24px;
}
</style>