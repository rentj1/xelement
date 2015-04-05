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