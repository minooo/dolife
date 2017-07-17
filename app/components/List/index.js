import React, {Component} from "react";
import Loading from "components/Loading";
import {ListView} from "antd-mobile";
export default class extends Component {
  state = {
    dataSource: new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })
  }

  componentDidMount() {
    const {dataSet} = this.props
    const {dataSource} = this.state
    this.setState({
      dataSource: dataSource.cloneWithRows(dataSet)
    })
  }

  componentWillReceiveProps(newProps, overProps) {
    const {isFetching, dataSet} = newProps
    const {dataSource} = this.state
    !isFetching && this.setState({
      dataSource: dataSource.cloneWithRows(dataSet)
    })
  }

  renderRow = (rowData, sectionID, rowID) => {
    return <div>{rowID}:{rowData}</div>
  }

  renderFooter = () => {
    const {isFetching, isMore, dataSet} = this.props
    if (isFetching) {
      return <Loading inline/>
    }
    if (!isMore) {
      if (dataSet.length == 0) {
        return <div className="text-center color14 size28">暂无数据</div>
      }
      if (dataSet.length > 5) {
        return <div className="text-center color14 size28">没有了哦~</div>
      }
    }
  }

  onScroll = () => {

  }

  onEndReached = () => {

  }
  onRefresh = () => {

  }

  render() {
    return <ListView
      renderHeader={this.props.renderHeader || false}
      renderFooter={this.props.renderFooter || this.renderFooter}
      dataSource={this.state.dataSource}
      renderRow={this.props.renderRow}
      initialListSize={this.props.initialListSize || 20}
      pageSize={this.props.pageSize || 10}
      className={this.props.className}
      scrollRenderAheadDistance={this.props.scrollRenderAheadDistance || 200}
      scrollEventThrottle={this.props.scrollEventThrottle || 20}
      onScroll={this.props.onScroll || this.onScroll}
      onEndReached={this.props.onEndReached || this.onEndReached}
      onEndReachedThreshold={this.props.onEndReachedThreshold || 10}
      useBodyScroll={this.props.useBodyScroll || true}
    />
  }
}