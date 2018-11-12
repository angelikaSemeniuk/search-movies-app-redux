const initialState = {receiveData : false, topRatedMovies: [], currentPage: null, totalPages: null, error: null};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "RECEIVE_DATA": {
            return Object.assign({}, state, {
                receiveData: true
            })
        }
        case "RECEIVE_TOP_RATED_MOVIES": {
            return Object.assign({}, state, {
                topRatedMovies: action.value
            })
        }
        case "RECEIVE_CURRENT_PAGE": {
            return Object.assign({}, state, {
                currentPage: action.value
            })
        }
        case "RECEIVE_TOTAL_PAGES": {
            return Object.assign({}, state, {
                totalPages: action.value
            })
        }
        case "CATCH_ERROR": {
            return Object.assign({}, state, {
                error: action.value
            })
        }
        default:
            return state;

    }
};

export default reducer;