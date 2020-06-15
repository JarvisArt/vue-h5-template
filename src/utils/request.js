import axios from 'axios'
import { Toast } from 'vant'

axios.defaults.timeout = 30000
axios.defaults.withCredentials = false
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8'

// 请求时的拦截器
axios.interceptors.request.use(
  (config) => {
    // eslint-disable-next-line no-console
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 请求完成后的拦截器
axios.interceptors.response.use(
  (response) => {
    return Promise.resolve(response)
  }, (error) => {
    return Promise.resolve(error.response)
  }
)

function checkStatus (response = {}) {
  // 如果 http 状态码正常, 则直接返回数据
  if (response.status === 200) {
    // 这里, 如果不需要除 data 外的其他数据, 可以直接 return response.data, 这样可以让后面的代码精简一些
    if (response.data.code === 0) {
      return {
        code: response.data.code,
        data: response.data.data
      }
    }
    return {
      code: response.data.code,
      data: response.data.message
    }
  }
  // 异常状态下, 把错误信息返回去
  return {
    code: response.status,
    data: response.statusText
  }
}

// 处理来自后端的错误
function checkCode (res) {
  if (res.code === 506) {
    // router.replace('/login')
  } else if (res.code !== 0) {
    Toast(res.data)
  }
  return res
}

export default {
  post (url, data) {
    return axios({
      method: 'post',
      url,
      data
    }).then(checkStatus).then(checkCode)
  },
  get (url, params) {
    return axios({
      method: 'get',
      url,
      params
    }).then(checkStatus).then(checkCode)
  }
}
