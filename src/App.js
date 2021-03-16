import React, { Component } from 'react';
import Layout from "./hoc/Layout/Layout";
import Quiz from "./Container/quiz/quiz";
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import QuizCreator from "./Container/QuizCreator/QuizCreator";
import QuizList from "./Container/QuizList/QuizList";
import Auth from "./Container/Auth/Auth";
import {connect} from 'react-redux'
import Logout from "./Components/Logout/Logout";
import {autoLogin} from "./Redux/actions/auth";

class App extends Component{

    componentDidMount() {
        this.props.autoLogin() //обновление сессии
    }

    render() {

        let routes = (
            <Switch>
                <Route path='/auth' component={Auth} />
                <Route path='/quiz/:id' component={Quiz} />
                <Route path='/' exact component={QuizList} />
                <Redirect to='/' />
            </Switch>
        )

        if(this.props.isAuthenticated){
            routes = (
                <Switch>
                    <Route path='/quiz-creator' component={QuizCreator} />
                    <Route path='/quiz/:id' component={Quiz} />
                    <Route path='/logout' component={Logout} />
                    <Route path='/' exact component={QuizList} />
                    <Redirect to='/' />
                </Switch>
            )
        }

        return (
            <Layout>
                {routes} //вывод корректных роутов у зареганных и гостей
            </Layout>
        )
    }
}

function mapStateToProps(state){
    return {
        isAuthenticated: !!state.auth.token //проверка наличия токена авторизации для показания/скрытия контента
    }
}

function mapDispatchToProps(dispatch){
    return {
        autoLogin: () => dispatch(autoLogin())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));



// <Route path='/quiz/:id' component={Quiz} />



//Route







