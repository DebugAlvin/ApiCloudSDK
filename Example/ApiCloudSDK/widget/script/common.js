/**
 * Created by PhpStorm.
 * User: 835173372@qq.com
 * NickName: 半城村落
 * Date: 2016/11/7 14:11
 */
function closeWin() {
    api.closeWin();
}
function openWin(model, htmlname) {
    if (arguments[2] == 1) {
        if (!$api.getStorage('member_id')) {
            api.openWin({
                name: 'member_login',
                url: 'widget://html/member/login.html'
            });
            return
        }
    }
    var pageParam = [];
    if (arguments[3]) {
        pageParam = arguments[3]
    }
    api.openWin({
        name: model + '_' + htmlname,
        url: 'widget://html/' + model + '/' + htmlname + '.html',
        pageParam: pageParam
    });
}

function go_login() {
    api.openWin({
        name: 'member_login',
        url: 'widget://html/member/login.html'
    });
    return false;
}
function open_search() {
    api.openWin({
        name: 'member_search',
        url: 'widget://html/member/search.html'
    });
}

function is_login() {
    console.log($api.getStorage('token'));
    if (!$api.getStorage('token')) {
        return false;
    }else{
        return true;
    }
}
function check_login() {
    if(!is_login()){
        go_login();
    }
}

var Baseurl = 'http://siboguojixx.okjbk666.com/app/';//域名url

var goods_info_url = Baseurl + 'index/goods_info';
var index_url = Baseurl + 'index/index';
var cate_list_url = Baseurl+'index/cate_list';
var children_cate_list_url = Baseurl+'index/children_cate_list';
var cate_goodslist_url = Baseurl+'index/cate_goodslist';

var login_url = Baseurl + 'member/login';
var register_url = Baseurl + 'member/register';
var sendsms_url = Baseurl + 'member/sendsms';
var check_mobile_url = Baseurl + 'member/check_mobile';
var resetPassword_sendsms_url = Baseurl + 'member/resetPassword_sendsms';
var resetPassword_url = Baseurl + 'member/resetPassword';
var updatePassword_url = Baseurl + 'member/updatePassword';
var update_username_url = Baseurl + 'member/update_username';

//用户中心首页
var user_center_url = Baseurl + 'member/user_center';

//地址管理
var list_address_url = Baseurl + 'member/list_address';
var add_address_url = Baseurl + 'member/add_address';
var set_default_address_url = Baseurl + 'member/set_default_address';
var delete_address_url = Baseurl + 'member/delete_address';
var update_addres_before_url = Baseurl + 'member/update_addres_before';
var update_address_url = Baseurl + 'member/update_address';
//添加到购物车
var add_to_cart_url = Baseurl + 'cart/add_to_cart';
var cutdown_to_cart_url = Baseurl + 'cart/cutdown_to_cart';
var cart_list_url = Baseurl + 'cart/cart_list';
var total_goods_sum_url = Baseurl + 'cart/total_goods_sum';
var update_cart_status_url = Baseurl + 'cart/update_cart_status';
var update_allcart_status_url = Baseurl + 'cart/update_allcart_status';
var delete_to_cart_url = Baseurl + 'cart/delete_to_cart';
//收藏管理
var add_goods_collect_url = Baseurl + "index/add_goods_collect";
var delete_goods_collect_url = Baseurl + "index/delete_goods_collect";
var list_goods_collect_url = Baseurl + "index/list_goods_collect";

//订单管理
var order_confirm_url = Baseurl + "order/order_confirm";
var order_create_url = Baseurl + "order/order_create";
var alipay_before_url = Baseurl + "order/alipay_before";
var wxpay_before_url = Baseurl + "order/wxpay_before";
var order_list_url = Baseurl + "order/order_list";
var order_cancel_url = Baseurl + "order/order_cancel";//取消订单


//分销
var my_wallet_url = Baseurl + "member/my_wallet";//我的钱包
var withdraw_before_url = Baseurl + "member/withdraw_before";//提现
var member_withdraw_delete_url = Baseurl + "member/member_withdraw_delete";//删除提现记录
var withdraw_after_url = Baseurl + "member/withdraw_after";//提交
var member_card_before_url = Baseurl + "member/member_card_before";//提现认证
var member_card_update_url = Baseurl + "member/member_card_update";//提现认证
var withdraw_order_list_url = Baseurl + "member/withdraw_order_list";//分佣记录


//区域代理
var daili_info_url = Baseurl + 'member/daili_info';
var add_area_deliveryman_url = Baseurl + 'member/add_area_deliveryman';
var area_deliveryman_detail_url = Baseurl + 'member/area_deliveryman_detail';
var delete_area_deliveryman_url = Baseurl + 'member/delete_area_deliveryman';
var set_area_deliveryman_url = Baseurl + 'member/set_area_deliveryman';

var area_agent_order_url = Baseurl + 'member/area_agent_order';//服务指派
var deliveryman_list_url = Baseurl + 'member/deliveryman_list';//业务员列表
var add_area_deliveryman_order_url = Baseurl + 'member/add_area_deliveryman_order';//指派提交
var delete_area_deliveryman_order_url = Baseurl + 'member/delete_area_deliveryman_order';//删除指派
var my_deliveryman_order_url = Baseurl + 'member/my_deliveryman_order';//我的任务
var usercenter_help_url = Baseurl + 'index/usercenter_help';//帮助
var about_us_url = Baseurl + 'index/about_us';//关于我们
var agreement_content_url = Baseurl + 'index/agreement_content';//关于我们
var explain_content_url = Baseurl + 'index/explain_content';//关于我们
var article_list_url = Baseurl + 'index/article_list';//消息列表
var goods_share_url = Baseurl + 'index/goods_share';//分享朋友圈


var erweima_reg_url = Baseurl + 'index/erweima_reg';//推广链接
var erweima_qrcode_url = Baseurl + 'index/erweima_qrcode';//二维码地址

var sendCode_url="http://www.qimiaoyue.com/appSign/getSign.do";

//购物车加1/n
function  add_to_cart(goods_id,info_id,goods_sum) {
    if(!is_login()){
        openWin('member', 'login');
        return false;
    }
    api.ajax({
        url: add_to_cart_url,
        method: 'post',
        timeout: 30,
        dataType: 'json',
        returnAll: false,
        data: {
            values: {
                goods_id: goods_id,
                info_id: info_id,
                goods_sum: goods_sum,
                token: $api.getStorage('token'),
                deviceid: api.deviceId,
            }
        }
    }, function (ret, err) {
        if (ret) {
            if(ret.status == 1){
                //更新全局购物车数量显示function
                api.sendEvent({
                    name: 'tatal_goods_sum',
                });
            }
        } else {
            console.log(JSON.stringify(err));
        }
    });
}
//购物车减1/n
function  cutdown_to_cart(goods_id,info_id,goods_sum) {
    is_login();
    api.ajax({
        url: cutdown_to_cart_url,
        method: 'post',
        timeout: 30,
        dataType: 'json',
        returnAll: false,
        data: {
            values: {
                goods_id: goods_id,
                info_id: info_id,
                goods_sum: goods_sum,
                token: $api.getStorage('token'),
                deviceid: api.deviceId,
            }
        }
    }, function (ret, err) {
        if (ret) {
            if(ret.status == 1){
                //更新全局购物车数量显示function
                api.sendEvent({
                    name: 'tatal_goods_sum'
                });
            }
        } else {
            console.log(JSON.stringify(err));
        }
    });
}
//edbb9b72323bd945
//p9e7428b49a68511
//p475d95698eaf913
//p68f378535aae769
//id23077937ae1465
//pb7685362f71c389
//me6c53e230be691
//i66f56d7abbd9770
//q52680cacdd93780
//gbde03bd540e2617
//ab93e5b77e318632
//cgkconjmcoogqkqkacgapifokglanhienaib
//cihflhcdjkbelhnphhokmomhhoqjjffoolij
