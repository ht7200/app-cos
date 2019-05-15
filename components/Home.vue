<template>
  <div>
    <el-row class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>导航一</el-breadcrumb-item>
      <el-breadcrumb-item>{{itemName}}</el-breadcrumb-item>
    </el-breadcrumb>
    </el-row>
    <el-row>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <Tree></Tree>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="grid-content bg-purple">
          <Table></Table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Tree from './Tree'
import Table from './Table'
export default {
  components:{
    Tree , Table
  },
  data() {
    return {
      path: this.$nuxt.$route.path,
      itemName: this.$nuxt.$route.path == '/' ? '文件管理':'目录管理'
    }
  }
}
</script>

<style lang="less" scoped>
  a{
    text-decoration: none;
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content{
    margin: 5px;
    border-radius: 5px;
  }
  .bg-purple {
    background: #f7f7f7;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .breadcrumb{
    margin-top: 20px;
    margin-bottom: 40px;
  }
</style>