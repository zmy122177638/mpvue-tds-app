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
// 支付接口

import store from '../../store/store';
class Https {
  constructor() {
    // 服务器baseUrl
    // this.commonUrl = 'http://miniprogram.dev.com/api/v1/'; // 福军本地
    this.commonUrl = 'http://tuan.baidichan.com/api/v1/'; // 测试服
    // 必须：当前小程序的appid
    this.appid = 'wx36728f07d8012894';
    // 必须：小程序私钥secret
    this.secret = '81314d87c17307bfe22996c48c1f4c3d';
    // token 和 openid,由登录成功后写入
    this.token = '';
  }
  // 小程序登录流程
  // async 异步处理登录流程，保证每个环节获取数据正确
  async loginFlow() {
    if (!this.hasOpenId) {
      // 用户未授权登录，则进入登录流程
      let codeInfo = await this.login();
      let userInfo = await this.getUserInfo();
      // 获取到code和userInfo之后调起请求，返回openId/token
      // console.log('用户授权登录获取的信息：codeInfo、userInfo：')
      // console.log(codeInfo);
      // console.log(userInfo);
      // 根据code、encryptedData、iv三个参数项后台请求open_id以及用户信息
      let tempData = {};
      tempData.code = codeInfo.code;
      tempData.enc_data = userInfo.encryptedData;
      tempData.iv = userInfo.iv;
      let requestData = await this.post('auth/login', tempData);
      // console.log('服务器后台登录成功，数据：');
      // console.log(requestData);
      // console.log('走了授权登录流程，更新了token');
      this.token = requestData.data.token;
      return requestData
    } else {
      return '登录流程失败'
    }
  }
  // 获得code,检查到登录态失效时调用
  login() {
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
  getUserInfo() {
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
    // console.log('111111111token:');
    // console.log(this.token);
    mpvue.showLoading({
      title: '加载中' // 数据请求前loading，提高用户体验
    })
    // 设置头部
    return new Promise((resolve, reject) => {
      mpvue.request({
        url: this.commonUrl + url,
        data: data,
        method: 'GET',
        header: {
          'Authorization': 'Bearer ' + this.token,
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
          mpvue.showToast({
            title: '网络异常，稍后再试',
            icon: 'none'
          });
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
  post(url, data, tip = '') {
    // console.log('token:');
    // console.log(this.token);
    mpvue.showLoading({
      title: tip !== '' ? tip : '加载中'
    })
    return new Promise((resolve, reject) => {
      mpvue.request({
        url: this.commonUrl + url,
        data: data,
        method: 'POST',
        header: {
          'Authorization': 'Bearer ' + this.token,
          'content-type': 'application/x-www-form-urlencoded'
        }, // 设置请求的 header
        success: function (res) {
          // success
          mpvue.hideLoading();
          if (res.statusCode !== 200) {
            mpvue.showToast({
              title: '网络异常，稍后再试',
              icon: 'none'
            });
            return false;
          }
          resolve(res.data);
        },
        fail: function (error) {
          // fail
          mpvue.hideLoading();
          mpvue.showToast({
            title: '网络异常，稍后再试',
            icon: 'none'
          });
          reject(error);
        },
        complete: function () {
          // complete
          mpvue.hideLoading();
        }
      })
    })
  }

  /**
   * @description: common接口
   * @param {String} method 方法名
   * @param {String} url 接口地址
   * @param {Object} params request参数
   * @param {Object} config requst配置 loading配置
   * @return: undefined
   * @Date: 2019-04-26 20:23:07
   */
  request(method, url, params = {}, config = {}) {
    // 是否显示loading
    if (config && !config.ISLOADING) {
      mpvue.showLoading({
        title: config.tip ? config.tip : '加载中'
      })
    }
    return new Promise((resolve, reject) => {
      if (typeof params !== 'object') params = {};
      // 默认配置
      let options = {
        url: this.commonUrl + url,
        data: params,
        method: method.toLocaleUpperCase(),
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        ...config
      }
      // 追加token,防止单独设置请求头覆盖token
      options.header = {
        ...options.header,
        'authorization': 'Bearer ' + store.state.token
      }
      // 发起请求
      mpvue.request({
        ...options,
        success: function (res) {
          // success
          if (res.statusCode === 200) {
            resolve(res.data);
          } else if (res.statusCode === 401) {
            mpvue.navigateTo({
              url: '../../pages/start/main'
            })
            console.log('用户没有权限或token失效,需要跳转到登录页')
          } else {
            mpvue.showToast({
              title: '网络异常，稍后再试',
              icon: 'none'
            });
          }
        },
        fail: function (error) {
          // fail
          mpvue.showToast({
            title: '网络异常，稍后再试',
            icon: 'none'
          });
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
