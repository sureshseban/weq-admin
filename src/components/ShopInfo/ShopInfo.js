import React, { useState, useEffect } from 'react'
import LocationPicker from 'react-location-picker'
import { Spin, Result } from 'antd'
import moment from 'moment'
import _services from '../../utils/services'
import { useHttpPost, useHttpPost_processData } from '../hooks/http'
import { Formik } from 'formik'
import { Input, Form, TimePicker, Select } from 'formik-antd'
import * as Yup from 'yup'
import useDocumentTitle from '../hooks/useDocumentTitle'
import axios from 'axios'

function ShopInfo(props) {

    const user = JSON.parse(localStorage.user)

    const [loading, setLoading] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [isLoading, fetchedData] = useHttpPost('/superadmin/branch/getbranch_id', {
        BranchID: _services.selectedShop.BranchID,
        UserID: user.UserID
    }, [_services.selectedShop.BranchID, user.UserID])

    useDocumentTitle('Shop Info')

    const processData = (fetchedData) => {
        let categories = []
        fetchedData.data.data.forEach(element => {
            const category = new SelectOptions(element.CategoryID, element.CategoryName)
            categories.push(category)
        });
        return categories
    }

    const [_isLoading, categories] = useHttpPost_processData('/superadmin/branch/getallcategories', {
        UserID: user.UserID
    }, [user.UserID], processData)

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

    const validationSchema = Yup.object({
        ShopName: Yup.string().required('Shop Name required!'),
        Category: Yup.string().required('Category required!'),
        Building: Yup.string().required('Building required!'),
        StreetName: Yup.string().required('Street Name required!'),
        City: Yup.string().required('City required!'),
        State: Yup.string().required('State required!'),
        SlotDuration: Yup.number().required('Slot Duration required!'),
        VisitorsInEachSlot: Yup.number().required('Visitors count required!'),
        MaximumBookingCount: Yup.number().required('Maximum booking count required!'),
        StartTime: Yup.string().nullable().required('Start Time required!'),
        EndTime: Yup.string().nullable().required('End Time required!'),
        Email: Yup.string().email('Invalid Email!'),
        SecondaryContact: Yup.string().required('Mobile Number required!')
    })

    const onSubmit = (values) => {
        setLoading(true)
        console.log(values)
        const _StartDateTime = new Date(values.StartTime)
        const _StartTime = _StartDateTime.toLocaleTimeString('en-GB')
        const _EndDateTime = new Date(values.EndTime)
        const _EndTime = _EndDateTime.toLocaleTimeString('en-GB')

        axios.post(`${_services.baseURL}/superadmin/branch/editbranch`, {
            BranchID: shopDetails.BranchID,
            UserID: user.UserID,
            BranchName: values.ShopName,
            CategoryID: values.Category,
            ClientID: user.ClientID,
            BranchPhoneNumber: values.SecondaryContact,
            BranchEmailID: values.Email,
            IsBranchSupervisor: false,
            AdminPhoneNumber: null,
            AdminUserID: null,
            BuildingNumber: values.Building,
            StreetName: values.StreetName,
            City: values.City,
            State: values.State,
            Country: values.Country,
            Pincode: values.Pincode,
            Latitude: location.lat,
            Longitude: location.lng,
            BranchStartTime: _StartTime,
            BranchEndTime: _EndTime,
            SlotInMinutes: values.SlotDuration,
            MaximumBookingCount: values.MaximumBookingCount,
            EntryInEachSlot: values.VisitorsInEachSlot,
            WorkingDayList: '0,1,2,3,4,5,6',
            BranchImage: null
        }).then(resp => {
            setLoading(false)
            props.history.push("/my-shops")
        }).catch(err => {
            setLoading(false)
            console.log(err);
        })
    }

    return (
        <Spin spinning={isLoading}>
            {
                shopDetails && categories ?
                    <Formik
                        initialValues={{
                            ShopName: shopDetails.BranchName,
                            Category: shopDetails.CategoryID,
                            SecondaryContact: shopDetails.BranchPhoneNumber,
                            Email: shopDetails.BranchEmailID,
                            Building: shopDetails.BuildingNumber,
                            StreetName: shopDetails.StreetName,
                            City: shopDetails.City,
                            State: shopDetails.State,
                            Pincode: shopDetails.Pincode,
                            Country: shopDetails.Country,
                            SlotDuration: shopDetails.SlotInMinutes,
                            VisitorsInEachSlot: shopDetails.EntryInEachSlot,
                            MaximumBookingCount: shopDetails.MaximumBookingCount,
                            StartTime: moment(shopDetails.BranchStartTime, 'h:mm A'),
                            EndTime: moment(shopDetails.BranchEndTime, 'h:mm A')
                        }}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit} >
                        <Form>
                            <div className='add-bracnch-section'>
                                {
                                    shopDetails ?
                                        <React.Fragment>
                                            <div className='branch-details'>
                                                <div className="ant-form-item">
                                                    Contact
                        </div>
                                                {
                                                    showEdit ? <div className='ant-form-item' style={{ display: 'flex' }}>
                                                        <div className='ant-col-xs-12' style={{ paddingRight: '8px' }}>
                                                            <div className="field-label">
                                                                Shop Name
</div>
                                                            <Form.Item
                                                                name="ShopName"
                                                                hasFeedback
                                                                showValidateSuccess
                                                            >
                                                                <Input
                                                                    name="ShopName"
                                                                    autoComplete="off"
                                                                    placeholder="Shop Name" />
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
                                                                <Select name="Category" options={categories}
                                                                    placeholder="Select Category" />
                                                            </Form.Item>
                                                        </div>
                                                    </div> : null
                                                }

                                                <div className='ant-form-item' style={{ display: 'flex' }}>
                                                    <div className='ant-col-xs-12' style={{ paddingRight: '8px' }}>
                                                        <div className="field-label">
                                                            Mobile Number
                        </div>
                                                        {
                                                            showEdit ? <Form.Item
                                                                name="SecondaryContact"
                                                                hasFeedback
                                                                showValidateSuccess
                                                            >
                                                                <Input
                                                                    name="SecondaryContact"
                                                                    autoComplete="off"
                                                                    placeholder="Mobile Number" />
                                                            </Form.Item> : <span>+91 {shopDetails.BranchPhoneNumber}</span>
                                                        }
                                                    </div>
                                                    <div className='ant-col-xs-12' style={{ paddingLeft: '8px' }}>
                                                        <div className="field-label">
                                                            Email
                        </div>
                                                        {
                                                            showEdit ? <Form.Item
                                                                name="Email"
                                                                hasFeedback
                                                                showValidateSuccess
                                                            >
                                                                <Input
                                                                    name="Email" autoComplete="off" placeholder="Email" />
                                                            </Form.Item> : <span>{shopDetails.BranchEmailID}</span>
                                                        }
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
                                                        {
                                                            showEdit ? <Form.Item
                                                                name="Building"
                                                                hasFeedback
                                                                showValidateSuccess
                                                            >
                                                                <Input
                                                                    name="Building" autoComplete="off" placeholder="Building" />
                                                            </Form.Item> : <span>{shopDetails.BuildingNumber}</span>
                                                        }
                                                    </div>
                                                    <div className='ant-col-xs-12' style={{ paddingLeft: '8px' }}>
                                                        <div className="field-label">
                                                            Street Name
                        </div>
                                                        {
                                                            showEdit ? <Form.Item
                                                                name="StreetName"
                                                                hasFeedback
                                                                showValidateSuccess
                                                            >
                                                                <Input
                                                                    name="StreetName" autoComplete="off" placeholder="Street Name" />
                                                            </Form.Item> : <span>{shopDetails.StreetName}</span>
                                                        }
                                                    </div>
                                                </div>
                                                <div className='ant-form-item' style={{ display: 'flex' }}>
                                                    <div className='ant-col-xs-12' style={{ paddingRight: '8px' }} >
                                                        <div className="field-label">
                                                            City
                        </div>
                                                        {
                                                            showEdit ? <Form.Item
                                                                name="City"
                                                                hasFeedback
                                                                showValidateSuccess
                                                            >
                                                                <Input
                                                                    name="City" autoComplete="off" placeholder="City" />
                                                            </Form.Item> : <span>{shopDetails.City}</span>
                                                        }
                                                    </div>
                                                    <div className='ant-col-xs-12' style={{ paddingLeft: '8px' }}>
                                                        <div className="field-label">
                                                            State
                        </div>
                                                        {
                                                            showEdit ? <Form.Item
                                                                name="State"
                                                                hasFeedback
                                                                showValidateSuccess
                                                            >
                                                                <Input
                                                                    name="State" autoComplete="off" placeholder="State" />
                                                            </Form.Item> : <span>{shopDetails.State}</span>
                                                        }
                                                    </div>
                                                </div>
                                                <div className='ant-form-item' style={{ display: 'flex' }}>
                                                    <div className='ant-col-xs-12' style={{ paddingRight: '8px' }} >
                                                        <div className="field-label">
                                                            Pincode
                        </div>
                                                        {
                                                            showEdit ? <Form.Item
                                                                name="Pincode"
                                                                hasFeedback
                                                                showValidateSuccess
                                                            >
                                                                <Input
                                                                    name="Pincode" autoComplete="off" placeholder="Pincode" />
                                                            </Form.Item> : <span>{shopDetails.Pincode}</span>
                                                        }
                                                    </div>
                                                    <div className='ant-col-xs-12' style={{ paddingLeft: '8px' }}>
                                                        <div className="field-label">
                                                            Country
                        </div>
                                                        {
                                                            showEdit ? <Form.Item
                                                                name="Country"
                                                                hasFeedback
                                                                showValidateSuccess
                                                            >
                                                                <Input
                                                                    name="Country" autoComplete="off" placeholder="Country" />
                                                            </Form.Item> : <span>{shopDetails.Country}</span>
                                                        }
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
                                                        {
                                                            showEdit ? <Form.Item
                                                                name="StartTime"
                                                                hasFeedback
                                                                showValidateSuccess
                                                            >
                                                                <TimePicker style={{ width: '100%' }}
                                                                    placeholder="Select Start Time"
                                                                    name='StartTime'
                                                                    format='h:mm A'></TimePicker>
                                                            </Form.Item> : <span>{moment(shopDetails.BranchStartTime || 0, ["HH"]).format("h:mm A")}</span>
                                                        }
                                                    </div>
                                                </div>
                                                <div className='ant-form-item' style={{ display: 'flex' }}>
                                                    <div className='settings-label'>Working End Time</div>
                                                    <div className='settings-values'>
                                                        {
                                                            showEdit ? <Form.Item
                                                                name="EndTime"
                                                                hasFeedback
                                                                showValidateSuccess
                                                            >
                                                                <TimePicker style={{ width: '100%' }}
                                                                    placeholder="Select End Time"
                                                                    name='EndTime'
                                                                    format='h:mm A'></TimePicker>
                                                            </Form.Item> : <span>{moment(shopDetails.BranchEndTime || 0, ["HH"]).format("h:mm A")}</span>
                                                        }
                                                    </div>
                                                </div>
                                                <div className='ant-form-item' style={{ display: 'flex' }}>
                                                    <div className='settings-label'>Slot Duration</div>
                                                    <div className='settings-values'>
                                                        {
                                                            showEdit ? <Form.Item
                                                                name="SlotDuration"
                                                                hasFeedback
                                                                showValidateSuccess
                                                            >
                                                                <Input
                                                                    style={{ width: '100%' }} name="SlotDuration" autoComplete="off" placeholder="Slot Duration in minutes" />
                                                            </Form.Item> : <span>{shopDetails.SlotInMinutes} minutes</span>
                                                        }
                                                    </div>
                                                </div>
                                                <div className='ant-form-item' style={{ display: 'flex' }}>
                                                    <div className='settings-label'>Visitors Count in a Slot</div>
                                                    <div className='settings-values'>
                                                        {
                                                            showEdit ? <Form.Item
                                                                name="VisitorsInEachSlot"
                                                                hasFeedback
                                                                showValidateSuccess
                                                            >
                                                                <Input
                                                                    style={{ width: '100%' }} name="VisitorsInEachSlot" autoComplete="off" placeholder="Visitors count in numbers" />
                                                            </Form.Item> : <span>{shopDetails.EntryInEachSlot}</span>
                                                        }
                                                    </div>
                                                </div>
                                                <div className='ant-form-item' style={{ display: 'flex' }}>
                                                    <div className='settings-label'>Maximum no. of visitors in each booking</div>
                                                    <div className='settings-values'>
                                                        {
                                                            showEdit ? <Form.Item
                                                                name="MaximumBookingCount"
                                                                hasFeedback
                                                                showValidateSuccess
                                                            >
                                                                <Input
                                                                    style={{ width: '100%' }} name="MaximumBookingCount" autoComplete="off" placeholder="Maximum no. of visitors in each booking" />
                                                            </Form.Item> : <span>{shopDetails.MaximumBookingCount}</span>
                                                        }
                                                    </div>
                                                </div>
                                                {
                                                    showEdit ? <div className='ant-form-item'>
                                                        <button type="submit" className="login-btn">Submit</button>
                                                    </div> : <div className='ant-form-item'>
                                                            <div onClick={() => setShowEdit(true)} className="login-btn">Edit Shop Details</div>
                                                        </div>
                                                }
                                            </div>
                                        </React.Fragment> : null
                                }
                            </div>
                        </Form>
                    </Formik > : <Result
                        title='Loading...'
                    />
                // 
                //     <div className='add-bracnch-section'></div>
                // </Spin>
            }
        </Spin>
    )
}

class SelectOptions {
    constructor(value, label) {
        this.value = value
        this.label = label
    }
}

export default ShopInfo