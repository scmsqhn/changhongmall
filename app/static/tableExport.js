!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.tableExport=t():e.tableExport=t()}(this,function(){return function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){e.exports=function(e,t,r){var o=document,i=o.getElementById(e),a=o.characterSet,s={json:"application/json;charset="+a,txt:"csv/txt;charset="+a,csv:"csv/txt;charset="+a,xml:"application/xml",doc:"application/msword",xls:"application/vnd.ms-excel",docx:"application/vnd.openxmlformats-officedocument.wordprocessingml.document",xlsx:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"},c={json:n(10),txt:n(3),csv:n(3),xml:n(13),doc:n(5),xls:n(5),image:n(9),pdf:n(12),docx:""},u=c[r];if("function"!=typeof u)throw new Error("the supported types are: json, txt, csv, xml, doc, xls, image, pdf");if("image"===r||"pdf"===r)u(i,t);else{var f=u(i,a,r);n(2).saveAs(new Blob([f],{type:s[r]}),t+"."+r)}}},function(e,t){t.getText=function(e){var t=e.textContent||e.innerText;return null==t?"":t.replace(/^\s*(.*?)\s+$/,"$1")},t.template=function(e,t){return e.replace(/{{(\w+)}}/g,function(e,n){return t[n]})}},function(e,t,n){var r,o=o||function(e){"use strict";if(!("undefined"==typeof e||"undefined"!=typeof navigator&&/MSIE [1-9]\./.test(navigator.userAgent))){var t=e.document,n=function(){return e.URL||e.webkitURL||e},r=t.createElementNS("http://www.w3.org/1999/xhtml","a"),o="download"in r,i=function(e){var t=new MouseEvent("click");e.dispatchEvent(t)},a=/constructor/i.test(e.HTMLElement)||e.safari,s=/CriOS\/[\d]+/.test(navigator.userAgent),c=function(t){(e.setImmediate||e.setTimeout)(function(){throw t},0)},u="application/octet-stream",f=4e4,l=function(e){var t=function(){"string"==typeof e?n().revokeObjectURL(e):e.remove()};setTimeout(t,f)},d=function(e,t,n){t=[].concat(t);for(var r=t.length;r--;){var o=e["on"+t[r]];if("function"==typeof o)try{o.call(e,n||e)}catch(e){c(e)}}},h=function(e){return/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob([String.fromCharCode(65279),e],{type:e.type}):e},p=function(t,c,f){f||(t=h(t));var p,g=this,v=t.type,b=v===u,m=function(){d(g,"writestart progress write writeend".split(" "))},y=function(){if((s||b&&a)&&e.FileReader){var r=new FileReader;return r.onloadend=function(){var t=s?r.result:r.result.replace(/^data:[^;]*;/,"data:attachment/file;"),n=e.open(t,"_blank");n||(e.location.href=t),t=void 0,g.readyState=g.DONE,m()},r.readAsDataURL(t),void(g.readyState=g.INIT)}if(p||(p=n().createObjectURL(t)),b)e.location.href=p;else{var o=e.open(p,"_blank");o||(e.location.href=p)}g.readyState=g.DONE,m(),l(p)};return g.readyState=g.INIT,o?(p=n().createObjectURL(t),void setTimeout(function(){r.href=p,r.download=c,i(r),m(),l(p),g.readyState=g.DONE})):void y()},g=p.prototype,v=function(e,t,n){return new p(e,t||e.name||"download",n)};return"undefined"!=typeof navigator&&navigator.msSaveOrOpenBlob?function(e,t,n){return t=t||e.name||"download",n||(e=h(e)),navigator.msSaveOrOpenBlob(e,t)}:(g.abort=function(){},g.readyState=g.INIT=0,g.WRITING=1,g.DONE=2,g.error=g.onwritestart=g.onprogress=g.onwrite=g.onabort=g.onerror=g.onwriteend=null,v)}}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||this.content);"undefined"!=typeof e&&e.exports?e.exports.saveAs=o:null!==n(7)&&null!==n(8)&&(r=function(){return o}.call(t,n,t,e),!(void 0!==r&&(e.exports=r)))},function(e,t,n){var r=n(1),o=function(e){var t=e.indexOf(",")!==-1||e.indexOf("\r")!==-1||e.indexOf("\n")!==-1,n=e.indexOf('"')!==-1;return n&&(e=e.replace(/"/g,'""')),(t||n)&&(e='"'+e+'"'),"\t"+e};e.exports=function(e){for(var t,n="\ufeff",i=0;t=e.rows[i];i++){for(var a,s=0;a=t.cells[s];s++)n=n+(s?",":"")+o(r.getText(a));n+="\r\n"}return n}},function(e,t,n){var r=n(1),o=function(e){function t(e){return("0"+parseInt(e).toString(16)).slice(-2)}return"transparent"===e.toLowerCase()||"rgba(0, 0, 0, 0)"===e?"#fff":e.search("rgb")===-1?e:(e=e.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/),"#"+t(e[1])+t(e[2])+t(e[3]))},i=function(e,t){var n=new Image,r="data:image/svg+xml;utf8,"+encodeURIComponent(e),o=function(){n.onload=null,n.onerror=null};n.onload=function(){o(),t(n)},n.src=r};e.exports=function(e,t,n){var a=e.offsetWidth,s=e.offsetHeight+8,c=document.createElement("canvas"),u=c.getContext("2d");c.width=a,c.height=s;var f=new DOMParser,l=f.parseFromString(e.outerHTML,"text/html"),d=(new XMLSerializer).serializeToString(l),h='<svg xmlns="http://www.w3.org/2000/svg" width="{{width}}" height="{{height}}"><style scoped="">html::-webkit-scrollbar { display: none; }</style><foreignObject x="0" y="0" width="{{width}}" height="{{height}}" style="float: left;" externalResourcesRequired="true">{{xhtml}}</foreignObject></svg>',p=r.template(h,{width:a,height:s,xhtml:d});"function"==typeof t&&(n=t,t=null),i(p,function(r){t&&"png"!==t.format&&(u.fillStyle=o(e.style.backgroundColor||getComputedStyle(e,null).getPropertyValue("background-color")),u.fillRect(0,0,r.width,r.height)),u.drawImage(r,0,0),n(c)})}},function(e,t,n){var r=n(1);e.exports=function(e,t,n){var o='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:{{type}}" xmlns="http://www.w3.org/TR/REC-html40">';o+='<head><meta charset="{{charset}}" /><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>',o+="����1</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->",o+="</head><body><table>{{table}}</table></body></html>";for(var i,a="",s=[["<thead><tr>","</tr></thead>"],["<tbody><tr>","</tr></tbody>"],["<tr>","</tr>"]],c=[["<th>","</th>"],['<td style="vnd.ms-excel.numberformat:@">',"</td>"]],u=+!e.tHead,f=1-u,l=0;i=e.rows[l];l++){u=l>f?2:u,a+=s[u][0];for(var d,h=0;d=i.cells[h];h++)a+=c[+!!u][0]+r.getText(d)+c[+!!u][1];a+=s[u][1],u++}return r.template(o,{charset:t,type:n,table:a})}},function(e,t,n){var r;!function(o){"use strict";var i=o.HTMLCanvasElement&&o.HTMLCanvasElement.prototype,a=o.Blob&&function(){try{return Boolean(new Blob)}catch(e){return!1}}(),s=a&&o.Uint8Array&&function(){try{return 100===new Blob([new Uint8Array(100)]).size}catch(e){return!1}}(),c=o.BlobBuilder||o.WebKitBlobBuilder||o.MozBlobBuilder||o.MSBlobBuilder,u=/^data:((.*?)(;charset=.*?)?)(;base64)?,/,f=(a||c)&&o.atob&&o.ArrayBuffer&&o.Uint8Array&&function(e){var t,n,r,o,i,f,l,d,h;if(t=e.match(u),!t)throw new Error("invalid data URI");for(n=t[2]?t[1]:"text/plain"+(t[3]||";charset=US-ASCII"),r=!!t[4],o=e.slice(t[0].length),i=r?atob(o):decodeURIComponent(o),f=new ArrayBuffer(i.length),l=new Uint8Array(f),d=0;d<i.length;d+=1)l[d]=i.charCodeAt(d);return a?new Blob([s?l:f],{type:n}):(h=new c,h.append(f),h.getBlob(n))};o.HTMLCanvasElement&&!i.toBlob&&(i.mozGetAsFile?i.toBlob=function(e,t,n){e(n&&i.toDataURL&&f?f(this.toDataURL(t,n)):this.mozGetAsFile("blob",t))}:i.toDataURL&&f&&(i.toBlob=function(e,t,n){e(f(this.toDataURL(t,n)))})),r=function(){return f}.call(t,n,t,e),!(void 0!==r&&(e.exports=r))}(window)},function(e,t){e.exports=function(){throw new Error("define cannot be used indirect")}},function(e,t){(function(t){e.exports=t}).call(t,{})},function(e,t,n){var r=n(2).saveAs;n(6);var o=n(4);e.exports=function(e,t){o(e,function(e){e.toBlob(function(e){r(e,t+".png")})})}},function(e,t,n){var r=n(1);e.exports=function(e){var t=[],n=[];if(e.tHead)for(var o,i=0;o=e.tHead.rows[0].cells[i];i++)t.push(r.getText(o));if(e.tBodies)for(var a,s=0;a=e.tBodies[s];s++)for(var c,u=0;c=a.rows[u];u++){var f=n.length;n[f]=[];for(var l,d=0;l=c.cells[d];d++)n[f].push(r.getText(l))}return JSON.stringify({header:t,data:n})}},function(e,t,n){var r,o=function(o){"use strict";function i(e){var t={};this.subscribe=function(e,n,r){if("function"!=typeof n)return!1;t.hasOwnProperty(e)||(t[e]={});var o=Math.random().toString(35);return t[e][o]=[n,!!r],o},this.unsubscribe=function(e){for(var n in t)if(t[n][e])return delete t[n][e],!0;return!1},this.publish=function(n){if(t.hasOwnProperty(n)){var r=Array.prototype.slice.call(arguments,1),i=[];for(var a in t[n]){var s=t[n][a];try{s[0].apply(e,r)}catch(e){o.console&&console.error("jsPDF PubSub Error",e.message,e)}s[1]&&i.push(a)}i.length&&i.forEach(this.unsubscribe)}}}function a(e,t,n,r){var u={};"object"==typeof e&&(u=e,e=u.orientation,t=u.unit||t,n=u.format||n,r=u.compress||u.compressPdf||r),t=t||"mm",n=n||"a4",e=(""+(e||"P")).toLowerCase();var f,l,d,h,p,g,v,b,m,y=((""+n).toLowerCase(),!!r&&"function"==typeof Uint8Array),w=u.textColor||"0 g",C=u.drawColor||"0 G",A=u.fontSize||16,x=u.lineHeight||1.15,E=u.lineWidth||.200025,S=2,I=!1,j=[],D={},O={},P=0,T=[],B=[],R=[],F=[],U=[],L=0,k=0,N=0,M={title:"",subject:"",author:"",keywords:"",creator:""},_={},G=new i(_),W=function(e){return e.toFixed(2)},H=function(e){return e.toFixed(3)},z=function(e){return("0"+parseInt(e)).slice(-2)},J=function(e){I?T[h].push(e):(N+=e.length+1,F.push(e))},V=function(){return S++,j[S]=N,J(S+" 0 obj"),S},X=function(){var e=2*T.length+1;e+=U.length;var t={objId:e,content:""};return U.push(t),t},Y=function(){return S++,j[S]=function(){return N},S},q=function(e){j[e]=N},K=function(e){J("stream"),J(e),J("endstream")},Z=function(){var e,t,n,r,i,s,c,u,f,d=[];for(c=o.adler32cs||a.adler32cs,y&&"undefined"==typeof c&&(y=!1),e=1;e<=P;e++){if(d.push(V()),u=(p=R[e].width)*l,f=(g=R[e].height)*l,J("<</Type /Page"),J("/Parent 1 0 R"),J("/Resources 2 0 R"),J("/MediaBox [0 0 "+W(u)+" "+W(f)+"]"),G.publish("putPage",{pageNumber:e,page:T[e]}),J("/Contents "+(S+1)+" 0 R"),J(">>"),J("endobj"),t=T[e].join("\n"),V(),y){for(n=[],r=t.length;r--;)n[r]=t.charCodeAt(r);s=c.from(t),i=new Deflater(6),i.append(new Uint8Array(n)),t=i.flush(),n=new Uint8Array(t.length+6),n.set(new Uint8Array([120,156])),n.set(t,2),n.set(new Uint8Array([255&s,s>>8&255,s>>16&255,s>>24&255]),t.length+2),t=String.fromCharCode.apply(null,n),J("<</Length "+t.length+" /Filter [/FlateDecode]>>")}else J("<</Length "+t.length+">>");K(t),J("endobj")}j[1]=N,J("1 0 obj"),J("<</Type /Pages");var h="/Kids [";for(r=0;r<P;r++)h+=d[r]+" 0 R ";J(h+"]"),J("/Count "+P),J(">>"),J("endobj"),G.publish("postPutPages")},$=function(e){e.objectNumber=V(),J("<</BaseFont/"+e.PostScriptName+"/Type/Font"),"string"==typeof e.encoding&&J("/Encoding/"+e.encoding),J("/Subtype/Type1>>"),J("endobj")},Q=function(){for(var e in D)D.hasOwnProperty(e)&&$(D[e])},ee=function(){G.publish("putXobjectDict")},te=function(){J("/ProcSet [/PDF /Text /ImageB /ImageC /ImageI]"),J("/Font <<");for(var e in D)D.hasOwnProperty(e)&&J("/"+e+" "+D[e].objectNumber+" 0 R");J(">>"),J("/XObject <<"),ee(),J(">>")},ne=function(){Q(),G.publish("putResources"),j[2]=N,J("2 0 obj"),J("<<"),te(),J(">>"),J("endobj"),G.publish("postPutResources")},re=function(){G.publish("putAdditionalObjects");for(var e=0;e<U.length;e++){var t=U[e];j[t.objId]=N,J(t.objId+" 0 obj"),J(t.content),J("endobj")}S+=U.length,G.publish("postPutAdditionalObjects")},oe=function(e,t,n){O.hasOwnProperty(t)||(O[t]={}),O[t][n]=e},ie=function(e,t,n,r){var o="F"+(Object.keys(D).length+1).toString(10),i=D[o]={id:o,PostScriptName:e,fontName:t,fontStyle:n,encoding:r,metadata:{}};return oe(o,t,n),G.publish("addFont",i),o},ae=function(){for(var e="helvetica",t="times",n="courier",r="normal",o="bold",i="italic",a="bolditalic",s="StandardEncoding",c="zapfdingbats",u=[["Helvetica",e,r],["Helvetica-Bold",e,o],["Helvetica-Oblique",e,i],["Helvetica-BoldOblique",e,a],["Courier",n,r],["Courier-Bold",n,o],["Courier-Oblique",n,i],["Courier-BoldOblique",n,a],["Times-Roman",t,r],["Times-Bold",t,o],["Times-Italic",t,i],["Times-BoldItalic",t,a],["ZapfDingbats",c]],f=0,l=u.length;f<l;f++){var d=ie(u[f][0],u[f][1],u[f][2],s),h=u[f][0].split("-");oe(d,h[0],h[1]||"")}G.publish("addFonts",{fonts:D,dictionary:O})},se=function(e){return e.foo=function(){try{return e.apply(this,arguments)}catch(e){var t=e.stack||"";~t.indexOf(" at ")&&(t=t.split(" at ")[1]);var n="Error in function "+t.split("\n")[0].split("<")[0]+": "+e.message;if(!o.console)throw new Error(n);o.console.error(n,e),o.alert&&alert(n)}},e.foo.bar=e,e.foo},ce=function(e,t){var n,r,o,i,a,s,c,u,l;if(t=t||{},o=t.sourceEncoding||"Unicode",a=t.outputEncoding,(t.autoencode||a)&&D[f].metadata&&D[f].metadata[o]&&D[f].metadata[o].encoding&&(i=D[f].metadata[o].encoding,!a&&D[f].encoding&&(a=D[f].encoding),!a&&i.codePages&&(a=i.codePages[0]),"string"==typeof a&&(a=i[a]),a)){for(c=!1,s=[],n=0,r=e.length;n<r;n++)u=a[e.charCodeAt(n)],u?s.push(String.fromCharCode(u)):s.push(e[n]),s[n].charCodeAt(0)>>8&&(c=!0);e=s.join("")}for(n=e.length;void 0===c&&0!==n;)e.charCodeAt(n-1)>>8&&(c=!0),n--;if(!c)return e;for(s=t.noBOM?[]:[254,255],n=0,r=e.length;n<r;n++){if(u=e.charCodeAt(n),l=u>>8,l>>8)throw new Error("Character at position "+n+" of string '"+e+"' exceeds 16bits. Cannot be encoded into UCS-2 BE");s.push(l),s.push(u-(l<<8))}return String.fromCharCode.apply(void 0,s)},ue=function(e,t){return ce(e,t).replace(/\\/g,"\\\\").replace(/\(/g,"\\(").replace(/\)/g,"\\)")},fe=function(){J("/Producer (jsPDF "+a.version+")");for(var e in M)M.hasOwnProperty(e)&&M[e]&&J("/"+e.substr(0,1).toUpperCase()+e.substr(1)+" ("+ue(M[e])+")");var t=new Date,n=t.getTimezoneOffset(),r=n<0?"+":"-",o=Math.floor(Math.abs(n/60)),i=Math.abs(n%60),s=[r,z(o),"'",z(i),"'"].join("");J(["/CreationDate (D:",t.getFullYear(),z(t.getMonth()+1),z(t.getDate()),z(t.getHours()),z(t.getMinutes()),z(t.getSeconds()),s,")"].join(""))},le=function(){switch(J("/Type /Catalog"),J("/Pages 1 0 R"),b||(b="fullwidth"),b){case"fullwidth":J("/OpenAction [3 0 R /FitH null]");break;case"fullheight":J("/OpenAction [3 0 R /FitV null]");break;case"fullpage":J("/OpenAction [3 0 R /Fit]");break;case"original":J("/OpenAction [3 0 R /XYZ null null 1]");break;default:var e=""+b;"%"===e.substr(e.length-1)&&(b=parseInt(b)/100),"number"==typeof b&&J("/OpenAction [3 0 R /XYZ null null "+W(b)+"]")}switch(m||(m="continuous"),m){case"continuous":J("/PageLayout /OneColumn");break;case"single":J("/PageLayout /SinglePage");break;case"two":case"twoleft":J("/PageLayout /TwoColumnLeft");break;case"tworight":J("/PageLayout /TwoColumnRight")}v&&J("/PageMode /"+v),G.publish("putCatalog")},de=function(){J("/Size "+(S+1)),J("/Root "+S+" 0 R"),J("/Info "+(S-1)+" 0 R")},he=function(e,t){var n="string"==typeof t&&t.toLowerCase();if("string"==typeof e){var r=e.toLowerCase();c.hasOwnProperty(r)&&(e=c[r][0]/l,t=c[r][1]/l)}if(Array.isArray(e)&&(t=e[1],e=e[0]),n){switch(n.substr(0,1)){case"l":t>e&&(n="s");break;case"p":e>t&&(n="s")}"s"===n&&(d=e,e=t,t=d)}I=!0,T[++P]=[],R[P]={width:Number(e)||p,height:Number(t)||g},B[P]={},ve(P)},pe=function(){he.apply(this,arguments),J(W(E*l)+" w"),J(C),0!==L&&J(L+" J"),0!==k&&J(k+" j"),G.publish("addPage",{pageNumber:P})},ge=function(e){e>0&&e<=P&&(T.splice(e,1),R.splice(e,1),P--,h>P&&(h=P),this.setPage(h))},ve=function(e){e>0&&e<=P&&(h=e,p=R[e].width,g=R[e].height)},be=function(e,t){var n;switch(e=void 0!==e?e:D[f].fontName,t=void 0!==t?t:D[f].fontStyle,void 0!==e&&(e=e.toLowerCase()),e){case"sans-serif":case"verdana":case"arial":case"helvetica":e="helvetica";break;case"fixed":case"monospace":case"terminal":case"courier":e="courier";break;case"serif":case"cursive":case"fantasy":default:e="times"}try{n=O[e][t]}catch(e){}return n||(n=O.times[t],null==n&&(n=O.times.normal)),n},me=function(){I=!1,S=2,N=0,F=[],j=[],U=[],G.publish("buildDocument"),J("%PDF-"+s),Z(),re(),ne(),V(),J("<<"),fe(),J(">>"),J("endobj"),V(),J("<<"),le(),J(">>"),J("endobj");var e,t=N,n="0000000000";for(J("xref"),J("0 "+(S+1)),J(n+" 65535 f "),e=1;e<=S;e++){var r=j[e];J("function"==typeof r?(n+j[e]()).slice(-10)+" 00000 n ":(n+j[e]).slice(-10)+" 00000 n ")}return J("trailer"),J("<<"),de(),J(">>"),J("startxref"),J(""+t),J("%%EOF"),I=!0,F.join("\n")},ye=function(e){var t="S";return"F"===e?t="f":"FD"===e||"DF"===e?t="B":"f"!==e&&"f*"!==e&&"B"!==e&&"B*"!==e||(t=e),t},we=function(){for(var e=me(),t=e.length,n=new ArrayBuffer(t),r=new Uint8Array(n);t--;)r[t]=e.charCodeAt(t);return n},Ce=function(){return new Blob([we()],{type:"application/pdf"})},Ae=se(function(e,t){var n="dataur"===(""+e).substr(0,6)?"data:application/pdf;base64,"+btoa(me()):0;switch(e){case void 0:return me();case"save":if(navigator.getUserMedia&&(void 0===o.URL||void 0===o.URL.createObjectURL))return _.output("dataurlnewwindow");saveAs(Ce(),t),"function"==typeof saveAs.unload&&o.setTimeout&&setTimeout(saveAs.unload,911);break;case"arraybuffer":return we();case"blob":return Ce();case"bloburi":case"bloburl":return o.URL&&o.URL.createObjectURL(Ce())||void 0;case"datauristring":case"dataurlstring":return n;case"dataurlnewwindow":var r=o.open(n);if(r||"undefined"==typeof safari)return r;case"datauri":case"dataurl":return o.document.location.href=n;default:throw new Error('Output type "'+e+'" is not supported.')}});switch(t){case"pt":l=1;break;case"mm":l=72/25.4000508;break;case"cm":l=72/2.54000508;break;case"in":l=72;break;case"px":l=96/72;break;case"pc":l=12;break;case"em":l=12;break;case"ex":l=6;break;default:throw"Invalid unit: "+t}_.internal={pdfEscape:ue,getStyle:ye,getFont:function(){return D[be.apply(_,arguments)]},getFontSize:function(){return A},getLineHeight:function(){return A*x},write:function(e){J(1===arguments.length?e:Array.prototype.join.call(arguments," "))},getCoordinateString:function(e){return W(e*l)},getVerticalCoordinateString:function(e){return W((g-e)*l)},collections:{},newObject:V,newAdditionalObject:X,newObjectDeferred:Y,newObjectDeferredBegin:q,putStream:K,events:G,scaleFactor:l,pageSize:{get width(){return p},get height(){return g}},output:function(e,t){return Ae(e,t)},getNumberOfPages:function(){return T.length-1},pages:T,out:J,f2:W,getPageInfo:function(e){var t=2*(e-1)+3;return{objId:t,pageNumber:e,pageContext:B[e]}},getCurrentPageInfo:function(){var e=2*(h-1)+3;return{objId:e,pageNumber:h,pageContext:B[h]}},getPDFVersion:function(){return s}},_.addPage=function(){return pe.apply(this,arguments),this},_.setPage=function(){return ve.apply(this,arguments),this},_.insertPage=function(e){return this.addPage(),this.movePage(h,e),this},_.movePage=function(e,t){if(e>t){for(var n=T[e],r=R[e],o=B[e],i=e;i>t;i--)T[i]=T[i-1],R[i]=R[i-1],B[i]=B[i-1];T[t]=n,R[t]=r,B[t]=o,this.setPage(t)}else if(e<t){for(var n=T[e],r=R[e],o=B[e],i=e;i<t;i++)T[i]=T[i+1],R[i]=R[i+1],B[i]=B[i+1];T[t]=n,R[t]=r,B[t]=o,this.setPage(t)}return this},_.deletePage=function(){return ge.apply(this,arguments),this},_.setDisplayMode=function(e,t,n){b=e,m=t,v=n;var r=[void 0,null,"UseNone","UseOutlines","UseThumbs","FullScreen"];if(r.indexOf(n)==-1)throw new Error('Page mode must be one of UseNone, UseOutlines, UseThumbs, or FullScreen. "'+n+'" is not recognized.');return this},_.text=function(e,t,n,r,o,i){function a(e){return e=e.split("\t").join(Array(u.TabLen||9).join(" ")),ue(e,r)}"number"==typeof e&&(d=n,n=t,t=e,e=d),"string"==typeof e&&(e=e.match(/[\n\r]/)?e.split(/\r\n|\r|\n/g):[e]),"string"==typeof o&&(i=o,o=null),"string"==typeof r&&(i=r,r=null),"number"==typeof r&&(o=r,r=null);var s,c="",h="Td";if(o){o*=Math.PI/180;var p=Math.cos(o),v=Math.sin(o);c=[W(p),W(v),W(v*-1),W(p),""].join(" "),h="Tm"}r=r||{},"noBOM"in r||(r.noBOM=!0),"autoencode"in r||(r.autoencode=!0);var b="",m=this.internal.getCurrentPageInfo().pageContext;if(!0===r.stroke?m.lastTextWasStroke!==!0&&(b="1 Tr\n",m.lastTextWasStroke=!0):(m.lastTextWasStroke&&(b="0 Tr\n"),m.lastTextWasStroke=!1),"undefined"==typeof this._runningPageHeight&&(this._runningPageHeight=0),"string"==typeof e)e=a(e);else{if("[object Array]"!==Object.prototype.toString.call(e))throw new Error('Type of text must be string or Array. "'+e+'" is not recognized.');for(var y=e.concat(),C=[],E=y.length;E--;)C.push(a(y.shift()));var S=Math.ceil((g-n-this._runningPageHeight)*l/(A*x));if(0<=S&&S<C.length+1,i){var I,j,D,O=A*x,P=e.map(function(e){return this.getStringUnitWidth(e)*A/l},this);if(D=Math.max.apply(Math,P),"center"===i)I=t-D/2,t-=P[0]/2;else{if("right"!==i)throw new Error('Unrecognized alignment option, use "center" or "right".');I=t-D,t-=P[0]}j=t,e=C[0];for(var T=1,E=C.length;T<E;T++){var B=D-P[T];"center"===i&&(B/=2),e+=") Tj\n"+(I-j+B)+" -"+O+" Td ("+C[T],j=I+B}}else e=C.join(") Tj\nT* (")}var R;return s||(R=W((g-n)*l)),J("BT\n/"+f+" "+A+" Tf\n"+A*x+" TL\n"+b+w+"\n"+c+W(t*l)+" "+R+" "+h+"\n("+e+") Tj\nET"),s&&this.text(s,t,n),this},_.lstext=function(e,t,n,r){console.warn("jsPDF.lstext is deprecated");for(var o=0,i=e.length;o<i;o++,t+=r)this.text(e[o],t,n);return this},_.line=function(e,t,n,r){return this.lines([[n-e,r-t]],e,t)},_.clip=function(){J("W"),J("S")},_.clip_fixed=function(e){J("evenodd"===e?"W*":"W"),J("n")},_.lines=function(e,t,n,r,o,i){var a,s,c,u,f,h,p,v,b,m,y;for("number"==typeof e&&(d=n,n=t,t=e,e=d),r=r||[1,1],J(H(t*l)+" "+H((g-n)*l)+" m "),a=r[0],s=r[1],u=e.length,m=t,y=n,c=0;c<u;c++)f=e[c],2===f.length?(m=f[0]*a+m,y=f[1]*s+y,J(H(m*l)+" "+H((g-y)*l)+" l")):(h=f[0]*a+m,p=f[1]*s+y,v=f[2]*a+m,b=f[3]*s+y,m=f[4]*a+m,y=f[5]*s+y,J(H(h*l)+" "+H((g-p)*l)+" "+H(v*l)+" "+H((g-b)*l)+" "+H(m*l)+" "+H((g-y)*l)+" c"));return i&&J(" h"),null!==o&&J(ye(o)),this},_.rect=function(e,t,n,r,o){ye(o);return J([W(e*l),W((g-t)*l),W(n*l),W(-r*l),"re"].join(" ")),null!==o&&J(ye(o)),this},_.triangle=function(e,t,n,r,o,i,a){return this.lines([[n-e,r-t],[o-n,i-r],[e-o,t-i]],e,t,[1,1],a,!0),this},_.roundedRect=function(e,t,n,r,o,i,a){var s=4/3*(Math.SQRT2-1);return this.lines([[n-2*o,0],[o*s,0,o,i-i*s,o,i],[0,r-2*i],[0,i*s,-(o*s),i,-o,i],[-n+2*o,0],[-(o*s),0,-o,-(i*s),-o,-i],[0,-r+2*i],[0,-(i*s),o*s,-i,o,-i]],e+o,t,[1,1],a),this},_.ellipse=function(e,t,n,r,o){var i=4/3*(Math.SQRT2-1)*n,a=4/3*(Math.SQRT2-1)*r;return J([W((e+n)*l),W((g-t)*l),"m",W((e+n)*l),W((g-(t-a))*l),W((e+i)*l),W((g-(t-r))*l),W(e*l),W((g-(t-r))*l),"c"].join(" ")),J([W((e-i)*l),W((g-(t-r))*l),W((e-n)*l),W((g-(t-a))*l),W((e-n)*l),W((g-t)*l),"c"].join(" ")),J([W((e-n)*l),W((g-(t+a))*l),W((e-i)*l),W((g-(t+r))*l),W(e*l),W((g-(t+r))*l),"c"].join(" ")),J([W((e+i)*l),W((g-(t+r))*l),W((e+n)*l),W((g-(t+a))*l),W((e+n)*l),W((g-t)*l),"c"].join(" ")),null!==o&&J(ye(o)),this},_.circle=function(e,t,n,r){return this.ellipse(e,t,n,n,r)},_.setProperties=function(e){for(var t in M)M.hasOwnProperty(t)&&e[t]&&(M[t]=e[t]);return this},_.setFontSize=function(e){return A=e,this},_.setFont=function(e,t){return f=be(e,t),this},_.setFontStyle=_.setFontType=function(e){return f=be(void 0,e),this},_.getFontList=function(){var e,t,n,r={};for(e in O)if(O.hasOwnProperty(e)){r[e]=n=[];for(t in O[e])O[e].hasOwnProperty(t)&&n.push(t)}return r},_.addFont=function(e,t,n){ie(e,t,n,"StandardEncoding")},_.setLineWidth=function(e){return J((e*l).toFixed(2)+" w"),this},_.setDrawColor=function(e,t,n,r){var o;return o=void 0===t||void 0===r&&e===t===n?"string"==typeof e?e+" G":W(e/255)+" G":void 0===r?"string"==typeof e?[e,t,n,"RG"].join(" "):[W(e/255),W(t/255),W(n/255),"RG"].join(" "):"string"==typeof e?[e,t,n,r,"K"].join(" "):[W(e),W(t),W(n),W(r),"K"].join(" "),J(o),this},_.setFillColor=function(e,t,n,r){var o;return void 0===t||void 0===r&&e===t===n?o="string"==typeof e?e+" g":W(e/255)+" g":void 0===r||"object"==typeof r?(o="string"==typeof e?[e,t,n,"rg"].join(" "):[W(e/255),W(t/255),W(n/255),"rg"].join(" "),r&&0===r.a&&(o=["255","255","255","rg"].join(" "))):o="string"==typeof e?[e,t,n,r,"k"].join(" "):[W(e),W(t),W(n),W(r),"k"].join(" "),J(o),this},_.setTextColor=function(e,t,n){if("string"==typeof e&&/^#[0-9A-Fa-f]{6}$/.test(e)){var r=parseInt(e.substr(1),16);e=r>>16&255,t=r>>8&255,n=255&r}return w=0===e&&0===t&&0===n||"undefined"==typeof t?H(e/255)+" g":[H(e/255),H(t/255),H(n/255),"rg"].join(" "),this},_.CapJoinStyles={0:0,butt:0,but:0,miter:0,1:1,round:1,rounded:1,circle:1,2:2,projecting:2,project:2,square:2,bevel:2},_.setLineCap=function(e){var t=this.CapJoinStyles[e];if(void 0===t)throw new Error("Line cap style of '"+e+"' is not recognized. See or extend .CapJoinStyles property for valid styles");return L=t,J(t+" J"),this},_.setLineJoin=function(e){var t=this.CapJoinStyles[e];if(void 0===t)throw new Error("Line join style of '"+e+"' is not recognized. See or extend .CapJoinStyles property for valid styles");return k=t,J(t+" j"),this},_.output=Ae,_.save=function(e){_.output("save",e)};for(var xe in a.API)a.API.hasOwnProperty(xe)&&("events"===xe&&a.API.events.length?!function(e,t){var n,r,o;for(o=t.length-1;o!==-1;o--)n=t[o][0],r=t[o][1],e.subscribe.apply(e,[n].concat("function"==typeof r?[r]:r))}(G,a.API.events):_[xe]=a.API[xe]);return ae(),f="F1",pe(n,e),G.publish("initialized"),_}var s="1.3",c={a0:[2383.94,3370.39],a1:[1683.78,2383.94],a2:[1190.55,1683.78],a3:[841.89,1190.55],a4:[595.28,841.89],a5:[419.53,595.28],a6:[297.64,419.53],a7:[209.76,297.64],a8:[147.4,209.76],a9:[104.88,147.4],a10:[73.7,104.88],b0:[2834.65,4008.19],b1:[2004.09,2834.65],b2:[1417.32,2004.09],b3:[1000.63,1417.32],b4:[708.66,1000.63],b5:[498.9,708.66],b6:[354.33,498.9],b7:[249.45,354.33],b8:[175.75,249.45],b9:[124.72,175.75],b10:[87.87,124.72],c0:[2599.37,3676.54],c1:[1836.85,2599.37],c2:[1298.27,1836.85],c3:[918.43,1298.27],c4:[649.13,918.43],c5:[459.21,649.13],c6:[323.15,459.21],c7:[229.61,323.15],c8:[161.57,229.61],c9:[113.39,161.57],c10:[79.37,113.39],dl:[311.81,623.62],letter:[612,792],"government-letter":[576,756],legal:[612,1008],"junior-legal":[576,360],ledger:[1224,792],tabloid:[792,1224],"credit-card":[153,243]};return a.API={events:[]},a.version="1.x-master",r=function(){return a}.call(t,n,t,e),!(void 0!==r&&(e.exports=r)),a}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||this);!function(e){"use strict";var t="addImage_",n=["jpeg","jpg","png"],r=function(e){var t=this.internal.newObject(),n=this.internal.write,o=this.internal.putStream;if(e.n=t,n("<</Type /XObject"),n("/Subtype /Image"),n("/Width "+e.w),n("/Height "+e.h),e.cs===this.color_spaces.INDEXED?n("/ColorSpace [/Indexed /DeviceRGB "+(e.pal.length/3-1)+" "+("smask"in e?t+2:t+1)+" 0 R]"):(n("/ColorSpace /"+e.cs),e.cs===this.color_spaces.DEVICE_CMYK&&n("/Decode [1 0 1 0 1 0 1 0]")),n("/BitsPerComponent "+e.bpc),"f"in e&&n("/Filter /"+e.f),"dp"in e&&n("/DecodeParms <<"+e.dp+">>"),"trns"in e&&e.trns.constructor==Array){for(var i="",a=0,s=e.trns.length;a<s;a++)i+=e.trns[a]+" "+e.trns[a]+" ";n("/Mask ["+i+"]")}if("smask"in e&&n("/SMask "+(t+1)+" 0 R"),n("/Length "+e.data.length+">>"),o(e.data),n("endobj"),"smask"in e){var c="/Predictor "+e.p+" /Colors 1 /BitsPerComponent "+e.bpc+" /Columns "+e.w,u={w:e.w,h:e.h,cs:"DeviceGray",bpc:e.bpc,dp:c,data:e.smask};"f"in e&&(u.f=e.f),r.call(this,u)}e.cs===this.color_spaces.INDEXED&&(this.internal.newObject(),n("<< /Length "+e.pal.length+">>"),o(this.arrayBufferToBinaryString(new Uint8Array(e.pal))),n("endobj"))},o=function(){var e=this.internal.collections[t+"images"];for(var n in e)r.call(this,e[n])},i=function(){var e,n=this.internal.collections[t+"images"],r=this.internal.write;for(var o in n)e=n[o],r("/I"+e.i,e.n,"0","R")},a=function(t){return t&&"string"==typeof t&&(t=t.toUpperCase()),t in e.image_compression?t:e.image_compression.NONE},s=function(){var e=this.internal.collections[t+"images"];return e||(this.internal.collections[t+"images"]=e={},this.internal.events.subscribe("putResources",o),this.internal.events.subscribe("putXobjectDict",i)),e},c=function(e){var t=0;return e&&(t=Object.keys?Object.keys(e).length:function(e){var t=0;for(var n in e)e.hasOwnProperty(n)&&t++;return t}(e)),t},u=function(e){return"undefined"==typeof e||null===e},f=function(t){return"string"==typeof t&&e.sHashCode(t)},l=function(e){return n.indexOf(e)===-1},d=function(t){return"function"!=typeof e["process"+t.toUpperCase()]},h=function(e){return"object"==typeof e&&1===e.nodeType},p=function(e,t,n){if("IMG"===e.nodeName&&e.hasAttribute("src")){var r=""+e.getAttribute("src");if(!n&&0===r.indexOf("data:image/"))return r;!t&&/\.png(?:[?#].*)?$/i.test(r)&&(t="png")}if("CANVAS"===e.nodeName)var o=e;else{var o=document.createElement("canvas");o.width=e.clientWidth||e.width,o.height=e.clientHeight||e.height;var i=o.getContext("2d");if(!i)throw"addImage requires canvas to be supported by browser.";if(n){var a,s,c,u,f,l,d,h,p=Math.PI/180;"object"==typeof n&&(a=n.x,s=n.y,c=n.bg,n=n.angle),h=n*p,u=Math.abs(Math.cos(h)),f=Math.abs(Math.sin(h)),l=o.width,d=o.height,o.width=d*f+l*u,o.height=d*u+l*f,isNaN(a)&&(a=o.width/2),isNaN(s)&&(s=o.height/2),i.clearRect(0,0,o.width,o.height),i.fillStyle=c||"white",i.fillRect(0,0,o.width,o.height),i.save(),i.translate(a,s),i.rotate(h),i.drawImage(e,-(l/2),-(d/2)),i.rotate(-h),i.translate(-a,-s),i.restore()}else i.drawImage(e,0,0,o.width,o.height)}return o.toDataURL("png"==(""+t).toLowerCase()?"image/png":"image/jpeg")},g=function(e,t){var n;if(t)for(var r in t)if(e===t[r].alias){n=t[r];break}return n},v=function(e,t,n){return e||t||(e=-96,t=-96),e<0&&(e=-1*n.w*72/e/this.internal.scaleFactor),t<0&&(t=-1*n.h*72/t/this.internal.scaleFactor),0===e&&(e=t*n.w/n.h),0===t&&(t=e*n.h/n.w),[e,t]},b=function(e,t,n,r,o,i,a){var s=v.call(this,n,r,o),c=this.internal.getCoordinateString,u=this.internal.getVerticalCoordinateString;n=s[0],r=s[1],a[i]=o,this.internal.write("q",c(n),"0 0",c(r),c(e),u(t+r),"cm /I"+o.i,"Do Q")};e.color_spaces={DEVICE_RGB:"DeviceRGB",DEVICE_GRAY:"DeviceGray",DEVICE_CMYK:"DeviceCMYK",CAL_GREY:"CalGray",CAL_RGB:"CalRGB",LAB:"Lab",ICC_BASED:"ICCBased",INDEXED:"Indexed",PATTERN:"Pattern",SEPARATION:"Separation",DEVICE_N:"DeviceN"},e.decode={DCT_DECODE:"DCTDecode",FLATE_DECODE:"FlateDecode",LZW_DECODE:"LZWDecode",JPX_DECODE:"JPXDecode",JBIG2_DECODE:"JBIG2Decode",ASCII85_DECODE:"ASCII85Decode",ASCII_HEX_DECODE:"ASCIIHexDecode",RUN_LENGTH_DECODE:"RunLengthDecode",CCITT_FAX_DECODE:"CCITTFaxDecode"},e.image_compression={NONE:"NONE",FAST:"FAST",MEDIUM:"MEDIUM",SLOW:"SLOW"},e.sHashCode=function(e){return Array.prototype.reduce&&e.split("").reduce(function(e,t){return e=(e<<5)-e+t.charCodeAt(0),e&e},0)},e.isString=function(e){return"string"==typeof e},e.extractInfoFromBase64DataURI=function(e){return/^data:([\w]+?\/([\w]+?));base64,(.+?)$/g.exec(e)},e.supportsArrayBuffer=function(){return"undefined"!=typeof ArrayBuffer&&"undefined"!=typeof Uint8Array},e.isArrayBuffer=function(e){return!!this.supportsArrayBuffer()&&e instanceof ArrayBuffer},e.isArrayBufferView=function(e){return!!this.supportsArrayBuffer()&&("undefined"!=typeof Uint32Array&&(e instanceof Int8Array||e instanceof Uint8Array||"undefined"!=typeof Uint8ClampedArray&&e instanceof Uint8ClampedArray||e instanceof Int16Array||e instanceof Uint16Array||e instanceof Int32Array||e instanceof Uint32Array||e instanceof Float32Array||e instanceof Float64Array))},e.binaryStringToUint8Array=function(e){for(var t=e.length,n=new Uint8Array(t),r=0;r<t;r++)n[r]=e.charCodeAt(r);return n},e.arrayBufferToBinaryString=function(e){this.isArrayBuffer(e)&&(e=new Uint8Array(e));for(var t="",n=e.byteLength,r=0;r<n;r++)t+=String.fromCharCode(e[r]);return t},e.arrayBufferToBase64=function(e){for(var t,n,r,o,i,a="",s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",c=new Uint8Array(e),u=c.byteLength,f=u%3,l=u-f,d=0;d<l;d+=3)i=c[d]<<16|c[d+1]<<8|c[d+2],t=(16515072&i)>>18,n=(258048&i)>>12,r=(4032&i)>>6,o=63&i,a+=s[t]+s[n]+s[r]+s[o];return 1==f?(i=c[l],t=(252&i)>>2,n=(3&i)<<4,a+=s[t]+s[n]+"=="):2==f&&(i=c[l]<<8|c[l+1],t=(64512&i)>>10,n=(1008&i)>>4,r=(15&i)<<2,a+=s[t]+s[n]+s[r]+"="),a},e.createImageInfo=function(e,t,n,r,o,i,a,s,c,u,f,l,d){var h={alias:s,w:t,h:n,cs:r,bpc:o,i:a,data:e};return i&&(h.f=i),c&&(h.dp=c),u&&(h.trns=u),f&&(h.pal=f),l&&(h.smask=l),d&&(h.p=d),h},e.addImage=function(e,t,r,o,i,v,m,y,w){if("string"!=typeof t){var C=v;v=i,i=o,o=r,r=t,t=C}if("object"==typeof e&&!h(e)&&"imageData"in e){var A=e;e=A.imageData,t=A.format||t,r=A.x||r||0,o=A.y||o||0,i=A.w||i,v=A.h||v,m=A.alias||m,y=A.compression||y,w=A.rotation||A.angle||w}if(isNaN(r)||isNaN(o))throw console.error("jsPDF.addImage: Invalid coordinates",arguments),
    new Error("Invalid coordinates passed to jsPDF.addImage");var x,E=s.call(this);if(!(x=g(e,E))){var S;if(h(e)&&(e=p(e,t,w)),u(m)&&(m=f(e)),!(x=g(m,E))){if(this.isString(e)){var I=this.extractInfoFromBase64DataURI(e);I?(t=I[2],e=atob(I[3])):137===e.charCodeAt(0)&&80===e.charCodeAt(1)&&78===e.charCodeAt(2)&&71===e.charCodeAt(3)&&(t="png")}if(t=(t||"JPEG").toLowerCase(),l(t))throw new Error("addImage currently only supports formats "+n+", not '"+t+"'");if(d(t))throw new Error("please ensure that the plugin for '"+t+"' support is added");if(this.supportsArrayBuffer()&&(e instanceof Uint8Array||(S=e,e=this.binaryStringToUint8Array(e))),x=this["process"+t.toUpperCase()](e,c(E),m,a(y),S),!x)throw new Error("An unkwown error occurred whilst processing the image")}}return b.call(this,r,o,i,v,x,x.i,E),this};var m=function(e){var t,n,r;if(255===!e.charCodeAt(0)||216===!e.charCodeAt(1)||255===!e.charCodeAt(2)||224===!e.charCodeAt(3)||!e.charCodeAt(6)==="J".charCodeAt(0)||!e.charCodeAt(7)==="F".charCodeAt(0)||!e.charCodeAt(8)==="I".charCodeAt(0)||!e.charCodeAt(9)==="F".charCodeAt(0)||0===!e.charCodeAt(10))throw new Error("getJpegSize requires a binary string jpeg file");for(var o=256*e.charCodeAt(4)+e.charCodeAt(5),i=4,a=e.length;i<a;){if(i+=o,255!==e.charCodeAt(i))throw new Error("getJpegSize could not find the size of the image");if(192===e.charCodeAt(i+1)||193===e.charCodeAt(i+1)||194===e.charCodeAt(i+1)||195===e.charCodeAt(i+1)||196===e.charCodeAt(i+1)||197===e.charCodeAt(i+1)||198===e.charCodeAt(i+1)||199===e.charCodeAt(i+1))return n=256*e.charCodeAt(i+5)+e.charCodeAt(i+6),t=256*e.charCodeAt(i+7)+e.charCodeAt(i+8),r=e.charCodeAt(i+9),[t,n,r];i+=2,o=256*e.charCodeAt(i)+e.charCodeAt(i+1)}},y=function(e){var t=e[0]<<8|e[1];if(65496!==t)throw new Error("Supplied data is not a JPEG");for(var n,r,o,i,a=e.length,s=(e[4]<<8)+e[5],c=4;c<a;){if(c+=s,n=w(e,c),s=(n[2]<<8)+n[3],(192===n[1]||194===n[1])&&255===n[0]&&s>7)return n=w(e,c+5),r=(n[2]<<8)+n[3],o=(n[0]<<8)+n[1],i=n[4],{width:r,height:o,numcomponents:i};c+=2}throw new Error("getJpegSizeFromBytes could not find the size of the image")},w=function(e,t){return e.subarray(t,t+5)};e.processJPEG=function(e,t,n,r,o){var i,a=this.color_spaces.DEVICE_RGB,s=this.decode.DCT_DECODE,c=8;return this.isString(e)?(i=m(e),this.createImageInfo(e,i[0],i[1],1==i[3]?this.color_spaces.DEVICE_GRAY:a,c,s,t,n)):(this.isArrayBuffer(e)&&(e=new Uint8Array(e)),this.isArrayBufferView(e)?(i=y(e),e=o||this.arrayBufferToBinaryString(e),this.createImageInfo(e,i.width,i.height,1==i.numcomponents?this.color_spaces.DEVICE_GRAY:a,c,s,t,n)):null)},e.processJPG=function(){return this.processJPEG.apply(this,arguments)}}(o.API),function(e){"use strict";e.addDOM=function(e,t,r,o,i){var a=n(4);"number"!=typeof t&&(o=t,i=r),"function"==typeof o&&(i=o,o=null);var s=this.internal,c=s.scaleFactor,u=s.pageSize.width,f=s.pageSize.height;o=o||{},o.onrendered=function(e){t=parseInt(t)||0,r=parseInt(r)||0;var n=o.dim||{},a=n.h||0,s=n.w||Math.min(u,e.width/c)-t,l="JPEG";if(o.format&&(l=o.format),e.height>f&&o.pagesplit){var d=function(){for(var n=0;;){var o=document.createElement("canvas");o.width=Math.min(u*c,e.width),o.height=Math.min(f*c,e.height-n);var a=o.getContext("2d");a.drawImage(e,0,n,e.width,o.height,0,0,o.width,o.height);var d=[o,t,n?0:r,o.width/c,o.height/c,l,null,"SLOW"];if(this.addImage.apply(this,d),n+=o.height,n>=e.height)break;this.addPage()}i(s,n,null,d)}.bind(this);if("CANVAS"===e.nodeName){var h=new Image;h.onload=d,h.src=e.toDataURL("image/png"),e=h}else d()}else{var p=Math.random().toString(35),g=[e,t,r,s,a,l,p,"SLOW"];this.addImage.apply(this,g),i(s,a,p,g)}}.bind(this),a(e,{format:"jpg"},function(e){o.onrendered(e)})}}(o.API)},function(e,t,n){var r=n(2).saveAs,o=n(1),i=n(11);e.exports=function(e,t){var n=new i("p","pt","a4",!1),a=20,s=20,c=0,u=0,f=1,l=function(e){r(e.output("blob"),t+".pdf")};if(n.setFontSize(14),/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi.test(o.getText(e)))n.addDOM(e,s,a,function(){l(n)});else{for(var d,h=0,p=[],g=0;d=e.rows[g];g++){0===g&&(h=d.clientHeight),(g+1)%26===0&&(n.addPage(),f++,s+=10),u=s+g*h-280*(f-1);for(var v,b=0;v=d.cells[b];b++){0===g&&(p[b]=v.clientWidth),c=a;for(var m=0;m<b;m++)c+=p[m];n.text(o.getText(v),c,u)}}l(n)}}},function(e,t,n){var r=n(1);e.exports=function(e){for(var t,n='<?xml version="1.0" encoding="utf-8"?><table>',o=0;t=e.rows[o];o++){n+='<row id="'+o+'">';for(var i,a=0;i=t.cells[a];a++)n+="<column>"+r.getText(i)+"</column>";n+="</row>"}return n+="</table>"}}])});