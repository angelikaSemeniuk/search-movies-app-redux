import React from "react";
import { connect } from "react-redux";
import { handleRequestForTopRated } from "../actions";

class DisplayContent extends React.Component {

    componentDidMount() {
        this.props.handleRequestForTopRated();
    }
    render() {
        const listOgMovies = this.props.topRatedMovies.map((movie, index) => (
            <li key={index}>
                <p>{movie.title}</p>
            </li>
        ));
        return(
            <ul>{listOgMovies}</ul>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        topRatedMovies: state.topRatedMovies
    }
};

const mapDispatchToProps = (dispatch) => {
    return{
        handleRequestForTopRated : () => {
            dispatch(handleRequestForTopRated());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayContent);