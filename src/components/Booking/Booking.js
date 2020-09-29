import React from 'react'
import { NavLink } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'
import Home from '../Home/Home';
import Visitors from '../Visitors/Visitors';

function Booking(props) {
    console.log(props);
    return (
        <React.Fragment>
            <div>This is Header</div>
            <ul >
                <li>
                    <NavLink to={`${props.match.path}`}>Home</NavLink>
                </li>
                <li>
                    <NavLink to={`${props.match.path}/visitors`}>Visitors</NavLink>
                </li>
            </ul>
            <Switch>
                <Route exact path={`${props.match.path}`} component={Home} ></Route>
                <Route exact path={`${props.match.path}/visitors`} component={Visitors} ></Route>
            </Switch>
        </React.Fragment>
    )
}

export default Booking