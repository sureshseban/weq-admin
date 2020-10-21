class services {
    selectedShop = null
    baseURL = 'http://ec2-52-15-191-227.us-east-2.compute.amazonaws.com'
    dateFormat_UI = 'DD/MM/YYYY'
    dateFormat_API = 'YYYY-MM-DD'
    isAuthenticated = (localStorage.user && localStorage.user.length) ? true : false
}

const _services = new services()
export default _services