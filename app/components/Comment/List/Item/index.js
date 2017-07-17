import React from 'react'
import moment from 'moment';
import Rate from 'components/Rate';
import {wx} from 'utils';
import p from 'assets/images/s.gif';

export default ({comment}) => <div className="bg-white pl30 pt30">
  <div className="flex-wrp flex-align-center pb30">
    <div><img src={p} className="bg-cover img-80 border-radius"
              style={{backgroundImage: `url(${comment.user.avatar})`}}/></div>
    <div className="flex-item pl30 size26">
      <div>{comment.user.nickname}</div>
      <div className="flex-wrp flex-align-center pt5">
        <Rate num={comment.score}/>
        <div className="pl20 color4 pt5">{moment(comment.create_at).format('MM-DD HH:mm')}</div>
      </div>
    </div>
  </div>
  <div className="size26 border-b">
    {comment.content && <div className="pb30 pr30 lh150">{comment.content}</div>}
    {comment.pics && comment.pics.length > 0 && <div className="pb30">
      {comment.pics.map((n, i) => <img onClick={() => {
        wx.previewImage(n, comment.pics)
      }} src={p} className="img-160 bg-cover mr10 mb5" style={{backgroundImage: `url(${n})`}} key={i}/>)}
    </div>}
  </div>
  {comment.reply && <div className="ptb10 pr10 lh150 size28">
    <span className="color0">商家回复：</span>
    {comment.reply}
  </div>}
</div>