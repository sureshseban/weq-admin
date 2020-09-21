import React, { useState } from 'react'
import './Visitors.css'

function Visitors(props) {

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

    return (
        <React.Fragment>
            <div className='filter'>
                <div className='booking-info-header'>Visitors Info</div>
                <div className='display-flex'>
                    <div style={{ 'flexGrow': 1 }}>Calander</div>
                    <div>Search</div>
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