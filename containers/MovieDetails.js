import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import MoviesRecommendation from "../containers/MoviesRecommendation";
import InputSearch from "./InputSearch";
import {
    handleClickToTopRatedPath,
    addMovieToWatchListFromDetails,
    showWatchList,
    handleRequestByMovieId, handleRequestForRecommendation
} from "../actions";
import queryString from 'query-string';
import Loader from "react-loader";

class MovieDetails extends React.Component {
    componentDidMount() {
        const params = queryString.parse(this.props.location.search);
        this.props.handleRequestByMovieId(params.id);
    }

    render() {
        const loaded = false;
        const genres = this.props.movieGenres.map((genre,index) => (
            <li key={index}>{genre.name}</li>
        ));
        const alreadyAddedToWatchList = this.props.watchList.filter((movie) => {
            if(movie.title === this.props.movieTitle) {
                return movie.title
            }
        });
        return(
            <>
                <div className="navigation">
                    <Link to='/' onClick={this.props.handleClickToTopRatedPath.bind(this)}>Top Rated Movies</Link>
                    <Link to="/list-to-watch" onClick={this.props.showWatchList.bind(this)}>List to watch</Link>
                    <InputSearch/>
                </div>
                {!loaded ? <Loader loaded={loaded} /> : (
                    <>
                        <div className="details">
                            <p>{this.props.movieTitle}</p>
                            <img src={"http://image.tmdb.org/t/p/w342/" + this.props.moviePoster}/>
                            {
                                alreadyAddedToWatchList.length || this.props.addedToWatchList ?
                                    <button disabled>Add to watch list</button> :
                                    <button onClick={this.props.addMovieToWatchListFromDetails.bind(this, this.props.movieId, this.props.movieTitle, this.props.moviePoster)}>Add to watch list</button>
                            }
                            <p dangerouslySetInnerHTML={{__html: "Original title  " + this.props.movieOriginalTitle}}></p>
                            <p>{this.props.movieReleasedDate.slice(0,4)}</p>
                            <ul>{genres}</ul>
                            <p>{this.props.movieRating}</p>
                            <p>{this.props.movieOverview}</p>
                        </div>
                        <div className="recommendation-container">
                            <MoviesRecommendation/>
                        </div>
                    </>
                )}
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        movieId: state.movieId,
        movieTitle: state.movieTitle,
        movieOriginalTitle: state.movieOriginalTitle,
        moviePoster: state.moviePoster,
        movieGenres: state.movieGenres,
        movieOverview: state.movieOverview,
        movieReleasedDate: state.movieReleasedDate,
        movieRating: state.movieRating,
        watchList: state.watchList,
        addedToWatchList: state.addedToWatchList
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleClickToTopRatedPath: () => {
            dispatch(handleClickToTopRatedPath());
        },
        addMovieToWatchListFromDetails: (movieId, movieTitle, moviePoster) => {
            // console.error("action-movieId, movieTitle, moviePoster ", movieId, movieTitle, moviePoster);
            dispatch(addMovieToWatchListFromDetails(movieId, movieTitle, moviePoster));
        },
        showWatchList: () => {
            dispatch(showWatchList());
        },
        handleRequestByMovieId: (movieId, event) => {
            dispatch(handleRequestByMovieId(movieId));
            dispatch(handleRequestForRecommendation(movieId));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails)
