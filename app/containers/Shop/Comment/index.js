import React, {PureComponent} from "react";
import Header from 'components/Header';
import CommentList from 'components/Comment/List';
import {getApi} from 'utils';
export default class extends PureComponent {
  state = {
    filter: {
      limit: 10
    },
    isFetching: false,
    isMore: true,
    comments: []
  }

  componentDidMount() {

  }

  fetchComments = () => {
    const {location} = this.props
    if (!this.state.isMore || this.state.isFetching) {
      return
    }
    this.setState(state => ({
      isFetching: true,
      filter: Object.assign({}, state.filter, {
        shop_id: location.query.shop_id,
      })
    }), () => {
      getApi(`/comment`, Object.assign({}, this.state.filter, {
        offset: this.state.comments.length
      })).then(response => {
        this.setState({
          comments: this.state.comments.concat(response.comments || []),
          isMore: (response.comments || []).length >= this.state.filter.limit,
          isFetching: false
        })
      })
    })
  }

  render() {
    const {isFetching, isMore, comments} = this.state
    return <div>
      <Header title="用户评价"/>
      <CommentList
        data={{
          isFetching,
          isMore,
          comments
        }}
        loadHandle={this.fetchComments}
      />
    </div>
  }
}