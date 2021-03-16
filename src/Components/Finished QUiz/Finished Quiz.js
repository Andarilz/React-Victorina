import React from 'react'
import classes from './Finished Quiz.css'
import Button from "../UI/Button/Button";
import {Link} from "react-router-dom";


const FinishedQuiz = props => { //считаем верные ответы
    const successCount = Object.keys(props.results).reduce((total, key)=>{
        if(props.results[key] === 'success'){
            total++
        }
        return total
    }, 0)

    return ( //раскрашиваем итоги
        <div className={classes.FinishedQuiz}>
            <ul>
                { props.quiz.map((quizItem, index) => {
                    const cls = [
                        ' fa ',
                        props.results[quizItem.id] === 'error' ? ' fa-times ' : ' fa-check ',
                        classes[props.results[quizItem.id]]
                    ]
                    return ( //как на какие вопросы ответили
                        <li key={index}>
                            <strong>{index + 1}. </strong>
                            {quizItem.question}
                            <i className={cls.join(' ')} />
                        </li>
                    )
                })
                }
            </ul>

            <p>Верно {successCount} из {props.quiz.length}</p>

            <div>
                <Button onClick={props.onRetry} type='primary'>Повторить</Button>
                <Link to='/' >
                    <Button type='success'>Вернуться к началу</Button>
                </Link>


            </div>
        </div>
    )
}

export default FinishedQuiz