import React from "react";
import { connect } from "react-redux";
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import DisplayContent from "../containers/DisplayContent";
//import MovieDetailsContainer from "../containers/MovieDetailsContainer";

class TestApp extends React.Component {
    render() {
        return(
            <Router>
                <div>
                    <Route
                        path="/"
                        render={() => (
                            this.props.ifMovieDetailsReceived ? <Redirect to="/moviedetails"/> : <DisplayContent/>

                        )}
                    />
                    <Route path="/moviedetails"/>
                </div>
            </Router>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        ifMovieDetailsReceived: state.ifMovieDetailsReceived
    }
};

export default connect(mapStateToProps, null)(TestApp)