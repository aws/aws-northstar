ace.define("ace/ext/whitespace",["require","exports","module","ace/lib/lang"],(function(require,exports,module){"use strict";var lang=require("../lib/lang");exports.$detectIndentation=function(lines,fallback){for(var stats=[],changes=[],tabIndents=0,prevSpaces=0,max=Math.min(lines.length,1e3),i=0;i<max;i++){var line=lines[i];if(/^\s*[^*+\-\s]/.test(line)){if("\t"==line[0])tabIndents++,prevSpaces=-Number.MAX_VALUE;else{var spaces=line.match(/^ */)[0].length;if(spaces&&"\t"!=line[spaces]){var diff=spaces-prevSpaces;!(diff>0)||prevSpaces%diff||spaces%diff||(changes[diff]=(changes[diff]||0)+1),stats[spaces]=(stats[spaces]||0)+1}prevSpaces=spaces}for(;i<max&&"\\"==line[line.length-1];)line=lines[i++]}}function getScore(indent){for(var score=0,i=indent;i<stats.length;i+=indent)score+=stats[i]||0;return score}var changesTotal=changes.reduce((function(a,b){return a+b}),0),first={score:0,length:0},spaceIndents=0;for(i=1;i<12;i++){var score=getScore(i);1==i?(spaceIndents=score,score=stats[1]?.9:.8,stats.length||(score=0)):score/=spaceIndents,changes[i]&&(score+=changes[i]/changesTotal),score>first.score&&(first={score:score,length:i})}if(first.score&&first.score>1.4)var tabLength=first.length;return tabIndents>spaceIndents+1?((1==tabLength||spaceIndents<tabIndents/4||first.score<1.8)&&(tabLength=void 0),{ch:"\t",length:tabLength}):spaceIndents>tabIndents+1?{ch:" ",length:tabLength}:void 0},exports.detectIndentation=function(session){var lines=session.getLines(0,1e3),indent=exports.$detectIndentation(lines)||{};return indent.ch&&session.setUseSoftTabs(" "==indent.ch),indent.length&&session.setTabSize(indent.length),indent},exports.trimTrailingSpace=function(session,options){var doc=session.getDocument(),lines=doc.getAllLines(),min=options&&options.trimEmpty?-1:0,cursors=[],ci=-1;options&&options.keepCursorPosition&&(session.selection.rangeCount?session.selection.rangeList.ranges.forEach((function(x,i,ranges){var next=ranges[i+1];next&&next.cursor.row==x.cursor.row||cursors.push(x.cursor)})):cursors.push(session.selection.getCursor()),ci=0);for(var cursorRow=cursors[ci]&&cursors[ci].row,i=0,l=lines.length;i<l;i++){var line=lines[i],index=line.search(/\s+$/);i==cursorRow&&(index<cursors[ci].column&&index>min&&(index=cursors[ci].column),ci++,cursorRow=cursors[ci]?cursors[ci].row:-1),index>min&&doc.removeInLine(i,index,line.length)}},exports.convertIndentation=function(session,ch,len){var oldCh=session.getTabString()[0],oldLen=session.getTabSize();len||(len=oldLen),ch||(ch=oldCh);for(var tab="\t"==ch?ch:lang.stringRepeat(ch,len),doc=session.doc,lines=doc.getAllLines(),cache={},spaceCache={},i=0,l=lines.length;i<l;i++){var match=lines[i].match(/^\s*/)[0];if(match){var w=session.$getStringScreenWidth(match)[0],tabCount=Math.floor(w/oldLen),reminder=w%oldLen,toInsert=cache[tabCount]||(cache[tabCount]=lang.stringRepeat(tab,tabCount));(toInsert+=spaceCache[reminder]||(spaceCache[reminder]=lang.stringRepeat(" ",reminder)))!=match&&(doc.removeInLine(i,0,match.length),doc.insertInLine({row:i,column:0},toInsert))}}session.setTabSize(len),session.setUseSoftTabs(" "==ch)},exports.$parseStringArg=function(text){var indent={};/t/.test(text)?indent.ch="\t":/s/.test(text)&&(indent.ch=" ");var m=text.match(/\d+/);return m&&(indent.length=parseInt(m[0],10)),indent},exports.$parseArg=function(arg){return arg?"string"==typeof arg?exports.$parseStringArg(arg):"string"==typeof arg.text?exports.$parseStringArg(arg.text):arg:{}},exports.commands=[{name:"detectIndentation",description:"Detect indentation from content",exec:function(editor){exports.detectIndentation(editor.session)}},{name:"trimTrailingSpace",description:"Trim trailing whitespace",exec:function(editor,args){exports.trimTrailingSpace(editor.session,args)}},{name:"convertIndentation",description:"Convert indentation to ...",exec:function(editor,arg){var indent=exports.$parseArg(arg);exports.convertIndentation(editor.session,indent.ch,indent.length)}},{name:"setIndentation",description:"Set indentation",exec:function(editor,arg){var indent=exports.$parseArg(arg);indent.length&&editor.session.setTabSize(indent.length),indent.ch&&editor.session.setUseSoftTabs(" "==indent.ch)}}]})),ace.require(["ace/ext/whitespace"],(function(m){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=m)}));