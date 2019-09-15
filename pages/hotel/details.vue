<template>
  <div class="details">
    <!-- 面包屑 -->
    <el-row class="top">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/hotel' }">{{infoData.big_cate}}</el-breadcrumb-item>
        <el-breadcrumb-item>南京酒店</el-breadcrumb-item>
        <el-breadcrumb-item>{{infoData.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>

    <!-- 酒店名称 -->
    <el-row class="hotelName">
      <span class="hname">{{infoData.name}}</span>
      <span>
        <el-rate v-if="infoData.hotellevel" v-model="infoData.hotellevel.level" disabled text-color="#ff9900" disabled-void-color="#fff" ></el-rate>
      </span> 
      <p>{{infoData.alias}}</p>
      <div>
        <i class="iconfont iconlocation"></i>
        <span>{{infoData.address}}</span>
      </div>
    </el-row>

    <!-- 酒店图片、 -->
    <el-row :gutter="10" class="allimg">
      <el-col :span="16">
        <div class="big">
          <img src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt />
        </div>
      </el-col>
      <el-col :span="8">
        <div class="small">
          <el-row :gutter="10">
            <img src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt />
            <img src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt />
            <img src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt />
            <img src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt />
            <img src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt />
            <img src="http://157.122.54.189:9093/images/hotel-pics/1.jpeg" alt />
          </el-row>
        </div>
      </el-col>
    </el-row>

    <!-- 价格 -->
    <div class="price">
      <hotelPrice :data="infoData" />
    </div>

    <!-- 地图 -->
    <div class="map">
      <hotelMap :data="infoData"/>
    </div>

    <!-- 基本信息 -->
    <div class="info">
      <hotelInfo :data="infoData" />
    </div>
  </div>
</template>

<script>
import hotelPrice from "@/components/hotel/hotelPrice";
import hotelMap from "@/components/hotel/hotelMap";
import hotelInfo from "@/components/hotel/hotelInfo";

export default {
  data() {
    return {
      infoData: {},
      value: 3
    };
  },
  components: {
    hotelPrice,
    hotelMap,
    hotelInfo
  },
  mounted() {
    const id = this.$route.query.id;
    this.$axios({
      url: "/hotels",
      params: {
        id
      }
    }).then(res => {
      this.infoData = res.data.data[0];
      // console.log(this.infoData)
    });
  }
};
</script>

<style lang="less" scoped>
.details {
  width: 1000px;
  margin: 0 auto;

  .top {
    padding: 20px 0px;
  }

  .hotelName {
    color: #666;
    font-size: 14px;
    .hname {
      font-size: 24px;
      color: #333;
    }
  }

  .allimg {
    margin: 40px 0;

    .big {
      width: 640px;
      height: 360px;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .small {
      :nth-child(odd) {
        margin-right: 10px;
      }
      img {
        width: 160px;
        height: 110px;
        margin-bottom: 10px;
      }
    }
  }
}
</style>