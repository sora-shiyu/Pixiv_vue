<template>
  <div>
    <div class="user">
      <img src="@/assets/img/defaultAvatar.jpg" />
      <div>
        <div>未登录</div>
        <div>
          <el-button size="mini">登录</el-button>
          <el-button size="mini">注册</el-button>
        </div>
      </div>
    </div>
    <div>
      <div @click="goto(data.path)" class="Nav" v-for="data in pathData" :key="data">
        <img :src="data.img" />
        <div>{{data.name}}</div>
      </div>
    </div>
    <hr style="margin-top:10px" />
  </div>
  <div class="imageProxy">
    <div>图片反代</div>
    <div>
      <el-select @change="change" size="mini" v-model="value" placeholder="请选择">
        <el-option
          v-for="item in $store.state.proxyUrlData"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
          <span style="float: left">{{ item.label }}</span>
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Setting',
  data () {
    return {
      pathData: [
        {
          name: '主页',
          path: '/home',
          img: require('@/assets/img/home_.svg')
        },
        {
          name: '排行榜',
          path: '/rank',
          img: require('@/assets/img/more_.svg')
        },
        {
          name: '搜索',
          path: '/search',
          img: require('@/assets/img/search_.svg')
        }
      ],

      value: ''

    };
  },
  created () {
    this.value = this.$store.state.proxyUrl
  },
  mounted () {

  },
  methods: {
    goto (path) {
      this.$router.replace(path).catch((err) => { });
      this.$store.commit("setSettingStatus", false);
    },
    change () {
      this.$store.commit("setProxyUrl", this.value);
      // console.log(this.$store.state.proxyUrl);
      document.cookie = "ProxyUrl=" + this.value;

    },


  },
};
</script>

<style scoped>
.user > img {
  width: 60px;
  border-radius: 50%;
  float: left;
  margin-left: 20px;
}
.user {
  margin: 20px 0;
}
.user > div {
  height: 60px;
  line-height: 30px;
  margin-left: 100px;
}
.Nav {
  height: 30px;
  line-height: 30px;
  padding: 10px 0;
}
.Nav > img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  float: left;
  filter: grayscale(100%);
  margin-left: 10px;
}
.Nav > div {
  margin-left: 60px;
  font-size: 15px;
  font-weight: 600;
}
.imageProxy {
  height: 40px;
  line-height: 40px;
}
.imageProxy > div:first-child {
  float: left;
  margin-left: 10px;
}
.imageProxy > div:last-child {
  width: 50%;
  float: right;
  margin-right: 20px;
}
</style>