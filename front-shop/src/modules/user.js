const LOGIN_USER = 'LOGIN_USER'; 
const LOGOUT_USER = 'LOGOUT_USER';
const SET_USER = 'SET_USER';

export const loginAction = (userData) => {
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

  export const setUserAction = (userData) => {
    return {
      type: SET_USER,
      userData
    };
  };


  const initialState = {
    id: null,
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
        case (SET_USER):
            return ({
                ...state,
                user: action.userData,
                
            });
      default:
        return state
    }
  };
  
  export default user;