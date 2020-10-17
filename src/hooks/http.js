import { useState, useEffect } from 'react'
import axios from 'axios'
import _services from '../utils/services'

export const useHttpGet = (url, dependencies) => {

    const [isLoading, setIsLoading] = useState(false)
    const [fetchedData, setFetchedData] = useState(null)

    useEffect(() => {
        setIsLoading(true)
        axios.get(`${_services.baseURL}${url}`).then(data => {
            setFetchedData(data)
            setIsLoading(false)
        }).catch(err => {
            setIsLoading(false)
            console.log(err);
        })
    }, dependencies)

    return [isLoading, fetchedData]
}

export const useHttpPost = (url, req, dependencies) => {

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

export const useHttpPost_processData = (url, req, dependencies, processData) => {

    const [isLoading, setIsLoading] = useState(false)
    const [fetchedData, setFetchedData] = useState(null)

    useEffect(() => {
        setIsLoading(true)
        axios.post(`${_services.baseURL}${url}`, req).then(data => {
            setFetchedData(processData(data))
            setIsLoading(false)
        }).catch(err => {
            setIsLoading(false)
            console.log(err);
        })
    }, dependencies)

    return [isLoading, fetchedData]
}
