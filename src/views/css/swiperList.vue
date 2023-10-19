<template>
  <div class="bg">
    <div class="catalog-block" ref="catalogDOM">
      <div class="catalog-con">
        <transition-group name="animate__animated animate__bounce" enter-active-class="animate__zoomInDown" tag="div" appear>
          <Swiper key="catalog" :listInfo="list" />
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import 'animate.css'
import Swiper from './components/swiper.vue'
export default {
  data () {
    return {
      list: []
    }
  },
  components: {
    Swiper
  },
  mounted () {
    this.$nextTick(() => {
      this.list = [
        { id: 1, title: 'title1' },
        { id: 2, title: 'title1' },
        { id: 3, title: 'title1' },
        { id: 4, title: 'title1' },
        { id: 5, title: 'title1' },
        { id: 6, title: 'title1' },
        { id: 7, title: 'title1' },
        { id: 8, title: 'title1' },
        { id: 9, title: 'title1' },
        { id: 10, title: 'title1' },
        { id: 11, title: 'title1' }
      ]
    })
    this.$nextTick(() => {
      window.addEventListener('scroll', this.handleScroll) // 监听页面滚动
    })
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      const cDom = this.$refs.catalogDOM
      this.distance = cDom.getBoundingClientRect().bottom // dom 的底边到视口底部的距离
      if (this.distance < 850) {
        // this.showCatalog = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.catalog-block {
  background: #fff !important;
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 60px;
  .catalog-con {
    width: 1200px;
    .catalog-info-list {
      width: 1200px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
