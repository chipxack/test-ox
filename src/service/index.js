import axios from 'axios'
import Cookies from 'js-cookie'

export const httpClient = axios.create({
    baseURL: 'https://toko.ox-sys.com'
})

httpClient.interceptors.request.use(config => {
    let token = Cookies.get('token')
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded'

    if (token) {
        config.headers = Object.assign(config.headers, {Authorization: 'Bearer ' + token})
    } else {
        delete config.headers['Authorization']}

    return config
})

export const httpGet = params =>
    httpClient({
        method: 'get',
        ...params
    })

export const httpPost = params =>
    httpClient({
        method: 'post',
        ...params
    })

export const httpPut = params =>
    httpClient({
        method: 'put',
        ...params
    })

export const httpPatch = params =>
    httpClient({
        method: 'patch',
        ...params
    })

export const httpDelete = params =>
    httpClient({
        method: 'delete',
        ...params
    })