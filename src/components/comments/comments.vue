<template>
  <div>
    <div>评论</div>
    <div v-if="flag" style="height: 210px; overflow-y: auto">
      <div class="wrap" v-for="(data, index) in comments" :key="index">
        <div>
          <div class="avatar">
            <img :src="$store.getters.getProxyUrl(data.user.profile_image_urls.medium)" />
          </div>
          <div class="content">
            <div class="name">{{ data.user.account }}</div>
            <div class="commentContent">{{ data.comment }}</div>
          </div>
        </div>
        <div class="date">{{ data.date }}</div>
        <!--<div v-if="data.has_replies">他人回复</div> -->
      </div>
    </div>
    <div v-else class="noMessage">没有留言</div>
  </div>
</template>
<script>
import { Get_pixiv_api } from "@/api/Pixiv_Api";
export default {
  name: "comments",
  props: {
    id: Number,
  },
  created () {
    Get_pixiv_api("comments", this.id).then((e) => {
      console.log(e);
      this.comments = e.comments;
      if (e.comments.length != 0) this.flag = true
    });
  },
  data () {
    return {
      comments: null,
      flag: false,
    };
  },
  mounted () { },
  computed: {
  },
  methods: {
    getdate (date) {
      return date.replace("T", " ").split("+")[0];
    },
  },
};
</script>

<style  scoped>
.avatar {
  width: 40px;
  height: 40px;
  float: left;
}
.avatar img {
  border-radius: 50%;
  width: 100%;
  height: 100%;
}
.content {
  margin-left: 50px;
}
.content div {
  line-height: 20px;
}
.content div {
  line-height: 20px;
}
.commentContent {
  color: rgb(80, 78, 78);
  height: 20px;
  font-size: 14px;
  height: auto;
}
.date {
  margin-left: 50px;
  font-size: 14px;
  margin-top: 10px;
}
.wrap {
  margin: 20px 0;
}
.noMessage {
  text-align: center;
}
</style>