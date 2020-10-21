import React, { useState, useEffect } from 'react'
import './PastBookings.css'
import { DatePicker, Input } from 'antd'
import axios from 'axios'
import { Spin, Result, Popover } from 'antd'
import moment from 'moment'
import _services from '../../utils/services'
import useDocumentTitle from '../hooks/useDocumentTitle'
const { RangePicker } = DatePicker;

function PastBookings(props) {

    const user = JSON.parse(localStorage.user)
    var currentDate = new Date()
    const lastFiveDate = new Date(currentDate.setDate(currentDate.getDate() - 7))
    const [startDate, setStartDate] = useState(moment(lastFiveDate, _services.dateFormat_UI))
    const [endDate, setEndDate] = useState(moment(new Date(), _services.dateFormat_UI))
    const [slots, setSlots] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [emptyTitle, setEmptyTitle] = useState('Loading...')

    function onChange(dates) {
        if (dates) {
            setStartDate(dates[0])
            setEndDate(dates[1])
            setIsLoading(true)
            axios.post(`${_services.baseURL}/superadmin/branch/getslotdetails`, {
                BranchID: _services.selectedShop.BranchID,
                UserID: user.UserID,
                StartDate: moment(new Date(dates[0])).format(_services.dateFormat_API),
                EndDate: moment(new Date(dates[1])).format(_services.dateFormat_API)
            }).then(resp => {
                let _slots = resp.data.data
                _slots.map(item => {
                    item.BookedDate = moment(new Date(item.SelectedDateRange)).format(_services.dateFormat_UI)
                })
                let uniqueBookedDates = [...new Set(_slots.map(item => item.BookedDate))];
                let _newSlots = []
                uniqueBookedDates.forEach(element => {
                    let _slot = {
                        date: element,
                        data: _slots.filter(_element => element === _element.BookedDate)
                    }
                    _newSlots.push(_slot)
                })
                setSlots(_newSlots)
                if (!_newSlots.length) {
                    setEmptyTitle('No slots are booked between ' + moment(new Date(dates[0])).format(_services.dateFormat_UI) + ' and ' + moment(new Date(dates[1])).format(_services.dateFormat_UI))
                }
                setIsLoading(false)
            }).catch(err => {
                setIsLoading(false)
                console.log(err);
            })
        }
    }

    useEffect(() => {
        setIsLoading(true)
        axios.post(`${_services.baseURL}/superadmin/branch/getslotdetails`, {
            BranchID: _services.selectedShop.BranchID,
            UserID: user.UserID,
            StartDate: moment(lastFiveDate).format(_services.dateFormat_API),
            EndDate: moment(new Date()).format(_services.dateFormat_API)
        }).then(resp => {
            let _slots = resp.data.data
            _slots.map(item => {
                item.BookedDate = moment(new Date(item.SelectedDateRange)).format(_services.dateFormat_UI)
            })
            let uniqueBookedDates = [...new Set(_slots.map(item => item.BookedDate))];
            let _newSlots = []
            uniqueBookedDates.forEach(element => {
                let _slot = {
                    date: element,
                    data: _slots.filter(_element => element === _element.BookedDate)
                }
                _newSlots.push(_slot)
            })
            setSlots(_newSlots)
            if (!_newSlots.length) {
                setEmptyTitle('No slots are booked between ' + moment(lastFiveDate).format(_services.dateFormat_UI) + ' and ' + moment(new Date()).format(_services.dateFormat_UI))
            }
            setIsLoading(false)
        }).catch(err => {
            setIsLoading(false)
            console.log(err);
        })
    }, [])

    useEffect(() => {
        return () => {
            console.log('component will unmount');
        };
    }, [])

    useDocumentTitle('Past Bookings')

    const onSearch = (filter) => { }

    const content = (item) => (
        <div>
            <p>Name: {item.UserName}</p>
            <p>Mobile: {item.PhoneNumber}</p>
            <p>Email: {item.UserEmail}</p>
        </div>
    )

    return (
        <Spin spinning={isLoading}>
            <div className='visitors-section'>
                <div className='display-flex'>
                    <div style={{ 'flexGrow': 1 }}>
                        <RangePicker
                            defaultValue={[startDate, endDate]}
                            format={_services.dateFormat_UI}
                            onChange={onChange}
                        />
                    </div>
                    <div style={{ display: 'none' }}>
                        <Input placeholder="Enter visitor name" allowClear onChange={(e) => onSearch(e.target.value)} />
                    </div>
                </div>
                {
                    slots && slots.length ? slots.map((item, index) => {
                        return (
                            <React.Fragment key={index}>
                                <div className='date-header'>{item.date}</div>
                                <div className='slots-grid'>
                                    {
                                        item.data.map((_item, _index) => {
                                            return (
                                                <Popover key={_index} content={() => content(_item)} title="Guest details">
                                                    <div key={_index} className='grid-item'>
                                                        <div>
                                                            <span className='sl-no'>{_item.UserName}</span>
                                                        </div>
                                                        <div className='display-flex'>
                                                            <div className='ppl-count'>with {_item.BookedCount} visitors</div>
                                                            <div className='duration'>
                                                                {moment(_item.SlotStartTime || 0, ["HH"]).format("hh A")} - {moment(_item.SlotEndTime || 0, ["HH"]).format("hh A")}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Popover>
                                            )
                                        })
                                    }
                                </div>
                            </React.Fragment>
                        )
                    }) : <Result
                            title={emptyTitle}
                        />
                }
            </div>
        </Spin>
    )
}

export default PastBookings