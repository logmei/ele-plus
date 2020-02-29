import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
// import store from '@/store'
// import router from '@/router'

// create an axios instance
const service = axios.create({
  //baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  baseURL: 'http://localhost:3000', // url = base url + request url
  withCredentials: true // send cookies when cross-domain requests
  // timeout: 5000 // request timeout
})
/**
 * HTTP方法
 */

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token --['X-Token'] as a custom key.
      // please modify it according to the actual situation.
      config.headers['token'] = store.getters.token
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code.
   */
  response => {
    const res = response.data
    if (response.config.responseType === 'blob') {
      return res
    }
    // if the custom code is not 20000, it is judged as an error.
    // console.log('res.code.......', res.code)
    if (res.code !== 0) {
      // 9008：登录过期 9009：被挤掉线
      if (res.code === 9008 || res.code === 9009) {
        // to re-login
        MessageBox.confirm(res.msg, '确认注销', {
          confirmButtonText: '重新登录',
          showClose: false,
          closeOnClickModal: false,
          closeOnPressEscape: false,
          //   showCancelButton: false,
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      } else if (res.code === 403) {
        // to re-login
        router.push({
          path: '/401'
        })
      } else if (res.code === 404) {
        // to re-login
        router.push({
          path: '/404'
        })
      } else {
        Message({
          message: res.msg || 'error',
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject(res.msg || 'error')
    } else {
      return res
    }
  },
  error => {
    // console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
