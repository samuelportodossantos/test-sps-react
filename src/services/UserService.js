import API from "./Api";

class UserService {
  static async list() {
    return await API.get('/users')
  }
  static async create(data) {
    return await API.post('/users', data)
  }
  static async delete(id) {
    return await API.delete(`/users/${id}`)
  }
  static async update(id, data) {
    return await API.put(`/users/${id}`, {...data, id})
  }
}

export default UserService;
