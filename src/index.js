import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import {Route, Router, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import routes from './routes';
import reducer from './reducers';
import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import App from './components/main/App';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, {}, applyMiddleware(sagaMiddleware, logger()));
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={App}>
                {routes}
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root'));