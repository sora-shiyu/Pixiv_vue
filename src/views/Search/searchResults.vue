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
            >
              {{ tag }}
            </el-tag>
          </template>
        </searchBar>
      </el-affix>
      <waterfall
        v-if="searchText"
        type="search"
        :mode="searchText + ' users入り'"
        path="/searchResults"
        :waterfall="true"
      />
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
        @ispPushClick="ispPushClick"
        :ispush="false"
        :datas="datas"
      />
    </div>
    <div v-if="tagsArr && !isTag">
      <div style="line-height: 60px" class="TagWrap">你是不是要找?</div>
      <div @click="tagsclick(autotag.name)" class="TagWrap" v-for="autotag in tagsArr" :key="autotag">
        <div :style="{lineHeight:autotag.translated_name?'30px':'60px' }" class="Tag1">{{autotag.name}}</div>
        <div v-if="autotag.translated_name" class="Tag2">{{autotag.translated_name}}</div>
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
export default {
  name: "searchResults",
  components: {
    searchBar,
    PageNavigation,
    waterfall,
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

  data() {
    return {
      searchText: "",
      searchTagArr: [],
      isTag: true,
      datas: [
        {
          name: "插画·漫画",
          path: "1",
        },
        {
          name: "小说",
          path: "2",
        },
        {
          name: "用户",
          path: "3",
        },
      ],
      Selected: 1,
      tagsArr: [],
    };
  },
  mounted() {},
  methods: {
    autoTags: debounce(function () {
      Get_pixiv_api("autocomplete", this.searchText).then((e) => {
        this.tagsArr = e.tags;
      });
    }, 1000),
    ispPushClick(e) {
      this.Selected = e;
    },
    tagsclick(e){
      this.searchText=e
      this.search()
    },
    handleClose(e) {
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
      }
    },
    clickSearchDiv() {
      this.isTag = !this.isTag;
      if (this.isTag) {
        this.searchText = this.searchText.replace(/(^\s*)|(\s*$)/g, "");
      } else {
        this.searchText += " ";
      }

      // this.$refs.input.focus();
    },
    search() {
      if (this.searchText.match(/^[ ]*$/)) {
        this.searchText = "";
      }
      if (this.searchText != "") {
        this.searchText = this.searchText.replace(/(^\s*)|(\s*$)/g, "");
        // console.log(this.searchText);
        let regEx = /\s+/g;
        this.searchText = this.searchText.replace(regEx, " ");
        // console.log(this.searchText);
        this.$store.commit("setSearchText", this.searchText);
        this.isTag = true;
        this.searchTagArr = this.searchText.split(" ");
        // console.log(this.searchTagArr);
      }
    },
  },
  created() {
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
};
</script>

<style  scoped>
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
.TagWrap{
  height: 60px;
    line-height: 30px;
    border-bottom-style: solid;
    padding-left: 10px;
    border-bottom-width: 1px;
    border-color: rgb(245,245,245,.8);
}
.Tag1{
height: 20px;
    padding-top: 5px;
    font-size: 18px;
    font-weight: 600;
}
.Tag2{
  font-size: 15px;
    color: rgb(205, 198, 202);
}
</style>