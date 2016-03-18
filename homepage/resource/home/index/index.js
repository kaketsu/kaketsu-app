const container=$('.wheel-container');

(function(global,ns){
    const scroll=[0,0,0];
    const tabContainer=$('body>header .tab');
    const tabs=$a('body>header .tab>a');
    for(let i = 0;i<tabs.length;++i){
        tabs[i].data('index',i);
    }

    const storyTitleDom=ns.platform.isTablet()?$('.story>div'): $('.story>.content>div');
    const cusTitleDom=ns.platform.isTablet()?$('.cus>div'):$('.cus>.content>div');

    function getShowTop(dom){
        const rect=dom.getBoundingClientRect();
        return container.scrollTop+ rect.top - 70;
    }

    function resize(){
        scroll[1] = getShowTop(storyTitleDom);
        scroll[2] = getShowTop(cusTitleDom);
    }
    global.on('resize',resize);
    global.on('load',resize);
    global.on('DOMContentLoaded',resize);
    global.on('readystatechange',resize);
    resize();

    let nowIndex=0;
    function goto(index,trigger){
        if(trigger){
            container.trigger('wheel:to',{top:scroll[index]});
        }else{
            tabs[nowIndex].classList.remove('active');
            tabs[index].classList.add('active');
            nowIndex = index;
        }
    }

    //disable scroll:to when scroll
    const scrollTarget={
        t:0,
        _scrolling:false,
        index:false,
        getScrolling(){
            return this._scrolling;
        },
        setScrolling(v){
            this._scrolling=!!v;
            if(!this._scrolling&&this.index){
                tabClick(this.index)
            }
        }

    };

    function tabClick(e) {
        const index = e.target?e.target.data('index'):e;
        if (index){
            if (scrollTarget.getScrolling()){
                scrollTarget.index = index;
            }else{
                scrollTarget.index = false;
                goto(index, true);
            }
        }
    }
    tabContainer.on('click',tabClick);

    container.on('wheel:scroll',function(e){
        const top=e.$data.top;
        if(top>=scroll[0]&&top<scroll[1]) goto(0);
        else if(top>=scroll[1]&&top<scroll[2]) goto(1);
        else goto(2);

        scrollTarget.setScrolling(true);
        clearTimeout(scrollTarget.t);
        scrollTarget.t=setTimeout(()=>{scrollTarget.setScrolling(false)},100);
    });
})(window,window[NAMESPACE]);

//form submit
(function(global,ns){
    const dz=$('.dz');
    function openDZ(){
        stopTiming();
        getCode.innerText='获取验证码'
        name.$value=dest.$value=number.$value=days.$value=phone.$value=code.$value=remark.$value='';
        container.trigger('wheel:freeze');
        dz.classList.add('show');
    }
    function closeDZ(){
        container.trigger('wheel:unfreeze');
        dz.classList.remove('show');
    }
    
    let _$o=$a('.o');
    for(let i=0;i<_$o.length;++i){
        _$o[i].on('click',openDZ);   
    }

    const name = dz.$('.name');
    const dest = dz.$('.dest');
    const number = dz.$('.number');
    const days = dz.$('.days');
    const phone = dz.$('.phone');
    const getCode=dz.$('.b');
    const code = dz.$('.code');
    const remark = dz.$('.remark');
    const submit=dz.$('.s');

    dz.on('input',function(e){
        e.target.classList.remove('error');
    });

    let time = 0;
    function startTiming() {
        const f = ()=> {
            -- time;
            if (time > 0){
                getCode.innerText = `重新获取(${time}s)`;
                startTiming._t = setTimeout(f, 1000);
            }else{
                getCode.innerText = '重新获取';
                delete startTiming._t;
            }
        };
        f();
    }
    function stopTiming() {
        if ('_t' in startTiming){
            clearTimeout(startTiming._t);
            delete startTiming._t;
            time = 0;
            getCode.innerText = '重新获取';
        }
    }

    function checkNeed(){
        if(!name.$value) {name.classList.add('error');return false;}
        if(!phone.$value){phone.classList.add('error');return false;}
        if(!code.$value){code.classList.add('error');return false;}
        return true;
    }
    phone.on('input',function(e){
        if(/^\s*1[34578]{1}\d{9}\s*$/.test(phone.$value)){
            phone.classList.remove('error');
        }else{
            phone.classList.add('error');
        }
        e.stopPropagation();
    });

    submit.on('click',function(){
        if(checkNeed()&&submit.data('submit')!=='true'){
            submit.data('submit','true');
            
            ns.resource.postJSONAsync('/customized/commit', {
                name : name.$value.trim(),
                dest : dest.$value.trim(),
                remark : remark.$value.trim(),
                number : number.$value.trim(),
                days : days.$value.trim(),
                phone : phone.$value.trim(),
                code : code.$value.trim()
            }).then(function(result){
                submit.data('submit', 'false');
                if (result.code === 0){
                    ns.message.alertAsync('提交成功');
                    closeDZ();
                }else{
                    ns.message.alertAsync(result.msg);
                }
            }).catch(function(){
                ns.message.alertAsync('网络错误');
                submit.data('submit', 'false');
            });
        }
    });
    
    getCode.on('click',function(e){
        if(time===0){
            if(/^\s*1[34578]{1}\d{9}\s*$/.test(phone.$value)){
                ns.resource.postJSONAsync('/utils/getmbcaptcha', { mobile : phone.$value }).then(function(result){
                    if (result.code === 0){
                        time = 60;
                        startTiming();
                    }else{
                        ns.message.alertAsync(result.msg);
                    }
                });
                
            }else{
                phone.classList.add('error');
            }
        }
    });

    dz.$('.close').on('click',closeDZ);

})(window,window[NAMESPACE]);

if(window[NAMESPACE].platform.isTablet()){
    FastClick.attach(document.body)
    //swiper
    new Swiper('body>.container>.case',{
        pagination:'.swiper-pagination',
        paginationClickable:true,
        spaceBetween:10,
        loop:true,
        autoplay: 2500,
        autoplayDisableOnInteraction: false
    })
}else{
    //swiper
    (function(global,ns){
        const caseBox=$a('.case>.c');
        const op=$('.case>.op');

        for(let i = 0;i<caseBox.length;++i){
            const span=document.createElement('span');
            span.data('index',i);
            if(i===0){
                caseBox[i].classList.add('active');
                span.classList.add('active');
            }
            op.appendChild(span);
        }
        const opList=op.$a('span');

        caseBox[0].classList.add('active');
        op.firstElementChild.classList.add('active');

        const switchController={
            length:caseBox.length,
            index:0
        };

        function switchTo(index){
            if(index===switchController.index) return;
            caseBox[switchController.index].classList.remove('active');
            opList[switchController.index].classList.remove('active');
            caseBox[index].classList.add('active');
            opList[index].classList.add('active');
            switchController.index=index;
        }

        op.on('click',function(e){
            const target=e.target;
            const index=target.data('index');
            index&&switchTo(parseInt(index,10));
            stop();
            start();
        });

        function time(){
            let index=switchController.index;
            ++index;
            if(index>=switchController.length) index=0;
            switchTo(index);
            time._t=setTimeout(time,3000);
        }
        time._t=0;
        function start(){
            time._t=setTimeout(time,3000);
        }
        function stop(){
            clearTimeout(time._t);
        }

        start();
    }(window,window[NAMESPACE]));
    //scroll effect
    (function(global,ns){
        const init={
            showBg:0, //initTop
            advBg:-250
        };
        const dom={
            showBg:$('.show>.bg'),
            advBg:$('.adv>.bg')
        };

        if(ns.browser.version<=8){
            dom.advBg.style.top='-125px';
        }else{

            const initEntries=Object.entries(init);
            const domEntries=Object.entries(dom);
    
            function setPosition(h){
                for(let [prop,dom] of domEntries){
                    dom.style.top = init[prop] + h + 'px';
                }
            }
    
            container.on('wheel:scroll',function(e){
                setPosition(e.$data.top*0.15);
            });
        }

        })(window,window[NAMESPACE]);
}
