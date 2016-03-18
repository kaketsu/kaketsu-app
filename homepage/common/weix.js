/**
 * Created by wangkehan on 15/12/27.
 */

((global,namespace)=> {
    if(!wx) return;

    let isReady = false;
    const baseUrl = document.location.href.split('?')[0];
    const host = `${document.location.protocol}//${document.location.host}`;

    wx.ready(function(){
        isReady=true;
    });
    wx.error(function(res){
        //TODO:传回服务器
        //alert(JSON.stringify(res));
    });

    (()=>{

        let baseInfoChanged=true;
        const baseInfo={
            link:document.location.href,
            imgUrl:`${host}/icon.png`,
            type:'link'
        };

        let appShareDataChanged=true;
        const appShareData = {
            title: document.title,
            desc: ''
        };
        let timelineShareDataChanged=true;
        const timelineShareData={
            title:document.title,
            desc:''
        };

        function pushShareData() {
            if (baseInfoChanged){
                Object.assign(appShareData, baseInfo);
                Object.assign(timelineShareData, baseInfo);
                baseInfoChanged = false;
                appShareDataChanged = true;
                timelineShareDataChanged = true;
            }

            if (appShareDataChanged){
                appShareDataChanged = false;
                wx.onMenuShareAppMessage(appShareData)
            }
            if (timelineShareDataChanged){
                timelineShareDataChanged = false;
                wx.onMenuShareTimeline(timelineShareData)
            }
        }

        global.weixin = {
            config(appid, timestamp, noncestr, sign) {
                wx.config({
                    debug: false,
                    appId: appid,
                    timestamp: timestamp,
                    nonceStr: noncestr,
                    signature: sign,
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
                });
                wx.ready(pushShareData);
                return this;
            },

            setBaseInfo({link=baseInfo.link,imgUrl=baseInfo.imgUrl}={}) {
                baseInfo.link = link || baseInfo.link;
                baseInfo.imgUrl = imgUrl || baseInfo.imgUrl;
                baseInfoChanged=true;
                if (isReady){
                    pushShareData();
                }
                return this;
            },

            setAppInfo({title=appShareData.title,desc=appShareData.desc}={}){
                appShareData.title = title;
                appShareData.desc = desc;
                appShareDataChanged=true;
                if (isReady){
                    pushShareData()
                }

                return this
            },
            setTimelineInfo({title=timelineShareData.title,desc=timelineShareData.desc}={}){
                timelineShareData.title = title;
                timelineShareData.desc = desc;
                timelineShareDataChanged = true;
                if (isReady){
                    pushShareData()
                }

                return this;
            },

            on(type,fn) {
                baseInfo[type] = fn;
                baseInfoChanged=true;
                if (isReady) {
                    pushShareData();
                }
                return this;
            },

            get baseUrl() { return baseUrl },
            get host(){return host}
        };
    })();



})(window,window[NAMESPACE]);
