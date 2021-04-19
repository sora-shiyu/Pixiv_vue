<template>
  <div v-loading="loading">
    <topBack />
    <!-- 原图 -->
    <div class="container" :style="{ width: domWidth + 'px' }">
      <div v-for="indedx in imgdata.page_count" :key="indedx">
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
              <el-avatar :src="userimg" icon="el-icon-user-solid"></el-avatar>
            </div>
            <div style="line-height: 25px">
              <div class="darkGray">{{ imgdata.title }}</div>
              <div class="gray">{{ name }}</div>
            </div>
          </div>
        </div>
      </el-affix>
    </div>
    <!-- 作者详情 -->
    <userinfo :imgdata="imgdata" />
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
              <el-avatar :src="userimg" icon="el-icon-user-solid"></el-avatar>
            </div>
            <div style="line-height: 25px">
              <div class="darkGray">{{ imgdata.title }}</div>
              <div class="gray">{{ name }}</div>
            </div>
          </div>
        </div>
        <userinfo :imgdata="imgdata" />
      </el-drawer>
    </div>

    <hr />
    <!-- 前3张图 -->
    <div class="lookProfile">
      <img :src="userimg" alt />
      <div class="name">{{ name }}</div>

      <div class="button">
        <el-button>关注</el-button>
      </div>
    </div>

    <div class="otherImg">
      <div v-for="(img, otherindex) in otherImg" :key="otherindex">
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
  props: {
    _id: String,
  },
  directives: {
    zoom: {
      // 指令的定义
      beforeMount (el, binding) {
        el.flag = false;


        let zoomFun = function (el) {
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
            // el.src = el.oldsrc;
            // el.style = "";
            document.getElementById("mask").remove();
          }
        }
        el._zoomFun = zoomFun.bind(null, el);
        el.addEventListener("click", el._zoomFun);
      },
      beforeUnmount (el) {
        el.removeEventListener("click", el._zoomFun)
      }
    },
  },
  data () {
    return {
      id: 0,
      imgdata: {},
      affix: false,
      drawer: false,
      userimg: "",
      domWidth: 0,
      name: "",
      otherImg: [],
      loading: true,
    };
  },
  computed: {},
  mounted () { },
  created () {
    // this.domWidth = window.screen.width;
    this.domWidth = this.$store.state.screenWidth;
    if (this._id == undefined) {
      let path = this.$route.path;
      this.id = path.substring(path.lastIndexOf("/") + 1);
    }
    Get_pixiv_api("illust", this.id, 0, false).then((res) => {
      this.imgdata = res.illust;
      this.name = res.illust.user.name;
      this.userimg = this.$store.getters.getProxyUrl(this.imgdata.user.profile_image_urls.medium);
      Get_pixiv_api("member_illust", res.illust.user.id, 1, false).then(
        (res) => {
          this.loading = false;
          this.otherImg = res.illusts.slice(0, 3);
        }
      );
    });
  },
  methods: {
    getsrc_ (index) {
      let url_ =
        this.imgdata.page_count == 1
          ? this.imgdata.image_urls.large
          : this.imgdata.meta_pages[index].image_urls.large;
      return this.$store.getters.getProxyUrl(url_)
    },
    getOriginalSrc_ (index) {
      let url_ =
        this.imgdata.page_count == 1
          ? this.imgdata.meta_single_page.original_image_url
          : this.imgdata.meta_pages[index].image_urls.original;
      return this.$store.getters.getProxyUrl(url_)
    },
    click_user () {
      this.$router.push("/users/" + this.imgdata.user.id);
    },
    open_ () {
      let domdrawer = document.getElementById("drawer1").firstElementChild
        .firstElementChild;
      domdrawer.style.overflow = "auto";
      domdrawer.style.maxWidth = "500px";
      domdrawer.style.margin = "0 auto";
    },
    scroll_ (e) {
      this.affix = e.fixed;
    },
  },
};
</script>

<style scoped>
.container * {
  width: 100%;
  /* margin: 10px 0; */
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