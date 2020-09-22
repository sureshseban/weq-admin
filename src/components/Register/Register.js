import React from 'react'
import { Formik } from 'formik'
import './Register.css'
import { Input, Form, SubmitButton } from 'formik-antd'
import * as Yup from 'yup'
import { UserOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom'

function Register() {

    const initialValues = {
        brandName: '',
        firstName: '',
        lastName: '',
        userName: ''
    }

    const validationSchema = Yup.object({
        userName: Yup.string().required('Mobile Number cannot be empty.'),
        brandName: Yup.string().required('Brand Name cannot be empty.'),
        firstName: Yup.string().required('First Name cannot be empty.'),
        lastName: Yup.string().required('Last Name cannot be empty.')
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
                        <div className='ant-row ant-form-item'>
                            <button type="submit" className="login-btn">Create Account</button>
                        </div>
                        <div className="hyperlink-wrapper">
                            Already have an Account? <NavLink to="/login">Login</NavLink>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div >
    )
}

export default Register