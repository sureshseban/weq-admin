import React, { useState, useEffect } from 'react'
import './TodaysBookings.css'
import axios from 'axios'
import { Spin, Result } from 'antd'
import moment from 'moment'
import _services from '../../utils/services'
import useDocumentTitle from '../hooks/useDocumentTitle'

function TodaysBookings(props) {

    const user = JSON.parse(localStorage.user)
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
        axios.post(`${_services.baseURL}/superadmin/branch/getslotdetails`, {
            BranchID: _services.selectedShop.BranchID,
            UserID: user.UserID,
            StartDate: moment(new Date()).format(_services.dateFormat_API),
            EndDate: moment(new Date()).format(_services.dateFormat_API)
        }).then(resp => {
            const _slots = groupBy(resp.data.config, 'DaySequence')
            setMorningSlots(_slots.Morning)
            setAfternoonSlots(_slots.Afternoon)
            setEveningSlots(_slots.Evening)
            setIsLoading(false)
        }).catch(err => {
            setIsLoading(false)
            console.log(err);
        })
    }, [])
    useDocumentTitle('Todays Bookings')

    return (
        <Spin spinning={isLoading}>
            <div className='slots-section'>
                {
                    isLoading ? <Result
                        title='Loading...'
                    /> : <React.Fragment>
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
                                            <div key={_index} className={item.BookedCount ? 'grid-item-booked' : 'grid-item'}>
                                                <div>
                                                    <span className='sl-no'>WEQ </span>
                                                    <span className='booking-id'>{item.BookingUniqueID || (_index + 1)}</span>
                                                </div>
                                                <div className='display-flex'>
                                                    <div className='ppl-count'>{item.BookedCount} People</div>
                                                    <div className='duration'>
                                                        {moment(item.SlotStartTime || 0, ["h:mm A"]).format("hh:mm A")} - {moment(item.SlotEndTime || 0, ["h:mm A"]).format("hh:mm A")}
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
                                            <div key={_index} className={item.BookedCount ? 'grid-item-booked' : 'grid-item'}>
                                                <div>
                                                    <span className='sl-no'>WEQ </span>
                                                    <span className='booking-id'>{item.BookingUniqueID || (_index + 1)}</span>
                                                </div>
                                                <div className='display-flex'>
                                                    <div className='ppl-count'>{item.BookedCount} People</div>
                                                    <div className='duration'>
                                                        {moment(item.SlotStartTime || 0, ["h:mm A"]).format("hh:mm A")} - {moment(item.SlotEndTime || 0, ["h:mm A"]).format("hh:mm A")}
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
                                            <div key={_index} className={item.BookedCount ? 'grid-item-booked' : 'grid-item'}>
                                                <div>
                                                    <span className='sl-no'>WEQ </span>
                                                    <span className='booking-id'>{item.BookingUniqueID || (_index + 1)}</span>
                                                </div>
                                                <div className='display-flex'>
                                                    <div className='ppl-count'>{item.BookedCount} People</div>
                                                    <div className='duration'>
                                                        {moment(item.SlotStartTime || 0, ["h:mm A"]).format("hh:mm A")} - {moment(item.SlotEndTime || 0, ["h:mm A"]).format("hh:mm A")}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </React.Fragment>
                }
            </div>
        </Spin>
    )
}

export default TodaysBookings