<template>
  <el-row class="hotelMap">
    <el-col :span="13" id="container"></el-col>
    <el-col :span="11" class="tabs">
      <el-tabs v-model="activeName" @tab-click="handleClick(activeName)">
        <el-tab-pane label="风景" name="风景名胜">
          <ol class="height">
            <li v-for="(item,index) in datamap" :key="index">
              <el-row type="flex" class="row-bg" justify="space-between">
                <span class="right">{{item.name}}</span>
                <span>0.43公里</span>
              </el-row>
            </li>
          </ol>
        </el-tab-pane>
        <el-tab-pane label="交通" name="交通设施服务">
          <ol class="height">
            <li v-for="(item,index) in datamap" :key="index">
              <el-row type="flex" class="row-bg" justify="space-between">
                <span class="right">{{item.name}}</span>
                <span>0.43公里</span>
              </el-row>
            </li>
          </ol>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      activeName: "风景名胜",
      datamap: [],
      datapois:[]
    };
  },
  methods: {
    handleClick(val){
      // console.log(val)
      this.map(val)
    },
    map(types) {
      this.$axios({
        url: "https://restapi.amap.com/v3/place/text",
        params: {
          keywords: "",
          city: "南京",
          location: "118.871811,31.328468",
          types,
          output: "json",
          page: 1,
          offset: 10,
          key: "77be7f2191f4f5b26cbe5cfd526af2bb"
        }
      }).then(res => {
        this.datamap = res.data.pois;
        // console.log(this.datamap);
      });
    }
  },
  mounted() {
    this.map('风景名胜')
    window.onLoad = function() {
      var map = new AMap.Map("container", {
        zoom: 11, //级别
        center: [118.8718107, 31.32846821] //中心点坐标
      });

      var marker = new AMap.Marker({
        position: new AMap.LngLat(118.8718107, 31.32846821),
        title: "北京"
      });

      map.add([marker]);
    };
    var url =
      "https://webapi.amap.com/maps?v=1.4.15&key=6bafd7f530673a2153125ce4e377ea67&callback=onLoad";
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
  }
};
</script>

<style lang="less" scoped>
.hotelMap {
  margin: 40px 0;

  #container {
    width: 650px;
    height: 360px;
  }

  .tabs {
    padding-left: 20px;
    width: 330px;
    height: 40px;
  }

  .height {
    font-size: 14px;
    color: #666;
    height: 300px;
    // width: 330px;
    overflow-y: scroll;
    white-space: nowrap;

    li {
      margin: 0 20px 20px 10px;
    }
  }
}
</style>