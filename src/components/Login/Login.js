import React from 'react'
import { Formik } from 'formik'
import './Login.css'
import { Input, Form, SubmitButton } from 'formik-antd'
import { Row, Col } from 'antd';
import * as Yup from 'yup'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { NavLink } from 'react-router-dom'

function Login(props) {

    const initialValues = {
        username: '',
        password: '',
        remember: false
    }

    const validationSchema = Yup.object({
        username: Yup.string().required('Username cannot be empty.'),
        password: Yup.string().required('Password cannot be empty.')
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
        // <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} >
        //     <div className='container'>
        //         <Form
        //             name="normal_login"
        //             className="login-form"
        //         >
        //             <Form.Item
        //                 name="username"
        //                 hasFeedback
        //                 showValidateSuccess
        //             >
        //                 <Input name="username" autoComplete="off" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        //             </Form.Item>
        //             <Form.Item
        //                 name="password"
        //                 hasFeedback
        //                 showValidateSuccess
        //             >
        //                 <Input
        //                     name="password"
        //                     prefix={<LockOutlined className="site-form-item-icon" />}
        //                     type="password"
        //                     placeholder="Password"
        //                 />
        //             </Form.Item>
        //             <SubmitButton type="primary" className="login-form-button">
        //                 Log in
        //                 </SubmitButton>
        //             Or <NavLink exact to="/">register now!</NavLink>
        //         </Form>
        //     </div>
        // </Formik>
        <div className="login-wrapper">
            <div className="left-panel" style={bgStyle}>
                <span className="login-logo" style={logoStyle}></span>
            </div>
            <div className="right-panel">
                <div className="right-panel-title">Login</div>
                <div className="field-label">
                    Mobile Number
                </div>
                <div className="input-wrapper">
                    <span className="country-code">
                        +91
                    </span>
                    <input type="tel" id="phone" name="phone" className="phone-input"></input>
                </div>
                <div className="hyperlink-wrapper">
                    Didin’t receieve OTP? <a href="/">Resend OTP</a>
                </div>
                <div className="field-label">
                    Enter OTP
                </div>
                <div className="otp-wrapper">
                    <div className="divInner">
                        <input className="partitioned" type="text" maxlength="4" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" onKeyPress="if(this.value.length==4) return false;" />
                    </div>
                </div>
                <button className="login-btn">Login</button>
                <div className="hyperlink-wrapper">
                    Not yet registered? <a href="/">Register</a>
                </div>
            </div>
        </div >
    )
}

export default Login