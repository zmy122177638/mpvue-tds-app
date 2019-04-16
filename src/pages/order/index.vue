<template>
  <section>
    <h1>所有页面的page-demo</h1>
    <p class="a">scss使用，下面引用了weUI组件</p>
    <com-demo :str="'这是发送给组件的变量字符串'"></com-demo>
  </section>
</template>

<script>
  import comDemo from '@/components/componentDome'

  export default {
    data () {
      return {}
    },

    components: {
      comDemo
    },

    methods: {},

    created () {
    }
  }
</script>

<style scoped lang="scss">
  $color:#ff0000;
  .a{
    color: $color;
  }
</style>
