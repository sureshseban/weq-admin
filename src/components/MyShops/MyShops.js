import React, { useState, useEffect } from 'react'
import { Input, Result } from 'antd'
import './MyShops.css'
import axios from 'axios'
import { Spin } from 'antd'
const logo = require('../../assets/images/Shopping Cart-ico.svg');
const pointer = require('../../assets/images/Pointer.svg');

function MyShops(props) {

    const user = JSON.parse(localStorage.user)
    const [shops, setShops] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [filter, setFilter] = useState('')

    let filteredShops = shops.filter(element => {
        return element.BranchName.toLowerCase().includes(filter.toLowerCase());
    });

    useEffect(() => {
        setIsLoading(true)
        const user = JSON.parse(localStorage.user)
        axios.post('http://ec2-52-15-191-227.us-east-2.compute.amazonaws.com/superadmin/branch/getallbranches', {
            UserID: user.UserID,
            ClientID: user.ClientID
        }).then(resp => {
            setShops(resp.data.data)
            setIsLoading(false)
        }).catch(err => {
            setIsLoading(false)
            console.log(err);
        })
    }, [])

    const onSearch = (filter) => {
        setFilter(filter)
    }

    const handleClick = () => {
        props.history.push("/add-shop")
    }

    return (
        <React.Fragment>
            <Spin spinning={isLoading}>
                <div className='filter'>
                    <div className='booking-info-header'>Welcome to, </div>
                    <div className='display-flex'>
                        <div className='brand-name'>
                            {
                                user.ClientName
                            }
                        </div>
                        <div>
                            <Input placeholder="Search Shop Name" allowClear onChange={(e) => onSearch(e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className='shops-section'>
                    {
                        filteredShops && filteredShops.length ?
                            <div className='shops-grid'>
                                {
                                    filteredShops.map((item, index) => {
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
                            </div> : <Result
                                title="Your brand is empty. Please create a shop"
                                extra={
                                    <button onClick={handleClick} className="weq-button">Add Shop</button>
                                }
                            />
                    }
                </div>
            </Spin>
        </React.Fragment>
    )
}

export default MyShops
