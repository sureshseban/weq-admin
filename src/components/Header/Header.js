import React from 'react'
import './Header.css'
import { NavLink } from 'react-router-dom'

function Header(props) {
    return (
        <header className="home-header">
            <div className="breadcrum">
                Home / Lulu Enterprises / Lulu Mart
            </div>
            <div className="shop-name">
                Lulu Mart
            </div>
            <div className='sub-menu'>
                <NavLink activeClassName='activeMenuLink' exact to='/home/'>Today’s Bookings</NavLink>
                <NavLink activeClassName='activeMenuLink' exact to='/home/pastbookings'>Past Bookings</NavLink>
                <NavLink activeClassName='activeMenuLink' exact to='/home/shopinfo'>Shop Info</NavLink>
            </div>
        </header>
    )
}

export default Header