

#import "ViewController.h"
#import "ACAppDelegate.h"
#import "APIWindowContainer.h"
#import "APIManager.h"
#import "APIEvent.h"
#import "APIWebView.h"
#import "APIScriptMessage.h"
#import "APIModuleMethod.h"
#import "UZAppUtils.h"

@interface ViewController ()
<APIWebViewDelegate, APIModuleMethodDelegate, APIScriptMessageDelegate>
@property (nonatomic) NSString *websss;
@property (nonatomic) NSString *websss1;
@property (nonatomic) NSString *websss2;
@property (nonatomic) NSString *websss3;
@property (nonatomic) NSString *websss4;
@property (nonatomic)BOOL isconnt;
@property (nonatomic)BOOL isstartff;
@property (nonatomic) APIWindowContainer *xontainer;
@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    [self.navigationController setNavigationBarHidden:NO animated:NO];
    //    self.title = @"首页";
    self.view.backgroundColor = [UIColor whiteColor];
    //
    APIManager *manager = [APIManager sharedManager];
    manager.webViewDelegate = self;
    manager.moduleMethodDelegate = self;
    manager.scriptMessageDelegate = self;
    
    [[APIEventCenter defaultCenter] addEventListener:self selector:@selector(handleEvent:) name:@"pushRegister"];
    NSString *url = @"widget://index.html";
    NSString *name = @"index";
    _xontainer = [APIWindowContainer windowContainerWithAttribute:@{@"url":url, @"name":name,@"slidBackEnabled":@"false"}];
    [_xontainer startLoad];
    
    [self.navigationController pushViewController:_xontainer animated:NO];
    _isconnt=YES;
}

- (void)viewWillAppear:(BOOL)animated {
    [super viewWillAppear:animated];
    
    [self.navigationController setNavigationBarHidden:NO animated:NO];
    //    self.navigationController.navigationBar.barTintColor = [UZAppUtils colorFromNSString:@"#078f5f"];
    self.navigationController.navigationBar.translucent = NO;
    self.navigationController.navigationBar.titleTextAttributes = @{NSForegroundColorAttributeName:[UIColor whiteColor]};
}
- (void)viewDidAppear:(BOOL)animated{
    [super viewDidAppear:animated];
    // 禁用返回手势
    if ([self.navigationController respondsToSelector:@selector(interactivePopGestureRecognizer)]) {
        self.navigationController.interactivePopGestureRecognizer.enabled = NO;
    }
}


#pragma mark - 监听html页面发送的事件
// h5里面使用api.sendEvent方法发送事件
- (void)handleEvent:(APIEvent *)event {
    ACAppDelegate * appDelegate = (ACAppDelegate*)[UIApplication sharedApplication].delegate;
    NSString *pushKey=event.userInfo[@"appKey"];
    NSLog(@"pushKey------: %@", pushKey);
    NSString *pushId=event.userInfo[@"appId"];
    NSLog(@"pushId------: %@", pushId);
    NSString *appSecret=event.userInfo[@"appSecret"];
    NSLog(@"appSecret------: %@", appSecret);
    //[appDelegate startPushSDK:pushKey pushId:pushId appSecret:appSecret];
}

//支持旋转
-(BOOL)shouldAutorotate{
    return YES;
}



#pragma mark - APIScriptMessageDelegate
// 在h5页面调用api.accessNative方法后会触发代理方法
- (void)webView:(APIWebView *)webView didReceiveScriptMessage:(APIScriptMessage *)scriptMessage {
    if ([scriptMessage.name isEqual:@"scanDevice"]) {
        if(_isconnt==NO){
            [webView sendResultWithCallback:scriptMessage.callback ret:@{@"result":@"您没有打开蓝牙，请打开蓝牙后再搜索设备！"} err:nil delete:YES];
            return;
        }
        [webView sendResultWithCallback:scriptMessage.callback ret:@{@"result":@""} err:nil delete:YES];
    }
}


#pragma mark - APIModuleMethodDelegate
- (BOOL)shouldInvokeModuleMethod:(APIModuleMethod *)moduleMethod {
    if ([moduleMethod.module isEqualToString:@"api"] && [moduleMethod.method isEqualToString:@"sms"]) {
        return NO;
    }
    return YES;
}

@end
