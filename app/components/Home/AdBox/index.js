import React from 'react';
import {Carousel} from 'antd-mobile';
import Link from 'components/Link';
import p from 'assets/images/s.gif';
import s from './style.scss';
export default ({items, limit = 4}) => {
  const group = items.map((item, index) => {
    return items.slice(index * limit, index * limit + limit)
  }).filter(item => {
    return item.length > 0
  })
  return <div className={`flex-item w0 overflow-hidden ${limit <= 4 ? 'border-l' : ''}`}>
    <Carousel dots={false} autoplay={group.length > 1} swiping={false} infinite vertical>
      {group.map((item, index) => <div key={index} className={`${limit == 4 ? 'flex-wrp flex-flow-row' : ''}`}>
        {item.map((n, i) =>
          <Link
            href={n.link}
            key={i}
            className={`block w50
            ${(i % 4 === 0) ? 'border-r border-b' : ''}
            ${(i % 4 === 1) ? 'border-b' : ''}
            ${(i % 4 === 2) ? 'border-r' : ''}
            `}
          >
            <img src={p} className={`bg-fill ${s.thumb}`} style={{backgroundImage: `url(${n.thumb})`}}/>
          </Link>)}
      </div>)}
    </Carousel>
  </div>
}