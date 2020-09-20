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
                    timing: '11.00 AM - 11.15 AM'
                },
                {
                    slotid: 'SL02',
                    weqid: 'WQ123',
                    noBookings: '1',
                    timing: '11.15 AM - 11.30 AM'
                },
                {
                    slotid: 'SL03',
                    weqid: 'WQ123',
                    noBookings: '1',
                    timing: '11.15 AM - 11.30 AM'
                }
            ]
        }

    ])

    return (
        <React.Fragment>
            <div className='filer'></div>
            <div className='slots-section'>
                {
                    slots.map((slot, index) => {
                        return (<div key={index}>
                            <h1>{slot.timing}</h1>
                            {
                                slot.data.map((item, _index) => {
                                    return (<div key={_index}>
                                        <div><span>{item.slotid}</span>,
                                        <span>{item.weqid}</span>,
                                        <span>{item.noBookings}</span></div>
                                    </div>)
                                })
                            }
                        </div>)
                    })
                }
            </div>
        </React.Fragment>
    )
}

export default Home