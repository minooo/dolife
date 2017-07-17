import React, {PureComponent} from "react";
import {connect} from 'react-redux';
import {setTitle, getApi, callApi} from "utils";
import Header from 'components/Header';
import {List, InputItem, Button, Toast} from 'antd-mobile'
import {setMobile} from 'actions/user';

@connect(state => ({
  config: state.config
}), {
  setMobile
})
export default class extends PureComponent {
  state = {
    mobile: '',
    verifycode: '',
    timeNum: 0,
    isSaving: false
  }
  timer = false

  componentDidMount() {
    const {config} = this.props
    setTitle(config.siteConfig.sitename)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  onSave = () => {
    const {router, setMobile} = this.props
    const {mobile, verifycode} = this.state
    if (!(/^1(3|4|5|7|8)[0-9]\d{8}$/.test(mobile))) {
      return Toast.fail('请填写正确的手机号')
    }
    if (!verifycode) {
      return Toast.fail('请填写验证码')
    }
    this.setState({
      isSaving: true
    })
    return callApi(`/user/setting/mobile`, {mobile, verifycode}, 'PUT').then(response => {
      if (response.code == 'SUCCESS') {
        setMobile(mobile)
        Toast.success('保存成功', 2, () => {
          router.goBack()
        })
      } else {
        response.msg && Toast.fail(response.msg)
      }
    })
  }
  timeComputed = (secend) => {
    this.setState({
      timeNum: secend
    }, () => {
      this.timer = setInterval(() => {
        this.setState(state => ({
          timeNum: state.timeNum - 1
        }))
      }, 1000)
    })
  }
  onGetCode = () => {
    const {mobile} = this.state
    if (!(/^1(3|4|5|7|8)[0-9]\d{8}$/.test(mobile))) {
      return Toast.info('请填写正确的手机号')
    } else {
      getApi(`/verifycode`, {mobile}, 'GET').then(response => {
        if (response.code == 'SUCCESS') {
          this.timeComputed(60)
          return Toast.info(`获取成功，短信验证码` + response.minutes + `分钟内有效`)
        } else {
          response.msg && Toast.info(response.msg)
        }
      })
    }
  }
  onFieldChange = (value, key) => {
    this.setState({
      [key]: value
    })
  }

  render() {
    const {timeNum, isSaving, mobile, verifycode} = this.state
    return <div>
      <Header title="绑定手机号"/>
      <List>
        <InputItem
          type="number"
          maxLength={11}
          clear
          placeholder="请填写您的手机号"
          value={mobile}
          onChange={e => this.onFieldChange(e, 'mobile')}
        >
          手机号
        </InputItem>
        <InputItem
          type="number"
          maxLength={6}
          clear
          placeholder="请填写您收到的验证码"
          extra={timeNum > 0 ? `${timeNum}s` : <div onClick={this.onGetCode}>获取验证码</div>}
          value={verifycode}
          onChange={e => this.onFieldChange(e, 'verifycode')}
        >
          验证码
        </InputItem>
      </List>
      <div className="pd30">
        <Button className="bg-main color10" onClick={this.onSave} loading={isSaving} disabled={isSaving}>
          保存
        </Button>
      </div>
    </div>
  }
}