import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ Component, isAuthenticated, ...rest }) => {

    return (<Route {...rest} render={(props) => (
        isAuthenticated ?
            (<Component {...props} />)
            :
            (<Redirect to='/login' />)
    )} ></Route>)

}

export default ProtectedRoute;