<template>
  <div>
    <topback />
    <div class="topImage">
      <img :src="userUrl?userUrl:defaultPicture" alt />
    </div>
    <div style="position: relative">
      <div class="userData">
        <img class="userimg" :src="userUrl?userUrl:defaultPicture" alt />
        <div class="userName">{{ userdata.user.name }}</div>
        <div v-if="userdata.profile.twitter_url" style="display: inline-flex;" class="textColor">
          <img style="width: 20px" src="@/assets/img/twitter.svg" />
          <div style="line-height: 28px;">{{ userdata.profile.twitter_url }}</div>
        </div>
        <div
          class="textColor"
        >{{ userdata.profile.total_follow_users + "关注 " + userdata.profile.total_mypixiv_users + "好P友" }}</div>
      </div>
    </div>

    <div id="userComment" class="Comment">
      <div ref="CommentText">{{ userdata.user.comment }}</div>
    </div>
    <div v-if="CB_" @click="clickCB" :style="{ display: cb_falg ? 'none' : '' }" class="Commentbut">
      <div>查看更多</div>
      <img src="@/assets/img/down.svg" alt />
    </div>
    <!-- navInfo -->
    <navInfo text="插画·漫画收藏"></navInfo>
    <horizontalPicture v-if="favoriteData" width="200px" height="200px" :imgDatas="favoriteData" />
    <navInfo pushSrc="/home" text="其他画作">
      <template #img>
        <img src="@/assets/img/collect.svg" />
      </template>
      <template #text>
        <span style="font-size: 15px">{{userdata.profile.total_illusts}}件作品</span>
      </template>
    </navInfo>

    <!-- 瀑布流图片 -->

    <waterfall
      v-if="userid!=0 "
      :imgData="memberIllustData"
      type="member_illust"
      :mode="userid"
      :path="'/users/' + userid"
      :waterfall="true"
    />
  </div>
</template>

<script>
import topback from "@/components/top_back";
import navInfo from "@/components/navInfo";
import waterfall from "@/components/waterfall/waterfall";
import { Get_pixiv_api } from "@/api/Pixiv_Api";
import horizontalPicture from "@/components/horizontalPicture/horizontalPicture";
export default {
  name: "users",
  components: {
    horizontalPicture,
    topback,
    navInfo,
    waterfall,
  },
  data () {
    return {
      memberIllustData: undefined,
      cb_falg: false,
      userid: 0,
      userdata: {
        user: {
          name: '',
          comment: '',
        },
        profile: {
          total_follow_users: '',//关注数量
          total_mypixiv_users: '',//好友数量
          webpage: '',//skeb链接
          twitter_url: '',//Twitter链接
          total_illusts: '',
        }
      },
      textH: 0,
      favoriteData: null,
      userUrl: '',
      defaultPicture: require('@/assets/img/blank.svg')

    };
  },
  computed: {
    CB_: function () {
      let flag = false;
      if (this.textH > 180) {
        flag = true;
      }
      return flag;
    },
  },
  created () {
    this.userid = this.$route.params.id;
    if (this.$store.state.cacheUserIllustsData.id == this.userid) {
      this.memberIllustData = this.$store.state.cacheUserIllustsData.data
    }

    Get_pixiv_api("member", this.userid, 0, false).then((res) => {
      this.userdata = res;
      this.userUrl = this.$store.getters.getProxyUrl(res.user.profile_image_urls.medium)
      setTimeout(() => {
        this.textH = this.$refs.CommentText.offsetHeight;
      }, 1);
    });
    Get_pixiv_api("favorite", this.userid).then((res) => {
      console.log(res);
      if (res.illusts.length != 0) {
        this.favoriteData = res.illusts
      }

    })
  },
  mounted () {
    //使用nextTick为了保证dom元素都已经渲染完毕
    // let textH=this.$refs.CommentText.offsetHeight
    // setTimeout(()=>{
    //   let textH= document.getElementById("userComment").firstElementChild.offsetHeight
    //   console.log(textH);
    // },200)
    // this.$nextTick(() => { //使用nextTick为了保证dom元素都已经渲染完毕
    // });
  },
  methods: {
    clickCB () {
      document.getElementById("userComment").style.overflow = "unset";
      document.getElementById("userComment").style.height = "auto";
      this.cb_falg = true;
    },
  },
};
</script>

<style  scoped>
.Home_masonry {
  position: relative;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  margin: auto;
}
.topImage {
  width: 100%;
  height: 10%;
}
.topImage img {
  object-fit: cover;
  width: 100%;
  height: 8rem;
  filter: blur(1px);
}
.userData {
  width: 100%;
  margin-top: -77px;
  text-align: center;
  position: absolute;
  top: 20px;
}
.userData div {
  margin-top: 5px;
}
.userimg {
  width: 100px;
  border-radius: 50%;
  height: 100px;
  object-fit: cover;
}
.userName {
  font-size: 18px;
  font-weight: bolder;
}
.textColor {
  color: rgb(118, 139, 149);
}
.Comment {
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  height: 180px;
  font-size: 20px;
  font-weight: 600;
  margin-top: 170px;
  color: black;
  overflow: auto;
  word-wrap: break-word;
  word-break: normal;
  text-align: center;
}
.Commentbut {
  height: 40px;
  width: 110px;
  margin: 0 auto;
}
.Commentbut img {
  height: 40px;
  width: 40px;
}
.Commentbut div {
  float: left;
  line-height: 40px;
}
</style>