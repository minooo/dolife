import React from "react";
import VipBox from "./VipBox";
import AdBox from "./AdBox";
import JoinBox from "./JoinBox";
import ModealRedpacket from './Modal/Redpacket';
import Header from 'components/Header';
import Loading from 'components/Loading';
import ShopListItem from 'components/Shop/List/Item';
import Category from 'components/Category';
import Swiper from 'components/Swiper';
import Link from 'components/Link';

export default ({config, focus, navlink, link, shop, vip_shops, onSearch, redpacket, onHideRedpacket, onGetRedpacket}) =>
  <div>
    <Header.SearchBar currentCity={config.currentCity} onSearch={onSearch} mode="dark">
      {focus.index && focus.index.focuss && focus.index.focuss.length > 0 && <Swiper imgs={focus.index.focuss}/>}
    </Header.SearchBar>
    {navlink.index && navlink.index.navlinks && navlink.index.navlinks.length > 0 &&
    <Category categories={navlink.index.navlinks}/>}
    {shop.index_new && shop.index_new.shops && shop.index_new.shops.length > 0 &&
    <JoinBox shops={shop.index_new.shops}/>}

    {(link.index && link.index.links && link.index.links.length > 0) && <div className="flex-wrp bg-white mt20">
      <AdBox items={link.index.links}/>
    </div>}

    {config.enableVipCard && shop.vip && shop.vip.shops && shop.vip.shops.length > 0 &&
    <VipBox shops={shop.vip.shops}/>}

    {shop.index && shop.index.shops && shop.index.shops.length > 0 && <div className="bg-white mt20">
      <div className="flex-wrp flex-align-center ptb20 plr30 border-b">
        <i className="i i-good color1 size36"/>
        <div className="flex-item pl10 size32">精品好店</div>
        <Link href={{pathname: `/shop`}} className="size26 color4 flex-wrp flex-align-center">更多 ></Link>
      </div>
      {shop.index.shops.map((n, i) => <ShopListItem shop={n} key={i}/>)}
    </div>}
    {shop.index && shop.index.isFetching && <Loading inline/>}
    {redpacket.show && <ModealRedpacket redpackets={redpacket.redpackets} onHideRedpacket={onHideRedpacket}
                                        onGetRedpacket={onGetRedpacket}/>}
  </div>