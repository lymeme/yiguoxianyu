<template>
  <div class="data_form">
    <!-- fetch-suggestions 返回输入建议的方法 -->
    <!-- select 点击选中建议项时触发 -->
    <el-autocomplete
      v-model="form.departCity"
      popper-class="my-autocomplete"
      :fetch-suggestions="querySearch"
      placeholder="目的地"
      @select="handleSelect"
    />
    <!-- 日期选择器 -->
    <el-date-picker
      v-model="value6"
      type="daterange"
      range-separator="-"
      start-placeholder="入住日期"
      end-placeholder="离店日期"
    />
    <el-button type="primary">查看价格</el-button>
    <div class="content">
      <el-row>
        <el-col :span="14">
          <el-row :gutter="20" type="flex" style="margin-bottom:15px">
            <el-col :span="3">
              <div class="area">区域：</div>
            </el-col>
            <el-col :span="21">
              <div class="grid-content bg-purple">
                <a href="#" class="location-budget active" style="font-size:14px">全部</a>
                <a
                  v-for="(item, index) in cityList"
                  :key="index"
                  href="#"
                  class="city_area"
                  style="font-size:14px;color:#666"
                >{{ item.business_area }}</a>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="20" style="margin-bottom:15px">
            <el-col :span="3">
              <div class="strategy">攻略：</div>
            </el-col>
            <el-col :span="21">
              <div class="grid-content bg-purple">
                <span
                  style="font-size:14px;color:#666"
                >北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。 景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。 由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。</span>
              </div>
            </el-col>
          </el-row>

          <el-row :gutter="20" style="margin-bottom:15px">
            <el-col :span="3">
              <div class="price">均价：</div>
            </el-col>
            <el-col :span="21">
              <div class="grid-content bg-purple">
                <el-col :span="8">
                  <i class="iconfont iconhuangguan" style="color:green" />
                  <i class="iconfont iconhuangguan" style="color:green" />
                  <i class="iconfont iconhuangguan" style="color:green" />
                  <span style="font-size:14px;color:#666">¥332</span>
                </el-col>
                <el-col :span="8">
                  <i class="iconfont iconhuangguan" style="color:green" />
                  <i class="iconfont iconhuangguan" style="color:green" />
                  <i class="iconfont iconhuangguan" style="color:green" />
                  <i class="iconfont iconhuangguan" style="color:green" />
                  <span style="font-size:14px;color:#666">¥521</span>
                </el-col>
                <el-col :span="8">
                  <i class="iconfont iconhuangguan" style="color:green" />
                  <i class="iconfont iconhuangguan" style="color:green" />
                  <i class="iconfont iconhuangguan" style="color:green" />
                  <i class="iconfont iconhuangguan" style="color:green" />
                  <i class="iconfont iconhuangguan" style="color:green" />
                  <span style="font-size:14px;color:#666">¥789</span>
                </el-col>
              </div>
            </el-col>
          </el-row>
        </el-col>

        <el-col :span="10">
          <div class="map">
            <div id="container" />
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 筛选模块 -->
    <div class="list-filter" style="margin-bottom:10px">
      <el-row type="flex">
        <el-col
          :span="8"
          class="filter-price"
          style="font-size:14px;border-right:1px solid #ddd"
          justify="space-around"
        >
          <div class="filter_content">
            <span>价格</span>
            <span style="float:right;padding-right:26px;">0-{{checkPrice}}</span>
          </div>
          <div class="filter_sild">
            <el-slider
              :max="4000"
              v-model="checkPrice"
              :format-tooltip="formatTooltip"
              style="padding-right:26px"
            ></el-slider>
          </div>
        </el-col>
        <el-col :span="6" style="font-size:14px;border-right:1px solid #ddd">
          <div class="filter_content">
            <span style="padding-left:15px">住宿等级</span>
          </div>
          <div class="filter_sild" style="margin-top:7px;padding-left:15px">
            <el-dropdown @command="levelHandle">
              <span class="el-dropdown-link">
                {{leveldropdown}}
                <i
                  class="el-icon-arrow-down el-icon--right"
                  style="padding-left:94px"
                ></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  multiple
                  :command="item"
                  v-for="(item) in assets.levels"
                  :key="item.id"
                >&nbsp;&nbsp;{{item.name}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
        <el-col :span="6" style="font-size:14px;border-right:1px solid #ddd">
          <div class="filter_content">
            <span style="padding-left:15px">住宿类型</span>
          </div>
          <div class="filter_sild" style="margin-top:7px;padding-left:15px">
            <el-dropdown @command="typeHandle">
              <span class="el-dropdown-link">
                {{typedropdown}}
                <i
                  class="el-icon-arrow-down el-icon--right"
                  style="padding-left:94px"
                ></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  :command="item"
                  v-for="(item) in assets.types"
                  :key="item.id"
                >{{item.name}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
        <el-col :span="6" style="font-size:14px;border-right:1px solid #ddd">
          <div class="filter_content">
            <span style="padding-left:15px">酒店设施</span>
          </div>
          <div class="filter_sild" style="margin-top:7px;padding-left:15px">
            <el-dropdown @command="assetsHandle">
              <span class="el-dropdown-link">
                {{assetsdropdown}}
                <i
                  class="el-icon-arrow-down el-icon--right"
                  style="padding-left:94px"
                ></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  :command="item"
                  v-for="(item) in assets.assets"
                  :key="item.id"
                >{{item.name}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
        <el-col :span="6" style="font-size:14px">
          <div class="filter_content">
            <span style="padding-left:15px">酒店品牌</span>
          </div>
          <div class="filter_sild" style="margin-top:7px;padding-left:15px">
            <el-dropdown @command="brandHandle">
              <span class="el-dropdown-link">
                {{branddropdown}}
                <i
                  class="el-icon-arrow-down el-icon--right"
                  style="padding-left:94px"
                ></i>
              </span>
              <el-dropdown-menu slot="dropdown" class="scroll">
                <el-dropdown-item
                  :command="item"
                  v-for="(item) in assets.brands"
                  :key="item.id"
                >{{item.name}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 没有数据时显示 -->
    <div class="message" v-if="cityList.length ===0">
      <el-row>
        <el-col
          :span="24"
          style="text-align: center;color:hotpink;padding:30px 0"
        >没有符合条件的酒店噢 ^_^ 换个关键字试试吧</el-col>
      </el-row>
    </div>
    <!-- 酒店列表 -->
    <div class="hotel_list" v-else v-for="(item, index) in cityList" :key="index">
      <el-row style="padding:25px 0">
        <!-- 图片 -->
        <el-col :span="8" class="hotel_image">
          <span>
            <a href="#">
              <img :src="item.photos" :alt="item.name" />
            </a>
          </span>
        </el-col>
        <!-- 中间文本 -->
        <el-col :span="10" class="hotel_content">
          <a :href="'/hotel/details?id='+item.id">
            <h4>{{item.name}}</h4>
          </a>
          <div class="hotel_name">
            <span>{{item.alias}}</span>
            <span>
              <i class="iconfont iconhuangguan"></i>
              <i class="iconfont iconhuangguan"></i>
              <i class="iconfont iconhuangguan"></i>
            </span>
            <span>{{item.hoteltype.name}}</span>
          </div>
          <div class="hotel_evaluate">
            <span>
              <el-rate
                style="display:inline-block"
                v-model="item.stars"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}"
              ></el-rate>
            </span>
            <!-- <span>
              <i>{{item.stars}}</i>
            </span>-->
            <span style="padding-left:20px">
              <i>44</i> 条评价
            </span>
            <span style="padding-left:40px">
              <i>5</i> 篇游记
            </span>
          </div>
          <div class="hotel_site">
            <i class="iconfont iconlocation"></i>位于:
            <span>{{item.address}}</span>
          </div>
        </el-col>
        <!-- 价格 -->
        <el-col :span="6" class="hotel_price">
          <el-row
            type="flex"
            justify="space-around"
            class="border_hl"
            v-for="(item2, index2) in item.products"
            :key="index2"
          >
            <el-col :span="12" class="app_name">{{item2.name}}</el-col>
            <el-col :span="12">
              <span>￥{{item2.price}}</span>起
              <i class="el-icon-arrow-right"></i>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>

    <!-- 分页 -->
    <el-pagination
      class="fenye"
      :prev-text="'上一页'"
      :next-text="'下一页'"
      @size-change="handleSizeChange"
      :current-page="pageIndex"
      :page-size="pageSize"
      layout=" prev, pager, next"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      total: 0,
      // 筛选列表
      hotelsData: {
        city: "", //城市id
        price_in: "", //酒店价格
        hotellevel: "", //	酒店星级
        hoteltype: "", //酒店类型
        hotelbrand: "", //酒店品牌
        hotelasset: "", //酒店设施
        _sort: "", //排序
        _limit: "" //条数
      },
      // 下拉文字
      leveldropdown: "不限",
      typedropdown: "不限",
      assetsdropdown: "不限",
      branddropdown: "不限",
      // 酒店筛选数据
      assets: [],
      // 城市数据
      cityList: [],
      //筛选价格
      checkPrice: 4000,
      value6: "",
      // 目的地
      form: {
        departCity: "南京", // 目的地城市
        departCode: "" // 目的地代码
      },
      pageSize: 5,
      pageIndex: 0
    };
  },
  mounted() {
    // 地图
    window.onLoad = function() {
      const map = new AMap.Map("container");
      // console.log(11)
      var marker = new AMap.Marker({
        position: new AMap.LngLat(116.39, 39.9),
        title: "beij"
      }); // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9] title: '北京' });

      map.add([marker]);
    };
    const url =
      "https://webapi.amap.com/maps?v=1.4.15&key=f9a05005eca16632b6fbe97d15d9ce1e&callback=onLoad";
    const jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
    // 获取城市数据
    this.$router.push({ path: "/hotel?city=74" });
    this.$axios({
      url: "/hotels",
      params:{
        city:this.$route.query.city,
        _start:this.pageIndex * this.pageSize
      }
    }).then(res => {
      console.log(res.data, 1111);
      this.cityList = res.data.data;
      this.total = res.data.total;
    });
    // 酒店选项
    this.$axios({
      url: "/hotels/options"
    }).then(res => {
      // console.log(res.data.data);
      this.assets = res.data.data;
    });
    this.getUrl();
  },
  watch: {
    $route() {
      console.log(this.$route.query);
      this.$axios({
        url: "/hotels",
        params: {
          _limit: this.pageSize,
          _start: (this.pageIndex - 1) * this.pageSize,
          ...this.$route.query
        }
      }).then(res => {
        // console.log(res, 111);
        this.cityList = res.data.data;
      });
    }
  },
  methods: {
    // 页码改变时
    handleSizeChange(val) {
      console.log(val, 134);
      this.pageSize = val;
      this.$router.push({ path: `/hotel?city=74&page=${this.pageIndex}` });
    },

    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    querySearch(value, cb) {
      if (value === "") {
        const arr = [];
        cb(arr);
        return;
      }
      this.$axios({
        url: "/airs/city",
        params: { name: value }
      }).then(res => {
        const { data } = res.data;
        // console.log(data,1232131)
        this.$router.push({
          path: `/hotel?&city=${data[0].id}`
        });
        // 下拉列表必须要有value属性
        // 遍历添加value字段 并把最后市去掉
        const newdata = [];
        data.forEach(e => {
          e.value = e.name.replace("市", "");
          newdata.push(e);
        });
        // console.log(newdata)
        this.form.departCity = data[0].value;
        // 城市代码保存
        this.form.departCode = data[0].sort;
        // 返回数据
        cb(newdata);
      });
    },
    // 分割地址栏参数
    getUrl() {
      let str = location.href;
      str = str.substring(str.indexOf("?") + 1);
      // str = str.split('&')
      // console.log(str,123456)
      return str;
    },
    // 目的地选择时触发
    handleSelect(item) {
      // console.log(item);
    },
    // 价格选择
    formatTooltip(obj) {
      this.checkPrice = obj;
      // console.log(obj)
      // let str = this.getUrl()
      // this.$router.push({
      //   path:`/hotel?${str}&price_lt=${this.checkPrice}`
      // })
    },
    // 住宿等级下拉菜单
    levelHandle(obj) {
      // console.log(obj.id);
      if (this.hotelsData.hotellevel === obj.id) {
        this.leveldropdown = "不限";
        let str = this.getUrl();
        this.$router.push({
          path: `/hotel?${str}`
        });
        return;
      }
      // 显示文字
      this.leveldropdown = obj.name;
      // 保存id
      this.hotelsData.hotellevel = obj.id;
      // 获取url
      let str = this.getUrl();
      this.$router.push({
        path: `/hotel?${str}&hotellevel_in=${obj.id}`
      });
    },
    // 住宿类型
    typeHandle(obj) {
      if (this.hotelsData.hoteltype === obj.id) {
        return;
      }
      // console.log(obj);
      this.hotelsData.hoteltype = obj.id;
      this.typedropdown = obj.name;
      let str = this.getUrl();
      this.$router.push({
        path: `/hotel?${str}&hoteltype_in=${obj.id}`
      });
    },
    // 酒店设施
    assetsHandle(obj) {
      if (this.hotelsData.hotelasset === obj.id) {
        return;
      }
      // console.log(obj);
      this.hotelsData.hotelasset = obj.id;
      this.assetsdropdown = obj.name;
      let str = this.getUrl();
      this.$router.push({
        path: `/hotel?${str}&hotelasset_in=${obj.id}`
      });
    },
    // 酒店品牌
    brandHandle(obj) {
      if (this.hotelsData.hotelbrand === obj.id) {
        return;
      }
      this.hotelsData.hotelbrand = obj.id;
      // console.log(obj);
      this.branddropdown = obj.name;
      let str = this.getUrl();
      this.$router.push({
        path: `/hotel?${str}&hotelbrand_in=${obj.id}`
      });
    }
  }
};
</script>
<style lang="less" scoped>
.fenye {
  padding-left: 350px;
  margin: 20px 0;
}
.el-dropdown-link {
  cursor: pointer;
}
.scroll {
  max-height: 230px;
  overflow: auto;
}
.hotel_price {
  .app_name {
    font-size: 14px;
  }
  .border_hl {
    border-bottom: 1px solid #ebeef5;
  }
  div {
    cursor: pointer;
    padding: 10px 5px;
    transition: background-color 0.25s ease;
    &:hover {
      background-color: #eee;
    }
  }
  span {
    color: #f90;
  }
}

.hotel_content {
  h4 {
    font-weight: 400;
    font-size: x-large;
    cursor: pointer;
    color: #666;
  }
  .hotel_site {
    font-size: 14px;
    color: #666;
  }
  .hotel_name {
    color: #999;
    margin-bottom: 0.5em;
    i {
      color: #f90;
    }
  }
  .hotel_evaluate {
    padding-bottom: 10px;
    span {
      padding-right: 8px;
    }
    i {
      color: #f90;
    }
  }
}
.hotel_image {
  img {
    display: block;
    width: 320px;
    height: 210px;
  }
}
.filter_content {
  span {
    font-size: 14px;
    color: #666;
  }
}
.filter_sild {
  span {
    font-size: 13px;
  }
}
.list-filter {
  border: 1px solid #ddd;
  padding: 5px 0px 5px 20px;
  color: #666;
}
#container {
  width: 420px;
  height: 260px;
}
.city_area {
  padding-right: 1em;
}
.location-budget {
  background: #eee;
  cursor: auto;
  text-decoration: none;
  color: #999;
}
.content {
  padding: 20px 0;
}
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}
</style>
