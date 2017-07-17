import React, {PureComponent} from "react";
import {connect} from 'react-redux';
import Header from 'components/Header';
import Link from 'components/Link';
import {increaseMoney} from 'actions/user';
import {Checkbox, Button, Toast} from 'antd-mobile';
import {setTitle, postApi} from "utils";
import p from 'assets/images/s.gif';
import icon from 'assets/images/icon_finance.png';
import {getApi} from "utils";

@connect(state => ({
  config: state.config,
  user: state.user
}), {
  increaseMoney
})
export default class extends PureComponent {
  state = {
    agree: false,
    mp_name: null
  }

  componentDidMount() {
    const {config} = this.props
    setTitle(config.siteConfig.sitename)
  }

  onSubmit = () => {
    const {router, increaseMoney} = this.props
    return postApi(`/user/money/withdraw`).then(response => {
      if (response.code == 'SUCCESS') {
        increaseMoney(response.money)
        router.push({
          pathname: `/user_finance_result`,
          state: {
            success: true,
            message: '提现申请已提交，请稍候接收提现红包'
          }
        })
      } else {
        response.msg && Toast.fail(response.msg)
      }
    })
  }

  render() {
    const {config, user} = this.props
    const {agree} = this.state
    return <div className="bg-white fullHeight">
      <Header title="余额" right={<Link href={{pathname: `/user_finance_logs`}} clasName="color6 size32">余额明细</Link>}/>
      <div className="ptb50 flex-wrp flex-center">
        <img src={p} className="bg-fill img-150" style={{backgroundImage: `url(${icon})`}}/>
      </div>
      <div className="flex-wrp flex-center size52 color6 ptb30">
        ￥{Math.floor(user.finance.money * 100) / 100}
      </div>
      <div className="pd30 size28 lh150 color4">
        <div>单次最低提现金额为10元，最高为200元。</div>
        <div>提现红包将会通过公众号发放，申请提现前请确保您已关注"{config.siteConfig.mp_name}"公众号。</div>
      </div>
      <Checkbox.AgreeItem
        onChange={() => this.setState({
          agree: !this.state.agree
        })}>
        <div className="color6">我已关注"{config.siteConfig.mp_name}"</div>
      </Checkbox.AgreeItem>

      <div className="pd30">
        <Button
          className="color10 bg-main"
          onClick={this.onSubmit}
          disabled={!agree || parseFloat((user.finance && user.finance.money) || 0) < 10}
        >提现</Button>
      </div>
    </div>
  }
}