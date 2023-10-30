import { redirect } from "react-router-dom"
import { deleteQuestion } from "../questions"

export async function action({ params }) {
    await deleteQuestion(params.questionId)
    return redirect("/admin")
}
