(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{174:function(e,t,a){e.exports=a(273)},273:function(e,t,a){"use strict";a.r(t);a(175),a(201),a(203),a(204),a(206),a(207),a(208),a(209),a(210),a(211),a(212),a(213),a(215),a(216),a(217),a(218),a(219),a(220),a(221),a(222),a(223),a(224),a(226),a(227),a(228),a(229),a(230),a(231),a(232),a(233),a(234),a(235),a(236),a(237),a(238),a(239),a(240),a(241),a(242),a(243);var n=a(0),l=a.n(n),c=a(105),r=a.n(c),o=a(26),i=a.n(o),u=a(71),d=a.n(u),p=a(106),s=a(17),m=a(114),E=a(21),b=a(46),h=a.n(b),f=(a(252),a(111)),O=a.n(f),v=a(112),y=a.n(v),j=a(8),T=a(53),S=a.n(T),x={view:"preloader",panel:"preloader",activeModal:null},C=function(e,t){switch(t.type){case"SET_VIEW":return Object(E.a)(Object(E.a)({},e),{},{view:t.payload.view,panel:t.payload.panel});case"SET_PANEL":return Object(E.a)(Object(E.a)({},e),{},{panel:t.payload.panel});case"SET_MODAL":return Object(E.a)(Object(E.a)({},e),{},{activeModal:t.payload.modal});default:return e}},w=Object(n.createContext)(),_=function(e){var t=e.children,a=Object(n.useReducer)(C,x);return l.a.createElement(w.Provider,{value:a},t)},g=function(e){return e.habits.map((function(e,t){return l.a.createElement(j.a,{key:t,header:e.title,subheader:l.a.createElement("div",null,l.a.createElement("p",null,"\u0414\u043d\u0435\u0439 \u043f\u043e\u0434\u0440\u044f\u0434: ",l.a.createElement("strong",null,e.daysComplete)," / ",l.a.createElement("strong",null,e.days)),l.a.createElement("p",null,"\u0421\u0442\u0430\u0442\u0443\u0441: ",l.a.createElement("strong",null,"active"===e.status?"\u0410\u043a\u0442\u0438\u0432\u043d\u043e":"\u0412\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u043e"))),mode:"tint",asideMode:"expand"})}))},k=function(e){var t=e.id,a=e.habits,c=Object(n.useContext)(w),r=Object(s.a)(c,2)[1];return l.a.createElement(O.a,{id:t},l.a.createElement(y.a,null,"Example"),l.a.createElement(j.g,null,l.a.createElement(g,{habits:a})),l.a.createElement(j.e,{vertical:"bottom"},l.a.createElement(j.f,null,l.a.createElement(j.c,{onClick:function(){r({type:"SET_MODAL",payload:{modal:"add-habit"}})},before:l.a.createElement(S.a,null)},"\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u0446\u0435\u043b\u044c"))))},I=a(47),A=a.n(I),M=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",a=Object(n.useState)((function(){return localStorage.getItem(e)||t})),l=Object(s.a)(a,2),c=l[0],r=l[1],o=function(t){r(t),localStorage.setItem(e,t)};return[c,o]},V=[{id:1,icon:l.a.createElement(A.a,null),header:"\u0424\u043e\u0440\u043c\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435 \u043f\u0440\u0438\u0432\u044b\u0447\u043a\u0438",buttonText:"\u0414\u0430\u043b\u0435\u0435",placeholderText:"\u0412 \u043f\u0441\u0438\u0445\u043e\u043b\u043e\u0433\u0438\u0438 \u0434\u0430\u0432\u043d\u043e \u0443\u0441\u0442\u0430\u043d\u043e\u0432\u043b\u0435\u043d \u0444\u0430\u043a\u0442, \u0447\u0442\u043e 21 \u0434\u043d\u044f \u0434\u043e\u0441\u0442\u0430\u0442\u043e\u0447\u043d\u043e, \u0447\u0442\u043e\u0431\u044b \u043f\u0440\u0438\u0432\u0438\u0442\u044c \u043d\u043e\u0432\u044b\u0435 \u043f\u0440\u0438\u0432\u044b\u0447\u043a\u0438 (\u0438\u0437\u0431\u0430\u0432\u0438\u0442\u044c\u0441\u044f \u043e\u0442 \u0441\u0442\u0430\u0440\u044b\u0445) \u0438 \u0442\u0430\u043a\u0438\u043c \u043e\u0431\u0440\u0430\u0437\u043e\u043c \u0443\u043b\u0443\u0447\u0448\u0438\u0442\u044c \u043a\u0430\u0447\u0435\u0441\u0442\u0432\u043e \u0436\u0438\u0437\u043d\u0438"},{id:2,icon:l.a.createElement(A.a,null),header:"\u041f\u043e\u0441\u0442\u0430\u0432\u044c\u0442\u0435 \u0446\u0435\u043b\u044c \u0438 \u0438\u0434\u0438\u0442\u0435 \u043a \u043d\u0435\u0439",buttonText:"\u0414\u0430\u043b\u0435\u0435",placeholderText:"\u0421\u043e\u0437\u0434\u0430\u0439\u0442\u0435 \u0432 \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u0438 \u0446\u0435\u043b\u044c (\u043f\u0440\u0438\u0432\u044b\u0447\u043a\u0443, \u043a\u043e\u0442\u043e\u0440\u0443\u044e \u0445\u043e\u0442\u0438\u0442\u0435 \u0438\u0437\u043c\u0435\u043d\u0438\u0442\u044c) \u0438 \u043e\u0442\u043c\u0435\u0447\u0430\u0439\u0442\u0435 \u0435\u0435 \u0443\u0441\u043f\u0435\u0448\u043d\u043e\u0435 \u0435\u0436\u0435\u0434\u043d\u0435\u0432\u043d\u043e\u0435 \u0432\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u0435"},{id:3,icon:l.a.createElement(A.a,null),header:"\u0412 \u0444\u043e\u0440\u043c\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0438 \u043f\u0440\u0438\u0432\u044b\u0447\u043a\u0438 \u0432\u0430\u0436\u043d\u0430 \u0440\u0435\u0433\u0443\u043b\u044f\u0440\u043d\u043e\u0441\u0442\u044c",buttonText:"\u041d\u0430\u0447\u0430\u0442\u044c",placeholderText:"\u0412 \u0441\u043b\u0443\u0447\u0430\u0435 \u043f\u0440\u043e\u043f\u0443\u0441\u043a\u0430 \u0435\u0436\u0435\u0434\u043d\u0435\u0432\u043d\u043e\u0439 \u043e\u0442\u043c\u0435\u0442\u043a\u0438 \u043f\u0440\u043e\u0433\u0440\u0435\u0441\u0441 \u0441\u0431\u0440\u0430\u0441\u044b\u0432\u0430\u0435\u0442\u0441\u044f, \u043d\u043e \u0432\u044b \u043c\u043e\u0436\u0435\u0442\u0435 \u0437\u0430\u043f\u0443\u0441\u0442\u0438\u0442\u044c \u0441\u0447\u0435\u0442\u0447\u0438\u043a \u0441\u043d\u0430\u0447\u0430\u043b\u0430"}],L={placeholder:{id:1,icon:l.a.createElement(A.a,null),header:"\u0424\u043e\u0440\u043c\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u0435 \u043f\u0440\u0438\u0432\u044b\u0447\u043a\u0438",buttonText:"\u0414\u0430\u043b\u0435\u0435",placeholderText:"\u0412 \u043f\u0441\u0438\u0445\u043e\u043b\u043e\u0433\u0438\u0438 \u0434\u0430\u0432\u043d\u043e \u0443\u0441\u0442\u0430\u043d\u043e\u0432\u043b\u0435\u043d \u0444\u0430\u043a\u0442, \u0447\u0442\u043e 21 \u0434\u043d\u044f \u0434\u043e\u0441\u0442\u0430\u0442\u043e\u0447\u043d\u043e, \u0447\u0442\u043e\u0431\u044b \u043f\u0440\u0438\u0432\u0438\u0442\u044c \u043d\u043e\u0432\u044b\u0435 \u043f\u0440\u0438\u0432\u044b\u0447\u043a\u0438 (\u0438\u0437\u0431\u0430\u0432\u0438\u0442\u044c\u0441\u044f \u043e\u0442 \u0441\u0442\u0430\u0440\u044b\u0445) \u0438 \u0442\u0430\u043a\u0438\u043c \u043e\u0431\u0440\u0430\u0437\u043e\u043c \u0443\u043b\u0443\u0447\u0448\u0438\u0442\u044c \u043a\u0430\u0447\u0435\u0441\u0442\u0432\u043e \u0436\u0438\u0437\u043d\u0438"}},W=function(e,t){switch(t.type){case"SET_PLACEHOLDER":return Object(E.a)(Object(E.a)({},e),{},{placeholder:t.payload.placeholder});default:return e}},D=function(e){var t=e.id,a=M("startup-done"),c=Object(s.a)(a,2)[1],r=Object(n.useReducer)(W,L),o=Object(s.a)(r,2),i=o[0].placeholder,u=o[1],d=Object(n.useContext)(w),p=Object(s.a)(d,2)[1];return l.a.createElement(j.m,{id:t},l.a.createElement(j.n,null,"\u0412\u0432\u0435\u0434\u0435\u043d\u0438\u0435"),l.a.createElement(j.p,{icon:i.icon,header:i.header,action:[l.a.createElement(j.d,{key:"action"},l.a.createElement(j.b,{onClick:function(){i.id<3?u({type:"SET_PLACEHOLDER",payload:{placeholder:V[i.id]}}):(p({type:"SET_VIEW",payload:{view:"home",panel:"home"}}),c("true"))}},i.buttonText)),l.a.createElement(j.d,{key:"skip"},3!==i.id&&l.a.createElement(j.b,{mode:"tertiary",onClick:function(){p({type:"SET_VIEW",payload:{view:"home",panel:"home"}}),c("true")}},"\u041f\u0440\u043e\u043f\u0443\u0441\u0442\u0438\u0442\u044c"))]},i.placeholderText))},P=function(e){var t=e.id,a=Object(n.useContext)(w),c=Object(s.a)(a,2)[1],r=M("startup-done"),o=Object(s.a)(r,1)[0];return Object(n.useEffect)((function(){if(o){var e=JSON.parse(o);c(e?{type:"SET_VIEW",payload:{view:"home",panel:"home"}}:{type:"SET_VIEW",payload:{view:"startup",panel:"startup"}})}else c({type:"SET_VIEW",payload:{view:"startup",panel:"startup"}})}),[c,o]),l.a.createElement(j.m,{id:t},l.a.createElement("div",null,"Habit"))},H=a(52),R=a.n(H),B=a(113),J=a.n(B),K=Object(j.s)(),N={habits:[]},U=function(e,t){switch(t.type){case"SET_HABITS":return Object(E.a)(Object(E.a)({},e),{},{habits:[].concat(Object(m.a)(e.habits),[t.payload.habit])});default:return e}},q=function(){var e=Object(n.useContext)(w),t=Object(s.a)(e,2),a=t[0],c=t[1],r=Object(n.useReducer)(U,N),o=Object(s.a)(r,2),u=o[0],m=o[1],E=Object(n.useState)(null),b=Object(s.a)(E,2),f=b[0],O=b[1],v=Object(n.useState)(null),y=Object(s.a)(v,2),T=y[0],x=y[1],C=Object(n.useState)(""),_=Object(s.a)(C,2),g=_[0],I=_[1],A=Object(n.useState)(21),M=Object(s.a)(A,2),V=M[0],L=M[1];Object(n.useEffect)((function(){function e(){return(e=Object(p.a)(d.a.mark((function e(){var t;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.a.send("VKWebAppGetUserInfo");case 2:t=e.sent,O(t),x(null);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}i.a.subscribe((function(e){var t=e.detail,a=t.type,n=t.data;if("VKWebAppUpdateConfig"===a){var l=document.createAttribute("scheme");l.value=n.scheme?n.scheme:"client_light",document.body.attributes.setNamedItem(l)}})),function(){e.apply(this,arguments)}()}),[]);var W=function(){c({type:"SET_MODAL",payload:{modal:null}})},H=l.a.createElement(j.l,{activeModal:a.activeModal,onClose:W},l.a.createElement(j.j,{id:"add-habit",onClose:W,header:l.a.createElement(j.k,{left:K!==j.h&&l.a.createElement(j.o,{onClick:W},l.a.createElement(R.a,null)),right:K===j.h&&l.a.createElement(j.o,{onClick:W},K===j.h?"\u0413\u043e\u0442\u043e\u0432\u043e":l.a.createElement(J.a,null))},"\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u0446\u0435\u043b\u044c")},l.a.createElement(j.f,{onSubmit:function(e){e.preventDefault(),m({type:"SET_HABITS",payload:{habit:{title:g,days:V,lastModified:new Date,daysComplete:0,status:"active"}}}),c({type:"SET_MODAL",payload:{modal:null}}),L(21),I("")}},l.a.createElement(j.i,{required:!0,type:"text",value:g,onChange:function(e){I(e.currentTarget.value)},top:"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0446\u0435\u043b\u0438"}),l.a.createElement(j.r,{min:1,max:21,step:1,value:V,top:"\u041a\u043e\u043b-\u0432\u043e \u0434\u043d\u0435\u0439: ".concat(V),onChange:function(e){L(e)}}),l.a.createElement(j.c,{onClick:function(){},before:l.a.createElement(S.a,null)},"\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u0446\u0435\u043b\u044c"))));return l.a.createElement(j.q,{activeView:a.view},l.a.createElement(h.a,{activePanel:a.panel,id:"preloader"},l.a.createElement(P,{id:"preloader"})),l.a.createElement(h.a,{activePanel:a.panel,id:"startup"},l.a.createElement(D,{id:"startup"})),l.a.createElement(h.a,{activePanel:a.panel,popout:T,id:"home",modal:H},l.a.createElement(k,{id:"home",fetchedUser:f,habits:u.habits})))};i.a.send("VKWebAppInit"),r.a.render(l.a.createElement(_,null,l.a.createElement(q,null)),document.getElementById("root"))}},[[174,1,2]]]);
//# sourceMappingURL=main.e8b05033.chunk.js.map