"use strict";(self["webpackChunkcloud_music"]=self["webpackChunkcloud_music"]||[]).push([[360],{8360:function(t,a,s){s.r(a),s.d(a,{default:function(){return h}});var i=function(){var t=this,a=t._self._c;return a("div",{staticClass:"songs-container"},[a("div",{staticClass:"tab-bar"},[a("span",{staticClass:"item",class:{active:0==t.tag},on:{click:function(a){t.tag=0}}},[t._v(" 全部 ")]),a("span",{staticClass:"item",class:{active:7==t.tag},on:{click:function(a){t.tag=7}}},[t._v(" 华语 ")]),a("span",{staticClass:"item",class:{active:96==t.tag},on:{click:function(a){t.tag=96}}},[t._v(" 欧美 ")]),a("span",{staticClass:"item",class:{active:8==t.tag},on:{click:function(a){t.tag=8}}},[t._v(" 日本 ")]),a("span",{staticClass:"item",class:{active:16==t.tag},on:{click:function(a){t.tag=16}}},[t._v(" 韩国 ")])]),a("table",{staticClass:"el-table playlit-table"},[t._m(0),a("tbody",{staticClass:"table-body"},t._l(t.lists,(function(s,i){return a("tr",{key:i,staticClass:"el-table__row",on:{dblclick:function(a){return t.PlayMusic(s)}}},[a("td",[t._v(t._s(i+1))]),a("td",[a("div",{staticClass:"img-wrap"},[a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:s.album.picUrl,expression:"item.album.picUrl"}],attrs:{alt:""}}),a("span",{staticClass:"iconfont icon-play",on:{click:function(a){return t.PlayMusic(s)}}})])]),a("td",[a("div",{staticClass:"song-wrap"},[a("div",{staticClass:"name-wrap"},[a("span",[t._v(t._s(s.name))]),a("span",{staticClass:"iconfont icon-mv"})]),a("span")])]),a("td",{staticClass:"td-title"},[t._v(t._s(s.album.artists["0"].name))]),a("td",{staticClass:"td-title"},[t._v(t._s(s.album.name))]),a("td",{staticClass:"td-title"},[t._v(t._s(t._f("formatDuration")(s.duration)))])])})),0)]),a("div",{staticClass:"song-page"},[a("el-pagination",{attrs:{"hide-on-single-page":!0,background:"","current-page":t.page,"page-sizes":[5,10,15,20,30],"page-size":10,layout:"total, prev, pager, next, jumper",total:100},on:{"current-change":t.handleCurrentChange}})],1)])},e=[function(){var t=this,a=t._self._c;return a("thead",[a("th",{staticClass:"th-title"}),a("th",{staticClass:"th-title"}),a("th",{staticClass:"th-title"},[t._v("音乐标题")]),a("th",{staticClass:"th-title"},[t._v("歌手")]),a("th",{staticClass:"th-title"},[t._v("专辑")]),a("th",{staticClass:"th-title"},[t._v("时长")])])}],l=s(6294),n=s(2413),c=s(2259),o={name:"songs",data(){return{lists:[],tag:"0",page:1,start:0,end:10}},computed:{...(0,l.mapGetters)(["nowSongDetail"])},watch:{tag(){this.getList(),this.page=1}},created(){this.getList()},methods:{getList(){let t={type:this.tag,limit:10,offset:1};(0,n.Dh)(t).then((t=>{this.lists=t.data.data.slice(this.start,this.end)}))},PlayMusic(t){(0,c.TS)(t.id).then((a=>{null!=a.data.data[0].url?(this.$store.dispatch("saveSongUrl",a.data.data[0].url),(0,c.Pc)(t.id).then((t=>{console.log("detail",t),this.$store.dispatch("changePlayState",!0),this.$store.dispatch("saveSongDetail",t.data.songs[0]),this.$store.dispatch("addPlayinglist",t.data.songs[0])}))):this.$message({message:"暂时没有版权播放，换首试试",type:"warning",center:!0})})).catch((t=>{console.log(t),this.$message({message:"暂时没有版权播放，换首试试",type:"warning",center:!0})}))},handleCurrentChange(t){this.start=10*(t-1),this.end=10*t,this.page=t,this.getList()}}},r=o,g=s(2349),d=(0,g.Z)(r,i,e,!1,null,null,null),h=d.exports}}]);
//# sourceMappingURL=360.2a59444c.js.map