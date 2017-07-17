import React from 'react';
import Header from 'components/Header';
import Link from 'components/Link';
import SpendList from '../Spend/List';
import CashList from '../Cash/List';
import {number_format} from 'utils';
import s from './style.scss'

export default ({user, tabIndex, onSwitchTab, onSwitchStatus, redpacket, fetchRedpackets, cash_redpacket, fetchCashedpackets, onDelete}) =>
  <div>
    <Header>
      <div className="flex-wrp">
        <div className={`flex-item ptb30 plr50 size36 ${tabIndex == 0 && `color0`}`} onClick={() => onSwitchTab(0)}>
          现金红包
        </div>
        <div className={`flex-item ptb30 plr50 size36 ${tabIndex == 1 && `color0`}`} onClick={() => onSwitchTab(1)}>
          消费红包
        </div>
      </div>
    </Header>
    {tabIndex == 0 && <div>
      <div className="bg-main ptb45 plr50">
        <div className="flex-wrp flex-between color10 plr10">
          <div>
            <div className="size32">累计抢红包(元)</div>
            <div className="size42 pt20">{number_format(user.weal.redpacket.money.total)}</div>
          </div>
          <Link href={{pathname: '/weal_rule'}}><i className="i-help size40 color10"/></Link>
        </div>
      </div>
      <CashList
        cash_redpacket={cash_redpacket}
        fetchCashedpackets={fetchCashedpackets}
      />
      <div className="ptb40"/>
      <Link href={{pathname: '/user_finance'}}
            className="fixed-bottom bg-main color10 size34 ptb30 text-center border-t">提现</Link>
    </div>}
    {tabIndex == 1 && <div>
      <div className="flex-wrp bg-white">
        <div className={`flex-item ptb30 text-center ${redpacket.filter.status == 0 ? `color0 ${s.active}` : ''}`}
             onClick={() => onSwitchStatus(0)}>未使用({user.weal.redpacket.consume.count[0]})
        </div>
        <div className={`flex-item ptb30 text-center ${redpacket.filter.status == 1 ? `color0 ${s.active}` : ''}`}
             onClick={() => onSwitchStatus(1)}>已使用({user.weal.redpacket.consume.count[1]})
        </div>
        <div className={`flex-item ptb30 text-center ${redpacket.filter.status == -1 ? `color0 ${s.active}` : ''}`}
             onClick={() => onSwitchStatus(-1)}>已过期({user.weal.redpacket.consume.count[-1]})
        </div>
      </div>
      <SpendList
        redpacket={redpacket}
        fetchRedpackets={fetchRedpackets}
        onDelete={onDelete}
      />
    </div>}
  </div>