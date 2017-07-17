import React from 'react';
import {SwipeAction} from 'antd-mobile';
import Link from 'components/Link';
import s from './style.scss';
import {number_format} from 'utils';

export default ({redpacket, onDelete}) => <div className="mt20 mlr20">
  <SwipeAction
    style={{}}
    right={[
      {
        text: '删除',
        onPress: () => onDelete(redpacket),
        style: {backgroundColor: '#F4333C', color: 'white'},
      },
    ]}
  >
    <div className="bg-white flex-wrp relative">
      <div
        className={`flex-item flex-wrp flex-cell flex-center relative overflow-hidden border-radius10 ${s.box} ${(!redpacket.is_expired && !redpacket.is_used) ? `bg-redpacket2 color10` : `bg-smoke color10`}`}>
        <div className="flex-wrp flex-align-center pt20">
          {redpacket.fee && <div className="flex-wrp">
            <div className="size40" style={{lineHeight: '200%'}}>￥</div>
            <div className="size60">{number_format(redpacket.fee)}</div>
          </div>}
        </div>
        <div className="size24 pt10">
          {redpacket.type == 1 && `满${number_format(redpacket.condition.lower)}立减`}
          {redpacket.type == 2 && `满${number_format(redpacket.condition.lower)}立减`}
        </div>
      </div>

      <div className="pd20 flex-wrp flex-cell flex-between" style={{flex: 3}}>
        <div className="flex-wrp">
                <span
                  className={`${(!redpacket.is_expired && !redpacket.is_used) ? 'bg-orange' : 'bg-smoke'} border-radius5 color10 size22 ptb5 plr10`}>
                    {redpacket.type == 1 && `满减`}
                  {redpacket.type == 2 && `随机`}
                </span>
          <span className="size26 pl10">{redpacket.shop.title}</span>
        </div>
        <div className="color14 size26">
          {redpacket.time_end && `过期时间：${redpacket.time_end}`}
          {redpacket.time_used && `使用时间：${redpacket.time_used}`}
        </div>
        <div className="flex-wrp">
          <div className="flex-item flex-wrp size26  color14">
            {redpacket.apply_shops && redpacket.apply_shops.length > 0 &&
            <div>适用门店：{redpacket.apply_shops && redpacket.apply_shops.map((n, i) => n.title).join('，')}</div>}
          </div>
          {!redpacket.is_expired && !redpacket.is_used && <Link
            href={{pathname: `${(redpacket.apply_shops && redpacket.apply_shops.length > 0) ? (redpacket.apply_shops[0].id ? '/shop_' + redpacket.apply_shops[0].id : '/shop_' + redpacket.shop.id) : '/shop'}`}}
            className={`size24 border-radius50 ptb10 plr30 color7 ${s.btn}`}>立即使用</Link>}
        </div>
      </div>
      {redpacket.is_used && <i className={`i-ysy ${s.icon}`}/>}
    </div>
  </SwipeAction>
</div>