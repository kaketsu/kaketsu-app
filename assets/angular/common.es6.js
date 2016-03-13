/**
 * Created by wangkehan on 16/1/5.
 */

angular.module('common.config', [])
    .config(function ($provide) {
        $provide.decorator('$rootScope', function ($delegate) {
            Object.defineProperty($delegate.constructor.prototype, '$onRootScope', {
                value(name, listener){
                    const s = $delegate.$on(name, listener);
                    this.$on('$destory', s);
                    return s;
                },
                enumerable: false
            });
            return $delegate;
        })
    });

angular.module('common.utils', [])
    .service('array', function(){
        return {
            reduce: (list, key)=>{
                return list.reduce((p,v)=>{
                    if (v[key] == null) return p;
                    if (typeof(v[key]) === 'object') {
                        p += v[key][0];    
                    } else {
                        p += v[key];
                    }
                    return p; 
                },0)        
            },
            total: (list, key, value)=>{
                return list.reduce((p,v)=>{
                    if (typeof(key) === 'undefined') {
                        p += 1;
                    } else if (v[key] === value) {
                        p += 1;    
                    }
                    return p; 
                },0)        
            },
               
        }
    })
    .factory('utils', function () {
        return {
            registerStyle(styleText, name){
                const style = document.createElement('style');
                style.dataset.angularFor = name;
                style.innerHTML = styleText;
                document.head.appendChild(style);
            }
        }
    })
    .factory('tools', function () {
        return {
            minutesToHour: function (m) {               //将分钟数转化为 h:m - h小时m分
                var hours = Math.floor(m / 60);
                return hours + '时' + (m - hours * 60) + '分';
            },
            getParams: function (url) {
                return url.split('?')[1].split('&').reduce(function (previous, current) {
                    previous[current.split('=')[0]] = current.split('=')[1];
                    return previous;
                }, {})
            },
            timeDiff: function (from, to) {             //计算两个时间差，注：t1与t2最多不会相差24小时
                var aFrom = from.split(':');
                var aTo = to.split(':');

                from = parseInt(aFrom[0]) * 60 + parseInt(aFrom[1]);      //折算成分钟数
                to = parseInt(aTo[0]) * 60 + parseInt(aTo[1]);

                //返回相差时间（以h:m表示几小时几分）
                var diff = 0, hours = 0;
                if (from < to) {                //在同一天
                    diff = to - from;
                    return this.minutesToHour(diff);
                } else {                        //跨天
                    diff = 24 * 60 - from + to;
                    return this.minutesToHour(diff);
                }
            },
            calcDegree: function (d) {
                return d * Math.PI / 180.0;
            },
            calcDistance: function (f, t) {
                var FINAL = 6378137.0;
                var flat = this.calcDegree(f[0] || f.lat);
                var flng = this.calcDegree(f[1] || f.lng);
                var tlat = this.calcDegree(t[0] || t.lat);
                var tlng = this.calcDegree(t[1] || t.lng);

                var result = Math.sin(flat) * Math.sin(tlat);
                result += Math.cos(flat) * Math.cos(tlat) * Math.cos(flng - tlng);
                result = parseInt(Math.acos(result) * FINAL / 1000); //公里数
                return result;
            },
            isEmpty: function (variable) {
                return (variable == '' || variable == null || variable == undefined);
            },
            getWeek: function (str) {
                return ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][(new Date(str)).getDay()];
            },
            //数组取差集：从数组1中去掉数组2中的元素
            arrayMinus: function (a, b) {
                return a.filter((e)=> {
                    return !b.includes(e)
                });
                /* old code
                 var seen = [], diff = [];
                 for (var i = 0; i < b.length; i++)
                 seen[b[i]] = true;
                 for (var i = 0; i < a.length; i++)
                 if (!seen[a[i]]) diff.push(a[i]);
                 return diff;
                 */
            }
        }
    })
    .factory('inject', ()=> {

        function injectJs(abPath) {
            if (!zouke.$(`script[src="${abPath}"]`)) {
                const script = document.createElement('script');
                script.src = abPath;
                script.dataset.inject = 'true';
                document.head.appendChild(script);
                return new Promise((r)=> {
                    script.onload = ()=> {
                        r()
                    };
                })
            }
            return Promise.resolve();
        }

        return {
            css(path){
                const href = `/assets2/css/${path}`;
                if (!zouke.$(`link[href="${href}"]`)) {
                    const link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = `/assets2/css/${path}`;
                    link.dataset.inject = 'true';
                    document.head.appendChild(link);
                }
            },
            js(path){
                injectJs(`/assets2/js/${path}`);
            },
            jsLib(path){
                injectJs(`/assets2/js.lib/${path}`);
            },
            jsHttp(url){
                if (url.startsWith('http://') || url.startsWith('https://')) {
                    injectJs(url);
                } else if (url.startsWith('//')) {
                    injectJs(location.protocol + url);
                } else {
                    injectJs('http://' + url);
                }
            },
            jsAsync(path){
                return injectJs(`/assets2/js/${path}`);
            },
            jsLibAsync(path){
                return injectJs(`/assets2/js.lib/${path}`);
            },
            jsHttpAsync(url){
                if (url.startsWith('http://') || url.startsWith('https://')) {
                    return injectJs(url);
                } else if (url.startsWith('//')) {
                    return injectJs(location.protocol + url);
                } else {
                    return injectJs('http://' + url);
                }
            },
            rawJsAsync(path){
                return injectJs(path);
            }
        }
    });

angular.module('common.directive', ['common.utils'])
    .directive('contenteditable', function (utils) {
        utils.registerStyle(`
[contenteditable]{
  font-size:1.2em;
  padding:4px;
  min-width:6em;
  line-height:1.2em;
  border:1px solid #aaa;
  background:white;
  white-space:pre-wrap;
  -webkit-user-select:text;
  -moz-user-select:text;
  user-select:text;
  box-sizing:content-box;
  min-height:1.2em;
}
[contenteditable]:empty:before{
    content:attr(placeholder);
    display:block;
    color:#aaa;
}
[contenteditable="false"]{
    color:#333;
    opacity:0.5;
}
`, 'contenteditable');

        return {
            restrict: "A",
            require: "?ngModel",
            link: function ($scope, element, attr, model) {
                model && (model.$render = function () {
                    element[0].innerText = model.$viewValue;
                });

                element[0].on('paste', function (e) {
                    e.preventDefault();
                    document.execCommand('insertHtml', false, e.clipboardData.getData('text/plain'));
                    model && model.$setViewValue(element[0].innerText.trim());
                });

                element[0].addEventListener("input", function (e) {
                    model && model.$setViewValue(element[0].innerText.trim());
                });

            }
        }

    })
    .directive('number', function (utils) {
        const reg = /^-?[0-9]*$/;

        utils.registerStyle(`
.number-component>span{
    display:inline-block;
    vertical-align:middle;
    width:32px;
    height:32px;
    box-sizing:content-box;
    cursor:pointer;
    font-size:20px;
    line-height:32px;
    text-align:center;
}
.number-component.hide-op>span{
    display:none!important;
}
.number-component.vertical>span,
.number-component.vertical>input{
    display:block;
    margin:auto;
    font-weight:bold;
}
.number-component>input{
    display:inline-block;
    vertical-align:middle;
    text-align:center;
    width:2em;
    font-size:16px;
    border:1px solid #aaa;
    background:white;
    padding:4px;
    line-height:22px;
}
    `, 'number')

        return {
            restrict: 'E',
            require: '?ngModel',
            replace: true,
            scope: true,
            template: `
        <div class="number-component" ng-class="{'vertical':vertical,'hide-op':hideOp}">
            <span class="fa" ng-class="{true:'fa-chevron-up',false:'fa-minus'}[vertical]" ng-click="vertical?add():sub()"></span>
            <input ng-blur="blur()" ng-change="checkValue('{{props.value}}')" ng-model="props.value" placeholder="{{placeholder}}">
            <span class="fa" ng-class="{true:'fa-chevron-down',false:'fa-plus'}[vertical]" ng-click="vertical?sub():add()"></span>
        </div>
        `,
            link: function ($scope, element, attr, model) {

                $scope.vertical = 'vertical' in attr;
                $scope.hideOp='hideOp' in attr;
                $scope.placeholder=attr.placeholder;

                const min = 'min' in attr ? parseInt(attr.min, 10) : Number.MIN_SAFE_INTEGER;
                const max = 'max' in attr ? parseInt(attr.max, 10) : Number.MAX_SAFE_INTEGER;

                const showValue = parseInt(attr.default, 10) || ('min' in attr ? min : (1 > max ? max : 1));

                if (max < min) {
                    throw new RangeError('attribute max less than min')
                }

                function constraint(num) {
                    if (num < min) {
                        num = min;
                    } else if (num > max) {
                        num = max;
                    }
                    return num;
                }

                $scope.props = {
                    value: showValue
                };

                model && (model.$render = function () {
                    const viewValue = model.$viewValue || showValue;
                    const checkValue = constraint(viewValue);
                    if (model.$viewValue !== checkValue) {
                        model.$setViewValue(checkValue);
                    }
                    $scope.props.value = checkValue.toString();
                });
                $scope.sub = function () {
                    if ($scope.props.value > min) {
                        --$scope.props.value;
                    }
                    model && model.$setViewValue($scope.props.value);
                };
                $scope.add = function () {
                    if ($scope.props.value < max) {
                        ++$scope.props.value;
                    }
                    model && model.$setViewValue($scope.props.value);
                };

                $scope.checkValue = function (old) {
                    let newValue = $scope.props.value.toString().trim();
                    if (newValue === '') {
                        model && model.$setViewValue(constraint(0));
                        //$scope.props.value = constraint(0);
                    } else {
                        if (reg.test($scope.props.value)) {
                            model && model.$setViewValue(constraint(parseInt($scope.props.value, 10)));
                        } else {
                            $scope.props.value = parseInt(old, 10);
                        }

                    }
                };
                $scope.blur = function () {
                    if ($scope.props.value.toString().trim() === '') {
                        $scope.props.value = constraint(0);
                    } else {
                        $scope.props.value = constraint(parseInt($scope.props.value, 10));
                    }
                }

            }
        }
    })
    .directive('tagSelect', function (utils, $timeout) {
        utils.registerStyle(`
.tag-select>div{
    position:relative;
}
.tag-select>div.tag-list:nth-child(2){
    border-top:1px dashed lightgrey;
    padding-top:5px;
}
.tag-select>div.tag-list:not(:first-child):before{
    display:block;
    position:absolute;
    right:100%;
    line-height:34px;
    padding-right:5px;
    content:"（"attr(data-title)"）";
    opacity:0.7;
    white-space:nowrap;
}
.tag-select>div:last-child{
    border:1px solid lightgrey;
    border-radius:5px;
    display:-webkit-flex;
    display:flex;
    -webkit-align-items:center;
    align-items:center;
    padding:5px;
    -webkit-flex-wrap:wrap;
    flex-wrap:wrap;
}
.tag-select>div:last-child>button,
.tag-select>div:last-child>div{
    margin:2.5px 0;
}
.tag-select>div:last-child input{
    border:none!important;
    width:100%;
    box-sizing:border-box!important;
}
.tag-select>div:last-child .datalist{
    background:white;
    position:absolute;
    left:0;
    top:100%;
    min-width:100%;
    border:1px solid grey;
    box-shadow:1px 1px 5px 1px rgba(100,100,100,0.3);
    max-height:18em;
    overflow:auto;
    z-index:100;
}
.tag-select>div:last-child .datalist .item{
    font-size:1.1em;
    line-height:1.8em;
    padding:0 1em;
    cousor:pointer;
}
.tag-select>div:last-child .datalist .item.active,
.tag-select>div:last-child .datalist .item:hover{
    background:#316ac5;
    color:white;
}
        `, 'tag-select')
        return {
            restrict: 'E',
            require: '?ngModel',
            scope: {ngDisabled: '='},
            template: `
    <section class="tag-select">
        <div class="tag-list top">
            <span ng-class="{active:select.ids.indexOf(id)>-1,disabled:ngDisabled}" ng-repeat="(id,name) in tags.top" ng-click="toggleTag(id,name)" data-id="{{id}}" class="btn btn-tag clickable btn-white btn-success btn-round bottom-5 right-5">{{name}}</span>
        </div>
        <div class="tag-list child" ng-repeat="(key,list) in tags.child" ng-if="showChildTag&&select.ids.indexOf(list.id)>-1" data-title="{{key}}">
            <span ng-class="{active:select.ids.indexOf(id)>-1,disabled:ngDisabled}" ng-click="toggleTag(id,name)" ng-repeat="(id,name) in list" ng-if="id!=='id'" data-id="{{id}}" class="btn btn-tag clickable btn-white btn-success btn-round bottom-5 right-5">{{name}}</button>
        </div>
        <div ng-show="!ngDisabled||getNotShowIds().length>0">
            <span ng-class="{disabled:ngDisabled}" ng-repeat="id in getNotShowIds()" ng-click="toggleTag(id)" class="btn btn-tag clickable btn-white btn-success btn-round right-5 active">{{getNameById(id)}}</span>
            <div style=""></div>
            <span ng-class="{disabled:ngDisabled}" ng-repeat="name in select.customs" ng-click="removeCustom(name)" class="btn btn-tag clickable btn-white btn-success btn-round left-5 active">{{name}}</span>
            <div ng-show="!ngDisabled" style="position:relative;-webkit-flex:1;flex:1;">
                <input ng-blur="blur()" ng-focus="focus()" type="text" placeholder="输入标签,|线分隔" onkeydown='if(event.keyCode==13) return false;'>
                <div class="datalist" ng-hide="searchList.length===0" ng-mouseenter="activeSearch=-1;">
                    <div ng-class="{active:$index===activeSearch}" ng-click="toggleTag(tag.id.toString(),tag.name,true)" ng-repeat="tag in searchList" class="item" data-id="{{tag.id}}">{{tag.name}}</div>
                </div>
            </div>
        </div>
    </section>
            `,
            async link($scope, element, attr, model) {
                $scope.showChildTag = "childTag" in attr;
                const type = attr.type || '10';

                const tagIdNameCollection = {};

                $scope.tags = {
                    top: {},
                    child: {}
                };

                const _cache = [];
                $scope.select = {
                    ids: [],
                    customs: []
                };

                $scope.searchList = [];
                let _activeSearch = -1;
                Object.defineProperty($scope, "activeSearch", {
                    get(){
                        if (_activeSearch > $scope.searchList.length - 1) {
                            _activeSearch = $scope.searchList.length - 1;
                        }
                        if (_activeSearch < 0) {
                            _activeSearch = -1;
                        }
                        return _activeSearch;
                    },
                    set(v){
                        if (v < 0) {
                            v = -1;
                        }
                        if (v > $scope.searchList.length - 1) {
                            v = $scope.searchList.length - 1;
                        }
                        _activeSearch = v;
                    }
                });
                $scope.activeSearch = -1;

                model && (model.$render = async ()=> {
                    $scope.select = model.$viewValue;
                    let needRender = false;
                    const noneNameIds = [];
                    for (let id of $scope.select.ids) {
                        if (!tagIdNameCollection.id) {
                            noneNameIds.push(id);
                        }
                        if ($scope.showChildTag) {
                            if (id in $scope.tags.top && !($scope.tags.top[id] in $scope.tags.child)) {
                                let t = await getChildTags(id);
                                if (t) {
                                    needRender = true;
                                    $scope.tags.child[$scope.tags.top[id]] = t;
                                    $scope.tags.child[$scope.tags.top[id]].id = id;
                                }
                            }
                        }
                    }
                    if (noneNameIds.length > 0) {
                        needRender = true;
                        Object.assign(tagIdNameCollection, (await zouke.resource.postAsync('/utils/GetTagsName', {ids: noneNameIds})).tags);
                    }

                    if (needRender) {
                        $scope.$apply();
                    }
                });

                $scope.getNameById = function (id) {
                    return tagIdNameCollection[id];
                };

                $scope.getNotShowIds = function () {
                    _cache.length = 0;
                    for (let id of $scope.select.ids) {
                        if (element.find(`.tag-list .btn[data-id="${id}"]`).length > 0) continue;
                        _cache.push(id);
                    }
                    return _cache;
                };

                function toggleIds(id) {
                    if ($scope.ngDisabled) return;
                    const index = $scope.select.ids.indexOf(id);
                    if (index === -1) $scope.select.ids.push(id);
                    else $scope.select.ids.splice(index, 1);
                }

                async function getTopTags() {
                    let tags = (await zouke.resource.postAsync('/utils/getPTags', {cat: type})).tags;
                    let t = {};
                    for (let tag of tags) {
                        t[tag.id] = tag.name;
                    }
                    Object.assign(tagIdNameCollection, t);
                    return t;
                }

                async function getChildTags(pid) {
                    let tags = (await zouke.resource.postAsync('/utils/getCTags', {pid})).tags;
                    if (tags.length === 0) return null;
                    let t = {};
                    for (let tag of tags) {
                        t[tag.id] = tag.name;
                    }
                    Object.assign(tagIdNameCollection, t);
                    return t;
                }

                async function getSearchList(name) {
                    let tags = [];
                    if (name) {
                        let result = (await zouke.resource.postAsync('/utils/getRecommendTag', {name})).tags;
                        for (let tag of result) {
                            if ($scope.select.ids.includes(tag.id.toString())) continue;
                            tagIdNameCollection[tag.id] = tag.name;
                            tags.push(tag);
                        }
                    }
                    return tags;
                }

                $scope.toggleTag = async function (id, name, cleanInput) {
                    toggleIds(id);
                    $scope.searchList = [];
                    if (name && $scope.showChildTag && id in $scope.tags.top && !$scope.tags.child[name]) {
                        let t = await getChildTags(id);
                        if (t) {
                            $scope.tags.child[name] = t;
                            $scope.tags.child[name].id = id;
                            $scope.$apply();
                        }
                    }
                    if (cleanInput) {
                        element.find('input').val('');
                    }
                };
                $scope.removeCustom = function (name) {
                    if ($scope.ngDisabled) return;
                    $scope.select.customs.splice($scope.select.customs.indexOf(name), 1);
                };

                let _t = null;
                $scope.blur = function () {
                    _t = $timeout(()=> {
                        $scope.searchList = [];
                    }, 100);
                };
                $scope.focus = function () {
                    $timeout.cancel(_t);
                    element.find('input').trigger('input');
                };

                element.find('input').on('input', async function (e) {
                    const value = e.target.value.trim();
                    if (value.endsWith('|')) {
                        const tagValue = value.substr(0, value.length - 1).trim();
                        if (($scope.searchList[0] && $scope.searchList[0].name) === tagValue) {
                            if (!$scope.select.ids.includes($scope.searchList[0].id)) {
                                $scope.toggleTag($scope.searchList[0].id.toString(), $scope.searchList[0].name);
                            }
                        } else {
                            let needPush = true;
                            for (let id of $scope.select.ids) {
                                if ($scope.getNameById(id) === tagValue) {
                                    needPush = false;
                                    break;
                                }
                            }
                            if (needPush && !$scope.select.customs.includes(tagValue)) {
                                $scope.select.customs.push(tagValue);
                            }
                        }
                        e.target.value = '';
                        $scope.searchList = [];
                        $scope.$apply();
                    } else {
                        $scope.searchList = await getSearchList(value);

                        for (let tag of $scope.searchList) {
                            let index = $scope.select.customs.indexOf(tag.name);
                            if (index > -1) {
                                $scope.select.customs.splice(index, 1);
                                if (!$scope.select.ids.includes(tag.id.toString())) {
                                    $scope.toggleTag(tag.id.toString(), tag.name);
                                }
                            }
                        }

                        $scope.$apply();
                    }
                });
                element.find('input').on('keyup', (e)=> {
                    if (e.keyCode === 40) {
                        //down;
                        ++$scope.activeSearch;
                        e.preventDefault();
                        $scope.$apply();
                    } else if (e.keyCode === 38) {
                        //up
                        --$scope.activeSearch;
                        e.preventDefault();
                        $scope.$apply();
                    } else if (e.keyCode === 13) {
                        let tag = $scope.searchList[$scope.activeSearch];
                        if (tag) {
                            $scope.toggleTag(tag.id.toString(), tag.name, true);
                        } else {
                            if (e.target.value !== '') {
                                e.target.value += '|';
                                $(e.target).trigger('input');
                                if (e.target.value === '') {
                                    e.target.dataset._empty = '1';
                                }
                            }
                        }
                        e.preventDefault();
                        $scope.$apply();
                    } else {
                        if (e.target.dataset._empty === '1' && e.keyCode === 8) {
                            $scope.select.customs.pop();
                            $scope.$apply();
                        }
                        if (e.target.value === '') e.target.dataset._empty = '1';
                        else e.target.dataset._empty = '0';
                    }
                });

                $scope.tags.top = await getTopTags();
                if ($scope.showChildTag && $scope.select.ids.length > 0) {
                    for (let tagId in $scope.tags.top) {
                        if ($scope.select.ids.includes(tagId) && !$scope.tags.child[$scope.tags.top[tagId]]) {
                            let t = await getChildTags(tagId);
                            if (t) {
                                $scope.tags.child[$scope.tags.top[tagId]] = t;
                                $scope.tags.child[$scope.tags.top[tagId]].id = tagId;
                            }
                        }
                    }
                }
                $scope.$apply();
            }
        }
    })
    .directive("showAddress", function ($timeout) {
        /*
         用法



         */
        return {
            restrict: 'EA',
            scope: {
                model: "=",
                showCity: "=",
                autoShow: "=",
            },
            template: `
            <div class="form-group" ng-if="showCity">
                <label class="col-md-2 control-label no-padding-right">位置*</label>
                <div class="col-md-8">
                    <select  class="col-md-8" ng-model="model.city" id="cities"  data-placeholder="选择城市"
                        ng-options="c.code as c.name for c in cities" required name="城市" ng-change="selectCity()">
                        <option value=""></option>
                    </select>
                </div>

            </div>


            <div class="form-group" ng-if="showCity">
                <div class="col-md-10 col-md-offset-2">
                    <input type="text" class="col-md-10" ng-model="model.address" placeholder="详细地址">
                </div>
            </div>

            <div class="form-group">
                <label class="col-md-2 control-label no-padding-right">{{showCity?" ":"位置*"}}</label>
                <div class="col-md-8">
                    <input type="text" class="col-md-4" ng-model="model.gps.lat" placeholder="纬度">
                    <input type="text" class="col-md-4" ng-model="model.gps.lng" placeholder="经度" style="margin-left:10px;">
                    <div class="col-md-3">
                        <button ng-click="showMap(model.address||model.en_name||model.formerly||model.ori_name||model.zh_name,\'map\')" class="btn btn-sm btn-success">辅助查询</button>
                    </div>
                </div>
            </div>

            <div id="dialog" class="hide" title="选择一个详细地址">
                 <div class="space-5"></div>
				    <select class="detailAddress"
                        ng-change="showNewMap()"
                        ng-model="addSelect"
                        ng-options="a.geometry as a.formatted_address for a in adds">
                        <option>
                        </option>
				    </select>
			</div>

            <div class="form-group">
                <div class="col-md-10 col-md-offset-2">
                    <div id="map"></div>
                </div>
            </div>`,

            controller: function ($scope) {
                $scope.showCity = angular.isDefined($scope.showCity) ? $scope.showCity : true;
                $scope.autoShow = angular.isDefined($scope.autoShow) ? $scope.autoShow : false;

                zouke.resource.postAsync('/utils/getCityList', {
                    coId: "all",
                    template: 'code_zename_country'
                }).then(function (result) {
                    $scope.cities = result.cities;
                    $scope.$apply();
                    $timeout(function () {
                        $('#cities').chosen({allow_single_deselect: true});
                    }, 300)
                })

                $scope.showNewMap = function () {
                    setTimeout(function () {
                        "use strict";
                        //console.log($scope.addSelect);
                    }, 100)
                }

                // $scope.model.country = null;
                $scope.selectCity = function () {
                    for (var i = 0; i < $scope.cities.length; i++) {
                        if ($scope.model.city == $scope.cities[i].code) {
                            $scope.model.country = $scope.cities[i].country;
                        }
                    }
                }
                var initMap = function (location, ele) {
                    // var latlng = new google.maps.LatLng(location.lat(), location.lng());
                    var map = new google.maps.Map(ele, {center: location, zoom: 17});
                    var marker = new google.maps.Marker({
                        position: location,
                        map: map
                    });
                    if (typeof($scope.model.gps) === 'undefined') {
                        $scope.model.gps = {};
                    }
                    $scope.model.gps.lat = location.lat();
                    $scope.model.gps.lng = location.lng();
                    //$scope.$emit('showaddress.finished')

                };
                if ($scope.autoShow) {
                    if (typeof($scope.model.gps) != 'undefined') {
                        var latlng = new google.maps.LatLng($scope.model.gps.lat, $scope.model.gps.lng);
                        var ele = document.getElementById('map')
                        initMap(latlng, ele);
                    }

                }
                $scope.$on('common.showaddress', function () {
                    $scope.showMap($scope.model.address || $scope.model.en_name || $scope.model.formerly || $scope.model.ori_name || $scope.model.zh_name, 'map')
                });
                $scope.showMap = function (address, id) {
                    var geocoder = new google.maps.Geocoder();
                    var ele = document.getElementById(id)


                    geocoder.geocode({
                        'address': address + ' ' + ($scope.model.country ? $scope.model.country : ''),
                        region: $scope.model.country
                    }, function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            if (results.length > 1) {
                                var adds = [];


                                $scope.adds = [];
                                for (var i = 0; i < results.length; i++) {
                                    adds[i] = results[i].formatted_address;
                                    $scope.adds.push(results[i]);
                                }
                                $scope.$apply();

                                $('#dialog').removeClass('hide').dialog(
                                    {
                                        width: 'auto',
                                        resizable: true,
                                        modal: true,
                                        buttons: [
                                            {
                                                html: "<i class='ace-icon fa fa-times bigger-110'></i>&nbsp; 确定",
                                                "class": "btn btn-xs btn-success",
                                                click: function () {
                                                    initMap($scope.addSelect.location, ele);
                                                    $(this).dialog("close");
                                                }
                                            }
                                        ]
                                    }
                                );

                            } else {
                                initMap(results[0].geometry.location, ele);
                            }
                        } else {
                            if (!$scope.showCity) {
                                MessageBox.danger("查询不结果！填写【英文名】或者【原文名】再试试！");
                            } else {
                                MessageBox.danger("查询不结果！请检查地址是否正确");
                            }

                        }
                        $scope.$apply();
                    });
                };
            }
        }
    })
    .directive("userSelect", function (utils, $timeout) {
        /*
         *用法:
         * 打开页面使用:
         * $scope.$emit('userSelect:search',{});
         * $scope.$emit('userSelect:search',{name: $scope.traveler.name});
         *
         *监听 $scope.$emit('userSelect:ok', c); //选择用户完成
         *监听 $scope.$emit('userSelect:create'); //新建用户
         *
         *  js中 angular.module("myApp", ['common'])
         */
        utils.registerStyle(`
.user-select .container {
    border: 1px solid grey;
    background: white;
    padding: 10px !important;
    line-height: 2em;
    width:100%;
    max-width:800px;
}

.user-select .container input[type="text"] {
    padding-top: 0;
    padding-bottom: 0
}

.user-select .container .list {
    border: 1px solid lightgrey;
    height: 380px;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    flex-direction: column;
    margin-top:15px;
}

.user-select .container .list table {
    width: 100%;
    box-sizing: border-box;
    line-height: 3em
}

.user-select .container .list table th, .user-select .container .list table td {
    vertical-align: middle;
    padding-left: 5px
}
.user-select .container .list table td{
    padding-top:15px;
}

.user-select .container .list table th:nth-child(1), .user-select .container .list table td:nth-child(1) {
    width: 8em;
}

.user-select .container .list table th:nth-child(2), .user-select .container .list table td:nth-child(2) {
    width: 10em;
}

.user-select .container .list table th:nth-child(3), .user-select .container .list table td:nth-child(3) {
    width: 18em;
}

.user-select .container .list table th input, .user-select .container .list table th span, .user-select .container .list table td input, .user-select .container .list table td span {
    display: inline-block;
    margin: 0;
    vertical-align: middle
}

.user-select .container .list .head {
    border-bottom: 1px dashed lightgrey;
    margin: 0 15px
}

.user-select .container .list .body {
    -webkit-flex: 1;
    flex: 1;
    overflow: auto;
    margin: 0 15px
}

.user-select .container .list .body tr {
    cursor: pointer
}

.user-select .container .button-controller {
    text-align: center;
    padding-top: 10px;
}
button.close{
    position:relative;
}
input.email:invalid{
    border:2px solid red;
}
tbody td{
    word-break:break-word;
    line-height:20px;
}
        `, 'user-select');
        return {
            restrict: 'E',
            scope: true,
            template: `
<div ng-class="{'open':open}" class="_modal user-select">
    <div class="container">
        <div>
            <span ng-show="desc==1">请选择相匹配的用户</span>
            <div ng-show="desc==0">
            <input ng-model="search.value" class="input-large" ng-change="searchInfo('{{search.value.trim()}}')" type="text" placeholder="录入用户姓名或手机号">
            <span class="btn btn-success btn-no-border input-small pull-right" ng-click="edit()">{{select?'编辑':'新建'}}</span>
            <span class="btn btn-success btn-no-border input-small pull-right right-5" ng-click="view()" ng-if="select">查看详情</span>
            </div>
        </div>
        <div class="list">
            <div class="head">
                <table>
                    <thead>
                    <tr>
                        <th>姓名</th>
                        <th>手机号</th>
                        <th>邮箱</th>
                        <th>居住地</th>
                    </tr>
                    </thead>
                </table>
            </div>
            <div class="body">
                <table>
                    <tbody>
                    <tr ng-click="selectInfo(c)" ng-repeat="c in list">
                        <td class="name"><input class="disable-pointer-events" name="user" ng-model="select.id" value="{{c.id}}" type="radio">&ensp;<span>{{c.name}}</span></td>
                        <td>{{c.mobile}}</td>
                        <td>{{c.email}}</td>
                        <td>{{c.address}}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="button-controller">
            <span class="btn btn-success btn-no-border input-small" ng-class="{'disabled':!select}" ng-click="ok()">确定</span>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
            <span class="btn btn-success btn-no-border input-small" ng-click="cancel()">取消</span>

        </div>
    </div>
</div>
<user-detail></user-detail>`,
            async link($scope, element, attr) {
                $scope.open = false;
                $scope.list = [];
                $scope.search = {value: ''};
                $scope.select = null;
                $scope.desc = 0;

                $scope.$onRootScope('userSelect:list', (k, v)=> {
                    Object.assign($scope, {
                        list: [],
                        type: 'select',
                        name: '',
                        search: {value: v.name},
                        select: null,
                        desc: v.desc
                    });
                    $scope.searchInfo();
                });

                //$scope.$onRootScope('userSelect:search', (k,{name,id})=> {
                //    Object.assign($scope, {
                //        open : true,
                //        list: [],
                //        search: {value: name},
                //        select: {id}
                //    });
                //    //$scope.searchInfo('');
                //});
                $scope.$onRootScope('userSelect:search', ()=> {
                    Object.assign($scope, {
                        open: true,
                        list: [],
                        type: 'search',
                        name: '',
                        search: {value: ''},
                        select: null
                    });
                });

                $scope.searchInfo = async function (old) {
                    const v = $scope.search.value.trim();
                    console.log(v);
                    if (v === '') {
                        $scope.list = [];
                        $scope.select = null;
                        return;
                    }
                    if (old === v) return;
                    if (v === '') return;
                    const list = (await zouke.resource.postAsync('/customer/GetCustomerList', {content: v})).list;
                    if ($scope.search.value.trim() === v) {
                        $scope.list = list;
                        if ($scope.select) {
                            const c = $scope.list.find(c=>c.id === $scope.select.id);
                            $scope.select = c ? c : null;
                        }
                    }
                    if ($scope.list.length > 0) {
                        Object.assign($scope, {
                            open: true
                        });
                    }
                    console.log($scope.list);
                    $scope.$apply();
                };
                $scope.selectInfo = function (v) {
                    if ($scope.select && $scope.select.id === v.id)$scope.select = null;
                    else $scope.select = v;
                };
                $scope.ok = function () {
                    if ($scope.select) {
                        $scope.$emit('userSelect:ok', angular.copy($scope.select));
                        $scope.open = false;
                        return;
                    }
                };
                $scope.cancel = function () {
                    $scope.$emit('userCheck:checkNewUser');
                    $scope.open = false;
                };

                $scope.edit = function () {
                    $scope.open = false;
                    if ($scope.select) {
                        $scope.$emit('userDetail:edit', angular.copy($scope.select));
                    } else {
                        $scope.$emit('userDetail:create');
                    }
                };
                $scope.view = function () {
                    $scope.open = false;
                    $scope.$emit('userDetail:view', angular.copy($scope.select));
                }

                $scope.$onRootScope('userDetail:ok', (e, d)=> {
                    const result = $scope.list.find(c=>c.id === d.id)
                    result && Object.assign(result, d);
                })
            }
        }
    })
    .directive("userDetail", function ($timeout, inject) {
        /*
         *用法:
         * 跳转修改页面:
         * 使用:$scope.$emit('userSelect:ok', c);  //c为要修改的用户的完整信息集合
         * 新建或者修改返回数据:
         * $scope.$onRootScope('userDetail:detail',(e,d)=>{
         console.log(d); //d 为获取到的用户信息集合
         });
         */
        return {
            restrict: 'E',
            scope: true,
            templateUrl: '/assets2/js/angular/user-detail.html',
            async link($scope, element, attr) {
                inject.jsLib('pinyin.min.js');

                /************************控件初始化 start***********************************/
                $('.chosen-select').chosen({allow_single_deselect: true});
                $(window).on('resize.chosen', function () {
                    $('.chosen-select').each(function () {
                        $(this).next().css({'width': $(this).parent().width()});
                    });
                }).trigger('resize.chosen');
                $('textarea[class*=autosize]').autosize({append: "\n"});

                $('#birthday').datepicker({
                    startDate: '',
                });
                /************************控件初始化 end***********************************/

                /************************数据初始化 start***********************************/
                $scope.open = false;
                $scope.isCreate = false;
                $scope.shouldDisable = false;

                $scope.traveler = {
                    id: 0,
                    is_traveler: 0,
                    is_contact: 0,
                    name: '',
                    name_pinyin: '',
                    gender: '',
                    birthday: '',
                    mobile: '',
                    email: '',
                    address: '',
                    weixin: '',
                    qq: '',
                    passport: '',
                    passport_file_path: '',

                    is_travel_foreign: 0,
                    travel_foreign_times: '',
                    is_travel_europe: 0,
                    travel_europe_times: '',
                    select_tags: [],
                    city: '',
                    industry: '',
                    income: '',
                    disposition: '',  //性格,沟通难易
                    company_name: '',
                    else_description: ''
                };

                $scope.travelForeignList = [{code: 1, name: '1~2次'}, {code: 2, name: '3~5次'}, {code: 3, name: '5次以上'}];
                $scope.travelEuropeList = [{code: 1, name: '1~2次'}, {code: 2, name: '3~5次'}, {code: 3, name: '5次以上'}];
                $scope.incomeList = [{code: 1, name: '500万以上'}, {code: 2, name: '100~500万'}, {code: 3, name: '50~100万'},
                    {code: 4, name: '0~50万'}];
                $scope.dispositionList = [{code: 1, name: '好说话'}, {code: 2, name: '难沟通'}, {code: 3, name: '不讲道理'}];

                zouke.resource.postAsync('/customer/getOtherInfo', {}).then(function (result) {
                    $scope.cityList = result.city_list;
                    $scope.jobList = result.job_list;
                    $scope.tags = result.tag_list;
                    triggerChosen();
                })


                /************************数据初始化 end***********************************/


                $scope.addContactPinyin = function () {
                    "use strict";

                    $scope.traveler.name_pinyin = pinyin($scope.traveler.name);
                    $scope.traveler.name_pinyin = $scope.traveler.name_pinyin.toString().replace(/,/, ' ');    //第一个','替换为空格
                    $scope.traveler.name_pinyin = $scope.traveler.name_pinyin.toString().replace(/,/g, '');    //后面','去掉
                    //首字母转化为大写
                    $scope.traveler.name_pinyin = $scope.traveler.name_pinyin.replace(/\b\w+\b/g, function (word) {
                        return word.substring(0, 1).toUpperCase() + word.substring(1);
                    });
                }

                $scope.tfCheck = function () {
                    $('#travel_foreign').trigger('chosen:updated');
                }

                $scope.teCheck = function () {
                    $('#travel_europe').trigger('chosen:updated');
                }

                //上传护照照片或者扫描件
                //电子签证---------------------------------
                function uploadPassportPic() {
                    if (document.querySelector('#passport_file_path').files.length > 0) {
                        MessageBox.loading('上传中');
                        zouke.net.uploadFileListAsync(document.querySelector('#passport_file_path').files).then(function (data) {
                            for (var i = 0; i < data.length; i++) {

                                if (data[i].src) {
                                    $scope.traveler.passport_file_path = data[i].src;
                                    //$scope.express.visa_file_path.push({
                                    //    url:data[i].src
                                    //});
                                    $scope.$apply();
                                }
                            }
                            MessageBox.showOnce('上传成功');
                            //console.log($scope.traveler);
                            $timeout(function () {
                                //有护照照片,上传服务器
                                Http.post('/customer/saveCustomer', {customer: $scope.traveler}, function (data) {
                                    //console.log(data);
                                    if (data.code == 0) {
                                        MessageBox.attention(data.msg,
                                            function () {
                                                if (data.customer_id) {
                                                    $scope.traveler.id = data.customer_id;
                                                }

                                                $scope.$emit('userDetail:ok', $scope.traveler);
                                                $scope.open = false;
                                            },
                                            null);

                                    } else {
                                        MessageBox.danger(data.msg);
                                    }
                                })
                            }, 100)
                            $scope.open = false;
                            document.querySelector('#passport_file_path').value = '';
                        })
                    } else {
                        //没有护照照片,上传服务器
                        //console.log($scope.traveler);
                        Http.post('/customer/saveCustomer', {customer: $scope.traveler}, function (data) {
                            //console.log(data);
                            if (data.code == 0) {
                                MessageBox.attention(data.msg,
                                    function () {
                                        if (data.customer_id) {
                                            $scope.traveler.id = data.customer_id;
                                        }

                                        $scope.$emit('userDetail:ok', $scope.traveler);
                                        $scope.open = false;
                                    },
                                    null);
                            } else {
                                MessageBox.danger(data.msg);
                            }
                        })
                        $scope.open = false;
                        //document.querySelector('#passport_file_path').value = '';
                    }

                }

                $scope.delPassportFilePath = function () {
                    $scope.traveler.passport_file_path = '';
                    document.querySelector('#passport_file_path').value = '';
                }

                function clearTraveler() {
                    for (let key in $scope.traveler) {
                        $scope.traveler[key] = '';
                        if (key == 'select_tags') {
                            $scope.traveler[key] = [];
                        }
                        if (key == 'id') {
                            $scope.traveler.id = 0;
                        }
                        if (key == 'is_traveler') {
                            $scope.traveler.is_traveler = 0;
                        }
                        if (key == 'is_contact') {
                            $scope.traveler.is_contact = 0;
                        }
                        if (key == 'is_custom') {
                            $scope.traveler.is_custom = 0;
                        }
                        if (key == 'is_frag') {
                            $scope.traveler.is_frag = 0;
                        }
                        if (key == 'is_travel_foreign') {
                            $scope.traveler.is_travel_foreign = 0;
                        }
                        if (key == 'is_travel_europe') {
                            $scope.traveler.is_travel_europe = 0;

                        }
                    }

                    triggerChosen();
                }

                function triggerChosen() {
                    $timeout(function () {
                        $('#travel_foreign').trigger('chosen:updated');
                        $('#travel_europe').trigger('chosen:updated');
                        $('#city').trigger('chosen:updated');
                        $('#industry').trigger('chosen:updated');
                        $('#income').trigger('chosen:updated');
                        $('#disposition').trigger('chosen:updated');
                    }, 50)
                }

                /************************监听事件并处理 start***********************************/
                    //选择完成后
                $scope.$onRootScope('userDetail:edit', (e, d)=> {
                    clearTraveler();
                    //console.log(d);
                    $scope.isCreate = false;
                    $scope.shouldDisable = false;
                    $scope.open = true;
                    Object.assign($scope.traveler, d || {});

                    triggerChosen();

                });
                //点击新建按钮
                $scope.$onRootScope('userDetail:create', (k, v)=> {
                    clearTraveler();

                    $scope.shouldDisable = false;
                    $scope.isCreate = true;
                    $scope.open = true;

                    triggerChosen();
                });
                $scope.$onRootScope('userDetail:view', (e, d)=> {
                    clearTraveler();

                    $scope.shouldDisable = true;
                    $scope.isCreate = false;
                    $scope.open = true;
                    Object.assign($scope.traveler, d || {});

                    triggerChosen();
                });


                /************************监听事件并处理 end***********************************/

                /************************按键处理 start***********************************/
                    //标签选择
                $scope.tagSpanClick = function (obj) {
                    //console.log(obj);
                    let index = $scope.traveler.select_tags.indexOf(obj.id);
                    if (index > -1) {
                        $scope.traveler.select_tags.splice(index, 1);
                    } else {
                        $scope.traveler.select_tags.push(obj.id);
                    }

                }

                //点击添加
                $scope.add = function () {  //点击添加后,id为0,提交服务器
                    if(!$scope.traveler.name){
                        MessageBox.showOnce('姓名为必填项!!');
                        return;
                    }
                    $scope.open = false;
                    uploadPassportPic();
                }
                //点击修改
                $scope.modify = function () {   //点击修改后,页面由不可编辑变为可编辑,修改后提交服务器
                    $scope.shouldDisable = false;
                    triggerChosen();
                }
                //点击确认
                $scope.confirm = function () {  //点击确认后,判断页面是否修改过,如果修改过,提交服务器,否则,直接关闭页面
                    if(!$scope.traveler.name){
                        MessageBox.showOnce('姓名为必填项!!');
                        return;
                    }
                    if ($scope.shouldDisable) {
                        $scope.$emit('userDetail:ok', $scope.traveler);
                        $scope.open = false;
                    } else {
                        uploadPassportPic();
                    }
                };
                //关闭窗口
                $scope.close = function () {
                    $scope.open = false;
                }
                /************************按键处理 end***********************************/
            }
        }
    })
    .directive("userInput", function (utils, $timeout) {
        utils.registerStyle(`

}`, 'user-input');
        return {
            restrict: 'E',
            scope: {
                contact: "=",
                receive: "=receiveMethod"
            }
            ,
            template: `<div class="form-group">
                                <label class="col-md-2 control-label no-padding-right"
                                       for="contact">
                                    联系人
                                </label>

                                <div class="col-md-8">
                                    <input type="text" class="col-md-6" placeholder="中文名" ng-blur="nameOnBlur()"
                                           ng-model="contact.contact_name" ng-change="addContactPinyin('contact_name')" required>
                                </div>
                                <div class="col-md-8 col-md-offset-2" style="margin-top:5px;">
                                    <input type="text" class="col-md-6" placeholder="拼音"
                                           ng-model="contact.contact_pinyin">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-2 control-label no-padding-right"
                                       for="contact_phone">
                                    联系电话
                                </label>

                                <div class="col-md-8">
                                    <input type="tel" class="col-md-6" ng-blur="mobileOnBlur()" placeholder=""
                                           ng-change="checkValue('contact_phone')"
                                           ng-model="contact.contact_phone" required
                                           pattern="(^[1][3,4,5,7,8][0-9]{9}$)|(^[0][0][0-9]*$)"
                                           >
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-2 control-label no-padding-right"
                                       for="contact_email" >
                                    联系邮箱
                                </label>

                                <div class="col-md-8">
                                    <input type="email" class="col-md-6" ng-blur="emailOnBlur()"  placeholder=""
                                           ng-change="checkValue('contact_email')"
                                           ng-model="contact.contact_email" required>
                                </div>
                            </div>
                            <div class="form-group" ng-show="(receive == 1)">
                                <label class="col-md-2 control-label no-padding-right"
                                       for="contact_address">
                                    联系地址
                                </label>

                                <div class="col-md-10">
                                    <input type="text" id="contact_address" class="col-md-10"
                                           placeholder="" ng-required="(receive == 1)"
                                           ng-model="contact.contact_address"/>
                                </div>
                            </div>`,

            controller: function ($scope) {
                $scope.oldMap = {
                    name: '',
                    phone: '',
                    email: ''
                }
                function checkContact() {
                    if (!$scope.contact.contact_id) {
                        return true;
                    }
                    if ($scope.contact.contact_name != $scope.oldMap.name && ( $scope.contact.contact_phone != $scope.oldMap.phone || $scope.contact.contact_email != $scope.oldMap.email )) {
                        return false;
                    }
                    return true;
                }

                $scope.$watch('contact.contact_id', function (newValue, oldValue) {
                    console.log('id Change');
                    $scope.oldMap.name = $scope.contact.contact_name;
                    $scope.oldMap.phone = $scope.contact.contact_phone;
                    $scope.oldMap.email = $scope.contact.contact_email;
                })

                $scope.nameOnBlur = function () {
                    console.log('nameOnBlur');
                    if (!checkContact()) {
                        MessageBox.warning('是否更换联系人?', function () {
                            $scope.contact.contact_id = 0;
                        })
                    }
                }

                $scope.mobileOnBlur = function () {
                    console.log('mobileOnBlur');
                    if ($scope.contact.contact_phone && ($scope.contact.contact_phone != $scope.oldMap.phone || $scope.oldMap.phone == '')) {
                        $scope.$emit('userSelect:list', {name: $scope.contact.contact_phone, desc: 1});
                    }
                    if (!checkContact()) {
                        MessageBox.warning('是否更换联系人?', function () {
                            $scope.contact.contact_id = 0;
                        })
                    }
                }
                $scope.emailOnBlur = function () {
                    console.log('emailOnBlur');
                    if ($scope.contact.contact_email && ($scope.contact.contact_email != $scope.oldMap.email || $scope.oldMap.email == '')) {
                        $scope.$emit('userSelect:list', {name: $scope.contact.contact_email, desc: 1});
                    }
                    if (!checkContact()) {
                        MessageBox.warning('是否更换联系人?', function () {
                            $scope.contact.contact_id = 0;
                        })

                    }
                }

                $scope.$onRootScope('userSelect:ok', (e, d)=> {
                    console.log(d); //d 为获取到的用户信息集合
                    if (d) {
                        $scope.contact.contact_id = d.id;
                        $scope.contact.contact_name = d.name;
                        $scope.addContactPinyin();
                        $scope.contact.contact_phone = d.mobile;
                        $scope.contact.contact_email = d.email;
                        $scope.contact.contact_address = d.address;
                    }
                    if (!$scope.$root.$$phase) {
                        //$digest or $apply
                        $scope.$apply();
                    }
                });

                $scope.addContactPinyin = function () {
                    $scope.contact.contact_pinyin = pinyin($scope.contact.contact_name);
                    $scope.contact.contact_pinyin = $scope.contact.contact_pinyin.toString().replace(/,/, ' ');    //第一个','替换为空格
                    $scope.contact.contact_pinyin = $scope.contact.contact_pinyin.toString().replace(/,/g, '');    //后面','去掉
                    //首字母转化为大写
                    $scope.contact.contact_pinyin = $scope.contact.contact_pinyin.replace(/\b\w+\b/g, function (word) {
                        return word.substring(0, 1).toUpperCase() + word.substring(1);
                    });
                }
            }
        }
    })


    .directive('userCheck', function ($parse, $timeout) {
        return {
            restrict: 'A',
            link: function ($scope, element, attr) {
                function trigger(type) {
                    $parse(attr[type])($scope);
                }

                $scope.oldMap = {}
                function checkSameContact() {
                    if (!$scope.oldMap.name) {
                        return true;
                    }
                    if ($scope.inputs.name.value != $scope.oldMap.name && ( $scope.inputs.phone.value != $scope.oldMap.mobile || $scope.inputs.email.value != $scope.oldMap.email )) {
                        return false;
                    }
                    return true;
                }

                //如果是name 和 phone或者email 改了之后，弹出框判断是否更改用户

                $scope.inputs.name.on('blur', function (e) {
                    console.log(e.target.value);
                    if (!checkSameContact()) {
                        MessageBox.warning('是否更换联系人?', function () {
                            trigger('changeContact');
                        })
                    }
                })

                $scope.inputs.phone.on('blur', function (e) {

                    if (e.target.validity.valid) {
                        zouke.resource.postAsync('/customer/GetCustomerList', {content: e.target.value}).then(function (data) {
                            console.log(data);
                            if (data.list.length > 0) {
                                if (data.list.length > 0) {
                                    if (data.list.length > 1 ||( (data.list.length == 1) && (data.list[0].mobile != $scope.oldMap.mobile))) {
                                        trigger('checkSamePhone');
                                    } else {
                                        if (!checkSameContact()) {
                                            MessageBox.warning('是否更换联系人?', function () {
                                                trigger('changeContact');
                                            })
                                        }
                                    }
                                }
                            }
                        })
                    }

                })

                $scope.inputs.email.on('blur', function (e) {

                    //先判断下是否符合格式
                    if (e.target.validity.valid) {
                        console.log(e.target.value);
                        //进行查询,若有值，把选择框弹出
                        zouke.resource.postAsync('/customer/GetCustomerList', {content: e.target.value}).then(function (data) {
                            console.log(data);
                            if (data.list.length > 0) {
                                //若和当前保存的相同则不去trigger
                                if (data.list.length > 1 || ((data.list.length == 1) && (data.list[0].email != $scope.oldMap.email))) {
                                    trigger('checkSameEmail');
                                } else {
                                    if (!checkSameContact()) {
                                        MessageBox.warning('是否更换联系人?', function () {
                                            console.log('new contact');
                                            trigger('changeContact');
                                        })
                                    }
                                }
                            }
                        })
                    }

                })

                $scope.$onRootScope('userCheck:clear', (e, d)=> {
                    $timeout(function () {
                        $scope.oldMap.name = $scope.inputs.name.value;
                        $scope.oldMap.mobile = $scope.inputs.phone.value;
                        $scope.oldMap.email = $scope.inputs.email.value;
                    }, 100);

                });

                $scope.$onRootScope('userCheck:checkNewUser', (e, d)=> {
                    $timeout(function () {
                        if (!checkSameContact()) {
                            MessageBox.warning('是否更换联系人?', function () {
                                console.log('new contact');
                                trigger('changeContact');
                            })
                        }
                    },200)

                });
            },

            controller: function ($scope) {
                $scope.inputs = {
                    phone: null,
                    name: null,
                    email: null
                }
                this.registerPhone = function (input) {
                    "use strict";
                    $scope.inputs.phone = input;
                }
                this.registerName = function (input) {
                    "use strict";
                    $scope.inputs.name = input;
                }
                this.registerEmail = function (input) {
                    "use strict";
                    $scope.inputs.email = input;
                }
            }
        }
    })
    .directive('nameCheck', function () {
        return {
            restrict: 'A',
            require: '^userCheck',
            link: function ($scope, element, attr, ctrl) {
                ctrl.registerName(element[0]);
            }
        }
    })
    .directive('phoneCheck', function () {
        return {
            restrict: 'A',
            require: '^userCheck',
            link: function ($scope, element, attr, ctrl) {
                ctrl.registerPhone(element[0]);
                //element.on('blur',function(){
                //    console.log(element.val());
                //    console.log('check phone');
                //    $scope.phoneAction();
                //})

            }
        }
    })
    .directive('emailCheck', function () {
        return {
            restrict: 'A',
            require: '^userCheck',
            link: function ($scope, element, attr, ctrl) {
                ctrl.registerEmail(element[0]);
            }
        }
    })

angular.module('common', ['common.config', 'common.utils', 'common.directive']);