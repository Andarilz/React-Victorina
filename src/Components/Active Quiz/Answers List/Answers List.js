import React from 'react'
import classes from './Answers List.css'
import AnswerItem from "./Answer Item/Answer Item";


const AnswersList = props => { //выводим список ответов
    return (
    <ul className={classes.AnswersList}>
        {props.answers.map((answer, index) => {
            return (
                <AnswerItem
                    onAnswerClick={props.onAnswerClick}
                    answer={answer}
                    key={index}
                    state={props.state ? props.state[answer.id] : null}
                />
            )
        })}
    </ul>
    )
}


export default AnswersList




