const initialState = {
    topRatedMovies: [],
    genres: [],
    currentPage: null,
    totalPages: null,
    error: null,
    ifMovieDetailsReceived: false,
    movieId: "",
    movieTitle: "",
    movieOriginalTitle:"",
    moviePoster: "",
    movieGenres: [],
    movieOverview:"",
    movieReleasedDate:"",
    movieRating: "",
    recommendationMovies: [],
    inputValue: "",
    searchedMovies: [],
    watchList: []

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
                ifMovieDetailsReceived: true,
                inputValue: "",
                searchedMovies: []

            })
        }
        case "HANDLE_CLICK_TO_TOP_RATED": {
            return Object.assign({}, state, {
                ifMovieDetailsReceived: false
            })
        }
        case "RECEIVE_MOVIE_ID": {
            return Object.assign({}, state, {
                movieId: action.value
            })
        }
        case "RECEIVE_MOVIE_TITLE": {
            return Object.assign({}, state, {
                movieTitle: action.value
            })
        }
        case "RECEIVE_MOVIE_ORIGINAL_TITLE": {
            return Object.assign({}, state, {
                movieOriginalTitle: action.value
            })
        }
        case "RECEIVE_MOVIE_POSTER": {
            return Object.assign({}, state, {
                moviePoster: action.value
            })
        }
        case "RECEIVE_MOVIE_OVERVIEW": {
            return Object.assign({}, state, {
                movieOverview: action.value
            })
        }
        case "RECEIVE_MOVIE_RELEASE_DATE": {
            return Object.assign({}, state, {
                movieReleasedDate: action.value
            })
        }
        case "RECEIVE_MOVIE_GENRES": {
            return Object.assign({}, state, {
                movieGenres: action.value
            })
        }
        case "RECEIVE_MOVIE_RATING": {
            return Object.assign({}, state, {
                movieRating: action.value
            })
        }
        case "RECEIVE_RECOMMENDATION_MOVIE": {
            return Object.assign({}, state, {
                recommendationMovies: action.value
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
        default:
            return state;

    }
};

export default reducer;