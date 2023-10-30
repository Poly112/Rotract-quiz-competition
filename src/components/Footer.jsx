import { useContext } from "react"
import "./Footer.css"
import { ThemeContext } from "../routes/Home"
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"

export default function Footer() {
    const { theme } = useContext(ThemeContext)
    const iconStyle = {
        width: 44 + "px",
        height: 33 + "px",
        margin: "0 10px",
    }

    return (
        <footer className={`footer ${theme}`}>
            <div className="container">
                <div className="grid-container">
                    <div>
                        <h2>About Us</h2>
                        <p>A non-profit organization .</p>
                    </div>
                    <div>
                        <h2>Contact Us</h2>
                        <p>NAUTH, Nnewi, Anambra</p>
                        <p>Nigeria</p>
                        <p>rotanauth@gmail.com</p>
                    </div>
                    <div>
                        <h2>Follow Us</h2>
                        <a href="https://www.facebook.com/">
                            <FaFacebook className="socials" style={iconStyle} />
                        </a>
                        <a href="https://www.instagram.com/">
                            <FaInstagram
                                className="socials"
                                style={iconStyle}
                            />
                        </a>
                        <a href="https://www.twitter.com/">
                            <FaTwitter className="socials" style={iconStyle} />
                        </a>
                    </div>
                </div>
                <div className="copyright">
                    <p>
                        Copyright © <a href="#">Rotract Nauth</a>{" "}
                        {new Date().getFullYear()}.
                    </p>
                </div>
            </div>
        </footer>
    )
}
