<template>
  <div class="result-container" element-loading-background="rgba(0, 0, 0, 0)">
    <div class="title-wrap">
      <!-- 标题 -->
      <h2 class="title">{{ keywords  }}</h2>
      <span class="sub-title">找到 {{ total }} 个结果</span>
    </div>

    <el-tabs v-model="activeName" @tab-click="handleClick" >
      <el-tab-pane label="歌曲" name="first">
        <table class="el-table">
          <!-- 这里是表头  -->
          <thead>
            <!-- 表头单元格 -->
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <!-- 表身体部分，tr表示HTML表格中的一行。 -->          
          <tbody>
            <!-- 双击播放音乐 -->
            <tr v-for="(item, index) in songsList" :key="index" class="el-table__row" 
            @dblclick="PlayMusic(item)">
            <td>{{pageSize * (page - 1) +  index+1}}</td>
            <td>
              <div class="song-wrap">
                <div class="name-wrap">
                  <!-- 歌名 / mv图标 -->
                  <div class="first-title">{{item.name}}<span v-if="item.mvid != 0" class="iconfont icon-mv" ></span></div>
                  <!-- 二级标题 -->
                  <div v-if="item.alia.length != 0" class="second-title">{{ item.alia[0] }}</div>
                </div>
              </div>
            </td>
                <!-- 歌手 -->
                <td class="td-title">
                  <div class="td-wrap">
                    {{ item.ar[0].name }}
                  </div>
                </td>
                <!-- 专辑名 -->
                <td class="td-title">
                  <div class="td-wrap">
                    {{ item.al.name }}
                  </div>
                </td>
                <!-- 时长 -->
                <td class="td-title">
                  <div class="td-wrap">
                    {{ item.dt | formatDuration }}
                  </div>
                </td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>

      <!-- 歌单处 -->
      <el-tab-pane label="歌单" name="second">
        <div class="items">
          <div class="item" v-for="(item, index) in playList" :key="index" @click="toPlaylist(item.id)">
            <!-- 图片包，封面 -->
            <div class="img-wrap">
              <!-- 歌单播放量 -->
              <div class="num-wrap">
                播放量:
                <span class="num">{{ item.playCount | ellipsisPlayVolume}}</span>
              </div>
              <!-- 歌单封面 -->
              <img v-lazy ="item.coverImgUrl" alt="" />
              <span class="iconfont icon-play"></span>
            </div>
            <!-- 歌单名字 -->
            <p class="name">{{ item.name }}</p>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="MV" name="third">
        <div class="items mv">
          <div v-for="(item, index) in mvList" :key="index" class="item" @click="toMV(item.id)">
            <div class="img-wrap">
              <!-- 封面 -->
              <img v-lazy ="item.cover" alt="" />
              <span class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <!-- 播放次数 -->
                <div class="num">{{ item.playCount | ellipsisPlayVolume }}</div>
              </div>
              <!-- 持续时间 -->
              <span class="time">{{ item.duration | formatDuration }}</span>
            </div>
            <div class="info-wrap">
              <!-- mv名 -->
              <div class="name">{{ item.name }}</div>
              <!-- 歌手名 -->
              <div class="singer">{{ item.artistName }}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 分页器 -->
      <el-pagination
          :hide-on-single-page="true"
          background
          @current-change="currentPageChange"
          :current-page="page"
          :page-size="pageSize"
          :pager-count="5"
          layout="prev, pager, next"
          :total="total"
        >
      </el-pagination>

  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { searchAPI, getSongUrlAPI, songInfoAPI } from '@/utils/api'

export default {
    name:'result',
    data() {
      return {
        // 搜索关键词
        keywords:'',
        activeName: 'first',
        // 歌曲列表
        songsList: [],
        // 歌单列表
        playList: [],
        // MV列表
        mvList:[],
        // 页码
        page : 1,
        // 总数
        total : 0,
        // 页面获取目标数量
        pageSize:10,
        // 获取类型
        type:1,
        showAddBall:false
      }
    },

    //生命周期钩子 回调函数
    created() {
      this.keywords = this.$route.query.q
      this.getTableData()
    },
    watch:{
        $route(newVal){
            this.keywords = newVal.query.q
            this.total = 0
            this.page = 1                
            this.getTableData(this.type)
        }
    },

    // 获取歌曲、歌单、MV的方法
    methods: {
      // 通过辅助函数把mutations里的函数引用到这里
      ...mapActions(['getAudio']),
      
      // 页码发生变化
      currentPageChange(val) {
        // console.log('页码:',val)
        this.page = val
        this.getTableData(this.type)
      },

      handleClick(tab){
        let label = tab.label
        switch(label){
          case '歌曲':
            this.total = 0
            this.page = 1
            this.type = 1
            this.pageSize = 10
            this.getTableData()
            break;

          case '歌单':
            this.total = 0                    
            this.page = 1                    
            this.type = 1000
            this.pageSize = 10                      
            this.getTableData(this.type)
            break;
          
          case 'MV':
            this.total = 0                    
            this.page = 1                    
            this.type = 1004
            this.pageSize = 8                    
            this.getTableData(this.type)
            break;
        }
      },

      getTableData(type = 1){
        let params = {
          keywords : this.keywords,
          limit : this.pageSize,
          offset : (this.page-1)*this.pageSize,
          type //1歌曲 1000歌单 1004MV  
        }

        // 调用此接口 , 传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户 , 关键词可以多个
        searchAPI(params).then(res => {
          // console.log('搜索',res)
          // 搜索结果列表
          let resultList = []
          switch (type) {
            case 1:
              // 赋值搜索结果列表为歌曲
              resultList = res.data.result.songs
              // 点击最后几页返回的songCount为10会出现bug
              if(this.total == 0)
                this.total = res.data.result.songCount
              // 赋值歌曲列表
              this.songsList = resultList
              break;

            case 1000:
              resultList = res.data.result.playlists
              // 点击最后几页返回的songCount为10会出现bug
              if(this.total == 0)
                this.total = res.data.result.playlistCount
              // 赋值歌单列表
              this.playList = resultList
              break

            case 1004:
              resultList = res.data.result.mvs
              // console.log('搜索到的MV',res)
              // 点击最后几页返回的songCount为10会出现bug
              if(this.total == 0)
                this.total = res.data.result.mvCount
              // 赋值MV列表
              this.mvList = resultList
              break;
          }
        })
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
            songInfoAPI({ids : song.id}).then(res =>{
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

      // 点击跳转到歌单详细页面
      toPlaylist(id){
        // 跳转并携带数据即可
        this.$router.push(`/playlist?q=${id}`)
      },
      // 点击跳转到MV详细页面
      toMV(id){
        this.$router.push(`/mv?q=${id}`)
      },

    },
}

</script>

<style lang="less" scoped>
.result-container {
    position: relative;
    width: 100%;
    height: 100%;
    max-width: 1100px;
    margin: 35px 100px;

    .title-wrap {
      display: flex;
      align-items: center;
      margin-bottom: 20px;

      .title {
        margin-right: 10px;
      }

      .sub-title {
        font-size: 15px;
        color: #bebebe;
      }

    }
    
    .items {
      display: flex;  /* 水平放置item */
      flex-wrap: wrap;  /* 必要时换行 */
      justify-content: flex-start;    

      .item {
        width: 200px;    /* 调整图片大小 */
        cursor: pointer;  /* 游标变成一只手 */
        margin-right: 20px;
        margin-bottom: 20px;

        .img-wrap {
          width: 100%;  /* 图片占满 */
          position: relative;

          >.icon-play {
            position: absolute;
            top: 50%;
            left: 50%;  
            transform: translate(-50%, -50%); /* 设为居中 */
            width: 40px;
            height: 40px;
            color: #dd6d60;
            font-size: 20px;    /* 文字大小 */
            border-radius: 50%;   /* 描边 */
            display: flex;  
            align-items: center;
            justify-content: center;   /* 横轴纵轴居中 */
            background: rgba(255, 255, 255, 0.8);
            opacity: 0;
          }

          &:hover>.icon-play {
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
            align-items: center;
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

        .name {
          font-size: 15px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }

        .singer {
          font-size: 14px;
          color: #c5c5c5;
        }
      }

      .mv .item {
        width: 250px;
      }

    }

    .name-wrap{
      font-size: 15px;
      width: 75%;

      .first-title{
        text-align: left;
      }
    }

    .song-wrap{
      display: flex;
      align-items: center;
      justify-content: center;

      .second-title{
        overflow: hidden;
        display: -webkit-box; 
        -webkit-box-orient : vertical;
        -webkit-line-clamp: 1; /*  最多1行 */
        text-overflow: ellipsis;  /* 多余的文字显示为省略号 */
        font-size: 5px;
        color: #888482;
        text-align: left;
      }
    }
}

@media screen and (max-width : 500px){
    .result-container{
        margin: 20px 0;
    }

    .result-container .name-wrap .first-title{
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        font-size: 12px;
    }

    .result-container .td-title .td-wrap{
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        font-size: 12px;
    }

    .result-container .td-title .td-wrap:nth-last-child(1){
        padding-left: 5px;
    }

    .result-container .el-table th:nth-last-child(1){
        padding-left: 5px;
    }
    .result-container .items{
        justify-content: center;
    }

    .result-container .items .item{
        width: 120px;
        margin: 20px;
    }

}

@media screen and (max-width : 380px){
    .result-container .items .item{
        margin: 10px;
    }
}


</style>

