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

  static async isValidToken(token) {
    if (localStorage.getItem("token")) {
      const response = await API.get('/auth/check', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      if (response.status === 200) {
        return true
      }
    }
    return false
  }
}

export default AuthService;
