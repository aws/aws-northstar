ace.define("ace/mode/puppet_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],(function(require,exports,module){"use strict";var oop=require("../lib/oop"),TextHighlightRules=require("./text_highlight_rules").TextHighlightRules,PuppetHighlightRules=function(){this.$rules={start:[{token:["keyword.type.puppet","constant.class.puppet","keyword.inherits.puppet","constant.class.puppet"],regex:'^\\s*(class)(\\s+(?:[-_A-Za-z0-9".]+::)*[-_A-Za-z0-9".]+\\s*)(?:(inherits\\s*)(\\s+(?:[-_A-Za-z0-9".]+::)*[-_A-Za-z0-9".]+\\s*))?'},{token:["storage.function.puppet","name.function.puppet","punctuation.lpar"],regex:"(^\\s*define)(\\s+[a-zA-Z0-9_:]+\\s*)(\\()",push:[{token:"punctuation.rpar.puppet",regex:"\\)",next:"pop"},{include:"constants"},{include:"variable"},{include:"strings"},{include:"operators"},{defaultToken:"string"}]},{token:["language.support.class","keyword.operator"],regex:"\\b([a-zA-Z_]+)(\\s+=>)"},{token:["exported.resource.puppet","keyword.name.resource.puppet","paren.lparen"],regex:"(\\@\\@)?(\\s*[a-zA-Z_]*)(\\s*\\{)"},{token:"qualified.variable.puppet",regex:"(\\$([a-z][a-z0-9_]*)?(::[a-z][a-z0-9_]*)*::[a-z0-9_][a-zA-Z0-9_]*)"},{token:"singleline.comment.puppet",regex:"#(.)*$"},{token:"multiline.comment.begin.puppet",regex:"^\\s*\\/\\*",push:"blockComment"},{token:"keyword.control.puppet",regex:"\\b(case|if|unless|else|elsif|in|default:|and|or)\\s+(?!::)"},{token:"keyword.control.puppet",regex:"\\b(import|default|inherits|include|require|contain|node|application|consumes|environment|site|function|produces)\\b"},{token:"support.function.puppet",regex:"\\b(lest|str2bool|escape|gsub|Timestamp|Timespan|with|alert|crit|debug|notice|sprintf|split|step|strftime|slice|shellquote|type|sha1|defined|scanf|reverse_each|regsubst|return|emerg|reduce|err|failed|fail|versioncmp|file|generate|then|info|realize|search|tag|tagged|template|epp|warning|hiera_include|each|assert_type|binary_file|create_resources|dig|digest|filter|lookup|find_file|fqdn_rand|hiera_array|hiera_hash|inline_epp|inline_template|map|match|md5|new|next)\\b"},{token:"constant.types.puppet",regex:"\\b(String|File|Package|Service|Class|Integer|Array|Catalogentry|Variant|Boolean|Undef|Number|Hash|Float|Numeric|NotUndef|Callable|Optional|Any|Regexp|Sensitive|Sensitive.new|Type|Resource|Default|Enum|Scalar|Collection|Data|Pattern|Tuple|Struct)\\b"},{token:"paren.lparen",regex:"[[({]"},{token:"paren.rparen",regex:"[\\])}]"},{include:"variable"},{include:"constants"},{include:"strings"},{include:"operators"},{token:"regexp.begin.string.puppet",regex:"\\s*(\\/(\\S)+)\\/"}],blockComment:[{regex:"\\*\\/",token:"multiline.comment.end.puppet",next:"pop"},{defaultToken:"comment"}],constants:[{token:"constant.language.puppet",regex:"\\b(false|true|running|stopped|installed|purged|latest|file|directory|held|undef|present|absent|link|mounted|unmounted)\\b"}],variable:[{token:"variable.puppet",regex:"(\\$[a-z0-9_{][a-zA-Z0-9_]*)"}],strings:[{token:"punctuation.quote.puppet",regex:"'",push:[{token:"punctuation.quote.puppet",regex:"'",next:"pop"},{include:"escaped_chars"},{defaultToken:"string"}]},{token:"punctuation.quote.puppet",regex:'"',push:[{token:"punctuation.quote.puppet",regex:'"',next:"pop"},{include:"escaped_chars"},{include:"variable"},{defaultToken:"string"}]}],escaped_chars:[{token:"constant.escaped_char.puppet",regex:"\\\\."}],operators:[{token:"keyword.operator",regex:"\\+\\.|\\-\\.|\\*\\.|\\/\\.|#|;;|\\+|\\-|\\*|\\*\\*\\/|\\/\\/|%|<<|>>|&|\\||\\^|~|<|>|<=|=>|==|!=|<>|<-|=|::|,"}]},this.normalizeRules()};oop.inherits(PuppetHighlightRules,TextHighlightRules),exports.PuppetHighlightRules=PuppetHighlightRules})),ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],(function(require,exports,module){"use strict";var oop=require("../../lib/oop"),Range=require("../../range").Range,BaseFoldMode=require("./fold_mode").FoldMode,FoldMode=exports.FoldMode=function(commentRegex){commentRegex&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+commentRegex.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+commentRegex.end)))};oop.inherits(FoldMode,BaseFoldMode),function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(session,foldStyle,row){var line=session.getLine(row);if(this.singleLineBlockCommentRe.test(line)&&!this.startRegionRe.test(line)&&!this.tripleStarBlockCommentRe.test(line))return"";var fw=this._getFoldWidgetBase(session,foldStyle,row);return!fw&&this.startRegionRe.test(line)?"start":fw},this.getFoldWidgetRange=function(session,foldStyle,row,forceMultiline){var match,line=session.getLine(row);if(this.startRegionRe.test(line))return this.getCommentRegionBlock(session,line,row);if(match=line.match(this.foldingStartMarker)){var i=match.index;if(match[1])return this.openingBracketBlock(session,match[1],row,i);var range=session.getCommentFoldRange(row,i+match[0].length,1);return range&&!range.isMultiLine()&&(forceMultiline?range=this.getSectionRange(session,row):"all"!=foldStyle&&(range=null)),range}if("markbegin"!==foldStyle&&(match=line.match(this.foldingStopMarker))){i=match.index+match[0].length;return match[1]?this.closingBracketBlock(session,match[1],row,i):session.getCommentFoldRange(row,i,-1)}},this.getSectionRange=function(session,row){for(var line=session.getLine(row),startIndent=line.search(/\S/),startRow=row,startColumn=line.length,endRow=row+=1,maxRow=session.getLength();++row<maxRow;){var indent=(line=session.getLine(row)).search(/\S/);if(-1!==indent){if(startIndent>indent)break;var subRange=this.getFoldWidgetRange(session,"all",row);if(subRange){if(subRange.start.row<=startRow)break;if(subRange.isMultiLine())row=subRange.end.row;else if(startIndent==indent)break}endRow=row}}return new Range(startRow,startColumn,endRow,session.getLine(endRow).length)},this.getCommentRegionBlock=function(session,line,row){for(var startColumn=line.search(/\s*$/),maxRow=session.getLength(),startRow=row,re=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,depth=1;++row<maxRow;){line=session.getLine(row);var m=re.exec(line);if(m&&(m[1]?depth--:depth++,!depth))break}if(row>startRow)return new Range(startRow,startColumn,row,line.length)}}.call(FoldMode.prototype)})),ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],(function(require,exports,module){"use strict";var Range=require("../range").Range,MatchingBraceOutdent=function(){};(function(){this.checkOutdent=function(line,input){return!!/^\s+$/.test(line)&&/^\s*\}/.test(input)},this.autoOutdent=function(doc,row){var match=doc.getLine(row).match(/^(\s*\})/);if(!match)return 0;var column=match[1].length,openBracePos=doc.findMatchingBracket({row:row,column:column});if(!openBracePos||openBracePos.row==row)return 0;var indent=this.$getIndent(doc.getLine(openBracePos.row));doc.replace(new Range(row,0,row,column-1),indent)},this.$getIndent=function(line){return line.match(/^\s*/)[0]}}).call(MatchingBraceOutdent.prototype),exports.MatchingBraceOutdent=MatchingBraceOutdent})),ace.define("ace/mode/puppet",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/puppet_highlight_rules","ace/mode/folding/cstyle","ace/mode/matching_brace_outdent"],(function(require,exports,module){"use strict";var oop=require("../lib/oop"),TextMode=require("./text").Mode,PuppetHighlightRules=require("./puppet_highlight_rules").PuppetHighlightRules,CStyleFoldMode=require("./folding/cstyle").FoldMode,MatchingBraceOutdent=require("./matching_brace_outdent").MatchingBraceOutdent,Mode=function(){TextMode.call(this),this.HighlightRules=PuppetHighlightRules,this.$outdent=new MatchingBraceOutdent,this.$behaviour=this.$defaultBehaviour,this.foldingRules=new CStyleFoldMode};oop.inherits(Mode,TextMode),function(){this.lineCommentStart="#",this.blockComment={start:"/*",end:"*/"},this.$id="ace/mode/puppet"}.call(Mode.prototype),exports.Mode=Mode})),ace.require(["ace/mode/puppet"],(function(m){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=m)}));