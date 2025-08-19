import { Link, useNavigate } from "react-router-dom";
import { Box, Flex, Theme, Button, Strong } from "@radix-ui/themes";
import AuthGuard from "../middlewares/AuthGuard";
import { ExitIcon, PersonIcon, HomeIcon } from "@radix-ui/react-icons";

function Layout({ children }) {
    const navigate = useNavigate()

    function logout() {
        localStorage.removeItem("token")
        navigate('/login')
    }

    return (
        <AuthGuard>
            <Theme
                appearance="dark"
                style={{ overflow: "hidden" }}
            >
                <Flex
                    p={"4"}
                    justify={"between"}
                    align={"center"}
                    style={{ backgroundColor: "black" }}
                >
                    <Box flexBasis={"15%"}>
                        <h2>SPS Group</h2>
                    </Box>
                    <Box flexBasis={"75%"}>
                        <Button mr={"2"} onClick={() => navigate('/')}>
                            <HomeIcon />Home
                        </Button>
                        <Button onClick={() => navigate('/users')}>
                            <PersonIcon />Users
                        </Button>
                    </Box>
                    <Box flexBasis={"10%"}>
                        <Flex justify={"end"}>
                            <Button onClick={logout} size={"2"} variant="outline">
                                <ExitIcon />
                            </Button>
                        </Flex>
                    </Box>
                </Flex>
                <Flex>
                    <Box p={"4"} width={"100%"}>
                        {children}
                    </Box>
                </Flex>
            </Theme>
        </AuthGuard>
    )
}

export default Layout;