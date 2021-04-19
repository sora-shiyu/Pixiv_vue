<template>
  <div>
    <div v-if="isTag">
      <el-affix position="top" :offset="0">
        <searchBar :clickSearchDiv="clickSearchDiv" :isTag="isTag">
          <template #tags>
            <el-tag
              class="Tags"
              :key="tag"
              v-for="tag in searchTagArr"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
              effect="dark"
            >{{ tag }}</el-tag>
          </template>
        </searchBar>
      </el-affix>
      <waterfall
        v-if="isUserResult"
        type="search"
        :mode="searchText + ' users入り'"
        path="/searchResults"
        :waterfall="true"
      />
      <div v-if="!isUserResult">
        <div class="userPreview" v-for="(userdata,userindex) in tagsArr" :key="userindex">
          <div>
            <!-- {{userdata}} -->
            <div
              @click="gotoArtwAorks(dataIllust.id)"
              v-for="(dataIllust,indexIllusts) in userdata.illusts.length!=0?userdata.illusts:userdata.novels"
              :key="indexIllusts"
            >
              <!-- {{dataIllust}} -->
              <horizontalPictureBox
                :info="false"
                :width="getwidth"
                :height="getwidth"
                :data="dataIllust"
              />
              <!-- <img :src="getProxyUrl(dataIllust.image_urls.medium)"> -->
            </div>
          </div>
          <div>
            <div>{{userdata.user.name}}</div>
            <div>
              <el-button size="mini">关注</el-button>
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

    <div v-else>
      <searchBar :clickSearchDiv="clickSearchDiv" :clicksearch="search">
        <template #input>
          <input
            ref="input"
            class="searchBarTextinput"
            v-model="searchText"
            @keyup.enter="search"
            @input="autoTags"
            type="text"
            placeholder="输入关键字"
          />
        </template>
      </searchBar>
      <PageNavigation
        :choose="$store.state.searchMode"
        @ispPushClick="ispPushClick"
        :ispush="false"
        :datas="datas"
      />
    </div>

    <div v-if="Selected!='user' && tagsArr && !isTag">
      <div style="line-height: 60px" class="TagWrap">你是不是要找?</div>
      <div
        @click="tagsclick(autotag.name)"
        class="TagWrap"
        v-for="autotag in tagsArr"
        :key="autotag"
      >
        <div
          :style="{ lineHeight: autotag.translated_name ? '30px' : '60px' }"
          class="Tag1"
        >{{ autotag.name }}</div>
        <div v-if="autotag.translated_name" class="Tag2">{{ autotag.translated_name }}</div>
      </div>
    </div>
    <div v-else>
      <div v-if="tagsArr && !isTag">
        <div
          class="user"
          v-for="userData in tagsArr"
          :key="userData"
          @click="gotoUser(userData.user.id)"
        >
          <img :src="$store.getters.getProxyUrl(userData.user.profile_image_urls.medium)" />
          <div>{{userData.user.name}}</div>
          <div>
            <el-button size="mini">关注</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PageNavigation from "@/components/PageNav/PageNavigation.vue";
import searchBar from "@/components/tabbar/searchBar.vue";
import waterfall from "@/components/waterfall/waterfall";
import { debounce } from "@/utils/tool";
import { Get_pixiv_api } from "@/api/Pixiv_Api";
import horizontalPictureBox from "@/components/horizontalPicture/horizontalPictureBox";


export default {
  name: "searchResults",
  components: {
    searchBar,
    PageNavigation,
    waterfall,
    horizontalPictureBox,
  },
  watch: {
    isTag: function () {
      if (!this.isTag) {
        this.$nextTick(function () {
          this.$refs.input.focus();
        });
      }
    },
  },

  data () {
    return {
      searchText: "",
      searchTagArr: [],
      isTag: true,
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
      Selected: undefined,
      tagsArr: [],
    };
  },
  watch: {
    Selected: function () {
      this.$store.commit('setSearchMode', this.Selected);
    }
  },
  mounted () { },
  methods: {
    autoTags: debounce(function () {
      if (this.Selected == 'user') {
        Get_pixiv_api("search_user", this.searchText, 1).then((e) => {
          this.tagsArr = e.user_previews;
        });
      } else {
        Get_pixiv_api("autocomplete", this.searchText).then((e) => {
          this.tagsArr = e.tags;
        });

      }


    }, 1000),
    gotoUser (id) {
      this.$router.push("/users/" + id);
    },
    gotoArtwAorks (id) {
      this.$router.push("/artworks/" + id);
    },
    ispPushClick (e) {
      this.Selected = e;
    },
    tagsclick (e) {
      this.searchText = e;
      this.search();
    },
    handleClose (e) {
      this.searchTagArr.splice(this.searchTagArr.indexOf(e), 1);
      // console.log(this.searchTagArr);
      let newsearchTag = "";
      this.searchTagArr.forEach((element) => {
        newsearchTag += element + " ";
      });
      this.$store.commit("setSearchText", newsearchTag);
      this.searchText = newsearchTag;
      if (this.searchTagArr.length == 0) {
        // this.$router.push("/searchTag");
        this.isTag = false;
      } else {
        let oldText = this.searchText;
        this.searchText = "";
        setTimeout(() => {
          this.searchText = oldText;
        }, 100);
      }
    },
    clickSearchDiv () {
      this.isTag = !this.isTag;
      if (this.isTag) {
        this.searchText = this.searchText.replace(/(^\s*)|(\s*$)/g, "");
      } else {
        this.searchText += " ";
      }

      // this.$refs.input.focus();
    },
    search () {
      if (this.searchText.match(/^[ ]*$/)) {
        this.searchText = "";
      }
      if (this.searchText != "") {
        if (this.searchMode == 'user') {
          //this.tagsArr = e.user_previews;
          this.isTag = true;
        } else {
          this.searchText = this.searchText.replace(/(^\s*)|(\s*$)/g, "");
          // console.log(this.searchText);
          let regEx = /\s+/g;
          this.searchText = this.searchText.replace(regEx, " ");
          // console.log(this.searchText);
          this.$store.commit("setSearchText", this.searchText);
          this.isTag = true;
          this.searchTagArr = this.searchText.split(" ");
        }
        // console.log(this.searchTagArr);
      }
    },
  },
  created () {


    if (this.$store.state.searchMode == undefined) {
      this.Selected = "illust"
    } else {
      this.Selected = this.$store.state.searchMode

    }
    if (this.$route.params.searchTag) {
      this.isTag = false;
    }
    this.searchText = this.$store.state.searchText;
    console.log(this.searchText);
    this.searchTagArr = this.searchText.split(" ");
    if (this.searchTagArr.length == 1 && this.searchTagArr[0] == "") {
      this.isTag = false;
    }
    this.searchText = "";
    this.searchTagArr.map((e) => {
      if (e != "") {
        this.searchText += e + " ";
      }
    });
    console.log(this.searchText);
    // console.log(this.searchTagArr);
  },
  computed: {
    isUserResult () {
      return this.searchText && this.Selected != 'user'
    },
    getwidth () {
      return (this.$store.state.screenWidth / 3) - 10 + 'px'
    }
  },
};
</script>

<style scoped>
.Tags {
  margin-left: 4px;
  height: 29px;
  margin-top: 4px;
}
.searchBarTextinput {
  width: 95%;
  height: 35px;
  border-radius: 5px;
  font-size: 18px;
  background: rgb(245, 245, 245);
  outline: 0;
  border-style: hidden;
}
.TagWrap {
  height: 60px;
  line-height: 30px;
  border-bottom-style: solid;
  padding-left: 10px;
  border-bottom-width: 1px;
  border-color: rgb(245, 245, 245, 0.8);
}
.Tag1 {
  height: 20px;
  padding-top: 5px;
  font-size: 18px;
  font-weight: 600;
}
.Tag2 {
  font-size: 15px;
  color: rgb(205, 198, 202);
}
.user {
  width: 100%;
  height: 60px;
  line-height: 60px;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-color: rgb(241 237 237 / 80%);
}
.user > img {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  float: left;
  margin-top: 10px;
}
.user div:nth-child(2) {
  margin-left: 10px;
  float: left;
}
.user div:last-child {
  float: right;
}

.userPreview {
  position: relative;
  margin-bottom: 10px;
}
.userPreview > div:first-child {
  overflow: hidden;
}
.userPreview > div:nth-child(2) {
  height: 40px;
  line-height: 40px;
}
.userPreview > div:nth-child(2) > :first-child {
  float: left;
  padding-left: 80px;
}
.userPreview > div:nth-child(2) :nth-child(2) {
  float: right;
}

.userPreview > div:nth-child(3) {
  position: absolute;
  bottom: 10px;
  left: 10px;
}
.userPreview > div:nth-child(3) img {
  height: 60px;
  width: 60px;
  border-radius: 50%;
}
</style>
