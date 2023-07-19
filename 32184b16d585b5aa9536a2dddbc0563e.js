ace.define("ace/mode/crystal_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],(function(require,exports,module){"use strict";var oop=require("../lib/oop"),TextHighlightRules=require("./text_highlight_rules").TextHighlightRules,CrystalHighlightRules=function(){var keywordMapper=this.$keywords=this.createKeywordMapper({keyword:"if|end|else|elsif|unless|case|when|break|while|next|until|def|return|class|new|getter|setter|property|lib|fun|do|struct|private|protected|public|module|super|abstract|include|extend|begin|enum|raise|yield|with|alias|rescue|ensure|macro|uninitialized|union|type|require","constant.language":"true|TRUE|false|FALSE|nil|NIL|__LINE__|__END_LINE__|__FILE__|__DIR__","variable.language":"$DEBUG|$defout|$FILENAME|$LOAD_PATH|$SAFE|$stdin|$stdout|$stderr|$VERBOSE|root_url|flash|session|cookies|params|request|response|logger|self","support.function":"puts|initialize|previous_def|typeof|as|pointerof|sizeof|instance_sizeof"},"identifier"),extEscapeExspresssion=/\\(?:[nsrtvfbae'"\\]|[0-7]{3}|x[\da-fA-F]{2}|u[\da-fA-F]{4}|u{[\da-fA-F]{1,6}}|u{(:?[\da-fA-F]{2}\s)*[\da-fA-F]{2}})/;this.$rules={start:[{token:"comment",regex:"#.*$"},{token:"string.regexp",regex:"[/]",push:[{token:"constant.language.escape",regex:extEscapeExspresssion},{token:"string.regexp",regex:"[/][imx]*(?=[).,;\\s]|$)",next:"pop"},{defaultToken:"string.regexp"}]},[{regex:"[{}]",onMatch:function(val,state,stack){return this.next="{"==val?this.nextState:"","{"==val&&stack.length?(stack.unshift("start",state),"paren.lparen"):"}"==val&&stack.length&&(stack.shift(),this.next=stack.shift(),-1!=this.next.indexOf("string"))?"paren.end":"{"==val?"paren.lparen":"paren.rparen"},nextState:"start"},{token:"string.start",regex:/"/,push:[{token:"constant.language.escape",regex:extEscapeExspresssion},{token:"string",regex:/\\#{/},{token:"paren.start",regex:/#{/,push:"start"},{token:"string.end",regex:/"/,next:"pop"},{defaultToken:"string"}]},{token:"string.start",regex:/`/,push:[{token:"constant.language.escape",regex:extEscapeExspresssion},{token:"string",regex:/\\#{/},{token:"paren.start",regex:/#{/,push:"start"},{token:"string.end",regex:/`/,next:"pop"},{defaultToken:"string"}]},{stateName:"rpstring",token:"string.start",regex:/%[Qx]?\(/,push:[{token:"constant.language.escape",regex:extEscapeExspresssion},{token:"string.start",regex:/\(/,push:"rpstring"},{token:"string.end",regex:/\)/,next:"pop"},{token:"paren.start",regex:/#{/,push:"start"},{defaultToken:"string"}]},{stateName:"spstring",token:"string.start",regex:/%[Qx]?\[/,push:[{token:"constant.language.escape",regex:extEscapeExspresssion},{token:"string.start",regex:/\[/,push:"spstring"},{token:"string.end",regex:/]/,next:"pop"},{token:"paren.start",regex:/#{/,push:"start"},{defaultToken:"string"}]},{stateName:"fpstring",token:"string.start",regex:/%[Qx]?{/,push:[{token:"constant.language.escape",regex:extEscapeExspresssion},{token:"string.start",regex:/{/,push:"fpstring"},{token:"string.end",regex:/}/,next:"pop"},{token:"paren.start",regex:/#{/,push:"start"},{defaultToken:"string"}]},{stateName:"tpstring",token:"string.start",regex:/%[Qx]?</,push:[{token:"constant.language.escape",regex:extEscapeExspresssion},{token:"string.start",regex:/</,push:"tpstring"},{token:"string.end",regex:/>/,next:"pop"},{token:"paren.start",regex:/#{/,push:"start"},{defaultToken:"string"}]},{stateName:"ppstring",token:"string.start",regex:/%[Qx]?\|/,push:[{token:"constant.language.escape",regex:extEscapeExspresssion},{token:"string.end",regex:/\|/,next:"pop"},{token:"paren.start",regex:/#{/,push:"start"},{defaultToken:"string"}]},{stateName:"rpqstring",token:"string.start",regex:/%[qwir]\(/,push:[{token:"string.start",regex:/\(/,push:"rpqstring"},{token:"string.end",regex:/\)/,next:"pop"},{defaultToken:"string"}]},{stateName:"spqstring",token:"string.start",regex:/%[qwir]\[/,push:[{token:"string.start",regex:/\[/,push:"spqstring"},{token:"string.end",regex:/]/,next:"pop"},{defaultToken:"string"}]},{stateName:"fpqstring",token:"string.start",regex:/%[qwir]{/,push:[{token:"string.start",regex:/{/,push:"fpqstring"},{token:"string.end",regex:/}/,next:"pop"},{defaultToken:"string"}]},{stateName:"tpqstring",token:"string.start",regex:/%[qwir]</,push:[{token:"string.start",regex:/</,push:"tpqstring"},{token:"string.end",regex:/>/,next:"pop"},{defaultToken:"string"}]},{stateName:"ppqstring",token:"string.start",regex:/%[qwir]\|/,push:[{token:"string.end",regex:/\|/,next:"pop"},{defaultToken:"string"}]},{token:"string.start",regex:/'/,push:[{token:"constant.language.escape",regex:/\\(?:[nsrtvfbae'"\\]|[0-7]{3}|x[\da-fA-F]{2}|u[\da-fA-F]{4}|u{[\da-fA-F]{1,6}})/},{token:"string.end",regex:/'|$/,next:"pop"},{defaultToken:"string"}]}],{token:"text",regex:"::"},{token:"variable.instance",regex:"@{1,2}[a-zA-Z_\\d]+"},{token:"variable.fresh",regex:"%[a-zA-Z_\\d]+"},{token:"support.class",regex:"[A-Z][a-zA-Z_\\d]+"},{token:"constant.other.symbol",regex:"[:](?:(?:===|<=>|\\[]\\?|\\[]=|\\[]|>>|\\*\\*|<<|==|!=|>=|<=|!~|=~|<|\\+|-|\\*|\\/|%|&|\\||\\^|>|!|~)|(?:(?:[A-Za-z_]|[@$](?=[a-zA-Z0-9_]))[a-zA-Z0-9_]*[!=?]?))"},{token:"constant.numeric",regex:"[+-]?\\d(?:\\d|_(?=\\d))*(?:(?:\\.\\d(?:\\d|_(?=\\d))*)?(?:[eE][+-]?\\d+)?)?(?:_?[fF](?:32|64))?\\b"},{token:"constant.numeric",regex:"(?:[+-]?)(?:(?:0[xX][\\dA-Fa-f]+)|(?:[0-9][\\d_]*)|(?:0o[0-7][0-7]*)|(?:0[bB][01]+))(?:_?[iIuU](?:8|16|32|64))?\\b"},{token:"constant.other.symbol",regex:':"',push:[{token:"constant.language.escape",regex:extEscapeExspresssion},{token:"constant.other.symbol",regex:'"',next:"pop"},{defaultToken:"constant.other.symbol"}]},{token:"constant.language.boolean",regex:"(?:true|false)\\b"},{token:"support.function",regex:"(?:is_a\\?|nil\\?|responds_to\\?|as\\?)"},{token:keywordMapper,regex:"[a-zA-Z_$][a-zA-Z0-9_$!?]*\\b"},{token:"variable.system",regex:"\\$\\!|\\$\\?"},{token:"punctuation.separator.key-value",regex:"=>"},{stateName:"heredoc",onMatch:function(value,currentState,stack){var tokens=value.split(this.splitRegex);return stack.push("heredoc",tokens[3]),[{type:"constant",value:tokens[1]},{type:"string",value:tokens[2]},{type:"support.class",value:tokens[3]},{type:"string",value:tokens[4]}]},regex:"(<<-)([']?)([\\w]+)([']?)",rules:{heredoc:[{token:"string",regex:"^ +"},{onMatch:function(value,currentState,stack){return value===stack[1]?(stack.shift(),stack.shift(),this.next=stack[0]||"start","support.class"):(this.next="","string")},regex:".*$",next:"start"}]}},{regex:"$",token:"empty",next:function(currentState,stack){return"heredoc"===stack[0]?stack[0]:currentState}},{token:"punctuation.operator",regex:/[.]\s*(?![.])/,push:[{token:"punctuation.operator",regex:/[.]\s*(?![.])/},{token:"support.function",regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{regex:"",token:"empty",next:"pop"}]},{token:"keyword.operator",regex:"!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|\\?|\\:|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\^|\\|"},{token:"punctuation.operator",regex:/[?:,;.]/},{token:"paren.lparen",regex:"[[({]"},{token:"paren.rparen",regex:"[\\])}]"},{token:"text",regex:"\\s+"}]},this.normalizeRules()};oop.inherits(CrystalHighlightRules,TextHighlightRules),exports.CrystalHighlightRules=CrystalHighlightRules})),ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],(function(require,exports,module){"use strict";var Range=require("../range").Range,MatchingBraceOutdent=function(){};(function(){this.checkOutdent=function(line,input){return!!/^\s+$/.test(line)&&/^\s*\}/.test(input)},this.autoOutdent=function(doc,row){var match=doc.getLine(row).match(/^(\s*\})/);if(!match)return 0;var column=match[1].length,openBracePos=doc.findMatchingBracket({row:row,column:column});if(!openBracePos||openBracePos.row==row)return 0;var indent=this.$getIndent(doc.getLine(openBracePos.row));doc.replace(new Range(row,0,row,column-1),indent)},this.$getIndent=function(line){return line.match(/^\s*/)[0]}}).call(MatchingBraceOutdent.prototype),exports.MatchingBraceOutdent=MatchingBraceOutdent})),ace.define("ace/mode/folding/coffee",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode","ace/range"],(function(require,exports,module){"use strict";var oop=require("../../lib/oop"),BaseFoldMode=require("./fold_mode").FoldMode,Range=require("../../range").Range,FoldMode=exports.FoldMode=function(){};oop.inherits(FoldMode,BaseFoldMode),function(){this.getFoldWidgetRange=function(session,foldStyle,row){var range=this.indentationBlock(session,row);if(range)return range;var re=/\S/,line=session.getLine(row),startLevel=line.search(re);if(-1!=startLevel&&"#"==line[startLevel]){for(var startColumn=line.length,maxRow=session.getLength(),startRow=row,endRow=row;++row<maxRow;){var level=(line=session.getLine(row)).search(re);if(-1!=level){if("#"!=line[level])break;endRow=row}}if(endRow>startRow){var endColumn=session.getLine(endRow).length;return new Range(startRow,startColumn,endRow,endColumn)}}},this.getFoldWidget=function(session,foldStyle,row){var line=session.getLine(row),indent=line.search(/\S/),next=session.getLine(row+1),prev=session.getLine(row-1),prevIndent=prev.search(/\S/),nextIndent=next.search(/\S/);if(-1==indent)return session.foldWidgets[row-1]=-1!=prevIndent&&prevIndent<nextIndent?"start":"","";if(-1==prevIndent){if(indent==nextIndent&&"#"==line[indent]&&"#"==next[indent])return session.foldWidgets[row-1]="",session.foldWidgets[row+1]="","start"}else if(prevIndent==indent&&"#"==line[indent]&&"#"==prev[indent]&&-1==session.getLine(row-2).search(/\S/))return session.foldWidgets[row-1]="start",session.foldWidgets[row+1]="","";return session.foldWidgets[row-1]=-1!=prevIndent&&prevIndent<indent?"start":"",indent<nextIndent?"start":""}}.call(FoldMode.prototype)})),ace.define("ace/mode/crystal",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/crystal_highlight_rules","ace/mode/matching_brace_outdent","ace/range","ace/mode/folding/coffee"],(function(require,exports,module){"use strict";var oop=require("../lib/oop"),TextMode=require("./text").Mode,CrystalHighlightRules=require("./crystal_highlight_rules").CrystalHighlightRules,MatchingBraceOutdent=require("./matching_brace_outdent").MatchingBraceOutdent,Range=require("../range").Range,FoldMode=require("./folding/coffee").FoldMode,Mode=function(){this.HighlightRules=CrystalHighlightRules,this.$outdent=new MatchingBraceOutdent,this.$behaviour=this.$defaultBehaviour,this.foldingRules=new FoldMode};oop.inherits(Mode,TextMode),function(){this.lineCommentStart="#",this.getNextLineIndent=function(state,line,tab){var indent=this.$getIndent(line),tokens=this.getTokenizer().getLineTokens(line,state).tokens;if(tokens.length&&"comment"==tokens[tokens.length-1].type)return indent;if("start"==state){var match=line.match(/^.*[\{\(\[]\s*$/),startingClassOrMethod=line.match(/^\s*(class|def|module)\s.*$/),startingDoBlock=line.match(/.*do(\s*|\s+\|.*\|\s*)$/),startingConditional=line.match(/^\s*(if|else|when)\s*/);(match||startingClassOrMethod||startingDoBlock||startingConditional)&&(indent+=tab)}return indent},this.checkOutdent=function(state,line,input){return/^\s+(end|else)$/.test(line+input)||this.$outdent.checkOutdent(line,input)},this.autoOutdent=function(state,session,row){var line=session.getLine(row);if(/}/.test(line))return this.$outdent.autoOutdent(session,row);var indent=this.$getIndent(line),prevLine=session.getLine(row-1),prevIndent=this.$getIndent(prevLine),tab=session.getTabString();prevIndent.length<=indent.length&&indent.slice(-tab.length)==tab&&session.remove(new Range(row,indent.length-tab.length,row,indent.length))},this.$id="ace/mode/crystal"}.call(Mode.prototype),exports.Mode=Mode})),ace.require(["ace/mode/crystal"],(function(m){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=m)}));