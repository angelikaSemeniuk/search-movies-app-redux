import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PaginationContainer from "../containers/PaginationContainer";
import InputSearchContainer from "../containers/InputSearchContainer";
import ListOfMoviesContainer from "../containers/ListOfMoviesContainer";
import {
    handleRequestForTopRated,
    handleRequestForGenres,
    handleRequestByMovieId,
    handleRequestForRecommendation,
    handleChangeOfInput,
    handleClickToTopRatedPath,
    showWatchList
} from "../actions";

class DisplayContent extends React.Component {

    componentDidMount() {
        this.props.handleRequestForTopRated();
        this.props.handleRequestForGenres();
    }
    render() {
        return(
            <>
                <div className="navigation">
                    <Link to='/' onClick={this.props.handleClickToTopRatedPath.bind(this)}>Top Rated Movies</Link>
                    <Link to="/mywatchlist" onClick={this.props.showWatchList.bind(this)}>List to watch</Link>
                    <InputSearchContainer/>
                </div>
                <ul className="list">
                    {this.props.topRatedMovies.map((movie, index) => {
                        return <ListOfMoviesContainer
                            key={movie.id.toString()}
                            movie={movie}
                            index={index}
                        />
                    })
                    }
                </ul>
                <div className="pagination">
                    <PaginationContainer/>
                </div>
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
        },
        handleClickToTopRatedPath: () => {
            dispatch(handleClickToTopRatedPath());
        },
        showWatchList: () => {
            dispatch(showWatchList());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayContent);