<?php

if($this->isWeix()) $this->title='艾黎思';

?>

<header>
    <a title="艾黎思" target="_self" href="/home/index"><img src="/resource/common/logo/elisali/g.svg"></a>
    <span class="index-icon op menu"></span>
</header>

<aside class="nav">
    <div data-name="home" class="active">首页</div>
    <div data-name="story">品牌故事</div>
    <div data-name="cus">定制旅行</div>
</aside>
<aside class="addition">
    <div><span class="index-icon weix"></span><span>搜索“艾黎思”关注</span></div>
    <a href="tel://4008502259"><span class="index-icon call"></span><span>定制专线：400 850 2259</span></a>
</aside>

<section class="content">
    <section class="show">
        <div class="title">艾黎思</div>
        <div class="sub-title">定制你要的欧洲</div>
        <a href="/customized/form" target="_self" class="btn">定制我的旅行</a>
    </section>
    <section class="story">
        <div class="title">品牌故事</div>
        <div class="body">
            <p>艾黎思（Elisa.Li），中国最专业的欧洲旅行<br>和生活方式定制解决方案提供商</p>
            <p>“新三板”旅行和生活方式定制第一股</p>
            <p class="r">(代码：835451)</p>
            <p>多年来艾黎思一直致力于将每一段旅程当成作品般精工细刻，只为定制您心中想要的欧洲</p>
        </div>
    </section>
    <section class="adv">
        <div class="title">品牌优势</div>
        <div class="subtitle">为什么选择我们</div>
        <div class="body flex">
            <div class="box">
                <div class="index-icon six-edge">
                    <div class="index-icon adv sp"></div>
                </div>
                <div class="r">专属服务人员</div>
                <div>由咨询师一对一对接，全程提供一站式服务</div>
            </div>
            <div class="box">
                <div class="index-icon six-edge">
                    <div class="index-icon adv rg"></div>
                </div>
                <div class="r">专业行程规划</div>
                <div>团队成员均在欧洲旅居5年以上，因为了解所以专业</div>
            </div>
            <div class="box">
                <div class="index-icon six-edge">
                    <div class="index-icon adv sv"></div>
                </div>
                <div class="r">全程管家式服务</div>
                <div>A+B+C三种角色，满足您对欧洲的一切梦想</div>
            </div>
        </div>
    </section>
    <section class="cus">
        <div class="title">定制流程</div>
        <div class="subtitle">随心定制&ensp;给你的就是你要的</div>
        <div class="body">
            <div class="item">
                <div class="index-icon cus ask"></div><div>行前咨询</div>
            </div>
            <div class="round"></div>
            <div class="item">
                <div class="index-icon cus case"></div><div>获取行程简案</div>
            </div>
            <div class="round"></div>
            <div class="item">
                <div class="index-icon cus dj"></div><div>预付定金</div>
            </div>
            <div class="round"></div>
            <div class="item">
                <div class="index-icon cus ca"></div><div>获取行程初案</div>
            </div>
            <div class="round"></div>
            <div class="item">
                <div class="index-icon cus fc"></div><div>确定最终方案</div>
            </div>
            <div class="round"></div>
            <div class="item">
                <div class="index-icon cus tr"></div><div>安心出行</div>
            </div>
        </div>
        <a href="/customized/form" target="_self" class="btn">定制我的旅行</a>
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
</section>
<footer class="flex flex-center">
    <div><img src="<?= $this->cdnUrl('/elisali/home/img/qr.svg') ?>"></div>
    <div>
        <div><img src="/resource/common/logo/elisali/g.svg"></div>
        <div>沪 ICP 备 11015126 号-2</div>
        <div>上海走客网络科技股份有限公司</div>
    </div>
</footer>

<a href="tel://4008502259" class="index-icon phone"></a>

<?= $this->registerCssFile('//cdn.bootcss.com/Swiper/3.3.1/css/swiper.min.css');?>
<script src="//cdn.bootcss.com/Swiper/3.3.1/js/swiper.min.js"></script>
<script src="/resource/home/index/index.mb.js"></script>
<?= $this->registerCssFile('/resource/home/index/index.mb.css');?>
