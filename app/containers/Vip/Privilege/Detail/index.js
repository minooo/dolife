import React, {PureComponent} from 'react'
import VipPriviegeDetail from 'components/Vip/Priviege/Detail';

export default class extends PureComponent {
  render() {
    const {location} = this.props
    return <VipPriviegeDetail
      priviege={location.state.priviege}
    />
  }
}