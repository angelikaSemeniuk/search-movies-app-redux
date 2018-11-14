import React from "react";
import { connect } from "react-redux";
import PaginationContainer from "../containers/PaginationContainer";
import InputSearchContainer from "../containers/InputSearchContainer";
import { handleRequestForTopRated, handleRequestForGenres, handleRequestByMovieId, handleRequestForRecommendation, handleChangeOfInput } from "../actions";


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

class DisplayContent extends React.Component {

    componentDidMount() {
        this.props.handleRequestForTopRated();
        this.props.handleRequestForGenres();
    }
    render() {
        /*let filteredMovies = this.props.topRatedMovies.filter( (movie) => {
            return movie.title.toLowerCase().indexOf(this.props.inputValue.toLowerCase()) !== -1;
        });*/
        const listOfMovies = this.props.topRatedMovies.map((movie, index) => {
            const genresName = getGenresName(movie.genre_ids, this.props.genres);
            const genres = genresName.map( (genre, index) => (
                <li key={index}>{genre}</li>
            ));
            return (
                <li key={index}>
                    <p onClick={this.props.handleRequestByMovieId.bind(this, movie.id)}><strong>{movie.title}</strong></p>
                    <img src={"http://image.tmdb.org/t/p/w154/" + movie.poster_path}/>
                    <ul>{genres}</ul>
                </li>
            )
        });
        return(
            <>
                <InputSearchContainer/>
                <ul>{listOfMovies}</ul>
                <PaginationContainer/>
            </>
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
        handleRequestForTopRated : () => {
            dispatch(handleRequestForTopRated());
        },
        handleRequestForGenres: () => {
            dispatch(handleRequestForGenres());
        },
        handleRequestByMovieId: (movieId, event) => {
            event.preventDefault();
            dispatch(handleRequestByMovieId(movieId));
            dispatch(handleRequestForRecommendation(movieId));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayContent);