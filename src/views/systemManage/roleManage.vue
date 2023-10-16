<template>
  <div class="p-t-20">
    <!-- 搜索 -->
    <div class="search-bg">
        <!-- 所属机构 -->
        <YcSearchInput v-model="search.condition.userType" title="角色状态" />
        <div class="search-submit">
          <el-button type="primary" class="m-r-10">搜索</el-button>
        </div>
    </div>
    <!-- 列表 -->
    <div class="table-bg">
      <div class="table-option">
        <div class="left"></div>
        <div class="right">
            <el-button type="primary" @click="$router.push('/systemManage/addEditRole')">新建角色</el-button>
        </div>
      </div>
      <el-table :data="tableData">
        <el-table-column prop="updatedTime" label="角色ID" min-width="120" />
        <el-table-column prop="updatedTime" label="角色名称" min-width="100" />
        <el-table-column prop="updatedTime" label="角色备注" min-width="120" />
        <el-table-column prop="updatedTime" label="创建时间" min-width="100" />
        <el-table-column prop="updatedTime" label="最后一次更新时间" min-width="180" />
        <el-table-column prop="updatedTime" label="角色状态" min-width="100">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.userType" @change="changeUserType(scope.row)" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="操作" min-width="140" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="$router.push('/systemManage/addEditRole?id=1')">编辑</el-button>
            <el-button type="text" @click="$router.push('/systemManage/permissionSetting?id=1')">权限</el-button>
            <el-button type="text">删除{{scope.row.id}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 翻页 -->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="search.page.current"
        :page-sizes="$store.state.pageSizes"
        :page-size="search.page.size"
        :layout="$store.state.layout"
        :total="tableTotal">
      </el-pagination>
    </div>
  </div>
</template>

<script>
const condition = {
  userName: '', // 用户名
  userType: '' // 用户状态
}
export default {
  data () {
    return {
      search: {
        condition: { ...condition },
        page: {
          current: 1,
          size: 10
        }
      },
      tableTotal: 0,
      tableData: [{
        userType: 1
      }]
    }
  },
  created () {},
  methods: {
    // 获取列表数据
    async getTableList () {
    },
    // 用户起禁用
    changeUserType (scope) {
      console.log(scope)
    },
    // 分页
    handleSizeChange (val) {
      this.search.page.current = 1
      this.search.page.size = val
      this.getTableList()
    },
    handleCurrentChange (val) {
      this.search.page.current = val
      this.getTableList()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
