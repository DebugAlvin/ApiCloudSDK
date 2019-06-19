var config = {}

//服务器地址
config.testServer = "http://app.yglzz.com/";
config.publishServer = "http://app.yglzz.com/";


//软件当前状态    1 pc开发  0 手机发布
config.isDev = 0;
//软件测试模式   1 开启测试（拦截所有post get url data 和返回值） 0 关闭测试
config.appTest = 1;

//环信appkey
config.huanxin_key = 'yuanshiren#yuangulu';


//在微信开发者平台创建应用生成的 appId
config.wxpay_apiKey = 'wx1200af33e09735c0';
//商户号，填写商户对应参数
config.wxpay_mchId = '1501137761';
//商户API密钥，务必同在商户平台->账户设置->API安全里填写的密钥保持一致，此密钥是根据微信对商户密钥的规范自己生成的
config.wxpay_partnerKey = 'ujOFcCmtvrBUcyhKCkusoyEIyOd57Pw0';
//接收微信支付异步通知回调地址，通知url必须为直接可访问的url，不能携带参数
config.wxpay_notifyUrl = config.publishServer + 'WxPay/OrderNotify';

config.alipay_pid = '2088921937058525';
//支付宝商户PID
config.alipay_seller_id = 'yglzzqc@163.com';
//旧版支付的商户账号
/*MAPI和商户平台要一起改用一个（优先改MAPI）
 /*rsa格式的
 *alipay_rsaPubKey  rsa格式的sha1公钥
 *alipay_rsaPriKey  rsa格式的sha1私钥
 */
config.alipay_rsaPriKey = 'MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAMLaOmTO6LHu6AR+ea+ye3bi4BXgZpl+IL0tTWutYyi8nEPVq3IzcUDwtCV4kCOURenJx1IUV+BOt57ccYY4LxStlOp4kLyZ8tO1tO8Z8Ozx1LVN6xAmw9TeRQ6wayplLcWSK5An8QU+L53JNg2p0iqvwU+0Gm22mhCXe/YUGzD9AgMBAAECgYAUVuVLipGdqTuM5IrdPTtIEKyle/QZx6GxPZ5cRBAau31wU0h/NkF3LukPFEOvgxW9LrPgrIDzyCPAsHAlO44mYrU61ZQJf0zmTeUzN5ZVSKGPu17VaAm9/JmxS0yvFeL3ecH/kVyj4TgJGFeK25Ebxw0Aa/E3AlOm+xxCZiuS4QJBAO1q+XQYBuoyatj9p1LtQQx0HP+ZBk7Bl53qbUSS3riw6ma0P+7LpSNhwZSuVcSuQbNKSK4NKVVRLcshjx8izOUCQQDSGmQrnoCl0fAJOoNcOvw0J7z7QtqMQyCJTOadITcu0xlWS74d0hD2shTsBV89WAZ345tTrW7CG0uMuktS5io5AkARUeWC16Hhge4TiGWlghNlwi6/Yr14D11tMsXn48MFvDpNZcboN8kDTMVfgFxXbdLzLm8g62rhg3uQvxD+134VAkEAoLQvCm4iWLNLtsNa1qEHZ509n7JzF/YAXQTFIErXuqkdKDSnJogXEZsFBcLWJkW+LNWbaVWu8imOkAWut6n1gQJBANeC3yUMg1I+2yReMzd7WQafSYEANjaCGcDErIuar06yLBXRF1cylujA8f5VNRy8H1lx2t1gVJOxmoDstk68FOI=';
config.alipay_rsaPubKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCnxj/9qwVfgoUh/y2W89L6BkRAFljhNhgPdyPuBV64bfQNN1PjbCzkIM6qRdKBoLPXmKKMiFYnkd6rAoprih3/PrQEB/VsW8OoM8fxn67UDYuyBTqA23MML9q1+ilIZwBC2AQ2UBVOrFXfFl75p6/B5KsiNG9zpgmLCUYuLkxpLQIDAQAB';
config.alipay_notifyURL = config.publishServer + 'AliPay/OrderNotify';
//m7b07e6f4ef1d562
//o25fa14082763401
//gcf288e13fb52318
//ob8d4d602954273
//kfe1139178884241
//gb77695698fd6894
//d4440fec998b0928
//q5e060ac84c27330
//h318a0ab4ab1032
//h1f4e8463484a406
//ocdad70603512995
//l9aa889ec5b99951
//l321b673100b2594
//iccd7c5100db4404
//mffqhbialmcllmfpocmhecnippqmokipmbek
//mklndffekjhqqhfpqemmagdjmlcchlggcjpj
