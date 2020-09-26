import React from 'react'
import { Result, Button } from 'antd';
import { NavLink } from 'react-router-dom'

function NoMatch(props) {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary"><NavLink exact to="/home">Back Home</NavLink></Button>}
        />
    )
}

export default NoMatch