import { Link, useNavigate } from "react-router-dom";

function Layout({ children }) {
    const navigate = useNavigate()

    function logout() {
        localStorage.removeItem("token")
        navigate('/login')
    }

    return (
        <div>
            <header className="main-header">
                <h2>SPS Group</h2>
                <div className="main-menu">
                    <Link className="btn btn-default" to="/">Home</Link>
                    <Link className="btn btn-default" to="/users">Users</Link>
                </div>
                <div>
                    <button onClick={logout} className="btn-default">Logout</button>
                </div>
            </header>
            <main>
                {children}
            </main>
        </div>
    )
}

export default Layout;