<template>
  <div class="p-t-20">
    <div class="table-bg">
      <div class="title-box">
        <div class="text">角色名称：系统管理员</div>
        <div class="btns">
          <el-button @click="$router.go(-1)">取 消</el-button>
          <el-button class="m-l-20" type="primary">保存</el-button>
        </div>
      </div>
      <el-tree :data="data" class="my-tree" show-checkbox node-key="id" :props="defaultProps" default-expand-all></el-tree>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  created () {
    this.data = this.$store.state.menus
  }
}
</script>

<style lang="less" scoped>
.table-bg{min-height:88vh;padding:20px;
  .title-box{margin-bottom:20px;display:flex;justify-content:space-between;align-items:center;
    .text{font-size:14px;color:#206DDE;font-weight:bold;}
  }
}
/deep/ .my-tree{
  &>.el-tree-node{border-bottom:1px dashed #ddd;}
  .el-tree-node{padding:3px 0;}
}
</style>
