import { useEffect, useState } from "react";
import UserService from "../services/UserService";
import AuthGuard from "../middlewares/AuthGuard";
import Layout from "./Layout";

function Users() {
  const [users, setUsers] = useState([])

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [type, setType] = useState("common")
  const [id, setId] = useState(null)

  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [])

  async function fetchUsers() {
    const response = await UserService.list()
    setUsers(response.data.items)
  }

  async function submitUser() {
    const payload = {
      name,
      email,
      password,
      type
    }
    if (id) {
      await UserService.update(id, payload)
    } else {
      await UserService.create(payload)
    }
    await fetchUsers()
    closeModal()
  }

  function closeModal() {
    setShowModal(false)
    setName("")
    setEmail("")
    setPassword("")
    setType("common")
  }

  function openEditModal(id) {
    const user = users[id]

    console.log(user)
    setShowModal(true)
    setId(user.id)
    setName(user.name)
    setEmail(user.email)
    setType(user.type)
  }

  function openCreateModal() {
    setShowModal(true)
    setName("")
    setEmail("")
    setPassword("")
    setType("common")
  }

  function deleteUser(id) {
    const user = users[id]
    if(user) {
      const confirmed = window.confirm('Are you sure want to delete this user?')
      if (confirmed) {
        UserService.delete(id).then(async() => {
          await fetchUsers()
        })
      }
    }
  }

  return (
    <AuthGuard>
      <Layout>
        <div className="container">
          <div className="content">
            <div className="flex between">
              <h2>Users</h2>
              <button className="btn-success" onClick={openCreateModal}>New User</button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td className="action-buttons">
                      <button className="btn-warning" onClick={() => openEditModal(user.id)}>Edit</button>
                      <button className="btn-danger" onClick={() => deleteUser(user.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {showModal && (
          <div className="modal">
            <div className="modal-container">
              <div className="modal-content">

                <div className="input-field">
                  <label htmlFor="name-input">Name</label>
                  <input id="name-input" value={name} type="text" placeholder="Type your name" onChange={(event) => setName(event.target.value)} />
                </div>

                <div className="input-field">
                  <label htmlFor="email-input">Email</label>
                  <input id="email-input" value={email} type="email" placeholder="Type your email" onChange={(event) => setEmail(event.target.value)} />
                </div>

                <div className="input-field">
                  <label htmlFor="password-input">Password</label>
                  <input id="password-input" type="password" placeholder="Type your password" onChange={(event) => setPassword(event.target.value)} />
                </div>

                <div className="input-field">
                  <label htmlFor="type-input">Account Type</label>
                  <select value={type} onChange={(event) => setType(event.target.value)}>
                    <option selected value="admin">Admin</option>
                    <option value="common">Common user</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn-danger" onClick={closeModal}>Cancel</button>
                <button className="btn-success" onClick={submitUser}>Submit</button>
              </div>
            </div>
          </div>
        )}
      </Layout>
    </AuthGuard>
  );
}

export default Users;
