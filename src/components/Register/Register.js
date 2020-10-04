import React, { useState } from 'react'
import { Formik } from 'formik'
import './Register.css'
import { Input, Form } from 'formik-antd'
import * as Yup from 'yup'
import { NavLink } from 'react-router-dom'
import { Spin, Alert } from 'antd'
import OtpInput from 'react-otp-input'
import axios from 'axios'

function Register(props) {

    const initialValues = {
        brandName: '',
        firstName: '',
        lastName: '',
        userName: '',
        otp: ''
    }

    const [otp, setOTP] = useState('')
    const [spinning, setSpinning] = useState(false)
    const [spinningAll, setSpinningAll] = useState(false)
    const [showOTPScreen, setShowOTPScreen] = useState(false)
    const [showAlert, setShowAlert] = useState(false)


    const validationSchema = Yup.object({
        userName: Yup.string().required('Mobile Number required!'),
        brandName: Yup.string().required('Brand Name required!'),
        firstName: Yup.string().required('First Name required!'),
        lastName: Yup.string().required('Last Name required!')
    })

    const onSubmit = values => {
        setSpinning(true)
        axios.post('http://localhost/superadmin/auth/register', {
            ClientName: values.ClientName,
            FirstName: values.FirstName,
            LastName: values.LastName,
            UserEmail: '',
            PhoneNumber: values.PhoneNumber
        }).then(resp => {
            setSpinning(false)
            if (resp.data.IsExist) {
                setShowAlert(true)
            } else {
                const user = {
                    Name: resp.data.otp.Name,
                    PhoneNumber: values.username,
                    RoleID: resp.data.otp.RoleID,
                    UserID: resp.data.otp.UserID
                }
                localStorage.setItem('user', JSON.stringify(user))
                setShowOTPScreen(true)
            }
        }).catch(err => {
            setSpinning(false)
            console.log(err)
        })
    }

    const onOTPSubmit = values => {
        setSpinningAll(true)
        const user = JSON.parse(localStorage.getItem('user'))
        axios.post('http://ec2-52-15-191-227.us-east-2.compute.amazonaws.com/superadmin/auth/verify', {
            PhoneNumber: user.PhoneNumber,
            code: otp
        }).then(resp => {
            setSpinningAll(false)
            props.history.push("/home")
        }).catch(err => {
            setSpinningAll(false)
            console.log(err)
        })
    }

    const handleChange = otp => {
        setOTP(otp)
    }

    const bgStyle = {
        backgroundImage: `url(${process.env.PUBLIC_URL}/login-bg.svg)`
    }

    const logoStyle = {
        backgroundImage: `url(${process.env.PUBLIC_URL}/logo.svg)`
    }

    return (
        <div className="login-wrapper">
            <div className="left-panel" style={bgStyle}>
                <span className="login-logo" style={logoStyle}></span>
            </div>
            <div className="right-panel">
                <Spin spinning={spinningAll} >
                    <Spin spinning={spinning} >
                        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} >
                            <Form>
                                <div className="right-panel-title">Create your WeQ Account</div>
                                <div className="field-label">
                                    Brand Name
                        </div>
                                <Form.Item
                                    name="brandName"
                                    hasFeedback
                                    showValidateSuccess
                                >
                                    <Input name="brandName" autoComplete="off" placeholder="Brand Name" />
                                </Form.Item>
                                <div className="field-label">
                                    First Name
                        </div>
                                <Form.Item
                                    name="firstName"
                                    hasFeedback
                                    showValidateSuccess
                                >
                                    <Input name="firstName" autoComplete="off" placeholder="First Name" />
                                </Form.Item>
                                <div className="field-label">
                                    Last Name
                        </div>
                                <Form.Item
                                    name="lastName"
                                    hasFeedback
                                    showValidateSuccess
                                >
                                    <Input name="lastName" autoComplete="off" placeholder="Last Name" />
                                </Form.Item>
                                <div className="field-label">
                                    Mobile Number
                        </div>
                                <Form.Item
                                    name="userName"
                                    hasFeedback
                                    showValidateSuccess
                                >
                                    <Input name="userName" autoComplete="off" placeholder="Mobile Number" />
                                </Form.Item>
                                {
                                    !showOTPScreen ? <div className='ant-row ant-form-item'>
                                        <button type="submit" className="login-btn">Create Account</button>
                                    </div> : null
                                }
                            </Form>
                        </Formik>
                    </Spin>
                    {
                        showOTPScreen ? <Formik initialValues={initialValues} onSubmit={onOTPSubmit} >
                            <Form>
                                <div className="field-label" style={{ marginBottom: '5px' }} >
                                    Enter OTP
                        </div>
                                <div id="otp-input-root">
                                    <OtpInput
                                        value={otp}
                                        onChange={handleChange}
                                        numInputs={4}
                                        isInputNum
                                    />
                                </div>
                                <div className='ant-form-item'>
                                    <button className="login-btn">Submit</button>
                                </div>
                            </Form>
                        </Formik> : null
                    }{
                        showAlert ? <div className="ant-form-item">
                            <Alert message="mobile number already exists" type="error" showIcon closable />
                        </div> : null
                    }
                    <div className="hyperlink-wrapper">
                        Already have an Account? <NavLink to="/login">Login</NavLink>
                    </div>
                </Spin>
            </div>
        </div >
    )
}

export default Register