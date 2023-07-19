ace.define("ace/ext/textarea",["require","exports","module","ace/lib/event","ace/lib/useragent","ace/ace"],(function(require,exports,module){"use strict";var event=require("../lib/event"),UA=require("../lib/useragent"),ace=require("../ace");module.exports=exports=ace;var getCSSProperty=function(element,container,property){var ret=element.style[property];return ret||(ret=window.getComputedStyle?window.getComputedStyle(element,"").getPropertyValue(property):element.currentStyle[property]),ret&&"auto"!=ret&&"intrinsic"!=ret||(ret=container.style[property]),ret};function applyStyles(elm,styles){for(var style in styles)elm.style[style]=styles[style]}exports.transformTextarea=function(element,options){var session,isFocused=element.autofocus||document.activeElement==element,container=function setupContainer(element,getValue){if("textarea"!=element.type)throw new Error("Textarea required!");var parentNode=element.parentNode,container=document.createElement("div"),resizeEvent=function(){var style="position:relative;";["margin-top","margin-left","margin-right","margin-bottom"].forEach((function(item){style+=item+":"+getCSSProperty(element,container,item)+";"}));var width=getCSSProperty(element,container,"width")||element.clientWidth+"px",height=getCSSProperty(element,container,"height")||element.clientHeight+"px";style+="height:"+height+";width:"+width+";",style+="display:inline-block;",container.setAttribute("style",style)};for(event.addListener(window,"resize",resizeEvent),resizeEvent(),parentNode.insertBefore(container,element.nextSibling);parentNode!==document;){if("FORM"===parentNode.tagName.toUpperCase()){var oldSumit=parentNode.onsubmit;parentNode.onsubmit=function(evt){element.value=getValue(),oldSumit&&oldSumit.call(this,evt)};break}parentNode=parentNode.parentNode}return container}(element,(function(){return session.getValue()}));element.style.display="none",container.style.background="white";var editorDiv=document.createElement("div");applyStyles(editorDiv,{top:"0px",left:"0px",right:"0px",bottom:"0px",border:"1px solid gray",position:"absolute"}),container.appendChild(editorDiv);var settingOpener=document.createElement("div");applyStyles(settingOpener,{position:"absolute",right:"0px",bottom:"0px",cursor:"nw-resize",border:"solid 9px",borderColor:"lightblue gray gray #ceade6",zIndex:101});var settingDiv=document.createElement("div"),settingDivStyles={top:"0px",left:"20%",right:"0px",bottom:"0px",position:"absolute",padding:"5px",zIndex:100,color:"white",display:"none",overflow:"auto",fontSize:"14px",boxShadow:"-5px 2px 3px gray"};UA.isOldIE?settingDivStyles.backgroundColor="#333":settingDivStyles.backgroundColor="rgba(0, 0, 0, 0.6)",applyStyles(settingDiv,settingDivStyles),container.appendChild(settingDiv),options=options||exports.defaultOptions;var editor=ace.edit(editorDiv);(session=editor.getSession()).setValue(element.value||element.innerHTML),isFocused&&editor.focus(),container.appendChild(settingOpener),function setupApi(editor,editorDiv,settingDiv,ace,options){function toBool(value){return"true"===value||1==value}return editor.setDisplaySettings=function(display){null==display&&(display="none"==settingDiv.style.display),display?(settingDiv.style.display="block",settingDiv.hideButton.focus(),editor.on("focus",(function onFocus(){editor.removeListener("focus",onFocus),settingDiv.style.display="none"}))):editor.focus()},editor.$setOption=editor.setOption,editor.$getOption=editor.getOption,editor.setOption=function(key,value){switch(key){case"mode":editor.$setOption("mode","ace/mode/"+value);break;case"theme":editor.$setOption("theme","ace/theme/"+value);break;case"keybindings":switch(value){case"vim":editor.setKeyboardHandler("ace/keyboard/vim");break;case"emacs":editor.setKeyboardHandler("ace/keyboard/emacs");break;default:editor.setKeyboardHandler(null)}break;case"wrap":case"fontSize":editor.$setOption(key,value);break;default:editor.$setOption(key,toBool(value))}},editor.getOption=function(key){switch(key){case"mode":return editor.$getOption("mode").substr("ace/mode/".length);case"theme":return editor.$getOption("theme").substr("ace/theme/".length);case"keybindings":var value=editor.getKeyboardHandler();switch(value&&value.$id){case"ace/keyboard/vim":return"vim";case"ace/keyboard/emacs":return"emacs";default:return"ace"}break;default:return editor.$getOption(key)}},editor.setOptions(options),editor}(editor,0,settingDiv,0,options),function setupSettingPanel(settingDiv,settingOpener,editor){var BOOL=null,desc={mode:"Mode:",wrap:"Soft Wrap:",theme:"Theme:",fontSize:"Font Size:",showGutter:"Display Gutter:",keybindings:"Keyboard",showPrintMargin:"Show Print Margin:",useSoftTabs:"Use Soft Tabs:",showInvisibles:"Show Invisibles"},optionValues={mode:{text:"Plain",javascript:"JavaScript",xml:"XML",html:"HTML",css:"CSS",scss:"SCSS",python:"Python",php:"PHP",java:"Java",ruby:"Ruby",c_cpp:"C/C++",coffee:"CoffeeScript",json:"json",perl:"Perl",clojure:"Clojure",ocaml:"OCaml",csharp:"C#",haxe:"haXe",svg:"SVG",textile:"Textile",groovy:"Groovy",liquid:"Liquid",Scala:"Scala"},theme:{clouds:"Clouds",clouds_midnight:"Clouds Midnight",cobalt:"Cobalt",crimson_editor:"Crimson Editor",dawn:"Dawn",gob:"Green on Black",eclipse:"Eclipse",idle_fingers:"Idle Fingers",kr_theme:"Kr Theme",merbivore:"Merbivore",merbivore_soft:"Merbivore Soft",mono_industrial:"Mono Industrial",monokai:"Monokai",pastel_on_dark:"Pastel On Dark",solarized_dark:"Solarized Dark",solarized_light:"Solarized Light",textmate:"Textmate",twilight:"Twilight",vibrant_ink:"Vibrant Ink"},showGutter:BOOL,fontSize:{"10px":"10px","11px":"11px","12px":"12px","14px":"14px","16px":"16px"},wrap:{off:"Off",40:"40",80:"80",free:"Free"},keybindings:{ace:"ace",vim:"vim",emacs:"emacs"},showPrintMargin:BOOL,useSoftTabs:BOOL,showInvisibles:BOOL},table=[];function renderOption(builder,option,obj,cValue){if(obj){for(var value in builder.push("<select title='"+option+"'>"),obj)builder.push("<option value='"+value+"' "),cValue==value&&builder.push(" selected "),builder.push(">",obj[value],"</option>");builder.push("</select>")}else builder.push("<input type='checkbox' title='",option,"' ",cValue+""=="true"?"checked='true'":"","'></input>")}for(var option in table.push("<table><tr><th>Setting</th><th>Value</th></tr>"),exports.defaultOptions)table.push("<tr><td>",desc[option],"</td>"),table.push("<td>"),renderOption(table,option,optionValues[option],editor.getOption(option)),table.push("</td></tr>");table.push("</table>"),settingDiv.innerHTML=table.join("");for(var onChange=function(e){var select=e.currentTarget;editor.setOption(select.title,select.value)},onClick=function(e){var cb=e.currentTarget;editor.setOption(cb.title,cb.checked)},selects=settingDiv.getElementsByTagName("select"),i=0;i<selects.length;i++)selects[i].onchange=onChange;var cbs=settingDiv.getElementsByTagName("input");for(i=0;i<cbs.length;i++)cbs[i].onclick=onClick;var button=document.createElement("input");button.type="button",button.value="Hide",event.addListener(button,"click",(function(){editor.setDisplaySettings(!1)})),settingDiv.appendChild(button),settingDiv.hideButton=button}(settingDiv,0,editor);var state="";return event.addListener(settingOpener,"mousemove",(function(e){var rect=this.getBoundingClientRect();e.clientX-rect.left+(e.clientY-rect.top)<(rect.width+rect.height)/2?(this.style.cursor="pointer",state="toggle"):(state="resize",this.style.cursor="nw-resize")})),event.addListener(settingOpener,"mousedown",(function(e){if(e.preventDefault(),"toggle"!=state){container.style.zIndex=1e5;var rect=container.getBoundingClientRect(),startX=rect.width+rect.left-e.clientX,startY=rect.height+rect.top-e.clientY;event.capture(settingOpener,(function(e){container.style.width=e.clientX-rect.left+startX+"px",container.style.height=e.clientY-rect.top+startY+"px",editor.resize()}),(function(){}))}else editor.setDisplaySettings()})),editor},exports.defaultOptions={mode:"javascript",theme:"textmate",wrap:"off",fontSize:"12px",showGutter:"false",keybindings:"ace",showPrintMargin:"false",useSoftTabs:"true",showInvisibles:"false"}})),ace.require(["ace/ext/textarea"],(function(m){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=m)}));