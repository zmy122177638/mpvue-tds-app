/**
 * 请求接口封装
 *
 **/

// get方法
// post方法
// 数据上报接口
// 群分享上报群ID等信息
// 小程序跳转
// 配置信息获取
class Https {
  constructor () {
    // 服务器
    this.commonUrl = 'http://miniprogram.dev.com/api/v1/';
    // 必须：当前小程序的appid
    this.appid = 'wx36728f07d8012894';
    // 必须：小程序私钥secret
    this.secret = '81314d87c17307bfe22996c48c1f4c3d';
    // token 和 openid,由登录成功后写入
    this.token = '';
    this.ssid = '';
  }
  // 小程序登录流程
  // async 异步处理登录流程，保证每个环节获取数据正确
  async loginFlow () {
    if (!this.hasOpenId) {
      // 用户未授权登录，则进入登录流程
      let codeInfo = await this.login();
      let userInfo = await this.getUserInfo();
      // 获取到code和userInfo之后调起请求，返回openId/token
      console.log('用户授权登录获取的信息：codeInfo、userInfo：')
      console.log(codeInfo);
      console.log(userInfo);
      return userInfo
    } else {
      return '22222222222222222'
    }
  }
  // 获得code,检查到登录态失效时调用
  login () {
    return new Promise((resolve, reject) => {
      mpvue.login({
        success: function (res) {
          resolve(res)
        },
        fail: function (e) {
          console.log('获取code码失败')
          reject(e)
        }
      })
    })
  }
  // 需要先判断是否有权限调用信息，获取微信用户信息，成功获得code后调用
  getUserInfo () {
    return new Promise((resolve, reject) => {
      // 判断是否有拿到用户信息的权限
      mpvue.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // console.log('已经有权限');
            mpvue.getUserInfo({
              withCredentials: true,
              success: function (res) {
                resolve(res)
              },
              fail: function (e) {
                console.log('用户拒绝登录，获取用户信息失败');
                // 进行用户授权引导
              }
            })
          } else {
            mpvue.showModal({
              title: '警告',
              content: '为了更好地体验小程序功能，需要开启权限,点击确定修改权限',
              showCancel: false,
              success: () => {
                // 跳转到权限设置页面
                mpvue.openSetting({});
              }
            });
          }
        },
        fail: (err) => {
          console.log('用户信息权限申请失败');
          console.log(err);
        }
      });
    })
  }

  // get请求
  get(url, data) {
    mpvue.showLoading({
      title: '加载中' // 数据请求前loading，提高用户体验
    })
    return new Promise((resolve, reject) => {
      mpvue.request({
        url: this.commonUrl + url,
        data: data,
        method: 'GET',
        header: {
          'Content-Type': 'application/json'
        }, // 设置请求的 header
        success: function (res) {
          // success
          mpvue.hideLoading();
          if (res.statusCode !== 200) {
            mpvue.showToast({
              title: '网络出错，稍后再试',
              icon: 'none'
            });
            return false;
          }
          resolve(res.data);
        },
        fail: function (error) {
          // fail
          mpvue.hideLoading();
          reject(error);
        },
        complete: function () {
          mpvue.hideLoading();
          // complete
        }
      })
    })
  }
  // post请求
  post(url, data) {
    mpvue.showLoading({
      title: '加载中'
    })
    return new Promise((resolve, reject) => {
      mpvue.request({
        url: this.commonUrl + url,
        data: data,
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        }, // 设置请求的 header
        success: function (res) {
          // success
          mpvue.hideLoading();
          if (res.statusCode !== 200) {
            mpvue.showToast({
              title: '网络出错，稍后再试',
              icon: 'none'
            });
            return false;
          }
          resolve(res.data);
        },
        fail: function (error) {
          // fail
          mpvue.hideLoading();
          reject(error);
        },
        complete: function () {
          // complete
          mpvue.hideLoading();
        }
      })
    })
  }

  // 跳转到其他小程序,返回一个promise对象,参数为跳转的小程序APPID
  gotoMiniapp(toAppid) {
    return new Promise((resolve, reject) => {
      mpvue.navigateToMiniProgram({
        appId: toAppid,
        envVersion: 'release',
        success: (res) => {
          // console.log("打开成功");
          resolve(res);
        },
        fail: (e) => {
          // console.log("打开失败");
          reject(e);
        }
      });
    });
  }
  //  上报formid接口
  submitFormid(formid) {
    // 用于将数据拼接为对象
    let data = {};
    // 获得当前时间戳
    let timestamp = new Date().getTime();
    // 获得秘钥secret
    let secret = this.secret;
    // 对秘钥和时间戳组成的字符串进行两次md5加密，生成token
    // data.token =  md5.hexMD5(md5.hexMD5(this.secret+timestamp));
    // 将时间戳加入到数据对象
    data.timestamp = timestamp;
    // 获得用户的ssid,并加入到数据对象
    data.ssid = this.getSsid() || '';
    // 拼接formid
    data.formid = formid;
    // 上报
    this.post('/formid', data).then(res => {
      // 如果正确请求
      if (res.data.code === 200) {
        console.log('formid上报成功')
        console.log(res);
        // 上报成功
        return true;
      } else {
        console.log('上报过程中出错，错误：');
        console.log(res);
        return false;
      }
    }).catch(e => {
      console.log('上报过程中出错，错误：');
      console.log(e);
    })
  }
}

export default new Https();
