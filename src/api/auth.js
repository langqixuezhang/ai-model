import http from './http'

export function loginApi(payload) {
  // payload: { username, password }
  console.log('http', payload)
  return http.post('/auth/login', payload)
}

export function fetchProfileApi() {
  return http.get('/user/profile')
}
