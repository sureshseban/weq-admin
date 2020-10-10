import { useState, useEffect } from 'react'
import axios from 'axios'
import _services from '../utils/services'

const useHttp = (url, req, dependencies) => {

    const [isLoading, setIsLoading] = useState(false)
    const [fetchedData, setFetchedData] = useState(null)

    useEffect(() => {
        setIsLoading(true)
        axios.post(`${_services.baseURL}${url}`, req).then(data => {
            setFetchedData(data)
            setIsLoading(false)
        }).catch(err => {
            setIsLoading(false)
            console.log(err);
        })
    }, dependencies)

    return [isLoading, fetchedData]
}

export default useHttp;