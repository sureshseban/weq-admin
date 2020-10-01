import React from 'react'
import { NavLink } from 'react-router-dom'
import './Menu.css'
const logo = require('../../assets/images/WEQ-logo.svg');

function Menu(props) {
    return (
        <header id="header" className="clearfix">
            <div className="ant-row" style={{ 'flexFlow': "nowrap" }}>
                <div className="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-6 ant-col-lg-6 ant-col-xl-5 ant-col-xxl-4">
                    <h1><a id="logo" href="/home"><img className="logo" alt="logo" src={logo} /></a></h1>
                </div>
                <div className="ant-col menu-row ant-col-xs-0 ant-col-sm-0 ant-col-md-18 ant-col-lg-18 ant-col-xl-19 ant-col-xxl-20">
                    <div id="search-box" style={{ visibility: 'hidden' }}>
                    </div>
                    <ul className="ant-menu ant-menu-light menu-site ant-menu-root ant-menu-horizontal" id="nav" direction="ltr" role="menu">
                        <li className="ant-menu-item ant-menu-item-only-child" role="menuitem">
                            <NavLink activeClassName='activeMenuLink' exact to="/booking">Booking</NavLink>
                        </li>
                        <li className="ant-menu-item ant-menu-item-only-child" role="menuitem">
                            <NavLink activeClassName='activeMenuLink' exact to="/add-shop">Add Shop</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Menu