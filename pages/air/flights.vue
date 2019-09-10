<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <div>
          <FlightsFilters :data="cacheFlightsData" @setDataList="setDataList" />
        </div>

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
        <FlightsAside />
      </div>
    </el-row>
  </section>
</template>

<script>
import moment from "moment";
import FlightsListHead from "@/components/air/flightsListHead.vue";
import FlightsItem from "@/components/air/flightsItem.vue";
import FlightsFilters from "@/components/air/flightsFilters.vue";
import FlightsAside from "@/components/air/flightsAside.vue";

export default {
  data() {
    return {
      dataList: [],
      flightsData: {
        flights: [],
        info: {},
        options: {}
      },
      cacheFlightsData: {
        info: {},
        options: {}
      },
      pageIndex: 1,
      pageSize: 5,
      total: 0
    };
  },
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters,
    FlightsAside
  },

  watch: {
    //watch可以监听this下的所有属性
    $route() {
      //请求航班列表数据
      this.getData();
    }
  },

  mounted() {
    //请求航班数据
    this.getData();
  },
  methods: {
    getData() {
      this.$axios({
        url: "airs",
        params: this.$route.query
      }).then(res => {
        //赋值给总数据
        this.flightsData = res.data;

        //赋值给缓存数据
        this.cacheFlightsData = { ...res.data };
        //分页的总条数
        this.total = this.flightsData.flights.length;

        //第一页的值
        this.dataList = this.flightsData.flights.slice(0, this.pageSize);
      });
    },

    setDataList(arr) {
      //修改总的航班列表
      this.flightsData.flights = arr;

      //重新回到第一页
      this.pageIndex = 1;

      // 按照数学公式切换dataList的值
      this.dataList = this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );

      //修改总条数
      this.total = arr.length;
    },
    //每页条数切换时触发
    handleSizeChange(val) {
      this.pageSize = val;
      this.dataList = this.flightsData.flights.slice(0, val);
    },
    //页码切换时触发
    handleCurrentChange(val) {
      this.pageIndex = val;

      //切换dataList的值
      this.dataList = this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
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