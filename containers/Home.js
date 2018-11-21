import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import InputSearch from "./InputSearch";
import MovieListItem from "./MovieListItem";
import {
    handleRequestForTopRated,
    handleRequestForGenres,
    handleChangeOfInput, handleChangeOnInput
} from "../actions";

class Home extends React.Component {
    componentDidMount() {
        this.props.handleRequestForTopRated();
        this.props.handleRequestForGenres();
    }
    render() {
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
                {this.props.inputValue ?
                    <InputSearch/> : (
                    <>
                        <ul className="list">
                            {this.props.topRatedMovies.map((movie, index) => {
                                return <MovieListItem
                                    key={movie.id.toString()}
                                    movie={movie}
                                    index={index}
                                />
                            })
                            }
                        </ul>
                        <div className="pagination">
                            <Pagination/>
                        </div>
                    </>
                    )}
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        topRatedMovies: state.topRatedMovies,
        genres: state.genres,
        inputValue: state.inputValue,
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
        handleChangeOnInput: (event) => {
            dispatch(handleChangeOnInput(event.target.value));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);