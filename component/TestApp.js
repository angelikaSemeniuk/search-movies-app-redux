import React from "react";
import { connect } from "react-redux";
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import DisplayContent from "../containers/DisplayContent";
import MovieDetailsContainer from "../containers/MovieDetailsContainer";
import WatchListContainer from "../containers/WatchListContainer";

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
                        render={() => (
                            this.props.listShown ? <Redirect to='/mywatchlist'/> : <DisplayContent/>
                        )}
                    />
                    <Route path="/mywatchlist" component={WatchListContainer}/>
                    <Route path="/moviedetails" component= {MovieDetailsContainer}/>
                </div>
            </Router>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        ifMovieDetailsReceived: state.ifMovieDetailsReceived,
        listShown: state.listShown
    }
};

export default connect(mapStateToProps, null)(TestApp)