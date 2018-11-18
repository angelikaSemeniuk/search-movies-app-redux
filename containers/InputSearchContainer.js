import React from "react";
import { connect } from "react-redux";
import {handleChangeOnInput, handleRequestByMovieId, handleRequestForRecommendation} from "../actions";

class InputSearchContainer extends React.Component {
    render() {
        const listOfMovies = this.props.searchedMovies.map((movie, index) => {
            return (
                <li key={index}>
                    <p onClick={this.props.handleRequestByMovieId.bind(this, movie.id)}><strong>{movie.title}</strong></p>
                    <img src={"http://image.tmdb.org/t/p/w92/" + movie.poster_path}/>
                    <p>{movie.vote_average}</p>
                    <p>{movie.release_date.slice(0,4)}</p>
                </li>
            )
        });
        return(
            <>
                <div className="search-container">
                    <input
                        type="search"
                        value={this.props.inputValue}
                        onChange={this.props.handleChangeOnInput.bind(this)}
                        placeholder="Search movie..."
                    />
                </div>
                {this.props.inputValue && <ul>{listOfMovies}</ul>}
             </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        inputValue: state.inputValue,
        searchedMovies: state.searchedMovies
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleChangeOnInput: (event) => {
            dispatch(handleChangeOnInput(event.target.value));
        },
        handleRequestByMovieId: (movieId, event) => {
            event.preventDefault();
            dispatch(handleRequestByMovieId(movieId));
            dispatch(handleRequestForRecommendation(movieId));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(InputSearchContainer)