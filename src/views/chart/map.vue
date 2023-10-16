<template>
  <div class="bg">
    <!-- 地图 -->
    <div class="area-map">
      <ChinaMap2 :mapInfo="mapInfo" />
    </div>
  </div>
</template>

<script>
import ChinaMap2 from './components/chinaMap2'
export default {
  data () {
    return {
      mapInfo: [{ province: 130000000, provinceName: '河北省', libCount: 1 }]

    }
  },
  created () {
  },
  components: {
    ChinaMap2
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
