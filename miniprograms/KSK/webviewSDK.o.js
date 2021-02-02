
    /* global define location wx alert */

    (function (global) {
      console.warn('＊＊ 注意⚠️ 此处为网页console，非小程序console ＊＊')

      /**
      * 定义webview
      * webview.params      webview 参数
      * webview.share       微信内分享
      * webview.launchAPP   唤起 APP
      */
      var webview = {
        version: '1.0.0',
        prefix: '_KSKWebviewData=',
        isInWeapp: function () {
          const ua = window.navigator.userAgent.toLowerCase()
          return new Promise((resolve) => {
            if (location.search.indexOf('env=miniprogram') > 0) {
              resolve(true)
            } else {
              if (ua.indexOf('micromessenger') === -1) { // 不在微信或者小程序中
                resolve(false)
              } else {
                wx.miniProgram.getEnv((res) => {
                  if (res.miniprogram) { // 在小程序中
                    resolve(true)
                  } else { // 在微信中
                    resolve(false)
                  }
                })
              }
            }
          })
        },
        updateShareInfo: function () {},
        cfgWebview: Object.assign({
          bgColor: '', // 小程序导航栏颜色
          title: '', // 标题
          desc: `(●'◡'●)ﾉ♥`, // 描述
          link: '', // 链接
          imgUrl: 'https://cdn.jsdelivr.net/gh/kainy/js.org@latest/images/kainy.jpg', // 图标
        }, window.webviewSDKCfg)
        // }
      }
      // 暴露接口
      window.webviewSDK = webview;

      var o2qs = function (o) {
        const ret = Object.keys(o).map(i => `${i}=${encodeURIComponent(typeof o[i] === 'object' ? JSON.stringify(o[i]) : o[i])}`).join('&')
        // console.log(ret);
        return ret
      }
      var qs2o = function (str) {
        const obj = {}
        if (!str) return obj
        const pairs = str.split('&')
        let pair
        let pos

        for (let i = 0, len = pairs.length; i < len; ++i) {
          pair = pairs[i]
          pos = pair.indexOf('=')
          if (pos === -1) {
            obj[decodeURIComponent(pair)] = ''
          } else {
            obj[decodeURIComponent(pair.slice(0, pos))] =
              decodeURIComponent(pair.slice(pos + 1))
          }
        }
        console.log('qs2o: ', obj)
        return obj
      }

      var getBgColor = function () {
        var rgbToHex = function(rgb) {
            // rgb(x, y, z)
            var color = rgb.toString().match(/\d+/g); // 把 x,y,z 推送到 color 数组里
            var hex = "#";
        
            for (var i = 0; i < 3; i++) {
                // 'Number.toString(16)' 是JS默认能实现转换成16进制数的方法.
                // 'color[i]' 是数组，要转换成字符串.
                // 如果结果是一位数，就在前面补零。例如： A变成0A
                hex += ("0" + Number(color[i]).toString(16)).slice(-2);
            }
            return hex;
        };
        var strBG = getComputedStyle(document.body).getPropertyValue('background-color') !== 'rgba(0, 0, 0, 0)' ? getComputedStyle(document.body).getPropertyValue('background-color') : getComputedStyle(document.body.parentNode).getPropertyValue('background-color');
        if (strBG && strBG !== 'rgba(0, 0, 0, 0)') {
          strBG = rgbToHex(strBG)
        } else {
          strBG = '#111'
        }
        console.log(strBG);
        return strBG
      }

      if (window.navigator.userAgent.indexOf('MicroMessenger') > -1) {
        wx.ready(function () {
          console.warn('wx.ready')
          webview.updateShareInfo()
        })
        var strBG = webview.cfgWebview.bgColor || getBgColor();
        
        var concat = location.search ? '&' : '?'
        var arrUrl = location.href.split('#')
        var qUrl = arrUrl[0].replace('http://', 'https://')+ concat + 'bgColor=' + strBG.replace('#', '') + '#' + arrUrl[1]
    
        var elWX = document.createElement('wx-open-launch-weapp');
        elWX.style.position = 'fixed';
        elWX.style.display = 'none';
        elWX.style.backgroundColor = '#04be02';
        elWX.style.borderRadius = '4px';
        elWX.style.boxShadow = '0 0 8px rgba(0,0,0,.4)';
        elWX.style.right = '10px';
        elWX.style.padding = '4px 16px';
        elWX.style.bottom = '20px';
        elWX.style.zIndex = '9999';
        elWX.setAttribute('username', 'gh_79737174b780')
        elWX.setAttribute('path', 'pages/webview/webview.html?q=' + encodeURIComponent(qUrl))
        elWX.innerHTML = `
        <template>
          <style>
          .btn { 
            color: #fff;
            text-decoration: none;
            font-size: 14px;
          }
          </style>
          <a class="btn">小程序中打开</a>
        </template>`;
        document.body.appendChild(elWX);
        elWX.addEventListener('launch', function () {
          console.log('success');
        });
        elWX.addEventListener('ready', function (e) {
          console.log('开放标签 ready')
          elWX.style.display = 'flex';
        })
        var script = document.createElement('script')
        script.src = 'https://kainy.cn/tool/wxShare/script.php?url=' + encodeURIComponent(location.href.split('#')[0])
        document.body.appendChild(script);
      };
      if (typeof define === 'function' && (define.amd || define.cmd)) {
        if (define.amd) {
              // AMD 规范，for：requirejs
          define(function () {
            return webview
          })
        } else if (define.cmd) {
              // CMD 规范，for：seajs
          define(function (require, exports, module) {
            module.exports = webview
          })
        }
      };
      // 绑定 hashchange 事件，触发回调方法
      window.addEventListener('hashchange', function () {
        const strWebviewData = location.hash.split(webview.prefix).pop()
        console.log('webviewSDK hashchange strWebviewData: ', strWebviewData, location, 'hostory.length: ', window.history.length)
        if (strWebviewData && webview.callback) {
          const kskData = decodeURIComponent(strWebviewData)
          if (kskData.indexOf('{') === 0) {
            webview.callback(JSON.parse(kskData))
            webview.callback = null
            window.history.back() // 返回
          }
        }
        if (strWebviewData === 'shouldback') {
          window.history.back()
        }
      });
      webview.updateShareInfo = function (info = {}) {
        webview.cfgWebview = Object.assign({}, webview.cfgWebview, info)
        var obj = { 
          title: webview.cfgWebview.title || document.title, // 分享标题
          desc: webview.cfgWebview.desc, // 分享描述
          link: webview.cfgWebview.link || location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: webview.cfgWebview.imgUrl, // 分享图标
          success: function () {
            console.warn('share config finish')
          }
        }
        console.warn('updateShareInfo: ', obj)
        wx.updateAppMessageShareData(obj)
        wx.updateTimelineShareData(obj)
      };
      /**
       * params: 返回 webview 参数
       * params.env           网页运行环境 "miniprogram"，默认 null
       * params.scene         进入小程序的场景值
       * params.extend        分享页调 share／launchAPP 方法时传入的参数
       */
      webview.params = function () {
        var params = qs2o(location.search.replace('?', ''))
        return params
      }
      /**
       * 分享本页
       * @param {*} data
       */
      webview.shareTitle = function (data = {
        title: webview.cfgWebview.title || document.title, // 分享小卡片的标题
        extend: '', // 小卡片传递参数，可在目标页中通过 params().extend 访问
        webviewUrl: webview.cfgWebview.link || location.href // 分享页面的 URL，不传则取当前页 URL
      }) {
       // console.log(data)
        // alert('准备完毕，请点击右上角分享。') // TODO:优化提示交互
        typeof wx !== 'undefined' && wx.miniProgram.postMessage({
          // action: 'share',
          data
        })
      }
      setTimeout(webview.shareTitle, 2999); // 默认执行一次
      /**
       * 条转分享
       * @param {*} data
       */
      webview.share = function (data = {
        title: webview.cfgWebview.title || document.title, // 分享小卡片的标题
        extend: '', // 小卡片传递参数，可在目标页中通过 params().extend 访问
        webviewUrl: webview.cfgWebview.link || location.href, // 分享页面的 URL，不传则取当前页 URL
        openInWeapp: '' // 任意字符取“真”,是否在小程序中打开URL（二维码中用 kainy.cn/t 替换 t.kainy.cn）
      }) {
        const opt = {
          url: '/pages/webview/share?webviewurl=' + encodeURIComponent(data.webviewUrl.replace('env=miniprogram', '')) + '&title=' + data.title + '&openInWeapp=' + data.openInWeapp
        }
        console.log('webview.share: ', opt)
        wx.miniProgram.navigateTo(opt)
      }
      webview.launchAPP = function (data) {
        if (webview.params().scene === 1036) {
          console.log(data)
          // wx.miniProgram.switchTab({
          //   url: '/pages/index/index?extend=${data.extend}'
          // })
          wx.miniProgram.navigateTo({
            url: `../webview/launchapp?extend=${data.extend}`
          })
        } else {
          alert(`场景值:${webview.params().scene}不满足条件`)
        }
      }
      webview.getUserInfo = function (data = {}, callback = console.log) {
        webview.callback = callback
        const callbackURL = data.callback || location.href
        wx.miniProgram.navigateTo({
          url: `/pages/webview/userinfo?callback=${encodeURIComponent(callbackURL)}`
        })
      }
      webview.pay = function (data = {
        payDescription: '', // 支付描述
        amount: 0, // 单位：分
        noticeTitle: '',
        noticeRemark: '',
        autoPay: null,
        callback: location.href, // 支付回调页地址
        package: {} // 扩展信息 package.feeItems
      }) {
        const url = `/pages/webview/pay?${o2qs(data)}`
        console.log('pay url: ' + url)
        wx.miniProgram.navigateTo({
          url
        })
      }
    })(window)
