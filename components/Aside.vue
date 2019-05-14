<template>
<div>
  <el-row class="tac">
    <el-col :span="24">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#f7f7f7"
        text-color="#909399"
        active-text-color="#ffd04b">
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span slot="title">导航一</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-menu"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-menu"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-menu"></i>
          <span slot="title">导航五</span>
        </el-menu-item>
        <el-menu-item index="6">
          <i class="el-icon-menu"></i>
          <span slot="title">导航六</span>
        </el-menu-item>
        <el-menu-item index="7">
          <i class="el-icon-menu"></i>
          <span slot="title">导航七</span>
        </el-menu-item>
        <el-menu-item index="8">
          <i class="el-icon-menu"></i>
          <span slot="title">导航八</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</div>
</template>
<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
<style lang="less" scoped>
.el-menu-vertical-demo{
  min-height:100vh;
}
</style>
