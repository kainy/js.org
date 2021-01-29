'use strict'

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i]
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key]
      }
    }
  }
  return target
}

window.vue = new Vue({
  el: '#app',
  data: {
    credit_amount: '',
    DID: '',
    info: {
      name: '',
      idNo: '',
      phoneNumber: '',
      componyName: '',
      componyAddress: '',
      homeAddress: '',
      creditRate: '',
      contactName1: '',
      contactTel1: '',
      contactName2: '',
      contactTel2: ''
    },
    step: 1,
    feeAmount: 49.99
  },
  watch: {
    partyType: function partyType (val) {
      this.options = this.dataParty[val].birthCitys
    }
  },
  computed: {
    // 活动开始前 7 天截止报名
    endDate: function endDate () {
      var dayCount = 99 - 7
      if (this.partyType !== '百日') {
        dayCount = 365 - 7
      }
      return new Date(dayCount * 24 * 3600 * 1000 + +new Date())
    }
  },
  created: function created () {
    this.calcDID()
  },

  methods: {
    calcDID: function calcDID () {
      var that = this
      setTimeout(function () {
        Fingerprint2.get(function (components) {
          var values = components.map(function (component) {
            return component.value
          })
          var murmur = Fingerprint2.x64hash128(values.join('Kainy'), 31)
          that.getInfo(murmur)
        })
      }, 789)
    },
    getInfo: function getInfo (id) {
      var that = this
      $.ajax({
        url: App.baseUrl + '/web/h5/LanXin/user',
        data: {
          id: id
        },
        success: function success (res) {
          that.credit_amount = res.data.credit_amount
          that.DID = res.data.DID
          that.info = res.data
        }
      })
    },
    edit: function edit () {
      this.step = 2
      setTimeout(function () {
        window.scrollTo(0, 400)
      }, 8)
    },
    submitForm: function submitForm () {
      var that = this
      $.ajax({
        url: App.baseUrl + '/web/h5/LanXin/updateUser',
        data: _extends({
          DID: this.DID
        }, this.info),
        success: function success (res) {
          if (res.code === 0) {
            that.$messagebox.alert('提交成功，请在30分钟内完成支付。').then(function cb () {
              that.step = 3
              that.orderId = res.data.order_id
            })
          } else if (res.errors) {
            that.$messagebox.alert(res.errors[0])
          } else if (res.message) {
            that.$messagebox.alert(res.message)
          } else {
            console.error(res)
          }
        },
        error: function error (XMLHttpRequest, textStatus, errorThrown) {
          alert('error XMLHttpRequest=' + XMLHttpRequest + ';textStatus=' + textStatus)
        }
      })
    },
    pay: function pay () {
      window.post('./pay/pay.php', {
        orderid: this.orderId,
        attach: '审核费',
        callbackurl: window.location.href,
        value: this.feeAmount,
        type: this.isWX() ? 'xd2101' : 'xd1006'
      })
    },
    isWX: function isWX () {
      return (/micromessenger/.test(navigator.userAgent.toLowerCase())
      )
    }
  }
})
