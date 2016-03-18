<header class="flex flex-center">
    <div class="logo">
        <img src="/resource/common/logo/elisali/g.svg">
    </div>
    <div class="tab flex-1">
        <a class="active">首页</a>
        <a class="left-20">品牌故事</a>
        <a class="left-20">定制旅行</a>
    </div>
</header>
<div class="wheel-container container">
    <section class="show">
        <div class="action">
            <div class="th-0">艾黎思</div>
            <div class="th-1">定制你要的欧洲</div>
            <button class="customized-btn o">定制我的旅行</button>
        </div>
    </section>
    <section class="story">
        <div>品牌故事</div>
        <div>艾黎思（Elisa･Li），中国最专业的欧洲旅行和生活方式定制解决方案提供商</div>
        <div>“新三板”旅行和生活方式定制第一股<span class="br">（代码：835451）</span></div>
        <div>多年来艾黎思一直致力于将每一段旅程当做作品般精工细刻，只为定制您心中想要的欧洲</div>
    </section>
    <section class="adv">
        <div>品牌优势</div>
        <div>为什么选择我们</div>
        <div class="box flex flex-center">
            <div class="index-icon b">
                <div class="index-icon cs"></div>
                <div>专属服务人员</div>
                <div class="small">由咨询师一对一对接，全程提供<br>一站式服务</div>
            </div>
            <div class="index-icon b">
                <div class="index-icon rg"></div>
                <div>专业行程规划</div>
                <div class="small">团队成员均在欧洲旅居5年以上<br>因为了解所以专业</div>
            </div>
            <div class="index-icon b">
                <div class="index-icon sv"></div>
                <div>全程管家式服务</div>
                <div class="small">A+B+C三种角色，满足您<br>对欧洲的一切梦想</div>
            </div>
        </div>
    </section>
    <section class="cus">
        <div>定制流程</div>
        <div>随心定制,给你的就是你要的</div>
        <div class="box flex flex-center">
            <div><div class="index-icon ask bottom-20"></div><div>行前咨询</div></div>
            <div><div class="index-icon case bottom-20"></div><div>获取行程简案</div></div>
            <div><div class="index-icon dj bottom-20"></div><div>预付定金</div></div>
            <div><div class="index-icon bc bottom-20"></div><div>获取行程初案</div></div>
            <div><div class="index-icon fc bottom-20"></div><div>确定最终方案</div></div>
            <div><div class="index-icon tr bottom-20"></div><div>安心出行</div></div>
        </div>
        <button class="customized-btn o">定制我的旅行</button>
    </section>
    <section class="case">
        <div class="swiper-wrapper">
            <div class="swiper-slide c1"><div class="title">精品案例</div><div class="subtitle">欧冠观战团</div></div>
            <div class="swiper-slide c2"><div class="title">精品案例</div><div class="subtitle">勃艮第艺术品酒</div></div>
            <div class="swiper-slide c3"><div class="title">精品案例</div><div class="subtitle">巴洛克宫殿婚礼</div></div>
            <div class="swiper-slide c4"><div class="title">精品案例</div><div class="subtitle">英国当地夏令营</div></div>
        </div>
        <div class="swiper-pagination"></div>
    </section>
    <section class="map">
        <div class="logo right-20"><img src="/resource/common/logo/elisali/g.svg">
        </div>
        <div class="copyright padding-h-20 no-padding-right" >
            <div>Copyright @ 2014 艾黎思 All Right Reserved 沪ICP备11015126号-4</div>
            <div>上海走客网络科技股份有限公司</div>
        </div>
    </section>
</div>

<section class="dz modal absolute">
    <div class="container">
        <div class="side">
            <img src="<?= $this->cdnUrl('/elisali/home/img/modal-side.jpg') ?>">
        </div><div class="main">
        <div class="flex">
            <input type="text" class="name flex-1" placeholder="姓名" /><input class="dest flex-1" type="text" placeholder="欧洲目的地">
        </div>
        <div class="flex">
            <input type="text" class="number flex-1" placeholder="出行人数" /><input class="days flex-1" type="text" placeholder="出行天数">
        </div>
        <div class="flex">
            <input type="tel" class="phone flex-1" placeholder="手机" />
        </div>
        <div class="flex">
            <input type="number" class="code flex-1" placeholder="验证码" /><span class="b flex-1">获取验证码</span>
        </div>
        <div class="flex">
            <textarea class="remark flex-1" placeholder="备注"></textarea>
        </div>
        <div>
            <button class="customized-btn s">立即定制</button>
            <a href="tel://4008502259" class="left-20 tel"><span class="index-icon phone big right-10"></span><span>400 850 2259</span></a>
        </div>
    </div>
        <span class="close"></span>
    </div>
</section>

<?php echo $this->registerCssFile('//cdn.bootcss.com/Swiper/3.3.1/css/swiper.min.css');?>
<script src="//cdn.bootcss.com/Swiper/3.3.1/js/swiper.min.js"></script>
<script src="/resource/home/index/index.js"></script>
<script src="/resource/common/component/wheel.js"></script>
<?php echo $this->registerCssFile('/resource/home/index/index.pad.css');?>
