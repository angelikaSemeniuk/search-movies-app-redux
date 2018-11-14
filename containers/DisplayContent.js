import React from "react";
import { connect } from "react-redux";
import PaginationContainer from "../containers/PaginationContainer";
import InputSearchContainer from "../containers/InputSearchContainer";
import ListOfMoviesContainer from "../containers/ListOfMoviesContainer";
import { handleRequestForTopRated, handleRequestForGenres, handleRequestByMovieId, handleRequestForRecommendation, handleChangeOfInput } from "../actions";

class DisplayContent extends React.Component {

    componentDidMount() {
        this.props.handleRequestForTopRated();
        this.props.handleRequestForGenres();
    }
    render() {
        return(
            <>
                <InputSearchContainer/>
                <ul>
                    {this.props.topRatedMovies.map((movie, index) => {
                        return <ListOfMoviesContainer
                            movie={movie}
                            index={index}
                        />
                    })}
                </ul>
                <PaginationContainer/>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        topRatedMovies: state.topRatedMovies,
        genres: state.genres,
    }
};

const mapDispatchToProps = (dispatch) => {
    return{
        handleRequestForTopRated : () => {
            dispatch(handleRequestForTopRated());
        },
        handleRequestForGenres: () => {
            dispatch(handleRequestForGenres());
        },
        handleRequestByMovieId: (movieId, event) => {
            event.preventDefault();
            dispatch(handleRequestByMovieId(movieId));
            dispatch(handleRequestForRecommendation(movieId));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayContent);