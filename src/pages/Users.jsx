import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import UserService from "../services/UserService";
import Layout from "./Layout";
import { Box, Button, Card, Flex, Table, Dialog, Text, TextField, AlertDialog, Select, Blockquote } from "@radix-ui/themes";
import { PlusIcon, TrashIcon, Pencil1Icon } from "@radix-ui/react-icons";

function Users() {
  const [users, setUsers] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [usersPerPage, setUsersPerPage] = useState(10);
  const totalPages = Math.ceil(totalUsers / usersPerPage);

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [type, setType] = useState("common")
  const [id, setId] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")

  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage])

  async function fetchUsers(page = 1) {
    const response = await UserService.list({ page });
    setUsers(response.data.items);
    setTotalUsers(response.data.total);
    setUsersPerPage(response.data.perPage);
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
      await fetchUsers(currentPage)
      closeModal()
    } catch (error) {
      setErrorMessage(error.response.data.message)
    }
  }

  function closeModal() {
    setShowModal(false)
    setId(null)
    setName("")
    setEmail("")
    setPassword("")
    setType("common")
    setErrorMessage("")
  }

  function openEditModal(userId) {
    const user = users.find(u => u.id === userId);
    if (user) {
      setShowModal(true);
      setId(user.id);
      setName(user.name);
      setEmail(user.email);
      setType(user.type);
      setPassword("");
      setErrorMessage("");
    }
  }

  function openCreateModal() {
    setShowModal(true);
    setId(null);
    setName("");
    setEmail("");
    setPassword("");
    setType("common");
    setErrorMessage("");
  }

  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  function handleDeleteClick(userId) {
    const user = users.find(u => u.id === userId);
    if (user) {
      setUserToDelete(user);
      setShowAlertDialog(true);
    }
  }

  async function confirmDeleteUser() {
    if (userToDelete) {
      await UserService.delete(userToDelete.id);
      await fetchUsers(currentPage);
      setShowAlertDialog(false);
      setUserToDelete(null);
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

          <Flex mt={"4"}>
            <Box flexBasis={"100%"}>
              <Card>
                <Table.Root>
                  <Table.Header>
                    <Table.Row>
                      <Table.ColumnHeaderCell maxWidth={"5px"}>ID</Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell maxWidth={"10px"}>Actions</Table.ColumnHeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {users.map(user => (
                      <Table.Row key={user.id}>
                        <Table.RowHeaderCell maxWidth={"5px"}>{user.id}</Table.RowHeaderCell>
                        <Table.Cell>{user.name}</Table.Cell>
                        <Table.Cell>{user.email}</Table.Cell>
                        <Table.Cell maxWidth={"10px"}>
                          <Flex gap={"2"}>
                            <Button size={"1"} color="orange" onClick={() => openEditModal(user.id)}>
                              <Pencil1Icon />
                            </Button>
                            <Button size={"1"} color="tomato" onClick={() => handleDeleteClick(user.id)}>
                              <TrashIcon />
                            </Button>
                          </Flex>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Root>
                <Flex mt={"2"} justify={"end"}>
                  <Box>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  </Box>
                </Flex>
              </Card>

            </Box>
          </Flex>
        </div>
      </div>

      <AlertDialog.Root open={showAlertDialog} onOpenChange={setShowAlertDialog}>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>Excluir usuário</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Tem certeza que deseja excluir o usuário <b>{userToDelete?.name}</b>? Essa ação não pode ser desfeita.
          </AlertDialog.Description>
          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray" onClick={() => setShowAlertDialog(false)}>
                Cancelar
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="solid" color="red" onClick={confirmDeleteUser}>
                Excluir
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <Dialog.Root open={showModal} onOpenChange={setShowModal}>
        <Dialog.Content maxWidth="450px">
          <Dialog.Title>{id ? "Editar usuário" : "Cadastrar usuário"}</Dialog.Title>
          <Dialog.Description size="2" mb="4">
            {id ? "Edite os dados do usuário." : "Preencha os dados para cadastrar um novo usuário."}
          </Dialog.Description>

          {errorMessage && (
            <Blockquote color="tomato" mb={"3"}>
              <Text color="tomato" mb="3">{errorMessage}</Text>
            </Blockquote>
          )}

          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">Nome</Text>
              <TextField.Root
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Digite o nome"
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">Email</Text>
              <TextField.Root
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="email"
                placeholder="Digite o email"
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">Senha</Text>
              <TextField.Root
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
                placeholder="Digite a senha"
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">Tipo de conta</Text>
              <Select.Root size="2" defaultValue="common" value={type} onValueChange={setType}>
                <Select.Trigger />
                <Select.Content>
                  <Select.Item value="admin">Admin</Select.Item>
                  <Select.Item value="common">Usuário comum</Select.Item>
                </Select.Content>
              </Select.Root>
            </label>
          </Flex>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray" onClick={closeModal}>
                Cancelar
              </Button>
            </Dialog.Close>
            <Button color="green" onClick={submitUser}>
              Salvar
            </Button>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </Layout>
  );
}

export default Users;
