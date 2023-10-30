import { useLoaderData, Link, Form, redirect } from "react-router-dom"
import { getQuestions, createQuestion } from "../questions"
import { useState, useEffect } from "react"
import "./questionBank.css"
import localforage from "localforage"

export async function action() {
    const question = await createQuestion({
        question: "",
        options: { A: "", B: "", C: "", D: "", E: "" },
        answer: "",
    })

    return redirect(`../admin/questions/${question.id}/edit`)
}

export async function loader() {
    const questions = await getQuestions()
    return { questions: [...questions] }
}
export default function Question() {
    const { questions } = useLoaderData()

    const [visitedLinks, setVisitedLinks] = useState([])

    useEffect(() => {
        // Retrieve visited links from local storage on component mount
        async function getFromLocalStorage() {
            const storedVisitedLinks =
                JSON.parse(await localforage.getItem("visitedLinks")) || []
            setVisitedLinks(storedVisitedLinks) // move this line here
        }
        getFromLocalStorage()
    }, [])

    async function handleLinkClick(index) {
        // Mark the link as visited
        if (!visitedLinks.includes(index)) {
            const updatedVisitedLinks = [...visitedLinks, index]
            setVisitedLinks(updatedVisitedLinks)
            await localforage.setItem(
                "visitedLinks",
                JSON.stringify(updatedVisitedLinks)
            )
        }
    }

    async function handleReset() {
        const updatedVisitedLinks = []
        setVisitedLinks(updatedVisitedLinks)
        await localforage.setItem(
            "visitedLinks",
            JSON.stringify(updatedVisitedLinks)
        )
    }

    return (
        <>
            <>
                <div className="questionBank">
                    <div className="nav">
                        <Link className="btn" to={"/admin"}>
                            Go To Admin
                        </Link>

                        <Form method="post">
                            <button className="btn" type="submit">
                                Add New Question
                            </button>
                        </Form>
                    </div>
                    <div className="centered-card">
                        <div
                            style={
                                !questions.length
                                    ? {
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          width: "100%",
                                      }
                                    : {}
                            }
                            className="card"
                        >
                            <div className="card-body">
                                <div
                                    className="button-rows"
                                    style={
                                        !questions.length
                                            ? {
                                                  grid: "none",
                                              }
                                            : {}
                                    }
                                >
                                    {questions.length ? (
                                        questions.map((question, index) => {
                                            return (
                                                <Link
                                                    key={question.id}
                                                    to={question.id}
                                                    onClick={(e) => {
                                                        if (
                                                            visitedLinks.includes(
                                                                index
                                                            )
                                                        ) {
                                                            return e.preventDefault()
                                                        }
                                                        return handleLinkClick(
                                                            index
                                                        )
                                                    }}
                                                    className={
                                                        visitedLinks.includes(
                                                            index
                                                        )
                                                            ? "btn btn-primary visited-link"
                                                            : "btn btn-primary "
                                                    }
                                                >
                                                    Question {index + 1}
                                                </Link>
                                            )
                                        })
                                    ) : (
                                        <p className="alt_text">
                                            No Question Inserted
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="reset">
                            <button onClick={handleReset}>Reset</button>
                        </div>
                    </div>
                </div>
            </>
        </>
    )
}
