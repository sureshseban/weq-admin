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
import ProtectedRoute from './ProtectedRoute';

const Router = (props) => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/login' component={Login} ></Route>
                <Route exact path='/' component={Register} ></Route>
                <React.Fragment>
                    <Menu />
                    <ProtectedRoute exact
                        path='/my-shops'
                        Component={MyShops}
                        isAuthenticated={_services.isAuthenticated}
                        {...props} />
                    <ProtectedRoute exact
                        path='/add-shop'
                        Component={AddShop}
                        isAuthenticated={_services.isAuthenticated}
                        {...props} />
                    <ProtectedRoute exact
                        path='/my-profile'
                        component={MyProfile}
                        isAuthenticated={_services.isAuthenticated}
                        {...props} />
                    <Route path='/home' render={(props) => (
                        _services.selectedShop !== null ? (<Home {...props} />) : (<Redirect to='/my-shops' />)
                    )} />
                </React.Fragment>
            </Switch>
        </BrowserRouter>
    )
}

export default Router