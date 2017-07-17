import React from 'react';
import Result from 'components/Result';
import {Icon} from 'antd-mobile';
export default ({title, message}) => <Result
  icon={<Icon type="cross-circle-o" className="icon img-100" style={{fill: '#F13642'}}/>}
  title={title}
  message={message}
/>