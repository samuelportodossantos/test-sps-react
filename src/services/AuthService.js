import API from "./Api";

class AuthService {

  static async login(email, password) {
    const response = await API.post('/auth/login', {
      email,
      password
    })
    if (response.status === 200) {
      localStorage.setItem('token', response.data.token)
      return true
    }
    localStorage.removeItem('token')
    return false
  }

  static async isValidToken() {
    const response = await API.get('/auth/check')
    if (response.status === 200) {
      return true
    }
    localStorage.removeItem('token')
    return false
  }
}

export default AuthService;
