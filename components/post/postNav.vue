<template>
  <el-row>
    <el-col>
      <div class="nav" @mouseleave="handleHover(-1)">
        <div
          class="cityList"
          v-for="(item,index) in cityList"
          :key="index"
          @mouseover="handleHover(index)"        
        >
          <span class="city">{{ cityList[index].type }}</span>
          <i class="el-icon-arrow-right arrow"></i>
        </div>
        <el-col>
          <ul
            class="children-cities"
            v-show="current>0"
            @mouseenter="handleHover(current-1)"
            @mouseleave="handleHover(-1)"
          >
            <li v-for="(item2,index2) in cityChildren" :key="index2">
              <nuxt-link :to="`/post?city=${item2.city}`">
                <span class="number">{{index2 + 1}}</span>
                <span class="city">{{item2.city}}</span>
                <span class="desc">{{item2.desc}}</span>
              </nuxt-link>
            </li>
          </ul>
        </el-col>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      cityList: [],
      cityChildren: [],
      current: 0
    };
  },
  mounted() {
    this.$axios({
      url: "/posts/cities"
    }).then(res => {
      // console.log(res);
      this.cityList = res.data.data;
      // console.log(this.cityList);
    });
  },
  methods: {
    handleHover(index) {
      if (index >= 0) {
        this.current = index + 1;
        this.cityChildren = this.cityList[this.current - 1].children;
      } else {
        this.current = 0;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.nav {
  position: relative;
  border-bottom: 1px #ddd solid;
  .cityList {
    display: flex;
    justify-content: space-between;
    height: 41px;
    line-height: 41px;
    padding-left: 20px;
    padding-right: 10px;
    border: 1px #ddd solid;
    border-bottom: 1px #fff solid;
    font-size: 14px;
    color: #666;
    &:hover {
      color: #409eff;
      border-right-color: #fff;
    }
    .arrow {
      font-size: 16px;
      line-height: 41px;
    }
  }
  .children-cities {
    list-style: none;
    position: absolute;
    left: 259px;
    top: 0px;
    width: 400px;
    padding: 10px 0 10px 20px;
    z-index: 5;
    border: 1px #ddd solid;
    background-color: #fff;
    li {
      height: 35px;
      line-height: 35px;
      font-size: 14px;
      a{
        color: #000;
      }
      .number {
        font-size: 20px;
        font-weight: 600;
        color: #409eff;
      }
      .city {
        padding-left: 10px;
        padding-right: 10px;
        color: #409eff;
      }
      .desc {
        &:hover {
          border-bottom: 1px #409eff solid;
        }
      }
    }
  }
}
</style>