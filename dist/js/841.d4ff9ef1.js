"use strict";(self["webpackChunkcloud_music"]=self["webpackChunkcloud_music"]||[]).push([[841],{1841:function(t,s,a){a.r(s),a.d(s,{default:function(){return c}});var e=function(){var t=this,s=t._self._c;return s("div",{staticClass:"mv-container"},[s("div",{staticClass:"mv-wrap"},[s("h3",[t._v("MV详情")]),s("div",{staticClass:"video-wrap"},[s("video",{attrs:{controls:"",src:t.mvUrl}},[t._v(" 抱歉，您的浏览器不支持内嵌视频，不过不用担心，你可以 "),s("a",{attrs:{href:"https://www.baidu.com"}},[t._v("下载")]),t._v(" 并用你喜欢的播放器观看! ")])]),s("div",{staticClass:"info-wrap"},[s("div",{staticClass:"singer-info"},[s("div",{staticClass:"avatar-wrap"},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.artistAvatarUrl,expression:"artistAvatarUrl"}],attrs:{alt:""}})]),s("span",{staticClass:"name"},[t._v(t._s(t.mvInfo.artistName))])]),s("div",{staticClass:"mv-info"},[s("h2",{staticClass:"title"},[t._v(t._s(t.mvInfo.name))]),s("span",{staticClass:"date"},[t._v("发布："+t._s(t.mvInfo.publishTime))]),s("span",{staticClass:"number"},[t._v("播放："+t._s(t.mvInfo.playCount)+" 次")]),s("p",{staticClass:"desc"},[t._v(t._s(t.mvInfo.desc))])])]),0!=t.hotComments.length?s("div",{staticClass:"comment-wrap"},[s("p",{staticClass:"title"},[t._v(" 热门评论"),s("span",{staticClass:"number"},[t._v("("+t._s(t.hotComments.length)+") ")])]),s("div",{staticClass:"comments-wrap"},t._l(t.hotComments,(function(a,e){return s("div",{key:e,staticClass:"item"},[s("div",{staticClass:"icon-wrap"},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:a.user.avatarUrl,expression:"item.user.avatarUrl"}],attrs:{alt:""}})]),s("div",{staticClass:"content-wrap"},[s("div",{staticClass:"content"},[s("span",{staticClass:"name"},[t._v(t._s(a.user.nickname)+"：")]),s("span",{staticClass:"comment"},[t._v(t._s(a.content))])]),0!=a.beReplied.length?s("div",{staticClass:"re-content"},[s("span",{staticClass:"name"},[t._v(t._s(a.beReplied[0].user.nickname)+"：")]),s("span",{staticClass:"comment"},[t._v(t._s(a.beReplied[0].content))])]):t._e(),s("div",{staticClass:"date"},[t._v(t._s(t._f("LocaleString")(a.time)))]),s("span",{staticClass:"iconfont icon-zan float-right"},[t._v(t._s(a.likedCount))])])])})),0)]):t._e(),s("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loadingComments,expression:"loadingComments"}],staticClass:"comment-wrap"},[s("p",{staticClass:"title"},[t._v(" 最新评论"),s("span",{staticClass:"number"},[t._v("("+t._s(this.total)+")")])]),s("div",{staticClass:"comments-wrap"},t._l(t.comments,(function(a,e){return s("div",{key:e,staticClass:"item"},[s("div",{staticClass:"icon-wrap"},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:a.user.avatarUrl,expression:"item.user.avatarUrl"}],attrs:{alt:""}})]),s("div",{staticClass:"content-wrap"},[s("div",{staticClass:"content"},[s("span",{staticClass:"name"},[t._v(" "+t._s(a.user.nickname)+" ：")]),s("span",{staticClass:"comment"},[t._v(t._s(a.content))])]),a.beReplied[0]?s("div",{staticClass:"re-content"},[s("span",{staticClass:"name"},[t._v(t._s(a.beReplied[0].user.nickname)+"：")]),s("span",{staticClass:"comment"},[t._v(t._s(a.beReplied[0].content))])]):t._e(),s("div",{staticClass:"date"},[t._v(t._s(t._f("LocaleString")(a.time)))])])])})),0),s("el-pagination",{attrs:{"hide-on-single-page":!0,background:"","current-page":t.page,"page-sizes":[5,10,20,30,50,100],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.total},on:{"current-change":t.handleCurrentChange}})],1)]),s("div",{staticClass:"mv-recommend"},[s("h3",{staticClass:"title"},[t._v("相关推荐")]),s("div",{staticClass:"mvs"},[s("div",{staticClass:"items"},t._l(t.recommendMvs,(function(a,e){return s("div",{key:e,staticClass:"item",on:{click:function(s){return t.toMvDetail(a.id)}}},[s("div",{staticClass:"img-wrap"},[s("img",{directives:[{name:"lazy",rawName:"v-lazy",value:a.cover,expression:"item.cover"}],attrs:{alt:""}}),s("span",{staticClass:"iconfont icon-play"}),s("div",{staticClass:"num-wrap"},[s("div",{staticClass:"iconfont icon-play"}),s("div",{staticClass:"num"},[t._v(t._s(t._f("ellipsisPlayVolume")(a.playCount)))])]),s("span",{staticClass:"time"},[t._v(t._s(t._f("formatDuration")(a.duration)))])]),s("div",{staticClass:"info-wrap"},[s("div",{staticClass:"name"},[t._v(t._s(a.name))]),s("div",{staticClass:"singer"},[t._v(t._s(a.artistName))])])])})),0)])])])},i=[],n=(a(7467),a(2413)),l={name:"mv",data(){return{mvId:"",mvUrl:"",recommendMvs:[],mvInfo:{},artistAvatarUrl:"",hotComments:[],comments:[],total:0,pageSize:10,page:1,loading:!0,loadingComments:!1}},watch:{$route(t){this.searchMV(t.query.q)}},created(){let t=this.$route.query.q;this.mvId=t,this.searchMV(t)},methods:{toMvDetail(t){this.$router.push(`/mv?q=${t}`)},handleCurrentChange(t){this.page=t,this.getComments()},getComments(){this.loadingComments=!0;let t={id:this.$route.query.q,limit:this.pageSize,offset:(this.page-1)*this.pageSize};(0,n.hE)(t,"mv").then((t=>{Object.prototype.hasOwnProperty.call(t.data,"hotComments")&&(this.hotComments=t.data.hotComments),this.comments=t.data.comments,this.total=this.mvInfo.commentCount-this.hotComments.length})).then((()=>{this.loadingComments=!1}))},searchMV(t){this.loading=!0;let s={id:t};(0,n.Tz)(s).then((t=>{this.mvUrl=t.data.data.url})),(0,n.FR)({mvid:t}).then((t=>{this.recommendMvs=t.data.mvs})),(0,n.Uw)({mvid:t}).then((t=>{this.mvInfo=t.data.data,this.GetArtistDetail(this.mvInfo.artists[0].id),this.getComments()})).then((()=>{this.loading=!1}))},GetArtistDetail(t){(0,n.Ik)({id:t},"detail").then((t=>{this.artistAvatarUrl=t.data.data.artist.cover}))}}},r=l,m=a(2349),o=(0,m.Z)(r,e,i,!1,null,null,null),c=o.exports}}]);
//# sourceMappingURL=841.d4ff9ef1.js.map