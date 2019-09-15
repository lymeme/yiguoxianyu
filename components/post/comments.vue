<template>
  <div class="comments">
    <!-- 评论部分 -->
    <div class="cmt-wrapper">
      <h4 class="cmt-title">评论</h4>
      <b v-if="type">你回复&nbsp;{{name}}</b>
      <textarea
        autocomplete="off"
        placeholder="说点什么吧..."
        class="el-textarea__inner"
        style="resize: none; min-height: 33px;"
        v-model="commentText"
      ></textarea>
      <!-- 上传 -->
      <div class="cmt-input-ctrls">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" size="tiny">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>

        <!-- <el-table :data="tableData" style="width: 100%" border size="small" :show-header="false">
          <el-table-column prop="address">
              <p v-if="comment==0">暂无评论，我来发表第一篇评论！</p>
          </el-table-column>
        </el-table>-->
        <div class="commentBox">
          <p v-if="comment==0" style="text-align: center;color: #999999">暂无评论，我来发表第一篇评论！</p>
          <div v-else>
            <div v-for="(item,index) in comment" :key="index" class="pinglun">
              <el-row>
                <el-col :span="23">
                  <div class="grid-content bg-purple">
                    <img :src="`http://157.122.54.189:9095${item.account.defaultAvatar}`" alt />
                    <span>{{item.account.nickname}}</span>
                    <i>{{item.created_at | formatDate}}</i>
                  </div>
                </el-col>
                <el-col :span="1">
                  <div class="grid-content bg-purple-light">
                    <span>{{item.level}}</span>
                  </div>
                </el-col>
              </el-row>
              <p @click="changeCommenter(item.account.nickname,index)">{{item.content}}</p>
              <div v-if="item.parent > 0">
                <div class="reply" :v-for="parent in item.parent">
                  <b>
                    {{parent.account.nickname}}&nbsp;&nbsp;回复&nbsp;&nbsp;{{item.account.nickname}}
                    <span>{{parent.time}}</span>
                  </b>
                  <p @click="changeCommenter(parent.responder,index)">{{parent.content}}</p>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        <!-- <div class="commentBox">
          <p v-if="comment==0">暂无评论，我来发表第一篇评论！</p>
          <div v-else>
            <div class="comment" v-for="(item,index) in comment" :key="index">
              <b>
                {{item.name}}
                <span>{{item.time}}</span>
              </b>
              <p @click="changeCommenter(item.name,index)">{{item.content}}</p>
              <div v-if="item.parent > 0">
                <div class="reply" :v-for="parent in item.parent">
                  <b>
                    {{parent.responder}}&nbsp;&nbsp;回复&nbsp;&nbsp;{{parent.reviewers}}
                    <span>{{parent.time}}</span>
                  </b>
                  <p @click="changeCommenter(parent.responder,index)">{{parent.content}}</p>
                </div>
              </div>
            </div>
          </div>
        </div> -->

        <el-button type="primary" size="mini" class="el-button" @click="addComment">提交</el-button>
      </div>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="100"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: ["type", "name"],
  data() {
    return {
      pageSize: 0,
      pageIndex: 2,
      commentText: "",
      dialogImageUrl: "",
      dialogVisible: false,
      comment: [],
      currentPage: 1
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    addComment: function() {
      this.$emit("submit", this.commentText);
      this.commentText = "";
    },
    changeCommenter: function(name, index) {
      this.$emit("change", name, index);
    }
  },
  mounted() {
    //获取评论
    this.$axios({
      url: "/posts/comments",
      params: {
        post: this.$route.query.id,
        _start: this.pageSize,
        _limit: this.pageIndex
      }
    }).then(res => {
      //   console.log(res);
      this.comment = res.data.data;
      console.log(this.comment);
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

<style lang="less" scoped>
.cmt-wrapper {
  .cmt-title {
    font-weight: 400;
    font-size: 18px;
    margin-bottom: 20px;
  }
  .el-textarea__inner {
    margin: 10px 0;
    display: block;
    resize: vertical;
    padding: 5px 15px;
    line-height: 1.5;
    box-sizing: border-box;
    width: 100%;
    font-size: inherit;
    color: #606266;
    background-color: #fff;
    background-image: none;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  .cmt-input-ctrls {
    margin-bottom: 30px;
    position: relative;
    .avatar-uploader .el-upload {
      border: 1px dashed #c0ccda;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 100px;
      height: 100px;
      line-height: 100px;
      text-align: center;
    }
    .avatar {
      width: 100px;
      height: 100px;
      display: block;
    }
    .el-button {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
}
.commentBox {
  margin-top: 30px;
  border: 1px solid #dddddd;
}

.pinglun {
  padding: 20px 20px 5px;
  border-bottom: 1px dashed #ddd;
  p {
    font-size: 16px;
    color: #000000;
    margin: 10px 0 20px;
  }
}
.pinglun:last-child {
  border: none;
}

.bg-purple {
  font-size: 12px;
  span {
    color: #666666;
  }
  img {
    width: 16px;
    height: 16px;
  }
  i {
    color: #999999;
  }
}
.bg-purple-light {
  font-size: 12px;
  color: #666666;
}
</style>