<template>
  <div>小说</div>
</template>

<script>
export default {
  name: 'novel',
  data () {
    return {

    };
  },
  created () {
    this.$message({
      showClose: true,
      message: '暂不支持',
      duration: 1000,
      offset: 50,
      type: "warning"

    })
  },
  mounted () {

  },
  methods: {

  },
};
</script>

<style lang="scss" scoped>
</style>