import React from 'react'
import { Formik } from 'formik'
import './Login.css'
import { Input, Form, SubmitButton } from 'formik-antd'
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

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} >
            <div className='container'>
                <Form
                    name="normal_login"
                    className="login-form"
                >
                    <Form.Item
                        name="username"
                        hasFeedback
                        showValidateSuccess
                    >
                        <Input name="username" autoComplete="off" prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        hasFeedback
                        showValidateSuccess
                    >
                        <Input
                            name="password"
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <SubmitButton type="primary" className="login-form-button">
                        Log in
                        </SubmitButton>
                    Or <NavLink exact to="/">register now!</NavLink>
                </Form>
            </div>
        </Formik>
    )
}

export default Login