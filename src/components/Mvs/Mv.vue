<template>
  <div class="mv-container">
    <div class="mv-wrap">
      <h3>MV详情</h3>
      <!-- mv -->
      <div class="video-wrap">
        <!-- controls 属性规定浏览器应该为视频提供播放控件。controls 属性是一个 boolean(布尔) 属性 -->
        <video controls :src ="mvUrl">
          抱歉，您的浏览器不支持内嵌视频，不过不用担心，你可以
          <a href="https://www.baidu.com">下载</a>
          并用你喜欢的播放器观看!
        </video>
      </div>

      <!-- mv信息栏 -->
      <div class="info-wrap">
        <div class="singer-info">
          <div class="avatar-wrap">
            <img v-lazy ="artistAvatarUrl" alt="" />
          </div>
          <!-- 发布者名称 -->
          <span class="name">{{ mvInfo.artistName }}</span>
        </div>
        <!-- mv信息 -->
        <div class="mv-info">
          <!-- mv名称  -->
          <h2 class="title">{{ mvInfo.name }}</h2>
          <!-- mv发布时间 -->
          <span class="date">发布：{{ mvInfo.publishTime }}</span>
          <!-- mv播放次数 -->
          <span class="number">播放：{{ mvInfo.playCount }} 次</span>
          <!-- mv描述 -->
          <p class="desc">{{ mvInfo.desc }}</p>
        </div>
      </div>

      <!-- 热门评论 -->
      <div class="comment-wrap" v-if="hotComments.length != 0">
        <p class="title">
          热门评论<span class="number">({{ hotComments.length }}) </span>
        </p>
        <div class="comments-wrap">
          <div class="item" v-for="(item, index) in hotComments" :key="index">
            <div class="icon-wrap">
              <!-- 头像 -->
              <img v-lazy ="item.user.avatarUrl" alt="" />
            </div>
            <!-- 评论内容 -->
            <div class="content-wrap">
              <!-- 内容 -->
              <div class="content">
                <!-- 评论人的名字 -->
                <span class="name">{{ item.user.nickname }}：</span>
                <!-- 评论 -->
                <span class="comment">{{ item.content }}</span>
              </div>
              <!-- 评论的评论 -->
              <div class="re-content" v-if="item.beReplied.length != 0">
                <!-- 名字 -->
                <span class="name"
                  >{{ item.beReplied[0].user.nickname }}：</span
                >
                <!-- 回复 -->
                <span class="comment">{{ item.beReplied[0].content }}</span>
              </div>
              <!-- 评论时间 -->
              <div class="date">{{ item.time | LocaleString }}</div>
              <!-- 点赞 -->
              <span class="iconfont icon-zan float-right">{{
                item.likedCount
              }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 最新评论 -->
      <div class="comment-wrap" v-loading="loadingComments">
        <p class="title">
          最新评论<span class="number">({{ this.total }})</span>
        </p>
        <div class="comments-wrap">
          <div
            class="item"
            v-for="(item, index) in comments"
            :key="index"
          >
            <div class="icon-wrap">
              <!-- 头像 -->
              <img v-lazy ="item.user.avatarUrl" alt="" />
            </div>
            <!-- 评论内容 -->
            <div class="content-wrap">
              <div class="content">
                <span class="name"> {{ item.user.nickname }} ：</span>
                <span class="comment">{{ item.content }}</span>
              </div>
              <!-- 评论的评论 -->
              <div class="re-content" v-if="item.beReplied[0]">
                <!-- 名字 -->
                <span class="name"
                  >{{ item.beReplied[0].user.nickname }}：</span
                >
                <!-- 回复 -->
                <span class="comment">{{ item.beReplied[0].content }}</span>
              </div>
              <!-- 评论时间 -->
              <div class="date">{{ item.time | LocaleString }}</div>
            </div>
          </div>
        </div>
        <!-- 分页 -->
        <el-pagination
          :hide-on-single-page="true"
          background
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-size="pageSize"
          :pager-count="5"
          layout=" prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>

    <!-- 相关推荐 -->
    <div class="mv-recommend">
      <h3 class="title">相关推荐</h3>
      <div class="mvs">
        <div class="items">
          <div
            class="item"
            @click="toMvDetail(item.id)"
            v-for="(item, index) in recommendMvs"
            :key="index"
          >
            <div class="img-wrap">
              <img v-lazy ="item.cover" alt="" />
              <span class="iconfont icon-play"></span>
              <div class="num-wrap">
                <!-- 播放图标 -->
                <div class="iconfont icon-play"></div>
                <!-- 相似mv的播放次数 -->
                <div class="num">{{ item.playCount | ellipsisPlayVolume }}</div>
              </div>
              <!-- 播放时长 -->
              <span class="time">{{ item.duration | formatDuration }}</span>
            </div>
            <div class="info-wrap">
              <!-- mv名字,一般是歌名 -->
              <div class="name">{{ item.name }}</div>
              <!-- 作者名字 -->
              <div class="singer">{{ item.artistName }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 导入 axios
import { playMVAPI,commentsAPI,simiMVAPI,mvDetailAPI,artistsAPI } from '@/utils/api'
export default {
  name: "mv",
  data() {
    return {
      // 当前mv的id
      mvId: "",
      // mv相关信息
      mvUrl: "",
      // 相关推荐
      recommendMvs: [],
      // mv详情
      mvInfo: {},
      // 歌手头像
      artistAvatarUrl: "",
      // mv热门评论信息
      hotComments: [],
      // 最新评论
      comments: [],
      // 评论总数
      total: 0,
      // 页数
      pageSize: 10,
      page: 1,
      // 评论
      loading: true,
      loadingComments: false,
    };
  },
  watch: {
    // 监听$route.query.q
    $route(newVal) {
      // console.log(newVal);
      this.searchMV(newVal.query.q);
    },
  },
  // 生命周期钩子 回调函数
  created() {
    // console.log(this.$route.query.q);
    let mvId = this.$route.query.q;
    this.mvId = mvId;
    // 调用方法
    this.searchMV(mvId);
  },
  // 方法
  methods: {
    // 跳转到MV页面
    toMvDetail(id) {
      this.$router.push(`/mv?q=${id}`);
    },
    // 换页
    handleCurrentChange(page) {
      this.page = page;
      this.getComments();
    },
    // 获取评论
    getComments() {
      // 开始加载评论
      this.loadingComments = true;
      let params = {
            id: this.$route.query.q,
            limit: this.pageSize,
            offset: (this.page - 1) * this.pageSize,
          }
      commentsAPI(params,'mv').then((res) => {
          // console.log("获取评论", res);
          // 在res.data里面判断是否存在'hotComments'这个数组，返回一个boolen值
          if (Object.prototype.hasOwnProperty.call(res.data, "hotComments")) {
            // 如果存在↓
            this.hotComments = res.data.hotComments;
          }
          // 赋值最新评论
          this.comments = res.data.comments;
          // 赋值评论总数
          this.total = this.mvInfo.commentCount - this.hotComments.length;
        })
        .then(() => {
          // 停止加载评论
          this.loadingComments = false;
        });
    },

    searchMV(id) {
      // 开始加载
      this.loading = true;
      let params = {
            // 传入mvid
            id: id,
          }
      // 获取mv播放url
        playMVAPI(params).then((res) => {
          // console.log("MvUrl", res);
          // 赋值mvUrl
          this.mvUrl = res.data.data.url;
        });

      // 获取相关Mv推荐,传入mvid
        simiMVAPI({mvid : id}).then((res) => {
          // console.log("相似MV", res);
          // 赋值相似mv数组
          this.recommendMvs = res.data.mvs;
        });

      // 获取Mv信息
      mvDetailAPI({mvid : id}).then((res) => {
          // console.log("Mv详细信息", res);
          // 赋值mv信息
          this.mvInfo = res.data.data;
          // 获取歌手详细信息，拿到歌手头像
          this.GetArtistDetail(this.mvInfo.artists[0].id);
          // 获取评论信息
          this.getComments()  
        })
        .then(()=>{
          // 停止加载
                this.loading = false
            });    
    },
    // 获取歌手信息, 传入歌手 id, 可获得获取歌手详情
    GetArtistDetail(id) {
      artistsAPI({id},'detail').then((res) => {
          // console.log("传入歌手 id, 可获得获取歌手详情:", res);
          // 获取歌手头像
          this.artistAvatarUrl = res.data.data.artist.cover;
        });
    },
  },
};
</script>

<style lang="less" scoped>
.mv-container {
    display: flex;
    position: relative;
    width: 100%;
    height: 100%;
    max-width: 1100px;
    margin: 35px 100px;

    .title {
      margin-bottom: 20px;
    }

    .mv-wrap {
      width: 700px;
      margin-right: 35px;

      h3{
        margin-bottom: 20px;
        font-size: 25px;
      }

      .date {
        margin-right: 25px;
        color: #bebebe;
        font-size: 14px;
      }

      .video-wrap {
        width: 100%;
        height: 390px;
        margin-bottom: 20px;

        video {
          border-radius: 5px;
          height: 100%;
          width: 100%;
          outline: none;
        }
      }

      .info-wrap {
        margin-bottom: 50px;

        .singer-info {
          display: flex;
          align-items: center;
          margin-bottom: 35px;

          .avatar-wrap {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            margin-right: 10px;
            overflow: hidden;

            img {
              object-fit: cover;
              height: 100%;
              width: 100%;
            }
          }
        }

        .mv-info{
          .title {
            font-size: 30px;
          }

          .desc {
            font-size: 15px;
            margin-top: 20px;
          }
        }
      }

      .comment-wrap {
        margin-bottom: 70px;

        .title {
          font-size: 25px;

          .number {
            color: black;
            font-size: 20px;
          }
        }

        .item {
          display: flex;
          padding-top: 20px;

          .icon-wrap {
            margin-right: 15px;

            img {
              width: 50px;
              height: 50px;
              border-radius: 50%;
            }
          }

          &:not(:last-child) .content-wrap{
            padding-bottom: 20px;
            flex: 1;
          }

          .content-wrap {
            padding-bottom: 20px;
            flex: 1;

            .name {
              color: #517eaf;
              font-size: 14px;
            }

            .comment {
              font-size: 14px;
            }

            .content{
              margin-bottom: 10px;
            }
            
            .re-content{
              padding: 10px;
              background-color: #e6e5e6;
              border-radius: 5px;
              margin-bottom: 10px;
            }
          }
        }
      }
    }

    .mv-recommend {
      flex: 1;

      .mvs .items {
        display: flex;
        flex-wrap: wrap;

        .item {
          cursor: pointer;
          width: 100%;
          display: flex;
          align-items: center;
          padding: 10px;
          cursor: pointer;

          &:hover{
            background-color: #f5f5f5;
          }

          .img-wrap {
            width: 180px;
            position: relative;
            margin-right: 10px;

            >.icon-play {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 40px;
              height: 40px;
              color: #ee0000;
              font-size: 20px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              padding-left: 5px;
              background: rgba(255, 255, 255, 0.8);
              opacity: 0;

              &::before {
                transform: translateX(3px);
              }
            }

            &:hover>.icon-play{
              opacity: 1;
            }

            img {
              width: 100%;
              border-radius: 5px;
            }

            .num-wrap {
              position: absolute;
              color: white;
              top: 0;
              right: 0;
              display: flex;
              align-content: center;
              font-size: 15px;
              padding-right: 5px;
              padding-top: 2px;

              .icon-play {
                font-size: 12px;
                display: flex;
                align-items: center;
                margin-right: 5px;
              }
            }

            .time {
              position: absolute;
              bottom: 5px;
              right: 5px;
              color: white;
              font-size: 15px;
            }
          }

          .info-wrap {
            flex: 1;

            .name {
              font-size: 15px;
            }

            .singer {
              font-size: 14px;
              color: #c5c5c5;
            }
          }
        }
      }
    }
}

@media screen and (max-width : 500px) {
    .mv-container{
        margin: 20px 0;
        justify-content: center;
        align-items: center;
    }

    .mv-container .mv-wrap .video-wrap{
        height: 250px;
    }

    .mv-container .mv-wrap h3{
        margin-bottom: 10px;
    }

    .mv-container .mv-wrap{
        width: 100%;
        margin: 0;
    }

    .mv-container .mv-recommend{
        display: none;
    }

    .mv-container .mv-wrap h3{
        text-align: center;
    }
}
</style>