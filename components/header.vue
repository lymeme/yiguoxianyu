<template>
  <div class="container">
    <el-row type="flex" class="main" justify="space-between">
      <!-- logo -->
      <div class="logo">
        <nuxt-link to="/">
          <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
        </nuxt-link>
      </div>
      <!-- navs -->
      <el-row type="flex" class="navs">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>
      <!-- login -->
      <div class="loginWord" v-if="!this.$store.state.user.userInfo.token">
        <nuxt-link to="/user/login">登录 / 注册</nuxt-link>
      </div>
      <div v-else>
        <el-dropdown>
          <span class="el-dropdown-link">
            <!-- 头像，昵称 -->
            <img
              :src="` ${$axios.defaults.baseURL}${$store.state.user.userInfo.user.defaultAvatar} `"
            />
            <span>{{$store.state.user.userInfo.user.nickname}}</span>
          </span>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item @click.native="handleLogout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  methods:{
    handleLogout(){
      //清除登录信息
      this.$store.commit('user/clearUserInfo')
      this.$message.success('退出成功')
    }
  },
  mounted() {
    console.log(this.$store.state.user.userInfo.token);
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 60px;
  line-height: 60px;
  border-bottom: 1px #ddd solid;
  box-shadow: 0 2px 2px #ddd;
  .main {
    width: 1000px;
    margin: 0 auto;
    .logo {
      padding-top: 9px;
      img {
        width: 156px;
        height: 43px;
        display: block;
      }
    }
    .navs {
      flex: 1;
      margin-left: 50px;
      a {
        display: block;
        height: 60px;
        padding: 0 20px;
        box-sizing: border-box;

        &:hover {
          color: #409eff;
          border-bottom: 5px #409eff solid;
        }
      }
      .nuxt-link-exact-active {
        background: #409eff;
        color: #fff;

        &:hover {
          color: #fff;
        }
      }
    }
  }
  .loginWord {
    font-size: 14px;
    a {
      color: #409eff;
      &:hover {
        border-bottom: 1px solid #409eff;
      }
    }
  }

  // 头像样式
  .el-dropdown-link img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    vertical-align: middle;
    box-sizing: border-box;
    border: 2px #fff solid;
    &:hover {
      border: 2px #409eff solid;
    }
  }
}
</style>