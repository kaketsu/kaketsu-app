'use strict';

/**
 * Created by wangkehan on 15/12/9.
 */

var Http = {
    /**
     * _url,ajax请求的url
     * _data,json数据
     * _pfun,回调函数
     */

    post: function post(_url, _data, _pfun, _async) {
        if (!arguments[2]) _pfun = function _pfun() {};
        if (undefined == _async) _async = true;
        $.ajax({
            type: 'POST',
            async: _async,
            url: _url,
            data: _data,
            datatype: 'json',
            beforeSend: function beforeSend(request) {
                //request.setRequestHeader("req-type", "jouker-ajax");
            },
            success: function success(data) {
                // code 一定为数字，0是正常 ，大于0为业务处理，小于0为公共处理
                if (0 > data.code) {
                    alert(data.msg);
                    return;
                }
                _pfun(data);
            },
            error: function error(data) {
                alert('对不起，服务器报文格式错误，请截图联系管理员！');
            }
        });
        return true;
    },
    uploadFile: function uploadFile(key, token, file, callback) {
        var formdata = new FormData();
        formdata.append("key", key);
        formdata.append("token", token);
        formdata.append('file', file);

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://upload.qiniu.com/");
        //xhr.setRequestHeader("content-type","multipart/form-data");

        xhr.timeout = 10000;

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {

                if (this.status === 0) {
                    //跨域无权限
                    //同时会触发error事件
                } else {
                        if (this.status === 200) {
                            //成功

                            callback && callback(JSON.parse(xhr.responseText));

                            //successResponseDataFilter(ajaxObj, this.getResponseHeader("content-type"), this.responseXML, this.responseText);
                        } else {
                                //ajaxObj.dispatchEvent({ type: Ajax.Event.ERROR, xhr: this, status: this.status, statusText: this.statusText, errorType: Ajax.ErrorType.STATUSERROR });
                            }
                    }
            }
        };
        xhr.onerror = function () {};
        xhr.ontimeout = function () {};

        xhr.send(formdata);
    }
};

var TableWidget = {
    tableOperation: function tableOperation(data, type, full) {
        return '<div class="action-buttons">\n\t\t\t\t\t<a class="blue" href="#">\n\t\t\t\t\t\t<i class="ace-icon fa fa-search-plus bigger-130"></i>\n\t\t\t\t\t</a>\n\t\t\t\t\t<a class="green" href="#">\n\t\t\t\t\t\t<i class="ace-icon fa fa-pencil bigger-130"></i>\n\t\t\t\t\t</a>\n\t\t\t\t\t<a class="red" href="#">\n\t\t\t\t\t\t<i class="ace-icon fa fa-trash-o bigger-130"></i>\n\t\t\t\t\t</a>\n\t\t\t\t</div>';
    },
    tableOperation2: function tableOperation(data, type, full) {
        return '<div class="action-buttons">\n\t\t\t\t\t<a class="blue" href="#">\n\t\t\t\t\t\t<i class="ace-icon fa fa-search-plus bigger-130"></i>\n\t\t\t\t\t</a>\n\t\t\t\t</div>';
    },
    tableUrl: function tableUrl(data, type, full) {
        if (data && 'http' == data.substring(0, 4)) return '<a href="' + data + '" target="_blank">' + data + '</a>';
        return data;
    },
    tableUrl2: function tableUrl2(data, type, full) {
        var html = '';
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = Object.entries(data)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var _step$value = babelHelpers.slicedToArray(_step.value, 2);

                var key = _step$value[0];
                var value = _step$value[1];

                html += '<a target="_blank" href="' + value + '">' + key + '</a>,';
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        return html.substr(0, html.length - 1);
    },
    tableClone: function tableClone() {
        return '<div class="action-buttons ">\n\t\t\t\t\t<a class="edit green" href="#">\n\t\t\t\t\t\t<i class="ace-icon fa fa-pencil bigger-130"></i>编辑\n\t\t\t\t\t</a>\n\t\t\t\t\t<a class="red" href="#">\n\t\t\t\t\t\t<i class="ace-icon fa fa-trash-o bigger-130"></i>删除\n\t\t\t\t\t</a>\n\t\t\t\t</div>';
    },
    tableCrawl: function tableCrawl(data, type, row) {
        //var  table = $('#crawl').DataTable();
        //console.log( table.cell( this ).index().row);
        if (row[2] != 1) {
            return '<div class="action-buttons">\n\t\t\t\t\t<a class="edit green" href="#">\n\t\t\t\t\t\t<i class="ace-icon fa fa-pencil bigger-130"></i>\n\t\t\t\t\t\t<!--编辑-->\n\t\t\t\t\t</a>\n\t\t\t\t\t</div>';
        } else {
            return '<div class="action-buttons">\n\t\t\t\t\t<a class="edit green" href="#" title="编辑">\n\t\t\t\t\t\t<i class="ace-icon fa fa-pencil bigger-130"></i>\n\t\t\t\t\t\t<!--编辑-->\n\t\t\t\t\t</a>\n\t\t\t\t\t<a class="crawl" href="#" title="抓取">\n\t\t\t\t\t\t<i class="ace-icon fa fa-hand-grab-o bigger-130"></i>\n\t\t\t\t\t\t<!--抓取-->\n\t\t\t\t\t</a>\n\t\t\t\t\t<a class="red" href="#" title="删除">\n\t\t\t\t\t\t<i class="ace-icon fa fa-trash-o bigger-130"></i>\n\t\t\t\t\t\t<!--删除-->\n\t\t\t\t\t</a>\n\t\t\t\t</div>';
        }
    },
    tablePending: function tablePending() {
        return '<div class="action-buttons">\n\t\t\t\t\t<a class="edit green"  href="#"  title="编辑">\n\t\t\t\t\t\t<i class="ace-icon fa fa-pencil bigger-130"></i>\n\t\t\t\t\t</a>\n\t\t\t\t\t<a class="clone" href="#" title=\'克隆\'>\n\t\t\t\t\t\t<i class="ace-icon fa fa-copy bigger-130"></i>\n\t\t\t\t\t\t<!--克隆-->\n\t\t\t\t\t</a>\n\t\t\t\t\t<a class="red" href="#" title="删除">\n\t\t\t\t\t\t<i class="ace-icon fa fa-trash-o bigger-130"></i>\n\t\t\t\t\t\t<!--删除-->\n\t\t\t\t\t</a>\n\t\t\t\t</div>';
    },
    tableUpdate: function tableUpdate() {
        return '<div class="action-buttons">\n\t\t\t\t\t<a class="edit green" href="#" title="编辑">\n\t\t\t\t\t\t<i class="ace-icon fa  fa-pencil bigger-130"></i>\n\t\t\t\t\t\t<!--编辑-->\n\t\t\t\t\t</a>\n\t\t\t\t</div>';
    },
    tableOnline: function tableOnline() {
        return '<div class="action-buttons">\n\t\t\t\t\t<a class="view blue" href="#"  title="查看">\n\t\t\t\t\t\t<i class="ace-icon fa fa-search-plus bigger-130"></i>\n\t\t\t\t\t\t<!--查看-->\n\t\t\t\t\t</a>\n\t\t\t\t\t<a class="edit green" href="#"  title="编辑">\n\t\t\t\t\t\t<i class="ace-icon fa fa-pencil bigger-130"></i>\n\t\t\t\t\t\t<!--编辑-->\n\t\t\t\t\t</a>\n\t\t\t\t\t<a class="clone" href="#"  title="克隆">\n\t\t\t\t\t\t<i class="ace-icon fa fa-copy bigger-130"></i>\n\t\t\t\t\t\t<!--克隆-->\n\t\t\t\t\t</a>\n\t\t\t\t</div>';
    },
    tableOffline: function tableOffline() {
        return '<div class="action-buttons ">\n\n\t\t\t\t\t<a class="edit green" href="#" title="编辑">\n\t\t\t\t\t\t<i class="ace-icon fa  fa-pencil bigger-130"></i>\n\t\t\t\t\t\t<!--编辑-->\n\t\t\t\t\t</a>\n\t\t\t\t\t<a class="clone" href="#" title="克隆">\n\t\t\t\t\t\t<i class="ace-icon fa fa-copy bigger-130"></i>\n\t\t\t\t\t\t<!--克隆-->\n\t\t\t\t\t</a>\n\t\t\t\t</div>';
    },

    orderTableAll: function orderTableAll() {
        return '<div class="action-buttons ">\n\t\t\t\t\t<a class="view blue" href="#">\n\t\t\t\t\t\t<i class="ace-icon fa fa-search-plus bigger-130"></i>\n\t\t\t\t\t\t<!--查看-->\n\t\t\t\t\t</a>\n\t\t\t\t</div>';
    },
    orderTablePending: function orderTablePending() {
        return '<div class="action-buttons ">\n\t\t\t\t\t<a class="view blue" href="#">\n\t\t\t\t\t\t<i class="ace-icon fa fa-search-plus bigger-130"></i>\n\t\t\t\t\t\t<!--查看-->\n\t\t\t\t\t</a>\n\t\t\t\t\t<a class="pending green" href="#">\n\t\t\t\t\t    <i class="ace-icon fa fa-pencil bigger-130"></i>\n\t\t\t\t\t\t<!--<i class="ace-icon fa fa-gavel bigger-130"></i>确认-->\n\t\t\t\t\t</a>\n\t\t\t\t</div>';
    },
    orderTableError: function orderTableError() {
        return '<div class="action-buttons ">\n\t\t\t\t\t<a class="view blue" href="#">\n\t\t\t\t\t\t<i class="ace-icon fa fa-search-plus bigger-130"></i>\n\t\t\t\t\t\t<!--查看-->\n\t\t\t\t\t</a>\n\t\t\t\t\t<a class="error red" href="#">\n\t\t\t\t\t    <i class="ace-icon fa fa-pencil bigger-130"></i>\n\t\t\t\t\t\t<!--<i class="ace-icon fa fa-fire-extinguisher bigger-130"></i>-->\n\t\t\t\t\t\t<!--错误处理-->\n\t\t\t\t\t</a>\n\t\t\t\t</div>';
    },
    orderTableSending: function orderTableSending() {
        return '<div class="action-buttons ">\n\t\t\t\t\t<a class="view blue" href="#">\n\t\t\t\t\t\t<i class="ace-icon fa fa-search-plus bigger-130"></i>\n\t\t\t\t\t\t<!--查看-->\n\t\t\t\t\t</a>\n\t\t\t\t\t<a class="sending green" href="#">\n\t\t\t\t\t    <i class="ace-icon fa fa-pencil bigger-130"></i>\n\t\t\t\t\t\t<!--<i class="ace-icon fa fa-car bigger-130"></i>发货-->\n\t\t\t\t\t</a>\n\t\t\t\t</div>';
    },
    orderTableDone: function orderTableDone() {
        return '<div class="action-buttons ">\n\t\t\t\t\t<a class="view blue" href="#">\n\t\t\t\t\t\t<i class="ace-icon fa fa-search-plus bigger-130"></i>\n\t\t\t\t\t\t<!--查看-->\n\t\t\t\t\t</a>\n\t\t\t\t\t<a class="done green" href="#">\n\t\t\t\t\t\t<i class="ace-icon fa fa-pencil bigger-130"></i>\n\t\t\t\t\t\t<!--编辑-->\n\t\t\t\t\t</a>\n\t\t\t\t</div>';
    },
    orderTableRefunding: function orderTableRefunding() {
        return '<div class="action-buttons ">\n\t\t\t\t\t<a class="view blue" href="#">\n\t\t\t\t\t\t<i class="ace-icon fa fa-search-plus bigger-130"></i>\n\t\t\t\t\t\t<!--查看-->\n\t\t\t\t\t</a>\n\t\t\t\t\t<a class="refunding green" href="#">\n\t\t\t\t\t    <i class="ace-icon fa fa-pencil bigger-130"></i>\n\t\t\t\t\t\t<!--<i class="ace-icon fa fa-eraser bigger-130"></i>-->\n\t\t\t\t\t\t<!--退款-->\n\t\t\t\t\t</a>\n\t\t\t\t</div>';
    },
    orderTableRefunded: function orderTableRefunded() {
        return '<div class="action-buttons ">\n\t\t\t\t\t<a class="refunded green" href="#">\n\t\t\t\t\t    <i class="ace-icon fa fa-search-plus bigger-130"></i>\n\t\t\t\t\t\t<!--<i class="ace-icon fa fa-bank bigger-130"></i>-->\n\t\t\t\t\t\t<!--查看退款-->\n\t\t\t\t\t</a>\n\t\t\t\t</div>';
    }

};

/*-wangkehan-*/

var zouke = {};

(function () {
    var query = null;
    Object.defineProperty(zouke, 'args', {
        get: function get() {
            if (!query) {
                query = {};
                if (location.search != '') {
                    var parts = location.search.substr(1).split('&');
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = parts[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var p = _step2.value;

                            if (p.includes('=')) {
                                var _p$split = p.split('=');

                                var _p$split2 = babelHelpers.toArray(_p$split);

                                var key = _p$split2[0];

                                var value = _p$split2.slice(1);

                                query[key] = decodeURIComponent(value.join('='));
                            } else {
                                query[p] = '';
                            }
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }
                }
            }
            return query;
        }
    });
})();

(function () {
    zouke.table = {
        getRender: function getRender(buttons) {
            return function (data, type, rowData, meta) {
                if (type === 'display') {
                    var btn = '';

                    var _iteratorNormalCompletion3 = true;
                    var _didIteratorError3 = false;
                    var _iteratorError3 = undefined;

                    try {
                        for (var _iterator3 = (Array.isArray(buttons) ? buttons : buttons(data, type, rowData, meta))[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                            var _step3$value = _step3.value;
                            var name = _step3$value.name;
                            var cls = _step3$value.cls;

                            btn += '\n    <a data-row="' + meta.row + '" data-id="' + rowData[0] + '" class="' + cls + '" href="#" title="' + name + '">\n    </a>';
                        }
                    } catch (err) {
                        _didIteratorError3 = true;
                        _iteratorError3 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                _iterator3.return();
                            }
                        } finally {
                            if (_didIteratorError3) {
                                throw _iteratorError3;
                            }
                        }
                    }

                    return '<div class="action-buttons ">' + btn + '</div>';
                }
                return null;
            };
        },

        defaultButtons: {
            get view() {
                return {
                    name: '查看',
                    cls: 'view blue ace-icon fa fa-search-plus bigger-130'
                };
            },
            get edit() {
                return {
                    name: '编辑',
                    cls: 'edit green ace-icon fa fa-pencil bigger-130'
                };
            },
            get clone() {
                return {
                    name: '克隆',
                    cls: 'clone ace-icon fa fa-copy bigger-130'
                };
            },
            get remove() {
                return {
                    name: '删除',
                    cls: 'remove red act-icon fa fa-times bigger-130'
                };
            },
            get undo() {
                return {
                    name: '恢复',
                    cls: 'undo ace-icon fa fa-undo bigger-130'
                };
            },
            get debit() {
                return {
                    name: '催款',
                    cls: 'debit ace-icon fa fa-money bigger-130'
                };
            },
            get book() {
                return {
                    name: '预订',
                    cls: 'book ace-icon fa fa-money bigger-130'
                };
            },
            get exp() {
                return {
                    name: '导出',
                    cls: 'exp ace-icon fa fa-sign-out bigger-130'
                };
            }
        },
        selector: function selector(container) {
            return {
                getDom: function getDom(name) {
                    if (!this[name]) {
                        this[name] = container.$('#' + name + ' table');
                    }
                    return this[name];
                },
                get$: function get$(name) {
                    var cacheName = '$' + name;
                    if (!this[cacheName]) {
                        this[cacheName] = $(this.getDom(name));
                    }
                    return this[cacheName];
                }
            };
        }
    };
})();

(function () {
    Document.prototype.$ = Document.prototype.querySelector;
    Document.prototype.$a = Document.prototype.querySelectorAll;
    Element.prototype.$ = Element.prototype.querySelector;
    Element.prototype.$a = Element.prototype.querySelectorAll;
    Node.prototype.on = Node.prototype.addEventListener;
    Node.prototype.off = Node.prototype.removeEventListener;
    Window.prototype.on = Window.prototype.addEventListener;
    Window.prototype.off = Window.prototype.removeEventListener;

    var eventNotPropagation = { focus: true, blur: true, mouseenter: true, mouseleave: true, load: true, readystatechange: true, error: true, input: true, propertychange: true }; //不进行事件传播的事件类型
    Node.prototype.trigger = function (type, data) {
        var e = type instanceof Event ? type : document.createDispatchEvent(type.toString());
        if (data) {
            event.data = data;
        }
        this.dispatchEvent(e);
    };
    document.createDispatchEvent = function ( /*string*/type) {
        var option = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        /*
        * eventType:HTMLEvents/UIEvents/MouseEvents
        * */
        option.bubbles = "bubbles" in option ? option.bubbles : !!eventNotPropagation[type];
        var eventType = option.eventType || 'HTMLEvents';

        var e = document.createEvent(eventType);
        switch (eventType) {
            case 'UIEvents':
                e.initUIEvent(type, option.bubbles, true, option.windowObject || window, option.detail || 0);
                break;
            case 'MouseEvents':
                e.initMouseEvent(type, option.bubbles, true, option.windowObject || window, option.detail || 0, option.screenX || 0, option.screenY || 0, option.clientX || 0, option.clientY || 0, option.ctrlKey || false, option.altKey || false, option.shiftKey || false, option.metaKey || false, option.button || 0, option.relatedTarget || null);
                break;
            default:
                //'HTMLEvents' or other
                e.initEvent(type, option.bubbles, true);
                break;
        }
        return e;
    };

    function formUrlEncode(obj, prefix) {
        if (Array.isArray(obj) && obj.length === 0) {
            return '';
        }
        var urlComponents = [];
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
            for (var _iterator4 = Object.entries(obj)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var _step4$value = babelHelpers.slicedToArray(_step4.value, 2);

                var key = _step4$value[0];
                var value = _step4$value[1];

                var urlKey = prefix ? prefix + '[' + key + ']' : key.toString();
                if (value == null) value = '';
                if ((typeof value === 'undefined' ? 'undefined' : babelHelpers.typeof(value)) === 'object') {
                    var ov = formUrlEncode(value, urlKey);
                    if (ov !== '') {
                        urlComponents.push(ov);
                    }
                } else {
                    urlComponents.push(encodeURIComponent(urlKey) + '=' + encodeURIComponent(value));
                }
            }
        } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                    _iterator4.return();
                }
            } finally {
                if (_didIteratorError4) {
                    throw _iteratorError4;
                }
            }
        }

        return urlComponents.join('&');
    }

    function uploadFileToQNAsync(token, file, key) {
        var formdata = new FormData();
        formdata.append("key", key);
        formdata.append("token", token);
        formdata.append('file', file);

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://upload.qiniu.com/");
        //xhr.setRequestHeader("content-type","multipart/form-data");

        xhr.timeout = 10000;

        var promise = new Promise(function (r, j) {
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {

                    if (this.status === 0) {
                        //跨域无权限
                        //同时会触发error事件
                    } else {
                            if (this.status === 200) {
                                //成功

                                r(JSON.parse(this.responseText));
                            } else {
                                j(this.status);
                            }
                        }
                }
            };
            xhr.onerror = function () {
                j();
            };
            xhr.ontimeout = function () {
                j("timeout");
            };
        });

        xhr.send(formdata);
        return promise;
    }

    var uploadFileWithSaveBaseInfoAsync = function () {
        var ref = babelHelpers.asyncToGenerator(regeneratorRuntime.mark(function _callee(token, cdn, file, name, pkey) {
            var result, src, baseInfo, info;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return uploadFileToQNAsync(token, file, name);

                        case 2:
                            result = _context.sent;
                            src = encodeURI(cdn + result.key);
                            _context.next = 6;
                            return zouke.resource.getImageInfoAsync(src);

                        case 6:
                            baseInfo = _context.sent;
                            info = {
                                pkey: pkey,
                                type: 'f',
                                name: file.name,
                                width: baseInfo.width,
                                height: baseInfo.height,
                                size: (file.size / 1024).toFixed(2),
                                src: src
                            };
                            _context.next = 10;
                            return zouke.resource.postAsync('/file/createfile', info);

                        case 10:
                            info.key = _context.sent.key;

                            delete info.pkey;

                            return _context.abrupt('return', info);

                        case 13:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));
        return function uploadFileWithSaveBaseInfoAsync(_x2, _x3, _x4, _x5, _x6) {
            return ref.apply(this, arguments);
        };
    }();

    Object.assign(window.zouke, {
        net: {
            fetchAsync: function fetchAsync(url) {
                var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

                var _ref$headers = _ref.headers;
                var headers = _ref$headers === undefined ? {} : _ref$headers;
                var _ref$data = _ref.data;
                var data = _ref$data === undefined ? {} : _ref$data;

                var method = 'POST';

                Object.assign(headers, {
                    "X-Requested-With": "XMLHttpRequest",
                    "credentials": 'same-origin',
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                });

                return window.fetch(url, {
                    method: method,
                    headers: headers,
                    body: formUrlEncode(data)
                });
            },
            uploadFileAsync: function uploadFileAsync(file) {
                var _this = this;

                var pkey = arguments.length <= 1 || arguments[1] === undefined ? '50000' : arguments[1];
                return babelHelpers.asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
                    var _ref2, token, cdn;

                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    _context2.next = 2;
                                    return zouke.resource.postAsync('/utils/getToken2');

                                case 2:
                                    _ref2 = _context2.sent;
                                    token = _ref2.token;
                                    cdn = _ref2.cdn;
                                    _context2.next = 7;
                                    return uploadFileWithSaveBaseInfoAsync(token, cdn, file, 'library/' + pkey + '/' + new Date().valueOf() + '_' + Math.round(Math.random() * 10000) + '_' + escape(file.name).replace(/-/g, '%2d'), pkey);

                                case 7:
                                    return _context2.abrupt('return', _context2.sent);

                                case 8:
                                case 'end':
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, _this);
                }))();
            },
            uploadFileListAsync: function uploadFileListAsync(files) {
                var _this2 = this;

                var pkey = arguments.length <= 1 || arguments[1] === undefined ? '50000' : arguments[1];
                return babelHelpers.asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
                    var _ref3, token, cdn, timestrip, r, i;

                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                        while (1) {
                            switch (_context3.prev = _context3.next) {
                                case 0:
                                    _context3.next = 2;
                                    return zouke.resource.postAsync('/utils/getToken2');

                                case 2:
                                    _ref3 = _context3.sent;
                                    token = _ref3.token;
                                    cdn = _ref3.cdn;
                                    timestrip = new Date().valueOf();
                                    r = [];
                                    i = 0;

                                case 8:
                                    if (!(i < files.length)) {
                                        _context3.next = 17;
                                        break;
                                    }

                                    _context3.t0 = r;
                                    _context3.next = 12;
                                    return uploadFileWithSaveBaseInfoAsync(token, cdn, files[i], 'library/' + pkey + '/' + timestrip + '_' + Math.round(Math.random() * 10000) + '_' + escape(files[i].name).replace(/-/g, '%2d'), pkey).catch(function () {
                                        return {};
                                    });

                                case 12:
                                    _context3.t1 = _context3.sent;

                                    _context3.t0.push.call(_context3.t0, _context3.t1);

                                case 14:
                                    ++i;
                                    _context3.next = 8;
                                    break;

                                case 17:
                                    return _context3.abrupt('return', r);

                                case 18:
                                case 'end':
                                    return _context3.stop();
                            }
                        }
                    }, _callee3, _this2);
                }))();
            }
        },
        resource: {
            postAsync: function postAsync(url, data) {
                var _this3 = this;

                return babelHelpers.asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
                    var response, json;
                    return regeneratorRuntime.wrap(function _callee4$(_context4) {
                        while (1) {
                            switch (_context4.prev = _context4.next) {
                                case 0:
                                    _context4.next = 2;
                                    return window.zouke.net.fetchAsync(url, { data: data });

                                case 2:
                                    response = _context4.sent;
                                    _context4.next = 5;
                                    return response.json();

                                case 5:
                                    json = _context4.sent;

                                    if (!(json.code < 0)) {
                                        _context4.next = 9;
                                        break;
                                    }

                                    alert(json.msg);
                                    throw json.code;

                                case 9:
                                    return _context4.abrupt('return', json);

                                case 10:
                                case 'end':
                                    return _context4.stop();
                            }
                        }
                    }, _callee4, _this3);
                }))();
            },
            getImageInfoAsync: function getImageInfoAsync(url) {
                var _this4 = this;

                return babelHelpers.asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
                    var json;
                    return regeneratorRuntime.wrap(function _callee5$(_context5) {
                        while (1) {
                            switch (_context5.prev = _context5.next) {
                                case 0:
                                    _context5.next = 2;
                                    return window.fetch(url + '?imageInfo');

                                case 2:
                                    _context5.next = 4;
                                    return _context5.sent.json();

                                case 4:
                                    json = _context5.sent;

                                    if (!json.code) {
                                        _context5.next = 7;
                                        break;
                                    }

                                    throw json.error;

                                case 7:
                                    return _context5.abrupt('return', json);

                                case 8:
                                case 'end':
                                    return _context5.stop();
                            }
                        }
                    }, _callee5, _this4);
                }))();
            }
        },
        $: function $(cssSelect) {
            var node = arguments.length <= 1 || arguments[1] === undefined ? document : arguments[1];

            return node.querySelector(cssSelect);
        },
        $a: function $a(cssSelect) {
            var node = arguments.length <= 1 || arguments[1] === undefined ? document : arguments[1];

            return node.querySelectorAll(cssSelect);
        }
    });
})();

(function () {
    var i = new Image();
    i.src = "http://www.ouutrip.com/assets/img/favicon.ico";
    i.style.opacity = 0;
    i.style.position = "absolute";
    i.style.top = "0";
    i.style.pointerEvents = "none";

    document.on('DOMContentLoaded', function () {
        document.body.appendChild(i);
    });

    var eventHandle = {
        handleEvent: function handleEvent(e) {
            switch (e.type) {
                case "dragstart":
                    this.dragstart(e);
                    break;
                case 'drag':
                    this.drag(e);
                    break;
            }
        },
        dragstart: function dragstart(e) {
            if (e.target !== e.currentTarget) return;
            if (!e.target.querySelector(e.target.dataset.dragHandle).contains(document.elementFromPoint(e.clientX, e.clientY))) {
                e.preventDefault();
            }
            this.x = e.screenX;
            this.y = e.screenY;
            e.dataTransfer.setDragImage(i, 0, 0);
        },
        drag: function drag(e) {
            if (e.target !== e.currentTarget) return;
            if (e.clientX === 0 && e.clientY === 0 && e.screenX === 0 && e.screenY === 0) {
                //chrome bug
                return;
            }

            var mx = e.screenX - this.x;
            var my = e.screenY - this.y;
            if (mx === 0 && my === 0) {
                return;
            }

            this.x = e.screenX;
            this.y = e.screenY;
            var nx = parseInt(e.target.dataset.dragX, 10) + mx;
            var ny = parseInt(e.target.dataset.dragY, 10) + my;
            e.target.style.transform = 'translate(' + nx + 'px,' + ny + 'px)';
            e.target.style.webkitTransform = 'translate(' + nx + 'px,' + ny + 'px)';
            e.target.dataset.dragX = nx;
            e.target.dataset.dragY = ny;
        }
    };

    zouke.draggable = function (ele, handle) {
        ele.draggable = true;
        ele.dataset.dragHandle = handle;
        ele.dataset.dragX = 0;
        ele.dataset.dragY = 0;
        ele.addEventListener('dragstart', eventHandle);
        ele.addEventListener('drag', eventHandle);
    };
})();

(function () {
    var pri = new WeakMap();

    var Item = function () {
        function Item() {
            babelHelpers.classCallCheck(this, Item);

            var itemDom = document.createElement('div');
            itemDom.classList.add('item');
            itemDom.draggable = true;
            itemDom.tabIndex = '1';
            itemDom.innerHTML = '\n<div class="img"></div>\n<div class="name">\n    <span></span>\n    <input style="display:none;"/>\n</div>';
            var img = itemDom.querySelector('.img');
            var name = itemDom.querySelector('.name>span');
            var rename = itemDom.querySelector('.name>input');

            pri.set(this, { itemDom: itemDom, img: img, name: name, rename: rename });
        }

        babelHelpers.createClass(Item, [{
            key: 'render',
            value: function render() {
                var info = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

                /*
                 * {
                 * key:
                 * type:
                 * name:
                 * width:
                 * height:
                 * size:
                 * src:
                 * }
                 * */
                var v = pri.get(this);
                v.info = info;

                var itemDom = v.itemDom;
                var img = v.img;
                var name = v.name;
                var rename = v.rename;

                if (info) {
                    var url = info.type === 'f' ? info.src : 'http://7jpru6.com1.z0.glb.clouddn.com/Folder%20blue.png';
                    itemDom.style.display = '';
                    itemDom.dataset.key = info.key;
                    img.style.backgroundImage = 'url(' + url + ')';
                    name.innerText = rename.value = info.name;
                } else {
                    itemDom.style.display = 'none';
                    itemDom.dataset.key = '';
                    img.style.backgroundImage = '';
                    name.innerText = rename.value = '';
                }
            }
        }, {
            key: 'deleteAsync',
            value: function deleteAsync() {
                if (window.confirm('确定要删除 ' + this.info.name + ' ' + (this.isDir() ? "文件夹" : "文件") + '吗?')) {
                    if (this.isDir()) {
                        if (window.confirm('删除文件夹将删除该文件夹下所有文件,确认删除?')) {
                            return zouke.resource.postAsync('/file/deletefile', { key: this.info.key });
                        }
                    } else {
                        return zouke.resource.postAsync('/file/deletefile', { key: this.info.key });
                    }
                }
                return Promise.reject('fail');
            }
        }, {
            key: 'moveToAsync',
            value: function moveToAsync(key) {
                return zouke.resource.postAsync('/file/movefile', { key: this.info.key, move_to_key: key });
            }
        }, {
            key: 'clearStatus',
            value: function clearStatus() {
                pri.get(this).rename.blur();
            }
        }, {
            key: 'renameAsync',
            value: function renameAsync() {
                var r = undefined;
                var p = new Promise(function (_r) {
                    r = _r;
                });

                var _pri$get = pri.get(this);

                var name = _pri$get.name;
                var rename = _pri$get.rename;

                var oriName = this.info.name;
                var key = this.info.key;

                name.style.display = 'none';
                rename.style.display = '';

                rename.focus();
                rename.selectionStart = 0;
                if (this.isDir()) {
                    rename.selectEnd = rename.value.length;
                } else {
                    rename.selectEnd = name.value.lastIndexOf('.');
                }

                function blur(e) {
                    rename.off('blur', blur);
                    var n = e.target.value.trim();
                    name.innerText = n;
                    name.style.display = '';
                    rename.style.display = 'none';

                    if (n !== oriName) {
                        r(zouke.resource.postAsync('/file/renamefile', { key: key, name: n }).then(function () {
                            return n;
                        }));
                    } else {
                        r(Promise.resolve(oriName));
                    }
                }

                rename.on('blur', blur);

                return p;
            }
        }, {
            key: 'isFile',
            value: function isFile() {
                return pri.get(this).info.type === 'f';
            }
        }, {
            key: 'isDir',
            value: function isDir() {
                return pri.get(this).info.type === 'd';
            }
        }, {
            key: 'itemDom',
            get: function get() {
                return pri.get(this).itemDom;
            }
        }, {
            key: 'key',
            get: function get() {
                return pri.get(this).info.key;
            }
        }, {
            key: 'info',
            get: function get() {
                return pri.get(this).info;
            }
        }]);
        return Item;
    }();

    var ImageForm = function () {
        function ImageForm() {
            babelHelpers.classCallCheck(this, ImageForm);

            var chooseItemInfos = [];
            chooseItemInfos.keyList = [];
            pri.set(this, {
                isInit: false,
                isShow: false,
                path: [],
                pathKey: [],
                libraryItemInfos: [],
                chooseItemInfos: chooseItemInfos,
                rootkey: '',
                r: null,
                initItemInfos: [],
                libraryItems: [],
                chooseItems: []
            });
        }

        babelHelpers.createClass(ImageForm, [{
            key: 'showAsync',
            value: function () {
                var ref = babelHelpers.asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
                    var initItemInfos = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
                    var root = arguments.length <= 1 || arguments[1] === undefined ? '60001' : arguments[1];

                    var pv, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, item;

                    return regeneratorRuntime.wrap(function _callee6$(_context6) {
                        while (1) {
                            switch (_context6.prev = _context6.next) {
                                case 0:
                                    pv = pri.get(this);

                                    if (pv.isShow) {
                                        _context6.next = 28;
                                        break;
                                    }

                                    if (!pv.isInit) {
                                        pv.isInit = true;
                                        initForm(pv);
                                        document.body.appendChild(pv.form);
                                        setTimeout(function () {
                                            pv.form.classList.add('open');
                                        }, 100);
                                    } else {
                                        pv.form.classList.add('open');
                                    }
                                    pv.isShow = true;
                                    pv.initItemInfos = initItemInfos;
                                    _iteratorNormalCompletion5 = true;
                                    _didIteratorError5 = false;
                                    _iteratorError5 = undefined;
                                    _context6.prev = 8;
                                    for (_iterator5 = initItemInfos[Symbol.iterator](); !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                                        item = _step5.value;

                                        pv.chooseItemInfos.push(item);
                                        pv.chooseItemInfos.keyList.push(item.key);
                                    }
                                    _context6.next = 16;
                                    break;

                                case 12:
                                    _context6.prev = 12;
                                    _context6.t0 = _context6['catch'](8);
                                    _didIteratorError5 = true;
                                    _iteratorError5 = _context6.t0;

                                case 16:
                                    _context6.prev = 16;
                                    _context6.prev = 17;

                                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                                        _iterator5.return();
                                    }

                                case 19:
                                    _context6.prev = 19;

                                    if (!_didIteratorError5) {
                                        _context6.next = 22;
                                        break;
                                    }

                                    throw _iteratorError5;

                                case 22:
                                    return _context6.finish(19);

                                case 23:
                                    return _context6.finish(16);

                                case 24:
                                    pv.rootkey = root;
                                    _context6.next = 27;
                                    return freshAsync(pv);

                                case 27:
                                    return _context6.abrupt('return', new Promise(function (r) {
                                        pv.r = r;
                                    }));

                                case 28:
                                case 'end':
                                    return _context6.stop();
                            }
                        }
                    }, _callee6, this, [[8, 12, 16, 24], [17,, 19, 23]]);
                }));
                return function showAsync(_x13, _x14) {
                    return ref.apply(this, arguments);
                };
            }()
        }, {
            key: 'isShow',
            value: function isShow() {
                return pri.get(this).isShow;
            }
        }]);
        return ImageForm;
    }();

    var freshAsync = function () {
        var ref = babelHelpers.asyncToGenerator(regeneratorRuntime.mark(function _callee7(pv) {
            var _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, info, index;

            return regeneratorRuntime.wrap(function _callee7$(_context7) {
                while (1) {
                    switch (_context7.prev = _context7.next) {
                        case 0:
                            showLoading(pv);
                            _context7.prev = 1;
                            _context7.next = 4;
                            return zouke.resource.postAsync('/file/getfolderInfo', { key: pv.pathKey.length > 0 ? pv.pathKey[pv.pathKey.length - 1] : pv.rootkey });

                        case 4:
                            pv.libraryItemInfos = _context7.sent.files;

                        case 5:
                            _context7.prev = 5;

                            hideLoading(pv);
                            return _context7.finish(5);

                        case 8:
                            if (pv.path.length > 0) {
                                pv.libraryItemInfos.unshift({
                                    key: pv.pathKey[pv.pathKey.length - 2] || pv.rootkey,
                                    name: '上一级',
                                    type: 'p'
                                });
                            }

                            if (!(pv.chooseItemInfos.length > 0)) {
                                _context7.next = 29;
                                break;
                            }

                            _iteratorNormalCompletion6 = true;
                            _didIteratorError6 = false;
                            _iteratorError6 = undefined;
                            _context7.prev = 13;

                            for (_iterator6 = pv.libraryItemInfos[Symbol.iterator](); !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                                info = _step6.value;
                                index = pv.chooseItemInfos.keyList.indexOf(info.key);

                                if (index !== -1) {
                                    pv.chooseItemInfos[index] = info;
                                }
                            }
                            _context7.next = 21;
                            break;

                        case 17:
                            _context7.prev = 17;
                            _context7.t0 = _context7['catch'](13);
                            _didIteratorError6 = true;
                            _iteratorError6 = _context7.t0;

                        case 21:
                            _context7.prev = 21;
                            _context7.prev = 22;

                            if (!_iteratorNormalCompletion6 && _iterator6.return) {
                                _iterator6.return();
                            }

                        case 24:
                            _context7.prev = 24;

                            if (!_didIteratorError6) {
                                _context7.next = 27;
                                break;
                            }

                            throw _iteratorError6;

                        case 27:
                            return _context7.finish(24);

                        case 28:
                            return _context7.finish(21);

                        case 29:
                            render(pv);

                        case 30:
                        case 'end':
                            return _context7.stop();
                    }
                }
            }, _callee7, this, [[1,, 5, 8], [13, 17, 21, 29], [22,, 24, 28]]);
        }));
        return function freshAsync(_x17) {
            return ref.apply(this, arguments);
        };
    }();

    function render(pv) {
        document.activeElement.blur();
        var libraryItemInfos = pv.libraryItemInfos;
        var chooseItemInfos = pv.chooseItemInfos;
        var libraryItems = pv.libraryItems;
        var libraryPath = pv.libraryPath;
        var chooseItems = pv.chooseItems;
        var libraryItemContainer = pv.libraryItemContainer;
        var chooseItemContainer = pv.chooseItemContainer;

        var max = Math.max(libraryItemInfos.length, libraryItems.length);
        for (var _i = 0; _i < max; ++_i) {
            if (!libraryItems[_i]) {
                libraryItems[_i] = new Item();
                libraryItems[_i].itemDom.dataset.index = _i;
                libraryItemContainer.appendChild(libraryItems[_i].itemDom);
            }
            libraryItems[_i].render(libraryItemInfos[_i]);
        }

        var path = '<span data-index="-1">root</span>';
        for (var _i2 = 0; _i2 < pv.path.length; ++_i2) {
            path += '<span data-index="' + _i2 + '">' + pv.path[_i2] + '</span>';
        }
        libraryPath.innerHTML = path;

        max = Math.max(chooseItemInfos.length, chooseItems.length);
        for (var _i3 = 0; _i3 < max; ++_i3) {
            if (!chooseItems[_i3]) {
                chooseItems[_i3] = new Item();
                chooseItems[_i3].itemDom.dataset.index = _i3;
                chooseItemContainer.appendChild(chooseItems[_i3].itemDom);
            }
            chooseItems[_i3].render(chooseItemInfos[_i3]);
        }
    }

    function initForm(pv) {
        var form = document.createElement('section');
        form.classList.add('imageform');
        form.classList.add('_modal');
        form.innerHTML = '\n<div class="container">\n    <div class="loading">\n        <i class="fa fa-spin fa-spinner"></i>\n    </div>\n    <div class="title">选择图片</div>\n    <div class="main">\n        <div class="tabs">\n            <div data-for="0" class="select">图片库</div>\n            <div data-for="1">已选图片</div>\n        </div>\n        <div class="_shadow"></div>\n        <div class="bodys">\n            <div class="select library">\n                <div class="list">\n                </div>\n                <div class="ctrl">\n                    <div class="info">\n                        <div class="path">\n                        </div>\n                        <div class="fileinfo"></div>\n                    </div>\n                    <div>\n                        <button>上传<input type="file" multiple accept=".png,.jpg"></button>\n                        <button>新建文件夹</button>\n                        <button>取消</button>\n                        <button>确定</button>\n                    </div>\n                </div>\n            </div>\n            <div class="choose">\n                <div class="list"></div>\n                <div class="ctrl">\n                    <div class="info">\n                        <div class="fileinfo"></div>\n                    </div>\n                    <div>\n                        <button>移除选择</button>\n                        <button>取消</button>\n                        <button>确定</button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div class="menu">\n        <div class="rename">重命名</div>\n        <div class="delete">删除</div>\n        <div class="toggle">加入选择</div>\n    </div>\n</div>';

        var container = form.querySelector('.container');
        var tabContainer = form.querySelector('.tabs');
        var tabList = form.querySelectorAll('.tabs>div');
        var bodyContainer = form.querySelector('.bodys');
        var bodyList = form.querySelectorAll('.bodys>div');
        var libraryItemContainer = form.querySelector('.library>.list');
        var libraryButtons = form.querySelectorAll('.library>div:last-child button');
        var libraryFileInfo = form.querySelector('.library .fileinfo');
        var libraryPath = form.querySelector('.library .path');
        var chooseItemContainer = form.querySelector('.choose>.list');
        var chooseButtons = form.querySelectorAll('.choose>div:last-child button');
        var chooseFileInfo = form.querySelector('.choose .fileinfo');
        var loading = form.querySelector('.loading');
        var menu = form.querySelector('.menu');

        zouke.draggable(container, '.title');
        Object.assign(pv, {
            container: container,
            form: form,
            tabContainer: tabContainer,
            tabList: tabList,
            bodyContainer: bodyContainer,
            bodyList: bodyList,
            libraryItemContainer: libraryItemContainer,
            libraryButtons: libraryButtons,
            libraryFileInfo: libraryFileInfo,
            libraryPath: libraryPath,
            chooseItemContainer: chooseItemContainer,
            chooseButtons: chooseButtons,
            chooseFileInfo: chooseFileInfo,
            loading: loading,
            menu: menu
        });
        listener(pv);
    }

    function listener(pv) {
        var _this5 = this;

        var container = pv.container;
        var form = pv.form;
        var tabContainer = pv.tabContainer;
        var tabList = pv.tabList;
        var bodyContainer = pv.bodyContainer;
        var bodyList = pv.bodyList;
        var libraryItemContainer = pv.libraryItemContainer;
        var libraryButtons = pv.libraryButtons;
        var libraryFileInfo = pv.libraryFileInfo;
        var libraryPath = pv.libraryPath;
        var chooseItemContainer = pv.chooseItemContainer;
        var chooseButtons = pv.chooseButtons;
        var chooseFileInfo = pv.chooseFileInfo;
        var menu = pv.menu;

        tabContainer.addEventListener('click', function (e) {
            var target = e.target;
            if (Array.prototype.includes.call(tabList, target)) {
                if (!target.classList.contains('select')) {
                    var _iteratorNormalCompletion7 = true;
                    var _didIteratorError7 = false;
                    var _iteratorError7 = undefined;

                    try {
                        for (var _iterator7 = tabList[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                            var tab = _step7.value;

                            tab.classList.remove('select');
                        }
                    } catch (err) {
                        _didIteratorError7 = true;
                        _iteratorError7 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion7 && _iterator7.return) {
                                _iterator7.return();
                            }
                        } finally {
                            if (_didIteratorError7) {
                                throw _iteratorError7;
                            }
                        }
                    }

                    var _iteratorNormalCompletion8 = true;
                    var _didIteratorError8 = false;
                    var _iteratorError8 = undefined;

                    try {
                        for (var _iterator8 = bodyList[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                            var body = _step8.value;

                            body.classList.remove('select');
                        }
                    } catch (err) {
                        _didIteratorError8 = true;
                        _iteratorError8 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion8 && _iterator8.return) {
                                _iterator8.return();
                            }
                        } finally {
                            if (_didIteratorError8) {
                                throw _iteratorError8;
                            }
                        }
                    }

                    target.classList.add('select');
                    bodyList[target.dataset.for].classList.add('select');
                }
            }
        }, true);
        libraryButtons[0].querySelector('input').on('change', function () {
            var ref = babelHelpers.asyncToGenerator(regeneratorRuntime.mark(function _callee8(e) {
                var infoList, _iteratorNormalCompletion9, _didIteratorError9, _iteratorError9, _iterator9, _step9, _info;

                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch (_context8.prev = _context8.next) {
                            case 0:
                                //上传
                                showLoading(pv);
                                _context8.next = 3;
                                return zouke.net.uploadFileListAsync(e.target.files, pv.pathKey[pv.pathKey.length - 1] || pv.rootkey);

                            case 3:
                                infoList = _context8.sent;
                                _iteratorNormalCompletion9 = true;
                                _didIteratorError9 = false;
                                _iteratorError9 = undefined;
                                _context8.prev = 7;

                                for (_iterator9 = infoList[Symbol.iterator](); !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                                    _info = _step9.value;

                                    if (_info.key) {
                                        pv.libraryItemInfos.push(_info);
                                        pv.chooseItemInfos.push(_info);
                                        pv.chooseItemInfos.keyList.push(_info.key);
                                    }
                                }
                                _context8.next = 15;
                                break;

                            case 11:
                                _context8.prev = 11;
                                _context8.t0 = _context8['catch'](7);
                                _didIteratorError9 = true;
                                _iteratorError9 = _context8.t0;

                            case 15:
                                _context8.prev = 15;
                                _context8.prev = 16;

                                if (!_iteratorNormalCompletion9 && _iterator9.return) {
                                    _iterator9.return();
                                }

                            case 18:
                                _context8.prev = 18;

                                if (!_didIteratorError9) {
                                    _context8.next = 21;
                                    break;
                                }

                                throw _iteratorError9;

                            case 21:
                                return _context8.finish(18);

                            case 22:
                                return _context8.finish(15);

                            case 23:
                                render(pv);
                                hideLoading(pv);

                            case 25:
                            case 'end':
                                return _context8.stop();
                        }
                    }
                }, _callee8, _this5, [[7, 11, 15, 23], [16,, 18, 22]]);
            })),
                _this = _this5;
            return function (_x18) {
                return ref.apply(_this, arguments);
            };
        }(), true);
        libraryButtons[1].on('click', function () {
            var ref = babelHelpers.asyncToGenerator(regeneratorRuntime.mark(function _callee9(e) {
                var info, index, key, p;
                return regeneratorRuntime.wrap(function _callee9$(_context9) {
                    while (1) {
                        switch (_context9.prev = _context9.next) {
                            case 0:
                                //新建文件夹
                                info = {
                                    pkey: pv.pathKey[pv.pathKey.length - 1] || pv.rootkey,
                                    type: 'd',
                                    name: '新建文件夹',
                                    width: 0,
                                    height: 0,
                                    size: 0,
                                    src: ''
                                };
                                index = -1;

                                showLoading(pv);
                                _context9.prev = 3;
                                _context9.next = 6;
                                return zouke.resource.postAsync('/file/createfile', info);

                            case 6:
                                key = _context9.sent.key;

                                info.key = key;
                                delete info.pkey;
                                index = 0;
                                if (pv.path.length > 0) {
                                    index = 1;
                                    pv.libraryItemInfos.splice(1, 0, info);
                                } else {
                                    pv.libraryItemInfos.unshift(info);
                                }
                                render(pv);

                            case 12:
                                _context9.prev = 12;

                                hideLoading(pv);
                                return _context9.finish(12);

                            case 15:
                                if (!(index > -1)) {
                                    _context9.next = 28;
                                    break;
                                }

                                _context9.next = 18;
                                return pv.libraryItems[index].renameAsync();

                            case 18:
                                p = _context9.sent;
                                _context9.prev = 19;

                                showLoading(pv);
                                _context9.next = 23;
                                return p;

                            case 23:
                                pv.libraryItemInfos[index].name = _context9.sent;

                                render(pv);

                            case 25:
                                _context9.prev = 25;

                                hideLoading(pv);
                                return _context9.finish(25);

                            case 28:
                            case 'end':
                                return _context9.stop();
                        }
                    }
                }, _callee9, _this5, [[3,, 12, 15], [19,, 25, 28]]);
            })),
                _this = _this5;
            return function (_x19) {
                return ref.apply(_this, arguments);
            };
        }());

        function cancel() {
            pv.r(pv.initItemInfos);
            pv.form.classList.remove('open');
            pv.isShow = false;
        }
        function ok() {
            pv.r(pv.chooseItemInfos);
            pv.form.classList.remove('open');
            pv.isShow = false;
        }
        libraryButtons[2].on('click', cancel);
        libraryButtons[3].on('click', ok);
        chooseButtons[1].on('click', cancel);
        chooseButtons[2].on('click', ok);

        var opItem = null,
            index = 0;
        container.on('contextmenu', function (e) {
            e.preventDefault();
        });
        bodyList[0].on('contextmenu', function (e) {
            //右键菜单
            if (e.target.classList.contains('item')) {
                index = parseInt(e.target.dataset.index, 10);
                opItem = pv.libraryItems[index];
                if (opItem.info.type === 'p') {
                    return;
                }

                var toggle = pv.menu.querySelector('.toggle');
                if (opItem.isDir()) {
                    toggle.style.display = "none";
                } else {
                    if (pv.chooseItemInfos.keyList.includes(opItem.info.key)) {
                        toggle.innerText = '移除选择';
                    } else {
                        toggle.innerText = '加入选择';
                    }
                    toggle.style.display = "";
                }
                var rect = container.getBoundingClientRect();
                showMenu(pv, e.clientX - rect.left, e.clientY - rect.top);
            }
        });
        document.on('click', function () {
            hideMenu(pv);
        }, true);

        menu.on('click', function () {
            var ref = babelHelpers.asyncToGenerator(regeneratorRuntime.mark(function _callee10(e) {
                var p, i;
                return regeneratorRuntime.wrap(function _callee10$(_context10) {
                    while (1) {
                        switch (_context10.prev = _context10.next) {
                            case 0:
                                _context10.t0 = e.target.className;
                                _context10.next = _context10.t0 === 'rename' ? 3 : _context10.t0 === 'delete' ? 16 : _context10.t0 === 'toggle' ? 26 : 30;
                                break;

                            case 3:
                                _context10.next = 5;
                                return opItem.renameAsync();

                            case 5:
                                p = _context10.sent;
                                _context10.prev = 6;

                                showLoading(pv);
                                _context10.next = 10;
                                return p;

                            case 10:
                                pv.libraryItemInfos[index].name = _context10.sent;

                                render(pv);

                            case 12:
                                _context10.prev = 12;

                                hideLoading(pv);
                                return _context10.finish(12);

                            case 15:
                                return _context10.abrupt('break', 30);

                            case 16:
                                _context10.prev = 16;

                                showLoading(pv);
                                _context10.next = 20;
                                return opItem.deleteAsync();

                            case 20:
                                pv.libraryItemInfos.splice(index, 1);
                                render(pv);

                            case 22:
                                _context10.prev = 22;

                                hideLoading(pv);
                                return _context10.finish(22);

                            case 25:
                                return _context10.abrupt('break', 30);

                            case 26:
                                i = pv.chooseItemInfos.keyList.indexOf(opItem.info.key);

                                if (i === -1) {
                                    pv.chooseItemInfos.push(opItem.info);
                                    pv.chooseItemInfos.keyList.push(opItem.info.key);
                                } else {
                                    pv.chooseItemInfos.splice(i, 1);
                                    pv.chooseItemInfos.keyList.splice(i, 1);
                                }
                                render(pv);
                                return _context10.abrupt('break', 30);

                            case 30:
                            case 'end':
                                return _context10.stop();
                        }
                    }
                }, _callee10, _this5, [[6,, 12, 15], [16,, 22, 25]]);
            })),
                _this = _this5;
            return function (_x20) {
                return ref.apply(_this, arguments);
            };
        }());

        libraryItemContainer.on('click', function (e) {
            //显示文件信息
            e.stopPropagation();
            if (e.target.classList.contains('item')) {
                var _item = pv.libraryItems[e.target.dataset.index];
                var _info2 = _item.info;
                if (_item.isFile()) {
                    libraryFileInfo.innerHTML = 'width&ensp;<span>' + _info2.width + '</span>&emsp;&emsp;height&ensp;<span>' + _info2.height + '</span>&emsp;&emsp;size&ensp;<span>' + _info2.size + 'k</span>';
                    return;
                }
            }
            libraryFileInfo.innerHTML = '';
        }, true);

        chooseItemContainer.on('click', function (e) {
            //显示文件信息
            e.stopPropagation();
            if (e.target.classList.contains('item')) {
                var _item2 = pv.chooseItems[e.target.dataset.index];
                var _info3 = _item2.info;

                if (_item2.isFile()) {
                    chooseFileInfo.innerHTML = 'width&ensp;<span>' + _info3.width + '</span>&emsp;&emsp;height&ensp;<span>' + _info3.height + '</span>&emsp;&emsp;size&ensp;<span>' + _info3.size + 'k</span>';
                    return;
                }
            }
            chooseFileInfo.innerHTML = '';
        }, true);

        form.on('click', function (e) {
            //清除文件信息
            libraryFileInfo.innerHTML = '';
            chooseFileInfo.innerHTML = '';
        });

        libraryItemContainer.on('dblclick', function (e) {
            //进入文件夹
            if (e.target.classList.contains('item')) {
                var _info4 = pv.libraryItemInfos[e.target.dataset.index];
                switch (_info4.type) {
                    case 'p':
                        pv.path.pop();
                        pv.pathKey.pop();
                        freshAsync(pv);
                        break;
                    case 'd':
                        pv.path.push(_info4.name);
                        pv.pathKey.push(_info4.key);
                        freshAsync(pv);
                        break;
                }
            }
        });
        libraryPath.on('click', function (e) {
            //进入目录
            if (e.target.parentElement === libraryPath) {
                var _index = parseInt(e.target.dataset.index, 10);
                pv.path = pv.path.slice(0, _index + 1);
                pv.pathKey = pv.pathKey.slice(0, _index + 1);
                freshAsync(pv);
            }
        });

        //drag event
        var dndHandle = {
            handleEvent: function handleEvent(e) {
                switch (e.type) {
                    case 'dragstart':
                        this.dragstart(e);
                        break;
                    case 'dragover':
                        this.dragover(e);
                        break;
                    case 'dragend':
                        this.dragend(e);
                        break;
                    case 'drop':
                        this.drop(e);
                        break;
                    case 'dragenter':
                        this.dragenter(e);
                        break;
                }
            },
            dragstart: function dragstart(e) {
                var index = e.target.dataset.index;
                var info = pv.libraryItemInfos[index];
                var item = pv.libraryItems[index];
                item.clearStatus();
                if (info.type !== 'p') {
                    e.target.style.opacity = 0.6;
                    e.target.classList.add('dragging');
                    e.dataTransfer.setData("Text", info.key);
                    this.item = item;
                    return;
                }

                e.preventDefault();
            },
            dragend: function dragend(e) {
                e.target.style.opacity = '';
                e.target.classList.remove('dragging');
                delete this.item;
            },
            dragenter: function dragenter(e) {
                if (e.target.classList.contains('item')) {
                    var itemDom = e.target;
                    if (itemDom !== this.preItemDom) {
                        this.preItemDom && this.preItemDom.classList.remove('drop');
                        this.preItemDom = null;
                        if (itemDom && !e.target.classList.contains('dragging')) {
                            var type = pv.libraryItemInfos[itemDom.dataset.index].type;
                            if (type === 'd' || type === 'p') {
                                itemDom.classList.add('drop');
                                this.preItemDom = itemDom;
                            }
                        }
                    }
                }
            },
            dragover: function dragover(e) {
                e.preventDefault();
            },
            drop: function drop(e) {
                var _this6 = this;

                return babelHelpers.asyncToGenerator(regeneratorRuntime.mark(function _callee11() {
                    var _item3;

                    return regeneratorRuntime.wrap(function _callee11$(_context11) {
                        while (1) {
                            switch (_context11.prev = _context11.next) {
                                case 0:
                                    if (!_this6.preItemDom) {
                                        _context11.next = 13;
                                        break;
                                    }

                                    showLoading(pv);
                                    _context11.prev = 2;
                                    _item3 = _this6.item;
                                    _context11.next = 6;
                                    return _this6.item.moveToAsync(_this6.preItemDom.dataset.key);

                                case 6:
                                    pv.libraryItemInfos.splice(parseInt(_item3.itemDom.dataset.index, 10), 1);
                                    render(pv);

                                case 8:
                                    _context11.prev = 8;

                                    _this6.preItemDom.classList.remove('drop');
                                    hideLoading(pv);
                                    return _context11.finish(8);

                                case 12:
                                    delete _this6.preItemDom;

                                case 13:
                                case 'end':
                                    return _context11.stop();
                            }
                        }
                    }, _callee11, _this6, [[2,, 8, 12]]);
                }))();
            }
        };

        libraryItemContainer.on('dragstart', dndHandle, true);
        libraryItemContainer.on('dragover', dndHandle, true);
        libraryItemContainer.on('dragend', dndHandle, true);
        libraryItemContainer.on('drop', dndHandle, true);
        libraryItemContainer.on('dragenter', dndHandle, true);
    }

    function showLoading(pv) {
        pv.loading.classList.add('open');
    }

    function hideLoading(pv) {
        pv.loading.classList.remove('open');
    }

    function showMenu(pv, x, y) {
        pv.menu.style.left = x + 'px';
        pv.menu.style.top = y + 'px';
        pv.menu.classList.add('open');
    }

    function hideMenu(pv) {
        pv.menu.classList.remove('open');
    }

    window.zouke.ImageForm = ImageForm;
})();