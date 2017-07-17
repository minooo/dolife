// import wx from "wx";
export const setConfig = (config) => wx.config(config)
export const ready = () => {
  return new Promise((resolve, reject) => {
    wx.ready(resolve)
    wx.error(reject)
  })
}
export const setShare = (config) => {
  const params = {
    title: config.title || '',
    desc: config.desc || '',
    imgUrl: config.imgUrl || '',
    link: config.link || location.href
  }
  ready().then(() => {
    wx.onMenuShareAppMessage(params) //分享给朋友
    wx.onMenuShareQQ(params) //分享到QQ
    wx.onMenuShareWeibo(params) //分享到腾讯微博
    wx.onMenuShareQZone(params) //分享到QQ空间
    wx.onMenuShareTimeline(Object.assign({}, params, {
      title: params.title + ' ' + params.desc,
      desc: ''
    })) //分享到朋友圈
  })
}
export const previewImage = (thumb, list) => {
  wx.previewImage({
    current: thumb, // 当前显示图片的http链接
    urls: list // 需要预览的图片http链接列表
  })
}
export const pay = (params) => {
  return new Promise((resolve, reject) => {
    wx.chooseWXPay({
      timestamp: params.timestamp,
      nonceStr: params.nonceStr,
      package: params.package,
      signType: params.signType,
      paySign: params.paySign,
      success: resolve,
      error: reject
    })
  })
}
export const getLocation = () => {
  return new Promise((resolve, reject) => {
    wx.ready(() => {
      wx.getLocation({
        type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: resolve,
        error: reject
      })
    })
  })
}
export const openLocation = (params) => {
  wx.openLocation({
    latitude: parseFloat(params.lat), // 纬度，浮点数，范围为90 ~ -90
    longitude: parseFloat(params.lng), // 经度，浮点数，范围为180 ~ -180。
    name: params.title || '', // 位置名
    address: params.desc || '', // 地址详情说明
    scale: params.scale || 13, // 地图缩放级别,整形值,范围从1~28。默认为最大
    infoUrl: params.link || '' // 在查看位置界面底部显示的超链接,可点击跳转
  })
}
export const scanQRCode = (params = {}) => {
  return new Promise((resolve, reject) => {
    wx.scanQRCode({
      needResult: params.needResult || 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
      scanType: params.scanType || ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
      success: resolve,
      error: reject
    })
  })
}
export const chooseImage = (params = {}) => {
  return new Promise((resolve, reject) => {
    wx.chooseImage({
      count: params.count || 1,
      sizeType: params.sizeType || ['original', 'compressed'],
      sourceType: params.sourceType || ['album', 'camera'],
      success: resolve,
      error: reject
    })
  })
}
export const uploadImage = (localId) => {
  return new Promise((resolve, reject) => {
    wx.uploadImage({
      localId: localId,
      isShowProgressTips: 1,
      success: resolve,
      error: reject
    })
  })
}
const _uploadImage = (params, serverIds, resolve) => {
  const localId = params.localIds.shift()
  wx.uploadImage({
    localId: localId,
    isShowProgressTips: params.isShowProgressTips || 1,
    success: f => {
      serverIds.push(f.serverId)
      if (params.localIds.length > 0) {
        _uploadImage(params, serverIds, resolve)
      } else {
        resolve({serverIds: serverIds})
      }
    }
  })
}
export const uploadImages = (params = {}) => {
  return new Promise((resolve, reject) => {
    if (params.localIds.length == 0) {
      resolve({serverIds: []})
    } else {
      _uploadImage(params, [], resolve)
    }
  })
}
export const getLocalImgData = (localIds) => {
  if (window.__wxjs_is_wkwebview) {
    return Promise.all(localIds.map(n => new Promise((resolve, reject) => {
      wx.getLocalImgData({
        localId: n,
        success: res => {
          resolve(res.localData)
        }
      })
    })))
  } else {
    return Promise.resolve(localIds)
  }
}