import React from 'react';
import {Carousel} from 'antd-mobile';
import Link from 'components/Link';
export default ({shops}) => <div className="flex-wrp pd30 bg-white mt20">
  <div className="pr20 border-r equal-no">
    <Link href={{pathname: `/vip`}}
          className="bg-deeporange border-radius5 ptb10 plr30 size23 color10 block">开通特权</Link>
  </div>
  <Carousel dots={false} autoplay={true} dragging={false} swiping={false} infinite vertical className="equal pl20">
    {
      shops.filter(item => item.discount_info && item.discount_info.vip && item.discount_info.vip.scale < 10).map((n, i) =>
        <Link href={{pathname: `/shop_${n.id}`}} key={i} className={`ptb10 flex-wrp flex-center`}>
          <div className="pr10 color25">{n.discount_info.vip.scale}折</div>
          <div className="color3 w100 nowrap">{n.title}开启会员特权</div>
        </Link>
      )
    }
  </Carousel>
</div>