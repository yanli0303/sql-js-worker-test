!function(t){var u={};function e(n){if(u[n])return u[n].exports;var r=u[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,e),r.l=!0,r.exports}e.m=t,e.c=u,e.d=function(t,u,n){e.o(t,u)||Object.defineProperty(t,u,{enumerable:!0,get:n})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,u){if(1&u&&(t=e(t)),8&u)return t;if(4&u&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(e.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&u&&"string"!=typeof t)for(var r in t)e.d(n,r,function(u){return t[u]}.bind(null,r));return n},e.n=function(t){var u=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(u,"a",u),u},e.o=function(t,u){return Object.prototype.hasOwnProperty.call(t,u)},e.p="",e(e.s=4)}([function(t,u,e){t.exports=e(3)},function(t,u){function e(t,u,e,n,r,o,a){try{var c=t[o](a),i=c.value}catch(t){return void e(t)}c.done?u(i):Promise.resolve(i).then(n,r)}t.exports=function(t){return function(){var u=this,n=arguments;return new Promise((function(r,o){var a=t.apply(u,n);function c(t){e(a,r,o,c,i,"next",t)}function i(t){e(a,r,o,c,i,"throw",t)}c(void 0)}))}}},function(t,u){t.exports=function(t,u,e){return u in t?Object.defineProperty(t,u,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[u]=e,t}},function(t,u,e){var n=function(t){"use strict";var u=Object.prototype,e=u.hasOwnProperty,n="function"==typeof Symbol?Symbol:{},r=n.iterator||"@@iterator",o=n.asyncIterator||"@@asyncIterator",a=n.toStringTag||"@@toStringTag";function c(t,u,e,n){var r=u&&u.prototype instanceof l?u:l,o=Object.create(r.prototype),a=new y(n||[]);return o._invoke=function(t,u,e){var n="suspendedStart";return function(r,o){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===r)throw o;return m()}for(e.method=r,e.arg=o;;){var a=e.delegate;if(a){var c=E(a,e);if(c){if(c===s)continue;return c}}if("next"===e.method)e.sent=e._sent=e.arg;else if("throw"===e.method){if("suspendedStart"===n)throw n="completed",e.arg;e.dispatchException(e.arg)}else"return"===e.method&&e.abrupt("return",e.arg);n="executing";var l=i(t,u,e);if("normal"===l.type){if(n=e.done?"completed":"suspendedYield",l.arg===s)continue;return{value:l.arg,done:e.done}}"throw"===l.type&&(n="completed",e.method="throw",e.arg=l.arg)}}}(t,e,a),o}function i(t,u,e){try{return{type:"normal",arg:t.call(u,e)}}catch(t){return{type:"throw",arg:t}}}t.wrap=c;var s={};function l(){}function F(){}function f(){}var p={};p[r]=function(){return this};var A=Object.getPrototypeOf,d=A&&A(A(g([])));d&&d!==u&&e.call(d,r)&&(p=d);var D=f.prototype=l.prototype=Object.create(p);function h(t){["next","throw","return"].forEach((function(u){t[u]=function(t){return this._invoke(u,t)}}))}function B(t,u){var n;this._invoke=function(r,o){function a(){return new u((function(n,a){!function n(r,o,a,c){var s=i(t[r],t,o);if("throw"!==s.type){var l=s.arg,F=l.value;return F&&"object"==typeof F&&e.call(F,"__await")?u.resolve(F.__await).then((function(t){n("next",t,a,c)}),(function(t){n("throw",t,a,c)})):u.resolve(F).then((function(t){l.value=t,a(l)}),(function(t){return n("throw",t,a,c)}))}c(s.arg)}(r,o,n,a)}))}return n=n?n.then(a,a):a()}}function E(t,u){var e=t.iterator[u.method];if(void 0===e){if(u.delegate=null,"throw"===u.method){if(t.iterator.return&&(u.method="return",u.arg=void 0,E(t,u),"throw"===u.method))return s;u.method="throw",u.arg=new TypeError("The iterator does not provide a 'throw' method")}return s}var n=i(e,t.iterator,u.arg);if("throw"===n.type)return u.method="throw",u.arg=n.arg,u.delegate=null,s;var r=n.arg;return r?r.done?(u[t.resultName]=r.value,u.next=t.nextLoc,"return"!==u.method&&(u.method="next",u.arg=void 0),u.delegate=null,s):r:(u.method="throw",u.arg=new TypeError("iterator result is not an object"),u.delegate=null,s)}function C(t){var u={tryLoc:t[0]};1 in t&&(u.catchLoc=t[1]),2 in t&&(u.finallyLoc=t[2],u.afterLoc=t[3]),this.tryEntries.push(u)}function v(t){var u=t.completion||{};u.type="normal",delete u.arg,t.completion=u}function y(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(C,this),this.reset(!0)}function g(t){if(t){var u=t[r];if(u)return u.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,o=function u(){for(;++n<t.length;)if(e.call(t,n))return u.value=t[n],u.done=!1,u;return u.value=void 0,u.done=!0,u};return o.next=o}}return{next:m}}function m(){return{value:void 0,done:!0}}return F.prototype=D.constructor=f,f.constructor=F,f[a]=F.displayName="GeneratorFunction",t.isGeneratorFunction=function(t){var u="function"==typeof t&&t.constructor;return!!u&&(u===F||"GeneratorFunction"===(u.displayName||u.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,f):(t.__proto__=f,a in t||(t[a]="GeneratorFunction")),t.prototype=Object.create(D),t},t.awrap=function(t){return{__await:t}},h(B.prototype),B.prototype[o]=function(){return this},t.AsyncIterator=B,t.async=function(u,e,n,r,o){void 0===o&&(o=Promise);var a=new B(c(u,e,n,r),o);return t.isGeneratorFunction(e)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},h(D),D[a]="Generator",D[r]=function(){return this},D.toString=function(){return"[object Generator]"},t.keys=function(t){var u=[];for(var e in t)u.push(e);return u.reverse(),function e(){for(;u.length;){var n=u.pop();if(n in t)return e.value=n,e.done=!1,e}return e.done=!0,e}},t.values=g,y.prototype={constructor:y,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(v),!t)for(var u in this)"t"===u.charAt(0)&&e.call(this,u)&&!isNaN(+u.slice(1))&&(this[u]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var u=this;function n(e,n){return a.type="throw",a.arg=t,u.next=e,n&&(u.method="next",u.arg=void 0),!!n}for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r],a=o.completion;if("root"===o.tryLoc)return n("end");if(o.tryLoc<=this.prev){var c=e.call(o,"catchLoc"),i=e.call(o,"finallyLoc");if(c&&i){if(this.prev<o.catchLoc)return n(o.catchLoc,!0);if(this.prev<o.finallyLoc)return n(o.finallyLoc)}else if(c){if(this.prev<o.catchLoc)return n(o.catchLoc,!0)}else{if(!i)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return n(o.finallyLoc)}}}},abrupt:function(t,u){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc<=this.prev&&e.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var o=r;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=u&&u<=o.finallyLoc&&(o=null);var a=o?o.completion:{};return a.type=t,a.arg=u,o?(this.method="next",this.next=o.finallyLoc,s):this.complete(a)},complete:function(t,u){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&u&&(this.next=u),s},finish:function(t){for(var u=this.tryEntries.length-1;u>=0;--u){var e=this.tryEntries[u];if(e.finallyLoc===t)return this.complete(e.completion,e.afterLoc),v(e),s}},catch:function(t){for(var u=this.tryEntries.length-1;u>=0;--u){var e=this.tryEntries[u];if(e.tryLoc===t){var n=e.completion;if("throw"===n.type){var r=n.arg;v(e)}return r}}throw new Error("illegal catch attempt")},delegateYield:function(t,u,e){return this.delegate={iterator:g(t),resultName:u,nextLoc:e},"next"===this.method&&(this.arg=void 0),s}},t}(t.exports);try{regeneratorRuntime=n}catch(t){Function("r","regeneratorRuntime = r")(n)}},function(t,u,e){"use strict";e.r(u);var n=e(2),r=e.n(n),o=e(0),a=e.n(o),c=e(1),i=e.n(c),s=function(t){return new Promise((function(u,e){console.log("Deleting IndexedDB database: ".concat(t));var n=indexedDB.deleteDatabase(t);n.onerror=e,n.onsuccess=function(){console.log("IndexedDB database ".concat(t," is deleted.")),u()}}))},l=function(t){console.log("Importing sql.js resources in Worker synchronously...");var u=Date.now(),e=t?"sql-asm.js":"sql-wasm.js";self.importScripts("static/".concat(e,"?t=").concat(u)),console.log("Imported sql.js resources.")},F=function(){var t=i()(a.a.mark((function t(u){var e,n;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=u.isIE,l(e),console.log("Initializing sql.js library..."),t.next=5,self.initSqlJs({locateFile:function(t){return"static/".concat(t,"?t=").concat(Date.now())}});case 5:return n=t.sent,console.log("Initialized sql.js library."),t.abrupt("return",n.Database);case 8:case"end":return t.stop()}}),t)})));return function(u){return t.apply(this,arguments)}}(),f=function(t){console.log("IndexedDB.onupgradeneeded is being called.");var u=((t||{}).target||{}).result;if(!u)throw new Error("Unrecognized onupgradeneeded callback.");console.log("Initializing IndexedDB object store ".concat("sqlite","...")),u.createObjectStore("sqlite",{autoIncrement:!0}),console.log("Initialized IndexedDB object store ".concat("sqlite"))},p=function(t){return new Promise((function(u,e){console.log("Opening IndexedDB database ".concat(t,"..."));var n=indexedDB.open(t,1);n.onsuccess=function(n){var r=((n||{}).target||{}).result;r?(u(r),console.log("Opened IndexedDB database ".concat(t,"."))):e(new Error("Unable to open IndexedDB database, onsuccess was called back but unable to get the database instance."))},n.onerror=e,n.onupgradeneeded=f}))},A=function(t,u,e){return new Promise((function(n,r){var o,a,c=function(t){o&&clearTimeout(o),a&&a.close(),r(t)};o=setTimeout((function(){o=null,c(new Error("Timed out: ".concat(e," ms elapsed but no result for document with key '").concat(u,"' was received from database '").concat(t,"'.")))}),e),console.log("Loading data from IndexedDB ".concat(t,"...")),p(t).then((function(e){var r=(a=e).transaction("sqlite","readonly").objectStore("sqlite").get(u);r.onsuccess=function(u){return function(u){console.log("Data loaded from IndexedDB ".concat(t),u),o&&clearTimeout(o),a&&a.close(),n(u)}(u.target.result)},r.onerror=c})).catch(c)}))},d="sqlite_powered_by_indexed_db",D=function(){var t=i()(a.a.mark((function t(u,e){var n,r;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e.sqlite){t.next=2;break}throw new Error("Database already open.");case 2:if(e.SQLiteDBClass){t.next=6;break}return t.next=5,F(u);case 5:e.SQLiteDBClass=t.sent;case 6:return t.next=8,A(d,1,5e3).catch((function(t){console.error("Failed to load data from IndexedDB, ignored and opening SQLite database:",t)}));case 8:n=t.sent,r=null,n&&(r=n instanceof Uint8Array?n:new Uint8Array(n)),e.sqlite=new e.SQLiteDBClass(r);case 12:case"end":return t.stop()}}),t)})));return function(u,e){return t.apply(this,arguments)}}(),h=function(){var t=i()(a.a.mark((function t(u,e){var n;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return(n=e.sqlite)&&(n.close(),e.sqlite=null),t.abrupt("return",s(d));case 3:case"end":return t.stop()}}),t)})));return function(u,e){return t.apply(this,arguments)}}(),B=function(t,u,e,n){return new Promise((function(r,o){var a,c,i=function(t){a&&clearTimeout(a),c&&c.close(),o(t)},s=function(u){console.log("Data saved to IndexedDB ".concat(t,".")),a&&clearTimeout(a),c&&c.close(),r(u)};a=setTimeout((function(){a=null,i(new Error("Timed out: ".concat(n," ms elapsed but no callback for saving document with key '").concat(u,"' was received from database '").concat(t,"'.")))}),n),console.log("Saving data to IndexedDB ".concat(t,".")),p(t).then((function(t){var n=(c=t).transaction("sqlite","readwrite").objectStore("sqlite").put(e,u);n.onsuccess=s,n.onerror=i})).catch(i)}))},E=function(){var t=i()(a.a.mark((function t(u,e){var n,r,o,c,i,s;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=e.sqlite,r=u.sql,o=u.params,c=u.readonly,console.log("Executing SQL:",r),i=n.exec(r,o),c){t.next=9;break}return console.log("SQL wasn't readonly, saving changes to IndexedDB."),s=n.export(),t.next=9,B(d,1,s,5e3);case 9:return t.abrupt("return",i);case 10:case"end":return t.stop()}}),t)})));return function(u,e){return t.apply(this,arguments)}}(),C=/[\0-\x1F\x7F-\x9F\xAD\u0378\u0379\u037F-\u0383\u038B\u038D\u03A2\u0528-\u0530\u0557\u0558\u0560\u0588\u058B-\u058E\u0590\u05C8-\u05CF\u05EB-\u05EF\u05F5-\u0605\u061C\u061D\u06DD\u070E\u070F\u074B\u074C\u07B2-\u07BF\u07FB-\u07FF\u082E\u082F\u083F\u085C\u085D\u085F-\u089F\u08A1\u08AD-\u08E3\u08FF\u0978\u0980\u0984\u098D\u098E\u0991\u0992\u09A9\u09B1\u09B3-\u09B5\u09BA\u09BB\u09C5\u09C6\u09C9\u09CA\u09CF-\u09D6\u09D8-\u09DB\u09DE\u09E4\u09E5\u09FC-\u0A00\u0A04\u0A0B-\u0A0E\u0A11\u0A12\u0A29\u0A31\u0A34\u0A37\u0A3A\u0A3B\u0A3D\u0A43-\u0A46\u0A49\u0A4A\u0A4E-\u0A50\u0A52-\u0A58\u0A5D\u0A5F-\u0A65\u0A76-\u0A80\u0A84\u0A8E\u0A92\u0AA9\u0AB1\u0AB4\u0ABA\u0ABB\u0AC6\u0ACA\u0ACE\u0ACF\u0AD1-\u0ADF\u0AE4\u0AE5\u0AF2-\u0B00\u0B04\u0B0D\u0B0E\u0B11\u0B12\u0B29\u0B31\u0B34\u0B3A\u0B3B\u0B45\u0B46\u0B49\u0B4A\u0B4E-\u0B55\u0B58-\u0B5B\u0B5E\u0B64\u0B65\u0B78-\u0B81\u0B84\u0B8B-\u0B8D\u0B91\u0B96-\u0B98\u0B9B\u0B9D\u0BA0-\u0BA2\u0BA5-\u0BA7\u0BAB-\u0BAD\u0BBA-\u0BBD\u0BC3-\u0BC5\u0BC9\u0BCE\u0BCF\u0BD1-\u0BD6\u0BD8-\u0BE5\u0BFB-\u0C00\u0C04\u0C0D\u0C11\u0C29\u0C34\u0C3A-\u0C3C\u0C45\u0C49\u0C4E-\u0C54\u0C57\u0C5A-\u0C5F\u0C64\u0C65\u0C70-\u0C77\u0C80\u0C81\u0C84\u0C8D\u0C91\u0CA9\u0CB4\u0CBA\u0CBB\u0CC5\u0CC9\u0CCE-\u0CD4\u0CD7-\u0CDD\u0CDF\u0CE4\u0CE5\u0CF0\u0CF3-\u0D01\u0D04\u0D0D\u0D11\u0D3B\u0D3C\u0D45\u0D49\u0D4F-\u0D56\u0D58-\u0D5F\u0D64\u0D65\u0D76-\u0D78\u0D80\u0D81\u0D84\u0D97-\u0D99\u0DB2\u0DBC\u0DBE\u0DBF\u0DC7-\u0DC9\u0DCB-\u0DCE\u0DD5\u0DD7\u0DE0-\u0DF1\u0DF5-\u0E00\u0E3B-\u0E3E\u0E5C-\u0E80\u0E83\u0E85\u0E86\u0E89\u0E8B\u0E8C\u0E8E-\u0E93\u0E98\u0EA0\u0EA4\u0EA6\u0EA8\u0EA9\u0EAC\u0EBA\u0EBE\u0EBF\u0EC5\u0EC7\u0ECE\u0ECF\u0EDA\u0EDB\u0EE0-\u0EFF\u0F48\u0F6D-\u0F70\u0F98\u0FBD\u0FCD\u0FDB-\u0FFF\u10C6\u10C8-\u10CC\u10CE\u10CF\u1249\u124E\u124F\u1257\u1259\u125E\u125F\u1289\u128E\u128F\u12B1\u12B6\u12B7\u12BF\u12C1\u12C6\u12C7\u12D7\u1311\u1316\u1317\u135B\u135C\u137D-\u137F\u139A-\u139F\u13F5-\u13FF\u169D-\u169F\u16F1-\u16FF\u170D\u1715-\u171F\u1737-\u173F\u1754-\u175F\u176D\u1771\u1774-\u177F\u17DE\u17DF\u17EA-\u17EF\u17FA-\u17FF\u180F\u181A-\u181F\u1878-\u187F\u18AB-\u18AF\u18F6-\u18FF\u191D-\u191F\u192C-\u192F\u193C-\u193F\u1941-\u1943\u196E\u196F\u1975-\u197F\u19AC-\u19AF\u19CA-\u19CF\u19DB-\u19DD\u1A1C\u1A1D\u1A5F\u1A7D\u1A7E\u1A8A-\u1A8F\u1A9A-\u1A9F\u1AAE-\u1AFF\u1B4C-\u1B4F\u1B7D-\u1B7F\u1BF4-\u1BFB\u1C38-\u1C3A\u1C4A-\u1C4C\u1C80-\u1CBF\u1CC8-\u1CCF\u1CF7-\u1CFF\u1DE7-\u1DFB\u1F16\u1F17\u1F1E\u1F1F\u1F46\u1F47\u1F4E\u1F4F\u1F58\u1F5A\u1F5C\u1F5E\u1F7E\u1F7F\u1FB5\u1FC5\u1FD4\u1FD5\u1FDC\u1FF0\u1FF1\u1FF5\u1FFF\u200B-\u200F\u202A-\u202E\u2060-\u206F\u2072\u2073\u208F\u209D-\u209F\u20BB-\u20CF\u20F1-\u20FF\u218A-\u218F\u23F4-\u23FF\u2427-\u243F\u244B-\u245F\u2700\u2B4D-\u2B4F\u2B5A-\u2BFF\u2C2F\u2C5F\u2CF4-\u2CF8\u2D26\u2D28-\u2D2C\u2D2E\u2D2F\u2D68-\u2D6E\u2D71-\u2D7E\u2D97-\u2D9F\u2DA7\u2DAF\u2DB7\u2DBF\u2DC7\u2DCF\u2DD7\u2DDF\u2E3C-\u2E7F\u2E9A\u2EF4-\u2EFF\u2FD6-\u2FEF\u2FFC-\u2FFF\u3040\u3097\u3098\u3100-\u3104\u312E-\u3130\u318F\u31BB-\u31BF\u31E4-\u31EF\u321F\u32FF\u4DB6-\u4DBF\u9FCD-\u9FFF\uA48D-\uA48F\uA4C7-\uA4CF\uA62C-\uA63F\uA698-\uA69E\uA6F8-\uA6FF\uA78F\uA794-\uA79F\uA7AB-\uA7F7\uA82C-\uA82F\uA83A-\uA83F\uA878-\uA87F\uA8C5-\uA8CD\uA8DA-\uA8DF\uA8FC-\uA8FF\uA954-\uA95E\uA97D-\uA97F\uA9CE\uA9DA-\uA9DD\uA9E0-\uA9FF\uAA37-\uAA3F\uAA4E\uAA4F\uAA5A\uAA5B\uAA7C-\uAA7F\uAAC3-\uAADA\uAAF7-\uAB00\uAB07\uAB08\uAB0F\uAB10\uAB17-\uAB1F\uAB27\uAB2F-\uABBF\uABEE\uABEF\uABFA-\uABFF\uD7A4-\uD7AF\uD7C7-\uD7CA\uD7FC-\uF8FF\uFA6E\uFA6F\uFADA-\uFAFF\uFB07-\uFB12\uFB18-\uFB1C\uFB37\uFB3D\uFB3F\uFB42\uFB45\uFBC2-\uFBD2\uFD40-\uFD4F\uFD90\uFD91\uFDC8-\uFDEF\uFDFE\uFDFF\uFE1A-\uFE1F\uFE27-\uFE2F\uFE53\uFE67\uFE6C-\uFE6F\uFE75\uFEFD-\uFF00\uFFBF-\uFFC1\uFFC8\uFFC9\uFFD0\uFFD1\uFFD8\uFFD9\uFFDD-\uFFDF\uFFE7\uFFEF-\uFFFB\uFFFE\uFFFF]/g,v=/\s{2,}/g,y=function(t){return function(t){return t.trim().replace(C,"")}(t).replace(v," ")},g=function(t,u){return t.map((function(t){var e={};return u.forEach((function(u){var n=t[u];e[":".concat(u)]="string"==typeof n?y(n):n})),e}))},m=function(){var t=i()(a.a.mark((function t(u,e){var n,r,o,c,i,s,l,F,f,p,A;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=Date.now(),r=u.table,o=u.rows,Array.isArray(o)&&0!==o.length){t.next=4;break}throw new Error('"rows" must be non-empty array.');case 4:return c=Object.keys(o[0]),i=g(o,c),s=c.map((function(t){return'"'.concat(t,'"')})).join(","),l=c.map((function(t){return":".concat(t)})).join(","),F="INSERT INTO ".concat(r," (").concat(s,") VALUES (").concat(l,");"),f=e.sqlite,console.log("Insertion SQL: ".concat(F)),p=Date.now(),i.forEach((function(t,u){f.run(F,t),u>0&&u%1e3==0&&(console.log("Inserted 1000 rows, took ".concat(Date.now()-p," ms, row #").concat(u," is"),t),p=Date.now())})),A=f.export(),t.next=16,B(d,1,A,5e3);case 16:return t.abrupt("return","Inserted ".concat(o.length," rows, took ").concat(Date.now()-n," ms."));case 17:case"end":return t.stop()}}),t)})));return function(u,e){return t.apply(this,arguments)}}();function w(t,u){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);u&&(n=n.filter((function(u){return Object.getOwnPropertyDescriptor(t,u).enumerable}))),e.push.apply(e,n)}return e}function b(t){for(var u=1;u<arguments.length;u++){var e=null!=arguments[u]?arguments[u]:{};u%2?w(Object(e),!0).forEach((function(u){r()(t,u,e[u])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):w(Object(e)).forEach((function(u){Object.defineProperty(t,u,Object.getOwnPropertyDescriptor(e,u))}))}return t}var x=function(t){return t.split("\n").map(y)},O=function(t){for(var u=["CREATE TEMPORARY TABLE ".concat("match_lines"," (").concat("line"," TEXT);"),"INSERT INTO ".concat("match_lines"," (").concat("line",") VALUES ")],e=t.length,n=0;n<e;n+=1){var r=t[n];if(r.length>0){var o=r.replace("'","''");u.push("('".concat(o,"'),"))}}var a=u.pop();return u.push("".concat(a.substr(0,a.length-1),";")),u.join("\n")},j=function(){var t=i()(a.a.mark((function t(u,e){var n,r,o,c,i,s;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=u.text,r=u.table,o=u.columns,c=x(n),i=O(c),s=o.map((function(t){return"instr(".concat("line",", ").concat(t,") > 0")})).join(" OR "),i+="SELECT DISTINCT T.* FROM ".concat(r," AS T CROSS JOIN ").concat("match_lines"," WHERE ").concat(s," COLLATE NOCASE;"),t.abrupt("return",E(b(b({},u),{},{sql:i,readonly:!0}),e));case 6:case"end":return t.stop()}}),t)})));return function(u,e){return t.apply(this,arguments)}}(),L=function(){var t=i()(a.a.mark((function t(u,e){var n,r,o,c,i,s;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=u.text,r=u.table,o=u.columns,c=x(n).join("\n"),i=o.map((function(t){return"instr(:text, ".concat(t,") > 0")})).join(" OR "),s="SELECT * FROM ".concat(r," WHERE ").concat(i," COLLATE NOCASE;"),t.abrupt("return",E(b(b({},u),{},{sql:s,params:{":text":c},readonly:!0}),e));case 5:case"end":return t.stop()}}),t)})));return function(u,e){return t.apply(this,arguments)}}();function S(t,u){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);u&&(n=n.filter((function(u){return Object.getOwnPropertyDescriptor(t,u).enumerable}))),e.push.apply(e,n)}return e}function I(t){for(var u=1;u<arguments.length;u++){var e=null!=arguments[u]?arguments[u]:{};u%2?S(Object(e),!0).forEach((function(u){r()(t,u,e[u])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):S(Object(e)).forEach((function(u){Object.defineProperty(t,u,Object.getOwnPropertyDescriptor(e,u))}))}return t}var P={sqlite:null,SQLiteDBClass:null},T={clear:h,exec:E,insert:m,match:function(){var t=i()(a.a.mark((function t(u,e){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if("single-sql"!==u.matchMode){t.next=2;break}return t.abrupt("return",L(u,e));case 2:return t.abrupt("return",j(u,e));case 3:case"end":return t.stop()}}),t)})));return function(u,e){return t.apply(this,arguments)}}(),open:D};self.addEventListener("message",(function(t){var u=t.data,e=Date.now(),n=u.action,r=u.id;if("string"==typeof n&&n){var o=T[n];if(o){var a={action:n,id:r,begin:e};o(u,P).then((function(t){self.postMessage(I(I({},a),{},{duration:Date.now()-e,result:t}))})).catch((function(t){self.postMessage(I(I({},a),{},{duration:Date.now()-e,error:t.toString()}))}))}else self.postMessage({action:n,id:r,error:"NO_SUPPORTED_ACTION"})}else self.postMessage({action:n,id:r,error:"INVALID_ACTION"})}))}]);