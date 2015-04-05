/*! XElement - v1.0.0 - 2015-04-05 */
/**
 * XCore.js
 */
(function (ns) {

    var defaults = {
	
        attribute: {
            override: true
        }
		
    },
	
    __proto__ = Array.prototype;
	
    function XElement(selector, context) {

        var self = this;
	//this.__proto__ = __proto__; //ie > 10
		 
        if (!(self instanceof XElement)) {
            self = new XElement(selector, context);
            return self;
        }

        if (!selector) {
            return self;
        }

        if (selector instanceof Array) {
            this.apply(selector);
        } else if (typeof selector === "string") {
            this.apply(XElement.query(selector, context));
        }
    }
	
    //XElement.prototype = [];// ie<8, length = 0
    XElement.fn = XElement.prototype = {
	
	length:0,
		
	push:__proto__.push,
		
	slice:__proto__.slice,
		
	splice: __proto__.splice,
		
	sort: __proto__.sort,
	
	forEach: __proto__.forEach,
		
	indexOf: __proto__.indexOf,
		
	apply: function(array){
	    this.push.apply(this, array);
	}
		
    };
	
    //extend
    XElement.fn.extend = XElement.extend = function (object) {

        var attribute = object.attribute || defaults.attribute,
            self = this;

        if (arguments.length == 2) {
            self = arguments[0];
            object = arguments[0];
        }

        for (var name in object) {

            if (!object.hasOwnProperty(name)) {
                continue;
            }

            if (self[name] !== undefined && attribute.override === false) {
                continue;
            }
            self[name] = object[name];
        }
    };

    XElement.extend({
        /*
         DOM选择器接口
         */
        query: function (selector, context) {
            return [];
        }

    });

    ns.XElement = XElement;

}(this));



/**
 * Ajax 操作
 */

var ajax = {

    createXHR: function(){

        var xhr = null;
        var iexhr = ["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"];
        if(window.XMLHttpRequest !== undefined){
            xhr = new XMLHttpRequest();

        } else if(ActiveXObject !== undefined) {

            if(arguments.callee.activeXString) {
                xhr = new ActiveXObject(arguments.callee.activeXString);
            }else {

                for(i=0; i<iexhr.length; i++) {
                    try{
                        xhr = new ActiveXObject(iexhr[i]);
                        arguments.callee.activeXString = iexhr[i];
                    }catch(ex){
                    }
                }
            }

        }

        return xhr;
    },

    get: function(url,callback){
        var xhr = ajax.createXHR();
        callback = callback || new Function;
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4 ){
                if((xhr.status>=200 && xhr.status<300) || xhr.status == 304){
                    //alert(xhr.responseText)
                    //alert( xhr.responseXML)
                    //alert(xhr.responseType)
                    callback(xhr.responseText);
                }
            }
        };

        xhr.open("get",url, true);
        //	xhr.responseType = "document";
        xhr.send(null);
    }
};


/**
 * XArray
 */


(function(XElement){

	XElement.fn.extend({

		attribute:{
			override:false,//不覆盖已存在的属性
		},
		
		forEach: function (fn, context) {
			var i, len;
			for (i = 0, len = this.length; i < len; ++i) {
				if (i in this) {
					fn.call(context, this[i], i, this);
				}
			}
		},
		
		indexOf: function (searchElement , fromIndex) {
			var i,
				pivot = (fromIndex) ? fromIndex : 0,
				length;

			if (!this) {
			  throw new TypeError();
			}

			length = this.length;

			if (length === 0 || pivot >= length) {
			  return -1;
			}

			if (pivot < 0) {
			  pivot = length - Math.abs(pivot);
			}

			for (i = pivot; i < length; i++) {
			  if (this[i] === searchElement) {
				return i;
			  }
			}
			return -1;
		}
		
	});
	
}(XElement));
/**
 * XAttribute 属性操作
 */

//辅助对象，读/写DOM元素属性
var attribute = {
    _: {
        "scrollTop": {
            get: function (elem) {

                if (elem == document) {
                    return Math.max(elem.documentElement.scrollTop, elem.body.scrollTop);
                }

                return elem.scrollTop;
            },

            set: function (elem, val) {
                if (elem == document) {
                    elem.documentElement.scrollTop = elem.body.scrollTop = val;
                } else {
                    elem.scrollTop = val;
                }

            }
        }
    },

    get: function (elem, attr) {
        var val;

        if (attribute._[attr]) {
            return attribute._[attr].get(elem);
        }

        if (elem.currentStyle) {
            if (attr === "opacity") {
                val = elem.filters.alpha[attr];
            } else {
                val = elem.currentStyle[attr];
            }
        }
        else {
            val = getComputedStyle(elem)[attr];
            if (attr === "opacity") {
                val = 100 * val;
            }
        }

        return val;
    },

    set: function (elem, attr, val) {
        if (attribute._[attr]) {
            attribute._[attr].set(elem, val);
            return;
        }

        if (attr == 'opacity') {
            elem.style.filter = 'alpha(opacity=' + (val) + ')';
            elem.style.opacity = (val) / 100;
        }
        else {
            elem.style[attr] = val + 'px';
        }
    }
};
/**
 * XCore.js
 */
(function (ns) {

    var defaults = {
	
        attribute: {
            override: true
        }
		
    },
	
    __proto__ = Array.prototype;
	
    function XElement(selector, context) {

        var self = this;
	//this.__proto__ = __proto__; //ie > 10
		 
        if (!(self instanceof XElement)) {
            self = new XElement(selector, context);
            return self;
        }

        if (!selector) {
            return self;
        }

        if (selector instanceof Array) {
            this.apply(selector);
        } else if (typeof selector === "string") {
            this.apply(XElement.query(selector, context));
        }
    }
	
    //XElement.prototype = [];// ie<8, length = 0
    XElement.fn = XElement.prototype = {
	
	length:0,
		
	push:__proto__.push,
		
	slice:__proto__.slice,
		
	splice: __proto__.splice,
		
	sort: __proto__.sort,
	
	forEach: __proto__.forEach,
		
	indexOf: __proto__.indexOf,
		
	apply: function(array){
	    this.push.apply(this, array);
	}
		
    };
	
    //extend
    XElement.fn.extend = XElement.extend = function (object) {

        var attribute = object.attribute || defaults.attribute,
            self = this;

        if (arguments.length == 2) {
            self = arguments[0];
            object = arguments[0];
        }

        for (var name in object) {

            if (!object.hasOwnProperty(name)) {
                continue;
            }

            if (self[name] !== undefined && attribute.override === false) {
                continue;
            }
            self[name] = object[name];
        }
    };

    XElement.extend({
        /*
         DOM选择器接口
         */
        query: function (selector, context) {
            return [];
        }

    });

    ns.XElement = XElement;

}(this));



/**
 * 描述: tween动画算法。
 * @param Number t: 动画已经执行的时间（实际上时执行多少次/帧数）
 * @param Number b: 起始位置
 * @param Number c: 终止位置
 * @param Number d: 从起始位置到终止位置的经过时间（实际上时执行多少次/帧数）
 */

var tween = {

    //缓入
    easeIn: function (t, b, c, d){
        return c * (t/=d) * t + b;
    },

    //缓出
    easeOut: function (t,b,c,d){
        return -c * (t/=d) * (t-2) + b;
    }

};

//动画对象
var effect = {

    animate: function(elem, params, duration, easing, callback){

        var dt = new Date().getTime(),
            b = 0,
            c = 0,
            d = duration || 500,
            fps = 1000/60;

        var changes = [];

        for(var attr in params){
            b = parseFloat(attribute.get(elem, attr)) || 0;
            c = params[attr] - b;

            changes.push({

                attr: attr,

                b: b,

                c: c
            });
        }

        easing = easing || "easeOut";
        callback = callback || new Function;
        setTimeout(function(){
            var t = new Date().getTime() - dt;
            var b, c, attr;
            for(var i=0; i<changes.length; i++){
                b = changes[i].b;
                c = changes[i].c;
                attr = changes[i].attr;
                //console.log(t,b,c,d)
                attribute.set(elem, attr, tween[easing](t, b, c, d));

                if(d <= t){
                    attribute.set(elem, attr, params[attr]);
                    callback();
                    return;
                }
            }

            setTimeout(arguments.callee, fps);
        }, fps);
    }
};

/*
 * XEvent
 */
(function(XElement){
	/*todo*/
	function IObservable(){
	
		this.observers = {};
		
	}
	
	IObservable.ptorotype = {
	
		bind:function(name, callback){
		
		},
		
		unbind: function(name/*[, callback]*/){
		
		},
		
		tirgger:function(name){
			
		}
	}
	
	var XEvent = {
		create: function(elem, name){
			return new DOMEvent(elem);
		}
	};
		
	XElement.fn.extend({

		on:function(name, fn){
			var observable = XEvent.create(elem, name);
			observable.on(observable, name, fn);
		},
		
		off:function(name, fn){
			var observable = XEvent.create(elem, name);
			observable.off(observable, name, fn);
		},
		
		triggler:function(name,fn){
			var observable = XEvent.create(elem, name);
			observable.triggler(observable, name);
		}
		
	});
	
	
}(XElement))

var global = window;
 
(function(ns, base){
     
    //被观察的对象
    function Observable(){
         
        this.observers = {};
    }   
     
    Observable.prototype = {
         
        //subscribe
        bind: function(name, observer){
            var observers = this.observers[name] || ( this.observers[name] = [] );
            var isbind = observer && observers.indexOf(observer) === -1;
             
            if(isbind){
                observers.push(observer);
            }
 
        },
         
        //unsubscribe
        unbind: function(name, observer){
            var observers = this.observers[name],
                index = observers && observers.indexOf(observer),
                isunbind = (index !== undefined) && (index > -1);
                 
            if (isunbind ){
                observers.splice(index, 1);
            }
        },
         
        //publish
        trigger: function (name, args){
            var observers = this.observers[name];
            if(!observers) return;
             
            for (var i=0; i<observers.length; i++) {
                observers[i](args);
            }
        }
    };
     
    Observable.fn = Observable.prototype;
    ns.Observable = Observable;
     
}(global, undefined));

(function(){

	//implements IObservable
	
	var bind = window.addEventListener ? 'addEventListener' : 'attachEvent',
		unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent',
		prefix = bind !== 'addEventListener' ? 'on' : '';
	
	var observers = {
		
		
	};
	
	function DOMEvent(elem){ 
	
		this.elem = elem;
		this.observers = observers;
		
		if(!this.elem["observers"]){
			this.elem["observers"] = +(new Date);
		}
		
		if(!this.observers[this.elem["observers"]]){
			this.observers[ this.elem["observers"] ] = [];
		}
		
	}

	DOMEvent.prototype.bind = function(name, callback){
		
		this.bind(this.elem["observers"]+ "_" + name, callback);
		
		this.elem[bind](prefix+name, callback);
		
	};
	
	DOMEvent.prototype.unbind = function(name){
		this.elem[unbind](prefix + name, callback);
	};	
	
	DOMEvent.prototype.tirgger = function(name){
	
	};
	
}())

