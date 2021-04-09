<template>
  <div>
    <el-affix position="top" :offset="0">
      <NavigationBar />
      <PageNavigation :datas="datas" />
    </el-affix>
    <div style="text-align: center" v-if="tagsData">
      <div @click="clickTag(tagsData[0].tag)" class="zero">
        <img :src="getProxyUrl(tagsData[0].illust.image_urls.medium)" alt="" />
        <div class="text">
          <div style="font-size: 24px">
            {{ "#" + tagsData[0].tag }}
          </div>
          <div style="font-size: 18px">
            {{ tagsData[0].translated_name }}
          </div>
        </div>
      </div>
      <div style="overflow: auto">
        <div
          v-for="(data, index) in tagsData.slice(1, tagsData.length)"
          :key="index"
          class="nozero"
          @click="clickTag(data.tag)"
        >
          <img :src="getProxyUrl(data.illust.image_urls.medium)" alt="" />
          <div class="text">
            <div style="font-size: 14px">
              {{ "#" + data.tag }}
            </div>
            <div style="font-size: 10px">
              {{ data.translated_name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script >
import NavigationBar from "@/components/MianNavTopBar.vue";
import PageNavigation from "@/components/PageNav/PageNavigation.vue";
import { Get_pixiv_rank_test } from "@/api/Pixiv_Api";
export default {
  name: "Search",
  components: {
    NavigationBar,
    PageNavigation,
  },
  data() {
    return {
      tagsData: undefined,
      datas: [
      {
        name: "插画·漫画",
        path: "/search/illust",
      },
      {
        name: "小说",
        path: "/search/novel",
      },
      {
        name: "用户",
        path: "/search/user",
      },
    ],
    };
  },
  mounted() {
    console.log("mounted");
  },
  methods: {
    clickTag(e) {
      this.$store.commit("setSearchText", e);
      this.$router.push("/searchResults");
            
    },
    getProxyUrl(a) {
      let url = a.replace("i.pximg.net", "i.pixiv.cat");
      return url;
    },
  },
  created() {
    Get_pixiv_rank_test("tags").then((res) => {
      this.tagsData = res.trend_tags;
    });
  },
};
</script>

<style  scoped>
.zero {
  width: 100%;
  height: 100vw;
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
</style>