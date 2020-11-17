import * as actionTypes from './actionTypes';

const initialState = {
    modalType: null,
    postData: {},
    currentUserId: null,
    token: null
}

const reducer = (state = initialState, action)=> {
    switch(action.type){
        case actionTypes.ADD_POST:
            console.log("ADDPOST triggered")
            return {
                ...state,
                modalType: actionTypes.ADD_POST
            }
        case actionTypes.SINGLE_POST:
            return {
                ...state,
                modalType: actionTypes.SINGLE_POST,
                postData: action.postData
            }
        case actionTypes.EDIT_POST:
            console.log('edit post');
            return {
                ...state,
                modalType: actionTypes.EDIT_POST,
                postData: action.postData
            }
        case actionTypes.DELETE_POST:
            return {
                ...state,
                modalType: actionTypes.DELETE_POST,
                postData: {postId: action.postId}
            }
        case actionTypes.CLOSE_MODAL:
            console.log('close model hit')
            return {
                ...state,
                postData: {},
                modalType: null
            }
        case actionTypes.USER_LOGIN:
            console.log('user login', action.token)
            return {
                ...state,
                token: action.token,
                currentUserId: action.userId
            }
        case actionTypes.LOGOUT_REDUX:
            return {
                ...state,
                token: null,
                currentUserId: null
            }
        case actionTypes.ZERO_POSTDATA:
            return {
                ...state,
                postData: {}
            }
        default:
            return state
    }
}

export default reducer;