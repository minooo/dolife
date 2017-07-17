import React, {PureComponent} from 'react';
import ResultFail from 'components/Result/Fail';
import {setTitle} from 'utils';

export default class extends PureComponent {
  componentDidMount() {
    setTitle(`404`)
  }

  render() {
    return <ResultFail
      title="404"
      message="页面不存在"
    />
  }
}