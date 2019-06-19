#
# Be sure to run `pod lib lint ApiCloudSDK.podspec' to ensure this is a
# valid spec before submitting.
#
# Any lines starting with a # are optional, but their use is encouraged
# To learn more about a Podspec see https://guides.cocoapods.org/syntax/podspec.html
#

Pod::Spec.new do |s|
  s.name             = 'ApiCloudSDK'
  s.version          = '0.0.1'
  s.summary          = 'A short description of ApiCloudSDK.'

# This description is used to generate tags and improve search results.
#   * Think: What does it do? Why did you write it? What is the focus?
#   * Try to keep it short, snappy and to the point.
#   * Write the description between the DESC delimiters below.
#   * Finally, don't worry about the indent, CocoaPods strips it!

  s.description      = <<-DESC
TODO: Add long description of the pod here.
                       DESC

  s.homepage         = 'https://github.com/debugalvin/ApiCloudSDK'
  # s.screenshots     = 'www.example.com/screenshots_1', 'www.example.com/screenshots_2'
  s.license          = { :type => 'MIT', :file => 'LICENSE' }
  s.author           = { 'debugalvin' => 'yaomingcoder@gmail.com' }
  s.source           = { :git => 'https://github.com/debugalvin/ApiCloudSDK.git', :tag => s.version.to_s }
  # s.social_media_url = 'https://twitter.com/<TWITTER_USERNAME>'

s.ios.deployment_target = '9.0'

s.source_files = 'ApiCloudSDK/Classes/inc/**/*.{h,m}'
s.ios.vendored_libraries = 'ApiCloudSDK/Classes/lib/**/*.a'

# 系统的
s.frameworks = 'SystemConfiguration', 'CoreTelephony','UIKit', 'Foundation', 'CFNetwork', 'CoreMotion','CoreGraphics','WebKit'
s.libraries = 'c++', 'z','resolv','icucore'

s.resources = 'ApiCloudSDK/Assets/bundles/*'


end
