(this["webpackJsonpphonebook-frontend"]=this["webpackJsonpphonebook-frontend"]||[]).push([[0],{41:function(e,t,n){},42:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n(1),c=n(16),u=n.n(c),o=n(2),s=n.n(o),i=n(4),l=n(5),p=function(e){return Object(r.jsx)("button",{onClick:e.handleClick,children:e.text})},d=function(e){var t=e.newName,n=e.handleNameChange,a=e.newNumber,c=e.handleNumberChange,u=e.addPerson;return Object(r.jsxs)("form",{children:[Object(r.jsxs)("div",{children:["Name: ",Object(r.jsx)("input",{type:"text",value:t,onChange:n}),"Number: ",Object(r.jsx)("input",{type:"text",value:a,onChange:c})]}),Object(r.jsx)("div",{children:Object(r.jsx)(p,{text:"Add",handleClick:u})})]})},f=function(e){var t=e.filteredContacts,n=e.deleteContact;return t.map((function(e){return Object(r.jsxs)("p",{children:[e.name," ",e.number," ",Object(r.jsx)(p,{text:"Delete",handleClick:function(){return n(e.name,e.id)}})," "]},e.id)}))},h=function(e){var t=e.query,n=e.handleSearchChange;return Object(r.jsxs)("div",{children:["Filter shown with: ",Object(r.jsx)("input",{type:"text",value:t,onChange:n})]})},b=function(e){var t=e.message;return null===t?null:Object(r.jsx)("div",{className:t.type,children:t.text})},j=n(6),x=n.n(j),v="/api/persons";function O(){return(O=Object(i.a)(s.a.mark((function e(){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.a.get(v);case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function m(){return(m=Object(i.a)(s.a.mark((function e(t){var n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.a.post(v,t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function w(){return(w=Object(i.a)(s.a.mark((function e(t,n){var r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.a.put("".concat(v,"/").concat(t),n);case 2:return r=e.sent,e.abrupt("return",r.data);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function y(){return(y=Object(i.a)(s.a.mark((function e(t){var n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,x.a.delete("".concat(v,"/").concat(t));case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var k={getAll:function(){return O.apply(this,arguments)},create:function(e){return m.apply(this,arguments)},update:function(e,t){return w.apply(this,arguments)},deleteContact:function(e){return y.apply(this,arguments)}},C=(n(41),function(){var e=Object(a.useState)([]),t=Object(l.a)(e,2),n=t[0],c=t[1],u=Object(a.useState)(n),o=Object(l.a)(u,2),p=o[0],j=o[1],x=Object(a.useState)(""),v=Object(l.a)(x,2),O=v[0],m=v[1],w=Object(a.useState)(""),y=Object(l.a)(w,2),C=y[0],g=y[1],N=Object(a.useState)(""),S=Object(l.a)(N,2),A=S[0],E=S[1],D=Object(a.useState)(null),F=Object(l.a)(D,2),P=F[0],q=F[1];function J(){return(J=Object(i.a)(s.a.mark((function e(t){var r,a,u,o,i;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,t.preventDefault(),r={name:O,number:C},-1===(a=B(O))){e.next=13;break}if(!window.confirm("".concat(O," is already added to phonebook, replace the old number with a new one?"))){e.next=11;break}return e.next=8,k.update(n[a].id,r);case 8:u=e.sent,c(n.concat(u)),q({text:"Updated ".concat(O),type:"notification"});case 11:e.next=18;break;case 13:return e.next=15,k.create(r);case 15:o=e.sent,c(n.concat(o)),q({text:"Added ".concat(O),type:"notification"});case 18:m(""),g(""),e.next=27;break;case 22:e.prev=22,e.t0=e.catch(0),i=e.t0,e.t0.response&&(i=e.t0.response.data.error),q({text:"Failed to add contact. Error: ".concat(i),type:"error"});case 27:case"end":return e.stop()}}),e,null,[[0,22]])})))).apply(this,arguments)}function L(){return(L=Object(i.a)(s.a.mark((function e(t,r){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!window.confirm("Delete ".concat(t,"?"))){e.next=10;break}return e.t0=c,e.t1=n,e.next=6,k.deleteContact(r);case 6:e.t2=e.sent,e.t3=e.t1.concat.call(e.t1,e.t2),(0,e.t0)(e.t3),q({text:"Deleted ".concat(t),type:"notification"});case 10:e.next=15;break;case 12:e.prev=12,e.t4=e.catch(0),q({text:'Contact: "'.concat(t,'" was already removed from server'),type:"error"});case 15:case"end":return e.stop()}}),e,null,[[0,12]])})))).apply(this,arguments)}Object(a.useEffect)((function(){function e(){return(e=Object(i.a)(s.a.mark((function e(){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,k.getAll();case 3:t=e.sent,c(t),j(t),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log("Failed to fetch contacts. Error: ".concat(e.t0));case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[n.length]),Object(a.useEffect)((function(){setTimeout((function(){q(null)}),5e3)}),[null!==P]);var B=function(e){return n.map((function(e){return e.name})).indexOf(e)};return Object(r.jsxs)("div",{children:[Object(r.jsx)("h2",{children:"Phonebook"}),Object(r.jsx)(b,{message:P}),Object(r.jsx)(h,{query:A,handleSearchChange:function(e){var t=e.target.value;E(t);var r=t.length?n.filter((function(e){return e.name.toLowerCase().includes(A.toLowerCase())})):n;j(r)}}),Object(r.jsxs)("div",{children:[Object(r.jsx)("h3",{children:"Add New Contact"}),Object(r.jsx)(d,{newName:O,handleNameChange:function(e){m(e.target.value)},newNumber:C,handleNumberChange:function(e){g(e.target.value)},addPerson:function(e){return J.apply(this,arguments)}})]}),Object(r.jsx)("h3",{children:"Numbers"}),Object(r.jsx)(f,{filteredContacts:p,deleteContact:function(e,t){return L.apply(this,arguments)}})]})});u.a.render(Object(r.jsx)(C,{}),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.d7ec950f.chunk.js.map