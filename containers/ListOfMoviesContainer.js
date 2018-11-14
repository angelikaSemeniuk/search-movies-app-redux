import React from "react";
import { connect } from "react-redux";
import { handleRequestByMovieId, handleRequestForRecommendation, addMovieToWatchList } from "../actions";

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
        const genresName = getGenresName(this.props.movie.genre_ids, this.props.genres);
        const genres = genresName.map( (genre, index) => (
            <li key={index}>{genre}</li>
        ));
        const alreadyAddedToWatchList = this.props.watchList.filter((movie) => {
            if(movie.title === this.props.movie.title) {
               return movie.title
            }
        });
        return(
            <li key={this.props.movie.toString()}>
                <p onClick={this.props.handleRequestByMovieId.bind(this, this.props.movie.id)}><strong>{this.props.movie.title}</strong></p>
                <img src={"http://image.tmdb.org/t/p/w154/" + this.props.movie.poster_path}/>
                <ul>{genres}</ul>
                <p>{this.props.movie.vote_average}</p>
                {alreadyAddedToWatchList.length || this.props.movie.addedToWatchList ?
                    <button disabled>Add to watch list</button> :
                    <button onClick={this.props.addMovieToWatchList.bind(this, this.props.movie, this.props.index)}>Add to watch list</button>
                }
            </li>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        topRatedMovies: state.topRatedMovies,
        genres: state.genres,
        watchList: state.watchList
    }
};

const mapDispatchToProps = (dispatch) => {
    return{
        handleRequestByMovieId: (movieId, event) => {
            event.preventDefault();
            dispatch(handleRequestByMovieId(movieId));
            dispatch(handleRequestForRecommendation(movieId));
        },
        addMovieToWatchList: (movie, index) => {
            dispatch(addMovieToWatchList(movie, index));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ListOfMoviesContainer);