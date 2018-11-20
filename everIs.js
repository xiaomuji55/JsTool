;(function(){
    'use strict'
    var EverIs = {

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
  
    }

    // 把 batNav 暴露给全局对象
    var _global = (function(){return this || (0,eval)('this');}());
    ('EverIs' in _global) || (_global.EverIs = EverIs);
}())