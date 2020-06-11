!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);var r,o=function(e,t,n,r){var o;try{o=t()}catch(e){r(e)}var c,a=function(e){var t=document.createElement("div");t.className="indeterminate";var n=document.createElement("div");return n.className="progress",n.appendChild(t),e.style.display="none",e.parentElement.insertBefore(n,e),n}(n);e.postMessage(o);var i=function t(){e.removeEventListener("message",c),e.removeEventListener("error",t),function(e,t){e.parentElement.removeChild(e),t.style.display=""}(a,n)};c=function(e){e.data.id===o.id&&i()},e.addEventListener("message",c),e.addEventListener("error",c)},c="one_million",a=["sn","budget","profit"],i="SN,NAME,COMPANY,MANGER,OWNER,COUNTRY,BUDGET,PROFIT".toLowerCase().split(","),u=function(){return i.map((function(e){return"\n  ".concat(e," ").concat(a.includes(e)?"INTEGER":"TEXT")})).join(",")},d={"create-table":"CREATE TABLE ".concat(c," (\n  id INTEGER PRIMARY KEY,").concat(u(),"\n);"),"create-table-index":"CREATE TABLE ".concat(c," (\n  id INTEGER PRIMARY KEY,").concat(u(),"\n);\n\n").concat(i.filter((function(e){return!a.includes(e)})).map((function(e){return"CREATE INDEX idx_".concat(c,"_").concat(e," ON ").concat(c," (").concat(e,");\n")})).join("")),"list-index":"PRAGMA index_list(".concat(c,");"),"select-star":"SELECT * FROM ".concat(c," LIMIT 5;"),"select-count":"SELECT COUNT(id) FROM ".concat(c,";")},l=function(){return{action:"exec",id:Date.now()+Math.random(),sql:r?r.getValue():""}},s=function(){return{action:"open",id:Date.now()+Math.random(),isIE:!(window.CSS&&window.CSS.supports)}},m=-1,f=function(){var e="NAME,COMPANY,MANGER,OWNER,COUNTRY,BUDGET,PROFIT".toLowerCase().split(","),t={sn:m+=1};return e.forEach((function(e){var n=["budget","profit"].includes(e);t[e]=n?Math.floor(1e6*Math.random()):Math.random().toString(36).substring(2,15)})),t},E=function(e,t,n){return function(r){o(t,function(e){for(var t=[],n=0;n<e;n+=1)t.push(f());return function(){return{action:"insert",id:Date.now()+Math.random(),table:c,rows:t}}}(e),r.target,n)}},g="SN,NAME,COMPANY,MANGER,OWNER,COUNTRY,BUDGET,PROFIT".toLowerCase().split(","),p=function(){return document.getElementById("ta-match-text")},v=function(e,t){var n=function(n){return function(r){p().value.trim()?o(e,function(e){return function(){return{action:"match",id:Date.now()+Math.random(),text:p().value,table:c,matchMode:e,columns:g}}}(n),r.target,t):t("Please enter any text to match.")}};document.getElementById("btn-match-whole").addEventListener("click",n("single-sql")),document.getElementById("btn-match-cross-join").addEventListener("click",n("cross-join"))},y=function(){return{action:"clear",id:Date.now()+Math.random()}},b=function(){return document.getElementById("output")},T=new Worker("worker.js"),I=function(e){document.getElementById("error").innerText=e.toString()};T.addEventListener("message",(function(e){var t,n;console.log("received",e.data),t=e.data,(n=b()).innerHTML="".concat(JSON.stringify(t,null,2),"\n\n").concat(n.innerHTML)})),T.addEventListener("error",I),document.addEventListener("DOMContentLoaded",(function(){var e,t;e=T,t=I,document.getElementById("btn-open").addEventListener("click",(function(n){console.log("Opening database, isIE = ".concat(s().isIE)),o(e,s,n.target,t)})),function(e,t){var n=document.getElementById("txt-exec-sql");(r=CodeMirror.fromTextArea(n,{mode:"text/x-mysql",tabSize:2,lineWrapping:!0,lineNumbers:!0,matchBrackets:!0})).refresh(),document.getElementById("btn-exec-sql").addEventListener("click",(function(n){r.getValue().trim()?o(e,l,n.target,t):t("Please enter the SQL script to execute.")})),document.getElementById("ddl-select-sql").addEventListener("click",(function(e){var t=e.target.dataset.type,n=d[t];r.setValue(n)}))}(T,I),function(e,t){var n=CodeMirror.fromTextArea(document.getElementById("ta-insert-demo"),{mode:"text/x-mysql",tabSize:2,lineWrapping:!0,lineNumbers:!0,matchBrackets:!0,readOnly:!0});n.setValue("/* below is an example */\nINSERT INTO one_million (\n  'sn', 'name', 'company',\n  'manger', 'owner', 'country',\n  'budget', 'profit'\n) VALUES (\n  :sn, :name, :company,\n  :manger, :owner, :country,\n  :budget, :profit\n);"),n.refresh(),document.getElementById("btn-insert-10").addEventListener("click",E(1e4,e,t)),document.getElementById("btn-insert-100").addEventListener("click",E(1e5,e,t))}(T,I),v(T,I),function(e,t){document.getElementById("btn-clear").addEventListener("click",(function(n){o(e,y,n.target,t)}))}(T,I);var n=document.querySelectorAll(".tabs");M.Tabs.init(n);var c=document.querySelectorAll(".dropdown-trigger");M.Dropdown.init(c,{constrainWidth:!1,coverTrigger:!1})})),document.getElementById("clear-output").addEventListener("click",(function(){b().innerHTML=""}))}]);