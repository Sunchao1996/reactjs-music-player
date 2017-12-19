import React from 'react';
import ReactDOM from 'react-dom';
import {Route, IndexRoute, hashHistory, Router} from 'react-router';
import App from './public/javascripts/container/app';
import Player from './public/javascripts/components/player';
import MusicList from './public/javascripts/components/musiclist';
import MusicDetail from './public/javascripts/components/musicdetail';
import Perf from 'react-addons-perf'
    window.Perf = Perf

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Player}/>
            <Route component={MusicList} path="/list" />
            <Route component={MusicDetail} path="/detail" />
        </Route>
    </Router>
    ,
    document.getElementById('root')
);

