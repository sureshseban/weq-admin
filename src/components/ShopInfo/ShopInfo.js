import React from 'react'
import LocationPicker from 'react-location-picker'

function ShopInfo(props) {
    const defaultPosition = {
        lat: 12.9716,
        lng: 77.5946
    }

    const handleLocationChange = values => {
        console.log(values)
    }

    return (
        <div className='add-bracnch-section'>
            <div className='branch-details'>
                <div className="ant-form-item">
                    Contact
                        </div>
                <div className='ant-form-item' style={{ display: 'flex' }}>
                    <div className='ant-col-xs-12' style={{ paddingRight: '8px' }}>
                        <div className="field-label">
                            Secondary Contact
                        </div>
                                +91 9731103018
                            </div>
                    <div className='ant-col-xs-12' style={{ paddingLeft: '8px' }}>
                        <div className="field-label">
                            Email
                        </div>
                                sureshv.gkanir@gmail.com
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
                                Forrm Mall
                            </div>
                    <div className='ant-col-xs-12' style={{ paddingLeft: '8px' }}>
                        <div className="field-label">
                            Street Name
                        </div>
                                Koramangala
                            </div>
                </div>
                <div className='ant-form-item' style={{ display: 'flex' }}>
                    <div className='ant-col-xs-12' style={{ paddingRight: '8px' }} >
                        <div className="field-label">
                            City
                        </div>
                                Bangaluru
                            </div>
                    <div className='ant-col-xs-12' style={{ paddingLeft: '8px' }}>
                        <div className="field-label">
                            State
                        </div>
                                Karnadaka
                            </div>
                </div>
                <div className='ant-col-xs-24'>
                    <LocationPicker
                        containerElement={<div style={{ height: '100%' }} />}
                        mapElement={<div style={{ height: '400px' }} />}
                        defaultPosition={defaultPosition}
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
                        09.00 AM
                    </div>
                </div>
                <div className='ant-form-item' style={{ display: 'flex' }}>
                    <div className='settings-label'>Working End Time</div>
                    <div className='settings-values'>
                        05.00 PM
                    </div>
                </div>
                <div className='ant-form-item' style={{ display: 'flex' }}>
                    <div className='settings-label'>Slot Duration</div>
                    <div className='settings-values'>
                        15 minutes
                    </div>
                </div>
                <div className='ant-form-item' style={{ display: 'flex' }}>
                    <div className='settings-label'>Max. serviceable Queue</div>
                    <div className='settings-values'>
                        100
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShopInfo