import moment from "moment";
export const serializeParams = (params) => {
  return Object.entries(params).map((n, i) => {
    return `${n[0]}=${n[1]}`
  }).join('&')
}
export const API_HOST = process.env.NODE_ENV == 'production' ? 'https://api.dolife.me' : 'http://dev.dolife.me';
export const API_ROOT = `${API_HOST}/api/web`;
export const callApi = (endpoint, data = null, method = 'GET') => {
  let fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint
  let opt = {
    method: method,
    credentials: 'include',
  }
  let headers = new Headers()
  if (data) {
    if (method == 'GET') {
      fullUrl += `?${serializeParams(data)}`
    }
    else {
      headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
      opt.body = serializeParams(data)
    }
  }
  opt.headers = headers
  return fetch(fullUrl, opt).then(response => response.json().then(json => ({
    json,
    response
  }))).then(({json, response}) => {
    if (!response.ok) {
      return Promise.reject(json)
    }
    return Object.assign({}, json)
  })
}
export const getApi = (endpoint, params = {}) => callApi(endpoint, params, 'GET')
export const postApi = (endpoint, params = {}) => callApi(endpoint, params, 'POST')
export const setTitle = (title) => {
  document.title = title
  if (is_IOS) {
    let i = document.createElement('iframe')
    i.src = '/favicon.ico'
    i.style.display = 'none'
    i.onload = () => {
      setTimeout(() => {
        i.remove()
      }, 0)
    }
    document.body.appendChild(i)
  }
}
export const distance_format = (value) => (value > 1000 ? (value / 1000).toFixed(1) + '公里' : value.toFixed(1) + '米')
export const date_format = (datetime, format) => moment(datetime).format(format)
export const date_obj = (datetime) => {
  const date = moment(datetime)
  const cdate = moment()
  if (date.isSame(cdate, 'day')) {
    return ({
      first_time: '',
      secend_time: date.format('HH:mm')
    })
  }
  if (date.isSame(cdate.subtract(1, 'days'), 'day')) {
    return ({
      first_time: '昨天',
      secend_time: date.format('HH:mm')
    })
  }
  if (date.isSame(cdate, 'month')) {
    return ({
      first_time: date.format('DD日'),
      secend_time: date.format('HH:mm')
    })
  }
  if (date.isSame(cdate.subtract(1, 'months'), 'month')) {
    return ({
      first_time: date.format('MM-DD'),
      secend_time: date.format('HH:mm')
    })
  }
  if (date.isSame(cdate, 'year')) {
    return ({
      first_time: '今年',
      secend_time: date.format('MM-DD')
    })
  }
  if (date.isSame(cdate.subtract(1, 'years'), 'year')) {
    return ({
      first_time: '去年',
      secend_time: date.format('MM-DD')
    })
  }
  return ({
    first_time: date.format('E'),
    secend_time: date.format('MM-DD')
  })
}
export const timeValue = (datetime) => {
  const diff = Math.abs(moment().diff(datetime))

  const leave1 = diff % (24 * 3600 * 1000)
  const leave2 = leave1 % (3600 * 1000)
  const leave3 = leave2 % (60 * 1000)
  const dateDiff = {
    days: Math.floor(diff / (24 * 3600 * 1000)), //日
    hours: Math.floor(leave1 / (3600 * 1000)), //小时
    minutes: Math.floor(leave2 / (60 * 1000)), //分
    seconds: Math.round(leave3 / 1000)
  }

  if (dateDiff.days >= 1) {
    return [`${dateDiff.days}天`]
  } else {
    return [dateDiff.hours, dateDiff.minutes, dateDiff.seconds]
  }
}
export const number_format = (s) => {
  var s1 = +s;
  if (!s1) return 0;
  var s2 = s1.toFixed(2);
  if (s2.substr(-1) !== '0') {
    return s2
  } else if (s2.substr(-2, 1) !== '0' && s2.substr(-1) === '0') {
    return s1.toFixed(1)
  } else {
    return s1.toFixed(0)
  }
}
export const is_IOS = typeof window !== 'undefined' && /(iPhone|iPad|iPod|iOS)/i.test(window.navigator.userAgent)
export const is_Android = typeof window !== 'undefined' && /(Android)/i.test(window.navigator.userAgent)
export const wechatUserAgent = typeof window !== 'undefined' && window.navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i)
export const wechatInfo = {
  version: wechatUserAgent ? wechatUserAgent[1] : null
}
export const setWxConfig = (url = location.href) => {
  return getApi('/wxconfig', {
    url: encodeURIComponent(url)
  }).then(response => {
    response.code == 'SUCCESS' && wx.config(response.wxConfig)
  })
}
export * as wx from './wxapi'
export * as cache from './cache'
export * as cookie from 'cookie-browser'

export const isMobile = mobile => {
  if (!mobile) {
    return;
  }
  if (/^1[3|4|5|7|8]\d{9}$/.test(mobile.replace(/ /g, ''))) return mobile.replace(/ /g, '');
  return false;
};