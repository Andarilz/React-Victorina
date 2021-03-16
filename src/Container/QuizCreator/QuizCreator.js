import React, {Component, Fragment} from 'react'
import classes from './QuizCreator.css'
import Button from "../../Components/UI/Button/Button";
import {CreateControl, Validate, ValidateForm} from '../../Form/FormFraemwork'
import Input from "../../Components/UI/Input/Input";
import Select from "../../Components/UI/Select/Select";
import {connect} from "react-redux";
import {createQuizQuestion, finishCreateQuiz} from "../../Redux/actions/create";

//создаем тут тесты

function createOptionControl(number){
    return CreateControl({
        label: `Введите вопрос ${number}`,
        errorMessage: 'Вопрос не может быть пустым',
        id: number
    }, {required: true})
}

function createFormControls(){
    return {
        question: CreateControl({
            label: 'Введите вопрос',
            errorMessage: 'Вопрос не может быть пустым'
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4)
    }
}

export class QuizCreator extends Component{

    state = {
        isFormValid: false,
        formControls: createFormControls(),
        rightAnswerId: 1
    }

    submitHandler = event => {
        event.preventDefault()
    }

    addQuestionHandler = event => {
        event.preventDefault()

        const {question, option1, option2, option3, option4} = this.state.formControls

        const questionItem = {
            question: question.value,
            id: this.props.quiz.length + 1,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id},
            ]
        }

        this.props.createQuizQuestion(questionItem)

        this.setState({
            isFormValid: false,
            formControls: createFormControls(),
            rightAnswerId: 1
        })
    }

    createQuizHandler = event => {
        event.preventDefault()

            this.setState({
                quiz: [],
                isFormValid: false,
                formControls: createFormControls(),
                rightAnswerId: 1
            })

            this.props.finishCreateQuiz()
    }

    changeHandler = (value, controlName) => {

        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}
        control.touched = true
        control.value = value
        control.valid = Validate(control.value, control.validation)

        formControls[controlName] = control

        this.setState({
            formControls,
            isFormValid: ValidateForm(formControls)
        })

    }

    selectChangeHandler = event => {
        this.setState({
            rightAnswerId: +event.target.value
        })
    }

    renderInputs () {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]

            return (
                <Fragment key={index}>
                <Input
                    label={control.label}
                    value={control.value}
                    valid={control.valid}
                    shouldValidate={!!control.validation}
                    touched={control.touched}
                    errorMessage={control.errorMessage}
                    onChange={event => this.changeHandler(event.target.value, controlName)}
                />

            { index === 0 ? <hr /> : null }
                </Fragment>
            )
        })
    }

    render(){

        const select = <Select
        label='Выберите правильный ответ'
        value={this.state.rightAnswerId}
        onChange={this.selectChangeHandler}
        options={[
            {text: 1, value: 1},
            {text: 2, value: 2},
            {text: 3, value: 3},
            {text: 4, value: 4},
        ]}
        />

        return(
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Создание теста</h1>

                    <form onSubmit={this.submitHandler}>

                        { this.renderInputs() }

                        { select }

                        <Button
                        type='primary'
                        onClick={this.addQuestionHandler}
                        disabled={!this.state.isFormValid}
                        >
                            Добавить вопрос
                        </Button>

                        <Button
                            type='success'
                            onClick={this.createQuizHandler}
                            disabled={this.props.quiz.length === 0}
                        >
                            Создать тест
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        quiz: state.create.quiz
    }
}

function mapDispatchToProps(dispatch){
    return {
        createQuizQuestion: items => dispatch(createQuizQuestion(items)), //формируем объект со всей инфой и вставляем его в БД
        finishCreateQuiz: () => dispatch(finishCreateQuiz())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)









