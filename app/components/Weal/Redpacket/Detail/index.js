import React from 'react';
import Header from 'components/Header';
import List from 'components/List';
import p from 'assets/images/s.gif'
import Item from "./Item";
import s from './style.scss'
export default ({redpacket, log, fetchLogs, backHandle, router}) => <div>
  {redpacket && <div className={`relative pb30 overflow-hidden ${s.bg}`}>
    <Header
      title="已抢红包"
      className="relative z1"
      color="color10"
      leftClick={() => {
        if (redpacket.promote_position == '1') {
          return router.replace({
            pathname: `/shop_${redpacket.shop.id}`
          })
        }
        if (redpacket.promote_position == '2') {
          return router.replace({
            pathname: `/shop_buying`,
            query: {
              shop_id: redpacket.shop.id
            }
          })
        }
        router.goBack()
      }}
    />
    <div className="ptb50"/>
    <div className="relative flex-wrp flex-cell flex-align-center z1 mt20">
      <img src={p} className="bg-cover border-radius img-150"
           style={{backgroundImage: `url(${redpacket.shop.thumb})`}}/>
      <div className="pt30 size30 color6">{redpacket.shop.title}送的现金红包</div>
      <div className="pt30 size24 color3">{redpacket.title}</div>
      {redpacket.money && redpacket.money > 0 && <div className="pt30 flex-wrp color21">
        <div className="size50">{redpacket.money}</div>
        <div className="size30" style={{lineHeight: '200%'}}>元</div>
      </div>}
    </div>
  </div>}
  {redpacket && <div className="ptb30 plr20 color4 size28">
    {(redpacket.total_num - redpacket.send_num) > 0 && `已抢${redpacket.send_num}个，还剩${redpacket.total_num - redpacket.send_num}个`}
    {(redpacket.total_num - redpacket.send_num) == 0 && `${redpacket.total_num}个红包，已被抢光`}
  </div>}
  <List
    isFetching={log.isFetching}
    isMore={log.isMore}
    dataSet={log.logs}
    onEndReached={fetchLogs}
    renderRow={rowData => <Item user={rowData}/>}
  />
</div>