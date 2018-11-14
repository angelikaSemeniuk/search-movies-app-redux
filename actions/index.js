const apiKey= "9f8233e5843d6fc70a65f379d4909c34";

export function handleRequestForTopRated () {
    return function (dispatch) {
        fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=" + apiKey + "&language=en-US&page=1")
            .then((response) => {
                return response.json();
            })
            .then(
                (data) => {
                    dispatch({type: "RECEIVE_TOP_RATED_MOVIES", value: data.results});
                    dispatch({type: "RECEIVE_CURRENT_PAGE", value: data.page});
                    dispatch({type: "RECEIVE_TOTAL_PAGES", value: data.total_pages});

                }
            )

    }
}

export function handleRequestForGenres() {
    return function (dispatch) {
        fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=" + apiKey + "&language=en-US")
            .then((response) => {
                return response.json();
            })
            .then(
                (data) => {
                    dispatch({type: "RECEIVE_GENRES", value: data});
                },
                (error) => {
                    dispatch({type: "CATCH_ERROR", value: error});
                }
            )

    }
}
export function handlePreviousPage(currentPage) {
    return function (dispatch) {
        const page = currentPage - 1;
        fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=" + apiKey + "&language=en-US&page=" + page)
            .then((response) => {
                return response.json();
            })
            .then(
                (data) => {
                    dispatch({type: "RECEIVE_TOP_RATED_MOVIES", value: data.results});
                    dispatch({type: "RECEIVE_CURRENT_PAGE", value: data.page});
                },
                (error) => {
                    dispatch({type: "CATCH_ERROR", value: error});
                }
            )
    }
    
}

export function handleNextPage(currentPage) {
    return function (dispatch) {
        const page = currentPage + 1;
        fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=" + apiKey + "&language=en-US&page=" + page)
            .then((response) => {
                return response.json();
            })
            .then(
                (data) => {
                    dispatch({type: "RECEIVE_TOP_RATED_MOVIES", value: data.results});
                    dispatch({type: "RECEIVE_CURRENT_PAGE", value: data.page});
                },
                (error) => {
                    dispatch({type: "CATCH_ERROR", value: error});
                }
            )
    }
    
}

export function handleRequestByMovieId(movieId) {
    return function (dispatch) {
        dispatch({type: "RECEIVE_MOVIE_DETAILS"});
        fetch("https://api.themoviedb.org/3/movie/" + movieId + "?api_key=" + apiKey + "&language=en-US")
            .then((response) => {
                return response.json();
            })
            .then(
                (data) => {
                    dispatch({type: "RECEIVE_MOVIE_TITLE", value: data.title });
                    dispatch({type: "RECEIVE_MOVIE_ORIGINAL_TITLE", value: data.original_title});
                    dispatch({type: "RECEIVE_MOVIE_POSTER", value: data.poster_path});
                    dispatch({type: "RECEIVE_MOVIE_OVERVIEW", value: data.overview });
                    dispatch({type: "RECEIVE_MOVIE_RELEASE_DATE", value: data.release_date});
                    dispatch({type: "RECEIVE_MOVIE_GENRES", value: data.genres });
                    dispatch({type: "RECEIVE_MOVIE_RATING", value: data.vote_average });
                },
                (error) => {
                    dispatch({type: "CATCH_ERROR", value: error});
                }
            )

    }
}

export function handleRequestForRecommendation(movieId) {
    return function (dispatch) {
        dispatch({type: "RECEIVE_MOVIE_DETAILS"});
        fetch("https://api.themoviedb.org/3/movie/" + movieId + "/recommendations?api_key=" + apiKey + "&language=en-US")
            .then((response) => {
                return response.json();
            })
            .then(
                (data) => {
                    dispatch({type: "RECEIVE_RECOMMENDATION_MOVIE", value: data.results });
                },
                (error) => {
                    dispatch({type: "CATCH_ERROR", value: error});
                }
            )

    }
}

export function handleClickToTopRatedPath() {
    return {
        type: "HANDLE_CLICK_TO_TOP_RATED"
    }
}

export function handleChangeOnInput(inputValue) {
    return function (dispatch) {
        dispatch({type: "CHANGE_INPUT_VALUE", value: inputValue});
        fetch("https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&language=en-US&query=" + inputValue + "&page=1&include_adult=false")
            .then((response) => {
                return response.json();
            })
            .then(
                (data) => {
                    console.error("action-RECEIVE_SEARCHED_MOVIES", data);
                    dispatch({type: "RECEIVE_SEARCHED_MOVIES", value: data.results });

                },
                (error) => {
                    dispatch({type: "CATCH_ERROR", value: error});
                }
            )

    }
}
