<template>
  <el-row>
    <!-- 搜索框 -->
    <el-col>
      <div class="search">
        <input type="text" placeholder="请输入想去的地方，如：广州" />
        <i class="el-icon-search"></i>
        <span>推荐：</span>
        <span class="gz">广州</span>
        <span class="bj">北京</span>
        <span class="sh">上海</span>
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
  </el-row>
</template>

<script>
export default {

};
</script>

<style lang="less" scoped>
.button{
  display: flex;
  justify-content: space-between;
  padding-top: 15px;
  border-bottom: 1px #ddd solid;
  .edit{
    margin-bottom: 10px;
  }
  span{
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