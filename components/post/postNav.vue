<template>
  <!-- <el-col class="cityList" v-for="(item,index) in cityList.type" :key="index">
        <span class="city">{{ cityList[index].type }}</span>
        <span class="arrow">＞</span>
  </el-col>-->
  <el-row>
    <el-col>
      <div class="cityList" v-for="(item,index) in cityList" :key="index">
        <span class="city">{{ cityList[index].type }}</span>
        <span class="arrow">＞</span>
      </div>
      <el-col>
        <ul>
          <li>
            <span class="number">1</span>
            <span class="city">北京</span>
            <span class="desc">111</span>
          </li>
        </ul>
      </el-col>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      cityList: [],
      cityChildren:[]
    };
  },
  mounted() {
    this.$axios({
      url: "/posts/cities"
    }).then(res => {
      console.log(res);
      this.cityList = res.data.data;
      console.log(this.cityList);
    });
  }
};
</script>

<style lang="less" scoped>
.cityList {
  position: relative;
  display: flex;
  justify-content: space-between;
  height: 41px;
  line-height: 41px;
  padding-left: 20px;
  padding-right: 10px;
  border: 1px #ddd solid;
  border-bottom: 1px #fff solid;
  position: relative;
  color: #666;
  z-index: 11;
  &:hover {
    color: #409eff;
    border-right-color: #fff;
  }
  .city {
    font-size: 14px;
  }
  .arrow {
    font-size: 20px;
    font-weight: 600;
  }
}
.cities {
  height: 41px;
  line-height: 41px;
  width: 350px;
  z-index: 5;
  position: absolute;
  left: 260px;
  top: 0px;
  background-color: #fff;
  border: 1px #ddd solid;
  font-size: 14px;
  color: #999;

  .number {
    padding-left: 20px;
    font-size: 25px;
    font-weight: 600;
    color: #409eff;
  }
  .city {
    padding-left: 10px;
    padding-right: 10px;
    color: #409eff;
  }
}
</style>