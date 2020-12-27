import React from 'react';
import Navigation from './components/Navigation/Navigation';
import {Route, Switch} from 'react-router-dom';
import MainFeed from './components/MainFeed/MainFeed';
import UserList from './components/UserList/UserList';
import Authenticate from './components/Auth/Authenticate';
import Modal from './components/UI/Modal/Modal';
import UserPage from './components/UserList/UserPage/UserPage';
import ViewPostImg from './components/Post/ViewPostImg';
import * as actionTypes from './Store/actionTypes';
import openSocket from 'socket.io-client';

import {connect} from 'react-redux';

class App extends React.Component {
  
  state = {
    modal: null,
    PM: [],
    msgSocket: false
  }

  //if modalType redux state is false, render nothing
  //if modalType redux state has value of "addPost", render <Modal type="addPost" />

  componentDidMount() {
    //local component variable to check if user is logged in per localStorage
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
    if (!token || !expiryDate) {
      return;
    }
    //check if already reached expiry, if expiry has passed, logout. If expiry has not passed and token is still valid, update expiry date to one hour in future
    if (new Date(expiryDate) <= new Date()) {
      this.logoutHandler();
      return;
    } else {
      const userId = localStorage.getItem('userId');
      if(userId){
        this.props.userLogin(userId, token)
        fetch("https://wheresapp-backend.herokuapp.com/message", {
          headers: {
            authorization: 'Bearer ' + token
          }
        })
        .then(res => {
          return res.json()
        })
        .then(res => {
          this.props.setMsg(res.PM)
        })
      }
    }
    
  }

  logoutHandler = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate')
    this.props.logoutRedux();
  }

  componentDidUpdate() {
    if(this.state.msgSocket === false && localStorage.getItem('userId') === this.props.currentUserId){
      const socket = openSocket('https://wheresapp-backend.herokuapp.com')
      socket.on('Message@' + this.props.currentUserId, data => {
        if(data.action === 'newPM'){
          this.props.setMsg(data.msg)
        }
      })
    }
    const expiryDate = localStorage.getItem('expiryDate');
    if(!expiryDate){
      return
    }
    if (new Date(expiryDate) <= new Date()) {
      this.logoutHandler();
      return;
    }
  }

  render() {
    
    let renderModal = null
    if(this.props.modalType){
      renderModal = <Modal />
    }
    return (
      <div>
        <Navigation logoutHandler={this.logoutHandler} />
        {renderModal}
        <div style={{paddingTop: 52}}>
          <Switch>
            <Route path="/" exact component={MainFeed} />
            <Route path="/posts/:postId" component={ViewPostImg} />
            <Route path="/users" exact component={UserList} />
            <Route path="/users/:userId" component={UserPage} />
            <Route path="/auth" exact component={Authenticate} />
          </Switch>
        </div>
      </div>
    )
  }
  
}


const mapStateToProps = state => {
    return {
        modalType: state.modalType,
        currentUserId: state.currentUserId
    }
}

const mapDispatchToProps = dispatch => {
  return {
    userLogin: (userId, token) => dispatch({type: actionTypes.USER_LOGIN, userId: userId, token: token}),
    logoutRedux: () => dispatch({type: actionTypes.LOGOUT_REDUX}),
    setMsg: (msg) => dispatch({type: actionTypes.SET_MSG, msg: msg})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);