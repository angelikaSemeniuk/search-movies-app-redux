import React from "react";
import { connect } from "react-redux";
import { handlePreviousPage, handleNextPage } from "../actions";

const mapStateToProps = (state) => {
    console.error("action-STATE.CURRENTPAGE", state.currentPage);
    return {
        currentPage: state.currentPage,
        totalPages: state.totalPages,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handlePreviousPage : (currentPage) => {
            dispatch(handlePreviousPage(currentPage));
        },
        handleNextPage: (currentPage) => {
            console.error("action-currentPage", currentPage)
            dispatch(handleNextPage(currentPage));
        }
    }
}

class PaginationContainer extends React.Component {
    render() {
        return (
            <div className="pagination">
                {(this.props.currentPage !== 1) ? (
                    <button className="previousPage" onClick={this.props.handlePreviousPage.bind(this, this.props.currentPage)}>Previous page</button>
                ) : (
                    <button className="previousPage" disabled>Previous Page</button>
                )}
                <span className="currentPage" dangerouslySetInnerHTML={{__html: this.props.currentPage}}></span>
                <p className="numberOfPages" dangerouslySetInnerHTML={{__html: " of " + this.props.totalPages + " pages "}}></p>
                <button className="nextPage" onClick={this.props.handleNextPage.bind(this, this.props.currentPage)}>Next page</button>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaginationContainer);