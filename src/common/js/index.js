function formatNumber(n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime(date) {
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

/**
 * 倒计时数组
 * 请勿使用'-'代替'/',在iPhone不支持
 * @param {String} setEndTime 2018/08/27 18:00
 */
export const countDownTime = function (setEndTime) {
  let endTime = new Date(setEndTime).getTime();
  let time = new Date().getTime();

  if (endTime <= time) {
    return '';
  } else {
    let HsecondNum = endTime - time;
    // let day = Math.floor(HsecondNum / (24 * 3600 * 1000))

    let dd = Math.floor(HsecondNum % (24 * 3600 * 1000));
    let hours = Math.floor(HsecondNum / (3600 * 1000)).toString().padStart(2, '0');

    let minutesNum = dd % (3600 * 1000);
    let minutes = Math.floor(minutesNum / (60 * 1000)).toString().padStart(2, '0');

    let secondNum = dd % (60 * 1000);
    let second = Math.floor(secondNum / 1000).toString().padStart(2, '0');
    return [hours, minutes, second];
  }
};

// mpvue 微信地址接口调用
function getWxAddress() {
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
          success: function (res) {},
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
          }
        });
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
