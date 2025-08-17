import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";

function AuthGuard({ children }) {
    const navigate = useNavigate()
    const isTokenDefined = !!localStorage.getItem("token");

    async function verifyAuth() {
        const isValid = await AuthService.isValidToken();
        if (!isValid || !isTokenDefined) {
            navigate("/login");
            return null;
        }
    }
    
    useEffect(() => {
        verifyAuth();
    }, [isTokenDefined, navigate]);

    return children;
}

export default AuthGuard;
