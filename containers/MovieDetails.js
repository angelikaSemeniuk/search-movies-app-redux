import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MoviesRecommendation from "../containers/MoviesRecommendation";
import InputSearch from "./InputSearch";
import {
    addMovieToWatchListFromDetails,
    handleRequestByMovieId,
    handleRequestForRecommendation,
    getClearReceivedMovie,
    handleChangeOnInput
} from "../actions";
import queryString from 'query-string';
import Loader from "react-loader";

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

        const infoOfMovie = this.props.receivedMovie.map ((movie) => {
            const genres = movie.genres.map( (genre, index) => (
                <li key={index}>{genre.name}</li>
            ));
            const alreadyAddedToWatchList = this.props.watchList.filter((item) => {
                if(item.title === movie.title) {
                    return item.title
                }
            });
            return (
                <>
                    <div className="movie-image">
                        <img src={"http://image.tmdb.org/t/p/w342/" + movie.image}/>
                    </div>
                    <div className="movie-info">
                        <h3>{movie.title}</h3>
                        <h4 dangerouslySetInnerHTML={{__html: "Original title : " + movie.originalTitle}}></h4>
                        <p className="released-date">{movie.releasedDate.slice(0,4)}</p>
                        <ul className="genres">{genres}</ul>
                        <p className="rating">{movie.rating}</p>
                        <p className="overview">{movie.overview}</p>
                        {
                            alreadyAddedToWatchList.length || this.props.addedToWatchList ?
                                <button disabled>Add to watch list</button> :
                                <button className="addButton" onClick={this.props.addMovieToWatchListFromDetails.bind(this, movie.id, movie.title, movie.image)}>Add to watch list</button>
                        }
                    </div>
                </>
            )

        });

        return(
            <>
                <div className="navigation">
                    <Link to='/'>Top Rated Movies</Link>
                    <Link to="/list-to-watch">List to watch</Link>
                    <div className="search-container">
                        <input
                            type="search"
                            value={this.props.inputValue}
                            onChange={this.props.handleChangeOnInput.bind(this)}
                            placeholder="Search movie..."
                        />
                    </div>
                </div>
                { this.props.inputValue ? <InputSearch/> : (
                    <>
                        <div className="movie">{infoOfMovie}</div>
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
        loaded: state.loaded,
        inputValue: state.inputValue
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
        },
        handleChangeOnInput: (event) => {
            dispatch(handleChangeOnInput(event.target.value));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails)