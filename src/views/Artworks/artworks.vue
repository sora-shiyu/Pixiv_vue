<template>
  <div>
    <topBack />
    <!-- 原图 -->
    <div class="container" :style="{ width: domWidth + 'px' }">
      <div v-for="indedx in imgdata.page_count" :key="indedx">
        <el-image :src="getsrc_(indedx - 1)"></el-image>
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
              <div class="darkGray">
                {{ imgdata.title }}
              </div>
              <div class="gray">
                {{ name }}
              </div>
            </div>
          </div>
        </div>
      </el-affix>
    </div>
    <!-- 作者详情 -->
    <userinfo :imgdata="imgdata" />
    <!-- 上拉容器 -->
    <el-drawer
      @open="open"
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
            <div class="darkGray">
              {{ imgdata.title }}
            </div>
            <div class="gray">
              {{ name }}
            </div>
          </div>
        </div>
      </div>
      <userinfo :imgdata="imgdata" />
    </el-drawer>

    <hr />
    <!-- 前3张图 -->
    <div class="lookProfile">
      <img :src="userimg" alt="" />
      <div class="name">
        {{ name }}
      </div>

      <div class="button">
        <el-button>关注</el-button>
      </div>
    </div>

    <div class="otherImg">
      <div v-for="(img, otherindex) in otherImg" :key="otherindex">
        <img :src="getPorxyurl(img.image_urls.medium)" alt="" />
      </div>
    </div>
    <div @click="click_user" class="outerLayer">
      <div class="package">
        <div style="float: left">查看个人简介</div>
        <img style="float: left" src="@/assets/img/next.svg" alt="" />
      </div>
    </div>
    <hr style="margin-top: 0px" />
    <div style="text-align: center;">相关作品</div>
    <!-- 相关作品 -->
    <waterfall
      type="related"
      :mode="id"
      :path="'/artworks/' + id"
      :waterfall="true"
    />
  </div>
</template>

<script>
import waterfall from "@/components/waterfall/waterfall";
import navInfo from "@/components/navInfo";
import { Get_pixiv_rank_test } from "@/api/Pixiv_Api";
import userinfo from "@/components/user/user";
import topBack from "@/components/top_back";
export default {
  name: "artworks",
  components: {
    topBack,
    userinfo,
    navInfo,
    waterfall,
  },
  props: {
    _id: String,
  },
  data() {
    return {
      id: 0,
      imgdata: {},
      affix: false,
      drawer: false,
      userimg: "",
      domWidth: 0,
      name: "",
      otherImg: [],
    };
  },
  computed: {},
  mounted() {},
  created() {
    this.domWidth = window.screen.width;
    if (this._id == undefined) {
      let path = this.$route.path;
      this.id = path.substring(path.lastIndexOf("/") + 1);
    }
    Get_pixiv_rank_test("illust", this.id, 0, false).then((res) => {
      this.imgdata = res.illust;
      this.name = res.illust.user.name;
      this.userimg = this.imgdata.user.profile_image_urls.medium.replace(
        "i.pximg.net",
        "i.pixiv.cat"
      );
      Get_pixiv_rank_test("member_illust", res.illust.user.id, 1, false).then(
        (res) => {
          this.otherImg = res.illusts.slice(0, 3);
        }
      );
    });
  },
  methods: {
    getPorxyurl(url) {
      return url.replace("i.pximg.net", "i.pixiv.cat");
    },
    getsrc_(index) {
      let url_ =
        this.imgdata.page_count == 1
          ? this.imgdata.image_urls.large
          : this.imgdata.meta_pages[index].image_urls.large;
      //   console.log(url_.replace("i.pximg.net", "i.pixiv.cat"));
      return url_.replace("i.pximg.net", "i.pixiv.cat");
    },
    click_user() {
      this.$router.push("/users/" + this.imgdata.user.id);
    },
    open_() {
      let domdrawer = document.getElementById("drawer1").firstElementChild
        .firstElementChild;
      domdrawer.style.overflow = "auto";
    },
    scroll_(e) {
      this.affix = e.fixed;
    },
  },
};
</script>

<style scoped>
.container {
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
  width: 33.3vw;
  height: 33vw;
}
.otherImg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
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