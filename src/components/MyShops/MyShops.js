import React, { useState } from 'react'
import { Result } from 'antd'
import './MyShops.css'
import { Spin } from 'antd'
import _services from '../../utils/services'
import { useHttpPost } from '../hooks/http'
import useDocumentTitle from '../hooks/useDocumentTitle'
import Filter from '../filter/Filter'
const logo = require('../../assets/images/Shopping Cart-ico.svg');
const pointer = require('../../assets/images/Pointer.svg');

function MyShops(props) {

    const user = JSON.parse(localStorage.user)
    const [filter, setFilter] = useState('')

    useDocumentTitle('My Shops')
    const [isLoading, fetchedData] = useHttpPost('/superadmin/branch/getallbranches', {
        UserID: user.UserID,
        ClientID: user.ClientID
    }, [user.UserID, user.ClientID])

    let filteredShops = fetchedData ? fetchedData.data.data.filter(element => {
        return element.BranchName.toLowerCase().includes(filter.toLowerCase());
    }) : []

    const onSearch = (filter) => {
        setFilter(filter)
    }

    const handleClick = () => {
        props.history.push("/add-shop")
    }

    const handleShopClick = (shop) => {
        _services.selectedShop = shop
        props.history.push("/home")
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
                            <Filter onSearch={onSearch} />
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
                                            <div onClick={() => handleShopClick(item)} key={index} className='shop-grid-item'>
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
