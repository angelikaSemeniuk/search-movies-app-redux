import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteFromWatchList, handleClickToTopRatedPath  } from "../actions";
import InputSearch from "./InputSearch";


class ListToWatch extends React.Component {

    render () {
        const listItems = this.props.watchList.map((movie, index) => (
            <li key={index}>
                <img src={"http://image.tmdb.org/t/p/w154/" + movie.image} />
                <p>{movie.title}</p>
                <button onClick={this.props.deleteFromWatchList.bind(this, index)}>X</button>
            </li>
        ));
        return (
            <>
                <div className="navigation">
                    <Link to='/'>Top Rated Movies</Link>
                    <Link to="/list-to-watch">List to watch</Link>
                    <InputSearch/>
                </div>
                <ul>{listItems}</ul>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        watchList: state.watchList,
        listShown: state.listShown
    }
};

const mapDispatchToState = (dispatch) => {
    return {
        deleteFromWatchList: (index) => {
            dispatch(deleteFromWatchList(index));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToState)(ListToWatch)