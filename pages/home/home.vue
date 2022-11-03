<template>
  <view class="home-container">
    <!-- 组件使用的是和原生小程序语法相同 -->
    <!-- 轮播图区域 -->
    <swiper indicator-dots circular autoplay>
      <swiper-item @click="goGoodsDetail(item.goods_id)" v-for="item in swipers" :key="item.goods_id">
        <image :src="item.image_src"></image>
      </swiper-item>
    </swiper>

    <!-- 分类导航 -->
    <view class="navs">
      <image @click="cateNavigateTo" v-for="item in navs" :key="item.name" :src="item.image_src" mode=""></image>
    </view>

    <!-- 楼层 -->
    <view class="floor">
      <!-- 每一层楼 -->
      <view class="floor_item" v-for="item in floors" :key="item.floor_title.name">
        <!-- 每层的标题 -->
        <image class="title" :src="item.floor_title.image_src" mode=""></image>
        <!-- 每层楼的图片列表 -->
        <view class="image_box">
          <!-- 左边的1张图片 -->
          <image @click="goGoodsList(item.product_list[0].navigator_url)" class="left"
            :src="item.product_list[0].image_src"></image>
          <!-- 右边的4张图片 -->
          <view class="right">
            <image v-for="(img,index) in item.product_list.slice(1)" @click="() => goGoodsList(img.navigator_url)"
              :src="img.image_src" :key="index">
            </image>
          </view>
        </view>
      </view>
    </view>
    <!-- 数据渲染/事件绑定 遵循vue -->
  </view>
</template>

<script>
  import {
    getSwipers,
    getCateNavs,
    getFloors
  } from '@/api/home.js'
  // js的写法 遵循 vue的写法
  export default {
    data() {
      return {
        swipers: [],
        navs: [],
        floors: []
      };
    },
    methods: {
      // 加载轮播图数据
      async loadSwipers() {
        const res = await getSwipers()
        this.swipers = res.message
      },
      // 获取首页分类导航数据
      async loadCateNavs() {
        const res = await getCateNavs()
        this.navs = res.message
      },
      // 加载并保存楼层数据
      async loadFloors() {
        const res = await getFloors()
        this.floors = res.message
      },
      // 进入商品详情
      goGoodsDetail(id) {
        // 凡是能够通过wx.去访问的,都可以通过uni.使用
        uni.navigateTo({
          url: '/pages/subGoods/goods_detail/goods_detail?id=' + id
        })
      },
      // 点击分类进行跳转
      cateNavigateTo() {
        uni.switchTab({
          url: '/pages/cate/cate'
        })
      },
      // 点击进入商品列表
      goGoodsList(url) {
        const query = url.split('?')[1]
        uni.navigateTo({
          url: "/pages/subGoods/goods_list/goods_list?" + query
        })
      }
    },
    // 生命周期函数 还是 使用小程序的
    onLoad() {
      this.loadFloors()
      this.loadCateNavs()
      this.loadSwipers()
    }
  }
</script>

<style lang="scss">
  .home-container {
    overflow-x: hidden;

    // 轮播图区域
    swiper {
      height: 330rpx;

      image {
        width: 100%;
        height: 100%;
      }
    }

    // 分类导航
    .navs {
      display: flex;
      justify-content: space-around;
      margin: 15rpx;

      image {
        width: 128rpx;
        height: 140rpx;
      }
    }

    // 楼层
    .floor {
      margin-top: 20rpx;

      .floor_item {
        margin: 15rpx 10rpx;

        .title {
          height: 60rpx;
          width: 750rpx;
        }

        .image_box {
          display: flex;
          justify-content: space-between;

          .left {
            width: 232rpx;
            height: 392rpx;
            float: left;
          }

          .right {
            width: 500rpx;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            align-content: space-between;

            image {
              width: 233rpx;
              height: 190rpx;
            }
          }
        }
      }
    }
  }
</style>
