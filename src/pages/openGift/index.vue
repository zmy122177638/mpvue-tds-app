<template>
  <section class="openGift-container">
    <div class="openGift-title">选择开店礼包 (八选一)</div>
    <div class="openGift-swiper">
      <swiper
        previous-margin="20px"
        next-margin="20px"
      >
        <block
          v-for="i in 5"
          :key="i"
        >
          <swiper-item>
            <div class="slide-box">
              <image
                src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2153937626,1074119156&fm=27&gp=0.jpg"
                class="slide-image"
              />
            </div>

          </swiper-item>
        </block>
      </swiper>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {}
  },

  components: {
  },

  methods: {},

  created() {
  }
}
</script>

<style scoped lang="scss">
.slide-box {
  overflow: hidden;
}
.slide-image {
  width: 100%;
}
</style>
