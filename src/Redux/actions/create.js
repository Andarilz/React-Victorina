import {CREATE_QUIZ_QUESTION, FINISH_CREATE_QUIZ, RESET_QUIZ_CREATION} from "./actionTypes";
import axios from "../../axios/axios-quiz";

export function createQuizQuestion(item) {
    return {
        item,
        type: CREATE_QUIZ_QUESTION
    }
}

//firebase post

export function finishCreateQuiz() {
    return async (dispatch, getState) => {
        await axios.post('/quizes.json', getState().create.quiz)
        dispatch(resetQuizCreation())
    }
}

export function resetQuizCreation() {
    return {
        type: RESET_QUIZ_CREATION
    }
}

//создаем новый тест