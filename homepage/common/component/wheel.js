/**
 * Created by wangkehan on 16/1/29.
 */

(function(global,ns){
    global.createjs&&global.createjs.Ticker.setFPS(60);
    const TRANSITION_DURING=500;//缓动时间
    const container=$('.wheel-container');

    const tweenTarget={
        _targetTop:container.scrollTop,
        getTargetTop(){
            return this._targetTop;
        },
        setTargetTop(v){
            if(v<0){ v=0;}
            else{
                const maxTop=container.scrollHeight-container.getBoundingClientRect.height;
                if (v > maxTop){
                    v=maxTop
                }
            }

            this._targetTop=v;
        }
    };
    
    if(ns.browser.version<=8){
        tweenTarget.getTop=function(){return container.scrollTop};
        tweenTarget.setTop=function(v){container.scrollTop=v;};
    }else{
        Object.defineProperty(tweenTarget,'top',{
            get(){
                return container.scrollTop;
            },
            set(v) {
                container.scrollTop = v;
            }
        });
    }

    let FREEZE=false;

    function scrollTo(top){
        tweenTarget.setTargetTop(top);
        if(global.createjs){
            global.createjs.Tween.get(tweenTarget, { override : true }).to({ top }, TRANSITION_DURING, createjs.Ease.quadOut);
        }else{
            tweenTarget.setTop(top);
        }
    }


    container.on('scroll',function(e){
        const top=e.target.scrollTop;
        container.trigger('wheel:scroll',{top:top<0?0:top});
    });
    container.on('wheel:to',function(e){
        scrollTo(e.$data.top);
    });
    container.on('wheel:top',function(){
        container.trigger('wheel:to',{top:0});
    });
    container.on('wheel:bottom',function(){
        container.trigger('wheel:to',{top:10000000});
    });

    if(ns.platform.isPhone()||ns.platform.isTablet()){
        //phone or pad
        container.style.overflowY='auto';
        container.style.webkitOverflowScrolling='touch';

        container.on('wheel:freeze',function(){
            container.style.overflowY='hidden';
            container.style.webkitOverflowScrolling='';
        });
        container.on('wheel:unfreeze',function(){
            container.style.overflowY='auto';
            container.style.webkitOverflowScrolling='touch';
        });
    }else{
        container.style.overflowY='hidden';

        let FREEZE=false;
        container.on('wheel:freeze',function(){
            FREEZE=true;
        });
        container.on('wheel:unfreeze',function(){
            FREEZE=false;
        });

        let perDelta = 0;
        if(ns.browser.version<=8){
            document.attachEvent('onmousewheel',function(){
                event.returnValue=false;
                if(FREEZE) return;
                const deltaToken = event.wheelDelta>0?1:(event.wheelDelta<0?-1:0);
                if(perDelta*deltaToken>=0){
                    scrollTo(tweenTarget.getTargetTop()-event.wheelDelta);
                }else{
                    scrollTo(tweenTarget.getTop()-event.wheelDelta);
                }
                if(deltaToken!==0) perDelta=deltaToken;
            });
        }else{
            global.on('wheel', function (e) {
                e.preventDefault();
                if (FREEZE) return;
                const deltaToken = e.deltaY>0?1:(e.deltaY<0?-1:0);
                if(perDelta*deltaToken>=0){
                    scrollTo(tweenTarget.getTargetTop()+e.deltaY);
                }else{
                    scrollTo(tweenTarget.top+e.deltaY);
                }
                if(deltaToken!==0) perDelta=deltaToken;
            });
        }
    }
}(window,window[NAMESPACE]));

/*(function(global,ns,ua){
    global.createjs&&global.createjs.Ticker.setFPS(60);
    const TRANSITION_DURING=500;//缓动时间
    const container=$('.wheel-container');

    global.on('wheel:top',function(){
        global.trigger('wheel:to',{top:0});
    });


    if(ua.includes('android')||ua.includes('pad')||ua.includes('phone')||ua.includes('ios')||ua.includes('mobi')||ua.includes('tablet')){
        //phone or pad
        //style
        const s=document.createElement('style');
        s.innerHTML=`
html,body{height:100%;}
body>.wheel-container{
    position:relative;
    top:0;

    -ms-transform:translate(0,0);
    -moz-transform:translate(0,0);
    -webkit-transform:translate(0,0);
    transform:translate(0,0);
}`;
        (document.head||$('head')).insertBefore(s,$('head title'));

        global.on('scroll',(e)=>{
            const top = ns.getScrollOffset().y;

            global.trigger('wheel:scroll',{top:top<0?0:top,tween:true});
        });

        const tweenTarget={
            get top(){
                return container.parentElement.scrollTop;
            },
            set top(v){
                container.parentElement.scrollTop=v;
            }
        };

        function scrollTo(top){
            global.createjs.Tween.get(tweenTarget, { override : true }).to({ top }, TRANSITION_DURING, createjs.Ease.quadOut)//.addEventListener('change', changeHandle);
        }
        global.on('wheel:to',function(e){
            scrollTo(e.$data.top);
        });

        global.on('wheel:down',function(){
            global.trigger('wheel:to',{top:container.getBoundingClientRect().bottom-ns.getViewportSize().h});
        });

        function touchmove(e){e.preventDefault();}
        global.on('wheel:freeze',function(){
            document.body.on('touchmove',touchmove);
        });
        global.on('wheel:unfreeze',function(){
            document.body.off('touchmove',touchmove);
        });

    }else{
        //pc
        //style
        const style=`
html,body{height:100%;overflow-y:hidden;overflow-x:auto;}
body>.wheel-container{
    position:relative;
    top:0;

    -ms-transform:translate(0,0);
    -moz-transform:translate(0,0);
    -webkit-transform:translate(0,0);
    transform:translate(0,0);

    -moz-transition:-moz-transform 500ms ease-out;
    -webkit-transition:-webkit-transform 500ms ease-out;
    transition:transform 500ms ease-out;
}`;

        if(document.createStyleSheet){
            //ie8
            const s=document.createStyleSheet();
            s.cssText=style;
        }else{
            const s=document.createElement('style');
            s.innerHTML=style;
            (document.head||$('head')).insertBefore(s,$('head title'));
        }


        const containerRawTop = parseInt(window.getComputedStyle(container).getPropertyValue('top'),10);
        let top=0;
        let MAX=0;

        const useTweenJs= ['msie','edge','safari'].includes(ns.browser.name);
        const tweenTarget={top};

        function resize(){
            MAX = container.getBoundingClientRect().bottom - ns.getViewportSize().h+top+ parseInt(container.data('bottom')||0,10) ;
            if(MAX<0){
                MAX=0;
            }
            if(top>MAX){
                top=MAX;
                scrollTo(top);
            }
        }

        function changeHandle(){
            container.style.top=(containerRawTop-tweenTarget.top)+'px';
            global.trigger('wheel:scroll',{top:tweenTarget.top,tween:true});
        }
        function scrollTo(top){
            if(useTweenJs){
                if(global.createjs){
                    global.createjs.Tween.get(tweenTarget, { override : true }).to({ top }, TRANSITION_DURING, createjs.Ease.quadOut).addEventListener('change', changeHandle);
                }else{//ie8
                    tweenTarget.top=top;
                    changeHandle();
                }
            }else{
                const transform=`translate(0,${-top}px)`;
                container.style.webkitTransform=transform;
                container.style.mozTransform=transform;
                container.style.transform=transform;
                global.trigger('wheel:scroll', { top ,tween:false});
            }
        }

        let FREEZE=false;
        if(ns.browser.version<=8){
            document.attachEvent('onmousewheel',function(){
                if(FREEZE) return;

                const e = event;

                if(top===0&&e.wheelDelta>0) return;
                if(top===MAX&&e.wheelDelta<0) return;
                top-=e.wheelDelta;
                if(top>MAX){
                    top=MAX;
                }else if(top<0){
                    top=0;
                }

                scrollTo(top)
            });
        }else{
            global.on('wheel', function (e) {
                if (FREEZE) return;

                if (top === 0 && e.deltaY < 0) return;
                if (top === MAX && e.deltaY > 0) return;

                e.preventDefault();

                top += e.deltaY;
                if (top > MAX){
                    top = MAX;
                }else if (top < 0){
                    top = 0;
                }
                scrollTo(top);
            });
        }

        global.on('wheel:to',function(e){
            const toTop=e.$data.top;
            if(toTop===top) return;
            top=toTop;
            if(top>MAX) top=MAX;
            else if(top<0) top=0;
            scrollTo(top);
        });
        global.on('wheel:down',function(){
            global.trigger('wheel:to',{top:MAX});
        });
        global.on('wheel:freeze',function(){
            FREEZE=true;
        });
        global.on('wheel:unfreeze',function(){
            FREEZE=false;
        });

        global.on('resize',resize);
        global.on('load',resize);
        global.on('DOMContentLoaded',resize);
        global.on('readystatechange',resize);
        resize();
        scrollTo(top);
    }
}(window,window[NAMESPACE],navigator.userAgent.toLowerCase()));*/


/* example
 window.on('wheel:scroll',function(e){
 console.log(e.$data.top);
 });
 */