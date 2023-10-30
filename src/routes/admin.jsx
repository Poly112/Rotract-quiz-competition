import {
    Outlet,
    redirect,
    useLoaderData,
    Form,
    NavLink,
} from "react-router-dom"
import Logo1 from "../assets/Logo.png"
import Logo2 from "../assets/Logo2.png"
import { createQuestion, getQuestions } from "../questions"
import "./admin.css"

export async function action() {
    const question = await createQuestion({
        question: "",
        options: { A: "", B: "", C: "", D: "", E: "" },
        answer: "",
    })

    return redirect(`questions/${question.id}/edit`)
}

export async function loader() {
    const questions = await getQuestions()
    if (questions.length) {
        return { questions }
    } else {
        const question = await createQuestion({
            question: "",
            options: { A: "", B: "", C: "", D: "", E: "" },
            answer: "",
        })

        return redirect(`questions/${question.id}/edit`)
    }
}

export default function Admin() {
    const { questions } = useLoaderData()
    return (
        <>
            <div id="admin">
                <div id="sidebar">
                    <div className="img">
                        <img src={Logo2} className="logo2" alt="Rotract logo" />
                        <img src={Logo1} className="logo1" alt="Rotract logo" />
                    </div>
                    <div>
                        <Form method="post">
                            <button type="submit">Create New Question</button>
                        </Form>
                    </div>
                    <nav>
                        {questions.length ? (
                            <ul>
                                {questions.map((question) => (
                                    <li key={question.id}>
                                        <NavLink
                                            to={`questions/${question.id}`}
                                            className={({
                                                isActive,
                                                isPending,
                                            }) =>
                                                isActive
                                                    ? "active"
                                                    : isPending
                                                    ? "pending"
                                                    : ""
                                            }
                                        >
                                            Question{" "}
                                            {questions.indexOf(question) + 1}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>
                                <i>No Question</i>
                            </p>
                        )}
                    </nav>
                </div>
                <div id="detail">
                    <Outlet />
                </div>
            </div>
        </>
    )
}
