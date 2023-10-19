<template>
  <div class="bg">
    <div class="right-panel">
      <div id="amap-box"></div>
    </div>
  </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'
export default {
  data () {
    return {

    }
  },
  created () {
    this.initMap()
  },
  methods: {
    initMap () {
      AMapLoader.load({
        key: 'f80c5ee8ac0acadf8699bb124611591d',
        version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap) => {
        // 初始化地图
        this.map = new AMap.Map('amap-box', {
          viewMode: '', // 是否为3D地图模式
          zoom: 14, // 初始化地图级别
          center: [116.643548, 40.057223], // 中心点坐标 郑州
          resizeEnable: true
        })
        const icon = new AMap.Icon({
          imageSize: new AMap.Size(32, 32)
          // image: 'https://oss/xcx/icon_dw.png'
        })
        const marker = new AMap.Marker({
          icon,
          position: new AMap.LngLat(116.6437, 40.05717), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          offset: new AMap.Pixel(-32, -32),
          size: 12
        })
        // 创建纯文本标记
        marker.setLabel({
          direction: 'right',
          offset: new AMap.Pixel(-100, -45), // 设置文本标注偏移量
          content: "<div class='map-info'>我这里我这里</div>" // 设置文本标注内容
        })
        marker.on('click', (event) => {
          window.open('https://map.gaode.com/place/B0H3ZSDZ6X')
        })
        this.map.add(marker)
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>

<style lang=less scoped>
.right-panel {
  width: 440px;
  height: 260px;
  background: #e3e3e3;
  #amap-box {
    width: 100%;
    height: 100%;
  }
}
</style>
