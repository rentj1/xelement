var attribute={_:{scrollTop:{get:function(a){return a==document?Math.max(a.documentElement.scrollTop,a.body.scrollTop):a.scrollTop},set:function(a,b){a==document?a.documentElement.scrollTop=a.body.scrollTop=b:a.scrollTop=b}}},get:function(a,b){var c;return attribute._[b]?attribute._[b].get(a):(a.currentStyle?c="opacity"===b?a.filters.alpha[b]:a.currentStyle[b]:(c=getComputedStyle(a)[b],"opacity"===b&&(c=100*c)),c)},set:function(a,b,c){return attribute._[b]?void attribute._[b].set(a,c):void("opacity"==b?(a.style.filter="alpha(opacity="+c+")",a.style.opacity=c/100):a.style[b]=c+"px")}};