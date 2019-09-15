<template>
  <div class="container1">
    <el-container>
      <el-main>
        <div class="main">
          <div class="post-title">
            <!-- 面包屑 -->
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/post' }">旅游攻略</el-breadcrumb-item>
              <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
            </el-breadcrumb>
          </div>

          <!-- 大标题 -->
          <h1 v-if="details">{{details.title}}</h1>

          <div class="post-info">
            <span>攻略：{{details.created_at | formatDate}}</span>
            <span>阅读：{{details.watch}}</span>
          </div>

          <!-- 主体内容 -->
          <div class="post-content" v-html="details.content"></div>

          <!-- 图标部分 -->
          <div class="post-ctrl">
            <el-row type="flex" justify="center">
              <div class="ctrl-item">
                <i class="iconfont iconpinglun" />
                <p v-if="details.comments">评论({{details.comments.length}})</p>
              </div>
              <div class="ctrl-item">
                <i class="iconfont iconstar1" />
                <p>收藏</p>
              </div>
              <div class="ctrl-item">
                <i class="iconfont iconfenxiang" />
                <p>分享</p>
              </div>
              <div class="ctrl-item" @click="dianzan(id)">
                <i class="iconfont iconding" />
                <p>点赞({{details.like}})</p>
              </div>
            </el-row>
          </div>

          <!-- 评论部分 -->
          <Comments />

        </div>
      </el-main>
      <el-aside width="280px" style="margin-left: 20px">
        <h4 class="aside-title">相关攻略</h4>
        <div class="recommend-list" v-for="(item,index) in recommend" :key="index">
          <a href class="recommend-item" @click="handleChoose(item.id)">
            <el-row type="flex">
              <el-col :span="10">
                <div class="post-img">
                  <img :src="item.images[0]" alt />
                </div>
              </el-col>
              <el-col :span="14">
                <div class="post-text">
                  <div>{{item.title}}</div>
                  <p>{{item.created_at | formatDate}} 阅读 {{item.watch}}</p>
                </div>
              </el-col>
            </el-row>
          </a>
        </div>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
import Comments from '@/components/post/comments.vue'

export default {
  components: {
    Comments
  },
  data() {
    return {
      details: [],
      recommend: []
    };
  },
  methods: {
    // 跳转到相关攻略页
    handleChoose(id) {
      this.$router.push({
        path: "/post/detail?id=" + id
      });
    },

    //点击点赞
    dianzan(id) {
      //请求点赞文章
      this.$axios({
        url: "/posts/like",
        params: this.$route.query,
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        }
      }).then(res => {
        // console.log(this.res);
        this.$message({
          message: "点赞成功",
          type: "success"
        });
        this.init()
      });
    },

    //获取文章详情
    init() {
      const { id } = this.$route.query;
      //请求文章详情
      this.$axios({
        url: "/posts/",
        params: this.$route.query
      }).then(res => {
        // const { data } = res.data.data
        this.details = res.data.data[0];
        // console.log(this.details);
        if (this.details.like === null) {
          this.details.like = 0;
        }
      });
    }
  },
  mounted() {
    //获取文章详情
    this.init();

    //推荐文章
    this.$axios({
      url: "/posts/recommend",
      params: this.$route.query
    }).then(res => {
      this.recommend = res.data.data;
      // console.log(this.recommend);
    });
  },
  filters: {
    formatDate: function(value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      // return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
      return y + "-" + MM + "-" + d + " " + h + ":" + m;
    }
  }
};
</script>

<style lang="less">
.container1 {
  width: 1000px;
  margin: 0 auto;
  padding-top: 20px;
}
.el-main {
  padding: 0;
}
.main {
  width: 700px;
  .post-title {
    font-size: 20px;
    font-weight: normal;
    color: orange;
    span {
      font-size: 14px;
    }
  }
  h1 {
    padding: 20px 0;
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: 2em;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
    margin: 0;
  }
  .post-info {
    color: #999;
    padding: 20px;
    text-align: right;
    span {
      margin-left: 20px;
    }
  }
  .post-content {
    max-width: 700px !important;
    line-height: 1.5;
    p {
      display: block;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      margin: 0;
    }
    p:nth-child(7) {
      img {
        width: 56px;
        height: 56px;
      }
    }
    img {
      margin: 10px 0;
      width: 100%;
    }
    img:nth-child(2) {
      width: 56px;
      height: 56px;
    }
    h2 {
      display: block;
      font-size: 1.5em;
      margin-block-start: 0.83em;
      margin-block-end: 0.83em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      font-weight: bold;
      margin: 0;
    }
    h3 {
      display: block;
      font-size: 1.17em;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0px;
      margin-inline-end: 0px;
      font-weight: bold;
      margin: 0;
    }
  }
  .post-ctrl {
    padding: 50px 0 30px;
    display: block;
    .ctrl-item {
      margin: 0 20px;
      font-size: 20px;
      text-align: center;
      cursor: pointer;
      i {
        font-size: 28px;
        color: orange;
      }
      p {
        margin: 5px 0 0;
        font-size: 14px;
        color: #999;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
      }
    }
  }
}
.el-aside {
  div {
    display: block;
  }
  .aside-title {
    font-weight: 400;
    font-size: 18px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
  }
  .recommend-item {
    display: block;
    padding: 20px 0;
    border-bottom: 1px solid #ddd;
    height: 80px;
    .post-img {
      width: 100px;
      height: 80px;
      flex-shrink: 0;
      background: #ddd;
      overflow: hidden;
      margin-right: 10px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .post-text {
      flex: 1;
      position: relative;
      div {
        // position: relative;
        line-height: 1.4em;
        height: 2.8em;
        overflow: hidden;
        // position: absolute;
        // left: 0;
        // top: 0;
        width: 100%;
      }
      p {
        // position: absolute;
        padding-top: 22px;
        // bottom: 0;
        // left: 0;
        font-size: 12px;
        color: #999;
      }
    }
  }
}
</style>>
