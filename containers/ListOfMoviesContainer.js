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

class ListOfMoviesContainer extends React.Component {
    render () {
        console.error("Action-this.props.movie", this.props.movie);
        const genresName = getGenresName(this.props.movie.genre_ids, this.props.genres);
        const genres = genresName.map( (genre, index) => (
            <li key={index}>{genre}</li>
        ));
        return(
            <li key={this.props.movie.toString()}>
                <p onClick={this.props.handleRequestByMovieId.bind(this, this.props.movie.id)}><strong>{this.props.movie.title}</strong></p>
                <img src={"http://image.tmdb.org/t/p/w154/" + this.props.movie.poster_path}/>
                <ul>{genres}</ul>
            </li>
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
        handleRequestByMovieId: (movieId, event) => {
            event.preventDefault();
            dispatch(handleRequestByMovieId(movieId));
            dispatch(handleRequestForRecommendation(movieId));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ListOfMoviesContainer);