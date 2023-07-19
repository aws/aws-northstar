ace.define("ace/ext/menu_tools/settings_menu.css",["require","exports","module"],(function(require,exports,module){module.exports="#ace_settingsmenu, #kbshortcutmenu {\n    background-color: #F7F7F7;\n    color: black;\n    box-shadow: -5px 4px 5px rgba(126, 126, 126, 0.55);\n    padding: 1em 0.5em 2em 1em;\n    overflow: auto;\n    position: absolute;\n    margin: 0;\n    bottom: 0;\n    right: 0;\n    top: 0;\n    z-index: 9991;\n    cursor: default;\n}\n\n.ace_dark #ace_settingsmenu, .ace_dark #kbshortcutmenu {\n    box-shadow: -20px 10px 25px rgba(126, 126, 126, 0.25);\n    background-color: rgba(255, 255, 255, 0.6);\n    color: black;\n}\n\n.ace_optionsMenuEntry:hover {\n    background-color: rgba(100, 100, 100, 0.1);\n    transition: all 0.3s\n}\n\n.ace_closeButton {\n    background: rgba(245, 146, 146, 0.5);\n    border: 1px solid #F48A8A;\n    border-radius: 50%;\n    padding: 7px;\n    position: absolute;\n    right: -8px;\n    top: -8px;\n    z-index: 100000;\n}\n.ace_closeButton{\n    background: rgba(245, 146, 146, 0.9);\n}\n.ace_optionsMenuKey {\n    color: darkslateblue;\n    font-weight: bold;\n}\n.ace_optionsMenuCommand {\n    color: darkcyan;\n    font-weight: normal;\n}\n.ace_optionsMenuEntry input, .ace_optionsMenuEntry button {\n    vertical-align: middle;\n}\n\n.ace_optionsMenuEntry button[ace_selected_button=true] {\n    background: #e7e7e7;\n    box-shadow: 1px 0px 2px 0px #adadad inset;\n    border-color: #adadad;\n}\n.ace_optionsMenuEntry button {\n    background: white;\n    border: 1px solid lightgray;\n    margin: 0px;\n}\n.ace_optionsMenuEntry button:hover{\n    background: #f0f0f0;\n}"})),ace.define("ace/ext/menu_tools/overlay_page",["require","exports","module","ace/lib/dom","ace/ext/menu_tools/settings_menu.css"],(function(require,exports,module){"use strict";var dom=require("../../lib/dom"),cssText=require("./settings_menu.css");dom.importCssString(cssText,"settings_menu.css",!1),module.exports.overlayPage=function overlayPage(editor,contentElement,callback){var closer=document.createElement("div"),ignoreFocusOut=!1;function documentEscListener(e){27===e.keyCode&&close()}function close(){closer&&(document.removeEventListener("keydown",documentEscListener),closer.parentNode.removeChild(closer),editor&&editor.focus(),closer=null,callback&&callback())}return closer.style.cssText="margin: 0; padding: 0; position: fixed; top:0; bottom:0; left:0; right:0;z-index: 9990; "+(editor?"background-color: rgba(0, 0, 0, 0.3);":""),closer.addEventListener("click",(function(e){ignoreFocusOut||close()})),document.addEventListener("keydown",documentEscListener),contentElement.addEventListener("click",(function(e){e.stopPropagation()})),closer.appendChild(contentElement),document.body.appendChild(closer),editor&&editor.blur(),{close:close,setIgnoreFocusOut:function setIgnoreFocusOut(ignore){ignoreFocusOut=ignore,ignore&&(closer.style.pointerEvents="none",contentElement.style.pointerEvents="auto")}}}})),ace.define("ace/ext/modelist",["require","exports","module"],(function(require,exports,module){"use strict";var modes=[];var Mode=function(){function Mode(name,caption,extensions){var re;this.name=name,this.caption=caption,this.mode="ace/mode/"+name,this.extensions=extensions,re=/\^/.test(extensions)?extensions.replace(/\|(\^)?/g,(function(a,b){return"$|"+(b?"^":"^.*\\.")}))+"$":"^.*\\.("+extensions+")$",this.extRe=new RegExp(re,"gi")}return Mode.prototype.supportsFile=function(filename){return filename.match(this.extRe)},Mode}(),supportedModes={ABAP:["abap"],ABC:["abc"],ActionScript:["as"],ADA:["ada|adb"],Alda:["alda"],Apache_Conf:["^htaccess|^htgroups|^htpasswd|^conf|htaccess|htgroups|htpasswd"],Apex:["apex|cls|trigger|tgr"],AQL:["aql"],AsciiDoc:["asciidoc|adoc"],ASL:["dsl|asl|asl.json"],Assembly_x86:["asm|a"],AutoHotKey:["ahk"],BatchFile:["bat|cmd"],BibTeX:["bib"],C_Cpp:["cpp|c|cc|cxx|h|hh|hpp|ino"],C9Search:["c9search_results"],Cirru:["cirru|cr"],Clojure:["clj|cljs"],Cobol:["CBL|COB"],coffee:["coffee|cf|cson|^Cakefile"],ColdFusion:["cfm|cfc"],Crystal:["cr"],CSharp:["cs"],Csound_Document:["csd"],Csound_Orchestra:["orc"],Csound_Score:["sco"],CSS:["css"],Curly:["curly"],D:["d|di"],Dart:["dart"],Diff:["diff|patch"],Dockerfile:["^Dockerfile"],Dot:["dot"],Drools:["drl"],Edifact:["edi"],Eiffel:["e|ge"],EJS:["ejs"],Elixir:["ex|exs"],Elm:["elm"],Erlang:["erl|hrl"],Forth:["frt|fs|ldr|fth|4th"],Fortran:["f|f90"],FSharp:["fsi|fs|ml|mli|fsx|fsscript"],FSL:["fsl"],FTL:["ftl"],Gcode:["gcode"],Gherkin:["feature"],Gitignore:["^.gitignore"],Glsl:["glsl|frag|vert"],Gobstones:["gbs"],golang:["go"],GraphQLSchema:["gql"],Groovy:["groovy"],HAML:["haml"],Handlebars:["hbs|handlebars|tpl|mustache"],Haskell:["hs"],Haskell_Cabal:["cabal"],haXe:["hx"],Hjson:["hjson"],HTML:["html|htm|xhtml|vue|we|wpy"],HTML_Elixir:["eex|html.eex"],HTML_Ruby:["erb|rhtml|html.erb"],INI:["ini|conf|cfg|prefs"],Io:["io"],Ion:["ion"],Jack:["jack"],Jade:["jade|pug"],Java:["java"],JavaScript:["js|jsm|jsx|cjs|mjs"],JEXL:["jexl"],JSON:["json"],JSON5:["json5"],JSONiq:["jq"],JSP:["jsp"],JSSM:["jssm|jssm_state"],JSX:["jsx"],Julia:["jl"],Kotlin:["kt|kts"],LaTeX:["tex|latex|ltx|bib"],Latte:["latte"],LESS:["less"],Liquid:["liquid"],Lisp:["lisp"],LiveScript:["ls"],Log:["log"],LogiQL:["logic|lql"],Logtalk:["lgt"],LSL:["lsl"],Lua:["lua"],LuaPage:["lp"],Lucene:["lucene"],Makefile:["^Makefile|^GNUmakefile|^makefile|^OCamlMakefile|make"],Markdown:["md|markdown"],Mask:["mask"],MATLAB:["matlab"],Maze:["mz"],MediaWiki:["wiki|mediawiki"],MEL:["mel"],MIPS:["s|asm"],MIXAL:["mixal"],MUSHCode:["mc|mush"],MySQL:["mysql"],Nginx:["nginx|conf"],Nim:["nim"],Nix:["nix"],NSIS:["nsi|nsh"],Nunjucks:["nunjucks|nunjs|nj|njk"],ObjectiveC:["m|mm"],OCaml:["ml|mli"],Odin:["odin"],PartiQL:["partiql|pql"],Pascal:["pas|p"],Perl:["pl|pm"],pgSQL:["pgsql"],PHP:["php|inc|phtml|shtml|php3|php4|php5|phps|phpt|aw|ctp|module"],PHP_Laravel_blade:["blade.php"],Pig:["pig"],PLSQL:["plsql"],Powershell:["ps1"],Praat:["praat|praatscript|psc|proc"],Prisma:["prisma"],Prolog:["plg|prolog"],Properties:["properties"],Protobuf:["proto"],Puppet:["epp|pp"],Python:["py"],QML:["qml"],R:["r"],Raku:["raku|rakumod|rakutest|p6|pl6|pm6"],Razor:["cshtml|asp"],RDoc:["Rd"],Red:["red|reds"],RHTML:["Rhtml"],Robot:["robot|resource"],RST:["rst"],Ruby:["rb|ru|gemspec|rake|^Guardfile|^Rakefile|^Gemfile"],Rust:["rs"],SaC:["sac"],SASS:["sass"],SCAD:["scad"],Scala:["scala|sbt"],Scheme:["scm|sm|rkt|oak|scheme"],Scrypt:["scrypt"],SCSS:["scss"],SH:["sh|bash|^.bashrc"],SJS:["sjs"],Slim:["slim|skim"],Smarty:["smarty|tpl"],Smithy:["smithy"],snippets:["snippets"],Soy_Template:["soy"],Space:["space"],SPARQL:["rq"],SQL:["sql"],SQLServer:["sqlserver"],Stylus:["styl|stylus"],SVG:["svg"],Swift:["swift"],Tcl:["tcl"],Terraform:["tf","tfvars","terragrunt"],Tex:["tex"],Text:["txt"],Textile:["textile"],Toml:["toml"],TSX:["tsx"],Turtle:["ttl"],Twig:["twig|swig"],Typescript:["ts|typescript|str"],Vala:["vala"],VBScript:["vbs|vb"],Velocity:["vm"],Verilog:["v|vh|sv|svh"],VHDL:["vhd|vhdl"],Visualforce:["vfp|component|page"],Wollok:["wlk|wpgm|wtest"],XML:["xml|rdf|rss|wsdl|xslt|atom|mathml|mml|xul|xbl|xaml"],XQuery:["xq"],YAML:["yaml|yml"],Zeek:["zeek|bro"],Django:["html"]},nameOverrides={ObjectiveC:"Objective-C",CSharp:"C#",golang:"Go",C_Cpp:"C and C++",Csound_Document:"Csound Document",Csound_Orchestra:"Csound",Csound_Score:"Csound Score",coffee:"CoffeeScript",HTML_Ruby:"HTML (Ruby)",HTML_Elixir:"HTML (Elixir)",FTL:"FreeMarker",PHP_Laravel_blade:"PHP (Blade Template)",Perl6:"Perl 6",AutoHotKey:"AutoHotkey / AutoIt"},modesByName={};for(var name in supportedModes){var data=supportedModes[name],displayName=(nameOverrides[name]||name).replace(/_/g," "),filename=name.toLowerCase(),mode=new Mode(filename,displayName,data[0]);modesByName[filename]=mode,modes.push(mode)}module.exports={getModeForPath:function getModeForPath(path){for(var mode=modesByName.text,fileName=path.split(/[\/\\]/).pop(),i=0;i<modes.length;i++)if(modes[i].supportsFile(fileName)){mode=modes[i];break}return mode},modes:modes,modesByName:modesByName}})),ace.define("ace/ext/themelist",["require","exports","module"],(function(require,exports,module){"use strict";exports.themesByName={},exports.themes=[["Chrome"],["Clouds"],["Crimson Editor"],["Dawn"],["Dreamweaver"],["Eclipse"],["GitHub"],["IPlastic"],["Solarized Light"],["TextMate"],["Tomorrow"],["XCode"],["Kuroir"],["KatzenMilch"],["SQL Server","sqlserver","light"],["Ambiance","ambiance","dark"],["Chaos","chaos","dark"],["Clouds Midnight","clouds_midnight","dark"],["Dracula","","dark"],["Cobalt","cobalt","dark"],["Gruvbox","gruvbox","dark"],["Green on Black","gob","dark"],["idle Fingers","idle_fingers","dark"],["krTheme","kr_theme","dark"],["Merbivore","merbivore","dark"],["Merbivore Soft","merbivore_soft","dark"],["Mono Industrial","mono_industrial","dark"],["Monokai","monokai","dark"],["Nord Dark","nord_dark","dark"],["One Dark","one_dark","dark"],["Pastel on dark","pastel_on_dark","dark"],["Solarized Dark","solarized_dark","dark"],["Terminal","terminal","dark"],["Tomorrow Night","tomorrow_night","dark"],["Tomorrow Night Blue","tomorrow_night_blue","dark"],["Tomorrow Night Bright","tomorrow_night_bright","dark"],["Tomorrow Night 80s","tomorrow_night_eighties","dark"],["Twilight","twilight","dark"],["Vibrant Ink","vibrant_ink","dark"],["GitHub Dark","github_dark","dark"]].map((function(data){var name=data[1]||data[0].replace(/ /g,"_").toLowerCase(),theme={caption:data[0],theme:"ace/theme/"+name,isDark:"dark"==data[2],name:name};return exports.themesByName[name]=theme,theme}))})),ace.define("ace/ext/options",["require","exports","module","ace/ext/menu_tools/overlay_page","ace/lib/dom","ace/lib/oop","ace/config","ace/lib/event_emitter","ace/ext/modelist","ace/ext/themelist"],(function(require,exports,module){"use strict";require("./menu_tools/overlay_page");var dom=require("../lib/dom"),oop=require("../lib/oop"),config=require("../config"),EventEmitter=require("../lib/event_emitter").EventEmitter,buildDom=dom.buildDom,modelist=require("./modelist"),themelist=require("./themelist"),themes={Bright:[],Dark:[]};themelist.themes.forEach((function(x){themes[x.isDark?"Dark":"Bright"].push({caption:x.caption,value:x.theme})}));var optionGroups={Main:{Mode:{path:"mode",type:"select",items:modelist.modes.map((function(x){return{caption:x.caption,value:x.mode}}))},Theme:{path:"theme",type:"select",items:themes},Keybinding:{type:"buttonBar",path:"keyboardHandler",items:[{caption:"Ace",value:null},{caption:"Vim",value:"ace/keyboard/vim"},{caption:"Emacs",value:"ace/keyboard/emacs"},{caption:"Sublime",value:"ace/keyboard/sublime"},{caption:"VSCode",value:"ace/keyboard/vscode"}]},"Font Size":{path:"fontSize",type:"number",defaultValue:12,defaults:[{caption:"12px",value:12},{caption:"24px",value:24}]},"Soft Wrap":{type:"buttonBar",path:"wrap",items:[{caption:"Off",value:"off"},{caption:"View",value:"free"},{caption:"margin",value:"printMargin"},{caption:"40",value:"40"}]},"Cursor Style":{path:"cursorStyle",items:[{caption:"Ace",value:"ace"},{caption:"Slim",value:"slim"},{caption:"Smooth",value:"smooth"},{caption:"Smooth And Slim",value:"smooth slim"},{caption:"Wide",value:"wide"}]},Folding:{path:"foldStyle",items:[{caption:"Manual",value:"manual"},{caption:"Mark begin",value:"markbegin"},{caption:"Mark begin and end",value:"markbeginend"}]},"Soft Tabs":[{path:"useSoftTabs"},{ariaLabel:"Tab Size",path:"tabSize",type:"number",values:[2,3,4,8,16]}],Overscroll:{type:"buttonBar",path:"scrollPastEnd",items:[{caption:"None",value:0},{caption:"Half",value:.5},{caption:"Full",value:1}]}},More:{"Atomic soft tabs":{path:"navigateWithinSoftTabs"},"Enable Behaviours":{path:"behavioursEnabled"},"Wrap with quotes":{path:"wrapBehavioursEnabled"},"Enable Auto Indent":{path:"enableAutoIndent"},"Full Line Selection":{type:"checkbox",values:"text|line",path:"selectionStyle"},"Highlight Active Line":{path:"highlightActiveLine"},"Show Invisibles":{path:"showInvisibles"},"Show Indent Guides":{path:"displayIndentGuides"},"Highlight Indent Guides":{path:"highlightIndentGuides"},"Persistent HScrollbar":{path:"hScrollBarAlwaysVisible"},"Persistent VScrollbar":{path:"vScrollBarAlwaysVisible"},"Animate scrolling":{path:"animatedScroll"},"Show Gutter":{path:"showGutter"},"Show Line Numbers":{path:"showLineNumbers"},"Relative Line Numbers":{path:"relativeLineNumbers"},"Fixed Gutter Width":{path:"fixedWidthGutter"},"Show Print Margin":[{path:"showPrintMargin"},{ariaLabel:"Print Margin",type:"number",path:"printMarginColumn"}],"Indented Soft Wrap":{path:"indentedSoftWrap"},"Highlight selected word":{path:"highlightSelectedWord"},"Fade Fold Widgets":{path:"fadeFoldWidgets"},"Use textarea for IME":{path:"useTextareaForIME"},"Merge Undo Deltas":{path:"mergeUndoDeltas",items:[{caption:"Always",value:"always"},{caption:"Never",value:"false"},{caption:"Timed",value:"true"}]},"Elastic Tabstops":{path:"useElasticTabstops"},"Incremental Search":{path:"useIncrementalSearch"},"Read-only":{path:"readOnly"},"Copy without selection":{path:"copyWithEmptySelection"},"Live Autocompletion":{path:"enableLiveAutocompletion"},"Custom scrollbar":{path:"customScrollbar"},"Use SVG gutter icons":{path:"useSvgGutterIcons"},"Annotations for folded lines":{path:"showFoldedAnnotations"},"Keyboard Accessibility Mode":{path:"enableKeyboardAccessibility"},"Gutter tooltip follows mouse":{path:"tooltipFollowsMouse",defaultValue:!0}}},OptionPanel=function(){function OptionPanel(editor,element){this.editor=editor,this.container=element||document.createElement("div"),this.groups=[],this.options={}}return OptionPanel.prototype.add=function(config){config.Main&&oop.mixin(optionGroups.Main,config.Main),config.More&&oop.mixin(optionGroups.More,config.More)},OptionPanel.prototype.render=function(){this.container.innerHTML="",buildDom(["table",{role:"presentation",id:"controls"},this.renderOptionGroup(optionGroups.Main),["tr",null,["td",{colspan:2},["table",{role:"presentation",id:"more-controls"},this.renderOptionGroup(optionGroups.More)]]],["tr",null,["td",{colspan:2},"version "+config.version]]],this.container)},OptionPanel.prototype.renderOptionGroup=function(group){return Object.keys(group).map((function(key,i){var item=group[key];return item.position||(item.position=i/1e4),item.label||(item.label=key),item})).sort((function(a,b){return a.position-b.position})).map((function(item){return this.renderOption(item.label,item)}),this)},OptionPanel.prototype.renderOptionControl=function(key,option){var control,self=this;if(Array.isArray(option))return option.map((function(x){return self.renderOptionControl(key,x)}));var value=self.getOption(option);if(option.values&&"checkbox"!=option.type&&("string"==typeof option.values&&(option.values=option.values.split("|")),option.items=option.values.map((function(v){return{value:v,name:v}}))),"buttonBar"==option.type)control=["div",{role:"group","aria-labelledby":option.path+"-label"},option.items.map((function(item){return["button",{value:item.value,ace_selected_button:value==item.value,"aria-pressed":value==item.value,onclick:function(){self.setOption(option,item.value);for(var nodes=this.parentNode.querySelectorAll("[ace_selected_button]"),i=0;i<nodes.length;i++)nodes[i].removeAttribute("ace_selected_button"),nodes[i].setAttribute("aria-pressed",!1);this.setAttribute("ace_selected_button",!0),this.setAttribute("aria-pressed",!0)}},item.desc||item.caption||item.name]}))];else if("number"==option.type)control=["input",{type:"number",value:value||option.defaultValue,style:"width:3em",oninput:function(){self.setOption(option,parseInt(this.value))}}],option.ariaLabel?control[1]["aria-label"]=option.ariaLabel:control[1].id=key,option.defaults&&(control=[control,option.defaults.map((function(item){return["button",{onclick:function(){var input=this.parentNode.firstChild;input.value=item.value,input.oninput()}},item.caption]}))]);else if(option.items){var buildItems=function(items){return items.map((function(item){return["option",{value:item.value||item.name},item.desc||item.caption||item.name]}))},items=Array.isArray(option.items)?buildItems(option.items):Object.keys(option.items).map((function(key){return["optgroup",{label:key},buildItems(option.items[key])]}));control=["select",{id:key,value:value,onchange:function(){self.setOption(option,this.value)}},items]}else"string"==typeof option.values&&(option.values=option.values.split("|")),option.values&&(value=value==option.values[1]),control=["input",{type:"checkbox",id:key,checked:value||null,onchange:function(){var value=this.checked;option.values&&(value=option.values[value?1:0]),self.setOption(option,value)}}],"checkedNumber"==option.type&&(control=[control,[]]);return control},OptionPanel.prototype.renderOption=function(key,option){if(!option.path||option.onchange||this.editor.$options[option.path]){var path=Array.isArray(option)?option[0].path:option.path;this.options[path]=option;var safeKey="-"+path;return["tr",{class:"ace_optionsMenuEntry"},["td",["label",{for:safeKey,id:path+"-label"},key]],["td",this.renderOptionControl(safeKey,option)]]}},OptionPanel.prototype.setOption=function(option,value){"string"==typeof option&&(option=this.options[option]),"false"==value&&(value=!1),"true"==value&&(value=!0),"null"==value&&(value=null),"undefined"==value&&(value=void 0),"string"==typeof value&&parseFloat(value).toString()==value&&(value=parseFloat(value)),option.onchange?option.onchange(value):option.path&&this.editor.setOption(option.path,value),this._signal("setOption",{name:option.path,value:value})},OptionPanel.prototype.getOption=function(option){return option.getValue?option.getValue():this.editor.getOption(option.path)},OptionPanel}();oop.implement(OptionPanel.prototype,EventEmitter),exports.OptionPanel=OptionPanel})),ace.define("ace/ext/settings_menu",["require","exports","module","ace/ext/options","ace/ext/menu_tools/overlay_page","ace/editor"],(function(require,exports,module){"use strict";var OptionPanel=require("./options").OptionPanel,overlayPage=require("./menu_tools/overlay_page").overlayPage;module.exports.init=function(){require("../editor").Editor.prototype.showSettingsMenu=function(){!function showSettingsMenu(editor){if(!document.getElementById("ace_settingsmenu")){var options=new OptionPanel(editor);options.render(),options.container.id="ace_settingsmenu",overlayPage(editor,options.container),options.container.querySelector("select,input,button,checkbox").focus()}}(this)}}})),ace.require(["ace/ext/settings_menu"],(function(m){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=m)}));