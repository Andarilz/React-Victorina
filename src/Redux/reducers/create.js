import {AUTH_LOGOUT, CREATE_QUIZ_QUESTION, FINISH_CREATE_QUIZ, RESET_QUIZ_CREATION} from "../actions/actionTypes";

const initialState = {
    quiz: []
}


export default function createReducer(state = initialState, action){
    if(action.type === CREATE_QUIZ_QUESTION){
        return {
            ...state,
            quiz: [...state.quiz, action.item]
        }
    } else if(action.type === RESET_QUIZ_CREATION){
        return {
            ...state, quiz: []
        }
    }

    return state
}

//прописываем логику редьюсерам