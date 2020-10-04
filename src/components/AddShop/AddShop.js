import React, { useState, useEffect } from 'react'
import './AddShop.css'
import { Formik } from 'formik'
import { Input, Form, TimePicker, Select } from 'formik-antd'
import * as Yup from 'yup'
import LocationPicker from 'react-location-picker'
import moment from 'moment'
import axios from 'axios'
import { Spin } from 'antd'

function AddShop() {

    const initialValues = {
        ShopName: '',
        Category: '',
        Email: '',
        SecondaryContact: '',
        BranchSupervisorRequired: false,
        BranchSupervisorContact: '',
        Building: '',
        StreetName: '',
        City: '',
        State: '',
        StartTime: '',
        EndTime: '',
        SlotDuration: '',
        MaxQueue: '',
        Pincode: '',
        Country: ''
    }

    const defaultPosition = {
        lat: 12.9716,
        lng: 77.5946
    }

    const handleLocationChange = values => {
        setLocation(values.position)
    }

    const validationSchema = Yup.object({
        ShopName: Yup.string().required('Shop Name required!'),
        Category: Yup.string().required('Category required!'),
        Building: Yup.string().required('Building required!'),
        StreetName: Yup.string().required('Street Name required!'),
        City: Yup.string().required('City required!'),
        State: Yup.string().required('State required!'),
        SlotDuration: Yup.number().required('Slot Duration required!'),
        MaxQueue: Yup.number().required('Queue size required!'),
        StartTime: Yup.string().nullable().required('Start Time required!'),
        EndTime: Yup.string().nullable().required('End Time required!'),
        Email: Yup.string().email('Invalid Email!')
    })

    const onSubmit = values => {
        console.log('values', values);
        const _StartDateTime = new Date(values.StartTime)
        const _StartTime = _StartDateTime.toLocaleTimeString('en-GB')
        const _EndDateTime = new Date(values.EndTime)
        const _EndTime = _EndDateTime.toLocaleTimeString('en-GB')
        console.log(_StartTime);
        console.log(_EndTime);
    }

    const [categories, setCategories] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [location, setLocation] = useState({
        lat: 12.9716,
        lng: 77.5946
    })

    useEffect(() => {
        setIsLoading(true)
        axios.post('http://ec2-52-15-191-227.us-east-2.compute.amazonaws.com/superadmin/branch/getallcategories', {
            UserID: 1
        }).then(resp => {
            let _categories = []
            resp.data.data.forEach(element => {
                const _category = new SelectOptions(element.CategoryID, element.CategoryName)
                _categories.push(_category)
            });
            setCategories(_categories)
            setIsLoading(false)
        }).catch(err => {
            setIsLoading(false)
            console.log(err);
        })
    }, [])

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} >
            <Form>
                <div className='add-bracnch-section'>
                    <div className='branch-details'>
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
                                    <Select name="Category" options={categories} placeholder="Select Category" />
                                </Form.Item>
                            </div>
                        </div>
                        <div className="ant-form-item">
                            Contact
                        </div>
                        <div style={{ display: 'flex' }}>
                            <div className='ant-col-xs-12' style={{ paddingRight: '8px' }}>
                                <div className="field-label">
                                    Secondary Contact
                        </div>
                                <Form.Item
                                    name="SecondaryContact"
                                >
                                    <Input name="SecondaryContact" autoComplete="off" placeholder="Secondary Contact" />
                                </Form.Item>
                            </div>
                            <div className='ant-col-xs-12' style={{ paddingLeft: '8px' }}>
                                <div className="field-label">
                                    Email
                        </div>
                                <Form.Item
                                    name="Email"
                                >
                                    <Input name="Email" autoComplete="off" placeholder="Email" />
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
                        <div style={{ display: 'flex' }}>
                            <div className='ant-col-xs-12' style={{ paddingRight: '8px' }} >
                                <div className="field-label">
                                    Pincode
                        </div>
                                <Form.Item
                                    name="Pincode"
                                >
                                    <Input name="Pincode" autoComplete="off" placeholder="Pincode" />
                                </Form.Item>
                            </div>
                            <div className='ant-col-xs-12' style={{ paddingLeft: '8px' }}>
                                <div className="field-label">
                                    Country
                        </div>
                                <Form.Item
                                    name="Country"
                                >
                                    <Input name="Country" autoComplete="off" placeholder="Country" />
                                </Form.Item>
                            </div>
                        </div>
                        <div className='ant-col-xs-24'>
                            <div className="field-label">
                                Choose Location
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
                        <div style={{ display: 'flex' }}>
                            <div className='settings-label'>Working Start Time</div>
                            <div className='settings-values'>
                                <Form.Item
                                    name="StartTime"
                                    hasFeedback
                                    showValidateSuccess
                                >
                                    <TimePicker style={{ width: '100%' }}
                                        placeholder="Select Start Time"
                                        name='StartTime'
                                        format='h:mm a'></TimePicker>
                                </Form.Item>
                            </div>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <div className='settings-label'>Working End Time</div>
                            <div className='settings-values'>
                                <Form.Item
                                    name="EndTime"
                                    hasFeedback
                                    showValidateSuccess
                                >
                                    <TimePicker style={{ width: '100%' }} placeholder="Select End Time" name='EndTime' format='h:mm a'></TimePicker>
                                </Form.Item>
                            </div>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <div className='settings-label'>Slot Duration</div>
                            <div className='settings-values'>
                                <Form.Item
                                    name="SlotDuration"
                                    hasFeedback
                                    showValidateSuccess
                                >
                                    <Input style={{ width: '100%' }} name="SlotDuration" autoComplete="off" placeholder="Slot Duration in minutes" />
                                </Form.Item>
                            </div>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <div className='settings-label'>Max. serviceable Queue</div>
                            <div className='settings-values'>
                                <Form.Item
                                    name="MaxQueue"
                                    hasFeedback
                                    showValidateSuccess
                                >
                                    <Input style={{ width: '100%' }} name="MaxQueue" autoComplete="off" placeholder="Max. serviceable Queue in numbers" />
                                </Form.Item>
                            </div>
                        </div>
                        <div className='ant-form-item'>
                            <button className="login-btn">Submit</button>
                        </div>
                    </div>
                </div>
            </Form>
        </Formik>
    )
}

class SelectOptions {
    constructor(value, label) {
        this.value = value
        this.label = label
    }
}

export default AddShop