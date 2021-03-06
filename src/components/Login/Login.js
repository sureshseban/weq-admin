import React, { useState } from 'react'
import { Formik } from 'formik'
import './Login.css'
import { Input, Form } from 'formik-antd'
import * as Yup from 'yup'
import { UserOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom'
import { Spin, Alert } from 'antd';
import OtpInput from 'react-otp-input';
import axios from 'axios'
import _services from '../../utils/services'
import useDocumentTitle from '../hooks/useDocumentTitle'

function Login(props) {

    const initialValues = {
        username: '',
        otp: ''
    }

    const [otp, setOTP] = useState('')
    const [spinning, setSpinning] = useState(false)
    const [spinningAll, setSpinningAll] = useState(false)
    const [showOTPScreen, setShowOTPScreen] = useState(false)
    const [showAlert, setShowAlert] = useState(false)

    useDocumentTitle('Login')

    const validationSchema = Yup.object({
        username: Yup.string().required('Mobile Number required!')
    })

    const onSubmit = values => {
        setSpinning(true)
        axios.post(`${_services.baseURL}/superadmin/auth/login`, {
            PhoneNumber: values.username
        }).then(resp => {
            setSpinning(false)
            if (!resp.data.IsExist) {
                setShowAlert(true)
            } else {
                const user = {
                    Name: resp.data.otp.Name,
                    PhoneNumber: values.username,
                    RoleID: resp.data.otp.RoleID,
                    UserID: resp.data.otp.UserID,
                    ClientID: resp.data.otp.ClientID,
                    ClientName: resp.data.otp.ClientName
                }
                localStorage.setItem('user', JSON.stringify(user))
                setShowOTPScreen(true)
            }
        }).catch(err => {
            setSpinning(false)
            console.log(err);
        })
    }

    const onOTPSubmit = () => {
        setSpinningAll(true)
        const user = JSON.parse(localStorage.getItem('user'))
        axios.post(`${_services.baseURL}/superadmin/auth/verify`, {
            PhoneNumber: user.PhoneNumber,
            code: otp
        }).then(resp => {
            setSpinningAll(false)
            props.history.push("/my-shops")
        }).catch(err => {
            setSpinningAll(false)
            console.log(err);
        })
    }

    const handleChange = otp => {
        setOTP(otp)
    }

    const logoStyle = {
        backgroundImage: `url(${process.env.PUBLIC_URL}/logo.svg)`
    }

    return (
        <div className="login-wrapper">
            <div className="left-panel">
                <span className="login-logo" style={logoStyle}></span>
            </div>
            <div className="right-panel">
                <Spin spinning={spinningAll} >
                    <Spin spinning={spinning} >
                        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} >
                            <Form>
                                <div className="right-panel-title">Login</div>
                                <div className="field-label">
                                    Mobile Number
                        </div>
                                <Form.Item
                                    name="username"
                                    hasFeedback
                                    showValidateSuccess
                                >
                                    <Input name="username" onChange={() => setShowAlert(false)} autoComplete="off" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Mobile Number" />
                                </Form.Item>
                                {
                                    !showOTPScreen ? <div className='ant-form-item'>
                                        <button type="submit" className="login-btn">Login</button>
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
                    }
                    {
                        showAlert ? <div className="ant-form-item">
                            <Alert message="incorrect mobile number" type="error" showIcon closable />
                        </div> : null
                    }
                    <div className="hyperlink-wrapper">
                        Not yet registered? <NavLink to="/">Register</NavLink>
                    </div>
                </Spin>
            </div>
        </div >
    )
}

export default Login