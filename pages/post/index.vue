<template>
  <div class="post-container">
    <el-row>
      <!-- 左边导航栏 -->
      <el-col :span="7">
        <div class="left-nav">
          <PostNav />

          <p>推荐城市</p>
          <a href="#">
            <img src="@/assets/sea.jpg" alt />
          </a>
        </div>
      </el-col>
      <!-- 右边内容 -->
      <el-col :span="17">
        <div class="right-content">
         <PostItem />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PostNav from "@/components/post/postNav.vue"
import PostItem from "@/components/post/postItem.vue"
export default {
  data() {
    return {
    };
  },
  components:{
    PostNav,
    PostItem
  },
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
      font-size: 20px;
      border-bottom: 1px #ddd solid;
    }
    img {
      padding-top: 10px;
      width: 260px;
    }
  }

  .right-content {
    padding-left: 10px;
  }
}
</style>