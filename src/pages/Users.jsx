import { useEffect, useState } from "react";
import UserService from "../services/UserService";
import Layout from "./Layout";
import { Box, Button, Flex, Table } from "@radix-ui/themes";
import { PlusIcon, TrashIcon, Pencil1Icon } from "@radix-ui/react-icons";


function Users() {
  const [users, setUsers] = useState([])

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [type, setType] = useState("common")
  const [id, setId] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")

  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [])

  async function fetchUsers() {
    const response = await UserService.list()
    setUsers(response.data.items)
  }

  async function submitUser() {

    try {

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
    } catch (error) {
      setErrorMessage(error.response.data.message)
    }
  }

  function closeModal() {
    setShowModal(false)
    setName("")
    setEmail("")
    setPassword("")
    setType("common")
    setErrorMessage("")
  }

  function openEditModal(id) {
    const user = users[id]
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
    setErrorMessage("")
  }

  function deleteUser(id) {
    const user = users[id]
    if (user) {
      const confirmed = window.confirm('Are you sure want to delete this user?')
      if (confirmed) {
        UserService.delete(id).then(async () => {
          await fetchUsers()
        })
      }
    }
  }

  return (
    <Layout>
      <div className="container">
        <div className="content">
          <div className="flex between">
            <Flex justify={"between"} align={"center"}>
              <Box>
                <h2>Users</h2>
              </Box>
              <Box>
                <Button size={"1"} onClick={openCreateModal}>
                  <PlusIcon />
                </Button>
              </Box>
            </Flex>
          </div>
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {users.map(user => (
                <Table.Row key={user.id}>
                  <Table.RowHeaderCell>{user.id}</Table.RowHeaderCell>
                  <Table.Cell>{user.name}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>
                    <Flex gap={"2"}>
                      <Button size={"1"} color="orange" onClick={() => openEditModal(user.id)}>
                        <Pencil1Icon />
                      </Button>
                      <Button size={"1"} color="tomato" onClick={() => deleteUser(user.id)}>
                        <TrashIcon />
                      </Button>
                    </Flex>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-container">
            <div className="modal-content">

              {errorMessage != "" && (<p className="error-message">{errorMessage}</p>)}

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
                  <option value="admin">Admin</option>
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
  );
}

export default Users;
