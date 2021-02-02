var App = {
  baseUrl: 'https://687100841.zaniliazhao.cn',
  isWeapp: true,
  getInfo: function getInfo (id) {
    var that = this
    $.ajax({
      url: this.baseUrl + '/web/h5/wedding/blessings',
      data: {
      },
      success: function success (res) {
        that.voters = res.data.voters
        that.renderVoterList(res.data.voters)
      }
    })
  },
  addBless: function (unionID = 'oRbKnt6xb0xA932aFF8qValsulkY') {
    var that = this
    $.ajax({
      type: 'POST',
      url: this.baseUrl + '/web/h5/wedding/addBless',
      data: {
        pageID: webviewSDK.params().pageID || '',
        unionID
      },
      success: function success (res) {
        that.voters = res.data.voters
        that.renderVoterList(res.data.voters, true)
        $('#add').hide()
        $('.heart2').css({
          opacity: 1
        })
        setTimeout(function () {
          const $el = $('#' + unionID)
          if ($el) {
            $el[0].scrollIntoView({behavior: 'smooth', block: 'center', inline: 'nearest'})
            const txt = $el.find('h2').text()
            setTimeout(function () {
              $el.addClass('active')
              $el.find('h2').text('嘿！我在这～')
            }, 666)
            setTimeout(function () {
              $el.removeClass('active zoomInUp')
              $el.find('h2').text(txt)
            }, 3666)
          }
        }, 789)
      }
    })
  },
  renderVoterList: function (list, refresh = false) {
    const arr = []
    var len = list.length
    list.map((v, i) => {
      const info = JSON.parse(v.user_info)
      arr.push(`
      <li id="${v.union_id}" class="animated zoomInUp delay${Math.floor(Math.random() * 5)} fast">
        <h2>${len - i + '. ' + info.nickName}</h2>
        <img src="${info.avatarUrl}" alt="">
      </li>
      `)
    })
    // if (!refresh) {
    //   arr.unshift(`
    //   <li id="add" class="animated zoomInUp delay-1s fast">
    //     <h2 style="text-align: center;background: red;">我要上墙</h2>
    //     <img src="img/round-add-button.svg" alt="我要上墙">
    //   </li>
    //   `)
    // }
    $('.characters').html($(arr.join('')))
  }
}
webviewSDK.isInWeapp().then(result => {
  console.log('webviewSDK.isInWeapp(): ', result)
  if (!result) {
    App.isWeapp = false
  }
})
if (location.hostname.indexOf('local') > -1) {
  App.baseUrl = 'http://127.0.0.1:9527'
}

App.getInfo()
$('#app').on('click', '#add', function (e) {
  document.body.classList.toggle('liked')
  setTimeout(function () {
    document.body.classList.toggle('liked')
    if (App.isWeapp) {
      e.preventDefault()
      webviewSDK.getUserInfo({}, function (userinfo) {
        App.addBless(userinfo.unionId)
      })
    } else {
      alert('暂时只支持在微信小程序内上墙')
    }
  }, 1200)
})
