import React from 'react';
import ReactDOM from 'react-dom';
import {Route, IndexRoute, hashHistory, Router} from 'react-router';
import App from './public/javascripts/container/app';
import Player from './public/javascripts/components/player';
import MusicList from './public/javascripts/components/musiclist';
ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Player}/>
            <Route component={MusicList} path="/list" />
        </Route>
    </Router>
    ,
    document.getElementById('root')
);

