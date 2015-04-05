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
