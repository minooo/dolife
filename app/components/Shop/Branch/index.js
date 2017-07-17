import React from "react";
import Link from 'components/Link';

export default({shops}) => <div>
  {shops.map((n, i) => <div key={i} className="flex-wrp bg-white border-b pl20 pd30 flex-align-stretch">
    <Link href={{pathname: `/shop_${n.id}`}} className="flex-item">
      {n.title && <div className="ptb20 size6">{n.title}</div>}
      {n.address && <div className="pb20 color4 pr20">{n.address}</div>}
      {n.distance && <div><span className="i-map color4 pr20">{n.distance.number}{n.distance.unit}</span></div>}
    </Link>
    {n.tel && <a href={`tel:${n.tel}`} className="flex-wrp flex-center">
      <i className="i-dianhua ptb45 pl45 pr25 color0 size50  bl" style={{fontWeight: 700}}/>
    </a>}
  </div>)}
</div>
