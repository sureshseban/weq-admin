import React from 'react'
import LocationPicker from 'react-location-picker'
import { Spin } from 'antd'
import moment from 'moment'
import _services from '../../utils/services'
import { useHttpPost } from '../../hooks/http'

function ShopInfo(props) {

    const user = JSON.parse(localStorage.user)

    const [isLoading, fetchedData] = useHttpPost('/superadmin/branch/getbranch_id', {
        BranchID: _services.selectedShop.BranchID,
        UserID: user.UserID
    }, [_services.selectedShop.BranchID, user.UserID])

    const shopDetails = fetchedData ? fetchedData.data.data[0] : null
    const location = fetchedData ? {
        lat: fetchedData.data.data[0].Latitude,
        lng: fetchedData.data.data[0].Longitude
    } : {
            lat: 12.9716,
            lng: 77.5946
        }

    const handleLocationChange = values => {
        console.log(values)
    }

    return (
        <Spin spinning={isLoading}>
            <div className='add-bracnch-section'>
                {
                    shopDetails ?
                        <React.Fragment>
                            <div className='branch-details'>
                                <div className="ant-form-item">
                                    Contact
                        </div>
                                <div className='ant-form-item' style={{ display: 'flex' }}>
                                    <div className='ant-col-xs-12' style={{ paddingRight: '8px' }}>
                                        <div className="field-label">
                                            Mobile Number
                        </div>
                                +91 {shopDetails.BranchPhoneNumber}
                                    </div>
                                    <div className='ant-col-xs-12' style={{ paddingLeft: '8px' }}>
                                        <div className="field-label">
                                            Email
                        </div>
                                        {shopDetails.BranchEmailID}
                                    </div>
                                </div>
                                <div className="ant-form-item">
                                    Address
                        </div>
                                <div className='ant-form-item' style={{ display: 'flex' }}>
                                    <div className='ant-col-xs-12' style={{ paddingRight: '8px' }} >
                                        <div className="field-label">
                                            Building
                        </div>
                                        {shopDetails.BuildingNumber}
                                    </div>
                                    <div className='ant-col-xs-12' style={{ paddingLeft: '8px' }}>
                                        <div className="field-label">
                                            Street Name
                        </div>
                                        {shopDetails.StreetName}
                                    </div>
                                </div>
                                <div className='ant-form-item' style={{ display: 'flex' }}>
                                    <div className='ant-col-xs-12' style={{ paddingRight: '8px' }} >
                                        <div className="field-label">
                                            City
                        </div>
                                        {shopDetails.City}
                                    </div>
                                    <div className='ant-col-xs-12' style={{ paddingLeft: '8px' }}>
                                        <div className="field-label">
                                            State
                        </div>
                                        {shopDetails.State}
                                    </div>
                                </div>
                                <div className='ant-col-xs-24'>
                                    <LocationPicker
                                        containerElement={<div style={{ height: '100%' }} />}
                                        mapElement={<div style={{ height: '400px' }} />}
                                        defaultPosition={location}
                                        onChange={handleLocationChange}
                                    />
                                </div>
                            </div>
                            <div className='slot-settings'>
                                <div className='slot-settings-header ant-form-item'>Slot Settings</div>
                                <div className='ant-form-item' style={{ display: 'flex' }}>
                                    <div className='settings-label'>Working Days</div>
                                    <div className='settings-values'>
                                        <div className='display-flex'>
                                            <div className="selected-days">M</div>
                                            <div className="selected-days">T</div>
                                            <div className="selected-days">W</div>
                                            <div className="selected-days">T</div>
                                            <div className="selected-days">F</div>
                                            <div className="selected-days">S</div>
                                            <div className="selected-days">S</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='ant-form-item' style={{ display: 'flex' }}>
                                    <div className='settings-label'>Working Start Time</div>
                                    <div className='settings-values'>
                                        {moment(shopDetails.BranchStartTime || 0, ["HH"]).format("hh A")}
                                    </div>
                                </div>
                                <div className='ant-form-item' style={{ display: 'flex' }}>
                                    <div className='settings-label'>Working End Time</div>
                                    <div className='settings-values'>
                                        {moment(shopDetails.BranchEndTime || 0, ["HH"]).format("hh A")}
                                    </div>
                                </div>
                                <div className='ant-form-item' style={{ display: 'flex' }}>
                                    <div className='settings-label'>Slot Duration</div>
                                    <div className='settings-values'>
                                        {shopDetails.SlotInMinutes} minutes
                    </div>
                                </div>
                                <div className='ant-form-item' style={{ display: 'flex' }}>
                                    <div className='settings-label'>Visitors Count in a Slot</div>
                                    <div className='settings-values'>
                                        {shopDetails.EntryInEachSlot}
                                    </div>
                                </div>
                                <div className='ant-form-item' style={{ display: 'flex' }}>
                                    <div className='settings-label'>Maximum no. of visitors in each booking</div>
                                    <div className='settings-values'>
                                        {shopDetails.MaximumBookingCount}
                                    </div>
                                </div>
                            </div>
                        </React.Fragment> : null
                }
            </div>
        </Spin>
    )
}

export default ShopInfo