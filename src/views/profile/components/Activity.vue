<template>
  <div class="user-activity">
    <div class="post">
      <div class="user-block">
        <img class="img-circle"
          :src="'https://picture-tjl.oss-cn-hangzhou.aliyuncs.com/WuHan_Flower/avatars/20230514144252.png' + avatarPrefix">
        <span class="username">welt</span>
        <span class="description">为你推荐的赏花点</span>
      </div>
      <div class="user-images">
        <el-carousel :interval="6000" type="card" height="350px">
          <el-carousel-item v-for="item in carouselImages" :key="item">
            <img :src="item" class="image">
          </el-carousel-item>
        </el-carousel>
      </div>
      <ul class="list-inline">
        <li><span class="link-black text-sm"><i class="el-icon-share"></i> Share</span></li>
        <li><span class="link-black text-sm"><i class="el-icon-star-off"></i> Like</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
const avatarPrefix = '?imageView2/1/w/80/h/80'

export default {
  data() {
    return {
      carouselImages: [
        'https://picture-tjl.oss-cn-hangzhou.aliyuncs.com/WuHan_Flower/recommend/20190325084559846.jpg',
        'https://picture-tjl.oss-cn-hangzhou.aliyuncs.com/WuHan_Flower/recommend/092939dckdg21zc21h5wot.jpg',
        'https://picture-tjl.oss-cn-hangzhou.aliyuncs.com/WuHan_Flower/recommend/4876b7e6a8ca728f91ad831fc985a2e9.jpg',
        'https://picture-tjl.oss-cn-hangzhou.aliyuncs.com/WuHan_Flower/recommend/58421716282f5639a7ae1e8ba31b7e6d.jpg'
      ],
      avatarPrefix,
    }
  }
}
</script>

<style lang="scss" scoped>
.user-activity {
  .user-block {
    .username,
    .description {
      display: block;
      margin-left: 50px;
      padding: 2px 0;
    }

    .username {
      font-size: 16px;
      color: #000;
    }

    :after {
      clear: both;
    }

    .img-circle {
      border-radius: 50%;
      width: 40px;
      height: 40px;
      float: left;
    }

    span {
      font-weight: 500;
      font-size: 12px;
    }
  }

  .post {
    font-size: 14px;
    border-bottom: 1px solid #d2d6de;
    margin-bottom: 15px;
    padding-bottom: 15px;
    color: #666;

    .image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .user-images {
      padding-top: 20px;
    }
  }

  .list-inline {
    padding-left: 0;
    margin-left: -5px;
    list-style: none;

    li {
      display: inline-block;
      padding-right: 5px;
      padding-left: 5px;
      font-size: 13px;
    }

    .link-black {

      &:hover,
      &:focus {
        color: #999;
      }
    }
  }

}

.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}
</style>
