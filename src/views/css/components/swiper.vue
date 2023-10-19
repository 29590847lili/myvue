<template>
  <div class="carousel-box">
    <div class="arrow-btn arrow-left">
      <i class="el-icon-arrow-left"></i>
    </div>
    <div class="arrow-btn arrow-right">
      <i class="el-icon-arrow-right"></i>
    </div>
    <el-carousel :interval="3000" height="480px" indicator-position="outside" arrow="always">
      <el-carousel-item class="catalog-info-list" v-for="(item, index) in swiperInfo" :key="index">
        <li class="catalog-item" v-for="(sItem, key) in item" :key="key">
          <div class="org-logo">

            <!-- <img v-if="sItem.img" :src="sItem.img" :alt="sItem.title">
            <img v-else src="@/assets/no-img@2x.png" alt="logo" />-->
          </div>
          <div class="org-info">
            <p class="org-tit">{{ sItem.title }}</p>
            <p class="org-desc">{{ sItem.id }}</p>
            <span class="link">访问</span>
          </div>
        </li>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  data () {
    return {
      swiperInfo: []
    }
  },
  props: {
    listInfo: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    listInfo: {
      handler (value) {
        for (let i = 0; i < value.length; i += 3) {
          this.swiperInfo.push(value.slice(i, i + 3))
        }
        console.log(this.swiperInfo)
      },
      deep: true
    }
  },
  mounted () {
    $(() => {
      $('.arrow-left').on('click', () => {
        $('.el-carousel__arrow.el-carousel__arrow--left').click()
      })
      $('.arrow-right').on('click', () => {
        $('.el-carousel__arrow.el-carousel__arrow--right').click()
      })
    })
  },
  methods: {
  }
}
</script>
<style lang="less" scoped>
.carousel-box {
  position: relative;
  margin-top: -30px;
  .arrow-btn {
    position: absolute;
    top: 50%;
    margin-top: -24px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border: 1px solid transparent;
    cursor: pointer;
    &:hover {
      border: 1px solid #e0e0e0;
    }
    .el-icon-arrow-left,
    .el-icon-arrow-right {
      font-size: 24px;
      font-weight: bold;
    }
  }
  .arrow-left {
    left: -98px;
  }
  .arrow-right {
    right: -98px;
  }
}
/deep/ .el-carousel__arrow.el-carousel__arrow--left {
  opacity: 0 !important;
}
/deep/ .el-carousel__arrow.el-carousel__arrow--right {
  opacity: 0 !important;
}
/deep/
  .el-carousel__indicators.el-carousel__indicators--horizontal.el-carousel__indicators--outside {
  padding-top: 20px;
  li {
    margin-right: 16px;
    .el-carousel__button {
      width: 10px;
      height: 10px;
      border-radius: 10px;
      background: #d8d8d8;
      opacity: 1;
    }
    &.is-active {
      .el-carousel__button {
        background: #182a87;
      }
    }
  }
}
.catalog-info-list {
  display: flex;
  align-items: center;
  .catalog-item {
    border: 1px solid #eceded;
    box-sizing: border-box;
    border-radius: 4px;
    width: 380px;
    margin-right: 30px;
    &:last-child {
      margin-right: 0;
    }
    &:hover {
      transform: translate(0, -10px);
      transition: 0.3s all;
      box-shadow: 0px 6px 14px 0px rgba(27, 34, 71, 0.06);
      .org-info {
        transition: 1s all;
        .org-tit {
          color: #182a87;
        }
      }
    }
    .org-logo {
      width: 378px;
      height: 200px;
      background: #f1f4f7;
      border-radius: 2px 2px 0 0;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      position: relative;
      img {
        width: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .org-info {
      height: 234px;
      position: relative;
      .org-tit {
        margin: 20px;
        font-size: 20px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: #333333;
        line-height: 28px;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2; /* 这里是超出几行省略 */
        overflow: hidden;
      }
      .org-desc {
        width: 380px;
        height: 102px;
        font-size: 14px;
        padding: 0 20px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
        line-height: 24px;
      }
      .link {
        position: absolute;
        right: 36px;
        bottom: 16px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #182a87;
        line-height: 20px;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
        &::after {
          position: absolute;
          right: -25px;
          bottom: -4px;
          content: "";
          border-top: 8px solid transparent;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-bottom: 8px solid #182a87;
          transform-origin: 50% 50%;
          transform: rotateZ(135deg);
        }
      }
    }
  }
}
// 轮播图切换持续时长改为1s
/deep/ .el-carousel__item.is-animating {
  transition: 1s all;
}
</style>
