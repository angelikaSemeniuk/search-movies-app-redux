import React from "react";
import DisplayContent from "../containers/DisplayContent";
import PaginationContainer from "../containers/PaginationContainer";

class TestApp extends React.Component {
    render() {
        return(
            <div>
                <DisplayContent />
                <PaginationContainer/>
            </div>
        );
    }
}

export default TestApp