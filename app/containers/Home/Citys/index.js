import React, {PureComponent} from 'react';
import City from 'components/City';
import {getApi, setTitle} from 'utils';

export default class extends PureComponent {
  state = {
    isFetching: false,
    isFetched: false,
    areas: []
  }

  componentDidMount() {
    setTitle(`城市选择`)
    this.fetchCitys()
  }

  fetchCitys = () => {
    this.setState({
      isFetching: true
    }, () => {
      return getApi('/city').then(response => {
        this.setState({
          isFetching: false,
          isFetched: true,
          areas: response.records
        })
      })
    })
  }
  onSearch = (keyword) => {

  }

  render() {
    const {isFetching, isFetched, areas} = this.state
    return <City
      isFetching={isFetching}
      isFetched={isFetched}
      dataSet={areas}
    />
  }
}