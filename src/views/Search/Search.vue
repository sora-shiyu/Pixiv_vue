<template>
  <div>
    <el-affix position="top" :offset="0">
      <NavigationBar />
      <PageNavigation
        :choose="$store.state.searchMode"
        @ispPushClick="ispPushClick"
        :ispush="false"
        :datas="datas"
      />
    </el-affix>
    <div v-loading="loading">
      <div v-if="!isuser">
        <div style="text-align: center" v-if="tagsData">
          <div @click="clickTag(tagsData[0].tag)" class="zero">
            <img :src="$store.getters.getProxyUrl(tagsData[0].illust.image_urls.medium)" />
            <div class="text">
              <div style="font-size: 24px">{{ "#" + tagsData[0].tag }}</div>
              <div style="font-size: 18px">{{ tagsData[0].translated_name }}</div>
            </div>
          </div>
          <div
            v-for="(data, index) in tagsData.slice(1, tagsData.length)"
            :key="index"
            class="nozero"
            @click="clickTag(data.tag)"
          >
            <el-image lazy :src="$store.getters.getProxyUrl(data.illust.image_urls.medium)" />
            <div class="text">
              <div style="font-size: 14px">{{ "#" + data.tag }}</div>
              <div style="font-size: 10px">{{ data.translated_name }}</div>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="tagsData">
        <div class="user" v-for="(userdata,userindex) in tagsData" :key="userindex">
          <div>
            <!-- {{userdata}} -->
            <div
              @click="click(dataIllust)"
              v-for="(dataIllust,indexIllusts) in userdata.illusts"
              :key="indexIllusts"
            >
              <!-- {{dataIllust}} -->
              <horizontalPictureBox
                :info="false"
                :width="getwidth"
                :height="getwidth"
                :data="dataIllust"
              />
            </div>
          </div>
          <div>
            <div>{{userdata.user.name}}</div>
            <div>
              <el-button @click="onAttent" size="mini">关注</el-button>
            </div>
          </div>
          <div>
            <img
              @click="gotoUser(userdata.user.id)"
              :src="$store.getters.getProxyUrl(userdata.user.profile_image_urls.medium)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script >
import NavigationBar from "@/components/MianNavTopBar.vue";
import PageNavigation from "@/components/PageNav/PageNavigation.vue";
import { Get_pixiv_api } from "@/api/Pixiv_Api";
import horizontalPictureBox from "@/components/horizontalPicture/horizontalPictureBox";
export default {
  name: "Search",
  components: {
    NavigationBar,
    PageNavigation,
    horizontalPictureBox,
  },
  data () {
    return {
      tagsData: undefined,
      datas: [
        {
          name: "插画·漫画",
          path: "illust",
        },
        {
          name: "小说",
          path: "novel",
        },
        {
          name: "用户",
          path: "user",
        },
      ],
      Selected: "",
      loading: true,
      isuser: false
    };
  },
  watch: {
    Selected: function () {
      // console.log(this.Selected);
      this.$store.commit('setSearchMode', this.Selected);
      // let a = this.$store
      // console.log(a);
      this.tagsData = null
      this.loading = true
      if (this.Selected == "novel" || this.Selected == "illust") {
        if (this.Selected == "novel") {
          this.$message({
            showClose: true,
            message: '暂不支持预览novel',
            duration: 1000,
            offset: 50,
            type: "warning"

          })
        }
        this.isuser = false
        Get_pixiv_api("tags", this.Selected).then((res) => {
          this.tagsData = res.trend_tags;
          this.loading = false
        });
      } else {
        this.isuser = true
        Get_pixiv_api("recommended", this.Selected, 1, true).then((res) => {
          this.tagsData = res.user_previews;
          this.loading = false
        });
      }

    }

  },

  mounted () {
    console.log("mounted");
  },
  computed: {
    getwidth () {
      return (this.$store.state.screenWidth / 3) - 10 + 'px'
    }
  },
  methods: {
    onAttent () {
      this.$message({
        showClose: true,
        message: '暂不支持',
        duration: 1000,
        offset: 50,
        type: "warning"

      })
    },
    gotoUser (id) {
      this.$router.push("/users/" + id);
    },
    click (data) {
      this.$store.commit('setCacheArtworksData', data);
      this.$router.push("/artworks/" + data.id);
    },
    ispPushClick (e) {
      this.Selected = e;
    },
    clickTag (e) {
      this.$store.commit("setSearchText", e);
      this.$router.push("/searchResults");

    },

  },
  created () {
    // console.log(this.$store);
    // console.log(this.$store.state.searchMode);
    // if (this.$store.state.searchMode == undefined) {
    //   this.Selected = "illust"
    // }else{

    // }
    this.Selected = this.$store.state.searchMode ? this.$store.state.searchMode : 'illust'

    // Get_pixiv_api("tags", "illust").then((res) => {
    //   this.tagsData = res.trend_tags;
    //   this.loading = false
    // });
  },
};
</script>

<style  scoped>
.zero {
  width: 100%;
  height: 100vw;
  max-height: 500px;
}
.zero img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(60%);
  position: relative;
}
.nozero {
  width: 33.3%;
  height: 33.3vw;
  max-height: 166px;
  float: left;
  position: relative;
}
.nozero img {
  width: 100%;
  height: 100%;

  object-fit: cover;
  filter: brightness(60%);
}
.text {
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
}
.user {
  position: relative;
  margin-bottom: 10px;
}
.user > div:first-child {
  overflow: hidden;
}
.user > div:nth-child(2) {
  height: 40px;
  line-height: 40px;
}
.user > div:nth-child(2) > :first-child {
  float: left;
  padding-left: 80px;
}
.user > div:nth-child(2) :nth-child(2) {
  float: right;
}

.user > div:nth-child(3) {
  position: absolute;
  bottom: 10px;
  left: 10px;
}
.user > div:nth-child(3) img {
  height: 60px;
  width: 60px;
  border-radius: 50%;
}
</style>