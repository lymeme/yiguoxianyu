<template>
  <div class="container">
    <el-row class="clearfix">
      <el-col class="fl">
        <div class="side-left">
          <h2>发表新攻略</h2>
          <p class="share">分享你的个人游记，让更多人看到哦！</p>
          <el-input
            v-model="addArticle.title"
            placeholder="请输入标题"
            maxlength="15"
            show-word-limit
            clearable
          ></el-input>

          <div id="app">
            <VueEditor :config="config" ref="vueEditor" />
          </div>
          <div class="city">
            <span class="choice-city">选择城市</span>
            <!--
              :fetch-suggestions="ArrCity" 搜索执行的函数
              @select="ArrhandleSelect" 选中下拉框中选项触发函数
            -->
            <el-autocomplete
              v-model="addArticle.city"
              :fetch-suggestions="ArrCity"
              placeholder="请输入内容"
              @select="ArrhandleSelect"
            ></el-autocomplete>

            <div class="release">
              <el-button type="primary" size="small" @click="pubArticles">发布</el-button>
              <span>或者</span>
              <span class="saveDraft" @click="saveDraft">保存到草稿</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col class="fr">
        <div class="side-right">
          <h4>
            草稿箱
            <span>( {{draftArr.length}} )</span>
          </h4>
          <div class="save-draft" v-for="(item,index) in draftArr" :key="index">
            <div v-if="draftArr.length>0">
              <div @click="getArrCityFromDraft(index)">
                {{item.title}}
                <i class="el-icon-edit"></i>
              </div>
              <p>{{item.date}}</p>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>


<script>
import "quill/dist/quill.snow.css";
let VueEditor;

if (process.browser) {
  VueEditor = require("vue-word-editor").default;
}
// 需要单独引入样式
import "quill/dist/quill.snow.css";
export default {
  name: "app",
  components: {
    VueEditor
  },
  data() {
    return {
      addArticle: {
        // 标题
        title: "",
        // 文本域内容
        content: "",
        // 选择城市
        city: ""
      },
      // 搜索下拉框显示城市数组
      searchCity: [],

      // 草稿箱数据数组
      draftArr: [
        /*  {
         
          // 标题
          title: "",
          // 文本域内容
          content: "",
          // 选择城市
          city: "" 
          // 时间
          date:""
        }*/
      ],

      // 富文本框配置
      config: {
        modules: {
          // 工具栏
          toolbar: [
            ["bold", "italic", "underline", "strike"], // toggled buttons
            ["blockquote", "code-block"],
            ["image", "video"],

            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }], // superscript/subscript
            [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
            [{ direction: "rtl" }] // text direction
          ]
        },
        // 主题
        theme: "snow",
        uploadImage: {
          url: "http://157.122.54.189:9095/upload",
          name: "files",
          uploadBefore(file) {
            return true;
          },
          uploadProgress(res) {},
          uploadSuccess(res, insert) {
            insert("http://157.122.54.189:9095" + res.data[0].url);
          },
          uploadError() {},
          showProgress: false
        },

        uploadVideo: {
          //url: "http://157.122.54.189:9095/upload",
          url: "http://157.122.54.189:9095/upload",
          name: "files",
          uploadBefore(file) {
            return true;
          },
          uploadProgress(res) {},
          uploadSuccess(res, insert) {
            insert("http://157.122.54.189:9095" + res.data[0].url);
          },
          uploadError() {}
        }
      }
    };
  },
  methods: {
    pubArticles() {
      if (!this.addArticle.title) {
        return this.$message.warning("请输入文章标题");
      }
      if (this.$refs.vueEditor.editor.root.innerHTML === "<p><br></p>") {
        return this.$message.warning("请输入文章内容");
      }
      if (!this.addArticle.city) {
        return this.$message.warning("请选择城市");
      }
      this.addArticle.content = this.$refs.vueEditor.editor.root.innerHTML;
      var token = JSON.parse(localStorage.getItem("store")).userStore.userInfo
        .token;
      //  console.log(token)
      this.$axios({
        headers: {
          Authorization: "Bearer " + token
        },

        url: "/posts",
        method: "post",
        data: this.addArticle
      }).then(res => {
        console.log(res);
        const { data } = res;
        if (res.status === 200) {
          this.$message.success(data.message);
          this.addArticle.title = "";
          this.$refs.vueEditor.editor.root.innerHTML = "<p><br></p>";
          this.addArticle.city = "";
        }
      });
    },

    /**
     * query 输入框输入的内容
     *
     * cb 发送远程搜索返回的数组的----回调函数(回传内容需要为对象-----且键为value)
     */
    ArrCity(query, cb) {
      this.city = query;
      if (!this.city) {
        return cb([]);
      }
      this.$axios({
        url: "/cities",
        methods: "get",
        params: { name: this.city }
      }).then(res => {
        const { data } = res.data;
        data.forEach(e => {
          this.searchCity.push({ value: e.name });
        });
        cb(this.searchCity);
      });
    },
    /**
     * query为选中的下拉菜单的选项
     */
    ArrhandleSelect(query) {
      this.addArticle.city = query.value;
    },
    // 保存到草稿箱
    saveDraft() {
      var date = new Date();
      var y, m, d, time;
      y = date.getFullYear();
      m = date.getMonth() + 1;
      d = date.getDate();
      time = y + "-" + m + "-" + d;
      this.draftArr.push({
        // 标题
        title: this.addArticle.title,
        // 文本域内容
        content: this.$refs.vueEditor.editor.root.innerHTML,
        // 选择城市
        city: this.addArticle.city,
        // 时间
        date: time
      });
      localStorage.setItem("draftArr", JSON.stringify(this.draftArr));
      this.addArticle.title = "";
      this.$refs.vueEditor.editor.root.innerHTML = "";
      this.addArticle.city = "";
    },
    // 从草稿箱获取数据
    getArrCityFromDraft(index) {
      var arr = JSON.parse(localStorage.getItem("draftArr")) || [];
      // this.addArticle;
      this.addArticle.title = arr[index].title || "";
      this.addArticle.city = arr[index].city || "";
      this.addArticle.content = arr[index].content || "";
      this.$refs.vueEditor.editor.root.innerHTML = arr[index].content || "";
    }
  },
  mounted() {
    this.draftArr = JSON.parse(localStorage.getItem("draftArr")) || [];
  }
};
</script>


<style lang="less" scoped>
.fl {
  float: left;
}
.fr {
  float: right;
}
.clearfix::after {
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.container {
  width: 1000px;
  margin: 0 auto;
  padding: 20px 0;
  .side-left {
    h2 {
      font-weight: 400;
      font-size: 22px;
      margin-bottom: 10px;
    }
    .share {
      width: 250px;
      font-size: 12px;
      color: #999999;
      margin-bottom: 10px;
    }
    .city {
      width: 450px;
    }
    .choice-city {
      font-size: 14px;
      color: #606266;
      line-height: 40px;
      padding: 0 12px 0 0;
    }
    .el-input {
      width: 750px;
      margin-bottom: 22px;
    }
    #vue-editor-wrapper {
      height: 458px;
      width: 750px;
      margin-bottom: 62px;
    }
    .el-autocomplete {
      margin-bottom: 22px;
    }
    .release {
      span:nth-child(2) {
        margin: 0 5px 0 15px;
        font-size: 14px;
      }
      .saveDraft {
        font-size: 14px;
        cursor: pointer;
        color: #409eff;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
  .el-col-24 {
    width: 200px;
  }
  .side-right {
    width: 200px;
    border: 1px solid #ddd;
    padding: 10px;
    h4 {
      font-weight: 400;
      color: #666;
      margin-bottom: 10px;
    }
    .save-draft {
      div > div {
        font-size: 14px;
        cursor: pointer;
        &:hover {
          color: orange;
          text-decoration: underline;
        }
      }
      p {
        font-size: 14px;
        color: #666;
      }
    }
  }
}
</style>