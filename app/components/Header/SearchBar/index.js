import React, {PureComponent} from 'react';
import Link from 'components/Link';
import s from './style.scss';
export default class extends PureComponent {
  onKeydown = (e) => {
    const {onSearch} = this.props
    if (e.key == 'Enter') {
      e.currentTarget.value && onSearch(e.currentTarget.value)
    }
  }

  render() {
    const {currentCity, children, mode, className} = this.props
    return <div className={`${s.wrap} ${className || ''}`}>
      {mode == 'dark' && <div className={s.linear}/>}
      <div className={`flex-wrp ptb20 ${s.header}`}>
        <Link href={{pathname: '/citys'}}
              className={`flex-wrp plr30 size26 flex-align-center ${mode == 'dark' ? 'color10' : 'color3'}`}>
          <div className={``}>{currentCity.title}</div>
          <div className={`size22 pl10`}>▼</div>
        </Link>
        <div className={`flex-item ${s.pr}`}>
          <div
            className={`flex-wrp flex-align-stretch pd5 ${s.inputBox} ${mode == 'light' ? 'border border-color1' : ''}`}>
            <i className={`flex-wrp flex-align-center i i-search size26  ${mode == 'dark' ? 'color10' : 'color3'}`}/>
            <input type="search" className={`size24  w100 nbr ${s.bg} ${mode == 'dark' ? 'color10' : 'color3'}`}
                   onKeyDown={this.onKeydown}/>
          </div>
        </div>
      </div>
      {children}
    </div>
  }
}