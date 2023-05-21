ace.define("ace/mode/elixir_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],(function(require,exports,module){"use strict";var oop=require("../lib/oop"),TextHighlightRules=require("./text_highlight_rules").TextHighlightRules,ElixirHighlightRules=function(){this.$rules={start:[{token:["meta.module.elixir","keyword.control.module.elixir","meta.module.elixir","entity.name.type.module.elixir"],regex:"^(\\s*)(defmodule)(\\s+)((?:[A-Z]\\w*\\s*\\.\\s*)*[A-Z]\\w*)"},{token:"comment.documentation.heredoc",regex:'@(?:module|type)?doc (?:~[a-z])?"""',push:[{token:"comment.documentation.heredoc",regex:'\\s*"""',next:"pop"},{include:"#interpolated_elixir"},{include:"#escaped_char"},{defaultToken:"comment.documentation.heredoc"}],comment:"@doc with heredocs is treated as documentation"},{token:"comment.documentation.heredoc",regex:'@(?:module|type)?doc ~[A-Z]"""',push:[{token:"comment.documentation.heredoc",regex:'\\s*"""',next:"pop"},{defaultToken:"comment.documentation.heredoc"}],comment:"@doc with heredocs is treated as documentation"},{token:"comment.documentation.heredoc",regex:"@(?:module|type)?doc (?:~[a-z])?'''",push:[{token:"comment.documentation.heredoc",regex:"\\s*'''",next:"pop"},{include:"#interpolated_elixir"},{include:"#escaped_char"},{defaultToken:"comment.documentation.heredoc"}],comment:"@doc with heredocs is treated as documentation"},{token:"comment.documentation.heredoc",regex:"@(?:module|type)?doc ~[A-Z]'''",push:[{token:"comment.documentation.heredoc",regex:"\\s*'''",next:"pop"},{defaultToken:"comment.documentation.heredoc"}],comment:"@doc with heredocs is treated as documentation"},{token:"comment.documentation.false",regex:"@(?:module|type)?doc false",comment:"@doc false is treated as documentation"},{token:"comment.documentation.string",regex:'@(?:module|type)?doc "',push:[{token:"comment.documentation.string",regex:'"',next:"pop"},{include:"#interpolated_elixir"},{include:"#escaped_char"},{defaultToken:"comment.documentation.string"}],comment:"@doc with string is treated as documentation"},{token:"keyword.control.elixir",regex:"\\b(?:do|end|case|bc|lc|for|if|cond|unless|try|receive|fn|defmodule|defp?|defprotocol|defimpl|defrecord|defstruct|defmacrop?|defdelegate|defcallback|defmacrocallback|defexception|defoverridable|exit|after|rescue|catch|else|raise|throw|import|require|alias|use|quote|unquote|super)\\b(?![?!])",TODO:"FIXME: regexp doesn't have js equivalent",originalRegex:"(?<!\\.)\\b(do|end|case|bc|lc|for|if|cond|unless|try|receive|fn|defmodule|defp?|defprotocol|defimpl|defrecord|defstruct|defmacrop?|defdelegate|defcallback|defmacrocallback|defexception|defoverridable|exit|after|rescue|catch|else|raise|throw|import|require|alias|use|quote|unquote|super)\\b(?![?!])"},{token:"keyword.operator.elixir",regex:"\\b(?:and|not|or|when|xor|in|inlist|inbits)\\b",TODO:"FIXME: regexp doesn't have js equivalent",originalRegex:"(?<!\\.)\\b(and|not|or|when|xor|in|inlist|inbits)\\b",comment:" as above, just doesn't need a 'end' and does a logic operation"},{token:"constant.language.elixir",regex:"\\b(?:nil|true|false)\\b(?![?!])"},{token:"variable.language.elixir",regex:"\\b__(?:CALLER|ENV|MODULE|DIR)__\\b(?![?!])"},{token:["punctuation.definition.variable.elixir","variable.other.readwrite.module.elixir"],regex:"(@)([a-zA-Z_]\\w*)"},{token:["punctuation.definition.variable.elixir","variable.other.anonymous.elixir"],regex:"(&)(\\d*)"},{token:"variable.other.constant.elixir",regex:"\\b[A-Z]\\w*\\b"},{token:"constant.numeric.elixir",regex:"\\b(?:0x[\\da-fA-F](?:_?[\\da-fA-F])*|\\d(?:_?\\d)*(?:\\.(?![^[:space:][:digit:]])(?:_?\\d)*)?(?:[eE][-+]?\\d(?:_?\\d)*)?|0b[01]+|0o[0-7]+)\\b",TODO:"FIXME: regexp doesn't have js equivalent",originalRegex:"\\b(0x\\h(?>_?\\h)*|\\d(?>_?\\d)*(\\.(?![^[:space:][:digit:]])(?>_?\\d)*)?([eE][-+]?\\d(?>_?\\d)*)?|0b[01]+|0o[0-7]+)\\b"},{token:"punctuation.definition.constant.elixir",regex:":'",push:[{token:"punctuation.definition.constant.elixir",regex:"'",next:"pop"},{include:"#interpolated_elixir"},{include:"#escaped_char"},{defaultToken:"constant.other.symbol.single-quoted.elixir"}]},{token:"punctuation.definition.constant.elixir",regex:':"',push:[{token:"punctuation.definition.constant.elixir",regex:'"',next:"pop"},{include:"#interpolated_elixir"},{include:"#escaped_char"},{defaultToken:"constant.other.symbol.double-quoted.elixir"}]},{token:"punctuation.definition.string.begin.elixir",regex:"(?:''')",TODO:"FIXME: regexp doesn't have js equivalent",originalRegex:"(?>''')",push:[{token:"punctuation.definition.string.end.elixir",regex:"^\\s*'''",next:"pop"},{include:"#interpolated_elixir"},{include:"#escaped_char"},{defaultToken:"support.function.variable.quoted.single.heredoc.elixir"}],comment:"Single-quoted heredocs"},{token:"punctuation.definition.string.begin.elixir",regex:"'",push:[{token:"punctuation.definition.string.end.elixir",regex:"'",next:"pop"},{include:"#interpolated_elixir"},{include:"#escaped_char"},{defaultToken:"support.function.variable.quoted.single.elixir"}],comment:"single quoted string (allows for interpolation)"},{token:"punctuation.definition.string.begin.elixir",regex:'(?:""")',TODO:"FIXME: regexp doesn't have js equivalent",originalRegex:'(?>""")',push:[{token:"punctuation.definition.string.end.elixir",regex:'^\\s*"""',next:"pop"},{include:"#interpolated_elixir"},{include:"#escaped_char"},{defaultToken:"string.quoted.double.heredoc.elixir"}],comment:"Double-quoted heredocs"},{token:"punctuation.definition.string.begin.elixir",regex:'"',push:[{token:"punctuation.definition.string.end.elixir",regex:'"',next:"pop"},{include:"#interpolated_elixir"},{include:"#escaped_char"},{defaultToken:"string.quoted.double.elixir"}],comment:"double quoted string (allows for interpolation)"},{token:"punctuation.definition.string.begin.elixir",regex:'~[a-z](?:""")',TODO:"FIXME: regexp doesn't have js equivalent",originalRegex:'~[a-z](?>""")',push:[{token:"punctuation.definition.string.end.elixir",regex:'^\\s*"""',next:"pop"},{include:"#interpolated_elixir"},{include:"#escaped_char"},{defaultToken:"string.quoted.double.heredoc.elixir"}],comment:"Double-quoted heredocs sigils"},{token:"punctuation.definition.string.begin.elixir",regex:"~[a-z]\\{",push:[{token:"punctuation.definition.string.end.elixir",regex:"\\}[a-z]*",next:"pop"},{include:"#interpolated_elixir"},{include:"#escaped_char"},{defaultToken:"string.interpolated.elixir"}],comment:"sigil (allow for interpolation)"},{token:"punctuation.definition.string.begin.elixir",regex:"~[a-z]\\[",push:[{token:"punctuation.definition.string.end.elixir",regex:"\\][a-z]*",next:"pop"},{include:"#interpolated_elixir"},{include:"#escaped_char"},{defaultToken:"string.interpolated.elixir"}],comment:"sigil (allow for interpolation)"},{token:"punctuation.definition.string.begin.elixir",regex:"~[a-z]\\<",push:[{token:"punctuation.definition.string.end.elixir",regex:"\\>[a-z]*",next:"pop"},{include:"#interpolated_elixir"},{include:"#escaped_char"},{defaultToken:"string.interpolated.elixir"}],comment:"sigil (allow for interpolation)"},{token:"punctuation.definition.string.begin.elixir",regex:"~[a-z]\\(",push:[{token:"punctuation.definition.string.end.elixir",regex:"\\)[a-z]*",next:"pop"},{include:"#interpolated_elixir"},{include:"#escaped_char"},{defaultToken:"string.interpolated.elixir"}],comment:"sigil (allow for interpolation)"},{token:"punctuation.definition.string.begin.elixir",regex:"~[a-z][^\\w]",push:[{token:"punctuation.definition.string.end.elixir",regex:"[^\\w][a-z]*",next:"pop"},{include:"#interpolated_elixir"},{include:"#escaped_char"},{include:"#escaped_char"},{defaultToken:"string.interpolated.elixir"}],comment:"sigil (allow for interpolation)"},{token:"punctuation.definition.string.begin.elixir",regex:'~[A-Z](?:""")',TODO:"FIXME: regexp doesn't have js equivalent",originalRegex:'~[A-Z](?>""")',push:[{token:"punctuation.definition.string.end.elixir",regex:'^\\s*"""',next:"pop"},{defaultToken:"string.quoted.other.literal.upper.elixir"}],comment:"Double-quoted heredocs sigils"},{token:"punctuation.definition.string.begin.elixir",regex:"~[A-Z]\\{",push:[{token:"punctuation.definition.string.end.elixir",regex:"\\}[a-z]*",next:"pop"},{defaultToken:"string.quoted.other.literal.upper.elixir"}],comment:"sigil (without interpolation)"},{token:"punctuation.definition.string.begin.elixir",regex:"~[A-Z]\\[",push:[{token:"punctuation.definition.string.end.elixir",regex:"\\][a-z]*",next:"pop"},{defaultToken:"string.quoted.other.literal.upper.elixir"}],comment:"sigil (without interpolation)"},{token:"punctuation.definition.string.begin.elixir",regex:"~[A-Z]\\<",push:[{token:"punctuation.definition.string.end.elixir",regex:"\\>[a-z]*",next:"pop"},{defaultToken:"string.quoted.other.literal.upper.elixir"}],comment:"sigil (without interpolation)"},{token:"punctuation.definition.string.begin.elixir",regex:"~[A-Z]\\(",push:[{token:"punctuation.definition.string.end.elixir",regex:"\\)[a-z]*",next:"pop"},{defaultToken:"string.quoted.other.literal.upper.elixir"}],comment:"sigil (without interpolation)"},{token:"punctuation.definition.string.begin.elixir",regex:"~[A-Z][^\\w]",push:[{token:"punctuation.definition.string.end.elixir",regex:"[^\\w][a-z]*",next:"pop"},{defaultToken:"string.quoted.other.literal.upper.elixir"}],comment:"sigil (without interpolation)"},{token:["punctuation.definition.constant.elixir","constant.other.symbol.elixir"],regex:"(:)([a-zA-Z_][\\w@]*(?:[?!]|=(?![>=]))?|\\<\\>|===?|!==?|<<>>|<<<|>>>|~~~|::|<\\-|\\|>|=>|~|~=|=|/|\\\\\\\\|\\*\\*?|\\.\\.?\\.?|>=?|<=?|&&?&?|\\+\\+?|\\-\\-?|\\|\\|?\\|?|\\!|@|\\%?\\{\\}|%|\\[\\]|\\^(?:\\^\\^)?)",TODO:"FIXME: regexp doesn't have js equivalent",originalRegex:"(?<!:)(:)(?>[a-zA-Z_][\\w@]*(?>[?!]|=(?![>=]))?|\\<\\>|===?|!==?|<<>>|<<<|>>>|~~~|::|<\\-|\\|>|=>|~|~=|=|/|\\\\\\\\|\\*\\*?|\\.\\.?\\.?|>=?|<=?|&&?&?|\\+\\+?|\\-\\-?|\\|\\|?\\|?|\\!|@|\\%?\\{\\}|%|\\[\\]|\\^(\\^\\^)?)",comment:"symbols"},{token:"punctuation.definition.constant.elixir",regex:"(?:[a-zA-Z_][\\w@]*(?:[?!])?):(?!:)",TODO:"FIXME: regexp doesn't have js equivalent",originalRegex:"(?>[a-zA-Z_][\\w@]*(?>[?!])?)(:)(?!:)",comment:"symbols"},{token:["punctuation.definition.comment.elixir","comment.line.number-sign.elixir"],regex:"(#)(.*)"},{token:"constant.numeric.elixir",regex:"\\?(?:\\\\(?:x[\\da-fA-F]{1,2}(?![\\da-fA-F])\\b|[^xMC])|[^\\s\\\\])",TODO:"FIXME: regexp doesn't have js equivalent",originalRegex:"(?<!\\w)\\?(\\\\(x\\h{1,2}(?!\\h)\\b|[^xMC])|[^\\s\\\\])",comment:'\n\t\t\tmatches questionmark-letters.\n\n\t\t\texamples (1st alternation = hex):\n\t\t\t?\\x1     ?\\x61\n\n\t\t\texamples (2rd alternation = escaped):\n\t\t\t?\\n      ?\\b\n\n\t\t\texamples (3rd alternation = normal):\n\t\t\t?a       ?A       ?0 \n\t\t\t?*       ?"       ?( \n\t\t\t?.       ?#\n\t\t\t\n\t\t\tthe negative lookbehind prevents against matching\n\t\t\tp(42.tainted?)\n\t\t\t'},{token:"keyword.operator.assignment.augmented.elixir",regex:"\\+=|\\-=|\\|\\|=|~=|&&="},{token:"keyword.operator.comparison.elixir",regex:"===?|!==?|<=?|>=?"},{token:"keyword.operator.bitwise.elixir",regex:"\\|{3}|&{3}|\\^{3}|<{3}|>{3}|~{3}"},{token:"keyword.operator.logical.elixir",regex:"!+|\\bnot\\b|&&|\\band\\b|\\|\\||\\bor\\b|\\bxor\\b",originalRegex:"(?<=[ \\t])!+|\\bnot\\b|&&|\\band\\b|\\|\\||\\bor\\b|\\bxor\\b"},{token:"keyword.operator.arithmetic.elixir",regex:"\\*|\\+|\\-|/"},{token:"keyword.operator.other.elixir",regex:"\\||\\+\\+|\\-\\-|\\*\\*|\\\\\\\\|\\<\\-|\\<\\>|\\<\\<|\\>\\>|\\:\\:|\\.\\.|\\|>|~|=>"},{token:"keyword.operator.assignment.elixir",regex:"="},{token:"punctuation.separator.other.elixir",regex:":"},{token:"punctuation.separator.statement.elixir",regex:"\\;"},{token:"punctuation.separator.object.elixir",regex:","},{token:"punctuation.separator.method.elixir",regex:"\\."},{token:"punctuation.section.scope.elixir",regex:"\\{|\\}"},{token:"punctuation.section.array.elixir",regex:"\\[|\\]"},{token:"punctuation.section.function.elixir",regex:"\\(|\\)"}],"#escaped_char":[{token:"constant.character.escape.elixir",regex:"\\\\(?:x[\\da-fA-F]{1,2}|.)"}],"#interpolated_elixir":[{token:["source.elixir.embedded.source","source.elixir.embedded.source.empty"],regex:"(#\\{)(\\})"},{todo:{token:"punctuation.section.embedded.elixir",regex:"#\\{",push:[{token:"punctuation.section.embedded.elixir",regex:"\\}",next:"pop"},{include:"#nest_curly_and_self"},{include:"$self"},{defaultToken:"source.elixir.embedded.source"}]}}],"#nest_curly_and_self":[{token:"punctuation.section.scope.elixir",regex:"\\{",push:[{token:"punctuation.section.scope.elixir",regex:"\\}",next:"pop"},{include:"#nest_curly_and_self"}]},{include:"$self"}],"#regex_sub":[{include:"#interpolated_elixir"},{include:"#escaped_char"},{token:["punctuation.definition.arbitrary-repitition.elixir","string.regexp.arbitrary-repitition.elixir","string.regexp.arbitrary-repitition.elixir","punctuation.definition.arbitrary-repitition.elixir"],regex:"(\\{)(\\d+)((?:,\\d+)?)(\\})"},{token:"punctuation.definition.character-class.elixir",regex:"\\[(?:\\^?\\])?",push:[{token:"punctuation.definition.character-class.elixir",regex:"\\]",next:"pop"},{include:"#escaped_char"},{defaultToken:"string.regexp.character-class.elixir"}]},{token:"punctuation.definition.group.elixir",regex:"\\(",push:[{token:"punctuation.definition.group.elixir",regex:"\\)",next:"pop"},{include:"#regex_sub"},{defaultToken:"string.regexp.group.elixir"}]},{token:["punctuation.definition.comment.elixir","comment.line.number-sign.elixir"],regex:"(?:^|\\s)(#)(\\s[[a-zA-Z0-9,. \\t?!-][^\\x00-\\x7F]]*$)",originalRegex:"(?<=^|\\s)(#)\\s[[a-zA-Z0-9,. \\t?!-][^\\x{00}-\\x{7F}]]*$",comment:"We are restrictive in what we allow to go after the comment character to avoid false positives, since the availability of comments depend on regexp flags."}]},this.normalizeRules()};ElixirHighlightRules.metaData={comment:"Textmate bundle for Elixir Programming Language.",fileTypes:["ex","exs"],firstLineMatch:"^#!/.*\\belixir",foldingStartMarker:"(after|else|catch|rescue|\\-\\>|\\{|\\[|do)\\s*$",foldingStopMarker:"^\\s*((\\}|\\]|after|else|catch|rescue)\\s*$|end\\b)",keyEquivalent:"^~E",name:"Elixir",scopeName:"source.elixir"},oop.inherits(ElixirHighlightRules,TextHighlightRules),exports.ElixirHighlightRules=ElixirHighlightRules})),ace.define("ace/mode/folding/coffee",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode","ace/range"],(function(require,exports,module){"use strict";var oop=require("../../lib/oop"),BaseFoldMode=require("./fold_mode").FoldMode,Range=require("../../range").Range,FoldMode=exports.FoldMode=function(){};oop.inherits(FoldMode,BaseFoldMode),function(){this.getFoldWidgetRange=function(session,foldStyle,row){var range=this.indentationBlock(session,row);if(range)return range;var re=/\S/,line=session.getLine(row),startLevel=line.search(re);if(-1!=startLevel&&"#"==line[startLevel]){for(var startColumn=line.length,maxRow=session.getLength(),startRow=row,endRow=row;++row<maxRow;){var level=(line=session.getLine(row)).search(re);if(-1!=level){if("#"!=line[level])break;endRow=row}}if(endRow>startRow){var endColumn=session.getLine(endRow).length;return new Range(startRow,startColumn,endRow,endColumn)}}},this.getFoldWidget=function(session,foldStyle,row){var line=session.getLine(row),indent=line.search(/\S/),next=session.getLine(row+1),prev=session.getLine(row-1),prevIndent=prev.search(/\S/),nextIndent=next.search(/\S/);if(-1==indent)return session.foldWidgets[row-1]=-1!=prevIndent&&prevIndent<nextIndent?"start":"","";if(-1==prevIndent){if(indent==nextIndent&&"#"==line[indent]&&"#"==next[indent])return session.foldWidgets[row-1]="",session.foldWidgets[row+1]="","start"}else if(prevIndent==indent&&"#"==line[indent]&&"#"==prev[indent]&&-1==session.getLine(row-2).search(/\S/))return session.foldWidgets[row-1]="start",session.foldWidgets[row+1]="","";return session.foldWidgets[row-1]=-1!=prevIndent&&prevIndent<indent?"start":"",indent<nextIndent?"start":""}}.call(FoldMode.prototype)})),ace.define("ace/mode/elixir",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/elixir_highlight_rules","ace/mode/folding/coffee"],(function(require,exports,module){"use strict";var oop=require("../lib/oop"),TextMode=require("./text").Mode,ElixirHighlightRules=require("./elixir_highlight_rules").ElixirHighlightRules,FoldMode=require("./folding/coffee").FoldMode,Mode=function(){this.HighlightRules=ElixirHighlightRules,this.foldingRules=new FoldMode,this.$behaviour=this.$defaultBehaviour};oop.inherits(Mode,TextMode),function(){this.lineCommentStart="#",this.$id="ace/mode/elixir"}.call(Mode.prototype),exports.Mode=Mode})),ace.require(["ace/mode/elixir"],(function(m){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=m)}));