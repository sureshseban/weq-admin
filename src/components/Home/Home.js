import React, { useState } from 'react'
import './Home.css'

function Home(props) {

    const [slots, setSlots] = useState([
        {
            timing: '10.00 AM',
            data: [
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
        },
        {
            timing: '11.00 AM',
            data: [
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
        }
    ])

    return (
        <React.Fragment>
            <div className='filter'>
                <div className='booking-info-header'>Booking Info</div>
                <div className='display-flex'>
                    <div style={{ 'flexGrow': 1 }}>Calander</div>
                    <div>Search</div>
                </div>
            </div>
            <div className='slots-section'>
                {
                    slots.map((slot, index) => {
                        return (
                            <React.Fragment key={index}>
                                <div className='slots-heading'>
                                    <span className='booked-timing'>10.00 AM</span>
                                    <span className='booked-count'>Booked 20/35</span>
                                </div>
                                <div className='slots-grid' key={index}>
                                    {
                                        slot.data.map((item, _index) => {
                                            return (
                                                <div key={_index} className='grid-item'>
                                                    <div>
                                                        <span className='sl-no'>Sl.01</span>
                                                        <span className='booking-id'>WQ123245</span>
                                                    </div>
                                                    <div className='display-flex'>
                                                        <div className='ppl-count'>2 People</div>
                                                        <div className='duration'>10:00-10:40</div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </React.Fragment>
                        )
                    })
                }
            </div>
        </React.Fragment>
    )
}

export default Home