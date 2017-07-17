import React, {PureComponent} from "react";
import {connect} from 'react-redux';
import {Modal, Toast} from 'antd-mobile';
import {setTitle, getApi, callApi} from "utils";
import UserAddressHome from 'components/User/Address/Home';

@connect(state => ({
  config: state.config
}))
export default class extends PureComponent {
  state = {
    address: {
      isFetching: false,
      isMore: true,
      addresses: []
    },
    isManage: false
  }

  componentDidMount() {
    const {config} = this.props
    setTitle(config.siteConfig.sitename)
  }

  fetchAddresses = () => {
    if (this.state.address.isFetching || !this.state.address.isMore) {
      return
    }
    this.setState(state => ({
      address: Object.assign({}, state.address, {
        isFetching: true
      })
    }), () => {
      getApi(`/user/address`).then(response => {
        this.setState({
          address: {
            isFetching: false,
            isMore: false,
            addresses: response.addresss || []
          }
        })
      })
    })
  }
  toggleManage = () => {
    this.setState({
      isManage: !this.state.isManage
    })
  }
  onEdit = (e, address) => {
    e.stopPropagation()
    const {router} = this.props
    router.push({
      pathname: `/user_address_edit`,
      state: {
        address: address
      }
    })
  }

  onDelete = (e, address) => {
    e.stopPropagation()
    confirm('确认删除？') && callApi(`/user/address/${address.id}`, {}, 'DELETE').then(response => {
      if (response.code == 'SUCCESS') {
        this.setState(state => ({
          address: Object.assign({}, state.address, {
            addresses: state.address.addresses.filter((n) => {
              return n.id != address.id
            })
          })
        }))
      } else {
        response.msg && Toast.fail(response.msg)
      }
    })
  }
  onRowClick = (e, address) => {
    e.stopPropagation()
    const {location, router} = this.props
    if (location.state && location.state.back) {
      router.replace({
        pathname: location.state.back,
        state: {
          address: address
        }
      })
      return
    }
    this.onEdit(e, address)
  }

  render() {
    const {address, isManage} = this.state
    return <UserAddressHome
      address={address}
      isManage={isManage}
      fetchAddresses={this.fetchAddresses}
      toggleManage={this.toggleManage}
      onEdit={this.onEdit}
      onDelete={this.onDelete}
      onRowClick={this.onRowClick}
    />
  }
}