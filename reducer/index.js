const initialState = {
    topRatedMovies: [],
    genres: [],
    currentPage: null,
    totalPages: null,
    error: null,
    loaded: false,
    receivedMovie: [],
    recommendationMovies: [],
    inputValue: "",
    searchedMovies: [],
    watchList: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "RECEIVE_TOP_RATED_MOVIES": {
            return Object.assign({}, state, {
                topRatedMovies: action.value
            })
        }
        case "ADD_ATTRIBUTE_FOR_EACH_MOVIE": {
            return Object.assign({}, state, {
                topRatedMovies: state.topRatedMovies.map((movie) => {
                    return movie = Object.assign({}, movie, {
                        addedToWatchList: false,
                        focusedImg: false
                    })
                })
            })
        }
        case "RECEIVE_GENRES": {
            return Object.assign({}, state, {
                genres: action.value
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
        case "RECEIVE_MOVIE_DETAILS": {
            return Object.assign({}, state, {
                loaded: true,
                inputValue: "",
                searchedMovies: [],
                receivedMovie: []


            })
        }
        case "RECEIVE_MOVIE_INFO_BY_ID": {
            return Object.assign({}, state, {
                receivedMovie: [...state.receivedMovie, action.value]
            })
        }
        case "GET_CLEAR_RECEIVE_MOVIE": {
            return Object.assign({}, state, {
                receivedMovie: []
            })
        }
        case "RECEIVE_RECOMMENDATION_MOVIE": {
            return Object.assign({}, state, {
                recommendationMovies: action.value
            })
        }
        case "ADD_ATTRIBUTE_FOR_RECOMMENDED_MOVIE": {
            return Object.assign({}, state, {
                recommendationMovies: state.recommendationMovies.map((movie) => {
                    return movie = Object.assign({}, movie, {
                        addedToWatchList: false,
                        focusedImg: false
                    })
                })
            })
        }
        case "CHANGE_INPUT_VALUE": {
            return Object.assign({}, state, {
                inputValue: action.value
            })
        }
        case "RECEIVE_SEARCHED_MOVIES": {
            return Object.assign({}, state, {
                searchedMovies: action.value
            })
        }
        case "ADD_ATTRIBUTE_TO_WATCH_LIST": {
            return Object.assign({}, state, {
                topRatedMovies: state.topRatedMovies.map((movie, index) => {
                    if (index === action.index) {
                        return Object.assign({}, movie, {
                            addedToWatchList: !action.addedToWatchList
                        })
                    }
                    return movie
                })
            })
        }
        case "ADD_MOVIE_TO_WATCH_LIST": {
            return Object.assign({}, state, {
                watchList: [...state.watchList, action.watchList]
            })
        }
        case "GET_MOVIE_DETAILS": {
            return Object.assign({}, state, {
                topRatedMovies: state.topRatedMovies.map((movie, index) => {
                    if (index === action.index) {
                        return Object.assign({}, movie, {
                            focusedImg: !action.focusedImg
                        })
                    }
                    return movie
                })
            })
        }
        case "GET_MOVIE_DETAILS_FOR_RECOMMENDED_MOVIES": {
            return Object.assign({}, state, {
                recommendationMovies: state.recommendationMovies.map((movie, index) => {
                    if (index === action.index) {
                        return Object.assign({}, movie, {
                            focusedImg: !action.focusedImg
                        })
                    }
                    return movie
                })
            })
        }
        case "CLEAR_MOVIE_DETAILS": {
            return Object.assign({}, state, {
                topRatedMovies: state.topRatedMovies.map((movie, index) => {
                    if (index === action.index) {
                        return Object.assign({}, movie, {
                            focusedImg: false
                        })
                    }
                    return movie
                })
            })
        }
        case "CLEAR_MOVIE_DETAILS__FOR_RECOMMENDED_MOVIES": {
            return Object.assign({}, state, {
                recommendationMovies: state.recommendationMovies.map((movie, index) => {
                    if (index === action.index) {
                        return Object.assign({}, movie, {
                            focusedImg: false
                        })
                    }
                    return movie
                })
            })
        }
        case "DELETE_FROM_WATCH_LIST": {
            state.watchList.splice(action.index, 1);
            return Object.assign({}, state, {
                watchList: [...state.watchList]
            })
        }
        default:
            return state;

    }
};

export default reducer;