<template>
  <div class="box">
    <div ref="china-map" class="china-map">
      <!-- 2121 -->
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import * as echarts from "echarts";
import "./china";
export default {
  data () {
    return {
      cityData
    }
  },
  props: {
    mapInfo: {
      default: () => []
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    // async getMapinfo () {
    //   const res = await getMapinfo({});
    //   this.mapInfo = res.data;
    // },
    async getData () {
      setTimeout(() => {
        this.cityData.map((item) => {
          this.mapInfo.map((cItem) => {
            if (cItem.provinceName && cItem.provinceName.includes(item.name)) {
              item.select.disabled = false
              item.value = cItem.libCount ? cItem.libCount : item.value
              item.link = cItem.link
              item.selected = true
              item.itemStyle = {
                borderColor: "#83B9FD", // 省市区域边框色 默认
                borderWidth: 1, // 省市区域边框宽度 默认
                areaColor: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: '#4E85E4' // 0% 处的颜色
                  }, {
                    offset: 1, color: '#000' // 100% 处的颜色
                  }],
                  global: false // 缺省为 false
                }, // 省市区域背景色 默认
                color: "#00f"
              }
              // 鼠标移入高亮地图样式
              item.emphasis = {
                itemStyle: {
                  areaColor: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                      offset: 0, color: '#2A56D8' // 0% 处的颜色
                    }, {
                      offset: 1, color: '#0C329B' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                  }
                },
                label: {
                  color: "#ffffff",
                },
              };
              item.select = {
                itemStyle: {
                  areaColor: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                      offset: 0, color: '#4E85E4' // 0% 处的颜色
                    }, {
                      offset: 1, color: '#195CD0' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                  }
                },
                label: {
                  color: "#fff"
                }
              }
            }
          })
        })
        this.setEchartOption(this.cityData);
      }, 1000);
    },
    //修改echart配制
    setEchartOption (data) {
      var chart = echarts.init(this.$refs["china-map"])
      let option = {
        media: [
          {
            query: {}, //屏幕区间
            option: {
              tooltip: {
                show: true,
                className: "echarts-tooltip",
                formatter: function (params) {
                  return `<div style="padding:0 15px 0 0px;">
                      <div style="font-size:14px;font-weight:bold;margin-bottom:5px;">
                        <img src="https://cancer-research.oss-cn-beijing.aliyuncs.com/service-platform-applet-xcx/map-icon.png" width="20" height="20">
                        ${params.name}
                      </div>
                      <div style="margin-left:26px;font-size:14px;color: #182A87;">
                        ${params.value}个样本库
                      </div>
                    </div>`
                },
              },
              geo: {
                map: "china",
                aspectScale: 0.75, //长宽比
                zoom: 1.2,
                scaleLimit: {
                  min: 1,
                  max: 3,
                },
                roam: false,
                itemStyle: {
                  normal: {
                    areaColor: {
                      type: "radial",
                      x: 0.5,
                      y: 0.5,
                      r: 0.8,
                      colorStops: [
                        {
                          offset: 0,
                          color: "#98C0F3", // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#98C0F3", // 100% 处的颜色
                        },
                      ],
                      globalCoord: true, // 缺省为 false
                    },
                    color: '#98C0F3',
                    borderColor: '#83B9FD',
                    shadowColor: "rgba(186,217,255, 0.5)", // 地图阴影颜色
                    shadowOffsetX: 8,
                    shadowOffsetY: 8,
                  },
                  emphasis: {
                    areaColor: "#2AB8FF",
                    borderWidth: 0,
                    color: "green",
                    label: {
                      show: false,
                    },
                  },
                },
              },
              series: [
                {
                  type: "map",
                  map: "china", //使用
                  selectedMode: "multiple", // 'multiple'
                  label: {
                    show: true,
                    color: "#333", // 文字颜色 默认
                  },
                  itemStyle: {
                    borderColor: "#83B9FD", // 省市区域边框色 默认
                    borderWidth: 1, // 省市区域边框宽度 默认
                    areaColor: "#ACCEF8", // 省市区域背景色 默认
                  },
                  emphasis: {
                    itemStyle: {
                      areaColor: "#ACCEF8",
                      borderColor: "#83B9FD", // 省市区域边框色 默认
                    },
                    label: {
                      color: "#333",
                    },
                  },
                  animation: false, // 鼠标移入动画
                  zoom: 1.2, // 地图比例
                  data: data,
                },
              ],
            },
          },
          {
            query: { maxWidth: 500 }, //屏幕区间
            option: {
              tooltip: {
                triggerOn: "click",
                formatter: (e, t, n) => {
                  // this.$router.push(e.data.link)
                  if (e.data.link !== undefined) {
                    window.open(e.data.link);
                  }
                },
              },
              geo: {
                map: "china",
                aspectScale: 0.75, //长宽比
                zoom: 1.25,
                scaleLimit: {
                  min: 1,
                  max: 3,
                },
                roam: false,
                itemStyle: {
                  normal: {
                    areaColor: {
                      type: "radial",
                      x: 0.5,
                      y: 0.5,
                      r: 0.8,
                      colorStops: [
                        {
                          offset: 0,
                          color: "#09132c", // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#274d68", // 100% 处的颜色
                        },
                      ],
                      globalCoord: true, // 缺省为 false
                    },
                    shadowColor: "#cccccc",
                    shadowOffsetX: 0,
                    shadowOffsetY: 5,
                  },
                  emphasis: {
                    areaColor: "#2AB8FF",
                    borderWidth: 0,
                    color: "green",
                    label: {
                      show: false,
                    },
                  },
                },
              },
              series: [
                {
                  type: "map",
                  map: "china", //使用
                  selectedMode: "multiple", // 'multiple'
                  label: {
                    show: true,
                    color: "#3c79ea", // 文字颜色 默认
                  },
                  itemStyle: {
                    borderColor: "#97b3e4", // 省市区域边框色 默认
                    borderWidth: 1, // 省市区域边框宽度 默认
                    areaColor: "#d8e4f9", // 省市区域背景色 默认
                  },
                  emphasis: {
                    itemStyle: {
                      areaColor: {
                        type: 'linear',
                        x: 0,
                        y: 1,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                          offset: 0, color: '#4E85E4' // 0% 处的颜色
                        }, {
                          offset: 1, color: '#000' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                      },
                    },
                    label: {
                      color: "#3c79ea",
                    },
                  },
                  animation: false, // 鼠标移入动画
                  zoom: 1.25, // 地图比例
                  data: data,
                },
              ],
            },
          },
        ],
      };
      chart.setOption(option);
    },
  },
};
const cityData = [
  {
    name: "北京",
    value: 0,
    select: {
      disabled: true,
    },
  },
  {
    name: "天津",
    value: 0,
    select: {
      disabled: true,
    },
  },
  {
    name: "上海",
    value: 0,
    select: {
      disabled: true,
    },
  },
  {
    name: "重庆",
    value: 0,
    select: {
      disabled: true,
    },
  },
  {
    name: "河北",
    value: 0,
    select: {
      disabled: true,
    },
  },
  {
    name: "河南",
    value: 0,
    select: {
      disabled: true,
    },
  },
  {
    name: "云南",
    value: 0,
    select: {
      disabled: true,
    },
  },
  {
    name: "辽宁",
    value: 0,
    select: {
      disabled: true,
    },
  },
  {
    name: "黑龙江",
    value: 0,
    select: {
      disabled: true,
    },
  },
  {
    name: "湖南",
    value: 0,
    select: {
      disabled: true,
    },
  },
  {
    name: "安徽",
    value: 0,
    select: {
      disabled: true,
    },
  },
  {
    name: "山东",
    value: 0,
    select: {
      disabled: true,
    },
  },
  {
    name: "新疆",
    value: 0,
    select: {
      disabled: true,
    },
  },
  {
    name: "江苏",
    value: 0,
    select: {
      disabled: true,
    },
  },
  {
    name: "浙江",
    value: 0,
    select: {
      disabled: true,
    },
  },
  {
    name: "江西",
    value: 0,
    select: {
      disabled: true,
    },
  },
  {
    name: "湖北",
    value: 0,
    select: {
      disabled: true,
    },
  },
  {
    name: "广西",
    value: 0,
    select: {
      disabled: true,
    },
  },
  {
    name: "甘肃",
    value: 0,
    select: {
      disabled: true,
    },
  },
  {
    name: "山西",
    value: 0,
    select: {
      disabled: true,
    },
  },
  {
    name: "内蒙古",
    value: 0,
    select: {
      disabled: true,
    },
  },
  {
    name: "陕西",
    value: 0,
    select: {
      disabled: true,
    },
  },
  {
    name: "吉林",
    value: 0,
    select: {
      disabled: true,
    },
  },
  {
    name: "福建",
    value: 0,
    select: {
      disabled: true,
    },
  },
  {
    name: "贵州",
    value: 0,
    select: {
      disabled: true,
    },
  },
  {
    name: "广东",
    value: 0,
    select: {
      disabled: true,
    },
  },
  {
    name: "青海",
    value: 0,
    select: {
      disabled: true,
    },
  },
  {
    name: "西藏",
    value: 0,
    select: {
      disabled: true,
    },
  },
  {
    name: "四川",
    value: 0,
    select: {
      disabled: true,
    },
  },
  {
    name: "宁夏",
    value: 0,
    select: {
      disabled: true,
    },
  },
  {
    name: "海南",
    value: 0,
    select: {
      disabled: true,
    },
  },
  {
    name: "台湾",
    value: 0,
    select: {
      disabled: true,
    },
  },
  {
    name: "香港",
    value: 0,
    select: {
      disabled: true,
    },
  },
  {
    name: "澳门",
    value: 0,
    select: {
      disabled: true,
    },
  },
  {
    name: "南海诸岛",
    value: 0,
    select: {
      disabled: true,
    },
  },
];
</script>

<style lang="less" scoped>
@media screen and (min-width: 1200px) {
  .china-map {
    width: 100%;
    height: 100%;
    margin-top: -26px;
  }
  .box {
    width: 100%;
    height: 800px;
    // border: 1px solid black;display: flex;
    // align-items: center;
    // justify-content: center;
  }
}
@media screen and (max-width: 768px) {
  .china-map {
    width: 100%;
    height: 100%;
  }
  .box {
    width: 100%;
    height: 100%;
    margin-bottom: 20px;
  }
}
/deep/ .echarts-tooltip {
  border: 0 none !important;
}
</style>
