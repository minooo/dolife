import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Toast} from 'antd-mobile';
import Home from "components/Home";
import {getNavLinks} from "actions/navlink";
import {getFocuss} from "actions/focus";
import {getNotices} from "actions/notice";
import {getLinks} from "actions/link";
import {getShops} from "actions/shop";
import {getApi, setTitle, wx} from "utils";

@connect(state => ({
  config: state.config,
  user: state.user,
  navlink: state.navlink,
  focus: state.focus,
  notice: state.notice,
  link: state.link,
  shop: state.shop,
}), {
  getNavLinks,
  getFocuss,
  getNotices,
  getLinks,
  getShops
})
export default class extends PureComponent {
  state = {
    redpacket: {
      show: false
    }
  }

  componentDidMount() {
    const {getNavLinks, getFocuss, getNotices, getLinks, getShops, config} = this.props
    wx.setShare(config.shareConfig.home)
    setTitle(config.siteConfig.sitename)
    getFocuss('index')
    getNavLinks('index')
    getNotices('index')
    getLinks('index')
    getShops('index', {sort: 'recommend', limit: 5, offset: 0})
    getShops('index_new', {limit: 10, offset: 0})
    getShops('vip', {limit: 5}, '/vip/shops')
    const nowdate = moment().format('Y-M-D')
    const showtime = localStorage.getItem('home_redpacket')
    if (showtime != nowdate) {
      this.fetchAgentRedpackets()
    }
  }

  fetchAgentRedpackets = () => {
    return getApi(`/red_packets`).then(response => {
      if (response.code == 'SUCCESS') {
        if (response.redpackets && response.redpackets.length > 0) {
          this.setState({
            redpacket: {
              show: (response.redpackets || []).length > 0,
              redpackets: response.redpackets
            }
          })
          localStorage.setItem('home_redpacket', moment().format('Y-M-D'))
        }
      }
    })
  }
  onHideRedpacket = () => {
    this.setState({
      redpacket: {
        show: false
      }
    })
  }
  onGetRedpacket = (redpacket) => {
    getApi(`/red_packet/${redpacket.id}/open`).then(response => {
      if (response.code == 'SUCCESS') {
        this.setState(state => ({
          redpacket: {
            show: true,
            redpackets: state.redpacket.redpackets.map(n => {
              if (redpacket.id == n.id) {
                return Object.assign({}, n, {
                  is_get: true
                })
              }
              return n
            })
          }
        }))
      } else {
        Toast.fail(response.msg)
      }
    })
  }
  onSearch = (keyword) => {
    const {router} = this.props
    router.push({
      pathname: `/search`,
      query: {
        keyword: keyword
      }
    })
  }

  render() {
    const {config, focus, navlink, link, shop} = this.props
    const {redpacket} = this.state
    return <Home
      config={config}
      focus={focus}
      navlink={navlink}
      link={link}
      shop={shop}
      onSearch={this.onSearch}
      redpacket={redpacket}
      onHideRedpacket={this.onHideRedpacket}
      onGetRedpacket={this.onGetRedpacket}
    />
  }
}