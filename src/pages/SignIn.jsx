import { useState } from "react";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";

function SignIn() {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [emailRequiredMessage, setEmailRequiredMessage] = useState("")
  const [passwordRequiredMessage, setPasswordRequiredMessage] = useState("")
  const [authErrorMessage, setAuthErrorMessage] = useState("")

  const submitSignin = async () => {
    if (email === "") {
      setEmailRequiredMessage('Email field is required')
      return
    } else {
      setEmailRequiredMessage('')
    }
    if (password === "") {
      setPasswordRequiredMessage('Password field is required')
      return
    } else {
      setPasswordRequiredMessage('')
    }
    try {
      await AuthService.login(email, password)
      navigate('/')
    } catch (error) {
      setAuthErrorMessage("Authentication error, please verify your credentials.")
    }
  }

  return (
    <div className="login-page">
      <div className="input-form">
        <div className="input-field">
          <label htmlFor="email-input">Email</label>
          <input id="email-input" type="email" placeholder="Type your email address" onChange={(event) => setEmail(event.target.value)} />
          <small>{emailRequiredMessage}</small>
        </div>
        <div className="input-field">
          <label htmlFor="password-input">Password</label>
          <input id="password-input" type="password" placeholder="Type your password" onChange={(event) => setPassword(event.target.value)} />
          <small>{passwordRequiredMessage}</small>
        </div>
        <div className="input-field">
          <button onClick={submitSignin} className="btn-primary">Sign In</button>
        </div>
        {authErrorMessage != "" && (<p className="error-message">{authErrorMessage}</p>)}
        
      </div>
    </div>
  );
}

export default SignIn;