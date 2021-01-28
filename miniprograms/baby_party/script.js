function findGetParameter (parameterName) {
  var result = null,
    tmp = []
  location.search
      .substr(1)
      .split('&')
      .forEach(function (item) {
        tmp = item.split('=')
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1])
      })
  return result
}

var App = {
  baseUrl: 'https://687100841.zaniliazhao.cn',
  publishTime: new Date('08/20/2018 12:08:08'),
  resetTextareaHeight: function () {
    $('textarea').each(function () { $(this).css('height', $(this)[0].scrollHeight) })
  }
}
if (location.hostname.indexOf('local') > -1) {
  App.baseUrl = 'http://127.0.0.1:9527'
}
$(function () {
  App.resetTextareaHeight()
})
