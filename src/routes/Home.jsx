import Footer from "../components/Footer"
import Header from "../components/Header"
import { Outlet } from "react-router-dom"
import React, { createContext, useState, useEffect } from "react"
import localforage from "localforage"

// TODO: Implement loader logic

export const ThemeContext = createContext()

export default function Home() {
    const [theme, setTheme] = useState("light")

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light")
    }

    useEffect(() => {
        const fetchTheme = async () => {
            const localTheme = await localforage.getItem("theme")

            if (localTheme) {
                setTheme(localTheme)
            }
        }

        fetchTheme()
    }, [])

    useEffect(() => {
        async function setTheme() {
            await localforage.setItem("theme", theme)
        }
        setTheme()
    }, [theme])

    return (
        <>
            <ThemeContext.Provider value={{ theme, toggleTheme }}>
                <Header />
                <main id="main">
                    <Outlet />
                </main>
                <Footer />
            </ThemeContext.Provider>
        </>
    )
}
