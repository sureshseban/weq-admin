import React, { useState } from 'react'
import { Input } from 'antd'
import './MyShops.css'
const logo = require('../../assets/images/Shopping Cart-ico.svg');
const pointer = require('../../assets/images/Pointer.svg');

function MyShops() {

    const [shops, setShops] = useState([
        {
            id: 1,
            ShopName: 'Lulu 1',
            location: 'Kerala'
        },
        {
            id: 2,
            ShopName: 'Lulu 2',
            location: 'Kerala'
        },
        {
            id: 3,
            ShopName: 'Lulu 3',
            location: 'Kerala'
        },
        {
            id: 4,
            ShopName: 'Lulu 4',
            location: 'Kerala'
        }
    ])

    const onSearch = (text) => {
        console.log(text)
    }

    return (
        <React.Fragment>
            <div className='filter'>
                <div className='booking-info-header'>Welcome to, </div>
                <div className='display-flex'>
                    <div className='brand-name'>
                        Lulu Enterprises
                    </div>
                    <div>
                        <Input placeholder="Search Shop Name" allowClear onChange={(e) => onSearch(e.target.value)} />
                    </div>
                </div>
            </div>
            <div className='shops-section'>
                <div className='shops-grid'>
                    {
                        shops.map((item, index) => {
                            return (
                                <div key={index} className='shop-grid-item'>
                                    <div className='img'>
                                        <img alt="shop" src={logo} />
                                    </div>
                                    <div className='info'>
                                        <div className='branch-names'>Lulu Mart</div>
                                        <div className='shop-names ant-form-item'>Lulu Mart</div>
                                        <div className='shop-address'><img alt='' src={pointer} />  Lulu Mart</div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

export default MyShops
