const apiKey= "9f8233e5843d6fc70a65f379d4909c34";

export function handleRequestForTopRated () {
    return function (dispatch) {
        dispatch({type: "RECEIVE_DATA"});
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

