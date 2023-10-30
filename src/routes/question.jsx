import { useLoaderData, Link } from "react-router-dom"
import { useState } from "react"
import "./question.css"

export default function Question() {
    const { question } = useLoaderData()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleModal = () => {
        setIsModalOpen((prev) => !prev)
    }

    return (
        <>
            <div className="question">
                <div className="quest">
                    <p>{question.question}</p>
                </div>
                <div className="options">
                    <p>A: {question.options.A}</p>
                    <p>B: {question.options.B}</p>
                    <p>C: {question.options.C}</p>
                    <p>D: {question.options.D}</p>
                    <p>E: {question.options.E}</p>
                </div>
                {isModalOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={handleModal}>
                                &times;
                            </span>
                            <div className="ok">
                                <p className="correct-option">
                                    {question.answer}
                                </p>
                                <p>{question.options[question.answer]}</p>
                            </div>
                        </div>
                    </div>
                )}
                <div className="controls">
                    <div className="answer">
                        <button onClick={handleModal}>Display Answer</button>
                    </div>
                    <div className="back">
                        <Link to={"/questionBank"}>Go Back</Link>
                    </div>
                </div>
            </div>
        </>
    )
}
