import React, {PureComponent} from 'react'
import Header from 'components/Header';
import {Button} from 'antd-mobile'
import s from './style.scss';

export default class extends PureComponent {
  state = {
    success: true,
    message: ''
  }

  componentDidMount() {
    const {location} = this.props
    this.setState(location.state)
  }

  render() {
    const {router} = this.props
    const {success, message} = this.state
    return <div className="bg-white flex-wrp flex-cell fullHeight">
      <Header title={success ? '提现成功' : '提现失败'}/>
      <div className="flex-item flex-wrp flex-center">
        <i className={`i i-wxpay color8 ${s.icon}`}/>
      </div>
      <div className="size26 color14 text-center pb30">{message}</div>
      <div className="pd30">
        <Button
          type="ghost"
          className={`color0 bg-main color10 nbr`}
          onClick={() => {
            history.back()
          }}
          activeStyle={false}
        >查看我的余额</Button>
        <Button
          type="ghost"
          className={`color14 mt30 bg-gray nbr`}
          onClick={() => {
            router.push({
              pathname: `/`
            })
          }}
          activeStyle={false}
        >返回首页</Button>
      </div>
      <div className="flex-item"></div>
    </div>
  }
}