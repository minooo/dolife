import "babel-polyfill";
import React from "react";
import {render} from "react-dom";
import {browserHistory} from "react-router";
import {AppContainer} from "react-hot-loader";
import {syncHistoryWithStore} from "react-router-redux";
import Root from "../app/containers/Root";
import configureStore from "../app/store/configureStore";

import "react-fastclick";

const store=configureStore(window.__INITIAL_STATE__)
const history=syncHistoryWithStore(browserHistory,store)
render(<Root store={store} history={history}/>,document.getElementById('app'))
if(module.hot){
    module.hot.accept('../app/containers/Root',() =>{
        render(<AppContainer><Root store={store} history={history}/></AppContainer>,document.getElementById('app'))
    })
}
