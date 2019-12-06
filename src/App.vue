<template>
  <div id="app">
    <router-view v-if="isAuth"></router-view>
    <index v-else></index>
  </div>
</template>

<script>
import index from './components/Index'
export default {
  name: 'app',
  components: { index },
  computed: {
    isAuth () {
      return this.$route.path.match('login')
    }
  }
}
</script>

<style>
#app {
  width: 100%;
  box-sizing: border-box;
}
</style>

