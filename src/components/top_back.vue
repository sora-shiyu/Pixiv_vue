<template>
    <div class="navback">
      <div style="height: 30px; margin-top: 20px; margin-left: 10px">
        <img
          style="height: 30px"
          @click="goBack"
          src="@/assets/img/back.svg"
          alt=""
        />
      </div>
    </div>
</template>

<script>
export default {
  name: "top_back",

  data() {
    return {
     
    };
  },
  mounted() {},
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    
  },
};
</script>

<style scoped>
.navback {
  z-index: 3;
  height: 80px;
  width: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.22), rgba(0, 0, 0, 0));
  /* position: absolute; */
  position: fixed;
  top: 0;
  max-width: 600px;
}
</style>