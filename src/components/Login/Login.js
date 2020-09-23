import React, { useState } from 'react'
import { Formik } from 'formik'
import './Login.css'
import { Input, Form } from 'formik-antd'
import * as Yup from 'yup'
import { UserOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom'
import { Spin } from 'antd';
import OtpInput from 'react-otp-input';

function Login() {

    const initialValues = {
        username: '',
        otp: ''
    }

    const [otp, setOTP] = useState('')
    const [spinning, setSpinning] = useState(false)
    const [spinningAll, setSpinningAll] = useState(false)
    const [showOTPScreen, setShowOTPScreen] = useState(false)

    const validationSchema = Yup.object({
        username: Yup.string().required('Mobile Number cannot be empty.')
    })

    const onSubmit = values => {
        console.log('Form Data', values);
        setShowOTPScreen(true)
        setSpinning(true)
    }

    const onOTPSubmit = values => {
        console.log('Form Data', otp);
        setSpinning(false)
        setSpinningAll(true)
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
                                <div className="right-panel-title">Login</div>
                                <div className="field-label">
                                    Mobile Number
                        </div>
                                <Form.Item
                                    name="username"
                                    hasFeedback
                                    showValidateSuccess
                                >
                                    <Input name="username" autoComplete="off" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Mobile Number" />
                                </Form.Item>
                                {
                                    !showOTPScreen ? <div className='ant-row ant-form-item'>
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
                                <button className="login-btn">Submit</button>
                            </Form>
                        </Formik> : null
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