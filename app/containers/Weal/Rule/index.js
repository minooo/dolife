import React, {PureComponent} from "react";
import {connect} from 'react-redux';
import WealRule from 'components/Weal/Rule';
import {getApi} from 'utils';

@connect()
export default class extends PureComponent {
  state = {
    rule: {}
  }

  componentDidMount() {
    this.fetchHelp()
  }

  fetchHelp = () => {
    return getApi('/help/super_offer').then(response => {
      this.setState(state => ({
        rule: response.data
      }))
    })
  }

  render() {
    const {rule} = this.state
    return <WealRule
      rule={rule}
    />
  }
}