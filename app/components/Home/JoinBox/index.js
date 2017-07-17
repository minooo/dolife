import React from 'react';
import {Carousel} from 'antd-mobile';
import Link from 'components/Link';
export default ({shops, limit = 2}) => {
  const group = shops.map((item, index) => {
    return shops.slice(index * limit, index * limit + limit)
  }).filter(item => {
    return item.length > 0
  })
  return <div className={`flex-wrp bg-white pd30 border-t`}>
    <div className="border-r pd10 pr30">
      <i className="i i-zxrz size72 color0"/>
    </div>
    <Carousel dots={false} autoplay={group.length > 1} dragging={false} swiping={false} infinite vertical
              className="flex-item pl30 pt10">
      {group.map((item, index) => <div key={index}>
        {item.map((n, i) => <Link href={{pathname: `/shop_${n.id}`}} key={i}
                                  className={`size28 block nowrap ${i % 2 == 0 ? '' : 'pt10'}`}>
          恭喜{n.title}入驻好店
        </Link>)}
      </div>)}
    </Carousel>
    <Link href={{pathname: `/shop_join`}} className="color0 size24 flex-wrp flex-cell flex-center">
      <i className="i i-plus size52"/>
      <div className="pt10">立即入驻</div>
    </Link>
  </div>
}