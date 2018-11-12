import React from "react";
import { connect } from "react-redux";
import { handleRequestForTopRated, handleRequestForGenres } from "../actions";

const getGeneresName = (movieGenreIds, genres) => {
    let genresOfMovie = [];
    let genresOfMovie2 = false;
    if (genres.genres) {
        for(let i=0; i < movieGenreIds.length; i++) {
            for(let j=0; j < genres.genres.length; j++) {
                if (movieGenreIds[i] === genres.genres[j].id) {
                    genresOfMovie.push(genres.genres[j].name);
                    genresOfMovie2 = true;
                }
            }
        }
    }
    console.error("action-getGenresName", genresOfMovie);
    return genresOfMovie;
};

class DisplayContent extends React.Component {

    componentDidMount() {
        this.props.handleRequestForTopRated();
        this.props.handleRequestForGenres();
    }
    render() {
        const listOfMovies = this.props.topRatedMovies.map((movie, index) => {
            const generesName = getGeneresName(movie.genre_ids, this.props.genres);
            const generes = generesName.map( (gener, index) => (
                <p key={index}>{gener}</p>
            ));
            return (
                <li key={index}>
                    <p>{movie.title}</p>
                    <p>{generes}</p>
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