import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import RecommentationMoviesContainer from "../containers/RecommentationMoviesContainer";
import InputSearchContainer from "../containers/InputSearchContainer";
import { handleClickToTopRatedPath, addMovieToWatchListFromDetails, showWatchList} from "../actions";

class MovieDetailsContainer extends React.Component {

    render() {
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
                    <Link to="/mywatchlist" onClick={this.props.showWatchList.bind(this)}>List to watch</Link>
                    <InputSearchContainer/>
                </div>
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
                    <RecommentationMoviesContainer/>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return{
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
            console.error("action-movieId, movieTitle, moviePoster ", movieId, movieTitle, moviePoster);
            dispatch(addMovieToWatchListFromDetails(movieId, movieTitle, moviePoster));
        },
        showWatchList: () => {
            dispatch(showWatchList());
        }

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetailsContainer)
