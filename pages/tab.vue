<template>
  <div class="box">
    <div class="tabs">
      <span
        v-for="(item,index) in ['体育','新闻','娱乐']"
        :key="index"
        @click="handleClick(index)"
        :class="{ active : current === index }"
      >{{ item }}</span>
    </div>

    <div class="sports" v-show="current === 0">
      <ul>
        <li>中国男篮开门红</li>
        <li>中国男篮开门红</li>
        <li>中国男篮开门红</li>
      </ul>
    </div>

    <div class="news" v-show="current === 1">
      <ul>
        <li>国庆大阅兵！！！</li>
        <li>国庆大阅兵！！！</li>
        <li>国庆大阅兵！！！</li>
      </ul>
    </div>

    <div class="entertainment" v-show="current === 2">
      <ul>
        <li>新年快乐</li>
        <li>新年快乐</li>
        <li>新年快乐</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      current: 0
    };
  },
  methods: {
    handleClick(index) {
      this.current = index;
    }
  }
};
</script>

<style lang="less" scoped>
.box {
  padding: 100px;
  margin: 20px;
}
.tabs {
  margin: 20px;
  span {
    margin-right: 20px;
    cursor: pointer;
  }
}
.active {
  color: red;
}
</style>