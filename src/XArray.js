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