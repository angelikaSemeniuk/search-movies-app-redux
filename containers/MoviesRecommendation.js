import React from "react";
import { connect } from "react-redux";
import { handleRequestByMovieId, handleRequestForRecommendation } from "../actions";

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
            const genres = genresName.map( (genre, index) => (
                <li key={index}>{genre}</li>
            ));
            return (
                <li key={index}>
                    <p onClick={this.props.handleRequestByMovieId.bind(this, movie.id)}><strong>{movie.title}</strong></p>
                    <img src={"http://image.tmdb.org/t/p/w154/" + movie.poster_path}/>
                    <p>{movie.vote_average}</p>
                    <ul>{genres}</ul>
                </li>
            )
        });
        return(
            <>
                <ul>{listOfMovies}</ul>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        recommendationMovies: state.recommendationMovies,
        genres: state.genres,
    }
};

const mapDispatchToProps = (dispatch) => {
    return{

        handleRequestByMovieId: (movieId, event) => {
            event.preventDefault();
            dispatch(handleRequestByMovieId(movieId));
            dispatch(handleRequestForRecommendation(movieId));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MoviesRecommendation);