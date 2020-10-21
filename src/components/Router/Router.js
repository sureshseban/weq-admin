import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Register from '../Register/Register';
import Login from '../Login/Login';
import Menu from '../Menu/Menu'
import AddShop from '../AddShop/AddShop';
import MyShops from '../MyShops/MyShops';
import Home from '../Home/Home';
import _services from '../../utils/services';
import MyProfile from '../MyProfile/MyProfile';

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/login' component={Login} ></Route>
                <Route exact path='/' component={Register} ></Route>
                <React.Fragment>
                    <Menu />
                    <Route exact path='/add-shop' component={AddShop} ></Route>
                    <Route exact path='/my-shops' component={MyShops} ></Route>
                    <Route exact path='/my-profile' component={MyProfile} ></Route>
                    <Route path='/home' render={(props) => (
                        _services.selectedShop !== null ? (<Home {...props} />) : (<Redirect to='/my-shops' />)
                    )} ></Route>
                </React.Fragment>
            </Switch>
        </BrowserRouter>
    )
}

export default Router