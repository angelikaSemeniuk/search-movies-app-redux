import React from "react";
import { connect } from "react-redux";
import { handlePreviousPage, handleNextPage } from "../actions";

class Pagination extends React.Component {
    render() {
        return (
            <>
                {(this.props.currentPage !== 1) ? (
                    <button className="previousPage" onClick={this.props.handlePreviousPage.bind(this, this.props.currentPage)}>Previous page</button>
                ) : (
                    <button className="previousPage" disabled>Previous Page</button>
                )}
                <span className="currentPage" dangerouslySetInnerHTML={{__html: this.props.currentPage}}></span>
                <p className="numberOfPages" dangerouslySetInnerHTML={{__html: " of " + this.props.totalPages + " pages "}}></p>
                <button className="nextPage" onClick={this.props.handleNextPage.bind(this, this.props.currentPage)}>Next page</button>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentPage: state.currentPage,
        totalPages: state.totalPages,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handlePreviousPage : (currentPage) => {
            dispatch(handlePreviousPage(currentPage));
        },
        handleNextPage: (currentPage) => {
            dispatch(handleNextPage(currentPage));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);