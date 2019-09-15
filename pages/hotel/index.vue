<template>
  <div class="hotel">
    <!-- 面包屑 -->
    <div class="nav">
      <nuxt-link to="/hotel">
        酒店
      </nuxt-link>
      <i class="el-breadcrumb__separator el-icon-arrow-right" />
      <span>南京市酒店预订
      </span>
    </div>
    <!-- 筛选框 -->
    <HotelForm />
  </div>
</template>

<script>
import HotelForm from '@/components/hotel/hotelForm.vue'
export default {
  components: {
    HotelForm
  }
}
</script>

<style scoped lang="less">
.hotel {
  width: 1000px;
  margin: 0 auto;
  .nav {
    overflow: hidden;
    padding: 20px 0;
  }
  a {
    margin: 0 6px;
    font-weight: 400;
  }
}
</style>
