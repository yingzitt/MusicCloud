"use strict";(self["webpackChunkcloud_music"]=self["webpackChunkcloud_music"]||[]).push([[309],{5309:function(t,a,s){s.r(a),s.d(a,{default:function(){return h}});var i=function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"songs-container"},[s("div",{staticClass:"tab-bar"},[s("span",{staticClass:"item",class:{active:0==t.tag},on:{click:function(a){t.tag=0}}},[t._v(" 全部 ")]),s("span",{staticClass:"item",class:{active:7==t.tag},on:{click:function(a){t.tag=7}}},[t._v(" 华语 ")]),s("span",{staticClass:"item",class:{active:96==t.tag},on:{click:function(a){t.tag=96}}},[t._v(" 欧美 ")]),s("span",{staticClass:"item",class:{active:8==t.tag},on:{click:function(a){t.tag=8}}},[t._v(" 日本 ")]),s("span",{staticClass:"item",class:{active:16==t.tag},on:{click:function(a){t.tag=16}}},[t._v(" 韩国 ")])]),s("table",{staticClass:"el-table playlit-table"},[t._m(0),s("tbody",{staticClass:"table-body"},t._l(t.lists,(function(a,i){return s("tr",{key:i,staticClass:"el-table__row",on:{dblclick:function(s){return t.PlayMusic(a)}}},[s("td",[t._v(t._s(i+1))]),s("td",[s("div",{staticClass:"img-wrap"},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:a.album.picUrl,expression:"item.album.picUrl"}],attrs:{alt:""}}),s("span",{staticClass:"iconfont icon-play",on:{click:function(s){return t.PlayMusic(a)}}})])]),s("td",[s("div",{staticClass:"song-wrap"},[s("div",{staticClass:"name-wrap"},[s("span",[t._v(t._s(a.name))]),s("span",{staticClass:"iconfont icon-mv"})]),s("span")])]),s("td",{staticClass:"td-title"},[t._v(t._s(a.album.artists["0"].name))]),s("td",{staticClass:"td-title"},[t._v(t._s(a.album.name))]),s("td",{staticClass:"td-title"},[t._v(t._s(t._f("formatDuration")(a.duration)))])])})),0)]),s("div",{staticClass:"song-page"},[s("el-pagination",{attrs:{"hide-on-single-page":!0,background:"","current-page":t.page,"page-sizes":[5,10,15,20,30],"page-size":10,layout:"total, prev, pager, next, jumper",total:100},on:{"current-change":t.handleCurrentChange}})],1)])},e=[function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("thead",[s("th",{staticClass:"th-title"}),s("th",{staticClass:"th-title"}),s("th",{staticClass:"th-title"},[t._v("音乐标题")]),s("th",{staticClass:"th-title"},[t._v("歌手")]),s("th",{staticClass:"th-title"},[t._v("专辑")]),s("th",{staticClass:"th-title"},[t._v("时长")])])}],n=s(4367),c=(s(7042),s(2741)),l=s(4859),o=s(9059),r={name:"songs",data:function(){return{lists:[],tag:"0",page:1,start:0,end:10}},computed:(0,n.Z)({},(0,c.Se)(["nowSongDetail"])),watch:{tag:function(){this.getList(),this.page=1}},created:function(){this.getList()},methods:{getList:function(){var t=this,a={type:this.tag,limit:10,offset:1};(0,l.Dh)(a).then((function(a){t.lists=a.data.data.slice(t.start,t.end)}))},PlayMusic:function(t){var a=this;(0,o.TS)(t.id).then((function(s){null!=s.data.data[0].url?(a.$store.dispatch("saveSongUrl",s.data.data[0].url),(0,o.Pc)(t.id).then((function(t){console.log("detail",t),a.$store.dispatch("changePlayState",!0),a.$store.dispatch("saveSongDetail",t.data.songs[0]),a.$store.dispatch("addPlayinglist",t.data.songs[0])}))):a.$message({message:"暂时没有版权播放，换首试试",type:"warning",center:!0})})).catch((function(t){console.log(t),a.$message({message:"暂时没有版权播放，换首试试",type:"warning",center:!0})}))},handleCurrentChange:function(t){this.start=10*(t-1),this.end=10*t,this.page=t,this.getList()}}},u=r,g=s(3736),d=(0,g.Z)(u,i,e,!1,null,null,null),h=d.exports}}]);
//# sourceMappingURL=309-legacy.40586f12.js.map