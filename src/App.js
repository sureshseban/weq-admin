import React from 'react';
import './App.css';
import "antd/dist/antd.css"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Register from './components/Register/Register';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import ShopInfo from './components/ShopInfo/ShopInfo';
import Header from './components/Header/Header'
import Reports from './components/Reports/Reports';
import Visitors from './components/Visitors/Visitors';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/login' component={Login} ></Route>
        <Route exact path='/' component={Register} ></Route>
        <React.Fragment>
          <Header />
          <Route exact path='/home' component={Home} ></Route>
          <Route exact path='/visitors' component={Visitors} ></Route>
          <Route exact path='/shopinfo' component={ShopInfo} ></Route>
          <Route exact path='/reports' component={Reports} ></Route>
        </React.Fragment>
      </Switch>
    </Router>
  );
}

export default App;
