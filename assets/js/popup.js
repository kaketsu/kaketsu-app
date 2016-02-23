'use strict';

function getInnerPopup(window) {
    var w = window;
    // Create the event.
    var event = document.createEvent('event');
    // Define that the event name is 'build'.
    event.initEvent('popup.msg', true, true);
    //进行监听message事件
    w.addEventListener('message', function (receive) {
        event.data = receive.data;
        w.dispatchEvent(event);
    }, true);

    return {
        trigger: function trigger(type) {
            if (type == 'popup.close') {
                popup.close();
            } else if (type == 'popup.refresh') {
                popup.refresh();
            } else if (type == 'popup.open') {}
        },
        msg: function msg(data) {
            if (w.parent) {
                w.parent.postMessage(data, '*');
            }
        },
        on: function on(type, fn) {
            w.addEventListener(type, fn);
        }
    };
}

var popup = {
    defaults: {
        src: '/x',
        width: 700,
        height: 500,
        scrolling: 'auto',
        title: '活动详细',
        data: {}
    },
    //是否显示滚动条 no,yes,auto
    init: function init() {
        $("#btn-new").unbind();
        $("#btn-refresh").unbind();
        $("#btn-close").unbind();
        //进行重新绑定

        $("#btn-new").on('click', function () {
            window.open(popup.defaults.src);
        });

        var src = this.defaults.src;
        $("#btn-refresh").on('click', function () {
            $('iframe').attr('src', popup.defaults.src);
        });

        $("#btn-close").on('click', function () {
            $("#backScene, #top").fadeOut(function () {
                $(this).remove();
            });
            //2015.12.24将后面Mask解除固定
            //2015.12.25绑定一个回调函数
            $('body').css({
                'overflow': 'auto'
            });
            if (typeof popup.defaults.callback == 'function') {
                popup.defaults.callback(popup.defaults.data);
            }
        });

        //进行监听message事件
        window.addEventListener('message', popup.dispatchMessage, true);
    },
    setData: function setData(data) {
        $.extend(popup.defaults.data, data);
    },
    show: function show(options) {
        $.extend(this.defaults, options);
        this.showPopup(this.defaults.src, this.defaults.width, this.defaults.height, this.defaults.title);
        //绑定事件
        this.init();
        //2015.12.24讲后面固定住
        $('body').css({
            'overflow': 'hidden'
        });

        //进行拖动
        var ele = document.querySelector('#top');
        var handler = document.querySelector('#popTitle');
        zouke.draggable(ele, '#popTitle');

        return popup;
    },
    showPopup: function showPopup(src, width, height, title) {
        if (height > $(window).height()) {
            height = $(window).height();
        }
        if (width > $(window).width()) {
            width = $(window).width();
        }
        var marginLeft = width / 2;
        var marginTop = height / 2;
        var innerHtml = '';
        innerHtml += '<div id="backScene">';
        innerHtml += '</div>';
        innerHtml += '<div id="top">';
        innerHtml += '<div id="popTitle">';
        innerHtml += '<div class="panel-heading">';
        innerHtml += '<h3 class="panel-title center">' + title + '</h3>';
        innerHtml += '<span id="btn-refresh" class="clickable btn-success">';
        innerHtml += '<i class="ace-icon fa fa-refresh"></i></span>';
        innerHtml += '<span id="btn-close" class="clickable btn-danger pull-right">';
        innerHtml += '<i class="ace-icon fa fa-times smaller-75"></i></span>';
        innerHtml += '<span id="btn-new" class="clickable  btn-info pull-right">';
        innerHtml += '<i class="fa fa-external-link bigger-110"></i></span>';
        innerHtml += '</div>';
        innerHtml += '</div>';
        innerHtml += '<iframe width="' + width + '" height="' + (height - 35) + '" frameborder="0" scrolling="' + this.defaults.scrolling + '" src="' + src + '" class="ui-widget-content">';
        innerHtml += '</iframe></div>';

        $('body').append(innerHtml);

        $('iframe')[0].contentWindow.innerPopup = getInnerPopup($('iframe')[0].contentWindow);

        $('span#btn-new').css({
            'position': 'absolute',
            'top': '5px',
            'right': '50px',
            'height': '25px',
            'width': '25px',
            'border': '0',
            'border-radius': '50%'
        });
        $('span#btn-new i').css({
            'line-height': '25px',
            'margin-left': '7px'
        });
        $('span#btn-close').css({
            'position': 'absolute',
            'top': '5px',
            'right': '10px',
            'height': '25px',
            'width': '25px',
            'display': 'block',
            'border': '0',
            'border-radius': '50%'
        });
        $('span#btn-close i').css({
            'line-height': '25px',
            'margin-left': '7px'
        });

        $('span#btn-refresh').css({
            'position': 'absolute',
            'top': '5px',
            'right': '90px',
            'height': '25px',
            'width': '25px',
            'border': '0',
            'border-radius': '50%'
        });
        $('span#btn-refresh i').css({
            'line-height': '25px',
            'margin-left': '7px'
        });

        $('#backScene').css({
            "width": "100%",
            "height": "100%",
            "position": "fixed",
            "top": 0,
            "left": 0,
            "z-index": 100,
            "background": "#222222",
            "opacity": 0.5
        });
        $('#top').css({
            "width": width + "px",
            "height": height + "px",
            "color": "#333",
            "position": "fixed",
            "top": "50%",
            "left": "50%",
            "margin-left": "-" + marginLeft + "px",
            "margin-top": "-" + marginTop + "px",
            "z-index": 200,
            "box-shadow": "2px 2px 10px #909090",
            "background": "#fff"
        });

        $('#popTitle').css({
            'background-color': '#428bca',
            'color': '#fff',
            'position': 'relative',
            'height': '35px'
        });
        $('#popClose').css({
            "position": "absolute",
            "right": "10px",
            "top": "5px",
            "width": 28 + "px",
            "height": 28 + "px",
            "text-align": "center",
            "background-color": "#fff",
            "border-radius": "50%",
            "border": "2px solid #bbb"
        });
        $("#popClose").hover(function () {
            $(this).css({
                "background-color": "#ccc"
            });
        }, function () {
            $(this).css({
                "background-color": "#fff"
            });
        });
        $('#popClose').find("i").css({
            "position": "relative",
            "top": "3px",
            "font-size": "1.3em",
            "cursor": "pointer"
        });
        $('#popupClose').css({
            "width": 28 + "px",
            "height": 28 + "px",
            "cursor": "pointer",
            "position": "absolute",
            "z-index": "200",
            "top": "-" + 10 + "px",
            "right": "-" + 6 + "px",
            "background-color": "#888",
            "border-radius": "50%",
            "border": "2px solid #eee"
        });
        $('#top').resize(function () {
            var h = $(this).height();
            var w = $(this).width();
            $('iframe').css({
                "width": w + "px",
                "height": h - 35 + "px"
            });
        });
    },
    dispatchMessage: function dispatchMessage(receive) {
        //2016.2.16
        var event = document.createEvent('event');
        // Define that the event name is 'build'.
        event.initEvent('popup.msg', true, true);

        event.data = receive.data;
        $('iframe')[0].dispatchEvent(event);
    },
    close: function close() {
        $("#btn-close").trigger('click');
        window.removeEventListener('message', popup.dispatchMessage, true);
    },
    refresh: function refresh() {
        $("#btn-refresh").trigger('click');
    },
    setRefreshUrl: function setRefreshUrl(url) {
        this.defaults.src = url;
    },
    showNewWindow: function showNewWindow() {
        $("#btn-new").trigger('click');
    },

    actions: [],
    on: function on(type, fn) {
        popup.actions.push(fn);
        $('iframe')[0].addEventListener(type, fn, true);
    },
    msg: function msg(data) {
        if ($('iframe')[0] && $('iframe')[0].contentWindow) {
            $('iframe')[0].contentWindow.postMessage(data, '*');
        }
    }
};

//在iframe中调用方法。使用popup.msg()传递参数，同时在主页面中，使用popup.listen()监听并且获得传递的数据。