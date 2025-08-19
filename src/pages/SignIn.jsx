import { useState } from "react";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { Box, Card, Flex, TextField, Theme, Button, Avatar, Blockquote } from "@radix-ui/themes";
import { PersonIcon, LockClosedIcon } from "@radix-ui/react-icons";

function SignIn() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailRequiredMessage, setEmailRequiredMessage] = useState("");
  const [passwordRequiredMessage, setPasswordRequiredMessage] = useState("");
  const [authErrorMessage, setAuthErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submitSignin = async () => {
    let valid = true;
    if (email === "") {
      setEmailRequiredMessage("Email field is required");
      valid = false;
    } else {
      setEmailRequiredMessage("");
    }
    if (password === "") {
      setPasswordRequiredMessage("Password field is required");
      valid = false;
    } else {
      setPasswordRequiredMessage("");
    }
    if (!valid) return;

    setLoading(true);
    setAuthErrorMessage("");
    try {
      const success = await AuthService.login(email, password);
      if (success) {
        navigate("/");
      } else {
        setAuthErrorMessage("Authentication error, please verify your credentials.");
      }
    } catch (error) {
      setAuthErrorMessage("Authentication error, please verify your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Theme
      appearance="dark"
      style={{ overflow: "hidden" }}
    >
      <Flex
        justify={"center"}
        direction={"row"}
        align={"center"}
        height={"100vh"}
      >
        <Box flexBasis={"30%"}>
          <Card size={"3"}>
            <Flex justify={"center"}>
              <Avatar variant="solid" size={"7"} radius="full" fallback="SPS" mb={"6"} mt={"4"} />
            </Flex>
            {authErrorMessage && (
              <Blockquote color="tomato" mb="3">
                {authErrorMessage}
              </Blockquote>
            )}

            <TextField.Root
              placeholder="User email"
              mb="1"
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
            >
              <TextField.Slot>
                <PersonIcon height="16" width="16" />
              </TextField.Slot>
            </TextField.Root>
            {emailRequiredMessage && (
              <Blockquote mb="2" color="tomato" style={{ fontSize: "0.85em" }}>
                {emailRequiredMessage}
              </Blockquote>
            )}

            <TextField.Root
              mb="1"
              type="password"
              placeholder="User password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            >
              <TextField.Slot>
                <LockClosedIcon height="16" width="16" />
              </TextField.Slot>
            </TextField.Root>
            {passwordRequiredMessage && (
              <Blockquote mb="2" color="tomato" style={{ fontSize: "0.85em" }}>
                {passwordRequiredMessage}
              </Blockquote>
            )}

            <Flex justify="end">
              <Button loading={loading} onClick={submitSignin}>
                Sign In
              </Button>
            </Flex>
          </Card>

        </Box>
      </Flex>
    </Theme>
  );
}

export default SignIn;