import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import RecommentationMoviesContainer from "../containers/RecommentationMoviesContainer";
import InputSearchContainer from "../containers/InputSearchContainer";
import { handleClickToTopRatedPath } from "../actions";

class MovieDetailsContainer extends React.Component {

    render() {
        const genres = this.props.movieGenres.map((genre,index) => (
            <li key={index}>{genre.name}</li>
        ));
        return(
            <>
                <Link to='/' onClick={this.props.handleClickToTopRatedPath.bind(this)}>TopRatedMovies</Link>
                <InputSearchContainer/>
                <div className="details">
                    <p>{this.props.movieTitle}</p>
                    <img src={"http://image.tmdb.org/t/p/w342/" + this.props.moviePoster}/>
                    <p dangerouslySetInnerHTML={{__html: "Original title" + this.props.movieOriginalTitle}}></p>
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
        movieTitle: state.movieTitle,
        movieOriginalTitle: state.movieOriginalTitle,
        moviePoster: state.moviePoster,
        movieGenres: state.movieGenres,
        movieOverview: state.movieOverview,
        movieReleasedDate: state.movieReleasedDate,
        movieRating: state.movieRating,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleClickToTopRatedPath: () => {
            dispatch(handleClickToTopRatedPath());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetailsContainer)
