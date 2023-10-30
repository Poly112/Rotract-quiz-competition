import { Navigate } from "react-router-dom"
import { useCookies } from "react-cookie"
import { FaLock } from "react-icons/fa"
import { useState, useEffect, useContext } from "react"
import { ThemeContext } from "./Home"
import "./login.css"

export default function LoginPage() {
    const [cookies, setCookie, _] = useCookies(["authed"])
    const { theme } = useContext(ThemeContext)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [state, setState] = useState(false)

    useEffect(() => {
        if (state) {
            setCookie("authed", true, { path: "/" })
        }
    }, [state])

    if (cookies.authed) return <Navigate to={"/questionBank"} />

    const handleSubmit = (event) => {
        event.preventDefault()
        setState(username === "admin" && password === "admin")
    }
    return (
        <div className={`${theme} login-container`}>
            <div className="box">
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: 60 + "px",
                        width: 60 + "px",
                    }}
                    className="avatar"
                >
                    <FaLock
                        style={{
                            color: "white",
                            height: 35 + "px",
                            width: 35 + "px",
                        }}
                        size={40}
                    />
                </div>

                <form id="login" onSubmit={handleSubmit} method="post">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            value={password}
                            id="password"
                            name="password"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input type="checkbox" id="remember" name="remember" />
                        <label htmlFor="remember">Remember me</label>
                    </div>
                    <button type="submit" className="submit-button">
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    )
}
