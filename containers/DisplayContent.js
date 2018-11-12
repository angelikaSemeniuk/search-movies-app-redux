import React from "react";
import { connect } from "react-redux";
import { handleRequestForTopRated, handleRequestForGenres } from "../actions";

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
        const listOfMovies = this.props.topRatedMovies.map((movie, index) => {
            const genresName = getGenresName(movie.genre_ids, this.props.genres);
            const genres = genresName.map( (genre, index) => (
                <p key={index}>{genre}</p>
            ));
            return (
                <li key={index}>
                    <p>{movie.title}</p>
                    <p>{genres}</p>
                </li>
            )
        });
        return(
            <ul>{listOfMovies}</ul>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        topRatedMovies: state.topRatedMovies,
        genres: state.genres
    }
};

const mapDispatchToProps = (dispatch) => {
    return{
        handleRequestForTopRated : () => {
            dispatch(handleRequestForTopRated());
        },
        handleRequestForGenres: () => {
            dispatch(handleRequestForGenres());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayContent);