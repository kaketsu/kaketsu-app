'use strict';

(function () {
    zouke.table = {
        getRender: function getRender(buttons) {
            return function (data, type, rowData, meta) {
                if (type === 'display') {
                    var btn = '';

                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = (Array.isArray(buttons) ? buttons : buttons(data, type, rowData, meta))[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var _step$value = _step.value;
                            var name = _step$value.name;
                            var cls = _step$value.cls;

                            btn += '\n    <a data-row="' + meta.row + '" data-id="' + rowData[0] + '" class="' + cls + '" href="#" title="' + name + '">\n    </a>';
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