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

