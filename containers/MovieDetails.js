import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MoviesRecommendation from "../containers/MoviesRecommendation";
import InputSearch from "./InputSearch";
import {
    addMovieToWatchListFromDetails,
    handleRequestByMovieId,
    handleRequestForRecommendation,
    getClearReceivedMovie
} from "../actions";
import queryString from 'query-string';
import Loader from "react-loader";

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

class MovieDetails extends React.Component {
    componentDidMount() {
        const params = queryString.parse(this.props.location.search);
        const param2= queryString.parse(this.props.location.addedToWatchList);
        this.props.handleRequestByMovieId(params.id, param2.list);
    }

    componentWillUnmount() {
        this.props.getClearReceivedMovie();
    }

    render() {
        //const loaded = false;
        const alreadyAddedToWatchList = this.props.watchList.filter((movie) => {
            if(movie.title === this.props.receivedMovie.title) {
                return movie.title
            }
        });
        const infoOfMovie = this.props.receivedMovie.map ((movie) => {
            const genresName = getGenresName(movie.id, this.props.genres);
            const genres = genresName.map( (genre, index) => (
                <li key={index}>{genre}</li>
            ));
            return (
                <>
                    <p>{movie.title}</p>
                    <img src={"http://image.tmdb.org/t/p/w342/" + movie.image}/>
                    {
                        alreadyAddedToWatchList.length || this.props.addedToWatchList ?
                            <button disabled>Add to watch list</button> :
                            <button onClick={this.props.addMovieToWatchListFromDetails.bind(this, movie.id, movie.title, movie.image)}>Add to watch list</button>
                    }
                    <p dangerouslySetInnerHTML={{__html: "Original title  " + movie.originalTitle}}></p>
                    <p>{movie.releasedDate.slice(0,4)}</p>
                    <ul>{genres}</ul>
                    <p>{movie.rating}</p>
                    <p>{movie.overview}</p>
                </>
            )

        });

        return(
            <>
                <div className="navigation">
                    <Link to='/'>Top Rated Movies</Link>
                    <Link to="/list-to-watch">List to watch</Link>
                    <InputSearch/>
                </div>
                {!this.props.loaded ? <Loader loaded={this.props.loaded} /> : (
                    <>
                        <div>{infoOfMovie}</div>
                        <MoviesRecommendation/>
                    </>
                )}
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        genres: state.genres,
        receivedMovie: state.receivedMovie,
        watchList: state.watchList,
        addedToWatchList: state.addedToWatchList,
        loaded: state.loaded
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addMovieToWatchListFromDetails: (movieId, movieTitle, moviePoster) => {
            dispatch(addMovieToWatchListFromDetails(movieId, movieTitle, moviePoster));
        },
        handleRequestByMovieId: (movieId, addedToWatchList) => {
            dispatch(handleRequestByMovieId(movieId, addedToWatchList));
            dispatch(handleRequestForRecommendation(movieId));
        },
        getClearReceivedMovie: () => {
            dispatch(getClearReceivedMovie());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails)