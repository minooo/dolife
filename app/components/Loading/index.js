import React from "react";
import {ActivityIndicator} from "antd-mobile";

export default ({toast, inline, text}) => {
  if (toast) {
    return <ActivityIndicator text={text || '正在加载'} toast/>
  }
  if (inline) {
    return <div className="flex-wrp flex-center ptb20">
      <ActivityIndicator text={text || '正在加载'}/>
    </div>
  }
  return <ActivityIndicator text={text || '正在加载'}/>
}