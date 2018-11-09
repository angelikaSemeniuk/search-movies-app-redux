export function handleRequestForTopRated () {
    return function (dispatch) {
        dispatch({type: "RECEIVE_DATA"});
        const apiKey= "9f8233e5843d6fc70a65f379d4909c34";
        fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=" + apiKey)
            .then((response) => {
                return response.json();
            })
            .then(
                (data) => {
                    console.error("action-receive-movies", data);
                }
            )

    }
}