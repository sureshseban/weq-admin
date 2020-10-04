import React, { useState, useEffect } from 'react'
import './TodaysBookings.css'
import axios from 'axios'
import { Spin } from 'antd'

function TodaysBookings() {

    const [morningSlots, setMorningSlots] = useState([])
    const [afternoonSlots, setAfternoonSlots] = useState([])
    const [eveningSlots, setEveningSlots] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const groupBy = (array, key) => {
        return array.reduce((result, currentValue) => {
            (result[currentValue[key]] = result[currentValue[key]] || []).push(
                currentValue
            );
            return result;
        }, {});
    };

    useEffect(() => {
        setIsLoading(true)
        axios.post('http://ec2-52-15-191-227.us-east-2.compute.amazonaws.com/superadmin/branch/getslotdetails', {
            BranchID: 1,
            UserID: 22,
            StartDate: '2020-09-04',
            EndDate: '2020-09-04'
        }).then(resp => {
            const _slots = groupBy(resp.data.data, 'DaySequence');
            setMorningSlots(_slots.Morning)
            setAfternoonSlots(_slots.Afternoon)
            setEveningSlots(_slots.Evening)
            setIsLoading(false)
        }).catch(err => {
            setIsLoading(false)
            console.log(err);
        })
    }, [])

    return (
        <Spin spinning={isLoading}>
            <div className='slots-section'>
                {
                    morningSlots.length ? <div className='slots-heading'>
                        <span className='booked-timing'>Morning</span>
                        <span className='booked-count'>Booked 20/35</span>
                    </div> : null
                }
                <div className='slots-grid'>
                    {
                        morningSlots.map((item, _index) => {
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
                {
                    afternoonSlots.length ? <div className='slots-heading'>
                        <span className='booked-timing'>Afternoon</span>
                        <span className='booked-count'>Booked 20/35</span>
                    </div> : null
                }
                <div className='slots-grid'>
                    {
                        afternoonSlots.map((item, _index) => {
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
                {
                    eveningSlots.length ? <div className='slots-heading'>
                        <span className='booked-timing'>Evening</span>
                        <span className='booked-count'>Booked 20/35</span>
                    </div> : null
                }
                <div className='slots-grid'>
                    {
                        eveningSlots.map((item, _index) => {
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
            </div>
        </Spin>
    )
}

export default TodaysBookings