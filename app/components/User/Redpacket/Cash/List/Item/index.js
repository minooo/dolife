import React from 'react';

export default ({redpacket}) => <div className="bg-white flex-wrp flex-between border-b pd20">
  <div>
    <div className="size30 color6">{redpacket.time_create}</div>
    <div className="size24 color4 pt10">{redpacket.title}</div>
  </div>
  <div className="flex-wrp flex-align-center size34">{redpacket.money}</div>
</div>