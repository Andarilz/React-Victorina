import {
    FETCH_QUIZ_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS,
    IS_FINISHED, NEXT_QUESTION,
    QUIZ_SET_STATE, RETRY_HANDLER
} from "../actions/actionTypes";

const initialState = {
    quizes: [],
    loading: false,
    error: null,
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: null
}

export default function quizReducer(state = initialState, actions){
    if(actions.type === FETCH_QUIZES_START){
        return{
            ...state, loading: true
        }
    } else if(actions.type === FETCH_QUIZES_SUCCESS){
        return{
            ...state, loading: false, quizes: actions.quizes
        }
    } else if(actions.type === FETCH_QUIZES_ERROR){
        return{
            ...state, loading: false, error: actions.error
        }
    } else if(actions.type === FETCH_QUIZ_SUCCESS){
        return {
            ...state, loading: false, quiz: actions.quiz
        }
    } else if(actions.type === QUIZ_SET_STATE){
        return {
            ...state, answerState: actions.answerState, results: actions.results
        }
    }
    else if(actions.type === IS_FINISHED){
        return {
            ...state, isFinished: true
        }
    } else if(actions.type === NEXT_QUESTION){
        return {
            ...state, activeQuestion: actions.number, answerState: null
        }
    } else if(actions.type === RETRY_HANDLER){
        return {
            ...state, activeQuestion: 0, answerState: null, isFinished: false, results: {}
        }
    }
    return state
}

//прописываем логику для редьюсеров