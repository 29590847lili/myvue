<template>
  <div>
    <div class="box">
      <div class="content" :class="item.value == active ? 'active' : ''" v-for="item in list" :key="item.value">
        <div class="box-circle">
          <div class="circle"><span>{{item.value}}</span></div>
        </div>
        <div class="text">{{item.label}}</div>
      </div>
    </div>
    <!-- <div class="tab">
      <div class="tab-item" :class="item.value == active ? 'active' : ''" v-for="item in list" :key="item.value">
        <div class="quan">
          <span>{{item.value}}</span>
        </div>
        {{item.label}}
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  props: {
    active: {
      default: 3
    }
  },
  data () {
    return {
      list: [
        { value: '1', label: '身份验证' },
        { value: '2', label: '授权协议' },
        { value: '3', label: '完善信息' },
        { value: '4', label: '开始测评' }
      ]
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.box {
  width: 400px;
  height: 128px;
  background: linear-gradient(90deg, #1e72d8 0%, #1055aa 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  .content {
    flex: 1;
    position: relative;
    &::after {
      display: block;
      content: "";
      width: 40px;
      height: 2px;
      background: #5d92d3;
      border-radius: 1px;
      background: #fff;
      position: absolute;
      right: -19px;
      top: 18px;
      opacity: 0.6;
      transform: translate(0, -50%);
    }
    &:last-child::after {
      display: none;
    }
    .box-circle {
      display: flex;
      align-items: center;
      height: 32px;
    }
    .circle {
      z-index: 1;
      text-align: center;
      line-height: 25px;
      color: #01468b;
      width: 24px;
      height: 24px;
      background: #3d7fd0;
      border-radius: 16px;
      position: relative;
      margin: 0 auto;
    }
    .text {
      margin-top: 10px;
      color: #fff;
      font-size: 12px;
      font-weight: bold;
      opacity: 0.6;
      text-align: center;
    }
  }
  .content.active .circle {
    width: 32px;
    height: 32px;
    span {
      background: #fff;
      display: block;
      height: 24px;
      width: 24px;
      border-radius: 12px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .content.active .text {
    opacity: 1;
  }
}
.tab {
  display: flex;
  height: 130px;
  background: #f60;
  align-items: center;
  justify-content: center;
  .tab-item {
    flex: 1;
    text-align: center;
    position: relative;
    &::after {
      display: block;
      content: "";
      width: 20px;
      height: 1px;
      background: #fff;
      position: absolute;
      right: -10px;
      top: 50%;
      transform: translate(0, -50%);
    }
    &:last-child::after {
      display: none;
    }
    &.active {
      color: #fff;
    }
    .quan {
      width: 28px;
      height: 28px;
      border-radius: 28px;
      background: #73a0d7;
      position: relative;
      margin: 0 auto;
      &::before {
        display: block;
        width: 20px;
        height: 20px;
        border-radius: 20px;
        background: #fff;
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      span {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}
</style>
