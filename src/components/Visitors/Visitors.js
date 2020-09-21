import React, { useState } from 'react'
import './Visitors.css'
import { DatePicker, Input } from 'antd'
import moment from 'moment'
const { RangePicker } = DatePicker;

function Visitors(props) {

    const dateFormat = 'DD/MM/YYYY'
    const [startDate, setStartDate] = useState(moment(new Date(), dateFormat))
    const [endDate, setEndDate] = useState(moment(new Date(), dateFormat))
    const [slots, setSlots] = useState(
        [
            {
                slotid: 'SL01',
                weqid: 'WQ123',
                noBookings: '10',
                timing: '10.00 AM - 10.15 AM'
            },
            {
                slotid: 'SL02',
                weqid: 'WQ123',
                noBookings: '1',
                timing: '10.00 AM - 10.15 AM'
            },
            {
                slotid: 'SL03',
                weqid: 'WQ123',
                noBookings: '1',
                timing: '10.00 AM - 10.15 AM'
            },
            {
                slotid: 'SL01',
                weqid: 'WQ123',
                noBookings: '10',
                timing: '10.00 AM - 10.15 AM'
            },
            {
                slotid: 'SL02',
                weqid: 'WQ123',
                noBookings: '1',
                timing: '10.00 AM - 10.15 AM'
            },
            {
                slotid: 'SL03',
                weqid: 'WQ123',
                noBookings: '1',
                timing: '10.00 AM - 10.15 AM'
            },
            {
                slotid: 'SL02',
                weqid: 'WQ123',
                noBookings: '1',
                timing: '10.00 AM - 10.15 AM'
            },
            {
                slotid: 'SL03',
                weqid: 'WQ123',
                noBookings: '1',
                timing: '10.00 AM - 10.15 AM'
            }
        ]
    )

    function onChange(dates) {
        if (dates) {
            setStartDate(dates[0])
            setEndDate(dates[1])
            console.log(startDate);
            console.log(endDate)
        }
    }

    function onSearch(text) {
        console.log(text)
    }

    return (
        <React.Fragment>
            <div className='filter'>
                <div className='booking-info-header'>Visitors Info</div>
                <div className='display-flex'>
                    <div style={{ 'flexGrow': 1 }}>
                        <RangePicker
                            defaultValue={[startDate, endDate]}
                            format={dateFormat}
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <Input placeholder="Enter visitor name" allowClear onChange={(e) => onSearch(e.target.value)} />
                    </div>
                </div>
            </div>
            <div className='visitors-section'>
                <div className='slots-grid'>
                    {
                        slots.map((item, index) => {
                            return (
                                <div key={index} className='grid-item'>
                                    <div>
                                        <span className='sl-no'>Sajeesh Sivanandan</span>
                                        {/* <span className='booking-id'>WQ123245</span> */}
                                    </div>
                                    <div className='display-flex'>
                                        <div className='ppl-count'>with 2 visitors</div>
                                        <div className='duration'>10:00-10:40</div>
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

export default Visitors