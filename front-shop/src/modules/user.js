const LOGIN_USER = 'LOGIN_USER'; 
const LOGOUT_USER = 'LOGOUT_USER';


export const loginAction = (requestData) => {
    return {
      type: LOGIN_USER,
      payload: requestData,
    };
  };
  
  export const logoutAction = () => {

    return {
      type: LOGOUT_USER,
      payload: {}
    };
  };

  const initialState = {
    payload: null,
    isLoggedIn: false
  };
  
  const user = (state = initialState, action) => {
    switch (action.type) {
      case (LOGIN_USER):
        return ({
          ...state,
          payload: action.payload,
          isLoggedIn: true
        });
      case (LOGOUT_USER):
        return ({
          ...state,
          payload: action.payload,
          isLoggedIn: false
        });
      default:
        return state
    }
  };
  
  export default user;