import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addMovieToWatchList, getMovieDetails, clearMovieDetails } from "../actions";

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

class MovieListItem extends React.Component {
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
            <li
                key={this.props.movie.toString()}
                onMouseEnter={this.props.getMovieDetails.bind(this, this.props.movie, this.props.index)}
                onMouseLeave={this.props.clearMovieDetails.bind(this, this.props.movie, this.props.index)}
            >
                <Link
                    to={{
                        pathname: "/movie",
                        search: "?id=" + this.props.movie.id,
                        addedToWatchList: "?list=" + this.props.movie.addedToWatchList
                    }}
                >
                    {this.props.movie.focusedImg ? (
                        <>
                            <div className="details" >
                                <h3><strong>{this.props.movie.title}</strong></h3>
                                <ul className="genres">{genres}</ul>
                                <p className="rating">{this.props.movie.vote_average}</p>
                            </div>
                        </> ) : (
                        <div className="details">
                            <img src={"http://image.tmdb.org/t/p/w154/" + this.props.movie.poster_path} />
                        </div>
                    )}
                </Link>
                {alreadyAddedToWatchList.length || this.props.movie.addedToWatchList ?
                    <button  disabled>Add to watch list</button> :
                    <button className="addButton" onClick={this.props.addMovieToWatchList.bind(this, this.props.movie, this.props.index)}>Add to watch list</button>
                }
            </li>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        topRatedMovies: state.topRatedMovies,
        genres: state.genres,
        watchList: state.watchList,
        focusedImg: state.focusedImg
    }
};

const mapDispatchToProps = (dispatch) => {
    return{
        addMovieToWatchList: (movie, index) => {
            dispatch(addMovieToWatchList(movie, index));
        },
        getMovieDetails: (movie, index) => {
            dispatch(getMovieDetails(movie, index));
        },
        clearMovieDetails: (movie, index) => {
            dispatch(clearMovieDetails(movie, index));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieListItem);