import React from 'react'
import './Header.css'
import { NavLink } from 'react-router-dom'
import _services from '../../utils/services'

function Header(props) {
    const user = JSON.parse(localStorage.user)

    return (
        <header className="home-header">
            <div className="breadcrum">
                Home / <NavLink exact to='/my-shops'>{user.ClientName}</NavLink>
            </div>
            <div className="shop-name">
                {_services.selectedShop.BranchName}
            </div>
            <div className='sub-menu'>
                <NavLink activeClassName='activeMenuLink' exact to='/home'>Today’s Bookings</NavLink>
                <NavLink activeClassName='activeMenuLink' exact to='/home/pastbookings'>Past Bookings</NavLink>
                <NavLink activeClassName='activeMenuLink' exact to='/home/shopinfo'>Shop Info</NavLink>
            </div>
        </header>
    )
}

export default Header