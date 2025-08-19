import API from "./Api";

class UserService {
  static async list({ page = 1 } = {}) {
    return await API.get(`/users?page=${page}`)
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
