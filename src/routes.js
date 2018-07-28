import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './components/Home/Home';
import ProfilePage from './components/ProfilePage/ProfilePage';
import Forum from './components/Forum/Forum';
import Post from './components/Post/Post';
import PostPage from './components/PostPage/PostPage';
import ComicPage from './components/ComicPage/ComicPage';
import CharacterPage from './components/CharacterPage/CharacterPage';

export default (
  <Switch>
    <Route exact path={'/'} component={Home}/>
    <Route exact path={'/profile/:userId'} component={ProfilePage}/>
    <Route path={'/forum'} component={Forum}/>
    <Route exact path={'/post'} component={Post}/>
    <Route path={'/post/:id'} component={PostPage}/>
    <Route path={'/comic/:comicId'} component={ComicPage}/>
    <Route path={'/character/:characterName'} component={CharacterPage}/>
    <Route path={'/store'} />
  </Switch>
)