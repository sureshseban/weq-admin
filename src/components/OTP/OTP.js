import React, { useState } from 'react'
import { Formik } from 'formik'
import './OTP.css'
import { Input, Form } from 'formik-antd'
import * as Yup from 'yup'
import { UserOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom'

function OTP() {

    const initialValues = {
        username: '',
        otp: ''
    }

    const validationSchema = Yup.object({
        username: Yup.string().required('Mobile Number cannot be empty.'),
        otp: Yup.string().required('OTP cannot be empty.')
    })

    const onSubmit = values => {
        console.log('Form Data', values);
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
                        <div className="hyperlink-wrapper">
                            Didin’t receieve OTP? <a href="/">Resend OTP</a>
                        </div>
                        <div className="field-label">
                            Enter OTP
                        </div>
                        <div className="otp-wrapper">
                            <div className="divInner">
                                <Form.Item
                                    name='otp'
                                >
                                    <Input name='otp' className="partitioned" type="text"
                                        autoComplete="off"
                                        maxLength="4" />
                                    {/* onInput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" */}
                                    {/* onKeyPress="if(this.value.length==4) return false;" */}
                                </Form.Item>
                            </div>
                        </div>
                        <button className="login-btn">Verify OTP</button>
                        <div className="hyperlink-wrapper">
                            Not yet registered? <NavLink to="/">Register</NavLink>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div >
    )
}

export default OTP