<template>
  <web-view :src="url"></web-view>
</template>

<script>
export default {
  data() {
    return {
      url: 'https://xcx.tuands.cn/support/agreement-user.html'
    }
  },
  onLoad(options) {
    this.url = options.url
  }
}
</script>

<style>
</style>
