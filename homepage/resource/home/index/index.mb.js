/**
 * Created by wangkehan on 16/3/4.
 */

FastClick.attach(document.body);
createjs.Ticker.setFPS(60);
(function(global,ns){
    const menu = $('body>header>span.menu');
    const asideList = $a('body>aside');
    const content=$('body>section.content');

    function showMenu(){
        menu.removeClass('menu');
        menu.addClass('close');
        ns.domList.addClass(asideList,'show');
    }
    function closeMenu(){
        menu.removeClass('close');
        menu.addClass('menu');
        ns.domList.removeClass(asideList,'show');
    }
    function toggleMenu(){
        if(menu.containsClass('menu')){
            showMenu();
        }else if(menu.containsClass('close')){
            closeMenu();
        }
    }

    menu.on('click',function(e){
        toggleMenu()
    });
    content.on('touchmove',closeMenu);
    content.on('touchend',closeMenu);
    ns.domList.on(asideList,'touchmove',function(e){
        e.preventDefault();
    });

    let homeTop=0;
    let storyTop=0;
    let customTop=0;
    const tweenTarget={
        get top(){
            return document.body.scrollTop;
        },
        set top(v){
            document.body.scrollTop=v;
        }
    };

    function scrollTo(top){
        global.createjs.Tween.get(tweenTarget, { override : true }).to({ top }, 500, createjs.Ease.quadOut);
    }

    function switchNav(name){
        if(!name) return;
        const from=asideList[0].$('nav>div.active');
        const to=asideList[0].$(`nav>div[data-name="${name}"]`);
        if(to){
            if (from === to) return;

            from&&from.classList.remove('active');
            to.classList.add('active');
        }
    }

    function setNav(){
        const y = ns.getScrollOffset().y;
        if(y<storyTop) switchNav('home');
        else if(y>=storyTop&&y<customTop) switchNav('story');
        else switchNav('cus');
    }

    function initTop(){
        const y=ns.getScrollOffset().y;
        homeTop=Math.round( $('body>.content>.show').getBoundingClientRect().top+y-45);
        storyTop=Math.round($('body>.content>.story').getBoundingClientRect().top+y-45);
        customTop=Math.round($('body>.content>.cus').getBoundingClientRect().top+y-45);
    }


    function resize(){
        initTop();
        setNav();
    }
    global.on('resize',resize);
    resize();

    global.on('scroll',function(){
        setNav();
        //closeMenu();
    });

    asideList[0].on('click',function(e){
        const name = e.target.dataset.name;
        if(name){
            closeMenu();
            switch (name){
                case 'home':
                    scrollTo(homeTop);
                    return;
                case 'story':
                    scrollTo(storyTop);
                    return;
                case 'cus':
                    scrollTo(customTop);
                    return;
            }
        }
    });

}(window,window[NAMESPACE]));

//swiper
(function(global,ns){
    const swiper= new Swiper('body>.content>.case',{
        pagination:'.swiper-pagination',
        paginationClickable:true,
        spaceBetween:10,
        loop:true,
        autoplay: 2500,
        autoplayDisableOnInteraction: false
    })
}(window,window[NAMESPACE]));