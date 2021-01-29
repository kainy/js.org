'use strict';

new Vue({
  el: '#app',
  data: {
    area: '深圳',
    partyType: '百日',
    options: [],
    optionsType: [{
      label: '百日',
      value: '百日'
    }, {
      label: '周岁',
      value: '周岁'
    }],
    birthday: new Date(),
    dataParty: {
      '百日': {},
      '周岁': {}
    },
    startDate: App.publishTime
  },
  watch: {
    partyType: function partyType(val) {
      this.options = this.dataParty[val].birthCitys;
    }
  },
  computed: {
    // 活动开始前 7 天截止报名
    endDate: function endDate() {
      var dayCount = 99 - 7;
      if (this.partyType !== '百日') {
        dayCount = 365 - 7;
      }
      return new Date(dayCount * 24 * 3600 * 1000 + +new Date());
    }
  },
  created: function created() {
    this.getPartyInfo();
    this.options = [{
      label: '深圳',
      value: '深圳'
    }];
  },

  methods: {
    open: function open(picker) {
      this.$refs[picker].open();
    },
    handleDateChange: function handleDateChange(value) {
      console.log(value);
      // Toast({
      //   message: '已选择 ' + value.toString(),
      //   position: 'bottom'
      // });
    },
    getPartyInfo: function getPartyInfo() {
      var that = this;
      $.ajax({
        url: App.baseUrl + '/web/h5/baby_party/partys',
        type: 'get',
        data: {
          // birth_day: this.birthday
        },
        cache: false,
        xhrFields: { withCredentials: true },
        success: function success(res) {
          if (res.code === 0) {
            res.data.items.map(function (item) {
              // 处理出生城市
              var birthCitys = JSON.parse(item.birth_citys);
              birthCitys.map(function (city) {
                city.label = city.name;
                city.value = city.name;
                city.disabled = !city.isAvailable;
              });

              item.birthCitys = birthCitys;
              that.dataParty[item.party_types] = item;
            });
            // 城市选项
            that.options = that.dataParty[that.partyType].birthCitys;
          } else if (res.errors) {
            that.$messagebox.alert(res.errors[0]);
          } else if (res.message) {
            that.$messagebox.alert(res.message);
          } else {
            console.error(res);
          }
        },
        error: function error(XMLHttpRequest, textStatus, errorThrown) {
          alert("error XMLHttpRequest=" + XMLHttpRequest + ";textStatus=" + textStatus);
        }
      });
    },
    goNext: function goNext() {
      sessionStorage.BPD_area = this.area;
      sessionStorage.BPD_partyType = this.partyType;
      sessionStorage.BPD_birthday = this.birthday;
      sessionStorage.BPD_dataParty = JSON.stringify(this.dataParty[this.partyType]);
      location.href = 'detail.html?partyType=' + this.partyType;
    }
  }
});