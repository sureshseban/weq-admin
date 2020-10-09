import React from 'react';
import './App.css';
import "antd/dist/antd.css"
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Menu from './components/Menu/Menu'
import AddShop from './components/AddShop/AddShop';
import MyShops from './components/MyShops/MyShops';
import Home from './components/Home/Home';
import _services from './utils/services';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/login' component={Login} ></Route>
        <Route exact path='/' component={Register} ></Route>
        <React.Fragment>
          <Menu />
          <Route exact path='/add-shop' component={AddShop} ></Route>
          <Route exact path='/my-shops' component={MyShops} ></Route>
          <Route path='/home' render={(props) => (
            _services.selectedShop !== null ? (<Home {...props} />) : (<Redirect to='/my-shops' />)
          )} ></Route>
        </React.Fragment>
      </Switch>
    </Router>
  );
}

export default App;
