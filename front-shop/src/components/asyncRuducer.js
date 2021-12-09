export function asyncReducer(state, action) {
    switch (action.type) {
        case "LOADING":
            return {
                loading: true,
                data: null,
                error: null,
            };
        case "SUCCESS":
            return {
                loading: false,
                data: action.data,
                error: null,
            };
        case "ERROR":
            return {
                loading: false,
                data: null,
                error: action.error,
            };
        default:
            throw new Error("unhandled error");
    }
}

export default asyncReducer;
