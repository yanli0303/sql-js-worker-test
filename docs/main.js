!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);var r,o=function(e,t,n,r){var o;try{o=t()}catch(e){r(e)}var i,c=function(e){var t=document.createElement("div");t.className="indeterminate";var n=document.createElement("div");return n.className="progress",n.appendChild(t),e.style.display="none",e.parentElement.insertBefore(n,e),n}(n);e.postMessage(o);var a=function t(){e.removeEventListener("message",i),e.removeEventListener("error",t),function(e,t){e.parentElement.removeChild(e),t.style.display=""}(c,n)};i=function(e){e.data.id===o.id&&a()},e.addEventListener("message",i),e.addEventListener("error",i)},i="SN,NAME,COMPANY,MANGER,OWNER,COUNTRY,BUDGET,PROFIT".toLowerCase().split(",").map((function(e){return"\n  ".concat(e," ").concat(["sn","budget","profit"].includes(e)?"INTEGER":"TEXT")})).join(","),c={"create-table":"CREATE TABLE one_million (\n  id INTEGER PRIMARY KEY,".concat(i,"\n);"),"select-star":"SELECT * FROM one_million LIMIT 5;","select-count":"SELECT COUNT(id) FROM one_million;"},a=function(){return{action:"exec",id:Date.now()+Math.random(),sql:r?r.getValue():""}},u=function(){return{action:"open",id:Date.now()+Math.random(),isIE:!(window.CSS&&window.CSS.supports)}},d=-1,l=function(){var e="NAME,COMPANY,MANGER,OWNER,COUNTRY,BUDGET,PROFIT".toLowerCase().split(","),t={sn:d+=1};return e.forEach((function(e){var n=["budget","profit"].includes(e);t[e]=n?Math.floor(1e6*Math.random()):Math.random().toString(36).substring(2,15)})),t},s=function(e,t,n){return function(r){o(t,function(e){for(var t=[],n=0;n<e;n+=1)t.push(l());return function(){return{action:"insert",id:Date.now()+Math.random(),table:"one_million",rows:t}}}(e),r.target,n)}},m="SN,NAME,COMPANY,MANGER,OWNER,COUNTRY,BUDGET,PROFIT".toLowerCase().split(","),f=function(){return document.getElementById("ta-match-text")},E=function(e,t){var n=function(n){return function(r){f().value.trim()?o(e,function(e){return function(){return{action:"match",id:Date.now()+Math.random(),text:f().value,table:"one_million",matchMode:e,columns:m}}}(n),r.target,t):t("Please enter any text to match.")}};document.getElementById("btn-match-whole").addEventListener("click",n("single-sql")),document.getElementById("btn-match-cross-join").addEventListener("click",n("cross-join"))},v=function(){return{action:"clear",id:Date.now()+Math.random()}},g=function(){return document.getElementById("output")},p=new Worker("worker.js"),y=function(e){document.getElementById("error").innerText=e.toString()};p.addEventListener("message",(function(e){var t,n;console.log("received",e.data),t=e.data,(n=g()).innerHTML="".concat(JSON.stringify(t,null,2),"\n\n").concat(n.innerHTML)})),p.addEventListener("error",y),document.addEventListener("DOMContentLoaded",(function(){var e=document.querySelectorAll(".tabs");M.Tabs.init(e);var t,n,i,d=document.querySelectorAll(".dropdown-trigger");M.Dropdown.init(d,{constrainWidth:!1,coverTrigger:!1}),t=p,n=y,i=document.getElementById("txt-exec-sql"),(r=CodeMirror.fromTextArea(i,{mode:"text/x-mysql",tabSize:2,lineWrapping:!0,lineNumbers:!0,matchBrackets:!0})).refresh(),document.getElementById("btn-exec-sql").addEventListener("click",(function(e){r.getValue().trim()?o(t,a,e.target,n):n("Please enter the SQL script to execute.")})),document.getElementById("ddl-select-sql").addEventListener("click",(function(e){var t=e.target.dataset.type,n=c[t];r.setValue(n)})),function(e,t){document.getElementById("btn-open").addEventListener("click",(function(n){o(e,u,n.target,t)}))}(p,y),function(e,t){document.getElementById("btn-insert-10").addEventListener("click",s(1e4,e,t)),document.getElementById("btn-insert-100").addEventListener("click",s(1e5,e,t))}(p,y),E(p,y),function(e,t){document.getElementById("btn-clear").addEventListener("click",(function(n){o(e,v,n.target,t)}))}(p,y)})),document.getElementById("clear-output").addEventListener("click",(function(){g().innerHTML=""}))}]);