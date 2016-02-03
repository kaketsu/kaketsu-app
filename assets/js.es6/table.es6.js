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