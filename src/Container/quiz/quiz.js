import React from 'react'
import classes from './quiz.css'
import ActiveQuiz from "../../Components/Active Quiz/Active Quiz";
import FinishedQuiz from "../../Components/Finished QUiz/Finished Quiz";
import Loader from "../../Components/UI/Loader/Loader";
import {connect} from "react-redux";
import {quizAnswerClick, fetchQuizById, retryHandler} from "../../Redux/actions/quiz";

//основная обертка, где мы выводим все элементы

class Quiz extends React.Component{

    componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id)
    }

    componentWillUnmount() {
        this.props.retryHandler()
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>

                    { this.props.loading || !this.props.quiz
                        ? <Loader/>
                        : this.props.isFinished
                            ? <FinishedQuiz
                                results={this.props.results}
                                quiz={this.props.quiz}
                                onRetry={this.props.retryHandler}
                            />
                            : <ActiveQuiz
                                onAnswerClick={this.props.quizAnswerClick}
                                quizLength={this.props.quiz.length}
                                answerNumber={this.props.activeQuestion + 1}
                                question={this.props.quiz[this.props.activeQuestion].question}
                                answers={this.props.quiz[this.props.activeQuestion].answers}
                                state={this.props.answerState}
                            />
                    }

                </div>
            </div>
        )
    }
}

function mapStateTOProps(state){
    return {
        results: state.quiz.results,
        isFinished: state.quiz.isFinished,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch){
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
        retryHandler: () => dispatch(retryHandler())
    }
}

export default connect(mapStateTOProps, mapDispatchToProps)(Quiz)













