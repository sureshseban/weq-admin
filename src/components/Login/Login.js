import React from 'react'
import { Formik } from 'formik'
import './Login.css'
import { Input, Form, SubmitButton } from 'formik-antd'
import * as Yup from 'yup'
import { UserOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom'

function Login() {

    const initialValues = {
        username: ''
    }

    const validationSchema = Yup.object({
        username: Yup.string().required('Mobile Number cannot be empty.')
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
                        <div className='ant-row ant-form-item'>
                            <button type="submit" className="login-btn">Login</button>
                        </div>
                        <div className="hyperlink-wrapper">
                            Not yet registered? <NavLink to="/">Register</NavLink>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div >
    )
}

export default Login