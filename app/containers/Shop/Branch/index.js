import React, {PureComponent} from "react";
import {setTitle} from 'utils';
import ShopBranch from 'components/Shop/Branch'

export default class extends PureComponent {
  state = {
    shops: []
  }

  componentDidMount() {
    const {location} = this.props
    setTitle(`商家分店`)
    if (location.state && location.state.shops) {
      this.setState({
        shops: location.state.shops
      })
    }
  }

  render() {
    const {shops} = this.state
    return <ShopBranch
      shops={shops}
    />
  }
}