(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,n,t){e.exports=t(37)},37:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),u=t(14),o=t.n(u),c=t(2),l=t(3),i=function(e){var n=e.value,t=e.onChange;return r.a.createElement("form",null,"filter shown with ",r.a.createElement("input",{value:n,onChange:t}))},m=function(e){var n=e.addPerson,t=e.nameValue,a=e.nameOnChange,u=e.numberValue,o=e.numberOnChange;return r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:t,onChange:a})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:u,onChange:o})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))},d=function(e){var n=e.person,t=e.handleRemove;return r.a.createElement("div",null,r.a.createElement("li",null,n.name," ",n.number,r.a.createElement("button",{onClick:t},"Delete")))},f=function(e){var n=e.alert;if(null===n)return null;var t={background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:10,marginBottom:10},a=Object(c.a)(Object(c.a)({},t),{},{color:"red"}),u=Object(c.a)(Object(c.a)({},t),{},{color:"green"});return"error"===n.type?r.a.createElement("div",{style:a},n.message):r.a.createElement("div",{style:u},n.message)},s=t(4),b=t.n(s),h="/api/persons",p=function(){return b.a.get(h).then((function(e){return e.data}))},v=function(e){return b.a.post(h,e).then((function(e){return e.data}))},g=function(e,n){return b.a.put("".concat(h,"/").concat(e),n).then((function(e){return e.data}))},E=function(e){return b.a.delete("".concat(h,"/").concat(e)).then((function(e){return e.data}))},O=function(){var e=Object(a.useState)([]),n=Object(l.a)(e,2),t=n[0],u=n[1],o=Object(a.useState)(""),s=Object(l.a)(o,2),b=s[0],h=s[1],O=Object(a.useState)(""),j=Object(l.a)(O,2),w=j[0],y=j[1],C=Object(a.useState)(""),k=Object(l.a)(C,2),S=k[0],V=k[1],D=Object(a.useState)(null),P=Object(l.a)(D,2),R=P[0],T=P[1];Object(a.useEffect)((function(){p().then((function(e){u(e)}))}),[]);var B=S?t.filter((function(e){return e.name.toLowerCase().includes(S.toLowerCase())})):t;return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(f,{alert:R}),r.a.createElement(i,{value:S,onChange:function(e){V(e.target.value)}}),r.a.createElement("h2",null,"add a new"),r.a.createElement(m,{addPerson:function(e){e.preventDefault();var n={name:b,number:w},a=t.find((function(e){return e.name===n.name}));a?window.confirm("".concat(a.name," is already added to the phonebook, replace their old number with the new one?"))&&g(a.id,Object(c.a)(Object(c.a)({},a),{},{number:n.number})).then((function(e){u(t.map((function(n){return n.id!==e.id?n:e})))})).catch((function(e){T({message:"Information of ".concat(a.name," was already removed from the server"),type:"error"}),u(t.filter((function(e){return e.id!==a.id}))),setTimeout((function(){T(null)}),5e3)})):v(n).then((function(e){u(t.concat(e)),T({message:"Added ".concat(e.name),type:"notification"}),setTimeout((function(){T(null)}),5e3)})).catch((function(e){console.log(e),T({message:e.response.data,type:"error"}),setTimeout((function(){T(null)}),5e3)}))},nameValue:b,nameOnChange:function(e){h(e.target.value)},numberValue:w,numberOnChange:function(e){y(e.target.value)}}),r.a.createElement("h2",null,"Numbers"),r.a.createElement("ul",null,B.map((function(e){return r.a.createElement(d,{key:e.name,person:e,handleRemove:function(){return function(e){window.confirm("Delete ".concat(e.name,"?"))&&E(e.id).then((function(){u(t.filter((function(n){return n.id!==e.id})))}))}(e)}})}))))};o.a.render(r.a.createElement(O,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.928bd367.chunk.js.map