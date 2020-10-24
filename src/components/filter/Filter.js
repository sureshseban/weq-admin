import React from 'react'
import { Input } from 'antd'

function Filter({ onSearch }) {
    return (
        <Input placeholder="Search here..." allowClear onChange={(e) => onSearch(e.target.value)} />
    )
}

export default Filter