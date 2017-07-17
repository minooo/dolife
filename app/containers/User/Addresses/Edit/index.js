import React, {PureComponent} from 'react';
import {Toast} from 'antd-mobile';
import UserAddressEdit from 'components/User/Address/Edit';
import {callApi, postApi} from 'utils';

export default class extends PureComponent {
  state = {
    address: {}
  }

  componentDidMount() {
    const {location} = this.props
    if (location.state && location.state.address) {
      this.setState({
        address: location.state.address
      })
    }
  }

  onAddressChange = (value, key) => {
    this.setState(state => ({
      address: Object.assign({}, state.address, {
        [key]: value
      })
    }))
  }
  onSave = () => {
    const {address} = this.state
    const {location} = this.props
    if (!address.realname) {
      return Toast.info('请填写联系人姓名')
    }
    if (!address.mobile) {
      return Toast.info('请填写联系人电话')
    }
    if (!address.address) {
      return Toast.info('请填写联系人地址')
    }
    if (location.state && location.state.address) {
      return callApi(`/user/address/${address.id}`, address, "PUT").then(response => {
        if (response.code == 'SUCCESS') {
          Toast.success('保存成功', 1, () => {
            history.back()
          })
        } else {
          response.msg && Toast.fail(response.msg)
        }
      })
    } else {
      return postApi(`/user/address/`, address).then(response => {
        if (response.code == 'SUCCESS') {
          Toast.success('保存成功', 1, () => {
            history.back()
          })
        } else {
          response.msg && Toast.fail(response.msg)
        }
      })
    }
  }

  render() {
    const {address} = this.state
    return <UserAddressEdit
      address={address}
      onAddressChange={this.onAddressChange}
      onSave={this.onSave}
    />
  }
}