import React from 'react'
import classes from './Active Quiz.css'
import AnswersList from "./Answers List/Answers List";

const ActiveQuiz = props => (
    <div className={classes.ActiveQuiz}>
        <p className={classes.Question}>
            <span>
                <strong>{ props.answerNumber }. </strong>
                { props.question }
            </span>

            <small>{props.answerNumber} из {props.quizLength}</small>
        </p>

        <AnswersList
            onAnswerClick={props.onAnswerClick}
            answers={props.answers}
            state={props.state}
        />
    </div>
    )


export default ActiveQuiz

// <AnswersList
// answers={props.answers}
// />