<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div></div>

        <!-- 航班头部布局 -->
        <div>
          <FlightsListHead />
        </div>

        <!-- 航班信息 -->
        <div>
          <FlightsItem v-for="(item,index) in dataList" :key="index" :data="item" />

          <!-- 分页 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
import moment from "moment";
import FlightsListHead from "@/components/air/flightsListHead.vue";
import FlightsItem from "@/components/air/flightsItem.vue";

export default {
  data() {
    return {
      dataList:[],
      flightsData: {},
      pageIndex: 1,
      pageSize: 5,
      total: 0
    };
  },
  components: {
    FlightsListHead,
    FlightsItem
  },
  mounted() {
    this.$axios({
      url: "airs",
      params: this.$route.query
    }).then(res => {
      //赋值给总数据
      this.flightsData = res.data;
      console.log(res.data);
      //分页的总条数
      this.total = this.flightsData.flights.length;

      //第一页的值
      this.dataList = this.flightsData.flights.slice(0,this.pageSize)
    });
  },
  methods:{
    //每页条数切换时触发
    handleSizeChange(val){
      this.pageSize = val
      this.dataList = this.flightsData.flights.slice(0,val)
    },
    //页码切换时触发
    handleCurrentChange(val){
      this.pageIndex = val

      //切换dataList的值
      this.dataList = this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      )
    }
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>