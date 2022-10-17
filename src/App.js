
import './App.css';

import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import {SnackbarProvider} from 'notistack';
import Index from './templates/index';
import Login from './templates/account/login';
import Register from './templates/account/register';
import Logout from './templates/account/logout';
import Profile from './templates/account/profile';
import UserProfile from './templates/account/userprofile';
import Home from './templates/index2';
//book
import BProfile from './templates/book/profile';

import AddBook from './templates/book/addbook';

function App() {
  return (
    <SnackbarProvider>
    <Router>
      <Switch>
          <Route path="/login"><Login /></Route>
          <Route path="/register"><Register /></Route>
          <Route path="/logout"><Logout /></Route>
          <Route path="/profile/:value" children={<Profile />}></Route>
          <Route path="/user-profile/:username" children={<UserProfile />}></Route>
          <Route path="/book/add-book"><AddBook /></Route>
          <Route path="/book/profile/:idBook" children={<BProfile />}></Route>
          <Route path='/'><Home /></Route>

{/* 
        <Route path="/">
          <Index />
        </Route> */}
        
      </Switch>
    </Router>
  </SnackbarProvider>
  );
}

export default App;
