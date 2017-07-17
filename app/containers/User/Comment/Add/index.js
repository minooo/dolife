import React, {PureComponent} from 'react';
import {Toast} from 'antd-mobile';
import UserCommentAdd from 'components/User/Comment/Add';
import {postApi, wx} from 'utils';

export default class extends PureComponent {
  state = {
    comment: {
      score: 3,
      score_environment: 3,
      score_service: 3,
      content: '',
      photos: [],
      images: []
    }
  }

  componentDidMount() {
    const {location, router} = this.props
    if (!location.state || !location.state.order) {
      Toast.fail('无效的订单信息', 2, () => {
        router.replace({
          pathname: '/user'
        })
      })
    }
  }

  onSubmit = (e) => {
    const {location} = this.props
    const {comment} = this.state
    const order = location.state.order
    const data = {
      order_id: order.id,
      score: comment.score,
      score_service: comment.score_service,
      score_environment: comment.score_environment,
      content: comment.content,
      images: comment.images.join(',')
    }
    return postApi('/comment/add', data).then(response => {
      if (response.code == 'SUCCESS') {
        Toast.success('感谢您的评价', 2, () => {
          history.back()
        })
      } else {
        Toast.info(response.msg)
      }
    })
  }
  onAddImage = (e) => {
    e.preventDefault();
    if (this.state.comment.photos.length > 9) {
      Toast.info('最多可上传10张图片')
      return
    }
    wx.chooseImage({
      count: 5
    }).then(({localIds}) => {
      wx.getLocalImgData(localIds).then(res => {
        this.onCommentChange(this.state.comment.photos.concat(res.map(n => ({url: n}))), 'photos')
      })
      return wx.uploadImages({localIds})
    }).then(({serverIds}) => {
      this.onCommentChange(this.state.comment.images.concat(serverIds), 'images')
    })
  }
  onChangeImage = (files, operationType, index) => {
    if (operationType == 'remove') {
      this.onCommentChange(this.state.comment.images.filter((n, i) => i != index), 'images')
      return this.onCommentChange(this.state.comment.photos.filter((n, i) => i != index), 'photos')
    }
    return this.onCommentChange(files, 'photos')
  }
  onCommentChange = (value, key) => {
    this.setState(state => ({
      comment: {
        ...state.comment,
        [key]: value
      }
    }))
  }

  render() {
    const {comment} = this.state
    return <UserCommentAdd
      comment={comment}
      onSubmit={this.onSubmit}
      onAddImage={this.onAddImage}
      onChangeImage={this.onChangeImage}
      onCommentChange={this.onCommentChange}
    />
  }
}