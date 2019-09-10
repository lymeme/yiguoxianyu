<template>
  <div class="post-container">
    <el-row>
      <!-- 左边导航栏 -->
      <el-col :span="7">
        <div class="left-nav">
          <div class="citylist">
            <span class="city">热门城市</span>
            <span class="arrow">＞</span>
          </div>

          <p>推荐城市</p>
          <a href="#">
            <img src="@/assets/sea.jpg" alt />
          </a>
        </div>
      </el-col>
      <!-- 右边内容 -->
      <el-col :span="17">
        <div class="right-content">
          aaaaa
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataList: []
    };
  },
  mounted() {
    this.$axios({
      url: "/posts/cities"
    }).then(res => {
      console.log(res);
      const dataList = res.data.data;
      console.log(dataList);
    });
  }
};
</script>

<style lang="less" scoped>
.post-container {
  width: 1000px;
  margin: 0 auto;
  padding-top: 20px;
  .left-nav {
    width: 260px;
    p {
      padding: 10px 0;
      border-bottom: 1px #ddd solid;
    }
    img {
      padding-top: 10px;
      width: 260px;
    }
    .citylist {
      display: flex;
      justify-content: space-between;
      height: 41px;
      line-height: 41px;
      padding-left: 20px;
      padding-right: 10px;
      border: 1px #ddd solid;
      position: relative;
      z-index: 2;
      &:hover {
        color: orange;
        border-right-color: #fff
      }
      .city {
        font-size: 14px;
      }
      .arrow {
        font-size: 25px;
      }
    }
  }

  .right-content {
    padding-left: 10px;
  }
}
</style>