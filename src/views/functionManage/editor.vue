<template>
  <div>
    <WangEditor v-model="wangeditor" />
  </div>

</template>

<script>
import WangEditor from '@/components/wangEditor'
export default {
  data () {
    return {
      wangeditor: '<p>附近时空裂缝京东数科丽枫酒店开始了返京的看来是返京的看来是返京的看来是ABCDEFGHIJKLMNOPQRSTUVWXWZ</p>'
    }
  },
  components: {
    WangEditor
  }
}
</script>

<style lang="less" scoped>
</style>
