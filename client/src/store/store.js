import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const INITIAL_STATE = {
    currentUser: {},
    token: [],
    isAuthenticated: false
}
// ACTIONS
export const setCurrentUser = (user) => {
    return {
        type: 'SET_USER',
        payload: user,
    }
}


// ACTIONS
export const setAuth = (bool) => {
    return {
        type: 'SET_AUTH',
        payload: bool,
    }
}


const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                currentUser: action.payload
            }
        case 'SET_AUTH':
            return {
                ...state,
                isAuthenticated: action.payload
            }
        default:
            return state
    }
}

const store = createStore(userReducer, composeWithDevTools(
    applyMiddleware()))

export default store