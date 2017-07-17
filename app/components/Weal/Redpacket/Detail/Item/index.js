import React from 'react';
import p from 'assets/images/s.gif'
import {setTitle, date_obj, getApi} from "utils";
export default ({user}) => <div className="pd20 border-b flex-wrp bg-white flex-align-center">
  <div className="flex-item">
    <img src={p} className="bg-cover border-radius img-80" style={{backgroundImage: `url(${user.avatar})`}}/>
  </div>
  <div style={{flex: 5}}>
    <div className="size28 color6">{user.nickname}</div>
    <div
      className="size24 color4 pt10">{date_obj(user.created_at).first_time} {date_obj(user.created_at).secend_time}</div>
  </div>
  <div className="flex-item">{user.money}元</div>
</div>