<template>
  <div class="songs-container">
    <div class="tab-bar">
      <!-- 标签类型，按下之后改变tag，每个tag对应的数字代表着对应的标签，当tag == x的时候，类被active，变红色 -->
      <span class="item" @click="tag = 0" :class="{ active: tag == 0 }">
        全部
      </span>
      <span class="item" @click="tag = 7" :class="{ active: tag == 7 }">
        华语
      </span>
      <span class="item" @click="tag = 96" :class="{ active: tag == 96 }">
        欧美
      </span>
      <span class="item" @click="tag = 8" :class="{ active: tag == 8 }">
        日本
      </span>
      <span class="item" @click="tag = 16" :class="{ active: tag == 16 }">
        韩国
      </span>
    </div>
    <!-- 底部的table,表格属性 -->
    <table class="el-table playlit-table">
      <!-- thead用于组合 HTML 表格的表头内容 -->
      <thead> 
        <!-- th 元素定义表头 -->
        <th class="th-title"></th>
        <th class="th-title"></th>
        <th class="th-title">音乐标题</th>
        <th class="th-title">歌手</th>
        <th class="th-title">专辑</th>
        <th class="th-title">时长</th>
      </thead>
      <tbody class="table-body">
        <tr v-for="(item, index) in lists" :key="index" class="el-table__row" @dblclick="PlayMusic(item)">
          <!-- td 元素定义表格单元 -->
          <td>{{ index + 1 }}</td>
          <td>
            <div class="img-wrap">
              <!-- 封面 -->
              <img v-lazy ="item.album.picUrl" alt="" />
              <!-- 播放按钮，圆圈 -->
              <span
                @click="PlayMusic(item)"
                class="iconfont icon-play"
              ></span>
            </div>
          </td>
          <td>
            <div class="song-wrap">
              <div class="name-wrap">
                <!-- 音乐标题 -->
                <span>{{ item.name }}</span>
                <span class="iconfont icon-mv"></span>
              </div>
              <span></span>
            </div>
          </td>
          <td class="td-title">
            <div class="td-wrap">
              {{ item.album.artists["0"].name }}
            </div>
          </td>
          <td class="td-title">
            <div class="td-wrap">
              {{ item.album.name }}
            </div>
          </td>
          <td class="td-title">
            <div class="td-wrap">
              {{ item.duration | formatDuration}}
            </div>
          </td>
        </tr>
      </tbody>
    </table>


      <!-- 分页器
        current-page 当前页
        page-size 每页多少条数据
        current-change 页码改变事件
      -->
      <div class="song-page">
        <el-pagination
        :hide-on-single-page="true"
        background
        @current-change="handleCurrentChange"  
        :current-page="page"
        :page-sizes="[5, 10, 15, 20, 30]"
        :page-size="10"
        layout="prev, pager, next"
        :total="100"
        :pager-count="5"
        ></el-pagination>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { getNewSongsAPI, getSongUrlAPI, songInfoAPI } from '@/utils/api'

export default { 
  name: "songs",
  data() {
    return {
      // 歌曲列表
      lists: [],
      // 分类
      tag: "0",
      // 页数
      page : 1,
      //开始的页数
      start : 0,
      //结束的页数
      end : 10,
    };
  },

  computed:{
    ...mapGetters(["nowSongDetail"])
  },

  watch: {
    tag() {
      //tag的值改变的时候，调用方法
      this.getList();
      // 重回第一页
      this.page = 1;
    },
  },
  created() {
    this.getList();
  },

  methods: {
    // 获取列表数据
    getList() {
      // 传递 设置的数据
      let params = {type: this.tag,limit: 10,offset: 1,}
      // 获取 最新音乐数据
      getNewSongsAPI(params).then((res) => {
        // console.log('最新音乐',res)
        this.lists = res.data.data.slice(this.start,this.end);
      });
    },

    // 点击按钮，播放音乐
    //每行歌曲双击播放
		PlayMusic(song) {
			getSongUrlAPI({id : song.id}).then(res => {
        if(res.data.data[0].url == null){
          	this.$message({
						message: "暂时没有版权播放，换首试试",
						type: "warning",
						center: true,
					});
          return ;
        }else{
            this.$store.dispatch("saveSongUrl", res.data.data[0].url);
            songInfoAPI({ids: song.id}).then(res =>{
            // console.log('detail',res)
            // 更新播放状态
			      this.$store.dispatch("changePlayState", true);
			      //提交vuex保存当前歌曲详情
			      this.$store.dispatch("saveSongDetail", res.data.songs[0]);
			      // 提交vuex添加到播放列表
			      this.$store.dispatch("addPlayinglist", res.data.songs[0]);
            // console.log('nowSongDetail',this.nowSongDetail)
          })
        }
			}).catch(err => {
          console.log(err);
					this.$message({
						message: "暂时没有版权播放，换首试试",
						type: "warning",
						center: true,
					});
				});
		},

    //页码改变事件
    handleCurrentChange(val){
      // console.log(val)
      // console.log(`当前页: ${val}`)
      this.start = (val - 1)*10
      this.end = val * 10
      this.page = val
      // 重新获取数据
      this.getList()
    },

  },
};
</script>

<style lang="less" scoped>
 /* 调整整合songs-container外边距和高度 */
 .songs-container {
    position: relative;
    width: 100%;
    height: 100%;
    max-width: 1100px;
    margin: 35px 100px;

    .tab-bar {
      display: flex;
      margin: 20px 0px;

      .item {
        font-size: 15px;
        color: gray;
        margin-right: 20px;
        cursor: pointer;
        padding: 5px 20px;
        text-align: center;

        &.active {
          color: black;
          background-color: #fcf6f5;
          border-radius: 20px;
        }
      }
    }

    .img-wrap {
      position: relative;
      width: 70px;
      height: 70px;

      img {
        width: 70px;
        height: 70px;
        border-radius: 5px;
      }

      .icon-play {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 25px;
        height: 25px;
        color: #ee0000;
        font-size: 12px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.8);

        &::before{
          transform: translateX(1px);
        }
      }
    }

    .song-wrap{

      >span {
        margin-top: 20px;
        display: inline-block;
        color: #bebebe;
      }

      .icon-mv {
        padding-left: 5px;
        color: #ee0000;
      }
    }

    .song-page{
      padding: 10px 0;
    }

    .name-wrap{
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 25px;

      span{
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
      }
    }

    .td-title{
      text-align: center;
    }

    .th-title{
      padding-bottom: 15px;

      &:nth-last-child(1){
        padding: 0 0px 15px 5px;
      }
    }
}

@media screen and (max-width : 500px) {
  .songs-container {
    margin: 0;
  }

  .songs-container .tab-bar .item{
    margin: 0;
  }

  .songs-container .td-title .td-wrap{
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    font-size: 12px;
  }

  .songs-container .td-title .td-wrap:nth-last-child(1){
    padding-left: 5px;
  }

  .el-table td:first-child{
    padding: 0;
  }

  .el-table .song-wrap .icon-mv{
    display: none;
  }

  .el-table .img-wrap{
    width: 100%;
  }
}
</style>
