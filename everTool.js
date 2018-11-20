;(function(){
    'use strict'
    var EverTool = {

        /* 说明：产生随机数
            * 参数：start:最小值, end:最大值
            * return：>= 最小值    <=最大值的随机数
            */
        random: function(start,end){
            return Math.floor(Math.random() * (end - start + 1) +start);
        },

        /* 说明：产生随机字符
            * 参数：len 字符长度
            * return：字符
            */
        randomString: function(len) {
        　　len = len || 32;
        　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
        　　var maxPos = $chars.length;
        　　var pwd = '';
        　　for (var i = 0; i < len; i++) {
        　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        　　}
        　　return pwd;
        },

        /* 说明：数组去重复
            * 参数：arr: 要处理的数组
            * return:新数组
            */
        unique: function(arr){
            var n = [arr[0]];
            for(var i = 1; i < arr.length; i++){
                if (arr.indexOf(arr[i]) == i) n.push(arr[i]);
            }
            return n;
        },

        /**
         * 各种判断
         */
        is: {
            /**
             * 说明：判断是否是数组
             * 参数： 研判的的变量
             * 返回： true或false
             */
            isArray: function(arr){
                if (typeof Array.isArray === "function") {
                    return Array.isArray(value);
                }else{
                    return Object.prototype.toString.call(value) === "[object Array]";
                }
            }
        },

        /**说明： 深度删除 JSON 中的空属性 ( '' null undefined )
         * 直接操作原数据
         * 
         * @param {*JSON} o 
         */
        deleteEmpty: function(o){
            outer:for (var i in o) {
                var v = o[i];
                if(typeof v === 'object'){
                    if(Array.isArray(v)){
                        if(o[i].length === 0){
                            delete o[i];
                            continue;
                        }
                    }
                    for (var k in o[i]) {
                        t_deleteEmpty(v);
                        continue outer;
                    }
                    delete o[i];
                }else{
                    (v === '' || v === null || v === undefined) && delete o[i];
                }
            }
        },
  
        // 插入字符串
        //参数说明：str表示原字符串变量，flg表示要插入的字符串，sn表示要插入的位置
        flg: function(str,flg,sn){
                var newstr="";
                var tmp=str.substring(0, sn);
                var tmpto = str.substring(sn, str.length)
                newstr =tmp + flg + tmpto;
            return newstr;
        }
    }

    // 把 batNav 暴露给全局对象
    var _global = (function(){return this || (0,eval)('this');}());
    ('EverTool' in _global) || (_global.EverTool = EverTool);
}())