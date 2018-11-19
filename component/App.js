import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MovieDetails from "../containers/MovieDetails";
import ListToWatch from "../containers/ListToWatch";
import Home from "../containers/Home";

const App = () => {
    return(
        <Router>
            <>
                <Route exact path="/" component={Home} />
                <Route path="/movie" component={MovieDetails} />
                <Route path="/list-to-watch" component={ListToWatch}/>
            </>
        </Router>
    );
};

export default App;