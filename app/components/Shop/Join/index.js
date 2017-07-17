import React from 'react';
import Link from 'components/Link';
import p from 'assets/images/s.gif';
import {Carousel} from 'antd-mobile';
import s from './style.scss';

export default ({config}) => <div className=" flex-wrp flex-cell fullHeight">
  <Carousel
    className="flex-item"
    vertical={true}
    dots={false}
    autoplay={false}
    cellAlign="center"
  >
    {config.slides.map((n, i) => <div key={i}>
      <div src={p} className="bg-cover"
           style={{width: '100%', height: '100vh', backgroundImage: `url(${n.image})`, backgroundSize: 'cover'}}>
        {i == 0 &&
        <div className="flex-wrp flex-center size66 color16" style={{paddingTop: '1.1rem', fontWeight: '700'}}>
          <span>{config.agent_name}</span></div>}
      </div>
    </div>)}
  </Carousel>
  <Link href={{pathname: '/shop_join_form'}} className={`flex-wrp flex-center fixed-bottom plr50 ptb10 `}>
    <div className={`size60 color4 ${s.up}`}>^</div>
    <div className={`flex-wrp flex-item flex-center ptb30 bg-orange color10 border-radius10 ${s.link}`}>申请入驻</div>
  </Link>
</div>