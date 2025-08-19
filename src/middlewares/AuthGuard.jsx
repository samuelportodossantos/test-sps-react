import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";

function AuthGuard({ children }) {
    const navigate = useNavigate();

    async function verifyAuth() {
        const token = localStorage.getItem("token");
        const valid = await AuthService.isValidToken(token);
        if (!valid) {
            navigate('/login')
        }
    }

    useEffect(() => {
        verifyAuth();
    }, []);

    return children;
}

export default AuthGuard;
