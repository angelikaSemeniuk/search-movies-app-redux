import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import InputSearch from "./InputSearch";
import MovieListItem from "./MovieListItem";
import {
    handleRequestForTopRated,
    handleRequestForGenres,
    handleChangeOfInput,
    handleClickToTopRatedPath,
    showWatchList
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
                    <Link to='/' onClick={this.props.handleClickToTopRatedPath.bind(this)}>Top Rated Movies</Link>
                    <Link to="/list-to-watch" onClick={this.props.showWatchList.bind(this)}>List to watch</Link>
                    <InputSearch/>
                </div>
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
        handleClickToTopRatedPath: () => {
            dispatch(handleClickToTopRatedPath());
        },
        showWatchList: () => {
            dispatch(showWatchList());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);