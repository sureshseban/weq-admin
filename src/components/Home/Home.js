import React from 'react'
import { Switch } from 'react-router-dom'
import TodaysBookings from '../TodaysBookings/TodaysBookings';
import PastBookings from '../PastBookings/PastBookings';
import Header from '../Header/Header'
import ShopInfo from '../ShopInfo/ShopInfo';
import ProtectedRoute from '../router/ProtectedRoute';
import _services from '../../utils/services';

function Home(props) {
    return (
        <div style={{ backgroundColor: '#ECF2F5', minHeight: 'calc(100vh - 64px)' }}>
            <Header></Header>
            <Switch>
                <ProtectedRoute exact
                    path={`${props.match.path}`}
                    Component={TodaysBookings}
                    isAuthenticated={_services.isAuthenticated}
                    {...props} />
                <ProtectedRoute exact
                    path={`${props.match.path}/pastbookings`}
                    Component={PastBookings}
                    isAuthenticated={_services.isAuthenticated}
                    {...props} />
                <ProtectedRoute exact
                    path={`${props.match.path}/shopinfo`}
                    Component={ShopInfo}
                    isAuthenticated={_services.isAuthenticated}
                    {...props} />
            </Switch>
        </div>
    )
}

export default Home