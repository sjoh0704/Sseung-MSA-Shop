const LOGIN_USER = 'LOGIN_USER'; 
const LOGOUT_USER = 'LOGOUT_USER';

export const loginAcion = (userData) => {
    return {
      type: LOGIN_USER,
      userData,
      isLoggedIn: true
    };
  };
  
  export const logoutAction = () => {
    return {
      type: LOGOUT_USER,
      userData: {},
      isLoggedIn: false
    };
  };


  const initialState = {
    user: {},
    isLoggedIn: false
  };
  
  const user = (state = initialState, action) => {
    switch (action.type) {
      case (LOGIN_USER):
        return ({
          ...state,
          user: action.userData,
          isLoggedIn: action.isLoggedIn
        });
      case (LOGOUT_USER):
        return ({
          ...state,
          user: action.userData,
          isLoggedIn: action.isLoggedIn
        });
      default:
        return state
    }
  };
  
  export default user;