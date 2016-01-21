/**
 * Created by wangkehan on 15/12/9.
 */

const Http = {
    /**
     * _url,ajax请求的url
     * _data,json数据
     * _pfun,回调函数
     */
        post(_url, _data, _pfun, _async) {
        if (!arguments[2]) _pfun = function () {
        };
        if (undefined == _async) _async = true;
        $.ajax({
            type: 'POST',
            async: _async,
            url: _url,
            data: _data,
            datatype: 'json',
            beforeSend(request) {
                //request.setRequestHeader("req-type", "jouker-ajax");
            },
            success(data) {
                // code 一定为数字，0是正常 ，大于0为业务处理，小于0为公共处理
                if (0 > data.code) {
                    alert(data.msg);
                    return;
                }
                _pfun(data);
            },
            error(data) {
                alert('对不起，服务器报文格式错误，请截图联系管理员！');
            }
        });
        return true;
    },

    uploadFile(key, token, file, callback) {
        const formdata = new FormData();
        formdata.append("key", key);
        formdata.append("token", token);
        formdata.append('file', file);

        const xhr = new XMLHttpRequest();
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
        xhr.onerror = function () {
        };
        xhr.ontimeout = function () {
        };

        xhr.send(formdata);
    }
};

const TableWidget = {
    tableOperation: function tableOperation(data, type, full) {
        return `<div class="action-buttons">
					<a class="blue" href="#">
						<i class="ace-icon fa fa-search-plus bigger-130"></i>
					</a>
					<a class="green" href="#">
						<i class="ace-icon fa fa-pencil bigger-130"></i>
					</a>
					<a class="red" href="#">
						<i class="ace-icon fa fa-trash-o bigger-130"></i>
					</a>
				</div>`;
    },
    tableOperation2: function tableOperation(data, type, full) {
        return `<div class="action-buttons">
					<a class="blue" href="#">
						<i class="ace-icon fa fa-search-plus bigger-130"></i>
					</a>
				</div>`;
    },
    tableUrl: function tableUrl(data, type, full) {
        if (data && 'http' == data.substring(0, 4)) return `<a href="${data}" target="_blank">${data}</a>`;
        return data;
    },
    tableUrl2: function tableUrl2(data, type, full) {
        let html = '';
        for (let [key,value] of Object.entries(data)) {
            html += `<a target="_blank" href="${value}">${key}</a>,`
        }
        return html.substr(0, html.length - 1);
    },
    tableClone: function () {
        return `<div class="action-buttons ">
					<a class="edit green" href="#">
						<i class="ace-icon fa fa-pencil bigger-130"></i>编辑
					</a>
					<a class="red" href="#">
						<i class="ace-icon fa fa-trash-o bigger-130"></i>删除
					</a>
				</div>`;
    },
    tableCrawl: function (data, type, row) {
        //var  table = $('#crawl').DataTable();
        //console.log( table.cell( this ).index().row);
        if (row[2] != 1) {
            return `<div class="action-buttons">
					<a class="edit green" href="#">
						<i class="ace-icon fa fa-pencil bigger-130"></i>
						<!--编辑-->
					</a>
					</div>`;
        } else {
            return `<div class="action-buttons">
					<a class="edit green" href="#" title="编辑">
						<i class="ace-icon fa fa-pencil bigger-130"></i>
						<!--编辑-->
					</a>
					<a class="crawl" href="#" title="抓取">
						<i class="ace-icon fa fa-hand-grab-o bigger-130"></i>
						<!--抓取-->
					</a>
					<a class="red" href="#" title="删除">
						<i class="ace-icon fa fa-trash-o bigger-130"></i>
						<!--删除-->
					</a>
				</div>`;
        }

    },
    tablePending: function () {
        return `<div class="action-buttons">
					<a class="edit green"  href="#"  title="编辑">
						<i class="ace-icon fa fa-pencil bigger-130"></i>
					</a>
					<a class="clone" href="#" title='克隆'>
						<i class="ace-icon fa fa-copy bigger-130"></i>
						<!--克隆-->
					</a>
					<a class="red" href="#" title="删除">
						<i class="ace-icon fa fa-trash-o bigger-130"></i>
						<!--删除-->
					</a>
				</div>`;
    },
    tableUpdate: function () {
        return `<div class="action-buttons">
					<a class="edit green" href="#" title="编辑">
						<i class="ace-icon fa  fa-pencil bigger-130"></i>
						<!--编辑-->
					</a>
				</div>`;
    },
    tableOnline: function () {
        return `<div class="action-buttons">
					<a class="view blue" href="#"  title="查看">
						<i class="ace-icon fa fa-search-plus bigger-130"></i>
						<!--查看-->
					</a>
					<a class="edit green" href="#"  title="编辑">
						<i class="ace-icon fa fa-pencil bigger-130"></i>
						<!--编辑-->
					</a>
					<a class="clone" href="#"  title="克隆">
						<i class="ace-icon fa fa-copy bigger-130"></i>
						<!--克隆-->
					</a>
				</div>`;
    },
    tableOffline: function () {
        return `<div class="action-buttons ">

					<a class="edit green" href="#" title="编辑">
						<i class="ace-icon fa  fa-pencil bigger-130"></i>
						<!--编辑-->
					</a>
					<a class="clone" href="#" title="克隆">
						<i class="ace-icon fa fa-copy bigger-130"></i>
						<!--克隆-->
					</a>
				</div>`;
    },

    orderTableAll: function () {
        return `<div class="action-buttons ">
					<a class="view blue" href="#">
						<i class="ace-icon fa fa-search-plus bigger-130"></i>
						<!--查看-->
					</a>
				</div>`;
    },
    orderTablePending: function () {
        return `<div class="action-buttons ">
					<a class="view blue" href="#">
						<i class="ace-icon fa fa-search-plus bigger-130"></i>
						<!--查看-->
					</a>
					<a class="pending green" href="#">
					    <i class="ace-icon fa fa-pencil bigger-130"></i>
						<!--<i class="ace-icon fa fa-gavel bigger-130"></i>确认-->
					</a>
				</div>`;

    },
    orderTableError: function () {
        return `<div class="action-buttons ">
					<a class="view blue" href="#">
						<i class="ace-icon fa fa-search-plus bigger-130"></i>
						<!--查看-->
					</a>
					<a class="error red" href="#">
					    <i class="ace-icon fa fa-pencil bigger-130"></i>
						<!--<i class="ace-icon fa fa-fire-extinguisher bigger-130"></i>-->
						<!--错误处理-->
					</a>
				</div>`;

    },
    orderTableSending: function () {
        return `<div class="action-buttons ">
					<a class="view blue" href="#">
						<i class="ace-icon fa fa-search-plus bigger-130"></i>
						<!--查看-->
					</a>
					<a class="sending green" href="#">
					    <i class="ace-icon fa fa-pencil bigger-130"></i>
						<!--<i class="ace-icon fa fa-car bigger-130"></i>发货-->
					</a>
				</div>`;

    },
    orderTableDone: function () {
        return `<div class="action-buttons ">
					<a class="view blue" href="#">
						<i class="ace-icon fa fa-search-plus bigger-130"></i>
						<!--查看-->
					</a>
					<a class="done green" href="#">
						<i class="ace-icon fa fa-pencil bigger-130"></i>
						<!--编辑-->
					</a>
				</div>`;

    },
    orderTableRefunding: function () {
        return `<div class="action-buttons ">
					<a class="view blue" href="#">
						<i class="ace-icon fa fa-search-plus bigger-130"></i>
						<!--查看-->
					</a>
					<a class="refunding green" href="#">
					    <i class="ace-icon fa fa-pencil bigger-130"></i>
						<!--<i class="ace-icon fa fa-eraser bigger-130"></i>-->
						<!--退款-->
					</a>
				</div>`;

    },
    orderTableRefunded: function () {
        return `<div class="action-buttons ">
					<a class="refunded green" href="#">
					    <i class="ace-icon fa fa-search-plus bigger-130"></i>
						<!--<i class="ace-icon fa fa-bank bigger-130"></i>-->
						<!--查看退款-->
					</a>
				</div>`;

    },


};

/*-wangkehan-*/

const zouke = {};

(()=>{
    let query=null;
    Object.defineProperty(zouke,'args',{
        get(){
            if(!query){
                query={};
                if(location.search!=''){
                    const parts=location.search.substr(1).split('&');
                    for (let p of parts){
                        if(p.includes('=')){
                            let [key,...value]=p.split('=');
                            query[key] = decodeURIComponent(value.join('='));
                        }else{
                            query[p]='';
                        }
                    }
                }
            }
            return query;
        }
    })
})();

(()=> {
    zouke.table = {
        getRender (buttons) {
            return function (data, type, rowData, meta) {
                if (type === 'display'){
                    let btn = '';

                    for (let {name,cls} of Array.isArray(buttons)?buttons:buttons(data,type,rowData,meta)){
                        btn += `
    <a data-row="${meta.row}" data-id="${rowData[0]}" class="${cls}" href="#" title="${name}">
    </a>`
                    }
                    return (
                        `<div class="action-buttons ">${btn}</div>`);
                }
                return null;
            }
        },
        defaultButtons:{
            get view(){
                return {
                    name:'查看',
                    cls:'view blue ace-icon fa fa-search-plus bigger-130'
                }
            },
            get edit(){
                return {
                    name:'编辑',
                    cls:'edit green ace-icon fa fa-pencil bigger-130'
                }
            },
            get clone(){
                return {
                    name:'克隆',
                    cls:'clone ace-icon fa fa-copy bigger-130'
                }
            },
            get remove(){
                return {
                    name:'删除',
                    cls:'remove red act-icon fa fa-times bigger-130'
                }
            },
            get undo(){
                return {
                    name:'恢复',
                    cls:'undo ace-icon fa fa-undo bigger-130'
                }
            },
            get debit(){
                return {
                    name:'催款',
                    cls:'debit ace-icon fa fa-money bigger-130'
                }
            },
            get book(){
                return {
                    name:'预订',
                    cls:'book ace-icon fa fa-money bigger-130'
                }
            },
            get exp(){
                return {
                    name:'导出',
                    cls:'exp ace-icon fa fa-sign-out bigger-130'
                }
            }
        },
        selector(container){
            return {
                getDom(name){
                    if (! this[name]){
                        this[name] = container.$(`#${name} table`);
                    }
                    return this[name];
                },
                get$(name){
                    const cacheName = '$' + name;
                    if (! this[cacheName]){
                        this[cacheName] = $(this.getDom(name));
                    }
                    return this[cacheName];
                }
            };
        }
    }
})();

(()=> {
    Document.prototype.$=Document.prototype.querySelector;
    Document.prototype.$a=Document.prototype.querySelectorAll;
    Element.prototype.$=Element.prototype.querySelector;
    Element.prototype.$a=Element.prototype.querySelectorAll;
    Node.prototype.on=Node.prototype.addEventListener;
    Node.prototype.off=Node.prototype.removeEventListener;
    Window.prototype.on=Window.prototype.addEventListener;
    Window.prototype.off=Window.prototype.removeEventListener;

    const eventNotPropagation = { focus: true, blur: true, mouseenter: true, mouseleave: true, load: true, readystatechange: true, error: true, input: true, propertychange: true };//不进行事件传播的事件类型
    Node.prototype.trigger=function(type,data){
        const e = type instanceof Event?type:document.createDispatchEvent(type.toString());
        if(data){
            event.data=data;
        }
        this.dispatchEvent(e);
    };
    document.createDispatchEvent=function (/*string*/type,/*object*/option={}) {
        /*
        * eventType:HTMLEvents/UIEvents/MouseEvents
        * */
        option.bubbles = "bubbles" in option ? option.bubbles : !!eventNotPropagation[type];
        const eventType = option.eventType || 'HTMLEvents';

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

    function uploadFileToQNAsync(token, file, key){
        const formdata = new FormData();
        formdata.append("key", key);
        formdata.append("token", token);
        formdata.append('file', file);

        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://upload.qiniu.com/");
        //xhr.setRequestHeader("content-type","multipart/form-data");

        xhr.timeout = 10000;

        const promise = new Promise((r, j)=> {
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
                            j(this.status)
                        }
                    }
                }
            };
            xhr.onerror = function () {
                j();
            };
            xhr.ontimeout = function () {
                j("timeout")
            };
        });


        xhr.send(formdata);
        return promise;
    }
    async function uploadFileWithSaveBaseInfoAsync(token,cdn,file,name,pkey){
        const result = await uploadFileToQNAsync(token, file, name);
        const src=encodeURI(cdn+result.key);
        const baseInfo = await zouke.resource.getImageInfoAsync(src);

        let info={
            pkey,
            type:'f',
            name:file.name,
            width:baseInfo.width,
            height:baseInfo.height,
            size:(file.size/1024).toFixed(2),
            src
        };
        info.key = (await zouke.resource.postAsync('/file/createfile',info)).key;
        delete info.pkey;

        return info;
    }

    Object.assign(window.zouke, {
        net: {
            fetchAsync(url, {headers={},data={}}={}){
                const method = 'POST';

                Object.assign(headers, {
                    "X-Requested-With": "XMLHttpRequest",
                    "credentials": 'same-origin',
                    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                });

                return window.fetch(url, {
                    method,
                    headers,
                    body:formUrlEncode(data)
                })
            },
            async uploadFileAsync(file,pkey='50000'){
                const {token,cdn}=await zouke.resource.postAsync('/utils/getToken2');
                return await uploadFileWithSaveBaseInfoAsync(token, cdn, file, `library/${pkey}/${new Date().valueOf()}_${Math.round(Math.random() * 10000)}_${escape(file.name).replace(/-/g,'%2d')}`, pkey);
            },
            async uploadFileListAsync(files,pkey='50000'){
                const {token,cdn}=await zouke.resource.postAsync('/utils/getToken2');
                const timestrip=(new Date()).valueOf();
                const r=[];
                for(let i=0;i<files.length;++i){
                    r.push(await uploadFileWithSaveBaseInfoAsync(token,cdn,files[i],`library/${pkey}/${timestrip}_${Math.round(Math.random() * 10000)}_${escape(files[i].name).replace(/-/g,'%2d')}`, pkey).catch(()=>{
                        return {};
                    }))
                }
                return r;
            }
        },
        resource: {
            async postAsync(url, data){
                const response = await window.zouke.net.fetchAsync(url, {data});
                const json = await response.json();
                if (json.code < 0) {
                    alert(json.msg);
                    throw json.code;
                }
                return json;
            },
            async getImageInfoAsync(url){
                const json = await (await window.fetch(url+'?imageInfo')).json();
                if(json.code) throw(json.error);
                return json;
            }
        },
        $(cssSelect, node=document){
            return node.querySelector(cssSelect);
        },
        $a(cssSelect, node=document){
            return node.querySelectorAll(cssSelect);
        }
    });
})();

(()=> {
    const i = new Image()
    i.src = "http://www.ouutrip.com/assets/img/favicon.ico";
    i.style.opacity = 0;
    i.style.position="absolute";
    i.style.top="0";
    i.style.pointerEvents="none";

    document.on('DOMContentLoaded',()=>{
        document.body.appendChild(i);
    });

    const eventHandle = {
        handleEvent(e){
            switch (e.type) {
                case "dragstart":
                    this.dragstart(e);
                    break;
                case 'drag':
                    this.drag(e);
                    break;
            }
        },
        dragstart(e){
            if (e.target !== e.currentTarget) return;
            if (!e.target.querySelector(e.target.dataset.dragHandle).contains(document.elementFromPoint(e.clientX, e.clientY))) {
                e.preventDefault();
            }
            this.x = e.screenX;
            this.y = e.screenY;
            e.dataTransfer.setDragImage(i, 0, 0);
        },
        drag(e){
            if (e.target !== e.currentTarget) return;
            if (e.clientX === 0 && e.clientY === 0 && e.screenX === 0 && e.screenY === 0) {
                //chrome bug
                return;
            }

            const mx = e.screenX - this.x;
            const my = e.screenY - this.y;
            if (mx === 0 && my === 0) {
                return;
            }

            this.x = e.screenX;
            this.y = e.screenY;
            const nx = parseInt(e.target.dataset.dragX, 10) + mx;
            const ny = parseInt(e.target.dataset.dragY, 10) + my;
            e.target.style.transform = `translate(${nx}px,${ny}px)`;
            e.target.style.webkitTransform = `translate(${nx}px,${ny}px)`;
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
    }
})();

(()=> {
    const pri = new WeakMap();

    class Item {
        constructor() {
            const itemDom = document.createElement('div');
            itemDom.classList.add('item');
            itemDom.draggable = true;
            itemDom.tabIndex = '1';
            itemDom.innerHTML = `
<div class="img"></div>
<div class="name">
    <span></span>
    <input style="display:none;"/>
</div>`;
            const img = itemDom.querySelector('.img');
            const name = itemDom.querySelector('.name>span');
            const rename = itemDom.querySelector('.name>input');

            pri.set(this, {itemDom, img, name, rename});
        }

        render(info = null) {
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
            const v = pri.get(this);
            v.info = info;

            const {itemDom,img,name,rename} = v;

            if (info) {
                const url = info.type === 'f' ? info.src : 'http://7jpru6.com1.z0.glb.clouddn.com/Folder%20blue.png';
                itemDom.style.display = '';
                itemDom.dataset.key = info.key;
                img.style.backgroundImage = `url(${url})`;
                name.innerText = rename.value = info.name;
            } else {
                itemDom.style.display = 'none';
                itemDom.dataset.key = '';
                img.style.backgroundImage = '';
                name.innerText = rename.value = '';
            }
        }

        deleteAsync() {
            if(window.confirm(`确定要删除 ${this.info.name} ${this.isDir()?"文件夹":"文件"}吗?`)){
                if(this.isDir()){
                    if(window.confirm('删除文件夹将删除该文件夹下所有文件,确认删除?')){
                        return zouke.resource.postAsync('/file/deletefile',{key:this.info.key});
                    }
                }else{
                    return zouke.resource.postAsync('/file/deletefile',{key:this.info.key});
                }
            }
            return Promise.reject('fail');
        }

        moveToAsync(key) {
            return zouke.resource.postAsync('/file/movefile',{key:this.info.key,move_to_key:key})
        }

        clearStatus(){
            pri.get(this).rename.blur();
        }

        renameAsync() {
            let r;
            let p = new Promise((_r)=>{r=_r;});

            let { name,rename }=pri.get(this);

            let oriName=this.info.name;
            let key=this.info.key;

            name.style.display='none';
            rename.style.display='';

            rename.focus();
            rename.selectionStart=0;
            if(this.isDir()){
                rename.selectEnd=rename.value.length;
            }else{
                rename.selectEnd=name.value.lastIndexOf('.');
            }

            function blur(e){
                rename.off('blur',blur);
                let n=e.target.value.trim();
                name.innerText=n;
                name.style.display='';
                rename.style.display='none';

                if(n!==oriName){
                    r(zouke.resource.postAsync('/file/renamefile',{key,name:n}).then(function(){return n;}));
                }else{
                    r(Promise.resolve(oriName));
                }
            }

            rename.on('blur',blur);

            return p;
        }

        get itemDom() {
            return pri.get(this).itemDom;
        }

        get key() {
            return pri.get(this).info.key;
        }

        isFile() {
            return pri.get(this).info.type === 'f';
        }

        isDir() {
            return pri.get(this).info.type === 'd';
        }

        get info() {
            return pri.get(this).info;
        }
    }

    class ImageForm {
        constructor() {
            const chooseItemInfos = [];
            chooseItemInfos.keyList = [];
            pri.set(this, {
                isInit: false,
                isShow: false,
                path: [],
                pathKey:[],
                libraryItemInfos: [],
                chooseItemInfos,
                rootkey:'',
                r:null,
                initItemInfos:[],
                libraryItems: [],
                chooseItems: []
            });
        }

        async showAsync(initItemInfos=[],root='60001') {
            const pv = pri.get(this);
            if (!pv.isShow) {
                if (!pv.isInit) {
                    pv.isInit=true;
                    initForm(pv);
                    document.body.appendChild(pv.form);
                    setTimeout(()=> {
                        pv.form.classList.add('open')
                    }, 100);
                } else {
                    pv.form.classList.add('open');
                }
                pv.isShow=true;
                pv.initItemInfos=initItemInfos;
                for(let item of initItemInfos){
                    pv.chooseItemInfos.push(item);
                    pv.chooseItemInfos.keyList.push(item.key);
                }
                pv.rootkey=root;
                await freshAsync(pv);
                return new Promise((r)=>{pv.r=r});
            }
        }
        isShow(){
            return pri.get(this).isShow;
        }
    }

    async function freshAsync(pv) {
        showLoading(pv);
        try {
            pv.libraryItemInfos = (await zouke.resource.postAsync('/file/getfolderInfo',{key:pv.pathKey.length>0?pv.pathKey[pv.pathKey.length-1]:pv.rootkey})).files
        } finally {
            hideLoading(pv);
        }
        if (pv.path.length > 0) {
            pv.libraryItemInfos.unshift({
                key: pv.pathKey[pv.pathKey.length-2]||pv.rootkey,
                name: '上一级',
                type: 'p'
            })
        }
        if (pv.chooseItemInfos.length > 0) {
            for (let info of pv.libraryItemInfos) {
                let index = pv.chooseItemInfos.keyList.indexOf(info.key);
                if (index !== -1) {
                    pv.chooseItemInfos[index] = info;
                }
            }
        }
        render(pv);
    }

    function render(pv) {
        document.activeElement.blur();
        const {libraryItemInfos,chooseItemInfos,libraryItems,libraryPath,chooseItems,libraryItemContainer,chooseItemContainer}=pv;

        let max = Math.max(libraryItemInfos.length, libraryItems.length);
        for (let i = 0; i < max; ++i) {
            if (!libraryItems[i]) {
                libraryItems[i] = new Item();
                libraryItems[i].itemDom.dataset.index = i;
                libraryItemContainer.appendChild(libraryItems[i].itemDom);
            }
            libraryItems[i].render(libraryItemInfos[i]);
        }

        let path = '<span data-index="-1">root</span>';
        for (let i = 0; i < pv.path.length; ++i) {
            path += `<span data-index="${i}">${pv.path[i]}</span>`;
        }
        libraryPath.innerHTML = path;


        max = Math.max(chooseItemInfos.length, chooseItems.length);
        for (let i = 0; i < max; ++i) {
            if (!chooseItems[i]) {
                chooseItems[i] = new Item();
                chooseItems[i].itemDom.dataset.index = i;
                chooseItemContainer.appendChild(chooseItems[i].itemDom);
            }
            chooseItems[i].render(chooseItemInfos[i]);
        }
    }

    function initForm(pv) {
        const form = document.createElement('section');
        form.classList.add('imageform');
        form.classList.add('_modal')
        form.innerHTML = `
<div class="container">
    <div class="loading">
        <i class="fa fa-spin fa-spinner"></i>
    </div>
    <div class="title">选择图片</div>
    <div class="main">
        <div class="tabs">
            <div data-for="0" class="select">图片库</div>
            <div data-for="1">已选图片</div>
        </div>
        <div class="_shadow"></div>
        <div class="bodys">
            <div class="select library">
                <div class="list">
                </div>
                <div class="ctrl">
                    <div class="info">
                        <div class="path">
                        </div>
                        <div class="fileinfo"></div>
                    </div>
                    <div>
                        <button>上传<input type="file" multiple accept=".png,.jpg"></button>
                        <button>新建文件夹</button>
                        <button>取消</button>
                        <button>确定</button>
                    </div>
                </div>
            </div>
            <div class="choose">
                <div class="list"></div>
                <div class="ctrl">
                    <div class="info">
                        <div class="fileinfo"></div>
                    </div>
                    <div>
                        <button>移除选择</button>
                        <button>取消</button>
                        <button>确定</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="menu">
        <div class="rename">重命名</div>
        <div class="delete">删除</div>
        <div class="toggle">加入选择</div>
    </div>
</div>`;

        const container = form.querySelector('.container');
        const tabContainer = form.querySelector('.tabs');
        const tabList = form.querySelectorAll('.tabs>div');
        const bodyContainer = form.querySelector('.bodys');
        const bodyList = form.querySelectorAll('.bodys>div');
        const libraryItemContainer = form.querySelector('.library>.list');
        const libraryButtons = form.querySelectorAll('.library>div:last-child button');
        const libraryFileInfo = form.querySelector('.library .fileinfo');
        const libraryPath = form.querySelector('.library .path');
        const chooseItemContainer = form.querySelector('.choose>.list');
        const chooseButtons = form.querySelectorAll('.choose>div:last-child button');
        const chooseFileInfo = form.querySelector('.choose .fileinfo');
        const loading = form.querySelector('.loading');
        const menu = form.querySelector('.menu');

        zouke.draggable(container, '.title');
        Object.assign(pv, {
            container,
            form,
            tabContainer,
            tabList,
            bodyContainer,
            bodyList,
            libraryItemContainer,
            libraryButtons,
            libraryFileInfo,
            libraryPath,
            chooseItemContainer,
            chooseButtons,
            chooseFileInfo,
            loading,
            menu
        });
        listener(pv);
    }

    function listener(pv) {
        const {
            container,
            form,
            tabContainer,
            tabList,
            bodyContainer,
            bodyList,
            libraryItemContainer,
            libraryButtons,
            libraryFileInfo,
            libraryPath,
            chooseItemContainer,
            chooseButtons,
            chooseFileInfo,
            menu }=pv;

        tabContainer.addEventListener('click', (e)=> {
            const target = e.target;
            if (tabList::Array.prototype.includes(target)) {
                if (!target.classList.contains('select')) {
                    for (let tab of tabList) {
                        tab.classList.remove('select');
                    }
                    for (let body of bodyList) {
                        body.classList.remove('select');
                    }
                    target.classList.add('select');
                    bodyList[target.dataset.for].classList.add('select');
                }
            }
        }, true);
        libraryButtons[0].querySelector('input').on('change', async (e)=> {//上传
            showLoading(pv);
            const infoList = await zouke.net.uploadFileListAsync(e.target.files,pv.pathKey[pv.pathKey.length-1]||pv.rootkey);
            for(let info of infoList){
                if(info.key){
                    pv.libraryItemInfos.push(info);
                    pv.chooseItemInfos.push(info);
                    pv.chooseItemInfos.keyList.push(info.key);
                }
            }
            render(pv);
            hideLoading(pv);
        }, true);
        libraryButtons[1].on('click',async(e)=>{//新建文件夹
            let info = {
                pkey:pv.pathKey[pv.pathKey.length-1]||pv.rootkey,
                type:'d',
                name:'新建文件夹',
                width: 0,
                height:0,
                size:0,
                src:''
            };
            let index=-1;
            showLoading(pv);
            try{
                let key = (await zouke.resource.postAsync('/file/createfile', info)).key;
                info.key=key;
                delete info.pkey;
                index=0;
                if(pv.path.length>0){
                    index=1;
                    pv.libraryItemInfos.splice(1,0,info);
                }else{
                    pv.libraryItemInfos.unshift(info);
                }
                render(pv);

            }finally{
                hideLoading(pv);
            }

            if(index>-1){
                let p = await pv.libraryItems[index].renameAsync();
                try{
                    showLoading(pv);
                    pv.libraryItemInfos[index].name = await p;
                    render(pv);
                }finally{
                    hideLoading(pv);
                }
            }

        });

        function cancel(){
            pv.r(pv.initItemInfos);
            pv.form.classList.remove('open');
            pv.isShow=false;
        }
        function ok(){
            pv.r(pv.chooseItemInfos);
            pv.form.classList.remove('open');
            pv.isShow=false;
        }
        libraryButtons[2].on('click',cancel);
        libraryButtons[3].on('click',ok);
        chooseButtons[1].on('click',cancel);
        chooseButtons[2].on('click',ok);

        let opItem = null, index = 0;
        container.on('contextmenu', (e)=> {
            e.preventDefault();
        });
        bodyList[0].on('contextmenu', (e)=> {//右键菜单
            if (e.target.classList.contains('item')) {
                index = parseInt(e.target.dataset.index, 10);
                opItem = pv.libraryItems[index];
                if (opItem.info.type === 'p') {
                    return;
                }

                const toggle = pv.menu.querySelector('.toggle');
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
                const rect = container.getBoundingClientRect()
                showMenu(pv, e.clientX - rect.left, e.clientY - rect.top);
            }
        });
        document.on('click', ()=> {
            hideMenu(pv);
        }, true);

        menu.on('click', async (e)=> {//点击菜单
            switch (e.target.className) {
                case 'rename':
                    let p = await opItem.renameAsync();
                    try{
                        showLoading(pv);
                        pv.libraryItemInfos[index].name=await p;
                        render(pv);
                    }finally{
                        hideLoading(pv);
                    }
                    break;
                case 'delete':
                    try {
                        showLoading(pv);
                        await opItem.deleteAsync();
                        pv.libraryItemInfos.splice(index, 1);
                        render(pv);
                    } finally {
                        hideLoading(pv);
                    }
                    break;
                case 'toggle':
                    const i = pv.chooseItemInfos.keyList.indexOf(opItem.info.key);
                    if (i === -1) {
                        pv.chooseItemInfos.push(opItem.info);
                        pv.chooseItemInfos.keyList.push(opItem.info.key);
                    } else {
                        pv.chooseItemInfos.splice(i, 1);
                        pv.chooseItemInfos.keyList.splice(i, 1);
                    }
                    render(pv);
                    break;
            }
        });

        libraryItemContainer.on('click', (e)=> {//显示文件信息
            e.stopPropagation();
            if (e.target.classList.contains('item')) {
                const item = pv.libraryItems[e.target.dataset.index];
                const info = item.info;
                if (item.isFile()) {
                    libraryFileInfo.innerHTML = `width&ensp;<span>${info.width}</span>&emsp;&emsp;height&ensp;<span>${info.height}</span>&emsp;&emsp;size&ensp;<span>${info.size}k</span>`;
                    return;
                }
            }
            libraryFileInfo.innerHTML = '';
        }, true);

        chooseItemContainer.on('click', (e)=> {//显示文件信息
            e.stopPropagation();
            if (e.target.classList.contains('item')) {
                const item = pv.chooseItems[e.target.dataset.index];
                const info = item.info;

                if (item.isFile()) {
                    chooseFileInfo.innerHTML = `width&ensp;<span>${info.width}</span>&emsp;&emsp;height&ensp;<span>${info.height}</span>&emsp;&emsp;size&ensp;<span>${info.size}k</span>`;
                    return;
                }
            }
            chooseFileInfo.innerHTML = '';
        }, true);

        form.on('click', (e)=> {//清除文件信息
            libraryFileInfo.innerHTML = '';
            chooseFileInfo.innerHTML = '';
        });

        libraryItemContainer.on('dblclick', (e)=> {//进入文件夹
            if (e.target.classList.contains('item')) {
                const info = pv.libraryItemInfos[e.target.dataset.index];
                switch (info.type) {
                    case 'p':
                        pv.path.pop();
                        pv.pathKey.pop();
                        freshAsync(pv);
                        break;
                    case 'd':
                        pv.path.push(info.name);
                        pv.pathKey.push(info.key);
                        freshAsync(pv);
                        break;
                }
            }
        });
        libraryPath.on('click', function (e) {//进入目录
            if (e.target.parentElement === libraryPath){
                const index = parseInt(e.target.dataset.index, 10);
                pv.path = pv.path.slice(0, index + 1);
                pv.pathKey = pv.pathKey.slice(0, index + 1);
                freshAsync(pv);
            }
        });


        //drag event
        const dndHandle = {
            handleEvent(e){
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
            dragstart(e){
                const index = e.target.dataset.index;
                const info = pv.libraryItemInfos[index];
                const item = pv.libraryItems[index];
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
            dragend(e){
                e.target.style.opacity = '';
                e.target.classList.remove('dragging');
                delete this.item;
            },
            dragenter(e){
                if(e.target.classList.contains('item')){
                    const itemDom = e.target;
                    if (itemDom !== this.preItemDom){
                        this.preItemDom && this.preItemDom.classList.remove('drop');
                        this.preItemDom = null;
                        if (itemDom&&!e.target.classList.contains('dragging')){
                            const type = pv.libraryItemInfos[itemDom.dataset.index].type;
                            if (type === 'd' || type === 'p'){
                                itemDom.classList.add('drop');
                                this.preItemDom = itemDom;
                            }
                        }
                    }
                }
            },
            dragover(e){
                e.preventDefault();
            },
            async drop(e){
                if (this.preItemDom) {
                    showLoading(pv);
                    try {
                        const item = this.item;
                        await this.item.moveToAsync(this.preItemDom.dataset.key);
                        pv.libraryItemInfos.splice(parseInt(item.itemDom.dataset.index, 10), 1);
                        render(pv);
                    } finally {
                        this.preItemDom.classList.remove('drop');
                        hideLoading(pv);
                    }
                    delete this.preItemDom;
                }
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

