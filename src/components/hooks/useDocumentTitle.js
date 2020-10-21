import {useEffect} from 'react'

function useDocumentTitle(title) {

    useEffect(() => {
        document.title = `WEQ | ${title}`
    }, [])

}

export default useDocumentTitle