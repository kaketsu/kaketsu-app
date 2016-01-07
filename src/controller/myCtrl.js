myApp.controller('MyCtrl', function ($scope, $http) {
    $scope.monthDays = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35];
    $scope.message = "Hello, Angular JS.";

    $http.post('/MmTemplate/getMsgList').success(function (data, status, headers, config) {
        $scope.postList = data.list[0];
    });

    $scope.detailPriceInfo = [
        {
            'time': '20151101',
            'price': {
                'price1': 100,
                'price2': 200,
                'price3': 300,
                'price4': 400,
                'price5': 500,
                'price6': 10
            }
        },
        {
            'time': '20151102',
            'price': {
                'price1': 1007,
                'price2': 200,
                'price3': 300,
                'price4': 400,
                'price5': 500,
                'price6': 10
            }
        },
        {
            'time': '20151103',
            'price': {
                'price1': 1020,
                'price2': 200,
                'price3': 300,
                'price4': 400,
                'price5': 500,
                'price6': 10
            }
        },
        {
            'time': '20151122',
            'price': {
                'price1': 111,
                'price2': 200,
                'price3': 300,
                'price4': 400,
                'price5': 500,
                'price6': 10
            }
        }
    ]





});


Date.prototype.firstDayOfMonth = function () {
    //var d = new Date(date.substr(0,4),date.substr(4,2)-1,1);
    //return d.getDay();
    var d = new Date(this);
    d.setDate(1);
    return d.getDay();
};

Date.prototype.getMonthDays = function () {
    var d = new Date(Date.UTC(this.getFullYear(), this.getMonth() + 1, 1));
    d.setDate(0);
    return d.getDate();
};


Date.prototype.getYearMonth = function () {
    //return String(this.getUTCFullYear()) + String(this.getUTCMonth() + 1);
    return this.Format('yyyyMM');
}

Date.prototype.addMonths = function (months) {
    var d = new Date(this);
    d.setMonth(d.getMonth() + months);
    return d;
}


Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

/*
 function curryIdentity(fn) {
 return function() {
 var args = [].slice.call(arguments);
 args.splice(0,0,this);
 return fn.apply(this, args);
 }
 }

 Date.prototype.addMonths = curryIdentity(Date.addMonths = function(date, months) {
 var d = new Date(date);
 d.setMonth(date.getMonth() + months);
 return d;
 });

 Date.prototype.addDays = curryIdentity(Date.addDays = function(date, days) {
 var d = new Date(date);
 d.setDate(date.getDate() + days);
 return d;
 });

 Date.prototype.firstDayOfMonth = curryIdentity(Date.firstDayOfMonth = function(date) {
 var d = new Date(date);
 d.setDate(1);
 return d;
 });

 Date.prototype.lastDayOfMonth = curryIdentity(Date.lastDayOfMonth = function(date) {
 return new Date(date.getFullYear(), date.getMonth()+1, 0);
 });

 Date.DAY_OF_MILLISECONDS = 86400000

 Date.prototype.firstDayOfWeek = curryIdentity(Date.firstDayOfWeek = function(date) {
 return new Date(date.valueOf() - (date.getDay()<=0 ? 7-1:date.getDay()-1)*Date.DAY_OF_MILLISECONDS);
 });

 Date.prototype.lastDayOfWeek = curryIdentity(Date.lastDayOfWeek = function(date) {
 return new Date(date.firstDayOfWeek().valueOf() + 6*Date.DAY_OF_MILLISECONDS);
 });

 Date.prototype.getMonthDate = curryIdentity(Date.getMonthDate = function(date) {
 return new Date(Date.UTC( date.getFullYear(), date.getMonth(), 1));
 });

 Date.prototype.getDayDate = curryIdentity(Date.getMonthDate = function(date) {

 return new Date(Date.UTC( date.getFullYear(), date.getMonth(), date.getDate()));
 });

 Date.prototype.isValid = curryIdentity(Date.isValid = function(date) {
 return Object.prototype.toString.call(date) === '[object Date]' && isFinite(date);
 });

 Date.fromSqlFormat = function(str) {
 var exp = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/
 var m = exp.exec(str);
 return new Date(m[1],m[2],m[3],m[4],m[5],m[6]);
 };

 Array.range = function (min, max, selector) {
 selector = selector || function(x) {return x;};
 return Array(max-min).join().split(',').map(function(e, i) { return selector(min+i); });
 }

 Array.prototype.remove = curryIdentity(Array.remove = function (array, value) {
 var index = array.indexOf(value);
 if (index >=0) {
 array.splice(index, 1);
 }
 return value;
 });


 Array.generate = function(fn) {
 var current = null, i = 0, result = [];
 fn (0, null);
 while ((current = fn(i, current)) !== false) {
 result[i] = current;
 i++;
 }

 return result;
 }*/


