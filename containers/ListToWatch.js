import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteFromWatchList, handleChangeOnInput } from "../actions";
import InputSearch from "./InputSearch";


class ListToWatch extends React.Component {

    render () {
        const listItems = this.props.watchList.map((movie, index) => (
            <li key={index}>
                <img src={"http://image.tmdb.org/t/p/w154/" + movie.image} />
                <button className="delete-button" onClick={this.props.deleteFromWatchList.bind(this, index)}>Delete</button>
            </li>
        ));
        return (
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
                { this.props.inputValue ? <InputSearch/> : (
                    <>
                        {this.props.watchList.length ?
                            <ul className="my-list">{listItems}</ul> :
                            <p className="empty-list">Your list to watch is empty</p>
                        }
                    </>
                )}
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        watchList: state.watchList,
        inputValue: state.inputValue
    }
};

const mapDispatchToState = (dispatch) => {
    return {
        deleteFromWatchList: (index) => {
            dispatch(deleteFromWatchList(index));
        },
        handleChangeOnInput: (event) => {
            dispatch(handleChangeOnInput(event.target.value));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToState)(ListToWatch)