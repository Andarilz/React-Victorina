import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from "react-router-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from 'react-redux';
import rootReducer from "./Redux/reducers/rootReducer";
import {compose} from "redux";
import thunk from 'redux-thunk'


const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose; //подключение Redux-Dev-Tools



const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk) //подключение библиотеки для асинхронной работы с редаксом
    )
)

// ниже подключение реакт-редакса и редбюсеров в сторне

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
