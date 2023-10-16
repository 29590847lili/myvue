<template>
  <div class="bg">
    <ChinaMap class="china-map" :data="provinceList" />
  </div>
</template>

<script>
import ChinaMap from './components/chinaMap'
export default {
  data () {
    return {
      provinceList: [
        { provinceName: '北京市', recruitNum: 100, provinceId: 110000000, screenNum: 98, evaluateNum: 99 },
        { provinceName: '天津市', recruitNum: 0, provinceId: 120000000, screenNum: 0, evaluateNum: 0 },
        { provinceName: '河北省', recruitNum: 0, provinceId: 130000000, screenNum: 0, evaluateNum: 0 },
        { provinceName: '山西省', recruitNum: 0, provinceId: 140000000, screenNum: 0, evaluateNum: 0 },
        { provinceName: '内蒙古自治区', recruitNum: 0, provinceId: 150000000, screenNum: 0, evaluateNum: 0 },
        { provinceName: '辽宁省', recruitNum: 0, provinceId: 210000000, screenNum: 0, evaluateNum: 0 },
        { provinceName: '吉林省', recruitNum: 0, provinceId: 220000000, screenNum: 0, evaluateNum: 0 },
        { provinceName: '黑龙江省', recruitNum: 0, provinceId: 230000000, screenNum: 0, evaluateNum: 0 },
        { provinceName: '上海市', recruitNum: 0, provinceId: 310000000, screenNum: 0, evaluateNum: 0 },
        { provinceName: '江苏省', recruitNum: 0, provinceId: 320000000, screenNum: 0, evaluateNum: 0 },
        { provinceName: '浙江省', recruitNum: 0, provinceId: 330000000, screenNum: 0, evaluateNum: 0 },
        { provinceName: '安徽省', recruitNum: 0, provinceId: 340000000, screenNum: 0, evaluateNum: 0 },
        { provinceName: '福建省', recruitNum: 0, provinceId: 350000000, screenNum: 0, evaluateNum: 0 },
        { provinceName: '江西省', recruitNum: 0, provinceId: 360000000, screenNum: 0, evaluateNum: 0 },
        { provinceName: '山东省', recruitNum: 0, provinceId: 370000000, screenNum: 0, evaluateNum: 0 },
        { provinceName: '河南省', recruitNum: 0, provinceId: 410000000, screenNum: 0, evaluateNum: 0 },
        { provinceName: '湖北省', recruitNum: 0, provinceId: 420000000, screenNum: 0, evaluateNum: 0 },
        { provinceName: '湖南省', recruitNum: 0, provinceId: 430000000, screenNum: 0, evaluateNum: 0 },
        { provinceName: '广东省', recruitNum: 0, provinceId: 440000000, screenNum: 0, evaluateNum: 0 },
        { provinceName: '广西壮族自治区', recruitNum: 0, provinceId: 450000000, screenNum: 0, evaluateNum: 0 },
        { provinceName: '海南省', recruitNum: 0, provinceId: 460000000, screenNum: 0, evaluateNum: 0 },
        { provinceName: '重庆市', recruitNum: 0, provinceId: 500000000, screenNum: 0, evaluateNum: 0 },
        { provinceName: '四川省', recruitNum: 0, provinceId: 510000000, screenNum: 0, evaluateNum: 0 },
        { provinceName: '贵州省', recruitNum: 0, provinceId: 520000000, screenNum: 0, evaluateNum: 0 },
        { provinceName: '云南省', recruitNum: 0, provinceId: 530000000, screenNum: 0, evaluateNum: 0 },
        { provinceName: '西藏自治区', recruitNum: 0, provinceId: 540000000, screenNum: 0, evaluateNum: 0 },
        { provinceName: '陕西省', recruitNum: 0, provinceId: 610000000, screenNum: 0, evaluateNum: 0 },
        { provinceName: '甘肃省', recruitNum: 0, provinceId: 620000000, screenNum: 0, evaluateNum: 0 },
        { provinceName: '青海省', recruitNum: 0, provinceId: 630000000, screenNum: 0, evaluateNum: 0 },
        { provinceName: '宁夏回族自治区', recruitNum: 0, provinceId: 640000000, screenNum: 0, evaluateNum: 0 },
        { provinceName: '新疆维吾尔自治区', recruitNum: 0, provinceId: 650000000, screenNum: 0, evaluateNum: 0 },
        { provinceName: '台湾省', recruitNum: 0, provinceId: 710000000, screenNum: 0, evaluateNum: 0 },
        { provinceName: '香港特别行政区', recruitNum: 0, provinceId: 810000000, screenNum: 0, evaluateNum: 0 },
        { provinceName: '澳门特别行政区', recruitNum: 0, provinceId: 820000000, screenNum: 0, evaluateNum: 0 },
        { provinceName: '钓鱼岛', recruitNum: 0, provinceId: 900000000, screenNum: 0, evaluateNum: 0 }]
    }
  },
  components: {
    ChinaMap
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
