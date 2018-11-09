import React from "react";
import { connect } from "react-redux";
import { handleRequestForTopRated } from "../actions";

class DisplayContent extends React.Component {

    componentDidMount() {
        this.props.handleRequestForTopRated();
    }
    render() {
        return(
            <h1>TopRated Movies</h1>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        handleRequestForTopRated : () => {
            dispatch(handleRequestForTopRated());
        }
    }
};

export default connect(null, mapDispatchToProps)(DisplayContent);