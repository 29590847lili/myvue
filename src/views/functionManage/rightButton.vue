<template>
  <div>
    <el-tree class="tree" v-if="treeData.orgTree.length" :data="treeData.orgTree" @node-click="getOrganizationGet" @node-contextmenu="contextmenu" :props="defaultProps" :default-expanded-keys="defaultExpandedKeys" :expand-on-click-node="false" ref="tree" node-key="id" :default-expand-all="defaultExpandAll">
      <span class="custom-tree-node" slot-scope="{ node, data }" style="flex: 1;display: flex;align-items: center;">
        <span slot="reference" style="flex: 1 1 0%;" :class="orgInfo.orgName == node.label ? 'orgName' : ''">{{ node.label }}</span>
        <span v-if="data.editStatus === 0" style="padding-right: 10px;">
          <el-tooltip class="item" effect="dark" content="机构处于未编辑状态" placement="top">
            <img src="../../assets/icon-time.png" width="18" height="18" />
          </el-tooltip>
        </span>
      </span>
    </el-tree>
    <div v-else class="no-data">暂无数据</div>
    <ul id="menu" class="treeMenu" v-show="menuVisible">
      <li class="item">添加下级机构</li>
      <!-- <li class="item">解绑</li> -->
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    clickTree: {
      default: () => { }
    }
  },
  data () {
    return {
      orgInfo: {}, // 当前机构
      menuVisible: false,
      selectItem: null, // 右键选中的对象
      treeData: {
        orgTree: [{
          id: 0,
          orgName: '国家癌症中心',
          auditStatus: null,
          editStatus: null,
          status: 1,
          propertys: [1],
          children: [
            { id: 35, orgName: '重庆自费筛查机构—演示', auditStatus: 2, editStatus: 1, status: 1, propertys: [1, 3] }
          ]
        }]
      },
      defaultExpandedKeys: [], // 默认展开树
      defaultProps: { // 自定义树展示字段
        children: 'children',
        label: 'orgName'
      },
      defaultExpandAll: false // 默认不全打开 只有创建之后在全部打开
    }
  },
  methods: {
    // 获取机构详情
    async getOrganizationGet (orgInfo) {
      this.orgInfo = orgInfo
      this.$parent.clickTree(orgInfo)
      this.menuVisible = false
    },
    // 右键点击树
    contextmenu (event, object) {
      this.menuVisible = false
      this.menuVisible = true
      this.selectItem = object
      const menu = document.querySelector('#menu')
      menu.style.left = `${event.clientX}px`
      menu.style.top = `${event.clientY}px`
      document.addEventListener('click', this.foo)
    },
    // 取消鼠标监听事件
    foo () {
      this.menuVisible = false
      this.selectItem = null
      document.removeEventListener('click', this.foo)
    }
  }
}
</script>

<style lang="less" scoped>
.tree {
  max-height: 600px;
  overflow-y: auto;
}
.num {
  padding: 0 10px;
  font-size: 12px;
  color: #999;
  margin-bottom: 10px;
}
.treeMenu {
  position: fixed;
  width: 120px;
  height: 34px;
  background: #fff;
  border-radius: 6px;
  z-index: 9;
  box-shadow: 1px 1px 8px rgba(0, 0, 0, 0.5);
  .item {
    height: 34px;
    text-align: center;
    line-height: 34px;
    &:first-child {
      border-bottom: 1px solid #efefef;
    }
    &:hover {
      background: #0a9f96;
      color: #fff;
      cursor: pointer;
    }
  }
}
.no-data {
  color: #909399;
  font-size: 14px;
  text-align: center;
  margin-top: 15px;
}
.orgName {
  color: #0a9f96;
}
</style>
