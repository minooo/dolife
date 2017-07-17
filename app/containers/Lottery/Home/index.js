import React, {PureComponent} from "react";
import {connect} from 'react-redux';
import {Toast} from 'antd-mobile';
import LotteryHome from 'components/Lottery/Home';
import Loading from 'components/Loading';
import {getApi, postApi} from 'utils';

@connect(state => ({
  lottery: state.lottery
}))
export default class extends PureComponent {
  state = {
    modal: {
      show: false
    },
    showRuleModal: false,
    showUserAwardModal: false,
    user: {
      stock: 0,
      record: {
        isFetching: false,
        isMore: true,
        records: []
      }
    },
    activity: false,
    isFetched: false,
    lotteryDialog: {
      show: false,
      win: false
    },
    recordDialog: {
      show: false
    },
    notice: [
      '1547**456',
      '1843**987',
      '1477**544'
    ]
  }
  timer = false

  componentDidMount() {
    const {location} = this.props
    this.fetchActivity(location.query.id)
  }

  componentWillUnmount() {
    this.onStop()
  }

  fetchActivity = (activity_id) => {
    return getApi(`/lottery/${activity_id}`).then(response => {
      this.setState(state => ({
        activity: response.activity,
        isFetched: true,
        user: Object.assign({}, state.user, {
          stock: parseInt(response.luck_draw_num)
        })
      }))
    })
  }
  fetchUserAwards = () => {
    const {user} = this.state
    if (user.record.isFetching || !user.record.isMore) {
      return
    }
    this.setState(state => ({
      user: Object.assign({}, state.user, {
        record: Object.assign({}, state.user.record, {
          isFetching: true
        })
      })
    }), () => {
      return getApi(`/lottery/${this.state.activity.id}/winninglog`, {
        limit: 10,
        offset: this.state.user.record.records.length
      }).then(response => {
        this.setState(state => ({
          user: Object.assign({}, state.user, {
            record: Object.assign({}, state.user.record, {
              isFetching: false,
              isMore: [response.records || []].length >= 10,
              records: state.user.record.records.concat(response.records || [])
            })
          })
        }))
      })
    })
  }
  showModal = (title, content) => {
    this.setState({
      modal: {
        show: true,
        title: title,
        content: content
      }
    })
  }
  hideModal = () => {
    this.setState({
      modal: {
        show: false
      }
    })
  }
  onStart = () => {
    const {user, activity} = this.state
    if (user.stock < 1) {
      return Toast.fail('剩余抽奖次数不足')
    }
    if (this.timer) {
      return
    }
    this.timer = setInterval(() => {
      this.setState(state => ({
        activity: Object.assign({}, state.activity, {
          focusIndex: state.activity.focusIndex > 7 ? 1 : parseInt(state.activity.focusIndex) + 1
        })
      }))
    }, 100)
    postApi(`/lottery/${activity.id}/player`).then(response => {
      this.setState(state => ({
        user: Object.assign({}, state.user, {
          stock: state.user.stock - 1
        })
      }))
      setTimeout(() => {
        this.onStop()
        if (response.code == 'SUCCESS') {
          this.playerToAward(response)
        } else {
          response.msg && Toast.fail(response.msg)
        }
      }, 1500)
    })
  }
  onStop = () => {
    clearInterval(this.timer)
    this.timer = false
  }
  playerToAward = (response) => {
    this.setState(state => ({
      activity: Object.assign({}, state.activity, {
        focusIndex: state.activity.focusIndex > 7 ? 1 : parseInt(state.activity.focusIndex) + 1
      })
    }), () => {
      if (this.state.activity.focusIndex != response.award_index) {
        setTimeout(() => {
          this.playerToAward(response)
        }, 200)
      } else {
        this.setState({
          lotteryDialog: {
            show: true,
            win: response.win
          }
        })
      }
    })
  }
  onGetAward = (record) => {
    if (record.is_get) {
      return
    }
    const {activity} = this.state
    return postApi(`/lottery/${activity.id}/prize/${record.award.id}/receive`, {
      winning_id: record.id
    }).then(response => {
      if (response.code == 'SUCCESS') {
        Toast.success('领取成功')
        this.setState(state => ({
          user: Object.assign({}, state.user, {
            record: Object.assign({}, state.user.record, {
              records: state.user.record.records.map(n => n.id == record.id ? Object.assign({}, n, {
                is_get: true
              }) : n)
            })
          }),
          lotteryDialog: {
            show: false
          }
        }))
      } else {
        response.msg && Toast.fail(response.msg)
      }
    })
  }
  lotteryDialogHide = () => {
    this.setState({
      lotteryDialog: {
        show: false,
        win: false
      }
    })
  }
  toggleRecordDialog = () => {
    this.setState(state => ({
      recordDialog: {
        show: !state.recordDialog.show
      }
    }))
  }

  render() {
    const {lottery} = this.props
    const {activity, user, modal, isFetched, lotteryDialog, recordDialog, notice} = this.state
    if (!isFetched) {
      return <Loading inline/>
    }
    return <LotteryHome
      user={user}
      notice={notice}
      activity={activity}
      lottery={lottery}
      lotteryDialog={lotteryDialog}
      recordDialog={recordDialog}
      lotteryDialogHide={this.lotteryDialogHide}
      fetchUserAwards={this.fetchUserAwards}
      modal={modal}
      showModal={this.showModal}
      hideModal={this.hideModal}
      onStart={this.onStart}
      onGetAward={this.onGetAward}
      toggleRecordDialog={this.toggleRecordDialog}
    />
  }
}