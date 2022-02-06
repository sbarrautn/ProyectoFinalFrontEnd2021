import Vue from 'vue'
import axios from 'axios'
import router from '../routes/router'
import get from 'lodash/get'

const instance = axios.create({
  baseURL: 'http://api.proyecto.test/api',
})

// instance.interceptors.request.use(config => {
//   const session = localStorage.getItem('session') || sessionStorage.getItem('session')
//   console.log(config, session)
//   if (session) {
//     config.headers['Authorization'] = session;
//   }
//   console.log(config)
//   return config;
// },
//   error => Promise.reject(error)
// )

instance.interceptors.response.use(
  response => response,
  error => {
    if (router.currentRoute.name !== 'login' && get(error, 'response.status', 0) === 401) {
      router.push({ name: 'login' })
      return Promise.reject(error)
    }

    return Promise.reject(error)
  }
)

Vue.prototype.$axios = instance

export default instance
