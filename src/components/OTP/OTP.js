import React, { useState } from 'react'
import { Formik } from 'formik'
import './OTP.css'
import { Form } from 'formik-antd'
import OtpInput from 'react-otp-input';

function OTP() {

    const initialValues = {
        otp: ''
    }

    const [otp, setOTP] = useState('')

    const onSubmit = values => {
        console.log('Form Data', otp);
    }

    const bgStyle = {
        backgroundImage: `url(${process.env.PUBLIC_URL}/login-bg.svg)`
    }

    const logoStyle = {
        backgroundImage: `url(${process.env.PUBLIC_URL}/logo.svg)`
    }

    const handleChange = otp => {
        setOTP(otp)
    }

    return (
        <div className="login-wrapper">
            <div className="left-panel" style={bgStyle}>
                <span className="login-logo" style={logoStyle}></span>
            </div>
            <div className="right-panel">
                <Formik initialValues={initialValues} onSubmit={onSubmit} >
                    <Form>
                        <div className="right-panel-title">Verify Your OTP</div>
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
                        <button className="login-btn">Verify OTP</button>
                    </Form>
                </Formik>
            </div>
        </div >
    )
}

export default OTP