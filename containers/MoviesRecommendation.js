import React from "react";
import { connect } from "react-redux";
import {
    handleRequestByMovieId,
    handleRequestForRecommendation,
    getMovieDetailsForRecommendedMovies,
    clearMovieDetailsForRecommendedMovies
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

class MoviesRecommendation extends React.Component {

    render() {
        const listOfMovies = this.props.recommendationMovies.map((movie, index) => {
            const genresName = getGenresName(movie.genre_ids, this.props.genres);
            const genres = genresName.map((genre, index) => (
                <li key={index}>{genre}</li>
            ));
            return (
                <li
                    key={index}
                    onMouseEnter={this.props.getMovieDetailsForRecommendedMovies.bind(this, movie, index)}
                    onMouseLeave={this.props.clearMovieDetailsForRecommendedMovies.bind(this, movie, index)}
                    onClick={this.props.handleRequestByMovieId.bind(this, movie.id)}
                >
                    {movie.focusedImg ? (
                        <>
                            <div className="details">
                                <h3><strong>{movie.title}</strong></h3>
                                <ul className="genres">{genres}</ul>
                                <p className="rating">{movie.vote_average}</p>
                            </div>
                        </>) : (
                        <div className="details">
                            <img src={"http://image.tmdb.org/t/p/w154/" + movie.poster_path}/>
                        </div>
                    )}
                </li>
            );
        });
            return (
                <>
                    <ul className="list">{listOfMovies}</ul>
                </>
            );
    }
}

const mapStateToProps = (state) => {
    return{
        recommendationMovies: state.recommendationMovies,
        genres: state.genres,
        focusedImg: state.focusedImg
    }
};

const mapDispatchToProps = (dispatch) => {
    return{

        handleRequestByMovieId: (movieId, event) => {
            event.preventDefault();
            dispatch(handleRequestByMovieId(movieId));
            dispatch(handleRequestForRecommendation(movieId));
        },
        getMovieDetailsForRecommendedMovies: (movie, index) => {
            dispatch(getMovieDetailsForRecommendedMovies(movie, index));
        },
        clearMovieDetailsForRecommendedMovies: (movie, index) => {
            dispatch(clearMovieDetailsForRecommendedMovies(movie, index));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviesRecommendation);