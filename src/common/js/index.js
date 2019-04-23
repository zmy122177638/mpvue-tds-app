function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

// mpvue 微信地址接口调用
function getWxAddress () {
  mpvue.getSetting({
    success: res => {
      if (res.authSetting['scope.address']) {
        console.log('已经有权限');
        mpvue.chooseAddress({
          success: function (res) {
            console.log('成功1111');
            console.log(res);
          },
          fail: function (e) {
            console.log('失败1111');
          }
        })
      } else {
        mpvue.chooseAddress({
          success: function (res) {
          },
          fail: function (e) {
            console.log('失败222222')
            mpvue.showModal({
              title: '提示',
              content: '获取微信地址需要开通权限',
              showCancel: false,
              success: () => {
                // 跳转去获取地址权限
                mpvue.openSetting({});
              }
            });
          }});
      }
    },
    fail: (err) => {
      console.log('用户信息权限申请失败');
    }
  });
}

export default {
  formatNumber,
  formatTime,
  getWxAddress
}
