import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './components/Home/Home';
import Forum from './components/Forum/Forum';
import Post from './components/Post/Post';
import PostPage from './components/PostPage/PostPage';
import Edit from './components/Edit/Edit';

export default (
  <Switch>
    <Route exact path={'/'} component={Home}/>
    <Route path={'/forum'} component={Forum}/>
    <Route exact path={'/post'} component={Post}/>
    <Route path={'/post/:id'} component={PostPage}/>
    <Route path={'/edit/:id'} component={Edit}/>
  </Switch>
)