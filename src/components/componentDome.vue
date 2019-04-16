<template>
  <section>
    <text>组件示例</text>
    <p>微信小程序组件测试：</p>
    <progress percent="20" show-info/>
    <progress percent="40" stroke-width="12"/>
    <progress percent="60" color="pink"/>
    <progress percent="80" active/>
  </section>
</template>

<script>
  export default {
    name: 'componentDome',
    props: {}
  }
</script>

<style scoped lang="scss">

</style>
