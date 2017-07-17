import React from 'react';
import Result from 'components/Result';
import {Icon} from 'antd-mobile';
export default ({title, message}) => <Result
  icon={<Icon type="check-circle" className="icon img-100" style={{fill: '#34b234'}}/>}
  title={title}
  message={message}
/>