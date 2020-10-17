import React from 'react'
import { NavLink } from 'react-router-dom'
import './Menu.css'
import { Popover } from 'antd';
const logo = require('../../assets/images/WEQ-logo.svg');
const user = require('../../assets/images/user.svg');

function Menu(props) {
    const content = (
        <div>
            <p>
                <NavLink activeClassName='activeMenuLink' exact to="/my-profile">My Profile</NavLink>
            </p>
            <p>
                <NavLink activeClassName='activeMenuLink' exact to="/login">Signout</NavLink>
            </p>
        </div>
    );
    return (
        <header id="header" className="clearfix">
            <div className="ant-row" style={{ 'flexFlow': "nowrap" }}>
                <div className="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-6 ant-col-lg-6 ant-col-xl-5 ant-col-xxl-4">
                    <h1><a id="logo" href="/my-shops"><img className="logo" alt="logo" src={logo} /></a></h1>
                </div>
                <div className="ant-col menu-row ant-col-xs-0 ant-col-sm-0 ant-col-md-18 ant-col-lg-18 ant-col-xl-19 ant-col-xxl-20">
                    <div id="search-box" style={{ visibility: 'hidden' }}>
                    </div>
                    <ul className="ant-menu ant-menu-light menu-site ant-menu-root ant-menu-horizontal" id="nav" direction="ltr" role="menu">
                        <li className="ant-menu-item ant-menu-item-only-child" role="menuitem">
                            <NavLink activeClassName='activeMenuLink' exact to="/my-shops">Home</NavLink>
                        </li>
                        <li className="ant-menu-item ant-menu-item-only-child" role="menuitem">
                            <NavLink activeClassName='activeMenuLink' exact to="/add-shop">Add Shop</NavLink>
                        </li>
                        <li className="ant-menu-item ant-menu-item-only-child" role="menuitem">
                            <Popover placement="bottom" title='' content={content} trigger="click">
                                <img className="logo1" alt="logo" src={user} />
                            </Popover>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Menu