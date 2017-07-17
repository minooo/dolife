import React from 'react';
import Header from './Header';
import Rate from 'components/Rate'
import Link from 'components/Link'
import p from 'assets/images/s.gif';
import CommentListItem from 'components/Comment/List/Item'
import Coupon from './Coupon';
import {wx} from 'utils';
import s from './style.scss'

export default ({shop, toggleFavor, onShowPhotos, onClickCoupon}) => <div>
  <Header shop={shop} toggleFavor={toggleFavor} onShowPhotos={onShowPhotos}/>
  <div className="bg-white flex-wrp pd30">
    <div className="flex-item w0">
      <div className="size32 color16 w100 nowrap">{shop.title}</div>

      {shop.notice && <div className="flex-wrp pt30">
        <i className="i i-gb pr10"/>
        <div className="flex-item overflow-hidden relative">
          <div className={`color4 size24 ${s.animat}`}
               style={{animationDuration: `${shop.notice.length / 2}s`}}>{shop.notice}</div>
        </div>
      </div>}

      <div className="flex-wrp flex-align-center pt30">
        <i className="i i-money pr10 color5"/>
        <i className="i i-hui pr10 color1"/>
        <i className="i i-qiang-s pr10 color5"/>
        <div className="color4 size24">营业时间 {shop.opentime}</div>
      </div>
    </div>
    {shop.scores && <div className="flex-wrp flex-cell flex-center">
      <div className="size62">{shop.scores.score}</div>
      <div className="size32 pt10">综合评分</div>
      <Rate num={shop.scores.score} className="pt10"/>
    </div>}
  </div>
  <div className="bg-white border-t border-b pl30">
    <div className="flex-wrp flex-align-center">
      <div className="flex-item flex-wrp flex-align-center ptb20" onClick={e => wx.openLocation({
        lat: shop.lat,
        lng: shop.lng
      })}>
        <div className="pr30">
          <i className="i i-map color4 size32"/>
        </div>
        <div className="color4 size28">{shop.address}</div>
      </div>
      <div className="border-l">
        <Link href={`tel:${shop.tel}`} className="block plr50 ptb20">
          <i className="i i-dianhua color0 size52"/>
        </Link>
      </div>
    </div>
    {shop.shops && shop.shops.length > 0 &&
    <Link href={{pathname: `/shop_branch`, query: {shop_id: shop.id}, state: {shops: shop.shops}}}
          className="border-t flex-wrp color4 size28 ptb25">
      <div className="flex-item">查看全部 {shop.shops.length} 家分店</div>
      <div className="pr30"><i className="i i-right"/></div>
    </Link>}
  </div>
  {shop.buyings && shop.buyings.length > 0 && <div className="mt20 bg-white">
    <div className="flex-wrp flex-align-center ptb25 plr30 border-b">
      <div className="flex-item color16 size28">大牌抢购</div>
      <Link href={{pathname: `/shop_buying`, query: {shop_id: shop.id}}} className="size26 color4">
        查看更多<i className="i i-right"/>
      </Link>
    </div>
    {shop.buyings.map((n, i) => <Link href={{pathname: `/buying_${n.id}`}} className="bg-white flex-wrp flex-cell"
                                      key={i}>
      <div className="flex-wrp border-b ptb30">
        <div className="flex-wrp flex-center flex-cell pl20 mr30">
          <div className="flex-wrp flex-end color0">
            <div className="size40 color23">￥</div>
            <div className="size48 color23" style={{lineHeight: '90%'}}>{n.fee}</div>
          </div>
          <div className="flex-wrp flex-align-center ml10">
            {n.vip_info && <div className="flex-wrp flex-end">
              <div className="flex-wrp flex-align-center mt10">
                <div className={`size22 color10 bg-deeporange ptb5 plr10 border-radius5 ${s.fw}`}>VIP</div>
                <div className="pl5 color25">￥{n.vip_info.fee}</div>
              </div>
            </div>}
          </div>
        </div>
        <div className="flex-item pt5">
          <div className=" size26 color16">{n.title}</div>
          <div className="flex-wrp color4 size26 pt25">
            <div className="del pt5 pr20">￥{n.price}</div>
            <div className="pt5 color3 pb5">{n.stock > 0 ? `剩余${n.stock}份` : '抢完了'}</div>
          </div>
        </div>
        <div className="flex-wrp flex-center plr30">
          <i className="i i-right color4"/>
        </div>
      </div>
    </Link>)}
  </div>}
  {shop.coupons && shop.coupons.length > 0 && <Coupon coupons={shop.coupons} onClickCoupon={onClickCoupon}/>}
  {shop.content && <div className={`bg-white mb20 ${shop.coupons && shop.coupons.length > 0 ? '' : 'mt20'}`}>
    <div className="flex-wrp ptb25 plr30 border-b">
      <div className="flex-item color16 size28">小二自述</div>
    </div>
    <div
      className="color3 pd30 overflow-hidden size24 my-img line12 border-b"
      dangerouslySetInnerHTML={{
        __html: shop.content.replace(/:\s*(\d+\.?\d*)px/g, (a, b) => {
          return `:0.${b * 2}rem`
        })
      }}/>
  </div>}
  <div className="bg-white">
    <div className="flex-wrp ptb25 plr30 border-b">
      <div className="flex-item color16 size28">评价专区</div>
      <Link href={{pathname: `/shop_comment`, query: {shop_id: shop.id}}}
            className="flex-wrp flex-align-center color4 size28">
        <div className="size26">{shop.comment_num}条评价</div>
        <div><i className="i i-right size26"/></div>
      </Link>
    </div>
    {shop.comments && shop.comments.length > 0 && shop.comments.map((n, i) => <CommentListItem comment={n} key={i}/>)}
    {shop.comments && shop.comments.length == 0 &&
    <div className="flex-wrp flex-center ptb40 color4 size28">暂无评价~</div>}
  </div>
  <div style={{height: '1rem'}}/>
  <Link href={{pathname: `/order_cashier`, query: {shop_id: shop.id}}}
        className="fixed-bottom bg-main ptb30 flex-wrp flex-center color10 size32">
    <i className="i i-wxpay size36 pr10"/>
    <div>线下买单</div>
  </Link>
</div>