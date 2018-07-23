import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './components/Home/Home';
import ProfilePage from './components/ProfilePage/ProfilePage';
import Forum from './components/Forum/Forum';
import Post from './components/Post/Post';
import PostPage from './components/PostPage/PostPage';
import Edit from './components/Edit/Edit';
import ComicPage from './components/ComicPage/ComicPage';
import CharacterPage from './components/CharacterPage/CharacterPage';
import EditProfile from './components/EditProfile/EditProfile';

export default (
  <Switch>
    <Route exact path={'/'} component={Home}/>
    <Route exact path={'/profile/:userId'} component={ProfilePage}/>
    <Route path={'/profile/edit/:userId'} component={EditProfile}/>
    <Route path={'/forum'} component={Forum}/>
    <Route exact path={'/post'} component={Post}/>
    <Route path={'/post/:id'} component={PostPage}/>
    <Route path={'/edit/:id'} component={Edit}/>
    <Route path={'/comic/:comicId'} component={ComicPage}/>
    <Route path={'/character/:characterId'} component={CharacterPage}/>
    <Route path={'/store'} />
  </Switch>
)