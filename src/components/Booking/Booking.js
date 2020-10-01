import React from 'react'
import { Route, Switch } from 'react-router-dom'
import TodaysBookings from '../TodaysBookings/TodaysBookings';
import PastBookings from '../PastBookings/PastBookings';
import Header from '../Header/Header'

function Booking(props) {
    console.log(props);
    return (
        <React.Fragment>
            <Header></Header>
            <Switch>
                <Route exact path={`${props.match.path}`} component={TodaysBookings} ></Route>
                <Route exact path={`${props.match.path}/pastbookings`} component={PastBookings} ></Route>
            </Switch>
        </React.Fragment>
    )
}

export default Booking