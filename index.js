import React from "react";
import ReactDOM from "react-dom";
import { logger } from "redux-logger";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import reducer from "./reducer/index";
import App from "./component/App";

const middleware = applyMiddleware(thunk, logger); // logger as 2-nd argument
const store = createStore(reducer, middleware);
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);