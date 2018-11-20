;(function(){
    'use strict'
    var EverDOM = {

        /**说明：窗口全屏或html 元素全屏
         * 
         * @param {* DOM} element  dom对象
         *  窗口全屏传入 document.documentElement
         *  元素全屏传入 dom
         */
        fullScreen: function(element){
            if(!(document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled || document.msFullscreenEnabled || false))return;
            !(document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenEnabled)?fullScreen(element):exitFullscreen();
            // 浏览器进入全屏模式
            function fullScreen(element) {
                if(element.requestFullscreen) {
                    element.requestFullscreen();
                } else if(element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if(element.webkitRequestFullscreen) {
                    element.webkitRequestFullscreen();
                } else if(element.msRequestFullscreen) {
                    element.msRequestFullscreen();
                }
            }
            // 退出全屏模式
            function exitFullscreen() {
                if(document.exitFullscreen) {
                    document.exitFullscreen();
                } else if(document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if(document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
            }
        },

        /**说明：自定义滚轮函数
         * 
         * @param {* DOM} obj DOM对象
         * @param {* 函数} func 要执行的函数
         *      注:函数有俩个参数    
         *          1. event
         *          2. 每次滚动的数值 
         *              小于0表示页面往下滚动
         *              大于0表示网页往上滚动
         *        如果函数return fasle 这阻止浏览器默认滚动事件
         *        为true 则不阻止
         *        默认为 不阻止
         */
        mousewheel: function(obj , func){
            function eFn(e) {
                e = e||window.event;
                if ( Fn.call(this,e,e.wheelDelta/120||-e.detail/3) === false )
                    e.preventDefault();
                }
            var eName = document.onmousewheel===null?"mousewheel":"DOMMouseScroll";
            document.addEventListener?obj.addEventListener(eName,eFn,false):obj.attachEvent("onmousewheel",eFn);
        },

    }

    // 把 batNav 暴露给全局对象
    var _global = (function(){return this || (0,eval)('this');}());
    ('EverDOM' in _global) || (_global.EverDOM = EverDOM);
}())