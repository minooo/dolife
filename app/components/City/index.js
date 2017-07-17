import React, {Component} from 'react';
import {ListView, SearchBar, List} from 'antd-mobile';
import Loading from "components/Loading";

export default class extends Component {
  state = {
    inputValue: '',
    dataSource: new ListView.DataSource({
      getRowData: (dataBlob, sectionID, rowID) => {
        return dataBlob[`province_${sectionID}_city_${rowID}`]
      },
      getSectionHeaderData: (dataBlob, sectionID) => {
        return dataBlob[`province_${sectionID}`]
      },
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    }),
    headerPressCount: 0,
  }

  componentDidMount() {
    const {dataSet} = this.props
    const {dataSource} = this.state
    this.setState({
      inputValue: '',
      dataSource: this.createDs(dataSource, dataSet),
      headerPressCount: 0,
    })
  }

  componentWillReceiveProps(newProps, overProps) {
    const {isFetching, dataSet} = newProps
    const {dataSource} = this.state
    !isFetching && this.setState({
      dataSource: this.createDs(dataSource, dataSet)
    })
  }

  createDs = (ds, dataSet) => {
    const dataBlob = {}
    const sectionIDs = []
    const rowIDs = []
    dataSet.map((item, index) => {
      sectionIDs.push(index)
      dataBlob[`province_${index}`] = item.province
      rowIDs[index] = []
      item.lists.map((n, i) => {
        rowIDs[index].push(i)
        dataBlob[`province_${index}_city_${i}`] = n
      })
    })
    return ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)
  }
  onSearch = (val) => {
    const {dataSet} = this.props
    this.setState({
      dataSource: this.createDs(this.state.dataSource, dataSet.map((item, index) => {
        if (item.province.indexOf(val) > -1) {
          return item
        }
        return {
          province: item.province,
          lists: item.lists.filter(value => value.title.indexOf(val) > -1)
        }
      })),
    })
  }
  onCancel = () => {
    this.onSearch('')
  }

  render() {
    const {isFetching, isFetched} = this.props
    return <div style={{position: 'relative', paddingTop: '.88rem'}}>
      <div style={{position: 'absolute', top: 0, left: 0, right: 0}}>
        <SearchBar
          placeholder="输入地区名称搜索"
          onSubmit={this.onSearch}
          onClear={this.onCancel}
        />
      </div>
      {isFetching && <Loading inline/>}
      {isFetched && <ListView.IndexedList
        useBodyScroll
        dataSource={this.state.dataSource}
        renderSectionHeader={sectionData => <div className="ih">{sectionData}</div>}
        renderRow={rowData => <List.Item>
          <a href={`https://${rowData.id}.m.dolife.me`} className="block">{rowData.title}</a>
        </List.Item>}
        stickyHeader
        stickyProps={{
          stickyStyle: {zIndex: 999},
        }}
        quickSearchBarStyle={{
          top: 85,
        }}
        delayTime={10}
        delayActivityIndicator={<Loading inline/>}
      />}
    </div>
  }
}