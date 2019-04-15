<template>
  <section>
    小程序启动授权页面
    <button @click="goHome">授权成功</button>
  </section>
</template>

<script>
  export default {
    data () {
      return {}
    },

    components: {},

    methods: {
      goHome () {
        // console.log(111)
        const url = '../home/main'
        mpvue.reLaunch({ url })
      }
    },

    created () {
    }
  }
</script>

<style scoped lang="scss">

</style>
