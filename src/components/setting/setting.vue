<template>
  <div>
    <div class="user">
      <img src="@/assets/img/defaultAvatar.jpg" />
      <div>
        <div>未登录</div>
        <div>
          <el-button @click="isLogin=true" size="mini">登录</el-button>
          <!-- <el-button size="mini">注册</el-button> -->
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
  <div class="login" v-if="isLogin">
    <div>
      <div class="loginText">登录</div>
      <div>
        <input type="text" name="username" class="username" placeholder="请输入您的用户名！" />
        <input type="password" name="password" class="password" placeholder="请输入您的用户密码！" />
        <input type="button" class="loginbut" value="登录" />
      </div>
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
      value: '',
      isLogin: false
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
    logIn () {

    }


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
.login {
  width: 100%;
  height: 300px;
  top: 25%;
  position: fixed;
  /* background: red; */
  max-width: 500px;
  border-radius: 8px;
}
.login > div {
  /* background: aliceblue; */
  background: url('../../assets/login.jpg');
  width: 80%;
  height: 90%;
  margin: 0 auto;
  border-radius: 8px;
  background-size: cover;
}
.loginText {
  font-size: 2rem;
  font-weight: 900;
  text-align: center;
  padding: 20px 0;
}
input::-webkit-input-placeholder {
  color: #f5f5f5;
}
.loginbut {
  color: #fff;
  font-size: 24px !important;
  font-weight: 600;
  background: #0000004f !important;
}
.loginbut,
.username,
.password {
  width: 92%;
  height: 42px;
  margin: 0 10px;
  background: rgba(45, 45, 45, 0.15);
  margin-top: 15px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 2px 3px 0 rgb(0 0 0 / 10%) inset;
  font-size: 14px;
  color: #fff;
  text-shadow: 0 1px 2px rgb(0 0 0 / 10%);
}
</style>