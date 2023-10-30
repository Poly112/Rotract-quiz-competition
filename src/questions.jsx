import localforage from "localforage"
import sortBy from "sort-by"

function set(questions) {
    return localforage.setItem("questions", questions)
}

export async function createQuestion({ question, options, answer }) {
    let id = Math.random().toString(36).substring(2, 9)
    const questionObj = {
        id,
        question,
        options,
        answer,
        createdAt: Date.now(),
    }
    const questions = await getQuestions()
    questions.unshift(questionObj)
    await set(questions)
    return questionObj
}

export async function getQuestions() {
    let questions = await localforage.getItem("questions")
    if (!questions) questions = []
    return questions.sort(sortBy("createdAt"))
}

export async function getQuestion(id) {
    let questions = await localforage.getItem("questions")
    let question = questions.find((question) => question.id === id)
    return question
        ? {
              question: {
                  ...question,
                  sn: questions.indexOf(question) + 1,
              },
          }
        : null
}

export async function updateQuestion(id, updates) {
    let questions = await localforage.getItem("questions")
    let question = questions.find((question) => question.id === id)
    if (!question) throw new Error("No question found for", id)
    Object.assign(question, updates)
    await set(questions)
    return question
}

export async function deleteQuestion(id) {
    let questions = await localforage.getItem("questions")
    let index = questions.findIndex((question) => question.id === id)
    if (index > -1) {
        questions.splice(index, 1)
        await set(questions)
        return true
    }
    return false
}
