<template>
  <div>
    <div id="nav">
      <router-link to="/">首页</router-link> |
      <router-link to="/lucky-draw">大转盘活动</router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {

  }
}
</script>

<style lang="less" scoped>
  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
