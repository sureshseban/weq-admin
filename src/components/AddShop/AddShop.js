import React, { useState } from 'react'
import './AddShop.css'
import { Formik } from 'formik'
import { Input, Form } from 'formik-antd'
import * as Yup from 'yup'
import { NavLink } from 'react-router-dom'
import { Spin, Alert } from 'antd';
import OtpInput from 'react-otp-input';
import axios from 'axios'
import LocationPicker from 'react-location-picker';

function AddShop(props) {

    const initialValues = {
        ShopName: '',
        Category: '',
        PrimaryContact: '',
        SecondaryContact: '',
        BranchSupervisorRequired: false,
        BranchSupervisorContact: '',
        Building: '',
        StreetName: '',
        City: '',
        State: '',
        Location: ''
    }

    const defaultPosition = {
        lat: 12.9716,
        lng: 77.5946
    }

    const handleLocationChange = values => {
        console.log(values)
    }

    const validationSchema = Yup.object({
        ShopName: Yup.string().required('Shop Name required!'),
        Category: Yup.string().required('Category required!'),
        Building: Yup.string().required('Building required!'),
        StreetName: Yup.string().required('Street Name required!'),
        City: Yup.string().required('City required!'),
        State: Yup.string().required('State required!')
    })

    const onSubmit = values => {
        console.log('values', values);
    }

    return (
        <div className='add-bracnch-section'>
            <div className='branch-details'>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} >
                    <Form>
                        <div style={{ display: 'flex' }}>
                            <div className='ant-col-xs-12' style={{ paddingRight: '8px' }} >
                                <div className="field-label">
                                    Shop Name
                        </div>
                                <Form.Item
                                    name="ShopName"
                                    hasFeedback
                                    showValidateSuccess
                                >
                                    <Input name="ShopName" autoComplete="off" placeholder="Shop Name" />
                                </Form.Item>
                            </div>
                            <div className='ant-col-xs-12' style={{ paddingLeft: '8px' }}>
                                <div className="field-label">
                                    Shop Category
                        </div>
                                <Form.Item
                                    name="Category"
                                    hasFeedback
                                    showValidateSuccess
                                >
                                    <Input name="Category" autoComplete="off" placeholder="Shop Name" />
                                </Form.Item>
                            </div>
                        </div>
                        <div className="ant-form-item">
                            Contact
                        </div>
                        <div style={{ display: 'flex' }}>
                            <div className='ant-col-xs-12' style={{ paddingRight: '8px' }} >
                                <div className="field-label">
                                    Primary Contact
                        </div>
                                <Form.Item
                                    name="PrimaryContact"
                                    hasFeedback
                                    showValidateSuccess
                                >
                                    <Input name="PrimaryContact" autoComplete="off" placeholder="Primary Contact" />
                                </Form.Item>
                            </div>
                            <div className='ant-col-xs-12' style={{ paddingLeft: '8px' }}>
                                <div className="field-label">
                                    Secondary Contact
                        </div>
                                <Form.Item
                                    name="SecondaryContact"
                                    hasFeedback
                                    showValidateSuccess
                                >
                                    <Input name="SecondaryContact" autoComplete="off" placeholder="Secondary Contact" />
                                </Form.Item>
                            </div>
                        </div>
                        <div className="ant-form-item">
                            Address
                        </div>
                        <div style={{ display: 'flex' }}>
                            <div className='ant-col-xs-12' style={{ paddingRight: '8px' }} >
                                <div className="field-label">
                                    Building
                        </div>
                                <Form.Item
                                    name="Building"
                                    hasFeedback
                                    showValidateSuccess
                                >
                                    <Input name="Building" autoComplete="off" placeholder="Building" />
                                </Form.Item>
                            </div>
                            <div className='ant-col-xs-12' style={{ paddingLeft: '8px' }}>
                                <div className="field-label">
                                    Street Name
                        </div>
                                <Form.Item
                                    name="StreetName"
                                    hasFeedback
                                    showValidateSuccess
                                >
                                    <Input name="StreetName" autoComplete="off" placeholder="Street Name" />
                                </Form.Item>
                            </div>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <div className='ant-col-xs-12' style={{ paddingRight: '8px' }} >
                                <div className="field-label">
                                    City
                        </div>
                                <Form.Item
                                    name="City"
                                    hasFeedback
                                    showValidateSuccess
                                >
                                    <Input name="City" autoComplete="off" placeholder="City" />
                                </Form.Item>
                            </div>
                            <div className='ant-col-xs-12' style={{ paddingLeft: '8px' }}>
                                <div className="field-label">
                                    State
                        </div>
                                <Form.Item
                                    name="State"
                                    hasFeedback
                                    showValidateSuccess
                                >
                                    <Input name="State" autoComplete="off" placeholder="State" />
                                </Form.Item>
                            </div>
                        </div>
                        <div className='ant-col-xs-24'>
                            <div className="field-label">
                                Location
                        </div>
                            <Form.Item
                                name="Location"
                                hasFeedback
                                showValidateSuccess
                            >
                                <Input name="Location" autoComplete="off" placeholder="Location" />
                            </Form.Item>
                        </div>
                        <div className='ant-col-xs-24'>
                            <LocationPicker
                                containerElement={<div style={{ height: '100%' }} />}
                                mapElement={<div style={{ height: '400px' }} />}
                                defaultPosition={defaultPosition}
                                onChange={handleLocationChange}
                            />
                        </div>
                    </Form>
                </Formik>
            </div>
            <div className='slot-settings'>
                <div className='slot-settings-header ant-form-item'>Slot Settings</div>
                <div className='ant-form-item' style={{ display: 'flex' }}>
                    <div className='settings-label'>Working Days</div>
                    <div className='settings-values'>data</div>
                </div>
                <div className='ant-form-item' style={{ display: 'flex' }}>
                    <div className='settings-label'>Working Time</div>
                    <div className='settings-values'>
                        <input name="WorkingTime" autoComplete="off" placeholder="Location" />
                    </div>
                </div>
                <div className='ant-form-item' style={{ display: 'flex' }}>
                    <div className='settings-label'>Slot Duration</div>
                    <div className='settings-values'>data</div>
                </div>
                <div className='ant-form-item' style={{ display: 'flex' }}>
                    <div className='settings-label'>Max. serviceable Queue</div>
                    <div className='settings-values'>
                        <input name="QueueSize" autoComplete="off" placeholder="Location" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddShop