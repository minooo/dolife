import React, {PureComponent} from "react";
import {connect} from 'react-redux';
import Header from 'components/Header';
import {setTitle, wx, getApi} from 'utils';

@connect((state) => ({
  config: state.config
}))
export default class extends PureComponent {
  state = {
    rules: [
      {
        title: ' ',
        content: ' '
      }
    ],
  }

  componentDidMount() {
    const {config} = this.props
    wx.setShare(config.shareConfig.gift)
    setTitle(config.siteConfig.sitename + '-积分商城')
    this.fetchRule()
  }

  fetchRule = () => {
    getApi(`/gift/rule`).then(response => {
      this.setState({
        rules: response.rules
      })
    })
  }

  render() {
    const {rules} = this.state
    return <div>
      <Header title="积分规则"/>
      {rules.map((n, i) => <div className="bg-white border-t pd30" key={i}>
        <div className="flex-wrp flex-align-center">
          <div className="bg-orange" style={{width: '.07rem'}}>&nbsp;</div>
          <div className="pl10 size30">{n.title}</div>
        </div>
        <div className="pl20 pt20 lh150 size26 color4" dangerouslySetInnerHTML={{__html: n.content}}></div>
      </div>)}
    </div>
  }
}