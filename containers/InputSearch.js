import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
    handleRequestByMovieId,
    handleRequestForRecommendation,
    addMovieToWatchList,
    getMovieDetailsForSearchedMovies,
    clearMovieDetailsForSearchedMovies,
    getClearSearchedMovie
} from "../actions";

const getGenresName = (movieGenreIds, genres) => {
    let genresOfMovie = [];
    if (genres.genres) {
        for(let i=0; i < movieGenreIds.length; i++) {
            for(let j=0; j < genres.genres.length; j++) {
                if (movieGenreIds[i] === genres.genres[j].id) {
                    genresOfMovie.push(genres.genres[j].name);
                }
            }
        }
    }
    return genresOfMovie;
};

class InputSearch extends React.Component {

    componentWillUnmount() {
        this.props.getClearSearchedMovie();
    }

    render() {
        const listOfMovies = this.props.searchedMovies.map((movie, index) => {
            const genresName = getGenresName(movie.genre_ids, this.props.genres);
            const genres = genresName.map( (genre, index) => (
                <li key={index}>{genre}</li>
            ));
            const alreadyAddedToWatchList = this.props.watchList.filter((movie) => {
                if(movie.title === movie.title) {
                    return movie.title
                }
            });
            return (
                <li
                    key={index}
                    onMouseEnter={this.props.getMovieDetailsForSearchedMovies.bind(this, movie, index)}
                    onMouseLeave={this.props.clearMovieDetailsForSearchedMovies.bind(this, movie, index)}
                >
                    <Link
                        to={{
                            pathname: "/movie",
                            search: "?id=" + movie.id,
                            addedToWatchList: "?list=" + movie.addedToWatchList
                        }}
                    >
                        {movie.focusedImg ? (
                            <>
                                <div className="details" >
                                    <h3><strong>{movie.title}</strong></h3>
                                    <ul className="genres">{genres}</ul>
                                    <p className="rating">{movie.vote_average}</p>
                                </div>
                            </> ) : (
                            <div className="details">
                                <img src={"http://image.tmdb.org/t/p/w154/" + movie.poster_path} />
                            </div>
                        )}

                    </Link>
                </li>
            )
        });
        return(
            <>
               <ul className="list">{listOfMovies}</ul>
             </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        searchedMovies: state.searchedMovies,
        genres: state.genres,
        watchList: state.watchList
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleRequestByMovieId: (movieId, event) => {
            event.preventDefault();
            dispatch(handleRequestByMovieId(movieId));
            dispatch(handleRequestForRecommendation(movieId));
        },
        addMovieToWatchList: (movie, index) => {
            dispatch(addMovieToWatchList(movie, index));
        },
        getMovieDetailsForSearchedMovies: (movie, index) => {
            dispatch(getMovieDetailsForSearchedMovies(movie, index));
        },
        clearMovieDetailsForSearchedMovies: (movie, index) => {
            dispatch(clearMovieDetailsForSearchedMovies(movie, index));
        },
        getClearSearchedMovie : () => {
            dispatch(getClearSearchedMovie());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(InputSearch)