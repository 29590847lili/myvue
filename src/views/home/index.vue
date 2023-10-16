<template>
  <div>
    <div class="follow-up">
      <div>
        <img src="@/assets/follow-up-image.png" /><br />
        欢迎访问中国居民癌症防控行动管理平台
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style lang="less" scoped>
.follow-up {
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  margin: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  box-shadow: 0px 1px 10px 3px rgba(0, 0, 0, 0.06);
  border-radius: 6px;
  div {
    text-align: center;
    font-size: 32px;
    color: #3e3e3e;
    font-weight: bold;
    img {
      width: 576px;
      margin-bottom: 50px;
    }
  }
}
</style>
