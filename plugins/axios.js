import {Message} from 'element-ui'

export default ({$axios}) => {
    //错误拦截,onError用于错误拦截
    $axios.onError(res => {
        const { message, statusCode } = res.response.data

        if(statusCode === 400){
            Message.error(message)
        }
    })
}