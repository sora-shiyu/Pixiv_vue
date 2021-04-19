<template>
  <div ref="App" class="App">
    <div ref="settingDrawer">
      <el-drawer
        @open="open"
        :with-header="false"
        :show-close="false"
        :before-close="drawerClose"
        v-model="$store.state.SettingStatus"
        :direction="'ltr'"
        destroy-on-close
        :size="getDrawersize"
      >
        <Setting />
      </el-drawer>
    </div>
    <router-view v-slot="{ Component }">
      <!-- :key="$route.fullPath" -->
      <keep-alive :key="$route.fullPath" include="Home">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script >
import Setting from "./components/setting/setting";
export default {
  name: "App",
  components: {
    Setting
  },
  data () {
    return {
      bodyWidth: 0,
      AppLeft: 0,
    };
  },
  watch: {
    //监听页面宽度变化
    bodyWidth: {
      handler: function (newValues) {
        this.$store.commit("setScreenWidth", newValues);
      },
    },
  },
  computed: {
    //取设置页宽度
    getDrawersize () {
      return this.bodyWidth * 0.66 + 'px'
    }
  },
  created () {
    //初始化宽度
    this.bodyWidth = document.body.clientWidth
    //取图片代理地址
    let ProxyUrl = this.getCookie("ProxyUrl")
    //设置默认图片代理地址
    if (typeof (ProxyUrl) == 'undefined') {
      this.$store.commit("setProxyUrl", this.$store.state.proxyUrlData[0].value);
    } else {
      this.$store.commit("setProxyUrl", ProxyUrl);
    }
  },

  mounted () {
    //取主页面离浏览器左边距离 ，设置页偏移默认贴左
    this.AppLeft = this.$refs.App.getBoundingClientRect().left
    //浏览器窗口变动监听
    window.onresize = () => {
      this.bodyWidth = document.body.clientWidth
      this.AppLeft = this.$refs.App.getBoundingClientRect().left
    }
  },
  methods: {
    //关闭设置页
    drawerClose () {
      this.$store.commit("setSettingStatus", false);
    },
    //打开设置页  设置偏移量
    open () {
      this.$refs.settingDrawer.firstElementChild.style.marginLeft = this.AppLeft - 1 + 'px'
    },
    getCookie (cookie_name) {
      var allcookies = document.cookie;
      //索引长度，开始索引的位置
      var cookie_pos = allcookies.indexOf(cookie_name);

      // 如果找到了索引，就代表cookie存在,否则不存在
      if (cookie_pos != -1) {
        // 把cookie_pos放在值的开始，只要给值加1即可
        //计算取cookie值得开始索引，加的1为“=”
        cookie_pos = cookie_pos + cookie_name.length + 1;
        //计算取cookie值得结束索引
        var cookie_end = allcookies.indexOf(";", cookie_pos);

        if (cookie_end == -1) {
          cookie_end = allcookies.length;

        }
        //得到想要的cookie的值
        var value = unescape(allcookies.substring(cookie_pos, cookie_end));
      }
      return value;
    }
  },
};
</script>

<style >
</style>