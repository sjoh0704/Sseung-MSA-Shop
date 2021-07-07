const SET_CATEGORY = 'SET_CATEGORY'; 


export const setCategory = (requestData) => {
    return {
      type: SET_CATEGORY,
      payload: requestData,
    };
  };

  const initialState = {
    payload: [],
  };
  
  const category = (state = initialState, action) => {
    switch (action.type) {
      case (SET_CATEGORY):
        return ({
          ...state,
          payload: action.payload
        });
      default:
        return state
    }
  };
  
  export default category;