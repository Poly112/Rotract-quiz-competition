import { useCookies } from "react-cookie"
import { Navigate } from "react-router-dom"
import { useEffect } from "react"

export default function Logout() {
    const [cookie, setCookie, removeCookie] = useCookies(["authed"])

    useEffect(() => {
        removeCookie("authed")
    }, [])

    return <Navigate to={"/login"} />
}
