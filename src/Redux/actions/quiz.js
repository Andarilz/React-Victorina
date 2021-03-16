import axios from "../../axios/axios-quiz";
import {
    FETCH_QUIZ_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS,
    IS_FINISHED, NEXT_QUESTION,
    QUIZ_SET_STATE, RETRY_HANDLER
} from "./actionTypes";

//firebase get all

export function fetchQuizes(){
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try{
            const res = await axios.get('/quizes.json')
            const quizes = []

            Object.keys(res.data).forEach((key,index )=> {
                quizes.push({
                    id: key,
                    name: `Тест № ${index + 1}`
                })
            })

            dispatch(fetchQuizesSuccess(quizes))
        }catch(e){
            dispatch(fetchQuizesError(e))
        }
    }
}

export function fetchQuizesStart(){
    return{
        type: FETCH_QUIZES_START
    }
}

export function fetchQuizesSuccess(quizes){
    return{
        type: FETCH_QUIZES_SUCCESS,
        quizes
    }
}

export function fetchQuizesError(e){
    return{
        type: FETCH_QUIZES_ERROR,
        payload: e
    }
}

//firebase get id

export function fetchQuizById(quizId){
    return async dispatch => {
        dispatch(fetchQuizesStart()) //loading грузит

        try {
            const response = await axios.get(`/quizes/${quizId}.json`)
            const quiz = response.data

            dispatch(fetchQuizSuccess(quiz))

        } catch(e){
            dispatch(fetchQuizesError(e))
        }
    }
}

export function fetchQuizSuccess(quiz){
    return {
        quiz,
        type: FETCH_QUIZ_SUCCESS
    }
}

export function quizSetState(answerState, results){
    return {
        type: QUIZ_SET_STATE,
        answerState,
        results
    }
}

export function finishQuiz(){
    return {
        type: IS_FINISHED
    }
}

export function quizNextQuestion(number){
    return{
        type: NEXT_QUESTION,
        number
    }
}

export function quizAnswerClick(answerId){
    return (dispatch, getState) => {

        const state = getState().quiz

        if(state.answerState){
            const key = Object.keys(state.answerState)[0]
            if(state.answerState[key] === 'success'){
                return
            }
        }
        const quizBlock = state.quiz[state.activeQuestion]
        const results = state.results

        if(quizBlock.rightAnswerId === answerId){ //ответили верно
            if(!results[quizBlock.id]){ //если в бд лежит верный ответ
                results[quizBlock.id] = 'success' //пометили верный ответ
            }
            dispatch(quizSetState({[answerId]: 'success'}, results)) //меняем стейт
            const timeout = window.setTimeout(() => {
                if(isQuizFinished(state)){
                    dispatch(finishQuiz())
                }else{
                    dispatch(quizNextQuestion(state.activeQuestion + 1))
                }
                window.clearTimeout(timeout)
            }, 1000)

        } else { //ответили неверно
            results[quizBlock.id] = 'error' //пометил ошибку
            dispatch(quizSetState({[answerId]: 'error', results}, results))
        }
    }
} //верно ответили или нет

export function isQuizFinished(state){
    return state.activeQuestion + 1 === state.quiz.length
} //проверяем завершен ли тест

export function retryHandler(){
    return {
        type: RETRY_HANDLER
    }
}




