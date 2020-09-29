import React, { useState } from 'react'
import { DatePicker, Input } from 'antd'
import './MyShops.css'

function MyShops(props) {

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
                                <div key={index} className='grid-item'>
                                    {/* <div>
                                        <span className='sl-no'>Sajeesh Sivanandan</span>
                                        <span className='booking-id'>WQ123245</span>
                                    </div>
                                    <div className='display-flex'>
                                        <div className='ppl-count'>with 2 visitors</div>
                                        <div className='duration'>10:00-10:40</div>
                                    </div> */}
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
