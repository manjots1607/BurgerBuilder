import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore,applyMiddleware,compose,combineReducers} from 'redux';
import thunk from "redux-thunk";
import {Provider} from 'react-redux';
import reducer from "./store/reducers/reducers";
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import orderReducer from './store/reducers/orderReducer';
import authReducer from './store/reducers/authReducer';

const composeEnhancer= window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const logger=store=>{
    return next=>{
        return action=>{
            console.log("[middleware] : ",action);
            return next(action);
        }
    }
};
const rootReducer=combineReducers({
    burgerBuilder:reducer,
    order:orderReducer,
    auth:authReducer
});
const store=createStore(rootReducer,composeEnhancer(applyMiddleware(logger,thunk)));

const app=(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>

    </Provider>
)
ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
