;(function(){
    'use strict'

        /**
     * 获取本周、本季度、本月、上月的开始日期、结束日期
     */
    var now = new Date(); //当前日期
    var nowDayOfWeek = now.getDay(); //今天本周的第几天
    var nowDay = now.getDate(); //当前日
    var nowMonth = now.getMonth(); //当前月
    var nowYear = now.getYear(); //当前年
    nowYear += (nowYear < 2000) ? 1900 : 0; //
    var lastMonthDate = new Date(); //上月日期
    lastMonthDate.setDate(1);
    lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
    var lastYear = lastMonthDate.getYear();
    var lastMonth = lastMonthDate.getMonth();

    function formatDate(date){
        var myyear = date.getFullYear();
        var mymonth = date.getMonth() + 1;
        var myweekday = date.getDate();
        if (mymonth < 10) {
            mymonth = "0" + mymonth;
        }
        if (myweekday < 10) {
            myweekday = "0" + myweekday;
        }
        return (myyear + "-" + mymonth + "-" + myweekday);
    }

    var EverTime = {

        /* 说明：格式化时间
        * 
        * @param  t 时间对象
        * @param  fmt 返回时间格式 yyy-MM-dd hh:mm:ss:SS  第q季度  星期x
        * @return 时间字符串
        */
        timeFormat: function (t,fmt){
            var o = {
                "M+": t.getMonth() + 1, // 月份 
                "x+": t.getDay(), // 星期 从0开始计算，但是 周日对应0
                "d+": t.getDate(), // 日 
                "h+": t.getHours(), // 小时 
                "m+": t.getMinutes(), // 分 
                "s+": t.getSeconds(), // 秒 
                "q+": Math.floor((t.getMonth() + 3) / 3), // 季度   春01、夏02、秋03、冬04
                "S": t.getMilliseconds() // 毫秒 
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (t.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        },

        /* 说明：毫秒转换为时间
        * 
        * @param  mss 毫秒
        * @return 字符串时间
        */
        duringFormat(mss) {
            var days = parseInt(mss / (1000 * 60 * 60 * 24));
            var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = (mss % (1000 * 60)) / 1000;
            var d = '';
            d += days ? (days+"天 ") : '';
            d += hours ? (hours + "小时 ") : '';
            d += minutes ? (minutes + "分钟 ") : '';
            d += seconds ? (seconds + "秒 ") : '';
            return d;
        },

        /*
         *说明：获取周
         */
        getWeek:function() {
            var totalDays = 0;
            var now = new Date();
            var years = now.getYear()
            if (years < 1000)
                years += 1900
            var days = new Array(12);
            days[0] = 31;
            days[2] = 31;
            days[3] = 30;
            days[4] = 31;
            days[5] = 30;
            days[6] = 31;
            days[7] = 31;
            days[8] = 30;
            days[9] = 31;
            days[10] = 30;
            days[11] = 31;

            //判断是否为闰年，针对2月的天数进行计算
            if (Math.round(now.getYear() / 4) == now.getYear() / 4) {
                days[1] = 29
            } else {
                days[1] = 28
            }

            if (now.getMonth() == 0) {
                totalDays = totalDays + now.getDate();
            } else {
                var curMonth = now.getMonth();
                for (var count = 1; count <= curMonth; count++) {
                    totalDays = totalDays + days[count - 1];
                }
                totalDays = totalDays + now.getDate();
            }
            //得到第几周
            var week = Math.ceil(totalDays / 7);
            return week;
        },

        /**
         *说明：获取两个日期之间所有的日期
         *返回默认：20180901,20180902,20180903
         *
         * @param {*} begin 开始时间 字符串 例如 '2018-10-01'
         * @param {*} end 结束时间 字符串 例如 '2018-10-01'
         * @param bol // 间隔符 默认无
         * @returns 时间数组
         */
        getAmong: function(start,end,bol) {
            bol = bol || '';
            var result = [];
            var beginDay = start.split("-");
            var endDay = end.split("-");
            var diffDay = new Date(start);
            var diffDayEnd = new Date(end);
            var dateList = new Array;
            var i = 0;
            if(diffDay.getTime() > diffDayEnd.getTime()){return [];}
            result.push(start.replace(/-/g, bol));
            if(start == end)return result;
            while(i == 0){
                var countDay = diffDay.getTime() + 24 * 60 * 60 * 1000;
                diffDay.setTime(countDay);
                dateList[2] = diffDay.getDate();
                dateList[1] = diffDay.getMonth() + 1;
                dateList[0] = diffDay.getFullYear();
                if(String(dateList[1]).length == 1){dateList[1] = "0"+dateList[1]};
                if(String(dateList[2]).length == 1){dateList[2] = "0"+dateList[2]};
                result.push(dateList[0]+bol+dateList[1]+bol+dateList[2]);
                if(dateList[0] == endDay[0] && dateList[1] == endDay[1] && dateList[2] == endDay[2]){ i = 1;}
            };
            return result;
        },

        /**
         *说明：获取两个日期之间所有的日期 只返回 月和日
         *返回：09月01日,09月02日,09月03日
         *
         * @param {*} begin 开始时间 字符串 例如 '2018-10-01'
         * @param {*} end 结束时间 字符串 例如 '2018-10-01'
         * @returns 时间数组
         */
        getAmongMD: function(start,end) {
            var result = [];
            var beginDay = start.split("-");
            var endDay = end.split("-");
            var diffDay = new Date(start);
            var diffDayEnd = new Date(end);
            var dateList = new Array;
            var i = 0;
            if(diffDay.getTime() > diffDayEnd.getTime()){
                return [];
            }
            var times = start.split('-');
            result.push(times[1] + '月' + times[2] + '日');
            if(start == end)return result;
            while(i == 0){
                var countDay = diffDay.getTime() + 24 * 60 * 60 * 1000;
                diffDay.setTime(countDay);
                dateList[2] = diffDay.getDate();
                dateList[1] = diffDay.getMonth() + 1;
                dateList[0] = diffDay.getFullYear();
                if(String(dateList[1]).length == 1){dateList[1] = "0"+dateList[1]};
                if(String(dateList[2]).length == 1){dateList[2] = "0"+dateList[2]};
                result.push(dateList[1]+ '月' +dateList[2] + '日');
                if(dateList[0] == endDay[0] && dateList[1] == endDay[1] && dateList[2] == endDay[2]){
                     i = 1;
                }
            };
            return result;
        },

        /**
         *说明：日期 加天数（默认加一天）
         *
         * @param {*} date 时间（1994-01-02）
         * @param {*} days 天数
         * @returns
         */
        addDate: function(date, days){
            if (days == undefined || days == '') {
                days = 1;
            }
            var date = new Date(date);
            date.setDate(date.getDate() + days);
            var month = date.getMonth() + 1;
            var day = date.getDate();

            // 日期月份/天的显示，如果是1位数，则在前面加上'0'
            function getFormatDate(arg) {
                if (arg == undefined || arg == '') {
                    return '';
                }
                var re = arg + '';
                if (re.length < 2) {
                    re = '0' + re;
                }
                return re;
            }

            return date.getFullYear() + '-' + getFormatDate(month) + '-' + getFormatDate(day);
        },

        //获得某月的天数
        getMonthDays: function(myMonth) {
            var monthStartDate = new Date(nowYear, myMonth, 1);
            var monthEndDate = new Date(nowYear, myMonth + 1, 1);
            var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
            return days;
        },

        //获得本季度的开始月份
        getQuarterStartMonth: function() {
            var quarterStartMonth = 0;
            if (nowMonth < 3) {
                quarterStartMonth = 0;
            }
            if (2 < nowMonth && nowMonth < 6) {
                quarterStartMonth = 3;
            }
            if (5 < nowMonth && nowMonth < 9) {
                quarterStartMonth = 6;
            }
            if (nowMonth > 8) {
                quarterStartMonth = 9;
            }
            return quarterStartMonth;
        },

        //获得本周的开始日期
        getWeekStartDate: function() {
            var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1);
            return formatDate(weekStartDate);
        },

        //获得本周的结束日期
        getWeekEndDate: function() {
            var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek) + 1);
            return formatDate(weekEndDate);
        },

        //获得上周的开始日期
        getLastWeekStartDate: function() {
            var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 7 + 1);
            return formatDate(weekStartDate);
        },

        //获得上周的结束日期
        getLastWeekEndDate: function() {
            var weekEndDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 1 + 1);
            return formatDate(weekEndDate);
        },

        //获得下周的开始日期
        getDownWeekStartDate: function() {
            var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 7 + 1);
            return formatDate(weekStartDate);
        },

        //获得下周的结束日期
        getDownWeekEndDate: function() {
            var weekEndDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 13 + 1);
            return formatDate(weekEndDate);
        },

        //获得本月的开始日期
        getMonthStartDate: function() {
            var monthStartDate = new Date(nowYear, nowMonth, 1);
            return formatDate(monthStartDate);
        },

        //获得本月的结束日期
        getMonthEndDate: function() {
            var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth));
            return formatDate(monthEndDate);
        },

        //获得上月开始时间
        getLastMonthStartDate: function() {
            var lastMonthStartDate = new Date(nowYear, lastMonth, 1);
            return formatDate(lastMonthStartDate);
        },

        //获得上月结束时间
        getLastMonthEndDate: function() {
            var lastMonthEndDate = new Date(nowYear, lastMonth, getMonthDays(lastMonth));
            return formatDate(lastMonthEndDate);
        },

        //获得本季度的开始日期
        getQuarterStartDate: function () {
            var quarterStartDate = new Date(nowYear, getQuarterStartMonth(), 1);
            return formatDate(quarterStartDate);
        },

        //或的本季度的结束日期
        getQuarterEndDate:function () {
            var quarterEndMonth = getQuarterStartMonth() + 2;
            var quarterStartDate = new Date(nowYear, quarterEndMonth,
                    getMonthDays(quarterEndMonth));
            return formatDate(quarterStartDate);
        }
    }

    // 把 batNav 暴露给全局对象
    var _global = (function(){return this || (0,eval)('this');}());
    ('EverTime' in _global) || (_global.EverTime = EverTime);
}())