<template>
  <div class="searchBar">
    <img @click="back" src="@/assets/img/backBlack.svg" />
    <div class="searchBarText" :style="{ width: isTag ? '64%' : '79%' }">
      <div v-if="isTag" @click="click" class="tags" >
        <slot name="tags"></slot>
      </div>
      <div  v-else>
         <slot name="input"></slot>
      </div>
    </div>
    <img v-if="isTag" src="@/assets/img/set.svg" />
  </div>
</template>

<script>
export default {
  name: "searchBar",
  props: {
    isTag: {
      type: Boolean,
      default: false,
    },
    clickSearchDiv:{
      type: Function,
      default: () => {
        return Function;
      },
    }
  },
  data() {
    return {
    };
  },
  created() {
  },
  mounted() {},
  methods: {
    click() {
      this.clickSearchDiv()
    },
    back() {
      if(this.$route.params.from=="TopBar" || this.isTag){
        this.$router.go(-1);
      }else{
         this.clickSearchDiv()
      }

    },
  },
};
</script>

<style scoped>
.searchBar {
  width: 100%;
  height: 50px;
  background-color: #fff;
}
.searchBar img {
  height: 30px;
  width: 10%;
  float: left;
  margin: 10px 2.5%;
}
.searchBarText {
  float: left;
  height: 40px;
  margin: 5px 3% 0 3%;
  background: rgb(245, 245, 245);
  overflow-x: auto;
}

.tags {
  display: flex;
}
</style>