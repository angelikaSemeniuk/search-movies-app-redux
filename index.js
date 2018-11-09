import React from "react";
import ReactDOM from "react-dom";
import { logger } from "redux-logger";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import reducer from "./reducer/index";
import TestApp from "./component/TestApp";

const middleware = applyMiddleware(thunk, logger);
const store = createStore(reducer, middleware);
ReactDOM.render(
    <Provider store={store}>
        <TestApp />
    </Provider>,
    document.getElementById("root")
);