import axios from "axios";


export default axios.create({
    baseURL: 'https://react-quiz-7eef0-default-rtdb.europe-west1.firebasedatabase.app'
})

//добавляем кастомную ссылку в аксиос из фаербэйс для работы с БД