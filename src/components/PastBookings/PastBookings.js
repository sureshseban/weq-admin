import React, { useState, useEffect } from 'react'
import './PastBookings.css'
import { DatePicker, Input } from 'antd'
import axios from 'axios'
import { Spin, Result } from 'antd'
import moment from 'moment'
import _services from '../../utils/services'
const { RangePicker } = DatePicker;

function PastBookings(props) {

    const user = JSON.parse(localStorage.user)
    const dateFormat = 'DD/MM/YYYY'
    var currentDate = new Date()
    const lastFiveDate = new Date(currentDate.setDate(currentDate.getDate() - 31))
    const [startDate, setStartDate] = useState(moment(lastFiveDate, dateFormat))
    const [endDate, setEndDate] = useState(moment(new Date(), dateFormat))
    const [slots, setSlots] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [emptyTitle, setEmptyTitle] = useState('Loading...')

    function onChange(dates) {
        if (dates) {
            setStartDate(dates[0])
            setEndDate(dates[1])
            setIsLoading(true)
            axios.post('http://ec2-52-15-191-227.us-east-2.compute.amazonaws.com/superadmin/branch/getslotdetails', {
                BranchID: _services.selectedShop.BranchID,
                UserID: user.UserID,
                StartDate: moment(new Date(dates[0])).format('YYYY-MM-DD'),
                EndDate: moment(new Date(dates[1])).format('YYYY-MM-DD')
            }).then(resp => {
                let _slots = resp.data.data
                _slots.map(item => {
                    item.BookedDate = moment(new Date(item.SelectedDateRange)).format(dateFormat)
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
                    setEmptyTitle('No slots are booked between ' + moment(new Date(dates[0])).format(dateFormat) + ' and ' + moment(new Date(dates[1])).format(dateFormat))
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
        axios.post('http://ec2-52-15-191-227.us-east-2.compute.amazonaws.com/superadmin/branch/getslotdetails', {
            BranchID: _services.selectedShop.BranchID,
            UserID: user.UserID,
            StartDate: moment(lastFiveDate).format('YYYY-MM-DD'),
            EndDate: moment(new Date()).format('YYYY-MM-DD')
        }).then(resp => {
            let _slots = resp.data.data
            _slots.map(item => {
                item.BookedDate = moment(new Date(item.SelectedDateRange)).format(dateFormat)
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
                setEmptyTitle('No slots are booked between ' + moment(lastFiveDate).format(dateFormat) + ' and ' + moment(new Date()).format(dateFormat))
            }
            setIsLoading(false)
        }).catch(err => {
            setIsLoading(false)
            console.log(err);
        })
    }, [])

    const onSearch = (filter) => { }

    return (
        <Spin spinning={isLoading}>
            <div className='visitors-section'>
                <div className='display-flex'>
                    <div style={{ 'flexGrow': 1 }}>
                        <RangePicker
                            defaultValue={[startDate, endDate]}
                            format={dateFormat}
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
                                            )
                                        })
                                    }
                                </div>
                            </React.Fragment>
                        )
                    }) : <Result
                            title={emptyTitle}
                        // extra={
                        //     <button onClick={handleClick} className="weq-button">Add Shop</button>
                        // }
                        />
                }
            </div>
        </Spin>
    )
}

export default PastBookings