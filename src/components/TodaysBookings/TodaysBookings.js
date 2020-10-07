import React, { useState, useEffect } from 'react'
import './TodaysBookings.css'
import axios from 'axios'
import { Spin } from 'antd'
import moment from 'moment'
import _services from '../../utils/services'

function TodaysBookings(props) {

    const user = JSON.parse(localStorage.user)
    const dateFormat = 'YYYY-MM-DD'
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
            BranchID: 1, // _services.selectedShop.BranchID,
            UserID: user.UserID,
            StartDate: moment(new Date()).format(dateFormat),
            EndDate: moment(new Date()).format(dateFormat)
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
                    morningSlots && morningSlots.length ? <div className='slots-heading'>
                        <span className='booked-timing'>Morning</span>
                        <span className='booked-count'>Booked 20/35</span>
                    </div> : null
                }
                <div className='slots-grid'>
                    {
                        morningSlots && morningSlots.map((item, _index) => {
                            return (
                                <div key={_index} className='grid-item'>
                                    <div>
                                        <span className='sl-no'>WEQ</span>
                                        <span className='booking-id'>{item.BookingUniqueID}</span>
                                    </div>
                                    <div className='display-flex'>
                                        <div className='ppl-count'>{item.BookedCount} People</div>
                                        <div className='duration'>
                                            {moment(item.SlotStartTime || 0, ["HH"]).format("hh A")} - {moment(item.SlotEndTime || 0, ["HH"]).format("hh A")}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                {
                    afternoonSlots && afternoonSlots.length ? <div className='slots-heading'>
                        <span className='booked-timing'>Afternoon</span>
                        <span className='booked-count'>Booked 20/35</span>
                    </div> : null
                }
                <div className='slots-grid'>
                    {
                        afternoonSlots && afternoonSlots.map((item, _index) => {
                            return (
                                <div key={_index} className='grid-item'>
                                    <div>
                                        <span className='sl-no'>WEQ</span>
                                        <span className='booking-id'>{item.BookingUniqueID}</span>
                                    </div>
                                    <div className='display-flex'>
                                        <div className='ppl-count'>{item.BookedCount} People</div>
                                        <div className='duration'>
                                            {moment(item.SlotStartTime || 0, ["HH"]).format("hh A")} - {moment(item.SlotEndTime || 0, ["HH"]).format("hh A")}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                {
                    eveningSlots && eveningSlots.length ? <div className='slots-heading'>
                        <span className='booked-timing'>Evening</span>
                        <span className='booked-count'>Booked 20/35</span>
                    </div> : null
                }
                <div className='slots-grid'>
                    {
                        eveningSlots && eveningSlots.map((item, _index) => {
                            return (
                                <div key={_index} className='grid-item'>
                                    <div>
                                        <span className='sl-no'>WEQ</span>
                                        <span className='booking-id'>{item.BookingUniqueID}</span>
                                    </div>
                                    <div className='display-flex'>
                                        <div className='ppl-count'>{item.BookedCount} People</div>
                                        <div className='duration'>
                                            {moment(item.SlotStartTime || 0, ["HH"]).format("hh A")} - {moment(item.SlotEndTime || 0, ["HH"]).format("hh A")}
                                        </div>
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