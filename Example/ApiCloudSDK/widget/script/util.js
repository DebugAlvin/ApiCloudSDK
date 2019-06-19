var util = {};
util.server = '';
util._urlBuilder = function (obj) {
        var tp = '?';
        for (var k in obj) {
            var v = String(obj[k]);
            if (v.length > 0) {
                tp += k + "=" + v + "&";
            }
        }
        tp = tp.substring(0, tp.length - 1);
        return tp;
    };
/*解析形如：/Date(1358092800000)/的C#生成的DateTime对象JSON数据
 * @jsonDate:形如：/Date(1358092800000)/的C#生成的DateTime对象JSON数据
 * return:{Date}js Date对象
 */
function jsondateToDate(jsonDate) {
    var re = /-?\d+/;
    var m = re.exec(jsonDate);
    return new Date(parseInt(m[0]));
}
function formatNumber(data, format) {
    format = format.length;
    data = data || 0;
    //return format == 1 ? data : String(Math.pow(10,format)+data).substr(-format);//该死的IE6！！！
    return format == 1 ? data : ( data = String(Math.pow(10, format) + data)).substr(data.length - format);
}
util.isNullOrEmpty = function (obj) {
    var type = typeof obj;
    if (type == "undefined") {
        return true;
    } else if (type == "string") {
        var len = obj.length;
        if (len == 0) {
            return true;
        }
    } else if (null == obj) {
        return true;
    } else if(type=="object"){
        if(Array.isArray(obj)){
            if(obj.length>0){
                return false;
            }else{
                return true
            }
        }else{
            return false;
        }
    }else{
        return false;
    }
};
    /*
     * 格式化日期
     * @pattern:{String}格式化表达式，如YYYY-MM-DD hh:mm:ss w
     * @date:{String/Number/Date}待格式化日期
     * return:{String}格式化以后的日期字符串
     */
util.dateFormat = function (pattern, jsondate) {
    var date;
    if (typeof jsondate === "string") { //json时间
        date = jsondateToDate(jsondate);
    } else if (typeof jsondate === "number") { //时间戳
        date = new Date(jsondate);
    } else { //js Date
        date = jsondate;
    }
    return pattern.replace(/([YMDhsm])\1*/g, function (format) {
        switch (format.charAt()) {
        case 'Y':
            return formatNumber(date.getFullYear(), format);
        case 'M':
            return formatNumber(date.getMonth() + 1, format);
        case 'D':
            return formatNumber(date.getDate(), format);
        case 'w':
            return date.getDay() + 1;
        case 'h':
            return formatNumber(date.getHours(), format);
        case 'm':
            return formatNumber(date.getMinutes(), format);
        case 's':
            return formatNumber(date.getSeconds(), format);
        }
    });
};
util.log = function (msg) {
    console.log(msg);
};
util.objToString = function (obj) {
    return JSON.stringify(obj);
}
if (config.isDev == 1) {
    util.Server = config.testServer;
    util.post = function (url, data, callback) {
        var url = util.Server + url;
        $.post(url, data, callback);
    };
    util.get = function (url, data, callback) {
        var url = util.Server + url;
        $.get(url, data, callback, "json");
    };
    util.openWindow = function (name, url, jsonParam) {
        var url = url + this._urlBuilder(jsonParam);
        window.open(url, name, jsonParam);
    };
    util.openFrame = function (name, url, jsonParam) {
        var url = url + this._urlBuilder(jsonParam);
        window.open(url, name, jsonParam);
    };
    util.setPreferences = function (k, v) {
        localStorage.setItem(k,v);
    }
    util.getPreferences = function (k) {
        try {
            return localStorage.getItem(k);
        } catch (e) {
            return '';
        }
    }
    util.removePreferences = function (k) {
        localStorage.removeItem(k);
    }
    util.closeWin=function(){
        window.opener=null;
        window.open('','_self');
        window.close();
    }
    util.hideProgress = function () {   };
    util.showProgress = function () {   };
} else {
    util.Server = config.publishServer;
    util.setPreferences = function (k, v) {
        api.setPrefs({
            key: k,
            value: v
        });
    }
    util.getPreferences = function (k) {
        try {
            return api.getPrefs({
                sync: true,
                key: k
            });
        } catch (e) {
            return '';
        }
    }
    util.removePreferences = function (k) {
        api.removePrefs({
            key: k
        });
    }
    util.setStorage = function (k, v) {
        $api.setStorage(k, v);
    }
    util.getStorage = function (k) {
        return $api.getStorage(k);
    }
    util.removeStorage = function (k) {
        $api.rmStorage(k);
    }
    util.clearStorage = function () {
        $api.clearStorage();
    }
    util.clearCache = function () {
        api.clearCache(function () {
            api.toast({
                msg: '清除完成'
            });
        });
    }

    util.ping = function () {
        if (api.connectionType == 'none') {
            util.setStorage("IS_ONLINE", 0);
            api.toast({
                msg: '网络未连接'
            });
            return false;
        }else{
            util.setStorage("IS_ONLINE", 1);
            util.setStorage("SERVER_STATUS", 1);
        }
    }
    util.post = function (url, data, callback) {
        if (util.getStorage("SERVER_STATUS") == 0) {
            return false;
        }
        var url = util.Server + url;
        if(config.appTest==1){
            var startTime=new Date().getTime();
        console.log("/---------------header---------------/");
        console.log("url "+url);
        console.log("data "+JSON.stringify(data));
        console.log("/------------------------------------/");
        }
        api.ajax({
            url: url,
            method: 'post',
            timeout:10,
            data: {
                values: data
            }
        }, function (ret, err) {
            if (ret) {
                callback(ret);
            } else {
                //api.alert({
                //    msg: JSON.stringify(err)
                //});
                util.hideProgress();
                util.log("method post err:" + JSON.stringify(err));
            }
            if(config.appTest==1) {
                var endTime=new Date().getTime();
                console.log("---------------response---------------");
                console.log("url " + url);
                console.log("end time: " + (endTime-startTime).toString());
                console.log("ret " + JSON.stringify(ret));
                console.log("err " + JSON.stringify(err));
                console.log("--------------------------------------");
            }
        });

    }
    util.get = function (url, data, resolve,reject) {
        var url = util.Server + url;
        url = url + this._urlBuilder(data);
        if(config.appTest==1){
            console.log("/---------------header---------------/");
            var startTime=new Date().getTime();
            console.log("url "+url);
            console.log("data "+JSON.stringify(data));
            console.log("/------------------------------------/");
        }
        api.ajax({
            url: url,
            method: 'get',
            timeout:10,
            cache:false
        }, function(ret, err) {
            if (ret) {
                resolve(ret);
            } else {
                reject(err);
                //api.alert({ msg: JSON.stringify(err) });
                util.hideProgress();
                util.log("method get err:" + JSON.stringify(err));
            }
            if(config.appTest==1) {
                var endTime=new Date().getTime();
                console.log("---------------response---------------");
                console.log("url " + url);
                console.log("end time: " + (endTime-startTime).toString());
                console.log("ret " + JSON.stringify(ret));
                console.log("--------------------------------------");
            }
        });
    };

    util.upload = function (url, file, resolve, reject) {
        var url = util.Server + url;
        api.ajax({
            url: url,
            method: 'post',
            report: true,
            data: {
                files: {
                    file: file
                }
            }
        }, function (ret, err) {
            if (ret) {
                if (ret.status == 0) {
                    api.showProgress({
                        style: 'default',
                        animationType: 'fade',
                        title: '',
                        text: ret.progress + "%",
                        modal: true
                    });
                } else {
                    api.hideProgress();
                    resolve(ret.body);
                }
            } else {
                reject(err);
                util.log("method upload err:" + err);
            }
        });
    };
    util.getCameraPic = function (resolve, reject) {
        api.getPicture({
            sourceType: 'camera',
            encodingType: 'jpg',
            mediaValue: 'pic',
            destinationType: 'url',
            quality: 93,
            //				targetHeight : 800,
            //				targetWidth:593,
            targetHeight: 1200,
            targetWidth: 890,
            saveToPhotoAlbum: false
        }, function (ret, err) {
            if (ret) {
                resolve(ret.data);
            } else {
                reject(err);
                util.log("method getCameraPic err:" + err);
            }
        });
    };
    util.getAlbumPic = function (resolve, reject) {
        api.getPicture({
            sourceType: 'album',
            encodingType: 'jpg',
            mediaValue: 'pic',
            destinationType: 'url',
            quality: 93,
            targetWidth: 1200,
            targetHeight: 890,
            saveToPhotoAlbum: false
        }, function (ret, err) {
            if (ret) {
                if (ret.data.length > 0) {
                    resolve(ret.data);
                }
            } else {
                //reject(err);
                util.log(JSON.stringify(err));
            }
        });
    };
    util.openWindow = function (name, url, jsonParam, reload) {
        if (util.getStorage("SERVER_STATUS") == 0) {
            api.toast({
                msg: '网络连接已断开'
            });
            return false;
        }
        var jsonParam = jsonParam || {};
        var reload = reload || false;
        api.openWin({
            name: name,
            url: url,
            pageParam: jsonParam,
            reload: reload
        });
    };
    util.closeWin = function () {
        api.closeWin();
    };

    util.openFrame = function (name, url, jsonParam, bounces, height, y_offset, reload) {
        if (util.ServerStatus == 0) {
            api.toast({
                msg: '网络连接已断开'
            });
            return false;
        }
        var _jsonParam = jsonParam || {};
        var _y_offset = y_offset || 0;
        var _height = height || 'auto';
        var _bounces = bounces || false;
        var _reload = reload || false;
        api.openFrame({
            name: name,
            url: url,
            rect: {
                x: 0,
                y: _y_offset,
                w: 'auto',
                h: _height
            },
            pageParam: _jsonParam,
            reload: _reload,
            bounces: _bounces,
            bgColor: 'rgba(0,0,0,1)',
            vScrollBarEnabled: true,
            hScrollBarEnabled: true,
            progress: {
                type: "page",
                title: "加载中",
                text: "",
                color: "#fff"
            },
            animation: {
                type: "push",
                subType: "from_right",
                duration: 200
            }
        });
    };
    util.closeFrame = function (name) {
        api.closeFrame({
            name: name
        });
    };
    util.hideFrame = function (name) {
        api.setFrameAttr({
            name: name,
            hidden: true
        });
    }
    util.scrollLoading = function (callback) {
        api.addEventListener({
            name: 'scrolltobottom',
            extra: {
                threshold: 0 //设置距离底部多少距离时触发，默认值为0，数字类型
            }
        }, function (ret, err) {
            callback(ret);
            //alert('已滚动到底部');
            if (err) {
                util.log("method scrollLoading err:" + err);
            }
        });
    };
    util.dragLoading = function (callback) {
        var param = {};
        param.loadingImgae = 'widget://image/refresh.png';
        param.bgColor = '#fff';
        param.textColor = '#999';
        param.showTime = true;
        api.setRefreshHeaderInfo(param, function (ret, err) {
            //refresh event callback
            callback(ret);
            api.refreshHeaderLoadDone();
            if (err) {
                util.log("method dragLoading err:" + err);
            }
        });
    };
    util.download = function (url, savePath, callBack) {
        api.download({
            url: url,
            savePath: savePath,
            report: true,
            cache: false,
            allowResume: true
        }, function (ret, err) {
            if (ret.state == 0) {
                api.showProgress({
                    style: 'default',
                    animationType: 'fade',
                    title: '',
                    text: ret.progress + "%",
                    modal: true
                });
            } else if (ret.state == 1) {
                api.hideProgress();
                //下载成功
                callBack(ret.savePath);
            } else if (ret.state == 2) {
                alert(err.msg);
            }
            if (err) {
                util.log("method download err:" + err.msg);
            }
        });
    };
    util.update = function (url) {
        var savePath = 'fs://update.apk';
        util.download(url, savePath, function (updatefile) {
            api.installApp({
                appUri: updatefile
            });
        });
    };
    util.checkUpdate = function () {
        var server = "update.html";
        util.get(server, "", function (ret) {
            if (ret.version != api.appVersion) {
                var apppath=ret.apppath;
                if (ret.forceUpdate == 1) {
                    api.alert({msg:"软件有更新,点击确定开始更新"});
                    util.update(apppath);
                } else {
                    api.confirm({
                        title: '更新提示',
                        msg: '软件有更新，点击确定开始更新',
                        buttons: ['确定', '取消']
                    }, function(ret, err) {
                        var index = ret.buttonIndex;
                        if(index==1){
                            util.update(apppath);
                        }
                    });
                }
            }
        },function(err){
           return ;
        });
    };
    util.citySeletor = function (resolve, reject) {
        var citySelector = api.require('citySelector');
        var y = util.getStorage('WINDOW_HEIGHT') - 244;
        citySelector.open({
            y: y,
            cancelImg: "widget://image/citySelector/mo_cityselector_cancel.png",
            enterImg: "widget://image/citySelector/mo_cityselector_enter.png",
            titleImg: "widget://image/citySelector/mo_cityselector_nvc.png",
            bgImg: "widget://image/citySelector/mo_cityselector_bg.png",
            fontColor: "#ccc",
            selectedColor: "#333",
            fixedOn: api.frameName
        }, function (ret, err) {
            if (ret) {
                resolve(ret);
            } else {
                reject(err);
                util.log("method citySeletor err:" + err);
            }
            citySelector.close({
			   anim:true
			});
        });
    };
    util.citySeletorFrame = function (resolve, reject) {
        var citySelector = api.require('citySelector');
        var y = util.getStorage('WINDOW_HEIGHT') - 335;
        citySelector.open({
            y: y,
            cancelImg: "widget://image/citySelector/mo_cityselector_cancel.png",
            enterImg: "widget://image/citySelector/mo_cityselector_enter.png",
            titleImg: "widget://image/citySelector/mo_cityselector_nvc.png",
            bgImg: "widget://image/citySelector/mo_cityselector_bg.png",
            fontColor: "#ccc",
            selectedColor: "#333",
            fixedOn: api.frameName
        }, function (ret, err) {
            if (ret) {
                resolve(ret);
            } else {
                reject(err);
                util.log("method citySeletor err:" + err);
            }
        });
    };
    util.showProgress = function () {
        api.showProgress({
            style: 'default',
            animationType: 'fade',
            title: '加载中...',
            text: '',
            modal: false
        });
    };
    util.hideProgress = function () {
        api.hideProgress();
    };
    util.showWelcomePage=function(){
        var savedAppVersion=util.getPreferences('savedAppVersion');
        if(util.isNullOrEmpty(savedAppVersion)||savedAppVersion!=api.appVersion){
            api.openFrame({
                name: 'welcome',
                url: 'welcome.html',
                bounces: false,
                rect: {
                    x: 0,
                    y: 0,
                    w: 'auto',
                    h:'auto'
                },
            });
        }
    };
    util.initChatBox = function (callback) {
        UIChatBox = api.require('UIChatBox');
        UIChatBox.open({
            placeholder: '',
            maxRows: 4,
            emotionPath: 'widget://image/chatbox/image/emotion',
            texts: {
                recordBtn: {
                    normalTitle: '按住说话',
                    activeTitle: '松开结束'
                },
                sendBtn: {
                    title: '发送'
                }
            },
            styles: {
                inputBar: {
                    borderColor: '#d9d9d9',
                    bgColor: '#f2f2f2'
                },
                inputBox: {
                    borderColor: '#B3B3B3',
                    bgColor: '#FFFFFF'
                },
                emotionBtn: {
                    normalImg: 'widget://image/chatbox/image/chatBox_face1.png'
                },
                extrasBtn: {
                    normalImg: 'widget://image/chatbox/image/add1.png'
                },
                keyboardBtn: {
                    normalImg: 'widget://image/chatbox/image/key1.png'
                },
                speechBtn: {
                    normalImg: 'widget://image/chatbox/image/sound1.png'
                },
                recordBtn: {
                    normalBg: '#fff',
                    activeBg: '#ddd',
                    color: '#000',
                    size: 14
                },
                indicator: {
                    target: 'both',
                    color: '#c4c4c4',
                    activeColor: '#9e9e9e'
                },
                sendBtn: {
                    titleColor: '#ffffff',
                    bg: '#4cc518',
                    activeBg: '#46a91e',
                    titleSize: 14
                }
            },
            extras: {
                titleSize: 10,
                titleColor: '#a3a3a3',
                btns: [{
                    title: '图片',
                    normalImg: 'widget://image/chatbox/image/album1.png',
                    activeImg: 'widget://image/chatbox/image/album2.png'
                }, {
                    title: '拍照',
                    normalImg: 'widget://image/chatbox/image/cam1.png',
                    activeImg: 'widget://image/chatbox/image/cam2.png'
                }]
            }
        }, function (ret, err) {
            if (ret) {
                callback(ret);
            } else {
                uitl.log(JSON.stringify(err));
            }
        });
    }
    /**
     * 字符串拼接方法
     * c# stringformat
     * @returns {}
     */
    util.StringFormat = function () {
        if (arguments.length == 0)
            return null;

        var str = arguments[0];
        for (var i = 1; i < arguments.length; i++) {
            var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
            str = str.replace(re, arguments[i]);
        }
        return str;
    }
}
//ja29f2fbef371395
//m76e8900524d1355
//o2338c7e041ee118
//bf657da207808329
//o7e0ac0d9ddd46
//gee33224a59d1107
//pf7ecd48699b0680
//f0db45b88c3d8623
//q4d56f8806ab1105
//d4597c884ac70769
//j282db19cdbde728
//gb4068be0b415969
//g35f009838b1b238
//pee680abd7930986
//hgpmgebcibfimqaiipaiinbgnldaiahlhoei
//aaqpnejohpmbndeiidqmggqofjcmhpoefbdj
