import { Form } from "react-router-dom"
import "./Header.css"
import Logo from "../assets/Logo.png"
import Logo2 from "../assets/Logo2.png"
import { useCookies } from "react-cookie"
import { ThemeContext } from "../routes/Home"
import { useContext } from "react"

export default function Header() {
    // TODO: change this later
    const [cookies] = useCookies(["authed"])
    const { theme, toggleTheme } = useContext(ThemeContext)

    return (
        <>
            <header className={`header ${theme}`}>
                <div className="logos">
                    <img className="logo1" src={Logo} alt="" />
                    <img className="logo2" src={Logo2} alt="" />
                </div>

                <div className="header_container">
                    <div className="btn_container">
                        <div className="toggle-switch">
                            <label>
                                <input type="checkbox" />
                                <span
                                    onClick={toggleTheme}
                                    className="slider"
                                ></span>
                            </label>
                        </div>
                        {cookies.authed ? <div className="avatar">PN</div> : ""}
                    </div>
                    <Form
                        method="get"
                        action={cookies.authed ? "/logout" : "/login"}
                    >
                        <input
                            className={cookies.authed ? "logout" : "login"}
                            type="submit"
                            value={cookies.authed ? "Log Out" : "Login"}
                        />
                    </Form>
                </div>
            </header>
        </>
    )
}
