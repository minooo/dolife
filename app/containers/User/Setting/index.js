import React, {PureComponent} from "react";
import {connect} from "react-redux";
import Header from "components/Header";
import moment from "moment";
import {Button, DatePicker, InputItem, List, Picker, Toast} from "antd-mobile";
import {getApi, callApi, setTitle, cache} from "utils";
import {createForm} from "rc-form";
import {setProfile} from "actions/user";

@connect(state => ({
  user: state.user,
  config: state.config
}), {
  setProfile
})
@createForm()
export default class extends PureComponent {
  state = {
    user: false,
    geo: false,
    showBool: false,
    saving: false
  }

  componentDidMount() {
    const {user, config} = this.props
    this.setState({
      user: user
    })
    setTitle(`${config.siteConfig.sitename}-我的信息`)
    this.initDistrict().then(geo => {
      this.setState({
        geo: geo
      })
    })
  }

  saveHandle = () => {
    if (this.state.saving) {
      Toast.info('操作未完成，请稍后再试')
      return
    }
    const {form, setProfile} = this.props
    const data = ((formValues) => {
      return Object.assign({}, {
        nickname: formValues.nickname || ' ',
        truename: formValues.truename || ' ',
        birthday: moment(formValues.birthday).format('l')
      }, formValues.area ? {
        province: formValues.area[0],
        city: formValues.area[1],
        district: formValues.area[2]
      } : {})
    })(form.getFieldsValue())
    this.setState({
      saving: true
    })
    return callApi(`/user`, data, 'PUT').then(response => {
      this.setState({
        saving: false
      })
      if (response.code == 'SUCCESS') {
        setProfile(response.user)
        Toast.success('保存成功')
      } else {
        Toast.info(response.msg)
      }
    })
  }

  initDistrict = () => {
    if (cache.get('geo')) {
      return Promise.resolive(cache.get('geo'))
    }
    return getApi(`/geo`).then(response => {
      if (response.code == 'SUCCESS') {
        cache.set('geo', this.state.geo, 180 * 24 * 60 * 60 * 1000)
        return response.geo
      }
    })
  }

  render() {
    const {form, router} = this.props
    const {getFieldProps} = form
    const {user, geo, saving} = this.state
    return <div>
      <Header title="个人信息" right={<div onClick={this.saveHandle}>保存</div>}/>
      <List>
        <InputItem
          {
            ...getFieldProps('nickname', {
              initialValue: user.nickname,
              valuePropName: 'value',
            })
          }
          placeholder="您的昵称"
        >昵称</InputItem>
        <InputItem
          {
            ...getFieldProps('truename', {
              initialValue: user.truename,
              valuePropName: 'value',
            })
          }
          placeholder="您的姓名"
        >姓名</InputItem>
        <List.Item
          extra={user.mobile}
          onClick={() => {
            router.push({pathname: `/user_setting_mobile`})
          }}
          arrow="horizontal"
        >手机号</List.Item>
        <DatePicker
          {
            ...getFieldProps('birthday', {
              initialValue: moment(user.birthday),
              valuePropName: 'value',
            })
          }
          className="am-date-picker"
          mode="date"
          title="选择日期"
          extra="可选,小于结束日期"
          minDate={moment('1949-10-01')}
          maxDate={moment()}>
          <List.Item arrow="horizontal">出生日期</List.Item>
        </DatePicker>
        {geo && <Picker
          {
            ...getFieldProps('area', {
              initialValue: [user.province, user.city, user.district],
              valuePropName: 'value',
            })
          }
          extra="请选择地区"
          labelNumber={5}
          data={geo}
          title="选择地区">
          <List.Item arrow="horizontal">所在城市</List.Item>
        </Picker>}
      </List>
      <List
        renderHeader={<div/>}
      >
        <List.Item
          arrow="horizontal"
          onClick={() => {
            router.push({pathname: `/user_addresses`})
          }}
        >
          <div className="flex-wrp flex-align-center">
            <div className="pr10"><i className="i i-map color8"/></div>
            <div>管理地址</div>
          </div>
        </List.Item>
      </List>
      <div className="pt50 plr20">
        <Button className="bg-main color10" loading={saving} onClick={this.saveHandle}>保存</Button>
      </div>
    </div>
  }
}
