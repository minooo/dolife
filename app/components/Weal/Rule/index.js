import React from 'react';
import Header from 'components/Header';
export default ({rule}) => <div>
  <Header title="活动规则"/>
  <div className="pd30 lh150 bg-white border-t" dangerouslySetInnerHTML={{__html: rule.content}}/>
</div>