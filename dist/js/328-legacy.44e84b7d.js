(self["webpackChunkcloud_music"]=self["webpackChunkcloud_music"]||[]).push([[328],{3328:function(t,r,e){"use strict";e.r(r),e.d(r,{default:function(){return f}});var n=function(){var t=this,r=t.$createElement,e=t._self._c||r;return e("div",{staticClass:"playlists-container"},[e("div",{staticClass:"top-card"},[e("div",{staticClass:"icon-wrap"},[e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.topList.coverImgUrl,expression:"topList.coverImgUrl"}],attrs:{alt:""}})]),e("div",{staticClass:"content-wrap"},[e("div",{staticClass:"tag"},[t._v("精品歌单")]),e("div",{staticClass:"title"},[t._v(" "+t._s(t.topList.name)+" ")]),e("div",{staticClass:"info"},[t._v(" "+t._s(t.topList.description)+" ")])]),e("div",[e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.topList.coverImgUrl,expression:"topList.coverImgUrl"}],staticClass:"bg",attrs:{alt:""}}),e("div",{staticClass:"bg-mask"})])]),e("div",{staticClass:"tab-container"},[e("div",{staticClass:"tab-bar"},t._l(t.tags,(function(r,n){return e("span",{key:n,staticClass:"item",class:["item",{active:t.tag==r}],on:{click:function(e){t.tag=r}}},[t._v(t._s(r))])})),0),e("div",{staticClass:"tab-content"},[e("div",{staticClass:"items"},t._l(t.list,(function(r,n){return e("div",{key:n,staticClass:"item"},[e("div",{staticClass:"img-wrap"},[e("div",{staticClass:"num-wrap"},[t._v(" 播放量: "),e("span",{staticClass:"num"},[t._v(t._s(r.playCount))])]),e("img",{directives:[{name:"lazy",rawName:"v-lazy",value:r.coverImgUrl,expression:"item.coverImgUrl"}],attrs:{alt:""},on:{click:function(e){return t.toPlaylist(r.id)}}}),e("span",{staticClass:"iconfont icon-play"})]),e("p",{staticClass:"name"},[t._v(t._s(r.name))])])})),0)]),e("el-pagination",{attrs:{background:"",layout:"prev, pager, next",total:t.total,"current-page":t.page,"page-size":10},on:{"current-change":t.handleCurrentChange}})],1)])},i=[];e(1539);function a(t,r,e,n,i,a,o){try{var s=t[a](o),c=s.value}catch(u){return void e(u)}s.done?r(c):Promise.resolve(c).then(n,i)}function o(t){return function(){var r=this,e=arguments;return new Promise((function(n,i){var o=t.apply(r,e);function s(t){a(o,n,i,s,c,"next",t)}function c(t){a(o,n,i,s,c,"throw",t)}s(void 0)}))}}e(8975),e(6166);var s=e(4859),c={data:function(){return{total:0,page:1,tag:"全部",topList:{},list:[],tags:["全部","欧美","华语","流行","说唱","摇滚","民谣","电子","轻音乐","影视原声","ACG","怀旧","治愈","旅行"]}},watch:{tag:function(){this.topData(),this.listData(),this.page=1}},created:function(){this.topData(),this.listData()},methods:{topData:function(){var t=this;return o(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:(0,s.uS)({limit:1,cat:t.tag}).then((function(r){t.topList=r.data.playlists[0]}));case 1:case"end":return r.stop()}}),r)})))()},listData:function(){var t=this,r={limit:10,offset:10*(this.page-1),cat:this.tag};(0,s.RI)(r).then((function(r){t.total=r.data.total,t.list=r.data.playlists}))},handleCurrentChange:function(t){this.page=t,this.listData()},toPlaylist:function(t){this.$router.push("/playlist?q=".concat(t))}}},u=c,l=e(3736),h=(0,l.Z)(u,n,i,!1,null,null,null),f=h.exports},5837:function(t,r,e){var n=e(2109),i=e(7854);n({global:!0},{globalThis:i})},2443:function(t,r,e){var n=e(7235);n("asyncIterator")},8975:function(t,r,e){t=e.nmd(t);var n=e(7964)["default"];e(2526),e(1817),e(1539),e(2165),e(8783),e(3948),e(2443),e(3680),e(3706),e(2703),e(489),e(8309),e(1703),e(4747),e(7042),e(5837);var i=function(t){"use strict";var r,e=Object.prototype,i=e.hasOwnProperty,a="function"===typeof Symbol?Symbol:{},o=a.iterator||"@@iterator",s=a.asyncIterator||"@@asyncIterator",c=a.toStringTag||"@@toStringTag";function u(t,r,e){return Object.defineProperty(t,r,{value:e,enumerable:!0,configurable:!0,writable:!0}),t[r]}try{u({},"")}catch(T){u=function(t,r,e){return t[r]=e}}function l(t,r,e,n){var i=r&&r.prototype instanceof y?r:y,a=Object.create(i.prototype),o=new N(n||[]);return a._invoke=k(t,e,o),a}function h(t,r,e){try{return{type:"normal",arg:t.call(r,e)}}catch(T){return{type:"throw",arg:T}}}t.wrap=l;var f="suspendedStart",p="suspendedYield",v="executing",d="completed",g={};function y(){}function m(){}function w(){}var b={};u(b,o,(function(){return this}));var L=Object.getPrototypeOf,x=L&&L(L(P([])));x&&x!==e&&i.call(x,o)&&(b=x);var _=w.prototype=y.prototype=Object.create(b);function C(t){["next","throw","return"].forEach((function(r){u(t,r,(function(t){return this._invoke(r,t)}))}))}function E(t,r){function e(a,o,s,c){var u=h(t[a],t,o);if("throw"!==u.type){var l=u.arg,f=l.value;return f&&"object"===n(f)&&i.call(f,"__await")?r.resolve(f.__await).then((function(t){e("next",t,s,c)}),(function(t){e("throw",t,s,c)})):r.resolve(f).then((function(t){l.value=t,s(l)}),(function(t){return e("throw",t,s,c)}))}c(u.arg)}var a;function o(t,n){function i(){return new r((function(r,i){e(t,n,r,i)}))}return a=a?a.then(i,i):i()}this._invoke=o}function k(t,r,e){var n=f;return function(i,a){if(n===v)throw new Error("Generator is already running");if(n===d){if("throw"===i)throw a;return G()}e.method=i,e.arg=a;while(1){var o=e.delegate;if(o){var s=j(o,e);if(s){if(s===g)continue;return s}}if("next"===e.method)e.sent=e._sent=e.arg;else if("throw"===e.method){if(n===f)throw n=d,e.arg;e.dispatchException(e.arg)}else"return"===e.method&&e.abrupt("return",e.arg);n=v;var c=h(t,r,e);if("normal"===c.type){if(n=e.done?d:p,c.arg===g)continue;return{value:c.arg,done:e.done}}"throw"===c.type&&(n=d,e.method="throw",e.arg=c.arg)}}}function j(t,e){var n=t.iterator[e.method];if(n===r){if(e.delegate=null,"throw"===e.method){if(t.iterator["return"]&&(e.method="return",e.arg=r,j(t,e),"throw"===e.method))return g;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return g}var i=h(n,t.iterator,e.arg);if("throw"===i.type)return e.method="throw",e.arg=i.arg,e.delegate=null,g;var a=i.arg;return a?a.done?(e[t.resultName]=a.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=r),e.delegate=null,g):a:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,g)}function O(t){var r={tryLoc:t[0]};1 in t&&(r.catchLoc=t[1]),2 in t&&(r.finallyLoc=t[2],r.afterLoc=t[3]),this.tryEntries.push(r)}function I(t){var r=t.completion||{};r.type="normal",delete r.arg,t.completion=r}function N(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(O,this),this.reset(!0)}function P(t){if(t){var e=t[o];if(e)return e.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var n=-1,a=function e(){while(++n<t.length)if(i.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=r,e.done=!0,e};return a.next=a}}return{next:G}}function G(){return{value:r,done:!0}}return m.prototype=w,u(_,"constructor",w),u(w,"constructor",m),m.displayName=u(w,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var r="function"===typeof t&&t.constructor;return!!r&&(r===m||"GeneratorFunction"===(r.displayName||r.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,w):(t.__proto__=w,u(t,c,"GeneratorFunction")),t.prototype=Object.create(_),t},t.awrap=function(t){return{__await:t}},C(E.prototype),u(E.prototype,s,(function(){return this})),t.AsyncIterator=E,t.async=function(r,e,n,i,a){void 0===a&&(a=Promise);var o=new E(l(r,e,n,i),a);return t.isGeneratorFunction(e)?o:o.next().then((function(t){return t.done?t.value:o.next()}))},C(_),u(_,c,"Generator"),u(_,o,(function(){return this})),u(_,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var r=[];for(var e in t)r.push(e);return r.reverse(),function e(){while(r.length){var n=r.pop();if(n in t)return e.value=n,e.done=!1,e}return e.done=!0,e}},t.values=P,N.prototype={constructor:N,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=r,this.done=!1,this.delegate=null,this.method="next",this.arg=r,this.tryEntries.forEach(I),!t)for(var e in this)"t"===e.charAt(0)&&i.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=r)},stop:function(){this.done=!0;var t=this.tryEntries[0],r=t.completion;if("throw"===r.type)throw r.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(n,i){return s.type="throw",s.arg=t,e.next=n,i&&(e.method="next",e.arg=r),!!i}for(var a=this.tryEntries.length-1;a>=0;--a){var o=this.tryEntries[a],s=o.completion;if("root"===o.tryLoc)return n("end");if(o.tryLoc<=this.prev){var c=i.call(o,"catchLoc"),u=i.call(o,"finallyLoc");if(c&&u){if(this.prev<o.catchLoc)return n(o.catchLoc,!0);if(this.prev<o.finallyLoc)return n(o.finallyLoc)}else if(c){if(this.prev<o.catchLoc)return n(o.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return n(o.finallyLoc)}}}},abrupt:function(t,r){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc<=this.prev&&i.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var a=n;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=r&&r<=a.finallyLoc&&(a=null);var o=a?a.completion:{};return o.type=t,o.arg=r,a?(this.method="next",this.next=a.finallyLoc,g):this.complete(o)},complete:function(t,r){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&r&&(this.next=r),g},finish:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.finallyLoc===t)return this.complete(e.completion,e.afterLoc),I(e),g}},catch:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.tryLoc===t){var n=e.completion;if("throw"===n.type){var i=n.arg;I(e)}return i}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:P(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=r),g}},t}("object"===n(t)?t.exports:{});try{regeneratorRuntime=i}catch(a){"object"===("undefined"===typeof globalThis?"undefined":n(globalThis))?globalThis.regeneratorRuntime=i:Function("r","regeneratorRuntime = r")(i)}}}]);
//# sourceMappingURL=328-legacy.44e84b7d.js.map