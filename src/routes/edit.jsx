import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom"
import { updateQuestion, getQuestion } from "../questions"
import "./edit.css"

export async function loader({ params }) {
    const question = await getQuestion(params.questionId)
    return question
}

export async function action({ request, params }) {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    const updates = {
        question: data.question,
        options: {
            A: data.A,
            B: data.B,
            C: data.C,
            D: data.D,
            E: data.E,
        },
        answer: data.answer,
    }
    await updateQuestion(params.questionId, updates)
    return redirect(`../questions/${params.questionId}`)
}

export default function EditQuestion() {
    const { question } = useLoaderData()
    const navigate = useNavigate()

    return (
        <Form method="post" id="question-form">
            <div>
                <label className="label">Question</label>
                <input
                    className="quest"
                    placeholder="Enter Question"
                    aria-label="question"
                    type="text"
                    name="question"
                    defaultValue={question.question}
                />
            </div>

            <div>
                <label className="label">Options</label>
                <label htmlFor="A">A</label>
                <input
                    defaultValue={question.options.A}
                    type="text"
                    name="A"
                    id="A"
                />
                <label htmlFor="B">B</label>
                <input
                    defaultValue={question.options.B}
                    type="text"
                    name="B"
                    id="B"
                />
                <label htmlFor="C">C</label>
                <input
                    defaultValue={question.options.C}
                    type="text"
                    name="C"
                    id="C"
                />
                <label htmlFor="D">D</label>
                <input
                    defaultValue={question.options.D}
                    type="text"
                    name="D"
                    id="D"
                />
                <label htmlFor="E">E</label>
                <input
                    defaultValue={question.options.E}
                    type="text"
                    name="E"
                    id="E"
                />
            </div>

            <p className="label">Answer</p>
            <div className="options">
                <label>
                    <input
                        defaultChecked={question.answer == "A"}
                        type="radio"
                        name="answer"
                        value="A"
                    />
                    A
                </label>
                <label>
                    <input
                        defaultChecked={question.answer == "B"}
                        type="radio"
                        name="answer"
                        value="B"
                    />
                    B
                </label>
                <label>
                    <input
                        defaultChecked={question.answer == "C"}
                        type="radio"
                        name="answer"
                        value="C"
                    />
                    C
                </label>
                <label>
                    <input
                        defaultChecked={question.answer == "D"}
                        type="radio"
                        name="answer"
                        value="D"
                    />
                    D
                </label>
                <label>
                    <input
                        defaultChecked={question.answer == "E"}
                        type="radio"
                        name="answer"
                        value="E"
                    />
                    E
                </label>
            </div>

            <div>
                <button type="submit">Save</button>
                <button
                    type="button"
                    onClick={() => {
                        navigate(-1)
                    }}

                    // 🧐 Why is there no event.preventDefault on the button?

                    // A <button type="button">, while seemingly redundant, is the HTML way of preventing a button from submitting its form.
                >
                    Cancel
                </button>
            </div>
        </Form>
    )
}
