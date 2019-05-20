<template>
  <div class="content">
    <div class="search-box">
      <el-input placeholder="请输入内容" v-model="input1">
        <template slot="prepend">目录名称</template>
          <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
      <el-table-column
        type="index"
        width="50">
    </el-table-column>
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称">
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
      </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 20px">
      <el-button @click="toggleSelection([tableData[1], tableData[2]])">新增</el-button>
      <el-button @click="toggleSelection()">删除</el-button>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        input1:"",
        tableData: [{
          name: '目录1',
        }, {
          name: '目录2',
        }, {
          name: '目录3',
        }, {
          name: '目录4',
        }],
        multipleSelection: []
      }
    },
    created(){
      console.log(this.$nuxt.$route.path)
    },
    methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
  }
</script>
<style lang="less" scoped>
.content{
  padding: 20px;
  .search-box{
    margin-bottom: 20px;
  }
}
</style>
