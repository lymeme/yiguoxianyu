<template>
  <div class="hotelInfo">
    <el-row class="info">
      <el-col :span="4">基本信息</el-col>
      <el-col :span="20" class="xiangqing">
        <el-col :span="8">入住时间: 14:00之后</el-col>
        <el-col :span="8">离店时间: 12:00之前</el-col>
        <el-col :span="8">{{data.creation_time}} / {{data.renovat_time}}</el-col>
      </el-col>
    </el-row>

    <el-row class="facilities">
      <el-col :span="4">主要设施</el-col>
      <el-col :span="20" class="xiangqing">
        <span v-if="data.hotelassets = []">-</span>
        <el-tag color="#eee" size="medium" 
        v-for="(item,index) in data.hotelassets" :key="index"
        >{{item.name}}</el-tag>
      </el-col>
    </el-row>

    <el-row class="car">
      <el-col :span="4">停车服务</el-col>
      <el-col :span="20" class="xiangqing" >
        <span v-if="!data.parking">-</span>
        {{data.parking}}</el-col>
    </el-row>

    <el-row class="brand">
      <el-col :span="4">品牌信息</el-col>
      <el-col :span="20" class="xiangqing" v-if="data.hotelbrand">
        <span v-if="!data.hotelbrand">-</span>
        {{data.hotelbrand.name}}</el-col>
    </el-row>

    <h4>0条真实用户评论</h4>
    <div class="score">
      <el-row>
        <el-col :span="4" class="number">
          <p>总评数：{{data.all_remarks}}</p>
          <p>好评数：{{data.very_good_remarks}}</p>
          <p>差评数：{{data.very_bad_remarks}}</p>
        </el-col>
        <el-col :span="5" style="margin-top:10px">
          <el-rate
            v-model="data.stars"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          ></el-rate>
        </el-col>
        <el-col :span="3" class="moveDown left">环境</el-col>
        <el-col :span="3" class="moveDown">产品</el-col>
        <el-col :span="3" class="moveDown">服务</el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
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
.hotelInfo {
  color: #000;
  font-size: 14px;

  .info {
    padding: 20px 10px;
    border-bottom: 1px solid rgb(230, 226, 226);

    .xiangqing {
      color: #666;
    }
  }

  .facilities {
    padding: 20px 10px;
    border-bottom: 1px solid rgb(230, 226, 226);
  }

  .car {
    padding: 20px 10px;
    border-bottom: 1px solid rgb(230, 226, 226);
  }

  .brand {
    padding: 20px 10px;
    border-bottom: 1px solid rgb(230, 226, 226);
    margin-bottom: 40px;
  }

  h4 {
    font-size: 16px;
  }

  .score {
    font-size: 16px;
    color: rgb(255, 153, 0);
    padding: 20px 0;

    i {
      font-size: 22px;
      margin: 0;
      width: 18px;
      height: 18px;
    }

    span {
      font-size: 14px;
    }
    .number {
      color: #666;
    }
    .left {
      margin-left: 40px;
    }
    .moveDown {
      margin-top: 20px;
    }
  }
}
</style>