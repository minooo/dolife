import React from 'react';
import Link from 'components/Link';
import "antd-mobile/lib/tab-bar/style/index.css"
import s from './style.scss'

export default ({navs}) => <div style={{height: '1rem'}}>
  <div className="am-tab-bar am-tab-bar-bottom">
    <div role="tablist" className="am-tab-bar-bar" style={{backgroundColor: 'white'}}>
      {navs.map((n, i) => <Link href={n.link} onlyActiveOnIndex key={n.key} className={`am-tab-bar-tab ${s.link}`}
                                activeClassName={`color0`}>
        <div>
          <div className="am-tab-bar-tab-icon">
            <i className={`i ${n.icon} size40`}/>
          </div>
          <p className="am-tab-bar-tab-title">{n.title}</p>
        </div>
      </Link>)}
    </div>
  </div>
</div>