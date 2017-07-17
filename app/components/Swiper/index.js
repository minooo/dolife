import React from 'react';
import {Carousel} from 'antd-mobile';
import Link from 'components/Link'
import p from 'assets/images/s.gif';

export default ({imgs}) => <Carousel autoplay={imgs.length > 1} dragging={imgs.length > 1} swiping={imgs.length > 1}
                                     infinite dots={imgs.length > 1}>
  {imgs.map((n, i) => <div key={i}><Link href={n.link} className="block" style={{height: '49.7vw'}}><img src={p}
                                                                                                         className="bg-cover w100"
                                                                                                         style={{
                                                                                                           height: '100%',
                                                                                                           backgroundImage: `url(${n.thumb})`
                                                                                                         }}/></Link>
  </div>)}
</Carousel>