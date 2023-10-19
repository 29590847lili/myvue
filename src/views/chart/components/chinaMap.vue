<template>
  <div class="china-map" ref="chinaMap"></div>
</template>

<script>
import * as echarts from 'echarts'
import './china'
// import 'echarts/map/js/china.js'
export default {
  data () {
    return {
      chartData: this.data
    }
  },
  props: ['data'],
  watch: {
    data (nVal, oVal) {
      this.chartData = nVal
      this.setECharts()
    }
  },
  mounted () {
    this.setECharts()
  },
  methods: {
    getName (name) {
      if (name.indexOf('市') > -1) {
        return name.replace('市', '')
      } else if (name.indexOf('省') > -1) {
        return name.replace('省', '')
      } else if (name.indexOf('内蒙古自治区') > -1) {
        return name.replace('自治区', '')
      } else if (name.indexOf('广西壮族自治区') > -1) {
        return name.replace('壮族自治区', '')
      } else if (name.indexOf('西藏自治区') > -1) {
        return name.replace('自治区', '')
      } else if (name.indexOf('宁夏回族自治区') > -1) {
        return name.replace('回族自治区', '')
      } else if (name.indexOf('新疆维吾尔自治区') > -1) {
        return name.replace('维吾尔自治区', '')
      }
    },
    setECharts () {
      const val = localStorage.getItem('projectType') || 1
      const cityData = this.chartData.map((m) => {
        return {
          name: this.getName(m.provinceName),
          shaicha: m.screenNum,
          zhaomu: m.recruitNum,
          pinggu: m.evaluateNum,
          enterNum: m.enterNum,
          canEnterNum: m.canEnterNum,
          value: val === 1 ? m.screenNum : m.enterNum
        }
      })
      console.log(cityData, val, ':::')
      this.chartDom = echarts.init(this.$refs.chinaMap)
      this.chartDom.setOption({
        tooltip: {
          triggerOn: 'click',
          formatter: function (e, t, n) {
            if (val === 1) {
              console.log(e)
              return `<div>
                            <div class="city">${e.data.name}</div>
                                <div>
                                    <span style="margin-right:20px;">筛查:${e.data.shaicha}</span>
                                    <span style="margin-right:20px;">招募:${e.data.zhaomu}</span>
                                    <span>评估:${e.data.pinggu}</span>
                                </div>
                            </div>`
            }
            if (val === 2) {
              return `<div>
                            <div class="city">${e.data.name}</div>
                                <div>
                                    <span style="margin-right:20px;">符合入组条件人数:${e.data.canEnterNum}</span>
                                    <span style="margin-right:20px;">实际入组人数:${e.data.enterNum}</span>
                                </div>
                            </div>`
            }
          }
        },
        visualMap: {
          min: 0,
          max: 10000,
          left: 26,
          bottom: 20,
          showLabel: !0,
          text: ['高', '低'],
          pieces: [
            {
              gt: 8001,
              label: '> 8001 人',
              color: '#104fa7'
            },
            {
              gte: 6001,
              lte: 8000,
              label: '6001 - 8000 人',
              color: '#4f8add'
            },
            {
              gte: 4001,
              lt: 6000,
              label: '4001 - 6000 人',
              color: '#95b9ea'
            },
            {
              gte: 2001,
              lt: 4000,
              label: '2001 - 4000 人',
              color: '#9FDEF9'
            },
            {
              gte: 0,
              lt: 2000,
              color: '#D2E9FF'
            }
          ],
          show: !0
        },
        geo: {
          map: 'china',
          roam: !1,
          scaleLimit: {
            min: 1,
            max: 2
          },
          zoom: 1.2,
          top: 50,
          label: {
            normal: {
              show: !0,
              fontSize: '11',
              color: '#fff'
            }
          },
          itemStyle: {
            normal: {
              borderColor: '#88cdf6'
            },
            emphasis: {
              color: '#ecd59f',
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              borderWidth: 0
            }
          }
        },
        series: [
          {
            name: '确诊病例',
            type: 'map',
            geoIndex: 0,
            data: cityData
          }
        ]
      })
      window.addEventListener('resize', () => {
        this.chartDom.resize()
      })
    }
  }
}
</script>

<style lang="less" scoped>
.china-map {
  width: 100%;
  height: 100%;
}
</style>
