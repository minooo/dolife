import React from 'react';
import {Carousel} from 'antd-mobile';
import Link from 'components/Link'
import p from 'assets/images/s.gif';
const group = (categories, limit) => {
  return categories.map((item, index) => {
    return categories.slice(index * limit, index * limit + limit)
  }).filter(item => {
    return item.length > 0
  })
}
export default ({categories, limit = 8}) => <Carousel className="bg-white text-center pb30"
                                                      dots={group(categories, limit).length > 1}>
  {group(categories, limit).map((item, index) => <div key={index} className="clear">
    {item.map((n, i) => <Link href={n.link} key={i} className={`block fl pt20`}
                              style={{width: '25%', height: '1.44rem'}}>
      <img src={p} className={`bg-cover img-80`} style={{backgroundImage: `url(${n.thumb})`}}/>
      <div className={`color3 size24 pt10`}>{n.title}</div>
    </Link>)}
  </div>)}
</Carousel>