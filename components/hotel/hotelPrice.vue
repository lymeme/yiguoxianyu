<template>
  <div class="hotelPrice">
    <el-row class="title">
      <el-col :span="10" class="app_name">价格来源</el-col>
      <el-col :span="10" class="app_name">低价房型</el-col>
      <el-col :span="4" class="app_name">最低价格/每晚</el-col>
    </el-row>
      <el-row
        type="flex"
        justify="space-around"
        class="border_hl"
        v-for="(item, index) in data.products"
        :key="index"
      >
        <el-col :span="10" >{{item.name}}</el-col>
        <el-col :span="10" >{{item.bestType}}</el-col>
        <el-col :span="4">
          <span>￥{{item.price}}</span>&nbsp; 起
          <i class="el-icon-arrow-right"></i>
        </el-col>
      </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        { priceCome: "携程", roomType: "高级大床房A", floorPrice: "￥93元起>" }
      ]
    };
  },
  props: {
    // 数据
    data: {
      type: Object,
      // 默认是空数组
      default: () => ({})
    }
  }
};
</script>

<style lang="less" scoped>
  .hotelPrice{
    font-size: 14px;
    color: #606266;
    .title{
      padding: 12px 0;
      color: #909399;
      font-weight: 600;
      border-bottom: 1px solid #ebeef5
    }

    .border_hl{
      padding: 12px 0;
      border-bottom: 1px solid #ebeef5;
      cursor: pointer;
      &:hover{
        background-color: #eee;
      }
      span {
        font-size: 16px;
        color: #f90;
      }
    }
  }
</style>