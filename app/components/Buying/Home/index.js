import React, {PureComponent} from "react";
import Header from './Header';
import List from "../List";
export default class extends PureComponent {
  render() {
    const {buying, onSwitch, loadBuyings} = this.props
    return <div className="flex-wrp flex-cell">
      <Header status={buying.filter.typeid} onSwitch={onSwitch}/>
      <List
        data={buying}
        header={null}
        loadHandle={loadBuyings}
      />
    </div>
  }
}