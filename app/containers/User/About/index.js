import React, {PureComponent} from "react";
import {connect} from "react-redux";
import Header from "components/Header";
import Loading from "components/Loading";
import {getApi, setTitle} from "utils";

@connect(state => ({
  config: state.config
}))
export default class extends PureComponent {
  state = {
    isLoading: true,
    aboutus: ''
  }

  componentDidMount() {
    const {config} = this.props
    setTitle(`${config.siteConfig.sitename}-关于我们`)
    getApi(`/info`).then(response => {
      if (response.code == 'SUCCESS') {
        this.setState({
          aboutus: response.aboutus || '',
          isLoading: false
        })
      }
    })
  }

  render() {
    const {aboutus, isLoading} = this.state
    return <div>
      <Header title="关于我们"/>
      {aboutus && <div className="bg-white pd30 border-t" dangerouslySetInnerHTML={{__html: aboutus}}/>}
      {isLoading && <Loading inline/>}
    </div>
  }
}
