//
//  ACViewController.m
//  ApiCloudSDK
//
//  Created by debugalvin on 06/19/2019.
//  Copyright (c) 2019 debugalvin. All rights reserved.
//

#import "ACViewController.h"
#import "ViewController.h"
@interface ACViewController ()

@end

@implementation ACViewController

- (void)viewDidLoad
{
    [super viewDidLoad];
	// Do any additional setup after loading the view, typically from a nib.
    [self.navigationController setNavigationBarHidden:YES];
    ViewController *yhVC = [[ViewController alloc] init];
    [self.navigationController pushViewController:yhVC animated:NO];
    
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
