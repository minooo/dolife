import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Result} from 'antd-mobile';
import Success from './Success';
import Fail from './Fail';
import Warn from './Warn';
export default class extends PureComponent {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  static Success = Success
  static Fail = Fail
  static Warn = Warn

  render() {
    const {router} = this.context
    const {icon, title, message} = this.props
    return <Result
      img={icon}
      title={title}
      message={message}
      buttonText="返回"
      buttonClick={() => {
        history.state ? history.back() : router.push({
          pathname: '/'
        })
      }}
    />
  }
}