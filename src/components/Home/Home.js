import React from 'react'
import { Route, Switch } from 'react-router-dom'
import TodaysBookings from '../TodaysBookings/TodaysBookings';
import PastBookings from '../PastBookings/PastBookings';
import Header from '../Header/Header'
import ShopInfo from '../ShopInfo/ShopInfo';

function Home(props) {
    return (
        <div style={{ backgroundColor: '#ECF2F5', minHeight: 'calc(100vh - 64px)' }}>
            <Header></Header>
            <Switch>
                <Route exact path={`${props.match.path}`} component={TodaysBookings} ></Route>
                <Route exact path={`${props.match.path}/pastbookings`} component={PastBookings} ></Route>
                <Route exact path={`${props.match.path}/shopinfo`} component={ShopInfo} ></Route>
            </Switch>
        </div>
    )
}

export default Home