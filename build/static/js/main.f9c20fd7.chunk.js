(this.webpackJsonpcrowdrec=this.webpackJsonpcrowdrec||[]).push([[0],{69:function(e,t,a){},70:function(e,t,a){},79:function(e,t,a){"use strict";a.r(t);var n,r,c=a(0),s=a.n(c),i=a(15),l=a.n(i),o=(a(69),a(16)),u=a(17),m=a(20),h=a(19),d=(a(70),a(48)),p=a(41),f=a(10),b=a.n(f),y=a(23),v=a(53),g=a(9),E=a(5),k=a(88),w=a(85),j=a(82),O=a(83),S=a(28),C=a(55),N=a.n(C),x=a(35),R=a(81),T=a(36),P=Object(T.a)(R.a)(n||(n=Object(x.a)(["\n    word-wrap: break-word;\n    text-align: justify;\n    text-justify: inter-word;\n"]))),I=a(89),M=function(e){Object(m.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).state={page:0},n.pageCount=Math.ceil(n.props.bands.length/n.props.perPage),n.handleIncrement=n.handleIncrement.bind(Object(g.a)(n)),n.handleDecrement=n.handleDecrement.bind(Object(g.a)(n)),n}return Object(u.a)(a,[{key:"handleIncrement",value:function(){this.setState({page:(this.state.page+1)%this.pageCount})}},{key:"handleDecrement",value:function(){this.setState({page:Math.abs(this.state.page-1)%this.pageCount})}},{key:"render",value:function(){return s.a.createElement(s.a.Fragment,null,s.a.createElement(j.a,{className:"d-flex justify-content-center"},s.a.createElement("div",{className:"col-8"},this.props.bands.slice(this.state.page*this.props.perPage,Math.min(this.props.bands.length,(this.state.page+1)*this.props.perPage)).map((function(e){return s.a.createElement(I.a,{key:e,className:"text-center p-2 mb-2"},s.a.createElement("h4",null,e))})))),this.pageCount>1?s.a.createElement(j.a,{className:"d-flex justify-content-center"},s.a.createElement(O.a,{className:"col-4",onClick:this.handleIncrement},this.state.page===this.pageCount-1?"Beginning":"Next"," ")):null)}}]),a}(c.Component),D=new N.a,_=function(e){Object(m.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).state={resultReceived:!1,recOutput:{},recItems:[],errorStatus:void 0},n.handleChange=n.handleChange.bind(Object(g.a)(n)),n.handleSubmit=n.handleSubmit.bind(Object(g.a)(n)),n.processResults=n.processResults.bind(Object(g.a)(n)),n.getRecs=n.getRecs.bind(Object(g.a)(n)),n.createPlaylist=n.createPlaylist.bind(Object(g.a)(n)),n.countTracks=n.countTracks.bind(Object(g.a)(n)),n.getRandomTrack=n.getRandomTrack.bind(Object(g.a)(n)),n}return Object(u.a)(a,[{key:"componentDidMount",value:function(){var e=window.location.hash.substring(1).split("&").reduce((function(e,t){if(t){var a=t.split("=");e[a[0]]=decodeURIComponent(a[1])}return e}),{}).access_token;this.props.change({name:"token",value:e})}},{key:"handleChange",value:function(e){this.setState({resultReceived:!1,alert:void 0});var t=e.target,a=t.value,n=t.name;this.setState(Object(v.a)({},n,a)),this.render()}},{key:"handleError",value:function(){var e=Object(y.a)(b.a.mark((function e(t){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:e.t0=t.status,e.next=401===e.t0?3:429===e.t0?5:501===e.t0?7:9;break;case 3:return this.setState({errorStatus:"You don't seem to be authorized. Try clicking the button above to authorize with Spotify and try again.",resultReceived:!1}),e.abrupt("break",10);case 5:return this.setState({errorStatus:"Looks like we're making too many requests to Spotify right now. Wait a little bit and try that again."}),e.abrupt("break",10);case 7:return this.setState({errorStatus:"Spotify's servers are fried! Check out their status, then try again when they're back up"}),e.abrupt("break",10);case 9:console.log(t);case 10:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"isPlaylistValid",value:function(){var e=Object(y.a)(b.a.mark((function e(t,a){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",D.getPlaylistTracks(t).then((function(e){if(void 0!==e){var t,n=Object(p.a)(e.items);try{for(n.s();!(t=n.n()).done;){var r=t.value;if(void 0!==r&&null!==r.track&&r.track.artists[0].name===a)return!0}}catch(c){n.e(c)}finally{n.f()}return!1}})));case 1:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}()},{key:"countTracks",value:function(){var e=Object(y.a)(b.a.mark((function e(t,a,n){var r=this;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return 200,e.abrupt("return",D.getPlaylistTracks(t).then((function(e){var t,r=0,c=Object(p.a)(e.items);try{for(c.s();!(t=c.n()).done;){var s=t.value;if(r>200)break;null!=s.track&&s.track.artists[0].name!==a&&""!==s.track.artists[0].name&&(s.track.artists[0].name in n?n[s.track.artists[0].name]++:n[s.track.artists[0].name]=1),r++}}catch(i){c.e(i)}finally{c.f()}})).catch((function(e){429===e.status&&setTimeout(r.countTracks(t,a,n),500),r.handleError(e)})));case 2:case"end":return e.stop()}}),e)})));return function(t,a,n){return e.apply(this,arguments)}}()},{key:"getRecs",value:function(){var e=Object(y.a)(b.a.mark((function e(t){var a,n,r=this;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a={},n=[],e.next=4,D.searchPlaylists(t,{limit:1}).then(function(){var e=Object(y.a)(b.a.mark((function e(c){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,D.searchPlaylists(t,{limit:50,offset:Math.floor(Math.random()*(c.playlists.total/50))}).then((function(e){var c,s=Object(p.a)(e.playlists.items);try{var i=function(){var e=c.value;n.push(r.isPlaylistValid(e.id,t).then((function(n){return n?r.countTracks(e.id,t,a):null})))};for(s.s();!(c=s.n()).done;)i()}catch(l){s.e(l)}finally{s.f()}}));case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){r.handleError(e)}));case 4:return e.abrupt("return",Promise.all(n).then((function(){return r.setState({recOutput:r.processResults(a),artist:t})})));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"processResults",value:function(e){var t=this,a={};for(var n in e)e[n]>10&&(a[n]=e[n]);var r=Object.fromEntries(Object.entries(a).sort((function(e,t){var a=Object(d.a)(e,2)[1];return Object(d.a)(t,2)[1]-a}))),c=[];for(var s in r)c.push(s);return this.setState({recItems:c}),fetch("https://api64.ipify.org?format=json").then((function(e){return e.json()}),"jsonp").then((function(e){fetch("http://rudiejd.aws.csi.miamioh.edu/final.php?method=logRec&artist=".concat(t.state.artist,"&recommendations=").concat(c.join(","),"&ip=").concat(e.ip),{method:"POST"})})).catch((function(e){return console.log(e)})),r}},{key:"getRandomTrack",value:function(e){var t=this;return D.searchTracks(e,{limit:1}).then((function(t){return D.searchTracks(e,{limit:50})})).then((function(a){if(void 0===a||null===a.tracks)return t.getRandomTrack(e);var n=a.tracks.items.filter((function(t){return t.artists[0].name===e}));return n[Math.floor(Math.random()*n.length)]})).catch((function(a){if(429===a.status)return setTimeout((function(){return console.log("waiting to prevent 429...")}),500),t.getRandomTrack(e);t.handleError(a)}))}},{key:"createPlaylist",value:function(){var e=this,t=[],a=[];Object.keys(this.state.recOutput).forEach(function(){var n=Object(y.a)(b.a.mark((function n(r){return b.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:t.push(e.getRandomTrack(r).then((function(e){return a.push(e.uri)})).catch((function(t){return e.handleError(t)})));case 1:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()),Promise.all(t).then((function(){if(void 0===e.state.errorStatus){var t=[];D.getMe().then((function(t){return D.createPlaylist(t.id,{name:"Recommendations Based on  ".concat(e.state.artist),public:!1})})).then((function(n){a.forEach((function(a){return t.push(D.addTracksToPlaylist(n.id,[a]).catch((function(t){if(429===t.status)return setTimeout((function(){return console.log("waiting to prevent 429...")}),500),D.addTracksToPlaylist(n.id,[a]);e.handleError(t)})))})),e.setState({playlistUrl:n.external_urls.spotify})})),Promise.all(t).then((function(){return e.setState({playlistCreated:!0})}))}}))}},{key:"handleSubmit",value:function(e){var t=this;e.preventDefault(),D.setAccessToken(this.props.vars.token),this.setState({errorStatus:void 0,alert:void 0}),D.searchArtists(this.state.artist).then(function(){var e=Object(y.a)(b.a.mark((function e(a){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.getRecs(a.artists.items[0].name);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).then((function(){void 0===t.state.errorStatus&&(0===Object.keys(t.state.recOutput).length?t.setState({errorStatus:"Unfortunately, we could not find any recommendations for that artist at this time. Feel free to try another one, or try again since recommendations are randomly generated."}):t.setState({resultReceived:!0}))})).catch((function(a){if(429===a.status)return setTimeout((function(){return console.log("waiting to prevent 429...")}),500),t.handleSubmit(e);t.handleError(a)}))}},{key:"render",value:function(){var e=this;return s.a.createElement(s.a.Fragment,null,void 0!==this.state.alert?s.a.createElement(k.a,{className:"alert-success"},s.a.createElement(P,null,this.state.alert,s.a.createElement("br",null),s.a.createElement("a",{href:this.state.playlistUrl},this.state.playlistUrl))):null,void 0!==this.state.errorStatus?s.a.createElement(k.a,{className:"alert-danger"},s.a.createElement(P,null,this.state.errorStatus)):null,this.state.resultReceived?null:s.a.createElement("div",{className:"p-lg-5"},s.a.createElement("h1",{className:"mb-5 text-center"},"Enter artist's name for recommendations"),s.a.createElement(w.a,{onSubmit:this.handleSubmit},s.a.createElement(w.a.Group,{className:"d-flex justify-content-center"},s.a.createElement(w.a.Control,{type:"text",placeholder:"Iron Maiden",name:"artist",className:"w-50",onChange:this.handleChange,required:!0})),s.a.createElement(w.a.Group,{className:"d-flex justify-content-center"},s.a.createElement(w.a.Control,{type:"submit",className:"w-25 bg-primary text-light",value:"Go!"})))),s.a.createElement("div",null,this.state.resultReceived?s.a.createElement("h1",{className:"mb-2 text-center"},"Since you like ",this.state.artist,", you might like:"):null,this.state.resultReceived?s.a.createElement(M,{bands:this.state.recItems,perPage:5}):null,s.a.createElement(j.a,{className:"d-flex justify-content-center"},this.state.resultReceived?this.state.playlistCreated?s.a.createElement(O.a,{className:"bg-success mt-3",onClick:function(){window.location.href=e.state.playlistUrl}}," Playlist created! Click to open it up."):s.a.createElement(O.a,{className:"mt-3",onClick:this.createPlaylist},"Create a playlist with songs from these artists"):null)))}}]),a}(c.Component),U=Object(E.f)(Object(S.b)((function(e){return{vars:e.vars}}),(function(e){return{change:function(t){return e({type:"CHANGE",name:t})}}}))(_)),A=function(e){Object(m.a)(a,e);var t=Object(h.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).state={isAuthenticatedWithSpotify:!1},n.state.handleRedirect=n.handleRedirect.bind(Object(g.a)(n)),n}return Object(u.a)(a,[{key:"componentDidMount",value:function(){var e=window.location.hash.substring(1).split("&").reduce((function(e,t){if(t){var a=t.split("=");e[a[0]]=decodeURIComponent(a[1])}return e}),{}).access_token;this.props.change({name:"token",value:e})}},{key:"handleRedirect",value:function(e){e.preventDefault();var t="https://accounts.spotify.com/authorize?response_type=token&client_id=3f31f6d13b974219a7093698a47d76f9&scope="+encodeURIComponent("user-read-private%20playlist-modify-public%20playlist-modify-private")+"&redirect_uri="+encodeURIComponent("https://crowdrec.rudiejd.io");window.location=t}},{key:"render",value:function(){var e=this;return s.a.createElement(O.a,{className:"sp_button mt-4",onClick:function(t){return e.handleRedirect(t)}},"Link spotify to get started")}}]),a}(c.Component),F=Object(S.b)((function(e){return{vars:e.vars}}),(function(e){return{change:function(t){return e({type:"CHANGE",name:t})}}}))(A),G=function(){return-1===window.location.href.indexOf("access")?s.a.createElement(s.a.Fragment,null,s.a.createElement(R.a,{className:"p-lg-5"},s.a.createElement(P,{className:"p-lg-5"},s.a.createElement("h1",{className:"mb-4"},"Crowd-sourced Spotify recommendations"),s.a.createElement("p",{className:"lead"},"Unsatisfied with your spotify recommendations? I was too; that's why I made this website. This site delivers recommendations based on",s.a.createElement("b",null," playlist adjacency")," above all. That is, I give you a set of new artists who appear in playlists with a given artist at a high frequency, all ranked by the number of times they are in the same playlists as the artist you entered."),s.a.createElement(F,null)))):s.a.createElement(R.a,{className:"p-5"},s.a.createElement(U,null))},J=a(61),B=a(84),H=function(){return s.a.createElement("form",{action:"https://www.paypal.com/cgi-bin/webscr",method:"post",target:"_top"},s.a.createElement("input",{type:"hidden",name:"cmd",value:"_donations"}),s.a.createElement("input",{type:"hidden",name:"business",value:"jdrudienoy@gmail.com"}),s.a.createElement("input",{type:"hidden",name:"item_name",value:"Donations for upkeep my website, CrowdRec"}),s.a.createElement("input",{type:"hidden",name:"currency_code",value:"USD"}),s.a.createElement("input",{type:"image",src:"https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif",border:"0",name:"submit",title:"PayPal - The safer, easier way to pay online!",alt:"Donate with PayPal button"}),s.a.createElement("img",{alt:"",border:"0",src:"https://www.paypal.com/en_US/i/scr/pixel.gif",width:"1",height:"1"}))},W=function(){return s.a.createElement(s.a.Fragment,null,s.a.createElement(R.a,null,s.a.createElement(j.a,null,s.a.createElement(J.a,{xs:12},s.a.createElement("header",{className:"text-center"},s.a.createElement("h1",{className:"font-weight-bold text-white"},"Hi, I'm JD Rudie.")))),s.a.createElement(j.a,null,s.a.createElement(J.a,null,s.a.createElement(P,null,s.a.createElement(B.a,{src:"https://i.pinimg.com/originals/10/71/a6/1071a68d76b0673337b84c84d37c8100.gif",className:"float-md-left",alt:"Old school computer"}),s.a.createElement("p",null,"I am a junior Mathematics and Computer Science student at Miami University in Oxford, Ohio. I intern at Wolfram Research in the Enterprise Data Analysis department."),s.a.createElement("p",null,"I've been enthusiastic about music my whole life. Some of my all time favorites are David Bowie, Run The Jewels, Sufjan Stevens, MF DOOM, OutKast, Parquet Courts, Deafheaven, Megadeth, and Fiona Apple. "),s.a.createElement("p",null,"My social media is linked below just in case you're feeling like donating some clout. I also greatly appreciate PayPal donos since I'm a struggling college student.")))),s.a.createElement(j.a,{className:"mt-lg-5"},s.a.createElement(J.a,{lg:4,align:"center"},s.a.createElement("a",{href:"https://github.com/rudiejd"},s.a.createElement(B.a,{src:"github.png",alt:"My GitHub"}))),s.a.createElement(J.a,{align:"center"},s.a.createElement("a",{href:"https://open.spotify.com/user/rudebowski"},s.a.createElement(B.a,{src:"spotify.svg",width:"120",height:"120",alt:"My Spotify"}))),s.a.createElement(J.a,{align:"center"},s.a.createElement("a",{href:"https://instagram.com/jd_rude"},s.a.createElement(B.a,{src:"insta.svg",width:"120",height:"120",alt:"My Instagram"})))),s.a.createElement(j.a,{className:"d-flex justify-content-center mt-5"},s.a.createElement(H,null))))},z=function(){return s.a.createElement("div",null,s.a.createElement("h1",null,"We could not find that page. Instead, here's a picture of Ozzy Osbourne."))},q=a(27),L=a(87),V=a(86),K=T.a.div(r||(r=Object(x.a)(["\nbackground-color:green;\n"]))),Y=function(){return s.a.createElement(K,null,s.a.createElement(L.a,{expand:"lg",className:"navbar-dark bg-primary"},s.a.createElement(R.a,null,s.a.createElement(L.a.Brand,{href:"/"},"CrowdRec"),s.a.createElement(L.a.Toggle,{"aria-controls":"navbar-nav"}),s.a.createElement(L.a.Collapse,{id:"navbar-nav"},s.a.createElement(V.a,{className:"ml-auto"},s.a.createElement(V.a.Item,null,s.a.createElement(q.b,{to:"/",className:"nav-link"},"Home")),s.a.createElement(V.a.Item,null,s.a.createElement(q.b,{to:"/about",className:"nav-link"},"About")))))))},$=function(e){Object(m.a)(a,e);var t=Object(h.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"render",value:function(){return s.a.createElement(s.a.Fragment,null,s.a.createElement(q.a,{basename:"".concat("/crowdrec.rudiejd.io","/")},s.a.createElement(Y,null),s.a.createElement("main",{role:"main",className:"mb-auto d-flex justify-content-center"},s.a.createElement(E.c,null,s.a.createElement(E.a,{exact:!0,path:"/",component:G}),s.a.createElement(E.a,{exact:!0,path:"/about",component:W}),s.a.createElement(E.a,{component:z})))),s.a.createElement("footer",{className:"border-top text-center"},s.a.createElement(P,null,s.a.createElement("p",{className:"text-center"},"CopyLeft 2020 JD Rudie"))))}}]),a}(c.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Q={vars:{}},X=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Q,t=arguments.length>1?arguments[1]:void 0,a=JSON.parse(JSON.stringify(e));return"CHANGE"===t.type&&(a.vars[t.name.name]=t.name.value),a},Z=a(34),ee=Object(Z.b)(X);l.a.render(s.a.createElement(s.a.StrictMode,null,s.a.createElement(S.a,{store:ee}," ",s.a.createElement($,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[79,1,2]]]);
//# sourceMappingURL=main.f9c20fd7.chunk.js.map