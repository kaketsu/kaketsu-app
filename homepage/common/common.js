/**
 * Created by wangkehan on 15/12/25.
 */
//ios bug : innerWidth/innerHeight 在页面加载时取值不正确,需调用getBoundingClientRect方法
document.documentElement.getBoundingClientRect();

((global)=>{
    const NAMESPACE='zouke';
    const ouu={};

    try{
        Object.defineProperty(global, 'NAMESPACE', {
            enumerable : false,
            configurable : false,
            get(){
                return NAMESPACE;
            }
        });
        Object.defineProperty(global, NAMESPACE, {
            enumerable : false,
            configurable : false,
            get(){
                return ouu;
            }
        })
    }catch(e){
        global.NAMESPACE=NAMESPACE;
        global[NAMESPACE]=ouu;
    }
})(window);

((global)=>{
    try{
        Node.prototype.on = Node.prototype.addEventListener;
        Node.prototype.off = Node.prototype.removeEventListener;
    }catch(e){
        Element.prototype.on=Element.prototype.addEventListener;
        Element.prototype.off=Element.prototype.removeEventListener;
        document.on=document.addEventListener;
        document.off=document.removeEventListener;
    }
    
    Window.prototype.on = Window.prototype.addEventListener;
    Window.prototype.off = Window.prototype.removeEventListener;
    Element.prototype.$=function(...arg){return this.querySelector(...arg)};
    Element.prototype.$a=function(...arg){return this.querySelectorAll(...arg)};
    Element.prototype.addClass=function(...c){return this.classList.add(...c)};
    Element.prototype.removeClass=function(...c){return this.classList.remove(...c)};
    Element.prototype.containsClass=function(...c){return this.classList.contains(...c)};
    Element.prototype.toggleClass=function(...c){return this.classList.toggle(...c)};

    global.$=(...arg)=>{
        return document.querySelector(...arg);
    };
    global.$a=(...arg)=>{
        return document.querySelectorAll(...arg);
    };

    const eventNotPropagation = { focus: true, blur: true, mouseenter: true, mouseleave: true, load: true, readystatechange: true, error: true, input: true, propertychange: true };//不进行事件传播的事件类型

    function trigger(name,data){
        let e = null;
        if(typeof(name)==='string'||name instanceof String) e= document.createDispatchEvent(name.toString());
        else e=name;
        if(data){
            e.$data=data;
        }
        (this||global).dispatchEvent(e);
    }
    try{
        Node.prototype.trigger=trigger;
    }catch(e){
        Element.prototype.trigger=trigger;
        document.trigger=trigger;
    }
    try{
        Window.prototype.trigger=trigger;
    }catch(e){
        window.trigger=trigger;
    }

    document.createDispatchEvent=function (/*string*/type,/*object*/option={}) {
        /*
         * eventType:HTMLEvents/UIEvents/MouseEvents
         * */
        
        option.bubbles = "bubbles" in option ? option.bubbles : !!eventNotPropagation[type];
        let eventType = option.eventType || 'HTMLEvents';

        if(document.createEventObject){//ie8
            eventType='Event';
        }

        const e = document.createEvent(eventType);
        switch (eventType){
            case 'UIEvents':
                e.initUIEvent(type, option.bubbles, true, option.windowObject || window, option.detail || 0);
                break;
            case 'MouseEvents':
                e.initMouseEvent(type, option.bubbles, true, option.windowObject || window, option.detail || 0,
                    option.screenX || 0, option.screenY || 0, option.clientX || 0, option.clientY || 0, option.ctrlKey || false, option.altKey || false, option.shiftKey || false, option.metaKey || false, option.button || 0, option.relatedTarget || null);
                break;
            default://'HTMLEvents' or other
                e.initEvent(type, option.bubbles, true);
                break;
        }
        return e;
    };
})(window);

((global,namespace)=>{
    function formUrlEncode(obj,prefix){
        if(Array.isArray(obj)&&obj.length===0){
            return '';
        }
        const urlComponents=[];
        for(let [key,value] of Object.entries(obj)){
            let urlKey= prefix?`${prefix}[${key}]`:key.toString();
            if (value == null) value = '';
            if(typeof(value)==='object'){
                const ov=formUrlEncode(value,urlKey);
                if(ov!==''){
                    urlComponents.push(ov);
                }
            }else{
                urlComponents.push(`${encodeURIComponent(urlKey)}=${encodeURIComponent(value)}`);
            }
        }
        return urlComponents.join('&');
    }

    //browser
    const browser=(function match() {
        const userAgent=navigator.userAgent.toLowerCase();
        if (userAgent.indexOf("lbbrowser") > 0) {
            return userAgent.match(/lbbrowser/gi)
        }
        if (userAgent.indexOf("maxthon") > 0) {
            return userAgent.match(/maxthon\/[\d.]+/gi)
        }
        if (userAgent.indexOf("bidubrowser") > 0) {
            return userAgent.match(/bidubrowser/gi)
        }
        if (userAgent.indexOf("baiduclient") > 0) {
            return userAgent.match(/baiduclient/gi)
        }
        if (userAgent.indexOf("metasr") > 0) {
            return userAgent.match(/metasr/gi)
        }
        if (userAgent.indexOf("qqbrowser") > 0) {
            return userAgent.match(/qqbrowser/gi)
        }
        if (! (function() {
                if (navigator.mimeTypes.length > 0) {
                    var b;
                    for (b in navigator.mimeTypes) {
                        if (navigator.mimeTypes[b]["type"] == "application/vnd.chromium.remoting-viewer") {
                            return true
                        }
                    }
                }
                return false
            })() && (("track" in document.createElement("track")) && !("scoped" in document.createElement("style")) && !("v8Locale" in window) && /Gecko\)\s+Chrome/.test(navigator.appVersion)) && (("track" in document.createElement("track")) && ("scoped" in document.createElement("style")) && ("v8Locale" in window))) {
            return "qihu";
        }
        if (userAgent.indexOf("msie") > 0) {
            return userAgent.match(/msie [\d.]+;/gi)
        }
        if (window.document.documentMode) {
            return "msie";
        }
        if (userAgent.indexOf("edge") > 0) {
            return userAgent.match(/edge\/[\d.]+/gi)
        }
        if (userAgent.indexOf("firefox") > 0) {
            return userAgent.match(/firefox\/[\d.]+/gi)
        }
        if (userAgent.indexOf("opr") > 0) {
            return userAgent.match(/opr\/[\d.]+/gi)
        }
        if (userAgent.indexOf("chrome") > 0) {
            return userAgent.match(/chrome\/[\d.]+/gi)
        }
        if (userAgent.indexOf("safari") > 0 && userAgent.indexOf("chrome") < 0) {
            return userAgent.match(/safari\/[\d.]+/gi)
        }
        return ""
    }() + "").replace(/[0-9.\/|;|\s]/ig, "");
    const browserversion = (function() {
        if (browser == "msie") {
            const userAgent=navigator.userAgent;
            if (userAgent.search(/MSIE [2-5]/) > 0) {
                return 5
            }
            if (userAgent.indexOf("MSIE 6") > 0) {
                return 6
            }
            if (userAgent.indexOf("MSIE 7") > 0) {
                return 7
            }
            if (userAgent.indexOf("MSIE 8") > 0) {
                return 8
            }
            if (userAgent.indexOf("MSIE 9") > 0) {
                return 9
            }
            if (userAgent.indexOf("MSIE 10") > 0) {
                return 10
            }
            if (window.document.documentMode == "11") {
                return 11
            }
            return 14
        } else {
            return 14
        }
    })();
    const browsertype = (function() {
        const userAgent=navigator.userAgent.toLowerCase();
        if (userAgent.indexOf("msie") > 0 || new RegExp("trident(.*)rv.(\\d+)\\.(\\d+)").test(userAgent)) {
            return "ie"
        }
        if (userAgent.indexOf("firefox") > 0) {
            return "firefox"
        }
        if (userAgent.indexOf("chrome") > 0) {
            return "chrome"
        }
        if (userAgent.indexOf("safari") > 0 && userAgent.indexOf("chrome") < 0) {
            return "safari"
        }
        return "other";
    })();

    //platform
    const { platform , /* phone/tablet/desktop */ os /* android/ios */}=(function(ua) {
        let platform='';
        let os = '';
        if (ua.includes('iphone')){
            platform = 'phone';
            os = 'ios';
        }else if (ua.includes('ipad')){
            platform = 'tablet';
            os = 'ios';
        }else if (ua.includes('android')){
            os = 'android';
            platform = ua.includes('mobi') ? 'phone' : 'tablet';
        }else{
            platform = 'desktop';
        }

        //base font-size (phone and pad)
        if(platform==='phone'||platform==='tablet'){
            const remLength = platform==='phone'?15:32; //phone:15字,pad:32字
            function resize(){
                $('html').style.fontSize = document.documentElement.clientWidth / remLength + 'px';
            }
            global.on('resize', resize);
            resize();
        }
        return {platform,os};
    }(navigator.userAgent.toLowerCase()));

    //url查询key/value
    const query=(function(){
        const query = {};
        if(location.search!=''){
            const parts=location.search.substr(1).split('&');
            for (let p of parts){
                if(p.includes('=')){
                    let [key,...value]=p.split('=');
                    query[key]=value.join('=');
                }else{
                    query[p]='';
                }
            }
        }
        return query;
    }());

    //resource fetch function
    function resolveResponse(response){
        return response.json();
    }
    function resolveJSON(json){
        if(json.code<0){
           namespace.message.alertAsync(json.msg);
           throw json;
        }
        return json;
    }
    function catchHttpError(e){
        namespace.message.alertAsync('网络异常');
        throw {code:-500,msg:'网络异常'}
    }

    Object.assign(namespace,{
        var:{
            qiniuHost:'//cdn1.zouke.com'
        },
        polyfill:{},//placeHolder, ... polyfill helper functions
        net:{
            fetchAsync(url,{method="POST",headers={},data={}}={}){
                headers = Object.assign({
                    "X-Requested-With" : "XMLHttpRequest",
                    "credentials" : 'same-origin',
                    "Content-Type" : "application/x-www-form-urlencoded; charset=UTF-8"
                }, headers);

                return global.fetch(url, {
                    method,
                    headers,
                    credentials : 'same-origin',
                    body : headers['Content-Type'].toLowerCase().includes('json') ? JSON.stringify(data) : formUrlEncode(data)
                });
            }
        },
        resource: {
            postAsync(url, data){
                return namespace.net.fetchAsync(url, { data }).catch(catchHttpError).then(resolveResponse).then(resolveJSON);
            },
            postJSONAsync(url, data){
                return namespace.net.fetchAsync(url, {
                    data,
                    headers : { "Content-Type" : "application/JSON; charset=UTF-8" }
                }).catch(catchHttpError).then(resolveResponse).then(resolveJSON);
            }
        },
        message:{
            alertAsync(...arg){
                //ie8 alert have no apply method
                global.alert(arg[0]);
                return Promise.resolve();
            }
        },
        browser:{
            name:browser,//浏览器名称
            version:browserversion,//ie版本
            type:browsertype//内核
        },
        getArgs(){
            return query;
        },
        getScrollOffset(){
            var w = global;
            //!=:null&undefined
            if (w.pageXOffset != null) return { x: w.pageXOffset, y: w.pageYOffset };

            //兼容ie8及以下
            var d = w.document;
            if (d.compatMode === "CSS1Compat") return { x: d.documentElement.scrollLeft, y: d.documentElement.scrollTop };

            //怪异模式
            return { x: d.body.scrollLeft, y: d.body.scrollTop };
        },
        getViewportSize(){
            var w = global;
            //!=:null&undefined
            if (w.innerWidth != null) return { w: w.innerWidth, h: w.innerHeight };

            var d = w.document;
            //if (document.compatMode === "CSS1Compat") {
                return { w: d.documentElement.clientWidth, h: d.documentElement.clientHeight };
            //}

            //怪异模式
            //return { w: d.body.clientWidth, h: d.body.clientHeight };
        },
        platform:{
            isAndroid(){return os==='android';},
            isIOS(){return os==='ios';},
            isPhone(){return platform==='phone';},
            isTablet(){return platform==='tablet';},
            isDesktop(){return platform==='desktop';},
            isIPhone(){return os==='ios'&&platform==='tablet';},
            isIPad(){return os==='ios'&&platform==='phone';}
        },
        domList:{
            on(list,...arg){ for(let dom of list) dom.on(...arg) },
            off(list,...arg){ for(let dom of list) dom.off(...arg) },
            addClass(list,...arg){for(let dom of list) dom.addClass(...arg)},
            removeClass(list,...arg){for(let dom of list) dom.removeClass(...arg)},
            toggleClass(list,...arg){for(let dom of list) dom.toggleClass(...arg)},
            containsClass(list,...arg){return list[0]&&list[0].contains(...arg)}
        }
    });
})(window,window[NAMESPACE]);

((global,namespace)=> {
    //polyfill
    //json bug
    if (namespace.browser.version===8) {//ie8 兼容json修正
        (function () {
            //json ie8修正
            const stringify = JSON.stringify;
            JSON.stringify = function (obj) {
                eval("var str='" + stringify(obj) + "';");
                return str;
            };
        })();
    }

    //setTimeout
    if (namespace.browser.version && namespace.browser.version <= 9) {
        (function (overrideFn) {
            global.setTimeout = overrideFn(global.setTimeout);
            global.setInterval = overrideFn(global.setInterval);
        })(function (originalFn) {
            return function (code, delay) {
                var args = Array.prototype.slice.call(arguments, 2);
                return originalFn(function () {
                    if (typeof code === 'string') {
                        eval(code);
                    } else {
                        code.apply(this, args);
                    }
                }, delay);
            };
        });
    }

    if (!document.getElementsByClassName) {//兼容修正ie8 getElementsByClassName方法
        //HTMLDocument.prototype
        document.getElementsByClassName = Element.prototype.getElementsByClassName = function (className) {
            var node = this;
            var classList = className.trim();
            if (this.querySelectorAll) {
                classList = classList.replace(/[\s]+/g, ".");
                try {
                    return this.querySelectorAll("." + classList);
                } catch (e) {
                    //若出错，跳出进行下一步的执行;
                }
            }
            classList = classList.replace(/[\s]+/g, " ").split(" ");
            var classListLength = classList.length;
            for (var i = 0, j = classListLength; i < j; ++i) {//替换匹配className的正则表达
                classList[i] = new RegExp("(^|\\s)" + classList[i].replace(/\-/g, "\\-") + "(\\s|$)");
            }
            var elements = node.getElementsByTagName("*");//得到节点下所有节点
            var result = [];
            for (var i = 0, j = elements.length, k = 0; i < j; ++i) {
                var element = elements[i];
                while (classList[k++].test(element.className)) {
                    if (k === classListLength) {
                        result[result.length] = element;
                        break;
                    }
                }
                k = 0;
            }
            return result;
        };
    }

    //classList
    if(!('classList' in Element.prototype)){
        class ClassList{
            _getCList(){
                return this._element.className.trim().split(/[\s]+/g);
            }
            constructor(ele){
                this._element=ele;
            }
            add(className){
                const list=this._getCList();
                if(!list.includes(className)){
                    list.push(className);
                    this._element.className=list.join(' ');
                }
            }
            remove(className){
                this._element.className=this._getCList().filter(c=>c!==className).join(' ');
            }
            toggle(className){
                const list=this._getCList();
                if(list.contains(className)) this.remove(className);
                else this.add(className);
            }
            contains(className){
                return this._getCList().includes(className);
            }
            item(){}
            toString(){
                return this._element.className;
            }
        }
        Object.defineProperty(Element.prototype,'classList',{
            get(){
                return new ClassList(this);
            }
        });
    }

    //data
    function parseName(name){
        if(name.includes('-')) return name;
        else return name.replace(/([A-Z])/g,'-$1').toLowerCase();
    }
    function getData(e, name) {
        if (e.dataset) {
            return e.dataset[name];
        } else {
            var returnValue = e.getAttribute("data-" + parseName(name));
            if (returnValue === null) {
                return undefined;
            } else {
                return returnValue;
            }
        }
    }
    function setData(e, name, value) {
        if (e.dataset) {
            e.dataset[name] = value;
        } else {
            switch (value) {
                case undefined:
                    value = "undefined";
                    break;
                case null:
                    value = "null";
                    break;
                default:
                    value = value.toString();
            }
            e.setAttribute("data-" + parseName(name), value);
        }
    }
    Element.prototype.data = function (/*string*/name,/*string*/value) {
        if (arguments.length === 1) {
            return getData(this, name);
        } else {
            setData(this, name, value);
        }
    };

    //ie8 getBoundingClientRect bug
    if(namespace.browser.version&&namespace.browser.version===8){
        const rawGetRect = Element.prototype.getBoundingClientRect;
        Element.prototype.getBoundingClientRect = function () {
            const boxE = this::rawGetRect();
            return {
                top:boxE.top,
                bottom:boxE.bottom,
                left:boxE.left,
                right:boxE.right,
                width:boxE.right-boxE.left,
                height:boxE.bottom-boxE.top
            };
        };
    }

    //requestAnimationFrame
    const frameTime = 16.7;//帧时长
    const startTime = new Date().getTime();//计时时间
    let lastTime = startTime;
    const vendors = ['webkit', 'moz'];

    for (let x = 0; x < vendors.length && !global.requestAnimationFrame; ++x) {
        global.requestAnimationFrame = global[vendors[x] + 'RequestAnimationFrame'];
        global.cancelAnimationFrame = global[vendors[x] + 'CancelAnimationFrame'] ||    // Webkit中此取消方法的名字变了
            global[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!global.requestAnimationFrame) {
        global.requestAnimationFrame = function (callback, element) {
            const currTime = new Date().getTime();
            const frameTimeTimes = (currTime - lastTime) / frameTime;
            const ceilFrameTimeTimes = Math.ceil(frameTimeTimes);

            const timeToCall = (ceilFrameTimeTimes - frameTimeTimes) * frameTime;
            const id = global.setTimeout(callback, timeToCall, currTime + timeToCall - startTime);
            lastTime = lastTime + (ceilFrameTimeTimes - 1) * frameTime;
            return id;
        };
    }
    if (!global.cancelAnimationFrame) {
        global.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
    }

    if(namespace.browser.version<=9){
        const placeHolderClassName='libPlaceHolder';
        namespace.polyfill.placeHolder = function(textField){
            //don't do anything if the place holder attribute is not
            //defined or is blank..
            /*var placeHolder = textField.getAttribute('placeholder');        
            if(!placeHolder)
                return;*/
            
            //if it's just the empty string do nothing..
            /*placeHolder = placeHolder.trim();
            if(placeHolder === '')
                return;*/
            
            //called on blur - sets the value to the place holder if it's empty..
            
            if(textField._$placeholderInit) return;
            
            textField._$placeholderInit=true;
            
            
            if(this.type==='checkbox'||this.type==='radio') return;
            
            function check(){
                let placeholder= textField.getAttribute('placeholder');
                placeholder&&(placeholder=placeholder.trim());
                
                if(placeholder&&textField.value === ''){ //a space is a valid input..
                    textField.value = placeholder;
                    textField.classList.add(placeHolderClassName);
                }
            };
            
            //the blur event..
            textField.on('blur', check, false);
            //the focus event - removes the place holder if required..
            textField.on('focus', function(){
             if(textField.classList.contains(placeHolderClassName)){
                textField.classList.remove(placeHolderClassName);
                textField.value = "";
             }
            }, false);
            textField.on('placeHolder:fresh',check);
    
             //the submit event on the form to which it's associated - if the
             //placeholder is attached set the value to be empty..
             //var form = textField.form;
             /*if(form){
                 form.on('submit', function(){
                     if(textField.classList.contains( placeHolderClassName))
                         textField.value = '';
                }, false);
             }*/
    
             check(); //call the onBlur to set it initially..
        };
        
        //Object.defineProperty(HTMLInputElement.prototype,'_$value', Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value'));
        //Object.defineProperty(HTMLTextAreaElement.prototype,'_$value', Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,'value'));
        
        const desc={
            get(){
                if(this.type==='checkbox'||this.type==='radio') return this.value;
                
                if(this.classList.contains(placeHolderClassName))return '';
                else return this.value;
            },
            set(v){
                if(this.type==='checkbox'||this.type==='radio') return this.value=v;
                
                let placeholder= this.getAttribute('placeholder');
                placeholder&&(placeholder=placeholder.trim());
                
                if(placeholder){
                    if(v===''){
                        this.value = placeholder;
                        this.classList.add(placeHolderClassName);
                        
                        if(!this._$type){this._$type=this.type};
                        
                        try{this.type='text'}catch(e){}
                    }else{
                        this.classList.remove(placeHolderClassName)
                        this.value=v;
                        try{  this._$type&&(this.type=this._$type); }catch(e){}
                    }
                }else{
                    this.value=v;
                }
            }
        }
        if(namespace.browser.version===9){ desc.configurable=true;desc.enumerable=true; }
        
        Object.defineProperty(HTMLInputElement.prototype,'$value',desc);
        Object.defineProperty(HTMLTextAreaElement.prototype,'$value',desc);
        
        global.on('load',function(){
            const inputs=$a('input');
            const textareas=$a('textarea');
            
            for(let i = 0;i<inputs.length;++i){
                namespace.polyfill.placeHolder(inputs[i]);
            }
            for(let i = 0;i<textareas.length;++i){
                namespace.polyfill.placeHolder(textareas[i]);
            }
        });
    }else{
        const desc={
            configurable: true, enumerable: true,
            get(){ return this.value; },
            set(v){ this.value=v; }
        };
        Object.defineProperty(HTMLInputElement.prototype,'$value',desc);
        Object.defineProperty(HTMLTextAreaElement.prototype,'$value',desc);
    }
})(window,window[NAMESPACE]);