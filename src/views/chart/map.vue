<template>
  <div class="bg">
    <!-- 地图 -->
    <div class="area-map">
      <Map :mapInfo="mapInfo" />
    </div>
  </div>
</template>

<script>
import Map from './components/map'
export default {
  data () {
    return {
      mapInfo: [{ province: 130000000, provinceName: '河北省', libCount: 1 }]
    }
  },
  created () {
  },
  components: {
    Map
  }
}
</script>

<style lang=less scoped>
.bg {
  width: 100%;
  padding: 20px !important;
}
.china-map {
  background: #fff !important;
  width: 100%;
  height: 100%;
}
</style>
