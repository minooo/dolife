import React from 'react';
import Link from 'components/Link';
import p from 'assets/images/s.gif';

export default ({follow, onNotAnyTips}) => <div className="flex-wrp flex-align-center bg-white ptb10">
  <i className="i i-close color4 size32 plr20 ptb30" onClick={onNotAnyTips}/>
  {follow.follow_image &&
  <img src={p} className="bg-cover img-80 border-radius" style={{backgroundImage: `url(${follow.follow_image})`}}/>}
  <div className="flex-item w0 color6 plr20">
    {follow.follow_title && <div className="size28">{follow.follow_title}</div>}
    {follow.follow_content && <div className="pt5 size26 lh150">{follow.follow_content}</div>}
  </div>
  {follow.follow_link && <Link href={follow.follow_link}
                               className="flex-wrp flex-center bg-main color10 size28 border-radius10 plr30 ptb15">关注</Link>}
  <div className="pr20"/>
</div>