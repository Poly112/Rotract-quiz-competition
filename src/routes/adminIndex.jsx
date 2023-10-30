import { Form, Link, useLoaderData } from "react-router-dom"
import { getQuestion, getQuestions } from "../questions"
import "./adminIndex.css"

export async function loader({ params }) {
    if (!params.questionId) {
        const questions = await getQuestions()
        return { question: questions[0], index: true }
    }
    const question = await getQuestion(params.questionId)
    return { ...question, index: false }
}

// TODO: Implement isLoading by using that loading snippet

export default function AdminIndex() {
    // TODO: Implement an ID for questions
    const { question, index } = useLoaderData()

    // TODO: Add conditional rendering for when question is populated
    return (
        <>
            {question && (
                <div id="question">
                    <div>
                        <Link to={"/questionBank"}>Go To question Bank</Link>
                    </div>
                    <div>
                        <h1 id="sn">QUESTION {question.sn}</h1>

                        <p id="quest">{question.question}</p>
                        <div className="option">
                            <p>A: {question.options.A} </p>
                            <p>B: {question.options.B} </p>
                            <p>C: {question.options.C} </p>
                            <p>D: {question.options.D} </p>
                            <p>E: {question.options.E} </p>
                        </div>
                        <div className="controls">
                            <Form
                                action={
                                    !index
                                        ? `edit`
                                        : `questions/${question.id}/edit`
                                }
                            >
                                <button type="submit">Edit</button>
                            </Form>
                            <Form
                                method="post"
                                action={
                                    !index
                                        ? `destroy`
                                        : `questions/${question.id}/destroy`
                                }
                                onSubmit={async (event) => {
                                    if (
                                        !confirm(
                                            "Please confirm you want to delete this record."
                                        )
                                    ) {
                                        event.preventDefault()
                                    }
                                }}
                            >
                                <button type="submit">Delete</button>
                            </Form>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
