import React from 'react';
import './App.css';
import "antd/dist/antd.css"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Header from './components/Header/Header'
import AddShop from './components/AddShop/AddShop';
import MyShops from './components/MyShops/MyShops';
import Booking from './components/Booking/Booking';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/login' component={Login} ></Route>
        <Route exact path='/' component={Register} ></Route>
        <React.Fragment>
          <Header />
          <Route exact path='/add-shop' component={AddShop} ></Route>
          <Route exact path='/my-shops' component={MyShops} ></Route>
          <Route path='/booking' component={Booking} ></Route>
        </React.Fragment>
      </Switch>
    </Router>
  );
}

export default App;
