import axios from 'axios'

export function Pixiv_request(config){
    const instance =axios.create({
        baseURL:'http://pixiv.shiyua.ltd:2021',
        timeout: 10000
    })
    instance.interceptors.request.use(config=> {
        return config
    },err=>{console.log(err)})
    instance.interceptors.response.use(res=>{
        return res.data
    },err=>{console.log(err)})
    return instance(config)
}
