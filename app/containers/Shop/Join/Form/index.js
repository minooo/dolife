import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import ShopJoinForm from 'components/Shop/Join/Form';
import {getApi, postApi, setTitle} from 'utils';
import {Toast} from 'antd-mobile';

@connect(state => ({
  join: state.shop.join
}))
export default class extends PureComponent {
  state = {
    joinInfo: {},
    agree: false,
  }

  componentDidMount() {
    setTitle(`商家入驻`)
  }

  onSave = () => {
    const {joinInfo} = this.state
    if (!joinInfo.shop_name) {
      return Toast.info('请填写店铺名称')
    }
    if (!joinInfo.shop_address) {
      return Toast.info('请填写店铺地址')
    }
    if (!joinInfo.contact_name) {
      return Toast.info('请填写联系人姓名')
    }
    if (!joinInfo.contact_phone) {
      return Toast.info('请填写联系人电话')
    }
    return postApi(`/shop/join/`, joinInfo).then(response => {
      if (response.code == 'SUCCESS') {
        Toast.success('申请提交成功，运营人员会在近期与您联系', 3, () => {
          history.back()
        })
      } else {
        response.msg && Toast.fail(response.msg)
      }
    })
  }
  onAgreeChange = () => {
    this.setState(state => ({
      agree: !state.agree
    }))
  }
  onFieldChange = (value, key) => {
    this.setState(state => ({
      joinInfo: Object.assign({}, state.joinInfo, {
        [key]: value
      })
    }))
  }

  render() {
    const {join} = this.props
    const {joinInfo, agree} = this.state
    return <ShopJoinForm
      config={join.config}
      joinInfo={joinInfo}
      agree={agree}
      onSave={this.onSave}
      onAgreeChange={this.onAgreeChange}
      onFieldChange={this.onFieldChange}
    />
  }
}