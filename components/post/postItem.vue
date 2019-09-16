<template>
  <el-row>
    <!-- 搜索框 -->
    <el-col>
      <div class="search">
        <input
          type="text"
          placeholder="请输入想去的地方，如：广州"
          v-model="searchCityName"
          @keydown.enter="searchCity"
        />
        <i class="el-icon-search" @click="searchCity"></i>
        <span>推荐：</span>
        <nuxt-link to="/post?city=广州">
          <span class="gz">广州</span>
        </nuxt-link>
        <nuxt-link to="/post?city=北京">
          <span class="bj">北京</span>
        </nuxt-link>
        <nuxt-link to="/post?city=上海">
          <span class="sh">上海</span>
        </nuxt-link>
      </div>
    </el-col>
    <!-- 按钮 -->
    <el-col>
      <div class="button">
        <span>推荐攻略</span>
        <el-button type="primary" class="edit" @click.native="$router.push('/post/create')">
          <i class="el-icon-edit"></i>&nbsp; 写游记
        </el-button>
      </div>
    </el-col>

    <!-- 文章展示 -->
    <el-col v-for="(item,index) in postsData" :key="index">
        <!-- 标题 -->
      <div class="article">
        <nuxt-link :to="`/post/detail?id=${item.id}`">
          <span class="title">{{item.title}}</span>
        </nuxt-link>
        <!-- 摘要 -->
        <nuxt-link :to="`/post/detail?id=${item.id}`">
          <p>{{item.summary}}</p>
        </nuxt-link>
        <!-- 图片 -->
        <nuxt-link
          :to="`/post/detail?id=${item.id}`"
          v-for="(item1,index) in item.images"
          :key="index"
        >
          <img :src="item1" alt />
        </nuxt-link>
        <!-- 信息 -->
        <div class="little-word">
          <i class="el-icon-location-outline"></i>
          <span>{{item.cityName}}&nbsp;&nbsp;by</span>&nbsp;&nbsp;
          <nuxt-link to>
            <img :src="`${$axios.defaults.baseURL}`+item.account.defaultAvatar" alt />
            <span class="username">{{item.account.nickname}}</span>&nbsp;&nbsp;
          </nuxt-link>
          <i class="el-icon-view"></i>
          <span>{{item.watch}}</span>
          <span class="like" v-if="item.like">{{item.like}}&nbsp;赞</span>
          <span class="like" v-else>0&nbsp;赞</span>
        </div>
      </div>
    </el-col>
    <!-- 分页 -->
    <el-col class="Pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="postsObj.pageIndex + 1"
        :page-sizes="[3, 5, 10, 15]"
        :page-size="postsObj.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      searchCityName: "",
      postsObj: {
        pageIndex: 0,
        pageSize: 3
      },
      total: 0,
      postsData: []
    };
  },
  watch: {
    $route() {
      console.log(this.$route.query.city);
      this.$axios({
        url: "/posts",
        params: { city: this.$route.query.city }
      }).then(res => {
        console.log(res);
        this.postsData = res.data.data;
      });
    }
  },
  methods: {
    // 搜索城市
    searchCity() {
      console.log(this.searchCityName);
      this.$router.push({
        path: `/post?city=${this.searchCityName}` 
      });
    },
    init() {
      this.$axios({
        url: "/posts",
        params: {
          _start: this.postsObj.pageIndex * this.postsObj.pageSize,
          _limit: this.postsObj.pageSize
        }
      }).then(res => {
        this.postsData = res.data.data;
        console.log(res);
        this.total = res.data.total;
      });
    },
    handleSizeChange(val) {
      // console.log(val);
      this.postsObj.pageSize = val;
      this.init();
    },
    handleCurrentChange(val) {
      // console.log(val);
      this.postsObj.pageIndex = val - 1;
      this.init();
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang="less" scoped>
.Pagination {
  margin-bottom: 20px;
  padding-left: 20px;
}
.article {
  margin: 15px 0;
  padding-bottom: 30px;
  border-bottom: 1px #ddd solid;
  a {
    color: #000;
  }
  .title {
    font-size: 18px;
    &:hover {
      color: #409eff;
    }
  }
  p {
    height: 63px;
    line-height: 1.5;
    font-size: 14px;
    margin: 15px 0;
    overflow: hidden;
    color: #666;
  }
  img {
    width: 220px;
    height: 150px;
  }
  .little-word {
    margin-top: 10px;
    font-size: 12px;
    color: #999;
    .like {
      float: right;
      font-size: 16px;
      color: #409eff;
    }
    .username {
      color: #409eff;
    }
    img {
      width: 15px;
      height: 15px;
      border-radius: 50%;
      vertical-align: bottom;
    }
  }
}
.button {
  display: flex;
  justify-content: space-between;
  padding-top: 15px;
  border-bottom: 1px #ddd solid;
  .edit {
    margin-bottom: 10px;
  }
  span {
    color: #409eff;
    font-size: 18px;
    border-bottom: 2px #409eff solid;
  }
}
.search {
  i {
    position: absolute;
    right: 10px;
    top: 8px;
    font-size: 25px;
    font-weight: 600;
    color: #409eff;
  }
  input {
    padding-left: 15px;
    margin-bottom: 10px;
    width: 700px;
    height: 40px;
    border: 3px #409eff solid;
  }
  span {
    font-size: 14px;
    color: #999;
  }
  .gz,
  .bj,
  .sh {
    &:hover {
      cursor: pointer;
      color: #409eff;
      border-bottom: 1px #409eff solid;
    }
  }
}
</style>
