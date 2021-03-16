import React, {Component} from 'react'
import classes from './QuizList.css'
import {NavLink} from "react-router-dom";
import Loader from "../../Components/UI/Loader/Loader";
import {connect} from 'react-redux'
import {fetchQuizes} from "../../Redux/actions/quiz";


 class QuizList extends Component{

    renderQuizes(){ //выводим ссылки на список тестов
        return this.props.quizes.map(quiz =>{
            return (
                    <li
                    key={quiz.id}
                    >
                        <NavLink
                            to={'/quiz/' + quiz.id}
                        >
                            {quiz.name}
                        </NavLink>
                    </li>
            )
        })
    }

     componentDidMount() {
        this.props.fetchQuizes()
    }

    render(){

        return(
            <div className={classes.QuizList}>
                <div>
                    <h1>Список тестов</h1>

                        { this.props.loading && this.props.quizes.length !== 0
                            ? <Loader />
                            : <ul> { this.renderQuizes()} </ul> }

                </div>
            </div>
        )
    }

}

function mapStateToProps(state){
    return{
        quizes: state.quiz.quizes,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch){
    return{
        fetchQuizes: () => dispatch(fetchQuizes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)








// async componentDidMount() {
//     try{
//         const res = await axios.get('/quizes.json')
//         const quizes = []
//
//         Object.keys(res.data).forEach((key,index )=> {
//             quizes.push({
//                 id: key,
//                 name: `Тест № ${index + 1}`
//             })
//         })
//
//         this.setState({
//             quizes,
//             loading: false
//         })
//     }catch(e){
//         console.error(e)
//     }
// }


// renderQuizes(){
//     return this.state.quizes.map(quiz =>{
//         return (
//             <li
//                 key={quiz.id}
//             >
//                 <NavLink
//                     to={'/quiz/' + quiz.id}
//                 >
//                     {quiz.name}
//                 </NavLink>
//             </li>
//         )
//     })
// }







//Quiz List


































