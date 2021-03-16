import React from 'react'
import classes from './Answer Item.css'

const AnserItem = props => {

    const cls = [classes.AnswerItem]

    if(props.state){
        cls.push(classes[props.state])
    }

    return ( //каждый отдельный элеиент ответа выводим
        <li
            className={cls.join(' ')}
            onClick={() => props.onAnswerClick(props.answer.id)}
        >
            { props.answer.text }
        </li>
    )
}

export default AnserItem






// { props.answer.text }