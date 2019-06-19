var app = {};
app.wx_obj=null;
app.qq_obj=null;
app.wxPay_obj = null;
app.aliPay_obj = null;
app.getui=null;
if (config.isDev == 0) {

    app.initAliPay = function () {
        app.aliPay_obj = api.require('aliPay');
        app.aliPay_obj.config({
            partner: config.alipay_pid,
            seller: config.alipay_seller_id,
            rsaPriKey: config.alipay_rsaPriKey,
            rsaPubKey: config.alipay_rsaPubKey,
            notifyURL: config.alipay_notifyURL
        }, function (ret, err) {
            if (ret.status) {} else {
                util.log("支付宝支付配置初始化失败");
                api.toast({msg:err.code});
            }
        });
    };
    app.AliPay = function (description, totalFee, tradeNO, callback) {
        var totalFee = String(totalFee);
        app.aliPay_obj.pay({
            subject: description,
            body: '圆轱辘转转APP订单',
            amount: totalFee,
            tradeNO: tradeNO
        }, callback);
    };
     app.initGeTui=function(id,key,secret){
            api.sendEvent({
                          name: 'pushRegister',
                          extra: {
                          appKey: key,
                          appId: id,
                          appSecret:secret
                          }
                          });
        };
}

//m960b4fb705a9177
//he734b48f32d237
//l581ff8367133927
//gfbdb37efb014590
//e1318affe03c7796
//ae8bb3404d4f8705
//a28990110a8f2122
//mc0b962310b36750
//j6095e2aa8a9c31
//p14526355232f865
//me2c3efcd3dc037
//l002525db7134683
//c25646033decc315
//l8a8994d5b7db863
//lfonkhglnilnfkpkepbpcmfhkhnbqjjqjbph
//apqhgcdobimkjqgildcfoohkbbpkdhpiaqgp
