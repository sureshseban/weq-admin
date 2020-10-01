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
            {/* <div>This is Header</div>
            <ul >
                <li>
                    <NavLink to={`${props.match.path}`}>Home</NavLink>
                </li>
                <li>
                    <NavLink to={`${props.match.path}/visitors`}>Visitors</NavLink>
                </li>
            </ul>
            */}
        </header>
    )
}

export default Header