import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";

function AuthGuard({ children }) {
    const navigate = useNavigate();

    async function verifyAuth() {
        try {
            const token = localStorage.getItem("token");
            const valid = await AuthService.isValidToken(token);
            console.log(valid)
            if (!valid) {
                localStorage.removeItem("token");
                navigate('/login')
            }
        } catch(error) {
            localStorage.removeItem("token");
            navigate('/login')
        }
    }

    useEffect(() => {
        verifyAuth();
    }, []);

    return children;
}

export default AuthGuard;
