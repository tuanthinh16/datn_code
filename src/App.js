import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import Login from "./templates/account/login";
import Register from "./templates/account/register";
import Logout from "./templates/account/logout";
import Profile from "./templates/account/profile";
import UserProfile from "./templates/account/userprofile";
import Market from "./templates/Market";
//book
import { Index } from "./templates/Index";
import BProfile from "./templates/book/profile";
import { TypeFillter } from "./templates/book/TypeFillter";
//wallet
import { Wallet } from "./templates/wallet/wallet";
import AddBook from "./templates/book/addbook";
import SellForm from "./templates/book/sellForm";
import { CountryFillter } from "./templates/book/CountryFillter";
import Search from "./templates/book/Search";
function App() {
  return (
    <SnackbarProvider>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/market">
            <Market />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route path="/profile/:value" children={<Profile />}></Route>
          <Route
            path="/user-profile/:username"
            children={<UserProfile />}
          ></Route>
          <Route path="/book/add-book">
            <AddBook />
          </Route>
          <Route path="/book/profile/:idBook" children={<BProfile />}></Route>
          <Route path="/book/sell-book">
            <SellForm />
          </Route>
          <Route path="/wallet/:username" children={<Wallet />}></Route>
          <Route path="/book/type/:value" children={<TypeFillter />}></Route>
          <Route path="/search/:value" children={<Search />}></Route>
          <Route
            path="/book/country/:country"
            children={<CountryFillter />}
          ></Route>
          <Route path="/">
            <Index />
          </Route>

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
