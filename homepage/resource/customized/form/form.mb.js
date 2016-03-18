/**
 * Created by wangkehan on 15/12/25.
 */
try{
    (function (global, namespace) {
        FastClick.attach(document.body);
        //patch old android explorer view height with keyboard up
        /*if (navigator.userAgent.includes('Android')){
            const container = $('body>div.container');
            container.style.height = container.getBoundingClientRect().height + "px";
            const style = document.createElement('style');
            const height = $('body>div.container>.form input').getBoundingClientRect().height
            style.innerHTML = `
body>div.container>.form input{height:${height}px;}
body>div.container>.form .btn-validate{height:${height}px;line-height:${height}px}`;
            document.head.appendChild(style);
        }*/

        const form = $('.form');
        const name = form.$('.name');
        const dest = form.$('.dest');
        const number = form.$('.number');
        const days = form.$('.days');
        const phone = form.$('.phone');
        const code = form.$('.code');
        const remark = form.$('.remark');
        const validateBtn = form.$('.btn-validate');
        const submit = form.$('.submit');

        const modal = $('.modal.success-box');
        const modalOk = modal.$('.btn');

        let time = 0;

        function check(target) {
            target && target.classList.remove('warn');
            if (phone.validity.valid && phone.value.length > 0 && time === 0){
                validateBtn.classList.remove('btn-disabled');
            }else{
                validateBtn.classList.add('btn-disabled');
            }
            if (name.value.trim().length > 0 && phone.validity.valid && phone.value.length > 0 && code.value.trim().length > 0){
                submit.classList.remove('disabled')
            }else{
                submit.classList.add('disabled');
            }
        }

        form.on('input', (e)=> {
            check(e.target);
        }, true);

        validateBtn.on('click', async function (e) {
            if (! e.target.classList.contains('btn-disabled')){
                const result = await namespace.resource.postJSONAsync('/utils/getmbcaptcha', { mobile : phone.value });
                if (result.code === 0){
                    time = 60;
                    check();
                    startTiming();
                }else{
                    namespace.message.alertAsync(result.msg);
                }
            }
        });

        function startTiming() {
            const f = ()=> {
                -- time;
                if (time > 0){
                    validateBtn.innerText = `重新获取(${time}s)`;
                    startTiming._t = setTimeout(f, 1000);
                }else{
                    validateBtn.innerText = '重新获取';
                    check();
                }
            };
            f();
        }

        function stopTiming() {
            if ('_t' in startTiming){
                clearTimeout(startTiming._t);
                delete startTiming._t;
                time = 0;
                validateBtn.innerText = '重新获取';
                check();
            }
        }

        submit.on('click', async function (e) {
            if (! e.target.classList.contains('disabled')){
                e.target.classList.add('disabled');
                let result = null;
                try{
                    result = await namespace.resource.postJSONAsync('/customized/commit', {
                        name : name.value.trim(),
                        dest : dest.value.trim(),
                        remark : remark.value.trim(),
                        number : number.value.trim(),
                        days : days.value.trim(),
                        phone : phone.value.trim(),
                        code : code.value.trim()
                    });
                }finally{
                    e.target.classList.remove('disabled');
                }

                if (result){
                    if (result.code === 0){
                        modal.classList.add('show');
                    }else{
                        namespace.message.alertAsync(result.msg);
                    }
                }else{
                    namespace.message.alertAsync('网络错误')
                }
            }else{
                if (name.value.trim() === ''){
                    name.classList.add('warn');
                }else if (phone.value.trim() === ''){
                    phone.classList.add('warn');
                }else if (code.value.trim() === ''){
                    code.classList.add('warn');
                }
            }
        });
        modalOk.on('click', ()=> {
            modal.classList.remove('show');
            form.reset();
            stopTiming();

            //返回
            history.back();
        });

    })(window, window[NAMESPACE]);
}catch(e){
    alert(e.message);
}