import express from 'express';

import packageInfo from '../package.json';
import webpack from 'webpack';
import webpackConfig from '../webpack.config';
import WebpackDevServer from "webpack-dev-server";

import React from 'react';
import { RoutingContext, match } from 'react-router';
import { Provider } from 'react-redux';

import configureStore from '../app/store/configureStore';
import routes from '../app/routes';

const app = express();
const renderFullPage = (html, initialState) => {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>嘟嘟微生活</title>
        <link rel="stylesheet" type="text/css" href="/static/app.css">
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}; 
        </script>
        <script src="https://cdn.bootcss.com/react/15.6.0/react.min.js"></script>
        <script src="https://cdn.bootcss.com/react/15.6.0/react-dom.min.js"></script>
        <script src="https://cdn.bootcss.com/react-router/3.0.5/ReactRouter.min.js"></script>
        <script src="https://cdn.bootcss.com/redux/3.6.0/redux.min.js"></script>
        <script src="https://cdn.bootcss.com/react-redux/5.0.5/react-redux.min.js"></script>
        <script src="https://cdn.bootcss.com/react-router-redux/4.0.8/ReactRouterRedux.min.js"></script>
        <script src="https://cdn.bootcss.com/redux-thunk/2.2.0/redux-thunk.min.js"></script>
        <script src="https://cdn.bootcss.com/lodash.js/4.17.4/lodash.min.js"></script>
        <script src="https://cdn.bootcss.com/moment.js/2.17.1/moment.min.js"></script>
        <script src="https://cdn.bootcss.com/moment.js/2.17.1/locale/zh-cn.js"></script>
        <script src="https://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
        <script src="/${packageInfo.version}/bundle.js"></script>
      </body>
    </html>
  `;
}
webpackConfig.target='node'
webpackConfig.node={
    console: true,
        global: true,
        process: true,
        Buffer: true,
        __filename: true,
        __dirname: true,
        setImmediate: true
}
const compiler = webpack(webpackConfig);
if(process.env.NODE_ENV !== 'production'){
    app.use(WebpackDevServer(compiler,{
        publicPath: config.output.publicPath,
        hot: true,
        historyApiFallback: true,
        // It suppress error shown in console, so it has to be set to false.
        quiet: false,
        // It suppress everything except error, so it has to be set to false as well
        // to see success build.
        noInfo: false,
        stats: {
            // Config for minimal console.log mess.
            assets: false,
            colors: true,
            version: false,
            hash: false,
            timings: false,
            chunks: false,
            chunkModules: false
        }
    }));
}else{
    app.use('/static', express.static(__dirname + '/../dist'));
}

app.get((req, res)=>{
    match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
        if (err) {
            res.status(500).end(`Internal Server Error ${err}`);
        } else if (redirectLocation) {
            res.redirect(redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps) {
            const store = configureStore();
            const state = store.getState();

            const html = renderToString(
                <Provider store={store}>
                    <RoutingContext {...renderProps} />
                </Provider>
            );
            res.end(renderFullPage(html, state));
        } else {
            res.status(404).end('Not found');
        }
    });
});

const server = app.listen(3334, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log('app listening at http://%s:%s', host, port);
});