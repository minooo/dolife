import React, {PureComponent} from "react";
import PropTypes from 'prop-types';
import SearchBar from "./SearchBar";

export default class extends PureComponent {
  static SearchBar = SearchBar
  static contextTypes = {
    router: PropTypes.object.isRequired
  }
  onLeftClick = () => {
    const {router} = this.context
    const {leftClick} = this.props
    if (leftClick) {
      return leftClick()
    }
    if (history.state) {
      return history.back()
    }
    router.push({
      pathname: ''
    })
  }

  render() {
    const {right, title, children, className, color} = this.props
    return <div className={`flex-wrp flex-align-between size32 ${className || 'bg-white'} ${color || 'color3'}`}>
      <div className=" flex-wrp flex-item flex-align-center plr30" onClick={this.onLeftClick}>
        <i className={`i i-left size42 ${color || 'color16'}`}/>
      </div>
      {children}
      {!children && <div className={`flex-wrp flex-center pd30 nowrap size36 ${color || 'color16'}`}>{title}</div>}
      <div className="flex-wrp flex-item flex-bottom pd30">{right}</div>
    </div>
  }
}