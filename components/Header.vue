<template>
  <div>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="0" class="item-logo">
        <img src="../static/icon.png" alt="logo" class="logo">
      </el-menu-item>
      <el-menu-item index="1">目录管理</el-menu-item>
      <el-menu-item index="2">文件管理</el-menu-item>
      <!-- <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item> -->
    </el-menu>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
<style lang="less">
.el-header{
  padding: 0;
  .logo{
    height: 35px;
    margin-right: 100px;
  }
}

.el-menu{
  padding: 0 20px;
}
</style>
