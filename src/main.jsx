import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import ErrorPage from "./error-page.jsx"
import {
    createBrowserRouter,
    RouterProvider,
    createRoutesFromElements,
    Route,
    useLocation,
    Navigate,
    Outlet,
} from "react-router-dom"

// Routers
import Admin, {
    action as adminAction,
    loader as adminLoader,
} from "./routes/admin"
import HomeIndex from "./routes/homeIndex"
import QuestionBank, {
    loader as questionBankLoader,
    action as questionBankAction,
} from "./routes/questionBank"
import Edit, { action as editAction, loader as editLoader } from "./routes/edit"
import Question from "./routes/question"
import { action as destroyAction } from "./routes/destroy"
import AdminIndex, { loader as adminIndexLoader } from "./routes/adminIndex"
import Logout from "./routes/logout"
import Login from "./routes/login"
import Home from "./routes/Home"
import { useCookies } from "react-cookie"
function RequireAuth({ children }) {
    const [cookies] = useCookies(["authed"])
    const location = useLocation()
    return cookies.authed === true ? (
        children
    ) : (
        <Navigate to="/login" replace state={{ path: location.pathname }} />
    )
}

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route errorElement={<ErrorPage />} path="/" element={<Home />}>
                <Route
                    element={
                        <RequireAuth>
                            <Outlet />
                        </RequireAuth>
                    }
                >
                    <Route index element={<HomeIndex />} />
                    <Route
                        path="/admin"
                        element={<Admin />}
                        loader={adminLoader}
                        action={adminAction}
                    >
                        <Route
                            index
                            loader={adminIndexLoader}
                            element={<AdminIndex />}
                        />
                        <Route
                            path="questions/:questionId"
                            loader={adminIndexLoader}
                            element={<AdminIndex />}
                        />
                        <Route
                            path="questions/:questionId/edit"
                            element={<Edit />}
                            loader={editLoader}
                            action={editAction}
                        />
                        <Route
                            path="questions/:questionId/destroy"
                            action={destroyAction}
                        />
                    </Route>
                    <Route path="/questionBank">
                        <Route
                            loader={questionBankLoader}
                            action={questionBankAction}
                            index
                            element={<QuestionBank />}
                        />
                        <Route
                            path=":questionId"
                            element={<Question />}
                            loader={editLoader}
                        />
                    </Route>
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
            </Route>
        </>
    )
)

let container = null
document.addEventListener("DOMContentLoaded", function (event) {
    if (!container) {
        container = document.getElementById("root")
        const root = ReactDOM.createRoot(container)
        root.render(
            <React.StrictMode>
                <RouterProvider router={router} />
            </React.StrictMode>
        )
    }
})
