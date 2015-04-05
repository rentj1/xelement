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

