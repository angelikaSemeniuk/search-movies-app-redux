const initialState = {receiveData : false};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "RECEIVE_DATA": {
            return Object.assign({}, state, {
                receiveData: true
            })
        }
        default:
            return state;

    }
};

export default reducer;