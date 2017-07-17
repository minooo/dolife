import React, {Component} from 'react';
import s from './style.scss';
export default class extends Component {
  state = {
    expend: []
  }
  showFilter = (item, dep) => {
    let {expend} = this.state
    const {onFilter, filter} = this.props
    if (item.items) {
      if (expend.length > dep) {
        expend = expend.slice(0, dep + 1)
        if (!expend.every(cate => cate.key == item.key)) {
          expend[dep] = item
        } else {
          expend.pop()
        }
      } else {
        expend.push(item)
      }
    } else {
      expend = []
      onFilter(Object.assign({}, filter, {
        [item.key]: item.value
      }))
    }
    this.setState({
      expend: expend
    })
  }

  render() {
    const {filters, filter} = this.props
    const {expend} = this.state
    return <div className="bg-white">
      <div className="flex-wrp">
        {filters.map((n, i) => <div className="flex-item flex-wrp ptb30 flex-center" key={i}
                                    onClick={() => this.showFilter(n, 0)}>
          <div className="size32 color3">{n.label}</div>
          <div className="size24 color4 pl10">▼</div>
        </div>)}
      </div>
      {expend && expend.length > 0 && <div className={`${s.filterWrap}`}>
        <div className={`flex-wrp bg-white size32 w100 ${s.filterBox}`}>
          {expend.map((item, index) => <div className="flex-item" key={index}>
            {item.items.map((n, i) => <div onClick={() => this.showFilter(n, index + 1)} key={i}
                                           className={`flex-wrp pd30 border-b ${(filter[n.key] && filter[n.key] == n.value) && 'color7'}`}>
              <span className="flex-item">{n.label}</span>
              {n.items && <i className="i i-right"/>}
            </div>)}
          </div>)}
        </div>
      </div>}
    </div>
  }
}