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


