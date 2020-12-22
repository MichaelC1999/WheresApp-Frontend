import * as actionTypes from './actionTypes';

const initialState = {
    modalType: null,
    imageUrl: "",
    currentUserId: null,
    token: null,
    messages: {
        sent: [],
        rec: [],
        unread: false
    },
}

const reducer = (state = initialState, action)=> {
    switch(action.type){
        case actionTypes.ADD_POST:
            return {
                ...state,
                modalType: actionTypes.ADD_POST
            }
        
        case actionTypes.SEND_PM:
            
            return {
                ...state,
                recipient: action.recipient,
                modalType: actionTypes.SEND_PM
            }
        case actionTypes.VIEW_IMG:
            return {
                ...state,
                modalType: actionTypes.VIEW_IMG,
                imageUrl: action.imageUrl
            }
        case actionTypes.EDIT_POST:
            return {
                ...state,
                modalType: actionTypes.EDIT_POST,
                postData: action.postData
            }
        case actionTypes.DELETE_POST:
            return {
                ...state,
                modalType: actionTypes.DELETE_POST,
                postData: {postId: action.postId},
                commentIdx: action.commentIdx
            }
        case actionTypes.CLOSE_MODAL:
            return {
                ...state,
                postData: {},
                recipient: null,
                modalType: null
            }
        case actionTypes.USER_LOGIN:
            
            return {
                ...state,
                token: action.token,
                currentUserId: action.userId,
                currentUserName: action.userName,
                
            }
        case actionTypes.OPEN_MAIL:
            return {
                ...state,
                modalType: actionTypes.OPEN_MAIL,
                messages: {
                    ...state.messages,
                    unread: false
                }
                
            }
        case actionTypes.SET_MSG:
            let sentMsg = []
            let recMsg = []
            let msgs = action.msg
            let unread = false
            if(msgs){
                msgs.reverse().map(msg => {
                    if(msg.sender.id === state.currentUserId){
                        sentMsg.push(msg)
                    } else if(msg.recipient.id === state.currentUserId){
                        recMsg.push(msg)
                        if(msg.unread){
                            unread = true
                        }
                    }
                })
            }
            return {
                ...state,
                messages: {
                    sent: sentMsg,
                    rec: recMsg,
                    unread: unread
                },
                loaded: true
            }
        
        case actionTypes.LOGOUT_REDUX:
            return {
                ...state,
                token: null,
                messages: {
                    sent: [],
                    rec: [],
                    unread: false
                },
                currentUserId: null,
                currentUserName: null,
                modalType: null,
                loaded: false
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