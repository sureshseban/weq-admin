import React, { useState, useEffect } from 'react'
import { Input } from 'antd'
import './MyShops.css'
import axios from 'axios'
import { Spin } from 'antd'
const logo = require('../../assets/images/Shopping Cart-ico.svg');
const pointer = require('../../assets/images/Pointer.svg');

function MyShops() {

    const [shops, setShops] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        axios.post('http://ec2-52-15-191-227.us-east-2.compute.amazonaws.com/superadmin/branch/getallbranches', {
            UserID: 22,
            ClientID: 1
        }).then(resp => {
            setShops(resp.data.data)
            setIsLoading(false)
        }).catch(err => {
            setIsLoading(false)
            console.log(err);
        })
    }, [])

    const onSearch = (text) => {
        console.log(text)
    }

    return (
        <React.Fragment>
            <Spin spinning={isLoading}>
                <div className='filter'>
                    <div className='booking-info-header'>Welcome to, </div>
                    <div className='display-flex'>
                        <div className='brand-name'>
                            {
                                shops.length ? shops[0].ClientName : null
                            }
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
                                            <div className='shop-names'>{item.BranchName}</div>
                                            <div>{item.CategoryName}</div>
                                            <div className='shop-address'><img alt='' src={pointer} />  {item.BuildingNumber} {item.StreetName} {item.City}  {item.State}</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </Spin>
        </React.Fragment>
    )
}

export default MyShops
