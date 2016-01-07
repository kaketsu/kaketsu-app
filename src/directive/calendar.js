myApp.directive('calendar', function ($compile, $timeout, $filter, $locale) {
        // Requires that scope contains a 'monthDays' array.
        // Adds 'weeks' to scope.
        return {
            restrict: 'E',
            replace: true,
            template: '<div class="zkCalendar col-md-12 col-sm-12 col-xs-12" >'
            + '<div class="col-md-9 col-sm-9 col-xs-12">'
            + '<p class="alert alert-warning p-all-8">'
            + '<button class="btn btn-sm btn-success" ng-click="showPreMonth()">'
            + '<i class="fa fa-arrow-left"></i>'
            + '</button>'
            + '<input type="text" class="" placeholder="填写月份" ng-model="inputYearMonth">'
            + '<button class="btn btn-sm btn-success" ng-click="showNextMonth()">'
            + '<i class="fa fa-arrow-right"></i>'
            + '</button>'
            + '<button class="btn btn-sm btn-info pull-right" ng-click="clearDays()">'
            + '<i class="fa fa-check-square"></i> 全选空日期'
            + '</button>'
            + '<button class="btn btn-sm btn-success pull-right m-r-10" ng-click="showCurrentMonth()">'
            + '<i class="fa fa-check-square"></i> 当前月份'
            + '</button>'
            + '</p>'

            + '<table>'
            + '<tbody>'
            + '<tr class="days">'
            + '<th title="Sunday"><input type="checkbox" class="ace" ng-click="selectWeekdays(0)" ng-checked="workdays_checkbox[0]"><span class="lbl">&nbsp;&nbsp;日</span></th>'
            + '<th title="Monday"><input type="checkbox" class="ace" ng-click="selectWeekdays(1)" ng-checked="workdays_checkbox[1]"/><span class="lbl">&nbsp;&nbsp;一</span></th>'
            + '<th title="Tuesday"><input type="checkbox" class="ace" ng-click="selectWeekdays(2)" ng-checked="workdays_checkbox[2]"/><span class="lbl">&nbsp;&nbsp;二</span></th>'
            + '<th title="Wednesday"><input type="checkbox" class="ace" ng-click="selectWeekdays(3)" ng-checked="workdays_checkbox[3]"/><span class="lbl">&nbsp;&nbsp;三</span></th>'
            + '<th title="Thursday"><input type="checkbox" class="ace" ng-click="selectWeekdays(4)" ng-checked="workdays_checkbox[4]"/><span class="lbl">&nbsp;&nbsp;四</span></th>'
            + '<th title="Friday"><input type="checkbox" class="ace" ng-click="selectWeekdays(5)" ng-checked="workdays_checkbox[5]"/><span class="lbl">&nbsp;&nbsp;五</span></th>'
            + '<th title="Saturday"><input type="checkbox" class="ace" ng-click="selectWeekdays(6)" ng-checked="workdays_checkbox[6]" /><span class="lbl">&nbsp;&nbsp;六</span></th>'
            + '</tr>'
            + '<tr ng-repeat="week in weeks">'
            + '<td ng-repeat="day in week track by $index">'
            + '<div ng-click="singleselect(day)" ng-if="day" ng-class="{\'hasPrice\':hasPrice[day-1],\'chosen\':isChosen(day),\'isEdited\':isEdited[day-1]}">'
            + '<span ng-bind="day"></span><span class="price" ng-if="hasPrice[day-1]">$<span ng-bind="generalPriceInfo[day-1]"></span></span>'
            + '</div>'
            + '</td>'
            + '</tr>'
            + '</tbody>'
            + '</table>'
            + '</div>'
            + '<div class="col-md-3 col-sm-3 col-xs-12" ng-show="showPrice">'
            + '<p  ng-class="{true:\'alert-success\',false:\'alert-info\'}[isNewPrice()]" class="alert">'
            + '批量新增{{dateChosen.length}}个日期'
            + '</p>'
            + '<div class="p-all-10" ng-class="{true:\'bg-success\',false:\'bg-info\'}[isNewPrice()]">'
            + '<form class="priceform">'
            + '<div class="input-group m-b-10">'
            + '<span class="input-group-addon">成人价</span>'
            + '<input type="text" class="form-control" ng-model="formPrice[\'price1\']">'
            + '</div>'
            + '<div class="input-group m-b-10">'
            + '<span class="input-group-addon">儿童价</span>'
            + '<input type="text" class="form-control" ng-model="formPrice[\'price2\']">'
            + '</div>'
            + '<div class="input-group m-b-10">'
            + '<span class="input-group-addon">特惠价</span>'
            + '<input type="text" class="form-control" ng-model="formPrice[\'price3\']">'
            + '</div>'
            + '<div class="input-group m-b-10">'
            + '<span class="input-group-addon">协议价</span>'
            + '<input type="text" class="form-control" ng-model="formPrice[\'price4\']">'
            + '</div>'
            + '<div class="input-group m-b-10">'
            + '<span class="input-group-addon">跳楼价</span>'
            + '<input type="text" class="form-control" ng-model="formPrice[\'price5\']">'
            + '</div>'
            + '<div class="input-group m-b-10">'
            + '<span class="input-group-addon">狂拽酷炫价</span>'
            + '<input type="text" class="form-control" ng-model="formPrice[\'price6\']">'
            + '</div>'
            + '<button class="btn btn-danger btn-sm width-50">删除</button>'
            + '<button class="btn btn-success btn-sm width-50" ng-click="addPrice()">确定</button>'
            + '</form>'
            + '</div>'
            + '</div>'
            + '</div>'
            + '</div>',


            /*
             *   @ 绑定一个局部 scope 属性到当前 dom 节点的属性值。结果总是一个字符串，因为 dom 属性是字符串。
             *   & 提供一种方式执行一个表达式在父 scope 的上下文中。如果没有指定 attr 名称，则属性名称为相同的本地名称。
             *   = 通过 directive 的 attr 属性的值在局部 scope 的属性和父 scope 属性名之间建立双向绑定。
             */
            //独立的scope
            //scope:{},

            link: function (scope, element) {

                //scope研究看看
                console.log(scope.detailPriceInfo);

                scope.generalPriceInfo = [];

                scope.hasPrice = [];
                scope.isEdited = [];

                scope.formPrice = {
                    price1: '',
                    price2: '',
                    price3: '',
                    price4: '',
                    price5: '',
                    price6: ''
                };
                scope.showPrice = false;


                //现在的日期
                var d = new Date();
                scope.inputYearMonth = d.getYearMonth();

                //默认当前日期
                loadDays(d.getYearMonth());

                //进行日期载入
                function loadDays(YearMonth) {
                    var t = new Date(YearMonth.substr(0, 4), YearMonth.substr(4, 2) - 1, 1);

                    //获得当前月总共多少天
                    //获得当前月首先是星期几
                    scope.monthDays = t.getMonthDays();
                    scope.firstDayofMonth = t.firstDayOfMonth();

                    scope.weeks = [];
                    scope.workdays = [];
                    scope.workdays_checkbox = [];
                    scope.hasPrice = [];
                    scope.isEdited = [];

                    for (var i = 0; i < 7; i++) {
                        scope.workdays.push([]);
                        scope.workdays_checkbox[i] = false;
                    }
                    for (i = 0; i < Math.ceil((scope.monthDays + scope.firstDayofMonth) / 7) * 7; i++) {
                        //判断是否新的一周
                        if (i % 7 == 0) {
                            scope.weeks.push([]);
                        }
                        if (i < scope.firstDayofMonth || i > (scope.monthDays + scope.firstDayofMonth - 1)) {
                            //空的格子push0 在ng-if中不显示
                            scope.weeks[scope.weeks.length - 1].push(0);
                        } else {
                            scope.weeks[scope.weeks.length - 1].push(i - scope.firstDayofMonth + 1);

                            scope.hasPrice.push(0);
                            scope.isEdited.push(0);
                            scope.generalPriceInfo.push(0);
                            //载入当前日期价格
                            loadPrice(i - scope.firstDayofMonth + 1);
                            scope.workdays[(i % 7)].push(i - scope.firstDayofMonth + 1);
                        }
                    }
                    //载入日期和价格的div
                }

                function loadPrice(day) {
                    var tempDay = String(day);
                    if (tempDay.length == 1) {
                        tempDay = '0' + tempDay;
                    }
                    for (var i = 0; i < scope.detailPriceInfo.length; i++) {
                        if (scope.detailPriceInfo[i]['time'] == (scope.inputYearMonth + tempDay)) {

                            //当前的日期中存在和价格数据相同的日期，将价格日期载入进页面
                            scope.hasPrice[day - 1] = 1;
                            scope.generalPriceInfo[day - 1] = scope.detailPriceInfo[i]['price']['price1'];

                        }
                    }
                }


                //获取preview
                scope.showPreMonth = function () {
                    scope.clearDays();
                    console.log('pre');
                    d = d.addMonths(-1)
                    console.log(d.getYearMonth());
                    scope.inputYearMonth = d.getYearMonth();
                    loadDays(d.getYearMonth());
                }
                scope.showNextMonth = function () {
                    scope.clearDays();
                    console.log('next');
                    d = d.addMonths(1);
                    console.log(d.getYearMonth());
                    scope.inputYearMonth = d.getYearMonth();
                    loadDays(d.getYearMonth());
                }
                scope.showCurrentMonth = function () {
                    console.log('current');
                    if (d.getYearMonth() != new Date().getYearMonth()) {
                        scope.clearDays();
                        d = new Date();
                        console.log(d.getYearMonth());
                        scope.inputYearMonth = d.getYearMonth();
                        loadDays(d.getYearMonth());
                    }
                }

                scope.clearDays = function () {
                    scope.dateChosen = [];
                    for (var i = 0; i < 7; i++) {
                        scope.workdays_checkbox[i] = false;
                    }
                }

                scope.dateChosen = [];
                //ng-class 是否选中一天
                scope.isChosen = function (day) {
                    if (scope.dateChosen.indexOf(day) == -1) {
                        return false;
                    } else {
                        return true;
                    }
                };


                //点击表格进行添加和删除
                scope.singleselect = function (day) {
                    console.log(day);
                    //添加和删除选择的日期
                    if (scope.dateChosen.indexOf(day) == -1) {
                        scope.dateChosen.push(day);
                    } else {
                        scope.dateChosen.splice(scope.dateChosen.indexOf(day), 1);
                    }

                    //进行判断该行checkbox是否点亮
                    for (var i = 0; i < scope.workdays.length; i++) {

                        if (scope.workdays[i].indexOf(day) != -1) {
                            for (var j = 0; j < scope.workdays[i].length; j++) {
                                if (scope.dateChosen.indexOf(scope.workdays[i][j]) == -1) {
                                    scope.workdays_checkbox[i] = false;
                                    break;
                                }
                                else {
                                    scope.workdays_checkbox[i] = true;
                                }
                            }
                        }
                    }

                    //forEach无法跳出循环呀,return false,return true？
                    /*scope.workdays.forEach(function(eles,index){
                     if(eles.indexOf(day) != -1){

                     eles.forEach(function(e){
                     if(scope.dateChosen.indexOf(e) == -1){
                     scope.workdays_checkbox[index] = false;
                     return false;
                     }
                     else{
                     scope.workdays_checkbox[index] = true;
                     }
                     })

                     }
                     })*/
                }


                function setPriceList(day) {
                    var tempDay = String(day);
                    if (tempDay.length == 1) {
                        tempDay = '0' + tempDay;
                    }
                    for (var i = 0; i < scope.detailPriceInfo.length; i++) {
                        if (scope.detailPriceInfo[i]['time'] == (scope.inputYearMonth + tempDay)) {
                            //当前的日期中存在和价格数据相同的日期，将价格日期载入进Price
                            for (var j = 0; j < 6; j++) {
                                scope.formPrice['price' + (j + 1)] = scope.detailPriceInfo[i]['price']['price' + (j + 1)];
                            }


                        }
                    }
                }

                function resetPriceList() {
                    console.log('reset');
                    for (var j = 0; j < 6; j++) {
                        scope.formPrice['price' + (j + 1)] = '';
                    }
                }

                //控制Price表
                function showPrice() {
                    console.log('show');
                    if (scope.dateChosen.length == 1) {
                        //将Price显示出来
                        //1.得到price的
                        //question:为什么会显示两次
                        if (!scope.isNewPrice(scope.dateChosen[0])) {
                            setPriceList(scope.dateChosen[0]);
                        } else {
                            resetPriceList();
                        }
                        return true;
                    } else if (scope.dateChosen.length > 1) {
                        resetPriceList();
                        return true;
                    }
                    else {
                        return false;
                    }
                }

                scope.isNewPrice = function () {
                    if (scope.dateChosen.length != 0) {
                        for (var i = 0; i < scope.dateChosen.length; i++) {
                            if (scope.hasPrice[scope.dateChosen[i] - 1] == 1) {
                                //console.log('not new Price');
                                return false;
                            }
                        }
                        return true;
                    }
                }


                scope.$watchCollection('dateChosen', function (days, oldDays) {
                    scope.showPrice = showPrice();
                    //console.log(days);
                })

                //checkbox框点击来添加和删除日期
                scope.selectWeekdays = function (n) {
                    scope.workdays_checkbox[n] = !scope.workdays_checkbox[n];
                    if (scope.workdays_checkbox[n]) {

                        //如果checkbox是选中状态，添加日期
                        for (var i = 0; i < scope.workdays[n].length; i++) {
                            if (scope.dateChosen.indexOf(scope.workdays[n][i]) == -1) {
                                scope.dateChosen.push(scope.workdays[n][i]);
                            }
                        }
                    }
                    else {
                        //如果checkbox是未选中状态，删除该日期
                        for (var j = 0; j < scope.workdays[n].length; j++) {
                            if (scope.dateChosen.indexOf(scope.workdays[n][j]) != -1) {
                                scope.dateChosen.splice(scope.dateChosen.indexOf(scope.workdays[n][j]), 1);
                            }

                        }
                    }
                }

                //添加价格
                scope.addPrice = function () {
                    console.log('addPrice');
                    console.log(scope.formPrice);

                    //保存当前选择项中的日期数值
                    for (var i = 0; i < scope.dateChosen.length; i++) {
                        //首先设为已经有Price
                        scope.hasPrice[scope.dateChosen[i] - 1] = 1;
                        scope.isEdited[scope.dateChosen[i] - 1] = 1;
                        scope.generalPriceInfo[scope.dateChosen[i] - 1] = scope.formPrice['price1'];

                        var tempDay = String(scope.dateChosen[i]);
                        if (tempDay.length == 1) {
                            tempDay = '0' + tempDay;
                        }

                        var time = scope.inputYearMonth + tempDay;

                        var temPrice = new Object();

                        for (elements in scope.formPrice) {
                            temPrice[elements] = scope.formPrice[elements];
                        }

                        scope.detailPriceInfo.push({
                                'time': time,
                                'price': temPrice
                            }
                        )
                    }
                }


                //键盘复制事件
                document.querySelector('form').onkeydown = function (e) {
                    console.log(e);
                    e = e || window.event;
                    if (e.ctrlKey && e.keyCode == 67) {
                        alert('按下了Ctrl+C键');
                        // do something
                    }
                    if (e.ctrlKey && e.keyCode == 86) {
                        alert('按下了Ctrl+V键');
                        // do something
                    }
                }

            }
        }
    }
)







